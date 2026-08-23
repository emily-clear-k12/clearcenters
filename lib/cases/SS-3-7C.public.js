// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.7C, TEKS 3.7C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ben: { name: "Ben Any-Folder", emoji: "📂", color: "#F59E0B", hint: undefined },
  local: { name: "Lila Local Services", emoji: "🏞️", color: "#3B82F6", hint: undefined },
  state: { name: "Sam State Services", emoji: "🛣️", color: "#22C55E", hint: undefined },
  national: { name: "Nina National Services", emoji: "🛡️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.7C",
  title: "Whose Service Is It Anyway?",
  bigQuestion: "Which level of government commonly provides different services?",
  trapLine: "If a service helps people, any level of government could be responsible for it.",
  evidenceBank: [
    "Trash pickup and local parks are commonly handled by local government.",
    "State highways and statewide programs are commonly handled at the state level.",
    "National defense and services that cover the whole country are handled by the national government."
  ],
  coldOpenMessages: [
    { who: "system", text: "A community help desk has three unlabeled folders: Local, State, and National. A student wants to toss every service card into any folder because 'government is government.'" },
    { who: "ben", text: "Why does the folder matter? They’re all government services." },
    { who: "local", text: "Some services are closest to daily community life, like parks or trash pickup." },
    { who: "state", text: "Some services stretch across the whole state." },
    { who: "national", text: "Some services are for the entire country, so they belong at the national level." }
  ],
  selfCheckQuestions: [
    "Did I identify a service commonly provided by local government?",
    "Did I identify a service commonly provided by state government?",
    "Did I identify a service commonly provided by national government?",
    "Did I explain how the reach of a service can help identify the level?",
    "Did I explain why government services are not all handled by the same level?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "local", label: "What is one local government service?", placeholder: "Park? trash pickup?" },
  { key: "state", label: "What is one state government service?", placeholder: "State highway? statewide program?" },
  { key: "national", label: "What is one national government service?", placeholder: "National defense?" },
  { key: "rule", label: "How can you decide which level fits a service?", placeholder: "Think about how far the service reaches..." },
  { key: "claim", label: "Why can't every service go in any folder?", placeholder: "Use the level clues..." }
];

export const PUSH_ANGLE = "Help Desk Sort: place six new service cards into Local, State, or National folders and defend two choices.";
