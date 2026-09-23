// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.4.2C-AD",
  "title": "Why Here?",
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
        "r1p5": "The notes say the mission was built by the San Antonio River, not far from water.",
        "r1p6": "Pretty is an opinion. The notes give water as the reason."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This gives the year and the place.",
        "r1p3": "This says what the water was for.",
        "r1p4": "This says what a bad site would lack, so it goes last."
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
        "r2p5": "The notes say Coahuiltecan groups already lived near the river.",
        "r2p6": "The notes never say everyone was glad or free. They only say what the Spanish wanted."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This names who was already there.",
        "r2p3": "This says the Spanish plan.",
        "r2p4": "This stops a claim the notes do not make, so it goes last."
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
        "r3p5": "The notes list Spanish goals: faith, land, and a mission. Helping was not the only plan.",
        "r3p6": "The 1718 mission in the notes was by the San Antonio River, not in East Texas."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This states the choice.",
        "r3p2": "This gives two Spanish reasons.",
        "r3p3": "This gives the route.",
        "r3p4": "This names what the plan required, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the river, then who already lived there. The Spanish reasons come last.",
  "decoyProtest": {
    "r1p5": "I like dry history better.",
    "r1p6": "Pretty is a primary source.",
    "r2p5": "Empty is simpler to draw.",
    "r2p6": "Glad is what I hoped happened.",
    "r3p5": "Helping is the only motive I allow.",
    "r3p6": "East is a direction. Directions are flexible."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Report accepted. You put the river, the people already there, and the Spanish reasons in the same choice.",
      "good": "Report accepted. The site is mostly clear. Read the leftovers so empty land does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this matches the notes, and part of it tells a prettier story."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The Spanish found empty land, so the mission harmed no one.",
    "why": "The notes say Coahuiltecan groups already lived near the river. The land was not empty."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence names the people who already lived near the river.",
    "pinpointMiss": "That sentence may belong. It does not say Coahuiltecan groups already lived there.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Water, people already there, and the route east are all in the notes.",
      "b": "The land was not empty, and the mission was beside a river.",
      "c": "The Spanish had goals of their own, including faith and land.",
      "d": "The notes never say everyone was glad or free."
    }
  },
  "mustInclude": [
    "Says the mission was built in 1718 by the San Antonio River, or names the river and the water.",
    "Says Coahuiltecan groups, or American Indian groups, already lived there.",
    "Gives a Spanish reason such as the Catholic faith, holding the land, or the route toward East Texas."
  ],
  "modelAnswer": "In 1718 the Spanish built a mission by the San Antonio River because the river supplied water. Coahuiltecan groups already lived nearby, and the Spanish wanted them to move into the mission. They also wanted to spread the Catholic faith and hold the land.",
  "aiContext": "Grade 4 Social Studies, TEKS 4.2C. In 1718 the Spanish built a mission and a presidio by the San Antonio River. The river watered people, crops, and animals. Coahuiltecan groups already lived there. The Spanish wanted them to move into the mission, to spread the Catholic faith, and to hold the claim to the land. The site was on the route between the Rio Grande and East Texas. Do not accept empty land, far from any river, prettiest view, everyone was glad and free, only-to-help, or East Texas in 1718. Do not penalize spelling. Do not add graphic detail about mission life.",
  "whatIf": {
    "key": "a",
    "walk": [
      "people",
      "mission"
    ],
    "walkLine": "The people already living there are part of why the mission was built.",
    "why": {
      "a": "Yes. Without people already there, the Spanish reason for this mission drops out.",
      "b": "The river is still there. It comes before the people.",
      "c": "Empty land was not the goal in these notes.",
      "d": "The mission does not get bigger. The reason for it goes dark."
    }
  },
  "look": {
    "key": "site",
    "hint": "Follow the arrows. A river, a village beside it, then a stone church and a low fort.",
    "why": "Yes. Water, people already there, then the mission and the fort."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say Texas was empty until the Spanish arrived.",
    "why": "Yes. Coahuiltecan groups already lived near the river."
  }
};
