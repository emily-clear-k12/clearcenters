// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.3C, TEKS 3.3C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  leo: { name: "Leo Nature-Only", emoji: "🌧️", color: "#F59E0B", hint: undefined },
  build: { name: "Bree Builder", emoji: "🏠", color: "#3B82F6", hint: undefined },
  care: { name: "Cora Conservation", emoji: "🌱", color: "#22C55E", hint: undefined },
  pollute: { name: "Parker Pollution", emoji: "🗑️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.3C",
  title: "Who Changed the Landscape?",
  bigQuestion: "How can human actions change a landscape?",
  trapLine: "Landscapes change mostly because of natural events, not people.",
  evidenceBank: [
    "A group of homes was built where open land used to be.",
    "A stream bank was replanted with grasses to reduce erosion.",
    "Trash and runoff changed the condition of a nearby creek."
  ],
  coldOpenMessages: [
    { who: "system", text: "A photo mystery shows the same hillside ten years apart. One student says the change must have come from weather or erosion." },
    { who: "leo", text: "Maybe weather changed the whole area. People probably had less to do with it." },
    { who: "build", text: "Building homes can change what covers the land and how people use it." },
    { who: "care", text: "People can change land in ways that protect it too." },
    { who: "pollute", text: "Human actions can make a landscape healthier or more damaged." }
  ],
  selfCheckQuestions: [
    "Did I explain how building can change a landscape?",
    "Did I explain how conservation can change a landscape?",
    "Did I explain how pollution can change a landscape?",
    "Did I use at least two human actions as evidence?",
    "Did I explain why people—not only nature—can shape landscapes?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "build", label: "How did building homes change the landscape?", placeholder: "What changed on the land?" },
  { key: "care", label: "How did conservation change it?", placeholder: "What improved or was protected?" },
  { key: "pollute", label: "How did pollution change it?", placeholder: "What was harmed?" },
  { key: "claim", label: "Why are people part of the landscape story?", placeholder: "Use at least two human actions..." }
];

export const PUSH_ANGLE = "Photo Caption Fix: write a caption for one before-and-after image explaining what people changed.";
