// Friction Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 4.7, Grade 4 Science. Authored to grade-4 rigor (design doc §5.4)
// — 2-3 sentences, one trial from either round, plus a simple "why."

export const SERVER_CASE = {
  standard: "4.7-SL",
  title: "Friction Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Decreasing: rougher surface -> shorter slide.
  trendDirection: "decreasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "decrease" },
    { id: "cp1", type: "mc", correctChoiceId: "decrease" },
    { id: "cp2", type: "multiSelect", correctChoiceIds: ["rougherShorter", "samePattern"] },
  ],

  mustInclude: [
    "States the relationship: a rougher surface makes the block slide a shorter distance (more friction).",
    "References one real trial from their own log (an actual roughness level and the distance at that level), from either round.",
    "Gives a reason or explanation for why a rougher surface causes a shorter slide, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As the surface got rougher, the distance the block slid went down. At a roughness level of 3, the block slid 14 cm, which is farther than at a rougher level. This happens because a rougher surface has more friction, which pushes back against the block and slows it down faster.",

  aiContext:
    "Grade 4 Science, TEKS 4.7 (Forces — friction). The student ran a two-round sliding-block experiment in the Simulation Lab engine. Round 1 used a smaller block against a clean monotonic-decreasing lookup table (roughness 1->18cm, 2->16, 3->14, 4->12, 5->10, 6->8, 7->6, 8->4, 9->2). After Checkpoint 1, the block was swapped for a heavier one for Round 2, which follows a second, proportionally shorter but still monotonic-decreasing table (1->14, 2->12, 3->10, 4->8, 5->6, 6->4, 7->3, 8->2, 9->1). This is a GRADE 4 case — expect 2-3 sentences, one real data point, and a simple 'why' (e.g., a rougher surface creates more friction, which slows the block down more) — a full physics explanation isn't required, just genuine reasoning beyond restating the pattern. Do not require a detailed Round 1/Round 2 comparison; one trial from either round with a reason is a complete and correct answer at this grade level.",
};
