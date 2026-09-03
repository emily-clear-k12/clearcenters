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

  mustInclude: [
    "States the relationship: a steeper ramp angle makes the ball roll farther (a greater distance).",
    "References specific trial data from their own log (an actual angle and the distance they saw at that angle), from either round.",
    "Says whether the pattern held after the ball got heavier in Round 2.",
    "Uses the word 'angle' or 'steeper'/'steepness' correctly.",
  ],

  modelAnswer:
    "When the ramp angle went up, the distance the ball rolled went up too. I know this because in Round 1, at 10° the ball only rolled 2 tiles, but at 50° it rolled 12 tiles. After Mission Control swapped in the heavier ball, the distances were shorter overall, but the pattern stayed the same — at 10° it only rolled 1 tile, but at 50° it rolled 9 tiles. A steeper ramp gives the ball more speed and mechanical energy, so it rolls farther, no matter which ball is used.",

  aiContext:
    "Grade 3 Science, TEKS 3.8B (Speed & Mechanical Energy). The student ran a two-round ramp-angle experiment in the Simulation Lab engine. Round 1 used a lighter ball against a clean monotonic-increasing lookup table (10°->2 tiles, 15°->4, 20°->5, 25°->6, 30°->7, 35°->8, 40°->10, 45°->11, 50°->12). After Checkpoint 1, the ball was swapped for a heavier one for Round 2, which follows a second, proportionally shorter but still monotonic-increasing table (10°->1, 15°->2, 20°->3, 25°->4, 30°->5, 35°->6, 40°->7, 45°->8, 50°->9). Grade generously for 3rd-grade writing conventions; the core science idea is that a steeper ramp gives the ball more speed/mechanical energy so it travels farther, and that relationship holds regardless of the ball's weight, even though the heavier ball goes a shorter distance at every angle. The student should back their claim up with a real angle/distance pair from their own trials (either round is fine) and ideally note that the pattern held after the ball changed.",
};
