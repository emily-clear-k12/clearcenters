// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.5.10C-SC. TEKS 5.10C — analyze the author's use of print and graphic features to achieve specific purposes.

export const SERVER_CASE = {
  standard: "ELA.5.10C-SC",
  title: "Chart or Text?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the paragraph counts plants.",
        "Uses the 18 tomato plants.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Uses the graph's title.",
        "Notes peppers have the tallest bar.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the two seem to disagree.",
        "Explains they measure different things, so both can be true.",
      ],
    },
  },
};
