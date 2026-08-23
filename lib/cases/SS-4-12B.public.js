// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.12B, TEKS 4.12B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  nora: { name: "Nora Flag-Only", emoji: "🚩", color: "#F59E0B", hint: undefined },
  spanish: { name: "Sofia Spanish Rule", emoji: "👑", color: "#3B82F6", hint: undefined },
  mexico: { name: "Mateo Mexican Government", emoji: "🏛️", color: "#22C55E", hint: undefined },
  same: { name: "Sam Similarities", emoji: "📚", color: "#8B5CF6", hint: undefined },
  compare: { name: "Carla Compare Board", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.12B",
  title: "Same Texas, Different Governments",
  bigQuestion: "How were Spanish colonial government and early Mexican government in Texas similar and different?",
  trapLine: "When Mexico became independent from Spain, government in Texas stayed basically the same.",
  evidenceBank: [
    "Texas was governed as part of the Spanish Empire under authority ultimately connected to the Spanish crown.",
    "After Mexican independence, Texas became part of Mexico and operated under Mexican political systems.",
    "Both systems had officials and laws, but authority and political structure were not identical."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says the change from Spanish rule to Mexican rule mostly changed the flag, not the government." },
    { who: "nora", text: "If people still had laws and officials, maybe the government was basically the same." },
    { who: "spanish", text: "Spanish Texas was part of a monarchy and colonial system tied to the crown." },
    { who: "mexico", text: "Independent Mexico used its own political system, not Spain’s colonial monarchy." },
    { who: "same", text: "There were still laws and officials in both systems, so there are similarities too." },
    { who: "compare", text: "The question is what stayed similar and what changed in who held authority." }
  ],
  selfCheckQuestions: [
    "Did I describe a characteristic of Spanish colonial government?",
    "Did I describe a characteristic of early Mexican government?",
    "Did I identify at least one valid similarity?",
    "Did I explain a difference in political authority or structure?",
    "Did I explain why Mexican independence changed more than the flag?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "spanish", label: "What was a key feature of Spanish colonial government?", placeholder: "Use crown/colonial evidence..." },
  { key: "mexico", label: "What changed under early Mexican government?", placeholder: "Use independence/political-system evidence..." },
  { key: "same", label: "What was one similarity?", placeholder: "Think laws/officials/authority..." },
  { key: "diff", label: "What was one important difference?", placeholder: "Who held authority?" },
  { key: "claim", label: "Why is 'only the flag changed' inaccurate?", placeholder: "Use authority evidence..." }
];

export const PUSH_ANGLE = "Flag Change or Government Change?: sort clues into symbolic change, government change, or both.";
