// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.11C, factors in
// Texas's economic growth.

export const SERVER_CASE = {
  standard: "SS.4.11C-SC",
  title: "What Made Texas Grow?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies railroads as a factor connecting Texas to bigger markets.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies cheap/available farmland as drawing settlers to grow crops for sale.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects population growth alone as the explanation.",
        "Points to the timeline (railroads/farmland driving growth before the biggest population increases) as evidence against the claim.",
      ],
    },
  },
};
