// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.9A, TEKS 3.9A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Nice-Is-Enough", emoji: "🙂", color: "#F59E0B", hint: undefined },
  respons: { name: "Riley Responsibility", emoji: "✅", color: "#3B82F6", hint: undefined },
  fair: { name: "Faith Fairness", emoji: "⚖️", color: "#22C55E", hint: undefined },
  issue: { name: "Ian Informed", emoji: "📰", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.9A",
  title: "Good Citizen or Just Being Nice?",
  bigQuestion: "What makes an action show good citizenship?",
  trapLine: "Good citizenship mostly means being nice and following directions.",
  evidenceBank: [
    "A student completes a community job and takes responsibility when a mistake happens.",
    "A group notices one student is being treated unfairly and asks for a fair solution.",
    "A family learns about a local issue and respectfully asks an official a question."
  ],
  coldOpenMessages: [
    { who: "system", text: "A school creates a 'Good Citizen' wall. One student wants to add every kind or helpful action, even when it has nothing to do with responsibility, fairness, issues, or civic life." },
    { who: "mia", text: "If someone is nice, that should count as good citizenship, right?" },
    { who: "respons", text: "Good citizenship includes doing your part and being truthful when something goes wrong." },
    { who: "fair", text: "Citizenship also includes treating people fairly and respectfully." },
    { who: "issue", text: "Good citizens learn about issues and can respectfully hold officials accountable." }
  ],
  selfCheckQuestions: [
    "Did I explain responsibility or truthfulness?",
    "Did I explain justice, equality, or respect?",
    "Did I explain why learning about issues matters?",
    "Did I use at least two characteristics of good citizenship?",
    "Did I explain why being nice alone is not the full idea?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "respons", label: "What does responsibility or truthfulness look like?", placeholder: "Use the first clue..." },
  { key: "fair", label: "What do justice, equality, and respect look like?", placeholder: "Use the fairness clue..." },
  { key: "issue", label: "How can learning about issues show citizenship?", placeholder: "Think about civic life..." },
  { key: "claim", label: "Why is 'being nice' only part of good citizenship?", placeholder: "Use more than kindness..." }
];

export const PUSH_ANGLE = "Wall Audit: approve or reject four new actions and defend one decision with evidence.";
