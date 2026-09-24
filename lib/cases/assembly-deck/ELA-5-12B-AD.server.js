// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.5.12B-AD",
  "title": "What a Watershed Is",
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
        "r1p5": "The notes say the opposite. The land is the watershed. The creek is where the water ends.",
        "r1p6": "A feeling is not information. The notes give a definition."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This states the central idea.",
        "r1p2": "This starts the path of the rain.",
        "r1p3": "This names where that path ends.",
        "r1p4": "This corrects the common mix-up, so it goes last."
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
        "r2p5": "The notes say the far side of the ridge goes to Pine Creek, not Oak Creek.",
        "r2p6": "One ridge does not send the same rain to both creeks. The divide splits it."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This names the divide.",
        "r2p3": "This says where the other side drains.",
        "r2p4": "This gives the reason the split holds, so it goes last."
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
        "r3p5": "The notes say playground water runs to the drain and then to the creek. It does not stay put.",
        "r3p6": "The notes show a path from the playground. Water does not have to be poured into the creek."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says what can leave the playground.",
        "r3p3": "This says where the drain leads.",
        "r3p4": "This stops a wrong definition, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece defines a watershed, then explains the ridge. The playground path comes last.",
  "decoyProtest": {
    "r1p5": "The water is the famous part. I named that.",
    "r1p6": "Feelings are a kind of fact.",
    "r2p5": "One city, one creek. Simpler.",
    "r2p6": "Sharing is what water does.",
    "r3p5": "Puddles are loyal. They stay.",
    "r3p6": "Pouring is the only real method."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. A new reader would know the land is the watershed, and which side of the ridge is ours.",
      "good": "Explanation accepted. The idea is mostly clear. Read the leftovers so the creek does not get mistaken for the land.",
      "rough": "I have the piece. Come read it with me. Part of this defines the land, and part of it renames the creek."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "Oak Creek is the watershed, and the land around it does not count.",
    "why": "The notes say the opposite. The land that drains to the creek is the watershed."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p4",
      "r1p1"
    ],
    "pinpointWhy": "Right. That sentence says the watershed is the land, not the creek.",
    "pinpointMiss": "That sentence may be a detail. It does not say the land, rather than the creek, is the watershed.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The watershed is the land that drains to one body of water.",
      "b": "The creek is where the water ends. It is not the watershed.",
      "c": "The ridge sends the far side to Pine Creek.",
      "d": "A puddle still drains downhill. It is not a new watershed."
    }
  },
  "mustInclude": [
    "Defines a watershed as land that drains to one body of water.",
    "Says playground rain goes to a drain and then to Oak Creek.",
    "Says the ridge sends the other side to Pine Creek, or that the creek itself is not the watershed."
  ],
  "modelAnswer": "A watershed is the land that drains to one body of water. Rain on our playground runs to the storm drain and then to Oak Creek. The ridge behind the soccer field sends the far side to Pine Creek instead.",
  "aiContext": "Grade 5 ELAR, TEKS 5.12B informational. Central idea: a watershed is the land that drains to one body of water, not the creek itself. Playground rain goes to the storm drain, then Oak Creek. The ridge behind the soccer field is the divide. Far-side rain goes to Pine Creek. Water does not flow uphill. Trash on the playground can reach the creek. A puddle is not a new watershed. Do not accept the creek-is-the-watershed claim, all-city-rain, both-creeks, pollution-stays, or only-poured-water. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "ridge",
      "creek"
    ],
    "walkLine": "The ridge decides which creek the rain can reach.",
    "why": {
      "a": "Yes. Without the ridge, you cannot say the rain belongs to Oak Creek.",
      "b": "The rain is still falling. It comes before the ridge.",
      "c": "The notes split the rain. The far side goes to Pine Creek.",
      "d": "Removing the ridge does not send every drop to both creeks. It removes the border."
    }
  },
  "look": {
    "key": "split",
    "hint": "Follow the arrows. Rain on a ridge, then water running down each side into a different creek.",
    "why": "Yes. The ridge splits the rain."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say all city rain ends up in Oak Creek.",
    "why": "Yes. The far side of the ridge goes to Pine Creek."
  }
};
