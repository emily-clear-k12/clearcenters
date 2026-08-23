// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.15C, TEKS 4.15C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.15C",
  title: "Voting Is More Than Showing Up",
  bigQuestion: "What responsibilities should a person fulfill before and during a state or local election?",
  evidenceBank: [
    "Voters should learn about candidates, issues, and choices before voting.",
    "Eligible citizens have a duty to participate by casting a ballot in state and local elections.",
    "A vote is more responsible when it is based on information instead of guessing."
  ],
  trapLine: "Being a good voter mainly means showing up and picking a name.",
  castNames: {
    zoe: "Zoe Just-Show-Up",
    info: "Ian Informed Voter",
    vote: "Vera Voting File",
    source: "Sasha Source Checker",
    synth: "Cal Civic Duty"
  },
  distractors: "",
  mustInclude: [
    "Explains becoming informed.",
    "Explains the duty to vote.",
    "Uses reliable-information reasoning.",
    "Connects information to better decisions.",
    "Rejects show-up-only reasoning."
  ],
};
