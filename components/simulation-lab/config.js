// Turns a PUBLIC case file (+ its scene module) into the config the engine
// and shell use. Everything here is public data: lookup tables are the
// case's "physics" (see the note atop 3-8B-SL.public.js); checkpoint answer
// keys and feedback live only in the .server.js files and are checked via
// POST /api/simulation-lab/check.
import { fmtNum } from "./kit/core";

function tableToMap(rows, varId, outId) {
  const m = {};
  (rows || []).forEach((r) => { m[r[varId]] = r[outId]; });
  return m;
}

function fill(template, vars) {
  return String(template || "").replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ""));
}

export function buildSceneConfig(publicCase, sceneModule) {
  const sc = publicCase.scene || {};
  const v0 = publicCase.variables[0];
  const out = publicCase.outcome;
  const unitRaw = v0.unit || "";
  const variable = {
    id: v0.id,
    label: v0.label,
    min: v0.min,
    max: v0.max,
    step: v0.step,
    axis: sc.variableAxis || v0.label,
    tickSuffix: unitRaw.trim() === "°" ? "°" : "",
    unitWord: unitRaw.trim(),
    ghost: (v) => `${v}${unitRaw}`,
  };
  const outcome = {
    id: out.id,
    label: out.label,
    max: out.displayMax,
    snap: sc.snap || 1,
    unit: sc.unit || out.unit,
    unit1: sc.unitOne || sc.unit || out.unit,
    short: sc.unit || out.unit,
    axis: sc.outcomeAxis || out.label,
  };
  const unitTxt = (v) => (outcome.unit === "m" ? `${fmtNum(v)} m` : `${fmtNum(v)} ${Number(v) === 1 ? outcome.unit1 : outcome.unit}`);

  const twist = sc.twist || {};
  const templates = {
    ...(sceneModule.sam || {}),
    ...((sceneModule.samByTwist && sceneModule.samByTwist[twist.type]) || {}),
    ...(sc.sam || {}),
  };
  const sam = {};
  Object.keys(templates).forEach((k) => {
    sam[k] = (v) => fill(templates[k], { v, min: variable.min, max: variable.max });
  });
  sam.toPattern = sam.toPattern || (() => `${sc.r1Runs || 3} runs done! Look at your dots on the chart →`);
  sam.twistDone = sam.twistDone || (() => "See your orange dots? Compare them with the teal ones from Round 1.");

  const byId = {};
  (publicCase.checkpoints || []).forEach((c) => { byId[c.id] = c; });
  const [patternId, fairId] = sc.checkpointIds || ["cp1", "fair"];
  const icons = sc.choiceIcons || {};
  const withIcons = (cp) => cp && {
    id: cp.id,
    type: cp.type,
    prompt: cp.prompt || cp.promptTemplate,
    choices: (cp.choices || []).map((c) => ({ ...c, icon: c.icon || (icons[cp.id] && icons[cp.id][c.id]) || null })),
  };

  return {
    standard: publicCase.standard,
    title: publicCase.title,
    grade: publicCase.grade,
    question: publicCase.system.question,
    framing: publicCase.system.framing,
    variable,
    outcome,
    unitTxt,
    runLabel: sc.runLabel || sceneModule.runLabel || "Run!",
    resetLabel: sc.resetLabel || sceneModule.resetLabel || "Reset",
    round1: { runs: sc.r1Runs || 3, table: tableToMap(publicCase.roundOne.lookupTable, v0.id, out.id) },
    round2: {
      runs: sc.r2Runs || 2,
      label: publicCase.roundTwoLabel || "conditions changed",
      banner: twist.banner || "Conditions change!",
      description: publicCase.roundTwo.conditionChangeDescription,
      question: twist.question || publicCase.system.question,
      predictSetting: sc.predictSetting != null ? sc.predictSetting : v0.min,
      table: tableToMap(publicCase.roundTwo.lookupTable, v0.id, out.id),
    },
    twist,
    sam,
    pattern: withIcons(byId[patternId]),
    fairTest: withIcons(byId[fairId]),
    generalize: {
      title: sc.explainTitle || "Explain your discovery",
      prompt: publicCase.generalizePrompt,
      stems: publicCase.responseStems || [],
    },
    selfCheck: publicCase.selfCheckQuestions || [],
  };
}
