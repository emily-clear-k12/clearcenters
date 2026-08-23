// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.1A, TEKS 3.1A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.1A",
  title: "The Community Didn’t Change by Itself",
  bigQuestion: "How can people, events, and ideas change a community?",
  evidenceBank: [
    "A librarian started a bookmobile so families far from the library could borrow books.",
    "A flood damaged a bridge, so the town built a safer replacement.",
    "Students began a recycling campaign that changed how the school handled waste."
  ],
  trapLine: "Communities mostly change because new buildings get added.",
  castNames: {
    mia: "Mia Building-Only",
    person: "Parker Person Card",
    event: "Evan Event Card",
    idea: "Ivy Idea Card"
  },
  distractors: "",
  mustInclude: [
    "Explains an individual's effect.",
    "Explains an event's effect.",
    "Explains an idea's effect.",
    "Uses cause-and-effect reasoning.",
    "Rejects building-only reasoning."
  ],
};
