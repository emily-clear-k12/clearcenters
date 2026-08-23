// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.4B, TEKS 5.4B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.4B, for example).

export const CAST = {
  oliver: { name: "Oliver Grant", emoji: "📰", color: "#F59E0B", hint: "Thinks connection means sameness." },
  clara: { name: "Clara Webb", emoji: "🧶", color: "#3B82F6", hint: "Sees factory work changing her region." },
  elijah: { name: "Elijah Carter", emoji: "🌾", color: "#22C55E", hint: "Knows what much of the southern economy depended on." },
  miriam: { name: "Miriam Hale", emoji: "🚂", color: "#8B5CF6", hint: "Sees how trade connects different economies." },
  daniel: { name: "Daniel Price", emoji: "📜", color: "#0D9488", hint: "Wants to know why economic differences matter politically." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.4B",
  title: "Same Country, Different Future",
  bigQuestion: "Did the Industrial Revolution make U.S. regions more alike, or did different patterns of economic growth help deepen sectional differences?",
  trapLine: "Industrialization is making every region more alike, so regional economic differences are disappearing.",
  evidenceBank: [
    "Factory production expanded in some regions",
    "Agriculture remained especially important in other regions",
    "Transportation and trade connected the regions"
  ],
  coldOpenMessages: [
    { who: "system", text: "Washington City, 1840s. Daniel Price has collected letters about new factories, railroads, farms, and trade from across the United States. A newspaper correspondent wants to explain what the Industrial Revolution is doing to the country." },
    { who: "oliver", text: "I have my headline: MACHINES MAKE AMERICA ONE." },
    { who: "daniel", text: "That sounds impressive. What does it mean?" },
    { who: "oliver", text: "Factories grow, railroads connect places, goods move everywhere. The regions are becoming more alike." },
    { who: "clara", text: "More alike? Most people around me are talking about mills, machines, and factory work." },
    { who: "elijah", text: "That's not what dominates the economy where I live." },
    { who: "miriam", text: "But Clara's cloth and southern crops can still move through the same trade networks." },
    { who: "oliver", text: "Exactly! Connected. Same economy." },
    { who: "daniel", text: "Connected and the same aren't necessarily identical ideas." },
    { who: "oliver", text: "Then show me the difference." }
  ],
  selfCheckQuestions: [
    "Did I describe an important difference between regional economies?",
    "Did I use evidence from more than one regional perspective?",
    "Did I explain how transportation or trade still connected the regions?",
    "Did I explain how different economic interests could increase sectional conflict?",
    "Did I avoid claiming that being connected meant the regions were becoming economically the same?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Oliver believe industrialization is doing to the regions?", placeholder: "State Oliver's claim in your own words..." },
  { key: "compare", label: "How is the economy Clara describes different from Elijah's?", placeholder: "Compare the regional evidence..." },
  { key: "connection", label: "What evidence shows the regions were still connected?", placeholder: "Record evidence about trade or transportation..." },
  { key: "interests", label: "What different interests could grow from those regional economies?", placeholder: "Explain how different economic patterns could lead to different priorities..." },
  { key: "judgment", label: "Does being more connected mean the regions were becoming more alike? Explain.", placeholder: "Use evidence from more than one perspective..." }
];

export const PUSH_ANGLE = "Connected ≠ Same: compare two statements — 'The regions were becoming more connected' and 'The regions were becoming more economically alike.' Decide which the evidence supports, whether both can be true, and rewrite the weaker statement.";
