// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.17C, TEKS 5.17C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.17C, for example).

export const CAST = {
  tori: { name: "Tori Tally", emoji: "🍕", color: "#F59E0B", hint: "Thinks voting is fair only if her choice wins." },
  ballot: { name: "Benny Ballot", emoji: "🗳️", color: "#3B82F6", hint: "Owns one-person-one-vote procedure." },
  counter: { name: "Cora Counter", emoji: "🔢", color: "#8B5CF6", hint: "Owns accurate counting." },
  rule: { name: "Ravi Rules", emoji: "📋", color: "#22C55E", hint: "Owns pre-agreed decision rules." },
  chair: { name: "Ms. Ortiz", emoji: "✅", color: "#0D9488", hint: "Connects voting to group decision-making." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.17C",
  title: "The Pizza Vote Disaster",
  bigQuestion: "What makes voting a fair method for group decision-making, even when some people do not get their preferred outcome?",
  trapLine: "My choice lost, so the vote must have been unfair.",
  evidenceBank: [
    "Each student received one vote and the same choices.",
    "Before voting, the group agreed that the option with the most votes would be selected.",
    "Votes were counted once using the same rule for every ballot."
  ],
  coldOpenMessages: [
    { who: "system", text: "A fifth-grade class voted on pizza for a celebration. Pepperoni lost. Tori immediately declares the vote unfair because her choice did not win." },
    { who: "tori", text: "My choice lost, so the vote must have been unfair." },
    { who: "ballot", text: "Everyone got one ballot and the same set of choices." },
    { who: "counter", text: "The ballots have to be counted the same way, not changed after seeing the result." },
    { who: "rule", text: "Before voting, the class agreed that the option with the most votes would win." },
    { who: "chair", text: "A vote is a method for making a group decision, not a promise everyone will like the result." }
  ],
  selfCheckQuestions: [
    "Did I explain that each voter should have an equal chance to vote?",
    "Did I explain why the decision rule should be set before the vote?",
    "Did I use the vote totals correctly?",
    "Did I distinguish whether the process was fair from whether I liked the result?",
    "Did I explain how voting can be used to make a group decision?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "Why does Tori call the vote unfair?", placeholder: "State her reasoning..." },
  { key: "procedure", label: "What made the voting procedure fair or unfair?", placeholder: "Use equal chance and rules..." },
  { key: "count", label: "How should the votes be counted?", placeholder: "Explain consistency..." },
  { key: "result", label: "What result follows the agreed rule?", placeholder: "Use the vote totals..." },
  { key: "judgment", label: "Can a fair vote produce a result you dislike? Explain.", placeholder: "Separate process from preference..." }
];

export const PUSH_ANGLE = "Vote Audit: design a fair class vote with a clear rule, equal participation, and a plan for counting.";
