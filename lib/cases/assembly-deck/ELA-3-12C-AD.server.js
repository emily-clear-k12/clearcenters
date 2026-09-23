// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.3.12C-AD",
  "title": "Keep the Library Open at Lunch",
  "rounds": {
    "r1": {
      "key": {
        "topic": [
          "r1p1"
        ],
        "details": [
          "r1p2",
          "r1p3"
        ],
        "conclusion": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "That says the opposite of the opinion the notes support.",
        "r1p6": "A sandwich is not a reason to open the library."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This states the opinion.",
        "r1p2": "This says the door is locked.",
        "r1p3": "This says where the kids end up.",
        "r1p4": "This makes the ask, so it goes last."
      }
    },
    "r2": {
      "key": {
        "topic": [
          "r2p1"
        ],
        "details": [
          "r2p2",
          "r2p3"
        ],
        "conclusion": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "The notes count eighteen kids. They do not say everyone in the world.",
        "r2p6": "The notes show kids with no table. They do not call the floor a fine place."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what this part is about.",
        "r2p2": "This is the count.",
        "r2p3": "This is what the librarian offered.",
        "r2p4": "This says why the facts matter, so it goes last."
      }
    },
    "r3": {
      "key": {
        "topic": [
          "r3p1"
        ],
        "details": [
          "r3p2",
          "r3p3"
        ],
        "conclusion": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "That ignores the worry. The notes answer it with quiet reading.",
        "r3p6": "The gym and the art room are not in these notes."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what this part is about.",
        "r3p2": "This names the worry.",
        "r3p3": "This gives the answer.",
        "r3p4": "This says why the answer matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the opinion, then the reasons. The answer to the worry comes last.",
  "decoyProtest": {
    "r1p5": "Boring is data. I measured my yawn.",
    "r1p6": "A soggy sandwich is a source.",
    "r2p5": "The world texted me.",
    "r2p6": "Floors build character.",
    "r3p5": "Loud is a plan.",
    "r3p6": "I added rooms. More rooms, more right."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Opinion accepted. You asked clearly, used the eighteen kids, and answered the noise worry.",
      "good": "Opinion accepted. The ask is mostly solid. Read the leftovers so a plain wish does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is a reason, and part of it is only a feeling."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "We should open it because I said so, and that is the only reason.",
    "why": "I said so is not a reason. The notes give eighteen kids and a plan with two teachers."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence is the quiet-reading rule.",
    "pinpointMiss": "That sentence may be useful. It is not the rule that answers the worry.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Eighteen kids with books and no table is a fact from the notes.",
      "b": "Boring is an opinion, and it argues the wrong way.",
      "c": "The notes never say everyone in the world.",
      "d": "A sandwich is not about the library."
    }
  },
  "mustInclude": [
    "Says the library should stay open at lunch.",
    "Uses a note, such as eighteen kids, the locked door, or two teachers.",
    "Mentions quiet reading or the worry about noise."
  ],
  "modelAnswer": "The library should stay open at lunch. Eighteen kids sat in the hall with books and no table. If people worry about noise, the rule can be quiet reading only.",
  "aiContext": "Grade 3 ELAR, TEKS 3.12C opinion. Claim: keep the library open at lunch. Evidence: door locked, 18 kids on the hall floor with books, librarian will open it if two teachers take turns, quiet reading only answers the noise worry. Do not accept insults, soggy sandwiches, everyone-in-the-world, or ignore-them. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "kids",
      "rule",
      "ask"
    ],
    "walkLine": "The kids in the hall are the reason. The rule and the ask need them.",
    "why": {
      "a": "Yes. Without those kids, the reason and the ask have nothing to stand on.",
      "b": "The locked door is still there. It comes before the kids.",
      "c": "A wish is not a reason. The kids are the evidence.",
      "d": "The ask does not get louder. It goes dark."
    }
  },
  "look": {
    "key": "hall",
    "hint": "Follow the arrows. A closed door, kids with books in the hall, then kids reading at tables.",
    "why": "Yes. That picture matches the notes."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say the hall floor is a fine place to read.",
    "why": "Yes. The kids needed a table. The floor was the problem."
  }
};
