// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.3.9E-SC. TEKS 3.9E(ii) — recognize characteristics and structures of argumentative text by distinguishing facts from opinion.

export const SERVER_CASE = {
  standard: "ELA.3.9E-SC",
  title: "The Cereal Ad",
  stemMode: "dropdown",
  modelAnswer:
    "\"Crunch-O's have 8 grams of fiber in every bowl.\" is TRUE because this is a fact you can check, and the nutrition label on the box shows it. \"Crunch-O's is the best breakfast ever.\" is FALSE because \"Best ever\" is an opinion. It tells what someone thinks and can't be proven. \"All kids love Crunch-O's.\" is MISLEADING because it sounds like a fact, but nobody could check whether every kid in the world loves Crunch-O's.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked False.",
    "Signal C marked Misleading.",
    "Evidence picks name Fiber line or Nutrition label for Signal A.",
    "Evidence picks name Best line or What an opinion is for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Calls it a fact.",
        "Uses the nutrition label.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "Calls it an opinion.",
        "Explains it can't be proven.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Notes it sounds like a fact.",
        "Explains it can't be proven.",
      ],
    },
  },
};
