// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.7B",
  title: "The Paper Airplane Contest",
  bigQuestion: "If you want to know whether fold style changes how far a paper airplane flies, what do you actually have to keep the same?",
  evidenceBank: [
    "Milo's trial 1: dart fold, gentle throw, thin paper \u2192 8 ft",
    "Milo's trial 2: glider fold, hard throw, thick paper \u2192 22 ft",
    "Three variables changed at once, so no single factor can be credited",
    "Fair-test example: same fold, same throw force, only paper weight changes across 3 trials \u2192 10 ft, 9 ft, 7 ft"
  ],
  trapLine: "I tested it \u2014 I used a different fold AND threw harder AND switched paper weight all at once. Now I know thicker paper flies farther!",
  castNames: {
    milo: "Milo the Messy Scientist",
    zoe: "Zoe the Careful Contestant",
    nia: "Nia the Notebook",
    ana: "Ana the Airplane",
    grant: "Coach Grant"
  },
  distractors: "Thinking more trials automatically fix a flawed test, even if multiple variables changed each time; believing a bigger sample size substitutes for controlling variables.",
  mustInclude: [
    "Identifies which variable should be the only one to change",
    "Identifies at least 2 variables that must stay constant",
    "Explains why Milo's test doesn't prove paper weight matters",
    "Uses the fair-test trial data as the correct model",
    "States the one-variable-at-a-time rule"
  ],
};
