// Safe to import from client components.
// Assembly Deck — SS.3.5B-AD. TEKS 3.5B — a simple budget that spends and saves.

export const PUBLIC_CASE = {
  "standard": "SS.3.5B-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Social Studies",
  "title": "The Field Trip Fund",
  "estimatedMinutes": 20,
  "brief": [
    "The class jar has $20. The plan costs more than that.",
    "A budget shows money in, money out, and what to cut.",
    "A wish is not a need."
  ],
  "source": {
    "title": "THE JAR",
    "lines": [
      "The class jar has $20. No more money is coming in.",
      "Museum tickets cost $12. Snacks cost $4.",
      "Stickers cost $6. Stickers are a wish, not the trip.",
      "Tickets plus snacks is $16.",
      "If the stickers stay, the plan costs $22. That is too much.",
      "Cut the stickers. Spend $16. Save $4."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Money in",
      "goal": "Build the paragraph about the money the class has.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "How much is in the jar, and that no more is coming",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Where a budget starts",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "That $20 is all the money for this plan."
        },
        {
          "id": "r1p5",
          "text": "The jar has $50."
        },
        {
          "id": "r1p1",
          "text": "The class jar has $20."
        },
        {
          "id": "r1p6",
          "text": "Last year's bake sale was so fun."
        },
        {
          "id": "r1p3",
          "text": "No more money is coming in."
        },
        {
          "id": "r1p4",
          "text": "A budget starts with the money you have."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "opinion",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "Money out",
      "goal": "Build the paragraph about the trip costs.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "The ticket price, and the snack price",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What those two add up to",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Museum tickets cost $12."
        },
        {
          "id": "r2p5",
          "text": "Tickets cost $20, so snacks are free."
        },
        {
          "id": "r2p1",
          "text": "The trip needs two things."
        },
        {
          "id": "r2p6",
          "text": "A class pet is a real cost."
        },
        {
          "id": "r2p3",
          "text": "Snacks cost $4."
        },
        {
          "id": "r2p4",
          "text": "Those two costs are $16."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "What to cut",
      "goal": "Build the paragraph that makes the budget balance.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Why stickers have to go, and what is left to save",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "How the $20 is used",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Stickers cost $6, and they are a wish."
        },
        {
          "id": "r3p5",
          "text": "Keep the stickers and skip the tickets."
        },
        {
          "id": "r3p1",
          "text": "Stickers would make the plan too big."
        },
        {
          "id": "r3p6",
          "text": "The total is still $20 if the stickers stay."
        },
        {
          "id": "r3p3",
          "text": "Cut the stickers. Then $4 can be saved."
        },
        {
          "id": "r3p4",
          "text": "Spend $16 and save $4. That uses the $20."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one budget. What order should a reader hear them in?",
    "hint": "A reader needs the money in, then the costs, before the cut.",
    "slots": [
      {
        "id": "first",
        "label": "Opens the piece"
      },
      {
        "id": "second",
        "label": "Middle"
      },
      {
        "id": "third",
        "label": "Closes the piece"
      }
    ]
  },
  "debrief": {
    "pinpoint": {
      "prompt": "One sentence says stickers cost $6 and are a wish. Tap it.",
      "hint": "Look in the part about what to cut."
    },
    "quickCheck": {
      "prompt": "Which plan uses the $20?",
      "choices": [
        {
          "id": "a",
          "text": "Spend $16 on tickets and snacks, and save $4"
        },
        {
          "id": "b",
          "text": "Keep the stickers and skip the tickets"
        },
        {
          "id": "c",
          "text": "Spend $22 and call it $20"
        },
        {
          "id": "d",
          "text": "Buy a class pet"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How much money is in the jar, what will you spend it on, and what will you cut?",
    "starters": [
      "The jar has",
      "Tickets cost",
      "Snacks cost",
      "I will cut"
    ],
    "checks": [
      "I said the jar has $20.",
      "I said tickets and snacks are the costs.",
      "I said to cut the stickers.",
      "I said some money is saved.",
      "I did not add a pet or a bake sale."
    ],
    "criteria": [
      "Say the jar has $20.",
      "Say tickets are $12 and snacks are $4, or that those needs cost $16.",
      "Say the stickers are cut and $4 is saved."
    ]
  },
  "chain": {
    "title": "Budget line",
    "sourceId": "jar",
    "cutId": "wish",
    "cutDark": [
      "save"
    ],
    "stayOn": [
      "jar"
    ],
    "cutting": "Leaving the stickers in the plan…",
    "cutDone": "The wish stays. The savings go dark.",
    "liveLine": "The line is live. Mark what fails if the stickers stay.",
    "fillLine": "The budget line fills in as each part locks.",
    "links": [
      {
        "id": "jar",
        "label": "$20 in",
        "mark": "🫙",
        "on": "r1"
      },
      {
        "id": "wish",
        "label": "Stickers",
        "mark": "⭐",
        "on": "r3"
      },
      {
        "id": "save",
        "label": "Save $4",
        "mark": "🪙",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Keep the stickers. What fails?",
    "hint": "Mark what goes dark. Then keep the wish.",
    "switch": "Keep the stickers",
    "choices": [
      {
        "id": "a",
        "text": "The savings",
        "marks": [
          "save"
        ]
      },
      {
        "id": "b",
        "text": "The jar disappears",
        "marks": [
          "jar"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. $22 is the same as $20.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The tickets become free",
        "marks": [
          "wish"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the budget line. Which sentence matches the picture?",
    "image": "/student/budget_line.jpg",
    "choices": [
      {
        "id": "plan",
        "text": "A jar of coins, tickets and a snack, then some coins set aside."
      },
      {
        "id": "pet",
        "text": "A pet stands where the coins should be."
      },
      {
        "id": "empty",
        "text": "The jar is empty, and there are no tickets."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the budget line. Which sentence matches the picture?"
  },
  "board": null
};
