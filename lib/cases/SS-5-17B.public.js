// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.17B, TEKS 5.17B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.17B, for example).

export const CAST = {
  maddie: { name: "Maddie Mailer", emoji: "✉️", color: "#F59E0B", hint: "Wants to send every problem to the president." },
  local: { name: "Councilor Cruz", emoji: "🏘️", color: "#3B82F6", hint: "Owns local leader examples." },
  state: { name: "Representative Reed", emoji: "⭐", color: "#8B5CF6", hint: "Owns state contacts." },
  national: { name: "Senator Lane", emoji: "🇺🇸", color: "#22C55E", hint: "Owns national contacts." },
  navigator: { name: "Navi Torres", emoji: "🧭", color: "#0D9488", hint: "Teaches the issue→level→leader process." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.17B",
  title: "Dear... Who?",
  bigQuestion: "How can citizens decide which elected or appointed government leader to contact about a problem?",
  trapLine: "Just send every government problem to the president. He is in charge of government.",
  evidenceBank: [
    "For a city park, neighborhood street, or local service, contact a local elected leader or relevant local department.",
    "For a state law or statewide issue, contact a state legislator, governor’s office, or appropriate state agency.",
    "For a federal law or national issue, contact members of Congress or the appropriate federal office."
  ],
  coldOpenMessages: [
    { who: "system", text: "A civic-help desk received letters about a broken city park light, a state law, and a federal issue. Maddie wants to address every envelope to the president." },
    { who: "maddie", text: "Just send every government problem to the president. He is in charge of government." },
    { who: "local", text: "A city park or local street issue usually belongs closer to home." },
    { who: "state", text: "State laws and statewide concerns belong with state officials." },
    { who: "national", text: "National laws and federal issues are where members of Congress or federal officials fit." },
    { who: "navigator", text: "First identify the issue. Then the level. Then the official whose job matches it." }
  ],
  selfCheckQuestions: [
    "Did I match the issue to the correct level of government?",
    "Did I identify an appropriate local contact?",
    "Did I identify an appropriate state or national contact?",
    "Did I recognize that citizens may contact elected or appointed leaders?",
    "Did I explain a process for choosing the right official instead of sending everything to one person?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is wrong with Maddie’s “write the president” rule?", placeholder: "Explain the mismatch..." },
  { key: "local", label: "Who would you contact for a local issue? Why?", placeholder: "Issue + level + leader..." },
  { key: "state", label: "Who would you contact for a state issue? Why?", placeholder: "Issue + level + leader..." },
  { key: "national", label: "Who would you contact for a national issue? Why?", placeholder: "Issue + level + leader..." },
  { key: "process", label: "What steps help you choose the right government contact?", placeholder: "Build a 3-step rule..." }
];

export const PUSH_ANGLE = "Inbox Sort: match five civic problems to the best level and type of government contact.";
