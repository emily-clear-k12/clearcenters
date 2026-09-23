// SERVER ONLY. Never import from a client component.
// Assembly Deck — 3.13A-AD.

export const SERVER_CASE = {
  standard: "3.13A-AD",
  title: "Built for This",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Prettiest is an opinion. The notes describe heat and shade, not a favorite.",
        r1p6: "The notes say the opposite. The fox lives in a hot desert, not a cool forest.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "This is a fact about the habitat.",
        r1p3: "This is another fact about the habitat.",
        r1p4: "This says what the place means for the fox, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "No note mentions cactus milk. That claim has no evidence.",
        r2p6: "Cuter is an opinion. The notes describe size, not a contest.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "opinion" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This names what is special about the ears.",
        r2p3: "This is another detail about the same structure.",
        r2p4: "This names the structure the log is about, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Brave is a guess about other foxes. The notes say the ears let heat leave.",
        r3p6: "The notes say the opposite. Heat leaves through the ears. It is not trapped.",
      },
      decoyReason: { r3p5: "unsupported", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is what the structure does.",
        r3p3: "This is how that action helps the fox.",
        r3p4: "This ties the structure to the habitat, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says where the fox lives, then names the ears. Only then does it say what the ears do.",
  decoyProtest: {
    r1p5: "Pretty is a habitat. I can feel the sand's vibe.",
    r1p6: "Forest, desert, both have a floor. Close enough.",
    r2p5: "Cactus milk is a famous fox drink. I invented it just now.",
    r2p6: "Cuteness is a structure. It is my favorite structure.",
    r3p5: "Brave ears. The other foxes told me. In a dream.",
    r3p6: "Heat in, heat out, ears are just confused mittens.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You named the hot desert, the big ears, and the heat leaving through them. That is a structure doing a job.",
      good: "Log accepted. The fox story is mostly right. Read the leftovers so a cute guess does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the ears, and part of it is a guess about looks.",
    },
  },
  trap: {
    roundId: "r3",
    position: 2,
    text: "The ears are big so the fox can look cute to its friends.",
    why: "Cute is an opinion. The notes say heat leaves through the ears.",
  },
  debrief: {
    pinpointAccept: ["r3p2", "r3p3", "r3p4"],
    pinpointWhy: "Right. That sentence says how the ears help the fox survive.",
    pinpointMiss: "That sentence may be true. It does not say how the ears help the fox survive.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Heat leaves through the big ears, so the fox can stay cool.",
      b: "Brave is a guess. The notes never say what other foxes think.",
      c: "The notes say heat leaves. The ears do not trap it.",
      d: "No note says the fox drinks cactus milk.",
    },
  },
  mustInclude: [
    "Says the fox lives in a hot desert, or a place with little shade.",
    "Names the large ears.",
    "Says heat leaves through the ears, or that the ears help the fox stay cool.",
  ],
  modelAnswer: "The fox lives in a hot desert with little shade. Its ears are very large. Heat leaves through those ears, and that helps the fox stay cool.",
  aiContext: "Grade 3 science, TEKS 3.13A. A structure (large ears) has a function (releasing heat) that helps a desert fox survive in a hot habitat with little shade. Do not accept cuteness or bravery as the function. Accept simple words. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["ears", "heat", "fox"],
    walkLine: "The big ears let heat out. That is how the fox stays cool.",
    why: {
      a: "Yes. Without the big ears, heat cannot leave that way, and the fox cannot stay cool.",
      b: "The desert does not change if the ears are gone. The fox does.",
      c: "The ears do a job. Cute is not the structure the notes describe.",
      d: "The heat path would fail. Staying cool fails with it, because that is what the heat path is for.",
    },
  },
  look: {
    key: "ears",
    hint: "Follow the arrows. The picture shows a desert, big ears, heat leaving, and a cool fox. It does not show a drink, and it does not pick a favorite.",
    why: "Yes. The arrows go from the big ears to heat leaving to a fox that stays cool.",
  },
  repair: {
    pieceId: "r2p5",
    model: "The notes never say the fox drinks cactus milk.",
    why: "Yes. That sentence tells the truth. The notes never showed cactus milk.",
  },
};
