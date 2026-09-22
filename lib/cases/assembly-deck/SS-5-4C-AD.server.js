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
  mustInclude: [
    "Names at least two rejected sentences.",
    "Explains what is wrong with each — an opinion presented as fact, a claim the record contradicts, or a conclusion the evidence does not support.",
    "Names at least one real instruction: the water route, recording plants, animals and landforms, or relations with American Indian nations.",
  ],
  modelAnswer: "I rejected the sentence calling it the greatest deal in history because that is an opinion, and the one about finding the water route because the record shows no such route exists. I also left out the claim that the expedition accomplished nothing, because it met two of its three orders. Jefferson actually instructed them to look for a water route, record plants and animals, and build relations with American Indian nations.",
  aiContext: "Grade 5 social studies. Target: the expedition had specific instructions and is judged against them, and the land was already inhabited and known. Watch for students who slide from 'failed to find the route' to 'the expedition failed' — the reasoning piece models the nuance but do not require it in the explanation.",
};
