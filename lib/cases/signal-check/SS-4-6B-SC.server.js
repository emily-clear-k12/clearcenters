// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.6B, comparing
// Texas's physical regions.

export const SERVER_CASE = {
  standard: "SS.4.6B-SC",
  title: "Which Texas Region Fits?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Piney Woods' forests and/or clay soil.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Coastal Plains' grasslands/marshes and/or sandy soil.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects matching weather as proof two regions are the same.",
        "Names landforms, soil, or vegetation as what actually defines a region.",
      ],
    },
  },
};
