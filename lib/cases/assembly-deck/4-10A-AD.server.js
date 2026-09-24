// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "4.10A-AD",
  "title": "The Puddle's Trip",
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
        "r1p5": "The notes say the water was not used up.",
        "r1p6": "The notes name the sun, not the moon."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the need.",
        "r1p2": "This is the sun.",
        "r1p3": "This is the vapor.",
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
        "r2p5": "The notes follow the same water. Rain is not made from nothing.",
        "r2p6": "The notes say rain ran to the creek, so the movement continues."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the cloud.",
        "r2p3": "This is the rain.",
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
        "r3p5": "The notes say the water was not used up.",
        "r3p6": "The notes describe a cloud from vapor, not chimney smoke."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This names the cycle.",
        "r3p2": "This is the energy.",
        "r3p3": "This is where water moves.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the sun's job, then the loop. The continuous cycle comes last.",
  "decoyProtest": {
    "r1p5": "I could not see the puddle later.",
    "r1p6": "Nighttime water stories use the moon.",
    "r2p5": "New rain sounds cleaner.",
    "r2p6": "One rain feels finished.",
    "r3p5": "Down should be the end.",
    "r3p6": "Clouds look like smoke."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Cycle accepted. The sun drove the water from puddle to vapor, cloud, rain, and creek.",
      "good": "Cycle accepted. The path is mostly right. Read the leftovers so the water is not treated as used up.",
      "rough": "I have the work. Come read it with me. Part of this is a cycle, and part of it ends the water too soon."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The rain used the water up, so the cycle was over.",
    "why": "The notes say the water was not used up. Rain ran to the creek, and the sun can drive the movement again."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says the sun warmed the puddle.",
    "pinpointMiss": "That sentence may belong. It does not say the sun warmed the puddle.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The sun supplied the energy.",
      "b": "The notes name the sun, not the moon.",
      "c": "The cloud formed from vapor, not chimney smoke.",
      "d": "The water was not used up."
    }
  },
  "mustInclude": [
    "Says the sun warmed the puddle or supplied the energy.",
    "Follows water through vapor, cloud, and rain.",
    "Says the water keeps moving, or was not used up."
  ],
  "modelAnswer": "The sun warmed the puddle. Water rose as vapor, formed a cloud, fell as rain, and ran to the creek. The sun supplied the energy, and the water was not used up.",
  "aiContext": "Grade 4 Science, TEKS 4.10A. Sun warms the puddle and is the energy source. Water evaporates, condenses into a cloud, falls as rain, and runs to the creek. The cycle is continuous. Do not accept the moon, water used up, rain from nothing, the cycle stopping, or chimney smoke. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "sun",
      "vapor"
    ],
    "walkLine": "The vapor rises because the sun supplies energy.",
    "why": {
      "a": "Yes. Without the sun, the rising vapor fails.",
      "b": "The puddle is still there. It does not vanish forever.",
      "c": "The moon is not the energy source in these notes.",
      "d": "Blocking the sun does not create rain from nothing."
    }
  },
  "look": {
    "key": "loop",
    "hint": "A puddle, rising vapor, a cloud, rain, and a sun.",
    "why": "Yes. That is the cycle in the notes."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say the moon boiled the puddle.",
    "why": "Yes. The sun supplied the energy."
  }
};
