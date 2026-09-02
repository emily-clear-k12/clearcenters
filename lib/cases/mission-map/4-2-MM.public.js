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
      "A vault deep in Ridgeline Canyon only opens for someone who can prove they understand where water goes — and where it comes from. Walk the vault's four chambers, each one holding evidence of a different part of the water cycle, and figure out why the cycle never really stops.",
    goal: "Trace how water moves through evaporation, condensation, precipitation, and collection, and explain the Sun's role in keeping the cycle going.",
  },

  mapImage: "/mission-map/4-2-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Chamber 1: What's actually powering this whole cycle?",
      evidence: {
        type: "data",
        label: "CHAMBER 1 — SENSOR LOG",
        text: "A canyon puddle was full at sunrise. By early afternoon, on a hot, sunny day, it had completely disappeared.",
      },
      choices: [
        { id: "a", text: "The Sun's heat gave the water energy to evaporate into the air" },
        { id: "b", text: "The puddle simply vanished with no energy involved" },
        { id: "c", text: "The ground swallowed the water permanently" },
        { id: "d", text: "The water turned into a completely new substance" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The Sun's heat is what gave the puddle's water the energy to evaporate.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Chamber 2: A cloud has been forming over the canyon rim all morning. What's happening?",
      evidence: {
        type: "data",
        label: "CHAMBER 2 — SKY LOG",
        text: "Rising water vapor cooled as it reached higher, colder air, and clumped together into visible clouds over the canyon rim.",
      },
      choices: [
        { id: "a", text: "Water vapor cooled and condensed into tiny droplets, forming clouds" },
        { id: "b", text: "Clouds are made of a completely different substance than the puddle's water" },
        { id: "c", text: "The clouds appeared instantly with no connection to the puddle" },
        { id: "d", text: "Clouds only form at night" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Rising water vapor cooled and condensed into the clouds forming over the canyon rim.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Chamber 3: A trap clue claims clouds create brand-new water out of nothing. Does the evidence back that up?",
      evidence: {
        type: "passage",
        text: "\"Clouds must make their own water — where else would rain come from way up in the sky?\"",
      },
      choices: [
        { id: "a", text: "No — the cloud's water is the same water that evaporated earlier; it just changed location and form" },
        { id: "b", text: "Yes — clouds manufacture entirely new water" },
        { id: "c", text: "It's impossible to know where cloud water comes from" },
        { id: "d", text: "Clouds and rain are unrelated to each other" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Clouds don't create new water — it's the same water that evaporated earlier, just moved and changed form.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Chamber 4: Put the four stages of the cycle in the order water actually moves through them.",
      evidence: {
        type: "passage",
        label: "CHAMBER 4 — THE CYCLE",
        text: "Sunlight, rising vapor, clouds, and rain have all shown up somewhere in this vault so far — but in what order does water actually move through them?",
      },
      items: [
        { id: "evap", text: "Evaporation — the Sun heats water, and it rises as vapor" },
        { id: "cond", text: "Condensation — rising vapor cools and clumps into clouds" },
        { id: "precip", text: "Precipitation — water falls back down as rain or snow" },
        { id: "collect", text: "Collection — water gathers in rivers, lakes, and puddles again" },
      ],
      correctOrder: ["evap", "cond", "precip", "collect"],
      isTrap: false,
      evidenceLogEntry: "The water cycle moves in order: evaporation, condensation, precipitation, then collection — and then it starts over again.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Chamber 5: The rain from Chamber 4 just landed back in the canyon. What happens now?",
      evidence: {
        type: "passage",
        text: "The fallen rain collected into streams and refilled the very puddle that disappeared in Chamber 1.",
      },
      choices: [
        { id: "a", text: "The cycle starts over — the Sun will heat this water and evaporate it again" },
        { id: "b", text: "The cycle is finished forever once the rain lands" },
        { id: "c", text: "This water can never evaporate again" },
        { id: "d", text: "The rain and the original puddle are unrelated" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Once the rain collects, the same water is ready for the Sun to evaporate it all over again — the cycle keeps going.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Chamber 6: The vault door asks one last question — why does the water cycle keep going instead of stopping?",
      evidence: {
        type: "passage",
        text: "Every chamber traced the same water through evaporation, condensation, precipitation, and collection — and back again.",
      },
      choices: [
        { id: "a", text: "The Sun keeps providing the energy that drives evaporation, so the cycle keeps repeating" },
        { id: "b", text: "The cycle only runs once and then stops for good" },
        { id: "c", text: "New water is created every time it rains" },
        { id: "d", text: "The cycle depends on the Moon, not the Sun" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The Sun's continuous energy is what keeps the water cycle repeating instead of stopping after one round.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how water moved through the vault's four chambers and why the cycle keeps repeating. Your answer should: (1) describe the order water moves through evaporation, condensation, precipitation, and collection, and (2) explain the Sun's role in keeping the whole cycle going.",

  responseStems: [
    "Water moves through the cycle by first ___, then ___, then ___, then ___.",
    "The Sun's role in the water cycle is ___.",
    "The cycle keeps repeating because ___.",
  ],

  selfCheckQuestions: [
    "I named all four stages of the water cycle in the correct order.",
    "I explained the Sun's role, not just listed the stages.",
    "I explained why the cycle keeps repeating instead of stopping.",
    "I used the word \"cycle\" or explained that it's the same water moving, not new water appearing.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
