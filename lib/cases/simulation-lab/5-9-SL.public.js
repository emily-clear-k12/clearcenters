// Shadow Tracker — Simulation Lab.
// TEKS 5.9 (Earth's Rotation, Day/Night & Shadows — "Demonstrate that
// Earth rotates on its axis approximately once every 24 hours and
// explain how Earth's rotation causes... the apparent movement of the
// Sun across the sky, changes in the position of shadows, changes in
// the shape of shadows"), Grade 5 Science. Authored Sept 4, 2026 as
// part of the first grade-5 Science batch (see
// SimulationLab_Digital_Design_v1.md §5.4 for the grade-based rigor
// rubric this case is built to).
//
// This is the engine's first Earth & Space case. Scope note: the real
// standard covers a full 24-hour day/night cycle, but the Simulation
// Lab engine needs a single monotonic trend per round (its checkpoints
// ask "does this go up, down, or stay the same," and a full day's
// shadow length isn't monotonic — it shortens toward solar noon, then
// lengthens again). So this case deliberately scopes to the MORNING
// window only (8:00 to noon), where shadow length shortens steadily as
// the Sun appears to climb higher — a genuine, TEKS-aligned slice of
// "Earth's rotation causes changes in the position/shape of shadows,"
// not the full day/night claim.
//
// Shape mirrors every other case exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "5.9-SL",
  title: "Shadow Tracker",
  grade: 5,
  subject: "Science",

  system: {
    title: "Shadow Tracker",
    framing:
      "Cadet, Mission Control needs to calibrate the research base's solar-panel tracker, and that means understanding how shadows change as the morning goes on. As Earth rotates and the Sun appears to climb higher in the sky, does a shadow get longer or shorter? You've got a measuring stick and a shadow gauge. Run some trials, log what happens, and find the pattern.",
    question: "As the morning goes on and the Sun appears to climb higher, how does a shadow's length change?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control needs to calibrate the research base's solar-panel tracker. As Earth rotates and the Sun appears to climb higher in the sky through the morning, does a shadow get longer or shorter?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same measuring stick every trial (Round 1)",
        "Same flat ground every trial",
        "Same spot every trial",
      ],
      testing: "Time of Morning",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to the shadow's length as the morning goes on, from 8:00 toward noon?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "hour", label: "Time of Morning", min: 8, max: 12, step: 1, unit: ":00" },
  ],

  outcome: {
    id: "shadowLength",
    label: "Shadow Length",
    unit: "feet",
    displayMin: 0,
    displayMax: 20,
  },

  // Round 1 — a measuring stick. Clean monotonic DECREASING trend (as
  // the morning goes on and the Sun appears to climb higher, the
  // shadow gets shorter).
  roundOne: {
    lookupTable: [
      { hour: 8, shadowLength: 12 },
      { hour: 9, shadowLength: 9 },
      { hour: 10, shadowLength: 6 },
      { hour: 11, shadowLength: 4 },
      { hour: 12, shadowLength: 3 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "a taller flagpole",

  // Round 2 — swap the stick for a taller flagpole right after
  // Checkpoint 1. Same decreasing trend, but every shadow is longer than
  // Round 1's at the same time of morning — a taller object casts a
  // longer shadow at the same Sun angle.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just swapped your measuring stick for the base's tall flagpole. Same times of morning — but does the pattern you found still hold?",
    lookupTable: [
      { hour: 8, shadowLength: 20 },
      { hour: 9, shadowLength: 15 },
      { hour: 10, shadowLength: 10 },
      { hour: 11, shadowLength: 7 },
      { hour: 12, shadowLength: 5 },
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
      prompt: "What do you think will happen to the shadow's length as the morning goes on, from 8:00 toward noon?",
      choices: [
        { id: "increase", text: "It will get longer." },
        { id: "decrease", text: "It will get shorter." },
        { id: "same", text: "It will stay about the same." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to the shadow's length as the morning goes on?",
      choices: [
        { id: "increase", text: "It gets longer." },
        { id: "decrease", text: "It gets shorter." },
        { id: "same", text: "It stays about the same." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "fillBlank",
      prompt: "Compare Round 1 and Round 2. At the same time of morning, the tall flagpole's shadow was ____ than the measuring stick's shadow.",
    },
  ],

  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 1,
    instructions:
      "You've tested some times of morning with the flagpole, but not all of them. Pick a time you never tried this round, and predict the shadow's length — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-5 rigor (design doc §5.4): full paragraph, can compare two
  // rounds and cite both — stems are light/optional.
  responseStems: [
    "As the morning went on, the shadow's length ___.",
    "For example, at ___:00 in Round 1, the shadow was ___ feet long.",
    "Once I switched to the flagpole in Round 2, the pattern ___ — for example, at the same ___:00, the shadow was ___ feet long instead.",
    "This happens because Earth's rotation ___.",
  ],

  generalizePrompt:
    "Explain what happens to a shadow's length as the morning goes on and the Sun appears to climb higher in the sky. Use a real example from Round 1, and also explain what stayed the same (or changed) about the pattern once you measured the flagpole's shadow in Round 2 — cite a real example from that round too. Explain why Earth's rotation causes this.",

  selfCheckQuestions: [
    "I explained what happens to shadow length as the morning goes on.",
    "I gave a real example from Round 1 (a time of morning and the shadow length).",
    "I gave a real example from Round 2 with the flagpole.",
    "I explained WHY this happens, connecting it to Earth's rotation, not just what happened.",
    "I wrote a full paragraph, not just one or two sentences.",
    "I read back over what I wrote before submitting.",
  ],
};
