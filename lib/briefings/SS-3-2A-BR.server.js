// Briefing SS-3-2A-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.
// P3: Reason Sort hard/easy keys, Ops distractor fail, deferred reason check.

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

  reasonSort: {
    // itemId -> binId (2 easy + 2 hard per TEKS trio = 6)
    answers: {
      fire_safety: "security",
      school_zone: "security",
      meeting_house: "religious",
      holy_days: "religious",
      farm_market: "material",
      river_growth: "material",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    // Any 2 of these 3 TEKS projects pass; distractor in picks = fail.
    teksProjectIds: ["town_hall", "worship_land", "market_road"],
    distractorIds: ["toy_arcade"],
    projectReasonIds: {
      town_hall: "security",
      worship_land: "religious",
      market_road: "material",
    },
    requireDeferredReason: true,
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
      // c4 is dynamic-reuse; client may send expectedId (deferred / evidence inference).
      c4: null,
    },
    c4AcceptAnyReason: true,
    evidenceToReasonId: {
      "posted rules / firefighters / speed limits": "a",
      "place to worship freely": "b",
      "market, farms, jobs, homes": "c",
    },
    reasonIdToChoice: {
      security: "a",
      religious: "b",
      material: "c",
      "security and laws": "a",
      "religious freedom": "b",
      "material well-being": "c",
    },
  },
};
