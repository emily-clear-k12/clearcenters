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
    notes: "The 13th Amendment's text, ratified in 1865, formally abolishes slavery and involuntary servitude in the United States — a real and significant legal change. But other records from the same archive tell a fuller story. A sharecropping contract from the 1870s shows a farmer owing most of his crop to the landowner, creating a cycle of ongoing debt. Black codes passed in several Southern states after 1865 restricted freed people's work, travel, and property rights. A textbook summary in the archive calls the amendment's passage 'the end of the story' for formerly enslaved people — but the sharecropping and black codes records suggest the story didn't end there.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The 13th Amendment's passage in 1865 was the finish line for freed people's struggles.",
      correctVerdict: "Misleading",
      reasonText: "Legal freedom didn't guarantee equal treatment or opportunity right away.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The 13th Amendment legally ended slavery throughout the United States in 1865.",
      correctVerdict: "True",
      reasonText: "This is exactly what the amendment's text accomplished — ending slavery as a legal institution.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The 13th Amendment fixed the problems freed people faced after slavery.",
      correctVerdict: "False",
      reasonText: "Many formerly enslaved people were pushed into sharecropping systems that trapped them in debt, similar to the economic control of slavery.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Freed people had full rights and protections once slavery ended.",
      correctVerdict: "False",
      reasonText: "Black codes and later Jim Crow laws passed in Southern states restricted freed people's rights despite their legal freedom.",
    },
  ],

  evidenceReadings: [
    { id: "amendment_summary", label: "Textbook amendment summary", reading: "A textbook summary calls the 13th Amendment's passage 'the end of the story' for formerly enslaved people.", kind: "document" },
    { id: "amendment_text", label: "13th Amendment text", reading: "The 13th Amendment's text (1865) formally abolishes slavery and involuntary servitude in the United States.", kind: "document" },
    { id: "sharecrop_contract", label: "Sharecropping contract", reading: "A sharecropping contract from the 1870s shows a farmer owing most of his crop to the landowner, creating ongoing debt.", kind: "document" },
    { id: "black_codes", label: "Black codes record", reading: "Black codes passed in several Southern states after 1865 restricted freed people's work, travel, and property rights.", kind: "document" },
    { id: "unrelated_railroad", label: "Unrelated railroad map", reading: "An unrelated railroad expansion map from the same decade.", kind: "distractor" },
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
