// Safe to import from client components.
// Assembly Deck — 5.10A-AD. TEKS 5.10A — the Sun and the ocean interact in the water cycle and affect weather.

export const PUBLIC_CASE = {
  "standard": "5.10A-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "Heat From the Ocean",
  "estimatedMinutes": 20,
  "brief": [
    "The sun heated the ocean surface.",
    "Water evaporated, rose, and formed clouds.",
    "That ocean moisture can affect the weather. The ocean does not do it without the sun."
  ],
  "source": {
    "title": "OCEAN NOTES",
    "lines": [
      "The sun heated the ocean surface.",
      "Ocean water evaporated.",
      "Warm, moist air rose and formed clouds.",
      "That moisture can become storms.",
      "The ocean supplies water. The sun supplies energy."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Sun and ocean",
      "goal": "Build the paragraph about what each one supplies.",
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
          "text": "The sun heated the surface water."
        },
        {
          "id": "r1p5",
          "text": "The ocean boiled with no sun at all."
        },
        {
          "id": "r1p1",
          "text": "The sun and the ocean work together in the water cycle."
        },
        {
          "id": "r1p6",
          "text": "The moon heated the ocean in this test."
        },
        {
          "id": "r1p3",
          "text": "Ocean water evaporated into the air."
        },
        {
          "id": "r1p4",
          "text": "The sun supplied the energy."
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
      "label": "The weather",
      "goal": "Build the paragraph about clouds and storms.",
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
          "text": "Moist air rose from the ocean."
        },
        {
          "id": "r2p5",
          "text": "Clouds over the ocean are smoke."
        },
        {
          "id": "r2p1",
          "text": "Ocean moisture can affect weather."
        },
        {
          "id": "r2p6",
          "text": "Weather never comes from the ocean."
        },
        {
          "id": "r2p3",
          "text": "Clouds formed from that moisture."
        },
        {
          "id": "r2p4",
          "text": "Storms can grow from ocean water vapor."
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
      "label": "The interaction",
      "goal": "Build the paragraph that says why both are needed.",
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
          "text": "The ocean supplies the water."
        },
        {
          "id": "r3p5",
          "text": "The ocean is the energy source, and the sun is decoration."
        },
        {
          "id": "r3p1",
          "text": "Neither one does this job alone."
        },
        {
          "id": "r3p6",
          "text": "The rain is salt water that skipped the cycle."
        },
        {
          "id": "r3p3",
          "text": "The sun supplies the energy."
        },
        {
          "id": "r3p4",
          "text": "Together they affect the water cycle and the weather."
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
    "hint": "A reader needs the heating, then the weather, before why both are required.",
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
      "prompt": "One sentence says the sun supplied the energy. Tap it.",
      "hint": "Look in the first paragraph."
    },
    "quickCheck": {
      "prompt": "What does the ocean supply in this cycle?",
      "choices": [
        {
          "id": "a",
          "text": "Water"
        },
        {
          "id": "b",
          "text": "The energy, with no help from the sun"
        },
        {
          "id": "c",
          "text": "Smoke"
        },
        {
          "id": "d",
          "text": "Nothing. Weather never comes from the ocean"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How do the sun and the ocean affect the water cycle and the weather?",
    "starters": [
      "The sun",
      "The ocean",
      "Together"
    ],
    "checks": [
      "I said the sun heated the ocean.",
      "I said water evaporated.",
      "I said clouds or storms can form.",
      "I said the ocean supplies water and the sun supplies energy.",
      "I did not say the ocean boils without the sun."
    ],
    "criteria": [
      "Give the sun the energy role.",
      "Give the ocean the water role.",
      "Connect the vapor to clouds or storms."
    ]
  },
  "chain": {
    "title": "Ocean line",
    "sourceId": "ocean",
    "cutId": "sun",
    "cutDark": [
      "storm"
    ],
    "stayOn": [
      "ocean"
    ],
    "cutting": "Taking the sun's heat away…",
    "cutDone": "No sun. The storm-building moisture goes dark.",
    "liveLine": "The line is live. Mark what fails if the sun does not heat the ocean.",
    "fillLine": "The ocean line fills in as each paragraph locks.",
    "links": [
      {
        "id": "ocean",
        "label": "The ocean",
        "mark": "🌊",
        "on": "r1"
      },
      {
        "id": "sun",
        "label": "The sun",
        "mark": "☀️",
        "on": "r1"
      },
      {
        "id": "storm",
        "label": "The weather",
        "mark": "⛈️",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The sun does not heat the ocean. What fails?",
    "hint": "Mark what goes dark. Then block the sun.",
    "switch": "Block the sun",
    "choices": [
      {
        "id": "a",
        "text": "Storms built from that ocean moisture",
        "marks": [
          "storm"
        ]
      },
      {
        "id": "b",
        "text": "The ocean disappears",
        "marks": [
          "ocean"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The ocean boils by itself.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The sun becomes decoration",
        "marks": [
          "sun"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the ocean line. Which sentence matches the picture?",
    "image": "/student/ocean_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "The sun shines on the ocean, and vapor rises into a cloud."
      },
      {
        "id": "dark",
        "text": "The ocean steams under a sky with no sun."
      },
      {
        "id": "smoke",
        "text": "The cloud is smoke, and there is no ocean."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the ocean line. Which sentence matches the picture?"
  },
  "board": null
};
