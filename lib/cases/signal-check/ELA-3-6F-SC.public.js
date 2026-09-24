// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.3.6F-SC. TEKS 3.6F — make inferences and use evidence to support understanding.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.3.6F-SC",
  teksLabel: "3.6F",
  grade: 3,
  subject: "ELAR",
  title: "Who Are These Two?",
  tagline: "Max and Lily are brother and sister.",
  transmission: {
    claimHeadline: "Max and Lily are brother and sister.",
    source: "Story: \"The Last Pancake\"",
    loggedAt: "Page 1",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The story says the words \"Max is Lily's brother.\"",
      correctVerdict: "False",
      reasonText: "The story never says it straight out, so you have to infer it from clues.",
      stemEvidenceIds: ["never_says", "infer_rule"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Mom tells Lily to share with her brother.",
      correctVerdict: "True",
      reasonText: "Mom says, \"Lily, share with your brother.\" Max and Lily sit at the same table in their pajamas.",
      stemEvidenceIds: ["mom", "table"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The clues show Max and Lily are brother and sister.",
      correctVerdict: "True",
      reasonText: "They ride in the back of the family car together to visit their Aunt Rosa.",
      stemEvidenceIds: ["car", "aunt"],
    },
  ],

  evidenceReadings: [
    { id: "never_says", label: "Word check", reading: "Nowhere does the story say \"Max is Lily's brother.\"", kind: "data" },
    { id: "infer_rule", label: "Inference tip", reading: "An inference uses clues from the text plus what you already know.", kind: "data" },
    { id: "mom", label: "Mom's words", reading: "\"Mom said, 'Lily, share with your brother.'\"", kind: "data" },
    { id: "table", label: "Breakfast", reading: "\"Max and Lily sat at the kitchen table in their pajamas.\"", kind: "data" },
    { id: "car", label: "The car ride", reading: "\"They both climbed into the back of the family car.\"", kind: "data" },
    { id: "aunt", label: "Aunt Rosa", reading: "\"They were going to visit their Aunt Rosa.\"", kind: "data" },
    { id: "blueberry", label: "Pancakes", reading: "The pancakes were blueberry.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["never_says", "infer_rule"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["mom", "table"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["car", "aunt"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["blueberry"] },
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
    "Did I check whether the story says it straight out?",
    "Did I use what Mom said?",
    "Did I use at least two clues?",
    "Did I explain how the clues add up?",
  ],
};
