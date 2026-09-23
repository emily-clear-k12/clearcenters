// Safe to import from client components.
// Assembly Deck — 5.10C-AD. TEKS 5.10C — water, wind, and ice shape landforms, including canyons, deltas, and dunes.

export const PUBLIC_CASE = {
  "standard": "5.10C-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "Reading a Canyon",
  "estimatedMinutes": 20,
  "brief": [
    "A river has been cutting one canyon for a very long time.",
    "The same water carries sediment and drops it in a delta.",
    "Wind and ice shape land too. Build the log from the land, not from a one-day story."
  ],
  "source": {
    "title": "CANYON NOTES",
    "lines": [
      "The canyon walls show layers of rock.",
      "A river at the bottom is cutting those layers and carrying sediment away.",
      "This canyon did not form in a day. The cutting has taken a very long time.",
      "Where the river slows at the sea, it drops that sediment and builds a delta.",
      "Wind can pile sand into dunes. Ice can carve rock too. Those are different landforms."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What the walls show",
      "goal": "Build the paragraph that says what the canyon walls are evidence of.",
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
          "hint": "The layers, and the river at the bottom",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the layers are not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The walls show layers of rock stacked over time."
        },
        {
          "id": "r1p5",
          "text": "The canyon appeared overnight after one storm."
        },
        {
          "id": "r1p1",
          "text": "The canyon walls are a record of rock, not a one-day event."
        },
        {
          "id": "r1p6",
          "text": "The layers are paint someone added to make the walls pretty."
        },
        {
          "id": "r1p3",
          "text": "A river runs at the bottom and is cutting into those layers."
        },
        {
          "id": "r1p4",
          "text": "The layers were already there before today's water touched them."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "story"
      ]
    },
    {
      "id": "r2",
      "label": "What the river is doing",
      "goal": "Build the paragraph that follows the sediment from the canyon to the delta.",
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
          "hint": "What the river carries, and where it drops it",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Which two landforms this one river explains",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "It carries sediment away from the canyon walls."
        },
        {
          "id": "r2p5",
          "text": "The river drops the sediment at the top of the canyon."
        },
        {
          "id": "r2p1",
          "text": "The river is both cutting rock and moving sediment."
        },
        {
          "id": "r2p6",
          "text": "The delta formed because the wind got tired."
        },
        {
          "id": "r2p3",
          "text": "Where the river slows at the sea, it drops that sediment."
        },
        {
          "id": "r2p4",
          "text": "One river can carve a canyon and build a delta."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "Other ways land changes",
      "goal": "Build the paragraph that compares water, wind, and ice.",
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
          "hint": "What wind does, and what ice does",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What all three have in common",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Wind can pile sand into dunes."
        },
        {
          "id": "r3p5",
          "text": "Dunes are built by the same river that cuts this canyon."
        },
        {
          "id": "r3p1",
          "text": "Water is not the only thing that shapes the land."
        },
        {
          "id": "r3p6",
          "text": "A canyon, a delta, and a dune are all the same landform."
        },
        {
          "id": "r3p3",
          "text": "Ice can carve rock as it moves."
        },
        {
          "id": "r3p4",
          "text": "Wind, water, and ice each change Earth's surface, and none of them finish in a day."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "contradicts",
        "opinion",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three paragraphs, one log. What order should the crew read them in?",
    "hint": "A reader needs the walls, then the river's two jobs, before wind and ice belong.",
    "slots": [
      {
        "id": "first",
        "label": "Opens the log"
      },
      {
        "id": "second",
        "label": "Middle paragraph"
      },
      {
        "id": "third",
        "label": "Closes the log"
      }
    ]
  },
  "debrief": {
    "pinpoint": {
      "prompt": "One sentence says one river can carve a canyon and build a delta. Tap that sentence.",
      "hint": "Look in the paragraph about what the river is doing."
    },
    "quickCheck": {
      "prompt": "Which match is right for this log?",
      "choices": [
        {
          "id": "a",
          "text": "A river can carve a canyon and drop sediment into a delta"
        },
        {
          "id": "b",
          "text": "The canyon formed overnight"
        },
        {
          "id": "c",
          "text": "Wind built this canyon, and the river built the dunes"
        },
        {
          "id": "d",
          "text": "A canyon, a delta, and a dune are the same landform"
        }
      ]
    }
  },
  "explain": {
    "prompt": "The chief has one more question. How does the river shape both the canyon and the delta, and why did the canyon not form in a day?",
    "starters": [
      "The river",
      "Sediment",
      "The delta",
      "The canyon took a long time because"
    ],
    "checks": [
      "I answered both parts of the question.",
      "I said the river cuts the canyon.",
      "I said the river drops sediment in a delta.",
      "I said the change is slow.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say the river cuts the canyon and carries sediment.",
      "Say the river drops that sediment to build a delta.",
      "Say the canyon formed over a very long time, not in a day."
    ]
  },
  "chain": {
    "title": "Canyon line",
    "sourceId": "river",
    "cutId": "river",
    "cutDark": [
      "canyon",
      "delta"
    ],
    "stayOn": [],
    "cutting": "Taking the river out of the line…",
    "cutDone": "River gone. The canyon's cutting and the delta go dark.",
    "liveLine": "The line is live. Mark what fails if the river is gone.",
    "fillLine": "The canyon line fills in as each paragraph locks.",
    "links": [
      {
        "id": "river",
        "label": "River",
        "mark": "💧",
        "on": "r1"
      },
      {
        "id": "canyon",
        "label": "Canyon",
        "mark": "⛰️",
        "on": "r2"
      },
      {
        "id": "delta",
        "label": "Delta",
        "mark": "🌊",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the river away. What fails?",
    "hint": "Mark the part you think goes dark. Then take the river away.",
    "switch": "Take the river away",
    "choices": [
      {
        "id": "a",
        "text": "The cutting of the canyon and the building of the delta",
        "marks": [
          "canyon",
          "delta"
        ]
      },
      {
        "id": "b",
        "text": "Nothing. The canyon keeps getting deeper with no water.",
        "nobody": true
      },
      {
        "id": "c",
        "text": "The delta gets bigger",
        "marks": [
          "delta"
        ]
      },
      {
        "id": "d",
        "text": "Wind stops, so the dunes disappear",
        "marks": [
          "canyon"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the canyon line. Which sentence matches the picture?",
    "image": "/student/canyon_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "A river cuts a canyon, then drops sediment where it meets the sea."
      },
      {
        "id": "night",
        "text": "The canyon is shown forming in a single night, with no river."
      },
      {
        "id": "same",
        "text": "The dune, the canyon, and the delta are drawn as the same shape."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the canyon line. Which sentence matches the picture?"
  },
  "board": null
};
