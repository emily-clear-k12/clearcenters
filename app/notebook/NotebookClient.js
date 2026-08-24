"use client";

import React, { useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import { getPublicCase } from "../../lib/cases/index.public";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  border: "#E1E2EE",
};

const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };
const CONFIDENCE_META = {
  shaky: { emoji: "😕", label: "Still shaky" },
  solid: { emoji: "🙂", label: "Pretty solid" },
  strong: { emoji: "😄", label: "Really strong" },
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

function DetailModal({ entry, onClose }) {
  if (!entry) return null;
  const standard = entry.assignments?.case_standard;
  const title = entry.assignments?.cases?.title || standard;
  const caseEntry = standard ? getPublicCase(standard) : null;
  const confMeta = entry.self_confidence ? CONFIDENCE_META[entry.self_confidence] : null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, width: "min(560px, 100%)", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ position: "relative", height: 160, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          {standard && <img src={caseImagePath(standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(13,20,35,.6)", color: COLORS.white, border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{standard}</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px 0" }}>{title}</h2>

          {caseEntry?.publicCase?.bigQuestion && (
            <div style={{ fontSize: 13.5, background: COLORS.tealSoft, borderRadius: 12, padding: "10px 12px", marginBottom: 14, lineHeight: 1.5 }}>
              🎯 {caseEntry.publicCase.bigQuestion}
            </div>
          )}

          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Your Answer</div>
          <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5, marginBottom: 14 }}>
            {entry.attempt2 || entry.attempt1 || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer saved)</span>}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: entry.released ? 14 : 0 }}>
            {confMeta && (
              <div style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                {confMeta.emoji} You felt: {confMeta.label}
              </div>
            )}
            {entry.released && entry.teacher_grade !== null && entry.teacher_grade !== undefined && (
              <div style={{ background: COLORS.gold, color: COLORS.textDark, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                {GRADE_LABELS[entry.teacher_grade]}
              </div>
            )}
          </div>

          {entry.released && entry.teacher_feedback && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Teacher Feedback</div>
              <div style={{ background: COLORS.tealSoft, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5 }}>{entry.teacher_feedback}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NotebookClient({ student, entries }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-card { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; }
        .gc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.14); }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, margin: "0 0 4px 0" }}>My Notebook</h1>
          <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>Every mystery you've solved so far, {student.first_name} — tap one to revisit it.</p>
        </div>

        {entries.length === 0 ? (
          <div style={{ background: COLORS.white, borderRadius: 20, padding: 40, textAlign: "center", color: COLORS.textMuted }}>
            You haven't finished any missions yet — once you submit one, it'll show up here as a case file you can revisit anytime.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {entries.map((entry) => {
              const standard = entry.assignments?.case_standard;
              const title = entry.assignments?.cases?.title || standard || "Untitled Case";
              const confMeta = entry.self_confidence ? CONFIDENCE_META[entry.self_confidence] : null;
              return (
                <div key={entry.id} className="gc-card" onClick={() => setSelected(entry)} style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.08)" }}>
                  <div style={{ position: "relative", height: 120 }}>
                    {standard && <img src={caseImagePath(standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    {entry.released && entry.teacher_grade !== null && entry.teacher_grade !== undefined && (
                      <div style={{ position: "absolute", top: 8, right: 8, background: COLORS.gold, color: COLORS.textDark, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                        {GRADE_LABELS[entry.teacher_grade]}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 3 }}>{standard}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: COLORS.textMuted }}>
                      <span>{new Date(entry.submitted_at).toLocaleDateString()}</span>
                      {confMeta && <span>{confMeta.emoji}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <DetailModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
