// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.4.10A-SC. TEKS 4.10A — explain the author's purpose and message within a text.

export const SERVER_CASE = {
  standard: "ELA.4.10A-SC",
  title: "All That Excitement",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the bold words and exclamation points.",
        "Quotes or describes an example.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the flyer sounds excited.",
        "Explains it never asks the reader to do or believe anything.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Names the purpose as to inform.",
        "Uses the route facts or the map.",
      ],
    },
  },
};
