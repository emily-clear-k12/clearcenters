// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "3.9A-AD",
  "title": "Who Goes Around Whom",
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
        "r1p5": "The notes say Earth travels around the Sun, not the other way.",
        "r1p6": "The notes never say the Moon is bigger than the Sun."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "unsupported"
      },
      "misplacementNotes": {
        "r1p1": "This opens the paragraph.",
        "r1p2": "This is the path.",
        "r1p3": "This is the center.",
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
        "r2p5": "The notes say the Moon travels around Earth.",
        "r2p6": "A wagon is not in this model."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "offtopic"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the path.",
        "r2p3": "This compares the paths.",
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
        "r3p5": "The orbits are not the same. Earth goes around the Sun, and the Moon goes around Earth.",
        "r3p6": "The notes say the opposite about the Sun."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This opens the paragraph.",
        "r3p2": "This is Earth's orbit.",
        "r3p3": "This is the Moon's orbit.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives Earth's orbit, then the Moon's. The relationship comes last.",
  "decoyProtest": {
    "r1p5": "The Sun rises, so it must be the one moving around us.",
    "r1p6": "The Moon looks huge at night.",
    "r2p5": "Still things are easier to draw.",
    "r2p6": "A wagon was in another lesson.",
    "r3p5": "Fairness means matching orbits.",
    "r3p6": "I mixed up the center."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Model accepted. Earth orbits the Sun, and the Moon orbits Earth.",
      "good": "Model accepted. The paths are mostly right. Read the leftovers so the Sun is not sent around Earth.",
      "rough": "I have the work. Come read it with me. Part of this matches the model, and part of it reverses a path."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "The Sun travels around Earth once each day.",
    "why": "The notes say Earth travels around the Sun. The Sun does not orbit Earth."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p4"
    ],
    "pinpointWhy": "Right. That sentence says the Moon orbits Earth.",
    "pinpointMiss": "That sentence may belong. It does not say the Moon orbits Earth.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Earth travels around the Sun.",
      "b": "The Moon orbits Earth. Earth does not orbit only the Moon.",
      "c": "A wagon is not in this model.",
      "d": "The Sun does not orbit Earth."
    }
  },
  "mustInclude": [
    "Says Earth orbits the Sun.",
    "Says the Moon orbits Earth.",
    "Does not say the Sun orbits Earth."
  ],
  "modelAnswer": "Earth travels around the Sun. The Moon travels around Earth. The Sun does not travel around Earth.",
  "aiContext": "Grade 3 Science, TEKS 3.9A. Earth orbits the Sun. The Moon orbits Earth. The Sun does not orbit Earth. Do not accept a reversed Sun-Earth orbit, a still Moon, equal mutual orbits, or the Moon bigger than the Sun. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "earth",
      "moon"
    ],
    "walkLine": "The Moon's orbit is around Earth, so Earth's path is part of the model.",
    "why": {
      "a": "Yes. Without Earth's orbit, the model's relationship fails.",
      "b": "The Sun is still the center.",
      "c": "The Sun does not orbit Earth.",
      "d": "Skipping Earth's orbit does not make Earth orbit the Moon."
    }
  },
  "look": {
    "key": "two",
    "hint": "A sun, a planet on a big ring, and a moon on a smaller ring.",
    "why": "Yes. Earth circles the Sun, and the Moon circles Earth."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the Sun orbits Earth.",
    "why": "Yes. Earth is the one that travels around the Sun."
  }
};
