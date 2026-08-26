// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10B covers modeling and
// describing the processes that lead to the formation of sedimentary
// rocks and fossil fuels. Freshly framed for Signal Check — NOT a
// reworded version of any Group Chat trap line (see COVERAGE_MAP.md
// rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.10B-SC",
  teksLabel: "5.10B",
  grade: 5,
  subject: "Science",
  title: "Can You Really Squish Dirt Into Rock in a Day?",
  tagline: "If you pile up enough mud and squish it hard enough, it'll turn into solid rock by tomorrow.",
  transmission: {
    claimHeadline: "If you pile up enough mud and squish it hard enough, it'll turn into solid rock by tomorrow.",
    source: "Classroom Mud Jar Test",
    loggedAt: "Day 1 & Day 2",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A jar of layered mud and sand, pressed hard by hand, is still soft and crumbly the very next day.",
      correctVerdict: "True",
      reasonText: "Hard squishing for a short time clearly wasn't enough to turn the mud into rock.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Real sedimentary rock samples show hundreds of thin, tightly packed layers that took an estimated thousands of years to build up.",
      correctVerdict: "True",
      reasonText: "That huge number of layers and that long estimated timescale is direct evidence real rock formation is a slow process.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Mud can be squished into solid rock in a single day.",
      correctVerdict: "False",
      reasonText: "Sedimentary rock forms as layers of sediment are slowly buried, pressed, and cemented together over a very long time, not in a day.",
    },
  ],

  evidenceReadings: [
    { id: "squish_test_day1", label: "Jar test, day 1", reading: "A jar of layered mud and sand, pressed hard by hand, is soft and crumbly right after squishing.", kind: "data" },
    { id: "squish_test_day2", label: "Jar test, day 2", reading: "The same jar checked the next day is still soft and crumbly, with no rock formed.", kind: "data" },
    { id: "rock_layer_count", label: "Rock sample layers", reading: "A real sedimentary rock sample, cut in half, shows hundreds of thin, tightly packed layers.", kind: "data" },
    { id: "rock_age_note", label: "Rock sample age", reading: "Scientists estimate that sample's layers took thousands of years to build up.", kind: "data" },
    { id: "formation_process_note", label: "Science note", reading: "Sedimentary rock forms as layers of sediment slowly get buried, pressed, and cemented together over a very long time.", kind: "data" },
    { id: "fossil_fuel_note", label: "Science note", reading: "Fossil fuels form through a similarly slow process, as buried plant and animal material changes under pressure and heat over millions of years.", kind: "data" },
    { id: "jar_size_note", label: "Jar note", reading: "The test jar held about two cups of material.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["squish_test_day1", "squish_test_day2"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rock_layer_count", "rock_age_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["formation_process_note", "fossil_fuel_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["jar_size_note"] },
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
    "Did I mention what the mud jar looked like the day after squishing?",
    "Did I mention how many layers the real rock sample had, and how long they took to form?",
    "Did I explain the actual process that forms sedimentary rock?",
    "Did I avoid saying mud can be squished into rock in a single day?",
  ],
};
