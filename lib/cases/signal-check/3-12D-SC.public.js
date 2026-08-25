// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12D covers fossils as
// evidence of past life. Freshly framed for Signal Check — NOT a reworded
// version of the Group Chat "3.12D" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.12D-SC",
  teksLabel: "3.12D",
  grade: 3,
  subject: "Science",
  title: "Carved, or Always There?",
  tagline: "That shape pressed into the rock was carved by a person a long time ago.",
  transmission: {
    claimHeadline: "That shape pressed into the rock was carved by a person a long time ago.",
    source: "Rock Layer Field Site",
    loggedAt: "Sample #7",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The shape in the rock matches the outline of a real shell.",
      correctVerdict: "True",
      reasonText: "A side-by-side comparison lines up exactly with a real shell's ridges and size.",
      stemEvidenceIds: ["shell_compare", "shell_size"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The shape is found inside solid rock, not somewhere a person could reach to carve it.",
      correctVerdict: "True",
      reasonText: "The shape is embedded deep inside a rock layer, and a close-up shows no tool marks anywhere around it.",
      stemEvidenceIds: ["rock_layer", "no_tool_marks"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since it looks detailed, a person must have carved it.",
      correctVerdict: "False",
      reasonText: "A geologist's note explains how shells naturally get pressed into mud that hardens into rock, and similar shapes turn up in the same rock layer.",
      stemEvidenceIds: ["fossil_process", "similar_finds"],
    },
  ],

  evidenceReadings: [
    { id: "shell_compare", label: "Shell comparison", reading: "Side-by-side comparison: the shape in the rock matches the ridges of a real seashell exactly.", kind: "data" },
    { id: "shell_size", label: "Size check", reading: "The shape is the same size as shells found nearby.", kind: "data" },
    { id: "rock_layer", label: "Rock layer note", reading: "The shape is embedded deep inside a solid rock layer, not on a carved or cut surface.", kind: "data" },
    { id: "no_tool_marks", label: "Close-up photo", reading: "A close-up photo shows no scrape or chisel marks anywhere around the shape.", kind: "data" },
    { id: "fossil_process", label: "Geologist's note", reading: "Shells get pressed into mud that later hardens into rock over a very long time.", kind: "data" },
    { id: "similar_finds", label: "Similar finds log", reading: "Other similar shapes have been found in the same rock layer, far from any place people could have carved them.", kind: "data" },
    { id: "rock_color", label: "Color note", reading: "The rock around the shape is a slightly darker gray than the surrounding stone.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["shell_compare", "shell_size"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rock_layer", "no_tool_marks"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["fossil_process", "similar_finds"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["rock_color"] },
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
    "Did I mention that the shape matches a real shell's outline?",
    "Did I explain why the shape's location inside the rock matters?",
    "Did I explain how the shape could form naturally, without a person carving it?",
    "Did I avoid saying a person definitely carved it?",
  ],
};
