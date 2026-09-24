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
  tagline: "Sugar pours into a cup just like water, so sugar must be a liquid.",
  transmission: {
    claimHeadline: "Sugar pours into a cup just like water, so sugar must be a liquid.",
    source: "Kitchen Counter Investigation",
    loggedAt: "Trial #2",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Poured sugar makes a sloped pile shaped like a cone, not a flat top.",
      correctVerdict: "True",
      reasonText: "The cone check shows sloped sides and a peak. Poured water spreads out flat.",
      stemEvidenceIds: ["cone_shape", "water_compare"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Each grain of sugar keeps the same size and shape, in a pile or spread out.",
      correctVerdict: "True",
      reasonText: "Up-close photos of piled sugar and spread-out sugar show the same hard grains with sharp edges.",
      stemEvidenceIds: ["grain_photo_pile", "grain_photo_spread"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "If something can be poured, it must be a liquid.",
      correctVerdict: "False",
      reasonText: "Flour pours and piles just like sugar, and flour is a solid. Pouring does not tell you solid or liquid. Keeping its shape does.",
      stemEvidenceIds: ["flour_compare", "definition_note"],
    },
  ],

  evidenceReadings: [
    { id: "cone_shape", label: "Cone shape check", reading: "Poured sugar makes a pile with sloped sides and a peak in the middle.", kind: "data" },
    { id: "water_compare", label: "Water comparison", reading: "Poured water spreads out flat. It takes the shape of the bottom of the cup.", kind: "data" },
    { id: "grain_photo_pile", label: "Magnified photo — piled", reading: "Each sugar grain in the pile is a tiny hard cube with sharp edges.", kind: "data" },
    { id: "grain_photo_spread", label: "Magnified photo — spread out", reading: "The same sugar grains spread flat on a tray still look like tiny hard cubes.", kind: "data" },
    { id: "flour_compare", label: "Flour comparison", reading: "Flour also pours and piles up just like sugar. Flour is a solid too.", kind: "data" },
    { id: "definition_note", label: "Science definition note", reading: "A liquid takes the shape of its container. A solid keeps its own shape, even in tiny pieces.", kind: "data" },
    { id: "sugar_color", label: "Color note", reading: "This bag of sugar looks a little whiter than the kind used last month.", kind: "distractor" },
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
