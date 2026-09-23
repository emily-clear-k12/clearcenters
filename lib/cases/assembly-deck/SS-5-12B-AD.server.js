// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.5.12B-AD",
  "title": "Why the Factory Is There",
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
        "r1p5": "The notes say the mills used the Merrimack River. They were not in a desert.",
        "r1p6": "A pretty view is an opinion. The notes give the river as the reason."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This names the power source.",
        "r1p3": "This says what a mill without power would face.",
        "r1p4": "This names the kind of reason it is, so it goes last."
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
        "r2p5": "The notes say ships used the port at Boston. The mills were not a thousand miles from a port.",
        "r2p6": "Cotton does not move itself. The notes say ships carried it."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is how cotton arrived.",
        "r2p3": "This is how cloth left.",
        "r2p4": "This says why distance matters, so it goes last."
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
        "r3p5": "The notes say the river does not decide a worker's pay. It explains the power.",
        "r3p6": "People moved to Lowell for the jobs. Geography did not hire them by itself."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says why people came.",
        "r3p3": "This says who many of them were.",
        "r3p4": "This draws the limit of a geographic reason, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the river power, then how goods moved. The workers come last.",
  "decoyProtest": {
    "r1p5": "Deserts are quieter.",
    "r1p6": "Pretty is a landform.",
    "r2p5": "A thousand miles makes the ships braver.",
    "r2p6": "Self-walking cotton saves fuel.",
    "r3p5": "The river is in charge of everything, including pay.",
    "r3p6": "If the land is right, people appear."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. You used the river, the port, and the workers, and you did not let the river set the wages.",
      "good": "Explanation accepted. The location is mostly clear. Read the leftovers so luck or a pretty view does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is the geography, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The Merrimack River chose the town, the ships, and every worker's wage.",
    "why": "The river explains the power. Ships explain the transport. People moved for the jobs. The river did not set the pay."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says the Merrimack River turned the water wheels.",
    "pinpointMiss": "That sentence may belong. It does not say the river turned the wheels.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. River power and a port are the geographic reasons in the notes.",
      "b": "The mills used a river. A pretty view is not the factor.",
      "c": "Ships used Boston's port. The mills were not a thousand miles away.",
      "d": "The notes say the river does not decide a worker's pay."
    }
  },
  "mustInclude": [
    "Says the Merrimack River powered the mills or turned the wheels.",
    "Says ships or Boston's port moved cotton or cloth.",
    "Says workers moved to Lowell for the jobs, and does not say the river set their pay."
  ],
  "modelAnswer": "The mills at Lowell used the Merrimack River to turn water wheels. Ships brought cotton through Boston and carried cloth away. Workers moved there for the jobs. The river explains the power, not the pay.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.12B. Lowell, Massachusetts textile mills. The Merrimack River turned water wheels. Ships brought cotton through Boston and carried finished cloth away. A site far from power and a port costs more. Workers, including many young women from nearby farms, moved to Lowell for the jobs. The river does not set wages. Do not accept a desert site, a pretty view, a thousand miles from any port, self-walking cotton, the river setting wages, or geography hiring people by itself. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "river",
      "jobs"
    ],
    "walkLine": "The river power is what the mill jobs depend on. The port can still exist.",
    "why": {
      "a": "Yes. Without power, the mill jobs go dark.",
      "b": "The port is still there. Ships do not depend on the water wheel.",
      "c": "A pretty view cannot turn the wheels.",
      "d": "Stopping the wheels does not make the river set the pay."
    }
  },
  "look": {
    "key": "mill",
    "hint": "Follow the arrows. A river turning a mill wheel, ships and cotton bales at a dock, then workers entering the mill.",
    "why": "Yes. Power, transport, then workers."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the mills were built in a desert.",
    "why": "Yes. They used the Merrimack River."
  }
};
