// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.10B, TEKS 3.10B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.10B",
  title: "Same Celebration? Not Quite.",
  bigQuestion: "How can celebrations in different communities be similar and different?",
  evidenceBank: [
    "Includes a community parade, family recipes, and music connected to local traditions.",
    "Includes a candle-lighting ceremony, special foods, and stories connected to that community's traditions.",
    "Both celebrations bring people together and include food and music."
  ],
  trapLine: "If two celebrations both have music and food, they are basically the same celebration.",
  castNames: {
    jay: "Jay Basically-Same",
    local: "Lina Local Box",
    other: "Omar Other Box",
    compare: "Cami Compare Box"
  },
  distractors: "",
  mustInclude: [
    "Identifies a similarity.",
    "Uses local-celebration evidence.",
    "Uses other-community evidence.",
    "Makes a real comparison.",
    "Rejects basically-same reasoning."
  ],
};
