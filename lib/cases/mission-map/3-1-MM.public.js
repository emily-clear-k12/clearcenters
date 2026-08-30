// Mission Map — "Rescue the Pollination Path"
// REVISED Aug 30 (v2) after live-testing the first version: Emily flagged it
// as too thin for a 20-30 minute activity and too visually flat (colored
// bars, not an actual map). This version adds real checkpoints and depth on
// Emily's explicit direction: more checkpoints (4 -> 6), richer evidence to
// actually study at each one (short passages/data instead of one-liners),
// harder/more genuinely tempting wrong choices, and a multi-part Final
// Unlock requirement.
//
// What's still sourced from the real library vs. authored fresh, to be
// transparent about it: Checkpoints 1, 2, 3, and 5 below are the original
// library's 4 gates (flower parts, pollen movement, seed-pod link, garden
// fix), rewritten with deeper evidence and harder choices. Checkpoints 4
// and 6 (species-matching, the caged-marigold controlled experiment) are
// NEW — authored to hit the rigor bar Emily asked for, since the source
// library's original 4-gate version didn't have enough content depth on its
// own. Both stay tightly on-topic (still pollination, still building toward
// the same final-unlock idea), not padding with unrelated filler.
//
// TEKS NOT YET VERIFIED. "3.1" is the library's own internal concept number,
// not a confirmed state standard code.

export const PUBLIC_CASE = {
  standard: "3.1-MM",
  teksLabel: "TBD — TEKS not yet verified (library concept 3.1)",
  grade: 3,
  subject: "Science",
  title: "Rescue the Pollination Path",
  tagline: "A garden's flowers aren't making seeds like they used to. Find out why.",

  mission: {
    briefText:
      "A local garden's flowers haven't been producing seeds the way they used to. Your mission: walk the garden path, gather real evidence at each stop, and figure out how pollination actually works — so you can explain why it matters, and help fix the garden.",
    goal: "Explain how pollen moves from flower to flower, why it doesn't always work, and why that matters for seeds.",
  },

  // A background map image Emily supplies per case — this path is the
  // convention; the file itself doesn't need to exist yet (the client shows
  // a themed placeholder background until it does, so nothing breaks).
  mapImage: "/mission-map/3-1-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 12, y: 75 },
      prompt: "Gate 1: What does a flower actually need to make a seed?",
      evidence: {
        type: "passage",
        text: "Look closely at the flower diagram. Deep inside are two parts: the stamen, which makes a powdery substance called pollen, and the pistil, which holds the ovule that can become a seed. For a seed to form, pollen has to reach the pistil — from this same flower, or from a different one.",
      },
      choices: [
        { id: "a", text: "The stamen and pistil need to exchange pollen" },
        { id: "b", text: "The flower's petals need to be bright enough to attract insects" },
        { id: "c", text: "The flower needs enough sunlight and water to bloom" },
        { id: "d", text: "The flower needs to be pollinated by the wind" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Flower anatomy: seeds start when pollen reaches the pistil — not from bright petals alone.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 28, y: 45 },
      prompt: "Gate 2: Which piece of evidence actually shows pollen on the move?",
      evidence: {
        type: "data",
        text: "A trail camera near the garden recorded four things this afternoon: (1) A bee lands on a marigold, dusts itself with yellow powder, then flies to a nearby zinnia. (2) A ladybug walks along a leaf, eating aphids. (3) A butterfly rests on a rock in the sun, wings closed. (4) A hummingbird visits a red tube-shaped flower and drinks from it without touching the flower's center.",
      },
      choices: [
        { id: "a", text: "The bee flying from the marigold to the zinnia, carrying yellow powder" },
        { id: "b", text: "The ladybug eating aphids on the leaf" },
        { id: "c", text: "The butterfly resting in the sun" },
        { id: "d", text: "The hummingbird drinking without touching the flower's center" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Trail camera footage: the bee carried pollen from one flower to another — real pollen movement caught in action.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 45, y: 68 },
      prompt: "Gate 3: Which evidence actually links pollination to a real seed forming?",
      evidence: {
        type: "passage",
        text: "Three weeks after the bee's visit, the gardener checked back. The marigold, which the bee visited, has a small round pod swelling where the flower used to be. The zinnia the bee visited afterward still just has wilted petals with no pod. A third flower, a sunflower no pollinator ever visited, still looks exactly like it did on day one.",
      },
      choices: [
        { id: "a", text: "The marigold's swelling pod, where a flower used to be" },
        { id: "b", text: "The zinnia's wilted petals" },
        { id: "c", text: "The untouched sunflower staying exactly the same" },
        { id: "d", text: "How many days passed since the bee's visit" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Three weeks later: only the visited marigold grew a real seed pod.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 30 },
      prompt: "Gate 4: Why didn't the zinnia form a seed pod, even though the bee visited it too?",
      evidence: {
        type: "passage",
        text: "The gardener remembered something: the bee visited the marigold first, picked up pollen there, then flew straight to the zinnia — but marigolds and zinnias are different species. A garden guide says: \"Pollen usually only works if it lands on a flower of the same species, or a very close relative. Otherwise, the flower can't use it to make a seed.\"",
      },
      choices: [
        { id: "a", text: "The pollen came from a different species of flower, so the zinnia couldn't use it" },
        { id: "b", text: "The zinnia just needed more time" },
        { id: "c", text: "The bee didn't carry enough pollen on that trip" },
        { id: "d", text: "Zinnias can never produce seed pods" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Pollen usually only works on the same or a closely related species — that's why the zinnia's pod never formed.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 72, y: 55 },
      prompt: "Gate 5: The garden club noticed fewer bees this year. Which change would actually help?",
      evidence: {
        type: "passage",
        text: "The garden club is worried and considering four ideas for next season.",
      },
      choices: [
        { id: "a", text: "Plant a mix of flowers that bloom at different times all season, so pollinators always have food nearby" },
        { id: "b", text: "Paint the garden fence a brighter color" },
        { id: "c", text: "Plant many more of the exact same flower, all blooming the same single week" },
        { id: "d", text: "Put up bright string lights around the garden at night" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A garden plan that spreads blooms across the whole season actually supports pollinators — not just anything 'more' or 'brighter.'",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 88, y: 35 },
      prompt: "Gate 6: A neighbor says \"We don't need bees — wind can pollinate everything.\" Which evidence actually tests that claim?",
      evidence: {
        type: "data",
        text: "The garden club sets up two identical marigold plants in mesh cages before believing the claim. Cage A lets wind through but keeps all insects out. Cage B is left open so insects can freely visit. After three weeks: Cage A's marigold has zero seed pods. Cage B's marigold has several seed pods.",
      },
      choices: [
        { id: "a", text: "Cage A (wind-only) had zero seed pods, while Cage B (open to insects) had several" },
        { id: "b", text: "Cage A let the wind through" },
        { id: "c", text: "Both marigolds were the same species" },
        { id: "d", text: "Three weeks passed during the test" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A real test: without insects, marigolds in the mesh cage made zero seed pods — wind alone wasn't enough for this flower.",
    },
  ],

  finalResponsePrompt:
    "Using your Evidence Log, explain the full story of how this garden's flowers make seeds — and use the caged-marigold test to explain why the neighbor's \"wind is enough\" claim doesn't hold up here. Your answer should: (1) explain how pollen actually moves from flower to flower, (2) explain why pollen only works on the same or a closely related species, and (3) use the mesh-cage evidence to explain what happens without insect pollinators.",

  selfCheckQuestions: [
    "I explained how pollen actually gets from one flower to another.",
    "I explained why the zinnia's pollen from the marigold didn't work.",
    "I used the caged-marigold test to address the wind-pollination claim.",
    "I used at least two specific pieces of evidence from my Evidence Log, not just a general statement.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
