// Friction Test — Simulation Lab.
// TEKS 4.7 (Forces — "Plan and conduct descriptive investigations to
// explore patterns of forces acting on objects, including... friction"),
// Grade 4 Science. Authored Sept 4, 2026 as part of the first grade-4
// Science batch (see SimulationLab_Digital_Design_v1.md §5.4 for the
// grade-based rigor rubric this case is built to).
//
// Shape mirrors the grade-3 cases exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "4.7-SL",
  title: "Friction Test",
  grade: 4,
  subject: "Science",

  system: {
    title: "Friction Test",
    framing:
      "Cadet, Mission Control is testing cargo-sled surfaces for a supply run across the station. Does changing how rough the floor is change how far a sled slides before it stops? You've got one sled, a roughness dial, and a measuring line. Run some trials, log what happens, and find the pattern.",
    question: "How does changing the surface roughness change how far a sliding block travels?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control is testing cargo-sled surfaces for a supply run across the station's cargo bay floor. Does changing how rough the floor surface is change how far a sled slides before it stops?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same block every trial (Round 1)",
        "Same starting push every trial",
        "Same starting position every trial",
      ],
      testing: "Surface Roughness Level",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how far the block slides as the surface gets rougher?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "roughness", label: "Surface Roughness Level", min: 1, max: 9, step: 1, unit: "" },
  ],

  outcome: {
    id: "distance",
    label: "Distance Slid",
    unit: "cm",
    displayMin: 0,
    displayMax: 20,
  },

  // Round 1 — a smaller block. Clean monotonic DECREASING trend (a
  // rougher surface means more friction, so the block slides a shorter
  // distance).
  roundOne: {
    lookupTable: [
      { roughness: 1, distance: 18 },
      { roughness: 2, distance: 16 },
      { roughness: 3, distance: 14 },
      { roughness: 4, distance: 12 },
      { roughness: 5, distance: 10 },
      { roughness: 6, distance: 8 },
      { roughness: 7, distance: 6 },
      { roughness: 8, distance: 4 },
      { roughness: 9, distance: 2 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "heavier block",

  // Round 2 — the block gets swapped for a heavier one right after
  // Checkpoint 1. Same decreasing trend, but every distance is shorter
  // than Round 1's at the same roughness — a heavier block experiences
  // more friction force at any given surface.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just gave you a heavier block. Same roughness levels — but does the pattern you found still hold?",
    lookupTable: [
      { roughness: 1, distance: 14 },
      { roughness: 2, distance: 12 },
      { roughness: 3, distance: 10 },
      { roughness: 4, distance: 8 },
      { roughness: 5, distance: 6 },
      { roughness: 6, distance: 4 },
      { roughness: 7, distance: 3 },
      { roughness: 8, distance: 2 },
      { roughness: 9, distance: 1 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Grade-4 rigor allows multiSelect (design doc §5.4).
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to how far the block slides as the surface gets rougher?",
      choices: [
        { id: "increase", text: "It will slide farther." },
        { id: "decrease", text: "It will slide a shorter distance." },
        { id: "same", text: "It will slide about the same distance." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how far the block slides as the surface gets rougher?",
      choices: [
        { id: "increase", text: "It slides farther." },
        { id: "decrease", text: "It slides a shorter distance." },
        { id: "same", text: "It slides about the same distance." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "multiSelect",
      prompt: "Select all the statements that are true, based on your trials.",
      choices: [
        { id: "rougherShorter", text: "A rougher surface made the block slide a shorter distance." },
        { id: "rougherFarther", text: "A rougher surface made the block slide farther." },
        { id: "samePattern", text: "The same pattern happened with the heavier block." },
        { id: "heavierFarther", text: "The heavier block always slid farther than the lighter block at the same roughness." },
      ],
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 1,
    instructions:
      "You've tested some roughness levels with the heavier block, but not all of them. Pick a roughness level you never tried this round, and predict how far the block would slide — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-4 rigor (design doc §5.4): 2-3 sentences, one trial + a "why."
  responseStems: [
    "As the surface got rougher, the distance the block slid ___.",
    "For example, at a roughness level of ___, the block slid ___ cm.",
    "This happens because ___.",
  ],

  generalizePrompt:
    "What happens to how far the block slides as the surface gets rougher? Explain your answer using one real trial from your log, and explain why you think this happens.",

  selfCheckQuestions: [
    "I explained what happens to the sliding distance as the surface gets rougher.",
    "I gave one real example from my trials (a roughness level and a distance).",
    "I explained WHY I think this happens, not just what happened.",
    "I wrote more than one sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
