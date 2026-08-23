// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.6C, TEKS 3.6C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ben: { name: "Ben Sold-Out", emoji: "✅", color: "#F59E0B", hint: undefined },
  cost: { name: "Cami Cost", emoji: "🧾", color: "#3B82F6", hint: undefined },
  price: { name: "Piper Price", emoji: "🏷️", color: "#22C55E", hint: undefined },
  profit: { name: "Priya Profit", emoji: "💰", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.6C",
  title: "The Store Sold Out… But Did It Make Money?",
  bigQuestion: "How do cost of production and selling price affect profit?",
  trapLine: "If a store sells every item, it must have made a profit.",
  evidenceBank: [
    "Each sticker pack costs $3 to make.",
    "Each pack sells for $4.",
    "If each pack sold for $2 instead, the shop would still sell out."
  ],
  coldOpenMessages: [
    { who: "system", text: "A pop-up sticker shop sells all 20 sticker packs. One student says the shop definitely made a profit because nothing was left." },
    { who: "ben", text: "If every sticker pack sold, the shop had to make money, right?" },
    { who: "cost", text: "The shop has to pay to make each sticker pack before it earns anything." },
    { who: "price", text: "Profit depends on the selling price compared with the cost." },
    { who: "profit", text: "Selling out is not enough. Compare what each pack costs with what each pack earns." }
  ],
  selfCheckQuestions: [
    "Did I identify the cost of production?",
    "Did I identify the selling price?",
    "Did I compare cost and selling price?",
    "Did I explain what happens when selling price is lower than cost?",
    "Did I explain why selling out does not always mean profit?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "cost", label: "What does each pack cost to make?", placeholder: "Production cost..." },
  { key: "price", label: "What is the selling price?", placeholder: "Use the price clue..." },
  { key: "profit", label: "Does the first plan earn profit? Why?", placeholder: "Compare $3 and $4..." },
  { key: "second", label: "What would happen at a $2 selling price?", placeholder: "Compare $2 and $3..." },
  { key: "claim", label: "Why does selling out not guarantee profit?", placeholder: "Use cost + price..." }
];

export const PUSH_ANGLE = "Price Switch: test two new selling prices and decide whether each would earn profit or cause a loss.";
