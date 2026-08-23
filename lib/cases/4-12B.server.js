// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.12B).

export const SERVER_CASE = {
  standard: "4.12B",
  title: "Who Passes the Baton?",
  bigQuestion: "In a relay where the baton is energy, which runner hands off to which — and who was never given a lane?",
  evidenceBank: [
    "Grass makes her own food from sunlight, water, and carbon dioxide",
    "Rabbit gets his energy by eating the grass",
    "Kestrel gets her energy by eating the rabbit",
    "Ray and Muncher were never given lanes",
    "New grass grows thickest where the old log rotted away"
  ],
  trapLine: "Each runner hands off to what they eat. Rabbit eats grass, so rabbit hands to grass. It's on the map. Next question.",
  castNames: {
    arrow: "Arrow",
    sunny: "Ray the Sun",
    grass: "Grass",
    rabbit: "Rabbit",
    hawk: "Kestrel",
    muncher: "Muncher",
    starter: "The Starter"
  },
  distractors: "Drawing food web arrows toward whatever is being eaten instead of toward where the energy goes; leaving the Sun off the web entirely; leaving decomposers off the web; thinking energy cycles back around the way matter does; assuming the animal at the top of the web is the most important part of it.",
  mustInclude: [
    "The chat fixes which way the baton goes.",
    "It names the Sun as the starting line.",
    "It explains what the first runner does.",
    "It gives Muncher a lane.",
    "It says the baton only travels one way."
  ],
};
