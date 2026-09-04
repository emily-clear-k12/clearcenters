// Ice Melt Race — Simulation Lab.
// TEKS 3.6C (Heating & Cooling Matter — "predict, observe, and record
// changes in the state of matter caused by heating or cooling, such as
// ice melting into liquid water"), Grade 3 Science. Authored Sept 4, 2026
// as part of the first grade-3 Science batch (see
// SimulationLab_Digital_Design_v1.md §5.4 for the grade-based rigor
// rubric this case is built to from the start).
//
// Shape mirrors 3-8B-SL.public.js exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "3.6C-SL",
  title: "Ice Melt Race",
  grade: 3,
  subject: "Science",

  system: {
    title: "Ice Melt Race",
    framing:
      "Cadet, Mission Control needs a fast read on one thing: does turning up a heat lamp change how fast an ice cube melts? You've got one heat lamp, one ice cube, and a temperature dial. Run some trials, log what happens, and find the pattern.",
    question: "How does turning up the heat lamp change how long it takes an ice cube to melt?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control is testing the station's heat lamps before a big supply thaw. Engineers need to know: does turning up a heat lamp change how fast an ice cube melts?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same size ice cube every trial (Round 1)",
        "Same starting temperature every trial",
        "Same distance from the lamp every trial",
      ],
      testing: "Heat Lamp Temperature",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to how long it takes the ice cube to melt as the heat lamp gets hotter?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "heat", label: "Heat Lamp Temperature", min: 20, max: 60, step: 5, unit: "°C" },
  ],

  outcome: {
    id: "meltTime",
    label: "Time to Melt",
    unit: "minutes",
    displayMin: 0,
    displayMax: 12,
  },

  // Round 1 — a smaller ice cube. Clean monotonic DECREASING trend
  // (hotter lamp = faster melt = less time).
  roundOne: {
    lookupTable: [
      { heat: 20, meltTime: 10 },
      { heat: 25, meltTime: 9 },
      { heat: 30, meltTime: 8 },
      { heat: 35, meltTime: 7 },
      { heat: 40, meltTime: 6 },
      { heat: 45, meltTime: 5 },
      { heat: 50, meltTime: 4 },
      { heat: 55, meltTime: 3 },
      { heat: 60, meltTime: 2 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "bigger ice cube",

  // Round 2 — the ice cube gets swapped for a bigger one right after
  // Checkpoint 1. Same decreasing trend, but every melt time is longer
  // than Round 1's at the same temperature — a bigger cube takes longer
  // to melt at any given heat setting.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just gave you a bigger ice cube. Same temperatures — but does the pattern you found still hold?",
    lookupTable: [
      { heat: 20, meltTime: 12 },
      { heat: 25, meltTime: 11 },
      { heat: 30, meltTime: 10 },
      { heat: 35, meltTime: 9 },
      { heat: 40, meltTime: 8 },
      { heat: 45, meltTime: 7 },
      { heat: 50, meltTime: 6 },
      { heat: 55, meltTime: 5 },
      { heat: 60, meltTime: 4 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Checkpoint types restricted to mc/dropdown only — grade-3 rigor rule.
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to how long it takes the ice cube to melt as the heat lamp gets hotter?",
      choices: [
        { id: "increase", text: "It will take longer to melt." },
        { id: "decrease", text: "It will take less time to melt." },
        { id: "same", text: "It will take about the same time." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to how long it takes the ice cube to melt as the heat lamp gets hotter?",
      choices: [
        { id: "increase", text: "It takes longer to melt." },
        { id: "decrease", text: "It takes less time to melt." },
        { id: "same", text: "It takes about the same time." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "dropdown",
      promptTemplate: "As the heat lamp gets hotter, the time it takes the ice cube to melt ___.",
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
      "You've tested some temperatures with the bigger ice cube, but not all of them. Pick a temperature you never tried this round, and predict how many minutes it would take to melt — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-3 rigor (design doc §5.4): one sentence, heavy stem scaffolding,
  // cite only one trial from one round.
  responseStems: [
    "As the heat lamp got hotter, the time it took to melt ___.",
    "I tried a temperature of ___°C and the ice cube melted in ___ minutes.",
    "This shows that a hotter heat lamp makes the ice melt ___.",
  ],

  generalizePrompt:
    "What happens to how long it takes the ice cube to melt as the heat lamp gets hotter? Back it up with one real trial from your log — a temperature you tried and how many minutes it took to melt.",

  selfCheckQuestions: [
    "I explained what happens to the melt time as the heat lamp gets hotter.",
    "I used the word 'heat' or 'temperature' in my sentence.",
    "I gave one real example from my trials (a temperature and the melt time).",
    "I used a sentence starter to help me write my sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
