"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import DistressCallBadge from "../../../components/DistressCallBadge";
import { PLACEMENT_STAGES, PLACEMENT_MIN_WPM, placementResult, computeStars, meetsAccuracy, passAccuracyForLevel, getTrackLevelLesson, rankFor, RANKS, isCheckpointLevel, unitsCleared, comboTier, CRYSTALS } from "../../../lib/cases/relay-station";

// Relay Station — the typing center. Added Sept 22, 2026.
// Design doc: claude/RelayStation_Digital_Design_v1.md.
//
// Core rules (design doc §4):
//   - STOP ON ERROR: a wrong key flashes red and counts as an error, but the
//     cursor waits for the right key. No backspace, so the finished copy is
//     always exact and the error count is an honest accuracy measure.
//   - Enter ("\n") and Tab ("\t") are real characters in the text — layout
//     is part of what's being practiced (friendly letters especially).
//   - We read e.key (the character produced), never e.code (physical key),
//     so Chromebook / non-US-hardware quirks don't matter.
//   - Timer starts on the first keystroke, not on the Start button.
//
// v2 (Sept 22 2026): two modes. A grade-level READING is one passage
// (PassageRun). The FOUNDATIONS TRACK (lesson.isTrack) is a 20-level map
// (TrackView) that runs each level through the same PassageRun and moves the
// student up automatically when the server reports a pass.

const THEME = {
  bg: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 45%, #060B16 100%)",
  panel: "rgba(13, 27, 42, 0.92)",
  border: "rgba(143, 164, 255, 0.28)",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.6)",
  dim: "rgba(255,255,255,0.28)",
  done: "#39D97A",
  cursor: "#FFC44D",
  error: "#FF5A6E",
  violet: "#7B5DFF",
  teal: "#00C2C7",
};

// Finger color zones for the on-screen keyboard.
const FINGER_COLORS = {
  lp: "#F9A8D4", lr: "#FDBA74", lm: "#FDE047", li: "#86EFAC",
  ri: "#67E8F9", rm: "#A5B4FC", rr: "#D8B4FE", rp: "#FCA5A5", th: "#CBD5E1",
};
const FINGER_NAMES = {
  lp: "left pinky", lr: "left ring finger", lm: "left middle finger", li: "left pointer finger",
  ri: "right pointer finger", rm: "right middle finger", rr: "right ring finger", rp: "right pinky", th: "thumb",
};

// [label, base char, finger, width]
const KEY_ROWS = [
  [["`", "`", "lp"], ["1", "1", "lp"], ["2", "2", "lr"], ["3", "3", "lm"], ["4", "4", "li"], ["5", "5", "li"], ["6", "6", "ri"], ["7", "7", "ri"], ["8", "8", "rm"], ["9", "9", "rr"], ["0", "0", "rp"], ["-", "-", "rp"], ["=", "=", "rp"], ["⌫", "Backspace", "rp", 1.6]],
  [["Tab", "\t", "lp", 1.5], ["Q", "q", "lp"], ["W", "w", "lr"], ["E", "e", "lm"], ["R", "r", "li"], ["T", "t", "li"], ["Y", "y", "ri"], ["U", "u", "ri"], ["I", "i", "rm"], ["O", "o", "rr"], ["P", "p", "rp"], ["[", "[", "rp"], ["]", "]", "rp"], ["\\", "\\", "rp", 1.1]],
  [["Caps", "CapsLock", "lp", 1.8], ["A", "a", "lp"], ["S", "s", "lr"], ["D", "d", "lm"], ["F", "f", "li"], ["G", "g", "li"], ["H", "h", "ri"], ["J", "j", "ri"], ["K", "k", "rm"], ["L", "l", "rr"], [";", ";", "rp"], ["'", "'", "rp"], ["Enter", "\n", "rp", 1.9]],
  [["Shift", "ShiftL", "lp", 2.3], ["Z", "z", "lp"], ["X", "x", "lr"], ["C", "c", "lm"], ["V", "v", "li"], ["B", "b", "li"], ["N", "n", "ri"], ["M", "m", "ri"], [",", ",", "rm"], [".", ".", "rr"], ["/", "/", "rp"], ["Shift", "ShiftR", "rp", 2.4]],
  [["", " ", "th", 7]],
];

const FINGER_OF = {};
KEY_ROWS.flat().forEach(([, base, finger]) => { FINGER_OF[base] = finger; });

const SHIFTED = {
  "~": "`", "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0",
  "_": "-", "+": "=", "{": "[", "}": "]", "|": "\\", ":": ";", "\"": "'", "<": ",", ">": ".", "?": "/",
};

// Which physical key (base char) + whether Shift is needed to produce `ch`.
function keyFor(ch) {
  if (ch == null) return { base: null, shift: false };
  if (ch >= "A" && ch <= "Z") return { base: ch.toLowerCase(), shift: true };
  if (SHIFTED[ch]) return { base: SHIFTED[ch], shift: true };
  return { base: ch, shift: false };
}

function isLeftHand(finger) {
  return finger && finger[0] === "l";
}

function charName(ch) {
  if (ch === " ") return "Space";
  if (ch === "\n") return "Enter";
  if (ch === "\t") return "Tab";
  return ch;
}

function formatTime(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function calcStats({ correctChars, keystrokes, errors, startedAt, endedAt }) {
  const ms = startedAt ? (endedAt || Date.now()) - startedAt : 0;
  const minutes = ms / 60000;
  const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
  const accuracyExact = keystrokes > 0 ? ((keystrokes - errors) / keystrokes) * 100 : 100;
  // Never show 100% when there was a mistake (matters for the 100% levels).
  const accuracy = errors > 0 ? Math.min(99, Math.round(accuracyExact)) : 100;
  return { ms, wpm, accuracy, accuracyExact };
}

const SEGMENT_COLORS = ["#FFC44D", "#67E8F9", "#39D97A", "#F9A8D4", "#A5B4FC", "#FDBA74"];

export default function RelayStationClient({ assignmentId, lesson, existingBest, trackProgress }) {
  // DistressCallBadge renders nothing unless the teacher flagged this
  // assignment as a Distress Call (class goal: levels passed / stars).
  if (lesson.isTrack) {
    return (
      <>
        <DistressCallBadge assignmentId={assignmentId} />
        <TrackView assignmentId={assignmentId} track={lesson} initialProgress={trackProgress} />
      </>
    );
  }
  return (
    <Shell>
      <DistressCallBadge assignmentId={assignmentId} />
      <PassageRun assignmentId={assignmentId} lesson={lesson} initialBest={existingBest} />
    </Shell>
  );
}

// ======================================================================
// FOUNDATIONS TRACK (design doc §9). One assignment, 20 levels, the student
// auto-advances every time they pass a level (accuracy goal). Progress is
// per STUDENT, loaded server-side in page.js and updated from each submit.
// ======================================================================
function TrackView({ assignmentId, track, initialProgress }) {
  const total = track.levels.length;
  const [progress, setProgress] = useState(() => normalizeProgress(initialProgress, total));
  const [view, setView] = useState("map"); // map | run
  const [runLevel, setRunLevel] = useState(null);
  const [runKey, setRunKey] = useState(0);
  // Ready Position (Tech Apps (c)(12)(C) "ergonomic strategies such as correct
  // hand and body positions"): the full checklist opens automatically for a
  // brand-new student, and any time from the map's Ready Position button.
  const [showReady, setShowReady] = useState(() => {
    const p = normalizeProgress(initialProgress, total);
    return p.currentLevel === 1 && Object.keys(p.results).length === 0;
  });

  const complete = progress.currentLevel > total;

  function play(level, autoStart = false) {
    setRunLevel({ level, autoStart });
    setRunKey((k) => k + 1);
    setView("run");
  }

  const canPlace = progress.currentLevel === 1 && Object.keys(progress.results).length === 0 && !progress.placement;

  if (view === "placement") {
    return (
      <Shell>
        <PlacementCheck
          assignmentId={assignmentId}
          track={track}
          onDone={(serverProgress) => { if (serverProgress) setProgress(normalizeProgress(serverProgress, total)); setView("map"); }}
          onCancel={() => setView("map")}
        />
      </Shell>
    );
  }

  if (showReady) {
    return (
      <Shell>
        <ReadyPosition onReady={() => setShowReady(false)} />
      </Shell>
    );
  }

  if (view === "run" && runLevel) {
    const levelLesson = getTrackLevelLesson(track, runLevel.level);
    const r = progress.results[String(runLevel.level)];
    const prev = r && r.passed ? r : null;
    return (
      <Shell>
        <PassageRun
          key={runKey}
          assignmentId={assignmentId}
          lesson={levelLesson}
          initialBest={prev}
          trackLevel={runLevel.level}
          trackTotal={total}
          autoStart={runLevel.autoStart}
          onServerResult={(data) => { if (data.progress) setProgress(normalizeProgress(data.progress, total)); }}
          onNextLevel={(n) => (n > total ? setView("map") : play(n, false))}
          onBackToMap={() => setView("map")}
        />
      </Shell>
    );
  }

  const unitsWithLevels = track.units.map((u) => ({
    ...u,
    levels: track.levels.map((l, i) => ({ ...l, number: i + 1 })).filter((l) => l.unit === u.id),
  }));
  const current = Math.min(progress.currentLevel, total);
  const passedCount = Math.min(progress.currentLevel - 1, total);
  const rank = rankFor(progress.currentLevel);
  const nextRank = RANKS[Math.min(unitsCleared(progress.currentLevel) + 1, RANKS.length - 1)];
  const starsEarned = Object.values(progress.results).reduce((n, r) => n + (r && r.passed ? r.stars : 0), 0);

  return (
    <Shell>
      <div style={{ width: "100%", maxWidth: 980 }}>
        <Panel style={{ padding: "22px 26px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>📡 RELAY STATION · FOUNDATIONS TRACK</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#0D1B2A", background: THEME.cursor, borderRadius: 999, padding: "2px 10px" }}>🎖️ {rank}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: THEME.cursor }}>⭐ {starsEarned} / {total * 3} stars</span>
              </div>
              <h1 style={{ fontSize: 26, margin: "4px 0 2px", color: THEME.text }}>
                {complete ? "Foundations Certified!" : `Level ${current} of ${total}: ${track.levels[current - 1].title}`}
              </h1>
              <div style={{ fontSize: 13.5, color: THEME.muted }}>
                {complete
                  ? "You passed every level. You can replay any level to earn more stars."
                  : `Pass this level with ${passAccuracyForLevel(current)}% accuracy and you move up automatically. The bar rises: 90% for levels 1-10, 95% for 11-15, 100% for 16-20.`}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => setShowReady(true)} style={btn("rgba(255,255,255,0.12)")}>🪑 Ready Position</button>
              {!complete && <button onClick={() => play(current, false)} style={btn(THEME.violet)}>{passedCount === 0 ? "Start Level 1" : `Continue: Level ${current}`} →</button>}
            </div>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 99, marginTop: 16, overflow: "hidden" }}>
            <div style={{ width: `${(passedCount / total) * 100}%`, height: "100%", background: THEME.done, transition: "width .3s" }} />
          </div>
          <div style={{ fontSize: 12, color: THEME.muted, marginTop: 6 }}>
            {passedCount} of {total} levels passed{!complete && rank !== nextRank ? ` · clear this unit's ⚡ checkpoint to be promoted to ${nextRank}` : ""}
          </div>
        </Panel>

        {canPlace && (
          <Panel style={{ marginBottom: 16, border: `2px solid ${THEME.teal}`, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontSize: 40 }}>🎯</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: THEME.text }}>Already know how to type?</div>
              <div style={{ fontSize: 13.5, color: THEME.muted }}>Take the 1-minute Placement Check — 3 short sentences. Type them well and you'll skip ahead. You only get one try, so do your best!</div>
            </div>
            <button onClick={() => setView("placement")} style={btn(THEME.teal, "#0D1B2A")}>Take Placement Check</button>
          </Panel>
        )}

        {progress.placement && progress.placement.level > 1 && passedCount < 20 && progress.currentLevel === progress.placement.level && (
          <div style={{ color: THEME.teal, fontSize: 13.5, marginBottom: 12 }}>🎯 Placement Check put you at Level {progress.placement.level}. Earlier levels are marked ✓ — replay any of them to earn stars and crystals.</div>
        )}

        {complete && (
          <Panel style={{ textAlign: "center", marginBottom: 16, border: `2px solid ${THEME.cursor}` }}>
            <div style={{ fontSize: 54 }}>🏅</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: THEME.cursor }}>Typing Foundations Certified</div>
            <div style={{ color: THEME.muted, fontSize: 14, marginTop: 4 }}>Every key, capitals, punctuation, numbers, and layout. Nice relaying, Cadet.</div>
          </Panel>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14 }}>
          {unitsWithLevels.map((u) => (
            <Panel key={u.id} style={{ padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: u.color, marginBottom: 10 }}>{u.name.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {u.levels.map((l) => {
                  const r = progress.results[String(l.number)];
                  const passed = l.number < progress.currentLevel;
                  const isCurrent = l.number === progress.currentLevel;
                  const locked = l.number > progress.currentLevel;
                  return (
                    <button
                      key={l.number}
                      disabled={locked}
                      onClick={() => play(l.number, false)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, textAlign: "left", width: "100%",
                        background: isCurrent ? "rgba(123,93,255,0.25)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isCurrent ? THEME.violet : "transparent"}`,
                        boxShadow: isCurrent ? `0 0 16px ${THEME.violet}66` : "none",
                        borderRadius: 10, padding: "8px 10px", color: locked ? THEME.dim : THEME.text,
                        cursor: locked ? "default" : "pointer", fontFamily: "inherit",
                      }}
                    >
                      <span style={{
                        flex: "0 0 30px", height: 30, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 13,
                        background: passed ? u.color : isCurrent ? THEME.violet : "rgba(255,255,255,0.08)",
                        color: passed ? "#0D1B2A" : "#fff",
                      }}>{locked ? "🔒" : l.number}</span>
                      <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>
                        {l.title}
                        {isCheckpointLevel(l.number) && <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 800, color: THEME.cursor, letterSpacing: 1 }}>⚡ CHECKPOINT</span>}
                      </span>
                      <span style={{ fontSize: 13, color: THEME.cursor, letterSpacing: 1 }}>
                        {passed && r ? (r.stars > 0 ? "★".repeat(r.stars) : <span style={{ color: THEME.teal, fontSize: 11.5, fontWeight: 700 }}>✓ PLACED</span>) : isCurrent ? <span style={{ color: THEME.teal, fontSize: 11.5, fontWeight: 700 }}>UP NEXT</span> : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function normalizeProgress(p, total) {
  const currentLevel = Math.max(1, Math.min(total + 1, Number(p && p.current_level) || Number(p && p.currentLevel) || 1));
  const results = (p && (p.level_results || p.results)) || {};
  return { currentLevel, results, placement: (p && p.placement) || null };
}

// ======================================================================
// ONE PASSAGE: intro → typing → done. Used for grade-level readings AND for
// each track level (trackLevel set).
// ======================================================================
function PassageRun({ assignmentId, lesson, initialBest, trackLevel, trackTotal, autoStart, onServerResult, onNextLevel, onBackToMap, onFinishOverride }) {
  const text = lesson.text;
  const isTrackLevel = !!trackLevel;
  const [phase, setPhase] = useState(autoStart ? "typing" : "intro"); // intro | typing | done
  const [pos, setPos] = useState(0);
  const [errors, setErrors] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [misses, setMisses] = useState({});
  const [flashKey, setFlashKey] = useState(0); // bumps on every error to retrigger the red flash
  const [lastWrong, setLastWrong] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [best, setBest] = useState(initialBest || null);
  const [newBest, setNewBest] = useState(false);
  const [failStreak, setFailStreak] = useState(0); // misses on this level THIS visit — for gentler coaching
  // Gamification (v3): combo meter while typing + rewards from the server.
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [reward, setReward] = useState(null); // { crystals, promotedTo }

  // Refs mirror state so the keydown handler never reads stale values
  // (fast typists can fire several keys before React re-renders).
  const stateRef = useRef({ pos: 0, errors: 0, keystrokes: 0, startedAt: null, misses: {}, combo: 0, bestCombo: 0 });

  const reset = useCallback(() => {
    stateRef.current = { pos: 0, errors: 0, keystrokes: 0, startedAt: null, misses: {}, combo: 0, bestCombo: 0 };
    setPos(0); setErrors(0); setKeystrokes(0); setStartedAt(null); setEndedAt(null);
    setMisses({}); setLastWrong(null); setSaveState("idle"); setNewBest(false);
    setCombo(0); setBestCombo(0); setReward(null);
  }, []);

  const submitRun = useCallback(async (run) => {
    setSaveState("saving");
    try {
      const res = await fetch("/api/relay-station/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, level: trackLevel || null, result: run }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save.");
      setSaveState("saved");
      if (data.best) setBest(data.best);
      setNewBest(!!data.isNewBest);
      setReward({ crystals: data.crystalsEarned || 0, promotedTo: data.promotedTo || null });
      if (onServerResult) onServerResult(data);
    } catch (err) {
      console.error("Relay Station submit failed:", err);
      setSaveState("error");
    }
  }, [assignmentId, trackLevel, onServerResult]);

  const finish = useCallback((s, finishedAt) => {
    setEndedAt(finishedAt);
    if (onFinishOverride) {
      // Placement Check: hand the raw counts to the parent instead of saving.
      onFinishOverride({ keystrokes: s.keystrokes, errors: s.errors, ms: finishedAt - s.startedAt, chars: text.length });
      return;
    }
    setPhase("done");
    const { ms, wpm, accuracy, accuracyExact } = calcStats({
      correctChars: text.length, keystrokes: s.keystrokes, errors: s.errors, startedAt: s.startedAt, endedAt: finishedAt,
    });
    if (!meetsAccuracy(lesson.goals, accuracyExact)) setFailStreak((n) => n + 1);
    const troubleKeys = Object.entries(s.misses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ch, count]) => ({ key: ch, count }));
    submitRun({ wpm, accuracy, errors: s.errors, keystrokes: s.keystrokes, chars: text.length, ms, troubleKeys, bestCombo: s.bestCombo });
  }, [text, lesson.goals, submitRun, onFinishOverride]);

  const handleKey = useCallback((e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    // Holding a key down auto-repeats — ignore those so one slow finger
    // doesn't turn into a pile of errors.
    if (e.repeat) { e.preventDefault(); return; }
    let typed = null;
    if (e.key === "Enter") typed = "\n";
    else if (e.key === "Tab") typed = "\t";
    else if (e.key.length === 1) typed = e.key;
    // Keep the browser from doing its own thing with keys we care about:
    // Tab moves focus, Space scrolls, ' and / open Firefox quick-find,
    // Backspace can navigate back in some older browsers.
    if (typed !== null || e.key === "Backspace") e.preventDefault();
    if (typed === null) return;

    const s = stateRef.current;
    const expected = text[s.pos];
    if (expected === undefined) return;
    const t = Date.now();
    if (!s.startedAt) { s.startedAt = t; setStartedAt(t); }
    s.keystrokes += 1;

    if (typed === expected) {
      s.pos += 1;
      s.combo += 1;
      if (s.combo > s.bestCombo) s.bestCombo = s.combo;
      setCombo(s.combo);
      setBestCombo(s.bestCombo);
      setPos(s.pos);
      setKeystrokes(s.keystrokes);
      setLastWrong(null);
      if (s.pos >= text.length) finish({ ...s }, t);
    } else {
      s.errors += 1;
      s.combo = 0;
      setCombo(0);
      s.misses = { ...s.misses, [expected]: (s.misses[expected] || 0) + 1 };
      setErrors(s.errors);
      setKeystrokes(s.keystrokes);
      setMisses(s.misses);
      setLastWrong(typed);
      setFlashKey((k) => k + 1);
    }
  }, [text, finish]);

  useEffect(() => {
    if (phase !== "typing") return undefined;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, handleKey]);

  // Tick the live timer / WPM while typing.
  useEffect(() => {
    if (phase !== "typing" || !startedAt) return undefined;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [phase, startedAt]);

  const live = calcStats({ correctChars: pos, keystrokes, errors, startedAt, endedAt: endedAt || now });
  const expected = text[pos];
  const nextKey = keyFor(expected);

  function start() {
    reset();
    setPhase("typing");
  }

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <Panel style={{ maxWidth: 640 }}>
        {isTrackLevel && onBackToMap && (
          <button onClick={onBackToMap} style={linkBtn()}>← Track map</button>
        )}
        <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700, marginBottom: 6 }}>
          📡 INCOMING TRANSMISSION, CADET{isTrackLevel ? ` · LEVEL ${trackLevel} OF ${trackTotal}` : ""}
        </div>
        <h1 style={{ fontSize: 26, margin: "0 0 6px", color: THEME.text }}>{lesson.title}</h1>
        <div style={{ fontSize: 12.5, color: THEME.muted, marginBottom: 16 }}>Relay it exactly — letter for letter.</div>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: THEME.text, margin: "0 0 16px" }}>{lesson.intro}</p>
        {lesson.newKeys && lesson.newKeys.length > 0 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: THEME.muted }}>New keys:</span>
            {lesson.newKeys.map((k) => (
              <span key={k} style={{ background: FINGER_COLORS[FINGER_OF[k.length === 1 ? k : k === "Tab" ? "\t" : "ShiftL"]] || "#CBD5E1", color: "#0D1B2A", fontWeight: 800, borderRadius: 8, padding: "4px 10px", fontSize: 16 }}>{k.length === 1 ? k.toUpperCase() : k}</span>
            ))}
          </div>
        )}
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px", fontSize: 13.5, color: THEME.muted, marginBottom: 20, lineHeight: 1.6 }}>
          {isTrackLevel ? (
            <>
              <b style={{ color: THEME.text }}>To pass: {lesson.goals.accuracy}% accuracy</b>{lesson.goals.accuracy >= 100 ? " — zero wrong keys! Go slow and steady." : " — then you move up automatically."}<br />
              ★★★ Pass it with {lesson.goals.wpm}+ words per minute for three stars.<br />
              💎 {CRYSTALS.perNewStar} crystal for every new star{isCheckpointLevel(trackLevel) ? <> · <b style={{ color: THEME.cursor }}>⚡ CHECKPOINT: pass it for +{CRYSTALS.checkpoint} bonus crystals and a promotion!</b></> : ""}
            </>
          ) : (
            <>
              ★ Finish the transmission<br />
              ★★ Accuracy {lesson.goals.accuracy}% or higher<br />
              ★★★ Accuracy goal <b>and</b> {lesson.goals.wpm}+ words per minute
            </>
          )}
          {best && (
            <div style={{ marginTop: 8, color: THEME.cursor }}>Your best so far: {"★".repeat(best.stars)} · {best.wpm} WPM · {best.accuracy}%</div>
          )}
        </div>
        <div style={{ fontSize: 13, color: THEME.teal, marginBottom: 14 }}>🪑 Ready position: sit tall · feet flat · wrists floating · fingers on home row · eyes on the screen</div>
        <button onClick={start} style={btn(THEME.violet)}>Start Relay</button>
        <div style={{ fontSize: 12, color: THEME.dim, marginTop: 12 }}>Eyes on the screen, not your hands. If you press a wrong key, just press the right one — no backspace needed.</div>
      </Panel>
    );
  }

  // ---------- DONE ----------
  if (phase === "done") {
    const run = calcStats({ correctChars: text.length, keystrokes, errors, startedAt, endedAt });
    const stars = computeStars(lesson.goals, run.wpm, run.accuracyExact);
    const passed = meetsAccuracy(lesson.goals, run.accuracyExact);
    const trouble = Object.entries(misses).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const nextLevel = (trackLevel || 0) + 1;
    return (
      <Panel style={{ maxWidth: 820 }}>
        {isTrackLevel ? (
          passed ? (
            <div style={{ fontSize: 13, letterSpacing: 2, color: THEME.done, fontWeight: 800 }}>
              {trackLevel >= trackTotal ? "🏅 FOUNDATIONS TRACK COMPLETE" : `⬆️ LEVEL UP! LEVEL ${trackLevel} PASSED`}
            </div>
          ) : (
            <div style={{ fontSize: 13, letterSpacing: 2, color: THEME.cursor, fontWeight: 800 }}>SO CLOSE — TRY LEVEL {trackLevel} AGAIN</div>
          )
        ) : (
          <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.done, fontWeight: 700 }}>✅ TRANSMISSION RELAYED</div>
        )}
        <div style={{ fontSize: 44, color: THEME.cursor, margin: "6px 0 4px", letterSpacing: 6 }}>
          {"★".repeat(stars)}<span style={{ color: THEME.dim }}>{"★".repeat(3 - stars)}</span>
        </div>
        {passed && <StarBurst />}
        {reward && reward.promotedTo && (
          <div style={{ background: "linear-gradient(90deg, #FFC44D33, #7B5DFF33)", border: `1px solid ${THEME.cursor}`, borderRadius: 12, padding: "10px 14px", margin: "8px 0", color: THEME.text, fontWeight: 800, fontSize: 16, animation: "rsPop .5s both" }}>
            🎖️ PROMOTED! You are now a <span style={{ color: THEME.cursor }}>{reward.promotedTo}</span>.
          </div>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
          {newBest && <span style={{ color: THEME.cursor, fontWeight: 700 }}>🏅 New personal best!</span>}
          {reward && reward.crystals > 0 && (
            <span style={{ background: "rgba(103,232,249,0.15)", border: "1px solid #67E8F9", color: "#67E8F9", borderRadius: 999, padding: "3px 12px", fontWeight: 800, animation: "rsPop .5s .2s both" }}>+{reward.crystals} 💎 crystals</span>
          )}
          {bestCombo >= 10 && (
            <span style={{ color: THEME.muted, fontSize: 13 }}>🔥 Best combo: <b style={{ color: THEME.text }}>{bestCombo}</b> keys in a row</span>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, margin: "12px 0 18px" }}>
          <Stat label="Words per minute" value={run.wpm} good={run.wpm >= lesson.goals.wpm} />
          <Stat label="Accuracy" value={`${run.accuracy}%`} good={passed} />
          <Stat label="Time" value={formatTime(run.ms)} />
          <Stat label="Errors" value={errors} />
        </div>

        {!passed && (
          <div style={{ fontSize: 14.5, color: THEME.text, marginBottom: 14, background: "rgba(255,196,77,0.12)", borderRadius: 10, padding: "10px 12px" }}>
            You need {lesson.goals.accuracy}% accuracy{isTrackLevel ? " to move up" : " for two stars"} — you got {run.accuracy}%.{" "}
            {failStreak >= 2
              ? "Tip: go SLOW. Say each letter in your head before you press it. Speed comes later — accuracy is what moves you up."
              : "Slow down a little and watch the glowing key."}
          </div>
        )}
        {passed && stars < 3 && (
          <div style={{ fontSize: 14, color: THEME.muted, marginBottom: 14 }}>Accuracy goal met! For three stars, reach {lesson.goals.wpm} words per minute.</div>
        )}

        {trouble.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: THEME.muted, marginBottom: 6 }}>Trouble keys — practice these:</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {trouble.map(([ch, n]) => (
                <span key={ch} style={{ background: "rgba(255,90,110,0.15)", border: `1px solid ${THEME.error}`, color: THEME.text, borderRadius: 8, padding: "4px 10px", fontSize: 14, fontWeight: 700 }}>
                  {charName(ch)} <span style={{ color: THEME.muted, fontWeight: 400 }}>×{n}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {lesson.segments && <LabelReveal segments={lesson.segments} />}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 18 }}>
          {isTrackLevel && passed && trackLevel < trackTotal && saveState === "saved" && (
            <button onClick={() => onNextLevel(nextLevel)} style={btn(THEME.done, "#0D1B2A")}>Next: Level {nextLevel} →</button>
          )}
          <button onClick={start} style={btn(isTrackLevel && passed ? "rgba(255,255,255,0.12)" : THEME.violet)}>
            {isTrackLevel && !passed ? "Try Again" : "Try Again for More Stars"}
          </button>
          {isTrackLevel && onBackToMap && (
            <button onClick={onBackToMap} style={btn("rgba(255,255,255,0.12)")}>Track Map</button>
          )}
          <span style={{ fontSize: 12.5, color: saveState === "error" ? THEME.error : THEME.muted }}>
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && (isTrackLevel ? "Progress saved ✓" : "Saved to your missions ✓ (your best run is what counts)")}
            {saveState === "error" && "Couldn't save — check your connection, then try again."}
          </span>
        </div>
      </Panel>
    );
  }

  // ---------- TYPING ----------
  const progress = Math.round((pos / text.length) * 100);
  return (
    <div style={{ width: "100%", maxWidth: 960 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: THEME.muted, fontSize: 13, marginBottom: 8, gap: 12, flexWrap: "wrap" }}>
        <span style={{ color: THEME.text, fontWeight: 700 }}>{lesson.title}</span>
        <span>
          <b style={{ color: THEME.text }}>{live.wpm}</b> WPM · <b style={{ color: THEME.text }}>{live.accuracy}%</b> accuracy · {formatTime(live.ms)}
        </span>
      </div>
      <ComboMeter combo={combo} />
      <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: THEME.done, transition: "width .15s" }} />
      </div>

      <Panel style={{ padding: "22px 24px" }}>
        <TextView text={text} pos={pos} flashKey={flashKey} hasError={lastWrong !== null} />
      </Panel>

      <div style={{ textAlign: "center", color: THEME.muted, fontSize: 14, margin: "12px 0 10px", minHeight: 22 }}>
        {!startedAt
          ? "Fingers on home base — start typing when you're ready."
          : lastWrong !== null
            ? <span style={{ color: THEME.error }}>Oops — press <b>{charName(expected)}</b>{nextKey.shift ? " (hold Shift)" : ""} with your {FINGER_NAMES[FINGER_OF[nextKey.base]] || "finger"}.</span>
            : expected !== undefined && <span>Next: <b style={{ color: THEME.text }}>{charName(expected)}</b> — {FINGER_NAMES[FINGER_OF[nextKey.base]] || ""}{nextKey.shift ? " + Shift" : ""}</span>}
      </div>

      <Keyboard nextBase={nextKey.base} needShift={nextKey.shift} />
    </div>
  );
}

// Placement Check (design doc §12): 3 short stages, stops at the first miss,
// then the server re-scores and places the student on the track.
function PlacementCheck({ assignmentId, track, onDone, onCancel }) {
  const [phase, setPhase] = useState("intro"); // intro | stage | saving | result | error
  const [idx, setIdx] = useState(0);
  const [runs, setRuns] = useState([]);
  const [result, setResult] = useState(null);
  const [serverProgress, setServerProgress] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  async function submit(allRuns) {
    setPhase("saving");
    try {
      const res = await fetch("/api/relay-station/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, stages: allRuns }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save your placement.");
      setResult(data.placement);
      setServerProgress(data.progress);
      setPhase("result");
    } catch (err) {
      setErrMsg(err.message);
      setPhase("error");
    }
  }

  function onStageDone(raw) {
    const stage = PLACEMENT_STAGES[idx];
    const allRuns = [...runs, { id: stage.id, ...raw }];
    setRuns(allRuns);
    const local = placementResult(allRuns);
    const last = local.stages[local.stages.length - 1];
    if (!last || !last.cleared || idx === PLACEMENT_STAGES.length - 1) submit(allRuns);
    else setIdx(idx + 1);
  }

  if (phase === "intro") {
    return (
      <Panel style={{ maxWidth: 640 }}>
        <button onClick={onCancel} style={linkBtn()}>← Track map</button>
        <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700, marginBottom: 6 }}>🎯 PLACEMENT CHECK</div>
        <h1 style={{ fontSize: 26, margin: "0 0 10px", color: THEME.text }}>Show what you can do</h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: THEME.text, margin: "0 0 12px" }}>
          You'll type up to 3 short sentences. Each one you type accurately and at {PLACEMENT_MIN_WPM}+ words per minute lets you skip a part of the track. If one is hard, that's fine — the check stops and you start at the right level.
        </p>
        <div style={{ fontSize: 13.5, color: THEME.muted, marginBottom: 18, lineHeight: 1.7 }}>
          {PLACEMENT_STAGES.map((st) => <div key={st.id}>• {st.title} — clear it to start at Level {st.placesAt}</div>)}
        </div>
        <div style={{ fontSize: 13, color: THEME.cursor, marginBottom: 16 }}>You only get one Placement Check, so sit in your ready position and take your time.</div>
        <button onClick={() => setPhase("stage")} style={btn(THEME.teal, "#0D1B2A")}>Begin →</button>
      </Panel>
    );
  }

  if (phase === "stage") {
    const stage = PLACEMENT_STAGES[idx];
    const lesson = {
      code: `placement-${stage.id}`,
      isTrack: false,
      kind: "placement",
      title: `${stage.title} (${idx + 1} of ${PLACEMENT_STAGES.length})`,
      intro: "",
      newKeys: [],
      text: stage.text,
      segments: null,
      goals: { accuracy: stage.accuracy, wpm: PLACEMENT_MIN_WPM },
    };
    return <PassageRun key={stage.id} assignmentId={assignmentId} lesson={lesson} autoStart onFinishOverride={onStageDone} />;
  }

  if (phase === "saving") {
    return <Panel style={{ maxWidth: 520, textAlign: "center" }}><div style={{ color: THEME.text }}>Scoring your Placement Check…</div></Panel>;
  }

  if (phase === "error") {
    return (
      <Panel style={{ maxWidth: 520 }}>
        <div style={{ color: THEME.error, marginBottom: 14 }}>{errMsg}</div>
        <button onClick={() => onDone(null)} style={btn(THEME.violet)}>Back to Track Map</button>
      </Panel>
    );
  }

  const level = result ? result.level : 1;
  const levelInfo = track.levels[level - 1];
  return (
    <Panel style={{ maxWidth: 640, textAlign: "center" }}>
      <StarBurst />
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>🎯 PLACEMENT COMPLETE</div>
      <h1 style={{ fontSize: 28, margin: "8px 0", color: THEME.text }}>You start at Level {level}</h1>
      <div style={{ fontSize: 16, color: THEME.cursor, marginBottom: 14 }}>{levelInfo ? levelInfo.title : ""}</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        {(result ? result.stages : []).map((st) => (
          <span key={st.id} style={{ background: st.cleared ? "rgba(57,217,122,0.15)" : "rgba(255,196,77,0.12)", border: `1px solid ${st.cleared ? THEME.done : THEME.cursor}`, borderRadius: 10, padding: "6px 10px", color: THEME.text, fontSize: 13 }}>
            Stage {st.id}: {st.accuracy}% · {st.wpm} WPM {st.cleared ? "✓" : ""}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 13.5, color: THEME.muted, marginBottom: 18 }}>
        {level > 1 ? "Nice typing! The levels you skipped are marked ✓ — replay them any time for stars and crystals." : "Great start, Cadet. Level 1 builds the home-row habits everything else depends on."}
      </div>
      <button onClick={() => onDone(serverProgress)} style={btn(THEME.violet)}>Go to My Track →</button>
    </Panel>
  );
}

// Ready Position checklist — students tap each item to confirm before they
// start. Art for this screen (a posture diagram) is on Emily's image batch;
// until then it's emoji + words.
const READY_ITEMS = [
  { icon: "🪑", title: "Sit tall", body: "Back against the chair, shoulders relaxed. Don't slouch toward the screen." },
  { icon: "🦶", title: "Feet flat", body: "Both feet flat on the floor (or on a box if they don't reach)." },
  { icon: "🖐️", title: "Wrists floating", body: "Keep your wrists up off the desk and your fingers curved, like holding a ball." },
  { icon: "⌨️", title: "Home row", body: "Left fingers on A S D F, right fingers on J K L ;. Thumbs on the space bar. Feel the bumps on F and J." },
  { icon: "👀", title: "Eyes on the screen", body: "Look at the screen, not your hands. The glowing keyboard shows you where to go." },
];

function ReadyPosition({ onReady }) {
  const [checked, setChecked] = useState({});
  const allChecked = READY_ITEMS.every((_, i) => checked[i]);
  return (
    <Panel style={{ maxWidth: 640 }}>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700, marginBottom: 6 }}>📡 PRE-FLIGHT CHECK, CADET</div>
      <h1 style={{ fontSize: 26, margin: "0 0 6px", color: THEME.text }}>Ready Position</h1>
      <p style={{ fontSize: 14.5, color: THEME.muted, margin: "0 0 16px" }}>Pilots check their seat before every flight. Typists do too. Tap each one when you've done it.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {READY_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
            style={{
              display: "flex", gap: 12, alignItems: "center", textAlign: "left", width: "100%",
              background: checked[i] ? "rgba(57,217,122,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${checked[i] ? THEME.done : "transparent"}`,
              borderRadius: 12, padding: "10px 12px", color: THEME.text, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 26 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontWeight: 800, fontSize: 15 }}>{item.title}</span>
              <span style={{ display: "block", fontSize: 13, color: THEME.muted }}>{item.body}</span>
            </span>
            <span style={{ fontSize: 20, color: checked[i] ? THEME.done : THEME.dim }}>{checked[i] ? "✓" : "○"}</span>
          </button>
        ))}
      </div>
      <button disabled={!allChecked} onClick={onReady} style={{ ...btn(allChecked ? THEME.violet : "rgba(255,255,255,0.12)"), cursor: allChecked ? "pointer" : "default" }}>
        {allChecked ? "I'm Ready →" : `Check all ${READY_ITEMS.length} to continue`}
      </button>
    </Panel>
  );
}

// Combo meter: consecutive correct keys. Tiers light up at 10/25/50/100.
function ComboMeter({ combo }) {
  const tier = comboTier(combo);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, height: 26, marginBottom: 6 }}>
      <style>{`@keyframes rsPulse { 0%{transform:scale(1)} 50%{transform:scale(1.12)} 100%{transform:scale(1)} }`}</style>
      {combo >= 5 && (
        <span key={tier ? tier.label : "none"} style={{
          fontSize: 13, fontWeight: 800, letterSpacing: 1,
          color: tier ? tier.color : THEME.muted,
          textShadow: tier ? `0 0 10px ${tier.color}` : "none",
          animation: "rsPulse .35s",
        }}>
          🔥 {combo} COMBO{tier ? ` · ${tier.label}` : ""}
        </span>
      )}
    </div>
  );
}

// Little celebration when a passage is passed: stars fly up and fade.
function StarBurst() {
  const bits = ["⭐", "✨", "💎", "⭐", "✨", "⭐", "💫", "✨"];
  return (
    <div style={{ position: "relative", height: 0 }} aria-hidden="true">
      <style>{`
        @keyframes rsBurst { 0% { opacity: 0; transform: translate(0,0) scale(.4); } 20% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), -120px) scale(1.2); } }
        @keyframes rsPop { 0% { opacity: 0; transform: scale(.6); } 70% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
      {bits.map((b, i) => (
        <span key={i} style={{ position: "absolute", left: `${8 + i * 11}%`, top: 10, fontSize: 22, ["--dx"]: `${(i % 2 ? 1 : -1) * (10 + i * 4)}px`, animation: `rsBurst 1.2s ${i * 0.08}s ease-out both`, pointerEvents: "none" }}>{b}</span>
      ))}
    </div>
  );
}

// Shows a window of lines around the cursor: done text dims, current line is
// bright, current char gets the cursor. Enter shows as ↵, Tab as →.
function TextView({ text, pos, flashKey, hasError }) {
  const lines = useMemo(() => {
    const out = [];
    let start = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === "\n") { out.push({ start, end: i + 1 }); start = i + 1; }
    }
    if (start < text.length) out.push({ start, end: text.length });
    return out;
  }, [text]);

  let curLine = lines.findIndex((l) => pos >= l.start && pos < l.end);
  if (curLine === -1) curLine = lines.length - 1;
  const first = Math.max(0, curLine - 2);
  const last = Math.min(lines.length, first + 7);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: 26, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      <style>{`@keyframes rsShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }`}</style>
      {lines.slice(first, last).map((line, li) => {
        const lineIdx = first + li;
        const isCur = lineIdx === curLine;
        const chars = [];
        for (let i = line.start; i < line.end; i += 1) {
          const ch = text[i];
          const isDone = i < pos;
          const isCursor = i === pos;
          let display = ch;
          if (ch === "\n") display = "↵";
          else if (ch === "\t") display = "→   ";
          let style = { color: isDone ? THEME.done : isCur ? THEME.text : THEME.dim, opacity: isDone && !isCur ? 0.55 : 1 };
          if (ch === "\n" || ch === "\t") style = { ...style, color: isDone ? "rgba(57,217,122,0.5)" : isCur ? THEME.teal : THEME.dim, fontSize: "0.8em" };
          if (isCursor) {
            style = {
              ...style,
              color: hasError ? "#fff" : "#0D1B2A",
              background: hasError ? THEME.error : THEME.cursor,
              borderRadius: 4,
              boxShadow: `0 0 0 2px ${hasError ? THEME.error : THEME.cursor}`,
              animation: hasError ? "rsShake .18s" : "none",
            };
            if (ch === " ") display = "␣";
          }
          chars.push(<span key={isCursor ? `c${i}-${flashKey}` : i} style={style}>{display}</span>);
        }
        return (
          <div key={lineIdx} style={{ minHeight: "1.7em", padding: "0 6px", borderRadius: 8, background: isCur ? "rgba(255,255,255,0.05)" : "transparent" }}>
            {chars}
          </div>
        );
      })}
    </div>
  );
}

function Keyboard({ nextBase, needShift }) {
  const nextFinger = FINGER_OF[nextBase];
  // Shift goes on the OPPOSITE hand from the letter.
  const shiftSide = needShift ? (isLeftHand(nextFinger) ? "ShiftR" : "ShiftL") : null;
  const unit = 44;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, userSelect: "none", overflowX: "auto" }}>
      {KEY_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 5 }}>
          {row.map(([label, base, finger, w = 1]) => {
            const active = base === nextBase || base === shiftSide;
            const color = FINGER_COLORS[finger];
            const isAnchor = base === "f" || base === "j";
            return (
              <div key={base} style={{
                width: unit * w + (w - 1) * 5,
                height: unit,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: label.length > 1 ? 11 : 15,
                fontWeight: 700,
                color: active ? "#0D1B2A" : "rgba(255,255,255,0.75)",
                background: active ? color : "rgba(255,255,255,0.06)",
                border: `2px solid ${active ? "#fff" : color + "66"}`,
                boxShadow: active ? `0 0 14px ${color}` : "none",
                transform: active ? "translateY(-2px)" : "none",
                transition: "all .08s",
                position: "relative",
              }}>
                {label}
                {isAnchor && <span style={{ position: "absolute", bottom: 5, width: 10, height: 2, borderRadius: 2, background: active ? "#0D1B2A" : "rgba(255,255,255,0.7)" }} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Post-finish reveal for formatted texts: each labeled part of the letter
// lights up in its own color with its name beside it (design doc §4).
function LabelReveal({ segments }) {
  return (
    <div style={{ background: "#FFFDF7", color: "#1F2937", borderRadius: 12, padding: "18px 20px", marginTop: 4 }}>
      <style>{`@keyframes rsFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
      <div style={{ fontSize: 12, letterSpacing: 1.5, fontWeight: 800, color: "#6B7280", marginBottom: 10 }}>THE PARTS OF YOUR LETTER</div>
      {segments.map((seg, i) => {
        const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
        const body = seg.text.replace(/\n+$/, "").replace(/\t/g, "  ");
        return (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, animation: `rsFade .4s ${i * 0.35}s both` }}>
            <span style={{ flex: "0 0 92px", fontSize: 12, fontWeight: 800, background: color, color: "#0D1B2A", borderRadius: 999, padding: "3px 10px", textAlign: "center", marginTop: 2 }}>{seg.label}</span>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 15.5, lineHeight: 1.6, whiteSpace: "pre-wrap", borderLeft: `4px solid ${color}`, paddingLeft: 10 }}>{body}</div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({ label, value, good }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 12px", border: good ? `1px solid ${THEME.done}` : "1px solid transparent" }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: THEME.text }}>{value}</div>
      <div style={{ fontSize: 12, color: THEME.muted }}>{label}</div>
    </div>
  );
}

function Panel({ children, style }) {
  return (
    <div style={{ background: THEME.panel, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 28, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", ...style }}>
      {children}
    </div>
  );
}

function Shell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 16px 32px", position: "relative" }}>
      <BackToHubButton />
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

function btn(bg, color = "#fff") {
  return { background: bg, color, border: "none", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" };
}

function linkBtn() {
  return { background: "none", border: "none", color: THEME.muted, cursor: "pointer", padding: 0, marginBottom: 12, fontSize: 13, fontFamily: "inherit" };
}
