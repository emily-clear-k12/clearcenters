// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.3A, Texas Revolution
// / Battle of the Alamo.

export const SERVER_CASE = {
  standard: "SS.4.3A-SC",
  title: "Did Anyone Survive the Alamo?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Notes that nearly all the Texian defenders were killed.",
        "Notes that non-combatants (women, children, others) were spared and released, so 'everyone' isn't quite right.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies Dickinson as a survivor.",
        "Connects her survival to carrying word of the battle onward.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies eyewitness accounts (Dickinson, Esparza) as a real source of information.",
        "Connects being present at the event to being a firsthand/primary source.",
      ],
    },
  },
};
