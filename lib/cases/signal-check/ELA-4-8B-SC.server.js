// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.4.8B-SC. TEKS 4.8B — explain the interactions of the characters and the changes they undergo.

export const SERVER_CASE = {
  standard: "ELA.4.8B-SC",
  title: "Who Changed?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Describes Coach Leo at the start.",
        "Describes Coach Leo at the end.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Describes Ana at the start.",
        "Describes Ana at the end.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States Ana changes the most.",
        "Explains Coach Leo stays the same.",
      ],
    },
  },
};
