// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.6A).

export const SERVER_CASE = {
  standard: "3.6A",
  title: "The Raft Load",
  bigQuestion: "The log is 2,100 g and floats. The pebble is 40 g and sinks. So what decides it?",
  evidenceBank: [
    "The log is 2,100 g and it floats",
    "The pebble is 40 g and it sinks",
    "The cork is only 3 g and it floats",
    "The log is much heavier than the pebble",
    "Every thing got weighed and then put in the water"
  ],
  trapLine: "I'm small, and small things float.",
  castNames: {
    pebble: "Pebble",
    log: "The Log",
    cork: "The Cork",
    pond: "The Pond",
    rafa: "Rafa"
  },
  distractors: "Thinking small or light things always float and big or heavy things always sink; guessing a property from how something looks instead of testing it; thinking one test is enough without recording it; mixing up how heavy something feels with whether it floats.",
  mustInclude: [
    "The chat uses the weights.",
    "It says what happened in the water.",
    "It uses the cork.",
    "It tells Pebble size doesn't decide it.",
    "It gives Rafa a rule for the chart."
  ],
};
