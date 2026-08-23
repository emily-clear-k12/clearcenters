// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.3A, TEKS 4.3A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.3A",
  title: "What Really Pushed Texas to Revolution?",
  bigQuestion: "How did several causes and events connect to the Texas Revolution and its effects?",
  evidenceBank: [
    "Tensions between Texas settlers and the Mexican government had already grown before the Alamo.",
    "The Texas Declaration of Independence was adopted during the revolution.",
    "The Runaway Scrape and Battle of San Jacinto happened after the Alamo."
  ],
  trapLine: "The Battle of the Alamo is what caused the Texas Revolution.",
  castNames: {
    max: "Max Alamo",
    cause: "Clara Cause File",
    decl: "Diego Declaration File",
    scrape: "Ruby Runaway Scrape",
    san: "Sam San Jacinto"
  },
  distractors: "",
  mustInclude: [
    "Identifies causes/tensions before the Alamo.",
    "Uses multiple major events.",
    "Shows correct sequence.",
    "Explains an effect of San Jacinto.",
    "Rejects the Alamo-as-single-cause claim."
  ],
};
