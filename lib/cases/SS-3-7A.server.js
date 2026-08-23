// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.7A, TEKS 3.7A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.7A",
  title: "Three Governments, Three Jobs?",
  bigQuestion: "How are local, state, and national governments organized at different levels?",
  evidenceBank: [
    "Local government serves a city, town, county, or nearby community.",
    "State government serves the entire state.",
    "National government serves the entire country."
  ],
  trapLine: "Local, state, and national government are basically the same government with different names.",
  castNames: {
    mia: "Mia One-Building",
    local: "Leo Local",
    state: "Sasha State",
    national: "Nico National"
  },
  distractors: "",
  mustInclude: [
    "Explains local level.",
    "Explains state level.",
    "Explains national level.",
    "Compares the levels by scale.",
    "Rejects one-government reasoning."
  ],
};
