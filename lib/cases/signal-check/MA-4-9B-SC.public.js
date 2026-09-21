// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.4.9B-SC. TEKS 4.9B — solve one- and two-step problems using data in whole number, decimal, and fraction form in a frequency table, dot plot, or stem-and-leaf plot.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.4.9B-SC",
  teksLabel: "4.9B",
  grade: 4,
  subject: "Math",
  title: "The Shoe Size Survey",
  tagline: "Size 7 is the most common shoe size in our class.",
  transmission: {
    claimHeadline: "Size 7 is the most common shoe size in our class.",
    source: "Class Shoe Survey Dot Plot",
    loggedAt: "Room 8",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Five students wear size 7.",
      correctVerdict: "True",
      reasonText: "Size 7 has 5 dots, and each dot stands for one student.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "No size on the plot has more dots than size 7.",
      correctVerdict: "False",
      reasonText: "Size 5½ has 6 dots, which is the tallest stack on the plot.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Size 7 is the most common whole-number size, so it's the most common size.",
      correctVerdict: "Misleading",
      reasonText: "Size 7 does have the most dots of the whole sizes, but half sizes count too, and 5½ has more.",
    },
  ],

  evidenceReadings: [
    { id: "dots_7", label: "Size 7 column", reading: "Size 7 has 5 dots.", kind: "data" },
    { id: "each_dot", label: "Dot key", reading: "Each dot stands for one student.", kind: "data" },
    { id: "dots_55", label: "Size 5½ column", reading: "Size 5½ has 6 dots.", kind: "data" },
    { id: "tallest", label: "Tallest stack", reading: "The tallest stack on the dot plot is at 5½.", kind: "data" },
    { id: "whole_sizes", label: "Whole sizes", reading: "Among the whole sizes (4, 5, 6, 7, 8), size 7 has the most dots.", kind: "data" },
    { id: "half_sizes", label: "Half sizes", reading: "The plot includes half sizes like 4½, 5½, and 6½.", kind: "data" },
    { id: "monday", label: "Survey day", reading: "The survey was taken on a Monday.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["dots_7", "each_dot"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["dots_55", "tallest"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["whole_sizes", "half_sizes"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["monday"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — the stem gets you started.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I use the number of dots for size 7?",
    "Did I check the half sizes, not just the whole sizes?",
    "Did I name the most common size?",
    "Did I use real numbers from the dot plot in my reasoning?",
  ],
};
