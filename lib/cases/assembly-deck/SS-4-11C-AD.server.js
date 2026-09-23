// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.4.11C-AD",
  "title": "What Built This Town",
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
        "r1p5": "The notes say the town was on Buffalo Bayou, where boats could reach the Gulf. Not a desert.",
        "r1p6": "The brothers were choosing a new site in 1836. The notes do not say it was already the biggest city."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "unsupported"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This gives the year and the people.",
        "r1p3": "This says what the boats could do.",
        "r1p4": "This names the geographic reason, so it goes last."
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
        "r2p5": "The notes say migrants and immigrants came for land and work. The town began in 1836, before oil.",
        "r2p6": "The notes say people came from other states and countries. They do not say newcomers had to leave."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is migration from other states.",
        "r2p3": "This is immigration from other countries.",
        "r2p4": "This separates finding a site from filling it, so it goes last."
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
        "r3p5": "Fort Worth's cattle trails are a different town's story. These notes are about Houston's bayou and port.",
        "r3p6": "Destined is a cheer. The notes give a water route, people, and trade."
      },
      "decoyReason": {
        "r3p5": "offtopic",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says what was built.",
        "r3p3": "This says what the storm revealed.",
        "r3p4": "This says how trade responded, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the bayou, then the people who came. The trade comes last.",
  "decoyProtest": {
    "r1p5": "Desert towns are more dramatic.",
    "r1p6": "Biggest is a kind thing to say about a founder.",
    "r2p5": "Oil is the story I already know.",
    "r2p6": "Closed towns are tidier.",
    "r3p5": "Fort Worth also has people. Close enough.",
    "r3p6": "Destiny is shorter than a bayou."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. You used the bayou, the people who came, and the trade, without turning it into a cheer.",
      "good": "Explanation accepted. The start of the town is mostly right. Read the leftovers so oil or another city does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is Houston's bayou, and part of it is a different story."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Houston had no people and no trade until oil was found in 1901.",
    "why": "The town was chosen in 1836. Migrants, immigrants, and bayou trade came long before that oil."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says the Allen brothers picked Buffalo Bayou in 1836.",
    "pinpointMiss": "That sentence may belong. It does not say the brothers chose Buffalo Bayou in 1836.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The water route, the newcomers, and the trade are the factors in the notes.",
      "b": "The site was a bayou, and people did come.",
      "c": "The town began in 1836, before the 1901 oil strike.",
      "d": "Fort Worth's cattle trails are a different town."
    }
  },
  "mustInclude": [
    "Says Houston or the Allen brothers chose Buffalo Bayou in 1836 because boats could reach the Gulf.",
    "Says people came from other states or other countries.",
    "Says trade, docks, or warehouses followed, or that shipping moved inland after the 1900 storm."
  ],
  "modelAnswer": "In 1836 the Allen brothers started Houston on Buffalo Bayou because boats could reach the Gulf. Migrants came from other states, and immigrants came from other countries. Docks, warehouses, and trade followed the water and the people.",
  "aiContext": "Grade 4 Social Studies, TEKS 4.11C. Houston, 1836, Allen brothers, Buffalo Bayou, boats to the Gulf. Migration from other states and immigration from other countries. Docks, warehouses, and trade. A 1900 storm showed the limit of an island-only port, and more shipping moved inland. Spindletop oil was near Beaumont in 1901, after Houston was already a town. Do not accept a desert founding, already the biggest city, empty until 1901, only native-born residents, Fort Worth cattle trails as the cause, or destiny. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "people",
      "trade"
    ],
    "walkLine": "The newcomers are who build the trade. The bayou does not grow a port by itself.",
    "why": {
      "a": "Yes. If no one arrives, the docks and the trade do not happen.",
      "b": "The bayou is still there. It comes before the people.",
      "c": "A site does not fill itself. The notes depend on people moving in.",
      "d": "Stopping newcomers does not move oil to 1836."
    }
  },
  "look": {
    "key": "grow",
    "hint": "Follow the arrows. A flatboat on a bayou, families with bundles, then docks and warehouses.",
    "why": "Yes. Water, newcomers, then trade."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say Houston was founded in a desert.",
    "why": "Yes. It was founded on Buffalo Bayou."
  }
};
