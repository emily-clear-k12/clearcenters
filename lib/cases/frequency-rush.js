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
