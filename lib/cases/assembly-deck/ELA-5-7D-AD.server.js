// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.5.7D-AD",
  "title": "Two Summaries, One Article",
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
        "r1p5": "That is the hallway summary, not the article. The article says cars will still drive on Maple Street.",
        "r1p6": "Loving bikes is a personal reaction. A summary reports the article and does not add how you feel."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This gives the time.",
        "r1p3": "This gives the route.",
        "r1p4": "This separates a change from a closing, so it goes last."
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
        "r2p5": "The article only says one parking lane becomes the bike lane. It never says the second one will be removed.",
        "r2p6": "A bike lane is not a ban. The article says cars will still drive there."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the limit about cars.",
        "r2p3": "This is the limit about parking.",
        "r2p4": "This says why the ban stays out, so it goes last."
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
        "r3p5": "Being exciting does not make the hallway line true. A summary follows the article, not what sounds best.",
        "r3p6": "Skipping the article means you are repeating a rumor instead of summarizing the article."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is the claim in fewer words.",
        "r3p3": "This keeps the limit.",
        "r3p4": "This says what would ruin the summary, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the claim, then the limit about cars. The fair summary comes last.",
  "decoyProtest": {
    "r1p5": "The hallway said it louder.",
    "r1p6": "Perfect is a summary word.",
    "r2p5": "One lane, both lanes, close enough.",
    "r2p6": "Short and exciting should win.",
    "r3p5": "A ban gets more attention.",
    "r3p6": "The hallway already did the work."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Summary accepted. You kept the bike lane, August, and the cars, and you left the ban out.",
      "good": "Summary accepted. The meaning is mostly safe. Read the leftovers so the hallway line does not sneak in.",
      "rough": "I have the card. Come read it with me. Part of this is the article, and part of it is the ban."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "In short, cars will be banned, which is what the article really meant by a bike lane.",
    "why": "A bike lane is not a ban. The article says cars will still drive on Maple Street."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says cars will still drive on Maple Street.",
    "pinpointMiss": "That sentence may be a detail. It does not say cars will still drive there.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. A bike lane in August, with cars still allowed, matches the article.",
      "b": "The ban is the hallway summary, not the article.",
      "c": "A bike lane does not mean cars are banned.",
      "d": "The article changes one parking lane, not both."
    }
  },
  "mustInclude": [
    "Says Maple Street will get a bike lane.",
    "Says August, or that the lane runs from the school to the park.",
    "Says cars will still drive there, or that the article does not ban cars."
  ],
  "modelAnswer": "In August, the city will paint a bike lane on Maple Street from the school to the park. Cars will still be able to drive there, because only one parking lane will become the bike lane. The article never says cars will be banned.",
  "aiContext": "Grade 5 ELAR, TEKS 5.7D summarize and keep meaning. Article: a bike lane will be painted on Maple Street from the school to the park in August. Cars will still drive there. One parking lane becomes the bike lane. Hallway summary wrongly says cars will be banned. A fair summary must not treat banned as a synonym for bike lane, remove both parking lanes, or prefer the rumor because it is exciting. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "claim",
      "card"
    ],
    "walkLine": "The article's claim is the only news the short card may carry.",
    "why": {
      "a": "Yes. Without the claim, the short card has nothing true to say.",
      "b": "The article is still there. It comes before the claim.",
      "c": "The hallway ban is not a stand-in for the claim.",
      "d": "A ban would change the article. The card should not say that."
    }
  },
  "look": {
    "key": "both",
    "hint": "Follow the arrows. Cars still on the street, a separate path with a bicycle, a scribble, then a short card.",
    "why": "Yes. Cars and a bike path are both in the picture. The scribble is not the summary."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The article never says cars will be banned.",
    "why": "Yes. Cars will still drive on Maple Street."
  }
};
