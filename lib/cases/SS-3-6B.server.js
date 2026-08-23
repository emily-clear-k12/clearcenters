// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.6B, TEKS 3.6B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.6B",
  title: "Everybody Wants One. There Aren’t Enough.",
  bigQuestion: "What is scarcity, and how can you tell when something is scarce?",
  evidenceBank: [
    "The cart has 8 mini soccer balls.",
    "24 students want a soccer ball.",
    "The teacher must decide how the 8 balls will be given out."
  ],
  trapLine: "Something is scarce only when there is none left.",
  castNames: {
    mia: "Mia None-Left",
    supply: "Seth Supply",
    want: "Willa Wants",
    choice: "Cora Choice"
  },
  distractors: "",
  mustInclude: [
    "Uses limited-amount evidence.",
    "Uses wants evidence.",
    "Explains scarcity.",
    "Connects scarcity to choice.",
    "Rejects none-left reasoning."
  ],
};
