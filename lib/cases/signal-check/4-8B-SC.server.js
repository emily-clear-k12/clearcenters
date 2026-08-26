// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8B, thermal energy and
// insulation.

export const SERVER_CASE = {
  standard: "4.8B-SC",
  title: "Does the Towel Make Cold?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Compares the wrapped (42 min) and unwrapped (19 min) melt times.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the towel measured room temperature, not cold, before and after.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the towel is not making cold.",
        "Explains that the towel is slowing down heat transfer instead.",
      ],
    },
  },
};
