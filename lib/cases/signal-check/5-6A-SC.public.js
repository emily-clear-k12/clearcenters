// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6A covers comparing and
// contrasting matter based on measurable, testable, or observable
// physical properties, including mass, magnetism, relative density,
// physical state, volume, solubility, and thermal/electrical
// conductivity. Freshly framed for Signal Check — NOT a reworded version
// of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.6A-SC",
  teksLabel: "5.6A",
  grade: 5,
  subject: "Science",
  title: "Does a Magnet Catch Every Piece of Metal?",
  tagline: "It's metal, so a magnet should be able to pick it up — every metal object should stick.",
  transmission: {
    claimHeadline: "It's metal, so a magnet should be able to pick it up — every metal object should stick.",
    source: "Metal Sorting Bin Test",
    loggedAt: "Trial 1",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A steel paperclip and a steel nail both snap onto the magnet instantly.",
      correctVerdict: "True",
      reasonText: "This shows the magnet really does work on some metals.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "An aluminum can and a copper penny don't stick to the magnet at all, even after several tries.",
      correctVerdict: "True",
      reasonText: "This shows not every metal responds to a magnet the same way.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A magnet should be able to pick up any piece of metal.",
      correctVerdict: "False",
      reasonText: "Only some metals, like iron and steel, respond to a magnet — magnetism is a property some metals have and others don't.",
    },
  ],

  evidenceReadings: [
    { id: "steel_paperclip", label: "Steel paperclip test", reading: "A steel paperclip snaps onto the magnet the instant it gets close.", kind: "data" },
    { id: "steel_nail", label: "Steel nail test", reading: "A steel nail does the same thing, snapping onto the magnet right away.", kind: "data" },
    { id: "aluminum_can", label: "Aluminum can test", reading: "An aluminum can does not stick to the magnet, even held directly against it.", kind: "data" },
    { id: "copper_penny", label: "Copper penny test", reading: "A copper penny does not stick to the magnet either, even after several tries.", kind: "data" },
    { id: "magnetism_note", label: "Science note", reading: "Magnetism is a physical property that only some metals, like iron and steel, actually have.", kind: "data" },
    { id: "property_note", label: "Science note", reading: "Metal objects can be very different from each other in properties like magnetism, density, and how they conduct electricity.", kind: "data" },
    { id: "penny_color_note", label: "Penny note", reading: "The penny had turned a dull brown color.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["steel_paperclip", "steel_nail"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["aluminum_can", "copper_penny"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["magnetism_note", "property_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["penny_color_note"] },
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
    "Did I compare the steel objects to the aluminum and copper objects?",
    "Did I explain what magnetism actually is, in my own words?",
    "Did I mention that not all metals share the same physical properties?",
    "Did I avoid saying a magnet can pick up any piece of metal?",
  ],
};
