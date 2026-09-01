// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.4B, growth of the
// Texas cattle industry.

export const SERVER_CASE = {
  standard: "SS.4.4B-SC",
  title: "The Cattle Trail Boom",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the price difference between Texas and northern railroad towns.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies a cattle trail (e.g. the Chisholm Trail) and/or the railroad connection it created.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects having a lot of cattle as the main reason the industry grew.",
        "Points to the timing (growth starting only after trails/railroads opened) as evidence against the claim.",
      ],
    },
  },
};
