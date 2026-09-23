// SERVER ONLY.
// Assembly Deck — SS.4.6B-AD.

export const SERVER_CASE = {
  standard: "SS.4.6B-AD",
  title: "Two Regions, One Report",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], evidence: ["r1p2", "r1p3"], reasoning: ["r1p4"], conclusion: ["r1p5"] },
      decoys: {
        r1p6: "This is an opinion. A report gives the facts and lets the family decide.",
        r1p7: "The fact card says the opposite — that is the Mountains and Basins rainfall.",
      },
      decoyReason: { r1p6: "opinion", r1p7: "contradicts" },
      misplacementNotes: {
        r1p1: "This names the region and its character, so it opens the paragraph.",
        r1p2: "This is straight off the fact card — evidence.",
        r1p3: "This is straight off the fact card — evidence.",
        r1p4: "This explains what the facts mean for people, so it is the reasoning.",
        r1p5: "This sums up the region honestly, catch included, so it closes.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], evidence: ["r2p2", "r2p3"], reasoning: ["r2p4"], conclusion: ["r2p5"] },
      decoys: {
        r2p6: "This is an opinion, and an unkind one. Plenty of people choose the desert on purpose.",
        r2p7: "True, but statehood has nothing to do with comparing these two regions.",
      },
      decoyReason: { r2p6: "opinion", r2p7: "offtopic" },
      misplacementNotes: {
        r2p1: "This names the region and its character, so it opens the paragraph.",
        r2p2: "This is straight off the fact card — evidence.",
        r2p3: "This is straight off the fact card — evidence.",
        r2p4: "This explains what the facts mean for people, so it is the reasoning.",
        r2p5: "This sums up the region honestly, catch included, so it closes.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], evidence: ["r3p2", "r3p3"], reasoning: ["r3p4"], conclusion: ["r3p5"] },
      decoys: {
        r3p6: "This makes the decision for them. The report was asked to compare, not to choose.",
        r3p7: "Nothing on the fact card supports a claim about where online businesses do better.",
      },
      decoyReason: { r3p6: "opinion", r3p7: "unsupported" },
      misplacementNotes: {
        r3p1: "This frames the comparison, so it opens the paragraph.",
        r3p2: "This is a fact about this family that changes the weighing — evidence.",
        r3p3: "This is a fact about this family that changes the weighing — evidence.",
        r3p4: "This explains how their situation shifts what matters, so it is the reasoning.",
        r3p5: "This ends the report and leaves the choice with them, so it closes.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "Both regions have to be described before they can be weighed against each other; the weighing paragraph refers back to facts from both.",
  decoyProtest: {
    r1p6: "By FAR. I even said by far. That makes it stronger, not weaker?",
    r1p7: "Under twelve inches — did I have the wrong region? ...I had the wrong region.",
    r2p6: "Nobody? Nobody at all? ...There are people out there right now, aren't there.",
    r2p7: "Eighteen forty-five! A real year! A real fact! Just... not this fact.",
    r3p6: "Obviously! I said obviously! That's basically evidence!",
    r3p7: "Small towns, big dreams, fast internet — I made it ALL up, didn't I.",
  },
  requester: { name: "The Alvarado family", emoji: "📦", replies: {
    great: "This is exactly what we asked for — two honest pictures and the trade-off spelled out, without anybody telling us what to do. We're talking it over tonight.",
    good: "Thank you, this helps. A couple of lines read more like somebody's opinion than a fact, but we can see the difference between the two regions clearly now.",
    rough: "We appreciate it. Right now it's hard to tell which parts are facts about the regions and which are somebody's feelings about them — could you sort that out for us?",
  } },
  trap: { roundId: "r1", position: 3, text: "Anyone who can afford it moves to the Coastal Plains eventually.", why: "The fact card says nothing about who moves where or why. That sentence sounds like a fact and is really a guess about people." },
  debrief: {
    pinpointAccept: ["r1p4"],
    pinpointWhy: "Right. Deep soil and steady rain support farming, farming supports towns, and towns put people close together. The land comes first.",
    pinpointMiss: "That sentence tells you the cities are there. It does not say why. Look for the sentence that starts from the soil and the rain.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Thin soil and under 12 inches of rain make farming hard, so the land is worth less to a buyer.",
      b: "Nothing on the fact card says the state sets land prices. Price follows what the land can do.",
      c: "People do live and build there. The card says it holds the smallest population, not none.",
      d: "It is the opposite — most of the state's largest cities sit in the Coastal Plains, far to the east.",
    },
  },
  mustInclude: [
    "Names one real feature of the land in each region — rainfall, soil, or elevation.",
    "Connects that land to how people there make a living, such as farming, ranching, or living close together or far apart.",
    "Uses the word region, or clearly compares the two places as regions.",
  ],
  modelAnswer: "The Coastal Plains is flat with deep soil and 30 to 55 inches of rain, so large farms work there. Farming supports towns, and that is why so many people live close together in that region. The Mountains and Basins region is high and dry, with thin soil and under 12 inches of rain. Farming is hard there, so people ranch instead, and ranching needs space, so they live far apart.",
  aiContext: "Grade 4 social studies, TEKS 4.6B. Target idea: physical characteristics of a region shape human activity and settlement patterns. Accept any accurate land feature paired with any accurate human consequence. Do not require both regions to be equally developed if one is clearly explained and the other is at least named.",
};
