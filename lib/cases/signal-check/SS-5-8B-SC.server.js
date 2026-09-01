// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.8B, consequences of
// human modification of the physical environment.

export const SERVER_CASE = {
  standard: "SS.5.8B-SC",
  title: "Good For Everyone?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Names irrigation water and/or electricity as real benefits.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that leaders emphasized benefits and downplayed costs.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names flooded farmland and/or family relocation as a real downside.",
      ],
    },
    D: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names the downstream fish population drop as an effect beyond the town.",
      ],
    },
  },
};
