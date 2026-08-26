// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12A, how organisms
// survive by interacting with biotic and abiotic factors.

export const SERVER_CASE = {
  standard: "5.12A-SC",
  title: "Do Living Things Only Need Other Living Things?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the temperature drop as the cause of the fish's sluggishness.",
        "Uses the heater-failure incident as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the lack of light as the cause of the plants' decline.",
        "Uses the no-light week incident as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States nonliving factors do matter to living things.",
        "Explains the difference between biotic and abiotic factors.",
      ],
    },
  },
};
