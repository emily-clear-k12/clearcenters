// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  sparky: { name: "Sparky the Soccer Ball", emoji: "\u26bd", color: "#F2A93B", hint: "Insists he was always empty inside." },
  cole: { name: "Cole the Captain", emoji: "\ud83e\uddd1", color: "#4DD6FF", hint: "First to notice the ball's gone floppy." },
  presley: { name: "Presley the Pressure Gauge", emoji: "\ud83d\udcdf", color: "#00C2C7", hint: "Reports the exact pressure readings." },
  sammy: { name: "Sammy the Scale", emoji: "\u2696\ufe0f", color: "#697386", hint: "Reports the mass numbers, inflated vs. flat." },
  coach: { name: "Coach Ramirez", emoji: "\ud83c\udfdf\ufe0f", color: "#22C55E", hint: "Needs the ball fixed before the big game." }
};

export const PUBLIC_CASE = {
  standard: "5.6D",
  title: "The Flat Soccer Ball Claim",
  bigQuestion: "Was the soccer ball ever really \"empty,\" or was something inside it all along?",
  trapLine: "I was always empty anyway, nothing was ever really inside me.",
  evidenceBank: [
    "Fully inflated soccer ball mass: 430 g",
    "Fully deflated soccer ball mass: 425 g (slightly less once air is gone)",
    "Pressure gauge reads high when inflated, near zero when flat",
    "The ball holds its round shape only when \"full\" \u2014 something inside must be pushing outward"
  ],
  coldOpenMessages: [
    { who: "system", text: "Cole finds the game ball gone completely floppy the morning of practice." },
    { who: "cole", text: "Sparky, what happened to you overnight? You're totally flat." },
    { who: "sparky", text: "Guess I lost whatever I never really had in the first place." },
    { who: "coach", text: "We need this ball round again before the big game. What's actually going on?" },
    { who: "presley", text: "Let me check the pressure. Reading's basically zero right now." },
    { who: "sammy", text: "And I've got the mass \u2014 425 grams flat. Let's compare it inflated." },
    { who: "cole", text: "Let's pump him up and check both again." },
    { who: "sparky", text: "I was always empty anyway, nothing was ever really inside me." }
  ],
  selfCheckQuestions: [
    "Did I compare the mass readings from inflated versus deflated?",
    "Did I use the pressure gauge evidence too?",
    "Did I explain what air actually is, in terms of tiny particles?",
    "Did I say whether Sparky's \"empty\" claim is really true?",
    "Did I connect this to the idea that matter can be too small to see?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Sparky believe?", placeholder: "In your own words, what is Sparky's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Sparky's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students predict and test what happens to mass and shape as air is let out of a balloon slowly, connecting particle loss to the shape and mass change.";
