// Safe to import from client components.
// Assembly Deck — MA.3.4K-AD. TEKS 3.4K — one-step and two-step multiplication and division within 100.

export const PUBLIC_CASE = {
  "standard": "MA.3.4K-AD",
  "mode": "problem",
  "grade": 3,
  "subject": "Math",
  "title": "The Garden Beds",
  "estimatedMinutes": 20,
  "brief": [
    "Each bed has the same array of seeds.",
    "Find the seeds in one bed. Then find the seeds in both.",
    "The width of a bed is not a number of seeds."
  ],
  "source": {
    "title": "BED NOTES",
    "lines": [
      "There are 2 beds.",
      "Each bed has 6 rows, with 4 seeds in a row.",
      "Each bed is 3 feet wide. The question does not ask for feet.",
      "The notes do not say how tall the plants will grow."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the word problem about the seeds.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What is being planted?",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "Rows and beds",
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
          "text": "Each bed has 6 rows of 4 seeds."
        },
        {
          "id": "r1p5",
          "text": "Each bed is 3 feet wide."
        },
        {
          "id": "r1p1",
          "text": "Two garden beds are planted the same way."
        },
        {
          "id": "r1p6",
          "text": "How tall will the plants grow?"
        },
        {
          "id": "r1p3",
          "text": "There are 2 beds."
        },
        {
          "id": "r1p4",
          "text": "How many seeds are planted in all?"
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
      "goal": "Build the equations for one bed and then both.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "One bed, then both beds",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What t means",
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
          "text": "s × 2 = t."
        },
        {
          "id": "r2p5",
          "text": "6 + 4 + 2 = t."
        },
        {
          "id": "r2p1",
          "text": "6 × 4 = s."
        },
        {
          "id": "r2p6",
          "text": "One array of 6 rows of 4, and the second bed left out."
        },
        {
          "id": "r2p3",
          "text": "The letter t stands for all the seeds."
        },
        {
          "id": "r2p4",
          "text": "Two matching arrays, each with 6 rows of 4."
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
      "goal": "Find the seeds in one bed, then in both, and check.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "One bed",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Both beds",
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
          "hint": "A check",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "24 × 2 = 48."
        },
        {
          "id": "r3p5",
          "text": "The answer is 24 seeds."
        },
        {
          "id": "r3p1",
          "text": "6 × 4 = 24 seeds in one bed."
        },
        {
          "id": "r3p6",
          "text": "There are 48."
        },
        {
          "id": "r3p3",
          "text": "There are 48 seeds."
        },
        {
          "id": "r3p4",
          "text": "Check: 48 ÷ 2 = 24, and 24 is 6 × 4."
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
    "hint": "A reader needs the problem, then the model, before the total.",
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
      "prompt": "One sentence says there are 48 seeds. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How many seeds are planted?",
      "choices": [
        {
          "id": "a",
          "text": "48 seeds"
        },
        {
          "id": "b",
          "text": "24 seeds"
        },
        {
          "id": "c",
          "text": "3 feet"
        },
        {
          "id": "d",
          "text": "6 + 4 + 2 seeds"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many seeds are in one bed, and how many are in both beds?",
    "starters": [
      "One bed has",
      "Both beds have",
      "I checked"
    ],
    "checks": [
      "I multiplied 6 × 4.",
      "I said one bed has 24 seeds.",
      "I multiplied by 2 beds.",
      "I said there are 48 seeds.",
      "I did not use the 3 feet."
    ],
    "criteria": [
      "Show 6 × 4 = 24 seeds in one bed.",
      "Multiply by 2 to get 48 seeds.",
      "Check, such as 48 ÷ 2 = 24."
    ]
  },
  "chain": {
    "title": "Seed line",
    "sourceId": "bed",
    "cutId": "one",
    "cutDark": [
      "both"
    ],
    "stayOn": [
      "bed"
    ],
    "cutting": "Taking one bed away…",
    "cutDone": "No seeds in one bed. The total goes dark.",
    "liveLine": "The line is live. Mark what fails if you never find one bed.",
    "fillLine": "The seed line fills in as each part locks.",
    "links": [
      {
        "id": "bed",
        "label": "The beds",
        "mark": "🌱",
        "on": "r1"
      },
      {
        "id": "one",
        "label": "24 seeds",
        "mark": "✖️",
        "on": "r3"
      },
      {
        "id": "both",
        "label": "48 seeds",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never find the seeds in one bed. What fails?",
    "hint": "Mark what goes dark. Then skip the 24.",
    "switch": "Skip one bed",
    "choices": [
      {
        "id": "a",
        "text": "The total of 48 seeds",
        "marks": [
          "both"
        ]
      },
      {
        "id": "b",
        "text": "The beds disappear",
        "marks": [
          "bed"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 3 feet answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 24",
        "marks": [
          "one"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the seed line. Which sentence matches the picture?",
    "image": "/student/seed_line.jpg",
    "choices": [
      {
        "id": "two",
        "text": "Two matching arrays, each with six rows of four."
      },
      {
        "id": "one",
        "text": "Only one array is shown."
      },
      {
        "id": "feet",
        "text": "The picture is a bed measured in feet."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the seed line. Which sentence matches the picture?"
  },
  "board": null
};
