// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.3.5A-AD",
  "title": "The Book Drive",
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
        "r1p5": "The question is about books, not students. 22 is not needed.",
        "r1p6": "The notes never give the pages in a book. That question cannot be answered."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is one number the question needs.",
        "r1p3": "This is the other number the question needs.",
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
        "r2p5": "The rooms are joined, not subtracted. The first step is addition.",
        "r2p6": "22 students and the goal do not make the missing books."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the first equation.",
        "r2p2": "This is the second equation.",
        "r2p3": "This says what n means.",
        "r2p4": "This matches the bar, so it goes last."
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
        "r3p5": "423 is the first step. The question asks how many are still needed.",
        "r3p6": "Saying the answer again is not a check. A check has to test it."
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
  "assemblyNote": "The piece states the problem, then the equations. The 77 comes last.",
  "decoyProtest": {
    "r1p5": "Students are in the room. Rooms are the problem.",
    "r1p6": "Books have pages. I asked about books.",
    "r2p5": "Subtracting makes a smaller, tidier number.",
    "r2p6": "22 and 500 are both in the notes.",
    "r3p5": "423 came first, so it is the answer.",
    "r3p6": "Repeating it is a kind of checking."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Count accepted. 423 books so far, and 77 still needed. The check lands on 500.",
      "good": "Count accepted. The work is mostly right. Read the leftovers so a first step does not replace the answer.",
      "rough": "I have the work. Come read it with me. Part of this reaches 500, and part of it stops too early."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "They need 423 more books to reach the goal.",
    "why": "423 is how many they already have. They still need 77, because 500 - 423 = 77."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says they need 77 more books.",
    "pinpointMiss": "That sentence may belong. It does not say they need 77 more books.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 248 + 175 = 423, and 500 - 423 = 77.",
      "b": "423 is the first step, not the books still needed.",
      "c": "22 students is not used in this question.",
      "d": "The notes never give the pages."
    }
  },
  "mustInclude": [
    "Adds 248 and 175 and gets 423.",
    "Says 77 more books are needed.",
    "Checks with 423 + 77 = 500, or an equivalent check."
  ],
  "modelAnswer": "The rooms have 248 + 175 = 423 books. They need 500 - 423 = 77 more books. Check: 423 + 77 = 500.",
  "aiContext": "Grade 3 Math, TEKS 3.5A two-step addition and subtraction to 1,000. Room 12 brought 248 books, Room 15 brought 175. Sum is 423. Goal is 500, so 77 more are needed. Check: 423 + 77 = 500. 22 students is unused. Pages per book are unknown. Do not accept 248 - 175, 22 + 500, 423 as the final answer, or a check that only repeats 77. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "sum",
      "need"
    ],
    "walkLine": "The sum is what the missing books are subtracted from the goal with.",
    "why": {
      "a": "Yes. Without the sum, you cannot find the 77.",
      "b": "The rooms are still there. They come first.",
      "c": "22 students does not answer the book question.",
      "d": "Skipping the sum does not make 423 the final answer."
    }
  },
  "look": {
    "key": "gap",
    "hint": "Look for a long bar that is almost full, with a gap at the end.",
    "why": "Yes. The filled part is the books so far. The gap is what is still needed."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say how many pages are in a book.",
    "why": "Yes. That question cannot be answered from these notes."
  }
};
