// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.9A, seasonal daylight
// patterns.

export const SERVER_CASE = {
  standard: "4.9A-SC",
  title: "Does Cold Cause Sunset?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes sunset was already getting earlier before the cold weather started.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes sunset kept getting earlier even during a warm week.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that cold weather is not causing the earlier sunset.",
        "Explains that Earth's tilt/orbit drives the seasonal daylight pattern instead.",
      ],
    },
  },
};
