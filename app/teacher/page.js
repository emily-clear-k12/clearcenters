"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { SAM_SKINS, FALLBACK_ICON, getSamSkin, DEFAULT_SAM_SKIN } from "../../lib/samSkins";
import { planetForClass } from "../../lib/classPlanets";

// ---------------------------------------------------------------------------
// Sept 12, 2026 — Overview rebuilt around the "Orbit Map" concept (see
// claude/Teacher_Dashboard_OrbitMap_Art_Spec.md in the project). Instead of
// a stack of stat-tile cards behind a sidebar list, this page is a small
// space scene: one planet per class (click it to open that class in My
// Classes), plus a handful of fixed "landmarks" standing in for the old
// nav list — Mission Control (build/assign), the Observatory (progress &
// reports), S.A.M. (rewards & shoutouts — literally opens the same
// RewardsModal Overview already had), and a message beacon. TeacherSidebar
// is intentionally NOT rendered on this page; every other /teacher/* page
// keeps it untouched, so nothing about navigating *into* a task changes,
// only what the very first screen looks like.
//
// Real art (see the spec doc) doesn't exist yet — every visual slot below
// renders a CSS placeholder and silently swaps to the real image the
// moment a file shows up at the paths in ART, with zero code changes.
// ---------------------------------------------------------------------------

const COLORS = {
  navy: "#0B1220",
  deepNavy: "#0F1B33",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  aqua: "#4DD6FF",
  gold: "#FFC44D",
  success: "#22C55E",
  warning: "#FF9F43",
  danger: "#E4574C",
  info: "#3D84F5",
  white: "#FFFFFF",
  textMuted: "#A9B4CE",
  magenta: "#D65DE0", // Messages hologram's hue — nothing else in the app uses this pink/magenta family
};

// Real art will live here once generated (see the art spec doc) — nothing
// else in this file needs to change when the files show up.
const ART = {
  background: "/teacher/orbit/background.jpg",
  // S.A.M.'s custom "floating at the console" pose — a one-off asset made
  // for this page, not part of the regular skin set below, so it only
  // exists for the Cosmic skin. See samArtFor() further down.
  sam: "/teacher/orbit/sam-dashboard-pose.png",
  missionControl: "/teacher/orbit/mission-control.png",
  observatory: "/teacher/orbit/observatory.png",
  beacon: "/teacher/orbit/message-beacon.png",
  resources: "/teacher/orbit/resources.png",
};

// S.A.M.'s equipped skin only has bespoke console art for Cosmic (the
// default). Any other skin falls back to that skin's regular icon art
// (lib/samSkins.js's flat idle-poster style) rather than the floating
// pose — a deliberate, known mismatch until matching dashboard poses exist
// for Verdant/Crystal/Comet too.
function samArtFor(skinKey) {
  if (!skinKey || skinKey === "cosmic") return ART.sam;
  const skin = getSamSkin(skinKey);
  return (skin && skin.image) || ART.sam;
}

// Native pixel size of background.jpg — the scene "stage" is locked to this
// aspect ratio (instead of a full-viewport `background-size: cover`) so the
// planet/landmark percentage coordinates below always land exactly where
// they look right in the source art, on any screen size, with nothing
// cropped off the sides or top.
const BG_ASPECT = "1672 / 941";

// Percent coordinates (of the stage box) for the 5 lit console panels in
// background.jpg, read directly off the art: one big center panel flanked
// by two smaller panels on each side. Landmarks sit on these; S.A.M. takes
// the center (biggest, most prominent) panel since he's a character, not a
// flat hologram icon like the other four.
const CONSOLE_SLOTS = [
  { left: 17, top: 79.5, size: 12.5 }, // Mission Control — outer left
  { left: 32.5, top: 79, size: 12.5 }, // Observatory — inner left
  { left: 50, top: 76.5, size: 16 }, // S.A.M. — center
  { left: 67.5, top: 79, size: 12.5 }, // Messages — inner right
  { left: 83, top: 79.5, size: 12.5 }, // Resources — outer right
];

// Lays out N planets across the open "window" portion of the background
// (well above the console) in a shallow arc, staggered so they don't read
// as a flat row. Sizes shrink gradually as more classes are added so an
// 8-class roster still fits without crowding the console.
function planetLayout(n) {
  if (n <= 0) return [];
  const marginX = n <= 3 ? 26 : n === 4 ? 17 : 10;
  const sizePct = n <= 3 ? 20 : n === 4 ? 17 : n === 5 ? 15 : n === 6 ? 13 : n === 7 ? 11.5 : 10.5;
  return Array.from({ length: n }).map((_, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5;
    const x = marginX + t * (100 - marginX * 2);
    const arch = Math.sin(t * Math.PI); // 0 at the edges, 1 in the middle
    // Base/amplitude keep even the outermost planets (and their name +
    // stats label underneath) well clear of the landmark labels floating
    // above the console, which start around y=68%.
    const y = 34 - arch * 13 + (i % 2 === 0 ? 3 : -3);
    return { left: x, top: y, size: sizePct };
  });
}

// Best-effort display name when a teacher hasn't got a `teachers.name` row
// (or it's blank) — turns "emily.smith" / "emily_smith" into "Emily Smith"
// instead of showing the raw lowercase email handle.
function capitalizeNameGuess(raw) {
  return raw
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: COLORS.danger };
}

function dueLabel(days) {
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`;
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `due in ${days} days`;
}

// Renders the real art if it exists at ART.*, otherwise falls back to the
// CSS placeholder passed as children — silently, with no broken-image icon.
function ArtSlot({ src, alt, size, children }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {(!src || failed) && children}
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}
    </div>
  );
}

// A small ring showing class average (or an empty ring with a "—" while no
// grades are released yet), sitting in the corner of a planet.
function AvgRing({ pct }) {
  const known = pct !== null && pct !== undefined;
  const band = known ? proficiencyBand((pct / 100) * 2) : null;
  const gradient = known
    ? `conic-gradient(${band.color} ${pct * 3.6}deg, rgba(255,255,255,.15) ${pct * 3.6}deg)`
    : `conic-gradient(rgba(255,255,255,.18) 0deg, rgba(255,255,255,.18) 360deg)`;
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.deepNavy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 700, color: COLORS.white }}>
        {known ? `${pct}%` : "—"}
      </div>
    </div>
  );
}

const ICONS = {
  doc: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z" /><path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.25" /><path d="M3.5 19c.7-3 3-4.75 5.5-4.75s4.8 1.75 5.5 4.75" /><path d="m16 11 2 2 3.5-3.5" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 9 4.5-9 4.5-9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </svg>
  ),
  telescope: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17.5 14 8l2 2-11 9.5Z" /><path d="m13 9 6.5-5.5L21 5l-5.5 6.5" /><circle cx="7.5" cy="16.5" r="2.5" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m4 6.5 8 6.5 8-6.5" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 3.5 14.7 9l6 .87-4.35 4.24 1.03 6-5.38-2.83-5.38 2.83 1.03-6L3.3 9.87l6-.87Z" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2.1 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2.1 1.2L10 21h4l.5-2.6a7 7 0 0 0 2.1-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3.5 6.5a1 1 0 0 1 1-1H9l2 2h8.5a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1Z" />
    </svg>
  ),
};

const POINT_PRESETS = [5, 10, 25, 50];
const SHOUTOUT_PRESETS = [
  "Great job today — keep up the awesome thinking!",
  "So proud of the effort you put in!",
  "Loved how carefully you worked through that one!",
];

function RewardsModal({ open, classes, rawStudents, defaultClassId, awarding, onCancel, onAwardPoints, onGrantSkin, onSendShoutout }) {
  const [tab, setTab] = useState("points");
  const [classId, setClassId] = useState(defaultClassId || (classes[0] && classes[0].id) || "");
  const [mode, setMode] = useState("class");
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState(10);
  const [skinKey, setSkinKey] = useState(SAM_SKINS[0] ? SAM_SKINS[0].key : "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      setTab("points");
      setClassId(defaultClassId || (classes[0] && classes[0].id) || "");
      setMode("class");
      setStudentId("");
      setAmount(10);
      setSkinKey(SAM_SKINS[0] ? SAM_SKINS[0].key : "");
      setMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (tab === "shoutout" && mode !== "student") setMode("student");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  if (!open) return null;

  const classStudents = rawStudents.filter((s) => s.class_id === classId);
  const selectedClass = classes.find((c) => c.id === classId);

  const canAwardPoints = amount > 0 && classId && (mode === "class" ? classStudents.length > 0 : !!studentId);
  const canGrantSkin = !!skinKey && classId && (mode === "class" ? classStudents.length > 0 : !!studentId);
  const canSendShoutout = !!studentId && message.trim().length > 0;
  const canConfirm = tab === "points" ? canAwardPoints : tab === "skin" ? canGrantSkin : canSendShoutout;

  function handleConfirm() {
    if (tab === "points") {
      onAwardPoints({ classId, mode, studentId, amount, studentCount: classStudents.length });
    } else if (tab === "skin") {
      onGrantSkin({ classId, mode, studentId, skinKey, studentCount: classStudents.length });
    } else {
      onSendShoutout({ studentId, message: message.trim() });
    }
  }

  const confirmLabel = awarding ? "Sending..." : tab === "points" ? `Award +${amount}` : tab === "skin" ? "Grant Skin" : "Send Shoutout";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(460px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: "#1F2A44", marginBottom: 4 }}>S.A.M.'s Rewards</div>
        <div style={{ fontSize: 13, color: "#697386", marginBottom: 16 }}>Award points, unlock a S.A.M. skin early, or send an encouraging note as S.A.M.</div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#F2F0FA", borderRadius: 12, padding: 4 }}>
          {[["points", "Points"], ["skin", "Skin"], ["shoutout", "Shoutout"]].map(([key, label]) => (
            <button key={key} type="button" onClick={() => setTab(key)} style={{ flex: 1, padding: "8px 4px", borderRadius: 9, fontWeight: 700, fontSize: 12.5, border: "none", cursor: "pointer", background: tab === key ? COLORS.white : "transparent", color: tab === key ? COLORS.violet : "#697386", boxShadow: tab === key ? "0 2px 6px rgba(13,27,42,.1)" : "none" }}>
              {label}
            </button>
          ))}
        </div>

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#697386", marginBottom: 6 }}>Class</label>
        <select value={classId} onChange={(e) => { setClassId(e.target.value); setStudentId(""); }} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E1E2EE", fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {tab !== "shoutout" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <button type="button" onClick={() => setMode("class")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", background: mode === "class" ? COLORS.violet : "#F2F0FA", color: mode === "class" ? COLORS.white : "#1F2A44" }}>
              Whole Class{selectedClass ? ` (${classStudents.length})` : ""}
            </button>
            <button type="button" onClick={() => setMode("student")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", background: mode === "student" ? COLORS.violet : "#F2F0FA", color: mode === "student" ? COLORS.white : "#1F2A44" }}>
              One Student
            </button>
          </div>
        )}

        {(mode === "student" || tab === "shoutout") && (
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E1E2EE", fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
            <option value="">Choose a student...</option>
            {classStudents.map((s) => <option key={s.id} value={s.id}>{s.first_name}</option>)}
          </select>
        )}

        {tab === "points" && (
          <>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#697386", marginBottom: 6 }}>Points</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {POINT_PRESETS.map((p) => (
                <button key={p} type="button" onClick={() => setAmount(p)} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", background: amount === p ? COLORS.gold : "#F2F0FA", color: "#1F2A44" }}>
                  +{p}
                </button>
              ))}
            </div>
            <input type="number" min={1} value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E1E2EE", fontSize: 13.5, marginBottom: 6, fontFamily: "inherit", boxSizing: "border-box" }} />
          </>
        )}

        {tab === "skin" && (
          <>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#697386", marginBottom: 6 }}>S.A.M. Skin to Grant</label>
            <div style={{ fontSize: 11.5, color: "#697386", marginBottom: 10, lineHeight: 1.4 }}>Unlocks it early for {mode === "class" ? "the whole class" : "this student"} — doesn't touch crystal points.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 6 }}>
              {SAM_SKINS.map((skin) => (
                <button key={skin.key} type="button" onClick={() => setSkinKey(skin.key)} style={{ padding: "10px 4px", borderRadius: 10, cursor: "pointer", border: skinKey === skin.key ? `2px solid ${COLORS.violet}` : "1.5px solid #E1E2EE", background: skinKey === skin.key ? COLORS.violetSoft : COLORS.white, textAlign: "center" }}>
                  <img src={skin.image} alt="" style={{ width: 36, height: 36, objectFit: "contain", marginBottom: 4 }} onError={(e) => { e.currentTarget.src = FALLBACK_ICON; }} />
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1F2A44" }}>{skin.name}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {tab === "shoutout" && (
          <>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#697386", marginBottom: 6 }}>Message from S.A.M.</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {SHOUTOUT_PRESETS.map((preset) => (
                <button key={preset} type="button" onClick={() => setMessage(preset)} style={{ padding: "6px 10px", borderRadius: 999, border: "none", cursor: "pointer", background: "#F2F0FA", color: "#1F2A44", fontSize: 11.5, fontWeight: 600 }}>
                  {preset}
                </button>
              ))}
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 240))} placeholder="Write a quick encouraging note..." rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E1E2EE", fontSize: 13.5, marginBottom: 6, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
            <div style={{ textAlign: "right", fontSize: 11, color: "#697386", marginBottom: 8 }}>{message.length}/240</div>
          </>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
          <button onClick={onCancel} style={{ background: "#F2F0FA", color: "#1F2A44", border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Cancel</button>
          <button onClick={handleConfirm} disabled={!canConfirm || awarding} style={{ background: COLORS.violet, color: COLORS.white, border: "none", cursor: canConfirm ? "pointer" : "default", borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5, opacity: canConfirm ? 1 : 0.5 }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// One class's planet: art (or placeholder), name, average ring, and an
// urgency badge summarizing everything that used to live in the three
// "Needs Your Attention" cards, now scoped to this one class.
function PlanetNode({ cls, index, left, top, size, onOpen, onReview, onProgress }) {
  const [hover, setHover] = useState(false);
  const planet = planetForClass(cls, index);
  const hue = planet.hue;
  const s = cls.stats;
  const urgent = s.pendingCount + s.needsCheckInCount + s.dueSoonCount;
  const badgeColor = s.pendingCount > 3 || s.needsCheckInCount > 2 ? COLORS.danger : urgent > 0 ? COLORS.gold : null;

  return (
    <div
      style={{
        position: "absolute", left: `${left}%`, top: `${top}%`, width: `${size}%`,
        transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center",
        zIndex: hover ? 30 : 10,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        onClick={onOpen}
        aria-label={`Open ${cls.name}`}
        style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 0, width: "100%", aspectRatio: "1", transition: "transform 160ms ease", transform: hover ? "translateY(-4%)" : "none" }}
      >
        <ArtSlot src={planet.image} alt={cls.name} size="100%">
          <div
            style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, ${hue.glow}, ${hue.core} 60%, ${hue.core} 100%)`,
              boxShadow: `0 0 34px ${hue.core}66, inset -14px -14px 26px rgba(0,0,0,.25)`,
            }}
          />
          <div style={{ position: "absolute", left: "-14%", right: "-14%", top: "62%", height: "6%", borderRadius: "50%", border: `2px solid ${hue.glow}`, opacity: 0.6, transform: "rotate(-8deg)" }} />
        </ArtSlot>
        {badgeColor && (
          <div style={{ position: "absolute", top: "-6%", right: "-6%", minWidth: 24, height: 24, borderRadius: 999, background: badgeColor, color: COLORS.navy, fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px", boxShadow: "0 2px 8px rgba(0,0,0,.35)" }}>
            {urgent}
          </div>
        )}
      </button>

      <div style={{ marginTop: "8%", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(11px, 1.1vw, 15px)", color: COLORS.white, textAlign: "center", whiteSpace: "nowrap", textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>{cls.name}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
        <AvgRing pct={s.classAverage} />
        <div style={{ display: "grid", gap: 2, fontSize: "clamp(9px, 0.85vw, 11px)", color: COLORS.textMuted, whiteSpace: "nowrap" }}>
          <div>{s.studentCount} students</div>
          <div>{s.assignmentCount} active</div>
        </div>
      </div>

      {hover && urgent > 0 && (
        <div style={{ position: "absolute", top: "100%", marginTop: 8, width: 230, background: COLORS.deepNavy, border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: 14, boxShadow: "0 12px 30px rgba(0,0,0,.45)", zIndex: 20 }}>
          {s.pendingCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ color: COLORS.gold }}>{ICONS.doc}</span>
              <span style={{ flex: 1, fontSize: 12, color: COLORS.white }}>{s.pendingCount} to review</span>
              <button onClick={onReview} style={{ background: "none", border: "none", color: COLORS.aqua, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Go →</button>
            </div>
          )}
          {s.needsCheckInCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ color: COLORS.violet }}>{ICONS.flag}</span>
              <span style={{ flex: 1, fontSize: 12, color: COLORS.white }}>{s.needsCheckInCount} to check in with</span>
              <button onClick={onProgress} style={{ background: "none", border: "none", color: COLORS.aqua, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Go →</button>
            </div>
          )}
          {s.dueSoonCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.teal }}>{ICONS.calendar}</span>
              <span style={{ flex: 1, fontSize: 12, color: COLORS.white }}>{s.dueSoonCount} due within a week</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Label sits below the hologram, on the console itself, matching Emily's
// reference mockup. There's ~14-15% of stage height between the lowest
// panel icons and the stage's bottom edge (where content gets clipped),
// comfortably more than a compact two-line tag needs.
function Landmark({ art, icon, label, sub, onClick, left, top, size, accent = COLORS.aqua }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute", left: `${left}%`, top: `${top}%`, width: `${size}%`,
        transform: hover ? "translate(-50%, calc(-50% - 4px))" : "translate(-50%, -50%)",
        background: "none", border: "none", cursor: "pointer", padding: 0,
        transition: "transform 160ms ease", zIndex: hover ? 30 : 8,
      }}
      aria-label={label}
    >
      <div
        style={{
          width: "100%", aspectRatio: "1", position: "relative",
          // A code-side visibility boost for the hologram art (brighter,
          // plus a soft glow in that landmark's own accent color rather
          // than one flat cyan for all 5, matching the new icons' own
          // distinct hues) since the icons still read a little faint
          // against the console's own lit panel.
          filter: art ? `drop-shadow(0 0 10px ${accent}88) brightness(1.1) contrast(1.05)` : "none",
        }}
      >
        <ArtSlot src={art} alt={label} size="100%">
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.03))", border: "1px solid rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", color: accent, boxShadow: `0 0 24px ${accent}40` }}>
            {icon}
          </div>
        </ArtSlot>
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, textAlign: "center" }}>
          <div
            style={{
              padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap",
              background: "rgba(10,16,30,.68)", border: `1.5px solid ${accent}`,
              boxShadow: `0 0 14px ${accent}55`,
            }}
          >
            <div style={{ fontSize: "clamp(10px, 0.95vw, 12.5px)", fontWeight: 700, color: COLORS.white }}>{label}</div>
            {sub && <div style={{ fontSize: "clamp(8.5px, 0.8vw, 10.5px)", color: COLORS.textMuted, marginTop: 1 }}>{sub}</div>}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function TeacherOverview() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState("");
  const [teacherSamSkin, setTeacherSamSkin] = useState(DEFAULT_SAM_SKIN);
  const [error, setError] = useState(null);

  const [classes, setClasses] = useState([]);
  const [rawStudents, setRawStudents] = useState([]);
  const [rawAssignments, setRawAssignments] = useState([]);
  const [rawSubmissions, setRawSubmissions] = useState([]);
  const [rawHintRequests, setRawHintRequests] = useState([]);
  const [caseMap, setCaseMap] = useState({});
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awarding, setAwarding] = useState(false);
  const [awardSuccess, setAwardSuccess] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);

      // Real display name + equipped S.A.M. skin, both stored on the
      // teacher's own `teachers` row. Best-effort: if this fails or the
      // row/columns don't exist yet, the page still works off the email
      // fallback below rather than blocking on it.
      const { data: teacherRow } = await supabase
        .from("teachers")
        .select("name, equipped_sam_skin")
        .eq("id", data.user.id)
        .maybeSingle();
      if (teacherRow?.name) setTeacherName(teacherRow.name);
      if (teacherRow?.equipped_sam_skin) setTeacherSamSkin(teacherRow.equipped_sam_skin);

      setLoadingAuth(false);
    });
  }, [router]);

  const loadDashboard = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);

    const { data: classesData } = await supabase.from("classes").select("id, name, planet_key").eq("teacher_id", teacherId).order("name");
    const classIds = (classesData || []).map((c) => c.id);
    setClasses(classesData || []);

    let students = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, first_name, class_id, crystal_points").in("class_id", classIds);
      students = data || [];
    }
    setRawStudents(students);

    let assignments = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("assignments").select("id, case_standard, due_date, class_id, created_at").in("class_id", classIds).order("created_at", { ascending: false });
      assignments = data || [];
    }
    setRawAssignments(assignments);

    const caseStandards = [...new Set(assignments.map((a) => a.case_standard).filter(Boolean))];
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      setCaseMap(Object.fromEntries((cases || []).map((c) => [c.standard, c.title])));
    } else {
      setCaseMap({});
    }

    const assignmentIds = assignments.map((a) => a.id);
    let allSubmissions = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested").in("assignment_id", assignmentIds);
      allSubmissions = data || [];
    }
    setRawSubmissions(allSubmissions);

    let hintRequests = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("hint_requests").select("student_id, assignment_id").in("assignment_id", assignmentIds);
      hintRequests = data || [];
    }
    setRawHintRequests(hintRequests);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadDashboard(teacherId);
  }, [loadingAuth, teacherId, loadDashboard]);

  async function handleAwardPoints({ classId, mode, studentId, amount }) {
    setAwarding(true);
    const targetIds = mode === "student" ? [studentId] : rawStudents.filter((s) => s.class_id === classId).map((s) => s.id);
    await Promise.all(targetIds.map((id) => supabase.rpc("increment_crystal_points", { p_student_id: id, p_amount: amount })));
    setAwarding(false);
    setAwardModalOpen(false);
    const className = classMap[classId] || "the class";
    setAwardSuccess(mode === "student" ? `+${amount} points awarded!` : `+${amount} points awarded to all ${targetIds.length} students in ${className}!`);
    if (teacherId) await loadDashboard(teacherId);
    setTimeout(() => setAwardSuccess(null), 4000);
  }

  async function handleGrantSkin({ classId, mode, studentId, skinKey }) {
    setAwarding(true);
    const targetIds = mode === "student" ? [studentId] : rawStudents.filter((s) => s.class_id === classId).map((s) => s.id);
    const skin = SAM_SKINS.find((s) => s.key === skinKey);
    await Promise.all(targetIds.map((id) => supabase.rpc("grant_sam_skin", { p_student_id: id, p_skin_key: skinKey })));
    setAwarding(false);
    setAwardModalOpen(false);
    const className = classMap[classId] || "the class";
    const skinName = skin ? skin.name : "S.A.M. skin";
    setAwardSuccess(mode === "student" ? `${skinName} granted!` : `${skinName} granted to all ${targetIds.length} students in ${className}!`);
    if (teacherId) await loadDashboard(teacherId);
    setTimeout(() => setAwardSuccess(null), 4000);
  }

  async function handleSendShoutout({ studentId, message }) {
    setAwarding(true);
    const student = rawStudents.find((s) => s.id === studentId);
    await supabase.rpc("send_sam_shoutout", { p_teacher_id: teacherId, p_class_id: student ? student.class_id : null, p_student_id: studentId, p_message: message });
    setAwarding(false);
    setAwardModalOpen(false);
    setAwardSuccess(`Shoutout sent${student ? ` to ${student.first_name}` : ""}! S.A.M. will share it next time they're on Home.`);
    setTimeout(() => setAwardSuccess(null), 4000);
  }

  const classMap = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);

  // Per-class stats — every class shown on screen at once as its own
  // planet, so (unlike the old page) there's no "All Classes / Homeroom A"
  // tab switcher to maintain here anymore.
  const perClassStats = useMemo(() => {
    function statsForClass(classId) {
      const students = rawStudents.filter((s) => s.class_id === classId);
      const assignments = rawAssignments.filter((a) => a.class_id === classId);
      const assignmentIds = new Set(assignments.map((a) => a.id));
      const submissions = rawSubmissions.filter((s) => assignmentIds.has(s.assignment_id));

      const pending = submissions.filter((s) => s.submitted_at && !s.revision_requested && (s.teacher_grade === null || s.teacher_grade === undefined));
      const released = submissions.filter((s) => s.released && s.teacher_grade !== null && s.teacher_grade !== undefined);
      const classAverage = released.length > 0 ? Math.round((released.reduce((sum, s) => sum + s.teacher_grade, 0) / released.length / 2) * 100) : null;

      const byStudent = {};
      released.forEach((s) => {
        if (!byStudent[s.student_id]) byStudent[s.student_id] = [];
        byStudent[s.student_id].push(s.teacher_grade);
      });
      const checkInIds = new Set();
      Object.entries(byStudent).forEach(([sid, grades]) => {
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        const band = proficiencyBand(avg);
        if (band.label === "Needs Support" || band.label === "Developing") checkInIds.add(sid);
      });

      const hintCounts = {};
      rawHintRequests.forEach((h) => {
        if (assignmentIds.has(h.assignment_id)) hintCounts[h.student_id] = (hintCounts[h.student_id] || 0) + 1;
      });
      const studentIdsInScope = new Set(students.map((s) => s.id));
      Object.entries(hintCounts).forEach(([sid, count]) => {
        if (count >= 5 && studentIdsInScope.has(sid)) checkInIds.add(sid);
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueSoonCount = assignments.filter((a) => {
        if (!a.due_date) return false;
        const due = new Date(`${a.due_date}T00:00:00`);
        const days = Math.round((due - today) / 86400000);
        return days <= 7;
      }).length;

      // "Active" = currently open, not "ever assigned": due today or later,
      // or with no due date at all (open-ended). An assignment whose due
      // date has passed no longer counts, even though it still exists.
      const activeAssignmentCount = assignments.filter((a) => {
        if (!a.due_date) return true;
        const due = new Date(`${a.due_date}T00:00:00`);
        return due >= today;
      }).length;

      return {
        studentCount: students.length,
        assignmentCount: activeAssignmentCount,
        pendingCount: pending.length,
        needsCheckInCount: checkInIds.size,
        dueSoonCount,
        classAverage,
      };
    }
    return classes.map((c) => ({ ...c, stats: statsForClass(c.id) }));
  }, [classes, rawStudents, rawAssignments, rawSubmissions, rawHintRequests]);

  const totalUrgent = perClassStats.reduce((sum, c) => sum + c.stats.pendingCount + c.stats.needsCheckInCount + c.stats.dueSoonCount, 0);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>
        Loading...
      </div>
    );
  }

  // Prefer the real name from `teachers.name`; fall back to a capitalized
  // guess from the email handle if that row/column isn't there yet, rather
  // than showing the raw lowercase email like the rest of the app still does.
  const displayName = teacherName || capitalizeNameGuess(teacherEmail.split("@")[0] || "");
  const teacherFirstName = displayName.split(" ")[0] || "";
  const planetSlots = planetLayout(perClassStats.length);

  return (
    <div
      style={{
        // Fixed to the viewport (not minHeight) — combined with the stage
        // sizing below, this is what guarantees the whole dashboard always
        // fits on one screen with no page scroll, on any monitor/laptop
        // height, instead of just capping width and letting height grow
        // past the fold.
        height: "100vh",
        backgroundColor: COLORS.navy,
        backgroundImage: `radial-gradient(ellipse at 50% -10%, #1B2A52 0%, ${COLORS.deepNavy} 45%, ${COLORS.navy} 100%)`,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes twinkle { 0%,100% { opacity:.25 } 50% { opacity:.9 } }
        .orbit-star { position:absolute; width:2px; height:2px; border-radius:50%; background:#fff; animation:twinkle 3.5s ease-in-out infinite; }
      `}</style>

      {/* decorative starfield, purely CSS so it works with zero art */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="orbit-star" style={{ top: `${(i * 37) % 90}%`, left: `${(i * 53) % 100}%`, animationDelay: `${(i % 7) * 0.4}s` }} />
      ))}

      {/* HUD */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", position: "relative", zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" fill={COLORS.violet} /><path d="M12 2 4 7l8 5 8-5-8-5Z" fill={COLORS.aqua} /></svg>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.white }}>ClearCenters</span>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.white }}>
            Welcome Back{teacherFirstName ? `, ${teacherFirstName}` : ""}
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 2 }}>
            {totalUrgent > 0
              ? `${totalUrgent} thing${totalUrgent === 1 ? "" : "s"} need${totalUrgent === 1 ? "s" : ""} your attention across ${classes.length} class${classes.length === 1 ? "" : "es"}.`
              : "Everything's on track — nothing urgent right now."}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.12)", color: COLORS.white, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {(teacherFirstName || "T")[0].toUpperCase()}
          </div>
          <button onClick={() => router.push("/teacher/settings")} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer" }} aria-label="Settings">{ICONS.gear}</button>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Log Out</button>
        </div>
      </div>

      {error && <div style={{ margin: "0 32px 12px", background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>{error}</div>}

      {/* Scene — a fixed-aspect "stage" locked to the background art's own
          proportions, so the planet/console coordinates above always land
          exactly right instead of drifting with a cropped cover-fit. */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 28px 32px", minHeight: 0 }}>
        <div
          style={{
            position: "relative",
            // Letterbox to whichever of the two axes is tighter — a short
            // laptop screen binds on height, a narrow window binds on
            // width — so the stage always fits inside the HUD's leftover
            // space without ever forcing the page to scroll, while still
            // never growing past its designed size on a huge monitor.
            height: "100%", width: "auto",
            maxWidth: "min(1500px, 100%)", maxHeight: "min(844px, 100%)",
            aspectRatio: BG_ASPECT,
            backgroundImage: `url(${ART.background})`, backgroundSize: "100% 100%", backgroundPosition: "center",
            backgroundColor: COLORS.deepNavy, borderRadius: 22, overflow: "hidden",
            boxShadow: "0 24px 70px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06)",
          }}
        >
          {classes.length === 0 ? (
            <div style={{ position: "absolute", top: "34%", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: COLORS.textMuted, fontSize: 14, whiteSpace: "nowrap" }}>
              No classes yet —{" "}
              <button onClick={() => router.push("/teacher/assign")} style={{ background: "none", border: "none", color: COLORS.aqua, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>create one to get started</button>.
            </div>
          ) : (
            perClassStats.map((c, i) => (
              <PlanetNode
                key={c.id}
                cls={c}
                index={i}
                left={planetSlots[i].left}
                top={planetSlots[i].top}
                size={planetSlots[i].size}
                onOpen={() => router.push(`/teacher/assign?classId=${c.id}`)}
                onReview={() => router.push("/teacher/grade")}
                onProgress={() => router.push("/teacher/progress")}
              />
            ))
          )}

          {/* Landmarks — hologram panels floating on the console, standing in
              for the old sidebar's nav groups. Positions match the 5 lit
              panel slots baked into the background art. */}
          <Landmark art={ART.missionControl} icon={ICONS.launch} label="Mission Control" sub="Assign & Launch" accent={COLORS.warning} onClick={() => router.push("/teacher/assign")} {...CONSOLE_SLOTS[0]} />
          <Landmark art={ART.observatory} icon={ICONS.telescope} label="Observatory" sub="Progress & Reports" accent={COLORS.aqua} onClick={() => router.push("/teacher/reports")} {...CONSOLE_SLOTS[1]} />
          <Landmark art={samArtFor(teacherSamSkin)} icon={ICONS.gem} label="S.A.M." sub="Results & Shortcuts" accent={COLORS.teal} onClick={() => setAwardModalOpen(true)} {...CONSOLE_SLOTS[2]} />
          <Landmark art={ART.beacon} icon={ICONS.mail} label="Messages" sub="Inbox & Updates" accent={COLORS.magenta} onClick={() => router.push("/teacher/messages")} {...CONSOLE_SLOTS[3]} />
          <Landmark art={ART.resources} icon={ICONS.folder} label="Resources" sub="Tools & Badges" accent={COLORS.success} onClick={() => router.push("/teacher/resources")} {...CONSOLE_SLOTS[4]} />
        </div>
      </div>

      {awardSuccess && (
        <div style={{ position: "fixed", bottom: 28, right: 28, background: COLORS.white, color: "#1F2A44", borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: 13.5, boxShadow: "0 8px 24px rgba(0,0,0,.35)", zIndex: 200 }}>
          {awardSuccess}
        </div>
      )}

      <RewardsModal
        open={awardModalOpen}
        classes={classes}
        rawStudents={rawStudents}
        awarding={awarding}
        onCancel={() => setAwardModalOpen(false)}
        onAwardPoints={handleAwardPoints}
        onGrantSkin={handleGrantSkin}
        onSendShoutout={handleSendShoutout}
      />
    </div>
  );
}
