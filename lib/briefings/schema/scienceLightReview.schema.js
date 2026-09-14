// Briefings v2 — Science "light review" shape.
// Locked Sept 14, 2026; validator corrected the same day after actually
// wiring the mechanics into BriefingClient.js (see the runtime note in
// ssFullLesson.schema.js — the same correction applies here: a phase id
// is used directly, e.g. "matchPairs", with content at `lesson.matchPairs`,
// not a generic `{type:"practice", mechanic, data}` wrapper).
//
// WHY A DIFFERENT SHAPE FROM SS: Emily's framing — Science, unlike Social
// Studies, is "usually taught more," so a briefing here should refresh,
// not re-teach ("we dont need a cold open or first teach but a lesson
// and/or a review type lesson would be an asset"). Reviewing the actual
// current Science briefing (SCI-3-6B) during this scoping pass confirmed
// it was structurally IDENTICAL to the SS template — same 6 phases, same
// full first-teach depth, same Ops Choice mechanic — i.e. copy-pasted
// from the SS shape rather than actually built as a review. This schema
// is what fixes that: it's deliberately lighter, not just SS-with-a-
// shorter-clock.
//
// STRUCTURAL DIFFERENCES FROM SS (per the "Light touch only" + "Both"
// decisions from Sept 14):
//  - fieldBrief is replaced by a shorter quickReview — a recap framed as
//    "remember when we learned this," not a first-teach of new vocab/beats.
//  - TWO practice-mechanic reps instead of one, since content is already
//    known and more of the clock should go to retrieval practice rather
//    than teaching. The two reps must use DIFFERENT mechanics.
//  - No separate opsChoice/evidenceDrop phase — kept out on purpose to
//    stay "light touch"; the second practice rep does the applying.
//
// Target total: still 20 minutes (she settled on the same ~20 for both
// subjects — "stations are on average about 20 minutes"). The lightness
// is about depth/phase count, not a shorter clock.

import { PRACTICE_MECHANICS, validateMechanicPublicData } from "./mechanics.schema";
import { validateEngagement } from "./engagement.schema";

export const SCIENCE_LIGHT_REVIEW_PHASES = [
  {
    role: "hook",
    type: "intelDrop",
    minutes: 2,
    purpose: "A quick retrieval hook — \"remember when...\" framing, not a fresh mystery. Should reference something the class actually did in the taught lesson if possible.",
  },
  {
    role: "review",
    type: "quickReview",
    minutes: 4,
    purpose: "Short recap of the core idea + a vocab refresher (NOT full first-teach beats — assume the concept, just re-surface it). Meaningfully shorter than SS's fieldBrief.",
  },
  {
    role: "practice",
    type: PRACTICE_MECHANICS,
    minutes: 5,
    purpose: "First practice-mechanic rep.",
  },
  {
    role: "practice",
    type: PRACTICE_MECHANICS,
    minutes: 5,
    purpose: "Second practice-mechanic rep — must use a DIFFERENT mechanic than the first rep, so the review doesn't feel repetitive. This rep also carries the 'apply' weight SS gets from opsChoice.",
  },
  {
    role: "assess",
    type: "clearance",
    minutes: 4,
    purpose: "Explained multiple-choice/TF quiz, gated by progress from earlier phases. Every named TEKS sub-part must be tested here at least once, same requirement as SS.",
  },
];

export const SCIENCE_LIGHT_REVIEW_TARGET_MINUTES = 20;
export const SCIENCE_LIGHT_REVIEW_MINUTES_RANGE = [17, 22];

export function validateScienceLightReviewShape(lesson) {
  const errors = [];
  if (!lesson || typeof lesson !== "object") return ["lesson missing"];

  const requiredMeta = ["id", "title", "subject", "grade", "teks", "teksText", "minutes", "objective"];
  for (const field of requiredMeta) {
    if (!lesson[field] && lesson[field] !== 0) errors.push(`missing required field: ${field}`);
  }
  if (lesson.subject !== "science") {
    errors.push(`subject must be "science" for the Science light-review shape, got "${lesson.subject}"`);
  }

  const actualPhases = Array.isArray(lesson.phases) ? lesson.phases : [];
  const fixedSlots = ["intelDrop", "quickReview", null, null, "clearance"];
  if (actualPhases.length !== fixedSlots.length) {
    errors.push(`expected ${fixedSlots.length} phases for the Science light-review shape, got ${actualPhases.length}: ${JSON.stringify(actualPhases)}`);
  } else {
    fixedSlots.forEach((expected, i) => {
      if (expected === null) {
        if (!PRACTICE_MECHANICS.includes(actualPhases[i])) {
          errors.push(`phases[${i}] (a practice slot) must be one of ${PRACTICE_MECHANICS.join(", ")} — got "${actualPhases[i]}"`);
        }
      } else if (actualPhases[i] !== expected) {
        errors.push(`phases[${i}] must be "${expected}" for the Science light-review shape — got "${actualPhases[i]}"`);
      }
    });
    if (actualPhases[2] && actualPhases[2] === actualPhases[3]) {
      errors.push(`both practice reps use "${actualPhases[2]}" — the second rep must use a different mechanic`);
    }
  }

  if (typeof lesson.minutes === "number") {
    const [lo, hi] = SCIENCE_LIGHT_REVIEW_MINUTES_RANGE;
    if (lesson.minutes < lo || lesson.minutes > hi) {
      errors.push(`minutes (${lesson.minutes}) is outside the agreed ${lo}-${hi} range for a light review`);
    }
  }

  for (const mechanicId of [actualPhases[2], actualPhases[3]]) {
    if (mechanicId && PRACTICE_MECHANICS.includes(mechanicId)) {
      errors.push(...validateMechanicPublicData(mechanicId, lesson[mechanicId]));
    }
  }

  errors.push(...validateEngagement(lesson.engagement, actualPhases.length));

  return errors;
}
