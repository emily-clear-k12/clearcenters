// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.2B, TEKS 4.2B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.2B",
  title: "The Explorer Report Card",
  bigQuestion: "How should we judge an explorer’s accomplishment and impact on Texas?",
  evidenceBank: [
    "His journey produced early European observations about Texas lands and peoples.",
    "His expedition crossed parts of the Southwest while searching for wealthy cities.",
    "His failed French colony on the Texas coast increased Spanish concern about French claims in the region."
  ],
  trapLine: "The explorer who traveled the farthest must have had the biggest impact.",
  castNames: {
    jax: "Jax Distance Score",
    cabeza: "Cabeza de Vaca File",
    coronado: "Coronado File",
    lasalle: "La Salle File",
    judge: "Priya Impact Judge"
  },
  distractors: "",
  mustInclude: [
    "Uses Cabeza de Vaca evidence.",
    "Uses Coronado evidence.",
    "Uses La Salle impact evidence.",
    "Explains impact as change or consequence.",
    "Rejects distance-only ranking."
  ],
};
