// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.13A, plant structures
// and functions that help plants survive (waxy leaves, deep roots).

export const SERVER_CASE = {
  standard: "4.13A-SC",
  title: "Does the Waxy Coating Even Do Anything?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the waxy-leaved plant lost less water than the plant with the wax removed.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the deep-rooted plant could still reach water after the topsoil dried out.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the waxy coating does help the plant survive.",
        "Explains that it slows water loss, and/or that deep roots reach water below a dried-out surface.",
      ],
    },
  },
};
