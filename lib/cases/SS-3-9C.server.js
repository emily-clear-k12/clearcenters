// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.3.9C, TEKS 3.9C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.3.9C",
  title: "Is That Really Civic Responsibility?",
  bigQuestion: "Which actions are acts of civic responsibility, and why?",
  evidenceBank: [
    "Following laws helps communities function safely and fairly.",
    "Joining a cleanup or improvement project can support the common good.",
    "Adults may serve on juries and eligible citizens may vote in elections."
  ],
  trapLine: "Any helpful action is automatically an act of civic responsibility.",
  castNames: {
    leo: "Leo Helpful-Is-Civic",
    law: "Lana Law",
    serve: "Sam Service",
    vote: "Vera Jury & Vote"
  },
  distractors: "",
  mustInclude: [
    "Uses obeying-laws evidence.",
    "Uses community-service evidence.",
    "Uses jury or voting evidence.",
    "Explains civic connection.",
    "Rejects helpful-equals-civic reasoning."
  ],
};
