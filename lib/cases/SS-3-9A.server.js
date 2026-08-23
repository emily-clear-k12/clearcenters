// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.9A, TEKS 3.9A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.9A",
  title: "Good Citizen or Just Being Nice?",
  bigQuestion: "What makes an action show good citizenship?",
  evidenceBank: [
    "A student completes a community job and takes responsibility when a mistake happens.",
    "A group notices one student is being treated unfairly and asks for a fair solution.",
    "A family learns about a local issue and respectfully asks an official a question."
  ],
  trapLine: "Good citizenship mostly means being nice and following directions.",
  castNames: {
    mia: "Mia Nice-Is-Enough",
    respons: "Riley Responsibility",
    fair: "Faith Fairness",
    issue: "Ian Informed"
  },
  distractors: "",
  mustInclude: [
    "Uses responsibility/truthfulness.",
    "Uses justice/equality/respect.",
    "Uses informed-citizen evidence.",
    "Uses more than one characteristic.",
    "Rejects nice-only reasoning."
  ],
};
