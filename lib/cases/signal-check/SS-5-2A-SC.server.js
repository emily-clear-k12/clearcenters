// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.2A, causes/effects
// leading up to and during the American Revolution.

export const SERVER_CASE = {
  standard: "SS.5.2A-SC",
  title: "One Bad Law?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true — Parliament kept passing new laws after the Stamp Act.",
        "Names at least one later law (Townshend Acts or Tea Act) as evidence.",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that protesting one law is not the same as being ready for war.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Uses the repeal date and/or the years before Lexington and Concord as evidence.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Names the Boston Massacre and/or Boston Tea Party as later flashpoints.",
      ],
    },
  },
};
