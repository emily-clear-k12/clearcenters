// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.3.12D-AD",
  "title": "The Letter to the Fire Station",
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
        "r1p5": "A snack drawer is not who this letter is for.",
        "r1p6": "The notes say Tuesday, not Saturday."
      },
      "decoyReason": {
        "r1p5": "offtopic",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This opens the letter and names the thank-you.",
        "r1p2": "This says when they came.",
        "r1p3": "This says which class.",
        "r1p4": "This tells why the letter exists, so it goes last."
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
        "r2p5": "Pizza is a demand, not a thank-you. The notes do not mention food.",
        "r2p6": "The notes say three students sat in the truck, not the whole town."
      },
      "decoyReason": {
        "r2p5": "opinion",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what this part is about.",
        "r2p2": "This names the truck and the hose.",
        "r2p3": "This names the safety lesson.",
        "r2p4": "This says why the details belong, so it goes last."
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
        "r3p5": "A puppy is not a thank-you, and it is not in the notes.",
        "r3p6": "The notes say the letter ends with the class name. Hiding it is the opposite."
      },
      "decoyReason": {
        "r3p5": "offtopic",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what this part is about.",
        "r3p2": "This says thank you again.",
        "r3p3": "This signs the class.",
        "r3p4": "This says why the close matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The letter says who it is for, then what the firefighters did. The close and the class name come last.",
  "decoyProtest": {
    "r1p5": "Crackers are heroes.",
    "r1p6": "Saturday feels more official.",
    "r2p5": "Pizza is a kind of hose.",
    "r2p6": "Three is basically a town.",
    "r3p5": "A puppy is gratitude.",
    "r3p6": "Mystery letters are braver."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Letter accepted. You named the visit, thanked them for real help, and closed with the class.",
      "good": "Letter accepted. The thanks is mostly clear. Read the leftovers so a demand does not sneak in.",
      "rough": "I have the letter. Come read it with me. Part of this says thank you, and part of it asks for something else."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Next time, bring pizza, or the thank-you does not count.",
    "why": "That is a demand. A thank-you names the help. It does not charge a price."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence names stop, drop, and roll.",
    "pinpointMiss": "That sentence may belong in the letter. It does not name the safety lesson.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. A thank-you names the visit and the real help.",
      "b": "Pizza is a demand, not thanks.",
      "c": "The letter should end with the class name.",
      "d": "The letter is for the firefighters, not a snack drawer."
    }
  },
  "mustInclude": [
    "Says thank you to the firefighters.",
    "Names something they did, such as the truck, the hose, or stop, drop, and roll.",
    "Does not turn the letter into a demand for a prize."
  ],
  "modelAnswer": "Dear firefighters, thank you for visiting on Tuesday. You showed us the truck and the hose, and you taught us to stop, drop, and roll. From, Room 12.",
  "aiContext": "Grade 3 ELAR, TEKS 3.12D thank-you letter. Audience is the firefighters. They came Tuesday, showed the truck and hose, taught stop drop and roll, and let three students sit in the truck. Close with the class name. Do not accept pizza, a puppy, Saturday, the whole town, or a hidden name. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "thanks",
      "close"
    ],
    "walkLine": "The heart is the thanks. The envelope comes after it.",
    "why": {
      "a": "Yes. A blank card gives the envelope nothing to carry.",
      "b": "The visit still happened. It comes before the card.",
      "c": "A blank card does not say thank you.",
      "d": "Pizza is not what the card is for."
    }
  },
  "look": {
    "key": "card",
    "hint": "Follow the arrows. A fire truck and a class, a card with a heart, then an envelope.",
    "why": "Yes. The visit leads to a thank-you card."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say the class asked for pizza.",
    "why": "Yes. The letter thanks them. It does not ask for food."
  }
};
