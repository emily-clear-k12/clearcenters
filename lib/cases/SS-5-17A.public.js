// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.17A, TEKS 5.17A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.17A, for example).

export const CAST = {
  jay: { name: "Jay Nolan", emoji: "🙄", color: "#F59E0B", hint: "Thinks one person cannot matter in civic affairs." },
  local: { name: "Lena Local", emoji: "🏘️", color: "#3B82F6", hint: "Owns local participation examples." },
  state: { name: "Sam State", emoji: "⭐", color: "#8B5CF6", hint: "Owns state participation." },
  national: { name: "Nia National", emoji: "🇺🇸", color: "#22C55E", hint: "Owns national participation." },
  coach: { name: "Coach Civic", emoji: "📣", color: "#0D9488", hint: "Connects duty to democratic government." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.17A",
  title: "Why Bother?",
  bigQuestion: "Why do individuals have a duty to participate in civic affairs even when one person cannot control the outcome?",
  trapLine: "Why bother participating? One person cannot change anything anyway.",
  evidenceBank: [
    "Citizens can attend local meetings, volunteer, join community efforts, and contact local leaders.",
    "Citizens can communicate with state leaders and participate in state elections and civic issues.",
    "Citizens can vote, contact national leaders, and stay informed about national issues."
  ],
  coldOpenMessages: [
    { who: "system", text: "A school podcast episode is titled “Why Bother?” Jay argues that civic participation is pointless because one person cannot force government to change." },
    { who: "jay", text: "Why bother participating? One person cannot change anything anyway." },
    { who: "local", text: "Local meetings and community issues are often where individual voices are easiest to see." },
    { who: "state", text: "Citizens can contact state leaders and speak up about state issues too." },
    { who: "national", text: "Voting and contacting national leaders connect people to decisions beyond their town." },
    { who: "coach", text: "Participation is not a promise you will win. It is how citizens take part in self-government." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two ways citizens can participate in civic affairs?",
    "Did I include participation at more than one level of government?",
    "Did I explain that participation does not guarantee a person gets the outcome they want?",
    "Did I connect individual participation to collective civic action?",
    "Did I explain why democratic government depends on citizen participation?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "Why does Jay think participation is pointless?", placeholder: "State his claim..." },
  { key: "local", label: "What is one local way to participate?", placeholder: "Give a concrete example..." },
  { key: "state_national", label: "How can people participate at state or national levels?", placeholder: "Use another example..." },
  { key: "impact", label: "How can individual actions matter even without guaranteeing a win?", placeholder: "Connect individual and collective action..." },
  { key: "duty", label: "Why is participation a civic duty?", placeholder: "Connect it to democracy..." }
];

export const PUSH_ANGLE = "Civic Ladder: choose one issue and show one local, one state, and one national way a citizen could participate.";
