// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.13B, TEKS 4.13B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.13B",
  title: "Everybody Wants to Run Texas",
  bigQuestion: "What is the basic job of each branch of Texas government?",
  evidenceBank: [
    "The Texas Legislature makes laws.",
    "The governor and executive branch carry out and enforce laws.",
    "Texas courts interpret laws and decide legal cases."
  ],
  trapLine: "The governor is in charge, so the executive branch can make laws and decide what laws mean.",
  castNames: {
    jax: "Jax Governor-on-Top",
    leg: "Lena Legislative",
    exec: "Evan Executive",
    jud: "Jada Judicial",
    synth: "Riley Branch Board"
  },
  distractors: "",
  mustInclude: [
    "Explains legislative function.",
    "Explains executive function.",
    "Explains judicial function.",
    "Keeps branch jobs distinct.",
    "Rejects governor-controls-all reasoning."
  ],
};
