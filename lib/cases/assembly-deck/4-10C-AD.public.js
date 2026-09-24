// Safe to import from client components.
// Assembly Deck — 4.10C-AD. TEKS 4.10C — weather is not the same as climate.

export const PUBLIC_CASE = {
  "standard": "4.10C-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Science",
  "title": "Tuesday Is Not the Climate",
  "estimatedMinutes": 20,
  "brief": [
    "Tuesday was rainy and 55 degrees. That is weather.",
    "Over many years, summers here are hot and dry. That is climate.",
    "One storm does not rewrite the climate."
  ],
  "source": {
    "title": "WEATHER NOTES",
    "lines": [
      "Tuesday was rainy, and it was 55 degrees. That is weather.",
      "Over many years, summers here are hot and dry. That is climate.",
      "Weather can change in a day.",
      "Climate is the pattern over many years."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Tuesday",
      "goal": "Build the paragraph about one day's weather.",
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
          "text": "It rained on Tuesday."
        },
        {
          "id": "r1p5",
          "text": "Tuesday's rain is the climate."
        },
        {
          "id": "r1p1",
          "text": "Tuesday's report is weather."
        },
        {
          "id": "r1p6",
          "text": "The climate is whatever I feel today."
        },
        {
          "id": "r1p3",
          "text": "The temperature was 55 degrees."
        },
        {
          "id": "r1p4",
          "text": "Weather is what happens on a short time scale."
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
      "label": "Many years",
      "goal": "Build the paragraph about the long pattern.",
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
          "text": "Summers here are usually hot."
        },
        {
          "id": "r2p5",
          "text": "Climate changes every afternoon."
        },
        {
          "id": "r2p1",
          "text": "Climate is a pattern over many years."
        },
        {
          "id": "r2p6",
          "text": "The climate is rainy because Tuesday was rainy."
        },
        {
          "id": "r2p3",
          "text": "Summers here are usually dry."
        },
        {
          "id": "r2p4",
          "text": "That long pattern is the climate."
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
      "label": "The difference",
      "goal": "Build the paragraph that keeps the two words apart.",
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
          "text": "Weather is the short-term report."
        },
        {
          "id": "r3p5",
          "text": "The two words mean the same thing."
        },
        {
          "id": "r3p1",
          "text": "Weather and climate are not the same."
        },
        {
          "id": "r3p6",
          "text": "Scientists only use the word weather."
        },
        {
          "id": "r3p3",
          "text": "Climate is the long pattern."
        },
        {
          "id": "r3p4",
          "text": "A rainy Tuesday does not rewrite the climate."
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
    "hint": "A reader needs Tuesday, then the long pattern, before the difference.",
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
      "prompt": "One sentence says climate is a pattern over many years. Tap it.",
      "hint": "Look in the many-years paragraph."
    },
    "quickCheck": {
      "prompt": "What is Tuesday's rain?",
      "choices": [
        {
          "id": "a",
          "text": "Weather"
        },
        {
          "id": "b",
          "text": "The climate"
        },
        {
          "id": "c",
          "text": "Proof that summers are rainy"
        },
        {
          "id": "d",
          "text": "The only word scientists use"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How is Tuesday's weather different from the climate here?",
    "starters": [
      "Tuesday",
      "The climate",
      "So"
    ],
    "checks": [
      "I said Tuesday was rainy and 55 degrees.",
      "I called that weather.",
      "I said summers here are usually hot and dry.",
      "I called that climate.",
      "I did not say one day changes the climate."
    ],
    "criteria": [
      "Call the one-day report weather.",
      "Call the many-year pattern climate.",
      "Do not treat Tuesday as the climate."
    ]
  },
  "chain": {
    "title": "Climate line",
    "sourceId": "day",
    "cutId": "years",
    "cutDark": [
      "climate"
    ],
    "stayOn": [
      "day"
    ],
    "cutting": "Taking the many years away…",
    "cutDone": "No long record. The climate pattern goes dark.",
    "liveLine": "The line is live. Mark what fails if you only have one day.",
    "fillLine": "The climate line fills in as each paragraph locks.",
    "links": [
      {
        "id": "day",
        "label": "One day",
        "mark": "🌧️",
        "on": "r1"
      },
      {
        "id": "years",
        "label": "Many years",
        "mark": "📅",
        "on": "r2"
      },
      {
        "id": "climate",
        "label": "Climate",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You have only Tuesday, not many years. What fails?",
    "hint": "Mark what goes dark. Then drop the long record.",
    "switch": "Drop the years",
    "choices": [
      {
        "id": "a",
        "text": "The climate pattern",
        "marks": [
          "climate"
        ]
      },
      {
        "id": "b",
        "text": "Tuesday disappears",
        "marks": [
          "day"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Tuesday is the climate.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Summers become rainy",
        "marks": [
          "years"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the climate line. Which sentence matches the picture?",
    "image": "/student/climate_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "One side is a single rainy day. The other side is a long pattern of many days."
      },
      {
        "id": "one",
        "text": "The picture is only one storm, and that storm is labeled the climate."
      },
      {
        "id": "same",
        "text": "Both sides show the same rainy Tuesday."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the climate line. Which sentence matches the picture?"
  },
  "board": null
};
