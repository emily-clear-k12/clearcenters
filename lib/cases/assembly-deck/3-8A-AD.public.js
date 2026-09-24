// Safe to import from client components.
// Assembly Deck — 3.8A-AD. TEKS 3.8A — light, sound, thermal, and mechanical energy.

export const PUBLIC_CASE = {
  "standard": "3.8A-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Science",
  "title": "Four Kinds of Energy",
  "estimatedMinutes": 20,
  "brief": [
    "Four stations are on the table.",
    "Each one shows a form of energy.",
    "Feeling tired is not one of those forms."
  ],
  "source": {
    "title": "STATION NOTES",
    "lines": [
      "The lamp gives off light energy.",
      "The bell gives off sound energy.",
      "The warm mug is thermal energy.",
      "The rolling ball is mechanical energy."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Light and sound",
      "goal": "Build the paragraph about the lamp and the bell.",
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
          "text": "The lamp gives off light energy."
        },
        {
          "id": "r1p5",
          "text": "The lamp is tired energy."
        },
        {
          "id": "r1p1",
          "text": "Two stations show two forms of energy."
        },
        {
          "id": "r1p6",
          "text": "The bell is only a toy, so it has no energy."
        },
        {
          "id": "r1p3",
          "text": "The bell gives off sound energy."
        },
        {
          "id": "r1p4",
          "text": "Light and sound are both forms of energy."
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
      "label": "Heat and motion",
      "goal": "Build the paragraph about the mug and the ball.",
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
          "text": "The warm mug is thermal energy."
        },
        {
          "id": "r2p5",
          "text": "The mug is light energy."
        },
        {
          "id": "r2p1",
          "text": "The other two stations are forms of energy too."
        },
        {
          "id": "r2p6",
          "text": "The ball is alive, so that is mechanical energy."
        },
        {
          "id": "r2p3",
          "text": "The rolling ball is mechanical energy."
        },
        {
          "id": "r2p4",
          "text": "Heat and motion are forms of energy."
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
      "label": "The sort",
      "goal": "Build the paragraph that names all four.",
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
          "text": "Light and sound are on the table."
        },
        {
          "id": "r3p5",
          "text": "Energy only means feeling tired."
        },
        {
          "id": "r3p1",
          "text": "The table holds four forms of energy."
        },
        {
          "id": "r3p6",
          "text": "All four stations are the same form."
        },
        {
          "id": "r3p3",
          "text": "Thermal and mechanical energy are there too."
        },
        {
          "id": "r3p4",
          "text": "Each station matches one form."
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
    "hint": "A reader needs light and sound, then heat and motion, before the full sort.",
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
      "prompt": "One sentence says the warm mug is thermal energy. Tap it.",
      "hint": "Look in the heat paragraph."
    },
    "quickCheck": {
      "prompt": "What form of energy is the rolling ball?",
      "choices": [
        {
          "id": "a",
          "text": "Mechanical energy"
        },
        {
          "id": "b",
          "text": "Light energy"
        },
        {
          "id": "c",
          "text": "Tired energy"
        },
        {
          "id": "d",
          "text": "The same form as the lamp"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Name the form of energy at each station.",
    "starters": [
      "The lamp",
      "The bell",
      "The mug",
      "The ball"
    ],
    "checks": [
      "I named light energy.",
      "I named sound energy.",
      "I named thermal energy.",
      "I named mechanical energy.",
      "I did not say energy means feeling tired."
    ],
    "criteria": [
      "Match the lamp to light and the bell to sound.",
      "Match the mug to thermal and the ball to mechanical.",
      "Do not call them all the same form."
    ]
  },
  "chain": {
    "title": "Energy line",
    "sourceId": "station",
    "cutId": "form",
    "cutDark": [
      "sort"
    ],
    "stayOn": [
      "station"
    ],
    "cutting": "Taking the forms away…",
    "cutDone": "No forms. The sort goes dark.",
    "liveLine": "The line is live. Mark what fails if the forms are ignored.",
    "fillLine": "The energy line fills in as each paragraph locks.",
    "links": [
      {
        "id": "station",
        "label": "Stations",
        "mark": "🔔",
        "on": "r1"
      },
      {
        "id": "form",
        "label": "The forms",
        "mark": "⚡",
        "on": "r2"
      },
      {
        "id": "sort",
        "label": "The sort",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You ignore which form each station is. What fails?",
    "hint": "Mark what goes dark. Then skip the forms.",
    "switch": "Skip the forms",
    "choices": [
      {
        "id": "a",
        "text": "The sort of four forms",
        "marks": [
          "sort"
        ]
      },
      {
        "id": "b",
        "text": "The stations disappear",
        "marks": [
          "station"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Tired covers all four.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The mug becomes light",
        "marks": [
          "form"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the energy line. Which sentence matches the picture?",
    "image": "/student/energy_line.jpg",
    "choices": [
      {
        "id": "four",
        "text": "A lamp, a bell, a warm mug, and a rolling ball."
      },
      {
        "id": "one",
        "text": "Only a lamp is on the table."
      },
      {
        "id": "tired",
        "text": "The picture is a child taking a nap."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the energy line. Which sentence matches the picture?"
  },
  "board": null
};
