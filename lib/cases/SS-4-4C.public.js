// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.4C, TEKS 4.4C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  maya: { name: "Maya Faster-Travel", emoji: "🚂", color: "#F59E0B", hint: undefined },
  city: { name: "Cody City Map", emoji: "🏙️", color: "#3B82F6", hint: undefined },
  goods: { name: "Gia Goods File", emoji: "📦", color: "#22C55E", hint: undefined },
  market: { name: "Marcus Market Link", emoji: "🗺️", color: "#8B5CF6", hint: undefined },
  synth: { name: "Rina Ripple Effect", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.4C",
  title: "The Railroad Changed Everything?",
  bigQuestion: "How did railroads change cities and major industries in Texas?",
  trapLine: "Railroads mainly changed travel because people could get places faster.",
  evidenceBank: [
    "Railroad stops could attract people, businesses, warehouses, and new services.",
    "Railroads helped move cattle, crops, lumber, and other goods to markets.",
    "Rail lines connected Texas towns to one another and to larger markets."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says Texas railroads were important mostly because passengers could travel faster. The class must decide what else changed." },
    { who: "maya", text: "Railroads made travel faster. Isn’t that the main change?" },
    { who: "city", text: "A rail stop can change a town even if you never buy a passenger ticket." },
    { who: "goods", text: "Freight changed what Texas industries could sell and where." },
    { who: "market", text: "A faster route matters economically when it connects goods to more buyers." },
    { who: "synth", text: "Start with transportation, then ask what changed because transportation improved." }
  ],
  selfCheckQuestions: [
    "Did I explain a direct transportation change caused by railroads?",
    "Did I explain how railroads could affect Texas cities or towns?",
    "Did I explain how railroads affected at least one major Texas industry?",
    "Did I connect railroads to larger markets?",
    "Did I explain why railroad impact went beyond faster passenger travel?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "direct", label: "What direct transportation change did railroads make?", placeholder: "Start with movement..." },
  { key: "city", label: "How could a rail stop change a city or town?", placeholder: "Use the city clue..." },
  { key: "industry", label: "How did railroads affect a major industry?", placeholder: "Use goods/market evidence..." },
  { key: "connection", label: "How did railroads connect Texas to larger markets?", placeholder: "Explain the link..." },
  { key: "claim", label: "Why is 'faster passenger travel' incomplete?", placeholder: "Use at least two ripple effects..." }
];

export const PUSH_ANGLE = "Ripple Map: choose one rail stop and predict two changes that could follow from the new connection.";
