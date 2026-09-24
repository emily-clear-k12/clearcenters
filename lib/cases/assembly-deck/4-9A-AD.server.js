// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "4.9A-AD",
  "title": "The Daylight Log",
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
        "r1p5": "The notes say winter days were short, not the longest.",
        "r1p6": "The notes are about seasons, not the Moon."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This names the log.",
        "r1p2": "This is winter.",
        "r1p3": "This is summer.",
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
        "r2p5": "The notes say the same sequence shows up each year.",
        "r2p6": "A prediction needs the pattern. A guess with no pattern is not the log."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This names the pattern.",
        "r2p2": "This is winter.",
        "r2p3": "This is summer.",
        "r2p4": "This is the prediction."
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
        "r3p5": "One day is weather, not the season in this log.",
        "r3p6": "The log uses temperature and daylight, not an opinion."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This names a season.",
        "r3p2": "This is one part.",
        "r3p3": "This is the other part.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the records, then the yearly pattern. What a season includes comes last.",
  "decoyProtest": {
    "r1p5": "Winter feels long, so the days must be long.",
    "r1p6": "The sky is the sky.",
    "r2p5": "Surprise seasons are more fun.",
    "r2p6": "I felt like guessing.",
    "r3p5": "I remember Tuesday.",
    "r3p6": "Sweaters are the real data."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Log accepted. Winter is short and cold, summer is long and warm, and the pattern repeats.",
      "good": "Log accepted. The seasons are mostly right. Read the leftovers so one day is not called the season.",
      "rough": "I have the work. Come read it with me. Part of this is a pattern, and part of it is one afternoon."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Tuesday was cold, so the season changed for good.",
    "why": "One day is not a season. The log's pattern is temperature and length of daylight across the year."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p3"
    ],
    "pinpointWhy": "Right. That sentence says summer days were long and warm.",
    "pinpointMiss": "That sentence may belong. It does not say summer days were long and warm.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The log tracks temperature and length of daylight.",
      "b": "Tuesday is one day, not the season.",
      "c": "The log is not a Moon record.",
      "d": "The same sequence shows up each year."
    }
  },
  "mustInclude": [
    "Says winter days were short and cold.",
    "Says summer days were long and warm.",
    "Uses the repeating pattern of temperature and daylight, not one day."
  ],
  "modelAnswer": "Winter days were short and cold. Summer days were long and warm. The pattern includes temperature and length of daylight, and it repeats each year.",
  "aiContext": "Grade 4 Science, TEKS 4.9A. Seasonal pattern: winter short daylight and low temperature, summer longer daylight and higher temperature. The sequence repeats and can support a prediction. One Tuesday is not the season. Do not accept winter as the longest days, a new order every year, the Moon, or sweater opinions. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "pattern",
      "predict"
    ],
    "walkLine": "The prediction depends on the repeating pattern.",
    "why": {
      "a": "Yes. Without the pattern, the next season cannot be predicted from the log.",
      "b": "The log is still there.",
      "c": "One Tuesday is not the pattern.",
      "d": "Dropping the pattern does not make winter days the longest."
    }
  },
  "look": {
    "key": "two",
    "hint": "A low sun with a bare tree, and a high sun with a leafy tree.",
    "why": "Yes. Those are two different seasons."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say winter days were the longest.",
    "why": "Yes. Winter days were short."
  }
};
