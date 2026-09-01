// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.17B, Texas cultural
// contributions.

export const SERVER_CASE = {
  standard: "SS.4.17B-SC",
  title: "What Sounds Like Texas?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects the idea that all Texas music sounds alike or shares one tradition.",
        "Names a real difference (instruments or cultural roots) between the two styles.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Western/cowboy music's connection to ranching or cattle drives.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Conjunto/Tejano music's Mexican and German roots.",
      ],
    },
  },
};
