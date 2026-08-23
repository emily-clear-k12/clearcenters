// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.10A, TEKS 4.10A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.10A",
  title: "The Lemonade Price Puzzle",
  bigQuestion: "How do supply and demand work together to affect price and availability?",
  evidenceBank: [
    "Many students want lemonade on a hot afternoon.",
    "The stand has only a few pitchers left.",
    "Another stand has plenty of lemonade and keeps the same price."
  ],
  trapLine: "If lots of people want lemonade, the price always has to go up.",
  castNames: {
    mia: "Mia Price-Up",
    demand: "Dylan Demand",
    supply: "Sofia Supply",
    seller: "Sam Seller",
    consumer: "Cora Consumer"
  },
  distractors: "",
  mustInclude: [
    "Explains demand.",
    "Explains supply.",
    "Connects supply and demand.",
    "Explains an effect on price or availability.",
    "Rejects the always-price-up rule."
  ],
};
