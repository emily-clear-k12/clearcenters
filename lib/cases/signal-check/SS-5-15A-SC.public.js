// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.15A: the powers and
// responsibilities of the three branches of the U.S. government.
//
// This case deals only in the Constitution's own text (Articles I-III) and
// documented practice (a veto) — no dramatized scenes, no invented
// dialogue, no depiction of historical figures.

export const PUBLIC_CASE = {
  standard: "SS.5.15A-SC",
  teksLabel: "5.15A",
  grade: 5,
  subject: "Social Studies",
  title: "One Branch, Every Job?",
  tagline: "The executive branch has the power to make laws and also to decide what those laws mean.",
  transmission: {
    claimHeadline: "The executive branch has the power to make laws and also to decide what those laws mean.",
    source: "Constitutional Powers Archive",
    loggedAt: "Articles I–III",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-15a-sc-field-report.jpg",
    imageCaption: "Constitutional Powers Archive — Articles I, II & III",
    notes: "Article II of the Constitution sets up the executive branch. Its job is to carry out the laws Congress passes. Article I gives Congress, the legislative branch, the power to write and pass laws. Article III gives the courts, the judicial branch, the power to interpret laws. The courts also decide if a law follows the Constitution. One record shows a president's veto. The president turned down a bill and sent it back to Congress. But the president did not rewrite the bill or decide what its words meant. Congress kept that power.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The executive branch's real job under the Constitution is to carry out the laws that Congress passes.",
      correctVerdict: "True",
      reasonText: "Article II of the Constitution gives the executive branch the job of carrying out laws.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The president can veto a bill Congress passes, so the executive branch has real power to make laws.",
      correctVerdict: "Misleading",
      reasonText: "A veto only accepts or turns down a bill. It does not let the president write laws or decide what they mean.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The executive branch has the power to make laws.",
      correctVerdict: "False",
      reasonText: "Article I of the Constitution gives the power to make laws to Congress, the legislative branch.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "The executive branch has the power to decide what laws mean.",
      correctVerdict: "False",
      reasonText: "Article III of the Constitution gives the courts, the judicial branch, the power to interpret laws. The courts also decide if a law follows the Constitution.",
    },
  ],

  evidenceReadings: [
    { id: "article2_text", label: "Article II text", reading: "Article II of the Constitution says the executive branch's job is to carry out the laws.", kind: "document" },
    { id: "veto_record", label: "Presidential veto record", reading: "Records show a president vetoing a bill. The bill went back to Congress. The president did not rewrite it.", kind: "document" },
    { id: "article1_text", label: "Article I text", reading: "Article I of the Constitution gives Congress the power to write and pass laws.", kind: "document" },
    { id: "article3_text", label: "Article III text", reading: "Article III of the Constitution gives the courts the power to interpret laws and decide if they follow the Constitution.", kind: "document" },
    { id: "unrelated_census", label: "Unrelated census amendment", reading: "An amendment about how the census is taken. It has nothing to do with this question.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["article2_text"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["veto_record"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["article1_text"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["article3_text"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_census"] },
  ],

  echo: {
    main: "An old 'every job' claim about the executive branch surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. Read all three articles closely before you decide.",
    sort: "Sorted. Notice how the veto record looks like lawmaking power but actually isn't.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I name the executive branch's real job as enforcing laws?",
    "Did I explain why a veto isn't the same as having lawmaking power?",
    "Did I name Congress as the branch with the power to make laws?",
    "Did I name the courts as the branch with the power to interpret laws?",
  ],
};
