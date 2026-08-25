// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).

export const SERVER_CASE = {
  standard: "5.10D-SC",
  title: "The Inherited Trait Post",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies fur color as inherited.",
        "Uses evidence that it matched parents / was present at birth.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies ear shape as inherited.",
        "Uses evidence that it matched the breed / was present at birth.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "Identifies sitting on command as learned, not inherited.",
        "Uses evidence that it required repeated training.",
      ],
    },
    D: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies scent trailing as inherited (instinct).",
        "Distinguishes instinct (inherited, no training needed) from a trained command.",
      ],
    },
  },
};
