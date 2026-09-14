#!/usr/bin/env node
// Briefings v2 — TEKS-alignment + readability checker.
// Built Sept 14, 2026, per the "two concrete checks, not just a gut call"
// discussion: (1) every named sub-part of a standard's own wording must be
// taught, practiced, AND tested somewhere in the lesson — not gestured at
// once and assumed to stick; (2) grade-level readability is scored with an
// actual formula (Flesch-Kincaid), not eyeballed, with the agreed
// exception that TEKS vocabulary is allowed to run above grade level as
// long as it has its own definition card in fieldBrief.vocab.
//
// USAGE:
//   node scripts/briefings-checker.js lib/briefings/SS-3-2A-BR.public.js
//   node scripts/briefings-checker.js lib/briefings/SCI-3-6B-BR.public.js
//
// This repo's .public.js briefing packs are written as ES modules
// ("export const PUBLIC_BRIEFING = {...}"), which is what Next.js's build
// expects, but a plain `node` process (no "type": "module" in
// package.json, no bundler) can't `require()` or `import()` that syntax
// directly. Rather than add a build step or change the app's module
// system just for this script, loadPublicBriefing() below does a narrow,
// well-checked text substitution (export const PUBLIC_BRIEFING = ->
// module.exports =) and evaluates the result as CommonJS. It only ever
// touches an in-memory copy — the real file on disk is never modified.

const fs = require("fs");
const path = require("path");
const { Module } = require("module");

function loadPublicBriefing(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const marker = /export const PUBLIC_BRIEFING\s*=/;
  if (!marker.test(source)) {
    throw new Error(
      `${filePath}: expected "export const PUBLIC_BRIEFING = ..." — this loader only knows that one shape.`
    );
  }
  const cjsSource = source.replace(marker, "module.exports =");
  const m = new Module(filePath, module);
  m.filename = filePath;
  m.paths = Module._nodeModulePaths(path.dirname(filePath));
  m._compile(cjsSource, filePath);
  return m.exports;
}

// --- TEKS sub-part coverage -------------------------------------------

// Instructional/Bloom's-style verbs TEKS statements are built from. These
// are the pedagogical ACTION the standard asks for, not content itself —
// a student's text will say "solid" or "material well-being," never the
// bare word "describe" or "classify," so these get stripped rather than
// turned into their own (unfindable) checklist rows.
const TEKS_VERBS = new Set([
  "describe", "classify", "demonstrate", "explain", "identify", "compare",
  "analyze", "recognize", "apply", "construct", "model", "differentiate",
  "calculate", "determine", "investigate", "predict", "distinguish",
  "explore", "record", "measure", "observe", "generate", "justify",
  "summarize", "define", "list", "name", "recall", "label", "formulate",
  "show",
]);
const LEADING_FILLERS = new Set(["that", "the", "a", "an", "their", "its"]);

// Pull the comma-separated list out of an "as X, Y, and Z" / "including
// X, Y, and Z" / "for X, Y, and Z" phrase into individual items; if
// there's no such list, return the phrase whole.
function splitEmbeddedList(phrase) {
  const m = phrase.match(/\b(?:as|including|for)\s+(.+)$/i);
  const listText = m ? m[1] : phrase;
  const items = listText
    .split(/,| and /i)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => s.split(/\s+/).length >= 1 && s.length >= 4);
  return items.length > 1 ? items : [phrase.trim()];
}

function stripLeadingVerbsAndFillers(clause) {
  const words = clause.split(/\s+/);
  while (words.length && (TEKS_VERBS.has(words[0].toLowerCase()) || LEADING_FILLERS.has(words[0].toLowerCase()))) {
    words.shift();
  }
  return words.join(" ").trim();
}

// Split a standard's verbatim text into the discrete things it names, so
// an author (or the checker below) can verify each one individually
// instead of treating the whole sentence as one blob. This is a
// heuristic, not a parser for the state's TEKS grammar — it's meant to
// give a checklist to eyeball/search against, not a pass/fail oracle:
//  - "Identify X, including A, B, and C" style standards: use the listed
//    items after "including" (the common case, e.g. most SS standards).
//  - Compound-clause standards with no "including" list (common in
//    Science, e.g. "describe and classify... and demonstrate that...
//    and that..."): split on verb-introduced clause boundaries first,
//    strip the leading verb, then split any embedded "as A, B, and C"
//    list and any "X and that Y" subordinate clauses.
function extractTeksSubParts(teksText) {
  if (!teksText) return [];
  const cleaned = teksText.replace(/\.$/, "");

  if (/\bincluding\b/i.test(cleaned)) {
    const afterIncluding = cleaned.split(/\bincluding\b/i)[1];
    const parts = splitEmbeddedList(afterIncluding.trim());
    return [...new Set(parts.map((p) => p.trim().toLowerCase()).filter(Boolean))];
  }

  const verbAlternation = [...TEKS_VERBS].join("|");
  const clauses = cleaned.split(new RegExp(`\\s+and\\s+(?=(?:${verbAlternation})\\b)`, "i"));

  const subParts = [];
  for (const clause of clauses) {
    const stripped = stripLeadingVerbsAndFillers(clause);
    if (!stripped) continue;
    // Subordinate "X and that Y" clauses each describe a separate fact.
    for (const sub of stripped.split(/\s+and\s+that\s+/i)) {
      const trimmedSub = stripLeadingVerbsAndFillers(sub);
      if (!trimmedSub) continue;
      subParts.push(...splitEmbeddedList(trimmedSub));
    }
  }
  return [...new Set(subParts.map((p) => p.trim().toLowerCase()).filter((p) => p.length >= 4))];
}

// Pull every kid-facing string out of a lesson object, tagged by which
// phase it came from, so coverage + readability can both walk one list.
// Walks EVERY phase key present on the lesson object (not just the ones
// listed in `phases`) so a mechanic used anywhere still gets scanned.
function collectTextBlocks(lesson) {
  const blocks = [];
  const push = (phase, field, value) => {
    if (typeof value === "string" && value.trim()) blocks.push({ phase, field, text: value });
  };
  const walkStrings = (phase, prefix, obj) => {
    if (!obj || typeof obj !== "object") return;
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === "string") push(phase, `${prefix}.${key}`, val);
      else if (Array.isArray(val)) {
        val.forEach((item, i) => {
          if (typeof item === "string") push(phase, `${prefix}.${key}[${i}]`, item);
          else if (item && typeof item === "object") walkStrings(phase, `${prefix}.${key}[${i}]`, item);
        });
      } else if (val && typeof val === "object") {
        walkStrings(phase, `${prefix}.${key}`, val);
      }
    }
  };

  if (lesson.samLines) walkStrings("samLines", "samLines", lesson.samLines);
  const phaseKeys = new Set(lesson.phases || []);
  // Defensive: also scan any of these known phase-content keys the lesson
  // carries even if `phases` is missing/stale, so coverage checking never
  // silently misses real content.
  for (const key of ["intelDrop", "fieldBrief", "quickReview", "reasonSort", "matchPairs", "sequenceIt", "labelPicture", "trueFalseReason", "opsChoice", "evidenceDrop", "clearance"]) {
    phaseKeys.add(key);
  }
  for (const phaseKey of phaseKeys) {
    if (lesson[phaseKey]) walkStrings(phaseKey, phaseKey, lesson[phaseKey]);
  }
  return blocks;
}

function checkTeksCoverage(lesson) {
  const subParts = extractTeksSubParts(lesson.teksText);
  const blocks = collectTextBlocks(lesson);

  // Which phase types count as "taught," "practiced," "tested" — matches
  // both the v1 phase names already shipping and the v2 mechanic ids
  // locked in mechanics.schema.js (used directly as phase ids at runtime
  // — see the runtime note in ssFullLesson.schema.js).
  const TEACH_PHASES = ["fieldBrief", "quickReview", "intelDrop"];
  const PRACTICE_PHASES = ["reasonSort", "matchPairs", "sequenceIt", "labelPicture", "trueFalseReason", "opsChoice", "evidenceDrop"];
  const TEST_PHASES = ["clearance"];

  const STOPWORDS = new Set(["a", "an", "the", "of", "their", "its", "that", "and", "have", "has", "is", "are", "take", "takes", "for"]);
  // Very light plural stemming (gases -> gas, laws -> law) so "gases" in
  // the standard's text still matches "gas" in kid-friendly prose.
  const stem = (w) => (w.endsWith("es") ? w.slice(0, -2) : w.endsWith("s") ? w.slice(0, -1) : w);
  const wordPresent = (lowerText, word) => lowerText.includes(word) || lowerText.includes(stem(word));

  const findings = subParts.map((part) => {
    const significantWords = part.split(/\s+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w));
    // Bag-of-words match within a SINGLE block, not exact substring — a
    // standard's legal phrase ("definite shape") is often deliberately
    // paraphrased into kid-friendly wording ("keeps its own shape") for
    // grade-level readability, so exact-phrase matching would wrongly
    // flag well-written content as a gap. This still isn't semantic
    // understanding — a genuine synonym with no shared word (e.g. "law"
    // reworded as "rule" with zero overlap) can still slip through as a
    // false gap. Treat every GAP below as "go double-check this by eye,"
    // not as proven-missing content.
    const mentionedIn = (phaseList) =>
      blocks.some(
        (b) => phaseList.includes(b.phase) && significantWords.every((w) => wordPresent(b.text.toLowerCase(), w))
      );
    return {
      subPart: part,
      taught: mentionedIn(TEACH_PHASES),
      practiced: mentionedIn(PRACTICE_PHASES),
      tested: mentionedIn(TEST_PHASES),
    };
  });

  const gaps = findings.filter((f) => !(f.taught && f.practiced && f.tested));
  return { subParts, findings, gaps };
}

// --- Readability (Flesch-Kincaid grade level) --------------------------

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

function fleschKincaidGrade(text) {
  const sentences = (text.match(/[.!?]+(\s|$)/g) || [text]).length || 1;
  const words = (text.match(/[A-Za-z']+/g) || []);
  if (words.length === 0) return 0;
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}

// Grade 3 target: Flesch-Kincaid grade level around 2.5-3.5. Flag
// anything meaningfully above that as a candidate to simplify.
const READABILITY_GRADE_CEILING = 3.5;

// collectTextBlocks() walks EVERY string field so TEKS-coverage matching
// doesn't miss anything — but that sweeps up non-prose data too (ids,
// enum values, sceneId/imageKey references, camelCase config strings like
// "chipsOnly"). Those aren't sentences a student reads, and the
// Flesch-Kincaid formula produces nonsense grades on them (a bare
// camelCase identifier can score in the 30s-40s). Readability only makes
// sense to run on fields that are actually kid-facing prose.
const NON_PROSE_KEY_PATTERN = /(^|\.)(id|.*Id|type|mode|icon|emoji|color|engine|teks|reuseFrom|dynamicReuse|sceneId|reasonId|imageKey|relatedChallengeIds)(\[\d+\])?$/i;

function isProseField(fieldPath) {
  const lastSegment = fieldPath.split(".").pop().replace(/\[\d+\]$/, "");
  return !NON_PROSE_KEY_PATTERN.test(lastSegment);
}

function checkReadability(lesson) {
  const vocabTerms = ((lesson.fieldBrief && lesson.fieldBrief.vocab) || (lesson.quickReview && lesson.quickReview.vocab) || []).map((v) =>
    (v.term || "").toLowerCase()
  );
  const blocks = collectTextBlocks(lesson);
  const flagged = [];
  for (const block of blocks) {
    if (!isProseField(block.field)) continue;
    // Flesch-Kincaid is built for sentences — a 1-3 word chip/label isn't
    // one, and the formula gives nonsense grades on fragments that short.
    // Below that length it's a vocabulary-density judgment call for a
    // human, not something this formula can usefully gate.
    const wordCount = (block.text.match(/[A-Za-z']+/g) || []).length;
    if (wordCount < 4) continue;

    // Strip whitelisted vocab terms before scoring — they're allowed to
    // run above grade level because each has its own definition card
    // (the agreed exception), so they shouldn't tank a sentence's score.
    let scoredText = block.text;
    for (const term of vocabTerms) {
      if (term) scoredText = scoredText.replace(new RegExp(term, "gi"), "");
    }
    const grade = fleschKincaidGrade(scoredText);
    if (grade > READABILITY_GRADE_CEILING) {
      flagged.push({ ...block, grade: Math.round(grade * 10) / 10 });
    }
  }
  return { flagged, ceiling: READABILITY_GRADE_CEILING, vocabTerms };
}

// --- Report --------------------------------------------------------------

function runChecker(filePath) {
  const lesson = loadPublicBriefing(filePath);
  const coverage = checkTeksCoverage(lesson);
  const readability = checkReadability(lesson);

  console.log(`\nBriefings checker — ${lesson.id || filePath}`);
  console.log(`TEKS ${lesson.teks}: "${lesson.teksText}"`);
  console.log(`\nTEKS coverage (${coverage.subParts.length} sub-part(s) detected):`);
  for (const f of coverage.findings) {
    const flags = [
      f.taught ? "taught" : "NOT TAUGHT",
      f.practiced ? "practiced" : "NOT PRACTICED",
      f.tested ? "tested" : "NOT TESTED",
    ];
    const ok = f.taught && f.practiced && f.tested;
    console.log(`  ${ok ? "OK  " : "GAP "} "${f.subPart}" — ${flags.join(", ")}`);
  }

  console.log(`\nReadability (Flesch-Kincaid grade ceiling: ${readability.ceiling}, vocab terms excused: ${readability.vocabTerms.length}):`);
  if (readability.flagged.length === 0) {
    console.log("  OK — nothing above the ceiling.");
  } else {
    for (const b of readability.flagged) {
      console.log(`  FLAG  [${b.phase}] ${b.field} — grade ${b.grade}: "${b.text.slice(0, 90)}${b.text.length > 90 ? "..." : ""}"`);
    }
  }

  const failed = coverage.gaps.length > 0 || readability.flagged.length > 0;
  console.log(`\nResult: ${failed ? "NEEDS ATTENTION" : "PASS"} (${coverage.gaps.length} coverage gap(s), ${readability.flagged.length} readability flag(s))\n`);
  return { lesson, coverage, readability, failed };
}

if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: node scripts/briefings-checker.js <path-to-Foo.public.js>");
    process.exit(2);
  }
  const { failed } = runChecker(path.resolve(process.cwd(), filePath));
  process.exit(failed ? 1 : 0);
}

module.exports = {
  loadPublicBriefing,
  extractTeksSubParts,
  collectTextBlocks,
  checkTeksCoverage,
  fleschKincaidGrade,
  checkReadability,
  runChecker,
};
