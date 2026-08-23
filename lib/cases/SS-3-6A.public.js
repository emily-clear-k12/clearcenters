// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.6A, TEKS 3.6A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jay: { name: "Jay Random-Price", emoji: "🎟️", color: "#F59E0B", hint: undefined },
  supply: { name: "Suri Supply", emoji: "📦", color: "#3B82F6", hint: undefined },
  demand: { name: "Dani Demand", emoji: "🙋", color: "#22C55E", hint: undefined },
  price: { name: "Piper Price", emoji: "💲", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.6A",
  title: "Why Did the Price Change?",
  bigQuestion: "How can supply and demand affect the price of a good or service?",
  trapLine: "Prices change mostly because sellers feel like changing them.",
  evidenceBank: [
    "There are 100 glow bracelets and only a few buyers.",
    "Only 20 bracelets remain, but many students still want one.",
    "The price rises from $2 to $4."
  ],
  coldOpenMessages: [
    { who: "system", text: "At a school carnival, glow bracelets cost $2 in the morning and $4 later. One student says the seller probably just changed the price for no reason." },
    { who: "jay", text: "Maybe the seller just felt like charging more later." },
    { who: "supply", text: "There were many bracelets at first, but far fewer later." },
    { who: "demand", text: "A lot of students still wanted bracelets when only a few were left." },
    { who: "price", text: "Price can change when how much is available and how many people want it change." }
  ],
  selfCheckQuestions: [
    "Did I explain what happened to supply?",
    "Did I explain what happened to demand?",
    "Did I describe the price change?",
    "Did I connect supply and demand to price?",
    "Did I explain why the price change was not just random?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "supply", label: "How did supply change?", placeholder: "More or fewer bracelets?" },
  { key: "demand", label: "What happened to demand?", placeholder: "How many students wanted them?" },
  { key: "price", label: "What happened to the price?", placeholder: "$2 to $4..." },
  { key: "why", label: "How can supply and demand explain the change?", placeholder: "Connect the clues..." },
  { key: "claim", label: "Why is 'the seller just felt like it' too weak?", placeholder: "Use supply + demand..." }
];

export const PUSH_ANGLE = "What-If Card: change the supply or demand and predict what might happen to price.";
