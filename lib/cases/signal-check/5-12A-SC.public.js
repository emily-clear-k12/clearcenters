// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12A covers observing and
// describing how organisms survive by interacting with biotic and abiotic
// factors in a healthy ecosystem. Freshly framed for Signal Check — NOT a
// reworded version of any Group Chat trap line (see COVERAGE_MAP.md
// rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.12A-SC",
  teksLabel: "5.12A",
  grade: 5,
  subject: "Science",
  title: "Do Living Things Only Need Other Living Things?",
  tagline: "As long as a fish has other fish and plants around it in the tank, that's really all it needs — the water temperature and light don't actually matter much.",
  transmission: {
    claimHeadline: "As long as a fish has other fish and plants around it in the tank, that's really all it needs — the water temperature and light don't actually matter much.",
    source: "Classroom Aquarium Log",
    loggedAt: "Two Incidents",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "When the tank heater failed and temperature dropped sharply overnight, several fish became sluggish and stopped eating, even with the same fish and plants still there.",
      correctVerdict: "True",
      reasonText: "The fish and plants staying the same, while only temperature changed, points to temperature as the real cause.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "When the tank light was left off for a week, the live plants turned pale and stopped growing, even with the same fish and other plants present.",
      correctVerdict: "True",
      reasonText: "The same isolation applies here — only the light changed, and the plants still suffered.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Nonliving factors like temperature and light don't really matter as long as living things are present.",
      correctVerdict: "False",
      reasonText: "Abiotic factors like temperature, light, and water are things living things depend on, right alongside the biotic factors like other fish and plants.",
    },
  ],

  evidenceReadings: [
    { id: "temp_drop_result", label: "Heater failure result", reading: "After the heater failed and tank temperature dropped sharply, several fish became sluggish and stopped eating.", kind: "data" },
    { id: "temp_fish_present_note", label: "Heater failure, other factors", reading: "The same fish and plants were still in the tank when this happened.", kind: "data" },
    { id: "light_off_result", label: "No-light week result", reading: "After a week with the tank light left off, the live plants turned pale and stopped growing.", kind: "data" },
    { id: "light_others_present_note", label: "No-light week, other factors", reading: "The same fish and other plants were still present in the tank during that week.", kind: "data" },
    { id: "biotic_definition_note", label: "Science note", reading: "Biotic factors are living or once-living parts of an ecosystem, like fish and plants.", kind: "data" },
    { id: "abiotic_definition_note", label: "Science note", reading: "Abiotic factors are nonliving parts of an ecosystem, like temperature, light, and water, that living things still depend on.", kind: "data" },
    { id: "tank_size_note", label: "Tank note", reading: "The fish tank holds 20 gallons of water.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["temp_drop_result", "temp_fish_present_note"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["light_off_result", "light_others_present_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["biotic_definition_note", "abiotic_definition_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["tank_size_note"] },
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
    "Did I mention what happened to the fish when the heater failed?",
    "Did I mention what happened to the plants during the no-light week?",
    "Did I explain the difference between biotic and abiotic factors?",
    "Did I avoid saying nonliving factors like temperature and light don't really matter?",
  ],
};
