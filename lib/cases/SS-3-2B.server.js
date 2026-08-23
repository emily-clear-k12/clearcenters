// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.2B, TEKS 3.2B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.2B",
  title: "Same Need, Different Solution",
  bigQuestion: "How can two communities meet the same needs in different ways?",
  evidenceBank: [
    "The local community uses buses and roads. The island community also uses ferries and boats.",
    "The local community uses phones, internet, and a library. The island community uses those too, but a ferry also carries mail and supplies.",
    "One community has a large sports park. The island community uses a beach and community field."
  ],
  trapLine: "If two communities need the same things, they should solve the problem the same way.",
  castNames: {
    ava: "Ava Same-Solution",
    local: "Leo Local Community",
    island: "Isla Island Community",
    compare: "Cami Compare Card"
  },
  distractors: "",
  mustInclude: [
    "Names a shared community need.",
    "Uses a local-community solution.",
    "Uses an island-community solution.",
    "Makes an actual comparison.",
    "Explains why solutions differ."
  ],
};
