"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { EDIT_DRILLS, SHORT_ANSWERS, sameText } from "../../../lib/cases/relay-station/answerLab";

// Answer Lab: the typing a test answer needs. Bright page, white answer boxes
// like a real online test. Practice only; drill check marks are remembered in
// this browser only.
const C = { ink: "#241b50", muted: "#6b5f8a", violet: "#7B5DFF", violet2: "#9B7DFF", teal: "#00C2C7", green: "#22B573", red: "#c4233a", gold: "#F5B82E" };
const glass = { background: "rgba(255,255,255,0.88)", border: "1px solid rgba(255,255,255,0.95)", borderRadius: 24, boxShadow: "0 10px 30px rgba(60,40,140,.16)" };
const pill = (bg, color = "#fff") => ({ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color, borderRadius: 999, padding: "10px 18px", fontWeight: 800, border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 15 });
const box = { width: "100%", boxSizing: "border-box", font: "18px/1.6 'Inter', sans-serif", color: C.ink, background: "#fff", border: "2px solid #d9d0f5", borderRadius: 14, padding: "12px 14px", outline: "none" };
const STORE = "clearkeys-answer-lab-done";

function firstDiff(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return i;
}

function Drills() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState(EDIT_DRILLS[0].start);
  const [result, setResult] = useState(null); // null | { ok, msg }
  const [done, setDone] = useState({});
  const [sawEmpty, setSawEmpty] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const ref = useRef(null);
  const d = EDIT_DRILLS[idx];

  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) { /* optional */ } }, []);
  function pick(i) { setIdx(i); setText(EDIT_DRILLS[i].start); setResult(null); setSawEmpty(false); setStartedAt(null); setTimeout(() => ref.current && ref.current.focus(), 0); }
  function change(v) { if (!startedAt) setStartedAt(Date.now()); if (!v) setSawEmpty(true); setText(v); setResult(null); }
  function check() {
    if (d.mustEmptyFirst && !sawEmpty) { setResult({ ok: false, msg: "First select everything and press Backspace so the line disappears. Then undo to bring it back." }); return; }
    if (sameText(text, d.target)) {
      const secs = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : null;
      const next = { ...done, [d.id]: true };
      setDone(next);
      try { localStorage.setItem(STORE, JSON.stringify(next)); } catch (e) { /* optional */ }
      setResult({ ok: true, msg: `Fixed!${secs ? ` That took ${secs} seconds.` : ""}` });
    } else {
      const at = firstDiff(text.replace(/\r\n/g, "\n"), d.target);
      const near = d.target.slice(Math.max(0, at - 12), at + 12).replace(/\n/g, " ↵ ");
      setResult({ ok: false, msg: `Not quite yet. Look near: “${near}”` });
    }
  }
  const count = EDIT_DRILLS.filter((x) => done[x.id]).length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, alignItems: "start" }}>
      <section style={{ ...glass, padding: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>{count} of {EDIT_DRILLS.length} drills done</div>
        <div style={{ display: "grid", gap: 6 }}>
          {EDIT_DRILLS.map((x, i) => (
            <button key={x.id} type="button" onClick={() => pick(i)} aria-pressed={i === idx} style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left", border: i === idx ? `2px solid ${C.violet}` : "1px solid #ece8f8", background: "#fff", borderRadius: 12, padding: "8px 10px", cursor: "pointer", fontFamily: "inherit", color: C.ink }}>
              <span style={{ flex: "0 0 28px", height: 28, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, background: done[x.id] ? C.green : "#ece8f8", color: done[x.id] ? "#fff" : C.muted }}>{done[x.id] ? "✓" : i + 1}</span>
              <span><b style={{ display: "block", fontSize: 14 }}>{x.skill}</b><span style={{ fontSize: 12.5, color: C.muted }}>{x.title}</span></span>
            </button>
          ))}
        </div>
      </section>
      <section style={{ ...glass, padding: 22, gridColumn: "span 2" }}>
        <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>Drill {idx + 1} · {d.skill}</div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 8px", fontSize: 24 }}>{d.title}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 14px" }}>{d.how}</p>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Make it say:</div>
        <div style={{ background: "#f4f1fc", borderRadius: 12, padding: "10px 14px", fontSize: 17, lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 14 }}>{d.target}</div>
        <label htmlFor="drill-box" style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Fix it here:</label>
        <textarea id="drill-box" ref={ref} value={text} onChange={(e) => change(e.target.value)} rows={d.target.includes("\n") ? 4 : 3} spellCheck={false} style={box} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
          <button type="button" onClick={check} style={pill(`linear-gradient(135deg, ${C.violet}, ${C.violet2})`)}>Check</button>
          <button type="button" onClick={() => pick(idx)} style={pill("#f1ecfc", C.violet)}>Start over</button>
          {result && result.ok && idx < EDIT_DRILLS.length - 1 && <button type="button" onClick={() => pick(idx + 1)} style={pill(C.green)}>Next drill →</button>}
          {result && <span role="status" style={{ fontWeight: 700, color: result.ok ? C.green : C.red }}>{result.msg}</span>}
        </div>
      </section>
    </div>
  );
}

function ShortAnswer() {
  const [idx, setIdx] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [text, setText] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [finished, setFinished] = useState(null);
  const [checks, setChecks] = useState({});
  const q = SHORT_ANSWERS[idx];
  const words = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  useEffect(() => { if (!startedAt || finished) return undefined; const id = setInterval(() => setNow(Date.now()), 500); return () => clearInterval(id); }, [startedAt, finished]);
  const left = startedAt && minutes ? Math.max(0, minutes * 60 - Math.floor((now - startedAt) / 1000)) : null;
  useEffect(() => { if (left === 0 && !finished) finish(); }); // eslint-disable-line react-hooks/exhaustive-deps

  function pick(i) { setIdx(i); setText(""); setStartedAt(null); setFinished(null); setChecks({}); }
  function change(v) { if (!startedAt) { setStartedAt(Date.now()); setNow(Date.now()); } setText(v); }
  function finish() {
    const mins = startedAt ? Math.max(0.25, (Date.now() - startedAt) / 60000) : 1;
    setFinished({ words, wpm: Math.round(words / mins), mins: Math.round(mins * 10) / 10 });
  }
  const CHECKLIST = ["I answered the question that was asked", "I used details from the passage", "I wrote complete sentences", "I started sentences with capitals and ended with punctuation", "I read it over and fixed mistakes"];

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <section style={{ ...glass, padding: 16, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {SHORT_ANSWERS.map((x, i) => (
          <button key={x.id} type="button" onClick={() => pick(i)} aria-pressed={i === idx} style={{ borderRadius: 999, padding: "8px 14px", fontWeight: 700, border: i === idx ? "1px solid transparent" : "1px solid #d9d0f5", background: i === idx ? `linear-gradient(135deg, ${C.violet}, ${C.violet2})` : "#fff", color: i === idx ? "#fff" : C.ink, cursor: "pointer", fontFamily: "inherit" }}>{x.subject}: {x.title}</button>
        ))}
        <label style={{ marginLeft: "auto", fontWeight: 700, fontSize: 14 }}>
          Timer{" "}
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} disabled={!!startedAt} style={{ font: "inherit", padding: "6px 8px", borderRadius: 8 }}>
            <option value={5}>5 minutes</option><option value={10}>10 minutes</option><option value={15}>15 minutes</option><option value={0}>No timer</option>
          </select>
        </label>
      </section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18, alignItems: "start" }}>
        <section style={{ ...glass, padding: 22 }}>
          <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>Read</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 10px", fontSize: 22 }}>{q.title}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 16px" }}>{q.passage}</p>
          <div style={{ background: "#f4f1fc", borderRadius: 12, padding: "12px 14px", fontSize: 16.5, lineHeight: 1.55 }}><b>Question:</b> {q.question}</div>
        </section>
        <section style={{ ...glass, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 10, flexWrap: "wrap" }}>
            <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>Type your answer</div>
            <div style={{ fontWeight: 800, color: left !== null && left < 60 ? C.red : C.ink }} aria-live="off">
              {words} words{q.minWords ? ` (aim for ${q.minWords}+)` : ""}{left !== null ? ` · ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")} left` : ""}
            </div>
          </div>
          <textarea aria-label="Your answer" value={text} onChange={(e) => change(e.target.value)} readOnly={!!finished} rows={10} style={{ ...box, minHeight: 240 }} placeholder="Start typing. The timer starts with your first key." />
          {!finished ? (
            <button type="button" onClick={finish} disabled={!words} style={{ ...pill(`linear-gradient(135deg, ${C.violet}, ${C.violet2})`), marginTop: 12, opacity: words ? 1 : 0.5 }}>I&apos;m finished</button>
          ) : (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{finished.words} words in {finished.mins} minutes · about {finished.wpm} words per minute while writing</div>
              <p style={{ color: C.muted, margin: "0 0 10px" }}>{finished.words >= (q.minWords || 0) ? "Nice length for this question." : `Try to write at least ${q.minWords} words next time.`} Now check your own answer:</p>
              {CHECKLIST.map((c) => (
                <label key={c} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15, marginBottom: 6, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checks[c]} onChange={(e) => setChecks({ ...checks, [c]: e.target.checked })} /> {c}
                </label>
              ))}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button type="button" onClick={() => setFinished(null)} style={pill("#f1ecfc", C.violet)}>Keep editing</button>
                {idx < SHORT_ANSWERS.length - 1 && <button type="button" onClick={() => pick(idx + 1)} style={pill(C.green)}>Next question →</button>}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function AnswerLabClient() {
  const [tab, setTab] = useState("drills");
  return (
    <main style={{ minHeight: "100vh", color: C.ink, fontFamily: "'Inter', sans-serif", padding: "20px 16px 60px", background: "linear-gradient(180deg, #E9E4FB 0%, #F2F0FA 45%, #F7F5FD 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <div style={{ width: "min(1100px, 100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ ...glass, borderRadius: 999, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/keys" style={{ color: C.violet, textDecoration: "none", fontWeight: 800 }}>← ClearKeys</Link>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>Answer Lab</span>
          <span style={{ color: C.muted, fontWeight: 700, fontSize: 14 }}>Practice</span>
        </header>
        <section style={{ ...glass, padding: 20 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 26 }}>Type answers like a pro</h1>
          <p style={{ color: C.muted, margin: "6px 0 14px" }}>On a computer test you type your answers and fix them yourself. Practice the editing keys, then answer real questions against the clock.</p>
          <div role="tablist" style={{ display: "flex", gap: 8 }}>
            {[["drills", "Editing drills"], ["answers", "Short answers"]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} style={pill(tab === k ? `linear-gradient(135deg, ${C.violet}, ${C.violet2})` : "#fff", tab === k ? "#fff" : C.ink)}>{l}</button>
            ))}
          </div>
        </section>
        {tab === "drills" ? <Drills /> : <ShortAnswer />}
      </div>
    </main>
  );
}
