// Circuit Brightness Test — Simulation Lab.
// TEKS 4.8C (Electrical Circuits — "Demonstrate and describe how
// electrical energy travels through a closed path that can produce light
// energy, thermal energy"), Grade 4 Science. Authored Sept 4, 2026 as
// part of the first grade-4 Science batch (see
// SimulationLab_Digital_Design_v1.md §5.4 for the grade-based rigor
// rubric this case is built to).
//
// Shape mirrors the grade-3 cases exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "4.8C-SL",
  title: "Circuit Brightness Test",
  grade: 4,
  subject: "Science",

  system: {
    title: "Circuit Brightness Test",
    framing:
      "Cadet, Mission Control needs to know how many backup batteries a station light needs for an emergency. Does adding more batteries to the circuit change how bright the bulb glows? You've got one bulb, a battery dial, and a circuit. Run some trials, log what happens, and find the pattern.",
    question: "How does adding more batteries to a circuit change how bright the bulb glows?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control needs to know how many backup batteries a station light needs to shine bright enough for an emergency. Does adding more batteries to the circuit change how bright the bulb glows?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same bulb every trial (Round 1)",
        "Same wires every trial",
        "Same circuit setup every trial",
      ],
      testing: "Number of Batteries",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how bright the bulb is as you add more batteries?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "batteries", label: "Number of Batteries", min: 1, max: 9, step: 1, unit: " batteries" },
  ],

  outcome: {
    id: "brightness",
    label: "Bulb Brightness",
    unit: "brightness units",
    displayMin: 0,
    displayMax: 50,
  },

  // Round 1 — a smaller bulb. Clean monotonic INCREASING trend (more
  // batteries = more electrical energy = brighter bulb).
  roundOne: {
    lookupTable: [
      { batteries: 1, brightness: 5 },
      { batteries: 2, brightness: 10 },
      { batteries: 3, brightness: 15 },
      { batteries: 4, brightness: 20 },
      { batteries: 5, brightness: 25 },
      { batteries: 6, brightness: 30 },
      { batteries: 7, brightness: 35 },
      { batteries: 8, brightness: 40 },
      { batteries: 9, brightness: 45 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "bigger bulb",

  // Round 2 — the bulb gets swapped for a bigger one right after
  // Checkpoint 1. Same increasing trend, but every brightness is lower
  // than Round 1's at the same battery count — a bigger bulb needs more
  // power to reach the same brightness.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just gave you a bigger bulb. Same number of batteries — but does the pattern you found still hold?",
    lookupTable: [
      { batteries: 1, brightness: 3 },
      { batteries: 2, brightness: 6 },
      { batteries: 3, brightness: 9 },
      { batteries: 4, brightness: 12 },
      { batteries: 5, brightness: 15 },
      { batteries: 6, brightness: 18 },
      { batteries: 7, brightness: 21 },
      { batteries: 8, brightness: 24 },
      { batteries: 9, brightness: 27 },
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
      prompt: "What do you think will happen to how bright the bulb is as you add more batteries?",
      choices: [
        { id: "increase", text: "It will get brighter." },
        { id: "decrease", text: "It will get dimmer." },
        { id: "same", text: "It will stay about the same." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how bright the bulb is as you add more batteries?",
      choices: [
        { id: "increase", text: "It gets brighter." },
        { id: "decrease", text: "It gets dimmer." },
        { id: "same", text: "It stays about the same." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "multiSelect",
      prompt: "Select all the statements that are true, based on your trials.",
      choices: [
        { id: "moreBrighter", text: "Adding more batteries made the bulb brighter." },
        { id: "moreDimmer", text: "Adding more batteries made the bulb dimmer." },
        { id: "samePattern", text: "The same pattern happened with the bigger bulb." },
        { id: "biggerBrighter", text: "The bigger bulb was always brighter than the small bulb at the same number of batteries." },
      ],
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 2,
    instructions:
      "You've tested some battery counts with the bigger bulb, but not all of them. Pick a battery count you never tried this round, and predict how bright the bulb would be — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-4 rigor (design doc §5.4): 2-3 sentences, one trial + a "why."
  responseStems: [
    "As more batteries were added, the bulb's brightness ___.",
    "For example, with ___ batteries, the brightness was ___.",
    "This happens because ___.",
  ],

  generalizePrompt:
    "What happens to the bulb's brightness as you add more batteries? Explain your answer using one real trial from your log, and explain why you think this happens.",

  selfCheckQuestions: [
    "I explained what happens to the brightness as batteries are added.",
    "I gave one real example from my trials (a number of batteries and the brightness).",
    "I explained WHY I think this happens, not just what happened.",
    "I wrote more than one sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
