"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { GRADEBOOK_SCALES } from "../../lib/gradebookScale";

const STEPS = ["Class", "Gradebook", "Students", "Ready"];

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
    const payload = {
      name: name.trim(),
      grade: Number(grade),
      subject,
      ...numbers,
    };
    if (savedClass?.id) {
      const { error: saveError } = await supabase.from("classes").update(payload).eq("id", savedClass.id);
      if (saveError) throw saveError;
      return { ...savedClass, ...payload };
    }
    const { data, error: insertError } = await supabase.from("classes").insert({
      teacher_id: teacherId,
      class_code: classCode(),
      ...payload,
    }).select().single();
    if (insertError || !data) throw insertError || new Error("create failed");
    return data;
  }

  async function next() {
    setError("");
    if (step === 0 && !name.trim()) {
      setError("Give the class a name students will recognize.");
      return;
    }
    if (step === 0 || step === 1) {
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
    if (step === 2) {
      const list = names.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
      if (!list.length) {
        setStep(3);
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
        setStep(3);
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
    <section className="cc-panel">
      <div className="cc-row cc-between">
        <div>
          <h2 style={{ marginBottom: 4 }}>{existing ? "Set up with help" : "Set up your class"}</h2>
          <p className="cc-muted" style={{ margin: 0 }}>Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>
        </div>
        {onClose && <button className="cc-btn secondary" type="button" onClick={onClose}>Close</button>}
      </div>
      <div className="cc-row" style={{ margin: "12px 0" }}>
        {STEPS.map((label, index) => (
          <span key={label} className={index === step ? "cc-badge" : "cc-badge neutral"}>{label}</span>
        ))}
      </div>
      {error && <div className="cc-error" role="alert">{error}</div>}

      {step === 0 && (
        <>
          <p>This sets up the class code, sign-in numbers, the gradebook, and S.A.M. You can change any of it later.</p>
          <div className="cc-row" style={{ alignItems: "end" }}>
            <label className="cc-field">Class name<input className="cc-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Homeroom" /></label>
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
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <p>You still mark work Got it, Almost, or Not yet. This only changes the numbers in the gradebook and in a Skyward or Schoology file.</p>
          <div className="cc-row" style={{ flexWrap: "wrap" }}>
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

      {step === 2 && (
        <>
          <p>One first name per line. Each student gets a 4-digit sign-in number. You can skip this and add names later.</p>
          <textarea className="cc-input" style={{ width: "100%", minHeight: 140 }} value={names} onChange={(event) => setNames(event.target.value)} placeholder={"Maya\nLuis\nAva"} aria-label="Student names" />
        </>
      )}

      {step === 3 && savedClass && (
        <>
          <p>This class is ready.</p>
          <p><strong>Class code {savedClass.class_code}</strong></p>
          <ul>
            <li>Gradebook counts as {scaleRow.label}: Got it {numbers.gradebook_got}, Almost {numbers.gradebook_almost}, Not yet {numbers.gradebook_notyet}.</li>
            <li>{added ? `${added} student${added === 1 ? "" : "s"} added, each with a sign-in number.` : "No students yet. Add them on this page when you are ready."}</li>
            <li>S.A.M. is on. Sign-in cards can be printed from the class page.</li>
          </ul>
        </>
      )}

      <div className="cc-row" style={{ marginTop: 16 }}>
        {step > 0 && step < 3 && <button className="cc-btn secondary" type="button" disabled={busy} onClick={() => setStep(step - 1)}>Back</button>}
        <button className="cc-btn" type="button" disabled={busy} onClick={next}>{busy ? "Saving…" : step === 3 ? "Done" : step === 2 ? "Finish" : "Next"}</button>
      </div>
    </section>
  );
}
