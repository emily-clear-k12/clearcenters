// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.9 (no sub-letter),
// Earth's rotation and the resulting day/night cycle and shadow patterns.

export const SERVER_CASE = {
  standard: "5.9-SC",
  title: "Does the Shadow Move Randomly?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the shadow's direction changes the same way every day.",
        "Uses the morning-west, afternoon-east readings as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the pattern repeated exactly on a second day.",
        "Uses the noon reading and the day-2 repeat as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the shadow's movement is not actually random.",
        "Explains that Earth's rotation causes a predictable, repeating pattern.",
      ],
    },
  },
};
