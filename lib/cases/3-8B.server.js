// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.8B).

export const SERVER_CASE = {
  standard: "3.8B",
  title: "A Bigger Ball Will Not Fix It",
  bigQuestion: "The same small ball knocked over 2 cups once and 9 cups another time. What was different?",
  evidenceBank: [
    "The small ball from the bottom knocked over 2 cups",
    "The same small ball from the top knocked over 9 cups",
    "The big ball from the bottom only knocked over 3 cups",
    "Between test A and test B only the speed was different",
    "The ball released at the top rolls fastest"
  ],
  trapLine: "I need a bigger, heavier ball. That's what knocks more cups down.",
  castNames: {
    teo: "Teo",
    ramp: "The Ramp",
    small: "The Small Ball",
    cups: "The Cups",
    dee: "Dee"
  },
  distractors: "Thinking a heavier object always does more regardless of how fast it is going; changing more than one thing between trials and not noticing; missing that the release point on a ramp controls the speed; thinking mechanical energy depends only on size.",
  mustInclude: [
    "The chat uses the cup counts.",
    "It points out the ball was the same.",
    "It names speed as the thing that changed.",
    "It says why the top of the ramp is faster.",
    "It gives Dee the rule about speed and energy."
  ],
};
