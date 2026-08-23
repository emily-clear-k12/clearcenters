// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.6A).

export const CAST = {
  pebble: { name: "Pebble", emoji: "🪨", color: "#F59E0B", hint: "Thinks small things always float." },
  log: { name: "The Log", emoji: "🪵", color: "#22C55E", hint: "Big, heavy, and floats." },
  cork: { name: "The Cork", emoji: "🟤", color: "#8B5CF6", hint: "Smaller than Pebble. Floats." },
  pond: { name: "The Pond", emoji: "💧", color: "#3B82F6", hint: "Gives the same answer every time." },
  rafa: { name: "Rafa", emoji: "🛶", color: "#0D9488", hint: "Wants it tested, not guessed." }
};

export const PUBLIC_CASE = {
  standard: "3.6A",
  title: "The Raft Load",
  bigQuestion: "The log is 2,100 g and floats. The pebble is 40 g and sinks. So what decides it?",
  trapLine: "I'm small, and small things float.",
  evidenceBank: [
    "The log is 2,100 g and it floats",
    "The pebble is 40 g and it sinks",
    "The cork is only 3 g and it floats",
    "The log is much heavier than the pebble",
    "Every thing got weighed and then put in the water"
  ],
  coldOpenMessages: [
    { who: "system", text: "The raft goes on the pond today. Everything has been weighed. Nothing has been put in the water yet." },
    { who: "rafa", text: "Okay. I need to know what floats before I load it. Who wants to go first?" },
    { who: "pebble", text: "Me. I'm small, so I'm easy. Small things float." },
    { who: "log", text: "Hm. I'm 2,100 grams. I'm the biggest thing here. And I float." },
    { who: "rafa", text: "You do. I've seen you float three times." },
    { who: "cork", text: "And I'm three grams. Tiny. I float too." },
    { who: "pond", text: "I'll test anything anyone hands me. I give the same answer every time." },
    { who: "pebble", text: "Then test me and we can all stop talking about it. I'm small, and small things float." }
  ],
  selfCheckQuestions: [
    "Did I use the weights Rafa wrote down?",
    "Did I say what each thing did in the water?",
    "Did I use the cork?",
    "Did I answer what Pebble said about small things?",
    "Did I tell Rafa how to find out about the next thing?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Pebble believe?", placeholder: "In your own words, what is Pebble's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Pebble's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Give them three new things — a metal spoon, a plastic lid, a wet sponge — and have them predict, test, and record which float, then say which prediction they got wrong and why.";
