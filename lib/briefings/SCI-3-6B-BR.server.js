// Briefing SCI-3-6B-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
//
// Sept 14, 2026 — rebuilt to match the light-review .public.js pack
// (intelDrop -> quickReview -> trueFalseReason -> labelPicture ->
// clearance). See that file's header comment for why.

export const SERVER_BRIEFING = {
  id: "SCI-3-6B-BR",
  title: "Solid, Liquid, or Gas?",

  intelDrop: {
    minMeaningfulWords: 1,
    acceptChipOnly: true,
    passKeywords: ["shape", "same", "matter", "solid", "liquid", "gas"],
    chipKeywords: {
      shape: ["shape"],
      color: ["color"],
      weight: ["weight", "heavy"],
      smell: ["smell"],
    },
  },

  quickReview: {
    quickCheck: {
      correct: "b",
      rightMessage: "Right — if it takes the shape of its container, it's a liquid, even a slow one like honey.",
      wrongMessage: "Honey still takes the shape of whatever jar it's in — that makes it a liquid, just a slow-pouring one.",
    },
  },

  // Built from teksguide.org's documented misconceptions for this
  // standard (see docs/briefings/teks-reference/SCI-3-6B.md).
  trueFalseReason: {
    answerKey: {
      s1: {
        isTrue: false,
        reason: "Sand and rice pour like a liquid, but each little piece is still its own solid.",
      },
      s2: {
        isTrue: true,
        reason: "That's the test HQ used on the rock — same shape, new box, still a solid.",
      },
      s3: {
        isTrue: false,
        reason: "A gas does have a shape — it just takes the shape of its container, like air filling a balloon.",
      },
      s4: {
        isTrue: true,
        reason: "Liquids and gases both take the shape of their container — that's what makes them different from solids.",
      },
    },
  },

  labelPicture: {
    answerKey: {
      h_rock: "w_solid",
      h_water: "w_liquid",
      h_air: "w_gas",
    },
  },

  clearance: {
    answers: {
      c1: "a",
      c2: "a",
      c3: "false",
      c4: "b",
    },
  },
};
