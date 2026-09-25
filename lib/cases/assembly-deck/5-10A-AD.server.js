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
        "r1p5": "The notes say the sun's energy heated the water. The ocean did not heat itself.",
        "r1p6": "The notes name the sun as the source of heat, not the moon."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the pair the paragraph is about, so it opens.",
        "r1p2": "This is the heating, a fact from the notes.",
        "r1p3": "This is the evaporation, a fact from the notes.",
        "r1p4": "This sums up the sun's job, so it closes."
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
        "r2p5": "The notes say the clouds formed from water vapor, not smoke.",
        "r2p6": "The notes say ocean moisture can grow into storms over warm water."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This says what the paragraph is about, so it opens.",
        "r2p2": "This is the rising air, a fact from the notes.",
        "r2p3": "This is how the clouds formed, a fact from the notes.",
        "r2p4": "This connects the moisture to storms, so it closes."
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
        "r3p5": "The notes give the energy job to the sun, not the ocean.",
        "r3p6": "The notes describe evaporation and clouds. They say nothing about rain skipping the cycle."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This states the big idea, so it opens.",
        "r3p2": "This is the ocean's job.",
        "r3p3": "This is the sun's job.",
        "r3p4": "This puts both jobs together, so it closes."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The report explains the sun and the ocean first, then the weather. Why both are needed comes last.",
  "decoyProtest": {
    "r1p5": "Oceans are enormous! Surely they can heat themselves! ...The notes say sun. Hm.",
    "r1p6": "The moon was glowing in my drawing! That counts as heat, right?",
    "r2p5": "Some ocean clouds look gray and dirty! Smoke is a reasonable guess!",
    "r2p6": "Storms feel like a land thing. Nobody checked the ocean, did they? ...Oh.",
    "r3p5": "The sun is just bright scenery! Pretty, but not useful! ...Wait, it does what?",
    "r3p6": "Rain tastes salty sometimes, so I skipped a few steps. Is that allowed?"
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Report accepted. The sun supplies the energy, the ocean supplies the water, and that moisture can shape the weather.",
      "good": "Report accepted. The cycle is mostly right. Reread the leftovers so the sun is not treated as decoration.",
      "rough": "I have your report. Come read it with me. Part of it shows the two working together, and part of it gives one of them the wrong job."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The ocean supplies both the water and the energy, so the sun is optional.",
    "why": "The notes split the jobs. The ocean supplies the water. The sun supplies the energy that makes the water evaporate."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p4"
    ],
    "pinpointWhy": "Right. That sentence closes the first paragraph by saying the sun supplied the energy.",
    "pinpointMiss": "That sentence may belong, but it is not the one that closes the first paragraph with the sun's job.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The ocean supplies the water that evaporates.",
      "b": "The sun supplies the energy. The ocean cannot do it alone.",
      "c": "The clouds form from water vapor, not smoke.",
      "d": "The notes say ocean moisture can grow into storms."
    }
  },
  "mustInclude": [
    "Says the sun heats the ocean or supplies the energy.",
    "Says ocean water evaporates and can form clouds or storms.",
    "Does not give the energy job to the ocean alone."
  ],
  "modelAnswer": "The sun's energy heated the ocean surface, and the water evaporated into water vapor. The warm, moist air rose and cooled, so the vapor condensed into clouds. Over warm water, that moisture can grow into storms. The ocean supplies the water, while the sun supplies the energy, so neither one could do it alone.",
  "aiContext": "Grade 5 Science, TEKS 5.10A. The sun and the ocean interact in the water cycle and affect weather. The sun heats the ocean surface and supplies the energy. Ocean water evaporates into water vapor, rises, cools, condenses into clouds, and over warm water can build into storms. The ocean supplies the water. Do not accept boiling with no sun, the moon as the heat source, smoke clouds, weather never coming from the ocean, the ocean as the energy source, or rain that skipped the cycle. Credit condensation but do not require it. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "sun",
      "storm"
    ],
    "walkLine": "The weather link depends on the sun heating the ocean, so without that heat the storms fail.",
    "why": {
      "a": "Yes. Without the sun's heat, storms from that moisture fail.",
      "b": "The ocean would still be there. Its water just would not evaporate.",
      "c": "In these notes, the ocean does not boil without the sun.",
      "d": "Blocking the sun does not turn it into decoration. It takes away the energy."
    }
  },
  "look": {
    "key": "both",
    "hint": "A sun over the ocean, with water vapor rising into a cloud.",
    "why": "Yes. Both the sun and the ocean are in the picture, working together."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the ocean boiled with no sun. They say the sun heated it.",
    "why": "Yes. The sun's energy heated the water."
  }
};
