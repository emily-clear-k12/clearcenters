// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.6B covers mixtures,
// including substances that separate again after mixing. Freshly framed
// for Signal Check — NOT a reworded version of the Group Chat "4.6B" trap
// line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.6B-SC",
  teksLabel: "4.6B",
  grade: 4,
  subject: "Science",
  title: "Stir It Long Enough?",
  tagline: "If you stir long enough, the oil and water in this bottle will turn into one new liquid.",
  transmission: {
    claimHeadline: "If you stir long enough, the oil and water in this bottle will turn into one new liquid.",
    source: "Homemade Lava Bottle Test",
    loggedAt: "Trial 6",
  },

  // Grade 4: verdict is a tap-to-pick chip, but the reasoning is typed —
  // the first step into written justification.
  stemMode: "dropdown-open",

  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Stirring hard breaks the oil into tiny drops spread through the water.",
      correctVerdict: "True",
      reasonText: "Right after stirring, tiny oil drops are spread all through the water, making it look cloudy.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "If you stop stirring, the oil and water separate back into two layers every time.",
      correctVerdict: "True",
      reasonText: "Ten minutes later, the oil floats back to the top in its own layer, every single time.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Stirring long enough turns the oil and water into one new liquid.",
      correctVerdict: "False",
      reasonText: "Oil and water don't turn into a new liquid — they can mix for a little while, but they always separate again.",
    },
  ],

  evidenceReadings: [
    { id: "stir_photo", label: "Right after stirring", reading: "Tiny oil drops are spread through the water, making it look cloudy.", kind: "data" },
    { id: "droplet_check", label: "Closer look", reading: "Small oil drops are still floating inside the water.", kind: "data" },
    { id: "settle_photo", label: "10 minutes later", reading: "The oil floats back to the top in its own layer.", kind: "data" },
    { id: "layer_check", label: "Layer check", reading: "The oil layer is the same size as it was before stirring.", kind: "data" },
    { id: "repeat_test", label: "Try it again", reading: "Stirring the same bottle five more times always ends the same way.", kind: "data" },
    { id: "science_note", label: "Science note", reading: "Oil and water don't stick together. They can mix for a little while, but they always separate again.", kind: "data" },
    { id: "bottle_color", label: "Bottle note", reading: "The bottle used for this test is blue plastic.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["stir_photo", "droplet_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["settle_photo", "layer_check"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["repeat_test", "science_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["bottle_color"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that stirring breaks the oil into tiny drops?",
    "Did I mention what happens when the bottle sits still for 10 minutes?",
    "Did I explain why oil and water don't turn into one new liquid?",
    "Did I avoid saying stirring long enough combines them permanently?",
  ],
};
