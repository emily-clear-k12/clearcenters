// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.3.9E-SC. TEKS 3.9E(ii) — recognize characteristics and structures of argumentative text by distinguishing facts from opinion.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.3.9E-SC",
  teksLabel: "3.9E",
  grade: 3,
  subject: "ELAR",
  title: "The Cereal Ad",
  tagline: "Everything the Crunch-O's ad tells you is a fact.",
  transmission: {
    claimHeadline: "Everything the Crunch-O's ad tells you is a fact.",
    source: "Crunch-O's Ad",
    loggedAt: "Back cover",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Crunch-O's have 8 grams of fiber in every bowl.",
      correctVerdict: "True",
      reasonText: "This is a fact you can check, and the nutrition label on the box shows it.",
      stemEvidenceIds: ["fiber", "box"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Crunch-O's is the best breakfast ever.",
      correctVerdict: "False",
      reasonText: "\"Best ever\" is an opinion. It tells what someone thinks and can't be proven.",
      stemEvidenceIds: ["best", "opinion_def"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "All kids love Crunch-O's.",
      correctVerdict: "Misleading",
      reasonText: "It sounds like a fact. But nobody could check if every kid in the world loves Crunch-O's.",
      stemEvidenceIds: ["all_kids", "prove"],
    },
  ],

  evidenceReadings: [
    { id: "fiber", label: "Fiber line", reading: "\"Crunch-O's have 8 grams of fiber in every bowl!\"", kind: "data" },
    { id: "box", label: "Nutrition label", reading: "The side of the box lists 8 grams of fiber per bowl.", kind: "data" },
    { id: "best", label: "Best line", reading: "\"The BEST breakfast ever!\"", kind: "data" },
    { id: "opinion_def", label: "What an opinion is", reading: "An opinion tells what someone thinks or feels. It can't be proven.", kind: "data" },
    { id: "all_kids", label: "All kids line", reading: "\"All kids love Crunch-O's!\"", kind: "data" },
    { id: "prove", label: "Proof check", reading: "No one could ask every kid in the world whether they love Crunch-O's.", kind: "data" },
    { id: "magazine", label: "Where it ran", reading: "The ad is printed on the back of a magazine.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["fiber", "box"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["best", "opinion_def"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["all_kids", "prove"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["magazine"] },
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
    "Did I find the fact I could check?",
    "Did I find the opinion?",
    "Did I explain why 'all kids love it' can't be proven?",
    "Did I avoid calling everything a fact?",
  ],
};
