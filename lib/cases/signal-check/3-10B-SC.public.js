// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10B covers soil
// composition. Freshly framed for Signal Check — NOT a reworded version
// of the Group Chat "3.10B" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.10B-SC",
  teksLabel: "3.10B",
  grade: 3,
  subject: "Science",
  title: "Just Dirt?",
  tagline: "Garden dirt is just \"dirt\" — there's nothing else mixed into it.",
  transmission: {
    claimHeadline: "Garden dirt is just \"dirt\" — there's nothing else mixed into it.",
    source: "Garden Soil Sample",
    loggedAt: "Sample #3",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/3-10b-sc-field-report.jpg",
    imageCaption: "Garden Soil Sample #3 — settling test",
    notes: "A jar of Sample #3 soil and water sat overnight and settled into layers you can see through the glass: a bottom layer of gritty rock grains, a middle layer of dark crumbly plant bits, and cloudy water on top.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Soil contains tiny bits of broken-down rock.",
      correctVerdict: "True",
      reasonText: "Gritty grains in the sample match the color and hardness of nearby rocks.",
      stemEvidenceIds: ["sand_grains", "rock_compare"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Soil contains bits of decayed plants and leaves.",
      correctVerdict: "True",
      reasonText: "Dark, crumbly bits in the sample still show a leaf's vein pattern.",
      stemEvidenceIds: ["dark_bits", "leaf_shape"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Soil is one single material with nothing mixed into it.",
      correctVerdict: "False",
      reasonText: "Sifting and settling both separate the sample into rock grains, plant bits, and air pockets.",
      stemEvidenceIds: ["sift_test", "three_layers"],
    },
  ],

  evidenceReadings: [
    { id: "sand_grains", label: "Magnifier check", reading: "Gritty grains that look like tiny broken rock pieces are visible in the sample.", kind: "data" },
    { id: "rock_compare", label: "Rock comparison", reading: "The gritty grains match the color and hardness of the rocks nearby.", kind: "data" },
    { id: "dark_bits", label: "Sample close-up", reading: "Dark, crumbly bits in the sample smell earthy and fall apart easily.", kind: "data" },
    { id: "leaf_shape", label: "Leaf-pattern check", reading: "Some of the dark bits still have a leaf's vein pattern visible.", kind: "data" },
    { id: "sift_test", label: "Sifting test", reading: "Sifting the sample through a screen separates it into rock grains, dark plant bits, and air pockets.", kind: "data" },
    { id: "three_layers", label: "Settling test", reading: "A jar of soil and water settles into three visible layers overnight.", kind: "data" },
    { id: "soil_color", label: "Color note", reading: "The soil sample from the shady side of the garden is a slightly darker brown than the sunny side.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sand_grains", "rock_compare"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["dark_bits", "leaf_shape"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sift_test", "three_layers"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["soil_color"] },
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
    "Did I mention that soil has broken-down rock pieces in it?",
    "Did I mention that soil has decayed plant material in it?",
    "Did I explain why soil is not just one single material?",
    "Did I avoid saying soil is nothing but plain \"dirt\"?",
  ],
};
