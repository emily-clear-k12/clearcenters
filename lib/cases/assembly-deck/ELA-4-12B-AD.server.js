// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.4.12B-AD",
  "title": "How the Cafeteria Line Works",
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
        "r1p5": "Cutting in is an opinion about what feels better. The notes describe the real order.",
        "r1p6": "A moon launch is not this cafeteria."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This is the first action.",
        "r1p3": "This is the direction.",
        "r1p4": "This ties the start to the central idea, so it goes last."
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
        "r2p5": "The notes say the opposite. Hot food is first and milk is last.",
        "r2p6": "The notes say a stop to talk slows the whole line."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This says what is first.",
        "r2p3": "This says what comes next.",
        "r2p4": "This names the central idea, so it goes last."
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
        "r3p5": "The notes never say running is required. Keeping the order is what works.",
        "r3p6": "A food opinion is not information about how the line works."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says what slows the line.",
        "r3p3": "This says when everyone is seated.",
        "r3p4": "This explains the cause, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the start, then the food order. How the line finishes comes last.",
  "decoyProtest": {
    "r1p5": "Friends are a system.",
    "r1p6": "Lunch, moon, both involve trays.",
    "r2p5": "I read the line backward.",
    "r2p6": "Talking is a food group.",
    "r3p5": "Running is informational if you are late.",
    "r3p6": "Pizza opinions are data."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. A new student could follow the order and would know not to stop the line.",
      "good": "Explanation accepted. The order is mostly clear. Read the leftovers so a complaint does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this explains the line, and part of it is a feeling about lunch."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The real rule is to stop and talk, because the order does not matter.",
    "why": "The notes say a stop to talk slows everyone. The order is the central idea."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says hot food is first.",
    "pinpointMiss": "That sentence may be true. It does not say hot food is first.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Hot food, fruit, then milk, and kids have to keep moving.",
      "b": "That flips the order and ignores what a stop does to the line.",
      "c": "Cutting in is not the system the notes describe.",
      "d": "A pizza opinion does not explain the line."
    }
  },
  "mustInclude": [
    "Gives the food order, with hot food before milk.",
    "Says students pick up a tray or move in one direction.",
    "Says stopping to talk slows the line, or that keeping moving gets them seated before the bell."
  ],
  "modelAnswer": "Students pick up a tray and move to the right. Hot food is first, fruit is second, and milk is last. If kids stop to talk, the line slows. If they keep moving, everyone sits before the bell.",
  "aiContext": "Grade 4 ELAR, TEKS 4.12B informational text. Central idea: the cafeteria line has a fixed order (enter, tray, right, hot food, fruit, milk) and finishes before the bell only if students keep moving. A stop to talk slows everyone. Do not accept cutting in, running, reversed order, or a pizza complaint. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "move",
      "seat"
    ],
    "walkLine": "Keeping moving is what gets everyone seated before the bell.",
    "why": {
      "a": "Yes. If the line stops, sitting down before the bell fails.",
      "b": "The doorway is still there. It comes before the moving.",
      "c": "The notes say talking slows the line. It does not speed it up.",
      "d": "They do not sit sooner. The on-time ending is what fails."
    }
  },
  "look": {
    "key": "order",
    "hint": "Follow the arrows. Kids enter in a line, carry trays past the food, and then sit and eat.",
    "why": "Yes. That is the line in order."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say kids may stop and talk as long as they want.",
    "why": "Yes. A stop to talk slows the whole line."
  }
};
