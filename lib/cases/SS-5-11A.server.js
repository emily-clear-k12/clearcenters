// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.11A, TEKS 5.11A).

export const SERVER_CASE = {
  standard: "SS.5.11A",
  title: "The Sneaker Sellout",
  bigQuestion: "How do supply and demand affect what consumers can buy, what they may pay, and the choices they make?",
  evidenceBank: [
    "The store received only 40 pairs",
    "More than 100 customers asked for the shoe",
    "Several sizes sold out quickly"
  ],
  trapLine: "If a sneaker sells out, that only matters to the store. Supply and demand do not really affect consumers.",
  castNames: {
    devon: "Devon Price",
    maya: "Maya Chen",
    leo: "Leo Martinez",
    nora: "Nora Patel",
    eli: "Eli Brooks"
  },
  distractors: "Saying high demand always raises prices; treating supply and demand as definitions with no consumer effects; saying consumers have no choices after a sellout; claiming stores can instantly create more supply; saying only businesses are affected.",
  mustInclude: [
    "Connects limited supply and high demand using evidence from the sneaker launch.",
    "Explains how supply and demand affected product availability for consumers.",
    "Explains at least one consumer choice caused by the sellout.",
    "Explains that price can be affected by supply and demand without claiming one automatic outcome.",
    "Rejects the idea that supply and demand only affect stores and explains a consumer effect."
  ],
};
