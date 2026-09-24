// Safe to import from client components.
// Assembly Deck — 3.7B-AD. TEKS 3.7B — a push or a pull can change position and motion.

export const PUBLIC_CASE = {
  "standard": "3.7B-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Science",
  "title": "The Wagon That Moved",
  "estimatedMinutes": 20,
  "brief": [
    "The wagon started at the curb.",
    "A push made it roll. A pull made it stop.",
    "Wanting to move is not a force."
  ],
  "source": {
    "title": "WAGON NOTES",
    "lines": [
      "The wagon started at the curb.",
      "A push made it roll forward.",
      "A pull brought it to a stop.",
      "The push and the pull changed its position and its motion."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The push",
      "goal": "Build the paragraph about the push.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The wagon started at the curb."
        },
        {
          "id": "r1p5",
          "text": "The wagon moved because it wanted to."
        },
        {
          "id": "r1p1",
          "text": "A push can change how an object moves."
        },
        {
          "id": "r1p6",
          "text": "The wagon never left the curb."
        },
        {
          "id": "r1p3",
          "text": "A push made it roll forward."
        },
        {
          "id": "r1p4",
          "text": "The push changed the wagon's position and motion."
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
      "label": "The pull",
      "goal": "Build the paragraph about the pull.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The pull slowed the wagon."
        },
        {
          "id": "r2p5",
          "text": "Only a push can change motion."
        },
        {
          "id": "r2p1",
          "text": "A pull is a force too."
        },
        {
          "id": "r2p6",
          "text": "The wagon stopped because it felt tired."
        },
        {
          "id": "r2p3",
          "text": "Then the wagon stopped."
        },
        {
          "id": "r2p4",
          "text": "The pull changed the motion again."
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
      "label": "What the test shows",
      "goal": "Build the paragraph that puts both forces together.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The push started the motion."
        },
        {
          "id": "r3p5",
          "text": "The wagon's red paint made it move."
        },
        {
          "id": "r3p1",
          "text": "Both forces changed the wagon."
        },
        {
          "id": "r3p6",
          "text": "Gravity was the only force they used."
        },
        {
          "id": "r3p3",
          "text": "The pull stopped the motion."
        },
        {
          "id": "r3p4",
          "text": "Pushes and pulls can change position and motion."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three paragraphs, one report. What order should a reader hear them in?",
    "hint": "A reader needs the push, then the pull, before the rule.",
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
      "prompt": "One sentence says a push made the wagon roll forward. Tap it.",
      "hint": "Look in the push paragraph."
    },
    "quickCheck": {
      "prompt": "What changed the wagon's motion?",
      "choices": [
        {
          "id": "a",
          "text": "A push and a pull"
        },
        {
          "id": "b",
          "text": "The wagon wanted to move"
        },
        {
          "id": "c",
          "text": "The red paint"
        },
        {
          "id": "d",
          "text": "It never moved"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How did the push and the pull change the wagon?",
    "starters": [
      "The push",
      "The pull",
      "So"
    ],
    "checks": [
      "I said a push started the wagon.",
      "I said a pull stopped it.",
      "I said position changed.",
      "I said motion changed.",
      "I did not say the wagon wanted to move."
    ],
    "criteria": [
      "Name the push as the start of the motion.",
      "Name the pull as the stop.",
      "Say both changed position or motion."
    ]
  },
  "chain": {
    "title": "Wagon line",
    "sourceId": "curb",
    "cutId": "push",
    "cutDark": [
      "roll"
    ],
    "stayOn": [
      "curb"
    ],
    "cutting": "Taking the push away…",
    "cutDone": "No push. The rolling goes dark.",
    "liveLine": "The line is live. Mark what fails if nobody pushes.",
    "fillLine": "The wagon line fills in as each paragraph locks.",
    "links": [
      {
        "id": "curb",
        "label": "At the curb",
        "mark": "🛞",
        "on": "r1"
      },
      {
        "id": "push",
        "label": "The push",
        "mark": "👐",
        "on": "r1"
      },
      {
        "id": "roll",
        "label": "It rolls",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Nobody pushes the wagon. What fails?",
    "hint": "Mark what goes dark. Then take the push away.",
    "switch": "Skip the push",
    "choices": [
      {
        "id": "a",
        "text": "The wagon rolling forward",
        "marks": [
          "roll"
        ]
      },
      {
        "id": "b",
        "text": "The curb disappears",
        "marks": [
          "curb"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. It rolls because it wants to.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The pull starts the roll",
        "marks": [
          "push"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the wagon line. Which sentence matches the picture?",
    "image": "/student/wagon_line.jpg",
    "choices": [
      {
        "id": "push",
        "text": "A push sends the wagon from one place to another."
      },
      {
        "id": "still",
        "text": "The wagon never moves."
      },
      {
        "id": "paint",
        "text": "The picture is only a can of red paint."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the wagon line. Which sentence matches the picture?"
  },
  "board": null
};
