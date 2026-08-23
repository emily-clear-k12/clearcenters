// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.15C, TEKS 5.15C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.15C, for example).

export const CAST = {
  max: { name: "Max Mayor", emoji: "🏙️", color: "#F59E0B", hint: "Assumes every public problem belongs to the national government." },
  state: { name: "Sasha State", emoji: "⭐", color: "#3B82F6", hint: "Owns state-level responsibilities." },
  national: { name: "Nico National", emoji: "🇺🇸", color: "#8B5CF6", hint: "Owns national responsibilities." },
  shared: { name: "Shay Shared", emoji: "🤝", color: "#22C55E", hint: "Owns overlapping/shared responsibilities." },
  reporter: { name: "Riley Reporter", emoji: "🎤", color: "#0D9488", hint: "Needs a “whose job?” explainer." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.15C",
  title: "Whose Job Is This Anyway?",
  bigQuestion: "How does federalism divide responsibilities between national and state governments, and how can we decide which level should handle a problem?",
  trapLine: "If a problem is important, it must be the national government’s job.",
  evidenceBank: [
    "The national government handles national defense, currency, and relations with other countries.",
    "State governments manage many state laws and services such as public education and state transportation systems.",
    "Some responsibilities, such as taxation and public safety, can involve more than one level."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student newsroom created a “Whose Job?” board, but Max has placed every important problem under NATIONAL GOVERNMENT. The team must repair the board." },
    { who: "max", text: "If a problem is important, it must be the national government’s job." },
    { who: "state", text: "States make many decisions about schools, roads, licenses, and state laws." },
    { who: "national", text: "National defense and relations with other countries cannot be handled by one state." },
    { who: "shared", text: "Some issues involve both levels, which is exactly why the labels matter." },
    { who: "reporter", text: "Give me one state example, one national example, and one reason the division matters." }
  ],
  selfCheckQuestions: [
    "Did I distinguish a state responsibility from a national responsibility?",
    "Did I give at least one accurate example of each level?",
    "Did I explain that federalism divides power between national and state governments?",
    "Did I recognize that some responsibilities can overlap?",
    "Did I avoid saying that every important issue belongs to the national government?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Max assume?", placeholder: "State his rule..." },
  { key: "state", label: "What is a state responsibility?", placeholder: "Use evidence..." },
  { key: "national", label: "What is a national responsibility?", placeholder: "Use evidence..." },
  { key: "shared", label: "What can be shared or overlapping?", placeholder: "Explain the nuance..." },
  { key: "rule", label: "What is a better rule for deciding whose job it is?", placeholder: "Use level and responsibility..." }
];

export const PUSH_ANGLE = "Whose Job Sort: classify six government tasks as mostly state, mostly national, or shared, and justify two of them.";
