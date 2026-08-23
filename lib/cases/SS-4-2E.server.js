// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.2E, TEKS 4.2E).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.2E",
  title: "The Empresario Deal",
  bigQuestion: "How did empresarios help settle Texas, and what economic motivations shaped their work?",
  evidenceBank: [
    "Austin brought many families to settle in Texas under an empresario contract.",
    "De León founded a colony and helped bring Mexican families to settle in Texas.",
    "Empresarios expected economic opportunities from successful settlement and land development."
  ],
  trapLine: "Empresarios were just settlers who moved to Texas for free land.",
  castNames: {
    leo: "Leo Free-Land",
    austin: "Austin Contract File",
    deleon: "De León Colony File",
    econ: "Eva Economics",
    synth: "Nina Contract Judge"
  },
  distractors: "",
  mustInclude: [
    "Explains the empresario role.",
    "Uses Stephen F. Austin evidence.",
    "Uses Martín de León evidence.",
    "Explains economic motivation.",
    "Rejects the ordinary-settler-only idea."
  ],
};
