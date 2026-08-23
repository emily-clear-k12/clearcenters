// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.10A, TEKS 4.10A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Price-Up", emoji: "📈", color: "#F59E0B", hint: undefined },
  demand: { name: "Dylan Demand", emoji: "🙋", color: "#3B82F6", hint: undefined },
  supply: { name: "Sofia Supply", emoji: "🧃", color: "#22C55E", hint: undefined },
  seller: { name: "Sam Seller", emoji: "🏪", color: "#8B5CF6", hint: undefined },
  consumer: { name: "Cora Consumer", emoji: "🛍️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.10A",
  title: "The Lemonade Price Puzzle",
  bigQuestion: "How do supply and demand work together to affect price and availability?",
  trapLine: "If lots of people want lemonade, the price always has to go up.",
  evidenceBank: [
    "Many students want lemonade on a hot afternoon.",
    "The stand has only a few pitchers left.",
    "Another stand has plenty of lemonade and keeps the same price."
  ],
  coldOpenMessages: [
    { who: "system", text: "At the school fair, one lemonade stand sells out fast. A student says high demand always means the price must rise." },
    { who: "mia", text: "If demand is high, the price has to go up. That’s the rule, right?" },
    { who: "demand", text: "Demand tells us how many buyers want something." },
    { who: "supply", text: "Supply matters too. Lots of demand feels different when there is plenty available." },
    { who: "seller", text: "A seller might change price, make more, or sell out without changing price." },
    { who: "consumer", text: "Consumers feel supply and demand through price, choices, and whether an item is available." }
  ],
  selfCheckQuestions: [
    "Did I explain what demand means in the scenario?",
    "Did I explain what supply means in the scenario?",
    "Did I connect supply and demand instead of discussing only one?",
    "Did I explain at least one possible effect on price or availability?",
    "Did I avoid saying that high demand always causes a price increase?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "demand", label: "What does the evidence show about demand?", placeholder: "Who wants the lemonade?" },
  { key: "supply", label: "What does the evidence show about supply?", placeholder: "How much is available?" },
  { key: "effect", label: "What could happen when demand is high and supply is low?", placeholder: "Price? availability? choice?" },
  { key: "compare", label: "Why might the second stand react differently?", placeholder: "Use its larger supply..." },
  { key: "claim", label: "Why is 'high demand always means higher price' too simple?", placeholder: "Use both supply and seller choices..." }
];

export const PUSH_ANGLE = "Price Puzzle: change one fact about supply or demand and predict what could happen next.";
