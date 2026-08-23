// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.3A, TEKS 3.3A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  kai: { name: "Kai Same-Weather", emoji: "☀️", color: "#F59E0B", hint: undefined },
  desert: { name: "Dani Desert", emoji: "🏜️", color: "#3B82F6", hint: undefined },
  mountain: { name: "Milo Mountain", emoji: "⛰️", color: "#22C55E", hint: undefined },
  wetland: { name: "Wendy Wetland", emoji: "🌿", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.3A",
  title: "Same Planet, Very Different Place",
  bigQuestion: "How can physical environments be alike and different?",
  trapLine: "If two places have the same weather today, their physical environments are basically the same.",
  evidenceBank: [
    "Dry climate, little rainfall, rocky or sandy land, and limited water.",
    "Higher land, cooler temperatures, steep slopes, and hazards such as rockfalls or snow.",
    "Water-covered or soggy land, many water-loving plants, and hazards such as flooding."
  ],
  coldOpenMessages: [
    { who: "system", text: "A travel club packs one identical gear bag for three destinations because the forecast shows sunny weather in all three places." },
    { who: "kai", text: "It’s sunny in all three places. Why wouldn’t the environments be basically the same?" },
    { who: "desert", text: "Sunny weather does not tell you how much water a place usually has." },
    { who: "mountain", text: "Landforms and hazards can make two sunny places very different." },
    { who: "wetland", text: "Compare climate, landforms, resources, and hazards—not just today's weather." }
  ],
  selfCheckQuestions: [
    "Did I compare at least two physical environments?",
    "Did I use climate as one comparison category?",
    "Did I use landforms, natural resources, or hazards as another category?",
    "Did I explain at least one similarity or difference clearly?",
    "Did I explain why one day's weather cannot describe the whole environment?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "climate", label: "How is the climate different in two places?", placeholder: "Dry? cooler? wetter?" },
  { key: "land", label: "How are the landforms different?", placeholder: "Sand/rock? steep slopes? soggy land?" },
  { key: "resource", label: "What natural resource differs?", placeholder: "Water? plants? other resources?" },
  { key: "hazard", label: "What natural hazard could happen?", placeholder: "Flood? rockfall? snow?" },
  { key: "claim", label: "Why is today's weather not enough?", placeholder: "Use more than one category..." }
];

export const PUSH_ANGLE = "Gear Bag Fix: choose one item each destination would need and explain which environmental feature makes it useful.";
