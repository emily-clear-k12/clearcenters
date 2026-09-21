// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.5.9C-SC. TEKS 5.9C — solve one- and two-step problems using data from a frequency table, dot plot, bar graph, stem-and-leaf plot, or scatterplot.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.5.9C-SC",
  teksLabel: "5.9C",
  grade: 5,
  subject: "Math",
  title: "Under a Minute",
  tagline: "Eleven students ran the sprint in under a minute.",
  transmission: {
    claimHeadline: "Eleven students ran the sprint in under a minute.",
    source: "Field Day Sprint Scatterplot",
    loggedAt: "Field Day",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Eight dots are below the 60-second line.",
      correctVerdict: "True",
      reasonText: "Counting the dots below the 60-second line gives 8, and each dot is one student.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Eleven students ran the sprint in under a minute.",
      correctVerdict: "False",
      reasonText: "Three of the eleven dots sit exactly on 60 seconds. Exactly one minute is not under a minute.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Every student who practiced more days ran faster.",
      correctVerdict: "Misleading",
      reasonText: "Most dots follow that pattern, but two students who practiced 10 days ran slower than 60 seconds.",
    },
  ],

  evidenceReadings: [
    { id: "below", label: "Below the line", reading: "Eight dots sit below the 60-second line.", kind: "data" },
    { id: "dot_key", label: "Dot key", reading: "Each dot shows one student: days practiced across the bottom, sprint time up the side.", kind: "data" },
    { id: "on_line", label: "On the line", reading: "Three dots sit exactly on the 60-second line.", kind: "data" },
    { id: "under_def", label: "Under a minute", reading: "\"Under a minute\" means less than 60 seconds.", kind: "data" },
    { id: "trend", label: "Trend", reading: "Most dots slope down: more practice days usually went with faster times.", kind: "data" },
    { id: "exceptions", label: "Two exceptions", reading: "Two students who practiced 10 days ran 64 and 66 seconds.", kind: "data" },
    { id: "track", label: "Location", reading: "The race was run on the school track.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["below", "dot_key"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["on_line", "under_def"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["trend", "exceptions"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["track"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I count the dots below 60 seconds?",
    "Did I decide what to do with the dots exactly on 60 seconds?",
    "Did I check whether the trend fits every student?",
    "Did I use real numbers from the scatterplot?",
  ],
};
