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
  tagline: "Checking the weather forecast is pointless because it's just guessing.",
  transmission: {
    claimHeadline: "Checking the weather forecast is pointless because it's just guessing.",
    source: "Weekly Weather Log",
    loggedAt: "Day 5 of 5",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "This week's forecast matched what actually happened most days.",
      correctVerdict: "True",
      reasonText: "Two different days show the forecast and the actual weather lining up exactly.",
      stemEvidenceIds: ["monday_match", "wednesday_match"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A forecast can be wrong when weather patterns shift fast.",
      correctVerdict: "True",
      reasonText: "Friday's forecast missed because a fast-moving system rolled in — those are harder to predict days ahead.",
      stemEvidenceIds: ["friday_miss", "fastmove_note"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since the forecast was wrong once, forecasts are never useful.",
      correctVerdict: "False",
      reasonText: "The forecast matched 4 out of 5 days, and people who plan around the weather still rely on it every day.",
      stemEvidenceIds: ["weeklog_tally", "forecast_use_note"],
    },
  ],

  evidenceReadings: [
    { id: "monday_match", label: "Monday log", reading: "Forecast said sunny — actual weather was sunny.", kind: "data" },
    { id: "wednesday_match", label: "Wednesday log", reading: "Forecast said rain — actual weather was rain.", kind: "data" },
    { id: "friday_miss", label: "Friday log", reading: "Forecast said clear — a fast-moving cloud system rolled in and it rained instead.", kind: "data" },
    { id: "fastmove_note", label: "Weather station note", reading: "Fast-moving systems are harder to predict days in advance.", kind: "data" },
    { id: "weeklog_tally", label: "Week tally", reading: "The forecast matched actual weather on 4 out of 5 days this week.", kind: "data" },
    { id: "forecast_use_note", label: "Field use note", reading: "Farmers and pilots still check the forecast every day to plan their work.", kind: "data" },
    { id: "new_thermometer", label: "Station equipment note", reading: "The weather station got a brand new thermometer this week — same readings as the old one.", kind: "distractor" },
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
