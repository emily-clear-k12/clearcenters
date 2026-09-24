// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.5.3K-AD",
  "title": "The Relay Splits",
  "rounds": {
    "r1": {
      "key": {
        "situation": [
          "r1p1"
        ],
        "numbers": [
          "r1p2",
          "r1p3"
        ],
        "question": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "The question is about time, not the length of the track.",
        "r1p6": "Hardest is an opinion. The times do not measure effort."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "These are the four times.",
        "r1p3": "This is the goal.",
        "r1p4": "This is the question, so it goes last."
      }
    },
    "r2": {
      "key": {
        "equation": [
          "r2p1",
          "r2p2"
        ],
        "letter": [
          "r2p3"
        ],
        "diagram": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "Under the goal means subtract the total from 250, not add it on.",
        "r2p6": "That sum uses only two runners. All four times belong in the total."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the total.",
        "r2p2": "This compares the total to the goal.",
        "r2p3": "This says what u means.",
        "r2p4": "This matches the picture, so it goes last."
      }
    },
    "r3": {
      "key": {
        "step1": [
          "r3p1"
        ],
        "step2": [
          "r3p2"
        ],
        "answer": [
          "r3p3"
        ],
        "check": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "240 is the team's total. The question asks how far under 250 that total is.",
        "r3p6": "Being smaller is not a check. Adding the 10 back should reach the goal."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is step one.",
        "r3p2": "This is the total.",
        "r3p3": "This is the labeled answer.",
        "r3p4": "This tests the difference, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the four times, then the equations. The 10 seconds under the goal come last.",
  "decoyProtest": {
    "r1p5": "Meters are a race fact.",
    "r1p6": "Effort explains times.",
    "r2p5": "Adding to the goal makes a bigger, better story.",
    "r2p6": "Two runners are a relay too.",
    "r3p5": "240 is the number I computed.",
    "r3p6": "Smaller means correct."
  },
  "requester": {
    "name": "Coach Reyes",
    "emoji": "🚌",
    "replies": {
      "great": "Times accepted. The team ran 240 seconds and finished 10 seconds under the goal.",
      "good": "Times accepted. The decimals are mostly right. Read the leftovers so the total is not mistaken for the answer.",
      "rough": "I have the work. Come read it with me. Part of this uses all four times, and part of it answers a different question."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The team finished in 240 seconds, so 240 is how far under the goal they were.",
    "why": "240 is the total time. The goal was 250, so they were 250 - 240 = 10 seconds under."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the team was 10 seconds under the goal.",
    "pinpointMiss": "That sentence may belong. It does not say they were 10 seconds under.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The total is 240, and 250 - 240 = 10.",
      "b": "240 is the total time, not the amount under the goal.",
      "c": "400 meters is not a time.",
      "d": "The times do not show who trained the hardest."
    }
  },
  "mustInclude": [
    "Adds all four times and gets 240 seconds.",
    "Subtracts from 250.",
    "Says the team was 10 seconds under the goal."
  ],
  "modelAnswer": "The splits add to 120 + 120 = 240 seconds. The goal was 250, so the team was 250 - 240 = 10 seconds under. Check: 240 + 10 = 250.",
  "aiContext": "Grade 5 Math, TEKS 5.3K adding and subtracting positive decimals. Times: 58.6, 61.4, 59.2, 60.8. Pair sums are each 120. Total is 240 seconds. Goal is 250. Difference is 10 seconds under. Check: 240 + 10 = 250. The 400-meter track is unused. Training effort is an opinion. Do not accept adding the total to 250, using only two runners, 240 as the final answer, or a check that only says 10 is smaller. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "total",
      "under"
    ],
    "walkLine": "The seconds under the goal are the goal minus the total.",
    "why": {
      "a": "Yes. Without the total, the 10 seconds under the goal fails.",
      "b": "The four times are still there.",
      "c": "400 meters does not answer a time question.",
      "d": "Skipping the total does not make 240 the amount under the goal."
    }
  },
  "look": {
    "key": "short",
    "hint": "Four short bars, then a gap, then a marker to the right.",
    "why": "Yes. The splits stop before the goal."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes include four times, not two.",
    "why": "Yes. Leaving out two runners drops part of the total."
  }
};
