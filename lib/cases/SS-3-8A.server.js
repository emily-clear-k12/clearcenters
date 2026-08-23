// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.8A, TEKS 3.8A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.8A",
  title: "The Museum Labels Got Mixed Up",
  bigQuestion: "What is the purpose of the Declaration of Independence, U.S. Constitution, and Bill of Rights?",
  evidenceBank: [
    "Explains why the colonies separated from Great Britain.",
    "Sets up the plan and structure for the national government.",
    "Protects important individual freedoms and rights."
  ],
  trapLine: "All three documents can use the same label because they are all important government papers.",
  castNames: {
    nora: "Nora Same-Label",
    decl: "Drew Declaration Label",
    const: "Cora Constitution Label",
    rights: "Riley Rights Label"
  },
  distractors: "",
  mustInclude: [
    "Explains Declaration purpose.",
    "Explains Constitution purpose.",
    "Explains Bill of Rights purpose.",
    "Distinguishes the documents.",
    "Rejects same-label reasoning."
  ],
};
