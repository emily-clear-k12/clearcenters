// SERVER ONLY.
// Assembly Deck — SS.5.4C-AD.

export const SERVER_CASE = {
  standard: "SS.5.4C-AD",
  title: "What the Expedition Was For",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], evidence: ["r1p2", "r1p3"], reasoning: ["r1p4"], conclusion: ["r1p5"] },
      decoys: {
        r1p6: "This is an opinion dressed as a fact. A placard can report the purchase without ranking it.",
        r1p7: "The research card lists the actual instructions, and gold is not among them.",
      },
      decoyReason: { r1p6: "opinion", r1p7: "contradicts" },
      misplacementNotes: {
        r1p1: "This sets up the whole paragraph, so it goes first.",
        r1p2: "This is the event behind the expedition — evidence.",
        r1p3: "These are Jefferson's actual orders — evidence.",
        r1p4: "This explains why a government does this, so it is the reasoning.",
        r1p5: "This names the standard the rest of the placard uses, so it closes.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], evidence: ["r2p2", "r2p3"], reasoning: ["r2p4"], conclusion: ["r2p5"] },
      decoys: {
        r2p6: "The record says the opposite — no all-water route exists, and none was found.",
        r2p7: "This is an opinion. The placard can describe what they did without ranking their courage.",
      },
      decoyReason: { r2p6: "contradicts", r2p7: "opinion" },
      misplacementNotes: {
        r2p1: "This names the journey, so it opens the paragraph.",
        r2p2: "This is a documented result — evidence.",
        r2p3: "This is a documented result — evidence.",
        r2p4: "This explains who made the journey possible, so it is the reasoning.",
        r2p5: "This says what came home, so it closes the paragraph.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], evidence: ["r3p2", "r3p3"], reasoning: ["r3p4"], conclusion: ["r3p5"] },
      decoys: {
        r3p6: "This is a sweeping claim about exploring in general, and this evidence does not support it.",
        r3p7: "This overcorrects in the other direction — the record shows two of three orders were met.",
      },
      decoyReason: { r3p6: "unsupported", r3p7: "contradicts" },
      misplacementNotes: {
        r3p1: "This names the standard being applied, so it opens the paragraph.",
        r3p2: "This is one result being weighed — evidence.",
        r3p3: "This is the other result being weighed — evidence.",
        r3p4: "This is how to weigh a mixed record, so it is the reasoning.",
        r3p5: "This is the judgment the placard lands on, so it closes.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The judgment paragraph measures the expedition against the orders named in the first paragraph and the results reported in the second, so it can only come last.",
  decoyProtest: {
    r1p6: "Greatest deal in history! Look it up! ...In an opinion column, apparently.",
    r1p7: "Gold! Everybody always wants gold! Jefferson wrote it down somewhere, surely!",
    r2p6: "There HAS to be a river that goes all the way across. It's a big continent.",
    r2p7: "Bravest ever! You can't disprove that! ...Which is exactly the problem, isn't it.",
    r3p6: "Always worth it! Every expedition! Every time! ...From this one example. Hm.",
    r3p7: "Nothing of value! ...Except the maps. And the journals. And the plants. Okay.",
  },
  requester: { name: "The curator", emoji: "🏛️", replies: {
    great: "We're printing this. You gave visitors the orders, the results, and an honest verdict — including that the land was already inhabited and mapped. That last line is why the old placard had to go.",
    good: "This goes up. One or two sentences carried more opinion than the evidence supports, but the judgment is fair and the facts hold.",
    rough: "Let's work on it together before it goes on the wall. Some of what you kept is the record, and some is admiration — a placard has to be able to tell which is which.",
  } },
  trap: { roundId: "r3", position: 2, text: "The expedition was the first time anyone had ever mapped this land.", why: "The research card says the nations they met had lived on and mapped this land for generations. This sentence quietly erases them." },
  debrief: {
    pinpointAccept: ["r1p5"],
    pinpointWhy: "Right. Jefferson's three orders are the measuring stick. A mission is judged against what it was sent to do, not against what we wish it had done.",
    pinpointMiss: "That sentence is part of the story, but it gives a visitor nothing to judge by. Look for the sentence that names a measuring stick.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. There is no all-water route across North America. The order asked for something that was never there to find.",
      b: "They crossed the mountains and reached the Pacific. The route was missing, not the effort.",
      c: "The orders stood the whole way. The placard measures the expedition against all three of them.",
      d: "They recorded the journey in detail. What the journals show is that the route does not exist.",
    },
  },
  mustInclude: [
    "Names the failed order: finding a water route across the continent.",
    "Names what came back instead — journals, maps, descriptions of plants and animals, or relations with American Indian nations.",
    "Says why that record mattered: the country had just bought land no one in the capital had seen.",
  ],
  modelAnswer: "The expedition failed its first order because there is no all-water route across the continent to find. What it brought back instead was a record: journals, maps, and descriptions of hundreds of plants and animals, plus contact with the nations living there. That mattered because the United States had just doubled in size by buying land nobody in the capital had ever seen. A government cannot govern land it cannot describe.",
  aiContext: "Grade 5 social studies, TEKS 5.4C. Target idea: a mission can fail its stated goal and still produce knowledge of real value, and the expedition is judged against Jefferson's own orders. Accept any accurate naming of what came back. Do not require the student to mention American Indian nations, but credit it when they do.",
};
