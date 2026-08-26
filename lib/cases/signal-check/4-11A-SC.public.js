// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11A covers identifying
// and explaining advantages and disadvantages of using Earth's renewable
// and nonrenewable natural resources. Freshly framed for Signal Check —
// NOT a reworded version of any Group Chat trap line (see COVERAGE_MAP.md
// rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.11A-SC",
  teksLabel: "4.11A",
  grade: 4,
  subject: "Science",
  title: "Does the Wind Turbine Work Every Single Day?",
  tagline: "Wind is renewable, so it never runs out — that means the turbine must make power every single day with no downside at all.",
  transmission: {
    claimHeadline: "Wind is renewable, so it never runs out — that means the turbine must make power every single day with no downside at all.",
    source: "Turbine Power Log",
    loggedAt: "30-Day Reading",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The power log shows zero electricity made on three calm days last month.",
      correctVerdict: "True",
      reasonText: "Comparing calm days and windy days in the log shows the turbine's output changes with the weather.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The wind itself never gets used up — it's just as available next month, whether or not the turbine used it today.",
      correctVerdict: "True",
      reasonText: "That's the real meaning of renewable — the resource keeps coming back, even on a day the turbine can't use it.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The turbine makes power every single day with no downside at all.",
      correctVerdict: "False",
      reasonText: "Wind has a real downside: it isn't always available exactly when it's needed, even though the wind resource itself won't run out.",
    },
  ],

  evidenceReadings: [
    { id: "power_log_calm", label: "Power log, calm days", reading: "The power log shows zero electricity made on three calm days last month.", kind: "data" },
    { id: "power_log_windy", label: "Power log, windy days", reading: "The same log shows plenty of electricity made on the ten windiest days that month.", kind: "data" },
    { id: "resource_renew_note", label: "Science note", reading: "Wind keeps forming again and again, whether or not the turbine uses it on a given day.", kind: "data" },
    { id: "supply_never_runs_out_note", label: "Science note", reading: "A resource being renewable means it won't run out over time — coal and oil can't say the same.", kind: "data" },
    { id: "output_gap_note", label: "Monthly total", reading: "Counting up the whole month, the turbine made zero power on 8 of the 30 days.", kind: "data" },
    { id: "weather_dependency_note", label: "Science note", reading: "How much power a wind turbine makes depends completely on the weather that day.", kind: "data" },
    { id: "turbine_color_note", label: "Turbine note", reading: "The turbine blades are painted white so airplane pilots can see them.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["power_log_calm", "power_log_windy"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["resource_renew_note", "supply_never_runs_out_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["output_gap_note", "weather_dependency_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["turbine_color_note"] },
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
    "Did I mention the calm days when the turbine made no power?",
    "Did I explain what renewable actually means for the wind resource itself?",
    "Did I mention the real downside of relying on wind?",
    "Did I avoid saying the turbine makes power every day with no downside?",
  ],
};
