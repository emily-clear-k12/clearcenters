// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.22B, TEKS 5.22B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.22B, for example).

export const CAST = {
  ray: { name: "Ray Railfan", emoji: "🚂", color: "#F59E0B", hint: "Thinks the railroad only changed transportation." },
  market: { name: "Mara Market", emoji: "📦", color: "#3B82F6", hint: "Owns access to distant markets." },
  town: { name: "Toby Town Map", emoji: "🏘️", color: "#22C55E", hint: "Owns towns, jobs, and services along routes." },
  industry: { name: "Ivy Industry", emoji: "🏭", color: "#8B5CF6", hint: "Owns linked industries and inputs." },
  space: { name: "Sam Space Program", emoji: "🚀", color: "#0D9488", hint: "Connects the same innovation→economic development pattern to the space program." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.22B",
  title: "The Railroad Was Just Transportation",
  bigQuestion: "How can a technological innovation such as the Transcontinental Railroad advance economic development beyond its most obvious use?",
  trapLine: "The railroad was transportation. It moved people faster. That is basically the whole economic story.",
  evidenceBank: [
    "The Transcontinental Railroad connected distant regions and reduced travel time.",
    "Farm and factory goods could reach more distant buyers.",
    "Railroad construction and operation required workers, materials, equipment, and services."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum caption says, 'The Transcontinental Railroad improved transportation by moving people faster.' Ray says that is enough to explain its economic importance." },
    { who: "ray", text: "The railroad was transportation. It moved people faster. That is the main economic effect." },
    { who: "market", text: "When goods can reach faraway buyers, the market for a producer can get much larger." },
    { who: "town", text: "A rail stop can pull in warehouses, shops, workers, and new services." },
    { who: "industry", text: "Building and running a railroad also creates demand for materials, equipment, and workers." },
    { who: "space", text: "The space program also supported specialized jobs, research, technology, and new industries—not only rockets." }
  ],
  selfCheckQuestions: [
    "Did I explain the direct transportation effect of the Transcontinental Railroad?",
    "Did I explain how the railroad connected producers, goods, and larger markets?",
    "Did I describe at least one effect on towns, jobs, businesses, or related industries?",
    "Did I explain why the railroad’s economic impact went beyond moving passengers?",
    "Did I connect the broader pattern of technological innovation and economic development to the space program?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Ray think the railroad changed?", placeholder: "State the narrow claim..." },
  { key: "transport", label: "What transportation change did the railroad create?", placeholder: "Start with the direct effect..." },
  { key: "markets", label: "How did that change affect markets, towns, or businesses?", placeholder: "Trace the next effect..." },
  { key: "industry", label: "What other industries or jobs were connected to the railroad?", placeholder: "Show a broader economic effect..." },
  { key: "pattern", label: "What similar innovation→economic-development pattern appears in the space program?", placeholder: "Compare the pattern..." }
];

export const PUSH_ANGLE = "Impact Chain: write a four-link chain from railroad technology → transportation change → economic activity → broader development.";
