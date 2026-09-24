// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "4.10C-AD",
  "title": "Tuesday Is Not the Climate",
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
        "r1p5": "One rainy day is weather. The climate is the long pattern.",
        "r1p6": "A feeling today is not the climate record."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This names Tuesday.",
        "r1p2": "This is the rain.",
        "r1p3": "This is the temperature.",
        "r1p4": "This is the conclusion."
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
        "r2p5": "Climate is many years, not one afternoon.",
        "r2p6": "One Tuesday does not set the climate."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This names climate.",
        "r2p2": "This is temperature.",
        "r2p3": "This is dryness.",
        "r2p4": "This is the conclusion."
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
        "r3p5": "The notes use both words for different ideas.",
        "r3p6": "The notes use climate for the long pattern."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names the difference.",
        "r3p2": "This is weather.",
        "r3p3": "This is climate.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives one day's weather, then the long pattern. The difference comes last.",
  "decoyProtest": {
    "r1p5": "I stood in that rain. It felt permanent.",
    "r1p6": "Today is all the data I have.",
    "r2p5": "Afternoons feel like new climates.",
    "r2p6": "One storm should count double.",
    "r3p5": "Two words are annoying.",
    "r3p6": "Weather is the word I know."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Reading accepted. Tuesday is weather. Hot, dry summers over many years are the climate.",
      "good": "Reading accepted. The words are mostly right. Read the leftovers so one day is not called the climate.",
      "rough": "I have the work. Come read it with me. Part of this keeps the words apart, and part of it mixes them."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Tuesday was rainy, so the climate here is rainy.",
    "why": "Tuesday is weather. The climate is the long pattern: summers here are usually hot and dry."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p1"
    ],
    "pinpointWhy": "Right. That sentence says climate is a pattern over many years.",
    "pinpointMiss": "That sentence may belong. It does not say climate is a pattern over many years.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. One day's rain is weather.",
      "b": "Climate is the pattern over many years.",
      "c": "One Tuesday does not prove the summers are rainy.",
      "d": "The notes use both weather and climate."
    }
  },
  "mustInclude": [
    "Calls Tuesday's rain and 55 degrees weather.",
    "Calls the many-year hot, dry summers climate.",
    "Does not say one day rewrites the climate."
  ],
  "modelAnswer": "Tuesday was rainy and 55 degrees. That is weather. Over many years, summers here are hot and dry. That is climate. One day does not change the climate.",
  "aiContext": "Grade 4 Science, TEKS 4.10C. Weather is the short-term condition: Tuesday rainy and 55 degrees. Climate is the long pattern: summers usually hot and dry. Do not accept Tuesday as the climate, climate changing every afternoon, the words meaning the same thing, or scientists using only weather. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "years",
      "climate"
    ],
    "walkLine": "Climate is the pattern across many years.",
    "why": {
      "a": "Yes. Without the long record, the climate pattern fails.",
      "b": "Tuesday is still weather.",
      "c": "Tuesday is not the climate.",
      "d": "Dropping the years does not turn summers rainy."
    }
  },
  "look": {
    "key": "both",
    "hint": "One rainy scene, and a longer row of many days.",
    "why": "Yes. One day beside a long pattern."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never call Tuesday's rain the climate.",
    "why": "Yes. Tuesday is weather."
  }
};
