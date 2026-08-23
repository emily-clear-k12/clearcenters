// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.8B, TEKS 3.8B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Mayor Max", emoji: "🎩", color: "#F59E0B", hint: undefined },
  vote: { name: "Vera Voter", emoji: "🗳️", color: "#3B82F6", hint: undefined },
  consent: { name: "Cami Consent", emoji: "🤝", color: "#22C55E", hint: undefined },
  account: { name: "Ari Accountability", emoji: "🔎", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.8B",
  title: "Who Gave Them Permission?",
  bigQuestion: "What does consent of the governed mean?",
  trapLine: "Government has authority because leaders are in charge.",
  evidenceBank: [
    "Citizens choose leaders through elections.",
    "Government authority is based on the people agreeing to be governed.",
    "Citizens can participate, vote, and hold leaders accountable."
  ],
  coldOpenMessages: [
    { who: "system", text: "In a classroom-government simulation, the 'mayor' says, 'I make the rules because I am the leader.' The class has to decide where the leader's authority should really come from." },
    { who: "max", text: "I’m the mayor in this simulation, so my authority comes from being the mayor." },
    { who: "vote", text: "Leaders get authority because people take part in choosing government." },
    { who: "consent", text: "Consent means the people agree that government may exercise authority." },
    { who: "account", text: "People do not disappear after an election. They still participate and respond to government." }
  ],
  selfCheckQuestions: [
    "Did I explain that government authority comes from the people?",
    "Did I explain how elections connect to consent?",
    "Did I describe one way citizens can stay involved?",
    "Did I use the idea of consent correctly?",
    "Did I explain why leaders do not simply get authority from themselves?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "authority", label: "Where should government authority come from?", placeholder: "Use the consent clue..." },
  { key: "election", label: "How do elections show consent?", placeholder: "What do citizens do?" },
  { key: "participate", label: "How can people stay involved after leaders are chosen?", placeholder: "Vote? speak up? hold accountable?" },
  { key: "claim", label: "Why is 'leaders have authority just because they are leaders' incomplete?", placeholder: "Use the people clue..." }
];

export const PUSH_ANGLE = "Simulation Fix: rewrite Mayor Max's opening statement so it matches consent of the governed.";
