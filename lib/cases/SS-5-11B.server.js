// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.11B, TEKS 5.11B).

export const SERVER_CASE = {
  standard: "SS.5.11B",
  title: "The Strawberry Shortage",
  bigQuestion: "How can a change in supply or demand affect farms, food businesses, workers, and consumers?",
  evidenceBank: [
    "A late freeze damaged part of the crop",
    "Farms harvested fewer berries",
    "Stores received smaller shipments"
  ],
  trapLine: "A strawberry shortage only affects shoppers at the grocery store. Farms and industries can keep working the same way.",
  castNames: {
    tessa: "Tessa Green",
    marisol: "Marisol Vega",
    ben: "Ben Carter",
    nia: "Nia Lewis",
    drake: "Mr. Drake"
  },
  distractors: "Saying shortages only affect prices; saying farmers can instantly grow more; claiming demand automatically causes slavery; ignoring the role of enslaved labor in plantation agriculture; treating every price change as guaranteed; listing farm/industry/consumer without showing links.",
  mustInclude: [
    "Explains how the freeze reduced strawberry supply.",
    "Connects reduced supply to an effect on the farm or agricultural decisions.",
    "Connects the shortage to an effect on a food-processing business or industry.",
    "Explains at least one consumer or store effect, such as substitutes, availability, or possible price change.",
    "Rejects the idea that the shortage only affects shoppers and explains effects across more than one part of the economy."
  ],
};
