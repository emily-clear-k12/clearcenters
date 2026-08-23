// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.7C, TEKS 3.7C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.7C",
  title: "Whose Service Is It Anyway?",
  bigQuestion: "Which level of government commonly provides different services?",
  evidenceBank: [
    "Trash pickup and local parks are commonly handled by local government.",
    "State highways and statewide programs are commonly handled at the state level.",
    "National defense and services that cover the whole country are handled by the national government."
  ],
  trapLine: "If a service helps people, any level of government could be responsible for it.",
  castNames: {
    ben: "Ben Any-Folder",
    local: "Lila Local Services",
    state: "Sam State Services",
    national: "Nina National Services"
  },
  distractors: "",
  mustInclude: [
    "Uses a local service example.",
    "Uses a state service example.",
    "Uses a national service example.",
    "Uses reach/scale to match service to level.",
    "Rejects any-folder reasoning."
  ],
};
