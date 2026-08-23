// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.9E, TEKS 3.9E).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Loudest-Wins", emoji: "📣", color: "#F59E0B", hint: undefined },
  choice: { name: "Cora Choices", emoji: "🗂️", color: "#3B82F6", hint: undefined },
  vote: { name: "Vera One-Vote", emoji: "🗳️", color: "#22C55E", hint: undefined },
  count: { name: "Cal Count-It", emoji: "🔢", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.9E",
  title: "The Class Vote Disaster",
  bigQuestion: "How can voting be used fairly to make a group decision?",
  trapLine: "A vote is fair as long as the loudest choice wins.",
  evidenceBank: [
    "The class has three activity options.",
    "Each student gets one vote.",
    "All votes are counted, and the option with the most votes is selected."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class must choose one field-day activity. Students shout choices across the room, and one student announces that the loudest group has won." },
    { who: "max", text: "The obstacle-course group was the loudest. That seems like a clear winner." },
    { who: "choice", text: "A fair vote starts with clear choices everyone understands." },
    { who: "vote", text: "Each person should get the same chance to vote." },
    { who: "count", text: "The decision comes from counting votes, not from who shouts the loudest." }
  ],
  selfCheckQuestions: [
    "Did I explain that voters need clear choices?",
    "Did I explain that each person should have an equal vote?",
    "Did I explain that all votes should be counted?",
    "Did I explain how the winner is determined?",
    "Did I explain why shouting is not the same as voting?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "choices", label: "What choices should voters have?", placeholder: "Name the options..." },
  { key: "equal", label: "How should each student participate?", placeholder: "One vote each..." },
  { key: "count", label: "How should the result be decided?", placeholder: "Count all votes..." },
  { key: "claim", label: "Why is 'loudest wins' not a fair vote?", placeholder: "Use equal-vote evidence..." }
];

export const PUSH_ANGLE = "Vote Repair: rewrite the class procedure into three fair voting steps.";
