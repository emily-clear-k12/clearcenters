// Magnet Pull Test — Simulation Lab.
// TEKS 3.7A (Forces — "acting on objects through contact or at a
// distance"), Grade 3 Science. Authored Sept 4, 2026 as part of the first
// grade-3 Science batch (see SimulationLab_Digital_Design_v1.md §5.4 for
// the grade-based rigor rubric this case is built to from the start).
//
// Shape mirrors 3-8B-SL.public.js exactly — SimulationLabClient.js is
// fully schema-driven, so no client code changes are needed beyond
// registering this case in index.public.js / index.server.js.

export const PUBLIC_CASE = {
  standard: "3.7A-SL",
  title: "Magnet Pull Test",
  grade: 3,
  subject: "Science",

  system: {
    title: "Magnet Pull Test",
    framing:
      "Cadet, Mission Control needs a fast read on one thing: does moving a magnet farther away change how many paperclips it can pull in? You've got one magnet, a pile of paperclips, and a distance dial. Run some trials, log what happens, and find the pattern.",
    question: "How does moving a magnet farther away change how many paperclips it holds?",
  },

  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Mission Control is testing magnetic tools for spacewalk repairs — tools that can grab loose metal parts without touching them. Engineers need to know: does moving a magnet farther from a pile of paperclips change how many it can pull in?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same magnet every trial (Round 1)",
        "Same paperclips every trial",
        "Same flat surface every trial",
      ],
      testing: "Distance From the Paperclips",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to the number of paperclips the magnet holds as you move it farther away?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "distance", label: "Distance From Paperclips", min: 1, max: 9, step: 1, unit: " cm" },
  ],

  outcome: {
    id: "paperclips",
    label: "Paperclips Held",
    unit: "paperclips",
    displayMin: 0,
    displayMax: 10,
  },

  // Round 1 — a smaller magnet. Clean monotonic DECREASING trend (farther
  // away = weaker pull = fewer paperclips).
  roundOne: {
    lookupTable: [
      { distance: 1, paperclips: 8 },
      { distance: 2, paperclips: 7 },
      { distance: 3, paperclips: 6 },
      { distance: 4, paperclips: 5 },
      { distance: 5, paperclips: 4 },
      { distance: 6, paperclips: 3 },
      { distance: 7, paperclips: 2 },
      { distance: 8, paperclips: 1 },
      { distance: 9, paperclips: 0 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  roundTwoLabel: "bigger magnet",

  // Round 2 — the magnet gets swapped for a bigger, stronger one right
  // after Checkpoint 1. Same decreasing trend, but every paperclip count
  // is higher than Round 1's at the same distance — a stronger magnet
  // pulls harder at any given range.
  roundTwo: {
    conditionChangeDescription:
      "Mission Control just gave you a bigger, stronger magnet. Same distances — but does the pattern you found still hold?",
    lookupTable: [
      { distance: 1, paperclips: 10 },
      { distance: 2, paperclips: 9 },
      { distance: 3, paperclips: 8 },
      { distance: 4, paperclips: 7 },
      { distance: 5, paperclips: 6 },
      { distance: 6, paperclips: 5 },
      { distance: 7, paperclips: 4 },
      { distance: 8, paperclips: 3 },
      { distance: 9, paperclips: 2 },
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
      prompt: "What do you think will happen to the number of paperclips the magnet holds as you move it farther away?",
      choices: [
        { id: "increase", text: "It will hold more paperclips." },
        { id: "decrease", text: "It will hold fewer paperclips." },
        { id: "same", text: "It will hold about the same number." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to the number of paperclips the magnet holds as it moves farther away?",
      choices: [
        { id: "increase", text: "It holds more paperclips." },
        { id: "decrease", text: "It holds fewer paperclips." },
        { id: "same", text: "It holds about the same number." },
      ],
    },
    {
      id: "cp2",
      phase: "postRound2",
      type: "dropdown",
      promptTemplate: "As the magnet moves farther away, the number of paperclips it holds ___.",
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
      "You've tested some distances with the bigger magnet, but not all of them. Pick a distance you never tried this round, and predict how many paperclips it would hold — use the pattern in your own data to make your best prediction.",
  },

  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Grade-3 rigor (design doc §5.4): one sentence, heavy stem scaffolding,
  // cite only one trial from one round.
  responseStems: [
    "As the magnet moved farther away, the number of paperclips it held ___.",
    "I tried a distance of ___ cm and the magnet held ___ paperclips.",
    "This shows that moving a magnet farther away makes it hold ___ paperclips.",
  ],

  generalizePrompt:
    "What happens to the number of paperclips a magnet holds as it moves farther away? Back it up with one real trial from your log — a distance you tried and how many paperclips it held.",

  selfCheckQuestions: [
    "I explained what happens to the number of paperclips as distance changes.",
    "I used the word 'distance' or 'magnet' in my sentence.",
    "I gave one real example from my trials (a distance and the number of paperclips).",
    "I used a sentence starter to help me write my sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
