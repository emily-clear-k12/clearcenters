// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.10C-AD",
  "title": "Reading a Canyon",
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
        "r1p5": "The notes say the opposite. The cutting has taken a very long time, not one night.",
        "r1p6": "No note says the layers are paint. They are rock."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "unsupported"
      },
      "misplacementNotes": {
        "r1p1": "This tells the reader what the paragraph is about.",
        "r1p2": "This says what the walls show.",
        "r1p3": "This says what the river is doing now.",
        "r1p4": "This puts today's water in its place, so it goes last."
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
        "r2p5": "The notes say the river drops sediment where it slows, at the sea, not at the top of the canyon.",
        "r2p6": "Tired is an opinion about the wind. The notes say the river builds the delta."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "opinion"
      },
      "misplacementNotes": {
        "r2p1": "This tells the reader what the paragraph is about.",
        "r2p2": "This says sediment leaves the canyon.",
        "r2p3": "This says where the sediment is dropped.",
        "r2p4": "This names both landforms, so it goes last."
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
        "r3p5": "The notes say wind piles dunes. They do not say this river builds the dunes.",
        "r3p6": "The notes treat them as different landforms: a cut canyon, a dropped delta, a piled dune."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells the reader what the paragraph is about.",
        "r3p2": "This is what wind can do.",
        "r3p3": "This is what ice can do.",
        "r3p4": "This compares the three causes, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The log reads the walls first, then follows the river to the delta. Wind and ice come last, as the other causes.",
  "decoyProtest": {
    "r1p5": "One storm is a long time if you slept through it.",
    "r1p6": "Pretty paint is a rock type. I named it myself.",
    "r2p5": "Up and down swapped when I turned the map over.",
    "r2p6": "The wind yawned. I counted that as data.",
    "r3p5": "Rivers build everything. I gave the wind the day off.",
    "r3p6": "Same word, landform. Close enough for a label."
  },
  "requester": {
    "name": "Chief Okafor",
    "emoji": "🛠️",
    "replies": {
      "great": "Log accepted. You had the river cutting the canyon and building the delta, and you kept the time long.",
      "good": "Log accepted. The landforms are mostly right. Read the leftovers so a one-night canyon does not sneak in.",
      "rough": "Log received. Come find me and we'll read it together. Part of this is the river, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The canyon was cut in a single afternoon, and the delta has nothing to do with this river.",
    "why": "The notes say the cutting took a very long time, and this river drops the sediment that builds the delta."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p4"
    ],
    "pinpointWhy": "Right. That sentence says one river can carve a canyon and build a delta.",
    "pinpointMiss": "That sentence may be true. It does not say one river does both jobs.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The river cuts the canyon and drops that sediment into a delta.",
      "b": "The notes say the canyon did not form in a day.",
      "c": "Wind piles dunes. This river cuts the canyon and builds the delta.",
      "d": "They are different landforms, made in different ways."
    }
  },
  "mustInclude": [
    "Says the river cuts the canyon over a very long time.",
    "Says the river carries sediment and drops it to build a delta.",
    "Says wind or ice can shape land too, or that these are not the same landform."
  ],
  "modelAnswer": "The river cuts the canyon slowly and carries sediment away. Where it slows at the sea, it drops that sediment and builds a delta. The canyon did not form in a day. Wind can pile dunes and ice can carve rock, and those are different landforms.",
  "aiContext": "Grade 5 science, TEKS 5.10C. Water cuts a canyon over a very long time and deposits sediment as a delta. Wind can build sand dunes. Ice can carve rock. A canyon, a delta, and a dune are different landforms. Do not accept overnight formation, paint layers, or wind building this canyon. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "river",
      "canyon",
      "delta"
    ],
    "walkLine": "The river is what cuts the canyon and what delivers sediment to the delta.",
    "why": {
      "a": "Yes. Take the river away and both the cutting and the delta lose the water that was doing the work.",
      "b": "The notes tie the cutting to the river. No river, no new cutting.",
      "c": "The delta does not get bigger without the sediment the river was carrying.",
      "d": "Wind and dunes are not on this line. The river is not what makes the wind stop."
    }
  },
  "look": {
    "key": "both",
    "hint": "Follow the arrows. The picture shows a river, a canyon with the river at the bottom, and a delta at the sea. It does not show a dune.",
    "why": "Yes. The river cuts the canyon and drops sediment at the sea."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the canyon appeared overnight.",
    "why": "Yes. The cutting took a very long time."
  }
};
