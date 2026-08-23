// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.8B, TEKS 5.8B).

export const SERVER_CASE = {
  standard: "SS.5.8B",
  title: "The Dam Debate",
  bigQuestion: "If a dam solves important human problems but also changes an ecosystem and nearby communities, should it be judged as simply “good,” simply “bad,” or by weighing both consequences?",
  evidenceBank: [
    "A dam can store water for dry periods",
    "Hydroelectric power can generate electricity",
    "A reservoir can flood habitat and occupied land"
  ],
  trapLine: "The dam provides water and electricity, so it is clearly a good modification. If people benefit, the environmental effects are just side problems.",
  castNames: {
    cole: "Councilor Cole",
    maya: "Maya Singh",
    river: "Dr. River Chen",
    rosa: "Rosa Martinez",
    grant: "Mr. Grant"
  },
  distractors: "Calling the dam simply good because it provides electricity; calling it simply bad because habitat changes; listing benefits and costs without explaining how the dam causes them; ignoring effects on people who must relocate; claiming one benefit automatically cancels one cost.",
  mustInclude: [
    "Explains a positive consequence of the dam.",
    "Explains a negative environmental consequence caused by the dam.",
    "Explains how the modification can affect nearby people as well as the environment.",
    "Connects consequences to the modification instead of listing disconnected facts.",
    "Weighs both positive and negative consequences in a balanced conclusion."
  ],
};
