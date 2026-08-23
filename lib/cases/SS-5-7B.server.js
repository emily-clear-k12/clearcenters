// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.7B, TEKS 5.7B).

export const SERVER_CASE = {
  standard: "SS.5.7B",
  title: "The Town That Picked the Wrong Spot",
  bigQuestion: "Why do some places attract more settlement than others, and did Cedar Junction choose a location that can support a growing town?",
  evidenceBank: [
    "Reliable water can support people and farms",
    "Flatter land can make building and travel easier",
    "Transportation routes can connect a settlement to people and goods"
  ],
  trapLine: "A town can grow almost anywhere if enough people decide to move there. Geography may make life easier, but it does not really influence settlement patterns.",
  castNames: {
    eli: "Eli Mercer",
    nora: "Nora Wells",
    gabe: "Gabe Ortiz",
    meena: "Meena Patel",
    hart: "Ms. Hart"
  },
  distractors: "Saying geography has no influence because people can build anywhere; naming water or mountains without explaining their effects; claiming people can never settle in difficult environments; choosing a site only because a railroad stops there; confusing a geographic factor with a population result.",
  mustInclude: [
    "Connects reliable water to settlement or population growth.",
    "Connects terrain or landform conditions to building, travel, or settlement.",
    "Connects transportation access to settlement growth or population distribution.",
    "Uses multiple geographic factors to predict a settlement pattern.",
    "Explains that geography influences settlement without completely determining it."
  ],
};
