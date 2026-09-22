// Safe to import from client components.
// Assembly Deck — SS.4.6B-AD. TEKS 4.6B — compare the physical regions of
// Texas (verified code, already in use by SS.4.6B-SC).
// Three rounds of four slots, then assembly. Runs about 22 minutes.

export const PUBLIC_CASE = {
  standard: "SS.4.6B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Social Studies",
  title: "Two Regions, One Report",
  estimatedMinutes: 20,
  brief: [
    "A family moving to Texas cannot decide between two regions: the Coastal Plains and the Mountains and Basins. They asked for a report, not a sales pitch.",
    "Write three paragraphs: one on each region, and one that weighs them against each other.",
    "Build each paragraph, sort out the leftovers, then decide the order.",
  ],
  source: {
    title: "REGION FACT CARD",
    lines: [
      "Coastal Plains: flat to gently rolling. 30-55 inches of rain a year. Deep farm soil. Most of the state's largest cities. Hurricanes reach the coast.",
      "Mountains and Basins: high desert and mountains. Under 12 inches of rain a year. Thin rocky soil. The state's smallest population. The clearest night skies in Texas.",
      "Both regions raise livestock.",
      "The family runs a small business online and wants land.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "The Coastal Plains",
      goal: "Build the paragraph describing the first region.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "Which region, and what defines it?", accepts: 1 },
        { id: "evidence", label: "Evidence from the fact card", hint: "Two facts about this region", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "What those facts mean for people living there", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What this region offers, and its catch", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The Coastal Plains is the flattest, wettest, and most crowded region in Texas." },
        { id: "r1p2", text: "The land is flat to gently rolling. It gets 30 to 55 inches of rain a year, and the soil is deep enough for large farms." },
        { id: "r1p3", text: "Most of the state's largest cities sit in this region." },
        { id: "r1p4", text: "Deep soil and steady rain support farming. Farming supports towns, so people here live close together." },
        { id: "r1p5", text: "The Coastal Plains offers rich land and close neighbors, plus the hurricanes that reach this coast." },
        { id: "r1p6", text: "The Coastal Plains is the best region in Texas by far." },
        { id: "r1p7", text: "The Coastal Plains receives under 12 inches of rain a year." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "The Mountains and Basins region",
      goal: "Build the paragraph describing the second region.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "Which region, and what defines it?", accepts: 1 },
        { id: "evidence", label: "Evidence from the fact card", hint: "Two facts about this region", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "What those facts mean for people living there", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What this region offers, and its catch", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The Mountains and Basins region is the driest, highest, and emptiest part of Texas." },
        { id: "r2p2", text: "It receives under 12 inches of rain a year, and its soil is thin and rocky." },
        { id: "r2p3", text: "It holds the smallest population in the state and the clearest night skies." },
        { id: "r2p4", text: "Thin soil and little rain make farming hard. Ranching needs space, so people live far apart." },
        { id: "r2p5", text: "This region offers space, quiet, and cheap land. It also means long drives to almost everything." },
        { id: "r2p6", text: "Nobody should ever want to live in the desert." },
        { id: "r2p7", text: "Texas became the twenty-eighth state in 1845." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What the difference means for this family",
      goal: "Build the paragraph that weighs the two regions for the people actually moving.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is being weighed?", accepts: 1 },
        { id: "evidence", label: "Evidence", hint: "Two things that matter to this family in particular", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "How their situation changes what matters", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "An honest ending that leaves the choice with them", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The right region depends less on which is better and more on what this family needs." },
        { id: "r3p2", text: "They run their business online, so they do not need a city to find customers." },
        { id: "r3p3", text: "They want land. Land in the west is cheaper because so little of it can be farmed." },
        { id: "r3p4", text: "A family that needs hospitals and schools nearby would pick the Coastal Plains. This family's work travels with them." },
        { id: "r3p5", text: "Both regions raise livestock. The real question is how far from other people they want to wake up." },
        { id: "r3p6", text: "This family should obviously move to the desert." },
        { id: "r3p7", text: "Online businesses always do better in small towns." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one report. What order should the family read them in?",
    hint: "A comparison describes each thing before it weighs them against each other.",
    slots: [
      { id: "first", label: "Opens the report" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the report" },
    ],
  },
  explain: {
    prompt: "Explain to the family why you left those six sentences out of the report.",
    criteria: [
      "Names at least two rejected sentences.",
      "Gives a real reason for each — an opinion, a fact the card contradicts, a claim nothing supports, or something off topic.",
      "States one genuine difference between the two regions.",
    ],
  },
  board: null,
};
