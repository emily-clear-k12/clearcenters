// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.6B",
  title: "The Trail Mix Bar",
  bigQuestion: "Once raisins and pretzels are mixed in the bag, are they still really raisins and pretzels \u2014 or something new?",
  evidenceBank: [
    "Raisins picked out of the mix still look, taste, and feel exactly like raisins",
    "Pretzels picked out still look, taste, and feel exactly like pretzels",
    "A quick hand-sort separates the mix back into its original parts in under a minute",
    "Weighing the sorted parts: total mass matches the mass of the mixed bag"
  ],
  trapLine: "We've been mixed together in this bag so long, we're basically one new snack now.",
  castNames: {
    ricky: "Ricky the Raisin",
    pippa: "Pippa the Pretzel",
    chip: "Chip the Chocolate Candy",
    sara: "Sara the Sifter",
    bea: "Booth Boss Bea"
  },
  distractors: "Thinking mixing = a chemical change that creates a brand-new substance, rather than just combining materials that keep their own properties.",
  mustInclude: [
    "Names at least 2 substances in the mixture",
    "States each substance keeps its own properties",
    "Describes a way to separate them back out",
    "Rejects the \"basically one new snack\" claim",
    "Uses the vocabulary term \"mixture\" correctly"
  ],
};
