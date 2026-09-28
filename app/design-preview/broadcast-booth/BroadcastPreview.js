"use client";
import { useState } from "react";
import BroadcastBoothClient from "../../activity/[assignmentId]/BroadcastBoothClient";

// A short, quiet test tone for checking the player. Never a student's recording.
function sampleAudio() {
  const rate = 8000, seconds = 3, samples = rate * seconds;
  const bytes = new Uint8Array(44 + samples * 2), view = new DataView(bytes.buffer);
  function word(at, text) { for (let i = 0; i < text.length; i++) bytes[at + i] = text.charCodeAt(i); }
  word(0, "RIFF"); view.setUint32(4, bytes.length - 8, true); word(8, "WAVE"); word(12, "fmt ");
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  word(36, "data"); view.setUint32(40, samples * 2, true);
  for (let i = 0; i < samples; i++) view.setInt16(44 + i * 2, Math.sin(i / rate * Math.PI * 440) * 650 * Math.min(1, i / 400, (samples - i) / 400), true);
  let binary = ""; bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return "data:audio/wav;base64," + btoa(binary);
}

export default function BroadcastPreview({ cases }) {
  const [selected, setSelected] = useState(0);
  const [screen, setScreen] = useState("plan");
  const [version, setVersion] = useState(0);
  const [fixture, setFixture] = useState(null);
  const [compact, setCompact] = useState(false);
  const item = cases[selected];
  function change(caseIndex, nextScreen) {
    const c = cases[caseIndex];
    const map = Object.fromEntries(c.beats.map((b, i) => [b.id, [c.brainstormChips[i % c.brainstormChips.length]].filter(Boolean)]));
    const beats = Object.fromEntries(c.beats.map((b) => [b.id, {
      status: nextScreen === "review" || nextScreen === "submitted" ? "done" : "empty",
      audioDataUrl: nextScreen === "review" || nextScreen === "submitted" ? sampleAudio() : null,
      durationSec: 3,
    }]));
    setFixture(nextScreen === "cover" ? null : {
      stimulusReady: true, brainstormReady: nextScreen !== "plan", brainstormMap: map, beats, currentBeatIndex: 0,
    });
    setSelected(caseIndex); setScreen(nextScreen); setVersion((n) => n + 1);
  }
  return <>
    <div style={{ padding: "10px 16px", background: "#251541", color: "white", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, font: "13px system-ui" }}>
      <strong>Design preview</strong>
      <label>Activity <select aria-label="Preview activity" value={selected} onChange={(e) => change(Number(e.target.value), screen)}>{cases.map((c,i) => <option value={i} key={c.standard}>{c.segmentLabel} · {c.topic}</option>)}</select></label>
      <label>Screen <select aria-label="Preview screen" value={screen} onChange={(e) => change(selected,e.target.value)}>{["cover","plan","record","review","submitted"].map((s) => <option key={s}>{s}</option>)}</select></label>
      <button onClick={() => change(selected,screen)}>Reset screen</button>
      <button onClick={() => setCompact((v) => !v)}>{compact ? "Full width" : "Phone width"}</button>
      <span>No student data saved. Review audio is a test tone.</span>
    </div>
    <div style={compact ? { width: 390, maxWidth: "100%", margin: "0 auto" } : undefined}>
      {compact ? <iframe title="Phone preview" src="/design-preview/broadcast-booth" style={{width:"100%", height:850, border:0}} /> :
      <BroadcastBoothClient key={selected + ":" + version} assignmentId="design-preview" publicCase={item} config={item.config}
        existingData={fixture || (screen === "plan" ? { stimulusReady: true } : null)} alreadySubmitted={screen === "submitted"} previewMode />}
    </div>
  </>;
}
