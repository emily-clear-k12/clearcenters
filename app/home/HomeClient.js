"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../../components/StudentSidebar";

const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  success: "#22C55E",
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

export default function HomeClient({ student, studentClass, assignments, missionsCompleted, badgeTiers }) {
  // Badge tiers are teacher-editable (see /teacher/badges) and loaded from
  // the database by the server component; this is just a safety net in
  // case that table is ever empty.
  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    fetch("/api/student/notifications")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setNotif(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function fitStatNumbers() {
      document.querySelectorAll(".stat-card-img").forEach((card) => {
        const num = card.querySelector(".num");
        if (!num) return;
        const circleDiameter = card.offsetWidth * 0.251;
        const maxWidth = circleDiameter * 0.72;
        const maxHeight = circleDiameter * 0.6;
        let fontSize = circleDiameter * 0.5;
        num.style.fontSize = fontSize + "px";
        let guard = 0;
        while ((num.scrollWidth > maxWidth || num.scrollHeight > maxHeight) && fontSize > 8 && guard < 60) {
          fontSize -= 1;
          num.style.fontSize = fontSize + "px";
          guard++;
        }
      });
    }
    fitStatNumbers();
    window.addEventListener("resize", fitStatNumbers);
    return () => window.removeEventListener("resize", fitStatNumbers);
  }, [student.crystal_points, student.streak_days, missionsCompleted]);

  const activeMission = assignments[0] || null;
  const upNext = assignments.slice(1, 3);
  const currentTierIndex = [...tiers].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = tiers.length > 0 ? (currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : tiers[0]) : null;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <StudentSidebar />

      <main style={{ flex: 1, padding: 24, maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 30, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>
              Welcome back, {student.first_name}!
            </h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 15 }}>
              {studentClass?.name ? `${studentClass.name} · ` : ""}What mission will you tackle today?
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {student.streak_days > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🔥</span>
                {student.streak_days} day{student.streak_days === 1 ? "" : "s"}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px 6px 6px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14 }}>
              <img src="/icons/crystal_points.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
              {student.crystal_points}
            </div>
          </div>
        </div>

        {notif && notif.count > 0 && (
          <button
            type="button"
            onClick={() => router.push("/progress")}
            className="gc-btn"
            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "#FFF4E5", border: `1.5px solid ${COLORS.gold}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }}>{notif.revisionCount > 0 ? "🔁" : "🌟"}</span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: "#8A5A00", lineHeight: 1.4 }}>
              {notif.revisionCount > 0 && notif.newGradeCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try, and you have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting!`
                : notif.revisionCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try — see what your teacher said.`
                : `You have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting in My Progress!`}
            </span>
            <span style={{ color: "#8A5A00", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>View →</span>
          </button>
        )}

        {activeMission ? (
          <div style={{ position: "relative", background: COLORS.white, borderRadius: 20, boxShadow: "0 4px 16px rgba(0,0,0,.1)", padding: 24, display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, marginBottom: 24 }}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 18px rgba(13,27,42,.18)" }}>
              <img src={caseImagePath(activeMission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div>
              <span style={{ display: "inline-flex", background: activeMission.cases?.engine === "fact_check_desk" ? COLORS.tealSoft : COLORS.violetSoft, color: activeMission.cases?.engine === "fact_check_desk" ? COLORS.teal : COLORS.violet, fontSize: 12, fontWeight: 700, letterSpacing: .3, padding: "5px 12px", borderRadius: 999, marginBottom: 10 }}>
                YOUR ACTIVE MISSION · {activeMission.cases?.engine === "fact_check_desk" ? "SIGNAL CHECK" : "GROUP CHAT"}
              </span>
              {activeMission.revisionRequested && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#FFF4E5", color: "#B8860B", fontSize: 12, fontWeight: 700, letterSpacing: .3, padding: "5px 12px", borderRadius: 999, marginBottom: 10, marginLeft: 8 }}>
                  🔁 Your teacher asked for a revision
                </span>
              )}
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>{activeMission.cases?.title}</h2>
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: activeMission.cases?.learning_target ? "0 0 10px 0" : "0 0 20px 0" }}>
                {activeMission.case_standard}{activeMission.due_date ? ` · Due ${activeMission.due_date}` : ""}
              </p>
              {activeMission.cases?.learning_target && (
                <div style={{ fontSize: 13.5, color: COLORS.textDark, background: COLORS.tealSoft, borderRadius: 12, padding: "10px 12px", marginBottom: 20, lineHeight: 1.5 }}>
                  🎯 {activeMission.cases.learning_target}
                </div>
              )}
              <button onClick={() => router.push(`/activity/${activeMission.id}`)} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "12px 22px", fontWeight: 700, fontSize: 15 }}>
                Continue Mission →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: COLORS.white, borderRadius: 20, padding: 32, textAlign: "center", color: COLORS.textMuted, marginBottom: 24 }}>
            No missions assigned yet — check back once your teacher assigns one!
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.08)", padding: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", margin: "0 0 12px 0" }}>Up Next</p>
            {upNext.length > 0 ? (
              upNext.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => router.push(`/activity/${a.id}`)}
                  className="gc-btn"
                  style={{ position: "relative", display: "block", width: "100%", height: 80, borderRadius: 14, overflow: "hidden", marginBottom: 10, cursor: "pointer", border: "none", padding: 0, background: "none", textAlign: "left", font: "inherit" }}
                >
                  <img src={caseImagePath(a.case_standard)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,0) 35%, rgba(13,27,42,.82) 100%)" }} />
                  <div style={{ position: "absolute", left: 12, right: 12, bottom: 8, color: COLORS.white }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{a.cases?.title}{a.revisionRequested ? " 🔁" : ""}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.85)" }}>{a.case_standard}</div>
                  </div>
                </button>
              ))
            ) : (
              <p style={{ fontSize: 13, color: COLORS.textMuted }}>Nothing else assigned yet.</p>
            )}
          </div>

          <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.08)", padding: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", margin: "0 0 12px 0" }}>Your Progress</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="stat-card-img" style={{ position: "relative", paddingTop: "56.28%", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.1)" }}>
                <img src="/icons/stat_missions_completed.jpg" alt="Missions Completed" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="num" style={{ position: "absolute", left: "49.9%", top: "35.8%", transform: "translate(-50%, -50%)", fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: COLORS.textDark }}>{missionsCompleted}</div>
              </div>
              <div className="stat-card-img" style={{ position: "relative", paddingTop: "56.28%", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.1)" }}>
                <img src="/icons/stat_crystal_points.jpg" alt="Crystal Points" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="num" style={{ position: "absolute", left: "49.9%", top: "35.8%", transform: "translate(-50%, -50%)", fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: COLORS.textDark }}>{student.crystal_points}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.08)", padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", margin: 0 }}>Your Badges</p>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {tiers.map((tier) => {
              const earned = student.crystal_points >= tier.threshold;
              const isCurrent = currentTier && tier.id === currentTier.id;
              return (
                <div key={tier.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 92, position: "relative" }}>
                  {isCurrent && (
                    <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 78, height: 78, borderRadius: "50%", boxShadow: `0 0 0 3px ${COLORS.gold}` }} />
                  )}
                  <img src={tier.image_path} alt="" style={{ width: 68, height: 68, objectFit: "contain", borderRadius: 12, opacity: earned ? 1 : 0.28, filter: earned ? "none" : "grayscale(1)" }} />
                  <div style={{ fontSize: 12.5, fontWeight: 700, textAlign: "center", color: earned ? COLORS.textDark : COLORS.textMuted }}>
                    {tier.label}{!earned ? " · Locked" : ""}
                  </div>
                </div>
              );
            })}
            {tiers.length === 0 && (
              <p style={{ fontSize: 13, color: COLORS.textMuted }}>Badges aren't set up yet — check back soon!</p>
            )}
          </div>
        </div>
      </main>

      <button
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
