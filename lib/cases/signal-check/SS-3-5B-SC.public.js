// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.5B covers creating a
// budget. Stored with an "SS." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a student's birthday-money budget) — not a
// reworded version of Group Chat's SS.3.5B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.5B-SC",
  teksLabel: "3.5B",
  grade: 3,
  subject: "Social Studies",
  title: "Maya's $40",
  tagline: "A budget is just a list of things you want to buy.",
  transmission: {
    claimHeadline: "A budget is just a list of things you want to buy.",
    source: "Maya's Birthday Money Plan",
    loggedAt: "Budget Worksheet",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-5b-sc-field-report.jpg",
    imageCaption: "Maya's Birthday Money Plan — Budget Worksheet",
    notes: "Maya got $40 for her birthday. She wrote a budget. She planned $15 for a gift for her friend. She saved $10 for a bike helmet. She planned to give $5 to the animal shelter. She kept $10 to spend later. Every dollar of the $40 has a place in her plan. Her brother said, \"A budget is just a wish list. It does not need to add up to anything.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Maya's budget sets aside money for saving, not just spending.",
      correctVerdict: "True",
      reasonText: "Maya saves $10 of her budget for a bike helmet. She does not spend it right away.",
      stemEvidenceIds: ["savings_line", "helmet_goal"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Maya's budget includes money to donate to the animal shelter.",
      correctVerdict: "True",
      reasonText: "Maya plans to give $5 of her budget to the animal shelter.",
      stemEvidenceIds: ["donation_line", "shelter_note"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Maya's budget is only a wish list. It does not need to add up to her $40.",
      correctVerdict: "False",
      reasonText: "The parts of her budget add up to exactly $40. That is all her money. It is a real plan, not a wish list.",
      stemEvidenceIds: ["total_check", "category_sum"],
    },
  ],

  evidenceReadings: [
    { id: "savings_line", label: "Budget category: Saving", reading: "$10 set aside for later, not spent right away.", kind: "data" },
    { id: "helmet_goal", label: "Maya's note", reading: "\"Saving for a bike helmet — need $10 more.\"", kind: "data" },
    { id: "donation_line", label: "Budget category: Donate", reading: "$5 planned for the animal shelter.", kind: "data" },
    { id: "shelter_note", label: "Animal shelter flyer", reading: "Local shelter accepts donations to help care for rescued pets.", kind: "data" },
    { id: "total_check", label: "Worksheet total", reading: "$15 gift + $10 saving + $5 donate + $10 spend later = $40.", kind: "data" },
    { id: "category_sum", label: "Budget worksheet", reading: "Every dollar of the $40 is placed into one of four categories.", kind: "data" },
    { id: "gift_note", label: "Birthday card", reading: "Maya's aunt wrote \"Happy Birthday!\" inside the card.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["savings_line", "helmet_goal"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["donation_line", "shelter_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["total_check", "category_sum"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["gift_note"] },
  ],

  echo: {
    main: "Maya's budget worksheet just came in, Cadet. Let's see if this claim holds up.",
    scan: "Four categories, one total — read every line carefully.",
    sort: "Notice how each category pairs with its own note or record.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that Maya's budget includes saving, not just spending?",
    "Did I mention that Maya's budget includes a donation?",
    "Did I mention that Maya's budget categories add up to her full $40?",
    "Did I avoid saying a budget is just a wish list?",
  ],
};
