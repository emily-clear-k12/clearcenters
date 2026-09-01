// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.2A, motivations of
// European explorers in Texas.

export const SERVER_CASE = {
  standard: "SS.4.2A-SC",
  title: "Why Texas?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Rejects curiosity as the explorers' main motive.",
        "Names each explorer's actual motive (gold for Coronado, a French land claim for La Salle) as the real reason.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies La Salle's goal as claiming land for France and/or finding the Mississippi's mouth.",
        "Notes that landing in Texas was a mistake, not the goal itself.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Coronado's goal as finding the Cities of Gold / treasure for Spain.",
      ],
    },
  },
};
