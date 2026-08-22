// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.13A",
  title: "The Desert Survival Reality Show",
  bigQuestion: "Do all these desert animals survive the same way, or does each one have its own special trick?",
  evidenceBank: [
    "Tortoise: hides under a rock ledge during the hottest midday hours",
    "Roadrunner: hunts fast in short bursts during cooler morning/evening hours",
    "Kangaroo rat: stays underground in a burrow during the day, emerges at night",
    "Each strategy directly matches a different desert survival challenge (heat, water, predators)"
  ],
  trapLine: "We all basically survive the same way out here \u2014 heat is heat, and an animal's an animal.",
  castNames: {
    tuck: "Tuck the Tortoise",
    rico: "Rico the Roadrunner",
    kanga: "Kanga the Kangaroo Rat",
    hostbot: "Hostbot"
  },
  distractors: "Thinking one \"best\" adaptation exists for a whole environment, rather than understanding different species solve the same challenge in different specific ways.",
  mustInclude: [
    "Names at least 2 specific adaptations (rock-hiding, timed hunting, burrowing)",
    "Matches each adaptation to the challenge it solves (heat, predators, water loss)",
    "Explains why timing of activity matters in this environment",
    "Rejects the \"we all survive the same way\" claim",
    "States that adaptations are specific to an organism's environment"
  ],
};
