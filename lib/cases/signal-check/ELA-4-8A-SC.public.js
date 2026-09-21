// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.4.8A-SC. TEKS 4.8A — infer basic themes supported by text evidence.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.4.8A-SC",
  teksLabel: "4.8A",
  grade: 4,
  subject: "ELAR",
  title: "Only One of Them",
  tagline: "The theme of the story is that hard work always pays off.",
  transmission: {
    claimHeadline: "The theme of the story is that hard work always pays off.",
    source: "Story: \"The Last Word\"",
    loggedAt: "Chapter 3",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Maya studied hard and won.",
      correctVerdict: "True",
      reasonText: "Maya studied her word list every night for a month and won the spelling bee.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Jonah studied just as hard and did not win.",
      correctVerdict: "True",
      reasonText: "Jonah studied the same list every night beside Maya, but he missed the last word.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The story shows that hard work always pays off.",
      correctVerdict: "Misleading",
      reasonText: "It fits Maya, but Jonah worked just as hard and lost. The ending shows he still grew, so the theme is about effort mattering even without a win.",
    },
  ],

  evidenceReadings: [
    { id: "maya_study", label: "Maya's practice", reading: "\"Maya studied her word list every night for a month.\"", kind: "data" },
    { id: "maya_win", label: "The winner", reading: "\"Maya spelled 'rhythm' correctly and won the bee.\"", kind: "data" },
    { id: "jonah_study", label: "Jonah's practice", reading: "\"Jonah studied the same list every night, right beside her.\"", kind: "data" },
    { id: "jonah_miss", label: "Jonah's word", reading: "\"Jonah missed on the very last word.\"", kind: "data" },
    { id: "jonah_real", label: "Jonah's realization", reading: "\"Jonah realized he had spelled words that night he couldn't spell a month ago.\"", kind: "data" },
    { id: "theme_tip", label: "Theme tip", reading: "A theme has to fit the whole story, not just one character.", kind: "data" },
    { id: "gym", label: "Where", reading: "The spelling bee was held in the gym.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["maya_study", "maya_win"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["jonah_study", "jonah_miss"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["jonah_real", "theme_tip"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["gym"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — the stem gets you started.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I use what happened to Maya?",
    "Did I use what happened to Jonah?",
    "Did I check whether the theme fits the whole story?",
    "Did I state a better theme?",
  ],
};
