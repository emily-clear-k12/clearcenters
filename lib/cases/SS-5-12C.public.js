// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.12C, TEKS 5.12C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.12C, for example).

export const CAST = {
  miles: { name: "Miles Carter", emoji: "📰", color: "#F59E0B", hint: "Sees population growth but misses economic connections." },
  ana: { name: "Ana Morales", emoji: "🧵", color: "#3B82F6", hint: "Knows how newcomers add workers and skills." },
  isaiah: { name: "Isaiah Green", emoji: "🚂", color: "#22C55E", hint: "Explains migration within the United States." },
  mei: { name: "Mei Chen", emoji: "🏪", color: "#8B5CF6", hint: "Tracks businesses and consumer demand." },
  editor: { name: "Ms. Brooks", emoji: "📋", color: "#0D9488", hint: "Needs the full economic story." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.12C",
  title: "The City That Kept Growing",
  bigQuestion: "How can immigration and migration contribute to U.S. economic development and growth?",
  trapLine: "Immigration and migration mainly make places more crowded; they do not do much to help an economy grow.",
  evidenceBank: [
    "The city gained many new residents",
    "Factories and construction crews hired more workers",
    "New stores and services opened in growing neighborhoods"
  ],
  coldOpenMessages: [
    { who: "system", text: "A city newspaper is preparing a special report on rapid population and economic growth." },
    { who: "miles", text: "My headline is simple: MORE PEOPLE, MORE CROWDING." },
    { who: "ana", text: "Some of those people are also filling jobs that businesses need." },
    { who: "isaiah", text: "And some moved here from other parts of the country because work was available." },
    { who: "mei", text: "My neighborhood gained customers, workers, and new businesses at the same time." },
    { who: "miles", text: "That still sounds like population change, not economic growth." },
    { who: "editor", text: "Then the story needs us to connect the movement of people to what happened in the economy." }
  ],
  selfCheckQuestions: [
    "Did I explain how immigration or migration can add workers, skills, or labor to an economy?",
    "Did I explain how a growing population can increase demand for goods and services?",
    "Did I explain how newcomers can start businesses or support business growth?",
    "Did I connect at least two of these effects to economic development or growth?",
    "Did I avoid claiming that immigration or migration has only one effect or that every newcomer has the same experience?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Miles think immigration and migration mainly cause?", placeholder: "Record Miles’s claim..." },
  { key: "labor", label: "How can newcomers affect workers, skills, and production?", placeholder: "Record evidence from Ana or Isaiah..." },
  { key: "business", label: "How can newcomers affect businesses and consumer demand?", placeholder: "Record evidence from Mei..." },
  { key: "growth", label: "How do those changes connect to economic growth?", placeholder: "Explain the cause-and-effect links..." },
  { key: "balance", label: "What challenge or limitation should a strong explanation still acknowledge?", placeholder: "Keep the conclusion balanced..." }
];

export const PUSH_ANGLE = "Headline Repair: replace MORE PEOPLE, MORE CROWDING with a headline that captures at least two economic effects of immigration and migration, then justify it in two sentences.";
