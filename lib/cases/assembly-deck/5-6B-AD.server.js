// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.6B-AD",
  "title": "The Sorting Table",
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
        "r1p5": "Looking powerful is an opinion. The notes judge the magnet by what it pulled out, not by how it looks.",
        "r1p6": "That is true about sugar, but dissolving is a different kind of combination. This paragraph is about a mixture of iron and sand."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This names the mixture and its two parts, so it opens the paragraph.",
        "r1p2": "This describes how the two parts were spread through each other, so it is a detail.",
        "r1p3": "This says each part was still itself after mixing, so it is a detail.",
        "r1p4": "This states what mixing did not do, so it closes the paragraph."
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
        "r2p5": "The notes say the opposite. The magnet pulled out the iron, and the sand did not stick.",
        "r2p6": "No note describes stirring harder, and no note says a new metal formed. Each part kept its properties."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This says the crew separated the mixture, so it opens the paragraph.",
        "r2p2": "This is what the magnet did, so it is a detail.",
        "r2p3": "This is what happened to the sand, so it is a detail.",
        "r2p4": "This explains why the sort worked, so it goes last."
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
        "r3p5": "The notes say the opposite. The iron was still magnetic after the sort.",
        "r3p6": "No note says heat is always needed. In this test, a magnet separated the mixture."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This says what the sort is evidence about, so it opens the paragraph.",
        "r3p2": "This is the iron's property after the sort, so it is a detail.",
        "r3p3": "This is the sand's property after the sort, so it is a detail.",
        "r3p4": "This states what the mixture shows, so it closes the paragraph."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The log first says what was mixed, then how it was separated. What the sort proves comes last, because it depends on both.",
  "decoyProtest": {
    "r1p5": "Powerful is a property! I measured it by how shiny the magnet was.",
    "r1p6": "Sugar, sand, they're both tiny grains. I combined the lessons.",
    "r2p5": "I held the magnet upside down. Upside down swaps the rules, obviously.",
    "r2p6": "Stir hard enough and it turns into heat, if you believe in it.",
    "r3p5": "The sand cancelled the magnetism. I could feel it happening.",
    "r3p6": "Every mixture wants an oven. It's in the manual I didn't read."
  },
  "requester": {
    "name": "Chief Okafor",
    "emoji": "🛠️",
    "replies": {
      "great": "Log accepted. You separated the iron with the magnet and showed that both parts kept their properties.",
      "good": "Log accepted. The sort is mostly right. Reread the leftover sentences so a new metal does not sneak in.",
      "rough": "Log received. Come find me and we'll read it together. Part of this describes the mixture, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "When the iron and the sand were mixed together, they created a new substance with new properties.",
    "why": "The notes say mixing did not make a new substance. Each part kept its own properties, which is why the magnet could sort them."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p4"
    ],
    "pinpointWhy": "Right. That sentence states that the mixture kept the properties of its parts.",
    "pinpointMiss": "That sentence may be true, but it does not say the mixture kept the properties of its parts.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The iron stayed magnetic, the sand stayed sand, and a magnet could separate them.",
      "b": "The notes say no new substance formed.",
      "c": "The sand did not stick. The iron did.",
      "d": "Sugar dissolving in water is a different test. This jar held iron and sand."
    }
  },
  "mustInclude": [
    "Says a magnet pulled the iron out, or separated the mixture.",
    "Says the sand did not stick, or was left behind.",
    "Says the parts kept their properties, or no new substance formed."
  ],
  "modelAnswer": "A magnet pulled the iron filings out of the sand, while the sand did not stick and stayed on the table. After the sort, the iron was still magnetic and the sand was still gritty. This shows that the mixture kept the properties of its parts, because mixing did not create a new substance.",
  "aiContext": "Grade 5 science, TEKS 5.6B. A mixture of iron filings and sand can be separated with a magnet. Each substance keeps its properties: iron stays magnetic, sand stays gritty and does not stick. Mixing does not create a new substance. Do not accept dissolving sugar, heat, harder stirring, or a new metal. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "magnet",
      "iron",
      "sand"
    ],
    "walkLine": "The magnet is what pulls the iron out and leaves the sand.",
    "why": {
      "a": "Yes. Without the magnet, the iron is not pulled out and you do not get the two piles.",
      "b": "The jar of mixture is still there. It is before the magnet.",
      "c": "The notes show a magnet did the sorting. The mixture did not sort itself.",
      "d": "The iron does not turn into sand. The parts stay themselves."
    }
  },
  "look": {
    "key": "sort",
    "hint": "Follow the arrows. The picture shows a mixed jar, a magnet lifting the dark specks, and a pile of sand. The sand is not on the magnet.",
    "why": "Yes. The magnet pulls the iron out, and the sand is still sand."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say the sand stuck to the magnet. They say the magnet pulled out the iron.",
    "why": "Yes. The iron stuck. The sand stayed down."
  }
};
