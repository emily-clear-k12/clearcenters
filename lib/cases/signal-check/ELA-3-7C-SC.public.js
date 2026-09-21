// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.3.7C-SC. TEKS 3.7C — use text evidence to support an appropriate response.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.3.7C-SC",
  teksLabel: "3.7C",
  grade: 3,
  subject: "ELAR",
  title: "Why Ellie Left",
  tagline: "Ellie left the piano recital early because she was nervous.",
  transmission: {
    claimHeadline: "Ellie left the piano recital early because she was nervous.",
    source: "Story: \"Recital Night\"",
    loggedAt: "Page 2",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Ellie had already played her piece before she left.",
      correctVerdict: "True",
      reasonText: "The story says Ellie played her piece third and took a bow before she left.",
      stemEvidenceIds: ["played", "bow"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The story shows Ellie was nervous about playing.",
      correctVerdict: "False",
      reasonText: "Ellie smiled the whole time and never missed a key, and the story never says she was nervous.",
      stemEvidenceIds: ["smile", "no_fear"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Ellie left so she could get to Grandma's birthday dinner.",
      correctVerdict: "True",
      reasonText: "Ellie never misses Grandma's birthday dinner, and it started at 6:00 while the recital was still going.",
      stemEvidenceIds: ["dinner", "time"],
    },
  ],

  evidenceReadings: [
    { id: "played", label: "Her turn", reading: "\"Ellie played her piece third.\"", kind: "data" },
    { id: "bow", label: "The bow", reading: "\"When she finished, she stood up and took a bow.\"", kind: "data" },
    { id: "smile", label: "How she played", reading: "\"Her fingers never missed a key, and she smiled the whole time.\"", kind: "data" },
    { id: "no_fear", label: "Feelings check", reading: "The story never says Ellie felt nervous or scared.", kind: "data" },
    { id: "dinner", label: "Grandma's dinner", reading: "\"Ellie had never missed Grandma's birthday dinner.\"", kind: "data" },
    { id: "time", label: "Dinner time", reading: "\"Dinner started at 6:00. At 5:45, the recital still had three songs left.\"", kind: "data" },
    { id: "auditorium", label: "Where", reading: "The recital was in the school auditorium.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["played", "bow"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["smile", "no_fear"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["dinner", "time"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["auditorium"] },
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
    "Did I use what Ellie did before she left?",
    "Did I check whether the story shows Ellie was nervous?",
    "Did I find the real reason Ellie left?",
    "Did I use the story instead of a guess?",
  ],
};
