// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.7B, TEKS 3.7B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.7B",
  title: "Who Actually Handles This?",
  bigQuestion: "Who are government officials at different levels, and how are they chosen?",
  evidenceBank: [
    "A mayor is a local official and is commonly elected by local voters.",
    "A governor is a state official and is elected by voters in the state.",
    "The president is a national official chosen through the presidential election process."
  ],
  trapLine: "Every government official is elected by all the people.",
  castNames: {
    zoe: "Zoe Everyone-Votes",
    local: "Maya Mayor File",
    state: "Gabe Governor File",
    national: "Pia President File"
  },
  distractors: "",
  mustInclude: [
    "Identifies a local official.",
    "Identifies a state official.",
    "Identifies a national official.",
    "Explains how officials are chosen.",
    "Rejects everyone-votes reasoning."
  ],
};
