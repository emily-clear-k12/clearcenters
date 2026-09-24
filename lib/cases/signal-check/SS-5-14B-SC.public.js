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
  tagline: "The Constitution's Preamble names just one main job: making laws.",
  transmission: {
    claimHeadline: "The Constitution's Preamble names just one main job: making laws.",
    source: "U.S. Constitution Archive",
    loggedAt: "1787",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-14b-sc-field-report.jpg",
    imageCaption: "U.S. Constitution Archive — The Preamble, 1787",
    notes: "The Preamble to the U.S. Constitution lists six purposes for government, not one. Look closely at 'establish justice.' It is just one purpose out of the six. The 'form a more perfect union' part is about joining the states into one nation. That is about unity, not making laws. The 'provide for the common defense' part is about keeping the country safe. The 'promote the general welfare' and 'secure the blessings of liberty' parts are about people's well-being and freedom. Read together, the six purposes cover much more than making laws.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "'Establish justice' is one of the Preamble's purposes. So making fair laws must be the Constitution's one main job.",
      correctVerdict: "Misleading",
      reasonText: "'Establish justice' does connect to fair laws. But the Preamble lists it as just one of six purposes, not the whole job.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Preamble names just one main job: making laws.",
      correctVerdict: "False",
      reasonText: "'Form a more perfect union' is about joining the states into one nation. That purpose is separate from making laws.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "'Provide for the common defense' is listed as a purpose in the Preamble.",
      correctVerdict: "True",
      reasonText: "This purpose is about keeping the country safe, not about writing laws.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "'Promote the general welfare' and 'secure the blessings of liberty' are both listed as purposes in the Preamble.",
      correctVerdict: "True",
      reasonText: "These purposes are about people's well-being and freedom. Those goals are separate from making laws.",
    },
  ],

  evidenceReadings: [
    { id: "justice_clause", label: "'Establish justice' clause", reading: "Looked at closely, the Preamble's 'establish justice' part is one purpose out of six.", kind: "document" },
    { id: "union_clause", label: "'Form a more perfect union' clause", reading: "The Preamble's 'form a more perfect union' part is about joining the states, not making laws.", kind: "document" },
    { id: "defense_clause", label: "'Common defense' clause", reading: "The Preamble's 'provide for the common defense' part is about keeping the country safe.", kind: "document" },
    { id: "welfare_liberty_clause", label: "'General welfare' & 'liberty' clauses", reading: "The Preamble's 'promote the general welfare' and 'secure the blessings of liberty' parts are about people's well-being and freedom.", kind: "document" },
    { id: "unrelated_amendment", label: "Unrelated later amendment", reading: "A later amendment about the voting age. It has nothing to do with the Preamble.", kind: "distractor" },
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
