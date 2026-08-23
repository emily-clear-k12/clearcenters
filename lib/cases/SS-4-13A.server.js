// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.13A, TEKS 4.13A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.13A",
  title: "Why Do We Need Both Documents?",
  bigQuestion: "Why were the Texas Declaration of Independence and the Texas Constitution both important?",
  evidenceBank: [
    "The Texas Declaration of Independence explained why Texas was separating from Mexico.",
    "The Texas Constitution established rules and a structure for government.",
    "One document explains separation; the other organizes government."
  ],
  trapLine: "Both documents did basically the same job because they were both about Texas government.",
  castNames: {
    mia: "Mia Same-Job",
    decl: "Dylan Declaration",
    const: "Cora Constitution",
    purpose: "Priya Purpose",
    synth: "Theo Document Desk"
  },
  distractors: "",
  mustInclude: [
    "Explains Declaration purpose.",
    "Explains Constitution purpose.",
    "Explains importance.",
    "Compares the documents.",
    "Rejects same-job reasoning."
  ],
};
