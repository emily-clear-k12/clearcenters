// Sept 24, 2026 — Frequency Rush custom word lists (step 3 of
// FrequencyRush_Fluency_Expansion_v1.md). A teacher types or uploads a list of
// words with definitions. The site makes the wrong spellings, and the list
// plays in the run game like any other skill set.
//
// SERVER ONLY (it loads the English word list). The teacher page talks to it
// through /api/teacher/word-lists; the start and submit routes build and grade
// questions with it.
//
// Every list is stored with its wrong spellings already chosen, so the
// teacher sees exactly what students will see, can re-roll any word, and the
// server grades against the saved list.

import { ENGLISH_WORDS_PACKED } from "./data/englishWords.js";

export const LIST_MIN_WORDS = 4;
export const LIST_MAX_WORDS = 30;
export const WORD_MAX_CHARS = 30;
export const DEF_MIN_CHARS = 3;
export const DEF_MAX_CHARS = 100;
export const CUSTOM_LIST_CODE_RE = /^FR\.C\.([a-z0-9]{8})\.[a-z0-9]+$/;

export const CUSTOM_LIST_LABELS = { format: "WORD LIST", encounter: "RAPID SIGNAL", instruction: "Pick the best answer." };

export function isCustomListCode(code) {
  return CUSTOM_LIST_CODE_RE.test(String(code || ""));
}

// ---------------------------------------------------------------- word check

let WORDS = null;
function englishWords() {
  if (WORDS) return WORDS;
  WORDS = new Set();
  const s = ENGLISH_WORDS_PACKED;
  let prev = "";
  let i = 0;
  while (i < s.length) {
    const shared = s.charCodeAt(i) - 65;
    let j = i + 1;
    while (j < s.length && s.charCodeAt(j) >= 97) j += 1;
    const word = prev.slice(0, shared) + s.slice(i + 1, j);
    WORDS.add(word);
    prev = word;
    i = j;
  }
  return WORDS;
}

export function isRealWord(text) {
  const w = String(text || "").toLowerCase().replace(/'/g, "");
  if (!/^[a-z]+$/.test(w)) return false;
  return englishWords().has(w);
}

// A wrong spelling must never contain one of these unless the real word does.
const BLOCKED = ["fuck", "fuk", "shit", "dick", "cock", "cunt", "piss", "fag", "nig", "slut", "whore", "bitch", "damn", "crap", "poop", "butt", "ass", "sex", "tit", "porn", "nazi", "kill", "die", "hell", "boob", "puke", "pee", "turd"];

// ---------------------------------------------------------------- parsing

const SEPARATORS = ["\t", " - ", " – ", " — ", " = ", ": ", ":", " -", "- ", ",", ";"];

// One entry per line: "word - definition", "word: definition", "word, definition",
// or two columns pasted from a spreadsheet. A first line that says
// "word ... definition" is treated as a header and skipped.
export function parseListText(text) {
  const entries = [];
  const problems = [];
  const lines = String(text || "").replace(/\r/g, "").split("\n");
  lines.forEach((raw, idx) => {
    const line = raw.replace(/ /g, " ").trim().replace(/^\d+[.)]\s*/, "");
    if (!line) return;
    if (idx === 0 && /^\W*(word|term|vocab\w*)\W+(definition|meaning)\W*$/i.test(line)) return;
    let word = null;
    let def = null;
    for (const sep of SEPARATORS) {
      const at = line.indexOf(sep);
      if (at > 0) {
        word = line.slice(0, at);
        def = line.slice(at + sep.length);
        break;
      }
    }
    if (word == null) {
      problems.push(`Line ${idx + 1} ("${line.slice(0, 40)}") needs a definition. Try "word - definition".`);
      return;
    }
    word = word.replace(/^["'“”]+|["'“”]+$/g, "").replace(/\s+/g, " ").trim();
    def = def.replace(/^["'“”]+|["'“”]+$/g, "").replace(/\s+/g, " ").trim();
    entries.push({ word, definition: def, line: idx + 1 });
  });
  return { entries, problems };
}

// Checks a list before it is saved. Returns plain-language problems.
export function validateEntries(entries) {
  const problems = [];
  if (entries.length < LIST_MIN_WORDS) problems.push(`A list needs at least ${LIST_MIN_WORDS} words.`);
  if (entries.length > LIST_MAX_WORDS) problems.push(`A list can have up to ${LIST_MAX_WORDS} words.`);
  const seenWords = new Map();
  const seenDefs = new Map();
  for (const e of entries) {
    const where = e.line ? `Line ${e.line}` : `"${e.word}"`;
    if (!e.word) problems.push(`${where} has no word.`);
    else if (e.word.length > WORD_MAX_CHARS) problems.push(`${where}: "${e.word}" is longer than ${WORD_MAX_CHARS} letters.`);
    else if (!/^[A-Za-z][A-Za-z' -]*$/.test(e.word)) problems.push(`${where}: "${e.word}" can only use letters, spaces, hyphens and apostrophes.`);
    if (!e.definition || e.definition.length < DEF_MIN_CHARS) problems.push(`${where} needs a definition.`);
    else if (e.definition.length > DEF_MAX_CHARS) problems.push(`${where}: keep the definition under ${DEF_MAX_CHARS} characters so it fits in the game.`);
    const wk = String(e.word || "").toLowerCase();
    const dk = String(e.definition || "").toLowerCase();
    if (wk && seenWords.has(wk)) problems.push(`"${e.word}" is on the list twice.`);
    if (dk && seenDefs.has(dk)) problems.push(`"${e.word}" and "${seenDefs.get(dk)}" have the same definition. Make them different so the right answer is clear.`);
    seenWords.set(wk, e.word);
    seenDefs.set(dk, e.word);
    if (wk && dk && dk.split(/[^a-z']+/).includes(wk.split(" ")[0])) {
      problems.push(`The definition of "${e.word}" uses the word itself, which gives the answer away.`);
    }
  }
  return problems;
}

// ---------------------------------------------------------------- misspellings

const VOWELS = "aeiou";
const isVowel = (c) => VOWELS.includes(c);
const isConsonant = (c) => /[b-df-hj-np-tv-z]/.test(c);

function replaceAt(s, at, len, add) {
  return s.slice(0, at) + add + s.slice(at + len);
}
function allIndexes(s, sub) {
  const out = [];
  let at = s.indexOf(sub);
  while (at !== -1) {
    out.push(at);
    at = s.indexOf(sub, at + 1);
  }
  return out;
}

// Each rule is a real kind of spelling mistake students make. Rules return
// candidate misspellings of a single lowercase word.
const RULES = {
  // letter → leter
  doubleToSingle: (w) => {
    const out = [];
    for (let i = 1; i < w.length; i++) if (w[i] === w[i - 1] && isConsonant(w[i])) out.push(replaceAt(w, i, 1, ""));
    return out;
  },
  // planet → plannet
  singleToDouble: (w) => {
    const out = [];
    for (let i = 1; i < w.length - 1; i++) {
      if (isVowel(w[i - 1]) && isConsonant(w[i]) && isVowel(w[i + 1]) && !"hwxy".includes(w[i])) out.push(replaceAt(w, i, 1, w[i] + w[i]));
    }
    return out;
  },
  // believe → beleive, meat → meet, rain → rane
  vowelTeam: (w) => {
    const swaps = [["ie", "ei"], ["ei", "ie"], ["ea", "ee"], ["ee", "ea"], ["ai", "ay"], ["ay", "ai"], ["ou", "ow"], ["ow", "ou"], ["oa", "o"], ["au", "aw"], ["aw", "au"], ["ui", "u"], ["oo", "u"], ["ue", "u"], ["ie", "e"], ["ea", "e"], ["ai", "a"], ["ou", "u"], ["ee", "e"], ["oo", "o"]];
    const out = [];
    for (const [a, b] of swaps) for (const at of allIndexes(w, a)) out.push(replaceAt(w, at, a.length, b));
    return out;
  },
  // separate → seperate. Only after the first syllable, where the vowel is
  // usually unstressed; changing the first vowel ("bicycle" → "bocycle")
  // doesn't look like a real attempt.
  schwa: (w) => {
    const out = [];
    if (w.length < 5) return out;
    let firstGroupEnd = 0;
    while (firstGroupEnd < w.length && !isVowel(w[firstGroupEnd])) firstGroupEnd += 1;
    while (firstGroupEnd < w.length && isVowel(w[firstGroupEnd])) firstGroupEnd += 1;
    for (let i = firstGroupEnd + 1; i < w.length - 1; i++) {
      if (!isVowel(w[i]) || isVowel(w[i - 1]) || isVowel(w[i + 1])) continue;
      for (const v of "aeio") if (v !== w[i]) out.push(replaceAt(w, i, 1, v));
    }
    return out;
  },
  // because → becuase. Only two vowels trade places; swapping consonants
  // ("Fberuary") doesn't look like a real attempt.
  transpose: (w) => {
    const out = [];
    for (let i = 1; i < w.length - 1; i++) if (isVowel(w[i]) && isVowel(w[i + 1]) && w[i] !== w[i + 1]) out.push(w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2));
    return out;
  },
  // endings students mix up
  ending: (w) => {
    const swaps = [["tion", "sion"], ["sion", "tion"], ["tion", "shun"], ["le", "el"], ["el", "le"], ["er", "or"], ["or", "er"], ["ar", "er"], ["y", "ey"], ["y", "ie"], ["ly", "ley"], ["ful", "full"], ["ence", "ance"], ["ance", "ence"], ["able", "ible"], ["ible", "able"], ["ous", "us"], ["ture", "cher"], ["ight", "ite"], ["ough", "uff"], ["augh", "af"], ["ough", "ow"], ["dge", "ge"], ["tch", "ch"], ["ck", "k"], ["ed", "d"], ["ing", "eing"]];
    const out = [];
    for (const [a, b] of swaps) if (w.endsWith(a) && w.length > a.length + 1) out.push(w.slice(0, w.length - a.length) + b);
    return out;
  },
  // silent letters and sound-alike spellings: knife → nife, phone → fone, luck → luk
  soundAlike: (w) => {
    const out = [];
    const pairs = [["kn", "n"], ["wr", "r"], ["mb", "m"], ["ph", "f"], ["ck", "k"], ["ck", "c"], ["wh", "w"], ["ce", "se"], ["ci", "si"], ["qu", "kw"], ["x", "ks"]];
    for (const [a, b] of pairs) for (const at of allIndexes(w, a)) if (at > 0 || a === "kn" || a === "wr" || a === "ph" || a === "wh") out.push(replaceAt(w, at, a.length, b));
    for (let i = 1; i < w.length; i++) {
      if (w[i] === "c" && "aou".includes(w[i + 1] || "")) out.push(replaceAt(w, i, 1, "k"));
      if (w[i] === "k" && "aou".includes(w[i + 1] || "")) out.push(replaceAt(w, i, 1, "c"));
    }
    return out;
  },
  // silent final e dropped: because → becaus
  dropE: (w) => (w.length > 4 && w.endsWith("e") && isConsonant(w[w.length - 2]) ? [w.slice(0, -1)] : []),
  // a letter lost from a cluster: February → Febuary
  dropFromCluster: (w) => {
    const out = [];
    for (let i = 1; i < w.length - 1; i++) if (isConsonant(w[i]) && isConsonant(w[i - 1]) && w[i] !== w[i - 1]) out.push(replaceAt(w, i, 1, ""));
    return out;
  },
};
// Likelier mistakes are tried first; the last two only fill in.
const STRONG_RULES = ["vowelTeam", "ending", "doubleToSingle", "singleToDouble", "schwa", "soundAlike", "transpose", "dropE"];
const WEAK_RULES = ["dropFromCluster"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function matchCase(original, candidate) {
  if (original[0] && original[0] === original[0].toUpperCase() && original[0] !== original[0].toLowerCase()) {
    return candidate[0].toUpperCase() + candidate.slice(1);
  }
  return candidate;
}

// Is this a safe wrong answer for `word`? Not a real word, not another word on
// the list, not rude, and close enough to look like a real attempt.
export function isAcceptableMisspelling(word, candidate, otherWords = []) {
  const w = String(word).toLowerCase();
  const c = String(candidate).toLowerCase();
  if (!c || c === w) return false;
  if (!/^[a-z' -]+$/.test(c)) return false;
  // Same first letter, or a first letter that sounds the same (phone → fone,
  // knife → nife, write → rite, cake → kake).
  const SAME_SOUND_START = { p: "f", k: "nc", w: "r", c: "ks", s: "c" };
  if (c[0] !== w[0] && !(SAME_SOUND_START[w[0]] || "").includes(c[0])) return false;
  if (Math.abs(c.length - w.length) > 2) return false;
  if (otherWords.some((o) => String(o).toLowerCase() === c)) return false;
  // every part of a multi-word entry is checked, so "food chane" can't hide "chain"
  const cParts = c.split(/[ -]/);
  const wParts = w.split(/[ -]/);
  if (cParts.some((part, i) => part !== wParts[i] && isRealWord(part))) return false;
  if (!c.includes(" ") && !c.includes("-") && isRealWord(c)) return false;
  if (BLOCKED.some((b) => c.includes(b) && !w.includes(b))) return false;
  return true;
}

// Up to `count` wrong spellings of `word`, each from a different kind of
// mistake when possible. Multi-word entries misspell one of their words.
export function makeMisspellings(word, otherWords = [], count = 3, avoid = []) {
  const original = String(word).trim();
  const lower = original.toLowerCase();
  if (lower.replace(/[^a-z]/g, "").length < 3) return [];
  const parts = lower.split(/([ -])/); // keep separators
  const wordPartIdx = parts.map((p, i) => (/^[a-z']{3,}$/.test(p) ? i : -1)).filter((i) => i >= 0);
  const chosen = [];
  const avoidSet = new Set(avoid.map((a) => String(a).toLowerCase()));
  const tryAdd = (cand) => {
    const full = matchCase(original, cand);
    if (chosen.length >= count) return;
    if (chosen.some((c) => c.toLowerCase() === cand) || avoidSet.has(cand)) return;
    if (isAcceptableMisspelling(original, full, otherWords)) chosen.push(full);
  };
  // pass 1: one candidate per rule, rules in shuffled order (variety)
  // pass 2: anything left, to fill up
  const byRule = [];
  for (const rule of [...shuffle(STRONG_RULES), ...WEAK_RULES]) {
    const cands = [];
    for (const pi of wordPartIdx) {
      for (const c of RULES[rule](parts[pi].replace(/'/g, ""))) {
        const next = [...parts];
        next[pi] = c;
        cands.push(next.join(""));
      }
    }
    byRule.push(shuffle(cands));
  }
  for (const cands of byRule) {
    const before = chosen.length;
    for (const c of cands) {
      tryAdd(c);
      if (chosen.length > before) break;
    }
  }
  for (const cands of byRule) for (const c of cands) tryAdd(c);
  return chosen;
}

// Adds wrong spellings to every entry that doesn't have a full set yet.
export function withMisspellings(entries) {
  const words = entries.map((e) => e.word);
  return entries.map((e) => {
    const others = words.filter((w) => w !== e.word);
    const keep = (Array.isArray(e.misspellings) ? e.misspellings : []).filter((m) => isAcceptableMisspelling(e.word, m, others));
    if (keep.length >= 3) return { word: e.word, definition: e.definition, misspellings: keep.slice(0, 3) };
    const more = makeMisspellings(e.word, others, 3 - keep.length, keep);
    return { word: e.word, definition: e.definition, misspellings: [...keep, ...more] };
  });
}

// ---------------------------------------------------------------- questions

function choiceId(text) {
  let h = 2166136261;
  for (const ch of String(text)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return "c" + h.toString(36);
}

// The three question kinds a list word can become:
//   m1: definition → pick the word
//   m2: word → pick the definition
//   sp: definition → pick the correct spelling
function question(list, index, kind) {
  const words = list.words || [];
  const e = words[index];
  if (!e) return null;
  if (kind === "m1") {
    return { prompt: `Which word means "${e.definition}"?`, answer: e.word, explanation: `"${e.word}" means "${e.definition}."`, pool: words.filter((_, i) => i !== index).map((o) => o.word) };
  }
  if (kind === "m2") {
    return { prompt: `What does "${e.word}" mean?`, answer: e.definition, explanation: `"${e.word}" means "${e.definition}."`, pool: words.filter((_, i) => i !== index).map((o) => o.definition) };
  }
  if (kind === "sp") {
    const wrong = (e.misspellings || []).slice(0, 3);
    if (wrong.length < 2) return null; // too short a word to misspell well
    return { prompt: `Spell the word that means "${e.definition}".`, answer: e.word, explanation: `The correct spelling is "${e.word}."`, pool: wrong, fixed: true };
  }
  return null;
}

function toItem(list, index, kind) {
  const q = question(list, index, kind);
  if (!q) return null;
  const wrong = q.fixed ? q.pool : shuffle(q.pool).slice(0, 3);
  const bins = shuffle([q.answer, ...wrong]).map((text) => ({ id: choiceId(text), label: text }));
  return {
    type: "sort_bins",
    id: `cl:${index}:${kind}`,
    prompt: q.prompt,
    bins,
    correctBinId: choiceId(q.answer),
    shuffleBins: false,
    explanation: q.explanation,
    bankId: `skill:${list.standard || "custom"}`,
    metadata: { skill: "custom_list" },
  };
}

// This run's pool: each word gets one meaning question (either direction)
// and, if the teacher left spelling on, one spelling question.
export function buildCustomListItems(list) {
  const items = [];
  const words = list.words || [];
  words.forEach((_, i) => {
    if (list.include_meaning !== false) items.push(toItem(list, i, Math.random() < 0.5 ? "m1" : "m2"));
    if (list.include_spelling !== false) items.push(toItem(list, i, "sp"));
  });
  return shuffle(items.filter(Boolean));
}

// Grades one answer against the saved list. Returns null for an id that
// isn't a real question from this list.
export function recomputeCustomItem(list, itemId) {
  const m = String(itemId || "").match(/^cl:(\d+):(m1|m2|sp)$/);
  if (!m) return null;
  const kind = m[2];
  if (kind === "sp" && list.include_spelling === false) return null;
  if (kind !== "sp" && list.include_meaning === false) return null;
  const q = question(list, Number(m[1]), kind);
  return q ? { id: String(itemId), correctBinId: choiceId(q.answer), prompt: q.prompt } : null;
}

// Sept 24, 2026 — My Missed Words: rebuilds the question for a saved key
// ("cl:3:sp") so a missed word comes back in the next run.
export function customItemForKey(list, key) {
  if (!recomputeCustomItem(list, key)) return null;
  const m = String(key).match(/^cl:(\d+):(m1|m2|sp)$/);
  return toItem(list, Number(m[1]), m[2]);
}
