// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.5.4B-AD",
  "title": "The Concession Stand",
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
        "r1p5": "Hours open do not change the profit in these notes. 5 is not needed.",
        "r1p6": "The notes never say how many people were in the gym."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "These are the sales.",
        "r1p3": "This is the cost.",
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
        "r2p5": "46 and 31 are counts of items. Profit uses the money, so each count has to be multiplied by its price.",
        "r2p6": "That equation is the sales. Profit still subtracts the $80 cost."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the sales equation.",
        "r2p2": "This subtracts the cost.",
        "r2p3": "This says what p means.",
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
        "r3p5": "$200 is the sales. Profit is what remains after the $80 cost.",
        "r3p6": "The last step is not a check. Putting the cost back should return the sales."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is step one.",
        "r3p2": "This is the sales.",
        "r3p3": "This is the labeled profit.",
        "r3p4": "This tests the profit, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the sales and the cost, then the equation. The $120 profit comes last.",
  "decoyProtest": {
    "r1p5": "Time is a business number.",
    "r1p6": "Crowds buy food.",
    "r2p5": "Counts are easier than prices.",
    "r2p6": "Sales sounds like the success.",
    "r3p5": "$200 is the impressive number.",
    "r3p6": "The last number is always the answer, and the check."
  },
  "requester": {
    "name": "Coach Reyes",
    "emoji": "🚌",
    "replies": {
      "great": "Books accepted. Sales were $200, the cost was $80, and the profit was $120.",
      "good": "Books accepted. The money is mostly right. Read the leftovers so sales are not labeled as profit.",
      "rough": "I have the work. Come read it with me. Part of this is profit, and part of it is only the sales."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The profit is $200, because that is what the stand brought in.",
    "why": "$200 is the sales. The food cost $80, so the profit is 200 - 80 = 120."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the profit is $120.",
    "pinpointMiss": "That sentence may belong. It does not say the profit is $120.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Sales are $200, and 200 - 80 = 120.",
      "b": "$200 is the sales, before the cost.",
      "c": "5 hours is not used in the profit.",
      "d": "46 + 31 - 80 adds items, not money."
    }
  },
  "mustInclude": [
    "Finds the sales from 46 × 3 and 31 × 2, totaling $200.",
    "Subtracts the $80 cost.",
    "Says the profit is $120, and does not call the sales the profit."
  ],
  "modelAnswer": "Let p stand for the profit. Sales are 46 × 3 + 31 × 2 = 200 dollars. The profit is 200 - 80 = 120 dollars. Check: 120 + 80 = 200.",
  "aiContext": "Grade 5 Math, TEKS 5.4B multi-step with a letter for the unknown. 46 hot dogs at $3 = $138. 31 drinks at $2 = $62. Sales = $200. Cost = $80. Profit p = $120. Check: 120 + 80 = 200 and 138 + 62 = 200. Five hours is unused. Gym attendance is unknown. Do not accept 46 + 31 - 80, sales without subtracting cost, $200 as profit, or a check that only repeats 120. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "cost",
      "profit"
    ],
    "walkLine": "The cost is what turns sales into profit.",
    "why": {
      "a": "Yes. Without subtracting $80, the $120 profit fails.",
      "b": "The sales are still there. They come before the cost.",
      "c": "Sales and profit are not the same once there is a cost.",
      "d": "Leaving the cost out is exactly how someone mistakes $200 for the profit. The profit itself fails."
    }
  },
  "look": {
    "key": "off",
    "hint": "Two coin stacks, an arrow, and a smaller stack set apart.",
    "why": "Yes. Sales, then the cost taken away."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never stop at the sales.",
    "why": "Yes. Profit still subtracts the $80."
  }
};
