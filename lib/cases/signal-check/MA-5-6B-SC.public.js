// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.5.6B-SC. TEKS 5.6B — determine the volume of a rectangular prism with whole number side lengths in problems related to the number of layers times the number of unit cubes in the area of the base.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.5.6B-SC",
  teksLabel: "5.6B",
  grade: 5,
  subject: "Math",
  title: "The Taller Box",
  tagline: "The taller shipping box holds more.",
  transmission: {
    claimHeadline: "The taller shipping box holds more.",
    source: "Shipping Room Cube Test",
    loggedAt: "Packing day",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Box A has 12 cubes in each layer and 2 layers.",
      correctVerdict: "True",
      reasonText: "Box A is 4 by 3 on the bottom, which is 12 cubes, and it is 2 cubes tall.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Box B holds 24 cubes.",
      correctVerdict: "True",
      reasonText: "Box B has 4 cubes in its base and 6 layers, and 4 × 6 = 24.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Box B holds more because it is taller.",
      correctVerdict: "False",
      reasonText: "Box A holds 12 × 2 = 24 cubes too, so both boxes hold the same amount.",
    },
  ],

  evidenceReadings: [
    { id: "a_dims", label: "Box A size", reading: "Box A is 4 cubes long, 3 cubes wide, and 2 cubes tall.", kind: "data" },
    { id: "a_layer", label: "Box A layers", reading: "Box A's bottom layer holds 12 cubes, and it has 2 layers.", kind: "data" },
    { id: "b_dims", label: "Box B size", reading: "Box B is 2 cubes long, 2 cubes wide, and 6 cubes tall.", kind: "data" },
    { id: "b_count", label: "Box B count", reading: "Box B's bottom layer holds 4 cubes, and it has 6 layers.", kind: "data" },
    { id: "a_count", label: "Box A count", reading: "12 cubes in the base × 2 layers = 24 cubes.", kind: "data" },
    { id: "volume_rule", label: "Volume rule", reading: "Volume = cubes in the base layer × number of layers.", kind: "data" },
    { id: "fragile", label: "Box label", reading: "Box A has a \"fragile\" sticker.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["a_dims", "a_layer"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["b_dims", "b_count"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["a_count", "volume_rule"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["fragile"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I find the volume of Box A?",
    "Did I find the volume of Box B?",
    "Did I compare the two volumes?",
    "Did I explain why the taller box doesn't hold more?",
  ],
};
