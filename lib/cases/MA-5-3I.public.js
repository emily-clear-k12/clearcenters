// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.5.3I. TEKS 5.3I — represent and solve multiplication of a whole number and a fraction that refers to the same whole using objects and pictorial models, including area models.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  omar: { name: "Omar", emoji: "👨‍🍳", color: "#F59E0B", hint: "Head baker, in his own mind." },
  cardie: { name: "Cardie", emoji: "🗒️", color: "#8B5CF6", hint: "The recipe card. Splattered and wise." },
  cuppy: { name: "Cuppy", emoji: "🥄", color: "#22C55E", hint: "A half-cup measure. Has waited her whole life for this." },
  arie: { name: "Arie", emoji: "🟦", color: "#3B82F6", hint: "An area model. Shades things in." },
  rina: { name: "Aunt Rina", emoji: "🏠", color: "#0D9488", hint: "Has exactly 4 cups of flour in the house." }
};

export const PUBLIC_CASE = {
  standard: "MA.5.3I",
  title: "The Half-Batch Problem",
  bigQuestion: "The recipe needs 6 cups of flour. Omar is making the recipe times 1/2. How much flour does he need?",
  trapLine: "We're making it times 1/2. Multiplying always makes things bigger, so we need more than 6 cups.",
  evidenceBank: [
    "The recipe calls for 6 cups of flour",
    "Six half-cups of flour make 3 whole cups",
    "Arie shades half of each of the 6 cups and gets 3",
    "6 x 2 = 12, 6 x 1 = 6, and 6 x 1/2 = 3",
    "Multiplying by a number less than 1 gives less than you started with"
  ],
  coldOpenMessages: [
    { who: "system", text: "Aunt Rina's kitchen. Omar is making half a batch of cookies. The recipe says 6 cups of flour." },
    { who: "rina", text: "I only have 4 cups of flour in the whole house. Will that be enough?" },
    { who: "cardie", text: "I say 6 cups for a full batch. Half a batch means 6 times 1/2. Somebody check my margins." },
    { who: "cuppy", text: "I'm a half-cup! Put me to work. One half for each of the 6 cups. Count how many whole cups I fill." },
    { who: "arie", text: "Give me 6 squares, one for each cup. Now shade half of each one. Count the shading." },
    { who: "cardie", text: "I wrote a pattern in my margin once: 6 times 2 is 12. 6 times 1 is 6. 6 times 1/2 is... keep going." },
    { who: "omar", text: "We're making it times 1/2. Multiplying always makes things bigger, so we need more than 6 cups." }
  ],
  selfCheckQuestions: [
    "Did I use Cuppy's half-cups?",
    "Did I use Arie's shading?",
    "Did I use the pattern in Cardie's margin?",
    "Did I say how many cups Omar really needs, and whether Aunt Rina has enough?",
    "Did I give Omar a rule about multiplying by a fraction?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Omar believe?", placeholder: "In your own words, what is Omar's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Omar's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask what happens to 6 if you multiply it by 3/2, and whether that answer is bigger or smaller than 6.";
