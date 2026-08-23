// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.12C).

export const SERVER_CASE = {
  standard: "4.12C",
  title: "The Seashell on the Hilltop",
  bigQuestion: "There are hundreds of sea fossils on a dry hilltop, many locked in the rock. What was this place when they were alive?",
  evidenceBank: [
    "There are hundreds of sea fossils across the hillside",
    "Many are still embedded in the rock face itself",
    "The hillside is limestone, which forms in shallow seas",
    "There are no land-animal fossils at all in this layer",
    "The fossils are all sea creatures — urchins, ammonites, clams"
  ],
  trapLine: "Somebody's picnic. Kid carried a shell up from the coast and dropped it. Mystery solved.",
  castNames: {
    dez: "Uncle Dez",
    mina: "Mina",
    urchin: "The Sea Urchin",
    lime: "The Limestone",
    gap: "What Isn't Here",
    sam: "Ranger Sam"
  },
  distractors: "Explaining an out-of-place fossil by human transport rather than by environmental change; assuming an environment has always been what it is now; treating a fossil as an object that was placed rather than as part of the rock; missing that the rock type itself is evidence about the past environment.",
  mustInclude: [
    "The chat uses how many fossils there are.",
    "It uses the fossils still in the rock.",
    "It uses the rock type.",
    "It says what this place used to be.",
    "It tells Dez what fossils are for."
  ],
};
