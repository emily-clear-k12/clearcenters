// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.2A, TEKS 3.2A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.2A",
  title: "Why Live Together?",
  bigQuestion: "Why do people form communities?",
  evidenceBank: [
    "This family wants a place with clear laws and better security.",
    "This family wants to practice its religion freely.",
    "This family is looking for jobs, land, and a better way to meet material needs."
  ],
  trapLine: "People form communities mostly because they like being near other people.",
  castNames: {
    jay: "Jay Just-Neighbors",
    law: "Lena Law & Safety",
    freedom: "Freddie Freedom",
    wellbeing: "Maya Well-Being"
  },
  distractors: "",
  mustInclude: [
    "Explains security/laws.",
    "Explains religious freedom.",
    "Explains material well-being.",
    "Uses more than one reason.",
    "Rejects neighbor-only reasoning."
  ],
};
