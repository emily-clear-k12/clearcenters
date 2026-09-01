// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.7B, geographic
// factors influencing settlement patterns and town growth.

export const SERVER_CASE = {
  standard: "SS.5.7B-SC",
  title: "Anywhere Will Do?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false.",
        "Names Gault Hollow's lack of water/trade access as the reason it didn't grow.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Connects the river crossing to trade and growth.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Identifies the claim as misleading, not simply true.",
        "Explains that a founding crowd couldn't overcome the site's geographic weaknesses.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the claim as true.",
        "Connects fertile farmland to giving families a reason to stay.",
      ],
    },
  },
};
