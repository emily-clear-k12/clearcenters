// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.8B, TEKS 4.8B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.8B",
  title: "Why Change the Land?",
  bigQuestion: "Why have Texans adapted to and modified their environment?",
  evidenceBank: [
    "People modify environments to get food, water, shelter, and other basic needs.",
    "People use natural resources for farming, energy, building, and other activities.",
    "Roads, dams, trails, and parks can support transportation or recreation."
  ],
  trapLine: "People change the environment mostly because they want more space.",
  castNames: {
    nate: "Nate More-Space",
    needs: "Nia Needs File",
    resource: "Riley Resource File",
    trans: "Theo Transportation File",
    recreation: "Rae Recreation File"
  },
  distractors: "",
  mustInclude: [
    "Explains a basic-needs reason.",
    "Explains resource use.",
    "Explains transportation or recreation.",
    "Uses multiple reasons.",
    "Rejects the 'more space' only claim."
  ],
};
