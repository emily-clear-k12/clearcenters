// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.7A, TEKS 4.7A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.7A",
  title: "Why Did People Settle Here?",
  bigQuestion: "How have landforms and climate influenced where people settled in Texas?",
  evidenceBank: [
    "People often needed reliable water and usable land for homes, farming, or ranching.",
    "Very dry or very harsh climates could make settlement more difficult.",
    "Rivers, trails, roads, and later railroads could make some places easier to reach and supply."
  ],
  trapLine: "People mostly settled wherever there was open land.",
  castNames: {
    luke: "Luke Open-Land",
    water: "Willa Water File",
    climate: "Cal Climate File",
    landform: "Lena Landform File",
    map: "Mara Settlement Map"
  },
  distractors: "",
  mustInclude: [
    "Uses one geographic factor.",
    "Uses a second geographic factor.",
    "Connects geography to settlement/population.",
    "Explains a causal relationship.",
    "Rejects open-land-only reasoning."
  ],
};
