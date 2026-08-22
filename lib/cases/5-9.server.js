// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.9",
  title: "The Tournament-Day Shadow",
  bigQuestion: "If the goalpost never moves, why does its shadow crawl across the field all day and change length?",
  evidenceBank: [
    "8:00 AM: shadow is long, pointing west",
    "12:00 PM (noon): shadow is shortest, pointing nearly straight down",
    "4:00 PM: shadow is long again, pointing east",
    "The goalpost itself never physically moves position on the field"
  ],
  trapLine: "The goalpost's shadow just moves randomly \u2014 or maybe the goalpost is secretly moving.",
  castNames: {
    gus: "Gus the Goalpost",
    sol: "Sol the Sun",
    tessa: "Tessa the Teammate",
    riley: "Riley the Referee",
    tam: "Coach Tam"
  },
  distractors: "Thinking Earth's yearly revolution (around the Sun) causes day/night, rather than its daily rotation on its axis.",
  mustInclude: [
    "Uses shadow-length/direction data from at least 2-3 times of day",
    "States Earth's rotation (not the object) causes the pattern",
    "Connects the Sun's apparent path to the shadow changes",
    "Rejects the \"random\" or \"object is moving\" claim",
    "Identifies noon as the shortest-shadow point"
  ],
};
