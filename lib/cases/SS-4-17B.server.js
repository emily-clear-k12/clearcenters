// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.17B, TEKS 4.17B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.17B",
  title: "What Sounds Like Texas?",
  bigQuestion: "How have artists from different racial, ethnic, and religious groups contributed to Texas culture?",
  evidenceBank: [
    "Lydia Mendoza helped popularize Tejano and Mexican American music traditions in Texas.",
    "Chelo Silva became known for Spanish-language and Tejano music.",
    "Julius Lorenzo Cobb Bledsoe was an African American singer and performer whose career contributed to Texas arts and culture."
  ],
  trapLine: "Texas culture has one main style, and other artists mostly added small extras.",
  castNames: {
    cole: "Cole One-Style",
    lydia: "Lydia Mendoza File",
    chelo: "Chelo Silva File",
    bledsoe: "Julius Bledsoe File",
    curator: "Nina Culture Curator"
  },
  distractors: "",
  mustInclude: [
    "Uses Lydia Mendoza evidence.",
    "Uses Chelo Silva evidence.",
    "Uses Julius Bledsoe evidence.",
    "Connects artist contributions to Texas culture.",
    "Rejects one-style reasoning."
  ],
};
