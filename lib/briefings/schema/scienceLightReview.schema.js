// Briefings v2 — Science "light review" shape.
// Locked Sept 14, 2026.
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
//    than teaching.
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
    type: "intelDrop",
    role: "hook",
    minutes: 2,
    purpose: "A quick retrieval hook — \"remember when...\" framing, not a fresh mystery. Should reference something the class actually did in the taught lesson if possible.",
  },
  {
    type: "quickReview",
    role: "review",
    minutes: 4,
    purpose: "Short recap of the core idea + a vocab refresher (NOT full first-teach beats — assume the concept, just re-surface it). Meaningfully shorter than SS's fieldBrief.",
  },
  {
    type: "practice",
    role: "practice",
    minutes: 5,
    purpose: "First practice-mechanic rep.",
    mechanicOptions: PRACTICE_MECHANICS,
  },
  {
    type: "practice",
    role: "practice",
    minutes: 5,
    purpose: "Second practice-mechanic rep — must use a DIFFERENT mechanic than the first rep, so the review doesn't feel repetitive. This rep also carries the 'apply' weight SS gets from opsChoice.",
    mechanicOptions: PRACTICE_MECHANICS,
  },
  {
    type: "clearance",
    role: "assess",
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

  const expectedTypes = SCIENCE_LIGHT_REVIEW_PHASES.map((p) => p.type);
  const actualTypes = Array.isArray(lesson.phases) ? lesson.phases : [];
  if (JSON.stringify(actualTypes) !== JSON.stringify(expectedTypes)) {
    errors.push(
      `phases must be exactly ${JSON.stringify(expectedTypes)} for the Science light-review shape — got ${JSON.stringify(actualTypes)}`
    );
  }

  if (typeof lesson.minutes === "number") {
    const [lo, hi] = SCIENCE_LIGHT_REVIEW_MINUTES_RANGE;
    if (lesson.minutes < lo || lesson.minutes > hi) {
      errors.push(`minutes (${lesson.minutes}) is outside the agreed ${lo}-${hi} range for a light review`);
    }
  }

  if (Array.isArray(lesson.practices) && lesson.practices.length === 2) {
    const [p1, p2] = lesson.practices;
    errors.push(...validateMechanicPublicData(p1?.mechanic, p1?.data));
    errors.push(...validateMechanicPublicData(p2?.mechanic, p2?.data));
    if (p1?.mechanic && p2?.mechanic && p1.mechanic === p2.mechanic) {
      errors.push(`both practice reps use "${p1.mechanic}" — the second rep must use a different mechanic`);
    }
  } else {
    errors.push('expected exactly two entries in "practices" (one per practice phase)');
  }

  errors.push(...validateEngagement(lesson.engagement, expectedTypes.length));

  return errors;
}
