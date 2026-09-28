"use client";

export function speakAloud(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const line = String(text || "").replace(/\s+/g, " ").trim();
  if (!line) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(line.slice(0, 3500));
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
  return true;
}

export default function ReadAloudButton({ text, style }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!speakAloud(text)) return;
      }}
      style={{
        background: "rgba(255,255,255,.92)",
        color: "#1F2A44",
        border: "1px solid rgba(31,42,68,.15)",
        borderRadius: 999,
        padding: "6px 12px",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        ...style,
      }}
    >
      Read aloud
    </button>
  );
}
