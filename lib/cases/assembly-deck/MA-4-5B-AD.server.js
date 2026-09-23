// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.4.5B-AD",
  "title": "The Sticker Machine",
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
        "r1p5": "Adding 3 would turn 2 into 5, but the table says 7.",
        "r1p6": "The notes never say the color of the stickers."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is one row.",
        "r1p3": "This is another row.",
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
        "r2p5": "n + 3 does not fit the table. 2 + 3 is 5, not 7.",
        "r2p6": "The rule has two parts. Dropping the +1 misses the table."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the rule.",
        "r2p2": "This is the rule used on 6.",
        "r2p3": "This says what n means.",
        "r2p4": "This matches the table, so it goes last."
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
        "r3p5": "18 is only the multiplication. The rule still adds 1.",
        "r3p6": "A real check uses a row you already know, such as 4 to 13."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is step one.",
        "r3p2": "This is step two.",
        "r3p3": "This is the labeled answer.",
        "r3p4": "This tests the rule on a known row, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the table, then the rule. The 19 stickers come last.",
  "decoyProtest": {
    "r1p5": "Plus 3 is a classic machine.",
    "r1p6": "Stickers have colors.",
    "r2p5": "Simpler rules are kinder.",
    "r2p6": "18 is so close.",
    "r3p5": "The times step is the real work.",
    "r3p6": "Getting 19 proves 19."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Rule accepted. 3 × n + 1, and 6 gives 19 stickers.",
      "good": "Rule accepted. The table is mostly right. Read the leftovers so a close rule does not replace this one.",
      "rough": "I have the work. Come read it with me. Part of this fits the table, and part of it is a different machine."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The machine adds 3, so 6 gives 9 stickers.",
    "why": "Adding 3 does not fit. 2 would give 5, but the table says 7. The rule is 3 × n + 1, so 6 gives 19."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p1"
    ],
    "pinpointWhy": "Right. That sentence says the rule is 3 × n + 1.",
    "pinpointMiss": "That sentence may belong. It does not state the rule 3 × n + 1.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 3 × 6 + 1 = 19.",
      "b": "18 forgets to add 1.",
      "c": "Adding 3 does not fit the table.",
      "d": "The notes never give a color."
    }
  },
  "mustInclude": [
    "States the rule as multiply by 3, then add 1.",
    "Says 19 stickers come out for an input of 6.",
    "Checks the rule against a known row."
  ],
  "modelAnswer": "The rule is 3 × n + 1. When 6 goes in, 3 × 6 + 1 = 19 stickers come out. Check: 3 × 4 + 1 = 13, which matches the table.",
  "aiContext": "Grade 4 Math, TEKS 4.5B input-output rule. Rule is 3n + 1. Rows: 1→4, 2→7, 4→13. For 6, 3×6+1 = 19. A check is 3×4+1 = 13. Adding 3 does not fit because 2+3 = 5, not 7. Color is unknown. Do not accept n+3, 18 as the final output, or a check that only repeats 19. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "rule",
      "out"
    ],
    "walkLine": "The rule is what produces the output for 6.",
    "why": {
      "a": "Yes. Without the rule, 19 does not follow.",
      "b": "The table is still there. It is how you found the rule.",
      "c": "Adding 3 does not fit the rows.",
      "d": "Dropping the whole rule does not leave 18. 18 is a partial step."
    }
  },
  "look": {
    "key": "table",
    "hint": "Read the in column and the out column, including the question mark on 6.",
    "why": "Yes. 1 gives 4, 2 gives 7, 4 gives 13, and 6 is still open."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the machine adds 3.",
    "why": "Yes. 2 + 3 would be 5, and the table says 7."
  }
};
