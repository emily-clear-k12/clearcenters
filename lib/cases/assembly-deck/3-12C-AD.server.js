// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "3.12C-AD",
  "title": "After the Flood",
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
        "r1p5": "The notes describe a flood, not a drought.",
        "r1p6": "A wish is not the cause in these notes."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "unsupported"
      },
      "misplacementNotes": {
        "r1p1": "This names the change.",
        "r1p2": "This is the creek.",
        "r1p3": "This is the meadow.",
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
        "r2p5": "The notes say some insects perished. Not every animal thrived.",
        "r2p6": "The notes say the deer moved. They did not perish."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is thrive.",
        "r2p3": "This is perish.",
        "r2p4": "This is move."
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
        "r3p5": "The notes include perish and move, not only growth.",
        "r3p6": "The notes say this was a flood, not a drought."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This opens the paragraph.",
        "r3p2": "This is one result.",
        "r3p3": "These are the other results.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names the flood, then the three organism results. The pattern comes last.",
  "decoyProtest": {
    "r1p5": "Dry and wet are both water stories.",
    "r1p6": "Wishes feel powerful.",
    "r2p5": "A happy ending is kinder.",
    "r2p6": "Hills are dangerous, so the deer must have perished.",
    "r3p5": "Growth is the only result I like.",
    "r3p6": "Drought was in the word list."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Report accepted. Plants thrived, some insects perished, and the deer moved.",
      "good": "Report accepted. The flood is mostly right. Read the leftovers so one result does not erase the others.",
      "rough": "I have the work. Come read it with me. Part of this is the flood, and part of it is a different change."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Every living thing thrived, because water is always good.",
    "why": "The notes say some insects perished. A flood can help some organisms and harm others."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence says some insects perished.",
    "pinpointMiss": "That sentence may belong. It does not say some insects perished.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The deer moved to higher ground.",
      "b": "The notes do not say the deer perished.",
      "c": "Some insects perished. Not every animal thrived.",
      "d": "This change was a flood, not a drought."
    }
  },
  "mustInclude": [
    "Says the creek flooded the meadow.",
    "Includes thrive, perish, and move.",
    "Does not call the event a drought."
  ],
  "modelAnswer": "The creek flooded the meadow. Some plants thrived, some insects perished, and the deer moved to higher ground.",
  "aiContext": "Grade 3 Science, TEKS 3.12C. A flood, not a drought. Plants thrived, some insects perished, deer moved to higher ground. Do not accept every animal thriving, deer perishing, a wish as the cause, or drought as this event. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "flood",
      "move"
    ],
    "walkLine": "The move happens because of the flood.",
    "why": {
      "a": "Yes. Without the flood, the deer have no reason to move uphill.",
      "b": "The creek is still there.",
      "c": "A drought is a different change.",
      "d": "Skipping the flood does not make every animal thrive."
    }
  },
  "look": {
    "key": "over",
    "hint": "Water over the bank, and a deer heading uphill.",
    "why": "Yes. The flood is over the meadow, and an animal is moving away."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the meadow dried up.",
    "why": "Yes. This change is a flood."
  }
};
