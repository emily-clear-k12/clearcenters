// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.5.9E. TEKS 5.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for or against an argument.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  jade: { name: "Jade", emoji: "📢", color: "#F59E0B", hint: "Marisol's campaign manager. Writes in capital letters." },
  marisol: { name: "Marisol", emoji: "🗳️", color: "#8B5CF6", hint: "The candidate. Anxious about tomorrow's vote." },
  blaze: { name: "Blaze", emoji: "🔥", color: "#EF4444", hint: "The loud line. Only shouts." },
  bridget: { name: "Bridget", emoji: "🌉", color: "#3B82F6", hint: "The quiet fact about responsibility. Connects to the point." },
  cleo: { name: "Cleo", emoji: "🐈", color: "#22C55E", hint: "The ancient Egypt fact. Keeps wandering off topic." },
  diaz: { name: "Mr. Diaz", emoji: "📋", color: "#0D9488", hint: "The student council advisor." }
};

export const PUBLIC_CASE = {
  standard: "ELA.5.9E",
  title: "The Loudest Evidence",
  bigQuestion: "Marisol's speech gives three reasons for a class pet. Which one is the strongest evidence?",
  trapLine: "'Pets are AMAZING and everyone LOVES them!' is the best evidence. It's the most exciting line in the whole speech.",
  evidenceBank: [
    "Marisol's claim is that the class should get a class pet",
    "'Pets are AMAZING and everyone LOVES them' is an opinion",
    "Caring for a pet every day means feeding it, cleaning its cage, and checking on it",
    "People in ancient Egypt kept cats, but that has nothing to do with this classroom",
    "The best evidence connects most directly to the claim"
  ],
  coldOpenMessages: [
    { who: "system", text: "Marisol is running for student council. Here is her speech." },
    { who: "system", text: "\"Our class should get a class pet! Pets are AMAZING and everyone LOVES them! Taking care of a pet teaches responsibility, because someone has to feed it, clean its cage, and check on it every single day. Also, did you know people in ancient Egypt kept cats as pets? Vote Marisol!\"" },
    { who: "blaze", text: "AMAZING! LOVES! I'm the best part and everybody knows it!" },
    { who: "bridget", text: "I'm the part about taking care of a pet every day. I'm quieter. But I'm the only one who says what a class would actually get out of it." },
    { who: "cleo", text: "I'm true! Totally true. Ancient Egypt. Cats. Did you know they — wait, what are we talking about?" },
    { who: "marisol", text: "The vote is tomorrow. I need my best evidence at the top of the poster." },
    { who: "diaz", text: "Jade, you're her campaign manager. Which line is her strongest evidence?" },
    { who: "jade", text: "'Pets are AMAZING and everyone LOVES them!' is the best evidence. It's the most exciting line in the whole speech." }
  ],
  selfCheckQuestions: [
    "Did I name Marisol's claim?",
    "Did I explain why Blaze is not strong evidence?",
    "Did I explain why Cleo is true but not useful here?",
    "Did I pick the strongest evidence and explain why?",
    "Did I give Jade a rule for choosing evidence?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Jade believe?", placeholder: "In your own words, what is Jade's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Jade's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to write one more piece of evidence that would be even stronger than Bridget, and explain what makes it stronger.";
