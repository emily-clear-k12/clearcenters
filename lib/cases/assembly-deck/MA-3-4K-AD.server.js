// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.3.4K-AD",
  "title": "The Garden Beds",
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
        "r1p5": "Feet of width are not seeds. The question does not need 3.",
        "r1p6": "The notes never say how tall the plants will grow."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the array in one bed.",
        "r1p3": "This is the number of beds.",
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
        "r2p5": "Adding 6, 4, and 2 does not count the seeds in the rows.",
        "r2p6": "Both beds are planted. A picture with one bed leaves half the seeds out."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is one bed.",
        "r2p2": "This is both beds.",
        "r2p3": "This says what t means.",
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
        "r3p5": "24 is one bed. The question asks for both beds.",
        "r3p6": "48 with no unit does not say 48 what."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
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
  "assemblyNote": "The piece states the beds, then the equations. The 48 seeds come last.",
  "decoyProtest": {
    "r1p5": "Width is a size, and size is math.",
    "r1p6": "Plants grow. That is the garden.",
    "r2p5": "Three numbers should be added.",
    "r2p6": "One bed shows the pattern.",
    "r3p5": "24 is the multiplication, so it is the answer.",
    "r3p6": "Seeds is implied."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Planting list accepted. 24 seeds in one bed, and 48 in both.",
      "good": "Planting list accepted. The arrays are mostly right. Read the leftovers so one bed does not replace both.",
      "rough": "I have the work. Come read it with me. Part of this counts seeds, and part of it counts feet or labels."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "There are 24 seeds, because one bed is the whole garden.",
    "why": "24 is one bed. There are 2 beds, so 24 × 2 = 48 seeds."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says there are 48 seeds.",
    "pinpointMiss": "That sentence may belong. It does not say there are 48 seeds.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 6 × 4 = 24, and 24 × 2 = 48.",
      "b": "24 is one bed, not both.",
      "c": "3 feet is the width, not the seeds.",
      "d": "6 + 4 + 2 adds the labels."
    }
  },
  "mustInclude": [
    "Shows 6 × 4 = 24 in one bed.",
    "Multiplies by 2 beds.",
    "Says there are 48 seeds."
  ],
  "modelAnswer": "One bed has 6 × 4 = 24 seeds. Two beds have 24 × 2 = 48 seeds. Check: 48 ÷ 2 = 24.",
  "aiContext": "Grade 3 Math, TEKS 3.4K two-step multiplication within 100. Each bed is 6 rows of 4 seeds, so 24. Two beds make 48. Check: 48 ÷ 2 = 24 and 24 = 6 × 4. The 3-foot width is unused. Plant height is unknown. Do not accept 6 + 4 + 2, one bed as the final answer, or 48 with no unit. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "one",
      "both"
    ],
    "walkLine": "The seeds in one bed are what you double.",
    "why": {
      "a": "Yes. Without 24, the total of 48 fails.",
      "b": "The beds are still there.",
      "c": "3 feet does not count seeds.",
      "d": "Skipping one bed does not make 24 the final answer."
    }
  },
  "look": {
    "key": "two",
    "hint": "There are two arrays, and each has six rows of four.",
    "why": "Yes. The two beds match."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say how tall the plants will grow.",
    "why": "Yes. That question cannot be answered from these notes."
  }
};
