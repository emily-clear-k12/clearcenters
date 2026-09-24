// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "3.8A-AD",
  "title": "Four Kinds of Energy",
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
        "r1p5": "Tired is not a form of energy in these notes.",
        "r1p6": "A toy can still give off sound energy."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This opens the paragraph.",
        "r1p2": "This is the lamp.",
        "r1p3": "This is the bell.",
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
        "r2p5": "The notes call the mug thermal energy, not light.",
        "r2p6": "Alive is not what mechanical energy means."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "opinion"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the mug.",
        "r2p3": "This is the ball.",
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
        "r3p5": "The notes name four forms, not a feeling.",
        "r3p6": "The notes give four different forms."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This opens the paragraph.",
        "r3p2": "These are two forms.",
        "r3p3": "These are the other two.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece sorts light and sound, then heat and motion. The four-form conclusion comes last.",
  "decoyProtest": {
    "r1p5": "People say they have no energy.",
    "r1p6": "Toys are for play, not science.",
    "r2p5": "Warm things glow, sort of.",
    "r2p6": "Motion looks alive.",
    "r3p5": "One word should cover the table.",
    "r3p6": "Sorting is extra work."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Sort accepted. Light, sound, thermal, and mechanical are all on the table.",
      "good": "Sort accepted. The stations are mostly right. Read the leftovers so one form does not cover all four.",
      "rough": "I have the work. Come read it with me. Part of this names a form, and part of it names a feeling."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "All four stations are light energy, because you can see them.",
    "why": "Seeing an object is not its form of energy. The lamp is light, the bell is sound, the mug is thermal, and the ball is mechanical."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says the warm mug is thermal energy.",
    "pinpointMiss": "That sentence may belong. It does not say the mug is thermal energy.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. A rolling ball is mechanical energy.",
      "b": "The lamp is the light energy.",
      "c": "Tired is not a science form in these notes.",
      "d": "The lamp and the ball are different forms."
    }
  },
  "mustInclude": [
    "Names light, sound, thermal, and mechanical energy.",
    "Matches each one to the right station.",
    "Does not say energy only means feeling tired."
  ],
  "modelAnswer": "The lamp is light energy. The bell is sound energy. The warm mug is thermal energy. The rolling ball is mechanical energy.",
  "aiContext": "Grade 3 Science, TEKS 3.8A. Lamp = light, bell = sound, warm mug = thermal, rolling ball = mechanical. Do not accept tiredness, a living ball, the mug as light, or all four as the same form. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "form",
      "sort"
    ],
    "walkLine": "The forms are what make the sort true.",
    "why": {
      "a": "Yes. Without the forms, the sort fails.",
      "b": "The stations are still on the table.",
      "c": "Tired does not cover the four forms.",
      "d": "Skipping the forms does not turn the mug into light."
    }
  },
  "look": {
    "key": "four",
    "hint": "Four objects: a lamp, a bell, a mug, and a ball.",
    "why": "Yes. Those are the four stations."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never call the mug light energy.",
    "why": "Yes. The warm mug is thermal energy."
  }
};
