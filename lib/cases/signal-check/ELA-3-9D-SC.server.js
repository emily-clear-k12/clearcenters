// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// ELAR Signal Check — ELA.3.9D-SC. TEKS 3.9D(i) — recognize characteristics and structures of informational text, including the central idea with supporting evidence.

export const SERVER_CASE = {
  standard: "ELA.3.9D-SC",
  title: "The Title Says Honey",
  stemMode: "dropdown",
  modelAnswer:
    "\"The title tells you what the article is mostly about.\" is MISLEADING because the title mentions honey, but only one sentence in the article is about honey. \"Most of the paragraphs explain how bees help plants grow fruit.\" is TRUE because the paragraphs explain how bees carry pollen and help apple trees make apples. \"The article is mostly about how bees make honey.\" is FALSE because the paragraphs are about bees helping plants grow food, and the central idea is what most details are about.",
  mustInclude: [
    "Signal A marked Misleading.",
    "Signal B marked True.",
    "Signal C marked False.",
    "Evidence picks name Title or Honey sentence for Signal A.",
    "Evidence picks name Paragraph 1 or Paragraph 2 for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Notes the title mentions honey.",
        "Notes only one sentence is about honey.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Uses the pollen paragraph.",
        "Uses the apples paragraph.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the article is mostly about pollination.",
        "Uses the central idea rule.",
      ],
    },
  },
};
