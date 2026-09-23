// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.4.7D-AD",
  "title": "The Article and the Rumor",
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
        "r1p5": "That is the rumor. The article says repair in June, not closing forever.",
        "r1p6": "Love is a reaction. A summary does not add how you feel."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This gives the time.",
        "r1p3": "This says what will be replaced.",
        "r1p4": "This separates the claim from a shutdown, so it goes last."
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
        "r2p5": "The notes say the field stays open. They do not say repairs spread to it.",
        "r2p6": "June is a month. Forever changes the meaning."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is a limit in the article.",
        "r2p3": "This names what is not in the article.",
        "r2p4": "This says why the rumor stays out, so it goes last."
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
        "r3p5": "Exciting does not make the rumor the article. A summary follows the article.",
        "r3p6": "Skipping the article means you are not summarizing it."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is the claim in fewer words.",
        "r3p3": "These are the details that keep it honest.",
        "r3p4": "This says what would ruin the summary, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the claim, then what the article never says. The fair summary comes last.",
  "decoyProtest": {
    "r1p5": "Forever tested better with my friends.",
    "r1p6": "Happy is a genre.",
    "r2p5": "Repairs spread. I have a theory.",
    "r2p6": "June is forever if summer feels long.",
    "r3p5": "Exciting outranks accurate.",
    "r3p6": "The rumor was shorter, so it wins."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Summary accepted. You kept June, the repair, and the open field, and you left forever out.",
      "good": "Summary accepted. The meaning is mostly safe. Read the leftovers so the rumor does not sneak in.",
      "rough": "I have the card. Come read it with me. Part of this is the article, and part of it is the hall rumor."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "In short, the playground closes forever, which is what the article meant by June.",
    "why": "June is not forever. The article says repair, and the field stays open."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence says the article never says forever.",
    "pinpointMiss": "That sentence may be a detail. It does not say the article never claims a forever closing.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Repair in June, and the field stays open, is the article.",
      "b": "Forever is the rumor, not the article.",
      "c": "June and forever do not mean the same thing.",
      "d": "Exciting does not make a rumor accurate."
    }
  },
  "mustInclude": [
    "Says the playground will be repaired, not closed forever.",
    "Says June, or that the swings and slide will be replaced.",
    "Says the field stays open, or that the article does not say forever."
  ],
  "modelAnswer": "The city will repair the playground in June. The swings and the slide will be replaced, and the field will stay open during the work. The article does not say the playground is closing forever.",
  "aiContext": "Grade 4 ELAR, TEKS 4.7D summarize and keep meaning. Article: city repairs the playground in June, replaces swings and slide, field stays open. Rumor: the whole playground closes forever. A fair summary must not swap June for forever or follow the rumor because it is exciting. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "claim",
      "card"
    ],
    "walkLine": "The claim is what the short card is allowed to say.",
    "why": {
      "a": "Yes. Without the article's claim, the short card has nothing true to hold.",
      "b": "The article is still there. It comes before the claim.",
      "c": "The rumor is not a replacement for the claim.",
      "d": "Forever would change the article. The card should not say that."
    }
  },
  "look": {
    "key": "fair",
    "hint": "Follow the arrows. A neat page, a messy scribble, and a small straight card. The card matches the neat page, not the scribble.",
    "why": "Yes. The short card comes from the article. The scribble is the rumor."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The article never says the playground is closing forever.",
    "why": "Yes. It says the city will repair it in June."
  }
};
