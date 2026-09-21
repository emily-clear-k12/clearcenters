// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.4.4G-SC. TEKS 4.4G — round to the nearest 10, 100, or 1,000 or use compatible numbers to estimate solutions involving whole numbers.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.4.4G-SC",
  teksLabel: "4.4G",
  grade: 4,
  subject: "Math",
  title: "Is $2,500 Enough?",
  tagline: "The four buses cost about $3,000, so the $2,500 the class raised will cover it.",
  transmission: {
    claimHeadline: "The four buses cost about $3,000, so the $2,500 the class raised will cover it.",
    source: "Field Trip Bus Quote",
    loggedAt: "Spring trip",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Rounding $712 to $700 and multiplying by 4 gives an estimate of about $2,800.",
      correctVerdict: "True",
      reasonText: "$712 rounds to $700, and 4 × $700 = $2,800.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Rounding each bus to $1,000 gives the best estimate.",
      correctVerdict: "Misleading",
      reasonText: "It is an estimate, but $4,000 is more than $1,000 away from the real total of $2,848.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The $2,500 the class raised is enough to pay for the buses.",
      correctVerdict: "False",
      reasonText: "The buses cost $2,848, which is $348 more than the class raised.",
    },
  ],

  evidenceReadings: [
    { id: "quote", label: "Bus quote", reading: "Each bus costs $712. The class needs 4 buses.", kind: "data" },
    { id: "round_700", label: "Rounding to hundreds", reading: "$712 rounded to the nearest hundred is $700. 4 × $700 = $2,800.", kind: "data" },
    { id: "round_1000", label: "Rounding to thousands", reading: "$712 rounded to the nearest thousand is $1,000. 4 × $1,000 = $4,000.", kind: "data" },
    { id: "exact", label: "Exact total", reading: "4 × $712 = $2,848.", kind: "data" },
    { id: "raised", label: "Class fund", reading: "The class raised $2,500.", kind: "data" },
    { id: "short", label: "Gap", reading: "$2,848 is $348 more than $2,500.", kind: "data" },
    { id: "hours", label: "Museum hours", reading: "The museum opens at 9:00.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["quote", "round_700"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["round_1000", "exact"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["raised", "short"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["hours"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — the stem gets you started.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I round the bus price to estimate?",
    "Did I compare the two estimates to the exact total?",
    "Did I decide whether $2,500 is enough?",
    "Did I explain why an estimate alone can't settle a money question this close?",
  ],
};
