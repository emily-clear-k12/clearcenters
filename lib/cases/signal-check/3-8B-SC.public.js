// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.8B covers how energy is
// needed to cause motion or a change in an object. Freshly framed for
// Signal Check — NOT a reworded version of the Group Chat "3.8B" trap line
// (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.8B-SC",
  teksLabel: "3.8B",
  grade: 3,
  subject: "Science",
  title: "Bigger Ball, Bigger Hit?",
  tagline: "You need a heavier ball to knock down more pins. A small ball can't do it.",
  transmission: {
    claimHeadline: "You need a heavier ball to knock down more pins. A small ball can't do it.",
    source: "Marble Ramp Bowling Log",
    loggedAt: "Trial Set 3",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The same small marble knocked down more pins when it started higher on the ramp.",
      correctVerdict: "True",
      reasonText: "From the low mark, it knocked down 2 pins. From the high mark, the same marble knocked down 7.",
      stemEvidenceIds: ["low_release", "high_release"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The small, fast marble knocked down as many pins as a heavier, slower one.",
      correctVerdict: "True",
      reasonText: "The fast small marble and the slow heavy one each knocked down 7 pins.",
      stemEvidenceIds: ["fast_small_result", "slow_heavy_result"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "You always need a heavier ball to knock down more pins.",
      correctVerdict: "False",
      reasonText: "How hard something hits depends on speed, not just mass. A small marble going fast can match a heavier one.",
      stemEvidenceIds: ["speed_note", "mass_note"],
    },
  ],

  evidenceReadings: [
    { id: "low_release", label: "Low release trial", reading: "Small marble let go from the low mark knocked down 2 pins.", kind: "data" },
    { id: "high_release", label: "High release trial", reading: "The same small marble let go from the high mark knocked down 7 pins.", kind: "data" },
    { id: "fast_small_result", label: "Fast small marble trial", reading: "Small marble let go from the top: knocked down 7 pins.", kind: "data" },
    { id: "slow_heavy_result", label: "Slow heavy marble trial", reading: "Heavier marble let go from the low mark: 7 pins too.", kind: "data" },
    { id: "speed_note", label: "Ramp height note", reading: "Starting higher means more speed at the pins.", kind: "data" },
    { id: "mass_note", label: "Science note", reading: "How hard something hits depends on its mass AND its speed.", kind: "data" },
    { id: "pin_color", label: "Pin color note", reading: "Today's pins are painted white, not the usual red.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["low_release", "high_release"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["fast_small_result", "slow_heavy_result"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["speed_note", "mass_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pin_color"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I compare the low release trial to the high release trial?",
    "Did I mention that the fast small marble matched the heavier marble's result?",
    "Did I explain why speed matters as much as weight?",
    "Did I avoid saying you always need a heavier ball?",
  ],
};
