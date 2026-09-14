// Briefings v2 — Social Studies "full lesson" shape.
// Locked Sept 14, 2026; validator corrected the same day after actually
// wiring the mechanics into BriefingClient.js (see note below).
//
// WHY A FULL LESSON: Emily's framing — SS stations are often the only time
// a student meets this content at all ("social studies especially doesn't
// usually get any lesson time"). So this shape has to function as a real
// first-teach "cold open," not a review. It keeps the six-phase spine that
// SS-3-2A/2B already proved out, but every phase now targets a specific
// minute budget so a lesson can't quietly balloon past the ~20-minute
// station window she confirmed ("stations are on average about 20
// minutes" — "yes i think that sounds right").
//
// RUNTIME NOTE: the original version of this file modeled the practice
// slot as a generic `{ type: "practice", mechanic, data }` wrapper. That
// doesn't match how BriefingClient.js actually works once built: every
// phase id in `phases` is used DIRECTLY (the same convention "reasonSort"
// and "opsChoice" already use), and its content lives at
// `lesson[phaseId]` — e.g. a lesson picking Match Pairs lists "matchPairs"
// in `phases` and puts its content at `lesson.matchPairs`. The validator
// below checks against that real shape.
//
// Target total: 20 minutes. Acceptable range: 18-23 (a lesson outside
// that range should be trimmed or padded before it ships, not shipped
// as-is).

import { PRACTICE_MECHANICS, validateMechanicPublicData } from "./mechanics.schema";
import { validateEngagement } from "./engagement.schema";

// Phase ROLES, in order — the "practice" role's actual phases-array entry
// is whichever concrete mechanic id the lesson picked (see PRACTICE_MECHANICS).
export const SS_FULL_LESSON_PHASES = [
  {
    role: "hook",
    type: "intelDrop",
    minutes: 2,
    purpose: "A concrete mystery/scene the standard will explain — not a definition dump. Chip-only claim, no free text (Grade 3).",
  },
  {
    role: "teach",
    type: "fieldBrief",
    minutes: 7,
    purpose: "The actual first-teach: vocab + 2-4 beats (one per TEKS sub-part) + a quick check after each beat. This is where new content is introduced — give it the most time of any phase.",
  },
  {
    role: "practice",
    type: PRACTICE_MECHANICS, // any ONE of these — the lesson picks
    minutes: 5,
    purpose: "ONE mechanic from the fixed menu (see mechanics.schema.js), picked to fit the content — not always Reason Sort.",
  },
  {
    role: "apply",
    type: "opsChoice",
    minutes: 4,
    purpose: "A scenario decision that forces a real trade-off (kept from v1's Founders' Council pattern) — applies the standard, doesn't just recall it.",
  },
  {
    role: "evidence",
    type: "evidenceDrop",
    minutes: 2,
    purpose: "A small artifact (postcard-style) the student produces as proof of understanding, carried forward from their opsChoice pick.",
  },
  {
    role: "assess",
    type: "clearance",
    minutes: 4,
    purpose: "Explained multiple-choice/TF quiz, gated by progress from earlier phases. Every named TEKS sub-part must be tested here at least once.",
  },
];

export const SS_FULL_LESSON_TARGET_MINUTES = 20;
export const SS_FULL_LESSON_MINUTES_RANGE = [18, 23];

export function validateSsFullLessonShape(lesson) {
  const errors = [];
  if (!lesson || typeof lesson !== "object") return ["lesson missing"];

  const requiredMeta = ["id", "title", "subject", "grade", "teks", "teksText", "minutes", "objective"];
  for (const field of requiredMeta) {
    if (!lesson[field] && lesson[field] !== 0) errors.push(`missing required field: ${field}`);
  }
  if (lesson.subject !== "social_studies") {
    errors.push(`subject must be "social_studies" for the SS full-lesson shape, got "${lesson.subject}"`);
  }

  const actualPhases = Array.isArray(lesson.phases) ? lesson.phases : [];
  const fixedSlots = ["intelDrop", "fieldBrief", null /* practice: any mechanic */, "opsChoice", "evidenceDrop", "clearance"];
  if (actualPhases.length !== fixedSlots.length) {
    errors.push(`expected ${fixedSlots.length} phases for the SS full-lesson shape, got ${actualPhases.length}: ${JSON.stringify(actualPhases)}`);
  } else {
    fixedSlots.forEach((expected, i) => {
      if (expected === null) {
        if (!PRACTICE_MECHANICS.includes(actualPhases[i])) {
          errors.push(`phases[${i}] (the practice slot) must be one of ${PRACTICE_MECHANICS.join(", ")} — got "${actualPhases[i]}"`);
        }
      } else if (actualPhases[i] !== expected) {
        errors.push(`phases[${i}] must be "${expected}" for the SS full-lesson shape — got "${actualPhases[i]}"`);
      }
    });
  }

  if (typeof lesson.minutes === "number") {
    const [lo, hi] = SS_FULL_LESSON_MINUTES_RANGE;
    if (lesson.minutes < lo || lesson.minutes > hi) {
      errors.push(`minutes (${lesson.minutes}) is outside the agreed ${lo}-${hi} range for a full lesson`);
    }
  }

  const mechanicId = actualPhases[2];
  if (mechanicId && PRACTICE_MECHANICS.includes(mechanicId)) {
    errors.push(...validateMechanicPublicData(mechanicId, lesson[mechanicId]));
  }

  errors.push(...validateEngagement(lesson.engagement, actualPhases.length));

  return errors;
}
