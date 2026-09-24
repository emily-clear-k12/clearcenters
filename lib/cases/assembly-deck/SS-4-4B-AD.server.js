// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.4.4B-AD",
  "title": "The Price of a Longhorn",
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
        "r1p5": "The notes say about $4 in Texas and about $40 at the railhead. The prices were not the same.",
        "r1p6": "Adventure is a movie reason. The notes tie the drives to the price gap."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This is the Texas price.",
        "r1p3": "This is the railhead price.",
        "r1p4": "This says why the gap caused the drives, so it goes last."
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
        "r2p5": "The notes say the herds walked north, toward the railroad and the higher price.",
        "r2p6": "The notes say Lizzie Johnson owned herds and sent them up the trail."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This says the direction.",
        "r2p3": "This names three people from the notes.",
        "r2p4": "This says what kind of work it was, so it goes last."
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
        "r3p5": "Barbed wire closed the open range. It did not make the long drives more common.",
        "r3p6": "The notes do not say the prices switched. The drives faded because rails and wire changed the route."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is the railroad change.",
        "r3p3": "This is the barbed-wire change.",
        "r3p4": "This says what those changes did to the drive, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the price gap, then how the drives worked. What ended them comes last.",
  "decoyProtest": {
    "r1p5": "Equal prices are easier to remember.",
    "r1p6": "Adventure is the real economy.",
    "r2p5": "South is also a direction.",
    "r2p6": "I was not sure a woman counted. The notes counted her.",
    "r3p5": "More wire, more trail. I guessed.",
    "r3p6": "Swapping the prices makes a twist."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. You used the price gap, the trail north, and a real reason the drives ended.",
      "good": "Explanation accepted. The prices are mostly right. Read the leftovers so a movie reason does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is the price gap, and part of it is a cowboy story."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The railroad could not carry cattle, so the long drives grew after the tracks arrived.",
    "why": "The notes say railroads let ranchers ship cattle from Texas. That is part of why the long drives ended."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p3"
    ],
    "pinpointWhy": "Right. That sentence says the railhead price was about $40.",
    "pinpointMiss": "That sentence may belong. It does not say the Kansas price was about $40.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. About $4 in Texas and about $40 at the railhead is why the drives paid.",
      "b": "The prices were not the same.",
      "c": "The herds walked north, toward the railroad.",
      "d": "Barbed wire helped end the long drives. It did not make them more common."
    }
  },
  "mustInclude": [
    "Uses the price gap, about $4 in Texas and about $40 at a railhead.",
    "Says the herds walked north to a railroad.",
    "Names Goodnight, King, or Lizzie Johnson, or explains that railroads or barbed wire ended most long drives."
  ],
  "modelAnswer": "A longhorn sold for about $4 in Texas and about $40 at a Kansas railhead, so herds walked north to the railroad. Charles Goodnight, Richard King, and Lizzie Johnson took part in that business. Railroads in Texas and barbed wire ended most of the long drives.",
  "aiContext": "Grade 4 Social Studies, TEKS 4.4B. After the Civil War a longhorn was worth about $4 in Texas and about $40 at a Kansas railhead. Herds walked north for weeks. Charles Goodnight helped open a trail, Richard King built the King Ranch, and Lizzie Johnson owned herds and sent them up the trail. By the late 1880s railroads reached more of Texas and barbed wire closed the open range, so the long drive was no longer the best way. Do not accept equal prices, adventure as the cause, walking south, Lizzie Johnson as a myth, barbed wire making drives more common, or the railroad being unable to carry cattle. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "drive",
      "high"
    ],
    "walkLine": "The drive is how the higher price gets collected.",
    "why": {
      "a": "Yes. If the herd never walks north, the higher price is not collected.",
      "b": "The low Texas price is still there. It comes before the drive.",
      "c": "The notes say the prices were different, about $4 and about $40.",
      "d": "Stopping the drive does not raise the Texas price to $40."
    }
  },
  "look": {
    "key": "gap",
    "hint": "Follow the arrows. Longhorns beside a small coin, a trail with a herd, then a train beside a larger coin.",
    "why": "Yes. The small coin, the drive, and the bigger coin match the price gap."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the Texas price and the Kansas price were the same.",
    "why": "Yes. One was about $4 and the other about $40."
  }
};
