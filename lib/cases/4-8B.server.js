// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.8B).

export const SERVER_CASE = {
  standard: "4.8B",
  title: "The Coat on the Snowman",
  bigQuestion: "If a coat makes things warm, why did the snowman wearing one melt less than the snowman without one?",
  evidenceBank: [
    "Slush wore the coat and melted less than bare Drift",
    "Inside the coat read 31°F; the outside air read 38°F",
    "Both snowmen were the same size, same yard, same night",
    "The metal shovel handle hurt to grab; the wooden one didn't",
    "Thermal energy moves from warmer things toward colder things"
  ],
  trapLine: "I make heat. That's what a coat IS. I have been making heat on that snowman all night.",
  castNames: {
    coat: "Coat",
    ines: "Ines",
    slush: "Slush",
    drift: "Drift",
    merc: "Merc",
    shovel: "The Shovel"
  },
  distractors: "Thinking a coat, blanket, or mitten generates warmth rather than slowing thermal energy down; thinking metal has its own low temperature rather than moving thermal energy quickly; assuming 'feels cold' and 'is cold' are the same measurement; missing that an insulator slows transfer in both directions, which is why it also keeps cold things cold.",
  mustInclude: [
    "The chat uses both snowmen.",
    "It states the coated snowman melted LESS.",
    "It tells Coat he doesn't make heat.",
    "It names the coat as an insulator that slows transfer.",
    "It names metal as a conductor."
  ],
};
