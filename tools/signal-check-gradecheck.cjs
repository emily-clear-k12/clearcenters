// Signal Check reading-level gate. Same method and bands as
// tools/mission-map-gradecheck.cjs: every string a student sees is split into
// sentences on its own, never joined to its neighbor (STATE §9 rule 17).
//
//   node tools/signal-check-gradecheck.cjs [subject] [--list]
//
// FK is measured on the connected prose a student reads: the claim, the field
// report notes, the three signals, the readings and the proof lines. Labels,
// S.A.M.'s one-line prompts and the self-check list are held to the sentence
// maximum only.
const ts = require("/opt/node22/lib/node_modules/typescript"), fs = require("fs"), path = require("path");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const DIR = path.join(__dirname, "../lib/cases/signal-check");

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
  return field.replace(/([.!?])["”]\s+/g, "$1\" \n").split(/(?<=[.!?])\s+|\n/)
    .map((s) => s.trim()).filter((s) => /[a-z]/i.test(s));
}
const words = (s) => s.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w));
function prose(p) {
  return [p.transmission && p.transmission.claimHeadline, p.fieldReport && p.fieldReport.notes,
    ...p.statements.flatMap((s) => [s.text, s.reasonText]),
    ...p.evidenceReadings.map((r) => r.reading)].filter(Boolean);
}
function other(p) {
  return [p.title, ...Object.values(p.echo || {}), ...(p.selfCheckQuestions || []),
    ...p.evidenceReadings.map((r) => r.label), p.fieldReport && p.fieldReport.imageCaption].filter(Boolean);
}
function score(p) {
  const ps = prose(p).flatMap(sentencesOf), all = [...ps, ...other(p).flatMap(sentencesOf)];
  const W = ps.flatMap(words), syl = W.reduce((n, w) => n + syllables(w), 0);
  const fk = +(0.39 * (W.length / ps.length) + 11.8 * (syl / W.length) - 15.59).toFixed(1);
  return { fk, avg: +(W.length / ps.length).toFixed(1), all };
}

const want = process.argv.find((a, i) => i > 1 && !a.startsWith("--"));
const list = process.argv.includes("--list");
const rows = [];
// Only score cases the app actually registers (index.public.js). Case files
// that sit in the folder but are never imported (3-6E, 4-7B, 5-10D as of
// Sept 23, 2026) are listed at the end instead of counted.
const registered = new Set([...fs.readFileSync(path.join(DIR, "index.public.js"), "utf8")
  .matchAll(/from\s+"\.\/([^"]+-SC)\.public"/g)].map((m) => m[1] + ".public.js"));
const files = fs.readdirSync(DIR).filter((f) => /-SC\.public\.js$/.test(f)).sort();
const unregistered = files.filter((f) => !registered.has(f));
for (const f of files.filter((f) => registered.has(f))) {
  const p = require(path.join(DIR, f)).PUBLIC_CASE;
  if (want && p.subject !== want) continue;
  const b = BAND[p.grade], r = score(p);
  const over = r.all.filter((s) => words(s).length > b.max);
  const longest = r.all.map((s) => ({ s, n: words(s).length })).sort((a, c) => c.n - a.n)[0];
  rows.push({ std: p.standard, subject: p.subject, grade: p.grade, ...r, over, longest,
    ok: r.fk <= b.fk[1] && r.avg <= b.avg && !over.length });
}
let fails = 0;
for (const x of rows) {
  if (!x.ok) fails++;
  console.log(`${x.std.padEnd(13)} ${x.subject.slice(0, 7).padEnd(8)} g${x.grade}  FK ${String(x.fk).padStart(4)}  avg ${String(x.avg).padStart(4)}  longest ${String(x.longest.n).padStart(2)}w  over ${x.over.length}  ${x.ok ? "✓" : "✗"}`);
  if (list) x.over.forEach((s) => console.log(`      ${words(s).length}w: ${s}`));
}
console.log("\nby subject and grade (mean FK · cases passing):");
const key = (x) => `${x.subject} g${x.grade}`;
const groups = {};
rows.forEach((x) => (groups[key(x)] = groups[key(x)] || []).push(x));
Object.keys(groups).sort().forEach((k) => {
  const g = groups[k], m = (g.reduce((a, x) => a + x.fk, 0) / g.length).toFixed(1);
  console.log(`  ${k.padEnd(20)} ${m}   ${g.filter((x) => x.ok).length}/${g.length}   over-long sentences: ${g.reduce((a, x) => a + x.over.length, 0)}`);
});
console.log(`\n${rows.length - fails}/${rows.length} cases on grade`);
if (unregistered.length) console.log(`not scored (in the folder but not in index.public.js): ${unregistered.join(", ")}`);
process.exit(fails ? 1 : 0);
