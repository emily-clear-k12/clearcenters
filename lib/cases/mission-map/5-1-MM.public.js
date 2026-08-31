// Mission Map — "Solve the Derby Track Mystery" — Grade 5 Science.
//
// Built Aug 31 (v1) as Mission Map's first Grade 5 case, alongside its first
// Grade 4 case (4-1-MM). Deliberately Force/Energy, not another Organisms &
// Environments topic — see 4-1-MM.public.js's header for the full reasoning.
//
// TEKS CHECKED FIRST (ClearCenters_STATE.md §9 rule 11), against the real
// PDF: **5.7A — Equal & Unequal Forces** ("Investigate and explain how equal
// and unequal forces acting on an object cause: patterns of motion; transfer
// of energy") and **5.7B — Force Investigation** ("Design a simple
// experimental investigation that tests the effect of force on an object
// within a system" — the PDF's own named examples are "a car on a ramp" and
// "a balloon rocket on a string," both of which this case uses directly).
// Scope was kept deliberately inside 5.7, not 5.8 (Energy Transformations /
// Electrical Circuits / Light) — every checkpoint is about force causing a
// pattern of motion or a fair test of force, never about energy converting
// between forms, which is a different standard for a different case.
//
// Standard note: "5.7A"/"5.7B" are already real `cases` table rows for a
// different engine (Group Chat — "The Dog Walk Standoff" / "The Paper
// Airplane Contest"; see add_new_cases.sql). Mission Map's own
// `<grade>.<concept>-MM` numbering (same convention as 3-1-MM, 4-1-MM) keeps
// this case's `standard` string ("5.1-MM") from colliding with that existing
// row, since `cases.standard` is the table's primary key.
//
// Uses the same grade-4/5 free-text reasoning box as 4-1-MM (v8 addition to
// MissionMapClient.js) instead of grade ≤3's tap-a-chip mechanic.

export const PUBLIC_CASE = {
  standard: "5.1-MM",
  teksLabel:
    "TEKS 5.7A & 5.7B — Equal & Unequal Forces / Force Investigation (Texas Grade 5 Science; checked against the real, current TEKS document Emily supplied — see ClearCenters_STATE.md §9 rule 11 — before any content was written, not after)",
  grade: 5,
  subject: "Science",
  title: "Solve the Derby Track Mystery",
  tagline: "Two derby teams can't agree on why one car keeps winning. Investigate the force evidence and settle it.",

  mission: {
    briefText:
      "This weekend is Derby Day at Westbrook Elementary — teams race cardboard cars down a ramp. Team Comet keeps winning, and Team Blaze thinks the ramp itself is rigged. Walk the test track, study real force-and-motion evidence at each stop, and figure out what's actually causing the different results — then help design a fair test to check it.",
    goal: "Explain how equal and unequal forces affect an object's motion and energy transfer, and design a fair test to check a claim about force.",
  },

  mapImage: "/mission-map/5-1-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 72 },
      prompt: "Stop 1: Both cars started from rest at the same ramp height. Why did Comet's car go farther?",
      evidence: {
        type: "data",
        label: "TRACK INSPECTION — BOTH CARS",
        text: "Team Comet's car has smooth plastic wheels that spin freely on the axle. Team Blaze's car has rough cardboard wheels that drag against the axle every time they spin.",
      },
      choices: [
        { id: "a", text: "Comet's smoother wheels meant less force was working against its motion, so it kept moving farther" },
        { id: "b", text: "Comet's car is painted a faster color" },
        { id: "c", text: "Comet's team must have pushed the car at the starting line" },
        { id: "d", text: "Distance traveled has nothing to do with the forces acting on the car" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Comet's smoother wheels meant less force (friction) worked against its motion than Blaze's dragging wheels.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stop 2: The team ran the SAME car down three different ramp heights. What pattern shows up?",
      evidence: {
        type: "data",
        label: "RAMP HEIGHT TEST — SAME CAR",
        text: "Ramp at 10 cm: the car traveled 40 cm. Ramp at 20 cm: the car traveled 85 cm. Ramp at 30 cm: the car traveled 130 cm.",
      },
      choices: [
        { id: "a", text: "As ramp height increases, the car travels farther each time" },
        { id: "b", text: "Ramp height doesn't change how far the car travels" },
        { id: "c", text: "As ramp height increases, the car travels a shorter distance" },
        { id: "d", text: "The car travels the same distance no matter what, since it's the same car" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Raising the ramp height increased the force pulling the car down the ramp, and the car traveled farther each time.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Stop 3: Team Blaze says the ramp itself is rigged. Does the measurement evidence back that up?",
      evidence: {
        type: "passage",
        label: "FIELD NOTE — TRACK JUDGE",
        text: "\"I measured both starting spots with a ruler and a protractor before every race. Both cars start at the exact same height and the exact same angle, every single time.\"",
      },
      secondEvidence: {
        type: "passage",
        label: "FIELD NOTE — TEAM BLAZE",
        text: "\"The ramp must be tilted more on Comet's side — that's the only way they keep winning.\"",
      },
      choices: [
        { id: "a", text: "The judge's note holds up — the ramp is measured equal for both cars, so the wheels are the more likely cause" },
        { id: "b", text: "Team Blaze's note holds up — the ramp really must be uneven" },
        { id: "c", text: "Both notes could be true at the same time" },
        { id: "d", text: "There's no way to check either claim" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The track judge's measurements ruled out a rigged ramp — both cars start at the same height and angle every time.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: What if one car got a small extra push at the starting line?",
      // Predict-then-reveal, same mechanic 3-1-MM and 4-1-MM use — grounds
      // "unequal forces" directly in a concrete before/after guess instead
      // of only defining the term.
      predictBeforeEvidence: {
        question: "Before you see the trial results: if one car gets a small extra push at the start (an unequal force) while the other doesn't, what do you predict?",
        options: [
          { id: "same", text: "Both cars will still travel the same distance" },
          { id: "pushed_farther", text: "The pushed car will travel farther" },
          { id: "pushed_less", text: "The pushed car will actually travel less far" },
        ],
        correctOptionId: "pushed_farther",
      },
      evidence: {
        type: "data",
        label: "PUSH-START TRIAL",
        text: "Two identical cars were released together. Car X got a small extra push at the start. Car Y was released with no push. Car X traveled 150 cm. Car Y traveled 95 cm.",
      },
      choices: [
        { id: "a", text: "The extra push was an unequal force that gave Car X more energy of motion, so it traveled farther" },
        { id: "b", text: "Car X traveled farther because it's simply a better car" },
        { id: "c", text: "The push made no real difference — 150 cm and 95 cm are basically the same" },
        { id: "d", text: "Car Y should have traveled farther since it started \"clean\"" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "An unequal force — the extra push — gave Car X more energy of motion, so it traveled farther than Car Y.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: The derby also uses balloon rockets on a string as a warm-up event. Which trial actually shows that more force means more distance?",
      evidence: {
        type: "data",
        label: "BALLOON ROCKET TRIALS",
        text: "Trial 1: balloon blown up a little, rocket traveled 1 meter along the string. Trial 2: balloon blown up halfway, rocket traveled 2.5 meters. Trial 3: balloon blown up all the way, rocket traveled 4 meters.",
      },
      choices: [
        { id: "a", text: "All three trials together — more air (more force pushing out) meant more distance traveled each time" },
        { id: "b", text: "Only Trial 3 counts, since it went the farthest" },
        { id: "c", text: "Only Trial 1 counts, since it's the smallest test" },
        { id: "d", text: "None of the trials show a pattern, since balloons aren't cars" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The balloon rocket trials showed the same force pattern as the cars — more force (air pushing out) meant more distance traveled.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: The teams want ONE fair test to settle the wheel argument for good. Which test design actually works?",
      evidence: {
        type: "passage",
        text: "The teams are choosing between four ways to test whether the wheels really are the reason Comet keeps winning.",
      },
      choices: [
        { id: "a", text: "Swap only the wheels between the two cars, and keep the ramp height, angle, and everything else exactly the same" },
        { id: "b", text: "Race the cars again on the same day, with everything unchanged" },
        { id: "c", text: "Swap the wheels AND add extra weight to Blaze's car at the same time" },
        { id: "d", text: "Let each team pick their own separate ramp to race on" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The one fair test: swap only the wheels and keep every other part of the setup exactly the same — a true one-variable-at-a-time test.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain what really caused Team Comet's car to keep winning — and describe the fair test that would prove it once and for all. Your answer should: (1) explain how force differences (like friction or an added push) can cause different patterns of motion, even when two objects start the same way, (2) use your evidence to explain what actually caused Comet's car to go farther, not just guess, and (3) describe the one-variable-at-a-time test that would fairly settle the argument between the two teams.",

  responseStems: [
    "An unequal force, like ___, can cause two objects to move differently even if they start the same way.",
    "The evidence that actually explains why Comet's car went farther is ___.",
    "A fair test to settle this would be to change only ___ and keep everything else the same.",
  ],

  selfCheckQuestions: [
    "I explained how an unequal force can cause a different pattern of motion.",
    "I used real evidence from my case file to explain why Comet's car went farther, not just a guess.",
    "I described a test that only changes one thing at a time.",
    "I explained why changing more than one thing at once wouldn't be a fair test.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
