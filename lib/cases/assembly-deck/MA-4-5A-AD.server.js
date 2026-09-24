// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.4.5A-AD",
  "title": "The Field Trip Buses",
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
        "r1p5": "The question asks for students, not the cost of a ticket.",
        "r1p6": "The notes never say how many buses the museum owns."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the equal groups.",
        "r1p3": "This is the extra part.",
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
        "r2p5": "Adding 3, 36, and 14 mixes labels with seats. The 3 tells how many groups of 36.",
        "r2p6": "The equal parts are 36 seats. 14 is the short extra part, not the other way around."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This finds the full buses.",
        "r2p2": "This adds the students still waiting.",
        "r2p3": "This says what s means.",
        "r2p4": "This matches the strip, so it goes last."
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
        "r3p5": "108 is only the full buses. The 14 students still waiting have to be added.",
        "r3p6": "Naming the answer again does not test it."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is step one.",
        "r3p2": "This is step two.",
        "r3p3": "This is the labeled answer.",
        "r3p4": "This tests the answer, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the buses, then the letter. The 122 students come last.",
  "decoyProtest": {
    "r1p5": "Money is always part of a trip.",
    "r1p6": "Museums have buses. I asked.",
    "r2p5": "A plus sign is safer than a times sign.",
    "r2p6": "I swapped the parts. The total is the same if you squint.",
    "r3p5": "108 is the computed number.",
    "r3p6": "Finishing is the check."
  },
  "requester": {
    "name": "Coach Reyes",
    "emoji": "🚌",
    "replies": {
      "great": "Count accepted. s is all the students, and that number is 122.",
      "good": "Count accepted. The buses are mostly right. Read the leftovers so 108 is not treated as the whole trip.",
      "rough": "I have the work. Come read it with me. Part of this uses the letter, and part of it adds the wrong things."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "108 students are going, because the full buses are the whole trip.",
    "why": "108 is only the full buses. 14 more students still need seats, so 108 + 14 = 122."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence says s stands for all the students.",
    "pinpointMiss": "That sentence may belong. It does not say what s stands for.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 3 × 36 = 108, and 108 + 14 = 122.",
      "b": "108 leaves out the 14 students who still need seats.",
      "c": "The ticket price is not this question.",
      "d": "3 + 36 + 14 adds labels and seats together."
    }
  },
  "mustInclude": [
    "Says the letter stands for all the students, or writes an equation for that unknown.",
    "Shows 3 × 36 = 108 and then adds 14.",
    "Says 122 students are going."
  ],
  "modelAnswer": "Let s stand for all the students. 3 × 36 = 108 on the full buses, and s = 108 + 14 = 122. Check: 122 - 14 = 108.",
  "aiContext": "Grade 4 Math, TEKS 4.5A multi-step with a letter for the unknown. 3 buses × 36 seats = 108. 14 more students. Total s = 122. The $8 ticket is unused. Museum bus count is unknown. Do not accept 3 + 36 + 14, strips reversed so 14 is the equal part, 108 as the final answer, or a check that only repeats 122. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "full",
      "all"
    ],
    "walkLine": "The product of the full buses is part of the total.",
    "why": {
      "a": "Yes. Without 108, the total of 122 fails.",
      "b": "The buses are still in the problem.",
      "c": "The ticket price does not count students.",
      "d": "Skipping the product does not make 108 the final answer."
    }
  },
  "look": {
    "key": "strip",
    "hint": "Three matching long bars, then one short bar.",
    "why": "Yes. Three groups of 36, plus 14."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never make 14 the equal part.",
    "why": "Yes. The equal strips are the 36-seat buses."
  }
};
