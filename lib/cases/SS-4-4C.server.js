// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.4C, TEKS 4.4C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.4C",
  title: "The Railroad Changed Everything?",
  bigQuestion: "How did railroads change cities and major industries in Texas?",
  evidenceBank: [
    "Railroad stops could attract people, businesses, warehouses, and new services.",
    "Railroads helped move cattle, crops, lumber, and other goods to markets.",
    "Rail lines connected Texas towns to one another and to larger markets."
  ],
  trapLine: "Railroads mainly changed travel because people could get places faster.",
  castNames: {
    maya: "Maya Faster-Travel",
    city: "Cody City Map",
    goods: "Gia Goods File",
    market: "Marcus Market Link",
    synth: "Rina Ripple Effect"
  },
  distractors: "",
  mustInclude: [
    "Explains a city/town effect.",
    "Explains an industry effect.",
    "Connects railroads to markets.",
    "Explains a ripple effect.",
    "Rejects passenger-travel-only reasoning."
  ],
};
