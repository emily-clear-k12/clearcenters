// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.5.3K-SC. TEKS 5.3K — add and subtract positive rational numbers fluently.

export const SERVER_CASE = {
  standard: "MA.5.3K-SC",
  title: "The Snack Counter Receipt",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Adds the three prices.",
        "Gets $14.60.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States the total is wrong.",
        "Names the 10-cent difference.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees it is close.",
        "Explains a receipt total has to be exact.",
      ],
    },
  },
};
