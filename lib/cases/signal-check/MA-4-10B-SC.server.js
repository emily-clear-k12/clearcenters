// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.4.10B-SC. TEKS 4.10B — calculate profit in a given situation.

export const SERVER_CASE = {
  standard: "MA.4.10B-SC",
  title: "The Car Wash Fundraiser",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the class collected $40.",
        "Explains that is not the same as profit.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States supply costs are not profit.",
        "Uses the $16 in supply costs.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Defines profit as money left after costs.",
        "Calculates $24.",
      ],
    },
  },
};
