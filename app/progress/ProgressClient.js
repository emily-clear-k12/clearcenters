"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../../components/StudentSidebar";

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

function caseImagePath(standard) {
  if (!standard) return "/icons/crystal_points.png";
  return `/cases/${standard.replace(".", "-")}.jpg`;
}

export default function ProgressClient({ student, missions }) {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
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
          <div style={{ background: COLORS.white, borderRadius: 20, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
            <p style={{ margin: "0 0 14px 0" }}>You haven't turned in any missions yet.</p>
            <button onClick={() => router.push("/missions")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14 }}>
              Go to My Missions →
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {missions.map((m) => {
              const meta = m.released && m.grade !== null && m.grade !== undefined ? GRADE_META[m.grade] : null;
              return (
                <div key={m.id} style={{ background: COLORS.white, borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,.08)", overflow: "hidden", display: "flex", gap: 16, padding: 16 }}>
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
                      {meta ? (
                        <span style={{ fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: meta.bg, color: meta.color, whiteSpace: "nowrap" }}>
                          {meta.emoji} {meta.label}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: COLORS.cream, color: COLORS.textMuted, whiteSpace: "nowrap" }}>
                          Waiting for your teacher
                        </span>
                      )}
                    </div>
                    {meta && m.feedback && (
                      <div style={{ marginTop: 10, background: COLORS.cream, borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 3 }}>Note from your teacher</div>
                        <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.45 }}>{m.feedback}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
