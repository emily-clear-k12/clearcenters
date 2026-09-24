// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.12A-AD",
  "title": "The Pond Tank",
  "rounds": {
    "r1": {
      "key": {
        "topic": [
          "r1p1"
        ],
        "details": [
          "r1p2",
          "r1p3"
        ],
        "conclusion": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "Gravel is nonliving. Being in the tank does not make it biotic.",
        "r1p6": "The notes say sunlight is not alive."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This defines biotic.",
        "r1p2": "This is the fish.",
        "r1p3": "These are the other living things.",
        "r1p4": "This is the conclusion."
      }
    },
    "r2": {
      "key": {
        "topic": [
          "r2p1"
        ],
        "details": [
          "r2p2",
          "r2p3"
        ],
        "conclusion": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "Water is nonliving, even if fish use it.",
        "r2p6": "The notes say the fish needs abiotic factors too."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This defines abiotic.",
        "r2p2": "This is sunlight.",
        "r2p3": "These are more abiotic factors.",
        "r2p4": "This is the conclusion."
      }
    },
    "r3": {
      "key": {
        "topic": [
          "r3p1"
        ],
        "details": [
          "r3p2",
          "r3p3"
        ],
        "conclusion": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "The fish needs water. Removing it would not help the fish thrive.",
        "r3p6": "The notes never compare gravel brands."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names survival.",
        "r3p2": "This is the biotic side.",
        "r3p3": "This is the abiotic side.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece sorts biotic factors, then abiotic factors. Survival comes last.",
  "decoyProtest": {
    "r1p5": "It is in the habitat, so it is biotic.",
    "r1p6": "Sunlight helps things live, so it must be alive.",
    "r2p5": "Fish touch the water, so water is biotic.",
    "r2p6": "Living things are the interesting part.",
    "r3p5": "Fish are tough.",
    "r3p6": "Brands are how tanks get built."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Tank accepted. The fish needs biotic factors and abiotic factors such as light, water, and temperature.",
      "good": "Tank accepted. The sort is mostly right. Read the leftovers so nonliving things are not called alive.",
      "rough": "I have the work. Come read it with me. Part of this sorts the factors, and part of it mixes living and nonliving."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "Sunlight is biotic because the plant needs it.",
    "why": "Needing sunlight does not make sunlight alive. Sunlight is abiotic. The plant is biotic."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says sunlight is abiotic.",
    "pinpointMiss": "That sentence may belong. It does not say sunlight is abiotic.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Sunlight is nonliving, so it is abiotic.",
      "b": "The fish is biotic.",
      "c": "The snail is biotic.",
      "d": "The plant is biotic."
    }
  },
  "mustInclude": [
    "Calls the fish, plant, or snail biotic.",
    "Calls sunlight, water, temperature, or gravel abiotic.",
    "Says the fish needs both kinds of factors."
  ],
  "modelAnswer": "The fish, plant, and snail are biotic. Sunlight, water, temperature, and gravel are abiotic. The fish survives by interacting with both.",
  "aiContext": "Grade 5 Science, TEKS 5.12A. Biotic: fish, plant, snail. Abiotic: sunlight, water, temperature, gravel. A healthy ecosystem includes both, and the fish needs both. Do not accept gravel or sunlight as biotic, water as biotic because fish swim in it, a tank of only living things, removing water as helpful, or gravel brand. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "abiotic",
      "survive"
    ],
    "walkLine": "Survival in this tank uses the nonliving factors.",
    "why": {
      "a": "Yes. Without abiotic factors, the fish's survival fails.",
      "b": "The fish is still a biotic factor.",
      "c": "The notes say the fish needs abiotic factors too.",
      "d": "Removing abiotic factors does not make sunlight biotic."
    }
  },
  "look": {
    "key": "both",
    "hint": "A fish, a plant, water, sunlight, and gravel.",
    "why": "Yes. Living and nonliving factors are both there."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say sunlight is alive.",
    "why": "Yes. Sunlight is abiotic."
  }
};
