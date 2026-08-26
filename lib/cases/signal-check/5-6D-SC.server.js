// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6D, matter made of
// particles too small to see, such as air inside a balloon.

export const SERVER_CASE = {
  standard: "5.6D-SC",
  title: "Is an Empty Balloon Really Empty?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the inflated balloon weighed more than the deflated one.",
        "Uses the scale reading as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the inflated balloon pushes back and holds its shape.",
        "Uses the flatten/push-back comparison as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the uninflated balloon is not actually empty.",
        "Explains that air is made of particles too small to see, which still take up space and have mass.",
      ],
    },
  },
};
