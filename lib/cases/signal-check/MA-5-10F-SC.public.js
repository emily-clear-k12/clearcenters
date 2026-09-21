// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.5.10F-SC. TEKS 5.10F — balance a simple budget.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.5.10F-SC",
  teksLabel: "5.10F",
  grade: 5,
  subject: "Math",
  title: "The Chen Family Budget",
  tagline: "The Chen family's monthly budget is balanced.",
  transmission: {
    claimHeadline: "The Chen family's monthly budget is balanced.",
    source: "Family Budget Sheet",
    loggedAt: "October",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The family's net income is $3,200 a month.",
      correctVerdict: "True",
      reasonText: "The budget sheet lists one income, $3,200 a month after taxes.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The family's expenses add up to less than its income.",
      correctVerdict: "False",
      reasonText: "The expenses add up to $3,350, which is $150 more than the $3,200 income.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Cutting the $180 eating-out line would balance the budget.",
      correctVerdict: "True",
      reasonText: "$3,350 − $180 = $3,170, which is less than $3,200, so the budget would balance.",
    },
  ],

  evidenceReadings: [
    { id: "net", label: "Net income", reading: "The Chens bring home $3,200 a month after taxes.", kind: "data" },
    { id: "income_line", label: "Income line", reading: "The budget sheet lists one income: $3,200.", kind: "data" },
    { id: "exp_total", label: "Expense list", reading: "Rent $1,450, groceries $620, car $480, utilities $310, eating out $180, savings $200, other $110 — $3,350 in all.", kind: "data" },
    { id: "over", label: "Difference", reading: "$3,350 is $150 more than $3,200.", kind: "data" },
    { id: "cut", label: "Cut test", reading: "$3,350 − $180 = $3,170.", kind: "data" },
    { id: "balanced_def", label: "Balanced budget", reading: "A budget is balanced when expenses are equal to or less than income.", kind: "data" },
    { id: "car_color", label: "Family car", reading: "The family's car is blue.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["net", "income_line"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["exp_total", "over"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["cut", "balanced_def"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["car_color"] },
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
    "Did I add up every expense?",
    "Did I compare expenses to income?",
    "Did I test whether one cut would balance it?",
    "Did I explain what 'balanced' means?",
  ],
};
