// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10A covers weather
// patterns/forecasting. Freshly framed for Signal Check — NOT a reworded
// version of the Group Chat "3.10A" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list
// on the Scan screen and evidence panels, per SIGNAL_CHECK_CHECKLIST.md.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.10A-SC",
  teksLabel: "3.10A",
  grade: 3,
  subject: "Science",
  title: "Just a Guess?",
  tagline: "Checking the weather forecast is pointless because it is just guessing.",
  transmission: {
    claimHeadline: "Checking the weather forecast is pointless because it is just guessing.",
    source: "Weekly Weather Log",
    loggedAt: "Day 5 of 5",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/3-10a-sc-field-report.jpg",
    imageCaption: "Weekly Weather Log — May 12–16",
    notes: "On Monday, Tuesday, and Wednesday, the forecast and the real weather match. On Thursday, both show clouds. Friday's forecast was crossed out. It never got filled in as \"clear.\" The real weather that day was rain.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "This week's forecast matched the real weather on most days.",
      correctVerdict: "True",
      reasonText: "On two days, the forecast and the real weather match exactly.",
      stemEvidenceIds: ["monday_match", "wednesday_match"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A forecast can be wrong when the weather changes fast.",
      correctVerdict: "True",
      reasonText: "Friday's forecast missed because a fast-moving weather system rolled in. Those are hard to predict days ahead.",
      stemEvidenceIds: ["friday_miss", "fastmove_note"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The forecast was wrong once, so forecasts are never useful.",
      correctVerdict: "False",
      reasonText: "The forecast matched 4 out of 5 days. People who plan around the weather still use it each day.",
      stemEvidenceIds: ["weeklog_tally", "forecast_use_note"],
    },
  ],

  evidenceReadings: [
    { id: "monday_match", label: "Monday log", reading: "Forecast said sunny. The real weather was sunny.", kind: "data" },
    { id: "wednesday_match", label: "Wednesday log", reading: "Forecast said rain. The real weather was rain.", kind: "data" },
    { id: "friday_miss", label: "Friday log", reading: "Forecast said clear. A fast-moving weather system rolled in, and it rained.", kind: "data" },
    { id: "fastmove_note", label: "Weather station note", reading: "A fast-moving weather system is hard to predict days ahead.", kind: "data" },
    { id: "weeklog_tally", label: "Week tally", reading: "The forecast matched the real weather on 4 out of 5 days this week.", kind: "data" },
    { id: "forecast_use_note", label: "Field use note", reading: "Farmers and pilots still check the forecast every day to plan their work.", kind: "data" },
    { id: "new_thermometer", label: "Station equipment note", reading: "The weather station got a new thermometer this week. It reads the same as the old one.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["monday_match", "wednesday_match"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["friday_miss", "fastmove_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["weeklog_tally", "forecast_use_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["new_thermometer"] },
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
    "Did I mention that the forecast matched most days this week?",
    "Did I explain why a forecast can still be wrong sometimes?",
    "Did I explain why one miss doesn't make forecasts useless?",
    "Did I avoid saying the forecast is always exactly right?",
  ],
};
