// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.12B, TEKS 5.12B).

export const SERVER_CASE = {
  standard: "SS.5.12B",
  title: "Where Should We Build It?",
  bigQuestion: "How should geographic factors influence where a business or economic activity is located?",
  evidenceBank: [
    "Site A has the cheapest land but is remote",
    "Site B is near highway, rail, farms, and workers",
    "Site C is closest to the largest city but has more flood risk"
  ],
  trapLine: "A factory should be built wherever land is cheapest. Geography does not matter much once a business has enough money.",
  castNames: {
    cal: "Cal Turner",
    sasha: "Sasha Nguyen",
    omar: "Omar Reyes",
    jules: "Jules Carter",
    msrivera: "Ms. Rivera"
  },
  distractors: "Choosing a site only because it is cheapest; assuming the biggest city is always best; ignoring flood risk, water, or terrain; treating geography as destiny; giving a recommendation with no tradeoff; listing factors without connecting them to business needs.",
  mustInclude: [
    "Connects transportation or raw-material access to the location of the business.",
    "Explains a physical geographic factor such as water, terrain, or flood risk.",
    "Connects workforce, population, or market access to the location decision.",
    "Weighs a tradeoff instead of choosing a site for only one reason.",
    "Rejects “cheapest land is enough” and supports a site recommendation with multiple geographic factors."
  ],
};
