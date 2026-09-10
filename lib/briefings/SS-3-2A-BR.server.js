// Briefing SS-3-2A-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.

export const SERVER_BRIEFING = {
  id: "SS-3-2A-BR",
  title: "Why Communities Form",

  intelDrop: {
    minMeaningfulWords: 3,
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
    ],
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
    answers: {
      c1: "a",
      c2: "a",
      c3: "false",
      c4: "b",
    },
    c5Keywords: [
      "safe",
      "safety",
      "law",
      "rule",
      "food",
      "job",
      "home",
      "material",
      "well-being",
      "wellbeing",
      "live",
      "market",
      "security",
    ],
  },
};
