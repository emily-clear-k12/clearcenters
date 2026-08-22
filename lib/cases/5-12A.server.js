// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.12A",
  title: "The Backyard Bird Feeder",
  bigQuestion: "If a new bird feeder brings in way more birds, does that only help the birds \u2014 or does it change the whole backyard food web?",
  evidenceBank: [
    "Bird population at the feeder roughly tripled within one month",
    "Local insect population (aphids, caterpillars) dropped noticeably as birds fed on them",
    "Garden plants that were being damaged by those insects showed new healthy growth",
    "A neighborhood cat's hunting activity near the feeder increased along with the bird traffic"
  ],
  trapLine: "More birds is just good for the birds \u2014 nothing else out here really changes.",
  castNames: {
    chirpy: "Chirpy the Cardinal",
    gia: "Gia the Garden Plant",
    buggy: "Buggy the Aphid",
    whiskers: "Whiskers the Cat",
    sam: "Sam the Backyard Kid"
  },
  distractors: "Thinking only direct predator-prey pairs matter, missing effects that ripple two or three links down the chain (like the cat's behavior change).",
  mustInclude: [
    "Identifies at least 2 ripple effects beyond the birds themselves",
    "Uses the insect-population and plant-health data as evidence",
    "Connects the effect back to the food web's flow of energy",
    "Rejects the \"only helps the birds\" claim",
    "Names the insects as the link between birds and plants"
  ],
};
