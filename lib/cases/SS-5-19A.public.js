// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.19A, TEKS 5.19A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.19A, for example).

export const CAST = {
  max: { name: "Max Maybe", emoji: "🤨", color: "#F59E0B", hint: "Assumes every unfair situation is automatically a Bill of Rights violation." },
  speech: { name: "Sasha Speech & Press", emoji: "🗣️", color: "#3B82F6", hint: "Owns speech and press protections." },
  assembly: { name: "Ari Assembly", emoji: "✊", color: "#22C55E", hint: "Owns peaceful assembly and petition." },
  trial: { name: "Tessa Trial", emoji: "⚖️", color: "#8B5CF6", hint: "Owns trial by jury and the right to an attorney." },
  rule: { name: "Riley Rights Desk", emoji: "🏛️", color: "#EF4444", hint: "Checks the actual right before calling something unconstitutional." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.19A",
  title: "Can They Actually Do That?",
  bigQuestion: "How can you decide which fundamental right in the Bill of Rights applies to a situation?",
  trapLine: "If something is unfair, the Bill of Rights should stop it. Case closed.",
  evidenceBank: [
    "A city official refuses to accept a peaceful youth petition asking for a park change.",
    "A person accused of a crime is told to face the court without an attorney.",
    "The Bill of Rights names specific freedoms and legal protections."
  ],
  coldOpenMessages: [
    { who: "system", text: "Two complaints reach the Rights Desk. Max says the answer is easy: if something is unfair, it must violate the Bill of Rights." },
    { who: "max", text: "If something is unfair, the Bill of Rights should stop it. That is what rights are for." },
    { who: "speech", text: "I can help if government is restricting peaceful speech or press, but not every disagreement is my case." },
    { who: "assembly", text: "A peaceful gathering and a petition are both protected civic actions." },
    { who: "trial", text: "If someone is accused of a crime, rights about a fair trial and an attorney matter." },
    { who: "rule", text: "Name the right, name the situation, and then decide whether the protection fits." }
  ],
  selfCheckQuestions: [
    "Did I correctly identify assembly and/or petition as relevant to Letter A?",
    "Did I correctly identify the right to an attorney as relevant to Letter B?",
    "Did I explain how the facts of each situation connect to the specific right?",
    "Did I avoid saying that every unfair situation is automatically a Bill of Rights violation?",
    "Did I describe at least two fundamental rights guaranteed in the Bill of Rights?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "situation", label: "What happened in each situation?", placeholder: "Separate the facts from opinions..." },
  { key: "right_a", label: "Which right best fits Letter A?", placeholder: "Use the Bill of Rights protection..." },
  { key: "right_b", label: "Which right best fits Letter B?", placeholder: "Use the Bill of Rights protection..." },
  { key: "evidence", label: "What evidence shows why each right applies?", placeholder: "Connect the situation to the right..." },
  { key: "claim", label: "Why is “unfair” alone not enough to identify a rights violation?", placeholder: "Explain the difference..." }
];

export const PUSH_ANGLE = "Rights Triage: write a one-sentence test for deciding which Bill of Rights protection fits a new situation.";
