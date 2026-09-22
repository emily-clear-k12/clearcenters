// SERVER ONLY.
// Assembly Deck — 4.10B-AD.

export const SERVER_CASE = {
  standard: "4.10B-AD",
  title: "The Bend in Sandy Creek",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], evidence: ["r1p2", "r1p3"], reasoning: ["r1p4"], conclusion: ["r1p5"] },
      decoys: {
        r1p6: "This is an opinion about the creek. A survey paragraph reports what was measured.",
        r1p7: "The notes say the opposite — the outside bank moved back, not outward.",
      },
      decoyReason: { r1p6: "opinion", r1p7: "contradicts" },
      misplacementNotes: {
        r1p1: "This names what the paragraph is about, so it opens it.",
        r1p2: "This is a measurement from the survey — evidence.",
        r1p3: "This is a condition the survey recorded — evidence.",
        r1p4: "This explains why the water did that, so it is the reasoning.",
        r1p5: "This names the process, so it closes the paragraph.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], evidence: ["r2p2", "r2p3"], reasoning: ["r2p4"], conclusion: ["r2p5"] },
      decoys: {
        r2p6: "True, but this report is about one creek bend, not every force that reshapes Earth.",
        r2p7: "Water does not carry material uphill — the notes show it was dropped where the current slowed.",
      },
      decoyReason: { r2p6: "offtopic", r2p7: "contradicts" },
      misplacementNotes: {
        r2p1: "This names what the paragraph is about, so it opens it.",
        r2p2: "This is what the survey found — evidence.",
        r2p3: "This links the sandbar to the missing bank — evidence.",
        r2p4: "This explains why the material settled here, so it is the reasoning.",
        r2p5: "This names the process, so it closes the paragraph.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], evidence: ["r3p2", "r3p3"], reasoning: ["r3p4"], conclusion: ["r3p5"] },
      decoys: {
        r3p6: "This is an opinion about the builders, and it does not help the station decide anything.",
        r3p7: "One season of data cannot prove a collapse date. The survey supports a risk, not a certainty.",
      },
      decoyReason: { r3p6: "opinion", r3p7: "unsupported" },
      misplacementNotes: {
        r3p1: "This connects the survey to the bridge, so it opens the paragraph.",
        r3p2: "This is a measurement from the notes — evidence.",
        r3p3: "This is the rate of change the notes support — evidence.",
        r3p4: "This is the prediction the evidence allows, so it is the reasoning.",
        r3p5: "This is the recommendation, so it closes the report.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "Erosion on the outside comes first because the sandbar paragraph refers back to the material the bank lost; the recommendation can only come after both measurements.",
  decoyProtest: {
    r1p6: "Prettiest! It's practically data! There's a whole creek in it!",
    r1p7: "Outward, backward — the bank moved, didn't it? Direction is a detail.",
    r2p6: "VOLCANOES. Nobody ever stops reading at volcanoes.",
    r2p7: "Uphill is just downhill from the other side. ...No? Nothing?",
    r3p6: "Somebody had to say it. That post has been out there in the open for years.",
    r3p7: "Next year! Mark my words! ...Based on one season of data. Which is my whole problem.",
  },
  requester: { name: "Chief Engineer Vance", emoji: "📐", replies: {
    great: "Survey accepted, and the recommendation goes to the works crew today. You measured, you explained, and you stopped exactly where the data stopped. That last part is rarer than you'd think.",
    good: "Survey accepted. One or two sentences slid past you that weren't carrying their weight, but the erosion-and-deposition picture is right and the bridge call is sound.",
    rough: "Survey received. The measurements are in there, but so are some claims the drone never saw. Flag me down and we'll separate the two before this goes to the works crew.",
  } },
  trap: { roundId: "r2", position: 2, text: "Once a sandbar forms on the inside of a bend, the creek stops changing there for good.", why: "Nothing in the survey says the creek stops. Sandbars grow, shift, and wash out — the whole report is about a creek that keeps moving." },
  mustInclude: [
    "Names at least two rejected sentences.",
    "Gives a real reason for each — an opinion, a claim the notes contradict, something the survey never showed, or something off topic.",
    "Uses erosion or deposition correctly.",
  ],
  modelAnswer: "I left out the sentence about the creek being pretty because it is an opinion, and the one about the bank growing outward because the notes show it moved back two meters. I also left out the claim that the bridge will collapse next year, because one season of data shows a risk, not a certainty. The fast water on the outside caused erosion and the slow water inside caused deposition.",
  aiContext: "Grade 4 science. Target: fast water erodes the outside of a bend, slow water deposits on the inside, and a measured rate supports a prediction but not a certainty. Accept a student who uses only one of the two terms correctly. Do not penalize spelling.",
};
