// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.10A, the water cycle and
// the Sun's role as its energy source.

export const SERVER_CASE = {
  standard: "4.10A-SC",
  title: "Did the Puddle Really Disappear?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the covered cup lost little water while the uncovered cup lost most of its water.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes droplets formed on the lid held over the warm water.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the puddle's water did not stop existing.",
        "Explains that it turned into invisible water vapor, driven by the sun's heat, as part of the water cycle.",
      ],
    },
  },
};
