// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.4.3D-AD",
  "title": "A Country With No Money",
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
        "r1p5": "The notes say the Republic was deep in debt. It was not rich and powerful.",
        "r1p6": "Fame is not evidence. The notes keep the problems beside the successes."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This is one success.",
        "r1p3": "This is another success.",
        "r1p4": "This says what those facts add up to, so it goes last."
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
        "r2p5": "The notes say the Republic was deep in debt. They do not say the debt was paid off.",
        "r2p6": "Independence did not end the debt, the threat from Mexico, or the conflict over land."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the money problem.",
        "r2p3": "This says the conflict was not a success.",
        "r2p4": "This blocks the hero story, so it goes last."
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
        "r3p5": "Spindletop was in 1901, long after the Republic ended in 1845. Oil did not pay the Republic.",
        "r3p6": "The notes say the Republic did write a constitution. That was a success, not the reason it joined."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This gives the year of annexation.",
        "r3p3": "This says what Texas needed.",
        "r3p4": "This names the two pressures, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names what worked, then the problems. Annexation comes last.",
  "decoyProtest": {
    "r1p5": "Powerful is a compliment, so it is a fact.",
    "r1p6": "Heroes cancel ledgers.",
    "r2p5": "I paid it in my head.",
    "r2p6": "Independence is a happy ending. I stopped there.",
    "r3p5": "1901, 1845, both are years.",
    "r3p6": "No constitution makes a cleaner plot."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Account accepted. You kept a real success beside the debt, and you tied annexation to what the Republic lacked.",
      "good": "Account accepted. The Republic is mostly fair. Read the leftovers so a hero story does not erase the debt.",
      "rough": "I have the piece. Come read it with me. Part of this matches the record, and part of it skips the problems."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Once Sam Houston was president, the debt and the conflicts were solved.",
    "why": "A president was a success. The notes say the debt, the money, and the conflict over land remained."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p2"
    ],
    "pinpointWhy": "Right. That sentence says Texas joined the United States in 1845.",
    "pinpointMiss": "That sentence may belong. It does not give the year Texas joined the United States.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. A constitution and a debt were both true.",
      "b": "The Republic was not rich, and the problems were not over.",
      "c": "Oil in 1901 came long after the Republic ended.",
      "d": "The Republic did have a constitution. That is not why it joined."
    }
  },
  "mustInclude": [
    "Names a success, such as the constitution or Sam Houston.",
    "Names a problem, such as debt, paper money, Mexico, or conflict over land.",
    "Says Texas joined the United States in 1845, or that it needed money and protection."
  ],
  "modelAnswer": "The Republic of Texas wrote a constitution and elected Sam Houston. It was also deep in debt, and its paper money lost value. Texas joined the United States in 1845 because it needed money and protection.",
  "aiContext": "Grade 4 Social Studies, TEKS 4.3D. Republic of Texas, 1836 to 1845. Successes: a constitution, Sam Houston as first president, Texas Rangers organized. Problems: deep debt, paper money lost value, Mexico did not accept independence, conflict with American Indian nations over land was not a success. Annexation in 1845 because it needed money and protection. Spindletop oil was 1901, after the Republic. Do not accept rich-and-powerful, problems solved by a hero, debt paid in year one, oil paying the Republic, or no constitution. Do not penalize spelling. Do not add graphic detail about conflict.",
  "whatIf": {
    "key": "a",
    "walk": [
      "debt",
      "join"
    ],
    "walkLine": "The debt is a reason annexation kept coming up.",
    "why": {
      "a": "Yes. Without the debt, a main push to join the United States drops out.",
      "b": "The Republic still exists. The flag comes before the debt.",
      "c": "Oil was not the reason. It came in 1901.",
      "d": "Erasing the debt does not make the debt larger."
    }
  },
  "look": {
    "key": "join",
    "hint": "Follow the arrows. A blue flag with one star, an empty chest, then that flag beside the United States flag.",
    "why": "Yes. The Republic, the empty chest, then joining the United States."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the Republic was rich and powerful.",
    "why": "Yes. It was deep in debt. The chest is empty."
  }
};
