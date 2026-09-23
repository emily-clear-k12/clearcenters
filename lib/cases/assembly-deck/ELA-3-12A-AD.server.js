// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.3.12A-AD",
  "title": "The Day the Bus Was Late",
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
        "r1p5": "Worst is an opinion. The notes tell what happened, not a ranking.",
        "r1p6": "A dog is not part of this morning."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This tells what this part is about.",
        "r1p2": "This says who was waiting.",
        "r1p3": "This says the bus did not come.",
        "r1p4": "This shows the day changed, so it goes last."
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
        "r2p5": "The notes say Ms. Alvarez walked with the class. They do not say the class ran alone.",
        "r2p6": "The notes say the bus never came."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what this part is about.",
        "r2p2": "This says who walked with the class.",
        "r2p3": "This says they arrived late.",
        "r2p4": "This says what the office did, so it goes last."
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
        "r3p5": "The notes say the opposite. The writer was scared, then calm.",
        "r3p6": "New shoes are not part of this morning."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what this part is about.",
        "r3p2": "This is the feeling at the start.",
        "r3p3": "This is the feeling at the end.",
        "r3p4": "This says why the change matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The story tells the problem, then what the class did. The feeling change comes last.",
  "decoyProtest": {
    "r1p5": "Yellow is a feeling. I ranked it.",
    "r1p6": "Pepper was there in my heart.",
    "r2p5": "We ran in my other draft.",
    "r2p6": "The bus came in a dream.",
    "r3p5": "Brave is my brand.",
    "r3p6": "Shoes are the plot."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Story accepted. You told the morning in order, and you showed the change from scared to calm.",
      "good": "Story accepted. The morning is mostly true. Read the leftovers so a different day does not sneak in.",
      "rough": "I have the story. Come read it with me. Part of this is what happened, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Nothing changed, because I am brave every single day.",
    "why": "The notes say the writer was scared at the stop and calm at the door. The feeling did change."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the writer was calm at the end.",
    "pinpointMiss": "That sentence may belong in the story. It does not say the writer was calm at the end.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. A personal narrative tells what happened, in order, and what changed.",
      "b": "A color ranking is an opinion, not this morning.",
      "c": "The dog is not in the notes.",
      "d": "The notes say the feeling did change."
    }
  },
  "mustInclude": [
    "Says the bus did not come.",
    "Says the class walked with Ms. Alvarez and got to school late.",
    "Says the feeling changed, from scared to calm."
  ],
  "modelAnswer": "The bus did not come, so our class waited at the stop. Ms. Alvarez walked with us, and we got to school late. I was scared while we waited, and I was calm when we walked in.",
  "aiContext": "Grade 3 ELAR, TEKS 3.12A personal narrative. True events in order: bus never came, class waited, Ms. Alvarez walked them, they were marked late, nobody was in trouble. Feeling change: scared at the stop, calm at the door. Do not accept bus-color opinions, a dog, running with no adult, or a claim that nothing changed. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "wait",
      "walk",
      "door"
    ],
    "walkLine": "The missing bus is the problem. The walk and the change come after it.",
    "why": {
      "a": "Yes. With no late bus, there is no walk and no change to tell.",
      "b": "A story needs the problem. Without it, the rest does not happen.",
      "c": "Shoes are not in this story.",
      "d": "The walk does not get longer. It drops out of the story."
    }
  },
  "look": {
    "key": "true",
    "hint": "Follow the arrows. Kids wait where no bus is, a teacher walks with them, and they reach the school door.",
    "why": "Yes. That is the morning in the picture."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say the bus came.",
    "why": "Yes. The bus did not come."
  }
};
