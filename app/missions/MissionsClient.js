"use client";

import React, { useState, useEffect } from "react";
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

// Every real engine needs an entry here or it silently falls through to
// "GROUP CHAT" — that's exactly the bug Mission Map hit on Aug 30 (its
// cases rendered as "SCIENCE · GROUP CHAT" until this map got a
// "mission_map" entry). Add new engines here the moment they go live.
const ENGINE_LABELS = {
  fact_check_desk: "SIGNAL CHECK",
  mission_map: "MISSION MAP",
};
function engineTag(engine) {
  return ENGINE_LABELS[engine] || "GROUP CHAT";
}

// Most engines' badge just inherits the subject's ring color (green/gold) —
// no visual change there. An engine can override that with its own accent
// here when it should read as visually distinct from a same-subject Group
// Chat/Signal Check card — Mission Map gets blue, per Emily's Aug 30 call.
const ENGINE_ACCENT_COLORS = {
  mission_map: "#3B82F6",
};
function engineAccentColor(engine, subject) {
  return ENGINE_ACCENT_COLORS[engine] || subjectRingColor(subject);
}

// Floating-pedestal scene (Aug 27) — replaces the old scrolling card grid.
// Up to 4 missions sit on the fixed pedestals baked into the background art;
// any pedestal with no assigned mission dims to gray. Anything past 5 lists
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

  // Second pass (Aug 27, later the same day): Emily wanted 5 distinct
  // missions on screen at once (4 pedestals + the center dais), not 4 —
  // the original version put the soonest-due mission's own card in BOTH
  // its pedestal AND the center dais, so only 4 unique missions were ever
  // visible even though 5 slots existed. Now the top 5 soonest-due missions
  // fill all 5 slots with no repeats, and clicking a pedestal swaps its
  // mission with whatever's currently in the center — a real exchange, not
  // a copy — so the center dais never shows a mission that's also still
  // sitting on a pedestal. Anything beyond the top 5 goes to the overflow
  // strip (was top 4 before).
  const topFive = sorted.slice(0, 5);
  const overflow = sorted.slice(5);
  const idsKey = topFive.map((m) => m.id).join(",");

  const [pedestalIds, setPedestalIds] = useState(() => SLOTS.map((_, i) => topFive[i]?.id ?? null));
  const [centerId, setCenterId] = useState(() => (topFive[4] ?? topFive[0])?.id ?? null);

  // If the underlying mission list changes shape (a new mission assigned, one
  // completed and dropped off, etc.), re-deal fresh so we don't keep pointing
  // at ids that no longer exist — same "soonest due first" intent as before,
  // just re-applied whenever the real data actually changes.
  useEffect(() => {
    setPedestalIds(SLOTS.map((_, i) => topFive[i]?.id ?? null));
    setCenterId((topFive[4] ?? topFive[0])?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  const onPedestals = pedestalIds.map((id) => sorted.find((m) => m.id === id) || null);
  const selected = sorted.find((m) => m.id === centerId) || null;

  function handlePedestalClick(slotIndex) {
    const clickedId = pedestalIds[slotIndex];
    if (clickedId == null) return;
    setPedestalIds((prev) => {
      const next = [...prev];
      next[slotIndex] = centerId;
      return next;
    });
    setCenterId(clickedId);
  }

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

      {/* The big white title banner (My Missions / mission count / crystal
          pill) is gone as of Emily's Aug 27 request — she wanted the top of
          the scene clear so more of the art shows. What's left of it is
          just the crystal count, shrunk down into a small frosted pill in
          the top-right corner, matching the compact panel style Galaxy Hub
          already uses for the same info. */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(8px)",
          borderRadius: 999,
          padding: "8px 16px 8px 10px",
          boxShadow: "0 4px 14px rgba(0,0,0,.15)",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        <img src="/icons/crystal_points.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
        {student.crystal_points}
      </div>

      {/* The mission bay scene — a fixed full-viewport overlay so the
          pedestals/dais stay glued to the same spots on the fixed
          background above regardless of scroll (there's no scroll on this
          page — same no-scroll 100vh approach as Home). */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1 }}>
          {SLOTS.map((slot, slotIndex) => {
            const mission = onPedestals[slotIndex];
            // Bumped up from 112/56 (Aug 27, later the same day) — Emily
            // wanted the side tiles big enough to read the whole title
            // without it getting cut off. Paired with the switch below from
            // one-line ellipsis truncation to a 2-line wrap, so a long title
            // like "What Made Texas Grow?" has room to actually finish.
            const cardW = Math.round(150 * slot.scale);
            const imgH = Math.round(74 * slot.scale);

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

            const ring = subjectRingColor(mission.cases?.subject);
            const shadow = `0 0 0 2.5px ${ring}, 0 8px 22px rgba(40,20,80,.18)`;

            return (
              <button
                key={slot.key}
                type="button"
                className="ped-btn"
                onClick={() => handlePedestalClick(slotIndex)}
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
                  <div style={{ padding: `${Math.round(7 * slot.scale)}px ${Math.round(10 * slot.scale)}px ${Math.round(9 * slot.scale)}px` }}>
                    <span style={{ display: "inline-block", fontSize: 8.5 + slot.scale, fontWeight: 700, letterSpacing: .3, padding: "2px 7px", borderRadius: 999, marginBottom: 4, background: `${ring}26`, color: ring }}>
                      {mission.cases?.subject ? mission.cases.subject.toUpperCase() : engineTag(mission.cases?.engine)}
                    </span>
                    {/* Full title, wrapped up to 2 lines, instead of a
                        single-line ellipsis truncation — Emily wanted to be
                        able to read the whole title on the tile itself
                        without it getting cut off. */}
                    <div style={{ fontWeight: 700, lineHeight: 1.25, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 12.5 + slot.scale, color: COLORS.textDark, textAlign: "left" }}>
                      {mission.cases?.title}
                    </div>
                    <div style={{ color: COLORS.textMuted, fontSize: 10 + slot.scale, textAlign: "left", marginTop: 2 }}>
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
                boxShadow: `0 0 0 3px ${engineAccentColor(selected.cases?.engine, selected.cases?.subject)}, 0 14px 40px rgba(40,20,80,.22)`,
                zIndex: 4,
              }}
            >
              <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
                <img src={caseImagePath(selected.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "12px 16px 16px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: .3, padding: "4px 11px", borderRadius: 999, background: `${engineAccentColor(selected.cases?.engine, selected.cases?.subject)}26`, color: engineAccentColor(selected.cases?.engine, selected.cases?.subject) }}>
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

      {/* Overflow — anything past the 5 slots (4 pedestals + center). Fixed to the bottom of
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
