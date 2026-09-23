// Safe to import from client components.
// Assembly Deck — MA.5.9C-AD. TEKS 5.9C — one- and two-step problems from a bar graph and a stem-and-leaf plot of the same data.

export const PUBLIC_CASE = {
  "standard": "MA.5.9C-AD",
  "mode": "problem",
  "grade": 5,
  "subject": "Math",
  "title": "The Science Fair Scores",
  "estimatedMinutes": 20,
  "brief": [
    "The same scores are shown two ways. The question asks for a comparison of groups.",
    "Use the counts, not the stems and not the highest score minus the lowest.",
    "A higher booth number did not cause a higher score."
  ],
  "source": {
    "title": "TWO GRAPHS",
    "lines": [
      "Scores: 78, 84, 84, 91, 91, 91, and 96.",
      "The bar graph shows 1 project in the 70s, 2 in the 80s, and 4 in the 90s.",
      "The stem-and-leaf plot shows 7 | 8, 8 | 4 4, and 9 | 1 1 1 6.",
      "Booth 2 scored 96. Booth 12 scored 78. A higher booth number did not mean a higher score."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the comparison the graphs can answer.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the two graphs show",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The two bars this question uses",
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
          "text": "The 90s bar has 4 projects."
        },
        {
          "id": "r1p5",
          "text": "A higher booth number causes a higher score."
        },
        {
          "id": "r1p1",
          "text": "The same science-fair scores appear in a bar graph and a stem-and-leaf plot."
        },
        {
          "id": "r1p6",
          "text": "How many more points is 96 than 78?"
        },
        {
          "id": "r1p3",
          "text": "The 70s bar has 1 project."
        },
        {
          "id": "r1p4",
          "text": "How many more projects scored in the 90s than in the 70s?"
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
      "goal": "Subtract the group counts, and match both displays.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The subtraction, and the leaves that agree",
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
          "hint": "The bars that match",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The stem 9 has four leaves: 1, 1, 1, and 6."
        },
        {
          "id": "r2p5",
          "text": "n = 9 - 7."
        },
        {
          "id": "r2p1",
          "text": "n = 4 - 1."
        },
        {
          "id": "r2p6",
          "text": "n = 96 - 78."
        },
        {
          "id": "r2p3",
          "text": "The letter n stands for how many more projects scored in the 90s."
        },
        {
          "id": "r2p4",
          "text": "The 90s bar is four tall, and the 70s bar is one tall."
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
      "goal": "Compare the groups and check the difference.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "The 90s",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "The 70s",
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
          "text": "The 70s have 1 project."
        },
        {
          "id": "r3p5",
          "text": "The answer is 4 projects."
        },
        {
          "id": "r3p1",
          "text": "The 90s have 4 projects."
        },
        {
          "id": "r3p6",
          "text": "The answer is 18 points."
        },
        {
          "id": "r3p3",
          "text": "4 - 1 = 3 more projects scored in the 90s."
        },
        {
          "id": "r3p4",
          "text": "Check: 1 + 3 = 4."
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
    "hint": "A reader needs the question, then the model, before the comparison.",
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
      "prompt": "One sentence says 4 - 1 = 3 more projects scored in the 90s. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How many more projects scored in the 90s than in the 70s?",
      "choices": [
        {
          "id": "a",
          "text": "3 more projects"
        },
        {
          "id": "b",
          "text": "4 projects"
        },
        {
          "id": "c",
          "text": "2, from 9 - 7"
        },
        {
          "id": "d",
          "text": "18 points"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many projects scored in the 90s, how many scored in the 70s, and how many more scored in the 90s?",
    "starters": [
      "The 90s have",
      "The 70s have",
      "The difference",
      "The stem-and-leaf"
    ],
    "checks": [
      "I used the counts, not the score values.",
      "I said 4 projects scored in the 90s.",
      "I said 1 project scored in the 70s.",
      "I said 3 more projects scored in the 90s.",
      "I did not subtract the stems or the high and low scores."
    ],
    "criteria": [
      "Read 4 projects in the 90s and 1 in the 70s from either display.",
      "Subtract to get 3 more projects.",
      "Check, such as 1 + 3 = 4, and do not answer in points."
    ]
  },
  "chain": {
    "title": "Score line",
    "sourceId": "bars",
    "cutId": "counts",
    "cutDark": [
      "diff"
    ],
    "stayOn": [
      "bars"
    ],
    "cutting": "Taking the counts away…",
    "cutDone": "No counts. The comparison goes dark.",
    "liveLine": "The line is live. Mark what fails if you never use the group counts.",
    "fillLine": "The score line fills in as each part locks.",
    "links": [
      {
        "id": "bars",
        "label": "The graphs",
        "mark": "📊",
        "on": "r1"
      },
      {
        "id": "counts",
        "label": "4 and 1",
        "mark": "🔢",
        "on": "r2"
      },
      {
        "id": "diff",
        "label": "3 more",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never use the group counts. What fails?",
    "hint": "Mark what goes dark. Then skip the counts.",
    "switch": "Skip the counts",
    "choices": [
      {
        "id": "a",
        "text": "The comparison of 3 more projects",
        "marks": [
          "diff"
        ]
      },
      {
        "id": "b",
        "text": "The graphs disappear",
        "marks": [
          "bars"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 96 - 78 answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 4 projects",
        "marks": [
          "counts"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the score line. Which sentence matches the picture?",
    "image": "/student/score_line.jpg",
    "choices": [
      {
        "id": "bars",
        "text": "The 70s bar is 1 tall, the 80s bar is 2 tall, and the 90s bar is 4 tall."
      },
      {
        "id": "equal",
        "text": "All three bars are the same height."
      },
      {
        "id": "booth",
        "text": "The picture shows booth numbers causing the scores to rise."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the score line. Which sentence matches the picture?"
  },
  "board": null
};
