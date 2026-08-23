// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.7B, TEKS 4.7B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  tess: { name: "Tess Accident Map", emoji: "🎲", color: "#F59E0B", hint: undefined },
  early: { name: "Eli Early-Texas File", emoji: "⛪", color: "#3B82F6", hint: undefined },
  rail: { name: "Rina Railroad File", emoji: "🚂", color: "#22C55E", hint: undefined },
  modern: { name: "Mason Modern Growth", emoji: "🛣️", color: "#8B5CF6", hint: undefined },
  timeline: { name: "Talia Timeline", emoji: "🕰️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.7B",
  title: "Why Did the Town Grow There?",
  bigQuestion: "Why did Texas towns and cities develop in different places during different historical periods?",
  trapLine: "Towns usually grew wherever someone happened to start building.",
  evidenceBank: [
    "Some early towns developed near rivers, missions, trails, or dependable water.",
    "Railroad stops helped some towns grow by improving travel, trade, and shipping.",
    "Highways, jobs, industries, and large population centers can influence growth today."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student looks at an old Texas map and says town locations were mostly accidents. The class has to test that idea across different time periods." },
    { who: "tess", text: "Maybe towns just grew wherever the first buildings went up." },
    { who: "early", text: "Early towns often had practical reasons for being where they were." },
    { who: "rail", text: "A railroad stop could turn a small place into a busier town." },
    { who: "modern", text: "Modern cities can grow because of jobs, roads, and nearby population." },
    { who: "timeline", text: "The factors can change over time, but locations usually have reasons." }
  ],
  selfCheckQuestions: [
    "Did I explain one factor that influenced early Texas settlement locations?",
    "Did I explain how railroads affected town growth?",
    "Did I explain at least one modern settlement factor?",
    "Did I compare settlement patterns across two time periods?",
    "Did I explain why town locations were not simply accidents?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "early", label: "What influenced town locations in an early period?", placeholder: "Use one early clue..." },
  { key: "rail", label: "How could railroads change settlement patterns?", placeholder: "Explain the effect..." },
  { key: "modern", label: "What factors can matter today?", placeholder: "Use jobs/roads/industry..." },
  { key: "change", label: "How did settlement factors change over time?", placeholder: "Compare two periods..." },
  { key: "claim", label: "Why is 'town locations were accidents' too simple?", placeholder: "Use evidence from more than one period..." }
];

export const PUSH_ANGLE = "Map Mystery: explain why a fictional town might grow in 1850, 1900, and today using different evidence.";
