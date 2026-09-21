// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.5.8B-SC. TEKS 5.8B — analyze the relationships of and conflicts among the characters.

export const SERVER_CASE = {
  standard: "ELA.5.8B-SC",
  title: "What's Really the Conflict?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Uses the counselor's rule.",
        "Notes they're stuck in the cabin.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Uses the cards-or-fort argument.",
        "Uses Luis's words.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the storm causes the situation.",
        "Explains the real conflict is about who decides.",
      ],
    },
  },
};
