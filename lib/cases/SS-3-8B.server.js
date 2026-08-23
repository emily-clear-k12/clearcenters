// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.8B, TEKS 3.8B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.8B",
  title: "Who Gave Them Permission?",
  bigQuestion: "What does consent of the governed mean?",
  evidenceBank: [
    "Citizens choose leaders through elections.",
    "Government authority is based on the people agreeing to be governed.",
    "Citizens can participate, vote, and hold leaders accountable."
  ],
  trapLine: "Government has authority because leaders are in charge.",
  castNames: {
    max: "Mayor Max",
    vote: "Vera Voter",
    consent: "Cami Consent",
    account: "Ari Accountability"
  },
  distractors: "",
  mustInclude: [
    "Explains authority comes from people.",
    "Connects elections to consent.",
    "Explains consent.",
    "Includes citizen participation.",
    "Rejects leader-only authority."
  ],
};
