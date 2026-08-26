// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.7, forces and motion.

export const SERVER_CASE = {
  standard: "4.7-SC",
  title: "Moving on Its Own?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the marble rolls the same direction every time it's tested.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the level tool shows the lot isn't perfectly flat.",
        "References the height measurement showing one side is higher.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that a force (gravity) was acting on the cart.",
        "Connects the slope to gravity pulling the cart downhill.",
      ],
    },
  },
};
