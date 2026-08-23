// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.8A).

export const SERVER_CASE = {
  standard: "4.8A",
  title: "The Middle Marbles Quit",
  bigQuestion: "The middle marbles barely move, but take one away and the end marble stops dead. What are they doing?",
  evidenceBank: [
    "When one middle marble is pulled out, the last marble doesn't move at all",
    "The middle marbles barely move but the end one flies off",
    "The ripple crosses the tray but the floating cork just bobs in place",
    "The drum was across the room and the cup still buzzed",
    "Energy can move through things without the things travelling"
  ],
  trapLine: "The energy jumps from the front marble to the end one and skips over us. We don't move, so we're not doing anything.",
  castNames: {
    mo: "Mo",
    front: "Front",
    end: "End",
    tray: "The Water Tray",
    cup: "The Paper Cup",
    nadia: "Nadia"
  },
  distractors: "Thinking energy jumps or skips across objects rather than passing through each one in turn; assuming an object must visibly travel for energy to have moved through it; thinking a wave carries the water or the cork along with it; missing that sound transfers energy through the air to an object nothing has touched.",
  mustInclude: [
    "The chat uses the gap test.",
    "It says the energy went through the middle, not past it.",
    "It explains why barely moving still counts.",
    "It brings in the water or the sound example.",
    "It gives Nadia the rule about energy transfer."
  ],
};
