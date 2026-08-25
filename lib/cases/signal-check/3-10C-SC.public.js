// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10C covers slow changes
// to Earth's surface over time. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "3.10C" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.10C-SC",
  teksLabel: "3.10C",
  grade: 3,
  subject: "Science",
  title: "Sudden or Slow?",
  tagline: "The creek bank looks totally different than it did last year, so something sudden must have happened overnight.",
  transmission: {
    claimHeadline: "The creek bank looks totally different than it did last year, so something sudden must have happened overnight.",
    source: "Creek Bank Trail Cam",
    loggedAt: "Week 48 of 52",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The creek bank has changed shape since last year.",
      correctVerdict: "True",
      reasonText: "Last year's photo shows a straight bank; this year's photo shows a wide curve worn into it.",
      stemEvidenceIds: ["year_photo", "now_photo"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "This kind of change usually happens all at once, overnight.",
      correctVerdict: "False",
      reasonText: "Weekly photos show the curve growing a little at a time, with no single storm or flood event recorded.",
      stemEvidenceIds: ["weekly_log", "no_single_event"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Small amounts of change add up over a long time to make a big difference.",
      correctVerdict: "True",
      reasonText: "Adding up all the weekly measurements matches the full size of this year's curve.",
      stemEvidenceIds: ["total_change", "slow_current"],
    },
  ],

  evidenceReadings: [
    { id: "year_photo", label: "Last year's photo", reading: "Shows a straight creek bank with no curve.", kind: "photo" },
    { id: "now_photo", label: "This year's photo", reading: "Shows the same spot with a wide curve worn into the bank.", kind: "photo" },
    { id: "weekly_log", label: "Weekly photo log", reading: "Photos across the year show the curve growing a little bit at a time, week by week.", kind: "data" },
    { id: "no_single_event", label: "Storm event log", reading: "No single storm or flood event was recorded the week the curve first appeared.", kind: "data" },
    { id: "total_change", label: "Measurement total", reading: "Adding up all the weekly measurements matches the full size of this year's curve.", kind: "data" },
    { id: "slow_current", label: "Current flow log", reading: "The current at that bend has been slowly wearing at the bank every week.", kind: "data" },
    { id: "bank_color", label: "Color note", reading: "The creek bank near the curve turned a slightly lighter tan color this year.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["year_photo", "now_photo"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["weekly_log", "no_single_event"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["total_change", "slow_current"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["bank_color"] },
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
    "Did I use the before-and-after photos in my reasoning?",
    "Did I explain why the change didn't happen all at once?",
    "Did I explain how small weekly changes added up to the big change?",
    "Did I avoid saying something sudden happened overnight?",
  ],
};
