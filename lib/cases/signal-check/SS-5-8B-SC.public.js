// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.8B: how humans
// modify the physical environment and the positive and negative
// consequences of those modifications.

export const PUBLIC_CASE = {
  standard: "SS.5.8B-SC",
  teksLabel: "5.8B",
  grade: 5,
  subject: "Social Studies",
  title: "Good For Everyone?",
  tagline: "Building the new dam was good for the town, with no real downsides.",
  transmission: {
    claimHeadline: "Building the new dam was good for the town, with no real downsides.",
    source: "Public Works Records",
    loggedAt: "Dam construction era",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-8b-sc-field-report.jpg",
    imageCaption: "Public Works Records — Dam Construction Project",
    notes: "Public records show the dam supplying irrigation water and electricity to the town after it was completed — real, documented benefits. But the original dam proposal notice highlights only those water and power benefits and does not mention the valley's farmland at all. Property records tell a fuller story: several farms in the valley were flooded and their families relocated after the dam was built. Fish population data shows a sharp drop downstream in the years after construction, a change that hurt local fishers who depended on the fish for income.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The dam gave the town a reliable water supply for irrigation and a new source of electricity.",
      correctVerdict: "True",
      reasonText: "These are real, documented benefits the dam provided.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Town leaders said the dam would only bring water and power, so people expected no downsides.",
      correctVerdict: "Misleading",
      reasonText: "Leaders highlighted the benefits when proposing the dam but said little about the costs until after construction began.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Building the dam had no real downsides for the town.",
      correctVerdict: "False",
      reasonText: "Flooding the valley behind the dam destroyed farmland and forced several families to relocate.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "The dam only affected the town, with no effects downstream.",
      correctVerdict: "False",
      reasonText: "The changed water flow downstream hurt fish populations that local fishers depended on for income.",
    },
  ],

  evidenceReadings: [
    { id: "dam_benefits", label: "Dam benefits record", reading: "Public records show the dam supplying irrigation water and electricity to the town after completion.", kind: "document" },
    { id: "proposal_notice", label: "Original dam proposal notice", reading: "The original dam proposal notice highlights water and power benefits and does not mention the valley's farmland.", kind: "document" },
    { id: "flooded_farmland", label: "Flooded farmland records", reading: "Property records show several farms in the valley were flooded and their families relocated after the dam was built.", kind: "document" },
    { id: "fish_data", label: "Downstream fish population data", reading: "Fish population data shows a sharp drop downstream in the years after the dam's construction.", kind: "data" },
    { id: "unrelated_bridge", label: "Unrelated bridge repair record", reading: "A record about a bridge repair in a different town, unrelated to the dam.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["dam_benefits"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["proposal_notice"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["flooded_farmland"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["fish_data"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_bridge"] },
  ],

  echo: {
    main: "An old 'no downsides' claim surfaced in the public works archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. A 'no real downsides' claim deserves a close read of the full record.",
    sort: "Sorted. Notice how the benefits and the costs are backed by completely separate records.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I name the dam's real benefits (water and electricity)?",
    "Did I explain why the proposal notice not mentioning costs is misleading, not just true?",
    "Did I mention the flooded farmland as a real downside?",
    "Did I mention the downstream fish population drop as an effect beyond the town itself?",
  ],
};
