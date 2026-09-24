// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4E: the effects of
// Reconstruction, including the 13th, 14th, and 15th Amendments.
//
// This case deals only in documented text (the amendment itself,
// sharecropping contracts, black codes) — no dramatized scenes, no
// invented dialogue, no depiction of historical figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.4E-SC",
  teksLabel: "5.4E",
  grade: 5,
  subject: "Social Studies",
  title: "Freedom on Paper",
  tagline: "The 13th Amendment fixed the problems freed people faced after slavery.",
  transmission: {
    claimHeadline: "The 13th Amendment fixed the problems freed people faced after slavery.",
    source: "Reconstruction Records Archive",
    loggedAt: "1865–1877",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-4e-sc-field-report.jpg",
    imageCaption: "Reconstruction Records Archive, 1865–1877",
    notes: "The 13th Amendment was ratified in 1865. Its text officially ends slavery and forced labor in the United States. That was a real and important change in the law. But other records in the archive tell a fuller story. A sharecropping contract from the 1870s shows a farmer who owed most of his crop to the landowner. That kept him in debt year after year. After 1865, several Southern states passed black codes. These laws limited where freed people could work and travel and what property they could own. A textbook summary in the archive calls the amendment 'the end of the story' for people who had been enslaved. The sharecropping and black code records show the story did not end there.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The 13th Amendment's passage in 1865 was the finish line for freed people's struggles.",
      correctVerdict: "Misleading",
      reasonText: "Legal freedom did not bring equal treatment or equal chances right away.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The 13th Amendment legally ended slavery throughout the United States in 1865.",
      correctVerdict: "True",
      reasonText: "This is exactly what the amendment's text did. It ended slavery in the law.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The 13th Amendment fixed the problems freed people faced after slavery.",
      correctVerdict: "False",
      reasonText: "Many people who had been enslaved were pushed into sharecropping. It trapped them in debt and gave landowners a kind of control like slavery.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Freed people had full rights and protections once slavery ended.",
      correctVerdict: "False",
      reasonText: "Southern states passed black codes and later Jim Crow laws. These limited freed people's rights even though they were legally free.",
    },
  ],

  evidenceReadings: [
    { id: "amendment_summary", label: "Textbook amendment summary", reading: "A textbook summary calls the 13th Amendment 'the end of the story' for people who had been enslaved.", kind: "document" },
    { id: "amendment_text", label: "13th Amendment text", reading: "The 13th Amendment's text (1865) officially ends slavery and forced labor in the United States.", kind: "document" },
    { id: "sharecrop_contract", label: "Sharecropping contract", reading: "A sharecropping contract from the 1870s shows a farmer owing most of his crop to the landowner, which kept him in debt.", kind: "document" },
    { id: "black_codes", label: "Black codes record", reading: "After 1865, black codes in several Southern states limited freed people's work, travel, and property rights.", kind: "document" },
    { id: "unrelated_railroad", label: "Unrelated railroad map", reading: "A railroad map from the same decade, with no link to this question.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["amendment_summary"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["amendment_text"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sharecrop_contract"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["black_codes"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_railroad"] },
  ],

  echo: {
    main: "An old 'case closed' claim surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. A 'problem solved' claim after a big legal change deserves a close read.",
    sort: "Sorted. Notice how the amendment's real accomplishment and the problems that came after are two different signals.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I explain why calling the amendment 'the end of the story' is misleading?",
    "Did I state what the 13th Amendment actually accomplished?",
    "Did I mention sharecropping as a problem freed people still faced?",
    "Did I mention black codes as a way freed people's rights were still restricted?",
  ],
};
