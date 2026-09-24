// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.3.7C-AD",
  "title": "Who Do You Call?",
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
        "r1p5": "Trash pickup is a city job. The army is not the trash service.",
        "r1p6": "A feeling about taxes does not say who picks up the trash."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This names the local problem.",
        "r1p2": "This says who picks up trash.",
        "r1p3": "This adds another city job.",
        "r1p4": "This says who to call, so it goes last."
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
        "r2p5": "Highways between cities are a state job, not the mayor's trash route.",
        "r2p6": "An election is not the service that fixes a hole."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "offtopic"
      },
      "misplacementNotes": {
        "r2p1": "This names the state problem.",
        "r2p2": "This says who cares for those highways.",
        "r2p3": "This adds another state place.",
        "r2p4": "This keeps the city job separate, so it goes last."
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
        "r3p5": "Mail across the country is a national job. The mayor does not deliver it.",
        "r3p6": "Voting and mail are different. The notes are about who carries the letter."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is the mail job.",
        "r3p3": "This is the parks job.",
        "r3p4": "This keeps mail separate from trash, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the city job, then the state job. The national job comes last.",
  "decoyProtest": {
    "r1p5": "The army has trucks too.",
    "r1p6": "Taxes are my whole answer.",
    "r2p5": "The mayor can do every road.",
    "r2p6": "Elections fix holes.",
    "r3p5": "Mayors like stamps.",
    "r3p6": "Mail and voting both use paper."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Guide accepted. City trash, state highway, national mail. Each job is with the right level.",
      "good": "Guide accepted. The levels are mostly right. Read the leftovers so a job does not jump to the wrong level.",
      "rough": "I have the piece. Come read it with me. Part of this calls the right office, and part of it calls the wrong one."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "Call the army for the trash. Every level does every job.",
    "why": "The notes split the jobs. Trash is the city. Highways are the state. Mail across the country is the nation."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says the city picks up trash.",
    "pinpointMiss": "That sentence may belong. It does not say the city picks up trash.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Street trash is a city service.",
      "b": "The army is not the trash service.",
      "c": "The mayor does not deliver mail to other states.",
      "d": "A feeling about taxes does not pick up the can."
    }
  },
  "mustInclude": [
    "Says the city picks up trash or fixes streetlights.",
    "Says the state cares for highways or state parks.",
    "Says the post office or the nation carries mail, or cares for national parks."
  ],
  "modelAnswer": "Call the city about the full trash can. Call the state about a hole in a state highway. A letter to another state goes through the post office.",
  "aiContext": "Grade 3 Social Studies, TEKS 3.7C. Local/city: trash pickup and streetlights. A full can on your street is a city job. State: highways between cities and state parks. A highway hole is a state job. National: post office mail and national parks. A letter to another state is national. Do not accept the army picking up trash, tax complaints as the answer, the mayor paving every Texas highway, elections fixing the hole, the mayor delivering national mail, or voting as the same thing as mail. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "city",
      "truck"
    ],
    "walkLine": "The city call is what brings the trash truck.",
    "why": {
      "a": "Yes. If no one calls the city, the truck does not come.",
      "b": "The full can is still there. It is the problem.",
      "c": "The army does not pick up city trash.",
      "d": "Skipping the city does not turn the truck into a mail route."
    }
  },
  "look": {
    "key": "trash",
    "hint": "Follow the arrows. A full trash can, a city building, then a trash truck.",
    "why": "Yes. The street problem, the city, then the truck."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the army picks up city trash.",
    "why": "Yes. That is a city job."
  }
};
