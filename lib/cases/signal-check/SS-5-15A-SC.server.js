// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.15A, powers and
// responsibilities of the three branches of government.

export const SERVER_CASE = {
  standard: "SS.5.15A-SC",
  title: "One Branch, Every Job?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Names enforcing/carrying out laws as the executive branch's job (Article II).",
      ],
    },
    B: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that a veto only accepts or rejects a law, not writes or interprets one.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names Congress/the legislative branch as holding lawmaking power (Article I).",
      ],
    },
    D: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names the courts/judicial branch as holding the power to interpret laws (Article III).",
      ],
    },
  },
};
