// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6B, mixtures that
// maintain the physical properties of the substances that make them up.

export const SERVER_CASE = {
  standard: "5.6B-SC",
  title: "Did Mixing Make Something Brand New?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the magnet separated the iron filings from the sand.",
        "Uses evidence that the magnet pulled out only the filings.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that both materials kept their original properties.",
        "Uses evidence that the recovered filings still stuck to a magnet and the sand looked unchanged.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the mixture did not become a new, unseparable substance.",
        "Explains that a mixture keeps its parts' separate properties and can be separated again.",
      ],
    },
  },
};
