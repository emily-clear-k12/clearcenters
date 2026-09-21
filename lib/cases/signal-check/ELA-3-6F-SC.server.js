// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.3.6F-SC. TEKS 3.6F — make inferences and use evidence to support understanding.

export const SERVER_CASE = {
  standard: "ELA.3.6F-SC",
  title: "Who Are These Two?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The story says the words \"Max is Lily's brother.\"\" is FALSE because the story never says it straight out, so you have to infer it from clues. \"Mom tells Lily to share with her brother.\" is TRUE because mom says, \"Lily, share with your brother,\" while Max and Lily sit at the same table in their pajamas. \"The clues show Max and Lily are brother and sister.\" is TRUE because they ride in the back of the family car together to visit their Aunt Rosa.",
  mustInclude: [
    "Signal A marked False.",
    "Signal B marked True.",
    "Signal C marked True.",
    "Evidence picks name Word check or Inference tip for Signal A.",
    "Evidence picks name Mom's words or Breakfast for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "States the story never says it straight out.",
        "Explains this is an inference.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Uses Mom's words.",
        "Uses a breakfast clue.",
      ],
    },
    C: {
      correctVerdict: "True",
      mustInclude: [
        "Uses the car clue.",
        "Uses the Aunt Rosa clue.",
      ],
    },
  },
};
