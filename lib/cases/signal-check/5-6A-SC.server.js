// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6A, physical properties
// of matter including magnetism.
//
// Rewritten Aug 29, 2026 to match the public case's new recycling-line
// scenario (iron washer/steel bolt vs. brass hinge/aluminum siding) — see
// the public.js file header for why.

export const SERVER_CASE = {
  standard: "5.6A-SC",
  title: "The One-Bin Metal Sorter",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the magnet arm works on the iron and steel objects.",
        "Uses evidence that the iron washer and steel bolt snapped up instantly.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the magnet arm does not work on the brass or aluminum objects.",
        "Uses evidence that the hinge and siding scrap did not move even after the arm passed over them.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that one magnet arm cannot sort every kind of metal.",
        "Explains that magnetism is a property only some metals, like iron and steel, have.",
      ],
    },
  },
};
