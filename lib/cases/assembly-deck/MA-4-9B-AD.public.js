// Safe to import from client components.
// Assembly Deck — MA.4.9B-AD. TEKS 4.9B — one- and two-step problems from data that includes decimals.

export const PUBLIC_CASE = {
  "standard": "MA.4.9B-AD",
  "mode": "problem",
  "grade": 4,
  "subject": "Math",
  "title": "Rainfall Week",
  "estimatedMinutes": 20,
  "brief": [
    "Five days of rain are on a dot plot.",
    "The question asks about the two wettest days, not the most common amount.",
    "Add those two amounts. Do not subtract them."
  ],
  "source": {
    "title": "DOT PLOT",
    "lines": [
      "Rain in inches: 0.5, 0.5, 1.0, 1.5, and 2.0.",
      "Two days had 0.5 inches. That is the most common amount.",
      "The two wettest days had 1.5 inches and 2.0 inches.",
      "The temperature was 70 degrees. The plot cannot say if it will rain next week."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the question the plot can actually answer.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the plot shows",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The two amounts the question needs",
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
          "text": "The wettest day had 2.0 inches."
        },
        {
          "id": "r1p5",
          "text": "The temperature was 70 degrees."
        },
        {
          "id": "r1p1",
          "text": "A dot plot shows the rainfall for five days."
        },
        {
          "id": "r1p6",
          "text": "Will it rain next Monday?"
        },
        {
          "id": "r1p3",
          "text": "The next wettest day had 1.5 inches."
        },
        {
          "id": "r1p4",
          "text": "How much rain fell on those two days together?"
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
      "goal": "Write the equation for the two wettest days and match the plot.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The sum, and which dots",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What r means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The plot that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Use the two dots farthest to the right."
        },
        {
          "id": "r2p5",
          "text": "0.5 + 0.5 = r."
        },
        {
          "id": "r2p1",
          "text": "2.0 + 1.5 = r."
        },
        {
          "id": "r2p6",
          "text": "2.0 - 1.5 = r."
        },
        {
          "id": "r2p3",
          "text": "The letter r stands for the rain on the two wettest days."
        },
        {
          "id": "r2p4",
          "text": "The plot has dots at 0.5, 0.5, 1.0, 1.5, and 2.0."
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
      "goal": "Add the two wettest days and check the sum.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "Name the greatest",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Name the next",
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
          "text": "The next amount is 1.5 inches."
        },
        {
          "id": "r3p5",
          "text": "The answer is 2.0 inches."
        },
        {
          "id": "r3p1",
          "text": "The greatest amount is 2.0 inches."
        },
        {
          "id": "r3p6",
          "text": "Check: 3.5 is bigger, so it must be right."
        },
        {
          "id": "r3p3",
          "text": "2.0 + 1.5 = 3.5 inches of rain."
        },
        {
          "id": "r3p4",
          "text": "Check: 3.5 - 2.0 = 1.5."
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
    "hint": "A reader needs the question, then the model, before the sum.",
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
      "prompt": "One sentence says 2.0 + 1.5 = 3.5 inches of rain. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How much rain fell on the two wettest days?",
      "choices": [
        {
          "id": "a",
          "text": "3.5 inches"
        },
        {
          "id": "b",
          "text": "2.0 inches"
        },
        {
          "id": "c",
          "text": "1.0 inch, from 0.5 + 0.5"
        },
        {
          "id": "d",
          "text": "0.5 inches, from 2.0 - 1.5"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Which two days are the wettest, how much rain fell on them together, and how did you check?",
    "starters": [
      "The wettest day",
      "The next",
      "Together",
      "I checked"
    ],
    "checks": [
      "I named 2.0 inches and 1.5 inches.",
      "I added them.",
      "I said the total is 3.5 inches.",
      "I checked by subtracting.",
      "I did not add the two 0.5 days."
    ],
    "criteria": [
      "Identify 2.0 and 1.5 as the two greatest amounts.",
      "Add them to get 3.5 inches.",
      "Check, such as 3.5 - 2.0 = 1.5."
    ]
  },
  "chain": {
    "title": "Rain line",
    "sourceId": "plot",
    "cutId": "pair",
    "cutDark": [
      "sum"
    ],
    "stayOn": [
      "plot"
    ],
    "cutting": "Taking the two wettest dots away…",
    "cutDone": "No pair. The sum goes dark.",
    "liveLine": "The line is live. Mark what fails if you never pick the two wettest days.",
    "fillLine": "The rain line fills in as each part locks.",
    "links": [
      {
        "id": "plot",
        "label": "The plot",
        "mark": "🌧️",
        "on": "r1"
      },
      {
        "id": "pair",
        "label": "1.5 and 2.0",
        "mark": "••",
        "on": "r2"
      },
      {
        "id": "sum",
        "label": "3.5 inches",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never pick the two wettest days. What fails?",
    "hint": "Mark what goes dark. Then skip that pair.",
    "switch": "Skip the pair",
    "choices": [
      {
        "id": "a",
        "text": "The sum of 3.5 inches",
        "marks": [
          "sum"
        ]
      },
      {
        "id": "b",
        "text": "The whole plot disappears",
        "marks": [
          "plot"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The two 0.5 dots answer it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 2.0",
        "marks": [
          "pair"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the rain line. Which sentence matches the picture?",
    "image": "/student/rain_line.jpg",
    "choices": [
      {
        "id": "dots",
        "text": "Two dots share 0.5, and single dots sit on 1.0, 1.5, and 2.0."
      },
      {
        "id": "same",
        "text": "Every day has the same amount of rain."
      },
      {
        "id": "hot",
        "text": "The picture is a thermometer at 70 degrees."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the rain line. Which sentence matches the picture?"
  },
  "board": null
};
