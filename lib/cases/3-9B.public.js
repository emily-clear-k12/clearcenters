// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.9B).

export const CAST = {
  jupiter: { name: "Jupiter", emoji: "🪐", color: "#F59E0B", hint: "Standing at the front, wrongly." },
  mercury: { name: "Mercury", emoji: "🔘", color: "#6B7280", hint: "First, and one of the smallest." },
  neptune: { name: "Neptune", emoji: "🔵", color: "#3B82F6", hint: "Last, because he's furthest out." },
  tape: { name: "The Floor Tape", emoji: "📏", color: "#22C55E", hint: "Every mark is a distance." },
  ren: { name: "Ren", emoji: "🚶", color: "#0D9488", hint: "Has to say all eight out loud." }
};

export const PUBLIC_CASE = {
  standard: "3.9B",
  title: "Jupiter Says He Should Be First",
  bigQuestion: "Jupiter is the biggest planet and Mercury is one of the smallest. So why is Mercury standing in front?",
  trapLine: "I'm the biggest, and biggest goes first. That's how lines work.",
  evidenceBank: [
    "The order from the Sun is Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
    "Jupiter is the biggest planet and he is fifth from the Sun",
    "Mercury is one of the smallest and he is first",
    "Mercury is first because he is closest to the Sun",
    "The floor tape was measured out from the Sun end"
  ],
  coldOpenMessages: [
    { who: "system", text: "Eight planets to be taped along the hallway floor, in order, before parents' night." },
    { who: "ren", text: "I have to walk people down this line and say all eight. Can everyone get in place?" },
    { who: "jupiter", text: "Already here. Front of the line. I'm the biggest by a long, long way." },
    { who: "mercury", text: "I'm meant to be in front of you, though." },
    { who: "jupiter", text: "You're tiny." },
    { who: "mercury", text: "I am. I'm also the closest one to the Sun. That's why I'm first." },
    { who: "tape", text: "Every mark I made this morning was measured out from the Sun end. I never measured anyone's size." },
    { who: "jupiter", text: "Then the tape's measuring the wrong thing. I'm the biggest, and biggest goes first. That's how lines work." }
  ],
  selfCheckQuestions: [
    "Did I give the order, or at least say where Jupiter belongs?",
    "Did I say what the order is based on?",
    "Did I use Mercury as proof?",
    "Did I answer Jupiter about being biggest?",
    "Did I give Ren one rule that works for the whole line?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Jupiter believe?", placeholder: "In your own words, what is Jupiter's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Jupiter's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out where a newly discovered planet would go if it were bigger than Jupiter but sat between Mars and Jupiter, and say what they needed to know to decide.";
