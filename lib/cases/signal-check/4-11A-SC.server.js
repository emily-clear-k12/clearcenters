// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11A, advantages and
// disadvantages of renewable and nonrenewable natural resources.

export const SERVER_CASE = {
  standard: "4.11A-SC",
  title: "Does the Wind Turbine Work Every Single Day?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the turbine made zero power on calm days.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the wind resource itself does not run out over time.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the turbine does not make power every single day.",
        "Explains that renewable means the resource won't run out, not that it's available on demand every day.",
      ],
    },
  },
};
