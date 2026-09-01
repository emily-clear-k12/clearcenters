// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4D, causes/effects
// of the Civil War (sectionalism, states' rights, slavery).

export const SERVER_CASE = {
  standard: "SS.5.4D-SC",
  title: "Three Names, One Root",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "References South Carolina's declaration naming slavery directly.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that the specific right defended was the right to keep slavery.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Explains that all three causes trace back to disagreements over slavery.",
      ],
    },
    D: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Connects sectionalism's economic divide to slave-based labor versus free labor.",
      ],
    },
  },
};
