// Boat Load Test — Simulation Lab.
// TEKS 3.6A (Physical Properties of Matter — "ability to sink or float in
// water"), Grade 3 Science. Authored Sept 4, 2026 as part of the first
// grade-3 Science batch (see SimulationLab_Digital_Design_v1.md §5.4 for
// the grade-based rigor rubric this case is built to from the start —
// unlike Ramp Test, which needed a retrofit).
//
// Shape mirrors 3-8B-SL.public.js exactly (pretrialSteps / variables /
// outcome / roundOne / roundTwo / checkpoints / dataTableStep /
// machineBackground / responseStems / generalizePrompt /
// selfCheckQuestions) — SimulationLabClient.js is fully schema-driven, so
// no client code changes are needed to add this case, only registering it
// in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "3.6A-SL",
  title: "Boat Load Test",
  grade: 3,
  subject: "Science",

  system: {
    title: "Boat Load Test",
    framing:
      "Cadet, Mission Control needs a fast read on one thing: does adding more cargo weight change how a boat sits in the water? You've got one boat, a stack of washers, and a weight dial. Run some trials, log what happens, and find the pattern.",
    question: "How does adding more cargo weight change how much of the boat stays above the water?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control needs cargo boats loaded for a supply run to the outpost. Add too much cargo and a boat can sit too low in the water. Does adding more weight change how much of the boat stays above the water?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same boat every trial",
        "Same size washers every trial",
        "Same water level every trial",
      ],
      testing: "Cargo Weight Added",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to the space above the water as you add more cargo weight?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "weight", label: "Cargo Weight Added", min: 0, max: 40, step: 5, unit: " washers" },
  ],

  outcome: {
    id: "freeboard",
    label: "Space Above the Water",
    unit: "cm",
    displayMin: 0,
    displayMax: 10,
  },

  // Round 1 — a narrow foil boat. Clean monotonic DECREASING trend (more
  // weight = less space above the water) — deliberately the opposite
  // direction from Ramp Test's increasing trend, for pattern variety.
  roundOne: {
    lookupTable: [
      { weight: 0, freeboard: 8 },
      { weight: 5, freeboard: 7 },
      { weight: 10, freeboard: 6 },
      { weight: 15, freeboard: 5 },
      { weight: 20, freeboard: 4 },
      { weight: 25, freeboard: 3 },
      { weight: 30, freeboard: 2 },
      { weight: 35, freeboard: 1 },
      { weight: 40, freeboard: 0 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Short label the console/trial-log headers show next to "ROUND 2".
  roundTwoLabel: "wider boat",

  // Round 2 — the boat gets swapped for a wider one right after Checkpoint
  // 1. Same decreasing trend, but every freeboard value is higher than
  // Round 1's at the same weight — a wider boat displaces more water, so
  // it starts with (and keeps) more space above the water at any given
  // weight. Gives Round 2 a real reason to exist, same pattern as Ramp
  // Test's heavier-ball swap.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just gave you a wider cargo boat. Same washers, same amounts — but does the pattern you found still hold?",
    lookupTable: [
      { weight: 0, freeboard: 10 },
      { weight: 5, freeboard: 9 },
      { weight: 10, freeboard: 8 },
      { weight: 15, freeboard: 7 },
      { weight: 20, freeboard: 6 },
      { weight: 25, freeboard: 5 },
      { weight: 30, freeboard: 4 },
      { weight: 35, freeboard: 3 },
      { weight: 40, freeboard: 2 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Checkpoint types restricted to mc/dropdown only — grade-3 rigor rule
  // (design doc §5.4): no multiSelect or fillBlank at this grade.
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to the space above the water as you add more cargo weight?",
      choices: [
        { id: "increase", text: "There will be more space above the water." },
        { id: "decrease", text: "There will be less space above the water." },
        { id: "same", text: "It will stay about the same." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to the space above the water as you add more cargo weight?",
      choices: [
        { id: "increase", text: "There is more space above the water." },
        { id: "decrease", text: "There is less space above the water." },
        { id: "same", text: "It stays about the same." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "dropdown",
      promptTemplate: "As you add more cargo weight, the space above the water ___.",
      choices: [
        { id: "increases", text: "increases" },
        { id: "decreases", text: "decreases" },
        { id: "staysSame", text: "stays the same" },
        { id: "isRandom", text: "changes randomly" },
      ],
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 1,
    instructions:
      "You've tested some weights with the wider boat, but not all of them. Pick a weight you never tried this round, and predict how much space would be above the water — use the pattern in your own data to make your best prediction.",
  },

  // Shared "machine console" background image — same reusable asset every
  // Simulation Lab case uses (see 3-8B-SL.public.js's comment); not
  // case-specific art.
  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-3 rigor (design doc §5.4): one sentence, heavy stem scaffolding,
  // cite only one trial from one round.
  responseStems: [
    "When more cargo weight was added, the space above the water ___.",
    "I tried ___ washers and there was ___ cm of space above the water.",
    "This shows that more weight makes the boat sit ___.",
  ],

  generalizePrompt:
    "What happens to the space above the water as you add more cargo weight? Back it up with one real trial from your log — how much weight you added and how much space was left.",

  selfCheckQuestions: [
    "I explained what happens to the space above the water as weight is added.",
    "I used the word 'weight' or 'cargo' in my sentence.",
    "I gave one real example from my trials (a weight amount and the space I saw).",
    "I used a sentence starter to help me write my sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
