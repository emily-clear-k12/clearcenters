// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10A, how the Sun and
// ocean interact in the water cycle and affect weather.

export const SERVER_CASE = {
  standard: "5.10A-SC",
  title: "Does the Morning Fog Just Show Up for No Reason?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the ocean-air temperature difference as linked to fog.",
        "Uses the two foggy mornings' matching temperature readings as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the clear morning had no big temperature difference.",
        "Uses that clear morning as evidence against randomness.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States fog does not form for no reason.",
        "Explains that the sun heating the ocean drives evaporation, and condensation of that moist air forms fog.",
      ],
    },
  },
};
