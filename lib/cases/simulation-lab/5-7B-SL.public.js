// Balloon Rocket Test — Simulation Lab.
// TEKS 5.7B (Force Investigation — "Design a simple experimental
// investigation that tests the effect of force on an object within a
// system," with the standard's own listed examples being "a car on a
// ramp" and "a balloon rocket on a string"), Grade 5 Science. Authored
// Sept 4, 2026 as part of the first grade-5 Science batch (see
// SimulationLab_Digital_Design_v1.md §5.4 for the grade-based rigor
// rubric this case is built to — grade 5: full paragraph, can compare
// two rounds and cite both, fillBlank checkpoints allowed).
//
// Shape mirrors every other case exactly — the Simulation Lab engine is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "5.7B-SL",
  title: "Balloon Rocket Test",
  grade: 5,
  subject: "Science",

  system: {
    title: "Balloon Rocket Test",
    framing:
      "Cadet, Mission Control is testing a balloon-powered supply line for the station's cargo bay — a balloon rocket riding a string. Does the amount of air force you put into the balloon change how far it travels? You've got one balloon on a string track. Run some trials, log what happens, and find the pattern.",
    question: "How does the amount of air you blow into the balloon change how far the rocket travels?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control is testing a balloon-rocket supply line for the cargo bay — a balloon riding a string track. Does the amount of air force in the balloon change how far it travels down the line?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same balloon every trial (Round 1)",
        "Same string track every trial",
        "Same launch point every trial",
      ],
      testing: "Breaths of Air",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how far the rocket travels as you blow more breaths of air into the balloon?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "breaths", label: "Breaths of Air", min: 2, max: 18, step: 2, unit: " breaths" },
  ],

  outcome: {
    id: "distance",
    label: "Distance Traveled",
    unit: "meters",
    displayMin: 0,
    displayMax: 10,
  },

  // Round 1 — the balloon as-is. Clean monotonic INCREASING trend (more
  // air force = more thrust = farther travel).
  roundOne: {
    lookupTable: [
      { breaths: 2, distance: 1 },
      { breaths: 4, distance: 2 },
      { breaths: 6, distance: 3 },
      { breaths: 8, distance: 4 },
      { breaths: 10, distance: 5 },
      { breaths: 12, distance: 6 },
      { breaths: 14, distance: 7 },
      { breaths: 16, distance: 8 },
      { breaths: 18, distance: 9 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "heavier balloon",

  // Round 2 — a weight gets taped to the balloon right after Checkpoint 1.
  // Same increasing trend, but every distance is shorter than Round 1's at
  // the same number of breaths — more mass to push means less distance
  // for the same amount of force.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just taped a small weight to the balloon rocket. Same breaths of air — but does the pattern you found still hold?",
    lookupTable: [
      { breaths: 2, distance: 0.5 },
      { breaths: 4, distance: 1 },
      { breaths: 6, distance: 1.5 },
      { breaths: 8, distance: 2 },
      { breaths: 10, distance: 2.5 },
      { breaths: 12, distance: 3 },
      { breaths: 14, distance: 3.5 },
      { breaths: 16, distance: 4 },
      { breaths: 18, distance: 4.5 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Grade-5 rigor allows fillBlank (design doc §5.4).
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to how far the rocket travels as you blow more breaths of air into it?",
      choices: [
        { id: "increase", text: "It will travel farther." },
        { id: "decrease", text: "It will travel a shorter distance." },
        { id: "same", text: "It will travel about the same distance." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how far the rocket travels as you add more breaths of air?",
      choices: [
        { id: "increase", text: "It travels farther." },
        { id: "decrease", text: "It travels a shorter distance." },
        { id: "same", text: "It travels about the same distance." },
      ],
    },
    // Scene flow only (see `scene` below): the fair-test check asked right
    // after cp1. The original console client never shows it and the submit
    // route never scores it for that client.
    {
      id: "fair",
      phase: "round1",
      type: "mc",
      sceneOnly: true,
      prompt: "Scientists change just ONE thing at a time. Which one did YOU change between runs?",
      choices: [
        { id: "balloon", text: "Which balloon we used", icon: "balloon" },
        { id: "breaths", text: "How many breaths of air", icon: "pump" },
        { id: "string", text: "Which string track we used", icon: "string" },
        { id: "start", text: "Where the rocket started", icon: "start" },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "fillBlank",
      prompt: "Compare Round 1 and Round 2. For the same number of breaths, the heavier balloon rocket traveled ____ than the lighter one.",
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 0.5,
    instructions:
      "You've tested some breath counts with the heavier balloon, but not all of them. Pick a number of breaths you never tried this round, and predict how far the rocket would travel — use the pattern in your own data to make your best prediction.",
  },

  // Scene-based Simulation Lab (Sept 24, 2026) — having this block is what
  // switches the case from the console client to the animated scene flow
  // (components/simulation-lab/README.md). Delete the block to switch back.
  // Flow: 3 Round 1 runs -> cp1 (pattern) -> fair (fair test) -> twist ->
  // one prediction at a given setting + 1 free Round 2 run -> explain.
  scene: {
    id: "balloon",
    r1Runs: 3,
    r2Runs: 2,
    predictSetting: 10,
    snap: 0.5,
    unit: "m",
    outcomeAxis: "Meters",
    variableAxis: "Breaths of air",
    checkpointIds: ["cp1", "fair"],
    choiceIcons: { cp1: { increase: "up", decrease: "down", same: "flat" } },
    twist: {
      type: "weight",
      banner: "Conditions change!",
      question: "The rocket has a weight on it now. Does your pattern still hold?",
    },
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-5 rigor (design doc §5.4): full paragraph, can compare two
  // rounds and cite both — stems are light/optional, not carrying the
  // whole sentence the way grade 3's do.
  responseStems: [
    "As I blew more breaths of air into the balloon, the distance it traveled ___.",
    "For example, with ___ breaths in Round 1, it traveled ___ meters.",
    "Once the balloon got heavier in Round 2, the pattern ___ — for example, with the same ___ breaths, it only traveled ___ meters.",
    "This happens because ___.",
  ],

  generalizePrompt:
    "Explain what happens to how far the balloon rocket travels as you blow more breaths of air into it. Use a real example from Round 1, and also explain what stayed the same (or changed) about the pattern once the balloon got heavier in Round 2 — cite a real example from that round too. Explain why you think this happens.",

  selfCheckQuestions: [
    "I explained what happens to the distance as more breaths of air are added.",
    "I gave a real example from Round 1 (a number of breaths and the distance).",
    "I gave a real example from Round 2 with the heavier balloon.",
    "I explained WHY I think this happens, not just what happened.",
    "I wrote a full paragraph, not just one or two sentences.",
    "I read back over what I wrote before submitting.",
  ],
};
