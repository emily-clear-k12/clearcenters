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
        "r1p6": "The notes give the opposite order. Fish ate grass. Herons ate fish."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This tells the reader what the paragraph is about.",
        "r1p2": "This says where energy entered.",
        "r1p3": "This says who ate what.",
        "r1p4": "This names the producer, so it goes last."
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
        "r2p5": "The notes say the opposite. There were fewer fish and fewer herons.",
        "r2p6": "The notes never describe a new producer. They say grass was torn out."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells the reader what the paragraph is about.",
        "r2p2": "This says what the storm removed.",
        "r2p3": "This gives the later counts.",
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
        "r3p5": "Lucky is not in the notes. The counts do not show herons doubling.",
        "r3p6": "A feeling is not evidence. The notes do not say the fish are gone forever."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells the reader what the paragraph is about.",
        "r3p2": "This says what happens to the energy flow.",
        "r3p3": "This says the matter was not destroyed.",
        "r3p4": "This says what a fair prediction uses, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The log traces the web first, then the storm damage. What that means for energy and matter comes last.",
  "decoyProtest": {
    "r1p5": "Herons look like they invented daylight. I trusted the feathers.",
    "r1p6": "I read the arrows backward. Backward is more exciting.",
    "r2p5": "Fewer is more if the page is upside down.",
    "r2p6": "A new producer arrived. I named it and then forgot the name.",
    "r3p5": "Storms are lucky. I checked with a coin.",
    "r3p6": "Sadness is a measurement. The fish felt it and left forever."
  },
  "requester": {
    "name": "Chief Okafor",
    "emoji": "🛠️",
    "replies": {
      "great": "Log accepted. You kept the energy path in order and predicted the drop without saying the matter was destroyed.",
      "good": "Log accepted. The web is mostly right. Read the leftovers so a backward arrow does not sneak in.",
      "rough": "Log received. Come find me and we'll read it together. Part of this is the food web, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The storm destroyed the matter, so the energy path does not matter anymore.",
    "why": "The matter was not destroyed. What broke was the path that carried energy from the grass to the animals."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p2"
    ],
    "pinpointWhy": "Right. That sentence says less grass means less energy for the fish and the herons.",
    "pinpointMiss": "That sentence may be true. It does not say less grass means less energy moving on to the animals.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The grass carried energy in. Less grass means less energy for the fish and the herons.",
      "b": "Herons do not make the energy. It entered through the grass.",
      "c": "The notes say the matter was not destroyed.",
      "d": "Fish ate the grass. Herons ate the fish. The arrows do not reverse."
    }
  },
  "mustInclude": [
    "Says energy moved from the Sun through the grass to the fish and herons.",
    "Says fewer fish and herons, or less energy reaches them, after the grass is torn out.",
    "Says the matter was not destroyed."
  ],
  "modelAnswer": "Energy moved from the Sun to the marsh grass, then to the fish and the herons. When the storm tore out the grass, less energy could move along that path, so the counts of fish and herons dropped. The matter in the grass was not destroyed.",
  "aiContext": "Grade 5 science, TEKS 5.12B. Bay food web before the storm: Sun energy enters through marsh grass (producer), fish eat grass, herons eat fish. Storm removes most grass. Prediction: energy flow to fish and herons drops, so counts drop. Matter is not destroyed; the path is broken. Do not accept reversed arrows, herons creating energy, luck, or feelings. Do not penalize spelling.",
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
    "model": "The notes never say the fish ate the herons.",
    "why": "Yes. Fish ate the grass. Herons ate the fish."
  }
};
