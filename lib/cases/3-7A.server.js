// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.7A).

export const SERVER_CASE = {
  standard: "3.7A",
  title: "Feather Says Gravity Skips Her",
  bigQuestion: "The feather falls much slower than the rock. Does that mean gravity is skipping her?",
  evidenceBank: [
    "The feather landed on the floor 20 times out of 20",
    "The feather has never once gone upward when dropped",
    "The rock falls fast and the feather falls slowly, but both land",
    "The same sheet of paper falls faster when crumpled",
    "A magnet lifts a paperclip without touching it"
  ],
  trapLine: "Gravity doesn't bother with me. I'm too light. I just drift.",
  castNames: {
    feather: "Feather",
    rock: "Rock",
    floor: "The Floor",
    magnet: "The Magnet",
    jo: "Jo"
  },
  distractors: "Thinking gravity only acts on heavy things; thinking something that falls slowly is not being pulled; assuming a force has to touch an object to act on it; thinking a crumpled sheet of paper is heavier than the same sheet flat.",
  mustInclude: [
    "The chat uses the twenty drops.",
    "It uses the paper test.",
    "It says what actually slows her down.",
    "It says a pull can work without touching.",
    "It gives Jo the rule for the list."
  ],
};
