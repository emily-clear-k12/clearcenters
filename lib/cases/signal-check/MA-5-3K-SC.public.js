// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.5.3K-SC. TEKS 5.3K — add and subtract positive rational numbers fluently.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.5.3K-SC",
  teksLabel: "5.3K",
  grade: 5,
  subject: "Math",
  title: "The Snack Counter Receipt",
  tagline: "The total on the movie snack receipt is right: $14.70.",
  transmission: {
    claimHeadline: "The total on the movie snack receipt is right: $14.70.",
    source: "Snack Counter Receipt",
    loggedAt: "7:02 p.m.",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The three prices add up to $14.60.",
      correctVerdict: "True",
      reasonText: "Lining up the decimal points, $6.25 + $4.80 + $3.55 = $14.60.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The receipt's $14.70 total is correct.",
      correctVerdict: "False",
      reasonText: "The printed total is $14.70, which is 10 cents more than the prices add up to.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The cashier's total is close enough.",
      correctVerdict: "Misleading",
      reasonText: "It is close, but a receipt has to be exact, and the manager gave back the extra 10 cents.",
    },
  ],

  evidenceReadings: [
    { id: "items", label: "Receipt items", reading: "Popcorn $6.25, drink $4.80, candy $3.55.", kind: "data" },
    { id: "aligned", label: "Lined-up adding", reading: "Lining up the decimal points: 6.25 + 4.80 + 3.55 = 14.60.", kind: "data" },
    { id: "printed", label: "Printed total", reading: "The receipt's total line says $14.70.", kind: "data" },
    { id: "diff", label: "Difference", reading: "$14.70 − $14.60 = $0.10.", kind: "data" },
    { id: "exact", label: "Receipt rule", reading: "A receipt total has to match the prices exactly, to the cent.", kind: "data" },
    { id: "refund", label: "Manager note", reading: "The manager gave the family back 10 cents.", kind: "data" },
    { id: "showtime", label: "Showtime", reading: "The movie started at 7:15.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["items", "aligned"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["printed", "diff"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["exact", "refund"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["showtime"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I line up the decimal points to add?",
    "Did I find the real total?",
    "Did I find the difference between the totals?",
    "Did I explain why 'close' isn't good enough on a receipt?",
  ],
};
