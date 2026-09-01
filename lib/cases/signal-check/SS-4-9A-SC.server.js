// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.9A, how early
// American Indian groups in Texas met their economic needs.

export const SERVER_CASE = {
  standard: "SS.4.9A-SC",
  title: "How Do We Meet Our Needs?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects hunting as the main method for all groups.",
        "Names at least one non-hunting method (farming, fishing, or gathering) another group actually used.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Karankawa's fishing/shellfish gathering along the coast.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the Caddo as farmers (naming a crop or trade).",
      ],
    },
  },
};
