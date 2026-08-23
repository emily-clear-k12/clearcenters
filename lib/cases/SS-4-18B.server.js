// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.18B, TEKS 4.18B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.18B",
  title: "It Changed More Than One Thing",
  bigQuestion: "How can scientific discoveries and innovations benefit individuals, businesses, and society in Texas?",
  evidenceBank: [
    "New tools and methods can help farmers produce food more efficiently.",
    "Energy innovations can affect homes, businesses, jobs, and how power is produced or used.",
    "Aerospace and technology innovations can create new jobs, research, services, and products."
  ],
  trapLine: "A new technology usually has one main benefit—the job it was invented to do.",
  castNames: {
    zoe: "Zoe One-Benefit",
    ag: "Ava Agriculture",
    energy: "Eli Energy",
    aero: "Ari Aerospace",
    synth: "Riley Ripple Effects"
  },
  distractors: "",
  mustInclude: [
    "Explains an individual benefit.",
    "Explains a business benefit.",
    "Explains a society-wide benefit.",
    "Uses a Texas innovation area.",
    "Rejects one-benefit reasoning."
  ],
};
