"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";

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
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// Same subject ring colors as Home's mission cards (see HomeClient.js) — kept
// byte-for-byte identical on purpose so a student sees the same green/gold
// coding for Science/Social Studies everywhere in the app. If a new subject
// ever needs a color, add it here AND in HomeClient.js together.
const SUBJECT_RING_COLORS = {
  "Science": "#39D97A",
  "Social Studies": "#FFDD40",
};
const DEFAULT_RING_COLOR = "#8FA4FF";

function subjectRingColor(subject) {
  return SUBJECT_RING_COLORS[subject] || DEFAULT_RING_COLOR;
}

function engineTag(engine) {
  return engine === "fact_check_desk" ? "SIGNAL CHECK" : "GROUP CHAT";
}

// Floating-pedestal scene (Aug 27) — replaces the old scrolling card grid.
// Up to 4 missions sit on the fixed pedestals baked into the background art;
// any pedestal with no assigned mission dims to gray. Anything past 4 lists
// in a scrollable strip below the scene. This is Emily's "blend 1 and 2"
// choice between showing everything on pedestals vs. a plain overflow list.
//
// Pedestal anchor points were read directly off the background image,
// as a percent of the full scene. Changed Aug 27 (full-screen pass) from
// percent-of-an-aspect-locked-box to percent-of-the-full-viewport, to match
// Emily's call to make this page fill the whole screen edge-to-edge like
// Home does, rather than sit in a bordered card on a lavender page. The
// trade-off, which Emily chose knowingly: on a browser window shaped very
// differently from the image's own 1672x941 ratio, the `cover`-cropped
// background can push these percentage spots slightly off the exact art
// they were tuned against — same trade-off Home already lives with.
const SLOTS = [
  { key: "back-left", x: 27, y: 50, scale: 0.82 },
  { key: "front-left", x: 15, y: 70, scale: 1.05 },
  { key: "back-right", x: 73, y: 50, scale: 0.82 },
  { key: "front-right", x: 84, y: 71, scale: 1.05 },
];
// Center dais — the raised platform in the middle of the scene where the
// currently-selected mission gets its bigger "hero" card.
const CENTER_SLOT = { x: 50, y: 63 };

export default function MissionsClient({ student, assignments }) {
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);

  // Soonest-due-first — the same display sort this page has always used.
  const sorted = [...assignments].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date) - new Date(b.due_date);
  });

  const onPedestals = sorted.slice(0, 4);
  const overflow = sorted.slice(4);

  const [selectedId, setSelectedId] = useState(onPedestals[0]?.id ?? null);
  const selected = onPedestals.find((a) => a.id === selectedId) || onPedestals[0] || null;

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: COLORS.cream,
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .ped-btn { transition: transform 150ms ease, filter 150ms ease; }
        .ped-btn:hover:not(.ped-empty) { transform: translate(-50%, -104%) !important; }
        .overflow-row::-webkit-scrollbar { height: 6px; }
        .overflow-row::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 999px; }
      `}</style>

      {/* Full-viewport fixed background (Aug 27 full-screen pass) — replaces
          the old aspect-ratio-locked "card" stage so this page fills the
          whole screen edge-to-edge like Home, per Emily's call. Everything
          below is positioned as a percent of the full viewport now, not of
          a locked-aspect box, so it can drift slightly from the art's exact
          pixels on an unusually-shaped window — the same trade-off Home
          already accepts. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <img
          src="/student/missions_hub_bg.jpg"
          alt="Mission bay"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <BackToHubButton />

      {/* Header bar — floats over the full-bleed art near the top, same
          spot it used to sit above the bordered stage card. */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 100,
          right: 20,
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(8px)",
          borderRadius: 20,
          padding: "14px 20px",
          boxShadow: "0 4px 16px rgba(0,0,0,.18)",
        }}
      >
        <div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>
            My Missions
          </h1>
          <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 13 }}>
            {sorted.length === 0
              ? "No missions assigned yet"
              : `${sorted.length} mission${sorted.length === 1 ? "" : "s"} assigned to you · choose one to launch`}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "6px 14px 6px 6px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
          <img src="/icons/crystal_points.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
          {student.crystal_points}
        </div>
      </div>

      {/* The mission bay scene — a fixed full-viewport overlay so the
          pedestals/dais stay glued to the same spots on the fixed
          background above regardless of scroll (there's no scroll on this
          page — same no-scroll 100vh approach as Home). */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1 }}>
          {SLOTS.map((slot, slotIndex) => {
            const mission = onPedestals[slotIndex];
            const cardW = Math.round(112 * slot.scale);
            const imgH = Math.round(56 * slot.scale);

            if (!mission) {
              // A translucent gray + dashed outline reads as "empty slot" at
              // a glance against this bright background — a plain low-opacity
              // white box (tried first) nearly vanished since there's no
              // image content left for a grayscale filter to desaturate.
              return (
                <div
                  key={slot.key}
                  style={{
                    position: "absolute",
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: "translate(-50%, -100%)",
                    width: cardW,
                    height: imgH + 40,
                    borderRadius: 14,
                    background: "rgba(90,95,120,.20)",
                    border: "2px dashed rgba(90,95,120,.32)",
                  }}
                />
              );
            }

            const isActive = mission.id === selectedId;
            const ring = subjectRingColor(mission.cases?.subject);
            const shadow = isActive
              ? `0 0 0 2.5px ${ring}, 0 0 0 6px rgba(123,93,255,.55), 0 10px 26px rgba(40,20,80,.28)`
              : `0 0 0 2.5px ${ring}, 0 8px 22px rgba(40,20,80,.18)`;

            return (
              <button
                key={mission.id}
                type="button"
                className="ped-btn"
                onClick={() => setSelectedId(mission.id)}
                style={{
                  position: "absolute",
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  transform: "translate(-50%, -100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "none",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                <div style={{ width: cardW, borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,.94)", boxShadow: shadow, display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: imgH }}>
                    <img src={caseImagePath(mission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    {mission.revisionRequested && (
                      <div title="Sent back for revision" style={{ position: "absolute", top: 4, left: 4, width: Math.round(18 * slot.scale), height: Math.round(18 * slot.scale), borderRadius: "50%", background: COLORS.gold, boxShadow: "0 2px 6px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(10 * slot.scale) }}>
                        ⭐
                      </div>
                    )}
                  </div>
                  <div style={{ padding: `${Math.round(6 * slot.scale)}px ${Math.round(8 * slot.scale)}px ${Math.round(8 * slot.scale)}px` }}>
                    <span style={{ display: "inline-block", fontSize: 8 + slot.scale, fontWeight: 700, letterSpacing: .3, padding: "2px 7px", borderRadius: 999, marginBottom: 3, background: `${ring}26`, color: ring }}>
                      {mission.cases?.subject ? mission.cases.subject.toUpperCase() : engineTag(mission.cases?.engine)}
                    </span>
                    <div style={{ fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 11 + slot.scale, color: COLORS.textDark, textAlign: "left" }}>
                      {mission.cases?.title}
                    </div>
                    <div style={{ color: COLORS.textMuted, fontSize: 9 + slot.scale, textAlign: "left" }}>
                      {mission.case_standard}
                    </div>
                  </div>
                </div>
                <div style={{ width: 3, height: 18 * slot.scale, marginTop: 4, background: "linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,0))" }} />
              </button>
            );
          })}

          {/* Center dais — the currently-selected mission's bigger detail card */}
          {selected ? (
            <div
              style={{
                position: "absolute",
                left: `${CENTER_SLOT.x}%`,
                top: `${CENTER_SLOT.y}%`,
                transform: "translate(-50%, -100%)",
                width: "23%",
                minWidth: 220,
                maxWidth: 300,
                borderRadius: 20,
                overflow: "hidden",
                background: "rgba(255,255,255,.96)",
                boxShadow: `0 0 0 3px ${subjectRingColor(selected.cases?.subject)}, 0 14px 40px rgba(40,20,80,.22)`,
                zIndex: 4,
              }}
            >
              <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
                <img src={caseImagePath(selected.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "12px 16px 16px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: .3, padding: "4px 11px", borderRadius: 999, background: `${subjectRingColor(selected.cases?.subject)}26`, color: subjectRingColor(selected.cases?.subject) }}>
                    {selected.cases?.subject ? selected.cases.subject.toUpperCase() : engineTag(selected.cases?.engine)} · {engineTag(selected.cases?.engine)}
                  </span>
                  {selected.revisionRequested && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#FFF4E5", color: "#B8860B", fontSize: 10.5, fontWeight: 700, letterSpacing: .3, padding: "4px 11px", borderRadius: 999 }}>
                      🔁 Try Again
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16.5, fontWeight: 700, margin: "0 0 3px 0", color: COLORS.textDark }}>{selected.cases?.title}</p>
                <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "0 0 10px 0" }}>
                  {selected.case_standard}{selected.due_date ? ` · Due ${selected.due_date}` : ""}
                </p>
                {selected.cases?.learning_target && (
                  <div style={{ fontSize: 11.5, color: COLORS.textDark, background: COLORS.tealSoft, borderRadius: 10, padding: "8px 10px", marginBottom: 12, lineHeight: 1.4 }}>
                    🎯 {selected.cases.learning_target}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => router.push(`/activity/${selected.id}`)}
                  className="gc-btn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: `linear-gradient(135deg, ${COLORS.violet}, #9B7DFF)`, color: COLORS.white, borderRadius: 999, padding: "10px 18px", fontWeight: 700, fontSize: 13 }}
                >
                  Launch Mission 🚀
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "30%",
                transform: "translateX(-50%)",
                width: 280,
                textAlign: "center",
                background: "rgba(255,255,255,.94)",
                borderRadius: 18,
                padding: "28px 20px",
                boxShadow: "0 10px 30px rgba(40,20,80,.18)",
              }}
            >
              <p style={{ color: COLORS.textMuted, fontSize: 13, margin: 0 }}>
                No missions assigned yet — check back once your teacher assigns one!
              </p>
            </div>
          )}
      </div>

      {/* Overflow — anything past the 4 pedestals. Fixed to the bottom of
          the viewport (Aug 27 full-screen pass) since this page no longer
          has a flowing `<main>` column for it to sit below — same no-scroll
          100vh page as Home, so this has to float instead of flow. */}
      {overflow.length > 0 && (
        <div style={{ position: "fixed", left: 24, right: 24, bottom: 20, zIndex: 2 }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.white, textShadow: "0 1px 4px rgba(0,0,0,.6)", textTransform: "uppercase", letterSpacing: .4, margin: "0 0 8px 4px" }}>
            +{overflow.length} more mission{overflow.length === 1 ? "" : "s"}
          </p>
          <div className="overflow-row" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6 }}>
              {overflow.map((mission) => {
                const ring = subjectRingColor(mission.cases?.subject);
                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => router.push(`/activity/${mission.id}`)}
                    className="gc-btn"
                    style={{
                      flexShrink: 0,
                      width: 220,
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      textAlign: "left",
                      background: COLORS.white,
                      borderRadius: 14,
                      padding: 10,
                      boxShadow: `0 0 0 2px ${ring}, 0 4px 14px rgba(0,0,0,.08)`,
                      border: "none",
                      font: "inherit",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ position: "relative", width: 40, height: 40, borderRadius: 9, overflow: "hidden", flexShrink: 0 }}>
                      <img src={caseImagePath(mission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {mission.revisionRequested && (
                        <div style={{ position: "absolute", top: 1, left: 1, width: 14, height: 14, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>⭐</div>
                      )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {mission.cases?.title}
                      </div>
                      <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{mission.case_standard}</div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

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
