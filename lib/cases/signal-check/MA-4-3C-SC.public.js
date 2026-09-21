// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.4.3C-SC. TEKS 4.3C — determine if two given fractions are equivalent using a variety of methods.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.4.3C-SC",
  teksLabel: "4.3C",
  grade: 4,
  subject: "Math",
  title: "The Two Fish Tanks",
  tagline: "The two tanks hold the same amount of water. One is 6/8 full and the other is 3/4 full.",
  transmission: {
    claimHeadline: "The two tanks hold the same amount of water. One is 6/8 full and the other is 3/4 full.",
    source: "Pet Shop Tank Log",
    loggedAt: "Morning check",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "6/8 and 3/4 look different, so they can't be equal.",
      correctVerdict: "False",
      reasonText: "Fraction strips show 6/8 and 3/4 cover the same length of the same whole.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Doubling both parts of 3/4 gives 6/8.",
      correctVerdict: "True",
      reasonText: "3 × 2 = 6 and 4 × 2 = 8, so 3/4 = 6/8.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since 6/8 = 3/4, both tanks hold the same amount of water.",
      correctVerdict: "Misleading",
      reasonText: "The fractions are equivalent, but Tank A holds 10 gallons and Tank B holds 20, so the amounts are different.",
    },
  ],

  evidenceReadings: [
    { id: "model", label: "Fraction strips", reading: "A strip cut into 8 parts with 6 shaded covers the same length as a same-size strip cut into 4 parts with 3 shaded.", kind: "data" },
    { id: "tankA", label: "Tank A", reading: "Tank A is marked in 8 equal sections. The water reaches the 6th line.", kind: "data" },
    { id: "doubling", label: "Doubling", reading: "3/4 = (3 × 2)/(4 × 2) = 6/8.", kind: "data" },
    { id: "tankB", label: "Tank B", reading: "Tank B is marked in 4 equal sections. The water reaches the 3rd line.", kind: "data" },
    { id: "sizes", label: "Tank sizes", reading: "Tank A holds 10 gallons when full. Tank B holds 20 gallons when full.", kind: "data" },
    { id: "wholes", label: "Same whole rule", reading: "Equivalent fractions name the same amount only when they are parts of the same whole.", kind: "data" },
    { id: "castle", label: "Tank decoration", reading: "Tank B has a castle in it.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["model", "tankA"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["doubling", "tankB"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sizes", "wholes"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["castle"] },
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
    "Did I show that 6/8 and 3/4 are equivalent?",
    "Did I check how big each tank is?",
    "Did I explain why equal fractions can mean different amounts?",
    "Did I use a model or numbers as evidence?",
  ],
};
