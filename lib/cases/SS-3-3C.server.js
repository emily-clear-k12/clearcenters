// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.3C, TEKS 3.3C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.3C",
  title: "Who Changed the Landscape?",
  bigQuestion: "How can human actions change a landscape?",
  evidenceBank: [
    "A group of homes was built where open land used to be.",
    "A stream bank was replanted with grasses to reduce erosion.",
    "Trash and runoff changed the condition of a nearby creek."
  ],
  trapLine: "Landscapes change mostly because of natural events, not people.",
  castNames: {
    leo: "Leo Nature-Only",
    build: "Bree Builder",
    care: "Cora Conservation",
    pollute: "Parker Pollution"
  },
  distractors: "",
  mustInclude: [
    "Explains building impact.",
    "Explains conservation impact.",
    "Explains pollution impact.",
    "Connects action to landscape change.",
    "Rejects nature-only reasoning."
  ],
};
