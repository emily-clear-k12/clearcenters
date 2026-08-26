// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.7A covers investigating
// and explaining how equal and unequal forces acting on an object cause
// patterns of motion and transfer of energy. Freshly framed for Signal
// Check — NOT a reworded version of any Group Chat trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.7A-SC",
  teksLabel: "5.7A",
  grade: 5,
  subject: "Science",
  title: "If Both Sides Pull, Does It Have to Move?",
  tagline: "Both teams are pulling on the rope with all their strength, so the rope has to move one way or the other — it can't just stay still.",
  transmission: {
    claimHeadline: "Both teams are pulling on the rope with all their strength, so the rope has to move one way or the other — it can't just stay still.",
    source: "Tug-of-War Force Log",
    loggedAt: "Round 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A force meter on each end shows both teams pulling with the exact same amount of force.",
      correctVerdict: "True",
      reasonText: "Equal force readings on both ends are exactly what would cause the forces to balance out.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The rope's marked center point stays in the exact same spot the whole time, even while both teams are pulling hard.",
      correctVerdict: "True",
      reasonText: "No change in position, even under a lot of force, is direct evidence the forces are balanced.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The rope has to move because both sides are pulling on it.",
      correctVerdict: "False",
      reasonText: "Equal and opposite forces balance out and cause no change in motion — the rope only moves once the forces become unequal.",
    },
  ],

  evidenceReadings: [
    { id: "force_meter_left", label: "Force meter, left team", reading: "A force meter on the left end reads 400 newtons of pulling force.", kind: "data" },
    { id: "force_meter_right", label: "Force meter, right team", reading: "A force meter on the right end reads that same 400 newtons of pulling force.", kind: "data" },
    { id: "center_mark_before", label: "Center mark, start", reading: "The rope's marked center point starts at the middle line on the ground.", kind: "data" },
    { id: "center_mark_after", label: "Center mark, after 30 seconds", reading: "After 30 seconds of pulling, that same marked center point is still sitting on the middle line.", kind: "data" },
    { id: "balanced_force_note", label: "Science note", reading: "When two forces on an object are equal and opposite, they balance out and cause no change in motion.", kind: "data" },
    { id: "unequal_force_note", label: "Science note", reading: "An object only starts moving when the forces acting on it become unequal.", kind: "data" },
    { id: "rope_color_note", label: "Rope note", reading: "The rope used was a thick yellow rope.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["force_meter_left", "force_meter_right"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["center_mark_before", "center_mark_after"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["balanced_force_note", "unequal_force_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["rope_color_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all three signals?",
    "Did I compare the force meter readings on both ends of the rope?",
    "Did I mention what happened to the rope's center mark over time?",
    "Did I explain what balanced forces actually do to an object's motion?",
    "Did I avoid saying the rope has to move just because both sides are pulling?",
  ],
};
