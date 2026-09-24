// Safe to import from client components.
// Assembly Deck — MA.5.3K-AD. TEKS 5.3K — add and subtract positive rational numbers.

export const PUBLIC_CASE = {
  "standard": "MA.5.3K-AD",
  "mode": "problem",
  "grade": 5,
  "subject": "Math",
  "title": "The Relay Splits",
  "estimatedMinutes": 20,
  "brief": [
    "Four split times. One team total. A goal of 250 seconds.",
    "Add the decimals in pairs so the tenths stay lined up.",
    "The total is not the answer. The question asks how far under the goal the team finished."
  ],
  "source": {
    "title": "SPLIT TIMES",
    "lines": [
      "The four times, in seconds, are 58.6, 61.4, 59.2, and 60.8.",
      "58.6 + 61.4 = 120. 59.2 + 60.8 = 120.",
      "The team goal was 250 seconds.",
      "The track is 400 meters. The notes do not say who trained the hardest."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the question about the goal, not a question the times cannot answer.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the team ran",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The four times, and the goal",
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
          "text": "Their times were 58.6, 61.4, 59.2, and 60.8 seconds."
        },
        {
          "id": "r1p5",
          "text": "The track is 400 meters."
        },
        {
          "id": "r1p1",
          "text": "Four runners split one relay, and the team had a time goal."
        },
        {
          "id": "r1p6",
          "text": "Which runner trained the hardest?"
        },
        {
          "id": "r1p3",
          "text": "The goal was 250 seconds."
        },
        {
          "id": "r1p4",
          "text": "How many seconds under the goal did the team finish?"
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
      "goal": "Write the total and the difference, and say what the letter stands for.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "Add the times, then compare to the goal",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What u means",
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
          "text": "u = 250 - t."
        },
        {
          "id": "r2p5",
          "text": "u = 250 + t."
        },
        {
          "id": "r2p1",
          "text": "t = 58.6 + 61.4 + 59.2 + 60.8."
        },
        {
          "id": "r2p6",
          "text": "t = 58.6 + 61.4."
        },
        {
          "id": "r2p3",
          "text": "The letter u stands for the seconds under the goal."
        },
        {
          "id": "r2p4",
          "text": "Four short bars in a row, stopping before a goal marker."
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
      "goal": "Find the total, then the seconds under the goal, and check.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "Add in pairs",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Add the pairs",
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
          "hint": "A check against the goal",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "120 + 120 = 240 seconds in all."
        },
        {
          "id": "r3p5",
          "text": "The answer is 240 seconds."
        },
        {
          "id": "r3p1",
          "text": "58.6 + 61.4 = 120, and 59.2 + 60.8 = 120."
        },
        {
          "id": "r3p6",
          "text": "Check: 10 is less than 250, so it is right."
        },
        {
          "id": "r3p3",
          "text": "The team finished 10 seconds under the goal, because 250 - 240 = 10."
        },
        {
          "id": "r3p4",
          "text": "Check: 240 + 10 = 250."
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
    "hint": "A reader needs the times, then the model, before the seconds under the goal.",
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
      "prompt": "One sentence says the team finished 10 seconds under the goal. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How far under the goal did the team finish?",
      "choices": [
        {
          "id": "a",
          "text": "10 seconds under"
        },
        {
          "id": "b",
          "text": "240 seconds"
        },
        {
          "id": "c",
          "text": "400 meters"
        },
        {
          "id": "d",
          "text": "The runner who trained hardest"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What was the team's total time, and how many seconds under 250 did they finish?",
    "starters": [
      "The four times",
      "The total",
      "Under the goal",
      "I checked"
    ],
    "checks": [
      "I added all four times.",
      "I said the total was 240 seconds.",
      "I subtracted from 250.",
      "I said they were 10 seconds under the goal.",
      "I did not call 240 the final answer."
    ],
    "criteria": [
      "Add 58.6, 61.4, 59.2, and 60.8 to get 240 seconds.",
      "Subtract from 250 to get 10 seconds under the goal.",
      "Check, such as 240 + 10 = 250."
    ]
  },
  "chain": {
    "title": "Relay line",
    "sourceId": "times",
    "cutId": "total",
    "cutDark": [
      "under"
    ],
    "stayOn": [
      "times"
    ],
    "cutting": "Taking the total away…",
    "cutDone": "No total. The seconds under the goal go dark.",
    "liveLine": "The line is live. Mark what fails if the four times are never added.",
    "fillLine": "The relay line fills in as each part locks.",
    "links": [
      {
        "id": "times",
        "label": "Four splits",
        "mark": "🏃",
        "on": "r1"
      },
      {
        "id": "total",
        "label": "240 seconds",
        "mark": "➕",
        "on": "r3"
      },
      {
        "id": "under",
        "label": "10 under",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never add the four times. What fails?",
    "hint": "Mark what goes dark. Then skip the total.",
    "switch": "Skip the total",
    "choices": [
      {
        "id": "a",
        "text": "The 10 seconds under the goal",
        "marks": [
          "under"
        ]
      },
      {
        "id": "b",
        "text": "The four times disappear",
        "marks": [
          "times"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 400 meters answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 240",
        "marks": [
          "total"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the relay line. Which sentence matches the picture?",
    "image": "/student/relay_line.jpg",
    "choices": [
      {
        "id": "short",
        "text": "Four short bars stop before a marker farther to the right."
      },
      {
        "id": "past",
        "text": "The bars run past the marker."
      },
      {
        "id": "track",
        "text": "The picture is a 400-meter track with no times."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the relay line. Which sentence matches the picture?"
  },
  "board": null
};
