// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.9B).

export const SERVER_CASE = {
  standard: "3.9B",
  title: "Jupiter Says He Should Be First",
  bigQuestion: "Jupiter is the biggest planet and Mercury is one of the smallest. So why is Mercury standing in front?",
  evidenceBank: [
    "The order from the Sun is Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
    "Jupiter is the biggest planet and he is fifth from the Sun",
    "Mercury is one of the smallest and he is first",
    "Mercury is first because he is closest to the Sun",
    "The floor tape was measured out from the Sun end"
  ],
  trapLine: "I'm the biggest, and biggest goes first. That's how lines work.",
  castNames: {
    jupiter: "Jupiter",
    mercury: "Mercury",
    neptune: "Neptune",
    tape: "The Floor Tape",
    ren: "Ren"
  },
  distractors: "Ordering the planets by size instead of distance from the Sun; assuming the biggest or brightest object comes first; thinking the order changes; confusing how far a planet is from the Sun with how big it is.",
  mustInclude: [
    "The chat gives the order.",
    "It says what the order is based on.",
    "It uses Mercury as the proof.",
    "It tells Jupiter size doesn't set the order.",
    "It gives Ren the rule for the whole line."
  ],
};
