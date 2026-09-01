// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4A, causes/effects
// of the War of 1812.

export const SERVER_CASE = {
  standard: "SS.5.4A-SC",
  title: "Blame It on the Land",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names impressment and/or trade restrictions as bigger causes than land disputes.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Explains impressment as forcing American sailors into British Navy service.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that the land hope came after impressment/trade tensions were already high.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Connects British trade restrictions to harm on American merchants/shippers.",
      ],
    },
  },
};
