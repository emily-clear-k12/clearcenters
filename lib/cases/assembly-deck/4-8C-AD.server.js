// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "4.8C-AD",
  "title": "The Closed Path",
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
        "r1p5": "The notes say the open switch left the bulb dark.",
        "r1p6": "The notes include wires. No wires means no path."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the rule.",
        "r1p2": "This is the open switch.",
        "r1p3": "This is the closed switch.",
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
        "r2p5": "The notes name light and thermal energy, not sound.",
        "r2p6": "Warmth here is thermal energy, not a melting battery."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the light.",
        "r2p3": "This is the heat.",
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
        "r3p5": "Parts have to make a closed path. A pile is not enough.",
        "r3p6": "The notes never compare battery brands."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names the rule.",
        "r3p2": "This is the open path.",
        "r3p3": "This is the closed path.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece shows the closed path, then the energy change. The rule comes last.",
  "decoyProtest": {
    "r1p5": "I saw a glow in my mind.",
    "r1p6": "Batteries are magic enough.",
    "r2p5": "Bulbs hum, so sound counts.",
    "r2p6": "Warm means broken.",
    "r3p5": "Having the parts should count.",
    "r3p6": "Brands are how people shop."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Circuit accepted. The closed path made light and heat. The open path did not.",
      "good": "Circuit accepted. The path is mostly right. Read the leftovers so an open switch is not given credit.",
      "rough": "I have the work. Come read it with me. Part of this is a closed path, and part of it is only a pile of parts."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The bulb lit with the switch open, because the battery was nearby.",
    "why": "The notes say the open switch left the bulb dark. Electrical energy traveled only when the path was closed."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p3"
    ],
    "pinpointWhy": "Right. That sentence says the closed switch let the bulb light.",
    "pinpointMiss": "That sentence may belong. It does not say the closed switch lit the bulb.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The bulb made light, and the warm wire was thermal energy.",
      "b": "The notes do not say the bulb made sound.",
      "c": "The open switch left the bulb dark.",
      "d": "The warmth is thermal energy, not a melted battery."
    }
  },
  "mustInclude": [
    "Says the bulb stayed dark when the path was open.",
    "Says the closed path produced light.",
    "Says electrical energy also became thermal energy, or that the wire was warm."
  ],
  "modelAnswer": "The open switch left the bulb dark. The closed path let the bulb light, and the wire felt warm. Electrical energy became light and thermal energy.",
  "aiContext": "Grade 4 Science, TEKS 4.8C. A closed path carries electrical energy. Open switch: bulb dark. Closed switch: bulb lights and the wire is warm, so the energy became light and thermal energy. Do not accept an open switch lighting the bulb, no wires, sound as the product, a melting battery, a pile of parts, or battery brand. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "closed",
      "light"
    ],
    "walkLine": "The light needs the closed path.",
    "why": {
      "a": "Yes. An open path means no light.",
      "b": "The battery is still there.",
      "c": "The notes say the open switch left the bulb dark.",
      "d": "Opening the path does not turn the bulb into a sound source."
    }
  },
  "look": {
    "key": "closed",
    "hint": "The wires make a loop, and the bulb is glowing.",
    "why": "Yes. That is a closed path."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the bulb lit while the switch was open.",
    "why": "Yes. The open path left it dark."
  }
};
