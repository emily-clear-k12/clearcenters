// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.8A, TEKS 3.8A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  nora: { name: "Nora Same-Label", emoji: "🏷️", color: "#F59E0B", hint: undefined },
  decl: { name: "Drew Declaration Label", emoji: "📜", color: "#3B82F6", hint: undefined },
  const: { name: "Cora Constitution Label", emoji: "🏛️", color: "#22C55E", hint: undefined },
  rights: { name: "Riley Rights Label", emoji: "🛡️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.8A",
  title: "The Museum Labels Got Mixed Up",
  bigQuestion: "What is the purpose of the Declaration of Independence, U.S. Constitution, and Bill of Rights?",
  trapLine: "All three documents can use the same label because they are all important government papers.",
  evidenceBank: [
    "Explains why the colonies separated from Great Britain.",
    "Sets up the plan and structure for the national government.",
    "Protects important individual freedoms and rights."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum volunteer accidentally mixes up three exhibit labels. One student says it does not matter much because all three documents are about government." },
    { who: "nora", text: "They’re all important government papers. Why do they need different labels?" },
    { who: "decl", text: "My label should explain separation from Great Britain." },
    { who: "const", text: "My label should explain how the national government is set up." },
    { who: "rights", text: "My label should explain protections for individual freedoms." }
  ],
  selfCheckQuestions: [
    "Did I explain the purpose of the Declaration of Independence?",
    "Did I explain the purpose of the U.S. Constitution?",
    "Did I explain the purpose of the Bill of Rights?",
    "Did I keep the three purposes separate?",
    "Did I explain why one label does not fit all three documents?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "decl", label: "What is the purpose of the Declaration of Independence?", placeholder: "Why did the colonies separate?" },
  { key: "const", label: "What is the purpose of the U.S. Constitution?", placeholder: "What did it set up?" },
  { key: "rights", label: "What is the purpose of the Bill of Rights?", placeholder: "What does it protect?" },
  { key: "claim", label: "Why does each museum label need to be different?", placeholder: "Compare the three purposes..." }
];

export const PUSH_ANGLE = "Label Rescue: match three new clue cards to the correct founding document.";
