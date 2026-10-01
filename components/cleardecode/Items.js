"use client";
import React, { useEffect, useState } from "react";
import { S, C, speak, SpeakerIcon } from "./ui";

// One "hear it, pick it" item. practice: retry until right (first try is
// what counts). check: one try, no right/wrong shown (scan and vault).
export function PickItem({ item, onDone, mode = "practice", prompt = "Listen, then tap the word you heard.", compact = false }) {
  const [picked, setPicked] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [locked, setLocked] = useState(false);
  useEffect(() => { setPicked(null); setWrong([]); setLocked(false); const t = setTimeout(() => speak(item.say), 250); return () => clearTimeout(t); }, [item]);

  function choose(opt) {
    if (locked) return;
    const right = opt === item.answer;
    if (mode === "check") { setLocked(true); setPicked(opt); setTimeout(() => onDone(right), 350); return; }
    if (mode === "quick") { setLocked(true); setPicked(item.answer); if (!right) setWrong([opt]); setTimeout(() => onDone(right), right ? 600 : 1100); return; }
    if (right) { setLocked(true); setPicked(opt); setTimeout(() => onDone(wrong.length === 0), 650); }
    else { setWrong((w) => (w.includes(opt) ? w : [...w, opt])); speak(item.say); }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {compact ? <RowHear prompt={prompt} onHear={() => speak(item.say)} /> : <BigHear prompt={prompt} onHear={() => speak(item.say)} />}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${item.options.length}, minmax(0, 1fr))`, gap: 18 }}>
        {item.options.map((o) => {
          const state = mode === "check" ? (picked === o ? "picked" : "") : picked === o ? "right" : wrong.includes(o) ? "wrong" : "";
          return (
            <button key={o} type="button" onClick={() => choose(o)} style={{ ...S.option(state === "picked" ? "right" : state) }}>{o}</button>
          );
        })}
      </div>
      {mode === "practice" && <div style={{ ...S.fb(!wrong.length), textAlign: "center" }}>{picked ? "Yes." : wrong.length ? "Listen again, and look for the code." : ""}</div>}
      {mode === "quick" && <div style={{ ...S.fb(!wrong.length), textAlign: "center" }}>{picked ? (wrong.length ? `That one was ${item.answer}.` : "Got it.") : ""}</div>}
    </div>
  );
}

// One "hear it, spell it" item, built from chips.
export function SpellItem({ item, onDone, mode = "practice", prompt = "Hear the word, then build it from the chips.", noHeader = false, compact = false }) {
  const [built, setBuilt] = useState([]);
  const [misses, setMisses] = useState(0);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const [locked, setLocked] = useState(false);
  useEffect(() => { setBuilt([]); setMisses(0); setFb({ ok: true, text: "" }); setLocked(false); const t = setTimeout(() => speak(item.say), 250); return () => clearTimeout(t); }, [item]);
  const slots = Math.max(item.parts.length, built.length) + 1;

  function check() {
    if (locked) return;
    const made = built.join("");
    if (!made) { setFb({ ok: false, text: "Place some chips first." }); return; }
    const right = made === item.answer;
    if (mode === "check") { setLocked(true); setTimeout(() => onDone(right), 250); return; }
    if (right) { setLocked(true); setFb({ ok: true, text: `Yes: ${item.answer}.` }); setTimeout(() => onDone(misses === 0), 700); return; }
    const m = misses + 1;
    setMisses(m);
    setBuilt([]);
    setFb({ ok: false, text: m >= 2 ? `Listen sound by sound: ${item.parts.join(" · ")}. Build it once more.` : "Not quite. Hear it again and build it sound by sound." });
    speak(item.say);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 12 : 18, alignItems: "center" }}>
      {!noHeader && (compact ? <RowHear prompt={prompt} onHear={() => speak(item.say)} /> : <BigHear prompt={prompt} onHear={() => speak(item.say)} />)}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {Array.from({ length: Math.min(slots, 8) }).map((_, i) => <div key={i} style={S.slot(!!built[i])}>{built[i] || ""}</div>)}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {item.chips.map((ch, i) => (
          <button key={`${ch}-${i}`} type="button" style={S.chip} onClick={() => { if (!locked && built.length < 8) { setBuilt([...built, ch]); setFb({ ok: true, text: "" }); } }}>{ch}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" style={S.dark} onClick={() => setBuilt(built.slice(0, -1))}>↶ Undo</button>
        <button type="button" style={S.dark} onClick={() => setBuilt([])}>Clear</button>
        <button type="button" style={{ ...S.primary, minWidth: 220 }} onClick={check}>{mode === "check" ? "Lock it in" : "✓ Check"}</button>
      </div>
      {mode === "practice" && <div style={{ ...S.fb(fb.ok), textAlign: "center" }}>{fb.text}</div>}
    </div>
  );
}

// Centered prompt with the big round speaker button (from the mockups).
export function BigHear({ prompt, onHear, label = "Hear it again" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {prompt && <div style={{ font: "700 26px Poppins, sans-serif", color: C.navy, textAlign: "center" }}>{prompt}</div>}
      <button type="button" onClick={onHear} aria-label={label} style={{ width: 84, height: 84, borderRadius: "50%", border: "3px solid #fff", background: "radial-gradient(circle at 35% 30%, #5cc0ff, #1c6fd6 70%)", boxShadow: "0 0 0 6px rgba(80,180,255,0.3), 0 8px 18px rgba(20,90,200,0.35)", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" /><path d="M18.5 5.5a9 9 0 0 1 0 13" fill="none" /></svg>
      </button>
      <div style={{ font: "700 15px Inter, sans-serif", color: C.navy }}>{label}</div>
    </div>
  );
}

// One-row prompt with a smaller speaker, for tight spots like the vault console.
export function RowHear({ prompt, onHear }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <button type="button" onClick={onHear} aria-label="Hear it again" style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #fff", background: "radial-gradient(circle at 35% 30%, #5cc0ff, #1c6fd6 70%)", boxShadow: "0 0 0 5px rgba(80,180,255,0.3)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" /><path d="M18.5 5.5a9 9 0 0 1 0 13" fill="none" /></svg>
      </button>
      <div style={{ font: "700 26px Poppins, sans-serif", color: C.navy }}>{prompt}</div>
    </div>
  );
}
