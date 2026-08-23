// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.9A, TEKS 4.9A).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.9A",
  title: "How Do We Meet Our Needs?",
  bigQuestion: "How did early American Indian groups in Texas meet needs and wants through farming, trading, and hunting?",
  evidenceBank: [
    "Some groups grew crops to help provide food.",
    "Groups traded goods to get items or resources they did not have.",
    "Many groups hunted animals for food and materials."
  ],
  trapLine: "Early American Indian groups mostly met their needs by hunting.",
  castNames: {
    jay: "Jay Hunting-Only",
    farm: "Fiona Farming File",
    trade: "Tariq Trade File",
    hunt: "Holly Hunting File",
    needs: "Nora Needs & Wants"
  },
  distractors: "",
  mustInclude: [
    "Explains farming.",
    "Explains trading.",
    "Explains hunting.",
    "Shows groups could use different combinations.",
    "Rejects hunting-only reasoning."
  ],
};
