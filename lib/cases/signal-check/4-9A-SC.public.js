// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.9A covers how Earth's
// tilt and orbit cause seasonal changes in daylight, separate from
// day-to-day temperature. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "4.9A" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.9A-SC",
  teksLabel: "4.9A",
  grade: 4,
  subject: "Science",
  title: "Does Cold Cause Sunset?",
  tagline: "The recent cold weather is what's making the sun set earlier every day.",
  transmission: {
    claimHeadline: "The recent cold weather is what's making the sun set earlier every day.",
    source: "Sunset Time Log",
    loggedAt: "Two-Month Observation",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Sunset had already been getting earlier for six weeks before the cold weather even started.",
      correctVerdict: "True",
      reasonText: "The sunset log from the earlier weeks shows sunset was already moving earlier before the first cold day.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "During one warm week in the middle of that time, sunset still got earlier.",
      correctVerdict: "True",
      reasonText: "The warm week check and the sunset-during-warm-week reading both show sunset kept moving earlier that same week.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The cold weather is what's making the sun set earlier.",
      correctVerdict: "False",
      reasonText: "It's not the cold — Earth's tilt as it moves around the sun changes how many hours of daylight a place gets.",
    },
  ],

  evidenceReadings: [
    { id: "sunset_log_early", label: "Sunset log", reading: "Sunset time moved from 7:45 PM to 6:20 PM over the last two months.", kind: "data" },
    { id: "sunset_log_before_cold", label: "Sunset log, earlier weeks", reading: "Sunset was already getting earlier for six weeks before the first cold day.", kind: "data" },
    { id: "warm_week_data", label: "Warm week check", reading: "One week in the middle of this time was much warmer than usual.", kind: "data" },
    { id: "sunset_during_warm", label: "Sunset during the warm week", reading: "Sunset still got earlier that same warm week, by about the same amount as other weeks.", kind: "data" },
    { id: "tilt_note", label: "Science note", reading: "Earth tilts as it moves around the sun. That tilt changes how many hours of daylight a place gets.", kind: "data" },
    { id: "pattern_definition", label: "Science note", reading: "Sunset time follows the seasons — not the day-to-day temperature.", kind: "data" },
    { id: "cloud_note", label: "Sky note", reading: "The sky was mostly clear during this time.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sunset_log_early", "sunset_log_before_cold"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["warm_week_data", "sunset_during_warm"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["tilt_note", "pattern_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["cloud_note"] },
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
    "Did I mention when sunset actually started getting earlier?",
    "Did I mention what happened to sunset during the warm week?",
    "Did I explain what actually causes sunset to change with the seasons?",
    "Did I avoid saying the cold weather is causing the earlier sunset?",
  ],
};
