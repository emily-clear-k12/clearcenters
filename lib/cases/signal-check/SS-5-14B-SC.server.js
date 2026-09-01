// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.14B, purposes of
// government in the Preamble to the U.S. Constitution.

export const SERVER_CASE = {
  standard: "SS.5.14B-SC",
  title: "Just One Job?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that 'establish justice' is one of six purposes, not the whole job.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Explains that 'form a more perfect union' is about uniting the states, not lawmaking.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Connects 'common defense' to protecting the country.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Connects 'general welfare' and 'liberty' to citizens' wellbeing and freedom.",
      ],
    },
  },
};
