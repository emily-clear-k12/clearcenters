// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11B, the role of energy
// resources in modern life and how conservation, disposal, and recycling
// impact the environment.

export const SERVER_CASE = {
  standard: "4.11B-SC",
  title: "One Battery Won't Make a Difference?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes one classroom collected over 200 batteries in a year.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes recycled batteries are handled differently than batteries in a landfill.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States one battery in the trash is not actually harmless.",
        "Explains that the same small choice repeated by many people adds up to a real effect.",
      ],
    },
  },
};
