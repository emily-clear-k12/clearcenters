// Mission Map — "Rescue the Pollination Path"
// REVISED Aug 30 (v2) after live-testing the first version: Emily flagged it
// as too thin for a 20-30 minute activity and too visually flat (colored
// bars, not an actual map). This version adds real checkpoints and depth on
// Emily's explicit direction: more checkpoints (4 -> 6), richer evidence to
// actually study at each one (short passages/data instead of one-liners),
// harder/more genuinely tempting wrong choices, and a multi-part Final
// Unlock requirement.
//
// TEKS NOT YET VERIFIED. "3.1" is the library's own internal concept number,
// not a confirmed state standard code.
//
// REVISED AGAIN Aug 30 (v4), after Emily's second live-test pass, on 3 of
// her own proposed additions (all approved, "yes we can do all 3"):
// (1) a reason chip after every checkpoint pick (mechanic-level, lives in
// MissionMapClient.js, not per-checkpoint data — nothing added here);
// (2) checkpoint 3 rewritten as a "conflicting report" — two field notes
// disagree, student judges which one holds up against evidence already
// collected, via the new `secondEvidence` field; (3) checkpoint 6 gets a
// `predictBeforeEvidence` step — guess the caged-experiment's result before
// the real evidence reveals it. Both reuse checkpoint 3 and 6's existing map
// positions rather than adding new checkpoints, since Emily's background
// map art is already locked to exactly 6 zones — adding a 7th checkpoint
// would need a 7th zone that doesn't exist in that image. Reason chips and
// the predict-then-reveal UI both live in MissionMapClient.js (the client's
// REASON_CHIPS constant and its `needsPrediction` branch) — nothing about
// either mechanic is per-case data, so no new fields were needed for #1.
//
// REVISED AGAIN Aug 31 (v5), after Emily's third live-test pass: "there is
// also way to much text for 3rd graders and the writing needs to have
// sentence stems (even for 4th grade) but ones that they can just click on
// to show up in the response field." Two changes: (1) every checkpoint's
// evidence text rewritten to short, plain, one-idea-per-sentence wording;
// (2) a `responseStems` array added, tied to this case's specific 3-part
// Final Unlock requirement.
//
// REVISED AGAIN Aug 31 (v6) — REAL TEKS AUDIT, RETHEMED TO FOOD CHAINS.
// Emily supplied the actual current Texas Science TEKS (grades 3-5) and
// asked that they become a standing reference checked before authoring any
// content (see ClearCenters_STATE.md §9 rule 11). Checking this case
// against them for the first time found a real problem, not just a reading-
// level one: NO Texas Science standard at grades 3, 4, or 5 tests
// pollination mechanics (flower anatomy, pollen transfer, cross-species
// pollen compatibility) — this case had been built entirely outside the
// real standard, which is why "no way a 3rd grader can do this, a 5th
// grader would struggle" was true no matter how simply the sentences were
// worded. Re-anchored to the real, closest-matching standard instead:
// **3.12B — Food Chains & Ecosystem Changes** (Grade 3 Science), whose own
// TEKS text uses "removing bees from a field" as its named example — so the
// bee/garden setting survives almost untouched, but what the student
// actually reasons through changed from flower reproduction to food-chain
// energy flow and ecosystem-impact prediction, which IS grade-3-appropriate
// content. All 6 checkpoints keep their map positions and general shape
// (evidence -> choice -> reason chip -> submit); only the content changed:
//   - cp1: flower anatomy -> what this garden's food chain looks like
//     (Sun -> flowers/producers -> bees/consumers)
//   - cp2: pollen-carried-by-bee evidence -> bee-feeding-on-nectar evidence
//     (the actual producer-to-consumer link in this chain)
//   - cp3: conflicting volunteer reports, reframed around whether fewer bee
//     visits actually reduced seed counts (kept the secondEvidence field)
//   - cp4: species-compatibility (dropped entirely, not real TEKS content)
//     -> a new link: fewer seeds could mean less food for a seed-eating
//     bird (the sparrow), extending the chain one more step
//   - cp5: unchanged in substance (attracting bees back was never the
//     problem — it's a real, grade-appropriate ecosystem-stewardship idea)
//   - cp6: caged-marigold experiment kept (still a real controlled test of
//     "does removing this link change the outcome"), predictBeforeEvidence
//     kept, just reframed from "wind vs. insects" to "no bees vs. bees"
// modelAnswer / mustInclude in 3-1-MM.server.js updated to match — see that
// file. lib/hints.js's "3.1-MM" entries updated to match the new content.

export const PUBLIC_CASE = {
  standard: "3.1-MM",
  teksLabel: "TEKS 3.12B — Food Chains & Ecosystem Changes (Texas Grade 3 Science; confirmed Aug 31, 2026 against the real, current TEKS document Emily supplied — see ClearCenters_STATE.md §9 rule 11 and §10)",
  grade: 3,
  subject: "Science",
  title: "Rescue the Pollination Path",
  tagline: "A garden's food chain is breaking down since fewer bees are visiting. Find out why it matters.",

  mission: {
    briefText:
      "A local garden's flowers haven't been making seeds like they used to, and the garden club noticed fewer bees visiting. Your mission: walk the garden path, gather real evidence at each stop, and figure out how this garden's food chain actually works — and what happens to it when bees disappear.",
    goal: "Explain how energy moves through this garden's food chain, and what happens to the rest of the chain when bees decline.",
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
      prompt: "Gate 1: What does a food chain in this garden actually look like?",
      evidence: {
        type: "passage",
        text: "Every food chain starts with the Sun. The Sun's energy helps the flowers grow. Flowers are called producers. They make their own food. Bees are called consumers. They eat nectar from the flowers. That is how energy moves through this food chain.",
      },
      choices: [
        { id: "a", text: "Sun, then flowers (producers), then bees (consumers)" },
        { id: "b", text: "Bees, then flowers, then the Sun" },
        { id: "c", text: "Flowers only need bees. They don't need the Sun" },
        { id: "d", text: "The Sun feeds the bees directly, not the flowers" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "This garden's food chain: Sun to flowers (producers) to bees (consumers).",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 28, y: 45 },
      prompt: "Gate 2: Which piece of evidence actually shows energy moving from a flower to a bee?",
      evidence: {
        type: "data",
        // Real trail-camera-style image, added Aug 31 (v9) once Emily
        // generated it from the image prompt this session wrote her.
        image: "/mission-map/evidence/3-1-mm-cp2.png",
        text: "A trail camera recorded four things today. A bee lands on a flower and feeds on its nectar. A ladybug walks on a leaf and eats aphids. A butterfly rests on a rock with its wings closed. A rabbit hops through the grass.",
      },
      choices: [
        { id: "a", text: "The bee feeding on nectar from the flower" },
        { id: "b", text: "The ladybug eating aphids on the leaf" },
        { id: "c", text: "The butterfly resting on the rock" },
        { id: "d", text: "The rabbit hopping through the grass" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Trail camera footage: the bee feeding on nectar is this garden's flower-to-bee link caught in action.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 45, y: 68 },
      prompt: "Gate 3: Two volunteers checked the garden three weeks after they noticed fewer bees. They don't agree. Which note actually matches the evidence?",
      evidence: {
        type: "passage",
        label: "FIELD NOTE — VOLUNTEER A",
        text: "\"I counted the flowers this week. Many of them wilted with no seeds inside. Fewer bees have been visiting all month. The flowers that did get a bee visit still made seeds.\"",
      },
      secondEvidence: {
        type: "passage",
        label: "FIELD NOTE — VOLUNTEER B",
        text: "\"I think the flowers are fine either way. I don't think bees really matter for making seeds.\"",
      },
      choices: [
        { id: "a", text: "Volunteer A's note — fewer bee visits meant fewer flowers made seeds" },
        { id: "b", text: "Volunteer B's note — flowers don't need bees" },
        { id: "c", text: "Both notes could be true at the same time" },
        { id: "d", text: "Neither note counts as real evidence" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Volunteer A's note held up: fewer bee visits meant fewer flowers made seeds.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 30 },
      prompt: "Gate 4: If fewer flowers make seeds, what else in the garden could be affected?",
      evidence: {
        type: "passage",
        text: "Some birds in this garden eat seeds. A sparrow was seen picking seeds from the marigolds all summer. This year, fewer marigolds have seeds in them.",
      },
      choices: [
        { id: "a", text: "The sparrow may have less food to eat, since there are fewer seeds" },
        { id: "b", text: "The sparrow will start eating the bees instead" },
        { id: "c", text: "The marigolds will stop growing leaves" },
        { id: "d", text: "Nothing else in the garden is affected" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Fewer seeds could mean less food for seed-eating animals like the sparrow — the effect moves down the food chain.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 72, y: 55 },
      prompt: "Gate 5: The garden club wants more bees to visit next year. Which change would actually help?",
      evidence: {
        type: "passage",
        text: "The garden club is deciding between four ideas for next season.",
      },
      choices: [
        { id: "a", text: "Plant a mix of flowers that bloom at different times, so bees always have food nearby" },
        { id: "b", text: "Paint the garden fence a brighter color" },
        { id: "c", text: "Plant many more of the exact same flower, all blooming the same single week" },
        { id: "d", text: "Put up bright string lights around the garden at night" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A garden plan with flowers blooming all season actually supports bees — not just anything 'more' or 'brighter.'",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 88, y: 35 },
      prompt: "Gate 6: A neighbor says \"Bees don't really matter for this garden.\" Which evidence actually tests that claim?",
      // Predict-then-reveal (Emily's idea, Aug 30 v4): guess before seeing
      // the real result, then compare. Not graded — just a curiosity/
      // hypothesis check logged for the teacher, no penalty either way.
      // Reframed Aug 31 v6 from "wind vs. insects" to "no bees vs. bees" to
      // match the food-chain retheme.
      predictBeforeEvidence: {
        question: "Before you see the results: what do you think happened to Cage A, the one with no bees allowed in?",
        options: [
          { id: "many", text: "It grew lots of seed pods — same as the cage bees could reach" },
          { id: "some", text: "It grew a few seed pods, just not as many" },
          { id: "none", text: "It grew no seed pods at all" },
        ],
        correctOptionId: "none",
      },
      evidence: {
        type: "data",
        // Real caged-marigold comparison image, added Aug 31 (v9).
        image: "/mission-map/evidence/3-1-mm-cp6.png",
        text: "The garden club sets up two identical marigold plants in mesh cages. Cage A keeps bees out. Cage B is left open so bees can visit. After three weeks: Cage A has zero seed pods. Cage B has several seed pods.",
      },
      choices: [
        { id: "a", text: "Cage A (no bees) had zero seed pods, while Cage B (bees allowed) had several" },
        { id: "b", text: "Cage A let more sunlight in" },
        { id: "c", text: "Both marigolds were the same species" },
        { id: "d", text: "Three weeks passed during the test" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A real test: without bees, marigolds made zero seed pods. Bees really do matter for this food chain.",
    },
  ],

  finalResponsePrompt:
    "Using your Evidence Log, explain the story of this garden's food chain — and use the caged-marigold test to explain why the neighbor's \"bees don't matter\" claim doesn't hold up here. Your answer should: (1) explain how energy moves through this food chain, from the Sun to the flowers to the bees, (2) explain what happens further down the chain (like to the sparrow) when fewer bees visit, and (3) use the mesh-cage evidence to explain why bees really do matter here.",

  // Clickable sentence stems for the Final Unlock response box (Aug 31 v5,
  // Emily's ask) — tied one-to-one to the 3-part requirement above.
  // Rewritten Aug 31 v6 to match the food-chain retheme. The stem-button UI
  // itself is generic and lives in MissionMapClient.js; this array is the
  // only thing a new case needs to supply to get its own stems.
  responseStems: [
    "Energy moves from the ___ to the ___ to the ___ in this food chain.",
    "When fewer bees visit, the sparrow could ___ because ___.",
    "The caged flower test showed ___, which proves ___.",
  ],

  selfCheckQuestions: [
    "I explained how energy moves through this garden's food chain.",
    "I explained what happens to the sparrow when fewer bees visit.",
    "I used the caged-marigold test to address the \"bees don't matter\" claim.",
    "I used at least two specific pieces of evidence from my Evidence Log, not just a general statement.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
