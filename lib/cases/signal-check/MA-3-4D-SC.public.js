// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.3.4D-SC. TEKS 3.4D — determine the total number of objects when equally-sized groups of objects are combined or arranged in arrays up to 10 by 10.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.3.4D-SC",
  teksLabel: "3.4D",
  grade: 3,
  subject: "Math",
  title: "The Garden Rows",
  tagline: "This garden has 3 × 7 plants.",
  transmission: {
    claimHeadline: "This garden has 3 × 7 plants.",
    source: "School Garden Photo",
    loggedAt: "Monday morning",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The garden has 3 rows.",
      correctVerdict: "True",
      reasonText: "The photo shows 3 rows of seedlings, all starting at the same fence post.",
      stemEvidenceIds: ["row_count", "row_line"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Every row has 7 plants.",
      correctVerdict: "Misleading",
      reasonText: "Rows 1 and 2 have 7 plants. Row 3 has only 6 and an empty spot.",
      stemEvidenceIds: ["rows_full", "row3"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The garden has 21 plants.",
      correctVerdict: "False",
      reasonText: "Counting every plant gives 7 + 7 + 6 = 20. And 3 × 7 only works when every row has 7.",
      stemEvidenceIds: ["count_total", "array_rule"],
    },
  ],

  evidenceReadings: [
    { id: "row_count", label: "Row count", reading: "The photo shows 3 rows of seedlings.", kind: "data" },
    { id: "row_line", label: "Rows lined up", reading: "All three rows start at the same fence post.", kind: "data" },
    { id: "rows_full", label: "Rows 1 and 2", reading: "Row 1 has 7 plants. Row 2 has 7 plants.", kind: "data" },
    { id: "row3", label: "Row 3", reading: "Row 3 has 6 plants and one empty spot where a rabbit ate a seedling.", kind: "data" },
    { id: "count_total", label: "Plant count", reading: "Counting every plant one by one: 7 + 7 + 6 = 20.", kind: "data" },
    { id: "array_rule", label: "Array rule", reading: "An array shows 3 × 7 only when every row has exactly 7.", kind: "data" },
    { id: "sun", label: "Sunlight note", reading: "The garden gets sun in the afternoon.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["row_count", "row_line"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rows_full", "row3"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["count_total", "array_rule"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sun"] },
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
    "Did I count the plants in every row?",
    "Did I notice the empty spot in row 3?",
    "Did I find the real number of plants?",
    "Did I explain when 3 × 7 would be right?",
  ],
};
