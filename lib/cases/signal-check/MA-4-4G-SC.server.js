// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.4.4G-SC. TEKS 4.4G — round to the nearest 10, 100, or 1,000 or use compatible numbers to estimate solutions involving whole numbers.

export const SERVER_CASE = {
  standard: "MA.4.4G-SC",
  title: "Is $2,500 Enough?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Rounds $712 to $700.",
        "Multiplies by 4 to get $2,800.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees $4,000 is an estimate.",
        "Explains it is much farther from $2,848 than $2,800 is.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States $2,500 is not enough.",
        "Uses the real total or the $348 gap.",
      ],
    },
  },
};
