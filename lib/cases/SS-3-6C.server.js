// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.6C, TEKS 3.6C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.6C",
  title: "The Store Sold Out… But Did It Make Money?",
  bigQuestion: "How do cost of production and selling price affect profit?",
  evidenceBank: [
    "Each sticker pack costs $3 to make.",
    "Each pack sells for $4.",
    "If each pack sold for $2 instead, the shop would still sell out."
  ],
  trapLine: "If a store sells every item, it must have made a profit.",
  castNames: {
    ben: "Ben Sold-Out",
    cost: "Cami Cost",
    price: "Piper Price",
    profit: "Priya Profit"
  },
  distractors: "",
  mustInclude: [
    "Uses cost evidence.",
    "Uses selling-price evidence.",
    "Explains profit relationship.",
    "Explains the lower-price case.",
    "Rejects sold-out reasoning."
  ],
};
