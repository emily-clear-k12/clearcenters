// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.4D, TEKS 4.4D).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.4D",
  title: "What Happened When the Buffalo Disappeared?",
  bigQuestion: "How did forts, railroads, the Red River War, and the loss of buffalo change American Indian life in Texas?",
  evidenceBank: [
    "Buffalo provided food and also materials used for clothing, shelter, tools, and trade.",
    "U.S. forts and military campaigns increased pressure on American Indian groups in the Plains.",
    "Railroad expansion brought more settlers, hunters, and outside control into the region."
  ],
  trapLine: "The loss of buffalo was only a food problem.",
  castNames: {
    eli: "Eli Food-Only",
    buffalo: "Bree Buffalo File",
    fort: "Felix Fort File",
    rail: "Rae Railroad File",
    war: "Wes Red River File"
  },
  distractors: "",
  mustInclude: [
    "Explains multiple buffalo uses.",
    "Explains military/fort pressure.",
    "Explains railroad effect.",
    "Explains combined effects.",
    "Rejects the food-only claim."
  ],
};
