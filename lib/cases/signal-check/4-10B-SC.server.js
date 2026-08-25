// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.10B, weathering/erosion/
// deposition.

export const SERVER_CASE = {
  standard: "4.10B-SC",
  title: "Rocks on the Move",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Notes the before photo shows no rocks in that spot.",
        "Notes the bank rocks match the upstream rock type (not newly formed material).",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Names sediment moving from upstream to the bank.",
        "Connects the missing upstream sediment to the piled-up sediment at the bank.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Explains that slowing current causes sediment to drop.",
        "Connects the slow current at the curve to where the sediment landed.",
      ],
    },
  },
};
