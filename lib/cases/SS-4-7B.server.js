// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.7B, TEKS 4.7B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.7B",
  title: "Why Did the Town Grow There?",
  bigQuestion: "Why did Texas towns and cities develop in different places during different historical periods?",
  evidenceBank: [
    "Some early towns developed near rivers, missions, trails, or dependable water.",
    "Railroad stops helped some towns grow by improving travel, trade, and shipping.",
    "Highways, jobs, industries, and large population centers can influence growth today."
  ],
  trapLine: "Towns usually grew wherever someone happened to start building.",
  castNames: {
    tess: "Tess Accident Map",
    early: "Eli Early-Texas File",
    rail: "Rina Railroad File",
    modern: "Mason Modern Growth",
    timeline: "Talia Timeline"
  },
  distractors: "",
  mustInclude: [
    "Uses an early settlement factor.",
    "Explains railroad-era growth.",
    "Uses a modern growth factor.",
    "Compares factors across time.",
    "Rejects accident-only reasoning."
  ],
};
