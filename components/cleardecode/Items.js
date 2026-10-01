"use client";
import React, { useEffect, useState } from "react";
import { S, C, speak, SpeakerIcon } from "./ui";

// One "hear it, pick it" item. practice: retry until right (first try is
// what counts). check: one try, no right/wrong shown (scan and vault).
export function PickItem({ item, onDone, mode = "practice", prompt = "Listen, then tap the word you heard." }) {
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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ fontSize: 16, color: C.soft }}>{prompt}</div>
        <button type="button" style={S.hear} onClick={() => speak(item.say)}><SpeakerIcon /> Hear it again</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${item.options.length}, minmax(0, 1fr))`, gap: 14 }}>
        {item.options.map((o) => {
          const state = mode === "check" ? (picked === o ? "picked" : "") : picked === o ? "right" : wrong.includes(o) ? "wrong" : "";
          return (
            <button key={o} type="button" onClick={() => choose(o)} style={{ ...S.option(state === "picked" ? "right" : state) }}>{o}</button>
          );
        })}
      </div>
      {mode === "practice" && <div style={S.fb(!wrong.length)}>{picked ? "Yes." : wrong.length ? "Listen again, and look for the code." : ""}</div>}
      {mode === "quick" && <div style={S.fb(!wrong.length)}>{picked ? (wrong.length ? `That one was ${item.answer}.` : "Got it.") : ""}</div>}
    </div>
  );
}

// One "hear it, spell it" item, built from chips.
export function SpellItem({ item, onDone, mode = "practice", prompt = "Hear the word, then build it from the chips." }) {
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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ fontSize: 16, color: C.soft }}>{prompt}</div>
        <button type="button" style={S.hear} onClick={() => speak(item.say)}><SpeakerIcon /> Hear it again</button>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {Array.from({ length: Math.min(slots, 8) }).map((_, i) => <div key={i} style={S.slot(!!built[i])}>{built[i] || ""}</div>)}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {item.chips.map((ch, i) => (
          <button key={`${ch}-${i}`} type="button" style={S.chip} onClick={() => { if (!locked && built.length < 8) { setBuilt([...built, ch]); setFb({ ok: true, text: "" }); } }}>{ch}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" style={S.primary} onClick={check}>{mode === "check" ? "Lock it in" : "Check"}</button>
        <button type="button" style={S.secondary} onClick={() => setBuilt(built.slice(0, -1))}>Undo</button>
        <button type="button" style={S.secondary} onClick={() => setBuilt([])}>Clear</button>
        {mode === "practice" && <div style={S.fb(fb.ok)}>{fb.text}</div>}
      </div>
    </div>
  );
}
