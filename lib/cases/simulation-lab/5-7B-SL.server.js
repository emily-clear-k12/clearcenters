// Balloon Rocket Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 5.7B, Grade 5 Science. Authored to grade-5 rigor (design doc §5.4)
// — full paragraph, can compare two rounds and cite both.

export const SERVER_CASE = {
  standard: "5.7B-SL",
  title: "Balloon Rocket Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Increasing: more breaths of air -> more thrust ->
  // farther travel.
  trendDirection: "increasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "increase" },
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    // fillBlank — forgiving substring match (route.js's normalizeAnswer
    // lowercases, trims, strips .!?,;: before checking). Any of these
    // short phrases correctly captures "shorter/less far."
    { id: "cp2", type: "fillBlank", acceptedAnswers: ["less", "shorter", "not as far", "smaller"] },
  ],

  mustInclude: [
    "States the relationship: more breaths of air makes the balloon rocket travel farther (more force/thrust).",
    "References one real trial from Round 1 (an actual number of breaths and the distance at that number).",
    "References one real trial or comparison from Round 2 (the heavier balloon), noting the pattern still held but distances were shorter at the same number of breaths.",
    "Gives a reason or explanation for why more air makes it travel farther, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As I blew more breaths of air into the balloon, the distance it traveled increased. For example, with 10 breaths in Round 1, it traveled 5 meters, which was much farther than with fewer breaths. Once the balloon got heavier in Round 2, the same pattern held — more breaths still meant a farther distance — but every distance was shorter than Round 1 at the same number of breaths. With 10 breaths in Round 2, it only traveled 2.5 meters. This happens because more breaths of air create more force pushing the balloon forward, and a heavier balloon needs more force to travel the same distance as a lighter one.",

  aiContext:
    "Grade 5 Science, TEKS 5.7B (Force Investigation — the standard's own example is a balloon rocket on a string). The student ran a two-round balloon-rocket experiment in the Simulation Lab engine, testing breaths of air (2-18, step 2) against distance traveled in meters. Round 1 used the balloon as-is against a clean monotonic-increasing lookup table (2 breaths->1m, 4->2, 6->3, 8->4, 10->5, 12->6, 14->7, 16->8, 18->9). After Checkpoint 1, a weight was taped to the balloon for Round 2, which follows a second, proportionally lower but still monotonic-increasing table (2->0.5, 4->1, 6->1.5, 8->2, 10->2.5, 12->3, 14->3.5, 16->4, 18->4.5). This is a GRADE 5 case — expect a full paragraph that cites a real trial from BOTH rounds and compares them (e.g., 'the pattern still held, but the heavier balloon went a shorter distance at the same number of breaths'), plus a real reason (more air force = more thrust; more mass = more force needed for the same distance). Checkpoint 2 is a fillBlank ('the heavier balloon rocket traveled ____ than the lighter one') accepting 'less'/'shorter'/'not as far'/'smaller' as correct.",
};
