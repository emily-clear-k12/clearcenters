// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.1B, TEKS 4.1B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ava: { name: "Ava One-Display", emoji: "🧩", color: "#F59E0B", hint: undefined },
  caddo: { name: "Caddo Village File", emoji: "🌾", color: "#22C55E", hint: undefined },
  karankawa: { name: "Karankawa Coast File", emoji: "🌊", color: "#3B82F6", hint: undefined },
  lipan: { name: "Lipan Apache Trail File", emoji: "🐎", color: "#8B5CF6", hint: undefined },
  compare: { name: "Casey Compare", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.1B",
  title: "Same State, Different Ways of Life",
  bigQuestion: "How were the ways of life of American Indian groups in Texas similar and different before European exploration?",
  trapLine: "They all lived in Texas, so their ways of life were probably mostly the same.",
  evidenceBank: [
    "Caddo communities farmed crops and lived in permanent villages in East Texas.",
    "Karankawa groups lived along the Gulf Coast and relied heavily on coastal resources.",
    "Lipan Apache groups moved across parts of Texas and hunted game, including buffalo."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum team is building one display about American Indian life in Texas before European exploration. One student wants to use the same house, food, and daily-life description for every group." },
    { who: "ava", text: "If they all lived in Texas, can’t we just use one basic description for everybody?" },
    { who: "caddo", text: "My evidence includes farming and permanent villages in East Texas." },
    { who: "karankawa", text: "Living near the Gulf changed which resources were available." },
    { who: "lipan", text: "Some groups moved more often because hunting was important to their way of life." },
    { who: "compare", text: "A fair comparison needs both similarities and differences." }
  ],
  selfCheckQuestions: [
    "Did I include at least one similarity among the groups?",
    "Did I explain at least two differences in ways of life?",
    "Did I use evidence from more than one American Indian group?",
    "Did I avoid saying that all American Indian groups in Texas lived the same way?",
    "Did I explain why different groups met their needs in different ways?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Ava claiming?", placeholder: "State the one-display claim..." },
  { key: "same", label: "What is one similarity among the groups?", placeholder: "Use evidence..." },
  { key: "different1", label: "What is one important difference?", placeholder: "Compare two groups..." },
  { key: "different2", label: "What is another important difference?", placeholder: "Use a different clue..." },
  { key: "conclusion", label: "Why does one description not fit every group?", placeholder: "Explain the evidence..." }
];

export const PUSH_ANGLE = "Museum Fix: rewrite the exhibit label so it compares groups instead of treating them as one culture.";
