// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12B, predicting how
// ecosystem changes affect the cycling of matter and flow of energy
// through a food web.

export const SERVER_CASE = {
  standard: "5.12B-SC",
  title: "Does Feeding the Birds Only Help the Birds?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the drop in the beetle population as a real effect of the feeder.",
        "Uses the beetle count data as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the effect reaching the wildflowers, which don't visit the feeder.",
        "Uses the reduced seed count as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the feeder's effect is not limited to the birds themselves.",
        "Explains that a change to one part of a food web can ripple through the cycling of matter and flow of energy.",
      ],
    },
  },
};
