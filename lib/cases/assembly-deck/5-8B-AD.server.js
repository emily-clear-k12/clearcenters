// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.8B-AD",
  "title": "The Spinning Motor",
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
        "r1p5": "The notes say the open switch stopped the spinning.",
        "r1p6": "A complete circuit includes a path, not a battery by itself."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the need.",
        "r1p2": "These are the parts.",
        "r1p3": "This says the path was complete.",
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
        "r2p5": "The notes describe a transformation, not energy from nothing.",
        "r2p6": "This circuit became motion, not only sound."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the electrical energy.",
        "r2p3": "This is the motion.",
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
        "r3p5": "The notes say the open switch stopped the spinning.",
        "r3p6": "The notes tie the spinning to the circuit."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This names the rule.",
        "r3p2": "This is the open switch.",
        "r3p3": "This is the requirement.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the complete circuit, then the transformation. The open-switch requirement comes last.",
  "decoyProtest": {
    "r1p5": "I imagined it still humming.",
    "r1p6": "The battery is the important part.",
    "r2p5": "Motors feel like they invent energy.",
    "r2p6": "Spinning things whir.",
    "r3p5": "A gap is a small detail.",
    "r3p6": "Rooms have breezes."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Circuit accepted. The complete path turned electrical energy into motion, and the open switch stopped it.",
      "good": "Circuit accepted. The motor is mostly right. Read the leftovers so an open path is not given credit.",
      "rough": "I have the work. Come read it with me. Part of this is a transformation, and part of it skips the complete path."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The motor made new energy, so the battery was optional.",
    "why": "The motor transformed electrical energy into motion. It did not create energy, and the complete path was required."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p4"
    ],
    "pinpointWhy": "Right. That sentence says electrical energy transformed into motion.",
    "pinpointMiss": "That sentence may belong. It does not say electrical energy became motion.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The open switch stopped the spinning.",
      "b": "The notes say the spinning stopped.",
      "c": "A battery alone is not a complete circuit.",
      "d": "The notes tie the spinning to the circuit, not the wind."
    }
  },
  "mustInclude": [
    "Says the circuit was complete.",
    "Says electrical energy transformed into motion.",
    "Says opening the switch stopped the motor."
  ],
  "modelAnswer": "A battery, wires, and a closed switch made a complete circuit. Electrical energy transformed into the motor's motion. When the switch opened, the spinning stopped.",
  "aiContext": "Grade 5 Science, TEKS 5.8B. A complete circuit transformed electrical energy into motion. Opening the switch stopped the motor. A complete circuit can also produce light, sound, or thermal energy, but this demonstration produced motion. Do not accept an open switch still spinning the motor, a battery alone, energy from nothing, sound as this result, or wind. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "complete",
      "motion"
    ],
    "walkLine": "The motion is the transformation, and it needs a complete path.",
    "why": {
      "a": "Yes. Without a complete circuit, the motion fails.",
      "b": "The battery is still there.",
      "c": "The open switch stopped the motor.",
      "d": "Opening the path does not create energy from nothing."
    }
  },
  "look": {
    "key": "spin",
    "hint": "A closed loop and a spinning motor.",
    "why": "Yes. The path is complete, and the motor moves."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the motor spun with the switch open.",
    "why": "Yes. The open switch stopped it."
  }
};
