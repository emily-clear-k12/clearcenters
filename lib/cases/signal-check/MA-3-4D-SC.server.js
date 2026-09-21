// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.3.4D-SC. TEKS 3.4D — determine the total number of objects when equally-sized groups of objects are combined or arranged in arrays up to 10 by 10.

export const SERVER_CASE = {
  standard: "MA.3.4D-SC",
  title: "The Garden Rows",
  stemMode: "dropdown",
  modelAnswer:
    "\"The garden has 3 rows.\" is TRUE because the photo shows 3 rows of seedlings, all starting at the same fence post. \"Every row has 7 plants.\" is MISLEADING because rows 1 and 2 have 7 plants, but row 3 has only 6 and an empty spot. \"The garden has 21 plants.\" is FALSE because counting every plant gives 7 + 7 + 6 = 20, and 3 × 7 only works when every row has 7.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked Misleading.",
    "Signal C marked False.",
    "Evidence picks name Row count or Rows lined up for Signal A.",
    "Evidence picks name Rows 1 and 2 or Row 3 for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Counts 3 rows.",
        "Uses the photo.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Notes two rows have 7.",
        "Notes row 3 has 6.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Finds 20 plants.",
        "Explains every row must be equal for 3 × 7.",
      ],
    },
  },
};
