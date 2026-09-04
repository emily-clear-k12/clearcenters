// Circuit Motor Test — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 5.8B, Grade 5 Science. Authored to grade-5 rigor (design doc §5.4)
// — full paragraph, can compare two rounds and cite both.

export const SERVER_CASE = {
  standard: "5.8B-SL",
  title: "Circuit Motor Test",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Increasing: more batteries -> more electrical
  // energy -> faster motor spin (electrical energy transforming into
  // motion energy, per TEKS 5.8B).
  trendDirection: "increasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "increase" },
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    { id: "cp2", type: "fillBlank", acceptedAnswers: ["slower", "less fast", "not as fast", "lower speed"] },
  ],

  mustInclude: [
    "States the relationship: adding more batteries makes the motor spin faster (more electrical energy transforming into motion energy).",
    "References one real trial from Round 1 (an actual number of batteries and the motor speed at that number).",
    "References one real trial or comparison from Round 2 (the bigger fan blade), noting the pattern still held but speeds were slower at the same number of batteries.",
    "Gives a reason or explanation for why more batteries make it spin faster, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As I added more batteries, the motor's speed increased. For example, with 5 batteries in Round 1, the speed was 500 RPM, which was much faster than with fewer batteries. Once the bigger fan blade was attached in Round 2, the same pattern held — more batteries still meant a faster speed — but every speed was slower than Round 1 at the same number of batteries. With 5 batteries in Round 2, the speed was only 300 RPM. This happens because more batteries send more electrical energy through the circuit, which transforms into more motion energy, and a bigger fan blade needs more energy to reach the same speed as a smaller one.",

  aiContext:
    "Grade 5 Science, TEKS 5.8B (Electrical Circuits & Energy Transformations — electrical energy in a complete circuit transforming into motion energy, among others; also requirements for a functioning circuit). Deliberately distinct from Grade 4's 4.8C-SL (electrical -> light energy) — this case tests electrical -> MOTION energy via a spinning motor. The student ran a two-round circuit-motor experiment in the Simulation Lab engine, testing number of batteries (1-9) against motor speed in RPM. Round 1 used a smaller fan blade against a clean monotonic-increasing lookup table (1 battery->100 RPM, 2->200, 3->300, 4->400, 5->500, 6->600, 7->700, 8->800, 9->900). After Checkpoint 1, a bigger fan blade was attached for Round 2, which follows a second, proportionally lower but still monotonic-increasing table (1->60, 2->120, 3->180, 4->240, 5->300, 6->360, 7->420, 8->480, 9->540). This is a GRADE 5 case — expect a full paragraph that cites a real trial from BOTH rounds and compares them (e.g., 'the pattern still held, but the bigger fan blade spun slower at the same number of batteries'), plus a real reason (more batteries = more electrical energy = more motion energy; a bigger blade needs more energy for the same speed). Checkpoint 2 is a fillBlank ('the motor with the bigger fan blade spun ____ than the motor with the smaller blade') accepting 'slower'/'less fast'/'not as fast'/'lower speed' as correct.",
};
