// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.5.3L-AD",
  "title": "Cutting the Ribbon",
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
        "r1p5": "1/4 yard is the size of a piece. 4 yards would be longer than the whole ribbon.",
        "r1p6": "The notes never give the length of the room."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the whole.",
        "r1p3": "This is the size of one piece.",
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
        "r2p5": "Multiplying by 1/4 gives a fraction of a yard, not a count of pieces.",
        "r2p6": "1/4 ÷ 3 shares one small piece among 3 people. That is not this ribbon."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the division.",
        "r2p2": "This is the same question as multiplication.",
        "r2p3": "This says what n means.",
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
        "r3p5": "3 is the number of yards. The question asks for pieces, and each yard makes 4 of them.",
        "r3p6": "Bigger is not a check. Multiplying the pieces by 1/4 should return 3 yards."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is why the answer grows.",
        "r3p2": "This is the computation.",
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
  "assemblyNote": "The piece states the ribbon, then the division. The 12 pieces come last.",
  "decoyProtest": {
    "r1p5": "Four is in the fraction, so four yards felt available.",
    "r1p6": "Rooms are measured in yards.",
    "r2p5": "Times a fraction usually makes things smaller. I like smaller.",
    "r2p6": "Division can run in either direction.",
    "r3p5": "Three yards, three pieces.",
    "r3p6": "A bigger answer must be the point, so size is the check."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Cut list accepted. 3 yards make 12 pieces of 1/4 yard, and the check returns 3 yards.",
      "good": "Cut list accepted. The fraction is mostly right. Read the leftovers so a different division does not replace this one.",
      "rough": "I have the work. Come read it with me. Part of this counts pieces, and part of it is still counting yards."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "You get 3 pieces, because the ribbon is 3 yards and division makes numbers smaller.",
    "why": "Dividing by 1/4 asks how many fourths fit. Each yard makes 4 pieces, so 3 × 4 = 12. The answer is bigger because it counts pieces."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says you get 12 pieces.",
    "pinpointMiss": "That sentence may belong. It does not say you get 12 pieces.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 3 ÷ 1/4 = 12, because 3 × 4 = 12.",
      "b": "3 is the number of yards, not the number of pieces.",
      "c": "3 × 1/4 = 3/4. That is not a count of pieces.",
      "d": "1/4 ÷ 3 = 1/12. That shares one piece among 3 people."
    }
  },
  "mustInclude": [
    "Uses 3 ÷ 1/4 or 3 × 4.",
    "Says there are 12 pieces.",
    "Explains the answer is a count of pieces, or checks with 12 × 1/4 = 3."
  ],
  "modelAnswer": "3 ÷ 1/4 = 12, because each yard makes 4 pieces and 3 × 4 = 12. The answer is bigger than 3 because it counts pieces, not yards. Check: 12 × 1/4 = 3.",
  "aiContext": "Grade 5 Math, TEKS 5.3L dividing a whole number by a unit fraction. A 3-yard ribbon cut into 1/4-yard pieces gives 3 ÷ 1/4 = 12 pieces. Equivalent multiplication is 3 × 4 = 12. Check: 12 × 1/4 = 3 yards. The answer is larger because it counts pieces. Do not accept pieces of 4 yards, 3 × 1/4 = 3/4 as the piece count, 1/4 ÷ 3 = 1/12 for this question, 3 pieces, or a check that only says 12 is bigger. Room length is unknown. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "fourths",
      "pieces"
    ],
    "walkLine": "The fourths are what turn yards into a piece count.",
    "why": {
      "a": "Yes. Without the fourths, the 12 pieces fail.",
      "b": "The 3 yards are still there.",
      "c": "3 is the number of yards, not the number of pieces.",
      "d": "Skipping the fourths does not create the 1/12 sharing problem."
    }
  },
  "look": {
    "key": "four",
    "hint": "Three bars, each cut into four equal parts.",
    "why": "Yes. Three yards, four pieces in each."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never ask you to divide 1/4 by 3.",
    "why": "Yes. That would share one small piece. This ribbon is 3 yards cut into fourths."
  }
};
