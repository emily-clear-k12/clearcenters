// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.10B, TEKS 4.10B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.10B",
  title: "Why Choice Matters",
  bigQuestion: "How do choice and opportunity benefit people in a free enterprise system?",
  evidenceBank: [
    "People can choose between different products, prices, and services.",
    "People can start businesses and try new ideas.",
    "Businesses may improve products, service, or prices to attract customers."
  ],
  trapLine: "Choice mostly benefits businesses, not consumers.",
  castNames: {
    lee: "Lee Business-Only",
    consumer: "Cami Consumer",
    owner: "Owen Opportunity",
    comp: "Casey Competition",
    synth: "Nora Benefit Board"
  },
  distractors: "",
  mustInclude: [
    "Explains consumer choice.",
    "Explains business opportunity.",
    "Explains competition benefit.",
    "Shows benefits for more than one group.",
    "Rejects business-only reasoning."
  ],
};
