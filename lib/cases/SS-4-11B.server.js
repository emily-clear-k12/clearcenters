// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.11B, TEKS 4.11B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.11B",
  title: "Where Should This Business Go?",
  bigQuestion: "How do climate and natural resources influence where economic activities happen in Texas?",
  evidenceBank: [
    "A farming business needs suitable soil, water, and climate.",
    "Energy businesses often locate near useful natural resources.",
    "Landforms, climate, and scenery can influence recreation and tourism."
  ],
  trapLine: "A business can succeed anywhere in Texas if the owner works hard enough.",
  castNames: {
    ryan: "Ryan Anywhere",
    climate: "Clara Climate",
    resource: "Rico Resources",
    land: "Lena Landforms",
    judge: "Jules Site Judge"
  },
  distractors: "",
  mustInclude: [
    "Explains a climate effect.",
    "Explains a resource effect.",
    "Connects geography to an economic activity.",
    "Compares possible locations.",
    "Rejects anywhere-is-fine reasoning."
  ],
};
