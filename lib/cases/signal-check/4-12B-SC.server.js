// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12B, cycling of matter
// and flow of energy through food webs, including decomposers.

export const SERVER_CASE = {
  standard: "4.12B-SC",
  title: "Do Decomposers Even Matter?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the log broke down into soil over the five months.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes plants grew better in the decomposed soil than in plain soil.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States decomposers are part of the food web.",
        "Explains that decomposers return nutrients producers need, which consumers depend on too.",
      ],
    },
  },
};
