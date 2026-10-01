"use client";
// ClearDecode student UI kit (Sept 30, 2026). Relic Lab redesign from
// Emily's mockups: styling tokens live here, the scene stage in Stage.js.

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

// Relic Lab look (redesign, Sept 30, 2026): bright station glass over
// Emily's scene art. Navy text on light panels, teal and blue accents.
export const C = {
  text: "#13254a", navy: "#0f2350", muted: "#5b6b8d", soft: "#34466e",
  teal: "#14b8c8", tealText: "#0a8597", blue: "#2f7de1", violet: "#3d6df2",
  gold: "#d99a14", warn: "#c8551f", line: "#c3e6f7", line2: "#8fd0ee",
  panel: "rgba(247,252,255,0.93)", panel2: "#e9f7fd", glass: "rgba(240,249,255,0.86)",
  bg: "#0d1b3d",
};

const GLOW = "0 0 0 3px rgba(120,214,255,0.35), 0 10px 30px rgba(15,35,80,0.25)";
export const S = {
  page: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Inter, sans-serif", padding: "20px 24px 40px", boxSizing: "border-box" },
  wrap: { maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 },
  panel: { background: C.panel, border: `2px solid ${C.line2}`, borderRadius: 24, padding: 26, boxShadow: GLOW, color: C.text, boxSizing: "border-box" },
  glass: { background: C.glass, border: `2px solid rgba(160,222,250,0.9)`, borderRadius: 24, boxShadow: GLOW, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: C.text, boxSizing: "border-box" },
  eyebrow: { fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.tealText },
  h1: { margin: "6px 0", font: "800 34px Poppins, sans-serif", color: C.navy },
  h2: { margin: "4px 0 0", font: "700 28px Poppins, sans-serif", color: C.navy },
  p: { margin: "6px 0 0", fontSize: 18, color: C.soft, lineHeight: 1.5 },
  primary: { minHeight: 60, padding: "0 34px", border: "2px solid rgba(255,255,255,0.7)", borderRadius: 18, background: "linear-gradient(180deg, #2fd3e0, #1596c9)", color: "#fff", font: "700 21px Poppins, sans-serif", cursor: "pointer", boxShadow: "0 0 0 3px rgba(47,211,224,0.35), 0 6px 18px rgba(21,150,201,0.35)", textShadow: "0 1px 2px rgba(0,60,90,0.35)" },
  secondary: { minHeight: 52, padding: "0 22px", border: `2px solid ${C.line2}`, borderRadius: 16, background: "#ffffff", color: C.navy, font: "700 17px Inter, sans-serif", cursor: "pointer", boxShadow: "0 4px 12px rgba(15,35,80,0.12)" },
  dark: { minHeight: 52, padding: "0 22px", border: "2px solid #7f8ba3", borderRadius: 16, background: "linear-gradient(180deg, #6f7b93, #4f5a72)", color: "#fff", font: "700 18px Inter, sans-serif", cursor: "pointer" },
  hear: { display: "inline-flex", alignItems: "center", gap: 10, minHeight: 52, padding: "0 20px", border: "2px solid rgba(255,255,255,0.8)", borderRadius: 999, background: "linear-gradient(180deg, #3aa0f2, #1f6fd1)", color: "#fff", font: "700 17px Inter, sans-serif", cursor: "pointer", boxShadow: "0 0 0 3px rgba(58,160,242,0.3)" },
  option: (state) => ({
    minHeight: 104, borderRadius: 20, cursor: "pointer", font: "800 42px Poppins, sans-serif", padding: "0 12px",
    ...(state === "right" ? { background: "#dcfaf6", border: `3px solid ${C.teal}`, color: "#086b78", boxShadow: "0 0 0 4px rgba(20,184,200,0.25)" }
      : state === "wrong" ? { background: "#fff1e8", border: "3px solid #f0a274", color: "#a5461b" }
      : { background: "#ffffff", border: "3px solid #9fd6f2", color: C.navy, boxShadow: "0 6px 14px rgba(15,35,80,0.12)" }),
  }),
  chip: { minWidth: 76, minHeight: 76, padding: "0 16px", border: "3px solid #9fd6f2", borderRadius: 16, background: "linear-gradient(180deg, #ffffff, #eaf6fd)", color: C.navy, font: "800 34px Poppins, sans-serif", cursor: "pointer", boxShadow: "0 6px 12px rgba(15,35,80,0.15)" },
  slot: (filled) => ({ minWidth: 92, height: 82, padding: "0 12px", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", font: "800 34px Poppins, sans-serif", ...(filled ? { background: "#ffffff", border: `3px solid ${C.blue}`, color: C.navy } : { background: "rgba(255,255,255,0.75)", border: "3px solid #8fd8f2", color: "#9bb" }) }),
  fb: (ok) => ({ minHeight: 24, fontSize: 18, fontWeight: 700, color: ok ? C.tealText : C.warn }),
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
      <div style={{ background: "#fff", border: `2px solid ${C.line2}`, borderRadius: 14, padding: "10px 16px", fontSize: 16, color: C.navy }}><strong style={{ color: C.gold }}>S.A.M.</strong> {line}</div>
    </div>
  );
}
