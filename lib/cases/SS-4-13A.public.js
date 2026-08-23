// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.13A, TEKS 4.13A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Same-Job", emoji: "📄", color: "#F59E0B", hint: undefined },
  decl: { name: "Dylan Declaration", emoji: "📜", color: "#3B82F6", hint: undefined },
  const: { name: "Cora Constitution", emoji: "🏛️", color: "#22C55E", hint: undefined },
  purpose: { name: "Priya Purpose", emoji: "🎯", color: "#8B5CF6", hint: undefined },
  synth: { name: "Theo Document Desk", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.13A",
  title: "Why Do We Need Both Documents?",
  bigQuestion: "Why were the Texas Declaration of Independence and the Texas Constitution both important?",
  trapLine: "Both documents did basically the same job because they were both about Texas government.",
  evidenceBank: [
    "The Texas Declaration of Independence explained why Texas was separating from Mexico.",
    "The Texas Constitution established rules and a structure for government.",
    "One document explains separation; the other organizes government."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student wants to combine the Texas Declaration of Independence and the Texas Constitution into one exhibit because they 'say the same kind of thing.'" },
    { who: "mia", text: "They are both government documents, so don’t they basically do the same job?" },
    { who: "decl", text: "My document explains why Texas chose independence." },
    { who: "const", text: "My document organizes how government works." },
    { who: "purpose", text: "Ask what job each document does before asking why it matters." },
    { who: "synth", text: "Two important documents can support the same government story while doing different jobs." }
  ],
  selfCheckQuestions: [
    "Did I explain the purpose of the Texas Declaration of Independence?",
    "Did I explain the purpose of the Texas Constitution?",
    "Did I explain why each document was important?",
    "Did I compare the two documents instead of describing only one?",
    "Did I explain why the documents were connected but did not do the same job?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "decl", label: "What was the purpose of the Texas Declaration?", placeholder: "Explain the separation job..." },
  { key: "const", label: "What was the purpose of the Texas Constitution?", placeholder: "Explain the government-structure job..." },
  { key: "importance", label: "Why was each document important?", placeholder: "Connect purpose to importance..." },
  { key: "compare", label: "How are the two documents connected but different?", placeholder: "Use both..." },
  { key: "claim", label: "Why is 'same job' inaccurate?", placeholder: "Explain the different purposes..." }
];

export const PUSH_ANGLE = "Exhibit Split: write one caption for the Declaration and one for the Constitution so visitors cannot confuse their purposes.";
