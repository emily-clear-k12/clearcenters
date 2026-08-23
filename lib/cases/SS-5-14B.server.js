// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.14B, TEKS 5.14B).

export const SERVER_CASE = {
  standard: "SS.5.14B",
  title: "Six Jobs, One Constitution",
  bigQuestion: "According to the Preamble, what purposes was the Constitution designed to serve — and why is “make laws” too small an answer?",
  evidenceBank: [
    "The Preamble states broad purposes for the Constitution",
    "It names several goals, not just one",
    "“Making laws” is a government action, not the whole Preamble"
  ],
  trapLine: "The Constitution has one main job: make laws for the country. Everything else is just extra wording.",
  castNames: {
    marcus: "Marcus Lane",
    union: "Uma Union",
    justice: "Jade Justice",
    welfare: "Will Harper",
    curator: "Ms. Chen"
  },
  distractors: "Treating “make laws” as the only purpose; defining general welfare as one specific program; confusing the Preamble with the Bill of Rights; listing six phrases without explaining them; saying each purpose belongs to a separate branch.",
  mustInclude: [
    "Explains that the Preamble identifies multiple purposes for government.",
    "Explains a purpose involving union, peace, or common defense.",
    "Explains a purpose involving justice or liberty.",
    "Explains the general welfare purpose accurately.",
    "Rejects “make laws” as a complete explanation and summarizes broader purposes."
  ],
};
