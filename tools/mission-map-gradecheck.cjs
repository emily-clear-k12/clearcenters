// Mission Map reading-level gate. Form-aware on purpose.
//
//   node tools/mission-map-gradecheck.cjs [subject]      e.g. ELAR, Math
//
// The first two times a scorer was run over this project's content it was
// wrong in the same way: it joined text that a student never reads as one
// sentence (headlines onto body text in Relay Station; consecutive answer
// choices in the Mission Map Math batch, because a choice has no full stop).
// STATE §9 rule 17. So this scorer never concatenates fields: every string a
// student sees is split into sentences ON ITS OWN, and a string with no end
// punctuation — an answer choice, a label, a stem — counts as one unit.
//
// Also printed: the longest "sentence" found, verbatim. Look at it before
// believing any number this prints.
const ts = require("/opt/node22/lib/node_modules/typescript"), fs = require("fs");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const MM = __dirname + "/../lib/cases/mission-map";
const PUB = require(MM + "/index.public.js");

// Same bands as tools/assembly-deck-gradecheck.cjs.
const BAND = {
  3: { fk: [2.0, 4.2], avg: 11, max: 16 },
  4: { fk: [3.5, 5.6], avg: 14, max: 21 },
  5: { fk: [5.0, 7.2], avg: 16, max: 25 },
};

function syllables(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, ""); if (!w) return 0; if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const m = w.match(/[aeiouy]{1,2}/g); return m ? m.length : 1;
}
function sentencesOf(field) {
  // A numbered task list — "Your answer should: (1) ..., and (2) ..." — is
  // read as separate items, not one run-on sentence.
  field = field.replace(/:\s*\(1\)/g, ".\n(1)").replace(/,?\s*(and\s+)?\((\d)\)/g, "\n($2)");
  // A data display (stem-and-leaf, a table row) is not prose.
  if (/\|/.test(field) && (field.match(/\|/g) || []).length >= 3) return [];
  // Quoted dialogue ends inside the quote mark: "...kind." She said.
  return field.replace(/([.!?])["”]\s+/g, "$1\" \n").split(/(?<=[.!?])\s+|\n/)
    .map((s) => s.trim()).filter((s) => /[a-z]/i.test(s));
}
// Prose: what a student reads as connected text. FK is measured here, because
// answer choices are short fragments and would drag the score down.
function proseOf(p) {
  const out = [p.mission.briefText, p.finalResponsePrompt];
  for (const cp of p.checkpoints) {
    out.push(cp.prompt);
    if (cp.evidence) out.push(cp.evidence.text);
    if (cp.evidenceA) out.push(cp.evidenceA.text);
    if (cp.evidenceB) out.push(cp.evidenceB.text);
  }
  return out.filter(Boolean);
}
function fieldsOf(p) {
  const out = [p.tagline, p.mission.briefText, p.mission.goal, p.finalResponsePrompt,
    ...(p.responseStems || []), ...(p.selfCheckQuestions || [])];
  for (const cp of p.checkpoints) {
    out.push(cp.prompt, cp.evidenceLogEntry);
    if (cp.evidence) out.push(cp.evidence.text);
    if (cp.evidenceA) out.push(cp.evidenceA.text, cp.evidenceA.choiceLabel);
    if (cp.evidenceB) out.push(cp.evidenceB.text, cp.evidenceB.choiceLabel);
    (cp.choices || []).forEach((c) => out.push(c.text));
    (cp.items || []).forEach((c) => out.push(c.text));
  }
  return out.filter(Boolean);
}
function score(p) {
  const all = fieldsOf(p).flatMap(sentencesOf);
  const sents = proseOf(p).flatMap(sentencesOf);
  const words = sents.flatMap((s) => s.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)));
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  const W = words.length || 1, S = sents.length || 1;
  const longest = all.map((s) => ({ s, n: s.split(/\s+/).length })).sort((a, b) => b.n - a.n)[0];
  return { fk: +(0.39 * (W / S) + 11.8 * (syl / W) - 15.59).toFixed(1), avg: +(W / S).toFixed(1), longest, over: (max) => all.filter((s) => s.split(/\s+/).length > max) };
}

const want = process.argv[2];
let fails = 0; const byGrade = {};
console.log("case       grade   FK    avg  longest");
for (const std of PUB.listMissionMapStandards()) {
  const p = PUB.getMissionMapPublicCase(std);
  if (want && p.subject !== want) continue;
  const b = BAND[p.grade], r = score(p);
  (byGrade[p.grade] = byGrade[p.grade] || []).push(r.fk);
  const over = r.over(b.max);
  const ok = r.fk <= b.fk[1] && r.avg <= b.avg && !over.length;
  console.log(`${std.padEnd(10)} ${p.grade}     ${String(r.fk).padStart(4)}  ${String(r.avg).padStart(5)}  ${String(r.longest.n).padStart(3)}w  ${ok ? "✓" : "✗"}`);
  if (r.fk > b.fk[1]) { console.log(`    ✗ reads at ${r.fk}, above the grade-${p.grade} ceiling ${b.fk[1]}`); fails++; }
  if (r.avg > b.avg) { console.log(`    ✗ average sentence ${r.avg} words, over ${b.avg}`); fails++; }
  over.forEach((s) => { console.log(`    ✗ ${s.split(/\s+/).length}w (max ${b.max}): "${s}"`); fails++; });
  console.log(`    longest: "${r.longest.s}"`);
}
const avg = (a) => +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1);
const g = Object.keys(byGrade).sort().map((k) => ({ k, v: avg(byGrade[k]) }));
console.log("\nby grade:", g.map((x) => `g${x.k}=${x.v}`).join("  "));
for (let i = 1; i < g.length; i++) if (g[i].v - g[i - 1].v < 0.8) { console.log(`  ✗ grade ${g[i].k} does not read meaningfully harder than grade ${g[i - 1].k}`); fails++; }
console.log(fails ? `\n${fails} PROBLEMS` : "\nON GRADE");
process.exit(fails ? 1 : 0);
