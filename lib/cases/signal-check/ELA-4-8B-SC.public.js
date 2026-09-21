// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.4.8B-SC. TEKS 4.8B — explain the interactions of the characters and the changes they undergo.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.4.8B-SC",
  teksLabel: "4.8B",
  grade: 4,
  subject: "ELAR",
  title: "Who Changed?",
  tagline: "Coach Leo is the character who changes the most in the story.",
  transmission: {
    claimHeadline: "Coach Leo is the character who changes the most in the story.",
    source: "Story: \"The Deep End\"",
    loggedAt: "Summer",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Coach Leo is helpful and patient at the start and at the end.",
      correctVerdict: "True",
      reasonText: "Coach Leo waits patiently in June and waits patiently in August, just like always.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Ana goes from being afraid of the deep end to diving in on her own.",
      correctVerdict: "True",
      reasonText: "In June, Ana won't let go of the wall. In August, she dives in by herself.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Coach Leo changes the most.",
      correctVerdict: "False",
      reasonText: "Coach Leo acts the same from start to end. Ana is the one who changes.",
    },
  ],

  evidenceReadings: [
    { id: "leo_start", label: "Coach Leo in June", reading: "\"Coach Leo waited patiently while Ana held the wall.\"", kind: "data" },
    { id: "leo_end", label: "Coach Leo in August", reading: "\"Coach Leo waited patiently at the edge, just like always.\"", kind: "data" },
    { id: "ana_start", label: "Ana in June", reading: "\"Ana wouldn't let go of the wall in the deep end.\"", kind: "data" },
    { id: "ana_end", label: "Ana in August", reading: "\"On the last day, Ana dove in by herself.\"", kind: "data" },
    { id: "change_tip", label: "Character change", reading: "A character changes when they think, feel, or act differently at the end than at the start.", kind: "data" },
    { id: "same_leo", label: "Leo check", reading: "Nothing about how Coach Leo acts is different by the end.", kind: "data" },
    { id: "labor_day", label: "Pool schedule", reading: "The pool closes on Labor Day.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["leo_start", "leo_end"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["ana_start", "ana_end"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["change_tip", "same_leo"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["labor_day"] },
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
    "Did I compare Coach Leo at the start and end?",
    "Did I compare Ana at the start and end?",
    "Did I name the character who really changes?",
    "Did I explain what counts as a change?",
  ],
};
