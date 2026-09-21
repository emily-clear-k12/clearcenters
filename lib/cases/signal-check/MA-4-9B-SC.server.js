// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.4.9B-SC. TEKS 4.9B — solve one- and two-step problems using data in whole number, decimal, and fraction form in a frequency table, dot plot, or stem-and-leaf plot.

export const SERVER_CASE = {
  standard: "MA.4.9B-SC",
  title: "The Shoe Size Survey",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that size 7 has 5 dots.",
        "Uses that each dot stands for one student.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States that size 5½ has more dots (6).",
        "Explains that size 7 is not the tallest stack.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees size 7 is the most common whole size.",
        "Explains half sizes count, so 5½ is the most common size overall.",
      ],
    },
  },
};
