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
  // Optional display names for the setting values, e.g. months:
  // scene.valueNames = { 0: "Dec", 1: "Jan", … }. Used on chart ticks, the
  // faded run markers and in S.A.M.'s lines wherever {v} is a setting.
  const names = sc.valueNames || null;
  const tickSuffix = sc.tickSuffix != null ? sc.tickSuffix : unitRaw.trim() === "°" ? "°" : "";
  const nameOf = (v) => (names && names[v] != null ? names[v] : `${v}${tickSuffix}`);
  const variable = {
    id: v0.id,
    label: v0.label,
    min: v0.min,
    max: v0.max,
    step: v0.step,
    axis: sc.variableAxis || v0.label,
    tickSuffix,
    name: nameOf,
    unitWord: sc.unitWord || unitRaw.trim(),
    // label on the faded marker of an earlier run, e.g. "10 breaths", "Level 5"
    ghost: (v) => (sc.ghostFormat ? sc.ghostFormat.replace("{v}", names ? nameOf(v) : v) : names ? nameOf(v) : `${v}${unitRaw}`),
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
    // Math cases: label each chart dot with its ordered pair, e.g. (4, 14)
    pairLabels: !!sc.pairLabels,
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
    const nm = (x) => (names && typeof x === "number" ? nameOf(x) : x);
    sam[k] = (v) => fill(templates[k], { v: nm(v), min: nm(variable.min), max: nm(variable.max) });
  });
  sam.toPattern = sam.toPattern || (() => "Three runs done! Look at your dots on the chart →");
  // How a run compares with the flag, e.g. "It went 1.5 m past your flag."
  // Gauge-style scenes override these ("It read 5 g higher than your flag.").
  sam.pastFlag = sam.pastFlag || ((t) => `It went ${t} past your flag.`);
  sam.beforeFlag = sam.beforeFlag || ((t) => `It stopped ${t} before your flag.`);
  sam.compareR1 = sam.compareR1 || ((t) => `In Round 1 the same setting went ${t}!`);
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
    subject: publicCase.subject || "Science",
    question: publicCase.system.question,
    framing: publicCase.system.framing,
    variable,
    outcome,
    unitTxt,
    runLabel: sc.runLabel || sceneModule.runLabel || "Run!",
    // free-form per-case options a scene may read (e.g. shadow's arc label)
    sceneOpts: sc.opts || {},
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
