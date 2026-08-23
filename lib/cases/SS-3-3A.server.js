// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.3A, TEKS 3.3A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.3A",
  title: "Same Planet, Very Different Place",
  bigQuestion: "How can physical environments be alike and different?",
  evidenceBank: [
    "Dry climate, little rainfall, rocky or sandy land, and limited water.",
    "Higher land, cooler temperatures, steep slopes, and hazards such as rockfalls or snow.",
    "Water-covered or soggy land, many water-loving plants, and hazards such as flooding."
  ],
  trapLine: "If two places have the same weather today, their physical environments are basically the same.",
  castNames: {
    kai: "Kai Same-Weather",
    desert: "Dani Desert",
    mountain: "Milo Mountain",
    wetland: "Wendy Wetland"
  },
  distractors: "",
  mustInclude: [
    "Uses evidence from multiple environments.",
    "Uses climate evidence.",
    "Uses landform/resource/hazard evidence.",
    "Makes a clear comparison.",
    "Rejects same-weather reasoning."
  ],
};
