// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.5.9E-SC. TEKS 5.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for or against an argument. (Cedar Hill is fictional.)

export const SERVER_CASE = {
  standard: "ELA.5.9E-SC",
  title: "Facts That Cut Both Ways",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Names the author's claim.",
        "Connects the no-place fact to the claim.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States the cost fact works against the argument.",
        "Explains why a high cost is a reason against it.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees one fact works against the author.",
        "Explains the author answers it, which can strengthen the argument.",
      ],
    },
  },
};
