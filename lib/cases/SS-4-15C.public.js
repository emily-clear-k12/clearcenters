// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.15C, TEKS 4.15C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  zoe: { name: "Zoe Just-Show-Up", emoji: "🗳️", color: "#F59E0B", hint: undefined },
  info: { name: "Ian Informed Voter", emoji: "📰", color: "#3B82F6", hint: undefined },
  vote: { name: "Vera Voting File", emoji: "✅", color: "#22C55E", hint: undefined },
  source: { name: "Sasha Source Checker", emoji: "🔎", color: "#8B5CF6", hint: undefined },
  synth: { name: "Cal Civic Duty", emoji: "⚖️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.15C",
  title: "Voting Is More Than Showing Up",
  bigQuestion: "What responsibilities should a person fulfill before and during a state or local election?",
  trapLine: "Being a good voter mainly means showing up and picking a name.",
  evidenceBank: [
    "Voters should learn about candidates, issues, and choices before voting.",
    "Eligible citizens have a duty to participate by casting a ballot in state and local elections.",
    "A vote is more responsible when it is based on information instead of guessing."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says voting is simple: go to the polls and choose a candidate. The class has to decide what responsibility comes before the vote." },
    { who: "zoe", text: "If I vote, I did my job. Why does the research part matter?" },
    { who: "info", text: "A voter should understand the choices before marking a ballot." },
    { who: "vote", text: "Learning matters, but citizens also have to participate for their voice to count." },
    { who: "source", text: "Being informed means using trustworthy information, not just hearing a rumor." },
    { who: "synth", text: "The duty has two parts: understand the choice and then participate." }
  ],
  selfCheckQuestions: [
    "Did I explain the duty to become informed before voting?",
    "Did I explain the duty to vote in state and local elections?",
    "Did I explain why reliable information matters?",
    "Did I connect information to making a responsible choice?",
    "Did I explain why simply showing up and guessing is not enough?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "before", label: "What should a voter do before Election Day?", placeholder: "Learn about..." },
  { key: "source", label: "What kind of information should a voter use?", placeholder: "Reliable vs rumor..." },
  { key: "during", label: "What responsibility happens during the election?", placeholder: "Cast a ballot..." },
  { key: "why", label: "Why does being informed matter?", placeholder: "Connect information to decision..." },
  { key: "claim", label: "Why is 'just show up and pick' incomplete?", placeholder: "Use both parts of the duty..." }
];

export const PUSH_ANGLE = "Voter Checklist: build a short before/during-election checklist for a responsible voter.";
