// Safe to import from client components.
// Assembly Deck — 5.12A-AD. TEKS 5.12A — organisms interact with biotic and abiotic factors.

export const PUBLIC_CASE = {
  "standard": "5.12A-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Pond Tank",
  "estimatedMinutes": 20,
  "brief": [
    "The tank has living things and nonliving things.",
    "Fish, a plant, and a snail are biotic.",
    "Sunlight, water, temperature, and gravel are abiotic. The fish needs both."
  ],
  "source": {
    "title": "TANK NOTES",
    "lines": [
      "Biotic factors are living or once living: the fish, the plant, and the snail.",
      "Abiotic factors are nonliving: sunlight, water, temperature, and gravel.",
      "The fish needs both kinds.",
      "Sunlight and gravel are not alive."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Living factors",
      "goal": "Build the paragraph about the biotic factors.",
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
          "text": "The fish is biotic."
        },
        {
          "id": "r1p5",
          "text": "The gravel is biotic because it sits in the tank."
        },
        {
          "id": "r1p1",
          "text": "Biotic factors are living or once living."
        },
        {
          "id": "r1p6",
          "text": "Sunlight is a living thing."
        },
        {
          "id": "r1p3",
          "text": "The plant and the snail are biotic too."
        },
        {
          "id": "r1p4",
          "text": "Those living things are part of the tank's system."
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
      "label": "Nonliving factors",
      "goal": "Build the paragraph about the abiotic factors.",
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
          "text": "Sunlight is abiotic."
        },
        {
          "id": "r2p5",
          "text": "Water is biotic because fish swim in it."
        },
        {
          "id": "r2p1",
          "text": "Abiotic factors are nonliving."
        },
        {
          "id": "r2p6",
          "text": "A healthy tank needs only living things."
        },
        {
          "id": "r2p3",
          "text": "Water and temperature are abiotic too."
        },
        {
          "id": "r2p4",
          "text": "The fish still needs those nonliving factors."
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
      "label": "How the fish survives",
      "goal": "Build the paragraph about both kinds of factors.",
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
          "text": "It interacts with the plant and the snail."
        },
        {
          "id": "r3p5",
          "text": "Remove the water and the fish will thrive."
        },
        {
          "id": "r3p1",
          "text": "The fish survives by using both kinds of factors."
        },
        {
          "id": "r3p6",
          "text": "Only the brand of gravel matters."
        },
        {
          "id": "r3p3",
          "text": "It also depends on light, water, and temperature."
        },
        {
          "id": "r3p4",
          "text": "A healthy ecosystem includes biotic and abiotic factors."
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
    "hint": "A reader needs the living factors, then the nonliving factors, before survival.",
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
      "prompt": "One sentence says sunlight is abiotic. Tap it.",
      "hint": "Look in the nonliving paragraph."
    },
    "quickCheck": {
      "prompt": "Which factor is abiotic?",
      "choices": [
        {
          "id": "a",
          "text": "Sunlight"
        },
        {
          "id": "b",
          "text": "The fish"
        },
        {
          "id": "c",
          "text": "The snail"
        },
        {
          "id": "d",
          "text": "The plant"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Which tank factors are biotic, which are abiotic, and why does the fish need both?",
    "starters": [
      "Biotic factors",
      "Abiotic factors",
      "The fish"
    ],
    "checks": [
      "I named the fish, plant, or snail as biotic.",
      "I named sunlight, water, or temperature as abiotic.",
      "I said gravel is not alive.",
      "I said the fish needs both kinds.",
      "I did not call sunlight a living thing."
    ],
    "criteria": [
      "Sort at least one biotic and one abiotic factor correctly.",
      "Say the fish depends on both.",
      "Do not call gravel or sunlight biotic."
    ]
  },
  "chain": {
    "title": "Tank line",
    "sourceId": "living",
    "cutId": "abiotic",
    "cutDark": [
      "survive"
    ],
    "stayOn": [
      "living"
    ],
    "cutting": "Taking the nonliving factors away…",
    "cutDone": "No abiotic factors. Survival goes dark.",
    "liveLine": "The line is live. Mark what fails if the nonliving factors are removed.",
    "fillLine": "The tank line fills in as each paragraph locks.",
    "links": [
      {
        "id": "living",
        "label": "Living things",
        "mark": "🐟",
        "on": "r1"
      },
      {
        "id": "abiotic",
        "label": "Nonliving",
        "mark": "☀️",
        "on": "r2"
      },
      {
        "id": "survive",
        "label": "Survival",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The nonliving factors are removed. What fails?",
    "hint": "Mark what goes dark. Then take the abiotic factors away.",
    "switch": "Remove the nonliving factors",
    "choices": [
      {
        "id": "a",
        "text": "The fish surviving",
        "marks": [
          "survive"
        ]
      },
      {
        "id": "b",
        "text": "The fish disappears from the definition",
        "marks": [
          "living"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A tank needs only living things.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Sunlight becomes biotic",
        "marks": [
          "abiotic"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the tank line. Which sentence matches the picture?",
    "image": "/student/tank_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "A fish and a plant are in water, with sunlight above and gravel below."
      },
      {
        "id": "only",
        "text": "The tank has a fish and nothing else."
      },
      {
        "id": "brand",
        "text": "The picture is a gravel label."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the tank line. Which sentence matches the picture?"
  },
  "board": null
};
