// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10C, landform formation
// caused by wind, water, and ice.

export const SERVER_CASE = {
  standard: "5.10C-SC",
  title: "Did the Canyon Really Form Overnight?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the matching rock layers on both sides as evidence of gradual formation.",
        "Uses the still-flowing river as supporting evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that repeated water flow, not a single shake, carved the groove in the model.",
        "Uses the model's water-versus-shake comparison as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the canyon did not form in one overnight event.",
        "Explains that canyons form over a very long time through slow erosion by flowing water.",
      ],
    },
  },
};
