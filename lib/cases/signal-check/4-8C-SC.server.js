// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8C, circuits.

export const SERVER_CASE = {
  standard: "4.8C-SC",
  title: "Used Up by the First Bulb?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes the first and last bulbs glow the same brightness.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that removing the last bulb darkens the whole string, including the first bulb.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the first bulb doesn't use up the electricity.",
        "Explains that electricity must travel the full loop to keep every bulb lit.",
      ],
    },
  },
};
