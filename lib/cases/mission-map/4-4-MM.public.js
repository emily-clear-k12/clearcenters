// Mission Map — "Ecosystem Balance Path" — Grade 4 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.12B — Food Webs.** "Describe the cycling of matter and the flow of
// energy through food webs, including the roles of the Sun, producers,
// consumers, and decomposers." Direct fit — the library's own gate order
// (producer, consumer path, decomposer, tracing what happens if one
// organism decreases) already walks through exactly this standard's own
// list of roles.
//
// Standard checkpoint type throughout — the library's own arrow-direction
// trap (cp4) already does real conceptual work without needing a new
// checkpoint shape.

export const PUBLIC_CASE = {
  standard: "4.4-MM",
  teksLabel:
    "TEKS 4.12B — Food Webs (Texas Grade 4 Science; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Science",
  title: "Ecosystem Balance Path",
  tagline: "A prairie's food web is more tangled than it looks. Trace where the energy actually goes.",

  mission: {
    briefText:
      "A wildlife biologist is mapping the food web of a prairie preserve, but the trail of energy — from sunlight to grass to rabbit to hawk, and back into the soil — keeps getting tangled in wrong assumptions. Walk the path, collect real evidence at each stop, and prove you understand which way the energy actually flows.",
    goal: "Trace how energy and matter move through producers, consumers, and decomposers, and explain what happens when one part of the web changes.",
  },

  mapImage: "/mission-map/4-4-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: Where does this food web's energy actually start?",
      evidence: {
        type: "data",
        label: "STOP 1 — PRAIRIE GRASS",
        text: "Prairie grass uses sunlight to make its own food through photosynthesis. Nothing else in this food web can do that.",
      },
      choices: [
        { id: "a", text: "The grass is the producer — it makes its own food using sunlight" },
        { id: "b", text: "The rabbit is the producer, since it eats first" },
        { id: "c", text: "The hawk is the producer, since it's at the top" },
        { id: "d", text: "Nothing in this food web produces its own food" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Prairie grass is the producer — it makes its own food from sunlight.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: Trace the consumer path from the grass.",
      evidence: {
        type: "data",
        label: "STOP 2 — FEEDING OBSERVATIONS",
        text: "A rabbit was seen eating the grass. Later, a hawk was seen catching that same rabbit.",
      },
      choices: [
        { id: "a", text: "The rabbit eats the grass, and the hawk eats the rabbit" },
        { id: "b", text: "The hawk eats the grass directly" },
        { id: "c", text: "The rabbit and the hawk don't interact with the grass at all" },
        { id: "d", text: "The grass eats the rabbit" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The consumer path goes grass → rabbit → hawk.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: What happens to matter after an organism dies?",
      evidence: {
        type: "data",
        label: "STOP 3 — FOREST FLOOR",
        text: "Mushrooms and other decomposers are seen breaking down a dead plant, returning nutrients to the soil.",
      },
      choices: [
        { id: "a", text: "Decomposers break down dead material and return nutrients to the soil" },
        { id: "b", text: "Dead material just disappears with nothing acting on it" },
        { id: "c", text: "Only producers can break down dead material" },
        { id: "d", text: "Decomposers only work on living organisms" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Decomposers like mushrooms break down dead material and cycle nutrients back into the soil.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: A field guide's arrow points from grass to rabbit. What does that arrow actually mean?",
      evidence: {
        type: "passage",
        text: "\"The arrow points toward the rabbit, so that must mean the rabbit is giving energy to the grass, right?\"",
      },
      choices: [
        { id: "a", text: "No — the arrow shows energy moving FROM the grass INTO the rabbit, since the rabbit eats the grass" },
        { id: "b", text: "Yes — the arrow means the rabbit is feeding the grass" },
        { id: "c", text: "The arrow direction doesn't mean anything specific" },
        { id: "d", text: "Arrows in food webs point backward on purpose to be confusing" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Food-web arrows show the direction energy moves — from what's eaten to what eats it — not the other way around.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: This year's rabbit population dropped sharply. What's the likely effect further along the path?",
      evidence: {
        type: "passage",
        text: "The hawk's main food source in this food web is the rabbit.",
      },
      choices: [
        { id: "a", text: "The hawk would likely have less food available, since rabbits are its main energy source here" },
        { id: "b", text: "The hawk would be completely unaffected" },
        { id: "c", text: "The grass would disappear as a result" },
        { id: "d", text: "Decomposers would stop working" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Fewer rabbits means less food available for the hawk, since the hawk depends on the rabbit for energy in this food web.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Which statement best matches everything traced along this path?",
      evidence: {
        type: "passage",
        text: "Every stop showed a real role: the Sun's energy, the producer, the consumers, and the decomposers, all connected.",
      },
      choices: [
        { id: "a", text: "Energy and matter move through a food web from the Sun to producers, then consumers, and back into the soil through decomposers" },
        { id: "b", text: "Energy starts with the hawk and moves backward to the grass" },
        { id: "c", text: "Decomposers have no real role in a food web" },
        { id: "d", text: "Every organism in a food web makes its own food" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "This path traced the real cycle: the Sun's energy flows into producers, then consumers, and matter cycles back through decomposers.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how energy and matter move through this prairie food web. Your answer should: (1) trace the path from the Sun through the producer, the consumers, and the decomposers, and (2) explain what happens further along the path when the rabbit population drops.",

  responseStems: [
    "Energy in this food web starts with ___ and moves to ___.",
    "The arrow between the grass and the rabbit means ___.",
    "If the rabbit population drops, then ___ because ___.",
  ],

  selfCheckQuestions: [
    "I traced the whole path: Sun, producer, consumers, and decomposers.",
    "I explained what a food-web arrow actually means, not just that arrows exist.",
    "I explained the effect further down the path when the rabbit population changed.",
    "I used the words \"energy\" and \"matter\" correctly, not interchangeably with \"food.\"",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
