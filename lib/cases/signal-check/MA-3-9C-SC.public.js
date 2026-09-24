// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.3.9C-SC. TEKS 3.9C — identify the costs and benefits of planned and unplanned spending decisions.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.3.9C-SC",
  teksLabel: "3.9C",
  grade: 3,
  subject: "Math",
  title: "The Snack Stop",
  tagline: "Buying a snack on the way home didn't cost Jada anything.",
  transmission: {
    claimHeadline: "Buying a snack on the way home didn't cost Jada anything.",
    source: "Jada's Savings Chart",
    loggedAt: "Week 3",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Jada had a plan for saving her money.",
      correctVerdict: "True",
      reasonText: "Jada planned to save $5 every week for a $20 art kit. Her chart has a box for each week.",
      stemEvidenceIds: ["plan", "chart"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The snack was a planned spending choice.",
      correctVerdict: "False",
      reasonText: "Jada bought the snack because it looked good on the way home. She wrote that she didn't plan it.",
      stemEvidenceIds: ["snack", "unplanned"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Jada still has money saved, so the snack cost her nothing.",
      correctVerdict: "Misleading",
      reasonText: "Jada still has $12. But now she will get her art kit one week later than she planned.",
      stemEvidenceIds: ["saved_now", "new_date"],
    },
  ],

  evidenceReadings: [
    { id: "plan", label: "Saving plan", reading: "Jada's plan: save $5 every week for a $20 art kit.", kind: "data" },
    { id: "chart", label: "Savings chart", reading: "The chart has 4 boxes, one for each week, to reach $20.", kind: "data" },
    { id: "snack", label: "Store receipt", reading: "Jada spent $3 on a snack she saw on the way home.", kind: "data" },
    { id: "unplanned", label: "Jada's note", reading: "Jada wrote, \"I didn't plan to buy it. It just looked good.\"", kind: "data" },
    { id: "saved_now", label: "Money saved", reading: "After the snack, Jada has $12 saved instead of $15.", kind: "data" },
    { id: "new_date", label: "New finish date", reading: "Jada will now reach $20 one week later than she planned.", kind: "data" },
    { id: "color", label: "Favorite color", reading: "Jada's favorite color is green.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["plan", "chart"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["snack", "unplanned"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["saved_now", "new_date"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["color"] },
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
    "Did I use Jada's saving plan?",
    "Did I say whether the snack was planned?",
    "Did I explain what the snack cost Jada?",
    "Did I avoid saying the snack cost nothing?",
  ],
};
