// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.3D, challenges
// facing the new Republic of Texas.

export const SERVER_CASE = {
  standard: "SS.4.3D-SC",
  title: "Can a New Republic Survive?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects the idea that independence solved the Republic's major problems.",
        "Names at least one problem (debt, lack of recognition, border conflict) that continued after 1836.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Mexico's refusal to recognize Texas's independence and/or continued border conflict.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies debt as a major problem for the new Republic.",
      ],
    },
  },
};
