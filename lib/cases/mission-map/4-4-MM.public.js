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

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

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
      "A wildlife scientist is mapping the food web of a prairie. The energy trail runs from sunlight to grass to rabbit to hawk. Then it runs back into the soil. But wrong ideas keep tangling it up. Walk the path and collect evidence at each stop. Prove which way the energy really flows.",
    goal: "Trace how energy and matter move through producers, consumers, and decomposers. Explain what happens when one part of the web changes.",
  },

  mapImage: "/mission-map/4-4-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: Where does the energy in this food web start?",
      evidence: {
        type: "data",
        label: "STOP 1 — PRAIRIE GRASS",
        text: "Prairie grass uses sunlight to make its own food. This is called photosynthesis. Nothing else in this food web can do that.",
      },
      choices: [
        { id: "a", text: "The rabbit is the producer, since it eats first" },
        { id: "b", text: "The hawk is the producer, since it's at the top" },
        { id: "c", text: "Nothing in this food web produces its own food" },
        { id: "d", text: "The grass is the producer. It makes its own food using sunlight." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "Prairie grass is the producer. It makes its own food from sunlight.",
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
        { id: "a", text: "The hawk eats the grass directly" },
        { id: "b", text: "The rabbit and the hawk don't interact with the grass at all" },
        { id: "c", text: "The rabbit eats the grass, and the hawk eats the rabbit" },
        { id: "d", text: "The grass eats the rabbit" },
      ],
      correctChoiceId: "c",
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
        text: "Mushrooms and other decomposers are breaking down a dead plant. They return nutrients to the soil.",
      },
      choices: [
        { id: "a", text: "Dead material just disappears with nothing acting on it" },
        { id: "b", text: "Only producers can break down dead material" },
        { id: "c", text: "Decomposers break down dead material and return nutrients to the soil" },
        { id: "d", text: "Decomposers only work on living organisms" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Decomposers like mushrooms break down dead things. They return nutrients to the soil.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: A field guide shows an arrow from the grass to the rabbit. What does that arrow mean?",
      evidence: {
        type: "passage",
        text: "\"The arrow points to the rabbit. So the rabbit must be giving energy to the grass, right?\"",
      },
      choices: [
        { id: "a", text: "Yes. The arrow means the rabbit is feeding the grass." },
        { id: "b", text: "The arrow direction doesn't mean anything specific" },
        { id: "c", text: "No. The arrow shows energy moving from the grass into the rabbit, because the rabbit eats the grass." },
        { id: "d", text: "Food web arrows point backward to be tricky" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Food web arrows show which way energy moves. They point from what is eaten to what eats it.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: This year, the rabbit population dropped a lot. What will likely happen further along the path?",
      evidence: {
        type: "passage",
        text: "The hawk's main food source in this food web is the rabbit.",
      },
      choices: [
        { id: "a", text: "The hawk would be completely unaffected" },
        { id: "b", text: "The grass would disappear as a result" },
        { id: "c", text: "Decomposers would stop working" },
        { id: "d", text: "The hawk would likely have less food, since rabbits are its main energy source here" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "Fewer rabbits means less food for the hawk. The hawk gets its energy from rabbits in this food web.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Which statement best matches everything you traced?",
      evidence: {
        type: "passage",
        text: "Every stop showed a real role. There was the Sun's energy, the producer, the consumers, and the decomposers. All of them were connected.",
      },
      choices: [
        { id: "a", text: "Energy and matter move from the Sun to producers, then consumers, and back to the soil through decomposers" },
        { id: "b", text: "Energy starts with the hawk and moves backward to the grass" },
        { id: "c", text: "Decomposers have no real role in a food web" },
        { id: "d", text: "Every organism in a food web makes its own food" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The Sun's energy flows into producers, then consumers. Matter cycles back through decomposers.",
    },
  ],

  finalResponsePrompt:
    "Explain how energy and matter move through this prairie food web. Your answer should: (1) trace the path from the Sun through the producer, the consumers, and the decomposers, and (2) explain what happens along the path when the rabbit population drops.",

  responseStems: [
    "Energy in this food web starts with ___ and moves to ___.",
    "The arrow between the grass and the rabbit means ___.",
    "If the rabbit population drops, then ___ because ___.",
  ],

  selfCheckQuestions: [
    "I traced the whole path: Sun, producer, consumers, and decomposers.",
    "I explained what a food web arrow means, not just that arrows exist.",
    "I explained what happens along the path when the rabbits change.",
    "I used the words \"energy\" and \"matter\" correctly.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
