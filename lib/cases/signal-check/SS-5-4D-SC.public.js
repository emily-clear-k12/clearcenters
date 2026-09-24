// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4D: causes and
// effects of the Civil War, including sectionalism, states' rights, and
// slavery.
//
// This case deals only in documented text (secession declarations, states'
// rights documents, economic data) — no dramatized scenes, no invented
// dialogue, no depiction of historical figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.4D-SC",
  teksLabel: "5.4D",
  grade: 5,
  subject: "Social Studies",
  title: "Three Names, One Root",
  tagline: "Slavery, states' rights, and sectionalism were three completely separate causes of the Civil War.",
  transmission: {
    claimHeadline: "Slavery, states' rights, and sectionalism were three completely separate causes of the Civil War.",
    source: "Secession Documents Archive",
    loggedAt: "1860–1861",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-4d-sc-field-report.jpg",
    imageCaption: "Secession Documents Archive, 1860–1861",
    notes: "In 1860, South Carolina wrote down its reasons for leaving the Union. It names slavery as the cause. Other Southern papers from that time argue for states' rights. But look closely at which right they meant. It is almost always the right to own enslaved people. A map of jobs and trade from the 1850s shows the South's wealth was built on enslaved labor. The North's work was done in factories by free workers. Historians call this split sectionalism. A historian's summary in the archive traces all three causes back to the same root. That root is the fight over slavery.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "South Carolina's own secession declaration names slavery directly as its reason for leaving the Union.",
      correctVerdict: "True",
      reasonText: "The document itself names slavery as the cause. It is not a separate or hidden issue.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Southern states argued for 'states' rights,' so their cause was about government power, not slavery.",
      correctVerdict: "Misleading",
      reasonText: "The right these papers fought for most was the right to keep slavery. So the two are linked, not separate.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Slavery, states' rights, and sectionalism are three completely separate causes of the Civil War.",
      correctVerdict: "False",
      reasonText: "The records show all three go back to the fight over slavery. They are not separate.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "'Sectionalism' just means the North and South had different economies, so it is unrelated to slavery.",
      correctVerdict: "Misleading",
      reasonText: "The biggest cause of that split was enslaved labor in the South and free labor in the North.",
    },
  ],

  evidenceReadings: [
    { id: "sc_declaration", label: "South Carolina secession declaration", reading: "South Carolina's 1860 secession declaration names slavery directly as its reason for leaving the Union.", kind: "document" },
    { id: "states_rights_text", label: "States' rights document", reading: "A Southern states' rights paper from that time defends the right to own enslaved people.", kind: "document" },
    { id: "economic_map", label: "1850s economic map", reading: "An economic map from the 1850s shows the South's economy built on enslaved labor and the North's on factories and free workers.", kind: "data" },
    { id: "cause_summary", label: "Historian's cause summary", reading: "A historian's summary traces all three causes back to one root: the fight over slavery.", kind: "document" },
    { id: "unrelated_purchase", label: "1803 land purchase record", reading: "A land deal paper from 1803, long before the war, with no link to this question.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sc_declaration"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["states_rights_text"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["cause_summary", "sc_declaration"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["economic_map"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_purchase"] },
  ],

  echo: {
    main: "An old 'three separate causes' claim surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. Watch for how the same document can back more than one signal.",
    sort: "Sorted. Notice how South Carolina's declaration backs up more than one signal — that's how real evidence works.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I mention that South Carolina's own declaration names slavery directly?",
    "Did I explain what specific right the 'states' rights' argument was really defending?",
    "Did I explain how sectionalism connects back to slave-based labor versus free labor?",
    "Did I avoid treating the three causes as completely unconnected?",
  ],
};
