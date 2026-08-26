// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.9B, patterns in the
// Moon's observable appearance from Earth.

export const SERVER_CASE = {
  standard: "4.9B-SC",
  title: "Does the Moon Really Shrink?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the moon measures the same size in every photo this month.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the same craters or features show up on the moon night after night.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the moon does not actually shrink or grow.",
        "Explains that the lit part we see changes as the moon moves around Earth.",
      ],
    },
  },
};
