// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.3.2D-SC. TEKS 3.2D — compare and order whole numbers up to 100,000 and represent comparisons using the symbols >, <, or =.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.3.2D-SC",
  teksLabel: "3.2D",
  grade: 3,
  subject: "Math",
  title: "Town Sign Mix-Up",
  tagline: "The four towns on this sign are listed from smallest to biggest.",
  transmission: {
    claimHeadline: "The four towns on this sign are listed from smallest to biggest.",
    source: "Highway Sign",
    loggedAt: "Route 9",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "4,950 is the smallest number on the sign.",
      correctVerdict: "True",
      reasonText: "4,950 and 9,760 are the only numbers in the thousands, and 4 thousands is less than 9 thousands.",
      stemEvidenceIds: ["sign", "thousands"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "12,800 is less than 9,760, because 1 is less than 9.",
      correctVerdict: "False",
      reasonText: "12,800 has a digit in the ten-thousands place, so it is bigger than 9,760.",
      stemEvidenceIds: ["ten_thousands", "compare_rule"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The last number is the biggest, so the list is in order.",
      correctVerdict: "Misleading",
      reasonText: "21,300 is the biggest, but 12,800 and 9,760 are in the wrong order.",
      stemEvidenceIds: ["biggest", "order_check"],
    },
  ],

  evidenceReadings: [
    { id: "sign", label: "Sign numbers", reading: "The sign lists: 4,950 · 12,800 · 9,760 · 21,300.", kind: "data" },
    { id: "thousands", label: "Thousands", reading: "4,950 and 9,760 are the only numbers in the thousands.", kind: "data" },
    { id: "ten_thousands", label: "Ten-thousands place", reading: "12,800 and 21,300 both have a digit in the ten-thousands place.", kind: "data" },
    { id: "compare_rule", label: "Comparing tip", reading: "Compare numbers starting with the biggest place value.", kind: "data" },
    { id: "biggest", label: "Biggest number", reading: "21,300 has a 2 in the ten-thousands place. No other number does.", kind: "data" },
    { id: "order_check", label: "Order check", reading: "In order, the numbers would be 4,950 · 9,760 · 12,800 · 21,300.", kind: "data" },
    { id: "miles", label: "Mile marker", reading: "The sign is 40 miles from the next town.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sign", "thousands"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["ten_thousands", "compare_rule"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["biggest", "order_check"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["miles"] },
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
    "Did I compare the numbers by place value?",
    "Did I explain why 12,800 is bigger than 9,760?",
    "Did I put the numbers in the right order?",
    "Did I avoid comparing only the first digits?",
  ],
};
