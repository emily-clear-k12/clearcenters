// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12C covers how a natural
// event affects an ecosystem. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "3.12C" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.12C-SC",
  teksLabel: "3.12C",
  grade: 3,
  subject: "Science",
  title: "Was the Pond Really Ruined?",
  tagline: "After the flood, the pond ecosystem was completely ruined and nothing survived.",
  transmission: {
    claimHeadline: "After the flood, the pond ecosystem was completely ruined and nothing survived.",
    source: "Pond Wildlife Survey",
    loggedAt: "Post-Flood Week 1",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Water levels in the pond rose sharply during the flood.",
      correctVerdict: "True",
      reasonText: "The post-flood water level reading is three feet above the normal depth marker.",
      stemEvidenceIds: ["preflood_level", "postflood_level"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Every species in the pond disappeared after the flood.",
      correctVerdict: "False",
      reasonText: "Both the turtle and fish surveys found animals still there after the flood.",
      stemEvidenceIds: ["turtle_count", "fish_count"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A single flood event affects different species in the pond differently.",
      correctVerdict: "True",
      reasonText: "Comparing all three surveys: turtles held steady, fish dropped, and insects actually increased.",
      stemEvidenceIds: ["insect_count", "species_compare"],
    },
  ],

  evidenceReadings: [
    { id: "preflood_level", label: "Pre-flood water level", reading: "Normal depth marker.", kind: "data" },
    { id: "postflood_level", label: "Post-flood water level", reading: "Three feet above the normal depth marker.", kind: "data" },
    { id: "turtle_count", label: "Turtle survey", reading: "Same number of turtles spotted before and after the flood.", kind: "data" },
    { id: "fish_count", label: "Fish survey", reading: "Fewer fish counted after the flood, but not zero.", kind: "data" },
    { id: "insect_count", label: "Insect survey", reading: "More mosquito larvae counted after the flood, since it left new standing pools.", kind: "data" },
    { id: "species_compare", label: "Survey comparison", reading: "Comparing all three surveys: turtles held steady, fish dropped, insects increased.", kind: "data" },
    { id: "pond_smell", label: "Field note", reading: "The pond had a stronger smell right after the flood.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["preflood_level", "postflood_level"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["turtle_count", "fish_count"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["insect_count", "species_compare"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pond_smell"] },
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
    "Did I use the before-and-after water level readings in my reasoning?",
    "Did I mention that turtles and fish were still found after the flood?",
    "Did I explain how the flood affected turtles, fish, and insects differently?",
    "Did I avoid saying nothing survived the flood?",
  ],
};
