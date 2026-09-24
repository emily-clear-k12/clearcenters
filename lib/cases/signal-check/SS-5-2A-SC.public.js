// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.2A: causes and
// effects of events leading up to and during the American Revolution.
//
// This case deals only in documented dates and events (Stamp Act, Townshend
// Acts, Boston Massacre, Boston Tea Party, Lexington and Concord) — no
// dramatized scenes, no invented dialogue, no depiction of historical
// figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.2A-SC",
  teksLabel: "5.2A",
  grade: 5,
  subject: "Social Studies",
  title: "One Bad Law?",
  tagline: "The Stamp Act alone made the colonists ready to fight for independence.",
  transmission: {
    claimHeadline: "The Stamp Act alone made the colonists ready to fight for independence.",
    source: "Colonial Correspondence Archive",
    loggedAt: "1765–1775",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-2a-sc-field-report.jpg",
    imageCaption: "Colonial Correspondence Archive, 1765–1775",
    notes: "The archive's timeline starts with the Stamp Act in 1765, a tax on paper goods that colonists protested loudly in the streets. But the records also show Parliament repealed the Stamp Act a year later, in 1766. That did not end things. Parliament kept passing new taxes and laws for years, including the Townshend Acts in 1767 and the Tea Act in 1773. Anger kept building, as the Boston Massacre in 1770, the Boston Tea Party in 1773, and the Intolerable Acts in 1774 all added to it. Fighting did not start at Lexington and Concord until April 1775, a full decade after the Stamp Act first passed.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Parliament kept passing new taxes and laws for years after the Stamp Act. These included the Townshend Acts and the Tea Act.",
      correctVerdict: "True",
      reasonText: "Colonial anger built up over almost a decade of new laws, not from one single event.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Colonists protesting the Stamp Act loudly proves they were ready to fight a war.",
      correctVerdict: "Misleading",
      reasonText: "Protesting one law is not the same as being ready for a full war. That took years of growing conflict.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The Stamp Act alone made the colonists ready to fight for independence.",
      correctVerdict: "False",
      reasonText: "The Stamp Act was repealed in 1766. Fighting did not start at Lexington and Concord until 1775, nine years later. One law did not make colonists ready to fight.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "The Boston Massacre and the Boston Tea Party added new tension years after the Stamp Act, before the war began.",
      correctVerdict: "True",
      reasonText: "These events came five to eight years after the Stamp Act, which shows that tension built up gradually.",
    },
  ],

  evidenceReadings: [
    { id: "townshend_acts", label: "Townshend Acts record", reading: "Parliament passed the Townshend Acts in 1767, taxing goods like glass, paper, and tea.", kind: "document" },
    { id: "protest_flyer", label: "Stamp Act protest flyer", reading: "An old colonial flyer shows crowds loudly protesting the Stamp Act in the streets in 1765.", kind: "document" },
    { id: "stamp_repeal", label: "Stamp Act repeal notice", reading: "Records show Parliament repealed the Stamp Act in 1766, just a year after it passed.", kind: "document" },
    { id: "lexington_date", label: "Lexington and Concord record", reading: "Fighting started at Lexington and Concord in April 1775, a full decade after the Stamp Act passed.", kind: "document" },
    { id: "boston_events", label: "Boston flashpoints record", reading: "Records list the Boston Massacre (1770) and the Boston Tea Party (1773) as big turning points years after the Stamp Act.", kind: "document" },
    { id: "sons_liberty_flag", label: "Sons of Liberty flag", reading: "Shows what the Sons of Liberty flag looked like around 1765. It is a symbol, not a timeline record.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["townshend_acts"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["protest_flyer"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["stamp_repeal", "lexington_date"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["boston_events"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sons_liberty_flag"] },
  ],

  echo: {
    main: "An old colonial timeline claim surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, six raw records — nothing's sorted yet. A single-law claim deserves a close read of the whole timeline.",
    sort: "Sorted. Notice how the repeal date and the Lexington date work together to answer the same signal.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I mention that Parliament kept passing new laws for years after the Stamp Act?",
    "Did I explain why loud protest isn't the same as being ready for war?",
    "Did I use the repeal date and the Lexington and Concord date as evidence?",
    "Did I mention the Boston Massacre and Boston Tea Party as later flashpoints?",
  ],
};
