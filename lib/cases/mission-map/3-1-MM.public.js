// Mission Map — "Rescue the Pollination Path"
// Source concept: ClearCenters_Mission_Map_Evidence_Quest_Library_Grades_3-5.docx,
// Grade 3 Science 3.1. The mission goal, evidence clues, trap, and final-unlock
// statement are pulled directly from that library; the multiple-choice wording
// for each checkpoint (the "choices" arrays below) was authored fresh to turn
// the library's prose into the pick-the-right-clue format Mission Map actually
// uses — the library never specified discrete answer options, only the
// evidence/trap/goal it expected a checkpoint to test.
//
// TEKS NOT YET VERIFIED. "3.1" is the library's own internal concept number,
// not a confirmed state standard code — do not treat teksLabel as authoritative
// until a real TEKS pass is done (see ClearCenters_STATE.md's standing
// convention for every other engine's candidate content).

export const PUBLIC_CASE = {
  standard: "3.1-MM",
  teksLabel: "TBD — TEKS not yet verified (library concept 3.1)",
  grade: 3,
  subject: "Science",
  title: "Rescue the Pollination Path",
  tagline: "A garden's flowers aren't making seeds like they used to. Find out why.",

  mission: {
    briefText:
      "A local garden's flowers haven't been producing seeds the way they used to. Your mission: figure out how pollination actually works, so you can explain why it matters — and help fix the garden.",
    goal: "Explain how pollen moves from flower to flower, and why that matters for seeds.",
  },

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      prompt: "Gate 1: What does a flower actually need to make seeds?",
      choices: [
        { id: "a", text: "A diagram showing the flower's parts, including where pollen is held" },
        { id: "b", text: "A photo of the flower's brightest, most colorful petals" },
        { id: "c", text: "A ruler measurement of how tall the flower has grown" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Flower parts diagram — seeds start with pollen, not just pretty petals.",
    },
    {
      id: "cp2",
      order: 2,
      prompt: "Gate 2: Which clue actually shows pollen on the move?",
      choices: [
        { id: "a", text: "A bee visiting several different flowers in a row" },
        { id: "b", text: "An empty flower that no pollinator has visited" },
        { id: "c", text: "A seed pod that has already formed" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A bee moving flower to flower — this is how pollen actually travels.",
    },
    {
      id: "cp3",
      order: 3,
      prompt: "Gate 3: Which clue links pollination to a real seed forming?",
      choices: [
        { id: "a", text: "A seed pod forming on a flower a bee had visited" },
        { id: "b", text: "A flower with especially bright petals" },
        { id: "c", text: "A note about what the weather was like that day" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Seed pod formed after a visit — proof pollination led to a real seed.",
    },
    {
      id: "cp4",
      order: 4,
      prompt: "Gate 4: The garden has fewer bees this year. Which change would actually help?",
      choices: [
        { id: "a", text: "Plant flowers that bloom at different times, so pollinators always have food nearby" },
        { id: "b", text: "Paint the garden fence a brighter color" },
        { id: "c", text: "Plant many more of the exact same flower, all blooming the same single week" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A garden plan that actually supports pollinators, not just one that looks nicer.",
    },
  ],

  finalResponsePrompt:
    "Using everything in your Evidence Log, explain how the plant life cycle continues — what has to happen after a flower blooms for a brand-new plant to grow?",

  selfCheckQuestions: [
    "I explained how pollen actually gets from one flower to another.",
    "I connected pollination to a seed forming, not just to how the flower looks.",
    "I explained what happens to the seed after it forms.",
    "I used at least one piece of evidence from my Evidence Log in my answer.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
