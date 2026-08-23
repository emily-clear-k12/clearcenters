// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.6C).

export const SERVER_CASE = {
  standard: "4.6C",
  title: "The Fourth Do-Over",
  bigQuestion: "If 300 mL of water plus 200 mL of soil only reads 430 mL, did some of it really go missing?",
  evidenceBank: [
    "The line read 430 mL instead of 500 mL, all three times",
    "The jar weighed 680 g before mixing and 680 g after",
    "Nothing was added, spilled, or poured out",
    "Dry soil has air gaps between the grains",
    "Water sinks straight down into those gaps"
  ],
  trapLine: "The level came out 70 mL short, so 70 mL of stuff went missing. Somebody spilled. We're doing it again.",
  castNames: {
    cyl: "Cyl",
    marisol: "Marisol",
    grit: "Grit",
    trickle: "Trickle",
    gap: "The Gaps",
    dev: "Dev"
  },
  distractors: "Assuming volume and mass are the same measurement, so a drop in one must mean a drop in the other; thinking the soil 'soaked up' or absorbed some of the water in a way that destroys it; treating the soil as dissolving into the water like sugar, when this is a mixture whose parts stay visible, not a solution.",
  mustInclude: [
    "The chat brings in the scale readings.",
    "It says what actually got smaller.",
    "It explains where the missing 70 mL went.",
    "It tells Cyl the measurement wasn't a mistake.",
    "It lands the rule about matter in a mixture."
  ],
};
