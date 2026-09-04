"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// Bright per-subject outline on the mission cards so a student can tell
// what subject an assignment is at a glance, without reading the standard
// code — Emily's request (Aug 27). Cases without a recognized subject (or
// with subject not yet selected by the data layer) fall back to the same
// soft blue ring the cards originally shipped with, so nothing looks
// broken if a new subject shows up before it has a color here.
const SUBJECT_RING_COLORS = {
  "Science": "#39D97A",
  "Social Studies": "#FFDD40",
};
const DEFAULT_RING_COLOR = "#8FA4FF";

function subjectRingColor(subject) {
  return SUBJECT_RING_COLORS[subject] || DEFAULT_RING_COLOR;
}

// Home is now the "hub" — a single full-viewport sci-fi stage (spaceship
// interior background) with the Active Mission + Up Next centered on it,
// and three glowing orb "portals" standing in for the old sidebar's nav
// links. Everything here is absolutely positioned against a fixed-height
// stage (rather than the old scrolling flex layout) on purpose, so the
// portals always line up with the glowing floor rings baked into the
// background art, and so the whole thing fits on one screen with no
// scrolling — that was the point of the redesign.
export default function HomeClient({ student, studentClass, assignments, missionsCompleted, badgeTiers, homeBackground }) {
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);
  const [notif, setNotif] = useState(null);

  // Added Sept 1, 2026 — Home is the hub every student lands on and the one
  // real nav screen that doesn't render the shared BackToHubButton (see that
  // file for the matching Log Out pill added there), so it needs its own
  // way to log out rather than relying on it existing somewhere else.
  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  useEffect(() => {
    fetch("/api/student/notifications")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setNotif(data); })
      .catch(() => {});
  }, []);

  const activeMission = assignments[0] || null;
  const upNext = assignments.slice(1, 3);

  // Just enough badge logic to show the student's CURRENT tier icon next to
  // their name in the header tile (Aug 27) — the full badge collection with
  // earned/locked state for every tier lives on its own /badges page.
  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const currentTierIndex = [...tiers].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = tiers.length > 0 ? (currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : tiers[0]) : null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // Sept 4, 2026: one of 6 backgrounds, picked at random per login by
        // student-login/route.js and passed down through page.js — see
        // lib/homeBackgrounds.js. Falls back to the original single image
        // if the prop is ever missing (shouldn't happen, page.js always
        // resolves one, but a safe default costs nothing).
        backgroundImage: `url(${homeBackground || "/student/hub_background.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        @keyframes hub-floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .hub-portal { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; font-family: inherit; width: 130px; }
        .hub-orb-wrap { position: relative; width: 104px; height: 104px; transition: transform 220ms ease, filter 220ms ease; filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)); }
        .hub-orb-wrap img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .hub-portal:hover .hub-orb-wrap { transform: scale(1.1) translateY(-4px); }
        .hub-portal--missions:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #7B5DFF); }
        .hub-portal--progress:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #00C2C7); }
        .hub-portal--crystal:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #FFC44D); }
      `}</style>

      {/* Header — a compact, more-square stat tile in the top-left corner
          (Aug 27) rather than the old full-width bar. Welcome + name +
          current badge on one line, class underneath, then streak / missions
          completed / crystal points stacked as simple rows below — all the
          identity + stats info consolidated into one tile instead of spread
          across a wide bar with pills floating on the right. */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 20,
          width: 232,
          background: "rgba(255,255,255,.68)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 20,
          padding: "16px 18px",
          boxShadow: "0 4px 16px rgba(0,0,0,.1)",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          {currentTier && (
            <img
              src={`/badges/transparent/${currentTier.tier_key}.png`}
              alt={currentTier.label}
              title={currentTier.label}
              // Falls back to the original (square, light-gray-background)
              // badge art if a tier ever shows up without a matching
              // background-removed version in /badges/transparent/ — e.g. a
              // brand-new tier a teacher adds later. Everyday case is the
              // transparent version loads fine and this never fires.
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = currentTier.image_path; }}
              style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }}
            />
          )}
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16.5, fontWeight: 700, margin: 0, color: COLORS.textDark, lineHeight: 1.25 }}>
            Welcome back, {student.first_name}!
          </h1>
        </div>
        {studentClass?.name && (
          <p style={{ margin: "0 0 10px 0", color: COLORS.textMuted, fontSize: 12 }}>{studentClass.name}</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {student.streak_days > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
              <span style={{ fontSize: 14 }}>🔥</span> {student.streak_days} day{student.streak_days === 1 ? "" : "s"}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
            <span style={{ fontSize: 14 }}>🎯</span> {missionsCompleted} mission{missionsCompleted === 1 ? "" : "s"} completed
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
            <img src="/icons/crystal_points_gold.png" alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
            {student.crystal_points}
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="gc-btn"
          style={{ marginTop: 10, background: "none", color: COLORS.textMuted, fontSize: 11.5, fontWeight: 600, padding: 0, textDecoration: "underline" }}
        >
          Log Out
        </button>
      </div>

      {/* Centered column: notification (if any) + Active Mission + Up Next */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(660px, 54%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
        }}
      >
        {notif && notif.count > 0 && (
          <button
            type="button"
            onClick={() => router.push("/progress")}
            className="gc-btn"
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
              background: "rgba(255,244,229,.92)", border: `1.5px solid ${COLORS.gold}`, borderRadius: 14,
              padding: "10px 14px", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{notif.revisionCount > 0 ? "🔁" : "🌟"}</span>
            <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: "#8A5A00", lineHeight: 1.35 }}>
              {notif.revisionCount > 0 && notif.newGradeCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try, and you have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting!`
                : notif.revisionCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try — see what your teacher said.`
                : `You have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting in My Progress!`}
            </span>
            <span style={{ color: "#8A5A00", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>View →</span>
          </button>
        )}

        {activeMission ? (
          <div
            style={{
              position: "relative", width: "100%", background: "rgba(20,26,50,.42)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 18,
              padding: "16px 18px",
              boxShadow: `0 0 0 2.5px ${subjectRingColor(activeMission.cases?.subject)}, 0 0 22px ${subjectRingColor(activeMission.cases?.subject)}77, 0 10px 30px rgba(0,10,40,.35)`,
              animation: "hub-floaty 5s ease-in-out infinite",
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 9, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", background: "rgba(123,93,255,.35)", color: "#E4DBFF", fontSize: 10, fontWeight: 700, letterSpacing: .4, padding: "4px 11px", borderRadius: 999 }}>
                YOUR ACTIVE MISSION · {activeMission.cases?.engine === "fact_check_desk" ? "SIGNAL CHECK" : activeMission.cases?.engine === "mission_map" ? "MISSION MAP" : "GROUP CHAT"}
              </span>
              {activeMission.revisionRequested && (
                <span style={{ display: "inline-flex", background: "rgba(255,196,77,.3)", color: "#FFE7B0", fontSize: 10, fontWeight: 700, letterSpacing: .4, padding: "4px 11px", borderRadius: 999 }}>
                  🔁 Revision requested
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div style={{ width: 68, height: 68, borderRadius: 13, flexShrink: 0, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.25)" }}>
                <img src={caseImagePath(activeMission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15.5, margin: "0 0 3px 0", color: COLORS.white }}>{activeMission.cases?.title}</p>
                <p style={{ fontSize: 11.5, color: "#C9D2EE", margin: "0 0 9px 0" }}>
                  {activeMission.case_standard}{activeMission.due_date ? ` · Due ${activeMission.due_date}` : ""}
                </p>
                <button onClick={() => router.push(`/activity/${activeMission.id}`)} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12 }}>
                  Continue Mission →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", background: "rgba(20,26,50,.42)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 18, padding: "22px 18px", textAlign: "center", color: "#C9D2EE", fontSize: 13 }}>
            No missions assigned yet — check back once your teacher assigns one!
          </div>
        )}

        {upNext.length > 0 && (
          <>
            <span style={{ alignSelf: "flex-start", fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: "#EDEBFF", textShadow: "0 1px 6px rgba(0,0,0,.5)", marginLeft: 4 }}>
              Up Next
            </span>
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              {upNext.map((a) => {
                const ring = subjectRingColor(a.cases?.subject);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => router.push(`/activity/${a.id}`)}
                    className="gc-btn"
                    style={{
                      position: "relative", flex: 1, height: 62, borderRadius: 13, overflow: "hidden",
                      background: "rgba(20,26,50,.42)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                      boxShadow: `0 0 0 2px ${ring}, 0 0 14px ${ring}66, 0 6px 18px rgba(0,10,40,.3)`,
                      display: "flex", alignItems: "center", gap: 10, padding: "0 12px", border: "none", textAlign: "left", font: "inherit",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: ring, flexShrink: 0, boxShadow: `0 0 8px ${ring}` }} />
                    <span style={{ color: COLORS.white, minWidth: 0 }}>
                      <span style={{ display: "block", fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {a.cases?.title}{a.revisionRequested ? " 🔁" : ""}
                      </span>
                      <span style={{ display: "block", fontSize: 10.5, color: "#C9D2EE" }}>{a.case_standard}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Portals — the three "screens" a student can navigate to */}
      <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 64, zIndex: 4 }}>
        <button type="button" className="hub-portal hub-portal--missions" onClick={() => router.push("/missions")}>
          <div className="hub-orb-wrap"><img src="/student/orb_missions.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>My Missions</span>
        </button>
        <button type="button" className="hub-portal hub-portal--progress" onClick={() => router.push("/progress")}>
          <div className="hub-orb-wrap"><img src="/student/orb_progress.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>My Progress</span>
        </button>
        <button type="button" className="hub-portal hub-portal--crystal" onClick={() => router.push("/gear-locker")}>
          <div className="hub-orb-wrap"><img src="/student/orb_crystal.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>Galaxy Hub</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setSamOpen(!samOpen)}
        style={{ position: "absolute", right: 26, bottom: 26, width: 58, height: 58, borderRadius: "50%", background: "rgba(255,255,255,.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", boxShadow: "0 8px 22px rgba(0,0,0,.2)", border: "none", cursor: "pointer", padding: 6, zIndex: 5 }}
      >
        <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </button>
      {samOpen && (
        <div style={{ position: "absolute", right: 26, bottom: 92, width: 240, background: COLORS.white, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.2)", padding: 16, zIndex: 5 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 4px 0" }}>
            S.A.M. <span style={{ color: COLORS.teal }}>· ClearCenters Assistant for Missions</span>
          </p>
          <p style={{ fontSize: 12.5, color: COLORS.textDark, margin: 0, lineHeight: 1.45 }}>
            Click me anytime you're working on a mission and need a hint!
          </p>
        </div>
      )}
    </div>
  );
}
