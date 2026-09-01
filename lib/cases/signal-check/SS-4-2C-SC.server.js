// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.2C, Spanish
// missions in Texas.

export const SERVER_CASE = {
  standard: "SS.4.2C-SC",
  title: "Why Build a Mission Here?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies water access (the San Antonio River) as the reason for that mission's location.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies nearby American Indian settlements as a reason for mission placement.",
        "Connects that placement to the goal of teaching/converting nearby communities.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects the idea that mission sites were picked at random.",
        "Names at least one real reason (water, nearby communities, or travel routes) sites were actually chosen.",
      ],
    },
  },
};
