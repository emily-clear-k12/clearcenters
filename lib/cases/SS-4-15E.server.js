// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.15E, TEKS 4.15E).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.15E",
  title: "Dear... Who in Texas?",
  bigQuestion: "How do you decide which state or local government leader to contact about a problem?",
  evidenceBank: [
    "A broken city park light is usually handled by local government.",
    "A concern about a statewide law belongs at the state level.",
    "Some leaders are elected, while others are appointed to specific jobs."
  ],
  trapLine: "If you have a government problem, sending it to the governor is always the safest choice.",
  castNames: {
    milo: "Milo Governor-for-Everything",
    local: "Lena Local Office",
    state: "Sam State Office",
    type: "Tara Elected-or-Appointed",
    route: "Riley Routing Desk"
  },
  distractors: "",
  mustInclude: [
    "Identifies government level.",
    "Chooses an appropriate leader/office.",
    "Recognizes elected/appointed leaders.",
    "Explains why the contact fits.",
    "Rejects governor-for-everything reasoning."
  ],
};
