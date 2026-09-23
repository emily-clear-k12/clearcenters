// Mission Map — "Civic Decision Map" — Grade 4 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
//
// The library concept's own "Digital Wow" note ("students collect
// stakeholder badges; the final vote opens only when more than one
// viewpoint is included") is a democratic-decision simulation with a final
// vote, not a generic civic-participation-figures lesson. That points to
// **4.22A — Democratic Decision Making.** "Use democratic procedures to
// simulate making decisions about school, local, or state issues" — a
// tighter, more literal match than the civic-participation strand
// (4.15A-F, about historical figures who participated in civic affairs).
// The mission content itself needed no rewrite, only the correct TEKS
// anchor — a smaller fix than a full content re-anchor, but confirmed
// against the real PDF before writing, per the standing rule.
//
// Standard checkpoint type throughout — the weighing-evidence, avoid-
// one-sided-thinking structure is already a strong evidence-gate case.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.9-MM",
  teksLabel:
    "TEKS 4.22A — Democratic Decision Making (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written — see header comment for the TEKS-anchor correction from the library's original civic-participation framing)",
  grade: 4,
  subject: "Social Studies",
  title: "Civic Decision Map",
  tagline: "An empty lot could become a park. Everyone has an opinion. Whose evidence counts?",

  mission: {
    briefText:
      "The city council must decide what to do with an empty lot. The agenda stays locked until every group's evidence is weighed fairly. A business owner, a family, and a cost chart all have something to say. Only a decision that looks at more than one side can go to a vote.",
    goal: "Weigh the evidence from more than one group. Recommend a decision and name its trade-off.",
  },

  mapImage: "/mission-map/4-9-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Item 1: The council agenda lists one item: an empty lot downtown. What is the problem to solve?",
      evidence: {
        type: "data",
        label: "COUNCIL AGENDA",
        text: "The agenda says the city must decide what to do with a lot that has been empty for two years.",
      },
      choices: [
        { id: "a", text: "Deciding what to do with the empty lot" },
        { id: "b", text: "Deciding who owns the lot" },
        { id: "c", text: "There's no real problem to solve" },
        { id: "d", text: "Deciding whether to close the city council" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The problem is deciding what to do with the empty lot downtown.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Item 2: A local business owner comments on the lot. What need does she speak for?",
      evidence: {
        type: "passage",
        label: "BUSINESS OWNER COMMENT",
        text: "\"I'd like a small parking area. My customers have trouble finding parking downtown.\"",
      },
      choices: [
        { id: "a", text: "The need for a new park, from a family's point of view" },
        { id: "b", text: "This comment shows no real need" },
        { id: "c", text: "The need to close all downtown businesses" },
        { id: "d", text: "The need for more downtown parking, from a business owner's view" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The business owner speaks for the need for more parking downtown.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Item 3: A family from the neighborhood comments too. What need do they speak for?",
      evidence: {
        type: "passage",
        label: "FAMILY COMMENT",
        text: "\"We'd love a small park with a playground. There's nowhere nearby for kids to play.\"",
      },
      choices: [
        { id: "a", text: "The need for a neighborhood park, from a family's view" },
        { id: "b", text: "The exact same need as the business owner" },
        { id: "c", text: "This comment shows no real need" },
        { id: "d", text: "The need for more downtown parking" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The family speaks for the need for a neighborhood park.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Item 4: A city planner reads only the business owner's comment. He picks a parking lot right away. Is that a fair way to decide?",
      evidence: {
        type: "passage",
        text: "The planner ignored the family's comment. He based the whole plan on one point of view.",
      },
      choices: [
        { id: "a", text: "Yes. The first comment should always win." },
        { id: "b", text: "No. A fair decision weighs more than one group's needs, not just the first one heard." },
        { id: "c", text: "Only business owners matter in city decisions" },
        { id: "d", text: "Fairness doesn't matter in government decisions" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Listening to only one group is not a fair way to decide.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Item 5: A cost chart shows a parking lot costs less than a park. Should cost be the only thing that decides?",
      evidence: {
        type: "data",
        label: "COST CHART",
        text: "The chart shows the parking lot costs less. It does not show how much each choice would help the neighborhood.",
      },
      choices: [
        { id: "a", text: "Yes. The cheapest choice should always win." },
        { id: "b", text: "No. Cost is important, but it should be weighed with the community's needs." },
        { id: "c", text: "Cost never matters in a city decision" },
        { id: "d", text: "The cost chart proves the park is the better choice" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Cost matters. But a fair decision weighs cost along with what the community needs.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Item 6: The agenda is ready for a vote. What makes a decision like this fair and democratic?",
      evidence: {
        type: "passage",
        text: "The vote looked at the business owner's need, the family's need, and the cost chart together. It did not listen to only one side.",
      },
      choices: [
        { id: "a", text: "Only the loudest voice should be heard" },
        { id: "b", text: "A vote is fair no matter how few views were heard" },
        { id: "c", text: "Democratic decisions never involve trade-offs" },
        { id: "d", text: "Looking at more than one group's needs and the trade-offs before voting" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "A fair, democratic decision looks at more than one group's needs and the trade-offs before a vote.",
    },
  ],

  finalResponsePrompt:
    "Recommend what the city council should do with the empty lot. Your answer should: (1) name what at least two groups need (the business owner and the family), and (2) explain the trade-off in your plan.",

  responseStems: [
    "The business owner needs ___, and the family needs ___.",
    "My recommendation is ___ because ___.",
    "The trade-off in my recommendation is ___.",
  ],

  selfCheckQuestions: [
    "I named what at least two groups need, not just one.",
    "I explained why cost alone shouldn't decide.",
    "I explained a trade-off in my plan.",
    "I made a clear recommendation, not just a list of opinions.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
