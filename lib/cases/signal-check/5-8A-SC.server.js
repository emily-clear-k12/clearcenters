// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8A, energy
// transformations within systems.

export const SERVER_CASE = {
  standard: "5.8A-SC",
  title: "Does the Flashlight Make Energy From Nothing?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the battery's stored energy dropped as it powered the flashlight.",
        "Uses the fresh-vs-used battery reading as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the bulb produces thermal energy as well as light.",
        "Uses the bulb warming up over time as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the flashlight does not create energy from nothing.",
        "Explains that it transforms the battery's chemical energy into light and heat.",
      ],
    },
  },
};
