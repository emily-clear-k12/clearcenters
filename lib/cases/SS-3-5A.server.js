// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.5A, TEKS 3.5A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.5A",
  title: "What Should I Do With My Money?",
  bigQuestion: "How can people choose to earn, spend, save, and donate money?",
  evidenceBank: [
    "People can earn money by doing work or providing a service.",
    "Saving means keeping money for a future need or goal.",
    "Donating means giving money to help a person, group, or cause."
  ],
  trapLine: "Once you earn money, the smartest choice is to spend it before it is gone.",
  castNames: {
    jax: "Jax Spend-It",
    save: "Sage Saver",
    donate: "Dani Donate",
    choice: "Cami Money Choice"
  },
  distractors: "",
  mustInclude: [
    "Explains earning.",
    "Explains saving.",
    "Explains donating.",
    "Explains money choices.",
    "Rejects spend-it-all reasoning."
  ],
};
