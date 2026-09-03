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
// Group Chat's violet. No background photo is used anywhere in this engine
// (see SimulationLab_Digital_Design_v1.md — zero image dependency is a
// deliberate cost-discipline feature of this engine, not a placeholder
// waiting on art): the "control room" look comes entirely from CSS gradients
// and the gauge glow, so this case ships and looks finished with no assets.
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

// Three phases, same shape as every other engine's top-level state machine
// (Mission Map's brief/walk/finalUnlock): brief the mission, run the lab
// (console loop + the two checkpoint-style comprehension checks approved in
// the v2 design), then the Generalize + Defend written phase.
const PHASES = ["brief", "lab", "finalUnlock"];
const PHASE_LABEL = { brief: "Mission Brief", lab: "The Lab", finalUnlock: "Generalize & Defend" };

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
// Map's SAM_REACTIONS. Simulation Lab's checkpoints are single-attempt (see
// the design doc §7 note in the client build) and never show a right/wrong
// mark back to the student — S.A.M.'s line after a checkpoint or the
// data-table step is always a neutral, encouraging acknowledgement, never a
// judgment, same "no shame" rule the rest of the app follows for misses.
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
    "Nice recall, Cadet — that's a real data table now.",
    "Logged. Your trial strip is doing its job.",
    "Good — that's exactly what real scientists do with their own data.",
  ],
  arrival: [
    "Set the angle, make your prediction, then hit Run.",
    "Try a setting you haven't tested yet.",
    "Watch the gap between your prediction and the real result.",
    "The pattern gets clearer with every trial.",
  ],
};
function pickSamLine(category) {
  const pool = SAM_REACTIONS[category];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Picks which of the student's own already-run trials get blanked in the
// Data Table Fill-In step — first, middle, most-recent — same "own data,
// never a case-authored key" rule described in the design doc §7. Computed
// once (see the effect below) so the row set doesn't shift under the
// student if they keep running trials afterward.
function pickFirstMiddleLastIds(trialLog) {
  const n = trialLog.length;
  if (n === 0) return [];
  if (n <= 3) return trialLog.map((t) => t.id);
  const first = 0;
  const mid = Math.floor((n - 1) / 2);
  const last = n - 1;
  const idxs = Array.from(new Set([first, mid, last]));
  return idxs.map((i) => trialLog[i].id);
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
  const minCp1 = publicCase.minTrialsForCheckpoint1 || 3;
  const minTable = publicCase.minTrialsForDataTable || 6;
  const cp1 = publicCase.checkpoints.find((c) => c.type === "mc");
  const cp2 = publicCase.checkpoints.find((c) => c.type === "fillBlank");

  const [phase, setPhase] = useState(
    alreadySubmitted && !revisionRequested ? "finalUnlock" : draft.phase || "brief"
  );

  // labStep walks: "console" (predict/run/log loop) -> "checkpoint1" ->
  // (back to console until minTable reached) -> "dataTable" ->
  // "checkpoint2" -> back to "console", where a "Move on" button then
  // appears once checkpoint2 is done. See the effect below for the actual
  // trigger logic.
  const [labStep, setLabStep] = useState(draft.labStep || "console");
  const [trialLog, setTrialLog] = useState(draft.trialLog || []);
  const [currentAngle, setCurrentAngle] = useState(draft.currentAngle ?? variable.min);
  const [currentPrediction, setCurrentPrediction] = useState(
    draft.currentPrediction ?? Math.round((outcome.displayMin + outcome.displayMax) / 2)
  );
  const [predictionTouched, setPredictionTouched] = useState(false);
  const [lastRun, setLastRun] = useState(null); // { angle, prediction, actual, gap }

  const [checkpoint1Done, setCheckpoint1Done] = useState(draft.checkpoint1Done || false);
  const [checkpoint1ChoiceId, setCheckpoint1ChoiceId] = useState(draft.checkpoint1ChoiceId || null);
  const [pendingCp1Choice, setPendingCp1Choice] = useState(null);

  const [dataTableDone, setDataTableDone] = useState(draft.dataTableDone || false);
  const [dataTableRowIds, setDataTableRowIds] = useState(draft.dataTableRowIds || []);
  const [dataTableAnswers, setDataTableAnswers] = useState(draft.dataTableAnswers || {});

  const [checkpoint2Done, setCheckpoint2Done] = useState(draft.checkpoint2Done || false);
  const [checkpoint2Text, setCheckpoint2Text] = useState(draft.checkpoint2Text || "");
  const [pendingCp2Text, setPendingCp2Text] = useState("");

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
          trialLog,
          currentAngle,
          currentPrediction,
          checkpoint1Done,
          checkpoint1ChoiceId,
          dataTableDone,
          dataTableRowIds,
          dataTableAnswers,
          checkpoint2Done,
          checkpoint2Text,
          finalResponseText,
          checklist,
          self_confidence: selfConfidence,
        })
      );
    } catch (err) {}
  }, [
    phase,
    labStep,
    trialLog,
    currentAngle,
    currentPrediction,
    checkpoint1Done,
    checkpoint1ChoiceId,
    dataTableDone,
    dataTableRowIds,
    dataTableAnswers,
    checkpoint2Done,
    checkpoint2Text,
    finalResponseText,
    checklist,
    selfConfidence,
  ]);

  // The checkpoint/data-table trigger cascade (design doc §7). Only checked
  // while the student is in the plain console step, so an already-open
  // checkpoint or data-table card is never interrupted mid-answer.
  useEffect(() => {
    if (labStep !== "console") return;
    const trials = trialLog.length;
    if (!checkpoint1Done && trials >= minCp1) {
      setLabStep("checkpoint1");
      return;
    }
    if (checkpoint1Done && !dataTableDone && trials >= minTable) {
      if (dataTableRowIds.length === 0) setDataTableRowIds(pickFirstMiddleLastIds(trialLog));
      setLabStep("dataTable");
      return;
    }
  }, [labStep, trialLog, checkpoint1Done, dataTableDone, dataTableRowIds, minCp1, minTable]);

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
        trialLog,
        checkpoint1Done,
        checkpoint1ChoiceId,
        dataTableDone,
        dataTableRowIds,
        dataTableAnswers,
        checkpoint2Done,
        checkpoint2Text,
        finalResponseText,
        checklist,
      },
      self_confidence: selfConfidence,
    });
    setManualSaveState(ok ? "saved" : "error");
    if (ok) setTimeout(() => setManualSaveState("idle"), 2000);
  }

  function runTrial() {
    if (!predictionTouched) return;
    const row = publicCase.lookupTable.find((r) => r[variable.id] === currentAngle);
    const actual = row ? row[outcome.id] : 0;
    setLastRun({ angle: currentAngle, prediction: currentPrediction, actual, gap: Math.abs(actual - currentPrediction) });
  }

  function logTrialAndContinue() {
    if (!lastRun) return;
    const id = `t${trialLog.length + 1}`;
    setTrialLog((prev) => [...prev, { id, angle: lastRun.angle, prediction: lastRun.prediction, actual: lastRun.actual, gap: lastRun.gap }]);
    setLastRun(null);
    setPredictionTouched(false);
    showSam("trialLogged");
  }

  function submitCheckpoint1() {
    if (!pendingCp1Choice) return;
    setCheckpoint1ChoiceId(pendingCp1Choice);
    setCheckpoint1Done(true);
    setPendingCp1Choice(null);
    setLabStep("console");
    showSam("checkpointAnswered");
  }

  const dataTableRows = dataTableRowIds
    .map((id) => trialLog.find((t) => t.id === id))
    .filter(Boolean);
  const dataTableFilled = dataTableRows.every(
    (r) => dataTableAnswers[r.id] !== undefined && String(dataTableAnswers[r.id]).trim() !== ""
  );

  function submitDataTable() {
    if (!dataTableFilled) return;
    setDataTableDone(true);
    setLabStep("checkpoint2");
    showSam("dataTableSubmitted");
  }

  function submitCheckpoint2() {
    if (!pendingCp2Text.trim()) return;
    setCheckpoint2Text(pendingCp2Text.trim());
    setCheckpoint2Done(true);
    setPendingCp2Text("");
    setLabStep("console");
    showSam("checkpointAnswered");
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
      const checkpointResults = [
        { id: cp1.id, type: "mc", submittedChoiceId: checkpoint1ChoiceId },
        { id: cp2.id, type: "fillBlank", submittedText: checkpoint2Text },
      ];
      const dataTableResults = dataTableRowIds.map((id) => ({ trialId: id, submittedValue: dataTableAnswers[id] }));

      const res = await fetch("/api/simulation-lab/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          trialLog,
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

  const backgroundStyle = {
    minHeight: "100vh",
    background: `radial-gradient(1200px 700px at 50% -10%, ${COLORS.panel} 0%, ${COLORS.bgTop} 45%, ${COLORS.bgBottom} 100%)`,
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
    position: "relative",
  };

  const outcomeRange = outcome.displayMax - outcome.displayMin;
  const actualPercent = lastRun ? ((lastRun.actual - outcome.displayMin) / outcomeRange) * 100 : 0;
  const predictionPercent = ((currentPrediction - outcome.displayMin) / outcomeRange) * 100;

  // --- Trial strip (the running log) ----------------------------------
  function TrialStrip() {
    if (trialLog.length === 0) {
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
            {trialLog.map((t, i) => (
              <tr key={t.id} style={{ borderTop: `1px solid ${COLORS.steelLine}` }}>
                <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{i + 1}</td>
                <td style={{ padding: "6px 8px" }}>{t.angle}{variable.unit}</td>
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

  // --- The Console (predict / run / compare) ---------------------------
  function Console() {
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 12 }}>CONSOLE</div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span>{variable.label}</span>
            <span style={{ color: COLORS.amber, fontWeight: 700 }}>{currentAngle}{variable.unit}</span>
          </div>
          <input
            type="range"
            min={variable.min}
            max={variable.max}
            step={variable.step}
            value={currentAngle}
            disabled={!!lastRun}
            onChange={(e) => setCurrentAngle(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span>Your Prediction — {outcome.label}</span>
            <span style={{ color: COLORS.cyan, fontWeight: 700 }}>
              {predictionTouched ? `${currentPrediction} ${outcome.unit}` : "drag to predict"}
            </span>
          </div>
          <input
            type="range"
            min={outcome.displayMin}
            max={outcome.displayMax}
            step={1}
            value={currentPrediction}
            disabled={!!lastRun}
            onChange={(e) => { setCurrentPrediction(Number(e.target.value)); setPredictionTouched(true); }}
            style={{ width: "100%", accentColor: COLORS.cyan }}
          />
        </div>

        {/* The gauge — a fill bar that CSS-transitions to the real value on
            Run, with the prediction marker shown as a fixed vertical line so
            the gap between prediction and result is visible at a glance. */}
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

        {!lastRun ? (
          <button
            className="sl-btn"
            disabled={!predictionTouched}
            onClick={runTrial}
            style={{
              background: predictionTouched ? COLORS.amber : "rgba(255,255,255,.08)",
              color: predictionTouched ? "#1A1200" : COLORS.textMuted,
              borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
            }}
          >
            ▶ Run Trial
          </button>
        ) : (
          <button
            className="sl-btn"
            onClick={logTrialAndContinue}
            style={{ background: COLORS.cyan, color: "#08201D", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5 }}
          >
            Log Trial & Continue
          </button>
        )}
      </div>
    );
  }

  function Checkpoint1Card() {
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.amber}55`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>CHECKPOINT</div>
        <div style={{ fontSize: 15, marginBottom: 14 }}>{cp1.prompt}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cp1.choices.map((c) => (
            <button
              key={c.id}
              className="sl-btn"
              onClick={() => setPendingCp1Choice(c.id)}
              style={{
                textAlign: "left",
                background: pendingCp1Choice === c.id ? "rgba(255,166,48,.18)" : "rgba(255,255,255,.04)",
                border: `1px solid ${pendingCp1Choice === c.id ? COLORS.amber : COLORS.steelLine}`,
                borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: COLORS.white,
              }}
            >
              {c.text}
            </button>
          ))}
        </div>
        <button
          className="sl-btn"
          disabled={!pendingCp1Choice}
          onClick={submitCheckpoint1}
          style={{
            marginTop: 16,
            background: pendingCp1Choice ? COLORS.amber : "rgba(255,255,255,.08)",
            color: pendingCp1Choice ? "#1A1200" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  function DataTableCard() {
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.cyan}55`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.cyan, fontWeight: 700, marginBottom: 10 }}>DATA TABLE</div>
        <div style={{ fontSize: 13.5, color: "rgba(234,240,246,.85)", marginBottom: 14 }}>{publicCase.dataTableStep.instructions}</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ textAlign: "left", color: COLORS.textMuted }}>
                <th style={{ padding: "4px 8px" }}>{variable.label}</th>
                <th style={{ padding: "4px 8px" }}>Your Prediction</th>
                <th style={{ padding: "4px 8px" }}>{outcome.label}</th>
              </tr>
            </thead>
            <tbody>
              {dataTableRows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${COLORS.steelLine}` }}>
                  <td style={{ padding: "6px 8px" }}>{r.angle}{variable.unit}</td>
                  <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{r.prediction}</td>
                  <td style={{ padding: "6px 8px" }}>
                    <input
                      type="number"
                      value={dataTableAnswers[r.id] ?? ""}
                      onChange={(e) => setDataTableAnswers((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      style={{ width: 70, borderRadius: 8, padding: "6px 8px", border: `1px solid ${COLORS.steelLine}`, background: "rgba(255,255,255,.06)", color: COLORS.white }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="sl-btn"
          disabled={!dataTableFilled}
          onClick={submitDataTable}
          style={{
            marginTop: 16,
            background: dataTableFilled ? COLORS.cyan : "rgba(255,255,255,.08)",
            color: dataTableFilled ? "#08201D" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Submit Table
        </button>
      </div>
    );
  }

  function Checkpoint2Card() {
    return (
      <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.amber}55`, borderRadius: 16, padding: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>CHECKPOINT</div>
        <div style={{ fontSize: 15, marginBottom: 14 }}>{cp2.prompt}</div>
        <input
          type="text"
          value={pendingCp2Text}
          onChange={(e) => setPendingCp2Text(e.target.value)}
          placeholder={cp2.placeholder}
          style={{ width: "100%", borderRadius: 10, padding: 10, fontSize: 13.5, border: `1px solid ${COLORS.steelLine}`, background: "rgba(255,255,255,.06)", color: COLORS.white, fontFamily: "inherit" }}
        />
        <button
          className="sl-btn"
          disabled={!pendingCp2Text.trim()}
          onClick={submitCheckpoint2}
          style={{
            marginTop: 16,
            background: pendingCp2Text.trim() ? COLORS.amber : "rgba(255,255,255,.08)",
            color: pendingCp2Text.trim() ? "#1A1200" : COLORS.textMuted,
            borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14.5,
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={backgroundStyle}>
        <style>{`.sl-scrim { position: fixed; inset: 0; background: radial-gradient(1200px 700px at 50% -10%, ${COLORS.panel} 0%, ${COLORS.bgTop} 45%, ${COLORS.bgBottom} 100%); z-index: 0; pointer-events: none; }`}</style>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Transmission received, Cadet.</h1>
          {cleanRun && (
            <div style={{ display: "inline-block", background: "rgba(255,166,48,.18)", border: `1px solid ${COLORS.amber}`, borderRadius: 999, padding: "8px 18px", fontWeight: 700, color: COLORS.amber, marginBottom: 14 }}>
              🌟 Clean run — every checkpoint and data-table cell correct!
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
      `}</style>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "24px 20px 80px" }}>
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
            {labStep === "checkpoint1" && <Checkpoint1Card />}
            {labStep === "dataTable" && <DataTableCard />}
            {labStep === "checkpoint2" && <Checkpoint2Card />}
            {labStep === "console" && <Console />}

            <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.steelLine}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700 }}>TRIAL LOG</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{trialLog.length} logged</div>
              </div>
              <TrialStrip />
            </div>

            {checkpoint2Done && labStep === "console" && (
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
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.amber, fontWeight: 700, marginBottom: 10 }}>YOUR TRIAL LOG</div>
              <TrialStrip />
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
              style={{ width: "100%", borderRadius: 12, padding: 14, fontSize: 14.5, border: `1px solid ${COLORS.steelLine}`, background: "rgba(255,255,255,.06)", color: COLORS.white, fontFamily: "inherit", resize: "vertical" }}
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
