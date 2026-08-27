"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../../components/StudentSidebar";
import { getPublicCase } from "../../lib/cases/index.public";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  goldSoft: "#FFF7E6",
  success: "#22C55E",
  successSoft: "#E9F9EE",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

// Friendlier, kid-facing wording for the same 0/1/2 scale teachers see as
// "Level 0/1/2" on their grading screen — students never see the raw AI
// score, only the teacher's own grade, released on the teacher's schedule.
const GRADE_META = {
  0: { label: "Keep Practicing", emoji: "🌱", bg: COLORS.goldSoft, color: "#B8860B" },
  1: { label: "Getting There", emoji: "💪", bg: COLORS.tealSoft, color: COLORS.teal },
  2: { label: "Nailed It!", emoji: "🌟", bg: COLORS.successSoft, color: COLORS.success },
};
const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };
const CONFIDENCE_META = {
  shaky: { emoji: "😕", label: "Still shaky" },
  solid: { emoji: "🙂", label: "Pretty solid" },
  strong: { emoji: "😄", label: "Really strong" },
};

// Same frosted-glass treatment used elsewhere on the student side now that
// these pages float over decorative backgrounds instead of flat cream.
const glassCard = {
  background: "rgba(255,255,255,.42)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

function caseImagePath(standard) {
  if (!standard) return "/icons/crystal_points.png";
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// Ported from the old My Notebook page — the richer "revisit a finished
// case" view (the big question, your actual answer, how confident you
// felt, teacher feedback). The top "needs attention" list stays a simple
// scan-able row instead; this level of detail is only useful once a
// mission is actually done.
function DetailModal({ entry, onClose }) {
  if (!entry) return null;
  const standard = entry.caseStandard;
  const caseEntry = standard ? getPublicCase(standard) : null;
  const confMeta = entry.selfConfidence ? CONFIDENCE_META[entry.selfConfidence] : null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, width: "min(560px, 100%)", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ position: "relative", height: 160, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          {standard && <img src={caseImagePath(standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(13,20,35,.6)", color: COLORS.white, border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{standard}</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px 0" }}>{entry.caseTitle}</h2>

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
            {entry.released && entry.grade !== null && entry.grade !== undefined && (
              <div style={{ background: COLORS.gold, color: COLORS.textDark, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                {GRADE_LABELS[entry.grade]}
              </div>
            )}
          </div>

          {entry.released && entry.feedback && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Teacher Feedback</div>
              <div style={{ background: COLORS.tealSoft, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5 }}>{entry.feedback}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProgressClient({ student, missions }) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  // Same three-way split the old Progress page used (a graded mission
  // never also shows as "needs a revision" in the UI, even if both flags
  // were somehow true) — just now used to sort missions into two zones on
  // one page instead of three inline states on one list.
  const needsAttention = missions.filter((m) => !(m.released && m.grade !== null && m.grade !== undefined));
  const finished = missions.filter((m) => m.released && m.grade !== null && m.grade !== undefined);

  return (
    <div
      style={{
        minHeight: "100vh",
        // "contain" + a matching background-color so the books/crystals
        // near the edges never get cropped on a screen with a different
        // aspect ratio than the source image.
        backgroundImage: "url(/student/progress_background.jpg)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#EFEBFA",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
        display: "flex",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.14); }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
            ...glassCard,
            borderRadius: 20,
            padding: "14px 20px",
            boxShadow: "0 4px 16px rgba(0,0,0,.08)",
          }}
        >
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 30, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>
              My Progress
            </h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 15 }}>
              {missions.length === 0 ? "Missions you've turned in will show up here" : `${missions.length} mission${missions.length === 1 ? "" : "s"} turned in`}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px 6px 6px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14 }}>
            <img src="/icons/crystal_points.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            {student.crystal_points}
          </div>
        </div>

        {missions.length === 0 ? (
          <div style={{ ...glassCard, borderRadius: 20, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
            <p style={{ margin: "0 0 14px 0" }}>You haven't turned in any missions yet.</p>
            <button onClick={() => router.push("/missions")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14 }}>
              Go to My Missions →
            </button>
          </div>
        ) : (
          <>
            {/* TOP HALF — needs your attention: waiting on the teacher, or
                sent back for another try. Full-size rows, since these are
                the ones a student actually needs to act on or check. */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 12px 4px" }}>
                Needs Your Attention
              </p>
              {needsAttention.length === 0 ? (
                <div style={{ ...glassCard, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 13.5 }}>
                  Nothing waiting on you right now — nice work! 🎉
                </div>
              ) : (
                <div style={{ display: "grid", gap: 14 }}>
                  {needsAttention.map((m) => (
                    <div key={m.id} style={{ ...glassCard, borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,.08)", overflow: "hidden", display: "flex", gap: 16, padding: 16 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: COLORS.cream }}>
                        <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.textDark }}>{m.caseTitle}</div>
                            <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                              {m.caseStandard ? `${m.caseStandard} · ` : ""}Turned in {new Date(m.submittedAt).toLocaleDateString()}
                            </div>
                          </div>
                          {m.revisionRequested ? (
                            <span style={{ fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: "#FFF4E5", color: "#B8860B", whiteSpace: "nowrap" }}>
                              🔁 Try Again
                            </span>
                          ) : (
                            <span style={{ fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: COLORS.cream, color: COLORS.textMuted, whiteSpace: "nowrap" }}>
                              Waiting for your teacher
                            </span>
                          )}
                        </div>
                        {m.feedback && (
                          <div style={{ marginTop: 10, background: COLORS.cream, borderRadius: 10, padding: "10px 12px" }}>
                            <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 3 }}>Note from your teacher</div>
                            <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.45 }}>{m.feedback}</div>
                          </div>
                        )}
                        {m.revisionRequested && (
                          <button
                            type="button"
                            onClick={() => router.push(`/activity/${m.assignmentId}`)}
                            className="gc-btn"
                            style={{ marginTop: 10, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13 }}
                          >
                            Continue Mission →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BOTTOM HALF — finished & graded, i.e. the old My Notebook.
                Smaller tiles since these don't need action anymore; click
                one to reopen the fuller case-file view. */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 12px 4px" }}>
                Finished &amp; Graded
              </p>
              {finished.length === 0 ? (
                <div style={{ ...glassCard, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 13.5 }}>
                  Graded missions will show up here as case files you can revisit anytime.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                  {finished.map((m) => {
                    const meta = GRADE_META[m.grade];
                    const confMeta = m.selfConfidence ? CONFIDENCE_META[m.selfConfidence] : null;
                    return (
                      <div key={m.id} className="gc-card" onClick={() => setSelected(m)} style={{ ...glassCard, borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.08)", cursor: "pointer", transition: "transform 150ms ease, box-shadow 150ms ease" }}>
                        <div style={{ position: "relative", height: 80 }}>
                          <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          {m.isNewGrade && (
                            <span style={{ position: "absolute", top: 6, left: 6, fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: "#E4574C", color: COLORS.white }}>
                              NEW
                            </span>
                          )}
                          {meta && (
                            <div style={{ position: "absolute", top: 6, right: 6, background: COLORS.gold, color: COLORS.textDark, borderRadius: 999, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>
                              {meta.emoji}
                            </div>
                          )}
                        </div>
                        <div style={{ padding: 10 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, lineHeight: 1.3, color: COLORS.textDark }}>{m.caseTitle}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: COLORS.textMuted }}>
                            <span>{new Date(m.submittedAt).toLocaleDateString()}</span>
                            {confMeta && <span>{confMeta.emoji}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <DetailModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
