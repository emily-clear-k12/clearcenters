// Boat Load Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 3.6A, Grade 3 Science. Authored to true grade-3 rigor from the
// start (design doc §5.4) — one trial, from either round, is a complete
// correct answer; no cross-round comparison expected.

export const SERVER_CASE = {
  standard: "3.6A-SL",
  title: "Boat Load Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1, cp2)
  // is authored against. Decreasing: more weight -> less freeboard.
  trendDirection: "decreasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "decrease" },
    { id: "cp1", type: "mc", correctChoiceId: "decrease" },
    { id: "cp2", type: "dropdown", correctChoiceId: "decreases" },
  ],

  mustInclude: [
    "States the relationship: adding more cargo weight leaves less space above the water (the boat sits lower).",
    "References one real trial from their own log (an actual weight amount and the space above the water they saw at that amount), from either round.",
    "Uses the word 'weight' or 'cargo' correctly.",
  ],

  modelAnswer:
    "When I added more cargo weight, the space above the water went down. I tried 20 washers and there were 4 cm of space left above the water.",

  aiContext:
    "Grade 3 Science, TEKS 3.6A (Physical Properties of Matter — ability to sink or float in water). The student ran a two-round cargo-boat-loading experiment in the Simulation Lab engine. Round 1 used a narrow foil boat against a clean monotonic-decreasing lookup table (0 washers->8cm freeboard, 5->7, 10->6, 15->5, 20->4, 25->3, 30->2, 35->1, 40->0). After Checkpoint 1, the boat was swapped for a wider one for Round 2, which follows a second, proportionally higher but still monotonic-decreasing table (0->10, 5->9, 10->8, 15->7, 20->6, 25->5, 30->4, 35->3, 40->2). This is a GRADE 3 case — grade generously for 3rd-grade writing conventions, and do NOT require or expect the student to compare Round 1 and Round 2; a single clear sentence citing one real weight/freeboard pair from either round, stating that more weight means less space above the water (or that the boat sits lower), is a complete and correct answer at this grade level.",
};
