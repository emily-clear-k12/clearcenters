// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.18B, TEKS 4.18B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  zoe: { name: "Zoe One-Benefit", emoji: "1️⃣", color: "#F59E0B", hint: undefined },
  ag: { name: "Ava Agriculture", emoji: "🌾", color: "#3B82F6", hint: undefined },
  energy: { name: "Eli Energy", emoji: "⚡", color: "#22C55E", hint: undefined },
  aero: { name: "Ari Aerospace", emoji: "🚀", color: "#8B5CF6", hint: undefined },
  synth: { name: "Riley Ripple Effects", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.18B",
  title: "It Changed More Than One Thing",
  bigQuestion: "How can scientific discoveries and innovations benefit individuals, businesses, and society in Texas?",
  trapLine: "A new technology usually has one main benefit—the job it was invented to do.",
  evidenceBank: [
    "New tools and methods can help farmers produce food more efficiently.",
    "Energy innovations can affect homes, businesses, jobs, and how power is produced or used.",
    "Aerospace and technology innovations can create new jobs, research, services, and products."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is making a Texas innovation chart and writes only one benefit under every invention. The class has to decide whether that is enough." },
    { who: "zoe", text: "If the invention does its main job, isn’t that the benefit? Why add more?" },
    { who: "ag", text: "A farming innovation can help one farmer and also affect food supply and businesses." },
    { who: "energy", text: "Energy innovations can affect homes, companies, jobs, and entire communities." },
    { who: "aero", text: "Aerospace work can lead to research, skilled jobs, services, and new technologies." },
    { who: "synth", text: "The best explanation follows the benefit from one person to businesses to society." }
  ],
  selfCheckQuestions: [
    "Did I explain a direct benefit of an innovation?",
    "Did I explain at least one benefit for an individual?",
    "Did I explain at least one benefit for a business?",
    "Did I explain at least one broader benefit for society?",
    "Did I explain why an innovation can create more than one effect?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "direct", label: "What is the direct benefit of one innovation?", placeholder: "Start with its main job..." },
  { key: "individual", label: "How could an individual benefit?", placeholder: "Give one person-level effect..." },
  { key: "business", label: "How could a business benefit?", placeholder: "Jobs, production, services, etc..." },
  { key: "society", label: "How could society benefit?", placeholder: "Think broader..." },
  { key: "claim", label: "Why is 'one invention, one benefit' too simple?", placeholder: "Trace the ripple effects..." }
];

export const PUSH_ANGLE = "Ripple Map: build a three-step benefit chain for agriculture, energy, aerospace, or technology.";
