// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.9B covers collecting and
// analyzing data to identify sequences and predict patterns in the
// observable appearance of the Moon from Earth. Freshly framed for Signal
// Check — NOT a reworded version of any Group Chat trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.9B-SC",
  teksLabel: "4.9B",
  grade: 4,
  subject: "Science",
  title: "Does the Moon Really Shrink?",
  tagline: "The moon gets smaller and smaller until it's almost gone, then grows all the way back — it must be shrinking away and rebuilding itself every month.",
  transmission: {
    claimHeadline: "The moon gets smaller and smaller until it's almost gone, then grows all the way back — it must be shrinking away and rebuilding itself every month.",
    source: "Four-Week Moon Watch Log",
    loggedAt: "Month 1",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The moon measures the exact same size in every photo this month, from a full circle to a thin sliver.",
      correctVerdict: "True",
      reasonText: "Ruler checks on photos from different nights all show the same width for the moon.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The same craters and dark patches show up in the same places on the moon every night this month.",
      correctVerdict: "True",
      reasonText: "Matching the moon's surface features from night to night shows it's the same moon the whole time, not shrinking material.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The moon shrinks away and then grows itself back every month.",
      correctVerdict: "False",
      reasonText: "The moon's size never actually changes — we just see a different part of it lit up as it moves around Earth.",
    },
  ],

  evidenceReadings: [
    { id: "size_check_full", label: "Ruler check, full moon", reading: "A ruler held up to the full moon photo measures a certain width.", kind: "data" },
    { id: "size_check_sliver", label: "Ruler check, thin sliver", reading: "A ruler held up to the thin sliver photo measures that same width again.", kind: "data" },
    { id: "feature_match_1", label: "Feature match, night 5", reading: "The same dark patch appears in the same spot on the moon as night 1.", kind: "data" },
    { id: "feature_match_2", label: "Feature match, night 20", reading: "The same craters line up in the same spot on the moon as earlier nights.", kind: "data" },
    { id: "light_angle_note", label: "Science note", reading: "We can only see the part of the moon that sunlight is hitting and facing toward Earth.", kind: "data" },
    { id: "phase_pattern_note", label: "Science note", reading: "As the moon moves around Earth, the lit part we can see changes shape in the same repeating pattern each month.", kind: "data" },
    { id: "horizon_color_note", label: "Sky note", reading: "The moon looked slightly orange low near the horizon one night.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["size_check_full", "size_check_sliver"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["feature_match_1", "feature_match_2"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["light_angle_note", "phase_pattern_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["horizon_color_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the moon measures the same size in every photo?",
    "Did I mention that the same features show up on the moon night after night?",
    "Did I explain what actually causes the moon's lit shape to change?",
    "Did I avoid saying the moon shrinks and grows itself back?",
  ],
};
