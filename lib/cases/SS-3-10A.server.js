// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.10A, TEKS 3.10A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.10A",
  title: "It’s More Than a Party",
  bigQuestion: "Why can a cultural celebration be important to a community?",
  evidenceBank: [
    "Families share customs, music, stories, or ceremonies passed down over time.",
    "The celebration helps people remember and express a shared cultural identity.",
    "People gather to teach younger generations and strengthen community ties."
  ],
  trapLine: "Cultural celebrations are mainly for food, decorations, and fun.",
  castNames: {
    mia: "Mia Party-Only",
    trad: "Tara Tradition",
    identity: "Iris Identity",
    community: "Cal Community"
  },
  distractors: "",
  mustInclude: [
    "Explains tradition.",
    "Explains cultural identity.",
    "Explains community connection.",
    "Explains why the celebration matters.",
    "Rejects party-only reasoning."
  ],
};
