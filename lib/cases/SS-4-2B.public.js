// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.2B, TEKS 4.2B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jax: { name: "Jax Distance Score", emoji: "📏", color: "#F59E0B", hint: undefined },
  cabeza: { name: "Cabeza de Vaca File", emoji: "🥾", color: "#22C55E", hint: undefined },
  coronado: { name: "Coronado File", emoji: "🧭", color: "#3B82F6", hint: undefined },
  lasalle: { name: "La Salle File", emoji: "⛵", color: "#8B5CF6", hint: undefined },
  judge: { name: "Priya Impact Judge", emoji: "📋", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.2B",
  title: "The Explorer Report Card",
  bigQuestion: "How should we judge an explorer’s accomplishment and impact on Texas?",
  trapLine: "The explorer who traveled the farthest must have had the biggest impact.",
  evidenceBank: [
    "His journey produced early European observations about Texas lands and peoples.",
    "His expedition crossed parts of the Southwest while searching for wealthy cities.",
    "His failed French colony on the Texas coast increased Spanish concern about French claims in the region."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum is giving three explorers a 'Texas Impact' score. One student says the farthest traveler automatically deserves the highest score." },
    { who: "jax", text: "We can save time—just rank them by how far they traveled." },
    { who: "cabeza", text: "My evidence is not about distance. It is about what was learned and recorded." },
    { who: "coronado", text: "An expedition can matter even if it does not find what it hoped to find." },
    { who: "lasalle", text: "Failure can still create an impact if it changes what other countries do." },
    { who: "judge", text: "A report card needs two columns: accomplishment and impact." }
  ],
  selfCheckQuestions: [
    "Did I correctly describe an accomplishment of Cabeza de Vaca, Coronado, and La Salle?",
    "Did I explain at least one impact instead of only listing what happened?",
    "Did I explain why a failed goal can still have an important impact?",
    "Did I avoid ranking explorers only by distance traveled?",
    "Did I use accomplishment + impact as my judging rule?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Jax using to judge the explorers?", placeholder: "State the distance rule..." },
  { key: "accomplishment", label: "What did each explorer actually do?", placeholder: "Use the case files..." },
  { key: "impact", label: "What changed because of each explorer?", placeholder: "Explain the impact..." },
  { key: "compare", label: "Which explorer had an important impact even without success?", placeholder: "Use evidence..." },
  { key: "rule", label: "What is a better way to judge impact?", placeholder: "Write a stronger rule..." }
];

export const PUSH_ANGLE = "Report Card Rewrite: give each explorer one accomplishment note and one impact note.";
