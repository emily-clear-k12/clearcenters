// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.12C).

export const SERVER_CASE = {
  standard: "3.12C",
  title: "The Flood Ruined Everything",
  bigQuestion: "The flood put the field underwater for four days. Did that turn out the same for every living thing in it?",
  evidenceBank: [
    "The cattails went from 40 before the flood to 210 after",
    "The ant colony was underwater for four days and is now empty",
    "Deer tracks moved to the ridge and were back by April",
    "In the drought two years ago the cattails died back",
    "In that same drought the ant colony was fine"
  ],
  trapLine: "There's no point walking it. It's ruined. A flood is bad for everything out there.",
  castNames: {
    wes: "Wes",
    cattail: "The Cattails",
    ants: "The Ant Colony",
    deer: "The Deer",
    juno: "Juno"
  },
  distractors: "Thinking a natural event like a flood or drought is bad for every living thing; giving one answer for a whole habitat instead of checking each organism; missing that moving away is a third outcome alongside thriving and dying; assuming an event that helps one organism must help them all.",
  mustInclude: [
    "The chat names something that did better.",
    "It names something that died.",
    "It names something that moved.",
    "It uses the drought two years ago.",
    "It gives Juno the rule for the survey."
  ],
};
