// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.3D covers the
// challenges facing the new Republic of Texas. Stored with an "SS." prefix
// so this code can never collide with a Science case using the same bare
// TEKS number.
//
// Freshly scripted scenario (a Republic-era records file) — not a
// reworded version of Group Chat's SS.4.3D case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.3D-SC",
  teksLabel: "4.3D",
  grade: 4,
  subject: "Social Studies",
  title: "Can a New Republic Survive?",
  tagline: "Once Texas won its independence in 1836, most of its big problems were solved.",
  transmission: {
    claimHeadline: "Once Texas won its independence in 1836, most of its big problems were solved.",
    source: "Republic of Texas Records",
    loggedAt: "Post-Independence File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-3d-sc-field-report.jpg",
    imageCaption: "Republic of Texas Records — Post-Independence File",
    notes: "Texas won its independence in 1836. But the new Republic of Texas owed large debts from the war. It could not pay its soldiers and workers on time. Mexico would not recognize Texas as a free nation. Mexican troops kept raiding across the border. These problems did not go away. Debt, no recognition from Mexico, and border fights lasted for most of the Republic's ten years.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Texas had won its independence, so its biggest problems were behind it.",
      correctVerdict: "False",
      reasonText: "The debt, the border fights, and Mexico's refusal to recognize Texas all went on for most of the Republic's ten years. Winning did not end its big problems.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Mexico would not recognize Texas's independence and kept threatening to invade.",
      correctVerdict: "True",
      reasonText: "Mexico's own government said it would not recognize Texas. Border raids kept going after 1836.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The new Republic of Texas had heavy debt that it could not easily pay.",
      correctVerdict: "True",
      reasonText: "The treasury record shows large war debts. Soldiers went unpaid for months after the war.",
    },
  ],

  evidenceReadings: [
    { id: "debt_record", label: "Republic treasury record", reading: "The new government owed large debts. It could not pay soldiers and workers on time.", kind: "document" },
    { id: "unpaid_soldiers", label: "Soldier pay record", reading: "Many Texas soldiers went unpaid for months after the war.", kind: "document" },
    { id: "mexico_recognition", label: "Mexican government statement", reading: "Mexico would not recognize Texas as a free nation.", kind: "document" },
    { id: "border_raids", label: "Border incident report", reading: "Mexican troops kept raiding across the border after 1836.", kind: "document" },
    { id: "problems_summary", label: "Republic challenges summary", reading: "Debt, border fights, and no recognition from Mexico went on long after 1836.", kind: "document" },
    { id: "republic_struggle", label: "Historian's note", reading: "The Republic of Texas had these hard problems for most of its ten years.", kind: "document" },
    { id: "flag_note", label: "Republic flag record", reading: "The Republic of Texas adopted a new flag design in 1839.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["problems_summary", "republic_struggle"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["mexico_recognition", "border_raids"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["debt_record", "unpaid_soldiers"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["flag_note"] },
  ],

  echo: {
    main: "Republic-era records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Independence was won, but read every record before deciding what came next.",
    sort: "Notice how debt and border conflict both outlasted independence itself.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention the Republic's debt problem?",
    "Did I mention that Mexico refused to recognize Texas's independence?",
    "Did I mention that these problems continued for most of the Republic's ten years?",
    "Did I avoid saying independence solved most of Texas's major problems?",
  ],
};
