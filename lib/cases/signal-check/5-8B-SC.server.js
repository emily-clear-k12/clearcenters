// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.8B, electrical circuits
// and energy transformations, and the requirements for a complete circuit.

export const SERVER_CASE = {
  standard: "5.8B-SC",
  title: "Does the Switch Even Matter?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the motor did not spin with the switch off.",
        "Uses evidence that the wires were still connected during that test.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the motor spun and warmed up once the switch closed.",
        "Uses evidence of the motion and thermal energy produced.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the switch does matter, even with the wires connected.",
        "Explains that a complete, unbroken loop is required for electrical energy to flow.",
      ],
    },
  },
};
