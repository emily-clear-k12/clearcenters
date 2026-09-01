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
  tagline: "Once Texas became independent in 1836, most of its major problems were solved.",
  transmission: {
    claimHeadline: "Once Texas became independent in 1836, most of its major problems were solved.",
    source: "Republic of Texas Records",
    loggedAt: "Post-Independence File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-3d-sc-field-report.jpg",
    imageCaption: "Republic of Texas Records — Post-Independence File",
    notes: "After winning independence in 1836, the new Republic of Texas owed large debts from the war and struggled to pay its own soldiers and government workers. Mexico refused to officially recognize Texas as independent, and Mexican forces continued raids across the disputed border. These challenges — debt, a lack of recognition from Mexico, and border conflict — continued for most of the Republic's ten years as an independent nation.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Since Texas had won its independence, its biggest problems were behind it.",
      correctVerdict: "False",
      reasonText: "The Republic's debt, Mexico's refusal to recognize it, and border conflict all continued for most of its ten years — independence didn't end the republic's serious challenges.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Mexico refused to recognize Texas's independence and continued to threaten invasion.",
      correctVerdict: "True",
      reasonText: "Mexico's own government statement refused recognition, and border raids continued after 1836.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The new Republic of Texas struggled with heavy debt it couldn't easily pay off.",
      correctVerdict: "True",
      reasonText: "The treasury record shows large war debts, and soldiers went unpaid for months afterward.",
    },
  ],

  evidenceReadings: [
    { id: "debt_record", label: "Republic treasury record", reading: "The new government owed large debts and struggled to pay soldiers and workers.", kind: "document" },
    { id: "unpaid_soldiers", label: "Soldier pay record", reading: "Many Texas soldiers went unpaid for months after the war.", kind: "document" },
    { id: "mexico_recognition", label: "Mexican government statement", reading: "Mexico refused to officially recognize Texas as an independent nation.", kind: "document" },
    { id: "border_raids", label: "Border incident report", reading: "Mexican forces continued raids across the disputed border after 1836.", kind: "document" },
    { id: "problems_summary", label: "Republic challenges summary", reading: "Debt, lack of recognition from Mexico, and border conflict all continued well after independence was declared.", kind: "document" },
    { id: "republic_struggle", label: "Historian's note", reading: "The Republic of Texas faced these serious challenges for most of its ten years as an independent nation.", kind: "document" },
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
