// Simulation Lab scoring — shared by /api/simulation-lab/submit (real
// submissions), /api/simulation-lab/check (instant feedback on one choice)
// and the dev-only harness scorer. SERVER ONLY: it reads answer keys from
// the .server.js case files. Pure functions, no DB / network.
//
// Scene cases (public case has a `scene` block — every live case since
// Sept 24 2026) score exactly the checkpoints the scene flow asks
// (scene.checkpointIds, e.g. cp1 + fair), each on the FIRST attempt the
// student made (the flow lets them retry with a hint, "no shame" rule),
// and derive the data-table item from the Round 2 given-setting prediction.

function normalizeAnswer(text) {
  return (text || "").toLowerCase().trim().replace(/[.!?,;:]/g, "");
}

export function isCorrect(cp, submitted) {
  const s = submitted || {};
  if (cp.type === "mc" || cp.type === "dropdown") return s.submittedChoiceId === cp.correctChoiceId;
  if (cp.type === "multiSelect") {
    const a = new Set(s.submittedChoiceIds || []);
    const b = new Set(cp.correctChoiceIds || []);
    return a.size === b.size && [...b].every((id) => a.has(id));
  }
  if (cp.type === "fillBlank") {
    const n = normalizeAnswer(s.submittedText);
    return !!n && (cp.acceptedAnswers || []).some((x) => n.includes(normalizeAnswer(x)));
  }
  return false;
}

export function isSceneCase(publicCase) {
  return !!(publicCase && publicCase.scene && publicCase.scene.id);
}

export function sceneCheckpointIds(publicCase) {
  return (publicCase && publicCase.scene && publicCase.scene.checkpointIds) || ["cp1", "fair"];
}

export function scoreCheckpoints(serverCase, publicCase, submittedResults) {
  if (!serverCase || !serverCase.checkpoints) return { results: [], correctCount: 0, total: 0 };
  const byId = {};
  (submittedResults || []).forEach((r) => { if (r && r.id) byId[r.id] = r; });
  const scene = isSceneCase(publicCase);
  const ids = scene ? sceneCheckpointIds(publicCase) : null;
  const list = scene
    ? ids.map((id) => serverCase.checkpoints.find((c) => c.id === id)).filter(Boolean)
    : serverCase.checkpoints.filter((c) => !c.sceneOnly);
  const results = list.map((cp) => {
    const sub = byId[cp.id] || {};
    const row = { id: cp.id, type: cp.type, correct: isCorrect(cp, sub) };
    if (scene) {
      row.firstChoiceId = sub.submittedChoiceId || null;
      row.attempts = Array.isArray(sub.attemptChoiceIds) ? sub.attemptChoiceIds.slice(0, 10) : [];
    }
    return row;
  });
  const correctCount = results.filter((r) => r.correct).length;
  return { results, correctCount, total: results.length };
}

// For scene cases the Round 2 given-setting prediction (first Round 2 run,
// made before that setting was ever run with the new condition) is kept as
// the data-table item so the teacher sees it, but it is INFORMATIONAL only:
// the student has no Round 2 data yet when they make it, so grading it
// right/wrong would punish a hypothesis (the "no shame" rule). scoreSubmission
// zeroes its total so it never counts toward clean run / Distress Call.
export function deriveSceneDataTable(publicCase, roundTrialLogs) {
  const varId = publicCase.variables[0].id;
  const r2 = (roundTrialLogs && roundTrialLogs.roundTwo) || [];
  const first = r2[0];
  if (!first || first.prediction == null || first.prediction === "") return [];
  return [{ settingValue: Number(first[varId]), submittedValue: Number(first.prediction), excludeFromTested: 0 }];
}

export function scoreDataTable(publicCase, roundTrialLogs, dataTableResults) {
  if (!publicCase || !publicCase.dataTableStep || !dataTableResults || dataTableResults.length === 0) {
    return { results: [], correctCount: 0, total: 0 };
  }
  const step = publicCase.dataTableStep;
  const targetRound = publicCase[step.targetRound];
  const tolerance = typeof step.tolerance === "number" ? step.tolerance : 0;
  const variableId = publicCase.variables[0].id;
  const outcomeId = publicCase.outcome.id;
  const roundLog = (roundTrialLogs && roundTrialLogs[step.targetRound]) || [];
  const results = dataTableResults.map((r) => {
    const settingValue = Number(r.settingValue);
    // A scene prediction is the first run of the round, so only LATER runs
    // count as "already tested" for it.
    const log = r.excludeFromTested != null ? roundLog.filter((_, i) => i !== r.excludeFromTested) : roundLog;
    const tested = new Set(log.map((t) => Number(t[variableId])));
    const wasUntested = r.excludeFromTested != null ? !roundLog.slice(0, r.excludeFromTested).some((t) => Number(t[variableId]) === settingValue) : !tested.has(settingValue);
    const row = ((targetRound && targetRound.lookupTable) || []).find((x) => Number(x[variableId]) === settingValue);
    const expectedValue = row ? row[outcomeId] : null;
    const correct = wasUntested && expectedValue !== null && Math.abs(Number(r.submittedValue) - Number(expectedValue)) <= tolerance;
    return { settingValue, submittedValue: r.submittedValue, expectedValue, wasUntested, correct };
  });
  const correctCount = results.filter((r) => r.correct).length;
  return { results, correctCount, total: results.length };
}

// Re-computes every logged trial's real outcome from the public lookup
// tables so a tampered `actual` in the request can't reach the gradebook.
export function normalizeTrialLogs(publicCase, roundTrialLogs) {
  const varId = publicCase.variables[0].id, outId = publicCase.outcome.id;
  const fix = (log, round) =>
    (Array.isArray(log) ? log : []).slice(0, 12).map((t, i) => {
      const setting = Number(t && t[varId]);
      const row = (round.lookupTable || []).find((x) => Number(x[varId]) === setting);
      const actual = row ? row[outId] : null;
      const prediction = t && t.prediction != null && t.prediction !== "" ? Number(t.prediction) : null;
      return {
        id: (t && t.id) || `t${i + 1}`,
        [varId]: setting,
        prediction,
        actual,
        gap: prediction == null || actual == null ? null : Math.round(Math.abs(actual - prediction) * 10) / 10,
      };
    });
  return {
    roundOne: fix(roundTrialLogs && roundTrialLogs.roundOne, publicCase.roundOne),
    roundTwo: fix(roundTrialLogs && roundTrialLogs.roundTwo, publicCase.roundTwo),
  };
}

export const CONFIDENCE_IDS = ["shaky", "solid", "strong"];

// Full scoring for one submission body. Returns everything the submit
// route stores (minus the AI read of the written answer).
export function scoreSubmission(serverCase, publicCase, body) {
  const scene = isSceneCase(publicCase);
  const trialLog = scene && publicCase ? normalizeTrialLogs(publicCase, body.roundTrialLogs || {}) : {
    roundOne: (body.roundTrialLogs && body.roundTrialLogs.roundOne) || [],
    roundTwo: (body.roundTrialLogs && body.roundTrialLogs.roundTwo) || [],
  };
  const checkpointScore = scoreCheckpoints(serverCase, publicCase, body.checkpointResults || []);
  const dtInput = scene ? deriveSceneDataTable(publicCase, trialLog) : body.dataTableResults || [];
  let dataTableScore = scoreDataTable(publicCase, trialLog, dtInput);
  if (scene) dataTableScore = { ...dataTableScore, correctCount: 0, total: 0, informational: true };
  const cleanRun =
    checkpointScore.total > 0 &&
    checkpointScore.correctCount === checkpointScore.total &&
    (dataTableScore.total === 0 || dataTableScore.correctCount === dataTableScore.total);
  return { scene, trialLog, checkpointScore, dataTableScore, cleanRun };
}
