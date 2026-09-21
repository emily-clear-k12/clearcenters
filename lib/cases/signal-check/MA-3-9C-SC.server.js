// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.3.9C-SC. TEKS 3.9C — identify the costs and benefits of planned and unplanned spending decisions.

export const SERVER_CASE = {
  standard: "MA.3.9C-SC",
  title: "The Snack Stop",
  stemMode: "dropdown",
  modelAnswer:
    "\"Jada had a plan for saving her money.\" is TRUE because jada planned to save $5 every week for a $20 art kit, and her chart has a box for each week. \"The snack was a planned spending choice.\" is FALSE because jada bought the snack because it looked good on the way home. She wrote that she didn't plan it. \"Jada still has money saved, so the snack cost her nothing.\" is MISLEADING because jada still has $12, but now she will get her art kit one week later than she planned.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked False.",
    "Signal C marked Misleading.",
    "Evidence picks name Saving plan or Savings chart for Signal A.",
    "Evidence picks name Store receipt or Jada's note for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Names Jada's plan to save $5 a week.",
        "Uses the savings chart.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States the snack was unplanned.",
        "Uses Jada's note.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees Jada still has some money.",
        "Explains the snack delays her art kit.",
      ],
    },
  },
};
