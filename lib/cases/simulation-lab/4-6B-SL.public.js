// Dissolving Station — Simulation Lab.
// TEKS 4.6B (Mixtures & Solutions — "Investigate and compare a variety of
// mixtures, including solutions made from... solids in liquids"), Grade 4
// Science. Authored Sept 4, 2026 as part of the first grade-4 Science
// batch (see SimulationLab_Digital_Design_v1.md §5.4 for the grade-based
// rigor rubric this case is built to — grade 4: 2-3 sentences, one trial +
// a "why," lighter stem scaffolding, multiSelect checkpoints allowed).
//
// Shape mirrors the grade-3 cases exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js. This case
// is also the engine's first to use a multiSelect checkpoint (cp2),
// exercising schema support that existed since the v3 rebuild but had
// never actually been authored against until now.

export const PUBLIC_CASE = {
  standard: "4.6B-SL",
  title: "Dissolving Station",
  grade: 4,
  subject: "Science",

  system: {
    title: "Dissolving Station",
    framing:
      "Cadet, Mission Control's hydroponics lab needs a fast read on one thing: does changing the water's temperature change how much sugar can dissolve into it? You've got a beaker, a temperature dial, and a supply of sugar. Run some trials, log what happens, and find the pattern.",
    question: "How does changing the water's temperature change how much sugar dissolves into it?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control's hydroponics lab needs to know how fast nutrients dissolve into the water tanks at different temperatures. Does changing the water's temperature change how much sugar can dissolve into it before it stops?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same amount of water every trial",
        "Same stirring time every trial",
        "Same size sugar crystals every trial (Round 1)",
      ],
      testing: "Water Temperature",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how much sugar dissolves as the water gets hotter?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "temp", label: "Water Temperature", min: 10, max: 90, step: 10, unit: "°C" },
  ],

  outcome: {
    id: "dissolved",
    label: "Sugar Dissolved",
    unit: "grams",
    displayMin: 0,
    displayMax: 70,
  },

  // Round 1 — sugar. Clean monotonic INCREASING trend (hotter water
  // dissolves more sugar before it stops).
  roundOne: {
    lookupTable: [
      { temp: 10, dissolved: 20 },
      { temp: 20, dissolved: 25 },
      { temp: 30, dissolved: 30 },
      { temp: 40, dissolved: 35 },
      { temp: 50, dissolved: 40 },
      { temp: 60, dissolved: 45 },
      { temp: 70, dissolved: 50 },
      { temp: 80, dissolved: 55 },
      { temp: 90, dissolved: 60 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "salt instead of sugar",

  // Round 2 — the solute gets swapped for salt right after Checkpoint 1.
  // Same increasing trend, but every amount dissolved is lower than
  // Round 1's at the same temperature — salt is less soluble than sugar
  // at a given temperature.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just swapped in salt instead of sugar. Same temperatures — but does the pattern you found still hold?",
    lookupTable: [
      { temp: 10, dissolved: 15 },
      { temp: 20, dissolved: 18 },
      { temp: 30, dissolved: 21 },
      { temp: 40, dissolved: 24 },
      { temp: 50, dissolved: 27 },
      { temp: 60, dissolved: 30 },
      { temp: 70, dissolved: 33 },
      { temp: 80, dissolved: 36 },
      { temp: 90, dissolved: 39 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Grade-4 rigor allows multiSelect (design doc §5.4) — cp2 uses it here,
  // the engine's first authored use of this checkpoint type.
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to how much sugar dissolves as the water gets hotter?",
      choices: [
        { id: "increase", text: "More sugar will dissolve." },
        { id: "decrease", text: "Less sugar will dissolve." },
        { id: "same", text: "About the same amount will dissolve." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how much sugar dissolves as the water gets hotter?",
      choices: [
        { id: "increase", text: "More sugar dissolves." },
        { id: "decrease", text: "Less sugar dissolves." },
        { id: "same", text: "About the same amount dissolves." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "multiSelect",
      prompt: "Select all the statements that are true, based on your trials.",
      choices: [
        { id: "warmerMore", text: "Warmer water dissolved more sugar." },
        { id: "colderMore", text: "Colder water dissolved more sugar." },
        { id: "samePattern", text: "The same pattern happened when salt was used instead of sugar." },
        { id: "saltMore", text: "Salt dissolved more than sugar at every temperature." },
      ],
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 2,
    instructions:
      "You've tested some temperatures with salt, but not all of them. Pick a temperature you never tried this round, and predict how many grams would dissolve — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-4 rigor (design doc §5.4): 2-3 sentences, one trial + a "why,"
  // lighter stem scaffolding than grade 3.
  responseStems: [
    "As the water got hotter, the amount of sugar that dissolved ___.",
    "For example, at ___°C, ___ grams of sugar dissolved.",
    "This happens because ___.",
  ],

  generalizePrompt:
    "What happens to the amount of sugar that dissolves as the water gets hotter? Explain your answer using one real trial from your log, and explain why you think this happens.",

  selfCheckQuestions: [
    "I explained what happens to the amount dissolved as the water gets hotter.",
    "I gave one real example from my trials (a temperature and how much dissolved).",
    "I explained WHY I think this happens, not just what happened.",
    "I wrote more than one sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
