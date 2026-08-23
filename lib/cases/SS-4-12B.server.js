// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.12B, TEKS 4.12B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.12B",
  title: "Same Texas, Different Governments",
  bigQuestion: "How were Spanish colonial government and early Mexican government in Texas similar and different?",
  evidenceBank: [
    "Texas was governed as part of the Spanish Empire under authority ultimately connected to the Spanish crown.",
    "After Mexican independence, Texas became part of Mexico and operated under Mexican political systems.",
    "Both systems had officials and laws, but authority and political structure were not identical."
  ],
  trapLine: "When Mexico became independent from Spain, government in Texas stayed basically the same.",
  castNames: {
    nora: "Nora Flag-Only",
    spanish: "Sofia Spanish Rule",
    mexico: "Mateo Mexican Government",
    same: "Sam Similarities",
    compare: "Carla Compare Board"
  },
  distractors: "",
  mustInclude: [
    "Uses Spanish colonial evidence.",
    "Uses Mexican-government evidence.",
    "Identifies a similarity.",
    "Explains a difference.",
    "Rejects flag-only reasoning."
  ],
};
