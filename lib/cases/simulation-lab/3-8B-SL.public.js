// Ramp Test — Simulation Lab's first case.
// TEKS 3.8B (Speed & Mechanical Energy), Grade 3 Science.
// See SimulationLab_Digital_Design_v1.md §6-7 for the TEKS-verification
// rationale and the v2 checkpoint/data-table enhancement this schema builds.
//
// The lookupTable below is the case's "physics," not a hidden answer key —
// Simulation Lab's shared console component needs it client-side to animate
// the gauge to the real value on every Run, the same way Signal Check's
// public case ships its full source text. What IS kept server-only (see
// 3-8B-SL.server.js) is the checkpoint correct-answer keys and the final
// written-response rubric.

export const PUBLIC_CASE = {
  standard: "3.8B-SL",
  title: "Ramp Test",
  grade: 3,
  subject: "Science",

  system: {
    title: "Ramp Test",
    framing:
      "Cadet, Mission Control needs a fast read on one thing: does a ramp's angle change how far a ball rolls once it's launched? You've got one ramp, one ball, and an angle dial. Run some trials, log what happens, and find the pattern.",
    question: "How does changing the ramp's angle change how far the ball rolls?",
  },

  variables: [
    { id: "angle", label: "Ramp Angle", min: 10, max: 50, step: 10, unit: "°" },
  ],

  outcome: {
    id: "distance",
    label: "Distance Rolled",
    unit: "floor tiles",
    displayMin: 0,
    displayMax: 14,
  },

  // angle -> distance, a clean monotonic-increasing trend on purpose (see
  // §6 of the design doc) so every checkpoint and the final generalize step
  // has one clearly correct pattern to find in this first case.
  lookupTable: [
    { angle: 10, distance: 2 },
    { angle: 20, distance: 4 },
    { angle: 30, distance: 6 },
    { angle: 40, distance: 9 },
    { angle: 50, distance: 12 },
  ],

  minTrialsForCheckpoint1: 3,
  minTrialsForDataTable: 6,

  // Checkpoint correctness keys (correctChoiceId / acceptedAnswers) live in
  // the server case only — this public copy carries just what the student
  // needs to see and answer.
  checkpoints: [
    {
      id: "cp1",
      triggerAfterTrials: 3,
      type: "mc",
      prompt: "So far, what happens to the distance the ball rolls as the ramp gets steeper?",
      choices: [
        { id: "increase", text: "It rolls farther." },
        { id: "decrease", text: "It rolls a shorter distance." },
        { id: "same", text: "It rolls about the same distance every time." },
      ],
    },
    {
      id: "cp2",
      triggerAfterTrials: 6,
      type: "fillBlank",
      prompt: "As the ramp angle gets steeper, the distance the ball rolls ___.",
      placeholder: "type your answer",
    },
  ],

  dataTableStep: {
    triggerAfterTrials: 6,
    blankedField: "distance",
    rowSelection: "firstMiddleLast",
    instructions:
      "Here's a look back at some of your own trials. Fill in the distance you actually logged for each one.",
  },

  responseStems: [
    "When the ramp angle went up, the distance the ball rolled ___.",
    "I know this because my trials showed ___.",
    "A steeper ramp gives the ball more ___, so it rolls farther.",
  ],

  generalizePrompt:
    "You've run your trials — now explain the pattern you found. What happens to the distance the ball rolls as the ramp gets steeper? Back it up with a real trial from your own log (an angle you tried and the distance you saw).",

  selfCheckQuestions: [
    "I explained what happens to the distance as the ramp angle changes.",
    "I used the word 'angle' or 'steeper' in my explanation.",
    "I gave at least one real example from my own trials (an angle and a distance).",
    "My explanation matches the pattern I actually saw in the lab.",
    "I read back over what I wrote before submitting.",
  ],
};
