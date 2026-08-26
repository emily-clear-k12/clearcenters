// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.10A covers describing
// and illustrating the continuous movement of water through the water
// cycle and explaining the role of the Sun as a major source of energy.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.10A-SC",
  teksLabel: "4.10A",
  grade: 4,
  subject: "Science",
  title: "Did the Puddle Really Disappear?",
  tagline: "The puddle dried up in the sun, so that water is gone completely — it doesn't exist anywhere anymore.",
  transmission: {
    claimHeadline: "The puddle dried up in the sun, so that water is gone completely — it doesn't exist anywhere anymore.",
    source: "Playground Puddle Log",
    loggedAt: "Trial Week",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A covered cup of water left in the sun all day loses almost none of its water, but an uncovered cup in the same sunny spot loses nearly all of it by the next day.",
      correctVerdict: "True",
      reasonText: "This comparison shows the sun's heat is turning the uncovered water into vapor that floats away, not that it's vanishing on its own.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Water droplets show up on the underside of a lid held above a pot of warm water.",
      correctVerdict: "True",
      reasonText: "Those droplets show the invisible water vapor turning back into liquid water — proof it never stopped existing.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The puddle's water is completely gone and doesn't exist anywhere anymore.",
      correctVerdict: "False",
      reasonText: "The water turned into invisible water vapor that rose into the air — it's still part of the water cycle, just not visible anymore.",
    },
  ],

  evidenceReadings: [
    { id: "covered_container", label: "Covered cup", reading: "A covered cup of water left in the sun all day loses almost none of its water.", kind: "data" },
    { id: "uncovered_container", label: "Uncovered cup", reading: "An uncovered cup of water in the same sunny spot loses nearly all its water by the next day.", kind: "data" },
    { id: "lid_droplets", label: "Lid test", reading: "Droplets of water appear on the underside of a lid held above a pot of warm water.", kind: "data" },
    { id: "lid_droplets_repeat", label: "Lid test, repeated", reading: "Doing the same lid test again the next day produces droplets again.", kind: "data" },
    { id: "sun_heat_note", label: "Science note", reading: "The sun's heat gives water the energy it needs to turn into invisible water vapor.", kind: "data" },
    { id: "vapor_note", label: "Science note", reading: "Water vapor is still water — it's just spread out as an invisible gas in the air instead of being a liquid.", kind: "data" },
    { id: "puddle_shape_note", label: "Puddle note", reading: "The puddle was shaped like a triangle before it dried up.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["covered_container", "uncovered_container"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["lid_droplets", "lid_droplets_repeat"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sun_heat_note", "vapor_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["puddle_shape_note"] },
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
    "Did I compare the covered cup and the uncovered cup?",
    "Did I mention what showed up on the lid held over the warm water?",
    "Did I explain what actually happens to the puddle's water?",
    "Did I avoid saying the water stops existing?",
  ],
};
