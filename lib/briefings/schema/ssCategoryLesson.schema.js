// SS "category lesson" shape — Type 4 (Sept 2026).
//
// The last of the four types in docs/briefings/BRIEFINGS-LESSON-TYPES-DRAFT.md,
// and the one that was deliberately built LAST. It covers roughly 25 standards
// across Grades 3-5 — branches of government, levels of government, regions,
// settlement types, rights — and it is the most dangerous of the four.
//
// THE DESIGN PROBLEM: this is the exact trap the whole v3 rebuild exists to
// escape. The v2 lesson was twenty-two interactions all asking "which of these
// three categories is this?" A lesson built entirely on sorting would be worse
// than the thing we replaced — and because the sorting mechanic already
// exists, this type LOOKS far easier to build than it is. It is not easier. It
// is the one most likely to quietly regress.
//
// THE FIX, in two parts:
//
//  1. THE CATEGORY MUST HAVE A CONSEQUENCE. You don't sort in order to sort.
//     You sort because putting a thing in the wrong box BREAKS something. So
//     the teach is a problem arriving at the WRONG DESK: a neighbour writes to
//     the governor about a pothole, and four months later the letter is
//     forwarded to the city while the hole gets bigger. The student routes it,
//     sees the cost of routing it wrong, and only then names the rule.
//
//  2. THE STUDENT NAMES THE RULE, NOT THE CATEGORY. This is the part that
//     stops the type collapsing back into sorting. Naming the category is just
//     the sort again with extra steps. What generalises — what lets a child
//     place a service they have never heard of — is the PRINCIPLE underneath:
//     how far does this reach? One street, or the whole state, or every state?
//     So `rules` are first-class in this shape, and the graded naming step
//     names a rule. The category then follows from the rule.
//
// Two further properties this shape enforces, both from the type's own failure
// modes: a lesson needs real BOUNDARY CASES, because the definition of a
// category lives at its edge and nowhere else; and every category has to turn
// up as a plausible WRONG answer somewhere, because a category nobody ever
// mistakenly picks is not being tested.
//
// Grade-3 constraint, unchanged: NO TYPING. Every response is a tap.

import { PRACTICE_MECHANICS } from "./mechanics.schema.js";
import { auditThinkingQuality } from "./ssThinkingLesson.schema.js";

export const SS_CATEGORY_PHASES = [
  "openingFrame",
  "wrongDesk",
  "boundarySynthesis",
  "__practice__",
  "opsChoice",
  "transfer",
  "clearance",
];

export const SS_CATEGORY_TARGET_MINUTES = 20;
export const SS_CATEGORY_MINUTES_RANGE = [18, 24];
export const SS_CATEGORY_CLEARANCE_ITEMS = 5;
/** The definition of a category lives at its edge. A lesson with no items on
 * the line between two categories has tested only the obvious middle. */
export const SS_CATEGORY_MIN_BOUNDARIES = 2;

function fail(msg) {
  throw new Error(`[ssCategoryLesson] ${msg}`);
}

export function validateSsCategoryShape(lesson) {
  if (!lesson || typeof lesson !== "object") fail("lesson must be an object");

  const phases = lesson.phases;
  if (!Array.isArray(phases) || phases.length !== SS_CATEGORY_PHASES.length) {
    fail(`phases must be ${SS_CATEGORY_PHASES.length} entries, got ${phases ? phases.length : "none"}`);
  }
  SS_CATEGORY_PHASES.forEach((want, i) => {
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
  if (typeof minutes !== "number" || minutes < SS_CATEGORY_MINUTES_RANGE[0] || minutes > SS_CATEGORY_MINUTES_RANGE[1]) {
    fail(`minutes should be ${SS_CATEGORY_MINUTES_RANGE[0]}-${SS_CATEGORY_MINUTES_RANGE[1]} — got ${minutes}`);
  }

  const levels = lesson.levels;
  if (!Array.isArray(levels) || levels.length < 2) fail("lesson.levels needs at least 2 categories");
  const levelIds = levels.map((l) => l.id);

  // Rules are what makes this a thinking lesson rather than a sort. Without
  // them the naming step is just the sort again.
  const rules = lesson.rules;
  if (!Array.isArray(rules) || rules.length < 2) {
    fail("lesson.rules needs at least 2 — the student names the RULE, not the category, or this type collapses back into sorting");
  }
  const ruleIds = rules.map((r) => r.id);

  const wd = lesson.wrongDesk;
  const rounds = wd.rounds;
  if (!Array.isArray(rounds) || rounds.length < 2) fail("wrongDesk.rounds needs at least 2 rounds");

  rounds.forEach((r, i) => {
    if (!r.id) fail(`wrongDesk.rounds[${i}].id missing`);
    if (!r.situation) fail(`wrongDesk.rounds[${i}].situation missing`);
    // Part 1 of the fix: the cost of getting it wrong is the phase's reason to
    // exist. A round without one is a sorting question with a story on top.
    if (!r.whatWentWrong) {
      fail(`wrongDesk.rounds[${i}].whatWentWrong missing — without a consequence for routing it wrong, this is just a sort`);
    }
    const opts = r.routeOptions;
    if (!Array.isArray(opts) || opts.length < 3) fail(`wrongDesk.rounds[${i}].routeOptions needs 3+`);
    if (!opts.some((o) => o.best)) fail(`wrongDesk.rounds[${i}] has no routeOption marked best`);
    opts.forEach((o, oi) => {
      if (!o.best && !o.whatIf) {
        fail(`wrongDesk.rounds[${i}].routeOptions[${oi}] needs a whatIf — a distractor without one is just marked wrong`);
      }
      if (o.levelId && !levelIds.includes(o.levelId)) {
        fail(`wrongDesk.rounds[${i}].routeOptions[${oi}] points at level "${o.levelId}", which is not in lesson.levels`);
      }
    });
    // Part 2 of the fix: the graded step names a rule.
    const rOpts = r.ruleOptions;
    if (!Array.isArray(rOpts) || rOpts.length < 2) {
      fail(`wrongDesk.rounds[${i}].ruleOptions needs 2+ — naming the rule is this shape's graded step`);
    }
    rOpts.forEach((ro) => {
      if (!ruleIds.includes(ro.id)) {
        fail(`wrongDesk.rounds[${i}] offers rule "${ro.id}", which is not one of lesson.rules (${ruleIds.join(", ")})`);
      }
    });
    if (!r.vocabTerm || !r.vocabMeaning) fail(`wrongDesk.rounds[${i}] needs vocabTerm and vocabMeaning`);
    if (!r.stretch || !Array.isArray(r.stretch.options)) fail(`wrongDesk.rounds[${i}].stretch missing`);
  });

  const bs = lesson.boundarySynthesis;
  if (!Array.isArray(bs.sortItems) || bs.sortItems.length < 4) fail("boundarySynthesis.sortItems needs 4+");
  if (!Array.isArray(bs.boundaries) || bs.boundaries.length < SS_CATEGORY_MIN_BOUNDARIES) {
    fail(
      `boundarySynthesis.boundaries needs at least ${SS_CATEGORY_MIN_BOUNDARIES} — a category's definition lives at its edge, and a lesson that only tests the obvious middle hasn't tested it`
    );
  }
  if (!bs.removeOne || !Array.isArray(bs.removeOne.options) || bs.removeOne.options.length < 3) {
    fail("boundarySynthesis.removeOne needs 3+ options");
  }

  const tr = lesson.transfer;
  if (!Array.isArray(tr.spots) || tr.spots.length < 4) fail("transfer.spots needs 4+ (including one decoy)");
  if (!Array.isArray(tr.claimOptions) || tr.claimOptions.length < 3) fail("transfer.claimOptions needs 3+");

  const items = (lesson.clearance && lesson.clearance.items) || [];
  if (items.length !== SS_CATEGORY_CLEARANCE_ITEMS) {
    fail(`clearance.items must be ${SS_CATEGORY_CLEARANCE_ITEMS} — got ${items.length}`);
  }

  return true;
}

/** Quality checks. The four shared checks are delegated; what's added is
 * specific to building a lesson out of categories — which is the type most
 * prone to regressing into the shallow sorting the rebuild replaced.
 *
 * Returns an array of problem strings (empty === clean). */
export function auditCategoryQuality(lesson, opts) {
  const o = opts || {};

  const rounds = ((lesson.wrongDesk || {}).rounds) || [];
  const shim = {
    ...lesson,
    storyTeach: {
      vocab: rounds.map((r) => ({ term: r.vocabTerm, meaning: r.vocabMeaning })),
    },
  };
  const problems = auditThinkingQuality(shim, o);

  const answers = (o.answers && o.answers.wrongDesk) || {};
  const levelIds = (lesson.levels || []).map((l) => l.id);

  // 1. The rules must vary. Three rounds that all come down to the same rule
  //    means the naming step can be answered without reading — the same
  //    one-note failure the comparison shape guards against.
  const namedRules = rounds.map((r) => (answers[r.id] || {}).ruleId).filter(Boolean);
  if (namedRules.length >= 2 && new Set(namedRules).size === 1) {
    problems.push(
      `every wrongDesk round names the same rule ("${namedRules[0]}") — a student can tap it every time without reading`
    );
  }

  // 2. Every category must appear as a plausible WRONG route somewhere. A
  //    category that is never mistakenly picked is never actually tested —
  //    students only ever meet it as the answer.
  const wrongLevels = new Set();
  rounds.forEach((r) => {
    (r.routeOptions || []).forEach((op) => {
      if (!op.best && op.levelId) wrongLevels.add(op.levelId);
    });
  });
  if (wrongLevels.size) {
    const neverWrong = levelIds.filter((id) => !wrongLevels.has(id));
    if (neverWrong.length) {
      problems.push(
        `categories that never appear as a wrong answer: ${neverWrong.join(", ")} — a category nobody is ever tempted to pick isn't being tested`
      );
    }
  }

  // 3. Every category must be the right answer at least once, too.
  const rightLevels = rounds.map((r) => r.levelId).filter(Boolean);
  if (rightLevels.length) {
    const neverRight = levelIds.filter((id) => !rightLevels.includes(id));
    if (neverRight.length && !((lesson.boundarySynthesis || {}).boundaries || []).length) {
      problems.push(`categories never taught as the correct answer: ${neverRight.join(", ")}`);
    }
  }

  // 4. A round must not name its own rule in the setup.
  rounds.forEach((r) => {
    const key = answers[r.id] || {};
    const rule = (lesson.rules || []).find((x) => x.id === key.ruleId);
    if (!rule) return;
    const setup = `${r.situation || ""} ${r.wrongDeskLine || ""} ${r.whatWentWrong || ""}`.toLowerCase();
    const words = String(rule.label || "")
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 4 && !["there", "where", "which", "would", "could", "every", "other", "those", "these", "people", "place", "thing", "things", "about", "right"].includes(w));
    const leaked = words.filter((w) => setup.includes(w));
    if (leaked.length >= 2) {
      problems.push(
        `wrongDesk round "${r.id}" states its own rule in the setup ("${leaked.slice(0, 2).join('", "')}") — naming it afterwards is copying, not reasoning`
      );
    }
  });

  // 5. The counterfactual must not key to "nothing changes".
  const ro = (lesson.boundarySynthesis || {}).removeOne;
  if (ro && Array.isArray(ro.options) && !ro.options.some((x) => x.isNoChange)) {
    problems.push(
      `boundarySynthesis.removeOne has no option marked isNoChange — the student who thinks the categories don't matter has no way to say so, and no way to be corrected`
    );
  }

  return problems;
}
