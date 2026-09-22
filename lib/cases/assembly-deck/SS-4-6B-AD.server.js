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
  mustInclude: [
    "Names at least two rejected sentences.",
    "Gives a real reason for each — an opinion, a fact the card contradicts, an unsupported claim, or something off topic.",
    "States one genuine difference between the Coastal Plains and the Mountains and Basins region.",
  ],
  modelAnswer: "I left out the sentence saying nobody should live in the desert because it is an opinion, and the rainfall sentence because the card says the Coastal Plains gets 30 to 55 inches, not under 12. I also left out the claim about online businesses because nothing in the packet supports it. The real difference is that the Coastal Plains has deep soil and steady rain while the Mountains and Basins region is dry and rocky.",
  aiContext: "Grade 4 social studies. Target: comparing regions on land, rainfall, soil, and population, and connecting those to how people live and work. Accept any correct difference.",
};
