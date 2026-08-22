// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.10C",
  title: "The Campfire Legend",
  bigQuestion: "Did the canyon really form in one \"terrifying night,\" like the campfire story says?",
  evidenceBank: [
    "River flow rate and canyon depth correlate with erosion recorded over long time spans",
    "Sand dunes nearby are observed shifting gradually with the prevailing wind direction",
    "Delta sediment deposits are measured building up at a river mouth over years",
    "No evidence of a sudden event (like an earthquake) found at the canyon site"
  ],
  trapLine: "One big shake and \u2014 crack \u2014 it appeared overnight. Had to be something sudden and dramatic!",
  castNames: {
    chuck: "Chuck the Camp Counselor",
    rio: "Rio the River",
    gale: "Gale the Wind",
    gus: "Glacier Gus",
    dee: "Ranger Dee"
  },
  distractors: "Thinking canyons/deltas/dunes can form without a specific force acting over time; confusing erosion (removal/movement) with weathering (breakdown in place).",
  mustInclude: [
    "Matches each landform to its correct force (canyon/delta -> water, dune -> wind, general shaping -> ice)",
    "Uses evidence to rule out a sudden cause",
    "Explains the gradual process",
    "Names at least two landforms with their forming force",
    "States that erosion/deposition happens over time"
  ],
};
