// ClearCode content checks (Sept 30, 2026). Run: node tools/clearcode-check.cjs
// Rules: claude/ClearCode_Content_Plan_v1.md §5.
const ts = require("/opt/node22/lib/node_modules/typescript");
const fs = require("fs");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const CC = require(__dirname + "/../lib/clearcode/index.js");

const problems = [];
const warn = [];
const bad = (id, msg) => problems.push(`${id}: ${msg}`);

// Ladder
if (CC.RUINS.length !== 55) bad("ladder", `expected 55 ruins, found ${CC.RUINS.length}`);
for (const ru of CC.RUINS) {
  const { pick, spell, alien } = ru.probe;
  for (const arr of [pick, ...alien]) {
    if (!Array.isArray(arr) || arr.length !== 3) bad(ru.id, `probe item needs 3 options: ${JSON.stringify(arr)}`);
    else if (new Set(arr).size !== 3) bad(ru.id, `probe options repeat: ${arr.join("/")}`);
  }
  if (spell.parts.join("") !== spell.word) bad(ru.id, `spell parts don't make ${spell.word}`);
}

// Decodable-word rules for ruins written in full (a simple proxy: graphemes
// not yet taught at this ruin).
const LATER = {
  A3: (w) => /e/.test(w) || /(sh|ch|th|ck|wh|ph|ng|nk|qu)/.test(w) || /([a-z])\1/.test(w) || /[^aeiou]{2,}/.test(w.replace(/s$/, "")),
  G1: (w) => /(ee|ea|oa|ow|oe|ie|igh|oo|ew|ui|ue|au|aw|oi|oy|ou|kn|wr|mb|tion|sion|ei|ey)/.test(w),
  K1: () => false,
};

for (const id of CC.READY_RUINS) {
  const c = CC.getRuinContent(id);
  const find = new RegExp(c.find, "i");
  c.codex.forEach((x) => { if (x.parts.join("") !== x.w) bad(id, `codex parts don't make ${x.w}`); if (!find.test(x.parts[x.hi] || "")) bad(id, `codex chunk for ${x.w} lacks the code`); });
  [...c.checks, ...c.vaultPicks, ...c.vaultFake].forEach((a) => { if (new Set(a).size !== a.length || a.length !== 3) bad(id, `check needs 3 different options: ${a.join("/")}`); });
  if (c.checks.length < 12) bad(id, `needs 12 checks (3 per chamber), has ${c.checks.length}`);
  if (c.vaultPicks.length < 8) bad(id, "needs 8 vault picks");
  c.bank.forEach((w) => { if (!find.test(w)) bad(id, `bank word without the code: ${w}`); });
  if (c.bank.length < 20) warn.push(`${id}: word bank is short (${c.bank.length})`);
  c.wall.words.forEach((x) => { x.cuts.forEach((k) => { if (k <= 0 || k >= x.w.length) bad(id, `wall cut out of range in ${x.w}`); }); });
  c.door.forEach((d) => { if (d.parts.join("") !== d.w) bad(id, `door parts don't make ${d.w}`); });
  c.chains.forEach((ch) => { for (let i = 1; i < ch.length; i++) { const a = ch[i - 1], b = ch[i]; let diff = a.length === b.length ? [...a].filter((x, j) => x !== b[j]).length : 9; if (diff !== 1) bad(id, `chain step ${a} -> ${b} is not one letter`); } });
  if (c.forge) c.forge.items.forEach((f) => { if (f.parts.join("") !== f.w) bad(id, `forge parts don't make ${f.w}`); });
  if (c.inscriptions.length !== 4) bad(id, "needs 4 inscriptions");
  const heart = new Set((c.heart || []).map((h) => h.toLowerCase()));
  c.inscriptions.forEach((ins, i) => {
    const words = ins.text.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, "").replace(/'/g, ""));
    const hits = words.filter((w) => find.test(w));
    if (hits.length < 3) bad(id, `inscription ${i + 1} has only ${hits.length} code words`);
    const later = words.filter((w) => !heart.has(w) && LATER[id] && LATER[id](w));
    if (later.length) bad(id, `inscription ${i + 1} uses patterns not taught yet: ${[...new Set(later)].join(", ")}`);
    const n = words.length;
    if (n < 30 || n > 130) warn.push(`${id}: inscription ${i + 1} is ${n} words`);
  });
}

console.log(`ClearCode: ${CC.RUINS.length} ruins, ${CC.READY_RUINS.length} written in full (${CC.READY_RUINS.join(", ")}).`);
warn.forEach((w) => console.log("  note:", w));
if (problems.length) { console.log(`${problems.length} problem(s):`); problems.forEach((p) => console.log("  -", p)); process.exit(1); }
console.log("All checks passed.");
