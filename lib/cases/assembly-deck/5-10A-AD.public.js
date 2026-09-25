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
    "Ms. Alvarez's class tracked what happened above a warm patch of ocean on a sunny day.",
    "Write a short science report from their notes.",
    "Explain what the sun and the ocean each supplied, and how that moisture can affect the weather."
  ],
  "source": {
    "title": "OCEAN NOTES",
    "lines": [
      "The sun's energy heated the ocean surface.",
      "The heated ocean water evaporated, changing from liquid water into water vapor, an invisible gas.",
      "The warm, moist air rose. As it climbed higher, it cooled.",
      "The cooled water vapor condensed into tiny droplets, which gathered into clouds.",
      "Over warm ocean water, that moisture can build up and grow into storms.",
      "The ocean holds most of Earth's water.",
      "The ocean supplies the water. The sun supplies the energy."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Sun and ocean",
      "goal": "Build the paragraph about what the sun and the ocean each supply.",
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
          "text": "Energy from the sun heated the water at the ocean's surface."
        },
        {
          "id": "r1p5",
          "text": "The ocean water boiled on its own, even though no sunlight reached it."
        },
        {
          "id": "r1p1",
          "text": "The sun and the ocean work together to power this part of the water cycle."
        },
        {
          "id": "r1p6",
          "text": "In these notes, it was the moon's light that heated the ocean surface."
        },
        {
          "id": "r1p3",
          "text": "As the surface warmed, ocean water evaporated and became water vapor, an invisible gas."
        },
        {
          "id": "r1p4",
          "text": "In other words, the sun supplied the energy that lifted water out of the ocean."
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
      "goal": "Build the paragraph about how ocean moisture becomes clouds and storms.",
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
          "text": "The warm, moist air rose, and as it climbed higher, it cooled."
        },
        {
          "id": "r2p5",
          "text": "The clouds that form over the ocean are made of smoke rather than water."
        },
        {
          "id": "r2p1",
          "text": "Moisture from the ocean can have a powerful effect on the weather."
        },
        {
          "id": "r2p6",
          "text": "Weather never comes from the ocean, because storms form only over land."
        },
        {
          "id": "r2p3",
          "text": "The cooled water vapor condensed into tiny droplets, which gathered into clouds."
        },
        {
          "id": "r2p4",
          "text": "When enough of that moisture builds up over warm water, it can grow into a storm."
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
      "goal": "Build the paragraph that explains why both the sun and the ocean are needed.",
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
          "text": "The ocean supplies the water, since it holds most of Earth's water."
        },
        {
          "id": "r3p5",
          "text": "The ocean supplies the energy, so the sun is just bright scenery in the sky."
        },
        {
          "id": "r3p1",
          "text": "Neither the sun nor the ocean could run this part of the water cycle alone."
        },
        {
          "id": "r3p6",
          "text": "The rain that falls on land is salt water that skipped the rest of the cycle."
        },
        {
          "id": "r3p3",
          "text": "The sun supplies the energy, which turns liquid water into vapor."
        },
        {
          "id": "r3p4",
          "text": "Together, the sun's energy and the ocean's water drive the water cycle and shape our weather."
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
    "prompt": "Three paragraphs, one report. In what order should a reader meet them?",
    "hint": "A reader needs the heating first, then the weather, before learning why both are required.",
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
      "prompt": "One sentence closes the first paragraph by naming what the sun supplied. Tap it.",
      "hint": "Look at the end of the paragraph about the sun and the ocean."
    },
    "quickCheck": {
      "prompt": "What does the ocean supply in this part of the water cycle?",
      "choices": [
        {
          "id": "a",
          "text": "The water that evaporates"
        },
        {
          "id": "b",
          "text": "The energy, with no help from the sun"
        },
        {
          "id": "c",
          "text": "The smoke that forms the clouds"
        },
        {
          "id": "d",
          "text": "Nothing, because weather never comes from the ocean"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How do the sun and the ocean work together in the water cycle, and how can that affect the weather?",
    "starters": [
      "The sun",
      "The ocean",
      "Together, they"
    ],
    "checks": [
      "I said the sun heated the ocean.",
      "I said ocean water evaporated into water vapor.",
      "I said the vapor formed clouds or could grow into storms.",
      "I said the ocean supplies the water and the sun supplies the energy.",
      "I did not say the ocean boils without the sun."
    ],
    "criteria": [
      "Give the sun the job of supplying energy.",
      "Give the ocean the job of supplying water.",
      "Connect the water vapor to clouds or storms."
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
    "liveLine": "The line is live. Mark what would fail if the sun stopped heating the ocean.",
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
    "prompt": "The line is live. Suppose the sun stopped heating the ocean. What would fail?",
    "hint": "Mark what goes dark. Then block the sun.",
    "switch": "Block the sun",
    "choices": [
      {
        "id": "a",
        "text": "Storms that build from that ocean moisture",
        "marks": [
          "storm"
        ]
      },
      {
        "id": "b",
        "text": "The ocean would disappear",
        "marks": [
          "ocean"
        ]
      },
      {
        "id": "c",
        "text": "Nothing, because the ocean would boil by itself.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The sun would become decoration",
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
        "text": "The sun shines on the ocean, and water vapor rises into a cloud."
      },
      {
        "id": "dark",
        "text": "The ocean steams under a sky with no sun."
      },
      {
        "id": "smoke",
        "text": "The cloud is made of smoke, and there is no ocean."
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
