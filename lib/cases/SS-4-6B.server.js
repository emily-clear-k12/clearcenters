// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.6B, TEKS 4.6B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.6B",
  title: "Which Texas Region Fits?",
  bigQuestion: "How can we compare Texas's four physical regions using more than one characteristic?",
  evidenceBank: [
    "Drier climate, mountains, basins, desert vegetation, and lower population in many areas.",
    "High plains and rolling areas, grasslands, cooler winters in the north, ranching and agriculture.",
    "Lower elevation, more rainfall in many areas, forests or coastal vegetation, large cities and many industries."
  ],
  trapLine: "If two regions have similar weather, they are basically the same region.",
  castNames: {
    kai: "Kai Climate-Only",
    mountain: "Mountains & Basins File",
    plains: "Great Plains File",
    coast: "Coastal Plains File",
    compare: "Nora Region Compare"
  },
  distractors: "",
  mustInclude: [
    "Compares multiple Texas regions.",
    "Uses physical characteristics.",
    "Uses economic activity evidence.",
    "Makes an actual comparison.",
    "Rejects one-characteristic-only reasoning."
  ],
};
