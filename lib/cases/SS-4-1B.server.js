// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.1B, TEKS 4.1B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.1B",
  title: "Same State, Different Ways of Life",
  bigQuestion: "How were the ways of life of American Indian groups in Texas similar and different before European exploration?",
  evidenceBank: [
    "Caddo communities farmed crops and lived in permanent villages in East Texas.",
    "Karankawa groups lived along the Gulf Coast and relied heavily on coastal resources.",
    "Lipan Apache groups moved across parts of Texas and hunted game, including buffalo."
  ],
  trapLine: "They all lived in Texas, so their ways of life were probably mostly the same.",
  castNames: {
    ava: "Ava One-Display",
    caddo: "Caddo Village File",
    karankawa: "Karankawa Coast File",
    lipan: "Lipan Apache Trail File",
    compare: "Casey Compare"
  },
  distractors: "",
  mustInclude: [
    "States a valid similarity.",
    "Uses Caddo evidence.",
    "Uses evidence from Karankawa or Lipan Apache.",
    "Explains an actual difference.",
    "Rejects the one-size-fits-all description."
  ],
};
