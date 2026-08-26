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
      text: "Mercury, one of the smallest planets, measures as the closest to the sun.",
      correctVerdict: "True",
      reasonText: "Mercury's size data shows it's one of the smallest planets, and the distance data places it closest to the sun in the model.",
      stemEvidenceIds: ["mercury_size", "mercury_distance"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Jupiter, one of the largest planets, measures much farther out.",
      correctVerdict: "True",
      reasonText: "Jupiter's size data shows it's the largest planet, and the distance data places it in fifth position from the sun.",
      stemEvidenceIds: ["jupiter_size", "jupiter_distance"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A planet's distance from the sun is decided by its size.",
      correctVerdict: "False",
      reasonText: "The model measuring tape used actual orbit distance data, not size — order from the sun has nothing to do with how big a planet is.",
      stemEvidenceIds: ["model_tape", "order_note"],
    },
  ],

  evidenceReadings: [
    { id: "mercury_size", label: "Mercury size data", reading: "Mercury's diameter is about 4,880 km — one of the smallest planets.", kind: "data" },
    { id: "mercury_distance", label: "Mercury distance data", reading: "Mercury measures as the closest planet to the sun in the model line-up.", kind: "data" },
    { id: "jupiter_size", label: "Jupiter size data", reading: "Jupiter's diameter is about 139,820 km — the largest planet.", kind: "data" },
    { id: "jupiter_distance", label: "Jupiter distance data", reading: "Jupiter measures far out, in fifth position from the sun in the model.", kind: "data" },
    { id: "model_tape", label: "Model measuring tape", reading: "The class measured each planet's spot using actual distance data, not size.", kind: "data" },
    { id: "order_note", label: "Astronomer's note", reading: "Planet order from the sun is based on orbit distance, which has nothing to do with how big a planet is.", kind: "data" },
    { id: "planet_color", label: "Color note", reading: "The Jupiter model was painted with extra orange stripes for detail.", kind: "distractor" },
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
