// Simulation Lab case validator (ClearCenters_STATE.md §9 rules 19 and 22).
//   node tools/simulation-lab-casecheck.cjs
// Every live case must run in the animated design: it needs a registered
// scene, the scene flow's checkpoints must exist in both the public and the
// server file, answer keys must stay out of the public file, and a perfect
// run must score as a clean run.
// No dependencies: a tiny loader turns the repo's `import`/`export` lines
// into CommonJS so these ES-module files can be required directly.
const fs = require("fs"), path = require("path"), Module = require("module");
const ROOT = path.join(__dirname, "..");

const origJs = require.extensions[".js"];
require.extensions[".js"] = (m, f) => {
  if (f.includes("node_modules")) return origJs(m, f);
  let src = fs.readFileSync(f, "utf8");
  const names = [];
  src = src
    .replace(/^import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["'];?/gm, (_, list, from) =>
      `const {${list.replace(/\s+as\s+/g, ": ")}} = require(${JSON.stringify(from)});`)
    .replace(/^import\s+(\w+)\s+from\s*["']([^"']+)["'];?/gm, (_, n, from) => `const ${n} = require(${JSON.stringify(from)}).default;`)
    .replace(/^export\s+(const|let|function)\s+(\w+)/gm, (_, kind, n) => { names.push(n); return `${kind} ${n}`; })
    .replace(/^export\s+default\s+/gm, "module.exports.default = ");
  src += "\n" + names.map((n) => `module.exports.${n} = ${n};`).join("\n");
  m._compile(src, f);
};

const SL = path.join(ROOT, "lib/cases/simulation-lab");
const PUB = require(path.join(SL, "index.public.js"));
const SRV = require(path.join(SL, "index.server.js"));
const { SCENE_IDS } = require(path.join(ROOT, "components/simulation-lab/sceneIds.js"));
const { scoreSubmission } = require(path.join(ROOT, "lib/simulationLabScoring.js"));
const registry = fs.readFileSync(path.join(ROOT, "components/simulation-lab/scenes/index.js"), "utf8");

let fails = 0;
const bad = (std, m) => { console.log(`  ✗ ${std}: ${m}`); fails++; };

// Scene registry agreement (sceneIds.js vs scenes/index.js vs files on disk).
for (const id of SCENE_IDS) {
  if (!fs.existsSync(path.join(ROOT, "components/simulation-lab/scenes", `${id}.js`))) bad("scenes", `no scenes/${id}.js for id "${id}"`);
  if (!new RegExp(`from "\\./${id}"`).test(registry)) bad("scenes", `"${id}" is in sceneIds.js but not imported in scenes/index.js`);
}

// The registry has no list function, so read its keys ("3.8B-SL": CASE_…).
const standards = [...fs.readFileSync(path.join(SL, "index.public.js"), "utf8").matchAll(/^\s*"([^"]+-SL)"\s*:/gm)].map((m) => m[1]);
if (!standards.length) { console.log("could not list cases (index.public.js exports?)"); process.exit(2); }
console.log(`checking ${standards.length} Simulation Lab cases\n`);

const KEY_FIELDS = ["correctChoiceId", "correctChoiceIds", "acceptedAnswers", "correctOrder", "mustInclude", "feedback"];
function findKeys(o, trail, out) {
  if (!o || typeof o !== "object") return out;
  for (const k of Object.keys(o)) {
    if (KEY_FIELDS.includes(k)) out.push(trail + k);
    findKeys(o[k], trail + k + ".", out);
  }
  return out;
}

for (const std of standards) {
  const p = PUB.getSimulationLabPublicCase(std);
  const s = SRV.getSimulationLabServerCase(std);
  if (!p) { bad(std, "no public case"); continue; }
  if (!s) { bad(std, "no server case"); continue; }
  const sc = p.scene;
  if (!sc || !SCENE_IDS.includes(sc.id)) { bad(std, `no registered scene (scene.id = ${sc && sc.id}); rule 22: every live case needs one`); continue; }

  const leaked = findKeys(p, "", []);
  if (leaked.length) bad(std, `answer-key fields in the PUBLIC file: ${leaked.join(", ")}`);

  const v = p.variables[0];
  if (sc.predictSetting != null && (sc.predictSetting < v.min || sc.predictSetting > v.max)) bad(std, `predictSetting ${sc.predictSetting} outside ${v.min}..${v.max}`);
  for (const [name, round] of [["roundOne", p.roundOne], ["roundTwo", p.roundTwo]]) {
    const have = new Set((round.lookupTable || []).map((r) => r[v.id]));
    for (let x = v.min; x <= v.max + 1e-9; x += v.step) {
      const k = Math.round(x * 1000) / 1000;
      if (!have.has(k)) { bad(std, `${name}.lookupTable has no row for ${v.id}=${k}`); break; }
    }
  }
  if (!(sc.twist && sc.twist.type)) bad(std, "scene.twist.type missing");
  // Scenes that support more than one twist read cfg.twist.type; the case's
  // twist must be one they know (otherwise the default twist plays silently).
  try {
    const src = fs.readFileSync(path.join(ROOT, "components/simulation-lab/scenes", `${sc.id}.js`), "utf8");
    if (/twist\.type/.test(src) && sc.twist && !src.includes(`"${sc.twist.type}"`)) bad(std, `scene "${sc.id}" picks its twist by type but never mentions "${sc.twist.type}"`);
  } catch (e) { /* missing file is reported by the scene checks above */ }
  // valueNames must name every setting (chart ticks, ghost chips, S.A.M. lines)
  if (sc.valueNames) for (let x = v.min; x <= v.max + 1e-9; x += v.step) { const k = Math.round(x * 1000) / 1000; if (sc.valueNames[k] == null) { bad(std, `scene.valueNames has no name for ${k}`); break; } }
  // Math cases graph number pairs: they should turn pairLabels on
  if (p.subject === "Math" && !sc.pairLabels) bad(std, "Math case without scene.pairLabels (the chart is the graph of number pairs)");

  const ids = sc.checkpointIds || ["cp1", "fair"];
  const perfect = [];
  for (const id of ids) {
    const pc = (p.checkpoints || []).find((c) => c.id === id);
    const sv = (s.checkpoints || []).find((c) => c.id === id);
    if (!pc) { bad(std, `checkpoint ${id} missing from public file`); continue; }
    if (!sv) { bad(std, `checkpoint ${id} missing from server file`); continue; }
    if (pc.type !== sv.type) bad(std, `${id}: type ${pc.type} (public) vs ${sv.type} (server)`);
    const choiceIds = (pc.choices || []).map((c) => c.id);
    if (sv.correctChoiceId && !choiceIds.includes(sv.correctChoiceId)) bad(std, `${id}: server key "${sv.correctChoiceId}" is not a public choice (${choiceIds.join("/")})`);
    const fb = s.feedback && s.feedback[id];
    if (!fb || !fb.yes || !fb.hint) bad(std, `${id}: server feedback needs yes + hint`);
    const icons = (sc.choiceIcons && sc.choiceIcons[id]) || {};
    if (id !== ids[0]) (pc.choices || []).forEach((c) => { if (!c.icon && !icons[c.id]) bad(std, `${id}: choice ${c.id} has no icon`); });
    perfect.push({ id, submittedChoiceId: sv.correctChoiceId, attemptChoiceIds: [sv.correctChoiceId] });
  }

  // A perfect run must be a clean run, and a wrong first answer must not be.
  const setting = sc.predictSetting != null ? sc.predictSetting : v.min;
  const t2 = Object.fromEntries(p.roundTwo.lookupTable.map((r) => [r[v.id], r[p.outcome.id]]));
  const body = {
    checkpointResults: perfect,
    roundTrialLogs: {
      roundOne: [v.min, setting, v.max].map((x) => ({ [v.id]: x })),
      roundTwo: [{ [v.id]: setting, predicted: t2[setting] }, { [v.id]: v.max }],
    },
  };
  let r;
  try { r = scoreSubmission(s, p, body); } catch (e) { bad(std, `scoreSubmission threw: ${e.message}`); continue; }
  if (!r.cleanRun) bad(std, `perfect run is not a clean run (${r.checkpointScore.correctCount}/${r.checkpointScore.total})`);
  if (r.checkpointScore.total !== ids.length) bad(std, `scored ${r.checkpointScore.total} checkpoints, flow asks ${ids.length}`);
  const wrong = { ...body, checkpointResults: perfect.map((c, i) => (i === 0 ? { ...c, submittedChoiceId: "__wrong__" } : c)) };
  if (scoreSubmission(s, p, wrong).cleanRun) bad(std, "a wrong first answer still scores as a clean run");
  console.log(`  ✓ ${std}  scene=${sc.id}  twist=${sc.twist && sc.twist.type}`);
}

console.log(fails ? `\n${fails} problem(s)` : "\nall Simulation Lab cases OK");
process.exit(fails ? 1 : 0);
