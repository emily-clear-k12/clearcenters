// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8A covers how energy
// transfers from one object to another. Freshly framed for Signal Check —
// NOT a reworded version of the Group Chat "4.8A" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.8A-SC",
  teksLabel: "4.8A",
  grade: 4,
  subject: "Science",
  title: "Do the Middle Ones Just Quit?",
  tagline: "The middle bells barely move at all, so the energy must jump straight over them to the last bell.",
  transmission: {
    claimHeadline: "The middle bells barely move at all, so the energy must jump straight over them to the last bell.",
    source: "Swinging Bells Demo",
    loggedAt: "Trial 3",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Take one middle bell out of the row, and the swinging motion never reaches the other end.",
      correctVerdict: "True",
      reasonText: "The gap test result shows that with a bell missing, swinging the first bell moved nothing on the far side.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "With all the bells touching, only the last bell swings out, and the middle bells barely move.",
      correctVerdict: "True",
      reasonText: "The full row test and the close-up photos both show the middle bells shifting just a tiny bit.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The energy skips over the middle bells to reach the last one.",
      correctVerdict: "False",
      reasonText: "The energy isn't skipping anything — it passes from bell to bell by touching each one in the row.",
    },
  ],

  evidenceReadings: [
    { id: "gap_test", label: "Gap test", reading: "One middle bell was taken out, leaving a small gap.", kind: "data" },
    { id: "no_transfer", label: "Gap test result", reading: "With the gap there, swinging the first bell moved nothing on the other side.", kind: "data" },
    { id: "full_row_test", label: "Full row test", reading: "With every bell touching, swinging the first bell made only the last bell swing out.", kind: "data" },
    { id: "middle_motion", label: "Close-up look", reading: "Slow-motion photos show the middle bells move just a tiny bit, then snap back.", kind: "data" },
    { id: "contact_note", label: "Science note", reading: "Each bell has to touch the next one for the motion to travel all the way through.", kind: "data" },
    { id: "science_definition", label: "Science note", reading: "The energy moves through every bell in the row — it doesn't skip any of them.", kind: "data" },
    { id: "bell_color", label: "Bell note", reading: "The bells in this row are painted silver.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["gap_test", "no_transfer"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["full_row_test", "middle_motion"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["contact_note", "science_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["bell_color"] },
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
    "Did I mention what happened when a middle bell was removed?",
    "Did I mention how the middle bells behave when the full row is together?",
    "Did I explain how the energy actually travels through the row?",
    "Did I avoid saying the energy skips over the middle bells?",
  ],
};
