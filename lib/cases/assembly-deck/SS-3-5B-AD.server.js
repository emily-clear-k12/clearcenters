// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.3.5B-AD",
  "title": "The Field Trip Fund",
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
        "r1p5": "The notes say the jar has $20, not $50.",
        "r1p6": "A bake sale story is not this budget."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This tells what you have.",
        "r1p2": "This says the $20 is the whole plan.",
        "r1p3": "This says nothing else is coming.",
        "r1p4": "This says where a budget starts, so it goes last."
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
        "r2p5": "Tickets are $12, not $20. Snacks are $4, not free.",
        "r2p6": "A pet is a wish. It is not in this budget."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "opinion"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the ticket cost.",
        "r2p3": "This is the snack cost.",
        "r2p4": "This adds the two needs, so it goes last."
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
        "r3p5": "Tickets are the trip. The notes say to cut the stickers, not the tickets.",
        "r3p6": "With stickers the plan is $22, not $20."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says the stickers are the wish.",
        "r3p3": "This says what to cut and what to save.",
        "r3p4": "This shows the budget balances, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece starts with the $20, then the trip costs. The cut and the savings come last.",
  "decoyProtest": {
    "r1p5": "$50 feels richer.",
    "r1p6": "Fun is a budget line.",
    "r2p5": "Free snacks are kinder.",
    "r2p6": "A pet is a need if you love it.",
    "r3p5": "Stickers are the real trip.",
    "r3p6": "$22 is close to $20."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Budget accepted. You spent $16 on the trip, cut the stickers, and saved $4.",
      "good": "Budget accepted. The jar is mostly clear. Read the leftovers so a wish does not sneak in as a need.",
      "rough": "I have the plan. Come read it with me. Part of this matches the $20, and part of it spends money you do not have."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Buy the stickers too. We can call $22 a kind of $20.",
    "why": "The jar has $20. Tickets and snacks are $16. Stickers would make $22. The wish has to come out."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p2"
    ],
    "pinpointWhy": "Right. That sentence says the stickers cost $6 and are a wish.",
    "pinpointMiss": "That sentence may belong. It does not say the stickers are a $6 wish.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. $16 spent and $4 saved uses the $20.",
      "b": "Tickets are the trip. Cut the wish, not the tickets.",
      "c": "$22 is more than the jar. Calling it $20 does not balance it.",
      "d": "A pet is not in this budget."
    }
  },
  "mustInclude": [
    "Says the jar has $20.",
    "Says tickets and snacks are the spending, or gives $12 and $4.",
    "Says the stickers are cut and some money is saved."
  ],
  "modelAnswer": "The jar has $20. Tickets cost $12 and snacks cost $4, so the trip costs $16. Cut the $6 stickers. Save the other $4.",
  "aiContext": "Grade 3 Social Studies, TEKS 3.5B simple budget. Jar has $20 and no more is coming. Needs: museum tickets $12 and snacks $4, together $16. Stickers are $6 and a wish. Keeping stickers makes $22, which is over. Cut stickers, spend $16, save $4. Do not accept $50, a bake sale, free snacks, a class pet, skipping tickets, or calling $22 the same as $20. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "wish",
      "save"
    ],
    "walkLine": "The stickers are the wish. If they stay, the savings cannot.",
    "why": {
      "a": "Yes. Keeping the stickers uses the money that was going to be saved.",
      "b": "The jar is still there. It comes before the wish.",
      "c": "$22 is not the same as $20.",
      "d": "Keeping stickers does not make the tickets free."
    }
  },
  "look": {
    "key": "plan",
    "hint": "Follow the arrows. A jar of coins, tickets and an apple, then a small stack of coins.",
    "why": "Yes. Money in, the trip items, then coins set aside."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say the jar has $50.",
    "why": "Yes. The jar has $20."
  }
};
