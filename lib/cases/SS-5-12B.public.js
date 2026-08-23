// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.12B, TEKS 5.12B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.12B, for example).

export const CAST = {
  cal: { name: "Cal Turner", emoji: "💵", color: "#F59E0B", hint: "Sees land price but ignores location factors." },
  sasha: { name: "Sasha Nguyen", emoji: "🚚", color: "#3B82F6", hint: "Tracks transportation access." },
  omar: { name: "Omar Reyes", emoji: "💧", color: "#22C55E", hint: "Checks physical geography and site conditions." },
  jules: { name: "Jules Carter", emoji: "🏙️", color: "#8B5CF6", hint: "Tracks people, workers, and markets." },
  msrivera: { name: "Ms. Rivera", emoji: "📋", color: "#0D9488", hint: "Needs a defensible site recommendation." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.12B",
  title: "Where Should We Build It?",
  bigQuestion: "How should geographic factors influence where a business or economic activity is located?",
  trapLine: "A factory should be built wherever land is cheapest. Geography does not matter much once a business has enough money.",
  evidenceBank: [
    "Site A has the cheapest land but is remote",
    "Site B is near highway, rail, farms, and workers",
    "Site C is closest to the largest city but has more flood risk"
  ],
  coldOpenMessages: [
    { who: "system", text: "A company wants to build a food-processing facility. The planning board has three possible sites and needs a recommendation." },
    { who: "cal", text: "Easy. Site A has the cheapest land. Build there and save the money." },
    { who: "sasha", text: "Site A is also far from the highway, rail line, and the farms supplying the product." },
    { who: "omar", text: "And I have questions about water, terrain, and flood risk at every site." },
    { who: "jules", text: "I also need to know where the workers and customers are." },
    { who: "cal", text: "Money can solve most of that later." },
    { who: "msrivera", text: "Then prove it. The board needs a site recommendation that accounts for geography before we spend anything." }
  ],
  selfCheckQuestions: [
    "Did I explain how transportation or access to raw materials affects the location decision?",
    "Did I explain at least one physical geographic factor, such as water, terrain, or flood risk?",
    "Did I explain how workers, population, or customer markets affect the location?",
    "Did I weigh a tradeoff instead of choosing a site for only one reason?",
    "Did I make a clear site recommendation supported by multiple geographic factors?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Cal think should decide the location?", placeholder: "Record Cal’s rule..." },
  { key: "transport", label: "What transportation or raw-material factors matter?", placeholder: "Record evidence from Sasha..." },
  { key: "physical", label: "What physical geographic factors matter?", placeholder: "Think about water, terrain, and flood risk..." },
  { key: "people", label: "What population, workforce, or market factors matter?", placeholder: "Record evidence from Jules..." },
  { key: "decision", label: "Which site is best supported, and why?", placeholder: "Use multiple factors, not just one..." }
];

export const PUSH_ANGLE = "Board Memo: write a two-sentence recommendation naming the selected site and the two strongest reasons, followed by one tradeoff the board should still consider.";
