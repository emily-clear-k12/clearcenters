// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.12B).

export const SERVER_CASE = {
  standard: "3.12B",
  title: "The Herons Will Just Eat Something Else",
  bigQuestion: "If the four frogs are moved out, what happens to the herons above them and the midges below them?",
  evidenceBank: [
    "The chain goes pondweed, then midges, then frogs, then herons",
    "Miller's Pond went from 6 herons in 2019 to 1 by 2021",
    "The herons at Miller's left rather than eating something else",
    "Midge numbers at Miller's went up sharply with no frogs",
    "The pondweed makes its own food using sunlight"
  ],
  trapLine: "It's four frogs. The herons will just eat something else and be fine. Nothing else changes.",
  castNames: {
    ash: "Mr. Ash",
    weed: "The Pondweed",
    frog: "The Frog",
    heron: "The Heron",
    lark: "Lark"
  },
  distractors: "Thinking a predator can simply switch to another food with no effect; looking only at the animal removed and not the ones above and below it; missing that the chain starts with a producer; thinking a small number of animals cannot matter to the rest of the chain.",
  mustInclude: [
    "The chat gives the food chain in order.",
    "It says where the energy starts.",
    "It uses the Miller's Pond heron numbers.",
    "It says what happens below the frogs too.",
    "It gives Lark the rule for the vote."
  ],
};
