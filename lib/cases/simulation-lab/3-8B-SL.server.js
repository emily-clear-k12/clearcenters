// Ramp Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.

export const SERVER_CASE = {
  standard: "3.8B-SL",
  title: "Ramp Test",

  // The single source of truth Checkpoint 1's correct choice is authored
  // against (see design doc §7) — not tied to any one trial's setting,
  // since students each run their own trials at settings of their choosing.
  trendDirection: "increasing",

  checkpoints: [
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    {
      id: "cp2",
      type: "fillBlank",
      acceptedAnswers: [
        "increases",
        "goes up",
        "gets bigger",
        "gets farther",
        "increases too",
        "gets longer",
        "rolls farther",
        "increases as well",
        "grows",
        "gets larger",
        "gets further",
      ],
    },
  ],

  mustInclude: [
    "States the relationship: a steeper ramp angle makes the ball roll farther (a greater distance).",
    "References specific trial data from their own log (an actual angle and the distance they saw at that angle).",
    "Uses the word 'angle' or 'steeper'/'steepness' correctly.",
  ],

  modelAnswer:
    "When the ramp angle went up, the distance the ball rolled went up too. I know this because my trials showed that at 10° the ball only rolled 2 tiles, but at 50° it rolled 12 tiles. A steeper ramp gives the ball more speed and mechanical energy, so it rolls farther.",

  aiContext:
    "Grade 3 Science, TEKS 3.8B (Speed & Mechanical Energy). The student ran a ramp-angle experiment in the Simulation Lab engine against a clean monotonic-increasing lookup table (10°->2 tiles, 20°->4, 30°->6, 40°->9, 50°->12 floor tiles). Grade generously for 3rd-grade writing conventions; the core science idea being assessed is that a steeper ramp gives the ball more speed/mechanical energy so it travels farther, and the student should back that claim up with a real angle/distance pair from their own trials.",
};
