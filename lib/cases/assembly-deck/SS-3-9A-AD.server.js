// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.3.9A-AD",
  "title": "The Playground Rule",
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
        "r1p5": "The notes say the swings were not broken. The turn rule was.",
        "r1p6": "The color of the swings is not the citizenship problem."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This states the rule.",
        "r1p2": "This says who broke it.",
        "r1p3": "This says who was left out.",
        "r1p4": "This names the real problem, so it goes last."
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
        "r2p5": "Feeling nice is not the action. Maya told the truth.",
        "r2p6": "The notes say she told the truth. She did not say the swings were broken."
      },
      "decoyReason": {
        "r2p5": "opinion",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This names the action.",
        "r2p2": "This says what she reported.",
        "r2p3": "This says she did not invent more.",
        "r2p4": "This names the citizenship word, so it goes last."
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
        "r3p5": "A feeling is not the same as a turn. The notes say each student got a turn.",
        "r3p6": "The rule is turns for each student, not the fastest kids only."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says who gets a turn.",
        "r3p3": "This says what waiting is for.",
        "r3p4": "This says citizenship is an action, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece tells what happened, then what Maya did. The fair next day comes last.",
  "decoyProtest": {
    "r1p5": "Broken is more exciting.",
    "r1p6": "Red is a fact. I found a fact.",
    "r2p5": "Silence is kindness.",
    "r2p6": "I mixed up the truth and the excuse.",
    "r3p5": "Feelings count as turns.",
    "r3p6": "Fast should win."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Account accepted. You showed the broken rule, the truth Maya told, and the fair turns.",
      "good": "Account accepted. The story is mostly fair. Read the leftovers so a feeling does not replace the action.",
      "rough": "I have the piece. Come read it with me. Part of this is what people did, and part of it is only a feeling."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Good citizens feel nice. They do not have to tell the truth or share.",
    "why": "The notes show an action. Maya told the truth, and the next day each student got a turn."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p1"
    ],
    "pinpointWhy": "Right. That sentence says Maya told the teacher the truth.",
    "pinpointMiss": "That sentence may belong. It does not say Maya told the truth.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Telling the truth and sharing turns are the actions.",
      "b": "Feeling nice and staying quiet did not fix the rule.",
      "c": "The swings were not broken. That story is not what Maya told.",
      "d": "The rule is a turn for each student, not only the fastest."
    }
  },
  "mustInclude": [
    "Says the rule was taking turns, or that some students kept the swings.",
    "Says Maya told the teacher the truth.",
    "Says each student should get a turn."
  ],
  "modelAnswer": "The rule was to take turns, but two students kept the swings. Maya told the teacher the truth. Next time, each student should get a turn.",
  "aiContext": "Grade 3 Social Studies, TEKS 3.9A good citizenship as action: truthfulness, fairness, responsibility. The swing rule was take turns. Two students kept the swings all recess. Others got no turn. The swings were not broken. Maya told the teacher the truth and did not invent a story. The next day each student got a turn. Do not accept broken swings, the color red, silence as niceness, Maya saying the swings were broken, feelings replacing turns, or the fastest kids keeping the swings. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "truth",
      "turns"
    ],
    "walkLine": "Telling the truth is what leads to the fair turns.",
    "why": {
      "a": "Yes. If no one tells what happened, the fair turns do not follow.",
      "b": "The rule is still there. It comes before the telling.",
      "c": "Feeling nice is not the same as a turn.",
      "d": "Skipping the truth does not break the swings. The notes say they were not broken."
    }
  },
  "look": {
    "key": "turns",
    "hint": "Follow the arrows. Kids waiting at swings, a child with a teacher, then kids taking turns.",
    "why": "Yes. The problem, the truth, then fair turns."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the swings were broken.",
    "why": "Yes. The turn rule was the problem."
  }
};
