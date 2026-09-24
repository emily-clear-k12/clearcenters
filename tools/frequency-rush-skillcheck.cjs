#!/usr/bin/env node
// Frequency Rush skill-set checker (Sept 24, 2026).
// Checks every authored bank in lib/cases/frequency-rush/skills/ for:
//   - shape: 30 items, unique ids, 3-4 unique choices, answer among choices,
//     an explanation on every item, no duplicate questions
//   - fit in the game: prompt <= 110 characters, each choice <= 70
//   - reading level (rule 17): no sentence longer than the grade's max
//     (grade 3: 16 words, grade 4: 21, grade 5: 25), same bands as the other
//     gradecheck tools. Prints the longest sentence per set so the
//     measurement itself can be checked.
// Usage: node tools/frequency-rush-skillcheck.cjs
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "lib", "cases", "frequency-rush", "skills");
const MAX_WORDS = { 3: 16, 4: 21, 5: 25 };
const EXPECTED_ITEMS = 30;

function loadBank(file) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  const at = src.indexOf("export const SKILL_BANK =");
  const json = src.slice(at + "export const SKILL_BANK =".length).trim().replace(/;\s*$/, "");
  return JSON.parse(json);
}

// Split into sentences a student would read as sentences. Quoted lines and
// answer choices are scored on their own, never joined to the next string.
function sentences(text) {
  return String(text)
    .replace(/["“”]/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

let failures = 0;
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".js") && f !== "index.js").sort();
for (const file of files) {
  const bank = loadBank(file);
  const errs = [];
  const ids = new Set();
  const questions = new Set();
  let longest = { n: 0, s: "" };
  if (bank.items.length !== EXPECTED_ITEMS) errs.push(`has ${bank.items.length} items, expected ${EXPECTED_ITEMS}`);
  if (!MAX_WORDS[bank.grade]) errs.push(`unknown grade ${bank.grade}`);
  if (!bank.standard.startsWith(`ELA.${bank.teks}-FR-`) || !bank.teks.startsWith(`${bank.grade}.`)) errs.push(`standard ${bank.standard} doesn't match grade/teks`);
  for (const it of bank.items) {
    const tag = `${it.id}`;
    if (ids.has(it.id)) errs.push(`${tag}: duplicate id`);
    ids.add(it.id);
    const qkey = it.prompt + "|" + [...it.choices].sort().join("|");
    if (questions.has(qkey)) errs.push(`${tag}: duplicate question`);
    questions.add(qkey);
    if (!Array.isArray(it.choices) || it.choices.length < 3 || it.choices.length > 4) errs.push(`${tag}: needs 3-4 choices`);
    if (new Set(it.choices).size !== it.choices.length) errs.push(`${tag}: repeated choice`);
    if (!it.choices.includes(it.answer)) errs.push(`${tag}: answer not among choices`);
    if (!it.explanation || !it.explanation.trim()) errs.push(`${tag}: no explanation`);
    if (it.prompt.length > 110) errs.push(`${tag}: prompt is ${it.prompt.length} characters (max 110)`);
    for (const c of it.choices) if (c.length > 70) errs.push(`${tag}: choice "${c}" is ${c.length} characters (max 70)`);
    for (const text of [it.prompt, ...it.choices, it.explanation]) {
      for (const s of sentences(text)) {
        const n = words(s);
        if (n > longest.n) longest = { n, s };
        if (n > MAX_WORDS[bank.grade]) errs.push(`${tag}: ${n}-word sentence (grade ${bank.grade} max ${MAX_WORDS[bank.grade]}): "${s}"`);
      }
    }
  }
  const status = errs.length ? "FAIL" : "ok";
  console.log(`${status.padEnd(4)} ${bank.standard.padEnd(18)} ${bank.items.length} items · longest sentence ${longest.n} words: "${longest.s}"`);
  errs.forEach((e) => console.log("       - " + e));
  failures += errs.length ? 1 : 0;
}
console.log(failures ? `\n${failures} set(s) failed.` : `\nAll ${files.length} sets pass.`);
process.exit(failures ? 1 : 0);
