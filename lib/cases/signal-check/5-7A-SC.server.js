// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.7A, equal and unequal
// forces and their effect on patterns of motion.

export const SERVER_CASE = {
  standard: "5.7A-SC",
  title: "If Both Sides Pull, Does It Have to Move?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that both teams pulled with equal force.",
        "Uses the matching force meter readings as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the rope did not move.",
        "Uses the unchanged center mark as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the rope does not have to move just because both sides are pulling.",
        "Explains that equal and opposite forces balance out and cause no change in motion.",
      ],
    },
  },
};
