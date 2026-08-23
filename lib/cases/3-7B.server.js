// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.7B).

export const SERVER_CASE = {
  standard: "3.7B",
  title: "Wallop Only Knows One Setting",
  bigQuestion: "Wallop's pushes are the hardest and the disc always goes past the square. What should change?",
  evidenceBank: [
    "A hard push sends the disc 190 cm and the target is at 120 cm",
    "A soft push sends it 118 cm, which is on the square",
    "A tap on the side changes the direction it's going",
    "Pulling the string brings the disc back and stops it",
    "Wallop has missed past the square eleven times"
  ],
  trapLine: "I just need to hit it harder. Harder is always better.",
  castNames: {
    wallop: "Wallop",
    disc: "The Disc",
    target: "The Target Square",
    string: "The String",
    pia: "Pia"
  },
  distractors: "Thinking a harder push is always better regardless of the goal; thinking only pushes change motion and forgetting pulls; changing only the strength of a force and never its direction; confusing going the furthest with landing in the right place.",
  mustInclude: [
    "The chat uses the distances.",
    "It says a softer push would land it.",
    "It uses the side tap.",
    "It uses the string.",
    "It gives Pia a plan."
  ],
};
