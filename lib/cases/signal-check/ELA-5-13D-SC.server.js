// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.5.13D-SC. TEKS 5.13D — understand credibility of primary and secondary sources.

export const SERVER_CASE = {
  standard: "ELA.5.13D-SC",
  title: "Two Sources Disagree",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes when the newspaper was written.",
        "Uses its count of about 200.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the blog lists no source.",
        "Explains why that matters for credibility.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States newer is not always more credible.",
        "Uses the blog's missing evidence.",
      ],
    },
  },
};
