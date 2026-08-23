// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.2C, TEKS 4.2C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.2C",
  title: "Why Build a Mission Here?",
  bigQuestion: "Why did the Spanish establish settlements and Catholic missions in Texas, and why did location matter?",
  evidenceBank: [
    "Spanish missions were intended to spread Catholicism and strengthen Spanish presence.",
    "Settlements, missions, presidios, and roads often worked together to support Spanish claims.",
    "Water, travel routes, nearby communities, and useful land could affect where a mission or settlement was built."
  ],
  trapLine: "Spanish missions were built mainly wherever there was empty land.",
  castNames: {
    eli: "Eli Empty-Land",
    faith: "Isabel Mission File",
    claim: "Diego Spanish Claim File",
    place: "Marisol Location File",
    link: "Theo Purpose + Place"
  },
  distractors: "",
  mustInclude: [
    "Explains the religious purpose.",
    "Explains Spanish presence or claims.",
    "Uses a geographic location factor.",
    "Connects purpose and location.",
    "Rejects the empty-land-only idea."
  ],
};
