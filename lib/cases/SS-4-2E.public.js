// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.2E, TEKS 4.2E).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  leo: { name: "Leo Free-Land", emoji: "🪙", color: "#F59E0B", hint: undefined },
  austin: { name: "Austin Contract File", emoji: "📜", color: "#3B82F6", hint: undefined },
  deleon: { name: "De León Colony File", emoji: "🏘️", color: "#22C55E", hint: undefined },
  econ: { name: "Eva Economics", emoji: "💰", color: "#8B5CF6", hint: undefined },
  synth: { name: "Nina Contract Judge", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.2E",
  title: "The Empresario Deal",
  bigQuestion: "How did empresarios help settle Texas, and what economic motivations shaped their work?",
  trapLine: "Empresarios were just settlers who moved to Texas for free land.",
  evidenceBank: [
    "Austin brought many families to settle in Texas under an empresario contract.",
    "De León founded a colony and helped bring Mexican families to settle in Texas.",
    "Empresarios expected economic opportunities from successful settlement and land development."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is labeling an empresario exhibit and writes, 'Empresarios were settlers who came to Texas for free land.' The museum team has to decide whether that is accurate." },
    { who: "leo", text: "So empresarios were basically just settlers getting land, right?" },
    { who: "austin", text: "Austin’s job involved organizing settlement, not just moving himself." },
    { who: "deleon", text: "De León’s work shows empresarios could organize whole communities." },
    { who: "econ", text: "There was an economic reason to make a colony succeed." },
    { who: "synth", text: "Ask three questions: What did they do? Why did they do it? What changed because of it?" }
  ],
  selfCheckQuestions: [
    "Did I explain what an empresario did?",
    "Did I include evidence about Stephen F. Austin or Martín de León?",
    "Did I explain an economic motivation connected to settlement?",
    "Did I explain how empresarios affected the growth of Texas settlements?",
    "Did I avoid describing empresarios as simply ordinary settlers getting free land?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Leo claiming?", placeholder: "State the oversimplified idea..." },
  { key: "role", label: "What did empresarios actually do?", placeholder: "Use Austin or De León evidence..." },
  { key: "motive", label: "What economic motivation was involved?", placeholder: "Explain the opportunity..." },
  { key: "impact", label: "How did empresarios affect Texas settlement?", placeholder: "Explain what changed..." },
  { key: "conclusion", label: "Why is 'just settlers getting land' incomplete?", placeholder: "Connect role + motive + impact..." }
];

export const PUSH_ANGLE = "Contract Rewrite: write a stronger museum caption for 'What an empresario actually did.'";
