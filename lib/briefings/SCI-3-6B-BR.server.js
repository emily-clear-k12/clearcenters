// Briefing SCI-3-6B-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.

export const SERVER_BRIEFING = {
  id: "SCI-3-6B-BR",
  title: "Solid, Liquid, or Gas?",

  intelDrop: {
    minMeaningfulWords: 1,
    acceptChipOnly: true,
    passKeywords: [
      "matter",
      "same",
      "thing",
      "stuff",
      "solid",
      "liquid",
      "gas",
      "shape",
      "wet",
      "food",
    ],
    chipKeywords: {
      wet: ["wet", "water"],
      food: ["food"],
      matter: ["matter", "stuff", "thing"],
      "the same shape": ["shape", "same"],
    },
  },

  fieldBrief: {
    quickChecks: {
      qc1: "a",
      qc2: "b",
      qc3: "b",
    },
  },

  reasonSort: {
    answers: {
      creek_rock: "solid",
      sand_jar: "solid",
      water_cup: "liquid",
      honey_drip: "liquid",
      balloon_air: "gas",
      balloon_hiss: "gas",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    teksProjectIds: ["block_box", "pour_jars", "bag_to_bottle"],
    distractorIds: ["gold_stars"],
    projectReasonIds: {
      block_box: "solid",
      pour_jars: "liquid",
      bag_to_bottle: "gas",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "shape",
      "solid",
      "liquid",
      "gas",
      "keep",
      "container",
      "later",
      "third",
      "test",
    ],
  },

  evidenceDrop: {
    mustInclude: [
      "Names one kind accurately (solid, liquid, or gas)",
      "Says how they know from shape",
      "Evidence/example matches that kind (not mismatched)",
    ],
    reasonMatch: {
      solid: ["keep", "shape", "block", "rock", "box"],
      liquid: ["pour", "jar", "water", "honey", "container"],
      gas: ["fill", "air", "balloon", "bottle", "bag"],
    },
    scoreGuide: {
      2: "kind + matching shape clue",
      1: "kind without clue, or clue without clear kind",
      0: "blank / off-topic",
    },
  },

  clearance: {
    answers: {
      c1: "a",
      c2: "a",
      c3: "false",
      c4: null,
    },
    c4AcceptAnyReason: true,
    evidenceToReasonId: {
      "it kept its own shape": "a",
      "it took the shape of the jar": "b",
      "it filled the whole container": "c",
    },
    reasonIdToChoice: {
      solid: "a",
      liquid: "b",
      gas: "c",
    },
  },
};
