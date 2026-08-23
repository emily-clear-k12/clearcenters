// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.13C, TEKS 4.13C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  zoe: { name: "Zoe Rule-List", emoji: "📚", color: "#F59E0B", hint: undefined },
  decl: { name: "Drew Declaration", emoji: "📜", color: "#3B82F6", hint: undefined },
  const: { name: "Connie Constitution", emoji: "🏛️", color: "#22C55E", hint: undefined },
  rights: { name: "Billie Rights", emoji: "🛡️", color: "#8B5CF6", hint: undefined },
  synth: { name: "Priya Purpose Board", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.13C",
  title: "Three Documents, Three Jobs",
  bigQuestion: "What is the intent, meaning, and importance of the Declaration of Independence, U.S. Constitution, and Bill of Rights?",
  trapLine: "All three founding documents are basically lists of rules for government.",
  evidenceBank: [
    "Explained why the colonies separated from Great Britain and stated important ideas about rights and government.",
    "Created the framework and powers of the national government.",
    "Added protections for individual freedoms and limits on government power."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student creates one label for all three U.S. founding documents: 'These documents tell the government what rules to follow.' The class has to improve it." },
    { who: "zoe", text: "They are all government documents, so 'rules for government' seems like a good label for all three." },
    { who: "decl", text: "My document explains separation and ideas about rights and government." },
    { who: "const", text: "My document sets up the national government." },
    { who: "rights", text: "My document protects freedoms and limits government power." },
    { who: "synth", text: "The strongest exhibit gives each document its own job." }
  ],
  selfCheckQuestions: [
    "Did I explain the intent or meaning of the Declaration of Independence?",
    "Did I explain the role of the U.S. Constitution?",
    "Did I explain the purpose of the Bill of Rights?",
    "Did I explain why each document is important?",
    "Did I show that the three documents are connected but have different jobs?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "decl", label: "What is the main job of the Declaration of Independence?", placeholder: "Separation + ideas..." },
  { key: "const", label: "What is the main job of the U.S. Constitution?", placeholder: "Government framework..." },
  { key: "rights", label: "What is the main job of the Bill of Rights?", placeholder: "Freedoms + limits..." },
  { key: "compare", label: "How are the three documents connected?", placeholder: "Explain the relationship..." },
  { key: "claim", label: "Why is one 'rule list' label too weak?", placeholder: "Use three different purposes..." }
];

export const PUSH_ANGLE = "Document Match: match six clues to the correct document and defend the matches.";
