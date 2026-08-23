// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.7).

export const SERVER_CASE = {
  standard: "4.7",
  title: "Somebody Is Tilting the Table",
  bigQuestion: "Nobody touched the table for four rounds and the marble still drifted left. What was acting on it?",
  evidenceBank: [
    "Four rounds with everyone standing back, and it still drifted left",
    "The spirit level shows the left side sits lower",
    "One table leg is shorter than the other three",
    "The same push went 84 cm on wood but only 31 cm on felt",
    "A book under the short leg made the drifting stop"
  ],
  trapLine: "nothing moves on its own. If the marble drifted, a knee moved this table, and I intend to find out whose.",
  castNames: {
    vic: "Vic",
    marble: "The Marble",
    level: "The Spirit Level",
    felt: "The Felt",
    gravity: "Gravity",
    sim: "Sim"
  },
  distractors: "Thinking a force must involve physical contact, so an object that moves untouched needs a human explanation; missing gravity as a force acting at a distance on an everyday object; confusing the cause of the drift (slope) with the cause of the short roll (friction), or crediting one force with both effects.",
  mustInclude: [
    "The chat says the marble moved with nobody touching it.",
    "It names the force pulling the marble downhill.",
    "It says a force doesn't need contact.",
    "It uses the felt-versus-wood numbers.",
    "It gives Sim a rule that clears everyone."
  ],
};
