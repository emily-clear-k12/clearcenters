// Briefing SS-3-2B-BR — SERVER ONLY answer keys / rubrics.
// Never import this from a client component.

export const SERVER_BRIEFING = {
  id: "SS-3-2B-BR",
  title: "How Communities Meet Needs",

  intelDrop: {
    minMeaningfulWords: 1,
    acceptChipOnly: true,
    passKeywords: [
      "need",
      "rule",
      "school",
      "learn",
      "message",
      "news",
      "play",
      "park",
      "road",
      "bus",
      "ferry",
      "government",
      "education",
      "communication",
      "transportation",
      "recreation",
      "food",
      "together",
      "community",
      "town",
    ],
    chipKeywords: {
      rules: ["rule", "government", "fair"],
      school: ["school", "education", "learn"],
      messages: ["message", "news", "communication"],
      "getting around": ["road", "bus", "ferry", "transportation"],
      play: ["play", "park", "recreation"],
      food: ["food", "need"],
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
      porch_meeting: "government",
      mayor_office: "government",
      walk_school: "education",
      school_bus: "education",
      wagon_road: "transportation",
      river_ferry: "transportation",
    },
  },

  opsChoice: {
    requirePickCount: 2,
    teksProjectIds: ["gov_compare", "edu_compare", "transport_compare"],
    distractorIds: ["snack_statue"],
    projectReasonIds: {
      gov_compare: "government",
      edu_compare: "education",
      transport_compare: "transportation",
    },
    requireDeferredReason: true,
    chipsOnlyOk: true,
    justificationKeywords: [
      "same",
      "different",
      "school",
      "bus",
      "walk",
      "road",
      "ferry",
      "mayor",
      "meeting",
      "later",
      "third",
      "need",
      "compare",
    ],
  },

  evidenceDrop: {
    mustInclude: [
      "Names one TEKS need accurately (government, education, or transportation)",
      "Compares Maple Crossing and Cloudreach (different ways, same need)",
      "Evidence/example matches that need (not mismatched)",
    ],
    reasonMatch: {
      government: ["meeting", "mayor", "office", "rules", "fair"],
      education: ["school", "walk", "bus", "learn", "kids"],
      transportation: ["wagon", "road", "ferry", "river", "around"],
    },
    scoreGuide: {
      2: "need + matching compare (both towns)",
      1: "need without compare, or compare without clear need",
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
      "town meeting vs mayor's office": "a",
      "walk to school vs school bus": "b",
      "wagon road vs river ferry": "c",
    },
    reasonIdToChoice: {
      government: "a",
      education: "b",
      transportation: "c",
    },
  },
};
