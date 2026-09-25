// Dissolving Station — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 4.6B, Grade 4 Science. Authored to grade-4 rigor (design doc §5.4)
// — 2-3 sentences, one trial from either round, plus a simple "why."

export const SERVER_CASE = {
  standard: "4.6B-SL",
  title: "Dissolving Station",

  // Single source of truth every trend-based checkpoint (hyp, cp1) is
  // authored against. Increasing: hotter water -> more dissolves.
  trendDirection: "increasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "increase" },
    { id: "cp1", type: "mc", correctChoiceId: "increase" },
    { id: "fair", type: "mc", correctChoiceId: "temp", sceneOnly: true },
    { id: "cp2", type: "multiSelect", correctChoiceIds: ["warmerMore", "samePattern"] },
  ],

  // Instant feedback for the scene flow's checks (returned one answer at a
  // time by /api/simulation-lab/check — never shipped to the browser whole).
  feedback: {
    cp1: {
      yes: "Yes! Warmer water dissolves more sugar. Your dots climb as you go right.",
      hint: "Look again: follow your dots from left to right. Do they climb, drop, or stay level?",
    },
    fair: {
      yes: "Right! Only the water’s temperature changed. The amount of water, the sugar and the stirring stayed the same — that makes it a fair test.",
      hint: "Hmm, that one stayed the same every run. What did you change with the hot-plate dial?",
    },
  },

  mustInclude: [
    "States the relationship: hotter water dissolves more sugar (a greater amount) before it stops.",
    "References one real trial from their own log (an actual temperature and the amount dissolved at that temperature), from either round.",
    "Gives a reason or explanation for why hotter water dissolves more, not just a restatement of the pattern.",
  ],

  modelAnswer:
    "As the water got hotter, the amount of sugar that dissolved went up. At 70°C, 50 grams of sugar dissolved, which is much more than at a cooler temperature. This happens because hot water molecules move faster and can pull apart and hold more sugar particles.",

  aiContext:
    "Grade 4 Science, TEKS 4.6B (Mixtures & Solutions — investigate and compare mixtures, including solids dissolved in liquids). The student ran a two-round dissolving experiment in the Simulation Lab engine. Round 1 used sugar against a clean monotonic-increasing lookup table (10°C->20g, 20->25, 30->30, 40->35, 50->40, 60->45, 70->50, 80->55, 90->60). After Checkpoint 1, the solute was swapped for salt for Round 2, which follows a second, proportionally lower but still monotonic-increasing table (10->15, 20->18, 30->21, 40->24, 50->27, 60->30, 70->33, 80->36, 90->39). This is a GRADE 4 case — expect 2-3 sentences, one real data point, and a simple 'why' (e.g., hot water molecules move faster / have more energy, so they can dissolve more solute) — a full scientific mechanism isn't required, just a genuine attempt at reasoning beyond restating the pattern. Do not require the student to compare Round 1 and Round 2 in detail; citing one trial from either round with a reason is a complete and correct answer at this grade level.",
};
