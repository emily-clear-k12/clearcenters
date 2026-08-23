// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.14C, TEKS 5.14C).

export const SERVER_CASE = {
  standard: "SS.5.14C",
  title: "Why Add Ten More?",
  bigQuestion: "Why was the Bill of Rights added after the Constitution, and why is it still important?",
  evidenceBank: [
    "Some Americans worried about a powerful national government",
    "The Bill of Rights is the first ten amendments",
    "The amendments add explicit protections for liberties"
  ],
  trapLine: "The Constitution already created the government, so the Bill of Rights was unnecessary extra paperwork.",
  castNames: {
    clara: "Clara Wells",
    concern: "Samuel Hart",
    rights: "Eliza Reed",
    amend: "Noah Price",
    editor: "Mrs. Bell"
  },
  distractors: "Saying the Bill of Rights replaced the Constitution; saying it created the three branches; treating it as unnecessary decoration; claiming the Constitution had no protections at all before amendments; turning the case into memorizing every amendment instead of why the Bill of Rights was created.",
  mustInclude: [
    "Connects fear of government power to the demand for added protections.",
    "Identifies the Bill of Rights as the first ten amendments.",
    "Explains that the Bill of Rights protects liberties and limits government.",
    "Explains that amendments add to the Constitution rather than replace it.",
    "Explains lasting importance, not just why it was created."
  ],
};
