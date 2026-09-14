// Briefings v2 schema — single import point.
// See ssFullLesson.schema.js and scienceLightReview.schema.js for the two
// locked lesson shapes, mechanics.schema.js for the practice-mechanic
// menu, and engagement.schema.js for the shared "just fun" contract.

export {
  SS_FULL_LESSON_PHASES,
  SS_FULL_LESSON_TARGET_MINUTES,
  SS_FULL_LESSON_MINUTES_RANGE,
  validateSsFullLessonShape,
} from "./ssFullLesson.schema";

export {
  SCIENCE_LIGHT_REVIEW_PHASES,
  SCIENCE_LIGHT_REVIEW_TARGET_MINUTES,
  SCIENCE_LIGHT_REVIEW_MINUTES_RANGE,
  validateScienceLightReviewShape,
} from "./scienceLightReview.schema";

export {
  PRACTICE_MECHANICS,
  MECHANIC_SHAPES,
  validateMechanicPublicData,
} from "./mechanics.schema";

export {
  ENGAGEMENT_SHAPE,
  buildDefaultEngagement,
  validateEngagement,
} from "./engagement.schema";

export {
  SS_THINKING_PHASES,
  SS_THINKING_TARGET_MINUTES,
  SS_THINKING_MINUTES_RANGE,
  SS_THINKING_CLEARANCE_ITEMS,
  validateSsThinkingShape,
  auditThinkingQuality,
} from "./ssThinkingLesson.schema";

// The only check that reads BOTH packs. Everything above validates one file
// against itself; this one validates a lesson against its own answer key, so
// a spot, item or beat id that exists in one and not the other is caught
// before a student finds it. Required before any batch generation run.
export { crossCheckLesson } from "./crossCheck.schema";

// Type 2 — comparison. See ssComparisonLesson.schema.js for why a comparison
// can't run on the ssThinking shape (it has no causal chain to hang beats on).
export {
  SS_COMPARISON_PHASES,
  SS_COMPARISON_TARGET_MINUTES,
  SS_COMPARISON_MINUTES_RANGE,
  SS_COMPARISON_CLEARANCE_ITEMS,
  validateSsComparisonShape,
  auditComparisonQuality,
} from "./ssComparisonLesson.schema";

import { validateSsFullLessonShape } from "./ssFullLesson.schema";
import { validateScienceLightReviewShape } from "./scienceLightReview.schema";
import { validateSsThinkingShape } from "./ssThinkingLesson.schema";
import { validateSsComparisonShape } from "./ssComparisonLesson.schema";

// Dispatch by subject AND shape. A lesson declares its shape explicitly
// (`shape: "ssThinking"`); without one we fall back to the v2 shapes, so
// the three lessons already in the catalog keep validating as they did.
export function validateLessonShape(lesson) {
  if (!lesson || typeof lesson !== "object") return ["lesson missing"];
  if (lesson.shape === "ssThinking") return validateSsThinkingShape(lesson);
  if (lesson.shape === "ssComparison") return validateSsComparisonShape(lesson);
  if (lesson.subject === "social_studies") return validateSsFullLessonShape(lesson);
  if (lesson.subject === "science") return validateScienceLightReviewShape(lesson);
  return [`unknown subject "${lesson.subject}" — expected "social_studies" or "science"`];
}
