// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.4.10B-SC. TEKS 4.10B — calculate profit in a given situation.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.4.10B-SC",
  teksLabel: "4.10B",
  grade: 4,
  subject: "Math",
  title: "The Car Wash Fundraiser",
  tagline: "The class car wash made a $40 profit on Saturday.",
  transmission: {
    claimHeadline: "The class car wash made a $40 profit on Saturday.",
    source: "Fundraiser Log",
    loggedAt: "Saturday",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The car wash earned $40 on Saturday.",
      correctVerdict: "Misleading",
      reasonText: "The car wash took in $40, but it had to pay $16 for supplies, so it only kept $24.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The $16 spent on supplies is part of the profit.",
      correctVerdict: "False",
      reasonText: "The $16 paid for soap, sponges, and towels, and it went back to the PTA, so it is not profit.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Profit is the money left after paying for what you used.",
      correctVerdict: "True",
      reasonText: "Profit is money collected minus costs: $40 − $16 = $24.",
    },
  ],

  evidenceReadings: [
    { id: "cars", label: "Cars washed", reading: "The class washed 20 cars at $2 each.", kind: "data" },
    { id: "money_in", label: "Money collected", reading: "The cash box had $40 at the end of the day.", kind: "data" },
    { id: "supplies", label: "Supply receipts", reading: "Soap cost $8, sponges cost $5, and towels cost $3 — $16 in all.", kind: "data" },
    { id: "paid_back", label: "Paying back", reading: "The class paid the PTA back $16 from the cash box.", kind: "data" },
    { id: "profit_def", label: "Profit definition", reading: "Profit is the money left after you pay for what you used.", kind: "data" },
    { id: "kept", label: "Money kept", reading: "$40 − $16 = $24.", kind: "data" },
    { id: "lot", label: "Location", reading: "The car wash was in the school parking lot.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["cars", "money_in"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["supplies", "paid_back"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["profit_def", "kept"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["lot"] },
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
    "Did I find how much money was collected?",
    "Did I subtract the supply costs?",
    "Did I find the real profit?",
    "Did I explain the difference between money collected and profit?",
  ],
};
