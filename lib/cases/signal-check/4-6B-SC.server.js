// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.6B, mixtures.

export const SERVER_CASE = {
  standard: "4.6B-SC",
  title: "Stir It Long Enough?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that stirring breaks the oil into tiny drops spread through the water.",
        "Uses the cloudy appearance right after stirring as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that the oil and water separate back into layers after sitting.",
        "Connects this to the repeat test always ending the same way.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that oil and water don't turn into one new liquid.",
        "Explains that they always separate again instead of combining permanently.",
      ],
    },
  },
};
