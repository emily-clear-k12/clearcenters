// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.8C, TEKS 4.8C).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.8C",
  title: "Worth the Tradeoff?",
  bigQuestion: "How can one change to the Texas environment create both positive and negative consequences?",
  evidenceBank: [
    "A dam can store water, help control floods, create electricity, and support recreation.",
    "A dam can flood land, change habitats, and affect plants, animals, or nearby communities.",
    "A strong decision weighs benefits and costs instead of looking at only one side."
  ],
  trapLine: "If a modification helps people, then it is a good change with no real downside.",
  castNames: {
    zoe: "Zoe All-Good",
    benefit: "Ben Benefit File",
    habitat: "Hana Habitat File",
    community: "Cora Community File",
    judge: "Jace Tradeoff Judge"
  },
  distractors: "",
  mustInclude: [
    "Explains a positive consequence.",
    "Explains a negative consequence.",
    "Considers people and environment.",
    "Compares benefits and costs.",
    "Makes an evidence-based judgment."
  ],
};
