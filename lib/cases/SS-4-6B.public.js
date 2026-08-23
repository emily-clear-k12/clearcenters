// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.6B, TEKS 4.6B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  kai: { name: "Kai Climate-Only", emoji: "🌤️", color: "#F59E0B", hint: undefined },
  mountain: { name: "Mountains & Basins File", emoji: "⛰️", color: "#8B5CF6", hint: undefined },
  plains: { name: "Great Plains File", emoji: "🌾", color: "#22C55E", hint: undefined },
  coast: { name: "Coastal Plains File", emoji: "🌊", color: "#3B82F6", hint: undefined },
  compare: { name: "Nora Region Compare", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.6B",
  title: "Which Texas Region Fits?",
  bigQuestion: "How can we compare Texas's four physical regions using more than one characteristic?",
  trapLine: "If two regions have similar weather, they are basically the same region.",
  evidenceBank: [
    "Drier climate, mountains, basins, desert vegetation, and lower population in many areas.",
    "High plains and rolling areas, grasslands, cooler winters in the north, ranching and agriculture.",
    "Lower elevation, more rainfall in many areas, forests or coastal vegetation, large cities and many industries."
  ],
  coldOpenMessages: [
    { who: "system", text: "A travel-planning team is matching activities to Texas regions. One student says climate is enough to tell the regions apart." },
    { who: "kai", text: "If two regions have similar weather, aren't they basically the same?" },
    { who: "mountain", text: "Landforms matter too. My region has mountains and basins, not just a dry climate." },
    { who: "plains", text: "Vegetation and economic activities help distinguish regions." },
    { who: "coast", text: "A region can differ in landforms, vegetation, and economic activity all at once." },
    { who: "compare", text: "A real comparison uses several characteristics, not one." }
  ],
  selfCheckQuestions: [
    "Did I compare at least two Texas physical regions?",
    "Did I use more than one type of characteristic?",
    "Did I include a landform, climate, or vegetation difference?",
    "Did I include an economic-activity difference or similarity?",
    "Did I explain why one characteristic alone cannot fully define a region?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "feature1", label: "What landform feature differs between two regions?", placeholder: "Compare landforms..." },
  { key: "feature2", label: "What climate or vegetation feature differs?", placeholder: "Use a second characteristic..." },
  { key: "econ", label: "How do economic activities differ?", placeholder: "Use region evidence..." },
  { key: "similarity", label: "What is one valid similarity?", placeholder: "Compare carefully..." },
  { key: "claim", label: "Why is climate alone not enough?", placeholder: "Use multiple characteristics..." }
];

export const PUSH_ANGLE = "Travel Match: choose the best region for a fictional activity and defend the choice with three characteristics.";
