// ClearDecode content checks (Sept 30, 2026).
//   node tools/cleardecode-check.cjs                 -> ladder + every ruin in lib/cleardecode/ruins
//   node tools/cleardecode-check.cjs G2 H1           -> just those ruin files
// Rules: claude/ClearDecode_Content_Plan_v1.md §5.
const ts = require("/opt/node22/lib/node_modules/typescript");
const fs = require("fs");
const path = require("path");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const L = require(__dirname + "/../lib/cleardecode/ladder.js");
const RUIN_DIR = path.join(__dirname, "../lib/cleardecode/ruins");

const problems = [];
const warn = [];
const bad = (id, msg) => problems.push(`${id}: ${msg}`);

// ---------- decodability proxy ----------
// A word in an inscription "uses a pattern not taught yet" when it shows the
// marker of a LATER ruin. Markers are simple spelling signals, so the check is
// a proxy: it catches most slips, and a human still reads every log.
const DIGRAPHS = /(tch|dge|sh|th|ch|wh|ph|ck|ng|nk|qu|ll|ss|ff|zz)/g;
const MARKERS = {
  A2: (w) => /o/.test(w),
  A3: (w) => /u/.test(w),
  A4: (w) => /e/.test(w),
  B1: (w) => /(ff|ll|ss|zz)/.test(w),
  B2: (w) => /ck/.test(w),
  B3: (w) => /(sh|th)/.test(w),
  B4: (w) => /(ch|wh|ph)/.test(w),
  B5: (w) => /(ng|nk)/.test(w),
  B6: (w) => /[^aeiouy1]{2}/.test(w.replace(DIGRAPHS, "1").replace(/s$/, "")),
  C1: (w) => /a[^aeiou\s]e$/.test(w),
  C2: (w) => /i[^aeiou\s]e$/.test(w),
  C3: (w) => /[oue][^aeiou\sr]e$/.test(w),
  C4: (w) => /[aeiou](ce|ge)$/.test(w),
  D1: (w) => /[a-z]{2}(ed|ing)$/.test(w),
  E1: (w) => /(tch|dge)/.test(w),
  E2: (w) => /(ild|old|ind|olt|ost)$/.test(w),
  E3: (w) => w.length > 2 && /[^aeiou]y$/.test(w),
  E4: (w) => /[^aeiou]le$/.test(w),
  F1: (w) => /ar/.test(w),
  F2: (w) => /or/.test(w),
  F3: (w) => /(er|ir|ur)/.test(w),
  G1: (w) => /(ai|ay)/.test(w),
  G2: (w) => /(ee|ea|ey)/.test(w),
  G3: (w) => /(oa|oe)/.test(w) || /ow$/.test(w),
  G4: (w) => /(ie|igh)/.test(w),
  H1: (w) => /oo/.test(w),
  H2: (w) => /(ew|ui|ue)/.test(w),
  H3: (w) => /au|aw(?!ay)/.test(w),
  H4: (w) => /oy|oi(?!ng)/.test(w),
  H5: (w) => /ou/.test(w) || /ow[nl]/.test(w),
  H6: (w) => /^(kn|wr)|mb$/.test(w),
};
function laterMarker(id, w) {
  const at = L.ruinIndex(id);
  for (const [rid, test] of Object.entries(MARKERS)) {
    if (L.ruinIndex(rid) > at && test(w)) return rid;
  }
  return null;
}

// ---------- ladder ----------
function checkLadder() {
  if (L.RUINS.length !== 55) bad("ladder", `expected 55 ruins, found ${L.RUINS.length}`);
  for (const ru of L.RUINS) {
    const { pick, spell, alien } = ru.probe;
    for (const arr of [pick, ...alien]) {
      if (!Array.isArray(arr) || arr.length !== 3) bad(ru.id, `probe item needs 3 options: ${JSON.stringify(arr)}`);
      else if (new Set(arr).size !== 3) bad(ru.id, `probe options repeat: ${arr.join("/")}`);
    }
    if (spell.parts.join("") !== spell.word) bad(ru.id, `spell parts don't make ${spell.word}`);
  }
}

// ---------- one ruin ----------
const REQUIRED = ["id", "name", "find", "code", "sort", "codex", "checks", "vaultPicks", "bank", "contrast", "wall", "door", "chains", "heart", "vaultFake", "inscriptions", "relic", "story", "spanish", "miniLesson"];
function checkRuin(id, c) {
  for (const k of REQUIRED) if (c[k] === undefined) bad(id, `missing field: ${k}`);
  if (problems.some((p) => p.startsWith(`${id}: missing`))) return;
  if (c.id !== id) bad(id, `id field is ${c.id}`);
  if (!L.getRuin(id)) bad(id, "not on the ladder");
  const find = new RegExp(c.find, "i");
  if (!Array.isArray(c.code.spellings) || !c.code.spellings.length || !c.code.label || !c.code.rule) bad(id, "code needs label, spellings, rule");
  for (const k of ["yes", "yesHint", "no", "noHint"]) if (typeof c.sort[k] !== "string") bad(id, `sort.${k} missing`);
  for (const k of ["hintYes", "hintNo"]) if (typeof c.sort[k] !== "function") bad(id, `sort.${k} must be a function`);
  if (c.codex.length !== 6) bad(id, `codex needs 6 words, has ${c.codex.length}`);
  c.codex.forEach((x) => { if (x.parts.join("") !== x.w) bad(id, `codex parts don't make ${x.w}`); if (!find.test(x.parts[x.hi] || "")) bad(id, `codex chunk for ${x.w} lacks the code`); });
  [...c.checks, ...c.vaultPicks, ...c.vaultFake].forEach((a) => { if (!Array.isArray(a) || a.length !== 3 || new Set(a).size !== 3) bad(id, `check needs 3 different options: ${JSON.stringify(a)}`); });
  [...c.checks, ...c.vaultPicks].forEach((a) => { if (Array.isArray(a) && !find.test(a[0])) bad(id, `check answer ${a[0]} lacks the code`); });
  if (c.checks.length < 12) bad(id, `needs 12 checks (3 per chamber), has ${c.checks.length}`);
  if (c.vaultPicks.length < 8) bad(id, "needs 8 vault picks");
  if (c.vaultFake.length < 2) bad(id, "needs at least 2 vaultFake items");
  c.bank.forEach((w) => { if (!find.test(w)) bad(id, `bank word without the code: ${w}`); });
  if (new Set(c.bank).size !== c.bank.length) bad(id, "bank has repeats");
  if (c.bank.length < 20) warn.push(`${id}: word bank is short (${c.bank.length})`);
  if (c.contrast.length < 12) bad(id, `contrast needs 12+ words, has ${c.contrast.length}`);
  if (c.game) {
    (c.game.targets || []).forEach((w) => { if (!find.test(w)) bad(id, `game target without the code: ${w}`); });
    if (c.game.decoys && c.game.decoys.length < 8) bad(id, "game decoys need 8+");
  } else {
    c.contrast.forEach((w) => { if (find.test(w)) bad(id, `contrast word has the code (add game.decoys or change it): ${w}`); });
  }
  if (!["sounds", "syllables"].includes(c.wall.mode)) bad(id, "wall.mode must be sounds or syllables");
  if (c.wall.words.length < 6) bad(id, "wall needs 6 words");
  c.wall.words.forEach((x) => { if (!x.cuts.length) bad(id, `wall word ${x.w} has no cuts`); x.cuts.forEach((k) => { if (k <= 0 || k >= x.w.length) bad(id, `wall cut out of range in ${x.w}`); }); if ([...x.cuts].sort((a, b) => a - b).join() !== x.cuts.join()) bad(id, `wall cuts out of order in ${x.w}`); });
  if (c.door.length < 6) bad(id, "door needs 6+ words");
  c.door.forEach((d) => { if (d.parts.join("") !== d.w) bad(id, `door parts don't make ${d.w}`); if (!d.extra || !d.extra.length) bad(id, `door word ${d.w} needs extra look-alike chips`); });
  if (c.chains.length < 2) bad(id, "needs 2 chains");
  c.chains.forEach((ch) => { if (ch.length < 3) bad(id, `chain too short: ${ch.join(">")}`); for (let i = 1; i < ch.length; i++) { const a = ch[i - 1], b = ch[i]; const diff = a.length === b.length ? [...a].filter((x, j) => x !== b[j]).length : 9; if (diff !== 1) bad(id, `chain step ${a} -> ${b} is not one letter`); } });
  if (c.forge) {
    if (!c.forge.items || c.forge.items.length < 4) bad(id, "forge needs 4+ items (or forge: null)");
    (c.forge.items || []).forEach((f) => { if (f.parts.join("") !== f.w) bad(id, `forge parts don't make ${f.w}`); if (!f.clue || !f.explain) bad(id, `forge ${f.w} needs clue and explain`); });
  }
  if (c.inscriptions.length !== 4) bad(id, "needs 4 inscriptions");
  const heart = new Set((c.heart || []).map((h) => h.toLowerCase()));
  c.inscriptions.forEach((ins, i) => {
    if (!ins.title || !ins.text) bad(id, `inscription ${i + 1} needs title and text`);
    const words = ins.text.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, "").replace(/'/g, ""));
    const hits = words.filter((w) => find.test(w));
    if (hits.length < 3) bad(id, `inscription ${i + 1} has only ${hits.length} code words`);
    const later = [...new Set(words.filter((w) => !heart.has(w)).map((w) => [w, laterMarker(id, w)]).filter((x) => x[1]).map((x) => `${x[0]} (${x[1]})`))];
    if (later.length) bad(id, `inscription ${i + 1} uses patterns not taught yet: ${later.join(", ")}`);
    const n = words.length;
    if (n < 30 || n > 130) warn.push(`${id}: inscription ${i + 1} is ${n} words`);
  });
  if (!c.relic.name || !c.relic.caption) bad(id, "relic needs name and caption");
  if (!c.miniLesson.title || !Array.isArray(c.miniLesson.steps) || c.miniLesson.steps.length < 4) bad(id, "miniLesson needs a title and 4+ steps");
}

const args = process.argv.slice(2);
const ids = args.length ? args : fs.readdirSync(RUIN_DIR).filter((f) => /^[A-K]\d\.js$/.test(f)).map((f) => f.replace(".js", "")).sort((a, b) => L.ruinIndex(a) - L.ruinIndex(b));
if (!args.length) checkLadder();
for (const id of ids) {
  const file = path.join(RUIN_DIR, `${id}.js`);
  if (!fs.existsSync(file)) { bad(id, "no file"); continue; }
  let c;
  try { c = require(file); c = c.default || c; } catch (e) { bad(id, `file doesn't load: ${e.message}`); continue; }
  checkRuin(id, c);
}

console.log(`ClearDecode: checked ${ids.length} ruin file(s): ${ids.join(", ")}.`);
warn.forEach((w) => console.log("  note:", w));
if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log("  -", p)); process.exit(1); }
console.log("All checks passed.");
