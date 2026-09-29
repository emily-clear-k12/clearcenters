"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";
import ClassSetup from "../../../components/teacher/ClassSetup";
import { replaySamTips } from "../../../components/teacher/SamCoach";
import { SAM_SKINS, DEFAULT_SAM_SKIN, FALLBACK_ICON } from "../../../lib/samSkins";
import { GRADEBOOK_SCALES, scaleNumbers } from "../../../lib/gradebookScale";
import { liveBoardFor } from "../../../lib/teacherBridge";

function gradebookFields(scale, got, almost, notyet) {
  const preset = GRADEBOOK_SCALES.find((item) => item.id === scale) || GRADEBOOK_SCALES[0];
  const custom = scale === "custom";
  return {
    gradebook_scale: scale,
    gradebook_got: custom ? Number(got) : preset.got,
    gradebook_almost: custom ? Number(almost) : preset.almost,
    gradebook_notyet: custom ? Number(notyet) : preset.notyet,
  };
}

function classCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += letters[Math.floor(Math.random() * letters.length)];
  code += "-";
  for (let i = 0; i < 4; i++) code += digits[Math.floor(Math.random() * digits.length)];
  return code;
}

function studentNote(studentId, assignments, submissions) {
  const mine = submissions.filter((row) => row.student_id === studentId);
  const toReview = mine.filter((row) => row.submitted_at && !row.revision_requested && (row.teacher_grade === null || row.teacher_grade === undefined));
  if (toReview.length) return { rank: 0, text: toReview.length === 1 ? "1 ready to review" : `${toReview.length} ready to review` };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const finished = new Set(mine.filter((row) => row.submitted_at && !row.revision_requested).map((row) => row.assignment_id));
  const late = assignments.filter((item) => {
    if (!item.due_date || finished.has(item.id)) return false;
    return new Date(`${item.due_date}T00:00:00`) < today;
  });
  if (late.length) return { rank: 1, text: late.length === 1 ? "1 past due" : `${late.length} past due` };
  if (mine.some((row) => row.revision_requested)) return { rank: 2, text: "Trying again" };
  const turnedIn = mine.filter((row) => row.submitted_at).length;
  return { rank: 3, text: turnedIn ? `${turnedIn} turned in` : "Nothing waiting" };
}

export default function ClassClient() {
  const router = useRouter();
  const search = useSearchParams();
  const askedClass = search.get("class");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(askedClass || "");
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState({});
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
  const [newScale, setNewScale] = useState("points");
  const [newGot, setNewGot] = useState("2");
  const [newAlmost, setNewAlmost] = useState("1");
  const [newNotyet, setNewNotyet] = useState("0");
  const [showNew, setShowNew] = useState(false);
  const [help, setHelp] = useState(false);
  const [ready, setReady] = useState(false);
  const [sam, setSam] = useState(DEFAULT_SAM_SKIN);
  const [saved, setSaved] = useState("");
  const [work, setWork] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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
      setReady(true);
    });
  }, [router, loadClasses, askedClass]);

  const loadStudents = useCallback(async (current) => {
    if (!current) return;
    setJoinUrl(`${window.location.origin}/join/${encodeURIComponent(current.class_code)}`);
    const first = await supabase.from("students").select("id, first_name, pin, active").eq("class_id", current.id).order("first_name");
    let rows = first.data || [];
    if (first.error) {
      const fallback = await supabase.from("students").select("id, first_name, pin").eq("class_id", current.id).order("first_name");
      rows = (fallback.data || []).map((student) => ({ ...student, active: true }));
    } else {
      rows = rows.map((student) => ({ ...student, active: student.active !== false }));
    }
    setStudents(rows);
    const { data: assignments } = await supabase.from("assignments").select("id, class_id, due_date, case_standard, created_at, game_skin, distress_call").eq("class_id", current.id);
    const ids = (assignments || []).map((item) => item.id);
    let submissions = [];
    if (ids.length) {
      const { data } = await supabase.from("submissions").select("student_id, assignment_id, submitted_at, teacher_grade, revision_requested").in("assignment_id", ids);
      submissions = data || [];
    }
    // Everything assigned to this class, newest first, so test work can be cleared out.
    const standards = [...new Set((assignments || []).map((item) => item.case_standard).filter(Boolean))];
    const { data: caseRows } = standards.length ? await supabase.from("cases").select("standard, title, engine").in("standard", standards) : { data: [] };
    const titles = Object.fromEntries((caseRows || []).map((row) => [row.standard, row]));
    setWork((assignments || []).map((item) => ({
      ...item,
      title: titles[item.case_standard]?.title || item.case_standard,
      engine: titles[item.case_standard]?.engine || "",
      turnedIn: submissions.filter((row) => row.assignment_id === item.id && row.submitted_at).length,
    })).sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || ""))));
    setConfirmId(null);
    const nextNotes = {};
    rows.filter((student) => student.active !== false).forEach((student) => {
      nextNotes[student.id] = studentNote(student.id, assignments || [], submissions);
    });
    setNotes(nextNotes);
  }, []);

  useEffect(() => {
    loadStudents(selected);
  }, [selected, loadStudents]);

  function chooseClass(id) {
    setClassId(id);
    setNotice("");
    setError("");
    setSaved("");
  }

  async function createClass(event) {
    event.preventDefault();
    if (!newName.trim() || !teacherId) return;
    setMaking(true);
    setError("");
    const plain = { teacher_id: teacherId, name: newName.trim(), class_code: classCode(), grade: Number(newGrade), subject: newSubject };
    let { data, error: insertError } = await supabase.from("classes").insert({ ...plain, ...gradebookFields(newScale, newGot, newAlmost, newNotyet) }).select().single();
    // add_gradebook_scale.sql may not have run yet: make the class without the scale.
    if (insertError) ({ data, error: insertError } = await supabase.from("classes").insert(plain).select().single());
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
    loadStudents(selected);
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

  async function deleteAssignment(item) {
    setDeletingId(item.id);
    setError("");
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    try {
      const res = await fetch("/api/teacher/assignment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId: item.id, accessToken }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Couldn't delete that assignment.");
      setWork((list) => list.filter((row) => row.id !== item.id));
      setNotice(`Deleted “${item.title}” and its student work.`);
    } catch (err) {
      setError(err.message || "Couldn't delete that assignment.");
    }
    setDeletingId(null);
    setConfirmId(null);
  }

  async function saveGradebook(next) {
    if (!selected) return;
    setError("");
    const fields = gradebookFields(next.scale, next.got, next.almost, next.notyet);
    const { error: saveError } = await supabase.from("classes").update(fields).eq("id", selected.id);
    if (saveError) {
      setError("Couldn't save the gradebook setup. Run the gradebook SQL, then try again.");
      return;
    }
    setClasses((list) => list.map((item) => (item.id === selected.id ? { ...item, ...fields } : item)));
    setSaved("Gradebook setup saved.");
  }

  const active = students
    .filter((student) => student.active !== false)
    .slice()
    .sort((a, b) => (notes[a.id]?.rank ?? 3) - (notes[b.id]?.rank ?? 3) || a.first_name.localeCompare(b.first_name));

  return (
    <BridgePage teacherEmail={email}>
      <style>{`
        .cc-sign-cards{display:none}
        .cc-student-row{text-decoration:none;color:inherit}
        @media print{
          .no-print{display:none!important}
          .cc-sign-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .cc-sign-card{border:1px solid #241b50;border-radius:12px;padding:16px;break-inside:avoid}
          .cc-sign-card strong{font-size:22px}
          .cc-sign-card b{font-size:20px;letter-spacing:1px}
        }
      `}</style>
      <div className="no-print">
        <PageHeading title="Class" subtitle="Who is here, and who needs you.">
          {classes.length > 1 && <ClassTabs classes={classes} value={selected?.id} onChange={chooseClass} />}
        </PageHeading>
        {error && <div className="cc-error" role="alert">{error}</div>}
        {!ready ? <Empty>Loading…</Empty> : !classes.length ? (
          <ClassSetup teacherId={teacherId} onDone={async (row) => { const list = await loadClasses(teacherId); if (row?.id) setClassId(row.id); else if (list[0]) setClassId(list[0].id); }} />
        ) : help && selected ? (
          <ClassSetup teacherId={teacherId} existing={selected} onClose={() => setHelp(false)} onDone={async (row) => { await loadClasses(teacherId); if (row?.id) setClassId(row.id); setHelp(false); }} />
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
                <button className="cc-btn secondary" type="button" onClick={() => setHelp(true)}>Watch the intro</button>
                <button className="cc-btn secondary" type="button" onClick={() => { replaySamTips(); router.push("/teacher"); }}>Replay S.A.M. tips</button>
              </div>
            </section>
            {showNew && (
              <section className="cc-panel" style={{ marginBottom: 16 }}>
                <h2>New class</h2>
                <ClassForm name={newName} setName={setNewName} grade={newGrade} setGrade={setNewGrade} subject={newSubject} setSubject={setNewSubject} scale={newScale} setScale={setNewScale} got={newGot} setGot={setNewGot} almost={newAlmost} setAlmost={setNewAlmost} notyet={newNotyet} setNotyet={setNewNotyet} busy={making} onSubmit={createClass} />
              </section>
            )}
            {notice && <p className="cc-muted">{notice}</p>}
            {saved && <p className="cc-muted">{saved}</p>}
            <GradebookSetup row={selected} onSave={saveGradebook} />
            <div className="cc-two">
              <section className="cc-panel">
                <h2>Students</h2>
                {active.length === 0 && <Empty>No students yet. Add first names on the right.</Empty>}
                {active.map((student) => {
                  const note = notes[student.id] || { rank: 3, text: "Nothing waiting" };
                  return (
                    <Link className="cc-person cc-student-row" key={student.id} href={`/teacher/students/${student.id}`}>
                      <div className="cc-avatar">{student.first_name[0]}</div>
                      <div>
                        <strong>{student.first_name}</strong>
                        <p>Sign-in number {student.pin}</p>
                      </div>
                      <span className={note.rank < 3 ? "cc-badge" : "cc-badge neutral"}>{note.text}</span>
                    </Link>
                  );
                })}
              </section>
              <aside className="cc-stack">
                <section className="cc-panel">
                  <h2>Add students</h2>
                  <p className="cc-muted">One first name per line. Each student gets a 4-digit sign-in number.</p>
                  <form onSubmit={addStudents}>
                    <textarea className="cc-input" style={{ width: "100%", minHeight: 120 }} value={names} onChange={(event) => setNames(event.target.value)} placeholder={"Maya\nLuis\nAva"} aria-label="Student names" />
                    <button className="cc-btn" style={{ marginTop: 12 }} disabled={adding || !names.trim()}>{adding ? "Adding…" : "Add students"}</button>
                  </form>
                </section>
                <section className="cc-panel">
                  <h2>This class</h2>
                  <form onSubmit={rename} className="cc-row" style={{ alignItems: "end" }}>
                    <label className="cc-field" style={{ flex: 1 }}>
                      Class name
                      <input className="cc-input" name="name" defaultValue={selected.name} key={selected.id} />
                    </label>
                    <button className="cc-btn" type="submit">Save name</button>
                  </form>
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
              </aside>
            </div>
            <section className="cc-panel" style={{ marginTop: 16 }}>
              <h2>Assigned work</h2>
              <p className="cc-muted">Everything assigned to this class, newest first. Deleting one also deletes every student's work on it. It can't be undone.</p>
              {!work.length && <Empty>Nothing assigned to this class yet.</Empty>}
              {work.map((item) => (
                <div className="cc-person" key={item.id}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong>{item.title}</strong>
                    <p>{item.case_standard} · assigned {item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}{item.due_date ? ` · due ${new Date(`${item.due_date}T12:00:00`).toLocaleDateString()}` : ""} · {item.turnedIn} turned in</p>
                  </div>
                  {confirmId !== item.id && liveBoardFor(item, item.engine) && <Link className="cc-btn secondary" href={liveBoardFor(item, item.engine).href}>Open {liveBoardFor(item, item.engine).label}</Link>}
                  {confirmId === item.id ? (
                    <div className="cc-row">
                      <button type="button" className="cc-btn" style={{ background: "#c93c3c", borderColor: "#c93c3c" }} disabled={deletingId === item.id} onClick={() => deleteAssignment(item)}>{deletingId === item.id ? "Deleting…" : item.turnedIn ? `Delete it and ${item.turnedIn} students' work` : "Yes, delete it"}</button>
                      <button type="button" className="cc-btn secondary" onClick={() => setConfirmId(null)}>Keep it</button>
                    </div>
                  ) : (
                    <button type="button" className="cc-btn quiet" onClick={() => setConfirmId(item.id)}>Delete</button>
                  )}
                </div>
              ))}
            </section>
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

function ClassForm({ name, setName, grade, setGrade, subject, setSubject, scale, setScale, got, setGot, almost, setAlmost, notyet, setNotyet, busy, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="cc-row" style={{ alignItems: "end" }}>
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
      </div>
      <GradebookFields scale={scale} setScale={setScale} got={got} setGot={setGot} almost={almost} setAlmost={setAlmost} notyet={notyet} setNotyet={setNotyet} />
    </form>
  );
}

function GradebookSetup({ row, onSave }) {
  const numbers = scaleNumbers(row);
  const scale = row?.gradebook_scale || "points";
  return (
    <section className="cc-panel" style={{ marginBottom: 16 }}>
      <h2>Gradebook setup</h2>
      <p className="cc-muted">How Got it, Almost, and Not yet show up in the gradebook.</p>
      <GradebookFields
        scale={scale}
        got={String(numbers.got)}
        almost={String(numbers.almost)}
        notyet={String(numbers.notyet)}
        setScale={(id) => {
          const preset = GRADEBOOK_SCALES.find((item) => item.id === id) || GRADEBOOK_SCALES[0];
          onSave({ scale: id, got: preset.got, almost: preset.almost, notyet: preset.notyet });
        }}
        setGot={(value) => onSave({ scale: "custom", got: value, almost: numbers.almost, notyet: numbers.notyet })}
        setAlmost={(value) => onSave({ scale: "custom", got: numbers.got, almost: value, notyet: numbers.notyet })}
        setNotyet={(value) => onSave({ scale: "custom", got: numbers.got, almost: numbers.almost, notyet: value })}
      />
    </section>
  );
}

function GradebookFields({ scale, setScale, got, setGot, almost, setAlmost, notyet, setNotyet }) {
  function choose(id) {
    const preset = GRADEBOOK_SCALES.find((item) => item.id === id) || GRADEBOOK_SCALES[0];
    setScale(id);
    if (id !== "custom") {
      setGot(String(preset.got));
      setAlmost(String(preset.almost));
      setNotyet(String(preset.notyet));
    }
  }
  return (
    <fieldset style={{ border: 0, padding: 0, margin: "14px 0 0" }}>
      <legend style={{ fontWeight: 700, marginBottom: 8 }}>Gradebook setup</legend>
      <div className="cc-row" style={{ flexWrap: "wrap" }}>
        {GRADEBOOK_SCALES.map((item) => (
          <label key={item.id} className="cc-field" style={{ minWidth: 140 }}>
            <input type="radio" name="gradebook-setup" checked={scale === item.id} onChange={() => choose(item.id)} /> {item.label}
            {item.id !== "custom" && <span className="cc-muted"> {item.got}, {item.almost}, {item.notyet}</span>}
          </label>
        ))}
      </div>
      {scale === "custom" && (
        <div className="cc-row" style={{ marginTop: 8 }}>
          <label className="cc-field">Got it<input className="cc-input" type="number" value={got} onChange={(event) => setGot(event.target.value)} /></label>
          <label className="cc-field">Almost<input className="cc-input" type="number" value={almost} onChange={(event) => setAlmost(event.target.value)} /></label>
          <label className="cc-field">Not yet<input className="cc-input" type="number" value={notyet} onChange={(event) => setNotyet(event.target.value)} /></label>
        </div>
      )}
    </fieldset>
  );
}
