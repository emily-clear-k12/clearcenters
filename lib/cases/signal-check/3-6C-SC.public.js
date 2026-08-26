// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6C covers changes in
// matter caused by heating and cooling, including condensation. Freshly
// framed for Signal Check — NOT a reworded version of the Group Chat
// "3.6C" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.6C-SC",
  teksLabel: "3.6C",
  grade: 3,
  subject: "Science",
  title: "Leaky Can, or Something Else?",
  tagline: "This ice-cold can is leaking from the inside — that's the only way it could get wet.",
  transmission: {
    claimHeadline: "This ice-cold can is leaking from the inside — that's the only way it could get wet.",
    source: "Picnic Table Observation",
    loggedAt: "Trial #4",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The can was sealed and never opened before the drops appeared.",
      correctVerdict: "True",
      reasonText: "The seal check and tab inspection both confirm the can was never opened and has no cracks or holes.",
      stemEvidenceIds: ["sealed_check", "tab_check"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The drops on the outside are clear, but the drink inside is dark soda.",
      correctVerdict: "True",
      reasonText: "The drop sample is completely clear while the soda sample is dark brown — the colors don't match.",
      stemEvidenceIds: ["drop_color", "soda_color"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The can must be leaking from the inside.",
      correctVerdict: "False",
      reasonText: "A warm can stayed completely dry, and the cooling note explains that water in the air turns to drops on a cold surface — the can isn't leaking at all.",
      stemEvidenceIds: ["warm_can_compare", "cooling_note"],
    },
  ],

  evidenceReadings: [
    { id: "sealed_check", label: "Seal check", reading: "The pull tab is still fully sealed and unopened.", kind: "data" },
    { id: "tab_check", label: "Surface inspection", reading: "No cracks or holes anywhere on the can's surface.", kind: "data" },
    { id: "drop_color", label: "Drop sample", reading: "The drops on the outside of the can are completely clear, with no color at all.", kind: "data" },
    { id: "soda_color", label: "Soda sample", reading: "The soda inside the can is dark brown.", kind: "data" },
    { id: "warm_can_compare", label: "Warm can comparison", reading: "An unopened can left out at room temperature stayed completely dry with no drops at all.", kind: "data" },
    { id: "cooling_note", label: "Cooling note", reading: "Water in the air turns into visible drops when it touches a surface that's much colder than the air around it.", kind: "data" },
    { id: "label_wear", label: "Label check", reading: "The can's label is starting to peel slightly at one corner.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sealed_check", "tab_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["drop_color", "soda_color"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["warm_can_compare", "cooling_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["label_wear"] },
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
    "Did I mention that the can was sealed and never opened?",
    "Did I explain why the drop color and soda color don't match?",
    "Did I explain where the drops on the outside actually came from?",
    "Did I avoid saying the can is leaking?",
  ],
};
