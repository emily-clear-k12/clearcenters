// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.5.10F-SC. TEKS 5.10F — balance a simple budget.

export const SERVER_CASE = {
  standard: "MA.5.10F-SC",
  title: "The Chen Family Budget",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Names $3,200 as the monthly income.",
        "Uses the budget sheet.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "Adds the expenses to $3,350.",
        "Explains that is more than income.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Calculates $3,170.",
        "Explains a budget balances when expenses are at or below income.",
      ],
    },
  },
};
