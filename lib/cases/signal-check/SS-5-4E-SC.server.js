// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4E, effects of
// Reconstruction and the 13th Amendment.

export const SERVER_CASE = {
  standard: "SS.5.4E-SC",
  title: "Freedom on Paper",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that legal freedom did not guarantee equal treatment or opportunity right away.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "States that the 13th Amendment ended slavery legally in 1865.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names sharecropping and its debt cycle as a continuing problem.",
      ],
    },
    D: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names black codes (or Jim Crow laws) as restricting freed people's rights.",
      ],
    },
  },
};
