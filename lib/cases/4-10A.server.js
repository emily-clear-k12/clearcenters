// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.10A).

export const SERVER_CASE = {
  standard: "4.10A",
  title: "The Puddle Mystery",
  bigQuestion: "Puddle was 24 inches across at 9:00 and gone by lunch. Where did the water actually go?",
  evidenceBank: [
    "The chalk line: 24 inches at 9:00, 15 inches at 11:00, gone by 1:00",
    "Cup B was sealed — its water line never moved",
    "Tiny droplets appeared under Cup B's plastic wrap",
    "On the cloudy day, the puddle dried much slower",
    "A wet handprint fades in under 2 minutes on warm pavement"
  ],
  trapLine: "When water dries up, it stops existing. Poof. I'm disappearing forever.",
  castNames: {
    puddle: "Puddle",
    sunny: "Sunny the Sun",
    vera: "Vera Vapor",
    chalky: "Chalk Line",
    cupb: "Cup B",
    reporter: "Weather Reporter"
  },
  distractors: "Thinking water that dries up ceases to exist rather than changing state; thinking it soaked into the pavement or drained away; treating water vapour as not really being water; missing the Sun's heat as the driver of how fast evaporation happens.",
  mustInclude: [
    "The chat says where the water went.",
    "It uses a measurement from the log or cup test.",
    "It uses Cup B to prove the water still exists.",
    "It rules out ‘the water stopped existing.’",
    "It connects the sun's heat to how fast it happened."
  ],
};
