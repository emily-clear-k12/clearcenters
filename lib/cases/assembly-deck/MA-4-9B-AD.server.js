// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.4.9B-AD",
  "title": "Rainfall Week",
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
        "r1p5": "Temperature is not rainfall. This question does not need 70.",
        "r1p6": "Next Monday is not on this plot."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the greatest amount.",
        "r1p3": "This is the next amount.",
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
        "r2p5": "0.5 is the most common amount, not one of the two wettest days.",
        "r2p6": "The question says together, so the operation is addition, not subtraction."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the equation.",
        "r2p2": "This says which dots to use.",
        "r2p3": "This says what r means.",
        "r2p4": "This matches the plot, so it goes last."
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
        "r3p5": "2.0 is one day. The question asks for the two wettest days together.",
        "r3p6": "Bigger is not a check. Subtracting one addend should give the other."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is step one.",
        "r3p2": "This is step two.",
        "r3p3": "This is the labeled answer.",
        "r3p4": "This tests the sum, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names the two wettest days, then the equation. The 3.5 inches come last.",
  "decoyProtest": {
    "r1p5": "Weather is weather.",
    "r1p6": "A plot should predict.",
    "r2p5": "The crowded dots must be the important ones.",
    "r2p6": "Difference is a kind of together.",
    "r3p5": "The greatest day is the headline.",
    "r3p6": "Bigger numbers feel checked."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Reading accepted. The two wettest days total 3.5 inches, and the check returns 1.5.",
      "good": "Reading accepted. The plot is mostly right. Read the leftovers so the common amount is not treated as the wettest.",
      "rough": "I have the work. Come read it with me. Part of this answers the question that was asked, and part of it answers a different one."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The two 0.5 dots are the most important, so the total rain is 1.0 inch.",
    "why": "0.5 is the most common amount. The question asks for the two wettest days, 2.0 and 1.5, which total 3.5."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the two days total 3.5 inches.",
    "pinpointMiss": "That sentence may belong. It does not say the total is 3.5 inches.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 2.0 + 1.5 = 3.5.",
      "b": "2.0 is only the wettest day.",
      "c": "0.5 + 0.5 is the most common amount, not the two wettest days.",
      "d": "The question says together, so you add."
    }
  },
  "mustInclude": [
    "Identifies 2.0 and 1.5 as the two greatest amounts.",
    "Adds them to get 3.5 inches.",
    "Does not use 0.5 + 0.5 or 2.0 - 1.5 as the answer."
  ],
  "modelAnswer": "The two wettest days had 2.0 inches and 1.5 inches. Together that is 3.5 inches. Check: 3.5 - 2.0 = 1.5.",
  "aiContext": "Grade 4 Math, TEKS 4.9B data in decimal form on a dot plot. Five amounts: 0.5, 0.5, 1.0, 1.5, 2.0. The two greatest are 2.0 and 1.5. Sum is 3.5 inches. Check: 3.5 - 2.0 = 1.5. The mode 0.5 is a distractor. Temperature 70 and next week's rain are not answerable from the needed work. Do not accept 0.5 + 0.5, 2.0 - 1.5, 2.0 alone, or a check that only says 3.5 is bigger. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "pair",
      "sum"
    ],
    "walkLine": "The sum is of that pair, not of whatever dots are easiest to see.",
    "why": {
      "a": "Yes. Without the two wettest days, 3.5 does not follow.",
      "b": "The plot is still there.",
      "c": "The two 0.5 dots are the most common amount, not the wettest.",
      "d": "Skipping the pair does not make 2.0 the total."
    }
  },
  "look": {
    "key": "dots",
    "hint": "Two dots are stacked on 0.5. The rightmost dots are on 1.5 and 2.0.",
    "why": "Yes. That is the plot in the notes."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes ask for the two amounts together, not the difference.",
    "why": "Yes. Together means addition."
  }
};
