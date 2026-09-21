// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.3.5B. TEKS 3.5B — represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  milo: { name: "Milo", emoji: "🧁", color: "#F59E0B", hint: "Loves shortcuts." },
  wordy: { name: "Wordy", emoji: "📝", color: "#8B5CF6", hint: "The word problem. Sick of being skimmed." },
  crew: { name: "Row Crew", emoji: "🪑", color: "#3B82F6", hint: "Six picnic tables. Four cupcakes on each." },
  grid: { name: "Captain Grid", emoji: "🔲", color: "#22C55E", hint: "An array. Lines everything up in neat rows." },
  lin: { name: "Ms. Lin", emoji: "🎪", color: "#0D9488", hint: "Running the bake sale." }
};

export const PUBLIC_CASE = {
  standard: "MA.3.5B",
  title: "The Altogether Rule",
  bigQuestion: "There are 6 tables with 4 cupcakes on each one. How many cupcakes are there altogether?",
  trapLine: "It says 'altogether,' so you add. Six tables and four cupcakes. That's 10.",
  evidenceBank: [
    "There are 6 tables, and each table has 4 cupcakes",
    "The tables are 6 equal groups of 4",
    "Captain Grid lines them up in 6 rows of 4 and counts 24",
    "Ms. Lin has already sold 20 cupcakes and still has some left",
    "The word 'altogether' shows up in both adding and multiplying problems"
  ],
  coldOpenMessages: [
    { who: "system", text: "The school bake sale. Ms. Lin needs to know how many cupcakes she has in all." },
    { who: "wordy", text: "Read me all the way through, please. 'There are 6 tables. Each table has 4 cupcakes. How many cupcakes are there altogether?'" },
    { who: "crew", text: "We're the six tables. Four cupcakes on every one of us. No table has more, no table has less." },
    { who: "grid", text: "Let me line them up. Six rows. Four in each row." },
    { who: "lin", text: "I've already sold 20 cupcakes, and I still have some left on the tables." },
    { who: "wordy", text: "Did anyone read past the word 'altogether'?" },
    { who: "milo", text: "It says 'altogether,' so you add. Six tables and four cupcakes. That's 10." }
  ],
  selfCheckQuestions: [
    "Did I use the 6 tables with 4 cupcakes on each?",
    "Did I use Captain Grid's rows?",
    "Did I use Ms. Lin's 20 sold cupcakes?",
    "Did I say how many cupcakes there really are?",
    "Did I give Milo a better rule than looking for one word?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Milo believe?", placeholder: "In your own words, what is Milo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Milo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to write a word problem that uses 'altogether' where adding really IS the right move.";
