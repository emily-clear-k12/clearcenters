// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.2B, TEKS 3.2B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ava: { name: "Ava Same-Solution", emoji: "🟰", color: "#F59E0B", hint: undefined },
  local: { name: "Leo Local Community", emoji: "🚌", color: "#3B82F6", hint: undefined },
  island: { name: "Isla Island Community", emoji: "⛴️", color: "#22C55E", hint: undefined },
  compare: { name: "Cami Compare Card", emoji: "🔎", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.2B",
  title: "Same Need, Different Solution",
  bigQuestion: "How can two communities meet the same needs in different ways?",
  trapLine: "If two communities need the same things, they should solve the problem the same way.",
  evidenceBank: [
    "The local community uses buses and roads. The island community also uses ferries and boats.",
    "The local community uses phones, internet, and a library. The island community uses those too, but a ferry also carries mail and supplies.",
    "One community has a large sports park. The island community uses a beach and community field."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class trades postcards with a small island community. One student is confused because both places have schools, transportation, communication, government, and recreation—but they do not look the same." },
    { who: "ava", text: "If both communities need transportation, why wouldn’t they use the same kind?" },
    { who: "local", text: "Our solutions fit our roads, buildings, and population." },
    { who: "island", text: "We have the same needs, but water changes some of our choices." },
    { who: "compare", text: "Start with what both communities need. Then compare how each one meets it." }
  ],
  selfCheckQuestions: [
    "Did I identify a need both communities share?",
    "Did I explain how the local community meets that need?",
    "Did I explain how the other community meets the same need?",
    "Did I compare at least two community needs or services?",
    "Did I explain why the same need can have different solutions?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "need", label: "What need do both communities share?", placeholder: "Transportation? communication? recreation?" },
  { key: "local", label: "How does the local community meet it?", placeholder: "Use one clue..." },
  { key: "other", label: "How does the island community meet it?", placeholder: "Use the matching clue..." },
  { key: "why", label: "Why are the solutions different?", placeholder: "Think about place and community needs..." }
];

export const PUSH_ANGLE = "Postcard Swap: write one new postcard clue showing how the island community meets a shared need differently.";
