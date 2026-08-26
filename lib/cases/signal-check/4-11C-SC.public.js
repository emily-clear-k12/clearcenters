// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11C covers determining
// the physical properties of rocks that allow Earth's natural resources
// to be stored within them. Freshly framed for Signal Check — NOT a
// reworded version of any Group Chat trap line (see COVERAGE_MAP.md
// rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.11C-SC",
  teksLabel: "4.11C",
  grade: 4,
  subject: "Science",
  title: "Can Rock Really Hold Water Underground?",
  tagline: "Rock is solid all the way through, so there's no way water or oil could actually be stored inside it underground.",
  transmission: {
    claimHeadline: "Rock is solid all the way through, so there's no way water or oil could actually be stored inside it underground.",
    source: "Rock Sample Lab",
    loggedAt: "Trial 1",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A sandstone sample soaks up a full cup of water in seconds, but a granite sample lets almost none soak in.",
      correctVerdict: "True",
      reasonText: "This side-by-side test shows some rocks really do let liquid soak in, while others don't.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Zooming in on the sandstone sample shows tiny gaps between its grains, but the granite sample shows none.",
      correctVerdict: "True",
      reasonText: "Those tiny gaps are the actual spaces where water, oil, or gas can be stored inside certain rocks.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Nothing could be stored inside solid rock underground.",
      correctVerdict: "False",
      reasonText: "Some rocks, like sandstone, have tiny connected gaps that can hold and even let liquids move through them.",
    },
  ],

  evidenceReadings: [
    { id: "sandstone_soak", label: "Sandstone soak test", reading: "A sandstone sample soaks up a full cup of water within seconds.", kind: "data" },
    { id: "granite_soak", label: "Granite soak test", reading: "A granite sample lets almost no water soak in after the same amount of time.", kind: "data" },
    { id: "sandstone_zoom", label: "Sandstone close-up", reading: "Zooming in on the sandstone sample shows tiny gaps between individual grains.", kind: "data" },
    { id: "granite_zoom", label: "Granite close-up", reading: "Zooming in on the granite sample shows tightly packed crystals with no visible gaps.", kind: "data" },
    { id: "porous_definition", label: "Science note", reading: "A rock with lots of tiny connected gaps is called porous, and it can hold liquids inside those gaps.", kind: "data" },
    { id: "storage_note", label: "Science note", reading: "Oil, natural gas, and underground water are often stored in porous rock layers like sandstone.", kind: "data" },
    { id: "rock_color_note", label: "Rock note", reading: "The sandstone sample was a light tan color and the granite sample was gray.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sandstone_soak", "granite_soak"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["sandstone_zoom", "granite_zoom"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["porous_definition", "storage_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["rock_color_note"] },
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
    "Did I compare how much water the sandstone and granite soaked up?",
    "Did I mention what the close-up views of each rock showed?",
    "Did I explain what makes a rock able to store liquid inside it?",
    "Did I avoid saying nothing could be stored inside solid rock?",
  ],
};
