// Briefing SS-3-2A-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
// P1: chip-only intel pass, 4 clearance items (no open c5).

export const SERVER_BRIEFING = {
  id: "SS-3-2A-BR",
  title: "Why Communities Form",

  intelDrop: {
    // Chip-only claims still pass when chip maps to a known reason keyword.
    minMeaningfulWords: 1,
    acceptChipOnly: true,
    passKeywords: [
      "need",
      "safety",
      "safe",
      "rule",
      "law",
      "belief",
      "faith",
      "worship",
      "religion",
      "food",
      "home",
      "job",
      "money",
      "goods",
      "school",
      "help",
      "protect",
      "together",
      "community",
      "friends",
      "friend",
    ],
    chipKeywords: {
      safety: ["safety", "safe", "protect"],
      rules: ["rule", "law"],
      beliefs: ["belief", "faith", "worship", "religion"],
      "food/jobs": ["food", "job", "home", "goods", "money"],
      school: ["school"],
      friends: ["friend", "together", "community"],
    },
  },

  fieldBrief: {
    quickChecks: {
      qc1: "a",
      qc2: "b",
      qc3: "c",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // Chips alone are enough — free-text optional.
    chipsOnlyOk: true,
    justificationKeywords: [
      "safe",
      "safety",
      "rule",
      "law",
      "believe",
      "belief",
      "faith",
      "worship",
      "food",
      "home",
      "job",
      "goods",
      "material",
      "well-being",
      "wellbeing",
      "later",
      "third",
      "free",
    ],
  },

  evidenceDrop: {
    mustInclude: [
      "Names one of the three TEKS reasons accurately (security and laws, religious freedom, or material well-being)",
      "Evidence/example matches that reason (not mismatched)",
      "Uses the word community correctly (stretch)",
    ],
    reasonMatch: {
      "security and laws": ["rules", "firefighter", "speed", "safe", "law", "town hall"],
      "religious freedom": ["worship", "faith", "believe", "belief", "religion"],
      "material well-being": ["market", "farm", "job", "home", "food", "goods", "trade"],
    },
    scoreGuide: {
      2: "reason + matching evidence",
      1: "reason without evidence, or evidence without clear reason",
      0: "blank / off-topic",
    },
  },

  clearance: {
    // Four scored items — no open-response c5.
    answers: {
      c1: "a",
      c2: "a",
      c3: "false",
      // c4 is dynamic-reuse; client may send expectedId. Soft-pass if any TEKS reason chosen.
      c4: null,
    },
    c4AcceptAnyReason: true,
  },
};
