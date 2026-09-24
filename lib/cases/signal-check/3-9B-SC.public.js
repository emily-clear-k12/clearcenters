// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.9B covers the relative
// distances of the planets from the sun. Freshly framed for Signal Check —
// NOT a reworded version of the Group Chat "3.9B" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.9B-SC",
  teksLabel: "3.9B",
  grade: 3,
  subject: "Science",
  title: "Who Goes First?",
  tagline: "The biggest planet should be the one closest to the sun.",
  transmission: {
    claimHeadline: "The biggest planet should be the one closest to the sun.",
    source: "Solar System Model Line-Up",
    loggedAt: "Model Check",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Mercury is one of the smallest planets, and it is the closest to the sun.",
      correctVerdict: "True",
      reasonText: "Mercury's size data shows it is one of the smallest planets. The distance data puts it closest to the sun.",
      stemEvidenceIds: ["mercury_size", "mercury_distance"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Jupiter is one of the largest planets, and it is much farther out.",
      correctVerdict: "True",
      reasonText: "Jupiter's size data shows it is the largest planet. The distance data puts it fifth from the sun.",
      stemEvidenceIds: ["jupiter_size", "jupiter_distance"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A planet's size decides how far it is from the sun.",
      correctVerdict: "False",
      reasonText: "The class used real distance data, not size, to place each planet. A planet's distance from the sun has nothing to do with its size.",
      stemEvidenceIds: ["model_tape", "order_note"],
    },
  ],

  evidenceReadings: [
    { id: "mercury_size", label: "Mercury size data", reading: "Mercury is about 4,880 km across. It is one of the smallest planets.", kind: "data" },
    { id: "mercury_distance", label: "Mercury distance data", reading: "Mercury is the closest planet to the sun in the model.", kind: "data" },
    { id: "jupiter_size", label: "Jupiter size data", reading: "Jupiter is about 139,820 km across. It is the largest planet.", kind: "data" },
    { id: "jupiter_distance", label: "Jupiter distance data", reading: "Jupiter is far out, fifth from the sun in the model.", kind: "data" },
    { id: "model_tape", label: "Model measuring tape", reading: "The class placed each planet using real distance data, not size.", kind: "data" },
    { id: "order_note", label: "Astronomer's note", reading: "The order of the planets depends on how far they orbit from the sun. Size has nothing to do with it.", kind: "data" },
    { id: "planet_color", label: "Color note", reading: "The Jupiter model was painted with extra orange stripes.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["mercury_size", "mercury_distance"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["jupiter_size", "jupiter_distance"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["model_tape", "order_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["planet_color"] },
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
    "Did I mention Mercury's size and its position closest to the sun?",
    "Did I mention Jupiter's size and its position far from the sun?",
    "Did I explain what actually decides a planet's order from the sun?",
    "Did I avoid saying the biggest planet should be closest to the sun?",
  ],
};
