// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.12D).

export const SERVER_CASE = {
  standard: "3.12D",
  title: "Somebody Carved That",
  bigQuestion: "The rock was split open this morning and the fern was on the inside. So who could have carved it?",
  evidenceBank: [
    "The rock was split open this morning and the fern was inside",
    "The fern has a main vein with tiny side veins branching off",
    "The living fern on the windowsill has the same vein pattern",
    "The quarry has dozens more in the same grey layer",
    "Ferns grow in damp shady ground and the hill is dry grass now"
  ],
  trapLine: "Someone scratched that in with a nail. It's a rock. Rocks don't have plants in them.",
  castNames: {
    dara: "Dara",
    fossil: "The Fern Fossil",
    split: "The Split Rock",
    living: "The Living Fern",
    ivy: "Ivy"
  },
  distractors: "Thinking a fossil is a carving or a picture of a plant rather than a trace of one that lived; assuming rocks cannot contain the remains of living things; missing that a fossil found sealed inside a rock could not have been carved; not connecting what an organism needed to live to what the place must once have been like.",
  mustInclude: [
    "The chat uses the split rock.",
    "It uses the vein pattern.",
    "It uses how many there are.",
    "It says what the place used to be like.",
    "It tells Ivy what a fossil actually is."
  ],
};
