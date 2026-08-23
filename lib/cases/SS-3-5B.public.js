// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.5B, TEKS 3.5B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ella: { name: "Ella Wish-List", emoji: "📝", color: "#F59E0B", hint: undefined },
  spend: { name: "Sam Spend Plan", emoji: "🛒", color: "#3B82F6", hint: undefined },
  save: { name: "Sofia Save Goal", emoji: "🐷", color: "#22C55E", hint: undefined },
  math: { name: "Milo Budget Check", emoji: "🧮", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.5B",
  title: "The $40 Budget Problem",
  bigQuestion: "How can a simple budget help someone decide what to spend and what to save?",
  trapLine: "A budget is just a list of things you want to buy.",
  evidenceBank: [
    "The club wants to save at least $10 for a future project.",
    "Snacks cost $18, decorations cost $12, and a game costs $15.",
    "The club has only $40 total."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class club has $40 for a mini celebration. One student writes down $40 worth of snacks and decorations and calls that the budget." },
    { who: "ella", text: "If we list what we want to buy, that’s a budget, right?" },
    { who: "spend", text: "A spending plan has to fit the money you actually have." },
    { who: "save", text: "The budget also needs to protect the $10 savings goal." },
    { who: "math", text: "If spending plus saving is more than $40, the plan does not work." }
  ],
  selfCheckQuestions: [
    "Did I use the total amount of money available?",
    "Did I include the savings goal?",
    "Did I make a spending plan that stays within the limit?",
    "Did I explain one choice or tradeoff?",
    "Did I explain why a budget is more than a list of wants?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "money", label: "How much money does the club have?", placeholder: "Total available..." },
  { key: "save", label: "How much should be saved?", placeholder: "Use the savings goal..." },
  { key: "spend", label: "How much is left to spend?", placeholder: "Money left after saving..." },
  { key: "plan", label: "Which items fit the budget?", placeholder: "Choose a workable plan..." },
  { key: "claim", label: "Why is a wish list not the same as a budget?", placeholder: "Use the money limit..." }
];

export const PUSH_ANGLE = "Budget Swap: change one item price and revise the plan without losing the savings goal.";
