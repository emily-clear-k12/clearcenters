// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.10A-AD",
  "title": "Heat From the Ocean",
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
        "r1p5": "The notes say the sun heated the water.",
        "r1p6": "The notes name the sun, not the moon."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the pair.",
        "r1p2": "This is the heating.",
        "r1p3": "This is the evaporation.",
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
        "r2p5": "The notes describe clouds from evaporated ocean water, not smoke.",
        "r2p6": "The notes say that moisture can become storms."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is the rising air.",
        "r2p3": "This is the clouds.",
        "r2p4": "This is the weather."
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
        "r3p5": "The notes give the energy job to the sun.",
        "r3p6": "The notes describe evaporation and clouds, not rain that skipped the cycle."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names the idea.",
        "r3p2": "This is the ocean's job.",
        "r3p3": "This is the sun's job.",
        "r3p4": "This is the conclusion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the sun and the ocean, then the weather. The interaction comes last.",
  "decoyProtest": {
    "r1p5": "Oceans are huge, so they must heat themselves.",
    "r1p6": "The moon was up in my drawing.",
    "r2p5": "Ocean clouds look dirty.",
    "r2p6": "Storms feel separate from water.",
    "r3p5": "The sun is just bright scenery.",
    "r3p6": "Rain tastes salty, so I skipped a step."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Report accepted. The sun supplies energy, the ocean supplies water, and that moisture can affect the weather.",
      "good": "Report accepted. The cycle is mostly right. Read the leftovers so the sun is not treated as decoration.",
      "rough": "I have the work. Come read it with me. Part of this is an interaction, and part of it gives one of them the wrong job."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The ocean supplies both the water and the energy, so the sun is optional.",
    "why": "The notes split the jobs. The ocean supplies water. The sun supplies the energy that drives evaporation."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p4"
    ],
    "pinpointWhy": "Right. That sentence says the sun supplied the energy.",
    "pinpointMiss": "That sentence may belong. It does not say the sun supplied the energy.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The ocean supplies the water.",
      "b": "The sun supplies the energy.",
      "c": "The clouds form from water vapor, not smoke.",
      "d": "The notes say ocean moisture can become storms."
    }
  },
  "mustInclude": [
    "Says the sun heats the ocean or supplies the energy.",
    "Says ocean water evaporates and can form clouds or storms.",
    "Does not give the energy job to the ocean alone."
  ],
  "modelAnswer": "The sun heated the ocean, and water evaporated. Moist air rose into clouds and can become storms. The ocean supplies water, and the sun supplies energy.",
  "aiContext": "Grade 5 Science, TEKS 5.10A. The sun and ocean interact in the water cycle and affect weather. Sun heats the surface and supplies energy. Ocean water evaporates, rises, forms clouds, and can become storms. Do not accept boiling with no sun, the moon as the heat source, smoke clouds, weather never coming from the ocean, the ocean as the energy source, or rain that skipped the cycle. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "sun",
      "storm"
    ],
    "walkLine": "The weather link depends on the sun heating the ocean.",
    "why": {
      "a": "Yes. Without the sun's heat, storms from that moisture fail.",
      "b": "The ocean is still there.",
      "c": "The ocean does not boil with no sun in these notes.",
      "d": "Blocking the sun does not make the sun decoration. It removes the energy."
    }
  },
  "look": {
    "key": "both",
    "hint": "A sun over the ocean, with vapor rising into a cloud.",
    "why": "Yes. Both the sun and the ocean are in the picture."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the ocean boiled with no sun.",
    "why": "Yes. The sun heated the water."
  }
};
