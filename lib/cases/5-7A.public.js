// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  lenny: { name: "Lenny the Leash", emoji: "\ud83e\uddae", color: "#F2A93B", hint: "Thinks pulling always has to make something move." },
  max: { name: "Max the Dog", emoji: "\ud83d\udc15", color: "#7B5DFF", hint: "One side of the pull \u2014 his own force is half the picture." },
  bella: { name: "Bella the Dog", emoji: "\ud83d\udc29", color: "#00C2C7", hint: "The other side of the pull \u2014 creates the contrast across rounds." },
  frankie: { name: "Frankie the Force Meter", emoji: "\ud83d\udccf", color: "#697386", hint: "Has the exact force readings from both rounds." },
  dana: { name: "Dana the Dog Walker", emoji: "\ud83d\udeb6", color: "#22C55E", hint: "Needs the real explanation to manage the walk safely." }
};

export const PUBLIC_CASE = {
  standard: "5.7A",
  title: "The Dog Walk Standoff",
  bigQuestion: "Why didn't the leash move at all in one round of the dog walk, but suddenly lurch sideways in the next?",
  trapLine: "As long as both dogs are pulling, I have to go somewhere \u2014 pulling always makes things move.",
  evidenceBank: [
    "Round 1: Max pulls with 40 N, Bella pulls with 40 N \u2192 leash doesn't move",
    "Round 2: Max pulls with 55 N, Bella pulls with 30 N \u2192 leash moves toward Max",
    "Force-meter readings recorded on both sides, both rounds",
    "Energy visibly transfers into motion only in Round 2"
  ],
  coldOpenMessages: [
    { who: "system", text: "Dana is walking Max and Bella together when the leash suddenly stalls, then lurches." },
    { who: "dana", text: "Okay, why did the leash just freeze completely, then suddenly yank sideways?" },
    { who: "max", text: "I was pulling my hardest both times, I don't get it either." },
    { who: "bella", text: "Me too \u2014 same effort as always." },
    { who: "lenny", text: "As long as you're both pulling, I have to go somewhere. Pulling always makes things move... right?" },
    { who: "frankie", text: "Let's actually check the numbers. Round 1: Max at 40, Bella at 40." },
    { who: "frankie", text: "Round 2: Max jumped to 55, Bella stayed at 30." },
    { who: "lenny", text: "As long as both dogs are pulling, I have to go somewhere \u2014 pulling always makes things move." }
  ],
  selfCheckQuestions: [
    "Did I use the actual force numbers from both rounds?",
    "Did I explain the difference between the equal-force round and the unequal-force round?",
    "Did I explain what happens to the energy when the forces are unequal?",
    "Did I say whether Lenny's \"pulling always moves things\" claim is really true?",
    "Did I state the rule about equal and unequal forces?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Lenny believe?", placeholder: "In your own words, what is Lenny's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Lenny's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design their own equal-vs-unequal force test (two spring scales pulling a toy cart) and predict the motion pattern before testing.";
