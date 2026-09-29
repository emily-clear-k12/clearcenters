"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { GRADEBOOK_SCALES } from "../../lib/gradebookScale";

const STEPS = ["Look around", "Your class", "Gradebook", "Students", "Ready"];

const FEATURES = [
  { image: "/teacher/challenges/mission_map.jpg", title: "Assign from a standard", text: "Pick the standard. The activities for it are already together." },
  { image: "/teacher/challenges/frequency_rush.jpg", title: "Students practice, then prove it", text: "Games for practice. Longer work when you need a grade." },
  { image: "/teacher/challenges/group_chat.jpg", title: "You mark three ways", text: "Got it, Almost, or Not yet. The gradebook turns that into your numbers." },
  { image: "/icons/sam/cosmic/helping-poster.png", title: "S.A.M. checks in", text: "The next few times you sign in, I’ll point out one more feature." },
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

function fieldsFor(scale, got, almost, notyet) {
  const preset = GRADEBOOK_SCALES.find((item) => item.id === scale) || GRADEBOOK_SCALES[0];
  const custom = scale === "custom";
  return {
    gradebook_scale: scale,
    gradebook_got: custom ? Number(got) : preset.got,
    gradebook_almost: custom ? Number(almost) : preset.almost,
    gradebook_notyet: custom ? Number(notyet) : preset.notyet,
  };
}

const SPEECH = [
  "Hi. I’m S.A.M. Before we make the class, here’s the short version of what you’ll use.",
  "Name the class the way your students know it. I’ll make the class code.",
  "You still mark Got it, Almost, or Not yet. This is only how those marks show in the gradebook.",
  "One first name per line. I’ll give each student a 4-digit sign-in number. You can skip this.",
  "You’re set. I’ll pop in the next few times you sign in with one more tip.",
];

export default function ClassSetup({ teacherId, existing, onClose, onDone }) {
  const starting = GRADEBOOK_SCALES.find((item) => item.id === (existing?.gradebook_scale || "points")) || GRADEBOOK_SCALES[0];
  const [step, setStep] = useState(0);
  const [name, setName] = useState(existing?.name || "");
  const [grade, setGrade] = useState(String(existing?.grade || 3));
  const [subject, setSubject] = useState(existing?.subject || "ELAR");
  const [scale, setScale] = useState(existing?.gradebook_scale || "points");
  const [got, setGot] = useState(String(existing?.gradebook_scale === "custom" ? existing.gradebook_got : starting.got));
  const [almost, setAlmost] = useState(String(existing?.gradebook_scale === "custom" ? existing.gradebook_almost : starting.almost));
  const [notyet, setNotyet] = useState(String(existing?.gradebook_scale === "custom" ? existing.gradebook_notyet : starting.notyet));
  const [names, setNames] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [savedClass, setSavedClass] = useState(existing || null);
  const [added, setAdded] = useState(0);

  const scaleRow = GRADEBOOK_SCALES.find((item) => item.id === scale) || GRADEBOOK_SCALES[0];
  const numbers = fieldsFor(scale, got, almost, notyet);

  function pickScale(id) {
    const preset = GRADEBOOK_SCALES.find((item) => item.id === id) || GRADEBOOK_SCALES[0];
    setScale(id);
    if (id !== "custom") {
      setGot(String(preset.got));
      setAlmost(String(preset.almost));
      setNotyet(String(preset.notyet));
    }
  }

  async function saveClass() {
    const payload = { name: name.trim(), grade: Number(grade), subject, ...numbers };
    if (savedClass?.id) {
      const { error: saveError } = await supabase.from("classes").update(payload).eq("id", savedClass.id);
      if (saveError) throw saveError;
      return { ...savedClass, ...payload };
    }
    const row = { teacher_id: teacherId, class_code: classCode(), ...payload };
    let { data, error: insertError } = await supabase.from("classes").insert(row).select().single();
    if (insertError) {
      // add_gradebook_scale.sql may not have run yet: make the class without the scale.
      const { gradebook_scale, gradebook_got, gradebook_almost, gradebook_notyet, ...plain } = row;
      ({ data, error: insertError } = await supabase.from("classes").insert(plain).select().single());
    }
    if (insertError || !data) throw insertError || new Error("create failed");
    return data;
  }

  async function next() {
    setError("");
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1 && !name.trim()) {
      setError("Give the class a name students will recognize.");
      return;
    }
    if (step === 1 || step === 2) {
      setBusy(true);
      try {
        const row = await saveClass();
        setSavedClass(row);
        setStep(step + 1);
      } catch (err) {
        console.error(err);
        setError("Couldn't save that. If this is the gradebook step, run the gradebook SQL, then try again.");
      }
      setBusy(false);
      return;
    }
    if (step === 3) {
      const list = names.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
      if (!list.length) {
        setStep(4);
        return;
      }
      setBusy(true);
      try {
        const { data } = await supabase.auth.getSession();
        const accessToken = data?.session?.access_token;
        const res = await fetch("/api/teacher/roster/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classId: savedClass.id, names: list, accessToken }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "add failed");
        setAdded(result.students?.length || list.length);
        setStep(4);
      } catch (err) {
        console.error(err);
        setError("Couldn't add those students. You can add them from the class page.");
      }
      setBusy(false);
      return;
    }
    onDone(savedClass);
  }

  return (
    <section className="cc-panel cc-setup">
      <style>{`
        .cc-setup{padding:0;overflow:hidden}
        .cc-setup-head{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:18px 22px 0}
        .cc-setup-rail{display:flex;gap:0;padding:0 22px;margin-top:14px;border-bottom:1px solid #e8e2f5}
        .cc-setup-rail span{font:600 13px Inter,sans-serif;color:#716384;padding:10px 14px;border-bottom:3px solid transparent}
        .cc-setup-rail span.is-on{color:#713ace;border-bottom-color:#7645ce}
        .cc-setup-grid{display:grid;grid-template-columns:220px minmax(0,1fr);gap:8px;align-items:start;padding:8px 18px 22px}
        .cc-setup-sam{text-align:center;padding:12px 8px 0}
        .cc-setup-sam img{width:150px;height:150px;object-fit:contain}
        .cc-setup-say{margin:0;background:#f3fbff;border:3px solid #7adfff;border-radius:18px;padding:12px 14px;color:#241b50;font-size:14px;line-height:1.45;text-align:left}
        .cc-setup-body{padding:12px 8px 0}
        .cc-setup-body h2{font-family:Poppins,sans-serif;letter-spacing:-.4px;margin:0 0 8px}
        .cc-feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
        .cc-feature{border:1px solid #e7e2f2;border-radius:16px;overflow:hidden;background:#fff;text-align:left}
        .cc-feature img{width:100%;height:92px;object-fit:cover;display:block;background:#efe8fc}
        .cc-feature div{padding:10px 12px 12px}
        .cc-feature strong{display:block;font-size:14px}
        .cc-feature p{margin:4px 0 0;color:#70658d;font-size:12px;line-height:1.4}
        .cc-setup-actions{display:flex;gap:10px;margin-top:18px}
        @media(max-width:800px){
          .cc-setup-grid{grid-template-columns:1fr}
          .cc-feature-grid{grid-template-columns:1fr}
          .cc-setup-sam{display:flex;gap:12px;align-items:center;text-align:left}
          .cc-setup-sam img{width:88px;height:88px}
        }
      `}</style>
      <div className="cc-setup-head">
        <p className="cc-muted" style={{ margin: 0 }}>{existing ? "Set up with help" : "Welcome to ClearCenters"}</p>
        {onClose && <button className="cc-btn secondary" type="button" onClick={onClose}>Close</button>}
      </div>
      <div className="cc-setup-rail" aria-label="Setup steps">
        {STEPS.map((label, index) => <span key={label} className={index === step ? "is-on" : ""}>{label}</span>)}
      </div>
      <div className="cc-setup-grid">
        <div className="cc-setup-sam">
          <img src="/icons/sam/cosmic/helping-poster.png" alt="S.A.M." />
          <p className="cc-setup-say">{SPEECH[step]}</p>
        </div>
        <div className="cc-setup-body">
          {error && <div className="cc-error" role="alert">{error}</div>}
          {step === 0 && (
            <>
              <h2>A short look before you start</h2>
              <div className="cc-feature-grid">
                {FEATURES.map((item) => (
                  <article key={item.title} className="cc-feature">
                    <img src={item.image} alt="" />
                    <div><strong>{item.title}</strong><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h2>Make the class</h2>
              <div className="cc-row" style={{ alignItems: "end", marginTop: 12 }}>
                <label className="cc-field">Class name<input className="cc-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Homeroom" /></label>
                <label className="cc-field">Grade
                  <select className="cc-input" value={grade} onChange={(event) => setGrade(event.target.value)}>
                    <option value="3">3</option><option value="4">4</option><option value="5">5</option>
                  </select>
                </label>
                <label className="cc-field">Subject
                  <select className="cc-input" value={subject} onChange={(event) => setSubject(event.target.value)}>
                    <option>ELAR</option><option>Math</option><option>Science</option><option>Social Studies</option>
                  </select>
                </label>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2>Gradebook setup</h2>
              <div className="cc-row" style={{ flexWrap: "wrap", marginTop: 12 }}>
                {GRADEBOOK_SCALES.map((item) => (
                  <label key={item.id} className="cc-field" style={{ minWidth: 160 }}>
                    <input type="radio" name="setup-gradebook" checked={scale === item.id} onChange={() => pickScale(item.id)} /> {item.label}
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
            </>
          )}
          {step === 3 && (
            <>
              <h2>Add your students</h2>
              <textarea className="cc-input" style={{ width: "100%", minHeight: 140, marginTop: 12 }} value={names} onChange={(event) => setNames(event.target.value)} placeholder={"Maya\nLuis\nAva"} aria-label="Student names" />
            </>
          )}
          {step === 4 && savedClass && (
            <>
              <h2>{savedClass.name} is ready</h2>
              <p><strong>Class code {savedClass.class_code}</strong></p>
              <ul>
                <li>Gradebook: {scaleRow.label}. Got it {numbers.gradebook_got}, Almost {numbers.gradebook_almost}, Not yet {numbers.gradebook_notyet}.</li>
                <li>{added ? `${added} student${added === 1 ? "" : "s"} added, each with a sign-in number.` : "No students yet. Add them here when you are ready."}</li>
                <li>Print sign-in cards from this page whenever you need them.</li>
              </ul>
            </>
          )}
          <div className="cc-setup-actions">
            {step > 0 && step < 4 && <button className="cc-btn secondary" type="button" disabled={busy} onClick={() => setStep(step - 1)}>Back</button>}
            <button className="cc-btn" type="button" disabled={busy} onClick={next}>{busy ? "Saving…" : step === 0 ? "Make my class" : step === 4 ? "Go to my class" : step === 3 ? "Finish" : "Next"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
