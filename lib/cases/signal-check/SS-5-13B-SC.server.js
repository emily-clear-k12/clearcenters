// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.13B, colonial
// governments and early representative institutions.

export const SERVER_CASE = {
  standard: "SS.5.13B-SC",
  title: "Nobody Really Had a Say?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Explains that the Mayflower Compact shows colonists creating their own laws.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Explains the House of Burgesses's role in voting on local laws/taxes.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that limited voting rights are different from having no say at all.",
      ],
    },
    D: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names town meetings as real, documented self-government.",
      ],
    },
  },
};
