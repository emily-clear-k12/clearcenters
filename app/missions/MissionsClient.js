"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../../components/StudentSidebar";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

export default function MissionsClient({ student, assignments }) {
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);

  // Sort by due date so the most time-sensitive missions show first;
  // anything without a due date sorts to the end. This is a display-only
  // sort for this page — it does not touch the order Home uses to pick
  // its "Active Mission" / "Up Next" cards.
  const sorted = [...assignments].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date) - new Date(b.due_date);
  });

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .mission-card:hover { box-shadow: 0 10px 24px rgba(13,27,42,.18) !important; }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 30, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>
              My Missions
            </h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 15 }}>
              {sorted.length} mission{sorted.length === 1 ? "" : "s"} assigned to you · work through them in any order
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px 6px 6px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14 }}>
            <img src="/icons/crystal_points.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            {student.crystal_points}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div style={{ background: COLORS.white, borderRadius: 20, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
            No missions assigned yet — check back once your teacher assigns one!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {sorted.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => router.push(`/activity/${a.id}`)}
                className="gc-btn mission-card"
                style={{ display: "block", width: "100%", textAlign: "left", background: COLORS.white, borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,.08)", overflow: "hidden", padding: 0, border: "none", cursor: "pointer", font: "inherit", color: "inherit" }}
              >
                <div style={{ height: 130, overflow: "hidden", position: "relative" }}>
                  <img src={caseImagePath(a.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {a.revisionRequested && (
                    <div title="Sent back for revision" style={{ position: "absolute", top: 8, left: 8, width: 32, height: 32, borderRadius: "50%", background: COLORS.gold, boxShadow: "0 2px 8px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
                      ⭐
                    </div>
                  )}
                </div>
                <div style={{ padding: 16 }}>
                  <span style={{ display: "inline-flex", background: a.cases?.engine === "fact_check_desk" ? COLORS.tealSoft : COLORS.violetSoft, color: a.cases?.engine === "fact_check_desk" ? COLORS.teal : COLORS.violet, fontSize: 11, fontWeight: 700, letterSpacing: .3, padding: "4px 10px", borderRadius: 999, marginBottom: 8 }}>
                    {a.cases?.engine === "fact_check_desk" ? "SIGNAL CHECK" : "GROUP CHAT"}
                  </span>
                  {a.revisionRequested && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#FFF4E5", color: "#B8860B", fontSize: 11, fontWeight: 700, letterSpacing: .3, padding: "4px 10px", borderRadius: 999, marginBottom: 8, marginLeft: 6 }}>
                      🔁 Try Again
                    </span>
                  )}
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2, color: COLORS.textDark }}>{a.cases?.title}</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: a.cases?.learning_target ? 8 : 14 }}>
                    {a.case_standard}{a.due_date ? ` · Due ${a.due_date}` : ""}
                  </div>
                  {a.cases?.learning_target && (
                    <div style={{ fontSize: 12, color: COLORS.textDark, background: COLORS.tealSoft, borderRadius: 10, padding: "8px 10px", marginBottom: 14, lineHeight: 1.4 }}>
                      🎯 {a.cases.learning_target}
                    </div>
                  )}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.violet, fontWeight: 700, fontSize: 13.5 }}>
                    Open Mission →
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <button
        type="button"
        onClick={() => setSamOpen(!samOpen)}
        style={{ position: "fixed", right: 28, bottom: 28, width: 64, height: 64, borderRadius: "50%", background: COLORS.tealSoft, boxShadow: "0 8px 24px rgba(0,0,0,.12)", border: "none", cursor: "pointer", padding: 6 }}
      >
        <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </button>
      {samOpen && (
        <div style={{ position: "fixed", right: 28, bottom: 104, width: 240, background: COLORS.white, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.12)", padding: 16 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 4px 0" }}>
            S.A.M. <span style={{ color: COLORS.teal }}>· Smart Assistant for Missions</span>
          </p>
          <p style={{ fontSize: 12.5, color: COLORS.textDark, margin: 0, lineHeight: 1.45 }}>
            Click me anytime you're working on a mission and need a hint!
          </p>
        </div>
      )}
    </div>
  );
}
