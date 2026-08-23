// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.12A, TEKS 4.12A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.12A",
  title: "Who Makes the Rules?",
  bigQuestion: "How did different American Indian groups in Texas govern themselves?",
  evidenceBank: [
    "Caddo communities had organized leaders and councils within settled village networks.",
    "Comanche bands were more mobile and leadership could depend on the situation and the respect earned by leaders.",
    "Different ways of life can lead to different ways of organizing leadership and decisions."
  ],
  trapLine: "American Indian groups in Texas probably had the same kind of government because they lived in the same region.",
  castNames: {
    ella: "Ella Same-System",
    caddo: "Caddo Council File",
    comanche: "Comanche Band File",
    life: "Lena Way-of-Life",
    compare: "Theo Compare"
  },
  distractors: "",
  mustInclude: [
    "Uses Caddo government evidence.",
    "Uses Comanche government evidence.",
    "Identifies a valid similarity.",
    "Explains a difference.",
    "Rejects one-system-for-all reasoning."
  ],
};
