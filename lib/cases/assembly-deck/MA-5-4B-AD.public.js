// Safe to import from client components.
// Assembly Deck — MA.5.4B-AD. TEKS 5.4B — multi-step problems with a letter for the unknown.

export const PUBLIC_CASE = {
  "standard": "MA.5.4B-AD",
  "mode": "problem",
  "grade": 5,
  "subject": "Math",
  "title": "The Concession Stand",
  "estimatedMinutes": 20,
  "brief": [
    "Sales are not the same thing as profit.",
    "The letter p stands for the profit, which you do not know until the cost comes off.",
    "Adding the number of items skips the prices."
  ],
  "source": {
    "title": "STAND NOTES",
    "lines": [
      "The stand sold 46 hot dogs for $3 each.",
      "It sold 31 drinks for $2 each.",
      "The food cost the stand $80.",
      "The stand was open for 5 hours. The notes do not say how many people were in the gym."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the profit question, and leave out the number it does not need.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the stand did",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The prices and the cost",
          "accepts": 2
        },
        {
          "id": "question",
          "label": "The question",
          "hint": "The question",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "46 hot dogs sold for $3 each, and 31 drinks sold for $2 each."
        },
        {
          "id": "r1p5",
          "text": "The stand was open for 5 hours."
        },
        {
          "id": "r1p1",
          "text": "The concession stand sold hot dogs and drinks, then paid for the food."
        },
        {
          "id": "r1p6",
          "text": "How many people were in the gym?"
        },
        {
          "id": "r1p3",
          "text": "The food cost the stand $80."
        },
        {
          "id": "r1p4",
          "text": "How much profit did the stand make?"
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    },
    {
      "id": "r2",
      "label": "The model",
      "goal": "Write the profit equation and say what the letter stands for.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "Sales, then subtract the cost",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What p means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The picture that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "p = sales - 80."
        },
        {
          "id": "r2p5",
          "text": "p = 46 + 31 - 80."
        },
        {
          "id": "r2p1",
          "text": "Sales = (46 × 3) + (31 × 2)."
        },
        {
          "id": "r2p6",
          "text": "p = (46 × 3) + (31 × 2)."
        },
        {
          "id": "r2p3",
          "text": "The letter p stands for the profit."
        },
        {
          "id": "r2p4",
          "text": "Two stacks of coins for the sales, then a smaller stack taken away for the cost."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    },
    {
      "id": "r3",
      "label": "Solve and check",
      "goal": "Find the sales, subtract the cost, and check the profit.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "The two products",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "The sales total",
          "accepts": 1
        },
        {
          "id": "answer",
          "label": "The answer",
          "hint": "The profit, with the unit",
          "accepts": 1
        },
        {
          "id": "check",
          "label": "The check",
          "hint": "A check that puts the cost back",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "138 + 62 = 200 in sales."
        },
        {
          "id": "r3p5",
          "text": "The profit is $200."
        },
        {
          "id": "r3p1",
          "text": "46 × 3 = 138, and 31 × 2 = 62."
        },
        {
          "id": "r3p6",
          "text": "Check: 120 is the last step, so it is the profit."
        },
        {
          "id": "r3p3",
          "text": "The profit is $120, because 200 - 80 = 120."
        },
        {
          "id": "r3p4",
          "text": "Check: 120 + 80 = 200, and 138 + 62 = 200."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one problem. What order should a reader hear them in?",
    "hint": "A reader needs the problem, then the letter, before the profit.",
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
      "prompt": "One sentence says the profit is $120. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "What was the profit?",
      "choices": [
        {
          "id": "a",
          "text": "$120"
        },
        {
          "id": "b",
          "text": "$200"
        },
        {
          "id": "c",
          "text": "5 hours"
        },
        {
          "id": "d",
          "text": "46 + 31 - 80"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What were the sales, what was the cost, and what profit was left? Tell what the letter stands for.",
    "starters": [
      "The letter p",
      "Hot dog sales",
      "Drink sales",
      "The profit"
    ],
    "checks": [
      "I said p stands for the profit.",
      "I found $138 from the hot dogs and $62 from the drinks.",
      "I said the sales were $200.",
      "I subtracted $80 and got a profit of $120.",
      "I did not call $200 the profit."
    ],
    "criteria": [
      "Use a letter for the profit, or explain profit as sales minus cost.",
      "Show the sales: 46 × 3 and 31 × 2, totaling $200.",
      "Subtract $80 to get a profit of $120, and check it."
    ]
  },
  "chain": {
    "title": "Stand line",
    "sourceId": "sales",
    "cutId": "cost",
    "cutDark": [
      "profit"
    ],
    "stayOn": [
      "sales"
    ],
    "cutting": "Taking the cost away from the equation…",
    "cutDone": "No cost. The profit goes dark.",
    "liveLine": "The line is live. Mark what fails if the cost is never subtracted.",
    "fillLine": "The stand line fills in as each part locks.",
    "links": [
      {
        "id": "sales",
        "label": "$200 sales",
        "mark": "🌭",
        "on": "r3"
      },
      {
        "id": "cost",
        "label": "$80 cost",
        "mark": "➖",
        "on": "r2"
      },
      {
        "id": "profit",
        "label": "$120 profit",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never subtract the cost. What fails?",
    "hint": "Mark what goes dark. Then leave the cost out.",
    "switch": "Skip the cost",
    "choices": [
      {
        "id": "a",
        "text": "The profit of $120",
        "marks": [
          "profit"
        ]
      },
      {
        "id": "b",
        "text": "The sales disappear",
        "marks": [
          "sales"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Sales and profit are the same.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The profit becomes $200",
        "marks": [
          "cost"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the stand line. Which sentence matches the picture?",
    "image": "/student/stand_line.jpg",
    "choices": [
      {
        "id": "off",
        "text": "Two stacks of coins, then a smaller stack set apart as if taken away."
      },
      {
        "id": "only",
        "text": "One stack of coins, with nothing taken away."
      },
      {
        "id": "hours",
        "text": "The picture is a clock showing 5 hours."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the stand line. Which sentence matches the picture?"
  },
  "board": null
};
