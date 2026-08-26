// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.11 (no sub-letter),
// designing solutions that minimize environmental impact through
// conservation, recycling, and proper disposal.

export const SERVER_CASE = {
  standard: "5.11-SC",
  title: "Does Turning Off the Faucet Actually Save Anything?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the measured amount of water used per brushing session.",
        "Uses the 4-gallon measurement as evidence.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the yearly total is much larger than the per-use amount.",
        "Uses the 2,900-gallon yearly estimate as evidence.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the conservation action does save a real, countable amount.",
        "Explains that small actions repeated daily or by many people add up to a measurable effect.",
      ],
    },
  },
};
