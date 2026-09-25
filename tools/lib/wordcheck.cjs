// Word-choice check, shared by every *-gradecheck.cjs tool. Added Sept 24, 2026.
//
// Flesch-Kincaid only sees sentence length and syllables per word. It can't
// tell that "fen", "wane" or "yield" are hard for a 3rd grader (one syllable
// each) or that "everybody" is easy (four). This check looks at how COMMON
// each word is instead, using how often it appears in movie and TV subtitles
// (tools/data/en_50k.txt — close to the words children actually hear).
//
// A word is UNCOMMON for a grade when it falls outside the most frequent
// RANK[grade] words of that list, after trying its base form (runs -> run,
// carried -> carry, happily -> happy). These are never flagged:
//   - standards vocabulary for that grade or below (rule 18): every word in
//     the ELAR and Math TEKS (tools/data/teks-words.json) and the Science and
//     Social Studies terms in tools/data/standards-vocab.txt
//   - names (a capitalized word that isn't starting a sentence, and anything
//     that word matches elsewhere in the same text)
//   - numbers, and words of 3 letters or fewer that are in the list at all
//   - anything passed in `allow` (case-specific words the teacher approved)
//
// It also counts RICH words: common enough to be fair (inside the grade's
// rank) but past the most basic 2,000 ("supplied" rather than "gave"). A
// grade 5 text with almost none reads young even when its sentences are long.

const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "data");

// Set Sept 24, 2026 from content already leveled by hand (Mission Map, Signal
// Check, Relay Station): nearly all of it passes, and what is flagged is worth
// a look. Results are warnings only until Emily confirms these numbers.
const RANK = { 3: 12000, 4: 16000, 5: 20000 };
const BASIC = 2000;
// Rich words are counted in the same band at every grade, so grades compare fairly.
const RICH_TOP = 20000;
// Most uncommon words allowed, as a share of all words checked.
const MAX_UNCOMMON = { 3: 0.015, 4: 0.015, 5: 0.02 };
// Fewest rich words expected, as a share of all words checked.
const MIN_RICH = { 3: 0.0, 4: 0.02, 5: 0.03 };
const RICH_MIN_WORDS = 150;

let cache = null;
function load() {
  if (cache) return cache;
  const freqFile = path.join(DATA, "en_50k.txt");
  if (!fs.existsSync(freqFile)) {
    throw new Error(`Word-choice check needs ${freqFile} (see tools/data/README.md).`);
  }
  const rank = new Map();
  fs.readFileSync(freqFile, "utf8").split(/\r?\n/).forEach((line) => {
    const w = line.split(" ")[0];
    if (w && !rank.has(w)) rank.set(w, rank.size + 1);
  });
  const teks = JSON.parse(fs.readFileSync(path.join(DATA, "teks-words.json"), "utf8"));
  const std = { 3: new Set(), 4: new Set(), 5: new Set() };
  for (const g of [3, 4, 5]) for (const w of teks[g] || []) std[g].add(w);
  fs.readFileSync(path.join(DATA, "standards-vocab.txt"), "utf8").split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([345])\s*:\s*(.+)$/);
    if (!m) return;
    for (const w of m[2].toLowerCase().split(/\s+/).filter(Boolean)) std[Number(m[1])].add(w);
  });
  const kid = new Set();
  const kidFile = path.join(DATA, "kid-words.txt");
  if (fs.existsSync(kidFile)) {
    fs.readFileSync(kidFile, "utf8").split(/\r?\n/).forEach((line) => {
      if (/^\s*#/.test(line)) return;
      for (const w of line.toLowerCase().split(/\s+/).filter(Boolean)) kid.add(w);
    });
  }
  // A standards word also covers its base form ("inferences" covers "inference").
  for (const g of [3, 4, 5]) for (const w of [...std[g]]) for (const f of forms(w)) std[g].add(f);
  // cumulative: grade 4 may use grade 3's standards words, and so on
  for (const w of std[3]) { std[4].add(w); std[5].add(w); }
  for (const w of std[4]) std[5].add(w);
  cache = { rank, std, kid };
  return cache;
}

// Irregular past forms map to their base verb ("shrank" is as common as "shrink").
const IRREGULAR = {
  shrank: "shrink", shrunk: "shrink", slid: "slide", crept: "creep", wept: "weep", swept: "sweep", knelt: "kneel",
  sprang: "spring", sprung: "spring", stung: "sting", strung: "string", clung: "cling", flung: "fling", swung: "swing",
  wove: "weave", woven: "weave", froze: "freeze", frozen: "freeze", rode: "ride", ridden: "ride", strode: "stride",
  bent: "bend", dug: "dig", hid: "hide", hidden: "hide", bit: "bite", bitten: "bite", tore: "tear", torn: "tear",
  wore: "wear", worn: "wear", bore: "bear", borne: "bear", sank: "sink", sunk: "sink", sought: "seek", fled: "flee",
  shook: "shake", shaken: "shake", drew: "draw", drawn: "draw", grew: "grow", grown: "grow", blew: "blow", blown: "blow",
  threw: "throw", thrown: "throw", flew: "fly", flown: "fly", spun: "spin", spat: "spit", leapt: "leap", lit: "light",
};

// Base forms to try for a word, most likely first.
function forms(w) {
  const out = [w];
  if (IRREGULAR[w]) out.push(IRREGULAR[w]);
  // The subtitle list splits contractions: "don't" is counted as "don".
  if (/'/.test(w) && !w.endsWith("'s")) out.push(w.split("'")[0]);
  const add = (x) => { if (x && x.length > 1 && !out.includes(x)) out.push(x); };
  if (w.endsWith("'s")) add(w.slice(0, -2));
  if (w.endsWith("ies")) add(w.slice(0, -3) + "y");
  if (w.endsWith("es")) add(w.slice(0, -2));
  if (w.endsWith("s") && !w.endsWith("ss")) add(w.slice(0, -1));
  if (w.endsWith("ied")) add(w.slice(0, -3) + "y");
  if (w.endsWith("ed")) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1ed$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith("ing")) { add(w.slice(0, -3)); add(w.slice(0, -3) + "e"); if (/(.)\1ing$/.test(w)) add(w.slice(0, -4)); }
  if (w.endsWith("ily")) add(w.slice(0, -3) + "y");
  if (w.endsWith("ly")) add(w.slice(0, -2));
  if (w.endsWith("ier")) add(w.slice(0, -3) + "y");
  if (w.endsWith("iest")) add(w.slice(0, -4) + "y");
  if (w.endsWith("er")) { add(w.slice(0, -2)); add(w.slice(0, -1)); }
  if (w.endsWith("est")) { add(w.slice(0, -3)); add(w.slice(0, -2)); }
  if (w.endsWith("ness")) add(w.slice(0, -4));
  if (w.endsWith("ful")) add(w.slice(0, -3));
  if (w.endsWith("less")) add(w.slice(0, -4));
  if (w.endsWith("ment")) add(w.slice(0, -4));
  if (w.startsWith("un")) add(w.slice(2));
  if (w.startsWith("re")) add(w.slice(2));
  return out;
}

function bestRank(w, rank, kid) {
  let best = Infinity;
  for (const f of forms(w)) {
    if (kid && kid.has(f)) return 1; // everyday word children know
    const r = rank.get(f);
    if (r && r < best) best = r;
  }
  return best;
}

// A closed compound is as common as its rarer half: "footbridge" = foot +
// bridge, "rainstorm" = rain + storm. Both halves must be 3+ letters.
function compoundRank(w, rank, kid) {
  let best = Infinity;
  for (let i = 3; i <= w.length - 3; i++) {
    const a = bestRank(w.slice(0, i), rank, kid), b = bestRank(w.slice(i), rank, kid);
    const r = Math.max(a, b);
    if (r < best) best = r;
  }
  return best;
}

// texts: array of strings a student reads. grade: 3 | 4 | 5.
// allow: extra words never to flag.
function checkWords(texts, grade, { allow = [] } = {}) {
  const { rank, std, kid } = load();
  const allowSet = new Set(allow.map((w) => w.toLowerCase()));
  const names = new Set();
  const tokens = [];
  for (const text of texts) {
    // sentence starts: after . ! ? : or a line/field start
    const re = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;
    let m;
    while ((m = re.exec(String(text)))) {
      const raw = m[0].replace("’", "'");
      const before = String(text).slice(0, m.index).replace(/["'“‘(\[\s]+$/, "");
      const start = before === "" || /[.!?:—–-]$/.test(before);
      if (/^[A-Z]/.test(raw) && !start) names.add(raw.toLowerCase());
      tokens.push({ w: raw.toLowerCase(), start, cap: /^[A-Z]/.test(raw) });
    }
  }
  // A word that is capitalized every time it appears is a name ("Alvarez",
  // "Rosalind", "Presidio La Bahía"), wherever it sits in the sentence.
  const seenLower = new Set(tokens.filter((t) => !t.cap).map((t) => t.w));
  for (const t of tokens) if (t.cap && !seenLower.has(t.w) && !(t.start && rank.has(t.w) && rank.get(t.w) < 2000)) names.add(t.w);
  const uncommon = new Map();
  let checked = 0;
  let rich = 0;
  for (const t of tokens) {
    const w = t.w;
    if (names.has(w)) continue;
    checked += 1;
    if (allowSet.has(w) || forms(w).some((f) => std[grade].has(f) || allowSet.has(f))) continue;
    let r = bestRank(w.replace(/'s$/, ""), rank, kid);
    if (r > RANK[grade]) r = Math.min(r, compoundRank(w.replace(/'s$/, ""), rank, kid));
    if (w.length <= 3 && r !== Infinity) continue;
    if (r > RANK[grade]) uncommon.set(w, (uncommon.get(w) || 0) + 1);
    if (r > BASIC && r <= RICH_TOP) rich += 1;
  }
  const uncommonCount = [...uncommon.values()].reduce((a, b) => a + b, 0);
  return {
    checked,
    uncommon: [...uncommon.entries()].sort((a, b) => b[1] - a[1]).map(([word, count]) => ({ word, count, rank: bestRank(word, rank, kid) })),
    uncommonShare: checked ? uncommonCount / checked : 0,
    richShare: checked ? rich / checked : 0,
  };
}

// Problems for a report, or [] if the text's word choice fits the grade.
function wordProblems(result, grade, label) {
  const out = [];
  // One rare word in a short text is a word to look at, not a failing text.
  if (result.uncommonShare > MAX_UNCOMMON[grade] && result.uncommon.length >= 2) {
    out.push(`${label}: ${(result.uncommonShare * 100).toFixed(1)}% uncommon words for grade ${grade} (max ${(MAX_UNCOMMON[grade] * 100).toFixed(1)}%): ${result.uncommon.slice(0, 8).map((u) => u.word).join(", ")}`);
  }
  // Too few words to judge variety: a 60-word reading can't show a pattern.
  if (result.checked >= RICH_MIN_WORDS && result.richShare < MIN_RICH[grade]) {
    out.push(`${label}: only ${(result.richShare * 100).toFixed(1)}% richer words for grade ${grade} (min ${(MIN_RICH[grade] * 100).toFixed(0)}%) — the word choice reads young`);
  }
  return out;
}

module.exports = { checkWords, wordProblems, RANK, BASIC, MAX_UNCOMMON, MIN_RICH };
