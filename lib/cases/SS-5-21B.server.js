// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.21B, TEKS 5.21B).

export const SERVER_CASE = {
  standard: "SS.5.21B",
  title: "Who Gets to Be “American”?",
  bigQuestion: "How have contributions from many racial, ethnic, and religious groups helped shape U.S. national identity?",
  evidenceBank: [
    "The museum must show how several groups contributed to U.S. national identity.",
    "Sources show contributions in music, language, work, food, science, civic life, arts, and community institutions.",
    "No single person or group can stand for every member of a racial, ethnic, or religious community."
  ],
  trapLine: "We should choose the one culture that really created American identity. The rest can be side exhibits.",
  castNames: {
    cole: "Cole Curator",
    maya: "Maya Music Archive",
    luis: "Luis Community Map",
    anna: "Anna Heritage File",
    river: "River First Peoples File"
  },
  distractors: "Tokenizing groups; vague 'they helped' claims; implying every member of a group had the same experience; treating Native peoples only as historical; claiming one culture alone defines American identity.",
  mustInclude: [
    "Uses contributions from multiple groups.",
    "Names specific kinds of contributions.",
    "Connects contributions to national identity.",
    "Avoids treating a group as one single voice.",
    "Rejects the one-culture explanation."
  ],
};
