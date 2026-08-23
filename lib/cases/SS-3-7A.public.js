// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.7A, TEKS 3.7A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia One-Building", emoji: "🏛️", color: "#F59E0B", hint: undefined },
  local: { name: "Leo Local", emoji: "🏙️", color: "#3B82F6", hint: undefined },
  state: { name: "Sasha State", emoji: "⭐", color: "#22C55E", hint: undefined },
  national: { name: "Nico National", emoji: "🇺🇸", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.7A",
  title: "Three Governments, Three Jobs?",
  bigQuestion: "How are local, state, and national governments organized at different levels?",
  trapLine: "Local, state, and national government are basically the same government with different names.",
  evidenceBank: [
    "Local government serves a city, town, county, or nearby community.",
    "State government serves the entire state.",
    "National government serves the entire country."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student draws one giant government building and labels three doors Local, State, and National. The class has to decide whether that picture really shows the structure." },
    { who: "mia", text: "Couldn’t all three levels just be one government with different doors?" },
    { who: "local", text: "Local government focuses on a nearby city, town, county, or community." },
    { who: "state", text: "State government works across the whole state." },
    { who: "national", text: "National government works across the whole country." }
  ],
  selfCheckQuestions: [
    "Did I describe the local level?",
    "Did I describe the state level?",
    "Did I describe the national level?",
    "Did I compare the size or area each level serves?",
    "Did I explain why the three levels are not simply different names for one government?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "local", label: "What area does local government serve?", placeholder: "City/town/county..." },
  { key: "state", label: "What area does state government serve?", placeholder: "The whole state..." },
  { key: "national", label: "What area does national government serve?", placeholder: "The whole country..." },
  { key: "compare", label: "What is the main difference among the three levels?", placeholder: "Compare their scale..." },
  { key: "claim", label: "Why are they not just three names for one government?", placeholder: "Use the area-served clues..." }
];

export const PUSH_ANGLE = "Diagram Repair: redraw the one-building picture as three connected levels and label the area each one serves.";
