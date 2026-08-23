// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.3B, TEKS 3.3B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.3B",
  title: "Adapt or Change It?",
  bigQuestion: "How do people adapt to or modify different environments?",
  evidenceBank: [
    "People may wear light clothing and plan around heat. They may also build canals or irrigation systems.",
    "People may use steep roads carefully and wear warm clothing. They may also cut roads through slopes.",
    "People may use raised walkways. They may also drain or fill land for building."
  ],
  trapLine: "Adapting and modifying mean the same thing because both help people live in a place.",
  castNames: {
    mia: "Mia Same-Thing",
    adapt: "Ari Adapt",
    modify: "Mona Modify",
    compare: "Cami Compare"
  },
  distractors: "",
  mustInclude: [
    "Explains adaptation.",
    "Explains modification.",
    "Makes the people-vs-place distinction.",
    "Uses examples from different environments.",
    "Rejects same-thing reasoning."
  ],
};
