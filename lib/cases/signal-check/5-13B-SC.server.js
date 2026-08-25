// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.13B, instinctual vs.
// learned BEHAVIOR only (no physical-trait statements — those belong to
// grade 4's 4.13B).

export const SERVER_CASE = {
  standard: "5.13B-SC",
  title: "The Dog Training Video",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies sitting on command as learned, not instinctual.",
        "Uses evidence that it required repeated training with treats.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies scent trailing as instinctual.",
        "Uses evidence that it appeared with zero training on the first try.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies the paw shake as learned.",
        "Uses evidence that it took repeated trainer practice.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies barking at the doorbell as instinctual.",
        "Uses evidence that it happened the very first time with no training.",
      ],
    },
  },
};
