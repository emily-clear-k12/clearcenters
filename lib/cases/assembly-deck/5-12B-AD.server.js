// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.12B-AD",
  "title": "The Bay After the Storm",
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
        "r1p5": "The notes say the opposite. Energy entered from the Sun through the grass.",
        "r1p6": "The notes give the opposite order. Fish ate the grass, and herons ate the fish."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the food web the paragraph describes, so it opens the paragraph.",
        "r1p2": "This says where energy entered the web, so it is a detail.",
        "r1p3": "This says who ate what, so it is a detail.",
        "r1p4": "This names the kind of path energy followed, so it goes last."
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
        "r2p5": "The notes say the opposite. The later counts showed fewer fish and fewer herons.",
        "r2p6": "The notes never describe a new producer. They only say the grass was torn out."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This says the storm changed the start of the web, so it opens the paragraph.",
        "r2p2": "This says what the storm removed, so it is a detail.",
        "r2p3": "This gives the later counts, so it is a detail.",
        "r2p4": "This says where the energy path broke, so it goes last."
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
        "r3p5": "The notes never mention birds flying in from other bays. The counts do not show herons doubling.",
        "r3p6": "A feeling is not evidence. The notes do not say the fish are gone forever."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This names both energy and matter, so it opens the paragraph.",
        "r3p2": "This says what happens to the energy flow, so it is a detail.",
        "r3p3": "This says the matter was not destroyed, so it is a detail.",
        "r3p4": "This says what a fair prediction is based on, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The log traces the food web first, then the storm damage. What that means for energy and matter comes last, because it depends on both.",
  "decoyProtest": {
    "r1p5": "Herons look like they invented daylight. I trusted the feathers.",
    "r1p6": "I read the arrows backward. Backward is more exciting!",
    "r2p5": "Fewer is more if you hold the page upside down.",
    "r2p6": "A new producer arrived. I named it, and then I forgot the name.",
    "r3p5": "Birds love a fresh start. I'm sure they're packing right now.",
    "r3p6": "Sadness is a measurement. The fish felt it and left forever."
  },
  "requester": {
    "name": "Chief Okafor",
    "emoji": "🛠️",
    "replies": {
      "great": "Log accepted. You kept the energy path in order and predicted the drop without saying the matter was destroyed.",
      "good": "Log accepted. The web is mostly right. Reread the leftover sentences so a backward arrow does not sneak in.",
      "rough": "Log received. Come find me and we'll read it together. Part of this describes the food web, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Because the storm destroyed the matter in the grass, the energy path no longer matters.",
    "why": "The matter was not destroyed. What broke was the path that carried energy from the grass to the animals."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p2"
    ],
    "pinpointWhy": "Right. That sentence says less grass means less energy for the fish and the herons.",
    "pinpointMiss": "That sentence may be true, but it does not say less grass means less energy moving on to the animals.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The grass carried energy into the web. Less grass means less energy for the fish and the herons.",
      "b": "Herons do not make the energy. It entered through the grass.",
      "c": "The notes say the matter was not destroyed.",
      "d": "Fish ate the grass, and herons ate the fish. The arrows do not reverse."
    }
  },
  "mustInclude": [
    "Says energy moved from the Sun through the grass to the fish and herons.",
    "Says fewer fish and herons, or less energy reaches them, after the grass is torn out.",
    "Says the matter was not destroyed."
  ],
  "modelAnswer": "Energy moved from the Sun to the marsh grass, then to the fish, and then to the herons. When the storm tore out the grass, less energy could move along that path, so the counts of fish and herons dropped. The matter in the grass was not destroyed, even though the energy path was broken.",
  "aiContext": "Grade 5 science, TEKS 5.12B. Bay food web before the storm: Sun energy enters through marsh grass (producer), fish eat grass, herons eat fish. Storm removes most grass. Prediction: energy flow to fish and herons drops, so counts drop. Matter is not destroyed; the path is broken. Do not accept reversed arrows, herons creating energy, a new producer, herons doubling, luck, or feelings. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "grass",
      "fish",
      "heron"
    ],
    "walkLine": "The grass carries the Sun's energy to the fish and then the herons.",
    "why": {
      "a": "Yes. Remove the grass and the fish and the herons lose the energy path.",
      "b": "The Sun is still there. It is before the grass.",
      "c": "The animals do not make this energy. It entered through the grass.",
      "d": "The herons are past the fish. They lose the path too. They do not get more."
    }
  },
  "look": {
    "key": "web",
    "hint": "Follow the arrows. The picture shows the Sun, then grass, then fish, then a heron. The arrows do not run backward.",
    "why": "Yes. Energy moves from the Sun to the grass, the fish, and the heron."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say the fish ate the herons. They say fish ate the grass, and herons ate the fish.",
    "why": "Yes. Fish ate the grass. Herons ate the fish."
  }
};
