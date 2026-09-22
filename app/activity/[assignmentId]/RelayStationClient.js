"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import { computeStars } from "../../../lib/cases/relay-station";

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
  const accuracy = keystrokes > 0 ? Math.round(((keystrokes - errors) / keystrokes) * 100) : 100;
  return { ms, wpm, accuracy };
}

const SEGMENT_COLORS = ["#FFC44D", "#67E8F9", "#39D97A", "#F9A8D4", "#A5B4FC", "#FDBA74"];

export default function RelayStationClient({ assignmentId, lesson, existingBest }) {
  const text = lesson.text;
  const [phase, setPhase] = useState("intro"); // intro | typing | done
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
  const [best, setBest] = useState(existingBest || null);
  const [newBest, setNewBest] = useState(false);

  // Refs mirror state so the keydown handler never reads stale values
  // (fast typists can fire several keys before React re-renders).
  const stateRef = useRef({ pos: 0, errors: 0, keystrokes: 0, startedAt: null, misses: {} });

  const reset = useCallback(() => {
    stateRef.current = { pos: 0, errors: 0, keystrokes: 0, startedAt: null, misses: {} };
    setPos(0); setErrors(0); setKeystrokes(0); setStartedAt(null); setEndedAt(null);
    setMisses({}); setLastWrong(null); setSaveState("idle"); setNewBest(false);
  }, []);

  const submitRun = useCallback(async (run) => {
    setSaveState("saving");
    try {
      const res = await fetch("/api/relay-station/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, result: run }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save.");
      setSaveState("saved");
      if (data.best) setBest(data.best);
      setNewBest(!!data.isNewBest);
    } catch (err) {
      console.error("Relay Station submit failed:", err);
      setSaveState("error");
    }
  }, [assignmentId]);

  const finish = useCallback((s, finishedAt) => {
    setEndedAt(finishedAt);
    setPhase("done");
    const { ms, wpm, accuracy } = calcStats({
      correctChars: text.length, keystrokes: s.keystrokes, errors: s.errors, startedAt: s.startedAt, endedAt: finishedAt,
    });
    const troubleKeys = Object.entries(s.misses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ch, count]) => ({ key: ch, count }));
    submitRun({ wpm, accuracy, errors: s.errors, keystrokes: s.keystrokes, chars: text.length, ms, troubleKeys });
  }, [text, submitRun]);

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
      setPos(s.pos);
      setKeystrokes(s.keystrokes);
      setLastWrong(null);
      if (s.pos >= text.length) finish({ ...s }, t);
    } else {
      s.errors += 1;
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
      <Shell>
        <Panel style={{ maxWidth: 640 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700, marginBottom: 6 }}>📡 INCOMING TRANSMISSION, CADET</div>
          <h1 style={{ fontSize: 26, margin: "0 0 6px", color: THEME.text }}>{lesson.title}</h1>
          <div style={{ fontSize: 12.5, color: THEME.muted, marginBottom: 16 }}>Relay it exactly — letter for letter.</div>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: THEME.text, margin: "0 0 16px" }}>{lesson.intro}</p>
          {lesson.newKeys && lesson.newKeys.length > 0 && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: THEME.muted }}>New keys:</span>
              {lesson.newKeys.map((k) => (
                <span key={k} style={{ background: FINGER_COLORS[FINGER_OF[k]], color: "#0D1B2A", fontWeight: 800, borderRadius: 8, padding: "4px 10px", fontSize: 16 }}>{k.toUpperCase()}</span>
              ))}
            </div>
          )}
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px", fontSize: 13.5, color: THEME.muted, marginBottom: 20, lineHeight: 1.6 }}>
            ★ Finish the transmission<br />
            ★★ Accuracy {lesson.goals.accuracy}% or higher<br />
            ★★★ Accuracy goal <b>and</b> {lesson.goals.wpm}+ words per minute
            {best && (
              <div style={{ marginTop: 8, color: THEME.cursor }}>Your best so far: {"★".repeat(best.stars)} · {best.wpm} WPM · {best.accuracy}%</div>
            )}
          </div>
          <button onClick={start} style={btn(THEME.violet)}>Start Relay</button>
          <div style={{ fontSize: 12, color: THEME.dim, marginTop: 12 }}>Eyes on the screen, not your hands. If you press a wrong key, just press the right one — no backspace needed.</div>
        </Panel>
      </Shell>
    );
  }

  // ---------- DONE ----------
  if (phase === "done") {
    const run = calcStats({ correctChars: text.length, keystrokes, errors, startedAt, endedAt });
    const stars = computeStars(lesson.goals, run.wpm, run.accuracy);
    const trouble = Object.entries(misses).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return (
      <Shell>
        <Panel style={{ maxWidth: 820 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.done, fontWeight: 700 }}>✅ TRANSMISSION RELAYED</div>
          <div style={{ fontSize: 44, color: THEME.cursor, margin: "6px 0 4px", letterSpacing: 6 }}>
            {"★".repeat(stars)}<span style={{ color: THEME.dim }}>{"★".repeat(3 - stars)}</span>
          </div>
          {newBest && <div style={{ color: THEME.cursor, fontWeight: 700, marginBottom: 6 }}>🏅 New personal best!</div>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, margin: "12px 0 18px" }}>
            <Stat label="Words per minute" value={run.wpm} good={run.wpm >= lesson.goals.wpm} />
            <Stat label="Accuracy" value={`${run.accuracy}%`} good={run.accuracy >= lesson.goals.accuracy} />
            <Stat label="Time" value={formatTime(run.ms)} />
            <Stat label="Errors" value={errors} />
          </div>

          {stars < 3 && (
            <div style={{ fontSize: 14, color: THEME.muted, marginBottom: 14 }}>
              {run.accuracy < lesson.goals.accuracy
                ? `Next goal: ${lesson.goals.accuracy}% accuracy. Slow down a little — accuracy first, speed comes next.`
                : `Accuracy goal met! Next goal: ${lesson.goals.wpm} words per minute.`}
            </div>
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
            <button onClick={start} style={btn(THEME.violet)}>Try Again for More Stars</button>
            <span style={{ fontSize: 12.5, color: saveState === "error" ? THEME.error : THEME.muted }}>
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && "Saved to your missions ✓ (your best run is what counts)"}
              {saveState === "error" && "Couldn't save — check your connection, then try again."}
            </span>
          </div>
        </Panel>
      </Shell>
    );
  }

  // ---------- TYPING ----------
  const progress = Math.round((pos / text.length) * 100);
  return (
    <Shell>
      <div style={{ width: "100%", maxWidth: 960 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: THEME.muted, fontSize: 13, marginBottom: 8, gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: THEME.text, fontWeight: 700 }}>{lesson.title}</span>
          <span>
            <b style={{ color: THEME.text }}>{live.wpm}</b> WPM · <b style={{ color: THEME.text }}>{live.accuracy}%</b> accuracy · {formatTime(live.ms)}
          </span>
        </div>
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
    </Shell>
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

function btn(bg) {
  return { background: bg, color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" };
}
