// Ramp Test — Simulation Lab's first case.
// TEKS 3.8B (Speed & Mechanical Energy), Grade 3 Science.
// See SimulationLab_Digital_Design_v1.md §10 for the v3 redesign this
// schema builds (Round 2 condition-flip, predict-an-untested-value data
// table, dropdown-format Checkpoint 2, richer image-backed pre-trial
// steps). §6-7 still cover the TEKS-verification rationale and the v2
// flow this replaces.
//
// The lookup tables below are the case's "physics," not a hidden answer
// key — Simulation Lab's shared console component needs them client-side
// to animate the gauge to the real value on every Run, the same way
// Signal Check's public case ships its full source text. What IS kept
// server-only (see 3-8B-SL.server.js) is the checkpoint correct-answer
// keys and the final written-response rubric — scoring is re-verified
// server-side to stop tampering, not because the numbers themselves are
// secret.

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

  // Pre-trial steps (new in v3) — Anchor/Stimulus, Choose Variables, and
  // Hypothesis, each with a supporting image slot. imageUrl is left null
  // until Emily supplies real art; the client renders these steps
  // text-only when imageUrl is absent (same graceful-degradation pattern
  // as Mission Map's mapImage). See design doc §10.2 (point 4) and §10.4
  // for why this engine now uses images at all — a deliberate, approved
  // reversal of the original "zero image assets" cost discipline.
  pretrialSteps: {
    anchor: {
      title: "Mission Briefing",
      text:
        "Every Cadet mission starts with a real problem. Mission Control just installed a new cargo chute on the station — a ramp that slides deliveries down into the receiving bay. Engineers need a fast read on one thing: does changing the ramp's angle change how far the cargo slides once it's launched?",
      imageUrl: null,
    },
    chooseVariables: {
      title: "Choose Your Variables",
      text:
        "In a fair test, only ONE thing changes between trials — everything else stays exactly the same every single time.",
      keepTheSame: [
        "Same ball every trial",
        "Same ramp material every trial",
        "Same starting position at the top of the ramp every trial",
      ],
      testing: "Ramp Angle",
      imageUrl: null,
    },
    hypothesis: {
      title: "Make a Hypothesis",
      text:
        "Before you run a single trial: what do YOU think will happen to the distance the ball rolls as the ramp gets steeper?",
      imageUrl: null,
    },
  },

  variables: [
    { id: "angle", label: "Ramp Angle", min: 10, max: 50, step: 5, unit: "°" },
  ],

  outcome: {
    id: "distance",
    label: "Distance Rolled",
    unit: "floor tiles",
    displayMin: 0,
    displayMax: 14,
  },

  // Round 1 — the ramp and ball as first introduced. Clean monotonic
  // increasing trend on purpose (see §6) so the pattern is unambiguous.
  // 9 possible angle settings (10°-50° step 5°); min/maxTrials below cap
  // well under that so a predict-an-untested-value data table always has
  // real untested settings to offer later.
  roundOne: {
    lookupTable: [
      { angle: 10, distance: 2 },
      { angle: 15, distance: 4 },
      { angle: 20, distance: 5 },
      { angle: 25, distance: 6 },
      { angle: 30, distance: 7 },
      { angle: 35, distance: 8 },
      { angle: 40, distance: 10 },
      { angle: 45, distance: 11 },
      { angle: 50, distance: 12 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Round 2 (new in v3) — one fixed condition flips for every student
  // right after Checkpoint 1: the ball gets swapped for a heavier one.
  // Same increasing trend (steeper still means farther) but every
  // distance is shorter than Round 1's at the same angle — a heavier
  // ball carries less speed off the same ramp. This gives Round 2 a real
  // reason to exist: does the relationship the student found in Round 1
  // still hold once something else about the system changes? See design
  // doc §10.2 (point 1) and §10.5.
  // Short label the console/trial-log headers show next to "ROUND 2" —
  // added when this became a multi-case engine (SimulationLabClient.js's
  // Console/TrialLog/finalUnlock headers used to hardcode "(heavier ball)"
  // directly, which was only ever true for this one case). Every case's
  // public schema should set this to whatever short phrase describes its
  // own Round 2 condition change.
  roundTwoLabel: "heavier ball",

  roundTwo: {
    conditionChangeDescription:
      "Mission Control just swapped in a heavier cargo ball. Same ramp, same angles — but does the pattern you found still hold?",
    lookupTable: [
      { angle: 10, distance: 1 },
      { angle: 15, distance: 2 },
      { angle: 20, distance: 3 },
      { angle: 25, distance: 4 },
      { angle: 30, distance: 5 },
      { angle: 35, distance: 6 },
      { angle: 40, distance: 7 },
      { angle: 45, distance: 8 },
      { angle: 50, distance: 9 },
    ],
    minTrials: 3,
    maxTrials: 5,
  },

  // Checkpoint correctness keys (correctChoiceId / correctChoiceIds /
  // acceptedAnswers) live in the server case only — this public copy
  // carries just what the student needs to see and answer. `phase` tells
  // the client where in the flow each checkpoint fires:
  //   "pretrial"   -> before Round 1's first trial (the hypothesis check)
  //   "round1"     -> mid-Round-1, after triggerAfterTrials trials logged
  //   "postRound2" -> after Round 2's minimum trials, before Generalize
  // `type` supports "mc", "dropdown", "multiSelect", and "fillBlank" —
  // Ramp Test uses mc for cp1 and dropdown for the hypothesis check and
  // cp2 (Emily's "support both, per case" decision, §10.2 point 3).
  checkpoints: [
    {
      id: "hyp",
      phase: "pretrial",
      type: "dropdown",
      prompt: "What do you think will happen to the distance the ball rolls as the ramp gets steeper?",
      choices: [
        { id: "increase", text: "It will roll farther." },
        { id: "decrease", text: "It will roll a shorter distance." },
        { id: "same", text: "It will roll about the same distance every time." },
      ],
    },
    {
      id: "cp1",
      phase: "round1",
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
      phase: "postRound2",
      type: "dropdown",
      promptTemplate: "As the ramp angle gets steeper, the distance the ball rolls ___.",
      choices: [
        { id: "increases", text: "increases" },
        { id: "decreases", text: "decreases" },
        { id: "staysSame", text: "stays the same" },
        { id: "isRandom", text: "changes randomly" },
      ],
    },
  ],

  // Data Table step (redesigned in v3) — the student no longer copies a
  // value already visible on their own trial strip. Instead they pick an
  // angle they never actually tested in Round 2 and predict its distance
  // by reading the pattern in their own data. The client computes which
  // angles are "untested" from the student's own Round 2 trial log
  // against variables[].min/max/step above (9 possible settings, at most
  // 5 tested, so at least 4 always remain to choose from). Graded
  // server-side against Round 2's real lookup table, with a small
  // tolerance since this is an extrapolation, not a lookup. See §10.2
  // (point 2) and §10.5.
  dataTableStep: {
    phase: "postRound2",
    targetRound: "roundTwo",
    tolerance: 1,
    instructions:
      "You've tested some angles with the heavier ball, but not all of them. Pick an angle you never tried this round, and predict how far the ball would roll — use the pattern in your own data to make your best prediction.",
  },

  // Shared "machine console" background image, per design doc §10.3.
  // Emily supplied the real art Sept 3 — a single reusable console
  // illustration (not case-specific) meant to sit behind every Simulation
  // Lab case's controls, not just Ramp Test's. The client positions the
  // real angle slider and the outcome/prediction readouts against this
  // exact image's layout (SimulationLabClient.js's CONSOLE_HOTSPOTS
  // constant) rather than per-case data, since the image and its layout
  // are shared across cases, not authored per case.
  machineBackground: {
    imageUrl: "/simulation-lab/console.jpg",
  },

  // Revised Sept 4, 2026 to true grade-3 rigor (see design doc §5.4 —
  // grade-based rigor rubric). Original v3 wording asked students to
  // synthesize BOTH rounds into one explanation ("two different balls
  // now" / "did the pattern hold after the ball got heavier") — that's a
  // condition-comparison task better suited to grade 5. Grade 3 only
  // needs: one sentence, one trial, from either round.
  responseStems: [
    "When the ramp angle got steeper, the distance the ball rolled ___.",
    "I tried an angle of ___° and the ball rolled ___ tiles.",
    "This shows that a steeper ramp makes the ball roll ___.",
  ],

  generalizePrompt:
    "What happens to the distance the ball rolls as the ramp gets steeper? Back it up with one real trial from your log — an angle you tried and the distance you saw.",

  selfCheckQuestions: [
    "I explained what happens to the distance as the ramp gets steeper.",
    "I used the word 'angle' or 'steeper' in my sentence.",
    "I gave one real example from my trials (an angle and the distance I saw).",
    "I used a sentence starter to help me write my sentence.",
    "I read back over what I wrote before submitting.",
  ],
};
