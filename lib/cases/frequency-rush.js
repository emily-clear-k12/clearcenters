import { supabaseAdmin } from "../supabaseAdmin";

// Frequency Rush's content lives in the database (frequency_rush_words),
// not as per-case JS files like every other engine's lib/cases/*.server.js —
// there's no "correct answer" to hide from the client the way Mission Map's
// checkpoints or Signal Check's verdicts need to be, since a word's
// definition isn't a secret. What genuinely needs to stay server-authoritative
// is the ROUND ORDER (which word got prompted, in what order) — without that,
// a replay could self-report a perfect score with zero real answers, which
// would corrupt the Word Wall's class-wide mastery data down the line.

export const DEFAULT_ROUNDS = 15;
export const ROUND_SECONDS = 8;
const CHOICES_PER_ROUND = 4;

export async function getFrequencyRushWordSet({ grade, subject, unit }) {
  const { data, error } = await supabaseAdmin
    .from("frequency_rush_words")
    .select("id, word, definition, sentences")
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("unit", unit)
    .order("word");
  if (error) throw new Error(error.message);
  return data || [];
}

// Sept 12, 2026 — Sort & Classify content pipeline, plumbing-only pass.
// Emily is generating this content herself right now, into the SAME
// database the vocabulary word bank already lives in (not a separate
// lib/cases file pipeline like Signal Defense's review questions) — same
// grade/subject/unit key as frequency_rush_words, just a sibling table,
// since one classify "question" bundles categories + items together in a
// shape a flat word row can't hold. See supabase_schema.sql for the table
// definition. Deliberately tolerant of an empty/missing table for a given
// unit — Sort & Classify is a bonus content type layered on top of the
// vocabulary formats, never a hard requirement to start a run (mirrors how
// Odd Signal Out gracefully no-ops without authored oddGroups).
export async function getFrequencyRushClassificationSet({ grade, subject, unit }) {
  const { data, error } = await supabaseAdmin
    .from("frequency_rush_classifications")
    .select("id, prompt, title, categories, items, explanation")
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("unit", unit)
    .order("id");
  if (error) {
    // Non-fatal by design (see comment above) — log and hand back an empty
    // set rather than failing the whole Asteroid Run start over a content
    // type that hasn't been authored for this unit yet.
    console.error("Frequency Rush: couldn't load classification set:", error.message);
    return [];
  }
  return data || [];
}

/**
 * File-bank tap-the-bin sort (sort_bins). Loaded only on the server start/
 * submit routes via dynamic import so the large classify index is not pulled
 * into client bundles. Expands matching CLASSIFY_BANK modules into one
 * per-item round descriptor the Run Engine can feed as format "sort_bins".
 */
function bankMatchesCase(bank, { grade, subject, unit, standard }) {
  const gradeOk = grade == null || Number(bank.grade) === Number(grade);
  const subjectOk =
    !subject ||
    !bank.subject ||
    String(bank.subject).toLowerCase() === String(subject).toLowerCase();
  if (!gradeOk || !subjectOk) return false;

  const std = String(standard || "").trim();
  const unitStr = String(unit || "").trim();
  const bankStd = String(bank.standard || "").trim();
  const bankTeks = String(bank.teks || "").trim();

  if (bankStd && (bankStd === std || bankStd === unitStr)) return true;
  if (bankTeks && (bankTeks === std || bankTeks === unitStr)) return true;
  if (bankStd && unitStr && (unitStr.includes(bankStd) || bankStd.includes(unitStr))) return true;
  if (bankStd && std && (std.includes(bankStd) || bankStd.includes(std))) return true;
  // Flexible Matter-States matching when case.unit/standard naming drifts.
  if (/Matter-States/i.test(bankStd) && (/Matter-States/i.test(unitStr) || /Matter-States/i.test(std))) {
    return true;
  }
  return false;
}

export async function getClassifyBanksForCase({ grade, subject, unit, standard }) {
  const { ALL_CLASSIFY_BANKS } = await import("./frequency-rush/classify/index.js");
  const banks = (ALL_CLASSIFY_BANKS || []).filter((bank) =>
    bankMatchesCase(bank, { grade, subject, unit, standard })
  );
  const sortBins = [];
  for (const bank of banks) {
    const bins = Array.isArray(bank.bins) ? bank.bins : [];
    const items = Array.isArray(bank.items) ? bank.items : [];
    for (const item of items) {
      if (!item?.id || !item?.prompt || !item?.correctBinId) continue;
      sortBins.push({
        type: "sort_bins",
        id: item.id,
        prompt: item.prompt,
        bins,
        correctBinId: item.correctBinId,
        ...(bank.rule ? { rule: bank.rule } : {}),
        bankId: bank.id,
      });
    }
  }
  return { banks, sortBins };
}

/** Look up one sort_bins item from file banks (submit-time re-score). */
export async function findSortBinItem({ grade, subject, unit, standard, itemId }) {
  if (itemId == null || itemId === "") return null;
  const { sortBins } = await getClassifyBanksForCase({ grade, subject, unit, standard });
  const key = String(itemId);
  return sortBins.find((item) => String(item.id) === key) || null;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Builds the server-authoritative round order + per-round answer choices for
// a Lock the Signal session. If a unit's word bank is smaller than the
// requested round count, words repeat (in a fresh shuffle each pass) rather
// than erroring out — an early, thin unit should still be playable.
export function buildLockTheSignalRounds(words, roundCount) {
  if (!words || words.length === 0) return [];
  const rounds = [];
  let pool = shuffle(words);
  while (rounds.length < roundCount) {
    if (pool.length === 0) pool = shuffle(words);
    const promptWord = pool.pop();
    const others = words.filter((w) => w.id !== promptWord.id);
    const distractorCount = Math.min(CHOICES_PER_ROUND - 1, others.length);
    const distractors = shuffle(others).slice(0, distractorCount);
    // Distractor definitions pulled from the same unit, per the design doc's
    // content-ingestion rule (§8a) — a real definition from a nearby word
    // makes a naturally plausible wrong answer, no separate authoring needed.
    const choices = shuffle([promptWord, ...distractors]).map((w) => ({ id: w.id, definition: w.definition }));
    rounds.push({ promptWordId: promptWord.id, word: promptWord.word, choices });
  }
  return rounds;
}
