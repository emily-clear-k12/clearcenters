"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";
import { CaseImage } from "../../lib/caseImage";
import SamIcon from "../../components/SamIcon";
import SamStage from "../../components/SamStage";
import { ACTIVITY_FACTS } from "../../lib/activityFacts";

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
// "mission_map" entry), and the same bug Simulation Lab and Frequency Rush
// hit here until this fix — add new engines here the moment they go live.
// Keep this in sync with app/home/HomeClient.js's own copy of this map.
function engineTag(engine) {
  const facts = ACTIVITY_FACTS[engine] || ACTIVITY_FACTS.group_chat;
  return facts.label.toUpperCase();
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
  // Sept 4, 2026 — S.A.M. expansion: samLabel replaces every literal
  // "S.A.M." text label so a student's chosen nickname shows up everywhere.
  const samLabel = student.sam_nickname || "S.A.M.";
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
        minHeight: "100vh",
        overflow: "auto",
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

      <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: "88px 16px 160px", display: "grid", gap: 12 }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 32, margin: 0, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.45)" }}>Missions</h1>
        {sorted.length === 0 && <p style={{ background: "rgba(255,255,255,.94)", borderRadius: 16, padding: 18 }}>No missions assigned yet.</p>}
        {sorted.map((mission) => (
          <button key={mission.id} type="button" onClick={() => router.push(`/activity/${mission.id}`)} style={{ display: "flex", gap: 12, alignItems: "center", textAlign: "left", background: "rgba(255,255,255,.96)", border: "none", borderRadius: 16, padding: 12, font: "inherit", cursor: "pointer" }}>
            <CaseImage standard={mission.case_standard} alt="" style={{ width: 72, height: 56, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
            <span style={{ minWidth: 0 }}>
              <strong style={{ display: "block" }}>{mission.cases?.title || "Mission"}</strong>
              <span style={{ display: "block", color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>{mission.revisionRequested ? "Try again · " : ""}{mission.cases?.subject ? mission.cases.subject + " · " : ""}{mission.case_standard}{mission.due_date ? " · Due " + mission.due_date : ""}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Sept 4, 2026 — grown from a 64px corner button to a real 150px
          "companion" presence (SamStage), matching Home's same upgrade —
          see HomeClient.js for the full reasoning. Same corner spot, same
          click-to-toggle-tooltip behavior. */}
      <SamStage
        skinKey={student.equipped_sam_skin}
        alt={samLabel}
        size={150}
        onClick={() => setSamOpen(!samOpen)}
        style={{ position: "fixed", right: 12, bottom: 12 }}
      />
      {samOpen && (
        <div style={{ position: "fixed", right: 28, bottom: 188, width: 240, background: COLORS.white, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.12)", padding: 16 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 4px 0" }}>
            {samLabel} <span style={{ color: COLORS.teal }}>· ClearCenters Assistant for Missions</span>
          </p>
          <p style={{ fontSize: 12.5, color: COLORS.textDark, margin: 0, lineHeight: 1.45 }}>
            Click me anytime you're working on a mission and need a hint!
          </p>
        </div>
      )}
    </div>
  );
}
