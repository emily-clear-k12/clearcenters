// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.3.8B-AD",
  "title": "The Pet Survey",
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
        "r1p5": "4 is the number of pictures, not students. Each picture stands for 2.",
        "r1p6": "Nicest is an opinion. The graph does not show it."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the scale.",
        "r1p3": "These are the pictures the question uses.",
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
        "r2p5": "4 - 1 subtracts pictures. The scale says to multiply by 2 first.",
        "r2p6": "The notes give a key. Each picture stands for 2, not 1."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This scales the dogs.",
        "r2p2": "This subtracts the scaled birds.",
        "r2p3": "This says what n means.",
        "r2p4": "This matches the graph, so it goes last."
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
        "r3p5": "3 comes from 4 - 1. That counts pictures and skips the scale.",
        "r3p6": "Saying 6 again is not a check. 2 + 6 = 8 tests it."
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
  "assemblyNote": "The piece gives the scale, then the equations. The difference of 6 comes last.",
  "decoyProtest": {
    "r1p5": "I counted what I could see.",
    "r1p6": "Every graph has a favorite.",
    "r2p5": "Subtracting the pictures is faster.",
    "r2p6": "A key is optional decoration.",
    "r3p5": "3 is the difference I can see.",
    "r3p6": "Repeating 6 checks it."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Reading accepted. You used the key, and 6 more students chose dogs.",
      "good": "Reading accepted. The graph is mostly right. Read the leftovers so the pictures are not treated as the count.",
      "rough": "I have the work. Come read it with me. Part of this uses the key, and part of it counts pictures."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "4 - 1 = 3, so 3 more students chose dogs.",
    "why": "4 and 1 are pictures. Each picture stands for 2 students, so the difference is 8 - 2 = 6."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says each picture stands for 2 students.",
    "pinpointMiss": "That sentence may belong. It does not say each picture stands for 2 students.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 4 × 2 = 8 and 1 × 2 = 2, so 8 - 2 = 6.",
      "b": "3 is 4 - 1. That skips the scale.",
      "c": "4 is the number of dog pictures, not students.",
      "d": "The graph cannot tell you which pet is nicest."
    }
  },
  "mustInclude": [
    "Uses the scale of 2, not the raw picture count.",
    "Gets 8 students for dogs and 2 for birds, or an equivalent use of the scale.",
    "Says 6 more students chose dogs."
  ],
  "modelAnswer": "Each picture stands for 2 students. Dogs are 4 × 2 = 8. Birds are 1 × 2 = 2. So 8 - 2 = 6 more students chose dogs.",
  "aiContext": "Grade 3 Math, TEKS 3.8B categorical data with a scaled interval. Each picture stands for 2 students. Dogs: 4 pictures = 8. Birds: 1 picture = 2. Difference: 6 more students chose dogs. Check: 2 + 6 = 8. Cats (3 pictures) and fish (2 pictures) are not needed. Do not accept 4 as the dog count, 4 - 1 = 3, a graph with no key, nicest pet, or a check that only repeats 6. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "scale",
      "diff"
    ],
    "walkLine": "The scale is what turns pictures into students.",
    "why": {
      "a": "Yes. Without the key, the difference of 6 fails.",
      "b": "The pictures are still there.",
      "c": "4 - 1 is not the same as 8 - 2.",
      "d": "Skipping the key does not make 4 the student count. That is the mistake."
    }
  },
  "look": {
    "key": "key",
    "hint": "The key shows one picture equal to two dots. Then count the dogs and the bird.",
    "why": "Yes. Four dogs, one bird, and a key of two."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say to subtract the pictures.",
    "why": "Yes. 4 - 1 skips the scale."
  }
};
