// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.5.10C-SC. TEKS 5.10C — analyze the author's use of print and graphic features to achieve specific purposes.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.5.10C-SC",
  teksLabel: "5.10C",
  grade: 5,
  subject: "ELAR",
  title: "Chart or Text?",
  tagline: "The graph says the same thing as the paragraph.",
  transmission: {
    claimHeadline: "The graph says the same thing as the paragraph.",
    source: "School Garden Report",
    loggedAt: "Fall harvest",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The paragraph is counting how many plants were grown.",
      correctVerdict: "True",
      reasonText: "The paragraph says the garden grew 18 tomato plants, more than any other plant.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The graph is showing how many pounds of food were harvested.",
      correctVerdict: "True",
      reasonText: "The graph is titled 'Pounds Harvested,' and peppers have the tallest bar at 42 pounds.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The graph proves the paragraph is wrong.",
      correctVerdict: "Misleading",
      reasonText: "They seem to disagree, but the paragraph counts plants and the graph measures pounds, so both can be true.",
    },
  ],

  evidenceReadings: [
    { id: "para", label: "Paragraph", reading: "\"We grew more tomato plants than anything else — 18 of them!\"", kind: "data" },
    { id: "plants_count", label: "Plant count", reading: "The garden had 18 tomato plants, 10 pepper plants, and 8 squash plants.", kind: "data" },
    { id: "graph_title", label: "Graph title", reading: "The graph is titled \"Pounds Harvested.\"", kind: "data" },
    { id: "graph_bars", label: "Graph bars", reading: "Peppers: 42 pounds. Tomatoes: 35 pounds. Squash: 30 pounds.", kind: "data" },
    { id: "measures", label: "Two measures", reading: "The paragraph counts plants. The graph measures pounds of food.", kind: "data" },
    { id: "both_true", label: "Check", reading: "A garden can have the most tomato plants and still harvest the most pounds of peppers.", kind: "data" },
    { id: "cafeteria", label: "Location", reading: "The garden is behind the cafeteria.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["para", "plants_count"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["graph_title", "graph_bars"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["measures", "both_true"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["cafeteria"] },
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
    "Did I say what the paragraph measures?",
    "Did I say what the graph measures?",
    "Did I explain whether they really disagree?",
    "Did I use the graph's title?",
  ],
};
