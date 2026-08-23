// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.12, TEKS 3.12).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.12",
  title: "The Painting Is Telling Us Something",
  bigQuestion: "How can writers and artists help preserve or shape the cultural heritage of a community?",
  evidenceBank: [
    "The artwork shows clothing, foods, family activities, and a community setting.",
    "The writing describes traditions, places, and experiences from community life.",
    "Art and writing can preserve memories and help others learn about a community's culture."
  ],
  trapLine: "A painting or story is mainly entertainment, not evidence about culture.",
  castNames: {
    max: "Max Just-Art",
    artist: "Ari Artist",
    writer: "Wendy Writer",
    heritage: "Hana Heritage"
  },
  distractors: "",
  mustInclude: [
    "Uses visual-art evidence.",
    "Uses writing evidence.",
    "Explains cultural heritage.",
    "Explains contribution to community culture.",
    "Rejects entertainment-only reasoning."
  ],
};
