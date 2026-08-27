// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.13A, analyzing
// structures and functions of different species to determine how
// organisms survive in the same environment.

export const SERVER_CASE = {
  standard: "5.13A-SC",
  title: "Do All the Pond Animals Survive the Same Way?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that turtles and fish use different winter survival strategies.",
        "Uses the mud-burrowing versus continued-swimming behaviors as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the frogs' freezing strategy as a third distinct approach.",
        "Uses the shared-pond fact as evidence all three occur in the same habitat.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States not every pond animal survives winter the same way.",
        "Explains that different species' structures and functions allow different survival strategies in the same environment.",
      ],
    },
  },
};
