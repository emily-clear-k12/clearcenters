// Safe to import from client components.
// Assembly Deck — 4.9A-AD. TEKS 4.9A — seasonal patterns in temperature and length of daylight.

export const PUBLIC_CASE = {
  "standard": "4.9A-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Science",
  "title": "The Daylight Log",
  "estimatedMinutes": 20,
  "brief": [
    "The class logged seasons, not one afternoon.",
    "Winter days were short and cold. Summer days were long and warm.",
    "That pattern lets them predict the next season."
  ],
  "source": {
    "title": "SEASON LOG",
    "lines": [
      "Winter days were short, and temperatures were low.",
      "Summer days were longer, and temperatures were higher.",
      "The same sequence shows up each year.",
      "One cold Tuesday is not a whole season."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The records",
      "goal": "Build the paragraph from the winter and summer records.",
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
          "text": "Winter days were short and cold."
        },
        {
          "id": "r1p5",
          "text": "Winter days were the longest."
        },
        {
          "id": "r1p1",
          "text": "The log tracks seasons, not one day."
        },
        {
          "id": "r1p6",
          "text": "The log is a record of the Moon."
        },
        {
          "id": "r1p3",
          "text": "Summer days were long and warm."
        },
        {
          "id": "r1p4",
          "text": "Temperature and daylight both changed with the season."
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
      "label": "The pattern",
      "goal": "Build the paragraph about the repeating sequence.",
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
          "text": "Short, cold days come in winter."
        },
        {
          "id": "r2p5",
          "text": "Seasons happen in a new order every year."
        },
        {
          "id": "r2p1",
          "text": "The same sequence shows up each year."
        },
        {
          "id": "r2p6",
          "text": "Next summer will be short and cold, just because."
        },
        {
          "id": "r2p3",
          "text": "Long, warm days come in summer."
        },
        {
          "id": "r2p4",
          "text": "The class can predict the next season from that pattern."
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
      "label": "What a season includes",
      "goal": "Build the paragraph that says what the pattern includes.",
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
          "text": "It includes temperature."
        },
        {
          "id": "r3p5",
          "text": "Tuesday's rain is the season."
        },
        {
          "id": "r3p1",
          "text": "A season is a repeating pattern."
        },
        {
          "id": "r3p6",
          "text": "Seasons are only opinions about sweaters."
        },
        {
          "id": "r3p3",
          "text": "It includes the length of daylight."
        },
        {
          "id": "r3p4",
          "text": "One afternoon does not make a season."
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
    "hint": "A reader needs the records, then the pattern, before what a season includes.",
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
      "prompt": "One sentence says summer days were long and warm. Tap it.",
      "hint": "Look in the records paragraph."
    },
    "quickCheck": {
      "prompt": "What does the seasonal pattern include?",
      "choices": [
        {
          "id": "a",
          "text": "Temperature and length of daylight"
        },
        {
          "id": "b",
          "text": "Only Tuesday's rain"
        },
        {
          "id": "c",
          "text": "The Moon"
        },
        {
          "id": "d",
          "text": "A new order every year"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What pattern did the log show, and what can the class predict?",
    "starters": [
      "In winter",
      "In summer",
      "Next year"
    ],
    "checks": [
      "I said winter days were short and cold.",
      "I said summer days were long and warm.",
      "I named temperature and daylight.",
      "I said the pattern repeats.",
      "I did not use one Tuesday as the season."
    ],
    "criteria": [
      "Describe winter and summer using temperature and daylight.",
      "Say the sequence repeats.",
      "Use the pattern to predict, not one day."
    ]
  },
  "chain": {
    "title": "Season line",
    "sourceId": "log",
    "cutId": "pattern",
    "cutDark": [
      "predict"
    ],
    "stayOn": [
      "log"
    ],
    "cutting": "Taking the pattern away…",
    "cutDone": "No pattern. The prediction goes dark.",
    "liveLine": "The line is live. Mark what fails if there is no repeating pattern.",
    "fillLine": "The season line fills in as each paragraph locks.",
    "links": [
      {
        "id": "log",
        "label": "The log",
        "mark": "📒",
        "on": "r1"
      },
      {
        "id": "pattern",
        "label": "The pattern",
        "mark": "🔁",
        "on": "r2"
      },
      {
        "id": "predict",
        "label": "The prediction",
        "mark": "✅",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The seasons never repeat. What fails?",
    "hint": "Mark what goes dark. Then take the pattern away.",
    "switch": "Drop the pattern",
    "choices": [
      {
        "id": "a",
        "text": "A prediction of the next season",
        "marks": [
          "predict"
        ]
      },
      {
        "id": "b",
        "text": "The log disappears",
        "marks": [
          "log"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. One Tuesday is enough.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Winter days become the longest",
        "marks": [
          "pattern"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the season line. Which sentence matches the picture?",
    "image": "/student/season_line.jpg",
    "choices": [
      {
        "id": "two",
        "text": "One side has a low sun and a bare tree. The other has a high sun and a leafy tree."
      },
      {
        "id": "same",
        "text": "Both sides show the same short, cold day."
      },
      {
        "id": "moon",
        "text": "The picture is only the Moon."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the season line. Which sentence matches the picture?"
  },
  "board": null
};
