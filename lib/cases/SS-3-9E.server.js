// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.9E, TEKS 3.9E).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.9E",
  title: "The Class Vote Disaster",
  bigQuestion: "How can voting be used fairly to make a group decision?",
  evidenceBank: [
    "The class has three activity options.",
    "Each student gets one vote.",
    "All votes are counted, and the option with the most votes is selected."
  ],
  trapLine: "A vote is fair as long as the loudest choice wins.",
  castNames: {
    max: "Max Loudest-Wins",
    choice: "Cora Choices",
    vote: "Vera One-Vote",
    count: "Cal Count-It"
  },
  distractors: "",
  mustInclude: [
    "Uses clear-choice evidence.",
    "Uses equal-vote evidence.",
    "Explains how votes are counted.",
    "Explains fairness.",
    "Rejects loudest-wins reasoning."
  ],
};
