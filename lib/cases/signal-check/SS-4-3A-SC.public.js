// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.3A: "Analyze the
// causes, major events, and effects of the Texas Revolution, including the
// Battle of the Alamo..." Stored with an "SS." prefix so this code can
// never collide with a Science case using the same bare TEKS number.
//
// This case deliberately deals only in documented facts and named primary
// sources (the defender roster, Santa Anna's own order, Dickinson's and
// Esparza's firsthand accounts) — no dramatized battle scene, no invented
// dialogue, no depiction of the historical figures themselves. The evidence
// is the record, not a reenactment.

export const PUBLIC_CASE = {
  standard: "SS.4.3A-SC",
  teksLabel: "4.3A",
  grade: 4,
  subject: "Social Studies",
  title: "Did Anyone Survive the Alamo?",
  tagline: "No one survived the Battle of the Alamo.",
  transmission: {
    claimHeadline: "No one survived the Battle of the Alamo.",
    source: "Texas History Archive",
    loggedAt: "March 6, 1836 — Aftermath Record",
  },

  // Grade 4: verdict is still a button, but the reasoning is typed.
  stemMode: "dropdown-open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-3a-sc-field-report.jpg",
    imageCaption: "Texas History Archive — Alamo aftermath records",
    notes: "The Alamo's roster lists the Texian soldiers who fought there, and almost every one of them was killed in the final battle on March 6, 1836. But the roster only lists the fighters — not everyone who was inside the Alamo. Santa Anna gave an order that day telling his soldiers to spare and release anyone who wasn't fighting, like women and children. Two people who were released were Susanna Dickinson and a boy named Enrique Esparza. Both of them survived and later told their own stories about what they saw. Some short versions of this story just say \"no one survived the Alamo\" — but the roster, Santa Anna's order, and the survivors' own stories show there's more to it.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Every single person inside the Alamo died in the final battle.",
      correctVerdict: "Misleading",
      reasonText: "Nearly all of the Texian defenders were killed, but a number of non-combatants — women, children, and others — were not harmed and were released.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Susanna Dickinson survived the battle and carried word of what happened to Sam Houston.",
      correctVerdict: "True",
      reasonText: "Dickinson was one of the non-combatants inside the Alamo, and she survived to deliver the news, becoming a key eyewitness.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Some of what we know about the Alamo today comes directly from people who were actually there.",
      correctVerdict: "True",
      reasonText: "Eyewitness accounts from survivors like Dickinson and Enrique Esparza are primary sources historians still use.",
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT
  // pre-sorted so Screen 2 doesn't spoil the Sensor Sort game or the
  // Verdict reveal. Sort correctness is driven entirely by
  // sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "roster", label: "Defender roster", reading: "Lists the Texian soldiers who fought inside the Alamo during the final battle.", kind: "document" },
    { id: "casualty_report", label: "Casualty report", reading: "Shows that nearly all of the soldiers on the roster were killed in the battle.", kind: "document" },
    { id: "dickinson_account", label: "Dickinson's account", reading: "Susanna Dickinson's own story of what happened — she was inside the Alamo and survived.", kind: "document" },
    { id: "santaannaorder", label: "Santa Anna's order", reading: "Tells soldiers to let anyone who wasn't fighting — like women and children — go free.", kind: "document" },
    { id: "esparza_account", label: "Esparza's account", reading: "Enrique Esparza's own story — he was a boy inside the Alamo and survived.", kind: "document" },
    { id: "textbook_quote", label: "Old summary line", reading: "A short line some versions of the story use: \"No one survived the Alamo.\"", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["roster", "casualty_report"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["dickinson_account", "santaannaorder"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["dickinson_account", "esparza_account"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["textbook_quote"] },
  ],

  echo: {
    main: "An old claim about the Alamo surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Three signals, six raw records — nothing's sorted yet, and one record backs up more than one signal. Read carefully.",
    sort: "Nice work — notice how Dickinson's account backs up two different signals. That's how real evidence works.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I explain the difference between the soldiers on the roster and the people who were released?",
    "Did I mention Susanna Dickinson's account?",
    "Did I mention that eyewitness accounts are a kind of primary source?",
    "Did I avoid saying literally no one at all survived?",
  ],
};
