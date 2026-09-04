// Shadow Tracker — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 5.9, Grade 5 Science. Authored to grade-5 rigor (design doc §5.4)
// — full paragraph, can compare two rounds and cite both.

export const SERVER_CASE = {
  standard: "5.9-SL",
  title: "Shadow Tracker",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Decreasing: as the morning goes on (8:00 -> noon)
  // and the Sun appears to climb higher due to Earth's rotation, a
  // shadow's length decreases. (Scoped to the morning window on purpose
  // — see the scope note in the .public.js file for why a full 24-hour
  // day/night cycle isn't a fit for this engine's single-monotonic-trend
  // checkpoint mechanic.)
  trendDirection: "decreasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "decrease" },
    { id: "cp1", type: "mc", correctChoiceId: "decrease" },
    { id: "cp2", type: "fillBlank", acceptedAnswers: ["longer", "bigger", "greater", "more"] },
  ],

  mustInclude: [
    "States the relationship: as the morning goes on, the shadow gets shorter (the Sun appears higher in the sky due to Earth's rotation).",
    "References one real trial from Round 1 (an actual time of morning and the shadow length at that time).",
    "References one real trial or comparison from Round 2 (the flagpole), noting the pattern still held but shadows were longer at the same time of morning.",
    "Gives a reason connecting the pattern to Earth's rotation and the Sun's apparent position, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As the morning went on, the shadow's length decreased. For example, at 9:00 in Round 1, the measuring stick's shadow was 9 feet long, which was shorter than it was at 8:00. Once I switched to the flagpole in Round 2, the same pattern held — the shadow still got shorter as the morning went on — but every shadow was longer than Round 1 at the same time. At 9:00 in Round 2, the flagpole's shadow was 15 feet long. This happens because Earth is rotating, which makes the Sun appear to climb higher in the sky as the morning goes on, and a higher Sun angle makes shadows shorter.",

  aiContext:
    "Grade 5 Science, TEKS 5.9 (Earth's Rotation, Day/Night & Shadows — Earth rotates on its axis roughly every 24 hours, causing the apparent movement of the Sun across the sky and changes in shadow position/shape). This is the Simulation Lab engine's first Earth & Space case, deliberately scoped to the MORNING window (8:00 to noon) rather than a full day/night cycle, since the engine's checkpoint mechanic needs one monotonic trend per round and a full day's shadow length is not monotonic (it shortens toward solar noon, then lengthens again in the afternoon). The student ran a two-round shadow experiment, testing time of morning (8:00-12:00, step 1 hour) against shadow length in feet. Round 1 used a measuring stick against a clean monotonic-decreasing lookup table (8:00->12ft, 9:00->9ft, 10:00->6ft, 11:00->4ft, 12:00->3ft). After Checkpoint 1, the stick was swapped for the base's flagpole for Round 2, which follows a second, proportionally longer but still monotonic-decreasing table (8:00->20ft, 9:00->15ft, 10:00->10ft, 11:00->7ft, 12:00->5ft). This is a GRADE 5 case — expect a full paragraph that cites a real trial from BOTH rounds and compares them (e.g., 'the pattern still held, but the flagpole's shadow was longer than the stick's at the same time'), plus a real reason tied to Earth's rotation and the Sun's changing apparent angle (not just 'because the Sun moved'). Checkpoint 2 is a fillBlank ('the tall flagpole's shadow was ____ than the measuring stick's shadow') accepting 'longer'/'bigger'/'greater'/'more' as correct.",
};
