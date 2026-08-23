// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.13B, TEKS 3.13B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.13B",
  title: "It Helped More Than One Person",
  bigQuestion: "How can a scientific breakthrough or new technology affect a whole community?",
  evidenceBank: [
    "Computers can help students learn, businesses organize work, and people communicate.",
    "Pasteurization can make some foods and drinks safer by reducing harmful microorganisms.",
    "Vaccines can protect individuals and can also reduce the spread of some diseases in communities."
  ],
  trapLine: "A new technology mainly helps the person who uses it first.",
  castNames: {
    mia: "Mia One-Person",
    computer: "Cody Computer",
    health: "Holly Health",
    ripple: "Riley Ripple"
  },
  distractors: "",
  mustInclude: [
    "Uses a valid example.",
    "Explains a direct effect.",
    "Explains a group effect.",
    "Explains a community effect.",
    "Rejects one-person reasoning."
  ],
};
