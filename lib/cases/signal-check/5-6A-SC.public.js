// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6A covers comparing and
// contrasting matter based on measurable, testable, or observable
// physical properties, including mass, magnetism, relative density,
// physical state, volume, solubility, and thermal/electrical
// conductivity.
//
// Rewritten Aug 29, 2026 — the original version of this case reused Group
// Chat 5.6A's ("The Metal Detector Meltdown") exact object set (steel
// bottle cap + nail vs. aluminum pull-tab + copper penny), just renamed.
// Same misconception is fine per SIGNAL_CHECK_CHECKLIST.md rule 8, but the
// scenario and props must be genuinely different — this version moves the
// setting to a recycling sorting line and swaps every prop.
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.6A-SC",
  teksLabel: "5.6A",
  grade: 5,
  subject: "Science",
  title: "The One-Bin Metal Sorter",
  tagline: "A magnet arm can sort every kind of metal into one bin — if it's metal, the magnet will grab it.",
  transmission: {
    claimHeadline: "A magnet arm can sort every kind of metal into one bin — if it's metal, the magnet will grab it.",
    source: "Recycling Line Test Log",
    loggedAt: "Run 3",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "An iron washer and a steel bolt both snap up onto the magnet arm the moment it passes over them.",
      correctVerdict: "True",
      reasonText: "This shows the magnet arm really does work on some metals.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A brass hinge and a scrap of aluminum siding stay on the belt and don't move at all, even when the magnet arm passes directly over them.",
      correctVerdict: "True",
      reasonText: "This shows not every metal responds to the magnet arm the same way.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "One magnet arm can sort every kind of metal into a single bin.",
      correctVerdict: "False",
      reasonText: "Only some metals, like iron and steel, respond to a magnet — a magnet-only sorter would let the brass and aluminum ride straight past uncaught.",
    },
  ],

  evidenceReadings: [
    { id: "iron_washer", label: "Iron washer test", reading: "An iron washer snaps up onto the magnet arm the instant it passes overhead.", kind: "data" },
    { id: "steel_bolt", label: "Steel bolt test", reading: "A steel bolt does the same thing, jumping up to the magnet arm right away.", kind: "data" },
    { id: "brass_hinge", label: "Brass hinge test", reading: "A brass hinge stays flat on the belt, even directly under the magnet arm.", kind: "data" },
    { id: "aluminum_siding", label: "Aluminum siding scrap test", reading: "A scrap of aluminum siding does not move either, even after the arm passes over it twice.", kind: "data" },
    { id: "magnetism_note", label: "Sorting line note", reading: "Magnetism is a physical property that only some metals, like iron and steel, actually have.", kind: "data" },
    { id: "property_note", label: "Sorting line note", reading: "Metal scrap can be very different from piece to piece in properties like magnetism, density, and how it conducts electricity.", kind: "data" },
    { id: "hinge_color_note", label: "Hinge note", reading: "The brass hinge had a greenish tarnish spot near one screw hole.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["iron_washer", "steel_bolt"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["brass_hinge", "aluminum_siding"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["magnetism_note", "property_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["hinge_color_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all three signals?",
    "Did I compare the iron and steel objects to the brass and aluminum objects?",
    "Did I explain what magnetism actually is, in my own words?",
    "Did I mention that not all metals share the same physical properties?",
    "Did I avoid saying one magnet arm can sort every kind of metal?",
  ],
};
