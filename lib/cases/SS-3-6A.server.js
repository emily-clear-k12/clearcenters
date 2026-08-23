// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.6A, TEKS 3.6A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.6A",
  title: "Why Did the Price Change?",
  bigQuestion: "How can supply and demand affect the price of a good or service?",
  evidenceBank: [
    "There are 100 glow bracelets and only a few buyers.",
    "Only 20 bracelets remain, but many students still want one.",
    "The price rises from $2 to $4."
  ],
  trapLine: "Prices change mostly because sellers feel like changing them.",
  castNames: {
    jay: "Jay Random-Price",
    supply: "Suri Supply",
    demand: "Dani Demand",
    price: "Piper Price"
  },
  distractors: "",
  mustInclude: [
    "Explains supply change.",
    "Explains demand.",
    "Explains price change.",
    "Connects supply and demand to price.",
    "Rejects random-price reasoning."
  ],
};
