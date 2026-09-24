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
  tagline: "All three founding papers could share the same label.",
  transmission: {
    claimHeadline: "All three founding papers could share the same label.",
    source: "History Museum Exhibit",
    loggedAt: "Exhibit Case Notes",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-8a-sc-field-report.jpg",
    imageCaption: "History Museum — Exhibit Case Notes",
    notes: "A museum shows three old papers from when America began. One was written in 1776. It tells why the colonies wanted to break away from Britain. The next was written once the colonies were free. It tells how the new government would be organized in three branches. The third one lists freedoms that no one can take from you, like free speech. Before the museum opened, the labels got mixed up. A helper said, \"Let's just give all three the same label: Rules for Government.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "One paper tells why the colonies wanted to break away from Britain. It is the Declaration of Independence.",
      correctVerdict: "True",
      reasonText: "The museum note says it was written in 1776. The new government did not exist yet. It gave the reasons for breaking away.",
      stemEvidenceIds: ["doc_declaration", "doc_purpose_1"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Another paper sets up how the government is organized. It is the Constitution.",
      correctVerdict: "True",
      reasonText: "The museum note says it was written once the colonies were free. Its job was to set up the new government in three branches.",
      stemEvidenceIds: ["doc_constitution", "doc_purpose_2"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "All three papers are from when America began. So they can share one \"Rules for Government\" label.",
      correctVerdict: "False",
      reasonText: "Each paper has a different job. One tells why we broke away from Britain. One sets up the government. One keeps people free. One label would hide those differences.",
      stemEvidenceIds: ["doc_billofrights", "purpose_summary"],
    },
  ],

  evidenceReadings: [
    { id: "doc_declaration", label: "Document 1 excerpt", reading: "Tells why the colonies wanted to be free from Britain.", kind: "data" },
    { id: "doc_purpose_1", label: "Curator's note, Document 1", reading: "Written in 1776, before the new government existed.", kind: "data" },
    { id: "doc_constitution", label: "Document 2 excerpt", reading: "Tells how the new government would be organized, with three branches.", kind: "data" },
    { id: "doc_purpose_2", label: "Curator's note, Document 2", reading: "Written after the colonies were free, to set up how the country would run.", kind: "data" },
    { id: "doc_billofrights", label: "Document 3 excerpt", reading: "Lists freedoms no one can take from you, like free speech and free choice of faith.", kind: "data" },
    { id: "purpose_summary", label: "Curator's comparison note", reading: "The three papers each have a different purpose. One breaks away. One sets up the rules. One keeps people free.", kind: "data" },
    { id: "exhibit_lighting", label: "Exhibit case photo", reading: "The display case has a bright light on top.", kind: "distractor" },
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
