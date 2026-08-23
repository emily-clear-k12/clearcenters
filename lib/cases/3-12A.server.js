// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.12A).

export const SERVER_CASE = {
  standard: "3.12A",
  title: "Cleo Says Everything Died in November",
  bigQuestion: "The tree is bare, the warblers are gone and the turtle vanished. Did all of it die, or is something else going on?",
  evidenceBank: [
    "Scratching the pecan twig shows green underneath",
    "There are small buds all along the branch",
    "The ringed warbler was recorded in Mexico in November",
    "The box turtle is dug in under the leaf pile, breathing slowly",
    "Last year the leaves were back by March 20th"
  ],
  trapLine: "Everything out there died in November.",
  castNames: {
    cleo: "Cleo",
    pecan: "The Pecan Tree",
    warbler: "The Warbler",
    turtle: "The Box Turtle",
    ade: "Ade"
  },
  distractors: "Thinking a bare tree in winter is dead; thinking animals that disappear in cold weather have died; not connecting temperature and rainfall to the changes; assuming a hibernating animal is unwell rather than slowed down on purpose.",
  mustInclude: [
    "The chat says the tree is alive.",
    "It says where the warblers went.",
    "It says what the turtle is doing.",
    "It says what set all this off.",
    "It gives Ade a reason to keep filling the feeder."
  ],
};
