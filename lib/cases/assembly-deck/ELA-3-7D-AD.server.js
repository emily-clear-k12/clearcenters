// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.3.7D-AD",
  "title": "Say It Shorter",
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
        "r1p5": "A taste opinion is not what the article says.",
        "r1p6": "A moon trip is not in the article."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This tells the big idea.",
        "r1p2": "This is a key fact about the start.",
        "r1p3": "This says who the food was for.",
        "r1p4": "This says what a main idea is, so it goes last."
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
        "r2p5": "That flips the order. They planted and watered before they picked.",
        "r2p6": "The notes say Monday and Friday, not midnight every day."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "unsupported"
      },
      "misplacementNotes": {
        "r2p1": "This tells what this part is about.",
        "r2p2": "This is the watering detail.",
        "r2p3": "This is the picking detail.",
        "r2p4": "This says why the order is true, so it goes last."
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
        "r3p5": "The article does not say the garden failed. That changes the meaning.",
        "r3p6": "Copying every sentence is not a short retelling. The task is to say it shorter."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This tells what this part is about.",
        "r3p2": "This is the meaning in new words.",
        "r3p3": "This keeps the order.",
        "r3p4": "This says what a retelling must not do, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names the main idea, then the details in order. The short retelling comes last.",
  "decoyProtest": {
    "r1p5": "Bad is a fact if I make a face.",
    "r1p6": "Beans, moon, both far away.",
    "r2p5": "I like surprise endings. I planted last.",
    "r2p6": "Midnight is more dramatic.",
    "r3p5": "Failure is shorter. Short is the goal.",
    "r3p6": "Copying is a kind of summary if your hand is tired."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Retelling accepted. You kept the garden, the cafeteria, and the order, and you left your opinion out.",
      "good": "Retelling accepted. The meaning is mostly safe. Read the leftovers so a new ending does not sneak in.",
      "rough": "I have the card. Come read it with me. Part of this matches the article, and part of it changes the news."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 1,
    "text": "The garden failed, and the cafeteria never got the beans.",
    "why": "That changes the meaning. The article says they picked beans for the cafeteria."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p2",
      "r1p1"
    ],
    "pinpointWhy": "Right. That sentence keeps the meaning: the class grew food for the cafeteria.",
    "pinpointMiss": "That sentence may be a detail. It is not the line that says they grew food for the cafeteria.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. That keeps the article's meaning in fewer words.",
      "b": "The article does not say the garden failed.",
      "c": "Taste is your opinion. It is not the article.",
      "d": "A moon trip is not in the article."
    }
  },
  "mustInclude": [
    "Says the class planted or grew beans.",
    "Says the beans, or the food, went to the cafeteria.",
    "Does not say the garden failed or add an opinion about taste."
  ],
  "modelAnswer": "The class planted beans and took care of them. In June they picked the beans for the cafeteria. The garden grew food the school could use.",
  "aiContext": "Grade 3 ELAR, TEKS 3.7D retell and paraphrase. Article: class planted beans in April, watered Monday and Friday, picked beans in June for the cafeteria. Main idea: the garden grew food the cafeteria could use. A retelling must keep meaning and order. Do not accept taste opinions, a moon trip, reversed order, midnight watering, or a failed garden. Copying every sentence is not the task. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "idea",
      "short"
    ],
    "walkLine": "The main idea is what the short card is built from.",
    "why": {
      "a": "Yes. Without the main idea, the short card has nothing true to say.",
      "b": "The long page is still there. It comes before the idea.",
      "c": "Any short sentence can change the meaning. The idea has to stay.",
      "d": "The article does not say the garden failed. That would be a new story."
    }
  },
  "look": {
    "key": "short",
    "hint": "Follow the arrow. A tall page of lines becomes a small card with a few lines.",
    "why": "Yes. The long page is turned into a short card."
  },
  "repair": {
    "pieceId": "r3p5",
    "model": "The article never says the garden failed.",
    "why": "Yes. They picked beans for the cafeteria. The garden did not fail."
  }
};
