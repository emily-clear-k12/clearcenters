// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6B covers describing and
// classifying matter by physical properties, including whether something
// is a solid or a liquid. Freshly framed for Signal Check — NOT a reworded
// version of the Group Chat "3.6B" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.6B-SC",
  teksLabel: "3.6B",
  grade: 3,
  subject: "Science",
  title: "Does It Pour Like Water?",
  tagline: "Sugar poured into a cup behaves just like water, so sugar must count as a liquid.",
  transmission: {
    claimHeadline: "Sugar poured into a cup behaves just like water, so sugar must count as a liquid.",
    source: "Kitchen Counter Investigation",
    loggedAt: "Trial #2",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Poured sugar settles into a sloped, cone-shaped pile, not a flat surface.",
      correctVerdict: "True",
      reasonText: "The cone shape check shows sloped sides and a peak, while poured water spreads out flat and level.",
      stemEvidenceIds: ["cone_shape", "water_compare"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Individual grains of sugar keep the same size and shape whether piled or spread out.",
      correctVerdict: "True",
      reasonText: "Magnified photos of the piled sugar and the spread-out sugar show the exact same hard, sharp-edged grains.",
      stemEvidenceIds: ["grain_photo_pile", "grain_photo_spread"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since something can be poured, it must be a liquid.",
      correctVerdict: "False",
      reasonText: "Flour pours and piles the same way sugar does, and flour is a solid — being pourable doesn't decide solid vs. liquid, keeping a shape does.",
      stemEvidenceIds: ["flour_compare", "definition_note"],
    },
  ],

  evidenceReadings: [
    { id: "cone_shape", label: "Cone shape check", reading: "Poured sugar forms a pile with sloped sides and a peak in the middle.", kind: "data" },
    { id: "water_compare", label: "Water comparison", reading: "Poured water spreads out flat and level, taking the exact shape of the container's bottom.", kind: "data" },
    { id: "grain_photo_pile", label: "Magnified photo — piled", reading: "Individual sugar grains in the pile are tiny hard cubes with sharp edges.", kind: "data" },
    { id: "grain_photo_spread", label: "Magnified photo — spread out", reading: "The same sugar grains spread flat on a tray still look like tiny hard cubes with sharp edges.", kind: "data" },
    { id: "flour_compare", label: "Flour comparison", reading: "Flour also pours and piles up the same way sugar does, and flour is a solid too.", kind: "data" },
    { id: "definition_note", label: "Science definition note", reading: "A liquid takes the complete shape of its container; a solid keeps its own shape, even broken into small pieces.", kind: "data" },
    { id: "sugar_color", label: "Color note", reading: "This bag of sugar looks slightly whiter than the brand used last month.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["cone_shape", "water_compare"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["grain_photo_pile", "grain_photo_spread"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["flour_compare", "definition_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sugar_color"] },
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
    "Did I mention that poured sugar forms a sloped pile instead of a flat surface?",
    "Did I mention that individual grains stay the same shape and size?",
    "Did I explain why being pourable doesn't automatically mean something is a liquid?",
    "Did I avoid saying sugar is a liquid just because it pours?",
  ],
};
