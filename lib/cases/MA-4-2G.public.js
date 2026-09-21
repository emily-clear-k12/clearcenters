// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.4.2G. TEKS 4.2G — relate decimals to fractions that name tenths and hundredths.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  eli: { name: "Eli", emoji: "🎮", color: "#F59E0B", hint: "Wants the charger. Called it first." },
  maya: { name: "Maya", emoji: "📱", color: "#EF4444", hint: "Her tablet will not stop beeping." },
  volt: { name: "Volt", emoji: "🔋", color: "#22C55E", hint: "A battery bar with ten little bars." },
  fran: { name: "Fran", emoji: "📐", color: "#8B5CF6", hint: "A fraction strip cut into five equal parts." },
  dimes: { name: "Dime Squad", emoji: "🪙", color: "#3B82F6", hint: "Ten dimes. Together they make a dollar." },
  june: { name: "Grandma June", emoji: "🧶", color: "#0D9488", hint: "Has exactly one charger." }
};

export const PUBLIC_CASE = {
  standard: "MA.4.2G",
  title: "Point Five or One Fifth",
  bigQuestion: "Eli's tablet says 0.5 battery. Maya's says 1/5. Are they really the same, and who should charge first?",
  trapLine: "0.5 and 1/5 are the same thing — they've both got a 5. It's a tie, and I called it first.",
  evidenceBank: [
    "Volt lights 5 of his 10 bars for 0.5",
    "Volt lights only 2 of his 10 bars for 1/5",
    "Five dimes is 0.5 of a dollar; two dimes is 1/5 of a dollar",
    "0.5 means five tenths, which is the same as one half",
    "One of Fran's five equal parts is smaller than half the strip"
  ],
  coldOpenMessages: [
    { who: "system", text: "Grandma June's house. One charger. Two tablets. Two very low batteries." },
    { who: "june", text: "I have ONE charger. Whoever is lower goes first. What do your screens say?" },
    { who: "eli", text: "Mine says 0.5." },
    { who: "maya", text: "Mine says 1/5. And it keeps beeping at me." },
    { who: "volt", text: "I'm the battery bar. Ten little bars. Eli's screen has five of mine lit up." },
    { who: "fran", text: "I'm cut into five equal parts. Maya's screen lights up one of me. Just one." },
    { who: "dimes", text: "We're ten dimes. Five of us is fifty cents — half a dollar. One fifth of us is only two of us." },
    { who: "eli", text: "Numbers are numbers. 0.5 and 1/5 are the same thing — they've both got a 5. It's a tie, and I called it first." }
  ],
  selfCheckQuestions: [
    "Did I use how many of Volt's ten bars were lit for each tablet?",
    "Did I use the Dime Squad's money example?",
    "Did I explain what place the 5 is in, in 0.5?",
    "Did I say who should charge first?",
    "Did I give Grandma June a rule for comparing decimals and fractions?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Eli believe?", placeholder: "In your own words, what is Eli's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Eli's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them write Maya's battery as a decimal and explain what place its digit sits in.";
