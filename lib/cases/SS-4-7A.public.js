// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.7A, TEKS 4.7A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  luke: { name: "Luke Open-Land", emoji: "🏞️", color: "#F59E0B", hint: undefined },
  water: { name: "Willa Water File", emoji: "💧", color: "#3B82F6", hint: undefined },
  climate: { name: "Cal Climate File", emoji: "🌤️", color: "#22C55E", hint: undefined },
  landform: { name: "Lena Landform File", emoji: "⛰️", color: "#8B5CF6", hint: undefined },
  map: { name: "Mara Settlement Map", emoji: "🗺️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.7A",
  title: "Why Did People Settle Here?",
  bigQuestion: "How have landforms and climate influenced where people settled in Texas?",
  trapLine: "People mostly settled wherever there was open land.",
  evidenceBank: [
    "People often needed reliable water and usable land for homes, farming, or ranching.",
    "Very dry or very harsh climates could make settlement more difficult.",
    "Rivers, trails, roads, and later railroads could make some places easier to reach and supply."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is explaining Texas settlement patterns and says, 'People settled wherever there was enough empty space.' The group has to test whether geography mattered more than that." },
    { who: "luke", text: "If land was open, why wouldn’t people just settle there?" },
    { who: "water", text: "Settlements need more than space. Water can determine whether a place works." },
    { who: "climate", text: "A place can have lots of land and still be difficult to live in." },
    { who: "landform", text: "Flat land, rivers, mountains, and other landforms affect travel and settlement." },
    { who: "map", text: "If geography matters, population should not be spread evenly across the state." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two geographic factors that influenced settlement?",
    "Did I include landforms, climate, water, or access as evidence?",
    "Did I explain how geography could affect where more or fewer people lived?",
    "Did I connect the factor to settlement instead of only naming it?",
    "Did I explain why open land alone does not explain settlement patterns?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Luke claiming?", placeholder: "State the open-land idea..." },
  { key: "factor1", label: "What geographic factor helped settlement?", placeholder: "Use one clue..." },
  { key: "factor2", label: "What other factor mattered?", placeholder: "Use a different clue..." },
  { key: "effect", label: "How would those factors affect population?", placeholder: "Explain where more/fewer people might live..." },
  { key: "conclusion", label: "Why is open land alone not enough?", placeholder: "Connect geography to settlement..." }
];

export const PUSH_ANGLE = "Settlement Decision: choose between two fictional sites and defend the better location using two geographic factors.";
