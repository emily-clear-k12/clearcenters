// Safe to import from client components.
// Assembly Deck — MA.4.5B-AD. TEKS 4.5B — an input-output rule written as a numerical expression.

export const PUBLIC_CASE = {
  "standard": "MA.4.5B-AD",
  "mode": "problem",
  "grade": 4,
  "subject": "Math",
  "title": "The Sticker Machine",
  "estimatedMinutes": 20,
  "brief": [
    "The machine uses one rule on every row.",
    "Test the rule on a row you already know. Then use it on 6.",
    "Adding 3 is a different machine."
  ],
  "source": {
    "title": "MACHINE TABLE",
    "lines": [
      "When 1 goes in, 4 comes out.",
      "When 2 goes in, 7 comes out.",
      "When 4 goes in, 13 comes out.",
      "The rule is multiply by 3, then add 1. The question asks what comes out when 6 goes in."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the problem from the table.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the machine does",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "Two rows that show the rule",
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
          "text": "When 1 goes in, 4 comes out."
        },
        {
          "id": "r1p5",
          "text": "The machine adds 3 every time."
        },
        {
          "id": "r1p1",
          "text": "A sticker machine uses the same rule on every input."
        },
        {
          "id": "r1p6",
          "text": "What color are the stickers?"
        },
        {
          "id": "r1p3",
          "text": "When 2 goes in, 7 comes out."
        },
        {
          "id": "r1p4",
          "text": "What comes out when 6 goes in?"
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
      "label": "The rule",
      "goal": "Write the rule, say what n stands for, and match the table.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The rule, then the expression for 6",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What n means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The table that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "For 6, the expression is 3 × 6 + 1."
        },
        {
          "id": "r2p5",
          "text": "The rule is n + 3."
        },
        {
          "id": "r2p1",
          "text": "The rule is 3 × n + 1."
        },
        {
          "id": "r2p6",
          "text": "3 × 6 = 18, and the +1 does not belong."
        },
        {
          "id": "r2p3",
          "text": "The letter n stands for the number that goes in."
        },
        {
          "id": "r2p4",
          "text": "The table shows 1 to 4, 2 to 7, and 4 to 13."
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
      "goal": "Use the rule on 6, then test it on a known row.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "Multiply",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Add 1",
          "accepts": 1
        },
        {
          "id": "answer",
          "label": "The answer",
          "hint": "The answer, with the unit",
          "accepts": 1
        },
        {
          "id": "check",
          "label": "The check",
          "hint": "A check on a known row",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "18 + 1 = 19."
        },
        {
          "id": "r3p5",
          "text": "18 stickers come out."
        },
        {
          "id": "r3p1",
          "text": "3 × 6 = 18."
        },
        {
          "id": "r3p6",
          "text": "Check: 19 is the answer, so the rule works."
        },
        {
          "id": "r3p3",
          "text": "19 stickers come out."
        },
        {
          "id": "r3p4",
          "text": "Check: 3 × 4 + 1 = 13, and the table says 13."
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
    "hint": "A reader needs the table, then the rule, before the output for 6.",
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
      "prompt": "One sentence says the rule is 3 × n + 1. Tap it.",
      "hint": "Look in the rule part."
    },
    "quickCheck": {
      "prompt": "What comes out when 6 goes in?",
      "choices": [
        {
          "id": "a",
          "text": "19 stickers"
        },
        {
          "id": "b",
          "text": "18 stickers"
        },
        {
          "id": "c",
          "text": "9 stickers, because 6 + 3 = 9"
        },
        {
          "id": "d",
          "text": "The color of the stickers"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What is the machine's rule, and what comes out when 6 goes in? How did you check?",
    "starters": [
      "The rule is",
      "3 times 6",
      "I checked with"
    ],
    "checks": [
      "I said the rule multiplies by 3 and then adds 1.",
      "I showed 3 × 6 = 18.",
      "I added 1 to get 19.",
      "I checked the rule on a row from the table.",
      "I did not say the machine only adds 3."
    ],
    "criteria": [
      "State the rule 3 × n + 1, or multiply by 3 and add 1.",
      "Get 19 when 6 goes in.",
      "Check on a known row, such as 4 giving 13."
    ]
  },
  "chain": {
    "title": "Machine line",
    "sourceId": "table",
    "cutId": "rule",
    "cutDark": [
      "out"
    ],
    "stayOn": [
      "table"
    ],
    "cutting": "Taking the rule away…",
    "cutDone": "No rule. The output for 6 goes dark.",
    "liveLine": "The line is live. Mark what fails if the rule is gone.",
    "fillLine": "The machine line fills in as each part locks.",
    "links": [
      {
        "id": "table",
        "label": "The table",
        "mark": "🔢",
        "on": "r1"
      },
      {
        "id": "rule",
        "label": "3n + 1",
        "mark": "⚙️",
        "on": "r2"
      },
      {
        "id": "out",
        "label": "19 out",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You drop the rule. What fails?",
    "hint": "Mark what goes dark. Then take the rule away.",
    "switch": "Drop the rule",
    "choices": [
      {
        "id": "a",
        "text": "The output of 19",
        "marks": [
          "out"
        ]
      },
      {
        "id": "b",
        "text": "The table disappears",
        "marks": [
          "table"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Adding 3 still fits.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The output becomes 18",
        "marks": [
          "rule"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the machine line. Which sentence matches the picture?",
    "image": "/student/sticker_line.jpg",
    "choices": [
      {
        "id": "table",
        "text": "The table shows 1 to 4, 2 to 7, 4 to 13, and a blank for 6."
      },
      {
        "id": "add",
        "text": "Every output is the input plus 3."
      },
      {
        "id": "blank",
        "text": "The table has no numbers."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the machine line. Which sentence matches the picture?"
  },
  "board": null
};
