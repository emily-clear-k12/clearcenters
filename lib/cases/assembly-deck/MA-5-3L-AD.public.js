// Safe to import from client components.
// Assembly Deck — MA.5.3L-AD. TEKS 5.3L — divide a whole number by a unit fraction.

export const PUBLIC_CASE = {
  "standard": "MA.5.3L-AD",
  "mode": "problem",
  "grade": 5,
  "subject": "Math",
  "title": "Cutting the Ribbon",
  "estimatedMinutes": 20,
  "brief": [
    "A 3-yard ribbon is cut into pieces that are each 1/4 yard.",
    "The answer is 12 pieces, which is bigger than 3, because you are counting pieces.",
    "Dividing the fraction by 3 answers a different question."
  ],
  "source": {
    "title": "RIBBON NOTES",
    "lines": [
      "The ribbon is 3 yards long.",
      "Each piece should be 1/4 yard.",
      "Each yard makes 4 pieces, so 3 yards make 12 pieces.",
      "Sharing 1/4 yard among 3 people is a different problem. The notes do not give the length of the room."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the piece-counting problem, not the backwards one.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What is being cut?",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The length and the size of a piece",
          "accepts": 2
        },
        {
          "id": "question",
          "label": "The question",
          "hint": "What you are counting",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The ribbon is 3 yards long."
        },
        {
          "id": "r1p5",
          "text": "Each piece is 4 yards long."
        },
        {
          "id": "r1p1",
          "text": "A ribbon is being cut into equal pieces."
        },
        {
          "id": "r1p6",
          "text": "How many yards long is the room?"
        },
        {
          "id": "r1p3",
          "text": "Each piece is 1/4 yard."
        },
        {
          "id": "r1p4",
          "text": "How many pieces do you get?"
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
      "goal": "Write the division and match it to the picture of equal parts.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The division, and the multiplication it becomes",
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
          "hint": "The picture that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "3 × 4 = n."
        },
        {
          "id": "r2p5",
          "text": "3 × 1/4 = n."
        },
        {
          "id": "r2p1",
          "text": "3 ÷ 1/4 = n."
        },
        {
          "id": "r2p6",
          "text": "1/4 ÷ 3 = n."
        },
        {
          "id": "r2p3",
          "text": "The letter n stands for the number of pieces."
        },
        {
          "id": "r2p4",
          "text": "Three bars, and each bar is split into four equal parts."
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
      "goal": "Find the number of pieces and show why the answer is bigger than 3.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "How many pieces in one yard",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "How many in three yards",
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
          "hint": "A check that rebuilds 3 yards",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "3 × 4 = 12."
        },
        {
          "id": "r3p5",
          "text": "You get 3 pieces."
        },
        {
          "id": "r3p1",
          "text": "Each yard makes 4 pieces."
        },
        {
          "id": "r3p6",
          "text": "Check: 12 is bigger than 3, so it must be right."
        },
        {
          "id": "r3p3",
          "text": "You get 12 pieces."
        },
        {
          "id": "r3p4",
          "text": "Check: 12 × 1/4 = 3 yards."
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
    "hint": "A reader needs the ribbon, then the equation, before the 12 pieces.",
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
      "prompt": "One sentence says you get 12 pieces. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How many 1/4-yard pieces are in 3 yards?",
      "choices": [
        {
          "id": "a",
          "text": "12 pieces"
        },
        {
          "id": "b",
          "text": "3 pieces"
        },
        {
          "id": "c",
          "text": "3/4 of a yard"
        },
        {
          "id": "d",
          "text": "1/12 of a yard"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many pieces do you get, and why is that number bigger than 3?",
    "starters": [
      "The ribbon is",
      "Each yard",
      "I get",
      "I checked"
    ],
    "checks": [
      "I said the ribbon is 3 yards.",
      "I said each piece is 1/4 yard.",
      "I said each yard makes 4 pieces.",
      "I said there are 12 pieces.",
      "I checked that 12 × 1/4 = 3."
    ],
    "criteria": [
      "Write 3 ÷ 1/4 or 3 × 4.",
      "Say there are 12 pieces.",
      "Explain that the answer counts pieces, and check that 12 × 1/4 = 3 yards."
    ]
  },
  "chain": {
    "title": "Ribbon line",
    "sourceId": "yards",
    "cutId": "fourths",
    "cutDark": [
      "pieces"
    ],
    "stayOn": [
      "yards"
    ],
    "cutting": "Taking the fourths away…",
    "cutDone": "No fourths. The 12 pieces go dark.",
    "liveLine": "The line is live. Mark what fails if the ribbon is not cut into fourths.",
    "fillLine": "The ribbon line fills in as each part locks.",
    "links": [
      {
        "id": "yards",
        "label": "3 yards",
        "mark": "🎀",
        "on": "r1"
      },
      {
        "id": "fourths",
        "label": "Into fourths",
        "mark": "✂️",
        "on": "r2"
      },
      {
        "id": "pieces",
        "label": "12 pieces",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You do not cut the ribbon into fourths. What fails?",
    "hint": "Mark what goes dark. Then skip the fourths.",
    "switch": "Skip the fourths",
    "choices": [
      {
        "id": "a",
        "text": "The count of 12 pieces",
        "marks": [
          "pieces"
        ]
      },
      {
        "id": "b",
        "text": "The 3 yards disappear",
        "marks": [
          "yards"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The answer is still 3.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 1/12",
        "marks": [
          "pieces"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the ribbon line. Which sentence matches the picture?",
    "image": "/student/ribbon_line.jpg",
    "choices": [
      {
        "id": "four",
        "text": "Three bars, and each bar is split into four equal parts."
      },
      {
        "id": "three",
        "text": "Three bars, with no cuts inside them."
      },
      {
        "id": "room",
        "text": "The picture is a room measured in yards."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the ribbon line. Which sentence matches the picture?"
  },
  "board": null
};
