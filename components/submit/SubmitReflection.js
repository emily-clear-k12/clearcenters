"use client";

import { useState } from "react";
import { CONFIDENCE_LEVELS, REQUIRED_CHECKS } from "../../lib/selfCheckLists";

const COLORS = {
  violet: "#6C4BD6",
  teal: "#1AA6A6",
  cream: "#F6F3EC",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

export default function SubmitReflection({ questions, onSubmit, disabled, revisionNote, busy }) {
  const list = questions || [];
  const [checks, setChecks] = useState(list.map(() => false));
  const [sure, setSure] = useState(null);
  const [showError, setShowError] = useState(false);
  const count = checks.filter(Boolean).length;
  const need = Math.min(REQUIRED_CHECKS, list.length || REQUIRED_CHECKS);

  function toggle(index) {
    setChecks((prev) => {
      const next = prev.slice();
      next[index] = !next[index];
      return next;
    });
  }

  function submit() {
    if (count < need || !sure) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit({ checklist: checks, selfConfidence: sure });
  }

  return (
    <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
      {revisionNote ? (
        <div style={{ background: "#FFF4E5", border: "1.5px solid #FFC44D", borderRadius: 14, padding: "14px 18px", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#8A5A00", marginBottom: 4 }}>Your teacher asked you to try again</div>
          <div style={{ fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.5 }}>{revisionNote}</div>
        </div>
      ) : null}
      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 4 }}>Self-Check Checklist</div>
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>
        Check off the ones that are true — you need at least {need} of {list.length} ({count}/{list.length} so far).
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {list.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(index)}
            style={{ display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left", background: checks[index] ? "#E6F8F9" : COLORS.cream, border: checks[index] ? "1.5px solid " + COLORS.teal : "1.5px solid transparent", borderRadius: 10, padding: "9px 11px", cursor: "pointer" }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, border: "2px solid " + (checks[index] ? COLORS.teal : "#D8D4E8"), background: checks[index] ? COLORS.teal : COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 12, fontWeight: 700 }}>{checks[index] ? "✓" : ""}</div>
            <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.4 }}>{item}</div>
          </button>
        ))}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, margin: "14px 0 10px" }}>How confident are you in your answer?</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {CONFIDENCE_LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => setSure(level.id)}
            style={{ padding: "16px 10px", borderRadius: 12, fontWeight: 700, fontSize: 13.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", background: sure === level.id ? COLORS.violet : COLORS.cream, color: sure === level.id ? COLORS.white : COLORS.textDark, border: sure === level.id ? "2px solid " + COLORS.violet : "2px solid transparent" }}
          >
            <span style={{ fontSize: 26 }}>{level.emoji}</span>{level.label}
          </button>
        ))}
      </div>
      {showError && (count < need || !sure) ? (
        <div style={{ color: "#B23A3A", background: "#FBEAEA", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 600, marginTop: 10 }}>
          {count < need ? `Check at least ${need} before submitting.` : "Pick how sure you are, then submit."}
        </div>
      ) : null}
      <button type="button" onClick={submit} disabled={disabled || busy} style={{ marginTop: 14, width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "13px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
        {busy ? "Submitting..." : revisionNote ? "Resubmit for Grading →" : "Submit for Grading →"}
      </button>
    </div>
  );
}
