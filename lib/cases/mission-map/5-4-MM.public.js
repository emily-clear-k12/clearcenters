// Mission Map — "Food Web Rescue Route" — Grade 5 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.12B — Changes in Food Webs.** "Predict how changes in an ecosystem
// affect the cycling of matter and the flow of energy through a food web."
// Direct fit — the library's own "trace the first effect, trace the second
// effect" structure already tests exactly this predictive-ripple skill.
//
// Uses the new "sequence" checkpoint type at cp4 — ordering the ripple of
// effects (grass declines, then the rabbit population, then the hawk
// population, then decomposer activity) makes the standard's own "predict
// how a change moves through a food web" language literal, instead of a
// single multiple-choice gate compressing four separate effects into one
// pick.

export const PUBLIC_CASE = {
  standard: "5.4-MM",
  teksLabel:
    "TEKS 5.12B — Changes in Food Webs (Texas Grade 5 Science; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Science",
  title: "Food Web Rescue Route",
  tagline: "A nature preserve's grass population is shrinking. Trace the ripple before it reaches every level.",

  mission: {
    briefText:
      "Rangers at a wildlife preserve noticed the grassland's grass population has been shrinking for months — and now other populations seem to be shifting too. Before the preserve decides on a rescue plan, someone needs to trace exactly how this one change is rippling through the whole food web.",
    goal: "Trace how a change to one population in a food web affects other populations through feeding relationships, and predict what happens next.",
  },

  mapImage: "/mission-map/5-4-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: Identify the producer and consumer levels in this food web.",
      evidence: {
        type: "data",
        label: "STOP 1 — PRESERVE SURVEY",
        text: "Grass grows across the preserve using sunlight. Rabbits eat the grass. Hawks eat the rabbits.",
      },
      choices: [
        { id: "a", text: "Grass is the producer; rabbits and hawks are consumers" },
        { id: "b", text: "Hawks are the producer, since they're at the top" },
        { id: "c", text: "All three are producers" },
        { id: "d", text: "None of these count as part of a food web" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Grass is the producer; rabbits and hawks are both consumers, at different levels.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: The grass population has dropped sharply. What's the first effect down the chain?",
      evidence: {
        type: "data",
        label: "STOP 2 — RABBIT POPULATION DATA",
        text: "As grass coverage dropped over several months, the rabbit population count dropped too, following a similar pattern.",
      },
      choices: [
        { id: "a", text: "The rabbit population is likely dropping because there's less grass for them to eat" },
        { id: "b", text: "The rabbit population is completely unaffected by the grass" },
        { id: "c", text: "The rabbit population should be increasing if there's less grass" },
        { id: "d", text: "There's no way to connect grass and rabbit data" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Less grass means less food for rabbits — their population dropped in the same pattern.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A trap claim says only the rabbit is affected by the shrinking grass. Is that true?",
      evidence: {
        type: "data",
        label: "STOP 3 — HAWK OBSERVATION NOTES",
        text: "Hawk sightings have also dropped, and the hawks that remain are being seen hunting farther from their usual territory.",
      },
      choices: [
        { id: "a", text: "No — the hawk population is also affected, since hawks depend on rabbits for food" },
        { id: "b", text: "Yes — only the animal that directly eats the plant is ever affected" },
        { id: "c", text: "The hawk data is unrelated to the grass or rabbits" },
        { id: "d", text: "Hawks can survive without any food source" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The ripple doesn't stop at the rabbit — hawk sightings dropped too, since hawks depend on rabbits for food.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 32 },
      prompt: "Stop 4: Put the ripple of effects in the order they actually spread through the food web.",
      evidence: {
        type: "passage",
        label: "STOP 4 — THE RIPPLE",
        text: "Every level of this food web has shown a change — but which change caused which?",
      },
      items: [
        { id: "grass", text: "Grass population shrinks" },
        { id: "rabbit", text: "Rabbit population drops from less food" },
        { id: "hawk", text: "Hawk population drops from fewer rabbits to hunt" },
        { id: "decomp", text: "Decomposer activity shifts as less dead plant and animal matter cycles through" },
      ],
      correctOrder: ["grass", "rabbit", "hawk", "decomp"],
      isTrap: false,
      evidenceLogEntry: "The ripple spreads in order: grass, then rabbits, then hawks, then decomposer activity — matter and energy flow shifting at every level.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: Which piece of evidence best supports that this whole ripple is really connected?",
      evidence: {
        type: "passage",
        text: "A decomposer note logged after several dead plants and one dead rabbit were found shows less material cycling through the soil than usual.",
      },
      choices: [
        { id: "a", text: "The decomposer note — it shows the ripple reaching all the way to matter cycling in the soil, matching the earlier grass-rabbit-hawk pattern" },
        { id: "b", text: "A photo of a rabbit that has nothing to do with this preserve" },
        { id: "c", text: "A claim with no supporting data at all" },
        { id: "d", text: "The weather forecast for next week" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The decomposer note supports the full chain — the ripple reached all the way to matter cycling in the soil.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: A new predator that hunts hawks is being considered for reintroduction. Based on this pattern, what would you predict?",
      evidence: {
        type: "passage",
        text: "Every change traced so far has rippled to the next level of the food web, not stayed isolated.",
      },
      choices: [
        { id: "a", text: "Adding a new predator would likely ripple further, affecting the hawk population and everything connected to it" },
        { id: "b", text: "Adding a new predator would have no effect on anything else in the food web" },
        { id: "c", text: "Only the grass would be affected by a new hawk predator" },
        { id: "d", text: "Food webs stop reacting to change after one ripple" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Based on the pattern already observed, a new predator would likely ripple further through the web, not stay isolated to just the hawks.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how the shrinking grass population rippled through this food web. Your answer should: (1) trace the ripple in order from the grass to the rabbits, the hawks, and the decomposers, and (2) predict what would likely happen if a new predator that hunts hawks were introduced.",

  responseStems: [
    "The ripple started when ___, which then caused ___.",
    "The effect reached the decomposers because ___.",
    "If a new predator that hunts hawks were introduced, I predict ___ because ___.",
  ],

  selfCheckQuestions: [
    "I traced the ripple in order: grass, rabbits, hawks, decomposers.",
    "I explained that the effect didn't stop at just the rabbit.",
    "I made a prediction about the new predator, connected to the pattern I already traced.",
    "I used real evidence from the case file, like the population data or the decomposer note.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
