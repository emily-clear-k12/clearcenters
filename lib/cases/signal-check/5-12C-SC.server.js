// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12C, characteristics of
// a healthy ecosystem and how human activities can be beneficial or
// harmful to it.

export const SERVER_CASE = {
  standard: "5.12C-SC",
  title: "Will Paving the Lot Really Not Affect Anything Else?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the change in runoff after the nearby lot was paved.",
        "Uses the before-and-after runoff comparison as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the rain garden as a beneficial human activity.",
        "Uses the returning wildlife as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that paving the lot would affect the surrounding area.",
        "Explains that human activities can be both harmful and beneficial to an ecosystem.",
      ],
    },
  },
};
