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
        "r1p5": "The notes say the mills used water from the Merrimack River, and they say plainly that the mills were not built in a desert.",
        "r1p6": "Whether a view is lovely is a matter of opinion. The notes give the river's power as the reason for the location."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This names the power source, so it is a detail.",
        "r1p3": "This explains what a mill without river power would face, so it is a detail.",
        "r1p4": "This names what kind of reason the river is, so it goes last."
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
        "r2p5": "The notes say Lowell was about 25 miles from the port of Boston, not a thousand miles from any port.",
        "r2p6": "The notes say how the cotton moved, but they never say who owned the ships and boats or that moving it was free."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This explains how cotton arrived, so it is a detail.",
        "r2p3": "This explains how cloth left, so it is a detail.",
        "r2p4": "This explains why distance raises the cost, so it goes last."
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
        "r3p5": "The notes never say how wages were set, and they never connect a worker's pay to living near the river.",
        "r3p6": "The notes say workers moved to Lowell for the jobs. The mills did need people to come."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This explains why people came, so it is a detail.",
        "r3p3": "This tells who many of the workers were, so it is a detail.",
        "r3p4": "This shows the limit of a geographic reason, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the river power first, then how goods moved. The workers come last because the jobs existed only after power and transport were in place.",
  "decoyProtest": {
    "r1p5": "I picked a desert because it's so peaceful. Where's the water, though?",
    "r1p6": "I thought a beautiful view counted as a landform. It doesn't?",
    "r2p5": "I pushed the port a thousand miles away to make the trip more exciting.",
    "r2p6": "I just assumed the owners had their own fleet. Free shipping for everyone!",
    "r3p5": "Riverside workers earn more. I'm fairly sure. I just can't find where it says so.",
    "r3p6": "I figured that if the land is right, workers just appear. Nobody has to pack a bag."
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
    "text": "The Merrimack River decided where the town went, which ships came, and what every worker earned.",
    "why": "The river explains the power, and the ships and canals explain the transport. People moved to Lowell for the jobs, but the river did not set their pay."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says water from the Merrimack River turned the wheels that ran the machines.",
    "pinpointMiss": "That sentence may belong in the piece, but it does not say what turned the water wheels.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. River power and a nearby port are the geographic reasons the notes give.",
      "b": "The mills used a river, not a desert, and a pretty view is not a geographic factor.",
      "c": "Ships used Boston's port, which was about 25 miles away, not a thousand.",
      "d": "The notes say the river explains the power, but it does not decide a worker's pay."
    }
  },
  "mustInclude": [
    "Says the Merrimack River powered the mills or turned the wheels.",
    "Says ships, canal boats, or Boston's port moved cotton or cloth.",
    "Says workers moved to Lowell for the jobs, and does not say the river set their pay."
  ],
  "modelAnswer": "The mills at Lowell used water from the Merrimack River to turn the wheels that ran their machines. Ships brought cotton to Boston, and canal boats carried it about 25 miles to Lowell, while finished cloth went back the same way. Workers, including many young women from New England farms, moved there for the jobs. The river explains the power, but it does not explain the pay.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.12B. Lowell, Massachusetts textile mills, at Pawtucket Falls where the Merrimack River drops about 30 feet. Canals carried river water to the mills to turn water wheels that ran the machines. Ships brought raw cotton to the port of Boston; canal boats and later a railroad carried it about 25 miles to Lowell, and finished cloth went back the same way to ships. A site far from power and a port costs more. Workers, including many young women from nearby New England farms, moved to Lowell for jobs that paid wages. The river does not set wages. Do not accept a desert site, a pretty view, a thousand miles from any port, free shipping because owners owned every ship, wages set by the river or by living near it, or the mills needing no one to move there. Accept ships, canal boats, or the railroad as transport. Do not penalize spelling.",
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
    "model": "The notes say the mills used the Merrimack River and were not built in a desert.",
    "why": "Yes. Canals carried water from the Merrimack River to the mills."
  }
};
