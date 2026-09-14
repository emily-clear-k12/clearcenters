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

import { validateSsFullLessonShape } from "./ssFullLesson.schema";
import { validateScienceLightReviewShape } from "./scienceLightReview.schema";

// Dispatch by subject so callers (the checker script, a future generator)
// don't need to know which shape a lesson should be ahead of time.
export function validateLessonShape(lesson) {
  if (!lesson || typeof lesson !== "object") return ["lesson missing"];
  if (lesson.subject === "social_studies") return validateSsFullLessonShape(lesson);
  if (lesson.subject === "science") return validateScienceLightReviewShape(lesson);
  return [`unknown subject "${lesson.subject}" — expected "social_studies" or "science"`];
}
