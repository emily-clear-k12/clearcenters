// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.10C).

export const SERVER_CASE = {
  standard: "4.10C",
  title: "Packing on Seven Days of Evidence",
  bigQuestion: "Forecast is right about the next seven days. So why isn't that enough to pack a three-year box?",
  evidenceBank: [
    "Six rainy days out of the next seven at the coast",
    "The coast averages 52 rainy days a year — about 1 in 7",
    "The same week last year had only one rainy day",
    "Coast summers average 88°F and winters rarely go below 45°F",
    "Seven days is not the same as thirty years"
  ],
  trapLine: "I can see seven days, so I can tell you what the place is like. It's a rainy place. Pack for rain, skip everything else.",
  castNames: {
    cast: "Forecast",
    alm: "The Almanac",
    lastyear: "Last Year",
    shorts: "The Shorts",
    coat: "The Rain Jacket",
    ada: "Ada"
  },
  distractors: "Treating a short run of weather as a description of a place's climate; assuming an accurate forecast must also be a good long-term guide; thinking climate means only temperature and not rainfall; concluding a single unusual stretch of weather overturns a long-run average.",
  mustInclude: [
    "The chat names what Forecast actually knows.",
    "It names what the Almanac knows.",
    "It uses the long-run numbers.",
    "It uses the same week last year.",
    "It gives Ada a rule for which source to pack from."
  ],
};
