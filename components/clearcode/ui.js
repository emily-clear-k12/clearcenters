"use client";
// ClearCode student UI kit (Sept 30, 2026). Functional first: Emily will
// redesign the student screens after the build. Dark "lab" panels to match
// the prototype; all styling lives here so the redesign touches one file.

// ---- voice (stand-in until the recorded/AI voice is chosen) ----
function pickVoice() {
  try {
    const vs = window.speechSynthesis.getVoices() || [];
    const prefer = ["Google US English", "Samantha", "Microsoft Aria", "Microsoft Jenny", "Microsoft Zira", "Alex"];
    for (const p of prefer) { const v = vs.find((x) => x.name.indexOf(p) >= 0); if (v) return v; }
    return vs.find((x) => /en[-_]US/i.test(x.lang)) || null;
  } catch (e) { return null; }
}
export function speak(parts) {
  try {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const v = pickVoice();
    (Array.isArray(parts) ? parts : [parts]).forEach((p) => {
      const u = new SpeechSynthesisUtterance(String(p));
      u.rate = 0.9; u.lang = "en-US"; if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    });
  } catch (e) { /* no voice available */ }
}

export const C = {
  bg: "#0b0e27", panel: "#151a44", panel2: "#1d2358", line: "#2c3170", line2: "#3d4488",
  text: "#e8eaff", muted: "#a9acd6", soft: "#c3c6ee", teal: "#2fd4c8", tealText: "#7ff0e6",
  violet: "#7b5dff", gold: "#f5c84b", warn: "#ffb27a",
};

export const S = {
  page: { minHeight: "100vh", background: `radial-gradient(ellipse at 70% 0%, #26215e 0%, #121538 45%, ${C.bg} 100%)`, color: C.text, fontFamily: "Inter, sans-serif", padding: "20px 24px 40px", boxSizing: "border-box" },
  wrap: { maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 },
  panel: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 20, padding: 26 },
  eyebrow: { fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.tealText },
  h1: { margin: "6px 0", font: "800 30px Poppins, sans-serif" },
  h2: { margin: "6px 0 0", font: "700 26px Poppins, sans-serif" },
  p: { margin: "6px 0 0", fontSize: 16, color: C.soft, lineHeight: 1.5 },
  primary: { minHeight: 52, padding: "0 28px", border: 0, borderRadius: 999, background: `linear-gradient(135deg, ${C.violet}, ${C.teal})`, color: "#fff", font: "700 17px Poppins, sans-serif", cursor: "pointer" },
  secondary: { minHeight: 44, padding: "0 18px", border: `1px solid ${C.line2}`, borderRadius: 999, background: "#1b2052", color: C.text, font: "600 15px Inter, sans-serif", cursor: "pointer" },
  hear: { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 16px", border: `1px solid ${C.teal}`, borderRadius: 999, background: "rgba(47,212,200,0.12)", color: C.tealText, font: "600 15px Inter, sans-serif", cursor: "pointer" },
  option: (state) => ({
    minHeight: 84, borderRadius: 16, cursor: "pointer", font: "600 32px Inter, sans-serif", padding: "0 12px",
    ...(state === "right" ? { background: "rgba(47,212,200,0.2)", border: `1px solid ${C.teal}`, color: "#9ff5ec" }
      : state === "wrong" ? { background: "rgba(255,178,122,0.1)", border: `1px solid ${C.warn}`, color: "#ffd0ad" }
      : { background: "#161b4a", border: `1px solid ${C.line2}`, color: "#eef0ff" }),
  }),
  chip: { minWidth: 60, minHeight: 56, padding: "0 14px", border: "1px solid #4a52a8", borderRadius: 12, background: "linear-gradient(180deg, #232a6e, #1a1f55)", color: "#eef0ff", font: "600 24px Inter, sans-serif", cursor: "pointer" },
  slot: (filled) => ({ minWidth: 64, height: 60, padding: "0 10px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", font: "600 26px Inter, sans-serif", ...(filled ? { background: "#232a6e", border: `1px solid ${C.violet}`, color: "#fff" } : { background: "#10143a", border: `1px dashed ${C.line2}`, color: "#555a92" }) }),
  fb: (ok) => ({ minHeight: 22, fontSize: 15, fontWeight: 600, color: ok ? C.tealText : C.warn }),
};

export function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
export function CrystalIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 5 9l7 13 7-13z" fill="#f5c84b" /><path d="M5 9h14M12 2 9 9l3 13 3-13z" stroke="#b8871a" strokeWidth="1" fill="none" />
    </svg>
  );
}
export function HearButton({ words, label = "Hear it" }) {
  return <button type="button" style={S.hear} onClick={() => speak(words)}><SpeakerIcon /> {label}</button>;
}

// S.A.M. line at the bottom of every screen.
export function Sam({ line }) {
  if (!line) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", background: "#1f2560", border: `2px solid ${C.violet}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b8a9ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="4" /><path d="M12 8V4" /><circle cx="12" cy="3.5" r="1" /><circle cx="9.5" cy="13" r="1.2" fill="#7ff0e6" stroke="none" /><circle cx="14.5" cy="13" r="1.2" fill="#7ff0e6" stroke="none" /></svg>
      </div>
      <div style={{ background: "#171b45", border: `1px solid ${C.line}`, borderRadius: 14, padding: "10px 16px", fontSize: 15, color: "#dfe2ff" }}><strong style={{ color: "#b8a9ff" }}>S.A.M.</strong> {line}</div>
    </div>
  );
}
