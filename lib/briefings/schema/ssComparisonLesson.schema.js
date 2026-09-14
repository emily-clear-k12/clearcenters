// SS "comparison lesson" shape — Type 2 (Sept 2026).
//
// The second of the four lesson types agreed in
// docs/briefings/BRIEFINGS-LESSON-TYPES-DRAFT.md. Type 1 (ssThinking) runs on
// a causal chain: each problem is caused by the last solution, which is what
// makes its beats un-shuffleable. A comparison has no chain. Forcing one onto
// this standard is exactly the mistake the earlier batch spec made.
//
// THE DESIGN PROBLEM, stated plainly: the obvious comparison lesson is a
// two-column chart of same-and-different, and noticing that two things differ
// is not thinking. The old SS-3-2B-BR is that lesson — it tells the student
// "same need, different way" on four consecutive pages and then asks them
// whether it's the same need. Its Match Pairs phase pairs "Education" with
// "Walk to a small school vs. ride a bus", which is solvable by matching the
// word "school" to the word "Education."
//
// WHAT MAKES THIS ONE THINK, and the three rules that follow from it:
//
//  1. ONE AT A TIME, NEVER SIDE BY SIDE. The student meets the home place
//     properly, then PREDICTS what the other place does about the same need,
//     and only then finds out. You cannot predict a column in a chart. The
//     prediction is the thinking, and it is only possible because the two are
//     introduced in sequence.
//
//  2. THE DIFFERENCE MUST BE CAUSED. After the reveal the student names WHY
//     the two places differ — more people, the land itself, what was already
//     there. A student who can say "a road can't cross a river" understands
//     something; a student who says "one has a ferry" has read a chart.
//
//  3. THE CAUSES MUST VARY. If every difference comes down to the same cause,
//     a student learns to tap the same answer three times and the naming step
//     teaches nothing. Enforced below in auditComparisonQuality.
//
// The counterfactual in contrastSynthesis ("change one thing about the home
// place — which difference disappears?") is what separates a student who
// knows the differences from one who knows what causes them. It is this
// shape's equivalent of ssThinking's take-one-away move.
//
// Grade-3 constraint, unchanged from Type 1: NO TYPING anywhere. Every
// response is a tap; the options combine into claims that can be false.

import { PRACTICE_MECHANICS } from "./mechanics.schema.js";
import { auditThinkingQuality } from "./ssThinkingLesson.schema.js";

export const SS_COMPARISON_PHASES = [
  "openingFrame",
  "sideBySide",
  "contrastSynthesis",
  "__practice__", // any value from PRACTICE_MECHANICS
  "opsChoice",
  "transfer",
  "clearance",
];

export const SS_COMPARISON_TARGET_MINUTES = 20;
export const SS_COMPARISON_MINUTES_RANGE = [18, 24];
export const SS_COMPARISON_CLEARANCE_ITEMS = 5;

function fail(msg) {
  throw new Error(`[ssComparisonLesson] ${msg}`);
}

export function validateSsComparisonShape(lesson) {
  if (!lesson || typeof lesson !== "object") fail("lesson must be an object");

  const phases = lesson.phases;
  if (!Array.isArray(phases) || phases.length !== SS_COMPARISON_PHASES.length) {
    fail(`phases must be ${SS_COMPARISON_PHASES.length} entries, got ${phases ? phases.length : "none"}`);
  }
  SS_COMPARISON_PHASES.forEach((want, i) => {
    const got = phases[i];
    if (want === "__practice__") {
      if (!PRACTICE_MECHANICS.includes(got)) {
        fail(`phases[${i}] must be one of ${PRACTICE_MECHANICS.join(", ")} — got "${got}"`);
      }
    } else if (got !== want) {
      fail(`phases[${i}] must be "${want}" — got "${got}"`);
    }
  });

  phases.forEach((id) => {
    if (!lesson[id]) fail(`missing content block lesson.${id}`);
  });

  const minutes = lesson.minutes;
  if (typeof minutes !== "number" || minutes < SS_COMPARISON_MINUTES_RANGE[0] || minutes > SS_COMPARISON_MINUTES_RANGE[1]) {
    fail(`minutes should be ${SS_COMPARISON_MINUTES_RANGE[0]}-${SS_COMPARISON_MINUTES_RANGE[1]} — got ${minutes}`);
  }

  // --- sideBySide ---------------------------------------------------------
  const sb = lesson.sideBySide;
  if (!sb.homeName || !sb.awayName) fail("sideBySide needs homeName and awayName");
  const rounds = sb.rounds;
  if (!Array.isArray(rounds) || rounds.length < 2) fail("sideBySide.rounds needs at least 2 rounds");

  rounds.forEach((r, i) => {
    if (!r.id) fail(`sideBySide.rounds[${i}].id missing`);
    if (!r.needId) fail(`sideBySide.rounds[${i}].needId missing — the round has to say which need it is about`);
    if (!r.homeWay) fail(`sideBySide.rounds[${i}].homeWay missing`);

    // The prediction is this shape's engine. Without wrong options to pick it
    // is a reveal with a button on it.
    const opts = r.predictOptions;
    if (!Array.isArray(opts) || opts.length < 3) {
      fail(`sideBySide.rounds[${i}].predictOptions needs 3+ — fewer makes the prediction a coin flip`);
    }
    if (!opts.some((o) => o.best)) fail(`sideBySide.rounds[${i}] has no predictOption marked best`);
    opts.forEach((o, oi) => {
      if (!o.best && !o.whatIf) {
        fail(`sideBySide.rounds[${i}].predictOptions[${oi}] needs a whatIf — a distractor without one is just marked wrong`);
      }
    });

    // Naming the cause is rule 2. A round without it is a chart row.
    const why = r.whyOptions;
    if (!Array.isArray(why) || why.length < 3) {
      fail(`sideBySide.rounds[${i}].whyOptions needs 3+ — naming the cause is what makes this a comparison lesson and not a chart`);
    }
    if (!r.vocabTerm || !r.vocabMeaning) fail(`sideBySide.rounds[${i}] needs vocabTerm and vocabMeaning`);
    if (!r.stretch || !Array.isArray(r.stretch.options)) fail(`sideBySide.rounds[${i}].stretch missing`);
  });

  // --- contrastSynthesis --------------------------------------------------
  const cs = lesson.contrastSynthesis;
  if (!Array.isArray(cs.sortItems) || cs.sortItems.length < 4) fail("contrastSynthesis.sortItems needs 4+");
  if (!Array.isArray(cs.causes) || !cs.causes.length) fail("contrastSynthesis.causes needs at least one");
  if (!cs.changeOne || !Array.isArray(cs.changeOne.options) || cs.changeOne.options.length < 3) {
    fail("contrastSynthesis.changeOne needs 3+ options — the counterfactual is what proves the difference was caused");
  }

  // --- transfer / clearance (same contracts as Type 1) ---------------------
  const tr = lesson.transfer;
  if (!Array.isArray(tr.spots) || tr.spots.length < 4) fail("transfer.spots needs 4+ (including one non-need decoy)");
  if (!Array.isArray(tr.claimOptions) || tr.claimOptions.length < 3) fail("transfer.claimOptions needs 3+");

  const items = (lesson.clearance && lesson.clearance.items) || [];
  if (items.length !== SS_COMPARISON_CLEARANCE_ITEMS) {
    fail(`clearance.items must be ${SS_COMPARISON_CLEARANCE_ITEMS} — got ${items.length}`);
  }

  return true;
}

/** Quality checks a generator can enforce without a human reading the lesson.
 *
 * The four checks Type 1 already runs (no-giveaway, length parity, word budget
 * per screen, nothing pre-answered) apply unchanged and are delegated rather
 * than copied — that logic was tuned carefully and there should be exactly one
 * copy of it. What's added here is the handful of properties that are specific
 * to comparing two things.
 *
 * Returns an array of problem strings (empty === clean). */
export function auditComparisonQuality(lesson, opts) {
  const o = opts || {};

  // The shared no-giveaway check looks for a bin's own vocabulary under
  // `storyTeach.vocab`, which a comparison lesson doesn't have — its
  // definitions live on the rounds. Hand it a shim so the check is as strong
  // here as it is in Type 1: a clue saying "messages" should be caught by the
  // communication bin's own definition, exactly as "rules" was caught by the
  // laws bin's in the v2 pack.
  const shim = {
    ...lesson,
    storyTeach: {
      vocab: ((lesson.sideBySide && lesson.sideBySide.rounds) || []).map((r) => ({
        term: r.vocabTerm,
        meaning: r.vocabMeaning,
      })),
    },
  };
  const problems = auditThinkingQuality(shim, o);

  const sb = lesson.sideBySide || {};
  const rounds = Array.isArray(sb.rounds) ? sb.rounds : [];
  const answers = (o.answers && o.answers.sideBySide) || {};

  // 1. THE CAUSES MUST VARY. Three rounds that all come down to "because
  //    there are more people" teach a student to tap the same answer three
  //    times, and the naming step — the thing that makes this shape work —
  //    stops asking anything.
  const causeIds = rounds.map((r) => (answers[r.id] || {}).whyId).filter(Boolean);
  if (causeIds.length >= 2 && new Set(causeIds).size === 1) {
    problems.push(
      `every sideBySide round blames the same cause ("${causeIds[0]}") — a student can tap it every time without reading, and the naming step stops teaching`
    );
  }

  // 2. A cause must not be named in the round's own setup text, or naming it
  //    afterwards is copying rather than reasoning.
  // Place names are unavoidable — both towns are named in nearly every line —
  // so they're excluded before the leak check, or every round trips it.
  const placeWords = `${sb.homeName || ""} ${sb.awayName || ""}`
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(Boolean);

  rounds.forEach((r) => {
    const key = answers[r.id] || {};
    const chosen = (r.whyOptions || []).find((w) => w.id === key.whyId);
    if (!chosen) return;
    const setup = `${r.homeWay || ""} ${r.awaySetup || ""} ${r.predictPrompt || ""}`.toLowerCase();
    const contentWords = String(chosen.text || "")
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 4 && !placeWords.includes(w) && !["there", "because", "their", "about", "where", "which", "would", "could", "still", "every", "other", "these", "those", "people", "place", "thing", "things", "town", "towns"].includes(w));
    const leaked = contentWords.filter((w) => setup.includes(w));
    // Two or more content words in common is a paraphrase, not a coincidence.
    if (leaked.length >= 2) {
      problems.push(
        `sideBySide round "${r.id}" states its own cause in the setup ("${leaked.slice(0, 2).join('", "')}") — naming it afterwards is copying, not reasoning`
      );
    }
  });

  // 3. AT LEAST ONE "BOTH". If every feature sorts into one column or the
  //    other, the student learns the answer is always "different" and stops
  //    reading — and the standard's whole point is that the NEEDS are shared
  //    and only the WAYS differ.
  const sortKey = (o.answers && o.answers.contrastSynthesis && o.answers.contrastSynthesis.sortAnswers) || {};
  const sortValues = Object.values(sortKey);
  if (sortValues.length && !sortValues.includes("both")) {
    problems.push(
      `contrastSynthesis has no "both" item — with every feature on one side or the other, the lesson teaches that the two places share nothing, which is the opposite of the standard`
    );
  }
  if (sortValues.length && sortValues.filter((v) => v === "both").length === sortValues.length) {
    problems.push(`contrastSynthesis sorts every item as "both" — there is nothing to contrast`);
  }

  // 4. Every need the lesson claims to cover must actually appear somewhere a
  //    student meets it. A standard naming five needs and a lesson teaching
  //    three is a coverage gap no other check would notice.
  const declared = Array.isArray(lesson.needs) ? lesson.needs.map((n) => n.id) : [];
  if (declared.length) {
    const seen = new Set();
    rounds.forEach((r) => seen.add(r.needId));
    ((lesson.reasonSort || {}).bins || []).forEach((b) => seen.add(b.id));
    Object.values((o.answers && o.answers.reasonSort) || {}).forEach((v) => seen.add(v));
    ((lesson.opsChoice || {}).projects || []).forEach((p) => seen.add(p.reasonId));
    (lesson.transfer?.claimOptions || []).forEach((c) => seen.add(c.id));
    const missed = declared.filter((id) => !seen.has(id));
    if (missed.length) {
      problems.push(
        `needs declared but never met by a student: ${missed.join(", ")} — the standard names them, so something in the lesson has to ask about them`
      );
    }
  }

  // 5. The counterfactual needs a "nothing changes" option. Without it the
  //    student who thinks differences are just facts rather than consequences
  //    has nowhere to reveal that, and the check can't catch them.
  const co = (lesson.contrastSynthesis || {}).changeOne;
  if (co && Array.isArray(co.options) && !co.options.some((x) => x.isNoChange)) {
    problems.push(
      `contrastSynthesis.changeOne has no option marked isNoChange — the student who thinks the differences aren't caused by anything has no way to say so, and no way to be corrected`
    );
  }

  return problems;
}
