// Magnet Pull Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 3.7A, Grade 3 Science. Authored to true grade-3 rigor from the
// start (design doc §5.4) — one trial, from either round, is a complete
// correct answer; no cross-round comparison expected.

export const SERVER_CASE = {
  standard: "3.7A-SL",
  title: "Magnet Pull Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1, cp2)
  // is authored against. Decreasing: farther away -> fewer paperclips.
  trendDirection: "decreasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "decrease" },
    { id: "cp1", type: "mc", correctChoiceId: "decrease" },
    { id: "cp2", type: "dropdown", correctChoiceId: "decreases" },
  ],

  mustInclude: [
    "States the relationship: as the magnet moves farther from the paperclips, it holds fewer paperclips (a weaker pull).",
    "References one real trial from their own log (an actual distance and the number of paperclips held at that distance), from either round.",
    "Uses the word 'distance' or 'magnet' correctly.",
  ],

  modelAnswer:
    "As the magnet moved farther away, the number of paperclips it held went down. I tried a distance of 3 cm and the magnet held 6 paperclips.",

  aiContext:
    "Grade 3 Science, TEKS 3.7A (Forces acting on objects through contact or at a distance — magnetism). The student ran a two-round magnet-and-paperclips experiment in the Simulation Lab engine. Round 1 used a smaller magnet against a clean monotonic-decreasing lookup table (1cm->8 paperclips, 2->7, 3->6, 4->5, 5->4, 6->3, 7->2, 8->1, 9->0). After Checkpoint 1, the magnet was swapped for a bigger, stronger one for Round 2, which follows a second, proportionally higher but still monotonic-decreasing table (1->10, 2->9, 3->8, 4->7, 5->6, 6->5, 7->4, 8->3, 9->2). This is a GRADE 3 case — grade generously for 3rd-grade writing conventions, and do NOT require or expect the student to compare Round 1 and Round 2; a single clear sentence citing one real distance/paperclip-count pair from either round, stating that farther away means fewer paperclips held (a weaker magnetic pull), is a complete and correct answer at this grade level.",
};
