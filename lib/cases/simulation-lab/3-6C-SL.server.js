// Ice Melt Race — server-only answer keys and grading rubric.
// Never sent to the client; imported only by app/api/simulation-lab/submit
// and any future teacher-facing scoring views.
// TEKS 3.6C, Grade 3 Science. Authored to true grade-3 rigor from the
// start (design doc §5.4) — one trial, from either round, is a complete
// correct answer; no cross-round comparison expected.

export const SERVER_CASE = {
  standard: "3.6C-SL",
  title: "Ice Melt Race",

  // Single source of truth every trend-based checkpoint (hyp, cp1, cp2)
  // is authored against. Decreasing: hotter lamp -> less time to melt.
  trendDirection: "decreasing",

  checkpoints: [
    { id: "hyp", type: "dropdown", correctChoiceId: "decrease" },
    { id: "cp1", type: "mc", correctChoiceId: "decrease" },
    { id: "fair", type: "mc", correctChoiceId: "heat", sceneOnly: true },
    { id: "cp2", type: "dropdown", correctChoiceId: "decreases" },
  ],

  // Instant feedback for the scene flow's checks (returned one answer at a
  // time by /api/simulation-lab/check — never shipped to the browser whole).
  feedback: {
    cp1: {
      yes: "Yes! A hotter lamp melts the ice faster — fewer minutes. Your dots slide down as you go right.",
      hint: "Look again: follow your dots from left to right. Do they climb, drop, or stay level?",
    },
    fair: {
      yes: "Right! Only the lamp’s temperature changed. The ice cube, the tray and the lamp’s spot stayed the same — that makes it a fair test.",
      hint: "Hmm, that one stayed the same every run. What did you change with the dial?",
    },
  },

  mustInclude: [
    "States the relationship: a hotter heat lamp makes the ice cube melt faster (less time).",
    "References one real trial from their own log (an actual temperature and the melt time they saw at that temperature), from either round.",
    "Uses the word 'heat' or 'temperature' correctly.",
  ],

  modelAnswer:
    "As the heat lamp got hotter, the time it took to melt went down. I tried a temperature of 40°C and the ice cube melted in 6 minutes.",

  aiContext:
    "Grade 3 Science, TEKS 3.6C (Heating & Cooling Matter — predicting, observing, and recording ice melting into liquid water). The student ran a two-round heat-lamp-and-ice-cube experiment in the Simulation Lab engine. Round 1 used a smaller ice cube against a clean monotonic-decreasing lookup table (20°C->10 min, 25->9, 30->8, 35->7, 40->6, 45->5, 50->4, 55->3, 60->2). After Checkpoint 1, the ice cube was swapped for a bigger one for Round 2, which follows a second, proportionally longer but still monotonic-decreasing table (20->12, 25->11, 30->10, 35->9, 40->8, 45->7, 50->6, 55->5, 60->4). This is a GRADE 3 case — grade generously for 3rd-grade writing conventions, and do NOT require or expect the student to compare Round 1 and Round 2; a single clear sentence citing one real temperature/melt-time pair from either round, stating that a hotter heat lamp means a faster melt (less time), is a complete and correct answer at this grade level.",
};
