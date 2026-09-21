// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.3.2D-SC. TEKS 3.2D — compare and order whole numbers up to 100,000 and represent comparisons using the symbols >, <, or =.

export const SERVER_CASE = {
  standard: "MA.3.2D-SC",
  title: "Town Sign Mix-Up",
  stemMode: "dropdown",
  modelAnswer:
    "\"4,950 is the smallest number on the sign.\" is TRUE because 4,950 and 9,760 are the only numbers in the thousands, and 4 thousands is less than 9 thousands. \"12,800 is less than 9,760, because 1 is less than 9.\" is FALSE because 12,800 has a digit in the ten-thousands place, so it is bigger than 9,760. \"The last number is the biggest, so the list is in order.\" is MISLEADING because 21,300 is the biggest, but 12,800 and 9,760 are in the wrong order.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked False.",
    "Signal C marked Misleading.",
    "Evidence picks name Sign numbers or Thousands for Signal A.",
    "Evidence picks name Ten-thousands place or Comparing tip for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Names 4,950 as smallest.",
        "Compares place values.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States 12,800 is greater.",
        "Explains the ten-thousands place.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees 21,300 is biggest.",
        "Explains the middle two are swapped.",
      ],
    },
  },
};
