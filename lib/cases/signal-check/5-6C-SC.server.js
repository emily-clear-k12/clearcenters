// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6C, conservation of
// matter in solutions.

export const SERVER_CASE = {
  standard: "5.6C-SC",
  title: "Did the Salt Really Disappear?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the before-mixing weights as the comparison baseline.",
        "Uses evidence that the cup, salt, and water were weighed separately first.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the after-dissolving weight matched the before total.",
        "Uses evidence that the saltwater weighed the same as the starting total.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that no matter is actually lost when salt dissolves.",
        "Explains that matter is conserved in a solution, with the salt spread into particles too small to see.",
      ],
    },
  },
};
