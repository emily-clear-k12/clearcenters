// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.8B, TEKS 4.8B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  nate: { name: "Nate More-Space", emoji: "📏", color: "#F59E0B", hint: undefined },
  needs: { name: "Nia Needs File", emoji: "🏠", color: "#3B82F6", hint: undefined },
  resource: { name: "Riley Resource File", emoji: "⚡", color: "#22C55E", hint: undefined },
  trans: { name: "Theo Transportation File", emoji: "🛣️", color: "#8B5CF6", hint: undefined },
  recreation: { name: "Rae Recreation File", emoji: "🚣", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.8B",
  title: "Why Change the Land?",
  bigQuestion: "Why have Texans adapted to and modified their environment?",
  trapLine: "People change the environment mostly because they want more space.",
  evidenceBank: [
    "People modify environments to get food, water, shelter, and other basic needs.",
    "People use natural resources for farming, energy, building, and other activities.",
    "Roads, dams, trails, and parks can support transportation or recreation."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student sees photos of a dam, farmland, a highway, and a park and says they all show people changing land just to make more room." },
    { who: "nate", text: "If people clear or build on land, isn’t the reason usually just to make room?" },
    { who: "needs", text: "Some changes help people get food, water, shelter, or other needs." },
    { who: "resource", text: "People also change land to use resources such as soil, timber, or energy sources." },
    { who: "trans", text: "A modification can make travel or movement easier." },
    { who: "recreation", text: "Sometimes people modify an area for recreation too, not just survival or business." }
  ],
  selfCheckQuestions: [
    "Did I explain a modification connected to a basic need?",
    "Did I explain a reason connected to natural resources?",
    "Did I include transportation or recreation as another reason?",
    "Did I use more than one reason for environmental modification?",
    "Did I explain why 'making more space' is too simple?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Nate claiming?", placeholder: "State the 'more space' idea..." },
  { key: "need", label: "What basic need could explain one modification?", placeholder: "Use the clue..." },
  { key: "resource", label: "How can resource use explain another change?", placeholder: "Give an example..." },
  { key: "other", label: "What transportation or recreation reason appears?", placeholder: "Use a different purpose..." },
  { key: "conclusion", label: "Why do people modify environments for more than one reason?", placeholder: "Use multiple motives..." }
];

export const PUSH_ANGLE = "Purpose Match: match four Texas modifications to four different reasons and defend each match.";
