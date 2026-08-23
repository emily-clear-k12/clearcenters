// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.8A, TEKS 5.8A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.8A, for example).

export const CAST = {
  tessa: { name: "Tessa Monroe", emoji: "🗂️", color: "#F59E0B", hint: "Keeps putting every solution in the same category." },
  omar: { name: "Omar Ruiz", emoji: "🧢", color: "#3B82F6", hint: "Looks for ways people adjust to conditions." },
  lena: { name: "Lena Cho", emoji: "💧", color: "#22C55E", hint: "Tracks changes people make to land and water." },
  ben: { name: "Ben Alvarez", emoji: "🏠", color: "#8B5CF6", hint: "Tests whether students can classify a tricky solution." },
  drake: { name: "Dr. Naomi Drake", emoji: "🧭", color: "#0D9488", hint: "Needs a design plan that uses the terms correctly." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.8A",
  title: "Adapt or Change It?",
  bigQuestion: "When people face an environmental challenge, how do they decide whether to adapt themselves or modify the environment to meet basic needs?",
  trapLine: "Adapting to the environment and modifying the environment are basically the same thing — either way, people are just dealing with nature.",
  evidenceBank: [
    "Wearing lightweight clothing changes how people respond to heat",
    "Building shade structures changes the surroundings",
    "Irrigation moves water to places where people need it"
  ],
  coldOpenMessages: [
    { who: "system", text: "A desert community design lab is sorting possible solutions for heat and limited rainfall." },
    { who: "drake", text: "We need each proposal labeled as adaptation or environmental modification." },
    { who: "tessa", text: "That seems pointless. They all help people deal with the environment, so they are all adaptations." },
    { who: "omar", text: "If I change when I work outside or what I wear, did I physically change the desert?" },
    { who: "lena", text: "If I dig an irrigation channel and redirect water, did only my behavior change?" },
    { who: "ben", text: "And what about building shade structures? That one may need careful reasoning." },
    { who: "tessa", text: "Fine. Show me a rule that actually separates the two." }
  ],
  selfCheckQuestions: [
    "Did I clearly distinguish adapting to the environment from modifying it?",
    "Did I correctly explain at least one human adaptation?",
    "Did I correctly explain at least one environmental modification?",
    "Did I connect the responses to basic human needs such as water, shelter, food, or safety?",
    "Did I explain why people might choose different responses depending on the environmental challenge?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Tessa think adaptation and modification have in common?", placeholder: "State her claim..." },
  { key: "adapt", label: "Which examples are adaptations, and why?", placeholder: "What changes about people or how they live?" },
  { key: "modify", label: "Which examples modify the environment, and why?", placeholder: "What physical surroundings are changed?" },
  { key: "needs", label: "What basic need does each response help meet?", placeholder: "Water, shelter, safety, food, or another need..." },
  { key: "rule", label: "What rule separates adaptation from modification?", placeholder: "Write a distinction that works across the examples..." }
];

export const PUSH_ANGLE = "Sort the Surprise: classify three new responses — raised homes in flood zones, planting windbreaks, and changing work hours during extreme heat — and justify each classification.";
