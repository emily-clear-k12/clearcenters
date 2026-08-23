// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.11C, TEKS 4.11C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.11C",
  title: "What Made Texas Grow?",
  bigQuestion: "How did exploration, immigration, migration, and limited resources affect Texas economic growth?",
  evidenceBank: [
    "Exploration opened new routes, knowledge, and economic possibilities.",
    "Newcomers brought workers, skills, consumers, businesses, and cultural connections.",
    "Shortages of water, labor, money, or materials could slow growth or force people to adapt."
  ],
  trapLine: "Texas grew mainly because more people moved there.",
  castNames: {
    abby: "Abby More-People",
    explore: "Evan Exploration",
    move: "Maya Migration",
    limit: "Leo Limited Resources",
    synth: "Sasha Growth Chain"
  },
  distractors: "",
  mustInclude: [
    "Explains exploration effect.",
    "Explains immigration/migration effect.",
    "Explains limited-resource effect.",
    "Uses multiple factors.",
    "Rejects population-only reasoning."
  ],
};
