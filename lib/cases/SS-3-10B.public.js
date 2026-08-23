// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.10B, TEKS 3.10B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jay: { name: "Jay Basically-Same", emoji: "📦", color: "#F59E0B", hint: undefined },
  local: { name: "Lina Local Box", emoji: "🎺", color: "#3B82F6", hint: undefined },
  other: { name: "Omar Other Box", emoji: "🕯️", color: "#22C55E", hint: undefined },
  compare: { name: "Cami Compare Box", emoji: "🔎", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.10B",
  title: "Same Celebration? Not Quite.",
  bigQuestion: "How can celebrations in different communities be similar and different?",
  trapLine: "If two celebrations both have music and food, they are basically the same celebration.",
  evidenceBank: [
    "Includes a community parade, family recipes, and music connected to local traditions.",
    "Includes a candle-lighting ceremony, special foods, and stories connected to that community's traditions.",
    "Both celebrations bring people together and include food and music."
  ],
  coldOpenMessages: [
    { who: "system", text: "Two pen-pal classes exchange celebration boxes. Both boxes have music and food, so one student says the celebrations are basically the same." },
    { who: "jay", text: "They both have food and music. That sounds like the same kind of celebration to me." },
    { who: "local", text: "Our celebration has traditions and activities that are special to our community." },
    { who: "other", text: "Our celebration also brings people together, but some traditions and meanings are different." },
    { who: "compare", text: "Good comparisons look for both what is shared and what is unique." }
  ],
  selfCheckQuestions: [
    "Did I identify at least one similarity?",
    "Did I describe something unique about the local celebration?",
    "Did I describe something unique about the other celebration?",
    "Did I compare the celebrations instead of listing them separately?",
    "Did I explain why sharing food or music does not make two celebrations identical?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "same", label: "What is one similarity?", placeholder: "What do both celebrations include or do?" },
  { key: "local", label: "What is special about the local celebration?", placeholder: "Use one unique clue..." },
  { key: "other", label: "What is special about the other celebration?", placeholder: "Use one unique clue..." },
  { key: "claim", label: "Why are the celebrations not 'basically the same'?", placeholder: "Shared feature + meaningful difference..." }
];

export const PUSH_ANGLE = "Box Swap: add one new object to each celebration box and explain what it shows.";
