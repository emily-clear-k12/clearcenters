// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12A, how producers make
// their own food using sunlight, water, and carbon dioxide, connected to
// the cycling of matter.

export const SERVER_CASE = {
  standard: "4.12A-SC",
  title: "Do Plants Actually Eat Soil?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the soil's weight barely changed after eight weeks of growth.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the plant grown without sunlight stayed small even with the same soil.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the plant is not growing by eating the soil.",
        "Explains that plants make their own food using sunlight, water, and carbon dioxide.",
      ],
    },
  },
};
