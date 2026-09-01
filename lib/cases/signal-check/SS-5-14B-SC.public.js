// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.14B: the purposes
// of government as identified in the Preamble to the U.S. Constitution.
//
// This case deals only in the Constitution's own text — no dramatized
// scenes, no invented dialogue, no depiction of historical figures.

export const PUBLIC_CASE = {
  standard: "SS.5.14B-SC",
  teksLabel: "5.14B",
  grade: 5,
  subject: "Social Studies",
  title: "Just One Job?",
  tagline: "The Constitution's Preamble describes just one main job: making laws.",
  transmission: {
    claimHeadline: "The Constitution's Preamble describes just one main job: making laws.",
    source: "U.S. Constitution Archive",
    loggedAt: "1787",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-14b-sc-field-report.jpg",
    imageCaption: "U.S. Constitution Archive — The Preamble, 1787",
    notes: "The Preamble to the U.S. Constitution lists six separate purposes for government, not one. Its 'establish justice' clause, examined closely, is only one purpose among the six listed. The 'form a more perfect union' clause focuses on bringing the states together as one nation — a purpose about unity, not lawmaking. The 'provide for the common defense' clause focuses on protecting the country. And the 'promote the general welfare' and 'secure the blessings of liberty' clauses both focus on citizens' wellbeing and freedom. Read together, the six purposes cover far more ground than lawmaking alone.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "'Establish justice' is one of the Preamble's purposes, so making fair laws must be the Constitution's one main job.",
      correctVerdict: "Misleading",
      reasonText: "'Establish justice' does relate to fair laws, but the Preamble names it as just one of six separate purposes, not the whole job.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Preamble describes just one main job: making laws.",
      correctVerdict: "False",
      reasonText: "'Form a more perfect union' is about bringing the states together as one nation, a purpose separate from lawmaking.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "'Provide for the common defense' is listed as a purpose in the Preamble.",
      correctVerdict: "True",
      reasonText: "This purpose focuses on protecting the country, not on writing laws.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "'Promote the general welfare' and 'secure the blessings of liberty' are both listed as purposes in the Preamble.",
      correctVerdict: "True",
      reasonText: "These purposes focus on citizens' wellbeing and freedom, separate goals from lawmaking.",
    },
  ],

  evidenceReadings: [
    { id: "justice_clause", label: "'Establish justice' clause", reading: "The Preamble's 'establish justice' clause, examined closely, is one purpose among six listed.", kind: "document" },
    { id: "union_clause", label: "'Form a more perfect union' clause", reading: "The Preamble's 'form a more perfect union' clause focuses on uniting the states, not on lawmaking.", kind: "document" },
    { id: "defense_clause", label: "'Common defense' clause", reading: "The Preamble's 'provide for the common defense' clause focuses on protecting the country.", kind: "document" },
    { id: "welfare_liberty_clause", label: "'General welfare' & 'liberty' clauses", reading: "The Preamble's 'promote the general welfare' and 'secure the blessings of liberty' clauses focus on citizens' wellbeing and freedom.", kind: "document" },
    { id: "unrelated_amendment", label: "Unrelated later amendment", reading: "A later constitutional amendment about voting age, unrelated to the Preamble.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["justice_clause"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["union_clause"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["defense_clause"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["welfare_liberty_clause"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_amendment"] },
  ],

  echo: {
    main: "An old 'one main job' claim surfaced in the Constitution archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. Read all six of the Preamble's purposes before you decide.",
    sort: "Sorted. Notice how each clause you sorted maps to a different purpose, not just one.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I explain why 'establish justice' doesn't make lawmaking the Constitution's one job?",
    "Did I explain what 'form a more perfect union' is really about?",
    "Did I name 'common defense' as a separate purpose from lawmaking?",
    "Did I name 'general welfare' and 'liberty' as their own separate purposes?",
  ],
};
