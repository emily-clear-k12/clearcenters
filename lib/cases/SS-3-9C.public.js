// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.9C, TEKS 3.9C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  leo: { name: "Leo Helpful-Is-Civic", emoji: "👍", color: "#F59E0B", hint: undefined },
  law: { name: "Lana Law", emoji: "📘", color: "#3B82F6", hint: undefined },
  serve: { name: "Sam Service", emoji: "🧤", color: "#22C55E", hint: undefined },
  vote: { name: "Vera Jury & Vote", emoji: "🗳️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.9C",
  title: "Is That Really Civic Responsibility?",
  bigQuestion: "Which actions are acts of civic responsibility, and why?",
  trapLine: "Any helpful action is automatically an act of civic responsibility.",
  evidenceBank: [
    "Following laws helps communities function safely and fairly.",
    "Joining a cleanup or improvement project can support the common good.",
    "Adults may serve on juries and eligible citizens may vote in elections."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class sorts action cards into 'Civic Responsibility' and 'Just Helpful.' One student puts every helpful action into the civic pile." },
    { who: "leo", text: "If an action helps someone, shouldn’t it count as civic responsibility?" },
    { who: "law", text: "Civic responsibility includes duties that help a community and its government work." },
    { who: "serve", text: "Serving or improving the community is one clear civic action." },
    { who: "vote", text: "Some civic responsibilities connect directly to laws, courts, elections, and community decisions." }
  ],
  selfCheckQuestions: [
    "Did I explain obeying laws as a civic responsibility?",
    "Did I explain community service or improvement?",
    "Did I explain jury service or voting?",
    "Did I connect the actions to community or public life?",
    "Did I explain why helpful and civic are not always the same thing?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "law", label: "How is obeying laws a civic responsibility?", placeholder: "How does it help the community?" },
  { key: "service", label: "How is community service a civic responsibility?", placeholder: "What common good does it support?" },
  { key: "juryvote", label: "How are jury service or voting connected to civic life?", placeholder: "Courts/elections..." },
  { key: "claim", label: "Why isn't every helpful action automatically civic responsibility?", placeholder: "Look for a civic/community connection..." }
];

export const PUSH_ANGLE = "Card Sort Challenge: classify four new actions and explain one tricky choice.";
