// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.1C, TEKS 3.1C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  nina: { name: "Nina More-Houses", emoji: "🏠", color: "#F59E0B", hint: undefined },
  boone: { name: "Boone Route Card", emoji: "🧭", color: "#3B82F6", hint: undefined },
  founders: { name: "Founders Plan Card", emoji: "📜", color: "#22C55E", hint: undefined },
  synth: { name: "Toby Growth Map", emoji: "🗺️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.1C",
  title: "How Do You Build a Community?",
  bigQuestion: "How can individuals help expand an existing community or help create a new one?",
  trapLine: "Communities grow mostly when people build more houses.",
  evidenceBank: [
    "Daniel Boone helped explore and open routes into areas west of earlier settlements.",
    "The Founding Fathers helped create a new national government and plans for the new United States.",
    "Routes, rules, and organized plans can help people move, settle, and create new communities."
  ],
  coldOpenMessages: [
    { who: "system", text: "A map in a history game shows one small town growing outward. A student says the only real sign of expansion is more houses." },
    { who: "nina", text: "If a town gets bigger, doesn’t that mostly mean more houses were built?" },
    { who: "boone", text: "A route can help people reach places where new communities may form." },
    { who: "founders", text: "Rules and plans can help people organize a new community." },
    { who: "synth", text: "A community can grow because people create access and organization, not only houses." }
  ],
  selfCheckQuestions: [
    "Did I explain how Daniel Boone contributed to expansion?",
    "Did I explain how the Founding Fathers contributed to creating a new nation and communities?",
    "Did I connect routes or plans to settlement and growth?",
    "Did I use at least two pieces of evidence?",
    "Did I explain why community growth is more than building houses?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "boone", label: "How could Daniel Boone's work help communities expand?", placeholder: "Think about routes and movement..." },
  { key: "founders", label: "How could the Founding Fathers help create communities?", placeholder: "Think about plans and government..." },
  { key: "link", label: "What do routes and plans have in common?", placeholder: "How do both help growth?" },
  { key: "claim", label: "Why is 'more houses' too small an answer?", placeholder: "Use both clues..." }
];

export const PUSH_ANGLE = "Map Growth Challenge: add one symbol to the map for a route, rule, or plan and explain how it could help a community expand.";
