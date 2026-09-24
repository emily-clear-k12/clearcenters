// Safe to import from client components.
// Assembly Deck — 3.9A-AD. TEKS 3.9A — orbits of the Sun, Earth, and the Moon.

export const PUBLIC_CASE = {
  "standard": "3.9A-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Science",
  "title": "Who Goes Around Whom",
  "estimatedMinutes": 20,
  "brief": [
    "The model has two paths.",
    "Earth goes around the Sun. The Moon goes around Earth.",
    "The Sun does not travel around Earth."
  ],
  "source": {
    "title": "MODEL NOTES",
    "lines": [
      "Earth travels around the Sun.",
      "The Moon travels around Earth.",
      "The Sun does not travel around Earth.",
      "The model shows those two orbits."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Earth and the Sun",
      "goal": "Build the paragraph about Earth's orbit.",
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
          "text": "Earth travels around the Sun."
        },
        {
          "id": "r1p5",
          "text": "The Sun orbits Earth."
        },
        {
          "id": "r1p1",
          "text": "One path in the model is Earth's orbit."
        },
        {
          "id": "r1p6",
          "text": "The Moon is bigger than the Sun."
        },
        {
          "id": "r1p3",
          "text": "The Sun is at the center of that path."
        },
        {
          "id": "r1p4",
          "text": "Earth orbits the Sun."
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
      "label": "The Moon",
      "goal": "Build the paragraph about the Moon's orbit.",
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
          "text": "The Moon travels around Earth."
        },
        {
          "id": "r2p5",
          "text": "The Moon stays still."
        },
        {
          "id": "r2p1",
          "text": "The Moon has its own path."
        },
        {
          "id": "r2p6",
          "text": "The Moon orbits the wagon."
        },
        {
          "id": "r2p3",
          "text": "That path is smaller than Earth's path around the Sun."
        },
        {
          "id": "r2p4",
          "text": "The Moon orbits Earth."
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
      "label": "The relationship",
      "goal": "Build the paragraph that puts the Sun, Earth, and Moon together.",
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
          "text": "Earth goes around the Sun."
        },
        {
          "id": "r3p5",
          "text": "All three orbit each other in the same way."
        },
        {
          "id": "r3p1",
          "text": "The model shows how the three are related."
        },
        {
          "id": "r3p6",
          "text": "The notes say the Sun orbits the Moon."
        },
        {
          "id": "r3p3",
          "text": "The Moon goes around Earth."
        },
        {
          "id": "r3p4",
          "text": "Those are the two orbits."
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
    "hint": "A reader needs Earth's orbit, then the Moon's, before the relationship.",
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
      "prompt": "One sentence says the Moon orbits Earth. Tap it.",
      "hint": "Look in the Moon paragraph."
    },
    "quickCheck": {
      "prompt": "What does Earth orbit?",
      "choices": [
        {
          "id": "a",
          "text": "The Sun"
        },
        {
          "id": "b",
          "text": "The Moon only"
        },
        {
          "id": "c",
          "text": "A wagon"
        },
        {
          "id": "d",
          "text": "Nothing. The Sun orbits Earth."
        }
      ]
    }
  },
  "explain": {
    "prompt": "What orbits what in the model?",
    "starters": [
      "Earth",
      "The Moon",
      "The Sun"
    ],
    "checks": [
      "I said Earth orbits the Sun.",
      "I said the Moon orbits Earth.",
      "I said the Sun does not orbit Earth.",
      "I named both paths.",
      "I did not say all three orbits are the same."
    ],
    "criteria": [
      "Say Earth orbits the Sun.",
      "Say the Moon orbits Earth.",
      "Do not reverse either orbit."
    ]
  },
  "chain": {
    "title": "Orbit line",
    "sourceId": "sun",
    "cutId": "earth",
    "cutDark": [
      "moon"
    ],
    "stayOn": [
      "sun"
    ],
    "cutting": "Taking Earth's orbit away…",
    "cutDone": "No Earth orbit. The Moon's place in the model goes dark.",
    "liveLine": "The line is live. Mark what fails if Earth has no orbit.",
    "fillLine": "The orbit line fills in as each paragraph locks.",
    "links": [
      {
        "id": "sun",
        "label": "The Sun",
        "mark": "☀️",
        "on": "r1"
      },
      {
        "id": "earth",
        "label": "Earth's orbit",
        "mark": "🌍",
        "on": "r1"
      },
      {
        "id": "moon",
        "label": "Moon's orbit",
        "mark": "🌙",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Earth has no orbit. What fails?",
    "hint": "Mark what goes dark. Then take Earth's path away.",
    "switch": "Skip Earth's orbit",
    "choices": [
      {
        "id": "a",
        "text": "The Moon's place in the model",
        "marks": [
          "moon"
        ]
      },
      {
        "id": "b",
        "text": "The Sun disappears",
        "marks": [
          "sun"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The Sun can orbit Earth instead.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Earth starts orbiting the Moon",
        "marks": [
          "earth"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the orbit line. Which sentence matches the picture?",
    "image": "/student/orbit_line.jpg",
    "choices": [
      {
        "id": "two",
        "text": "Earth circles the Sun, and the Moon circles Earth."
      },
      {
        "id": "flip",
        "text": "The Sun circles Earth."
      },
      {
        "id": "none",
        "text": "There are no paths at all."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the orbit line. Which sentence matches the picture?"
  },
  "board": null
};
