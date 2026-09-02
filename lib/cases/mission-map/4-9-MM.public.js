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

export const PUBLIC_CASE = {
  standard: "4.9-MM",
  teksLabel:
    "TEKS 4.22A — Democratic Decision Making (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written — see header comment for the TEKS-anchor correction from the library's original civic-participation framing)",
  grade: 4,
  subject: "Social Studies",
  title: "Civic Decision Map",
  tagline: "A vacant lot could become a park. Everyone has an opinion — but whose evidence actually counts?",

  mission: {
    briefText:
      "The city council's meeting agenda for a vacant lot won't unlock until every stakeholder's evidence has been weighed fairly. A business owner, a family, and a cost chart all have something to say — and only a decision that considers more than one viewpoint can move forward to a vote.",
    goal: "Use democratic decision-making to weigh multiple stakeholders' evidence and recommend a decision with its trade-offs.",
  },

  mapImage: "/mission-map/4-9-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Item 1: The city council agenda lists one item: a vacant downtown lot. What's the actual problem to solve?",
      evidence: {
        type: "data",
        label: "COUNCIL AGENDA",
        text: "The agenda states the city must decide what to do with an empty lot that has sat unused for two years.",
      },
      choices: [
        { id: "a", text: "Deciding what to do with the vacant lot" },
        { id: "b", text: "Deciding who owns the lot" },
        { id: "c", text: "There's no real problem to solve" },
        { id: "d", text: "Deciding whether to close the city council" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The problem to solve is what to do with the vacant downtown lot.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Item 2: A local business owner comments on the lot. What need does this stakeholder represent?",
      evidence: {
        type: "passage",
        label: "BUSINESS OWNER COMMENT",
        text: "\"I'd like to see a small parking area — my customers struggle to find parking downtown.\"",
      },
      choices: [
        { id: "a", text: "The need for more downtown parking, from a business owner's point of view" },
        { id: "b", text: "The need for a new park, from a family's point of view" },
        { id: "c", text: "This comment represents no real stakeholder need" },
        { id: "d", text: "The need to close all downtown businesses" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The business owner's comment represents the need for more downtown parking.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Item 3: A family from the neighborhood also comments. What need does this second stakeholder represent?",
      evidence: {
        type: "passage",
        label: "FAMILY COMMENT",
        text: "\"We'd love a small park with a playground — there's nowhere nearby for kids to play.\"",
      },
      choices: [
        { id: "a", text: "The need for a neighborhood park, from a family's point of view" },
        { id: "b", text: "The exact same need as the business owner" },
        { id: "c", text: "This comment represents no real stakeholder need" },
        { id: "d", text: "The need for more downtown parking" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The family's comment represents the need for a neighborhood park.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Item 4: A city planner only reads the business owner's comment and recommends a parking lot immediately. Is that a fair decision-making process?",
      evidence: {
        type: "passage",
        text: "The planner ignored the family's comment entirely and based the whole recommendation on a single viewpoint.",
      },
      choices: [
        { id: "a", text: "No — a fair decision needs to weigh more than one stakeholder's needs, not just the first one heard" },
        { id: "b", text: "Yes — the first comment received should always win" },
        { id: "c", text: "Only business owners' opinions matter in city decisions" },
        { id: "d", text: "Fairness doesn't matter in government decisions" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Listening to only one stakeholder's viewpoint isn't a fair decision-making process.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Item 5: A cost chart shows a parking lot costs less to build than a park with a playground. Should cost be the only factor in the decision?",
      evidence: {
        type: "data",
        label: "COST CHART",
        text: "The chart shows the parking lot's lower cost, but doesn't measure how much each option would benefit the neighborhood.",
      },
      choices: [
        { id: "a", text: "No — cost is one important factor, but it should be weighed along with the community's needs, not decided by cost alone" },
        { id: "b", text: "Yes — the cheapest option should always automatically win" },
        { id: "c", text: "Cost never matters in a city decision" },
        { id: "d", text: "The cost chart proves the park is the better choice" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Cost matters, but a fair decision weighs it alongside community needs rather than deciding by cost alone.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Item 6: The agenda is ready for a final vote. What makes a community decision like this a fair, democratic one?",
      evidence: {
        type: "passage",
        text: "The final vote considered the business owner's need, the family's need, and the cost chart together, instead of just one viewpoint.",
      },
      choices: [
        { id: "a", text: "Considering more than one stakeholder's needs and trade-offs before voting, rather than listening to only one side" },
        { id: "b", text: "Only the loudest voice should be heard" },
        { id: "c", text: "A vote is fair no matter how few viewpoints were considered" },
        { id: "d", text: "Democratic decisions never involve trade-offs" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A fair, democratic decision considers multiple stakeholders' needs and trade-offs before a final vote.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, recommend what the city council should do with the vacant lot. Your answer should: (1) mention at least two stakeholders' needs (the business owner and the family), and (2) explain the trade-off in your recommendation.",

  responseStems: [
    "The business owner needs ___, and the family needs ___.",
    "My recommendation is ___ because ___.",
    "The trade-off in my recommendation is ___.",
  ],

  selfCheckQuestions: [
    "I mentioned at least two stakeholders' needs, not just one.",
    "I explained why cost alone shouldn't decide the outcome.",
    "I explained a trade-off in my recommendation.",
    "I made a clear recommendation, not just a list of opinions.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
