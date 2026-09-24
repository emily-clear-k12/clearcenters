// Safe to import from client components.
// Assembly Deck — 4.10A-AD. TEKS 4.10A — the water cycle, with the Sun as a major energy source.

export const PUBLIC_CASE = {
  "standard": "4.10A-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Science",
  "title": "The Puddle's Trip",
  "estimatedMinutes": 20,
  "brief": [
    "The sun warmed a puddle.",
    "Water rose, formed a cloud, fell as rain, and ran to the creek.",
    "The water was not used up."
  ],
  "source": {
    "title": "PUDDLE NOTES",
    "lines": [
      "The sun warmed the puddle.",
      "Water became vapor and rose.",
      "A cloud formed, and rain fell.",
      "Rain ran back to the creek.",
      "The sun supplied the energy. The water was not used up."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The sun's job",
      "goal": "Build the paragraph about the sun and the puddle.",
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
          "text": "The sun warmed the puddle."
        },
        {
          "id": "r1p5",
          "text": "The puddle disappeared forever."
        },
        {
          "id": "r1p1",
          "text": "The water cycle needs energy."
        },
        {
          "id": "r1p6",
          "text": "The moon boiled the puddle."
        },
        {
          "id": "r1p3",
          "text": "Water rose as vapor."
        },
        {
          "id": "r1p4",
          "text": "The sun is a major source of that energy."
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
      "label": "The loop",
      "goal": "Build the paragraph about the cloud, the rain, and the creek.",
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
          "text": "Vapor became a cloud."
        },
        {
          "id": "r2p5",
          "text": "Rain is new water made from nothing."
        },
        {
          "id": "r2p1",
          "text": "The water keeps moving."
        },
        {
          "id": "r2p6",
          "text": "The cycle stops after one rain."
        },
        {
          "id": "r2p3",
          "text": "Rain fell and ran to the creek."
        },
        {
          "id": "r2p4",
          "text": "The same water can move again."
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
      "label": "One cycle",
      "goal": "Build the paragraph that puts the whole path together.",
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
          "text": "The sun drives the movement."
        },
        {
          "id": "r3p5",
          "text": "Once water falls, it is gone."
        },
        {
          "id": "r3p1",
          "text": "The puddle, the cloud, and the rain are one cycle."
        },
        {
          "id": "r3p6",
          "text": "Clouds are smoke from chimneys."
        },
        {
          "id": "r3p3",
          "text": "Water moves above and on Earth's surface."
        },
        {
          "id": "r3p4",
          "text": "The cycle is continuous."
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
    "hint": "A reader needs the sun's job, then the loop, before the whole cycle.",
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
      "prompt": "One sentence says the sun warmed the puddle. Tap it.",
      "hint": "Look in the first paragraph."
    },
    "quickCheck": {
      "prompt": "What supplies the energy for this water cycle?",
      "choices": [
        {
          "id": "a",
          "text": "The sun"
        },
        {
          "id": "b",
          "text": "The moon"
        },
        {
          "id": "c",
          "text": "Chimney smoke"
        },
        {
          "id": "d",
          "text": "Nothing. The water is used up."
        }
      ]
    }
  },
  "explain": {
    "prompt": "How did the puddle's water move, and what did the sun do?",
    "starters": [
      "The sun",
      "The vapor",
      "The rain"
    ],
    "checks": [
      "I said the sun warmed the puddle.",
      "I said water rose as vapor.",
      "I said a cloud formed and rain fell.",
      "I said the water was not used up.",
      "I did not say the moon boiled the puddle."
    ],
    "criteria": [
      "Name the sun as the energy source.",
      "Follow water from puddle to vapor, cloud, rain, and creek.",
      "Say the cycle continues."
    ]
  },
  "chain": {
    "title": "Puddle line",
    "sourceId": "puddle",
    "cutId": "sun",
    "cutDark": [
      "vapor"
    ],
    "stayOn": [
      "puddle"
    ],
    "cutting": "Taking the sun's energy away…",
    "cutDone": "No sun. The rising vapor goes dark.",
    "liveLine": "The line is live. Mark what fails if the sun does not warm the puddle.",
    "fillLine": "The puddle line fills in as each paragraph locks.",
    "links": [
      {
        "id": "puddle",
        "label": "The puddle",
        "mark": "💧",
        "on": "r1"
      },
      {
        "id": "sun",
        "label": "The sun",
        "mark": "☀️",
        "on": "r1"
      },
      {
        "id": "vapor",
        "label": "The vapor",
        "mark": "☁️",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The sun does not warm the puddle. What fails?",
    "hint": "Mark what goes dark. Then take the sun away.",
    "switch": "Block the sun",
    "choices": [
      {
        "id": "a",
        "text": "Water rising as vapor",
        "marks": [
          "vapor"
        ]
      },
      {
        "id": "b",
        "text": "The puddle disappears forever",
        "marks": [
          "puddle"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The moon can boil it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Rain is made from nothing",
        "marks": [
          "sun"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the puddle line. Which sentence matches the picture?",
    "image": "/student/puddle_line.jpg",
    "choices": [
      {
        "id": "loop",
        "text": "Water rises from a puddle to a cloud, and rain falls, with the sun shining."
      },
      {
        "id": "gone",
        "text": "The puddle is gone, and nothing replaces it."
      },
      {
        "id": "smoke",
        "text": "The cloud is smoke from a chimney."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the puddle line. Which sentence matches the picture?"
  },
  "board": null
};
