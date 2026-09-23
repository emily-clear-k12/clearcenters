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
  debrief: {
    pinpointAccept: ["r2p4"],
    pinpointWhy: "Right. Slow water carries less. When the creek slowed on the inside of the bend, it dropped what it had been holding.",
    pinpointMiss: "That sentence describes the sandbar. It does not explain why the creek let go of the material there. Look for the sentence about how fast the water runs.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Erosion took it off the fast side and deposition dropped it on the slow side. Same material, new place.",
      b: "The notes say the creek ran high all summer. It was not short of water.",
      c: "Creeks do not make soil. The sandbar is the same kind of material the outside bank is missing.",
      d: "The survey measured two meters of change in one season. That change is the whole reason for the report.",
    },
  },
  mustInclude: [
    "Says the fast water on the outside of the bend wears the bank away and carries the material off.",
    "Says the slow water on the inside drops the material it was carrying.",
    "Uses the words erosion and deposition, or clearly describes both processes in the student's own words.",
  ],
  modelAnswer: "Water runs fastest on the outside of a bend, so it has enough energy to pick up soil and carry it away. That is erosion. On the inside the water runs slowest, so it has less energy and drops what it was holding. That is deposition. One creek does both because the water is not moving at the same speed all the way across.",
  aiContext: "Grade 4 science, TEKS 4.10B. Target idea: erosion and deposition are two halves of one process, driven by how much energy moving water has. Accept 'picks up' and 'drops' as correct descriptions of the two processes. Do not require both vocabulary terms if the student clearly describes both. Do not penalize spelling.",
};
