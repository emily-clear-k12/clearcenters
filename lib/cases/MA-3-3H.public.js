// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.3.3H. TEKS 3.3H — compare two fractions having the same numerator or denominator in problems by reasoning about their sizes and justifying the conclusion using symbols, words, objects, and pictorial models.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  theo: { name: "Theo", emoji: "🍕", color: "#F59E0B", hint: "Very sure. Very hungry." },
  octavia: { name: "Octavia", emoji: "🔺", color: "#EF4444", hint: "A skinny slice. Tired of being picked last." },
  quinn: { name: "Quinn", emoji: "🟧", color: "#3B82F6", hint: "A wide slice. Doesn't like to brag." },
  twins: { name: "Twin Crusts", emoji: "⭕", color: "#8B5CF6", hint: "Two pizzas, same oven, same size." },
  ada: { name: "Ms. Ada", emoji: "🔪", color: "#0D9488", hint: "Cutting the next pizza. Needs a rule fast." }
};

export const PUBLIC_CASE = {
  standard: "MA.3.3H",
  title: "More Slices, More Pizza",
  bigQuestion: "Theo wants 1/8 of a pizza instead of 1/4. Is an eighth really a bigger slice?",
  trapLine: "I want the eighth, not the fourth. Eight is bigger than four, so an eighth is a bigger slice.",
  evidenceBank: [
    "The two pizzas are exactly the same size",
    "One pizza was cut into 8 equal slices and the other into 4",
    "Octavia on top of Quinn covers only half of her",
    "Two Octavias cover one Quinn exactly",
    "Cutting the same whole into more pieces makes each piece smaller"
  ],
  coldOpenMessages: [
    { who: "system", text: "Pizza party! Two pizzas came out of the oven. One is cut into 8 equal slices. The other is cut into 4 equal slices." },
    { who: "ada", text: "Theo, you're first in line. Do you want 1/8 or 1/4?" },
    { who: "twins", text: "Before anybody picks — we're twins. Same oven. Same size. Exactly." },
    { who: "quinn", text: "I'm from the pizza cut into 4. I'm pretty wide. Just saying." },
    { who: "octavia", text: "I'm from the pizza cut into 8. Nobody ever picks me. Lie me on top of Quinn and see what happens." },
    { who: "quinn", text: "She only covers half of me. You'd need two of her to cover one of me." },
    { who: "theo", text: "I still want the eighth, not the fourth. Eight is bigger than four, so an eighth is a bigger slice." }
  ],
  selfCheckQuestions: [
    "Did I say the two pizzas are the same size?",
    "Did I use what happened when Octavia was put on top of Quinn?",
    "Did I say which slice is bigger?",
    "Did I explain why more slices means smaller slices?",
    "Did I give Ms. Ada a rule she can use?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Theo believe?", placeholder: "In your own words, what is Theo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Theo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them which is bigger, 1/3 or 1/6 of the same pizza, and how they know without cutting anything.";
