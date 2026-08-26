// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10A covers explaining
// how the Sun and ocean interact in the water cycle and affect weather.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.10A-SC",
  teksLabel: "5.10A",
  grade: 5,
  subject: "Science",
  title: "Does the Morning Fog Just Show Up for No Reason?",
  tagline: "The fog rolls in over the coast every morning for no particular reason — it's totally random.",
  transmission: {
    claimHeadline: "The fog rolls in over the coast every morning for no particular reason — it's totally random.",
    source: "Coastal Weather Log",
    loggedAt: "3-Morning Comparison",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Fog only shows up on mornings when the ocean is noticeably warmer than the air above it.",
      correctVerdict: "True",
      reasonText: "A condition that lines up with fog every time it happens is a real pattern, not randomness.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "On the one clear morning with no big temperature difference, no fog formed at all.",
      correctVerdict: "True",
      reasonText: "The one morning without the temperature difference is also the one morning without fog — that's strong evidence of a real connection.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The fog shows up for no particular reason.",
      correctVerdict: "False",
      reasonText: "The sun heats the ocean, driving evaporation, and warm moist air meeting cooler air is what condenses into visible fog — that's a real cause, not randomness.",
    },
  ],

  evidenceReadings: [
    { id: "temp_diff_foggy_1", label: "Foggy morning 1 temps", reading: "On foggy morning 1, the ocean water measured much warmer than the air above it.", kind: "data" },
    { id: "temp_diff_foggy_2", label: "Foggy morning 2 temps", reading: "On foggy morning 2, that same big temperature difference between ocean and air was measured again.", kind: "data" },
    { id: "temp_diff_clear", label: "Clear morning temps", reading: "On the one clear morning with no fog, the ocean and air temperatures were nearly the same.", kind: "data" },
    { id: "condensation_note", label: "Science note", reading: "When warm, moist air from the ocean meets cooler air, the water vapor condenses into visible fog.", kind: "data" },
    { id: "sun_note", label: "Science note", reading: "The sun heats the ocean's surface, which drives evaporation that feeds the water cycle.", kind: "data" },
    { id: "weather_link_note", label: "Science note", reading: "The ocean's interaction with the sun and air is part of what shapes daily weather patterns like fog.", kind: "data" },
    { id: "dock_note", label: "Dock note", reading: "The dock at the harbor is painted white.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["temp_diff_foggy_1", "temp_diff_foggy_2"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["temp_diff_clear", "condensation_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sun_note", "weather_link_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["dock_note"] },
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
    "Did I mention the temperature difference on the foggy mornings?",
    "Did I mention what happened on the one clear morning?",
    "Did I explain what actually causes fog to form?",
    "Did I avoid saying the fog shows up for no reason?",
  ],
};
