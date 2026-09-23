// Mission Map — "Open the Water Cycle Vault" — Grade 4 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.10A — Water Cycle.** "Describe and illustrate the continuous movement
// of water above and on Earth's surface through the water cycle and explain
// the role of the Sun as a major source of energy." Direct, strong fit —
// the library's own gate order (Sun's role, evaporation, condensation,
// precipitation/collection) already matches the standard's own emphasis on
// the CONTINUOUS, CYCLING nature of the process, not just naming the parts.
//
// Uses the new "sequence" checkpoint type (built Sept 2) at cp4 — ordering
// the 4 stages of the cycle is the single clearest sequence-shaped skill in
// this whole Science batch, and it's exactly what 4.10A's own "continuous
// movement" language is testing: not just naming evaporation/condensation/
// precipitation/collection, but knowing they cycle in order.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.2-MM",
  teksLabel:
    "TEKS 4.10A — Water Cycle (Texas Grade 4 Science; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Science",
  title: "Open the Water Cycle Vault",
  tagline: "A puddle vanished after one sunny afternoon. Where did the water actually go?",

  mission: {
    briefText:
      "A vault deep in Ridgeline Canyon opens only for someone who knows where water goes and where it comes from. Each of its chambers holds evidence of one part of the water cycle. Walk through them and figure out why the cycle never stops.",
    goal: "Trace how water moves through evaporation, condensation, precipitation, and collection. Explain how the Sun keeps the cycle going.",
  },

  mapImage: "/mission-map/4-2-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Chamber 1: What gives this whole cycle its energy?",
      evidence: {
        type: "data",
        label: "CHAMBER 1 — SENSOR LOG",
        text: "A canyon puddle was full at sunrise. The day was hot and sunny. By early afternoon, the puddle was gone.",
      },
      choices: [
        { id: "a", text: "The puddle simply vanished with no energy involved" },
        { id: "b", text: "The ground soaked up the water for good" },
        { id: "c", text: "The Sun's heat gave the water energy to evaporate into the air" },
        { id: "d", text: "The water turned into a new substance" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The Sun's heat gave the puddle's water the energy to evaporate.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Chamber 2: A cloud has been forming over the canyon rim all morning. What is happening?",
      evidence: {
        type: "data",
        label: "CHAMBER 2 — SKY LOG",
        text: "Water vapor rose into higher, colder air. There it cooled and clumped together into clouds you can see.",
      },
      choices: [
        { id: "a", text: "Water vapor cooled and condensed into tiny drops, forming clouds" },
        { id: "b", text: "Clouds are made of something different from the puddle's water" },
        { id: "c", text: "The clouds appeared with no connection to the puddle" },
        { id: "d", text: "Clouds only form at night" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Rising water vapor cooled and condensed into clouds over the canyon rim.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Chamber 3: A trap clue says clouds make brand-new water. Does the evidence back that up?",
      evidence: {
        type: "passage",
        text: "\"Clouds must make their own water. Where else would rain come from, way up in the sky?\"",
      },
      choices: [
        { id: "a", text: "No. The cloud's water is the same water that evaporated earlier. It only moved and changed form." },
        { id: "b", text: "Yes. Clouds make brand-new water." },
        { id: "c", text: "It's impossible to know where cloud water comes from" },
        { id: "d", text: "Clouds and rain are unrelated to each other" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Clouds don't make new water. It is the same water that evaporated earlier, moved and changed.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Chamber 4: Put the four stages in the order water moves through them.",
      evidence: {
        type: "passage",
        label: "CHAMBER 4 — THE CYCLE",
        text: "You have seen sunlight, rising vapor, clouds, and rain in this vault. In what order does water move through them?",
      },
      items: [
        { id: "evap", text: "Evaporation — the Sun heats water, and it rises as vapor" },
        { id: "cond", text: "Condensation — the vapor cools and forms clouds" },
        { id: "precip", text: "Precipitation — water falls back down as rain or snow" },
        { id: "collect", text: "Collection — water gathers in rivers, lakes, and puddles again" },
      ],
      correctOrder: ["evap", "cond", "precip", "collect"],
      evidenceLogEntry: "The cycle goes evaporation, condensation, precipitation, then collection. Then it starts over.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Chamber 5: The rain from Chamber 4 just landed in the canyon. What happens now?",
      evidence: {
        type: "passage",
        text: "The rain ran into streams. It filled the same puddle that disappeared in Chamber 1.",
      },
      choices: [
        { id: "a", text: "The cycle starts over. The Sun will heat this water and evaporate it again." },
        { id: "b", text: "The cycle is over for good once the rain lands" },
        { id: "c", text: "This water can never evaporate again" },
        { id: "d", text: "The rain has nothing to do with the old puddle" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Once the rain collects, the Sun can evaporate the same water again. The cycle keeps going.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Chamber 6: The vault asks one last question. Why does the water cycle keep going?",
      evidence: {
        type: "passage",
        text: "Every chamber followed the same water. It evaporated, condensed, fell, and collected. Then it went around again.",
      },
      choices: [
        { id: "a", text: "The Sun keeps giving energy for evaporation, so the cycle keeps repeating" },
        { id: "b", text: "The cycle runs once and then stops" },
        { id: "c", text: "New water is made every time it rains" },
        { id: "d", text: "The cycle depends on the Moon, not the Sun" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The Sun keeps giving energy, so the water cycle keeps repeating.",
    },
  ],

  finalResponsePrompt:
    "Explain how water moved through the vault's chambers and why the cycle keeps repeating. Your answer should: (1) put evaporation, condensation, precipitation, and collection in order, and (2) explain how the Sun keeps the whole cycle going.",

  responseStems: [
    "Water moves through the cycle by first ___, then ___, then ___, then ___.",
    "The Sun's role in the water cycle is ___.",
    "The cycle keeps repeating because ___.",
  ],

  selfCheckQuestions: [
    "I named all four stages of the water cycle in the correct order.",
    "I explained what the Sun does, not just listed the stages.",
    "I explained why the cycle keeps repeating instead of stopping.",
    "I explained that it's the same water moving, not new water appearing.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
