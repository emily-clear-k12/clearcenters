"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
// Note: unlike Mission Map/Group Chat, Simulation Lab doesn't use
// lib/hints.js's per-checkpoint hint bank — its checkpoints are
// single-attempt with no "wrong, try again" reveal to hint against (see the
// SAM_REACTIONS comment below), so there's no natural place a graduated
// hint would slot in. S.A.M.'s ambient "arrival" lines cover the same
// "what do I do next" need instead.

// Simulation Lab's own locked palette — a dark "control room" theme (deep
// steel/navy panel with an amber gauge glow), deliberately distinct from
// Mission Map's light sky-blue, Signal Check's navy/teal/violet/gold, and
// Group Chat's violet.
//
// v3 note (see SimulationLab_Digital_Design_v1.md §10.4): this engine
// originally shipped with a deliberate "zero image assets anywhere" rule
// — the control-room look came entirely from CSS gradients. Emily's live
// test of v2 showed that discipline left the console too abstract for
// students to follow, so v3 deliberately reverses the "no images" half of
// that rule (pre-trial step images, an optional shared machine-background
// image) while keeping the other half intact: there is still no bespoke
// per-case simulation engine, and the gauge is still driven by a shared,
// lookup-table-based component, never custom art or a custom render.
const COLORS = {
  bgTop: "#141C28",
  bgBottom: "#0B1017",
  panel: "#1A2432",
  panelLight: "rgba(255,255,255,.04)",
  steelLine: "rgba(255,255,255,.1)",
  amber: "#FFA630",
  cyan: "#3ED6C8",
  white: "#EAF0F6",
  textMuted: "rgba(234,240,246,.6)",
  danger: "#FF6B6B",
  success: "#3ED6C8",
};

// Percentage-based hotspot positions tuned against the actual console
// artwork Emily supplied Sept 3 (public/simulation-lab/console.jpg) — a
// single image reused across every Simulation Lab case, not authored per
// case, so these coordinates live here rather than in case data (design
// doc §10.3/§10.5). The art has 3 usable zones: a circular gauge display
// (upper-left), a horizontal slider slot (center), and a blank rectangular
// readout panel (upper-right). Adjust these if the art ever changes.
const CONSOLE_HOTSPOTS = {
  gaugeCircle: { xPct: 30, yPct: 32, wPct: 34, hPct: 34 }, // outcome readout
  slotTrack: { xPct: 15, yPct: 59, wPct: 70 }, // the real angle slider
  readoutPanel: { xPct: 43, yPct: 16, wPct: 45, hPct: 32 }, // predicted/actual/gap
};

// Three top-level phases, same shape as every other engine's state machine
// (Mission Map's brief/walk/finalUnlock): brief the mission, run the lab
// (now a richer v3 flow — see labStep below), then Generalize + Defend.
const PHASES = ["brief", "lab", "finalUnlock"];
const PHASE_LABEL = { brief: "Mission Brief", lab: "The Lab", finalUnlock: "Generalize & Defend" };

// The v3 lab flow (design doc §10.2), linear except "console" is reused
// for both rounds (distinguished by the `round` state):
//   pretrialAnchor -> pretrialVariables -> pretrialHypothesis (hyp
//   checkpoint) -> console (Round 1 trials) -> checkpoint1 ->
//   roundTwoReveal -> console (Round 2 trials) -> dataTable ->
//   checkpoint2 -> complete (Generalize unlock button)
const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

// Same product-wide rule as every other engine: at least 3 of 5 self-check
// questions must be checked before submit unlocks.
const REQUIRED_CHECKS = 3;

const GENERIC_OPENER_STEM = "In this mission, I found out that ___.";

// S.A.M.'s reactive lines for this engine — generic and reusable across
// every current and future Simulation Lab case, same convention as Mission
// Map's SAM_REACTIONS. Simulation Lab's checkpoints are single-attempt and
// never show a right/wrong mark back to the student — S.A.M.'s line after
// a checkpoint or the data-table step is always a neutral, encouraging
// acknowledgement, never a judgment, same "no shame" rule the rest of the
// app follows for misses.
const SAM_REACTIONS = {
  trialLogged: [
    "Logged, Cadet. What's next on the dial?",
    "Got it — added to your trial strip.",
    "Nice, that one's in the log.",
    "Recorded. Keep going.",
  ],
  checkpointAnswered: [
    "Noted — pressing on.",
    "Locked that in for your teacher to see.",
    "Good thinking. Onward.",
    "Got your answer — let's keep testing.",
  ],
  dataTableSubmitted: [
    "Nice thinking, Cadet — that's a real prediction, not just a guess.",
    "Logged. That's exactly how scientists use their own data.",
    "Good — you used the pattern instead of copying a number off the screen.",
  ],
  roundTwoBegin: [
    "New conditions, Cadet — let's see if the pattern holds.",
    "Something changed. Time to find out what stays true.",
    "Same test, new twist. Watch closely.",
  ],
  arrival: [
    "Set the dial, make your prediction, then hit Run.",
    "Try a setting you haven't tested yet.",
    "Watch the gap between your prediction and the real result.",
    "The pattern gets clearer with every trial.",
  ],
};
function pickSamLine(category) {
  const pool = SAM_REACTIONS[category];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Graceful-degradation image helper for the v3 pre-trial steps and the
// optional machine-background console image (design doc §10.2 point 4 and
// §10.3) — renders nothing at all when no imageUrl is supplied yet, same
// pattern as Mission Map's mapImage.
function StepImage({ src, alt }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt || ""}
      style={{ width: "100%", borderRadius: 12, margin: "10px 0 14px", display: "block" }}
    />
  );
}

// Fisher-Yates shuffle — used to randomize the order of the Choose Your
// Variables tap-to-identify options (design doc v3 UX pass, Sept 3) so the
// "testing" answer isn't always in the same spot.
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Circular/donut dial control ---------------------------------------
// Swapped in for the old linear angle <input type="range"> per Emily's
// Sept 3 live-test feedback ("can you have it go in a circle? ... in the
// circle part of the image?"). It occupies CONSOLE_HOTSPOTS.gaugeCircle.
// Convention: 0deg = straight up, increasing clockwise. The track is a
// 270deg arc running from 225deg to 495deg (a continuous, "unwrapped"
// scale) with a 90deg gap centered at the bottom, so min and max each have
// their own clear stop instead of the dial being able to spin past itself.
function angleForDialValue(value, min, max) {
  const pct = (value - min) / (max - min || 1);
  return 225 + pct * 270;
}
function dialPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}
function pointerToDialAngle(dx, dy) {
  let theta = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0=top, 90=right, clockwise
  if (theta < 0) theta += 360; // normalize to [0,360)
  if (theta > 135 && theta < 225) {
    // Pointer landed in the bottom gap — snap to whichever end is nearer
    // rather than letting the dial jump to the far side.
    return theta <= 180 ? 495 : 225;
  }
  if (theta < 225) theta += 360; // fold the [0,135] wedge up onto [360,495]
  return theta;
}
function dialAngleToValue(angle, min, max, step) {
  const pct = (angle - 225) / 270;
  const raw = min + pct * (max - min);
  const snapped = Math.round(raw / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

function CircularDial({ value, min, max, step, onChange, disabled, color, trackColor, size = 110 }) {
  const svgRef = useRef(null);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;

  function angleFromClientPoint(clientX, clientY) {
    const el = svgRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    return pointerToDialAngle(dx, dy);
  }

  function handlePointerDown(e) {
    if (disabled) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
    const angle = angleFromClientPoint(e.clientX, e.clientY);
    if (angle !== null) onChange(dialAngleToValue(angle, min, max, step));
  }
  function handlePointerMove(e) {
    if (disabled) return;
    if (e.buttons === 0) return;
    const angle = angleFromClientPoint(e.clientX, e.clientY);
    if (angle !== null) onChange(dialAngleToValue(angle, min, max, step));
  }

  const trackStart = dialPoint(cx, cy, r, 225);
  const trackEnd = dialPoint(cx, cy, r, 495);
  const valueAngle = angleForDialValue(value, min, max);
  const valuePoint = dialPoint(cx, cy, r, valueAngle);
  const sweep = valueAngle - 225;
  const largeArcValue = sweep > 180 ? 1 : 0;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      style={{ touchAction: "none", cursor: disabled ? "default" : "grab", display: "block", margin: "0 auto" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <path
        d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 1 1 ${trackEnd.x} ${trackEnd.y}`}
        fill="none"
        stroke={trackColor || "rgba(74,59,112,.28)"}
        strokeWidth={10}
        strokeLinecap="round"
      />
      {sweep > 0 && (
        <path
          d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeArcValue} 1 ${valuePoint.x} ${valuePoint.y}`}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
        />
      )}
      <circle cx={valuePoint.x} cy={valuePoint.y} r={11} fill={color} stroke="#fff" strokeWidth={2} />
    </svg>
  );
}

export default function SimulationLabClient({
  assignmentId,
  studentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
}) {
  const router = useRouter();
  // Scoped by studentId as well as assignmentId — same fix Mission Map
  // needed after a real live-test bug (a shared class assignmentId plus a
  // browser shared across student logins could otherwise show one
  // student's in-progress draft to another).
  const storageKey = `cc_simlab_draft_${assignmentId}_${studentId || "anon"}`;

  const draft = (() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  })();

  const variable = publicCase.variables[0];
  const outcome = publicCase.outcome;
  const cpHyp = publicCase.checkpoints.find((c) => c.id === "hyp");
  const cp1 = publicCase.checkpoints.find((c) => c.id === "cp1");
  const cp2 = publicCase.checkpoints.find((c) => c.id === "cp2");

  const [phase, setPhase] = useState(
    alreadySubmitted && !revisionRequested ? "finalUnlock" : draft.phase || "brief"
  );

  const [labStep, setLabStep] = useState(draft.labStep || "pretrialAnchor");
  const [round, setRound] = useState(draft.round || "roundOne"); // "roundOne" | "roundTwo"

  const [trialLogRoundOne, setTrialLogRoundOne] = useState(draft.trialLogRoundOne || []);
  const [trialLogRoundTwo, setTrialLogRoundTwo] = useState(draft.trialLogRoundTwo || []);
  const [currentSetting, setCurrentSetting] = useState(draft.currentSetting ?? variable.min);
  const [currentPrediction, setCurrentPrediction] = useState(
    draft.currentPrediction ?? Math.round((outcome.displayMin + outcome.displayMax) / 2)
  );
  const [predictionTouched, setPredictionTouched] = useState(false);
  const [lastRun, setLastRun] = useState(null); // { setting, prediction, actual, gap }

  // checkpointAnswers holds { [cpId]: { submittedChoiceId } | { submittedChoiceIds } }
  // for hyp/cp1/cp2 — a generic shape shared by the mc/dropdown/multiSelect
  // CheckpointCard below, mirroring what the submit route expects.
  const [checkpointAnswers, setCheckpointAnswers] = useState(draft.checkpointAnswers || {});
  const [pendingChoiceId, setPendingChoiceId] = useState(null);
  const [pendingChoiceIds, setPendingChoiceIds] = useState([]);

  const [dataTableSetting, setDataTableSetting] = useState(draft.dataTableSetting ?? null);
  const [dataTablePrediction, setDataTablePrediction] = useState(draft.dataTablePrediction ?? "");
  const [dataTableDone, setDataTableDone] = useState(draft.dataTableDone || false);

  const [samLine, setSamLine] = useState(null);
  const samTimerRef = useRef(null);
  function showSam(category) {
    if (samTimerRef.current) clearTimeout(samTimerRef.current);
    setSamLine(pickSamLine(category));
  }
  useEffect(() => {
    if (!samLine) showSam("arrival");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [finalResponseText, setFinalResponseText] = useState(draft.finalResponseText || "");
  const [checklist, setChecklist] = useState(
    draft.checklist || new Array(publicCase.selfCheckQuestions.length).fill(false)
  );
  const [showChecklistError, setShowChecklistError] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const [cleanRun, setCleanRun] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);
  const [manualSaveState, setManualSaveState] = useState("idle");
  const finalResponseRef = useRef(null);

  // Client-side draft resilience — separate from the server-side
  // saveProgress() calls at real phase transitions and the manual Save
  // Progress button below.
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          phase,
          labStep,
          round,
          trialLogRoundOne,
          trialLogRoundTwo,
          currentSetting,
          currentPrediction,
          checkpointAnswers,
          dataTableSetting,
          dataTablePrediction,
          dataTableDone,
          finalResponseText,
          checklist,
          self_confidence: selfConfidence,
        })
      );
    } catch (err) {}
  }, [
    phase,
    labStep,
    round,
    trialLogRoundOne,
    trialLogRoundTwo,
    currentSetting,
    currentPrediction,
    checkpointAnswers,
    dataTableSetting,
    dataTablePrediction,
    dataTableDone,
    finalResponseText,
    checklist,
    selfConfidence,
  ]);

  const activeCfg = round === "roundOne" ? publicCase.roundOne : publicCase.roundTwo;
  const activeLog = round === "roundOne" ? trialLogRoundOne : trialLogRoundTwo;
  const atMax = activeLog.length >= activeCfg.maxTrials;

  // Force the student onward once a round's maxTrials is reached — between
  // minTrials and maxTrials, a "I'm ready" button (rendered below) lets the
  // student choose when to stop, matching Emily's "min 3, max 5, their
  // choice" framing (design doc §10.2 point 4).
  useEffect(() => {
    if (labStep !== "console") return;
    if (activeLog.length >= activeCfg.maxTrials) {
      setLabStep(round === "roundOne" ? "checkpoint1" : "dataTable");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labStep, round, trialLogRoundOne, trialLogRoundTwo]);

  function saveProgress(fields) {
    return fetch("/api/submission/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, ...fields }),
    }).then((res) => res.ok).catch(() => false);
  }

  function startLab() {
    setPhase("lab");
    saveProgress({ phase: "lab" });
  }

  async function handleManualSave() {
    setManualSaveState("saving");
    const ok = await saveProgress({
      simulation_lab_data: {
        phase,
        labStep,
        round,
        trialLogRoundOne,
        trialLogRoundTwo,
        checkpointAnswers,
        dataTableSetting,
        dataTablePrediction,
        dataTableDone,
        finalResponseText,
        checklist,
      },
      self_confidence: selfConfidence,
    });
    setManualSaveState(ok ? "saved" : "error");
    if (ok) setTimeout(() => setManualSaveState("idle"), 2000);
  }

  // Runs a trial AND logs it in the same step (Emily's Sept 3 feedback: "go
  // ahead and give the data up at the top but auto log it in the data
  // table" — the old two-click Run-then-Log flow is gone). lastRun is kept
  // set (not cleared) so the console's screen readout keeps showing the
  // most recent Actual/Gap until the next trial overwrites it, rather than
  // flashing and disappearing.
  function runTrial() {
    if (!predictionTouched || atMax) return;
    const row = activeCfg.lookupTable.find((r) => r[variable.id] === currentSetting);
    const actual = row ? row[outcome.id] : 0;
    const result = { setting: currentSetting, prediction: currentPrediction, actual, gap: Math.abs(actual - currentPrediction) };
    setLastRun(result);
    const entry = {
      id: `${round}-t${activeLog.length + 1}`,
      [variable.id]: result.setting,
      prediction: result.prediction,
      actual: result.actual,
      gap: result.gap,
    };
    if (round === "roundOne") setTrialLogRoundOne((prev) => [...prev, entry]);
    else setTrialLogRoundTwo((prev) => [...prev, entry]);
    setPredictionTouched(false);
    showSam("trialLogged");
  }

  function beginRoundTwo() {
    setRound("roundTwo");
    setCurrentSetting(variable.min);
    setCurrentPrediction(Math.round((outcome.displayMin + outcome.displayMax) / 2));
    setPredictionTouched(false);
    setLastRun(null);
    setLabStep("console");
    showSam("roundTwoBegin");
  }

  // Every possible setting for the variable — used to compute which
  // settings are still "untested" for the v3 Data Table step (predict an
  // untested value, design doc §10.2 point 2 / §10.5).
  const allSettings = [];
  for (let v = variable.min; v <= variable.max; v += variable.step) allSettings.push(v);
  const testedInRoundTwo = new Set(trialLogRoundTwo.map((t) => t[variable.id]));
  const untestedSettings = allSettings.filter((v) => !testedInRoundTwo.has(v));

  function submitDataTable() {
    if (dataTableSetting === null || dataTablePrediction === "" || isNaN(Number(dataTablePrediction))) return;
    setDataTableDone(true);
    setLabStep("checkpoint2");
    showSam("dataTableSubmitted");
  }

  function goToFinal() {
    setPhase("finalUnlock");
    saveProgress({ phase: "finalUnlock" });
  }

  const checkedCount = checklist.filter(Boolean).length;
  const checklistPasses = checkedCount >= REQUIRED_CHECKS;

  function toggleChecklistItem(i) {
    setChecklist((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }

  function insertResponseStem(stem) {
    setFinalResponseText((prev) => (prev ? prev.trimEnd() + " " + stem : stem));
    if (finalResponseRef.current) finalResponseRef.current.focus();
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
    saveProgress({ self_confidence: id });
  }

  function handleRequestSubmit() {
    if (!finalResponseText.trim()) {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!checklistPasses) { setShowChecklistError(true); return; }
    setShowChecklistError(false);
    setShowSubmitConfirm(true);
  }

  async function submitForGrading() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const checkpointResults = publicCase.checkpoints.map((cp) => {
        const ans = checkpointAnswers[cp.id] || {};
        if (cp.type === "multiSelect") {
          return { id: cp.id, type: cp.type, submittedChoiceIds: ans.submittedChoiceIds || [] };
        }
        return { id: cp.id, type: cp.type, submittedChoiceId: ans.submittedChoiceId || null };
      });
      const dataTableResults =
        dataTableSetting !== null
          ? [{ settingValue: dataTableSetting, submittedValue: dataTablePrediction }]
          : [];

      const res = await fetch("/api/simulation-lab/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          roundTrialLogs: { roundOne: trialLogRoundOne, roundTwo: trialLogRoundTwo },
          checkpointResults,
          dataTableResults,
          finalResponseText,
          checklist,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json().catch(() => ({}));
      setCleanRun(!!data.cleanRun);
      try { localStorage.removeItem(storageKey); } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Couldn't submit your mission just now — nothing has been lost. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function confirmSubmit() {
    setShowSubmitConfirm(false);
    submitForGrading();
  }

  // Real background art Emily supplied Sept 3 (the "Cadet science bay"
  // scene) — a lighter scrim than a typical dark-panel overlay, per her
  // direct ask, so the room itself stays visible behind the activity card
  // below rather than being mostly obscured.
  const backgroundStyle = {
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(20,28,40,.32), rgba(11,16,23,.5)), url('/simulation-lab/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
    position: "relative",
  };

  const outcomeRange = outcome.displayMax - outcome.displayMin;
  const actualPercent = lastRun ? ((lastRun.actual - outcome.displayMin) / outcomeRange) * 100 : 0;
  const predictionPercent = ((currentPrediction - outcome.displayMin) / outcomeRange) * 100;

  const showTrialLogPanel = !["pretrialAnchor", "pretrialVariables", "pretrialHypothesis"].includes(labStep);

  // --- Trial strip (the running log) ----------------------------------
  function TrialStrip({ log }) {
    if (!log || log.length === 0) {
      return (
        <div style={{ fontSize: 12.5, color: COLORS.textMuted, fontStyle: "italic", padding: "4px 2px" }}>
          No trials logged yet — set the dial, make your prediction, and hit Run.
        </div>
      );
    }
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ textAlign: "left", color: COLORS.textMuted }}>
              <th style={{ padding: "4px 8px" }}>#</th>
              <th style={{ padding: "4px 8px" }}>{variable.label}</th>
              <th style={{ padding: "4px 8px" }}>Predicted</th>
              <th style={{ padding: "4px 8px" }}>Actual</th>
              <th style={{ padding: "4px 8px" }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {log.map((t, i) => (
              <tr key={t.id} style={{ borderTop: `1px solid ${COLORS.steelLine}` }}>
                <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{i + 1}</td>
                <td style={{ padding: "6px 8px" }}>{t[variable.id]}{variable.unit}</td>
                <td style={{ padding: "6px 8px" }}>{t.prediction}</td>
                <td style={{ padding: "6px 8px", color: COLORS.amber, fontWeight: 700 }}>{t.actual}</td>
                <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{t.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function SamBanner() {
    if (!samLine) return null;
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,166,48,.1)", border: `1px solid ${COLORS.amber}55`, borderRadius: 12, padding: 12, marginBottom: 14 }}>
        <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: 28, height: 28, objectFit: "contain", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.amber, marginBottom: 2, letterSpacing: 0.5 }}>S.A.M.</div>
          <div style={{ fontSize: 13.5, color: "rgba(234,240,246,.9)" }}>{samLine}</div>
        </div>
      </div>
    );
  }

  // --- Pre-trial steps (new in v3) --------------------------------------
  function PretrialAnchor() {
    const step = publicCase.pretrialSteps.anchor;
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>{step.title.toUpperCase()}</div>
        <StepImage src={step.imageUrl} alt={step.title} />
        <p style={{ color: "rgba(234,240,246,.85)", lineHeight: 1.6 }}>{step.text}</p>
        <button className="sl-btn" onClick={() => setLabStep("pretrialVariables")}
          style={{ background: COLORS.amber, color: "#1A1200", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5 }}>
          Next →
        </button>
      </div>
    );
  }

  // Rewritten Sept 3 (v3 UX pass) from a pure-text read into a tap-to-
  // identify check: Emily's live-test note was "this is just all text for
  // the student to read... something is missing from this screen." Rather
  // than a heavier per-case "3 presets" system (which she flagged herself
  // as possibly more work, and which the schema doesn't really support —
  // Ramp Test only has one real variable), the student now has to actively
  // pick which one thing changes between trials out of a shuffled list
  // that includes the real answer plus the keep-the-same items. Ungraded
  // and unlimited-retry, same "no shame" spirit as everything else in this
  // engine — a wrong tap just says "that one stays the same, try again,"
  // never a red X or a lost attempt.
  function PretrialVariables() {
    const step = publicCase.pretrialSteps.chooseVariables;
    const [pickedId, setPickedId] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const options = React.useMemo(() => {
      const opts = [
        { id: "testing", text: step.testing, isTesting: true },
        ...step.keepTheSame.map((text, i) => ({ id: `same-${i}`, text, isTesting: false })),
      ];
      return shuffleArray(opts);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function pick(opt) {
      setPickedId(opt.id);
      setIsCorrect(opt.isTesting);
    }

    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>{step.title.toUpperCase()}</div>
        <StepImage src={step.imageUrl} alt={step.title} />
        <p style={{ color: "rgba(234,240,246,.85)", lineHeight: 1.6 }}>{step.text}</p>

        <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 700, marginBottom: 10, letterSpacing: 0.3 }}>
          TAP THE ONE THING YOU'RE ALLOWED TO CHANGE BETWEEN TRIALS:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {options.map((opt) => {
            const selected = pickedId === opt.id;
            const showCorrect = selected && opt.isTesting;
            const showWrong = selected && !opt.isTesting;
            return (
              <button
                key={opt.id}
                className="sl-btn"
                onClick={() => pick(opt)}
                style={{
                  textAlign: "left",
                  background: showCorrect ? "rgba(62,214,200,.18)" : showWrong ? "rgba(255,107,107,.14)" : "rgba(255,255,255,.04)",
                  border: `1px solid ${showCorrect ? COLORS.cyan : showWrong ? COLORS.danger : COLORS.steelLine}`,
                  borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: COLORS.white,
                }}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {isCorrect && (
          <div style={{ fontSize: 13, color: COLORS.cyan, fontWeight: 700, marginBottom: 16 }}>
            ✓ Right — {step.testing} is the one thing that changes. Everything else stays locked in.
          </div>
        )}
        {pickedId && !isCorrect && (
          <div style={{ fontSize: 13, color: COLORS.danger, fontWeight: 600, marginBottom: 16 }}>
            Not quite — that one needs to stay exactly the same every trial. Try another one.
          </div>
        )}

        <button
          className="sl-btn"
          disabled={!isCorrect}
          onClick={() => setLabStep("pretrialHypothesis")}
          style={{
            background: isCorrect ? COLORS.amber : "rgba(255,255,255,.08)",
            color: isCorrect ? "#1A1200" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Next →
        </button>
      </div>
    );
  }

  // --- Generic checkpoint card — handles mc / dropdown / multiSelect,
  // reused for the pre-trial hypothesis check, Checkpoint 1, and
  // Checkpoint 2 (design doc §10.2 point 3 / §10.5). --------------------
  function CheckpointCard({ cp, nextLabStep, samCategory = "checkpointAnswered" }) {
    if (!cp) return null;
    const promptText = cp.prompt || cp.promptTemplate;
    const isMc = cp.type === "mc";
    const isDropdown = cp.type === "dropdown";
    const isMulti = cp.type === "multiSelect";
    const canSubmit = isMulti ? pendingChoiceIds.length > 0 : !!pendingChoiceId;

    function toggleMulti(id) {
      setPendingChoiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    }

    function handleSubmit() {
      if (!canSubmit) return;
      if (isMulti) {
        setCheckpointAnswers((prev) => ({ ...prev, [cp.id]: { submittedChoiceIds: pendingChoiceIds } }));
      } else {
        setCheckpointAnswers((prev) => ({ ...prev, [cp.id]: { submittedChoiceId: pendingChoiceId } }));
      }
      setPendingChoiceId(null);
      setPendingChoiceIds([]);
      setLabStep(nextLabStep);
      showSam(samCategory);
    }

    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.amber}55`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>CHECKPOINT</div>
        <div style={{ fontSize: 15, marginBottom: 14 }}>{promptText}</div>

        {isMc && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cp.choices.map((c) => (
              <button
                key={c.id}
                className="sl-btn"
                onClick={() => setPendingChoiceId(c.id)}
                style={{
                  textAlign: "left",
                  background: pendingChoiceId === c.id ? "rgba(255,166,48,.18)" : "rgba(255,255,255,.04)",
                  border: `1px solid ${pendingChoiceId === c.id ? COLORS.amber : COLORS.steelLine}`,
                  borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: COLORS.white,
                }}
              >
                {c.text}
              </button>
            ))}
          </div>
        )}

        {isDropdown && (
          <select
            value={pendingChoiceId || ""}
            onChange={(e) => setPendingChoiceId(e.target.value || null)}
            style={{ width: "100%", borderRadius: 10, padding: 10, fontSize: 13.5, border: `1px solid ${COLORS.steelLine}`, background: "rgba(255,255,255,.06)", color: COLORS.white, fontFamily: "inherit" }}
          >
            <option value="" disabled style={{ color: "#111" }}>Choose one…</option>
            {cp.choices.map((c) => (
              <option key={c.id} value={c.id} style={{ color: "#111" }}>{c.text}</option>
            ))}
          </select>
        )}

        {isMulti && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cp.choices.map((c) => (
              <label key={c.id} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={pendingChoiceIds.includes(c.id)} onChange={() => toggleMulti(c.id)} />
                <span>{c.text}</span>
              </label>
            ))}
          </div>
        )}

        <button
          className="sl-btn"
          disabled={!canSubmit}
          onClick={handleSubmit}
          style={{
            marginTop: 16,
            background: canSubmit ? COLORS.amber : "rgba(255,255,255,.08)",
            color: canSubmit ? "#1A1200" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  // --- The Console (predict / run / compare), reused for both rounds ---
  // Reworked Sept 3 (v3 UX pass) per Emily's live-test feedback: the angle
  // control is now a circular dial sitting in the art's gauge-circle zone
  // instead of a bare linear slider laid over the slot; the old blank
  // readout rectangle is now styled to actually look like a digital screen
  // (dark, monospace, glowing) and shows the student's own hypothesis
  // alongside the live numbers, so this step reads as "the machine
  // responding to what I chose" instead of an unlabeled slider guessing
  // game; and Run now auto-logs (no separate "Log Trial" click).
  function Console() {
    const bg = publicCase.machineBackground;
    const hasBgImage = !!(bg && bg.imageUrl);
    const readoutColor = "#4A3B70"; // dark plum — readable against the art's cream panels
    const H = CONSOLE_HOTSPOTS;
    const hypAnswer = checkpointAnswers.hyp;
    const hypChoice = hypAnswer && cpHyp ? cpHyp.choices.find((c) => c.id === hypAnswer.submittedChoiceId) : null;

    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 12 }}>
          CONSOLE — {round === "roundOne" ? "ROUND 1" : "ROUND 2 (heavier ball)"}
        </div>

        {hasBgImage ? (
          // Real console art (design doc §10.3) — the dial and the
          // screen/prediction readouts are positioned directly on the
          // image's own gauge circle / slider slot / readout panel via
          // CONSOLE_HOTSPOTS, tuned against this exact image.
          <div style={{ position: "relative", marginBottom: 16 }}>
            <img src={bg.imageUrl} alt="" style={{ width: "100%", borderRadius: 12, display: "block" }} />

            {/* Ramp-angle dial — sits in the art's circular gauge zone. */}
            <div
              style={{
                position: "absolute",
                left: `${H.gaugeCircle.xPct}%`, top: `${H.gaugeCircle.yPct}%`,
                width: `${H.gaugeCircle.wPct}%`, height: `${H.gaugeCircle.hPct}%`,
                transform: "translate(-50%, -50%)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}
            >
              <CircularDial
                value={currentSetting}
                min={variable.min}
                max={variable.max}
                step={variable.step}
                onChange={(v) => setCurrentSetting(v)}
                disabled={atMax}
                color={COLORS.amber}
                size={104}
              />
              <div style={{ marginTop: 4, fontSize: "clamp(9px, 1.3vw, 13px)", color: readoutColor, fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>
                {variable.label}<br />{currentSetting}{variable.unit}
              </div>
            </div>

            {/* Digital "screen" readout — Emily's ask for something in the
                screen part that "looks like a screen or data coming in,"
                now also carrying the student's own hypothesis so the
                console visibly connects back to the choice they made on
                the previous step. */}
            <div
              style={{
                position: "absolute",
                left: `${H.readoutPanel.xPct}%`, top: `${H.readoutPanel.yPct}%`,
                width: `${H.readoutPanel.wPct}%`, height: `${H.readoutPanel.hPct}%`,
                transform: "translate(-50%, -50%)",
                background: "#0B1017", borderRadius: 8, border: `1px solid ${COLORS.cyan}66`,
                boxShadow: "inset 0 0 12px rgba(62,214,200,.25)",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: "4%",
                padding: "6% 8%", fontFamily: "'Courier New', monospace", overflow: "hidden",
              }}
            >
              {hypChoice && (
                <div style={{ fontSize: "clamp(6.5px, 0.95vw, 9.5px)", color: COLORS.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  HYP: <span style={{ color: COLORS.amber }}>{hypChoice.text}</span>
                </div>
              )}
              <div style={{ fontSize: "clamp(9px, 1.3vw, 13px)", color: COLORS.cyan, fontWeight: 700, textShadow: `0 0 6px ${COLORS.cyan}88` }}>
                ANGLE: {currentSetting}{variable.unit}
              </div>
              <div style={{ fontSize: "clamp(9px, 1.3vw, 13px)", color: COLORS.cyan, fontWeight: 700, textShadow: `0 0 6px ${COLORS.cyan}88` }}>
                PREDICT: {predictionTouched ? `${currentPrediction} ${outcome.unit}` : "— set below —"}
              </div>
              {lastRun && (
                <>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 13px)", color: COLORS.amber, fontWeight: 700, textShadow: `0 0 6px ${COLORS.amber}88` }}>
                    ACTUAL: {lastRun.actual} {outcome.unit}
                  </div>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 13px)", color: COLORS.white, fontWeight: 700 }}>
                    GAP: {lastRun.gap}
                  </div>
                </>
              )}
            </div>

            {/* Prediction slider — moved into the art's slot track now that
                the dial above owns the angle control. */}
            <div
              style={{
                position: "absolute",
                left: `${H.slotTrack.xPct}%`, top: `${H.slotTrack.yPct}%`,
                width: `${H.slotTrack.wPct}%`,
              }}
            >
              <input
                className="sl-slider"
                type="range"
                min={outcome.displayMin}
                max={outcome.displayMax}
                step={1}
                value={currentPrediction}
                disabled={atMax}
                onChange={(e) => { setCurrentPrediction(Number(e.target.value)); setPredictionTouched(true); }}
                style={{ width: "100%", "--thumb-color": COLORS.cyan }}
              />
              <div style={{ textAlign: "center", fontSize: "clamp(9px, 1.3vw, 13px)", color: readoutColor, fontWeight: 800, marginTop: 2 }}>
                Prediction — {outcome.label}: {predictionTouched ? `${currentPrediction} ${outcome.unit}` : "drag to predict"}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>{variable.label}</span>
                <span style={{ color: COLORS.amber, fontWeight: 700 }}>{currentSetting}{variable.unit}</span>
              </div>
              <input
                className="sl-slider"
                type="range"
                min={variable.min}
                max={variable.max}
                step={variable.step}
                value={currentSetting}
                disabled={atMax}
                onChange={(e) => setCurrentSetting(Number(e.target.value))}
                style={{ width: "100%", "--thumb-color": COLORS.amber }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 6 }}>
                {outcome.label} ({outcome.unit})
              </div>
              <div style={{ position: "relative", height: 26, background: "rgba(255,255,255,.06)", borderRadius: 999, overflow: "hidden", border: `1px solid ${COLORS.steelLine}` }}>
                <div
                  className="sl-gauge-fill"
                  style={{
                    position: "absolute", inset: 0, width: `${lastRun ? actualPercent : 0}%`,
                    background: `linear-gradient(90deg, ${COLORS.amber}99, ${COLORS.amber})`,
                  }}
                />
                <div
                  title="Your prediction"
                  style={{
                    position: "absolute", top: 0, bottom: 0, left: `${predictionPercent}%`,
                    width: 3, background: COLORS.cyan, boxShadow: `0 0 6px ${COLORS.cyan}`,
                  }}
                />
              </div>
              {lastRun && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6, color: COLORS.textMuted }}>
                  <span>Predicted: <b style={{ color: COLORS.cyan }}>{lastRun.prediction}</b></span>
                  <span>Actual: <b style={{ color: COLORS.amber }}>{lastRun.actual}</b></span>
                  <span>Gap: <b>{lastRun.gap}</b></span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>Your Prediction — {outcome.label}</span>
                <span style={{ color: COLORS.cyan, fontWeight: 700 }}>
                  {predictionTouched ? `${currentPrediction} ${outcome.unit}` : "drag to predict"}
                </span>
              </div>
              <input
                className="sl-slider"
                type="range"
                min={outcome.displayMin}
                max={outcome.displayMax}
                step={1}
                value={currentPrediction}
                disabled={atMax}
                onChange={(e) => { setCurrentPrediction(Number(e.target.value)); setPredictionTouched(true); }}
                style={{ width: "100%", "--thumb-color": COLORS.cyan }}
              />
            </div>
          </>
        )}

        <button
          className="sl-btn"
          disabled={!predictionTouched || atMax}
          onClick={runTrial}
          style={{
            background: predictionTouched && !atMax ? COLORS.amber : "rgba(255,255,255,.08)",
            color: predictionTouched && !atMax ? "#1A1200" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          ▶ Run Trial
        </button>
      </div>
    );
  }

  function RoundTwoReveal() {
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.cyan}55`, borderRadius: 16, padding: 18, marginBottom: 18, textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700, marginBottom: 10 }}>CONDITIONS CHANGED</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(234,240,246,.9)" }}>{publicCase.roundTwo.conditionChangeDescription}</p>
        <button
          className="sl-btn"
          onClick={beginRoundTwo}
          style={{ marginTop: 6, background: COLORS.cyan, color: "#08201D", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5 }}
        >
          Begin Round 2
        </button>
      </div>
    );
  }

  function DataTableCard() {
    const step = publicCase.dataTableStep;
    const canSubmit = dataTableSetting !== null && dataTablePrediction !== "" && !isNaN(Number(dataTablePrediction));
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.cyan}55`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700, marginBottom: 10 }}>DATA TABLE</div>
        <div style={{ fontSize: 13.5, color: "rgba(234,240,246,.85)", marginBottom: 14 }}>{step.instructions}</div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>Pick a {variable.label.toLowerCase()} you never tried this round:</div>
          <select
            value={dataTableSetting ?? ""}
            onChange={(e) => setDataTableSetting(e.target.value === "" ? null : Number(e.target.value))}
            style={{ width: "100%", borderRadius: 10, padding: 10, fontSize: 13.5, border: `1px solid ${COLORS.steelLine}`, background: "rgba(255,255,255,.06)", color: COLORS.white, fontFamily: "inherit" }}
          >
            <option value="" disabled style={{ color: "#111" }}>Choose an untested {variable.label.toLowerCase()}…</option>
            {untestedSettings.map((v) => (
              <option key={v} value={v} style={{ color: "#111" }}>{v}{variable.unit}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>Your predicted {outcome.label.toLowerCase()} ({outcome.unit}):</div>
          <input
            type="number"
            value={dataTablePrediction}
            onChange={(e) => setDataTablePrediction(e.target.value)}
            style={{ width: 100, borderRadius: 8, padding: "8px 10px", border: "1px solid #C9D4E8", background: "#EEF3FF", color: "#1A2432", fontWeight: 600 }}
          />
        </div>

        <button
          className="sl-btn"
          disabled={!canSubmit}
          onClick={submitDataTable}
          style={{
            marginTop: 16,
            background: canSubmit ? COLORS.cyan : "rgba(255,255,255,.08)",
            color: canSubmit ? "#08201D" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Submit Prediction
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={backgroundStyle}>
        <style>{`.sl-scrim { position: fixed; inset: 0; background: radial-gradient(1200px 700px at 50% -10%, ${COLORS.panel} 0%, ${COLORS.bgTop} 45%, ${COLORS.bgBottom} 100%); z-index: 0; pointer-events: none; }`}</style>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "40px auto", padding: "60px 20px", textAlign: "center", background: "rgba(26,36,50,.88)", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,.45)", border: `1px solid ${COLORS.steelLine}` }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Transmission received, Cadet.</h1>
          {cleanRun && (
            <div style={{ display: "inline-block", background: "rgba(255,166,48,.18)", border: `1px solid ${COLORS.amber}`, borderRadius: 999, padding: "8px 18px", fontWeight: 700, color: COLORS.amber, marginBottom: 14 }}>
              🌟 Clean run — every checkpoint and data-table prediction correct!
            </div>
          )}
          <p style={{ color: COLORS.textMuted }}>
            Your lab report is in. ECHO's read is just a first pass — your teacher is always the scorer of record.
          </p>
          {!selfConfidence ? (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10 }}>How solid do you feel about this one?</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {CONFIDENCE_LEVELS.map((c) => (
                  <button
                    key={c.id}
                    className="sl-btn"
                    onClick={() => pickConfidence(c.id)}
                    style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 12, padding: "12px 16px", color: COLORS.white, fontSize: 13 }}
                  >
                    <div style={{ fontSize: 22 }}>{c.emoji}</div>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 20, fontSize: 13, color: COLORS.textMuted }}>Thanks, Cadet.</div>
          )}
          <button
            className="sl-btn"
            onClick={() => router.push("/home")}
            style={{ marginTop: 28, background: COLORS.amber, color: "#1A1200", borderRadius: 12, padding: "12px 24px", fontWeight: 700 }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .sl-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .sl-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .sl-btn:disabled { cursor: default; }
        .sl-gauge-fill { transition: width 900ms cubic-bezier(.34,1.56,.64,1); }
        input[type="range"] { accent-color: ${COLORS.amber}; }
        .sl-slider { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 999px; background: rgba(255,255,255,.35); outline: none; }
        .sl-slider:disabled { opacity: .5; }
        .sl-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--thumb-color, #FFA630);
          border: 3px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.4); cursor: pointer;
        }
        .sl-slider::-moz-range-thumb {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--thumb-color, #FFA630);
          border: 3px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.4); cursor: pointer;
        }
        .sl-slider::-moz-range-track { height: 10px; border-radius: 999px; background: rgba(255,255,255,.35); }
      `}</style>

      <div
        style={{
          position: "relative", zIndex: 2, maxWidth: 760, margin: "40px auto", padding: "28px 24px 40px",
          background: "rgba(26,36,50,.88)", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,.45)",
          border: `1px solid ${COLORS.steelLine}`,
        }}
      >
        {revisionRequested && (
          <div style={{ background: "rgba(255,166,48,.15)", border: `1px solid ${COLORS.amber}`, borderRadius: 12, padding: 14, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Your teacher asked you to take another pass.</div>
            {revisionFeedback && <div style={{ fontSize: 13.5, color: COLORS.textMuted }}>{revisionFeedback}</div>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              className="sl-btn"
              onClick={() => router.push("/home")}
              style={{ background: "none", color: COLORS.white, padding: 0, fontWeight: 700, fontSize: 13 }}
            >
              ← Home
            </button>
            <div style={{ fontSize: 12, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700 }}>{PHASE_LABEL[phase]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              className="sl-btn"
              onClick={handleManualSave}
              disabled={manualSaveState === "saving"}
              style={{
                background: "rgba(255,255,255,.06)",
                border: `1px solid ${COLORS.steelLine}`,
                borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: COLORS.white,
              }}
            >
              {manualSaveState === "saving" ? "Saving…" : manualSaveState === "saved" ? "✓ Saved" : manualSaveState === "error" ? "Couldn't save — try again" : "💾 Save Progress"}
            </button>
            <div style={{ display: "flex", gap: 5 }}>
              {PHASES.map((p) => (
                <div key={p} style={{ width: 8, height: 8, borderRadius: 4, background: p === phase ? COLORS.amber : "rgba(255,255,255,.15)" }} />
              ))}
            </div>
          </div>
        </div>

        {phase === "brief" && (
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24 }}>{publicCase.title}</h1>
            <p style={{ color: "rgba(234,240,246,.85)", lineHeight: 1.6 }}>{publicCase.system.framing}</p>
            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 12, padding: 16, margin: "16px 0" }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 6 }}>THE QUESTION</div>
              <div>{publicCase.system.question}</div>
            </div>
            <button className="sl-btn" onClick={startLab}
              style={{ background: COLORS.amber, color: "#1A1200", borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}>
              Enter the Lab
            </button>
          </div>
        )}

        {phase === "lab" && (
          <div>
            <SamBanner />

            {labStep === "pretrialAnchor" && <PretrialAnchor />}
            {labStep === "pretrialVariables" && <PretrialVariables />}
            {labStep === "pretrialHypothesis" && (
              <div>
                <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>
                    {publicCase.pretrialSteps.hypothesis.title.toUpperCase()}
                  </div>
                  <StepImage src={publicCase.pretrialSteps.hypothesis.imageUrl} alt={publicCase.pretrialSteps.hypothesis.title} />
                  <p style={{ color: "rgba(234,240,246,.85)", lineHeight: 1.6, margin: 0 }}>{publicCase.pretrialSteps.hypothesis.text}</p>
                </div>
                <CheckpointCard cp={cpHyp} nextLabStep="console" />
              </div>
            )}
            {labStep === "checkpoint1" && <CheckpointCard cp={cp1} nextLabStep="roundTwoReveal" />}
            {labStep === "roundTwoReveal" && <RoundTwoReveal />}
            {labStep === "dataTable" && <DataTableCard />}
            {labStep === "checkpoint2" && <CheckpointCard cp={cp2} nextLabStep="complete" />}
            {labStep === "complete" && (
              <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.amber}55`, borderRadius: 16, padding: 18, marginBottom: 18, textAlign: "center" }}>
                <div style={{ fontSize: 15, marginBottom: 6 }}>Nice work, Cadet — you've run trials in both rounds and answered every checkpoint.</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Ready to explain what you found?</div>
              </div>
            )}
            {labStep === "console" && <Console />}

            {showTrialLogPanel && (
              <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700 }}>TRIAL LOG — ROUND 1</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{trialLogRoundOne.length} logged</div>
                </div>
                <TrialStrip log={trialLogRoundOne} />

                {(round === "roundTwo" || trialLogRoundTwo.length > 0) && (
                  <div style={{ marginTop: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700 }}>TRIAL LOG — ROUND 2 (heavier ball)</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{trialLogRoundTwo.length} logged</div>
                    </div>
                    <TrialStrip log={trialLogRoundTwo} />
                  </div>
                )}
              </div>
            )}

            {labStep === "console" && activeLog.length >= activeCfg.minTrials && activeLog.length < activeCfg.maxTrials && (
              <button
                className="sl-btn"
                onClick={() => setLabStep(round === "roundOne" ? "checkpoint1" : "dataTable")}
                style={{ marginTop: 14, background: "rgba(255,255,255,.08)", border: `1px solid ${COLORS.steelLine}`, color: COLORS.white, borderRadius: 12, padding: "10px 18px", fontWeight: 700, fontSize: 13.5 }}
              >
                {round === "roundOne" ? "I'm ready for the checkpoint →" : "I'm ready for the data table →"}
              </button>
            )}

            {labStep === "complete" && (
              <button
                className="sl-btn"
                onClick={goToFinal}
                style={{ marginTop: 18, background: COLORS.amber, color: "#1A1200", borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}
              >
                Ready to explain what I found →
              </button>
            )}
          </div>
        )}

        {phase === "finalUnlock" && (
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif" }}>Generalize & Defend</h2>
            <p style={{ color: "rgba(234,240,246,.85)", lineHeight: 1.6 }}>{publicCase.generalizePrompt}</p>

            <div style={{ marginBottom: 16, background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>ROUND 1 TRIAL LOG</div>
              <TrialStrip log={trialLogRoundOne} />
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700, margin: "16px 0 10px" }}>ROUND 2 TRIAL LOG (heavier ball)</div>
              <TrialStrip log={trialLogRoundTwo} />
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 8 }}>TAP A SENTENCE STARTER</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[GENERIC_OPENER_STEM, ...(publicCase.responseStems || [])].map((stem, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={submitted}
                    onClick={() => insertResponseStem(stem)}
                    style={{
                      background: "rgba(62,214,200,.12)",
                      border: `1px solid ${COLORS.cyan}88`,
                      color: "rgba(234,240,246,.9)",
                      borderRadius: 999, padding: "8px 14px", fontSize: 12.5, fontWeight: 600,
                      cursor: submitted ? "default" : "pointer", opacity: submitted ? 0.5 : 1,
                    }}
                  >
                    {stem}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              ref={finalResponseRef}
              value={finalResponseText}
              onChange={(e) => setFinalResponseText(e.target.value)}
              placeholder="Explain the pattern you found... or tap a sentence starter above"
              rows={9}
              disabled={submitted}
              style={{ width: "100%", borderRadius: 12, padding: 14, fontSize: 14.5, border: "1px solid #C9D4E8", background: "#EEF3FF", color: "#1A2432", fontFamily: "inherit", resize: "vertical" }}
            />

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>
                Check off the ones that are true — you need at least {REQUIRED_CHECKS} of {publicCase.selfCheckQuestions.length} ({checkedCount}/{publicCase.selfCheckQuestions.length} so far).
              </div>
              {publicCase.selfCheckQuestions.map((q, i) => (
                <label key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 13.5, cursor: "pointer" }}>
                  <input type="checkbox" checked={checklist[i]} onChange={() => toggleChecklistItem(i)} style={{ marginTop: 3 }} />
                  <span>{q}</span>
                </label>
              ))}
              {showChecklistError && (
                <div style={{ color: COLORS.danger, fontSize: 12, fontWeight: 600, marginTop: 6 }}>Check at least {REQUIRED_CHECKS} before submitting.</div>
              )}
            </div>

            <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 16, fontStyle: "italic" }}>
              ECHO's read is just a first pass — your teacher is always the scorer of record.
            </div>

            {submitError && <div style={{ color: COLORS.danger, marginTop: 10 }}>{submitError}</div>}

            <button className="sl-btn" onClick={handleRequestSubmit} disabled={submitting}
              style={{ marginTop: 18, background: COLORS.amber, color: "#1A1200", borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
              Submit Mission
            </button>
          </div>
        )}
      </div>

      {showSubmitConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,10,20,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, boxShadow: "0 12px 30px rgba(0,0,0,.4)", borderRadius: 16, padding: 24, maxWidth: 360, textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Submit this mission?</h3>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5 }}>You can't change your answer after this.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="sl-btn" onClick={() => setShowSubmitConfirm(false)} style={{ background: "transparent", border: `1px solid ${COLORS.steelLine}`, color: COLORS.white, borderRadius: 10, padding: "10px 18px" }}>Not yet</button>
              <button className="sl-btn" onClick={confirmSubmit} style={{ background: COLORS.amber, color: "#1A1200", borderRadius: 10, padding: "10px 18px", fontWeight: 700 }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
