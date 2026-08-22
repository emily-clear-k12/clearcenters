"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

const BADGE_TIERS = [
  { key: "explorer", label: "Explorer", threshold: 0, img: "/badges/explorer.jpg" },
  { key: "pathfinder", label: "Pathfinder", threshold: 50, img: "/badges/pathfinder.jpg" },
  { key: "crystal_thinker", label: "Crystal Thinker", threshold: 150, img: "/badges/crystal_thinker.jpg" },
  { key: "rising_star", label: "Rising Star", threshold: 300, img: "/badges/rising_star.jpg" },
  { key: "master", label: "Master", threshold: 500, img: "/badges/master.jpg" },
];

const NAV_ITEMS = [
  { label: "Home", icon: "/icons/nav_home.png", active: true },
  { label: "My Missions", icon: "/icons/nav_missions.png" },
  { label: "Progress", icon: "/icons/nav_progress.png" },
  { label: "Badges", icon: "/icons/nav_badges.png" },
  { label: "My Notebook", icon: "/icons/nav_notebook.png" },
  { label: "Gear Locker", icon: "/icons/nav_gear.png" },
];

function caseImagePath(standard) {
  return `/cases/${standard.replace(".", "-")}.jpg`;
}

export default function HomeClient({ student, studentClass, assignments, missionsCompleted }) {
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);

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

  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  const activeMission = assignments[0] || null;
  const upNext = assignments.slice(1, 3);
  const currentTierIndex = [...BADGE_TIERS].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = currentTierIndex >= 0 ? BADGE_TIERS[BADGE_TIERS.length - 1 - currentTierIndex] : BADGE_TIERS[0];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <aside style={{ width: 168, background: COLORS.navy, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 20, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
          <img src="/icons/crystal_logo.png" alt="" style={{ width: 24 }} />
          <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 14.5 }}>
            ClearCenters<span style={{ color: COLORS.gold }}> HQ</span>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              style={{
                display: "flex", alignItems: "center", gap: 11, height: 46, padding: "0 10px", borderRadius: 12,
                background: item.active ? COLORS.deepNavy : "transparent",
                boxShadow: item.active ? `inset 3px 0 0 ${COLORS.gold}` : "none",
                color: item.active ? COLORS.white : "rgba(255,255,255,.75)",
                fontWeight: 600, fontSize: 13, width: "100%", textAlign: "left", border: "none", cursor: "pointer",
              }}
            >
              <img src={item.icon} alt="" style={{ width: 21, height: 21, objectFit: "contain" }} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout} className="gc-btn" style={{ width: "100%", background: "rgba(255,255,255,.08)", color: COLORS.white, borderRadius: 10, padding: "9px 10px", fontWeight: 600, fontSize: 12.5 }}>
            Log Out
          </button>
        </div>
      </aside>

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
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px 6px 6px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14 }}>
            <img src="/icons/crystal_points.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            {student.crystal_points}
          </div>
        </div>

        {activeMission ? (
          <div style={{ position: "relative", background: COLORS.white, borderRadius: 20, boxShadow: "0 4px 16px rgba(0,0,0,.1)", padding: 24, display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, marginBottom: 24 }}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 18px rgba(13,27,42,.18)" }}>
              <img src={caseImagePath(activeMission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div>
              <span style={{ display: "inline-flex", background: COLORS.violetSoft, color: COLORS.violet, fontSize: 12, fontWeight: 700, letterSpacing: .3, padding: "5px 12px", borderRadius: 999, marginBottom: 10 }}>
                YOUR ACTIVE MISSION · GROUP CHAT
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>{activeMission.cases?.title}</h2>
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 20px 0" }}>
                {activeMission.case_standard}{activeMission.due_date ? ` · Due ${activeMission.due_date}` : ""}
              </p>
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
                <div key={a.id} style={{ position: "relative", height: 80, borderRadius: 14, overflow: "hidden", marginBottom: 10, cursor: "pointer" }}>
                  <img src={caseImagePath(a.case_standard)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,0) 35%, rgba(13,27,42,.82) 100%)" }} />
                  <div style={{ position: "absolute", left: 12, right: 12, bottom: 8, color: COLORS.white }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{a.cases?.title}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.85)" }}>{a.case_standard}</div>
                  </div>
                </div>
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
            {BADGE_TIERS.map((tier) => {
              const earned = student.crystal_points >= tier.threshold;
              const isCurrent = tier.key === currentTier.key;
              return (
                <div key={tier.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 92, position: "relative" }}>
                  {isCurrent && (
                    <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 78, height: 78, borderRadius: "50%", boxShadow: `0 0 0 3px ${COLORS.gold}` }} />
                  )}
                  <img src={tier.img} alt="" style={{ width: 68, height: 68, objectFit: "contain", borderRadius: 12, opacity: earned ? 1 : 0.28, filter: earned ? "none" : "grayscale(1)" }} />
                  <div style={{ fontSize: 12.5, fontWeight: 700, textAlign: "center", color: earned ? COLORS.textDark : COLORS.textMuted }}>
                    {tier.label}{!earned ? " · Locked" : ""}
                  </div>
                </div>
              );
            })}
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
