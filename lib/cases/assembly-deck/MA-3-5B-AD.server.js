// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.3.5B-AD",
  "title": "Chairs for the Assembly",
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
        "r1p5": "Teachers are not chairs. The question does not need 3.",
        "r1p6": "The notes never say how many students are absent."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the array.",
        "r1p3": "This is the leftover row.",
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
        "r2p5": "Adding 7 and 8 counts the labels, not the chairs in the rows.",
        "r2p6": "The picture has 7 rows of 8, and the short row stays."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the array equation.",
        "r2p2": "This adds the leftover row.",
        "r2p3": "This says what c means.",
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
        "r3p5": "56 is only the full rows. The short row still has to be added.",
        "r3p6": "61 with no unit does not say 61 what. The answer needs the word chairs."
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
  "assemblyNote": "The piece states the rows, then the equations. The 61 chairs come last.",
  "decoyProtest": {
    "r1p5": "Teachers need chairs too, probably.",
    "r1p6": "Absent is a school number.",
    "r2p5": "All the digits should be added.",
    "r2p6": "Eight and seven are the same fact family.",
    "r3p5": "56 is the big step, so it is the answer.",
    "r3p6": "The unit is obvious."
  },
  "requester": {
    "name": "Coach Reyes",
    "emoji": "🚌",
    "replies": {
      "great": "Setup accepted. 56 in the full rows, plus 5, is 61 chairs.",
      "good": "Setup accepted. The rows are mostly right. Read the leftovers so 56 does not get called the total.",
      "rough": "I have the work. Come read it with me. Part of this counts chairs, and part of it counts the labels."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "There are 56 chairs, because 7 times 8 is the whole job.",
    "why": "56 is only the full rows. The leftover row adds 5 more, so there are 61 chairs."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says there are 61 chairs.",
    "pinpointMiss": "That sentence may belong. It does not say there are 61 chairs.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 7 × 8 = 56, and 56 + 5 = 61.",
      "b": "56 leaves out the short row.",
      "c": "3 teachers are not part of the chair count.",
      "d": "7 + 8 + 5 adds the labels. It does not count the chairs."
    }
  },
  "mustInclude": [
    "Shows 7 × 8 = 56.",
    "Adds the 5 leftover chairs.",
    "Says there are 61 chairs."
  ],
  "modelAnswer": "There are 7 × 8 = 56 chairs in the full rows. The short row adds 5. There are 61 chairs. Check: 61 - 5 = 56.",
  "aiContext": "Grade 3 Math, TEKS 3.5B. 7 rows of 8 chairs is 56. One leftover row of 5 makes 61 chairs. Check: 61 - 5 = 56 and 56 = 7 × 8. Do not accept 7 + 8 + 5, an array of 8 rows of 7 with the 5 omitted, 56 as the final answer, 61 with no unit, or the 3 teachers. Absent students are unknown. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "full",
      "all"
    ],
    "walkLine": "The full rows have to be counted before the total can include them.",
    "why": {
      "a": "Yes. Without 7 × 8, the total of 61 fails.",
      "b": "The rows are the start. Skipping the product does not erase them.",
      "c": "7 + 8 + 5 is the wrong operation.",
      "d": "Skipping the product does not make 56 the final answer."
    }
  },
  "look": {
    "key": "rows",
    "hint": "Count the blue rows, then the short orange row.",
    "why": "Yes. Seven rows of eight, plus five."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say to add 7, 8, and 5.",
    "why": "Yes. 7 and 8 tell the size of the array. They are not three separate chairs."
  }
};
