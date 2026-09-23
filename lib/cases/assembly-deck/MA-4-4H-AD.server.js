// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.4.4H-AD",
  "title": "What the Remainder Means",
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
        "r1p5": "4 × 6 is 24, not 25. The division is not exact.",
        "r1p6": "10 vans is not used. The question is about this group of 25."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "unsupported"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "These are the numbers.",
        "r1p3": "This is the division.",
        "r1p4": "This names the remainder, so it goes last."
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
        "r2p5": "4 vans leave 1 student out. Everyone has to ride, so you need another van.",
        "r2p6": "1 is the remainder, the student left over. It is not the number of vans."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This shows what the full vans hold.",
        "r2p2": "This rounds up for the leftover student.",
        "r2p3": "This says what v means.",
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
        "r3p5": "5 is the number of vans if you round up. It is not the number of students left over.",
        "r3p6": "Saying the remainder again is not a check. 4 × 6 + 1 = 25 tests it."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This is the group size.",
        "r3p2": "This is what the full vans hold.",
        "r3p3": "This is the remainder as students.",
        "r3p4": "This rebuilds 25, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the division, then the vans everyone needs. The leftover student comes last.",
  "decoyProtest": {
    "r1p5": "Remainders are messy. Exact is cleaner.",
    "r1p6": "Ten is a van number.",
    "r2p5": "Four is the quotient, so four is the answer.",
    "r2p6": "The remainder is the exciting part.",
    "r3p5": "Five was an answer already, so I reused it.",
    "r3p6": "Naming it is checking it."
  },
  "requester": {
    "name": "Coach Reyes",
    "emoji": "🚌",
    "replies": {
      "great": "Plan accepted. 4 remainder 1, five vans so everyone rides, and one student left over.",
      "good": "Plan accepted. The division is mostly right. Read the leftovers so the remainder is not used as the wrong kind of answer.",
      "rough": "I have the work. Come read it with me. Part of this keeps the remainder, and part of it throws the remainder away."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Order 4 vans. The leftover student can wait for another day.",
    "why": "The notes say everyone needs a ride. 4 vans hold 24, so the leftover student means you need 5 vans."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p4"
    ],
    "pinpointWhy": "Right. That sentence checks the division by rebuilding 25.",
    "pinpointMiss": "That sentence may belong. It does not show 4 × 6 + 1 = 25.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 4 vans leave one student out, so you need 5.",
      "b": "4 vans hold only 24 students.",
      "c": "1 is the student left over, not the number of vans.",
      "d": "10 is how many vans the school owns. It is not this answer."
    }
  },
  "mustInclude": [
    "States 25 ÷ 6 as 4 remainder 1, or 4 × 6 + 1 = 25.",
    "Says 5 vans are needed so everyone rides.",
    "Says 1 student is left over, and does not call that 5 students."
  ],
  "modelAnswer": "25 ÷ 6 = 4 remainder 1, because 4 × 6 + 1 = 25. You need 5 vans so everyone rides. The remainder means 1 student is left over.",
  "aiContext": "Grade 4 Math, TEKS 4.4H interpreting remainders. 25 students, 6 per van. 25 ÷ 6 = 4 remainder 1. 4 × 6 = 24. If everyone must ride, round up to 5 vans. The remainder as a quantity is 1 student, not 5. The school owns 10 vans, which is unused. Do not accept an exact quotient, v = 4 when everyone must ride, v = 1 as the van count, 5 students left over, or a check that only repeats the remainder. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "groups",
      "left"
    ],
    "walkLine": "The leftover only exists because the groups of 6 do not use every student.",
    "why": {
      "a": "Yes. Without groups of 6, the 1 student left over has no meaning.",
      "b": "The 25 students are still there.",
      "c": "10 vans is not this problem's answer.",
      "d": "Skipping the groups does not turn the remainder into 5."
    }
  },
  "look": {
    "key": "out",
    "hint": "Four vans, and one student who is not inside any of them.",
    "why": "Yes. Four full groups, and one left over."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say 25 ÷ 6 is exact.",
    "why": "Yes. 4 × 6 is 24, so one student is left."
  }
};
