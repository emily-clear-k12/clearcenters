// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.10A",
  title: "The Marine Fog Mystery",
  bigQuestion: "Why does a thick fog roll in over the beach some mornings and not others?",
  evidenceBank: [
    "Ocean surface temperature logged warmer in the late afternoon than early morning",
    "Warm ocean air holds more water vapor; overnight cooling causes that vapor to condense near the surface",
    "Foggy mornings follow warm, humid afternoons; clear mornings follow cooler, drier afternoons",
    "Fog burns off by mid-morning once the Sun warms the air again"
  ],
  trapLine: "I just show up every morning, no reason.",
  castNames: {
    foggy: "Foggy the Fog",
    sunny: "Sunny the Sun",
    ola: "Ola the Ocean",
    vera: "Vera the Vapor",
    dax: "Dax the Surfer"
  },
  distractors: "Thinking fog or clouds are made of \"smoke\" or steam rather than condensed water vapor; not connecting the ocean specifically as the evaporation source that drives coastal weather.",
  mustInclude: [
    "Names the Sun as the energy source",
    "Connects ocean evaporation to rising water vapor",
    "Explains condensation forming the fog",
    "Rejects the \"just shows up randomly\" claim",
    "Connects the cycle to the resulting weather pattern"
  ],
};
