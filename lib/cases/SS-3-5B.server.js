// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.5B, TEKS 3.5B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.5B",
  title: "The $40 Budget Problem",
  bigQuestion: "How can a simple budget help someone decide what to spend and what to save?",
  evidenceBank: [
    "The club wants to save at least $10 for a future project.",
    "Snacks cost $18, decorations cost $12, and a game costs $15.",
    "The club has only $40 total."
  ],
  trapLine: "A budget is just a list of things you want to buy.",
  castNames: {
    ella: "Ella Wish-List",
    spend: "Sam Spend Plan",
    save: "Sofia Save Goal",
    math: "Milo Budget Check"
  },
  distractors: "",
  mustInclude: [
    "Uses the $40 limit.",
    "Includes the savings goal.",
    "Builds a workable spending plan.",
    "Explains a choice or tradeoff.",
    "Rejects wish-list reasoning."
  ],
};
