// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.3E, TEKS 4.3E).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.3E",
  title: "Texas Joins the United States — Problem Solved?",
  bigQuestion: "How did annexation change Texas, and how was it connected to the U.S.-Mexican War?",
  evidenceBank: [
    "Texas was annexed by the United States in 1845.",
    "Mexico had not accepted Texas independence and disputes over the border continued.",
    "The U.S.-Mexican War changed control of large areas of land and reshaped the region."
  ],
  trapLine: "Once Texas joined the United States, the Texas-Mexico conflict was over.",
  castNames: {
    mia: "Mia Problem-Solved",
    annex: "Alex Annexation File",
    border: "Bella Border File",
    war: "Will War File",
    impact: "Inez Impact Map"
  },
  distractors: "",
  mustInclude: [
    "Explains annexation.",
    "Explains continued dispute.",
    "Connects annexation to war tensions.",
    "Explains a war impact.",
    "Rejects the 'problem solved' claim."
  ],
};
