// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.2A, TEKS 4.2A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.2A",
  title: "Why Texas?",
  bigQuestion: "Why did European countries explore and settle Texas?",
  evidenceBank: [
    "European countries wanted wealth, trade, land, and other economic opportunities.",
    "European powers competed with one another for territory and influence.",
    "Countries wanted to claim and control more land."
  ],
  trapLine: "Explorers came mainly because they were curious about new places.",
  castNames: {
    ben: "Ben Adventure",
    money: "Mia Opportunity File",
    comp: "Carlos Competition File",
    expand: "Elena Expansion File",
    synth: "Owen Motive Board"
  },
  distractors: "",
  mustInclude: [
    "Explains economic opportunity.",
    "Explains competition.",
    "Explains expansion.",
    "Uses multiple motives.",
    "Rejects adventure-only reasoning."
  ],
};
