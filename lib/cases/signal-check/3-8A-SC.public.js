// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.8A covers exploring
// different forms of energy. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "3.8A" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.8A-SC",
  teksLabel: "3.8A",
  grade: 3,
  subject: "Science",
  title: "Does It Need a Plug?",
  tagline: "If it is not plugged into the wall, it cannot have any energy at all.",
  transmission: {
    claimHeadline: "If it is not plugged into the wall, it cannot have any energy at all.",
    source: "Backyard Path Light Check",
    loggedAt: "Night 5",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The solar path light turns on every night with no cord.",
      correctVerdict: "True",
      reasonText: "The night light log and the cord check agree. It turned on 5 nights in a row with no cord or plug.",
      stemEvidenceIds: ["night_log", "no_cord_check"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The same light stops working when its solar panel is covered for a week.",
      correctVerdict: "True",
      reasonText: "In the covered panel test, the light stopped by day 4. It worked again once the panel was uncovered.",
      stemEvidenceIds: ["covered_test", "uncovered_test"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Only plugged-in things have energy.",
      correctVerdict: "False",
      reasonText: "A flashlight with batteries also has stored energy and no cord. Energy can come from batteries or sunlight, not just a wall plug.",
      stemEvidenceIds: ["battery_note", "energy_definition"],
    },
  ],

  evidenceReadings: [
    { id: "night_log", label: "Night light log", reading: "The path light turned on by itself every night for 5 nights in a row.", kind: "data" },
    { id: "no_cord_check", label: "Cord check", reading: "There is no cord or plug on the light. It just has a small solar panel on top.", kind: "data" },
    { id: "covered_test", label: "Covered panel test", reading: "The solar panel was covered with a box for one week. The light stopped turning on by day 4.", kind: "data" },
    { id: "uncovered_test", label: "Uncovered panel test", reading: "Once the box came off, the light worked again after one sunny day.", kind: "data" },
    { id: "battery_note", label: "Battery note", reading: "A flashlight with batteries also has energy stored inside it. It has no cord at all.", kind: "data" },
    { id: "energy_definition", label: "Science definition note", reading: "Energy can be stored in batteries or come from sunlight. A wall plug is just one way to get it.", kind: "data" },
    { id: "light_color", label: "Light color note", reading: "The path light glows a pale blue-white at night.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["night_log", "no_cord_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["covered_test", "uncovered_test"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["battery_note", "energy_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["light_color"] },
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
    "Did I mention that the light works every night with no cord?",
    "Did I explain what happened when the solar panel was covered?",
    "Did I name another way something can have energy without being plugged in?",
    "Did I avoid saying only plugged-in things have energy?",
  ],
};
