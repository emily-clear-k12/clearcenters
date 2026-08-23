// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.3B, TEKS 3.3B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Same-Thing", emoji: "🟰", color: "#F59E0B", hint: undefined },
  adapt: { name: "Ari Adapt", emoji: "🧢", color: "#3B82F6", hint: undefined },
  modify: { name: "Mona Modify", emoji: "🛠️", color: "#22C55E", hint: undefined },
  compare: { name: "Cami Compare", emoji: "🔎", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.3B",
  title: "Adapt or Change It?",
  bigQuestion: "How do people adapt to or modify different environments?",
  trapLine: "Adapting and modifying mean the same thing because both help people live in a place.",
  evidenceBank: [
    "People may wear light clothing and plan around heat. They may also build canals or irrigation systems.",
    "People may use steep roads carefully and wear warm clothing. They may also cut roads through slopes.",
    "People may use raised walkways. They may also drain or fill land for building."
  ],
  coldOpenMessages: [
    { who: "system", text: "A survival-game team is given four environment cards. One student says every solution should go in one pile because adapting and modifying are basically the same." },
    { who: "mia", text: "If both help people live there, aren’t adapting and modifying the same thing?" },
    { who: "adapt", text: "Adapting means people change what they do." },
    { who: "modify", text: "Modifying means people change the place itself." },
    { who: "compare", text: "The clue is simple: did the people change, or did the environment change?" }
  ],
  selfCheckQuestions: [
    "Did I explain what adapting means?",
    "Did I explain what modifying means?",
    "Did I use at least one example of each?",
    "Did I compare the two ideas clearly?",
    "Did I avoid saying adapting and modifying are the same?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "adapt", label: "What is one example of adapting?", placeholder: "How did people change what they do?" },
  { key: "modify", label: "What is one example of modifying?", placeholder: "How did people change the place?" },
  { key: "compare", label: "How are adapting and modifying different?", placeholder: "People change vs. place changes..." },
  { key: "claim", label: "Why are the two ideas not the same?", placeholder: "Use one example of each..." }
];

export const PUSH_ANGLE = "Sort-the-Solutions: place six new cards into Adapt or Modify and explain two tricky choices.";
