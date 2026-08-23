// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.1C, TEKS 3.1C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.1C",
  title: "How Do You Build a Community?",
  bigQuestion: "How can individuals help expand an existing community or help create a new one?",
  evidenceBank: [
    "Daniel Boone helped explore and open routes into areas west of earlier settlements.",
    "The Founding Fathers helped create a new national government and plans for the new United States.",
    "Routes, rules, and organized plans can help people move, settle, and create new communities."
  ],
  trapLine: "Communities grow mostly when people build more houses.",
  castNames: {
    nina: "Nina More-Houses",
    boone: "Boone Route Card",
    founders: "Founders Plan Card",
    synth: "Toby Growth Map"
  },
  distractors: "",
  mustInclude: [
    "Explains Boone's contribution.",
    "Explains Founding Fathers' contribution.",
    "Connects contribution to community growth.",
    "Uses a clear relationship.",
    "Rejects houses-only reasoning."
  ],
};
