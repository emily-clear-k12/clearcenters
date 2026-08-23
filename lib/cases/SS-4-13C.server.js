// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.13C, TEKS 4.13C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.13C",
  title: "Three Documents, Three Jobs",
  bigQuestion: "What is the intent, meaning, and importance of the Declaration of Independence, U.S. Constitution, and Bill of Rights?",
  evidenceBank: [
    "Explained why the colonies separated from Great Britain and stated important ideas about rights and government.",
    "Created the framework and powers of the national government.",
    "Added protections for individual freedoms and limits on government power."
  ],
  trapLine: "All three founding documents are basically lists of rules for government.",
  castNames: {
    zoe: "Zoe Rule-List",
    decl: "Drew Declaration",
    const: "Connie Constitution",
    rights: "Billie Rights",
    synth: "Priya Purpose Board"
  },
  distractors: "",
  mustInclude: [
    "Explains Declaration purpose.",
    "Explains Constitution purpose.",
    "Explains Bill of Rights purpose.",
    "Connects but distinguishes the documents.",
    "Rejects one-rule-list reasoning."
  ],
};
