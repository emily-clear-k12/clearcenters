"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";
import { CLASS_PLANETS, planetForClass } from "../../../lib/classPlanets";
import { SAM_SKINS, DEFAULT_SAM_SKIN, FALLBACK_ICON } from "../../../lib/samSkins";

const TABS = [
  ["students", "Students"],
  ["work", "Assigned"],
  ["look", "Look"],
];

function classCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += letters[Math.floor(Math.random() * letters.length)];
  code += "-";
  for (let i = 0; i < 4; i++) code += digits[Math.floor(Math.random() * digits.length)];
  return code;
}

export default function ClassClient() {
  const router = useRouter();
  const search = useSearchParams();
  const askedClass = search.get("class");
  const askedTab = search.get("tab");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(search.get("class") || "");
  const [tab, setTab] = useState(TABS.some(([id]) => id === askedTab) ? askedTab : "students");
  const [students, setStudents] = useState([]);
  const [work, setWork] = useState([]);
  const [names, setNames] = useState("");
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const [making, setMaking] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("3");
  const [newSubject, setNewSubject] = useState("ELAR");
  const [showNew, setShowNew] = useState(false);
  const [sam, setSam] = useState(DEFAULT_SAM_SKIN);
  const [saved, setSaved] = useState("");

  const selected = classes.find((item) => item.id === classId) || classes[0] || null;

  const loadClasses = useCallback(async (id) => {
    const { data, error: loadError } = await supabase.from("classes").select("*").eq("teacher_id", id).order("name");
    if (loadError) {
      console.error(loadError);
      setError("Couldn't load your classes. Refresh and try again.");
      return [];
    }
    const list = data || [];
    setClasses(list);
    return list;
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setEmail(data.user.email || "");
      setTeacherId(data.user.id);
      const list = await loadClasses(data.user.id);
      const next = list.find((item) => item.id === askedClass) || list[0];
      if (next) setClassId(next.id);
      const { data: teacherRow } = await supabase.from("teachers").select("equipped_sam_skin").eq("id", data.user.id).maybeSingle();
      if (teacherRow?.equipped_sam_skin) setSam(teacherRow.equipped_sam_skin);
    });
  }, [router, loadClasses, askedClass]);

  useEffect(() => {
    if (!selected) return;
    setJoinUrl(`${window.location.origin}/join/${encodeURIComponent(selected.class_code)}`);
    supabase.from("students").select("id, first_name, pin, active").eq("class_id", selected.id).order("first_name").then(({ data, error: studentError }) => {
      if (studentError) {
        supabase.from("students").select("id, first_name, pin").eq("class_id", selected.id).order("first_name").then((fallback) => {
          setStudents((fallback.data || []).map((student) => ({ ...student, active: true })));
        });
        return;
      }
      setStudents((data || []).map((student) => ({ ...student, active: student.active !== false })));
    });
    supabase.from("assignments").select("id, due_date, case_standard, cases(title)").eq("class_id", selected.id).order("created_at", { ascending: false }).then(async ({ data }) => {
      const rows = data || [];
      const ids = rows.map((row) => row.id);
      let turnedIn = {};
      if (ids.length) {
        const { data: submissions } = await supabase.from("submissions").select("assignment_id, submitted_at").in("assignment_id", ids);
        (submissions || []).forEach((row) => {
          if (!row.submitted_at) return;
          turnedIn[row.assignment_id] = (turnedIn[row.assignment_id] || 0) + 1;
        });
      }
      setWork(rows.map((row) => ({ ...row, turnedIn: turnedIn[row.id] || 0 })));
    });
  }, [selected]);

  function chooseClass(id) {
    setClassId(id);
    setNotice("");
    setError("");
  }

  function chooseTab(next) {
    setTab(next);
    const params = new URLSearchParams();
    if (selected) params.set("class", selected.id);
    params.set("tab", next);
    router.replace(`/teacher/class?${params.toString()}`);
  }

  async function createClass(event) {
    event.preventDefault();
    if (!newName.trim() || !teacherId) return;
    setMaking(true);
    setError("");
    const { data, error: insertError } = await supabase.from("classes").insert({
      teacher_id: teacherId,
      name: newName.trim(),
      class_code: classCode(),
      grade: Number(newGrade),
      subject: newSubject,
    }).select().single();
    setMaking(false);
    if (insertError || !data) {
      console.error(insertError);
      setError("Couldn't create that class. Try again.");
      return;
    }
    setNewName("");
    setShowNew(false);
    await loadClasses(teacherId);
    setClassId(data.id);
    setTab("students");
  }

  async function addStudents(event) {
    event.preventDefault();
    const list = names.split(/\r?\n|,/).map((name) => name.trim()).filter(Boolean);
    if (!list.length || !selected) return;
    setAdding(true);
    setError("");
    setNotice("");
    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    if (!accessToken) {
      setAdding(false);
      setError("Your session expired. Refresh and try again.");
      return;
    }
    const res = await fetch("/api/teacher/roster/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId: selected.id, names: list, accessToken }),
    });
    const result = await res.json();
    setAdding(false);
    if (!res.ok) {
      setError(result.error || "Couldn't add those students.");
      return;
    }
    setNames("");
    setNotice(`Added ${result.students?.length || list.length}. Their sign-in numbers are on the list.`);
    const { data: fresh } = await supabase.from("students").select("id, first_name, pin, active").eq("class_id", selected.id).order("first_name");
    setStudents((fresh || []).map((student) => ({ ...student, active: student.active !== false })));
  }

  async function studentAction(student, action, targetClassId) {
    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    if (!accessToken) {
      setError("Your session expired. Refresh and try again.");
      return;
    }
    const res = await fetch("/api/teacher/roster/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, action, targetClassId, accessToken }),
    });
    const result = await res.json();
    if (!res.ok) {
      setError(result.error || "Couldn't save that change.");
      return;
    }
    const { data: fresh } = await supabase.from("students").select("id, first_name, pin, active").eq("class_id", selected.id).order("first_name");
    setStudents((fresh || []).map((row) => ({ ...row, active: row.active !== false })));
  }

  async function savePlanet(planetKey) {
    if (!selected) return;
    const { error: saveError } = await supabase.from("classes").update({ planet_key: planetKey }).eq("id", selected.id).eq("teacher_id", teacherId);
    if (saveError) {
      console.error(saveError);
      setError("Couldn't save the planet. Try again.");
      return;
    }
    setClasses((list) => list.map((item) => (item.id === selected.id ? { ...item, planet_key: planetKey } : item)));
    setSaved("Planet saved.");
  }

  async function saveSam(key) {
    setSam(key);
    const { error: saveError } = await supabase.from("teachers").update({ equipped_sam_skin: key }).eq("id", teacherId);
    if (saveError) {
      console.error(saveError);
      setError("Couldn't save S.A.M. Try again.");
      return;
    }
    setSaved("S.A.M. saved. This look is for every class.");
  }

  async function rename(event) {
    event.preventDefault();
    const name = event.target.elements.name.value.trim();
    if (!name || !selected || name === selected.name) return;
    const { error: saveError } = await supabase.from("classes").update({ name }).eq("id", selected.id).eq("teacher_id", teacherId);
    if (saveError) {
      console.error(saveError);
      setError("Couldn't rename the class. Try again.");
      return;
    }
    setClasses((list) => list.map((item) => (item.id === selected.id ? { ...item, name } : item)));
    setSaved("Name saved.");
  }

  const active = students.filter((student) => student.active !== false);
  const removed = students.filter((student) => student.active === false);
  const others = classes.filter((item) => selected && item.id !== selected.id);
  const planet = selected ? planetForClass(selected, classes.indexOf(selected)) : null;

  return (
    <BridgePage teacherEmail={email}>
      <style>{`
        .cc-sign-cards{display:none}
        @media print{
          .no-print{display:none!important}
          .cc-sign-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .cc-sign-card{border:1px solid #241b50;border-radius:12px;padding:16px;break-inside:avoid}
          .cc-sign-card strong{font-size:22px}
          .cc-sign-card b{font-size:20px;letter-spacing:1px}
        }
      `}</style>
      <div className="no-print">
        <PageHeading title="Class" subtitle="Students, what you've assigned, and how this class looks.">
          {classes.length > 1 && <ClassTabs classes={classes} value={selected?.id} onChange={chooseClass} />}
        </PageHeading>
        {error && <div className="cc-error" role="alert">{error}</div>}
        {!classes.length ? (
          <section className="cc-panel">
            <h2>Create your first class</h2>
            <p className="cc-muted">Give it a name students will recognize. You can add students next.</p>
            <ClassForm name={newName} setName={setNewName} grade={newGrade} setGrade={setNewGrade} subject={newSubject} setSubject={setNewSubject} busy={making} onSubmit={createClass} />
          </section>
        ) : selected && (
          <>
            <section className="cc-panel cc-row cc-between" style={{ marginBottom: 16 }}>
              <div>
                <div className="cc-eyebrow">Grade {selected.grade} · {selected.subject}</div>
                <h2 style={{ marginBottom: 4 }}>{selected.name}</h2>
                <p className="cc-muted" style={{ margin: 0 }}>{active.length} student{active.length === 1 ? "" : "s"}</p>
              </div>
              <div>
                <div className="cc-eyebrow">Class code</div>
                <strong style={{ fontSize: 28, letterSpacing: 2 }}>{selected.class_code}</strong>
              </div>
              {joinUrl && <QRCodeSVG value={joinUrl} size={72} />}
              <div className="cc-row">
                <button className="cc-btn secondary" type="button" onClick={() => { navigator.clipboard.writeText(selected.class_code); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>{copied ? "Copied" : "Copy code"}</button>
                <button className="cc-btn" type="button" onClick={() => window.print()}>Print sign-in cards</button>
                <button className="cc-btn quiet" type="button" onClick={() => setShowNew((open) => !open)}>{showNew ? "Close" : "New class"}</button>
              </div>
            </section>
            {showNew && (
              <section className="cc-panel" style={{ marginBottom: 16 }}>
                <h2>New class</h2>
                <ClassForm name={newName} setName={setNewName} grade={newGrade} setGrade={setNewGrade} subject={newSubject} setSubject={setNewSubject} busy={making} onSubmit={createClass} />
              </section>
            )}
            <div className="cc-tabs" role="tablist">
              {TABS.map(([id, label]) => (
                <button key={id} type="button" role="tab" aria-pressed={tab === id} onClick={() => chooseTab(id)}>{label}</button>
              ))}
            </div>
            {notice && <p className="cc-muted">{notice}</p>}
            {saved && <p className="cc-muted">{saved}</p>}

            {tab === "students" && (
              <div className="cc-two">
                <section className="cc-panel">
                  <h2>Students</h2>
                  {active.length === 0 && <Empty>No students yet. Add first names on the right.</Empty>}
                  {active.map((student) => (
                    <div className="cc-person" key={student.id}>
                      <div className="cc-avatar">{student.first_name[0]}</div>
                      <div>
                        <strong>{student.first_name}</strong>
                        <p>Sign-in number {student.pin}</p>
                      </div>
                      {others.length > 0 && (
                        <select className="cc-input" aria-label={`Move ${student.first_name}`} value="" onChange={(event) => {
                          const target = event.target.value;
                          const className = others.find((item) => item.id === target)?.name || "the other class";
                          if (target && window.confirm(`Move ${student.first_name} to ${className}? Their work goes with them.`)) studentAction(student, "transfer", target);
                        }}>
                          <option value="">Move to…</option>
                          {others.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                      )}
                      <button className="cc-btn quiet" type="button" onClick={() => {
                        if (window.confirm(`Remove ${student.first_name}? Their work stays saved. You can bring them back.`)) studentAction(student, "deactivate");
                      }}>Remove</button>
                    </div>
                  ))}
                  {removed.length > 0 && (
                    <details>
                      <summary>Removed ({removed.length})</summary>
                      {removed.map((student) => (
                        <div className="cc-person" key={student.id}>
                          <div><strong>{student.first_name}</strong></div>
                          <button className="cc-btn quiet" type="button" onClick={() => studentAction(student, "reactivate")}>Bring back</button>
                        </div>
                      ))}
                    </details>
                  )}
                </section>
                <aside className="cc-panel">
                  <h2>Add students</h2>
                  <p className="cc-muted">One first name per line. Each student gets a 4-digit sign-in number.</p>
                  <form onSubmit={addStudents}>
                    <textarea className="cc-input" style={{ width: "100%", minHeight: 140 }} value={names} onChange={(event) => setNames(event.target.value)} placeholder={"Maya\nLuis\nAva"} aria-label="Student names" />
                    <button className="cc-btn" style={{ marginTop: 12 }} disabled={adding || !names.trim()}>{adding ? "Adding…" : "Add students"}</button>
                  </form>
                </aside>
              </div>
            )}

            {tab === "work" && (
              <section className="cc-panel">
                <div className="cc-row cc-between">
                  <h2>Assigned</h2>
                  <Link className="cc-btn" href={`/teacher/assign/new?classId=${selected.id}`}>Assign something</Link>
                </div>
                {work.length === 0 && <Empty>Nothing assigned to this class yet.</Empty>}
                {work.map((item) => (
                  <div className="cc-person" key={item.id}>
                    <div>
                      <strong>{item.cases?.title || item.case_standard}</strong>
                      <p>{item.turnedIn} turned in{item.due_date ? ` · due ${new Date(item.due_date).toLocaleDateString()}` : ""}</p>
                    </div>
                    <Link className="cc-link" href="/teacher/grade">Grades</Link>
                  </div>
                ))}
              </section>
            )}

            {tab === "look" && (
              <div className="cc-two">
                <section className="cc-panel">
                  <h2>This class</h2>
                  <form onSubmit={rename} className="cc-row" style={{ marginBottom: 18 }}>
                    <label className="cc-field" style={{ flex: 1 }}>
                      Class name
                      <input className="cc-input" name="name" defaultValue={selected.name} key={selected.id} />
                    </label>
                    <button className="cc-btn" type="submit">Save name</button>
                  </form>
                  <div className="cc-eyebrow">Planet</div>
                  <p className="cc-muted">This is the planet for {selected.name}. Right now: {planet?.name}.</p>
                  <div className="cc-row">
                    {CLASS_PLANETS.map((item) => (
                      <button key={item.key} type="button" className="cc-btn quiet" aria-pressed={planet?.key === item.key} onClick={() => savePlanet(item.key)}>{item.name}</button>
                    ))}
                  </div>
                </section>
                <section className="cc-panel">
                  <h2>S.A.M.</h2>
                  <p className="cc-muted">S.A.M. looks the same in every class.</p>
                  <div className="cc-row">
                    {SAM_SKINS.map((skin) => (
                      <button key={skin.key} type="button" className="cc-btn quiet" aria-pressed={sam === skin.key} onClick={() => saveSam(skin.key)}>
                        <img src={skin.image} alt="" width={28} height={28} onError={(event) => { event.currentTarget.src = FALLBACK_ICON; }} />
                        {skin.name.replace(" S.A.M.", "")}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </div>
      {selected && (
        <div className="cc-sign-cards">
          <h1>{selected.name}</h1>
          <p>Class code {selected.class_code}</p>
          {active.map((student) => (
            <div className="cc-sign-card" key={student.id}>
              <strong>{student.first_name}</strong>
              <div>Class code</div>
              <b>{selected.class_code}</b>
              <div>Sign-in number</div>
              <b>{student.pin}</b>
            </div>
          ))}
        </div>
      )}
    </BridgePage>
  );
}

function ClassForm({ name, setName, grade, setGrade, subject, setSubject, busy, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="cc-row" style={{ alignItems: "end" }}>
      <label className="cc-field">Class name<input className="cc-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Homeroom" required /></label>
      <label className="cc-field">Grade
        <select className="cc-input" value={grade} onChange={(event) => setGrade(event.target.value)}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label className="cc-field">Subject
        <select className="cc-input" value={subject} onChange={(event) => setSubject(event.target.value)}>
          <option>ELAR</option>
          <option>Math</option>
          <option>Science</option>
          <option>Social Studies</option>
        </select>
      </label>
      <button className="cc-btn" disabled={busy || !name.trim()}>{busy ? "Creating…" : "Create class"}</button>
    </form>
  );
}
