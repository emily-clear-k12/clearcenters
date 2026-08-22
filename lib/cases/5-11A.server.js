// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.11A",
  title: "The Campaign Against Recycling",
  bigQuestion: "Does a class recycling program actually make a real difference, or is it just for show?",
  evidenceBank: [
    "Recycling program data: 40% reduction in landfill waste over one year in the case community",
    "Recycling one ton of paper saves roughly 17 trees",
    "Landfill capacity tracked as filling up faster without diversion to recycling",
    "Proper battery disposal keeps chemicals out of the water supply (documented case)"
  ],
  trapLine: "Recycling bin, landfill, doesn't matter \u2014 same difference in the end.",
  castNames: {
    cassidy: "Cassidy the Candidate",
    reed: "Reed the Recycling Bin",
    larry: "Larry the Landfill",
    batty: "Batty the Battery",
    diaz: "Principal Diaz"
  },
  distractors: "Thinking recycling alone is the whole answer, when conservation (using less in the first place) is often the biggest-impact strategy of the three.",
  mustInclude: [
    "Uses at least one specific data point (waste reduction %, trees saved, etc.)",
    "Names at least two solution types (conservation, recycling, proper disposal)",
    "Rejects the \"it's all the same\" claim with evidence",
    "Connects the solution to reduced environmental impact",
    "Proposes or affirms a specific solution as effective"
  ],
};
