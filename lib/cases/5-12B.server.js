// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.12B",
  title: "The Bee Disappearance Mystery",
  bigQuestion: "If the bees disappear, does that only hurt the bees — or does it ripple through the whole farm?",
  evidenceBank: [
    "The bee population dropped 60% in one season",
    "The flower fruit-set rate dropped at the same time the bee count dropped",
    "The farmer's crop yield data shows a decline the following season",
    "Bees connect flowers to fruit-eating animals in the food web",
  ],
  trapLine: "Losing the bees only hurts the bees — the rest of the farm is fine.",
  castNames: {
    buzz: "Buzz the Beekeeper",
    daisy: "Daisy the Flower",
    frankie: "Frankie the Farmer",
    wren: "Dr. Wren the Ecologist",
  },
  distractors:
    "Thinking removing a consumer (rather than a producer) has the bigger food-web impact; naming only one direct effect and missing ripple effects further down the chain.",
  mustInclude: [
    "Identifies at least 2 ripple effects beyond the bees themselves",
    "Uses the flower/fruit-set and crop-yield data as evidence",
    "Connects the effect back to the food web's energy flow",
    "Rejects the 'only hurts the bees' claim",
    "Names producers as the starting point of the energy flow",
  ],
  pushAngle:
    "Have them pick a different organism from the same food web — a decomposer or a top predator — and predict the ripple effects of removing that one instead of the bees.",
};
