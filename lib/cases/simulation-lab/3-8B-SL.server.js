// Ramp Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
//
// v3 update (see design doc SimulationLab_Digital_Design_v1.md §10):
// checkpoints now include a pre-trial hypothesis check ("hyp") and a
// dropdown-format Checkpoint 2 ("cp2"). trendDirection still keys all
// three, since Round 2's heavier ball changes the MAGNITUDE of the
// distances (see roundTwo.lookupTable in the public case) but not the
// direction of the relationship — steeper is still farther either way.

export const SERVER_CASE = {
  standard: "3.8B-SL",
  title: "Ramp Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1, cp2)
  // is authored against — not tied to any one trial's setting, since
  // students each run their own trials at settings of their own choosing,
  // and it holds for BOTH rounds.
  trendDirection: "increasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "increase" },
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    { id: "cp2", type: "dropdown", correctChoiceId: "increases" },
  ],

  // Revised Sept 4, 2026 to true grade-3 rigor (see design doc §5.4). The
  // old rubric required synthesizing both rounds ("says whether the
  // pattern held after the ball got heavier") — that condition-comparison
  // move is grade-5 rigor, not grade-3. Now: one trial, from either round,
  // is a complete correct answer.
  mustInclude: [
    "States the relationship: a steeper ramp angle makes the ball roll farther (a greater distance).",
    "References one real trial from their own log (an actual angle and the distance they saw at that angle), from either round.",
    "Uses the word 'angle' or 'steeper'/'steepness' correctly.",
  ],

  modelAnswer:
    "When the ramp angle got steeper, the distance the ball rolled went up. I tried an angle of 40° and the ball rolled 10 tiles, which is farther than a smaller angle would go.",

  aiContext:
    "Grade 3 Science, TEKS 3.8B (Speed & Mechanical Energy). The student ran a two-round ramp-angle experiment in the Simulation Lab engine. Round 1 used a lighter ball against a clean monotonic-increasing lookup table (10°->2 tiles, 15°->4, 20°->5, 25°->6, 30°->7, 35°->8, 40°->10, 45°->11, 50°->12). After Checkpoint 1, the ball was swapped for a heavier one for Round 2, which follows a second, proportionally shorter but still monotonic-increasing table (10°->1, 15°->2, 20°->3, 25°->4, 30°->5, 35°->6, 40°->7, 45°->8, 50°->9). This is a GRADE 3 case — grade generously for 3rd-grade writing conventions, and do NOT require or expect the student to compare Round 1 and Round 2 or say whether the pattern 'held' after the ball changed; that is grade-4/5 rigor. A single clear sentence citing one real angle/distance pair from either round, stating that a steeper ramp means a farther roll, is a complete and correct answer at this grade level.",
};
