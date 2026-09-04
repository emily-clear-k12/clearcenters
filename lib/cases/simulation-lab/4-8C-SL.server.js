// Circuit Brightness Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 4.8C, Grade 4 Science. Authored to grade-4 rigor (design doc §5.4)
// — 2-3 sentences, one trial from either round, plus a simple "why."

export const SERVER_CASE = {
  standard: "4.8C-SL",
  title: "Circuit Brightness Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Increasing: more batteries -> brighter bulb.
  trendDirection: "increasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "increase" },
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    { id: "cp2", type: "multiSelect", correctChoiceIds: ["moreBrighter", "samePattern"] },
  ],

  mustInclude: [
    "States the relationship: adding more batteries makes the bulb brighter (more electrical energy in the circuit).",
    "References one real trial from their own log (an actual number of batteries and the brightness at that number), from either round.",
    "Gives a reason or explanation for why more batteries make the bulb brighter, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As I added more batteries, the bulb got brighter. With 5 batteries, the brightness was 25, which is much higher than with fewer batteries. This happens because more batteries send more electrical energy through the circuit, and the bulb turns that energy into more light.",

  aiContext:
    "Grade 4 Science, TEKS 4.8C (Electrical Circuits — electrical energy traveling through a closed path, producing light/thermal energy). The student ran a two-round circuit-brightness experiment in the Simulation Lab engine. Round 1 used a smaller bulb against a clean monotonic-increasing lookup table (1 battery->5 brightness units, 2->10, 3->15, 4->20, 5->25, 6->30, 7->35, 8->40, 9->45). After Checkpoint 1, the bulb was swapped for a bigger one for Round 2, which follows a second, proportionally lower but still monotonic-increasing table (1->3, 2->6, 3->9, 4->12, 5->15, 6->18, 7->21, 8->24, 9->27). This is a GRADE 4 case — expect 2-3 sentences, one real data point, and a simple 'why' (e.g., more batteries provide more electrical energy to the circuit) — a full physics explanation isn't required, just genuine reasoning beyond restating the pattern. Do not require a detailed Round 1/Round 2 comparison; one trial from either round with a reason is a complete and correct answer at this grade level.",
};
