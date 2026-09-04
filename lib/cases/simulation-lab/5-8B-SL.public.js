// Circuit Motor Test — Simulation Lab.
// TEKS 5.8B (Electrical Circuits & Energy Transformations — "Demonstrate
// that electrical energy in a complete circuit can transform into motion
// energy, light energy, sound energy, thermal energy," plus identifying
// the requirements for a functioning electrical circuit), Grade 5
// Science. Authored Sept 4, 2026 as part of the first grade-5 Science
// batch (see SimulationLab_Digital_Design_v1.md §5.4 for the
// grade-based rigor rubric this case is built to).
//
// Deliberately distinct from Grade 4's Circuit Brightness Test
// (4.8C-SL, electrical -> light energy): this case tests electrical ->
// MOTION energy (a spinning motor), the other transformation the
// standard explicitly lists, so the two cases don't just repeat the
// same circuit idea at a higher grade.
//
// Shape mirrors every other case exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "5.8B-SL",
  title: "Circuit Motor Test",
  grade: 5,
  subject: "Science",

  system: {
    title: "Circuit Motor Test",
    framing:
      "Cadet, Mission Control needs a spec sheet for the station's exhaust-fan motor. Does adding more batteries to the circuit change how fast the motor spins? You've got one motor, a battery dial, and a circuit. Run some trials, log what happens, and find the pattern.",
    question: "How does adding more batteries to a circuit change how fast the motor spins?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control needs a spec sheet for the station's exhaust-fan motor. Does adding more batteries to the circuit change how fast the motor spins?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same motor every trial (Round 1)",
        "Same wires every trial",
        "Same circuit setup every trial",
      ],
      testing: "Number of Batteries",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how fast the motor spins as you add more batteries?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "batteries", label: "Number of Batteries", min: 1, max: 9, step: 1, unit: " batteries" },
  ],

  outcome: {
    id: "speed",
    label: "Motor Speed",
    unit: "RPM",
    displayMin: 0,
    displayMax: 900,
  },

  // Round 1 — the smaller fan blade. Clean monotonic INCREASING trend
  // (more batteries = more electrical energy = faster spin).
  roundOne: {
    lookupTable: [
      { batteries: 1, speed: 100 },
      { batteries: 2, speed: 200 },
      { batteries: 3, speed: 300 },
      { batteries: 4, speed: 400 },
      { batteries: 5, speed: 500 },
      { batteries: 6, speed: 600 },
      { batteries: 7, speed: 700 },
      { batteries: 8, speed: 800 },
      { batteries: 9, speed: 900 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "bigger fan blade",

  // Round 2 — the motor gets a bigger fan blade attached right after
  // Checkpoint 1. Same increasing trend, but every speed is lower than
  // Round 1's at the same battery count — a bigger blade takes more
  // energy to spin at the same rate.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just attached a bigger fan blade to the motor. Same number of batteries — but does the pattern you found still hold?",
    lookupTable: [
      { batteries: 1, speed: 60 },
      { batteries: 2, speed: 120 },
      { batteries: 3, speed: 180 },
      { batteries: 4, speed: 240 },
      { batteries: 5, speed: 300 },
      { batteries: 6, speed: 360 },
      { batteries: 7, speed: 420 },
      { batteries: 8, speed: 480 },
      { batteries: 9, speed: 540 },
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
      prompt: "What do you think will happen to how fast the motor spins as you add more batteries?",
      choices: [
        { id: "increase", text: "It will spin faster." },
        { id: "decrease", text: "It will spin slower." },
        { id: "same", text: "It will spin about the same speed." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how fast the motor spins as you add more batteries?",
      choices: [
        { id: "increase", text: "It spins faster." },
        { id: "decrease", text: "It spins slower." },
        { id: "same", text: "It spins about the same speed." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "fillBlank",
      prompt: "Compare Round 1 and Round 2. For the same number of batteries, the motor with the bigger fan blade spun ____ than the motor with the smaller blade.",
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 30,
    instructions:
      "You've tested some battery counts with the bigger fan blade, but not all of them. Pick a battery count you never tried this round, and predict the motor's speed — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-5 rigor (design doc §5.4): full paragraph, can compare two
  // rounds and cite both — stems are light/optional.
  responseStems: [
    "As more batteries were added, the motor's speed ___.",
    "For example, with ___ batteries in Round 1, the speed was ___ RPM.",
    "Once the bigger fan blade was attached in Round 2, the pattern ___ — for example, with the same ___ batteries, the speed was only ___ RPM.",
    "This happens because ___.",
  ],

  generalizePrompt:
    "Explain what happens to the motor's speed as you add more batteries. Use a real example from Round 1, and also explain what stayed the same (or changed) about the pattern once the bigger fan blade was attached in Round 2 — cite a real example from that round too. Explain why you think this happens.",

  selfCheckQuestions: [
    "I explained what happens to the motor's speed as batteries are added.",
    "I gave a real example from Round 1 (a number of batteries and the speed).",
    "I gave a real example from Round 2 with the bigger fan blade.",
    "I explained WHY I think this happens, not just what happened.",
    "I wrote a full paragraph, not just one or two sentences.",
    "I read back over what I wrote before submitting.",
  ],
};
