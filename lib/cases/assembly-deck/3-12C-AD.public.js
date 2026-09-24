// Safe to import from client components.
// Assembly Deck — 3.12C-AD. TEKS 3.12C — floods can make organisms thrive, perish, or move.

export const PUBLIC_CASE = {
  "standard": "3.12C-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Science",
  "title": "After the Flood",
  "estimatedMinutes": 20,
  "brief": [
    "The creek flooded the meadow.",
    "Some plants thrived. Some insects perished. Deer moved.",
    "This flood is not a drought."
  ],
  "source": {
    "title": "FLOOD NOTES",
    "lines": [
      "The creek flooded the meadow.",
      "Wet plants grew thick. They thrived.",
      "Some insects perished in the deep water.",
      "The deer moved to higher ground.",
      "This change was a flood, not a drought."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The change",
      "goal": "Build the paragraph about what the flood did to the place.",
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
          "text": "The creek left its banks."
        },
        {
          "id": "r1p5",
          "text": "The meadow dried up in a drought."
        },
        {
          "id": "r1p1",
          "text": "A flood is a natural change."
        },
        {
          "id": "r1p6",
          "text": "A wish made the creek flood."
        },
        {
          "id": "r1p3",
          "text": "Water covered the meadow."
        },
        {
          "id": "r1p4",
          "text": "The flood changed the animals' home."
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
      "label": "The organisms",
      "goal": "Build the paragraph about thrive, perish, and move.",
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
          "text": "Some plants thrived in the wet soil."
        },
        {
          "id": "r2p5",
          "text": "Every animal thrived."
        },
        {
          "id": "r2p1",
          "text": "The flood did not treat every organism the same."
        },
        {
          "id": "r2p6",
          "text": "The deer perished on the hill."
        },
        {
          "id": "r2p3",
          "text": "Some insects perished."
        },
        {
          "id": "r2p4",
          "text": "Other animals moved to higher ground."
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
      "label": "The pattern",
      "goal": "Build the paragraph that names all three results.",
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
          "text": "Some plants thrived."
        },
        {
          "id": "r3p5",
          "text": "A flood only makes things grow."
        },
        {
          "id": "r3p1",
          "text": "One flood can have more than one result."
        },
        {
          "id": "r3p6",
          "text": "A drought did all of this."
        },
        {
          "id": "r3p3",
          "text": "Some insects perished, and deer moved."
        },
        {
          "id": "r3p4",
          "text": "Thrive, perish, and move can all follow a flood."
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
    "hint": "A reader needs the flood, then what organisms did, before the pattern.",
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
      "prompt": "One sentence says some insects perished. Tap it.",
      "hint": "Look in the organisms paragraph."
    },
    "quickCheck": {
      "prompt": "What did the deer do after the flood?",
      "choices": [
        {
          "id": "a",
          "text": "They moved to higher ground"
        },
        {
          "id": "b",
          "text": "They perished on the hill"
        },
        {
          "id": "c",
          "text": "They all thrived in the deep water"
        },
        {
          "id": "d",
          "text": "A drought made them leave"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What did the flood do, and what did the organisms do?",
    "starters": [
      "The creek",
      "The plants",
      "The insects",
      "The deer"
    ],
    "checks": [
      "I said the creek flooded the meadow.",
      "I said some plants thrived.",
      "I said some insects perished.",
      "I said deer moved to higher ground.",
      "I did not call this a drought."
    ],
    "criteria": [
      "Name the flood.",
      "Include thrive, perish, and move.",
      "Do not turn the flood into a drought."
    ]
  },
  "chain": {
    "title": "Flood line",
    "sourceId": "creek",
    "cutId": "flood",
    "cutDark": [
      "move"
    ],
    "stayOn": [
      "creek"
    ],
    "cutting": "Taking the flood away…",
    "cutDone": "No flood. The animals' move goes dark.",
    "liveLine": "The line is live. Mark what fails if the creek never floods.",
    "fillLine": "The flood line fills in as each paragraph locks.",
    "links": [
      {
        "id": "creek",
        "label": "The creek",
        "mark": "💧",
        "on": "r1"
      },
      {
        "id": "flood",
        "label": "The flood",
        "mark": "🌊",
        "on": "r1"
      },
      {
        "id": "move",
        "label": "They move",
        "mark": "🦌",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The creek never floods. What fails?",
    "hint": "Mark what goes dark. Then take the flood away.",
    "switch": "Skip the flood",
    "choices": [
      {
        "id": "a",
        "text": "The deer moving uphill",
        "marks": [
          "move"
        ]
      },
      {
        "id": "b",
        "text": "The creek disappears",
        "marks": [
          "creek"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A drought does the same job.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Every animal thrives",
        "marks": [
          "flood"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the flood line. Which sentence matches the picture?",
    "image": "/student/flood_line.jpg",
    "choices": [
      {
        "id": "over",
        "text": "Water has left the creek, and a deer is moving uphill."
      },
      {
        "id": "dry",
        "text": "The meadow is dry and cracked."
      },
      {
        "id": "wish",
        "text": "The picture is a student making a wish."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the flood line. Which sentence matches the picture?"
  },
  "board": null
};
