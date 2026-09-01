// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.8A covers the
// purposes of the Declaration of Independence, Constitution, and Bill of
// Rights. Stored with an "SS." prefix so this code can never collide with
// a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a museum exhibit with swapped labels) — not a
// reworded version of Group Chat's SS.3.8A case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.8A-SC",
  teksLabel: "3.8A",
  grade: 3,
  subject: "Social Studies",
  title: "The Museum Mixed Up the Labels",
  tagline: "All three founding documents could share the same label.",
  transmission: {
    claimHeadline: "All three founding documents could share the same label.",
    source: "History Museum Exhibit",
    loggedAt: "Exhibit Case Notes",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-8a-sc-field-report.jpg",
    imageCaption: "History Museum — Exhibit Case Notes",
    notes: "A museum exhibit has three documents on display. One, written in 1776, explains why the colonies wanted to break away from Britain. Another, written after independence, describes how the new government would be organized into three branches. A third lists specific freedoms — like speech and religion — that the government cannot take away. All three labels were accidentally swapped before opening day, and a volunteer suggested just giving all three the same \"Rules for Government\" label to keep things simple.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "One document explains why the colonies wanted to break away from Britain — the Declaration of Independence.",
      correctVerdict: "True",
      reasonText: "The curator's note confirms this document was written in 1776, before the new government even existed, to explain the reasons for independence.",
      stemEvidenceIds: ["doc_declaration", "doc_purpose_1"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Another document sets up how the government is organized and run — the Constitution.",
      correctVerdict: "True",
      reasonText: "The curator's note confirms this document was written after independence specifically to organize the new government into three branches.",
      stemEvidenceIds: ["doc_constitution", "doc_purpose_2"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since all three documents are about America's founding, they can all share the exact same \"Rules for Government\" label.",
      correctVerdict: "False",
      reasonText: "The comparison note shows all three documents serve three different purposes — explaining a break from Britain, organizing government, and protecting individual freedoms — so one shared label would erase real differences.",
      stemEvidenceIds: ["doc_billofrights", "purpose_summary"],
    },
  ],

  evidenceReadings: [
    { id: "doc_declaration", label: "Document 1 excerpt", reading: "Explains the reasons the colonies wanted independence from Britain.", kind: "data" },
    { id: "doc_purpose_1", label: "Curator's note, Document 1", reading: "Written in 1776, before the new government existed.", kind: "data" },
    { id: "doc_constitution", label: "Document 2 excerpt", reading: "Describes how the new government would be organized, with three branches.", kind: "data" },
    { id: "doc_purpose_2", label: "Curator's note, Document 2", reading: "Written after independence, to set up how the country would run.", kind: "data" },
    { id: "doc_billofrights", label: "Document 3 excerpt", reading: "Lists specific freedoms, like speech and religion, the government cannot take away.", kind: "data" },
    { id: "purpose_summary", label: "Curator's comparison note", reading: "All three documents serve three different purposes: independence, organizing government, and protecting freedoms.", kind: "data" },
    { id: "exhibit_lighting", label: "Exhibit case photo", reading: "The display case has a bright overhead light.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["doc_declaration", "doc_purpose_1"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["doc_constitution", "doc_purpose_2"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["doc_billofrights", "purpose_summary"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["exhibit_lighting"] },
  ],

  echo: {
    main: "Exhibit case notes just came in, Cadet. Let's see if this claim holds up.",
    scan: "Three documents, three different jobs — read every excerpt and note carefully.",
    sort: "Notice how each document pairs with the curator's note about its real purpose.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the Declaration explains why the colonies wanted independence?",
    "Did I mention that the Constitution organizes the new government?",
    "Did I mention that the third document protects individual freedoms?",
    "Did I avoid saying all three documents could share the same label?",
  ],
};
