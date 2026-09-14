// SS "people lesson" shape — Type 3 (Sept 2026).
//
// The third of the four lesson types in
// docs/briefings/BRIEFINGS-LESSON-TYPES-DRAFT.md, and the one flagged there as
// least certain. It covers roughly 23 standards across Grades 3-5 — every
// "identify individuals who..." and "explain the contributions of..." — which
// is the second-largest group and the one with no obvious thinking move.
//
// THE DESIGN PROBLEM, stated plainly: on its face this is recall. "Who was
// Stephen F. Austin" has no thinking in it, and twenty-three standards of that
// is a trivia deck with a progress bar. This is the type most likely to
// quietly become the thing the v3 rebuild exists to escape.
//
// THE FIX — don't ask who, ask what you would have done. Every one of these
// people faced a real decision, under a real constraint, with consequences we
// actually know. The student is put in the person's position BEFORE being told
// what the person did. They choose, they find out, and the gap between their
// choice and the real one is the lesson.
//
// THREE RULES THAT FOLLOW, and the first is the one that makes this type work:
//
//  1. THE DECISION STEP HAS NO RIGHT ANSWER. Unlike Type 1's storyTeach, where
//     one choice is marked `best` because the town did the sensible thing,
//     here NO option is marked correct. Real people made real mistakes.
//     L'Enfant tore down a man's house to keep an avenue straight, and was
//     fired inside a year — and his plan was built anyway, a century later.
//     Marking one option "best" would teach that history's actors were always
//     right, which is both false and boring. What IS graded is the naming step
//     that follows.
//
//  2. THE PERSON'S REAL CHOICE MUST NOT ALWAYS BE THE SENSIBLE-SOUNDING ONE.
//     If it is, students learn to pick the noble option without reading.
//     Only half-mechanizable: the audit checks that the real choice isn't
//     always in the same POSITION (see auditPeopleQuality), which catches the
//     lazy pattern. Whether the option merely sounds noble stays human review.
//
//  3. A CONTRIBUTION HAS A KIND, AND THE KINDS DO DIFFERENT WORK. Naming the
//     kind is this shape's hinge — the equivalent of naming the reason in Type
//     1 and naming the cause in Type 2. It's also what turns three biographies
//     into one idea, and what gives the synthesis something to remove.
//
// Grade-3 constraint, unchanged: NO TYPING. Every response is a tap.

import { PRACTICE_MECHANICS } from "./mechanics.schema.js";
import { auditThinkingQuality } from "./ssThinkingLesson.schema.js";

export const SS_PEOPLE_PHASES = [
  "openingFrame",
  "theDecision",
  "contributionSynthesis",
  "__practice__",
  "opsChoice",
  "transfer",
  "clearance",
];

export const SS_PEOPLE_TARGET_MINUTES = 20;
export const SS_PEOPLE_MINUTES_RANGE = [18, 24];
export const SS_PEOPLE_CLEARANCE_ITEMS = 5;

function fail(msg) {
  throw new Error(`[ssPeopleLesson] ${msg}`);
}

export function validateSsPeopleShape(lesson) {
  if (!lesson || typeof lesson !== "object") fail("lesson must be an object");

  const phases = lesson.phases;
  if (!Array.isArray(phases) || phases.length !== SS_PEOPLE_PHASES.length) {
    fail(`phases must be ${SS_PEOPLE_PHASES.length} entries, got ${phases ? phases.length : "none"}`);
  }
  SS_PEOPLE_PHASES.forEach((want, i) => {
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
  if (typeof minutes !== "number" || minutes < SS_PEOPLE_MINUTES_RANGE[0] || minutes > SS_PEOPLE_MINUTES_RANGE[1]) {
    fail(`minutes should be ${SS_PEOPLE_MINUTES_RANGE[0]}-${SS_PEOPLE_MINUTES_RANGE[1]} — got ${minutes}`);
  }

  // The kinds of contribution are the lesson's spine — they're what the naming
  // step names and what the synthesis removes.
  const kinds = lesson.kinds;
  if (!Array.isArray(kinds) || kinds.length < 2) {
    fail("lesson.kinds needs at least 2 kinds of contribution — without them this is three biographies in a row");
  }
  const kindIds = kinds.map((k) => k.id);

  const td = lesson.theDecision;
  const rounds = td.rounds;
  if (!Array.isArray(rounds) || rounds.length < 2) fail("theDecision.rounds needs at least 2 rounds");

  rounds.forEach((r, i) => {
    if (!r.id) fail(`theDecision.rounds[${i}].id missing`);
    if (!r.personName) fail(`theDecision.rounds[${i}].personName missing`);
    if (!r.situation) fail(`theDecision.rounds[${i}].situation missing`);
    if (!r.whatHappened) fail(`theDecision.rounds[${i}].whatHappened missing — the reveal is the point of the phase`);
    if (!r.consequence) fail(`theDecision.rounds[${i}].consequence missing — a decision with no known outcome can't be judged`);

    const opts = r.decisionOptions;
    if (!Array.isArray(opts) || opts.length < 3) {
      fail(`theDecision.rounds[${i}].decisionOptions needs 3+ — fewer isn't a decision`);
    }
    // Rule 1: nothing is marked correct here, but exactly one option has to be
    // what the person actually did, or there's nothing to reveal.
    const actual = opts.filter((o) => o.actual);
    if (actual.length !== 1) {
      fail(`theDecision.rounds[${i}] must have exactly one decisionOption marked actual — got ${actual.length}`);
    }
    if (opts.some((o) => o.best)) {
      fail(`theDecision.rounds[${i}] marks a decisionOption "best" — this phase has no right answer by design; use "actual" for what the person really did`);
    }
    opts.forEach((o, oi) => {
      if (!o.response) {
        fail(`theDecision.rounds[${i}].decisionOptions[${oi}] needs a response — every choice has to be answered, not just the real one`);
      }
    });

    // Rule 3: the naming step is what's graded.
    if (!Array.isArray(r.kindOptions) || r.kindOptions.length < 2) {
      fail(`theDecision.rounds[${i}].kindOptions needs 2+ — naming the kind is this shape's graded step`);
    }
    r.kindOptions.forEach((k) => {
      if (!kindIds.includes(k.id)) {
        fail(`theDecision.rounds[${i}] offers kind "${k.id}", which is not one of lesson.kinds (${kindIds.join(", ")})`);
      }
    });
    if (!r.vocabTerm || !r.vocabMeaning) fail(`theDecision.rounds[${i}] needs vocabTerm and vocabMeaning`);
    if (!r.stretch || !Array.isArray(r.stretch.options)) fail(`theDecision.rounds[${i}].stretch missing`);
  });

  const cs = lesson.contributionSynthesis;
  if (!Array.isArray(cs.sortItems) || cs.sortItems.length < 4) fail("contributionSynthesis.sortItems needs 4+");
  if (!Array.isArray(cs.attributions) || !cs.attributions.length) {
    fail("contributionSynthesis.attributions needs at least one — tying a person to what would be missing without them IS the standard");
  }
  if (!cs.removeOne || !Array.isArray(cs.removeOne.options) || cs.removeOne.options.length < 3) {
    fail("contributionSynthesis.removeOne needs 3+ options");
  }

  const tr = lesson.transfer;
  if (!Array.isArray(tr.spots) || tr.spots.length < 4) fail("transfer.spots needs 4+ (including one decoy)");
  if (!Array.isArray(tr.claimOptions) || tr.claimOptions.length < 3) fail("transfer.claimOptions needs 3+");

  const items = (lesson.clearance && lesson.clearance.items) || [];
  if (items.length !== SS_PEOPLE_CLEARANCE_ITEMS) {
    fail(`clearance.items must be ${SS_PEOPLE_CLEARANCE_ITEMS} — got ${items.length}`);
  }

  return true;
}

/** Quality checks. The four shared checks are delegated to
 * auditThinkingQuality rather than copied; what's added here is specific to
 * building a lesson out of real people.
 *
 * Returns an array of problem strings (empty === clean). */
export function auditPeopleQuality(lesson, opts) {
  const o = opts || {};

  const rounds = ((lesson.theDecision || {}).rounds) || [];
  const shim = {
    ...lesson,
    storyTeach: {
      vocab: rounds.map((r) => ({ term: r.vocabTerm, meaning: r.vocabMeaning })),
    },
  };
  const problems = auditThinkingQuality(shim, o);

  const answers = (o.answers && o.answers.theDecision) || {};

  // 1. Rule 2, the mechanizable half. If what the person really did is always
  //    the second option, a student learns the position instead of the person.
  const actualIdx = rounds.map((r) => (r.decisionOptions || []).findIndex((x) => x.actual));
  if (actualIdx.length >= 3 && new Set(actualIdx).size === 1) {
    problems.push(
      `the real choice sits at the same position (option ${actualIdx[0] + 1}) in every round — a student can find it without reading. Shuffle them.`
    );
  }

  // 2. Every kind the lesson declares has to be named by a student at least
  //    once, or it's a label nobody ever uses.
  const declaredKinds = (lesson.kinds || []).map((k) => k.id);
  const namedKinds = rounds.map((r) => (answers[r.id] || {}).kindId).filter(Boolean);
  if (namedKinds.length) {
    const unused = declaredKinds.filter((k) => !namedKinds.includes(k));
    if (unused.length) {
      problems.push(
        `kinds of contribution declared but never named in the teach: ${unused.join(", ")} — either give one a round or drop it`
      );
    }
    // Same one-note failure the comparison shape has: if every round is the
    // same kind, the naming step stops asking anything.
    if (namedKinds.length >= 2 && new Set(namedKinds).size === 1) {
      problems.push(
        `every round names the same kind of contribution ("${namedKinds[0]}") — the naming step stops teaching`
      );
    }
  }

  // 3. A round must not state its own answer in the setup.
  rounds.forEach((r) => {
    const key = answers[r.id] || {};
    const kind = (lesson.kinds || []).find((k) => k.id === key.kindId);
    if (!kind) return;
    const setup = `${r.situation || ""} ${r.decisionPrompt || ""} ${r.whatHappened || ""}`.toLowerCase();
    const kindWords = String(kind.label || "")
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 3 && !["they", "them", "with", "that", "this", "what", "made", "into"].includes(w));
    const leaked = kindWords.filter((w) => setup.includes(w));
    if (leaked.length) {
      problems.push(
        `theDecision round "${r.id}" uses its own answer ("${leaked[0]}") in the setup — naming the kind afterwards is copying, not thinking`
      );
    }
  });

  // 4. The consequence has to include what it cost. A lesson where every real
  //    decision worked out perfectly is a hagiography, not history — and it's
  //    the specific way this type goes bad.
  const withCost = rounds.filter((r) => r.cost);
  if (rounds.length >= 3 && withCost.length === 0) {
    problems.push(
      `no round records what the decision cost — every choice working out perfectly teaches that historical figures were never wrong, which is the failure mode this type is most prone to`
    );
  }

  // 5. The counterfactual must not key to "nothing changes".
  const ro = (lesson.contributionSynthesis || {}).removeOne;
  if (ro && Array.isArray(ro.options) && !ro.options.some((x) => x.isNoChange)) {
    problems.push(
      `contributionSynthesis.removeOne has no option marked isNoChange — the student who thinks one person's absence would change nothing has no way to say so`
    );
  }

  return problems;
}
