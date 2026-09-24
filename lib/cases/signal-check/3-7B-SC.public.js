// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.7B covers how the size
// and direction of a force affects an object's motion. Freshly framed for
// Signal Check — NOT a reworded version of the Group Chat "3.7B" trap line
// (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.7B-SC",
  teksLabel: "3.7B",
  grade: 3,
  subject: "Science",
  title: "Win by Hitting Harder?",
  tagline: "In the target game, hitting the disc harder always wins.",
  transmission: {
    claimHeadline: "In the target game, hitting the disc harder always wins.",
    source: "Target Toss Game Log",
    loggedAt: "Round 6",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A hard hit sent the disc flying past the target.",
      correctVerdict: "True",
      reasonText: "The hard hit log shows the disc went 190 cm. That is far past the 120 cm target line.",
      stemEvidenceIds: ["hard_hit_distance", "target_distance"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A lighter, aimed tap landed the disc right on the target.",
      correctVerdict: "True",
      reasonText: "The soft hit log shows the disc went exactly 120 cm. It was aimed carefully at the target.",
      stemEvidenceIds: ["soft_hit_distance", "soft_hit_direction"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Hitting the disc harder always wins the game.",
      correctVerdict: "False",
      reasonText: "The score log shows aimed soft taps beat hard hits that went too far. How hard you push and which way you push both matter.",
      stemEvidenceIds: ["score_log", "direction_note"],
    },
  ],

  evidenceReadings: [
    { id: "hard_hit_distance", label: "Hard hit log", reading: "A hard hit sent the disc 190 cm. That is far past the 120 cm target line.", kind: "data" },
    { id: "target_distance", label: "Target marker", reading: "The target line is set at 120 cm.", kind: "data" },
    { id: "soft_hit_distance", label: "Soft hit log", reading: "A lighter tap sent the disc exactly 120 cm. It landed right on the target.", kind: "data" },
    { id: "soft_hit_direction", label: "Aim check", reading: "The soft tap was aimed carefully straight at the target first.", kind: "data" },
    { id: "score_log", label: "Round score log", reading: "In 6 rounds, aimed soft taps scored more points than hard hits that went too far.", kind: "data" },
    { id: "direction_note", label: "Coach's note", reading: "To win, a shot needs the right amount of force AND the right direction. More force is not enough.", kind: "data" },
    { id: "disc_color", label: "Disc color note", reading: "The disc used today is orange, not the usual red.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["hard_hit_distance", "target_distance"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["soft_hit_distance", "soft_hit_direction"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["score_log", "direction_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["disc_color"] },
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
    "Did I mention how far the hard hit traveled compared to the target?",
    "Did I mention that the soft, aimed tap landed right on the target?",
    "Did I explain why hitting harder didn't win more often?",
    "Did I avoid saying hitting harder always wins?",
  ],
};
