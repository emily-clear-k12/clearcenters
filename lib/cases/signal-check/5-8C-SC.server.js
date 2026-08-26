// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8C, light traveling in a
// straight line and being reflected, refracted, and absorbed.

export const SERVER_CASE = {
  standard: "5.8C-SC",
  title: "Did the Straw Really Bend?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the straw is still straight once removed from the water.",
        "Uses evidence that it took real force to bend the dry straw on purpose.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the apparent bend changes with viewing angle.",
        "Uses that angle-dependence as evidence the effect isn't physical.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the straw did not actually bend.",
        "Explains that light refracts when passing from air into water, creating the illusion.",
      ],
    },
  },
};
