// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4C, territorial
// expansion / the Lewis and Clark expedition.

export const SERVER_CASE = {
  standard: "SS.5.4C-SC",
  title: "First to See It?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false because Native nations already lived on the land.",
        "Uses evidence naming established villages/territories along the route.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Sacagawea's role as interpreter/guide.",
        "Connects her role to communicating with and navigating through Native nations.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies the claim as false/misleading — the expedition had outside help.",
        "Names Sacagawea, other guides, or trade with Native nations as that help.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the journals as a real, kept record.",
        "Connects the journals to being a primary source historians use today.",
      ],
    },
  },
};
