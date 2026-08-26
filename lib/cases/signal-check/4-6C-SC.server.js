// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.6C, matter is conserved
// when combined.

export const SERVER_CASE = {
  standard: "4.6C-SC",
  title: "Where Did the Volume Go?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the mix measured 92 mL with nothing spilled.",
        "References the spill check finding nothing on the counter or floor.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the weight stayed the same (340 grams) before and after mixing.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that nothing spilled or disappeared.",
        "Explains that smaller beans fill the gaps between bigger rice grains, making the mixed volume smaller than a simple sum.",
      ],
    },
  },
};
