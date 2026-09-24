// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "3.7B-AD",
  "title": "The Wagon That Moved",
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
        "r1p5": "Wanting is not a force. The notes name a push.",
        "r1p6": "The notes say the wagon rolled forward."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the force.",
        "r1p2": "This is where it started.",
        "r1p3": "This is what the push did.",
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
        "r2p5": "The notes show a pull changing the motion too.",
        "r2p6": "Tired is not a force in this test."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "opinion"
      },
      "misplacementNotes": {
        "r2p1": "This names the force.",
        "r2p2": "This is what the pull did.",
        "r2p3": "This is the result.",
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
        "r3p5": "Paint is not a force in these notes.",
        "r3p6": "The notes name a push and a pull, not gravity alone."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This opens the conclusion.",
        "r3p2": "This is the push.",
        "r3p3": "This is the pull.",
        "r3p4": "This states the idea."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the push, then the pull. The rule comes last.",
  "decoyProtest": {
    "r1p5": "Things move when they feel like it.",
    "r1p6": "It looked parked to me.",
    "r2p5": "Push is the famous force.",
    "r2p6": "Tired is a kind of science.",
    "r3p5": "Color is a property, so it must matter.",
    "r3p6": "Gravity is always the answer."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Test accepted. The push started the roll, and the pull stopped it.",
      "good": "Test accepted. The forces are mostly right. Read the leftovers so a wish is not treated as a force.",
      "rough": "I have the work. Come read it with me. Part of this names a force, and part of it names a feeling."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The wagon rolled because it wanted a trip.",
    "why": "Wanting is not a force. A push started the motion, and a pull stopped it."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p3"
    ],
    "pinpointWhy": "Right. That sentence says a push made the wagon roll forward.",
    "pinpointMiss": "That sentence may belong. It does not say the push made the wagon roll.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The push started it, and the pull stopped it.",
      "b": "Wanting is not a force.",
      "c": "The notes never say paint moved the wagon.",
      "d": "The notes say it rolled forward."
    }
  },
  "mustInclude": [
    "Says a push started the wagon moving.",
    "Says a pull stopped it.",
    "Says these forces changed position or motion."
  ],
  "modelAnswer": "A push made the wagon roll away from the curb. A pull brought it to a stop. Pushes and pulls can change position and motion.",
  "aiContext": "Grade 3 Science, TEKS 3.7B. A push started the wagon and changed its position and motion. A pull stopped it. Do not accept wanting, paint, tiredness, or gravity as the only force in this test. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "push",
      "roll"
    ],
    "walkLine": "The push is what starts the roll.",
    "why": {
      "a": "Yes. Without the push, the forward roll fails.",
      "b": "The curb is still there.",
      "c": "Wanting does not start the wagon.",
      "d": "The pull stops the wagon. It does not replace the push."
    }
  },
  "look": {
    "key": "push",
    "hint": "Hands push a wagon, and the wagon is farther along.",
    "why": "Yes. The push changes its position."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the wagon wanted to move.",
    "why": "Yes. A push is the force."
  }
};
