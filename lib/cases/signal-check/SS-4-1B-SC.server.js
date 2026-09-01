// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.1B, ways of life
// among American Indian groups in Texas.

export const SERVER_CASE = {
  standard: "SS.4.1B-SC",
  title: "Same State, Different Ways of Life",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Karankawa's reliance on fishing/shellfish along the Gulf Coast.",
        "Connects their coastal environment to their food and travel by canoe.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Caddo as farmers living in permanent villages.",
        "Names at least one crop (corn, beans, or squash) or connects farming to staying in one place.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects the idea that living in the same state means living the same way.",
        "Points to a real difference between at least two of the three groups' environments (coast, forest, plains) as the reason their lives differed.",
      ],
    },
  },
};
