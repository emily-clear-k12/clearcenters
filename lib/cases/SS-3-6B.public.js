// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.6B, TEKS 3.6B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia None-Left", emoji: "0️⃣", color: "#F59E0B", hint: undefined },
  supply: { name: "Seth Supply", emoji: "⚽", color: "#3B82F6", hint: undefined },
  want: { name: "Willa Wants", emoji: "🙋", color: "#22C55E", hint: undefined },
  choice: { name: "Cora Choice", emoji: "🔎", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.6B",
  title: "Everybody Wants One. There Aren’t Enough.",
  bigQuestion: "What is scarcity, and how can you tell when something is scarce?",
  trapLine: "Something is scarce only when there is none left.",
  evidenceBank: [
    "The cart has 8 mini soccer balls.",
    "24 students want a soccer ball.",
    "The teacher must decide how the 8 balls will be given out."
  ],
  coldOpenMessages: [
    { who: "system", text: "A school prize cart has 8 mini soccer balls, but 24 students want one. A student says there is no scarcity yet because the cart still has some soccer balls." },
    { who: "mia", text: "There are still 8 balls, so how can they be scarce?" },
    { who: "supply", text: "There are some balls, but not enough for everyone who wants one." },
    { who: "want", text: "Scarcity depends on how much is available compared with how much people want." },
    { who: "choice", text: "When there is not enough for everyone, someone has to make a choice." }
  ],
  selfCheckQuestions: [
    "Did I explain that scarcity means there is not enough to meet all wants?",
    "Did I use the number available?",
    "Did I use the number of students who want one?",
    "Did I explain why a choice must be made?",
    "Did I avoid saying scarcity means there must be zero left?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "available", label: "How many are available?", placeholder: "Use the prize-cart clue..." },
  { key: "wanted", label: "How many people want one?", placeholder: "Use the student clue..." },
  { key: "scarcity", label: "Why is this scarcity?", placeholder: "Compare available to wanted..." },
  { key: "claim", label: "Why can scarcity exist before something is gone?", placeholder: "Use the numbers..." }
];

export const PUSH_ANGLE = "Scarcity Check: decide whether three new prize-cart examples show scarcity and explain one choice.";
