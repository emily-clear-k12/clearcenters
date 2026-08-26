// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6C covers comparing the
// properties of substances before and after they are combined into a
// solution and demonstrating that matter is conserved in solutions.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.6C-SC",
  teksLabel: "5.6C",
  grade: 5,
  subject: "Science",
  title: "Did the Salt Really Disappear?",
  tagline: "The salt dissolved into the water and vanished — some of that matter must be completely gone now.",
  transmission: {
    claimHeadline: "The salt dissolved into the water and vanished — some of that matter must be completely gone now.",
    source: "Saltwater Mass Check",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The empty cup, the dry salt, and the water were weighed separately before mixing, giving a starting total.",
      correctVerdict: "True",
      reasonText: "Adding up the separate weights beforehand gives something to compare the final weight against.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The full cup of saltwater weighed that exact same total after the salt completely dissolved.",
      correctVerdict: "True",
      reasonText: "Matching before-and-after totals is direct evidence that nothing was lost when the salt dissolved.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Some of the matter is gone after the salt dissolves.",
      correctVerdict: "False",
      reasonText: "Matter is conserved when substances combine into a solution — dissolving just spreads the salt into particles too small to see.",
    },
  ],

  evidenceReadings: [
    { id: "before_weights", label: "Before weights", reading: "The empty cup, the dry salt, and the water were each weighed separately before mixing.", kind: "data" },
    { id: "before_total", label: "Starting total", reading: "Adding those three separate weights together gives a starting total.", kind: "data" },
    { id: "after_weight", label: "After weight", reading: "The full cup of saltwater weighed the exact same total after the salt completely dissolved.", kind: "data" },
    { id: "taste_test", label: "Taste test", reading: "The water tastes salty all the way through after mixing, from top to bottom.", kind: "data" },
    { id: "conservation_note", label: "Science note", reading: "When substances combine into a solution, the total amount of matter stays the same — none of it disappears.", kind: "data" },
    { id: "dissolve_definition_note", label: "Science note", reading: "Dissolving spreads the salt out into particles too small to see — it doesn't remove any matter.", kind: "data" },
    { id: "cup_color_note", label: "Cup note", reading: "The cup used for the test was clear plastic.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["before_weights", "before_total"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["after_weight", "taste_test"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["conservation_note", "dissolve_definition_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["cup_color_note"] },
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
    "Did I mention the starting weight compared to the ending weight?",
    "Did I mention that the water tasted salty all the way through?",
    "Did I explain what actually happens to matter when something dissolves?",
    "Did I avoid saying some of the matter is gone after the salt dissolves?",
  ],
};
