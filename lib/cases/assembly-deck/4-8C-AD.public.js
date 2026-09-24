// Safe to import from client components.
// Assembly Deck — 4.8C-AD. TEKS 4.8C — electrical energy travels a closed path and can become light or thermal energy.

export const PUBLIC_CASE = {
  "standard": "4.8C-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Science",
  "title": "The Closed Path",
  "estimatedMinutes": 20,
  "brief": [
    "A battery, wires, a switch, and a bulb.",
    "Open switch: the bulb stays dark. Closed path: it lights, and the wire feels warm.",
    "A pile of parts is not a circuit."
  ],
  "source": {
    "title": "CIRCUIT NOTES",
    "lines": [
      "When the switch was open, the bulb stayed dark.",
      "When the switch was closed, the bulb lit.",
      "The wire near the battery felt warm.",
      "Electrical energy became light and thermal energy.",
      "The path has to be closed."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The path",
      "goal": "Build the paragraph about the open and closed switch.",
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
          "text": "The open switch left the bulb dark."
        },
        {
          "id": "r1p5",
          "text": "The bulb lit while the switch was open."
        },
        {
          "id": "r1p1",
          "text": "Electrical energy needs a closed path."
        },
        {
          "id": "r1p6",
          "text": "A battery lights a bulb with no wires."
        },
        {
          "id": "r1p3",
          "text": "The closed switch let the bulb light."
        },
        {
          "id": "r1p4",
          "text": "The closed path let the energy travel."
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
      "label": "What it became",
      "goal": "Build the paragraph about light and heat.",
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
          "text": "The bulb gave off light energy."
        },
        {
          "id": "r2p5",
          "text": "The bulb gave off sound energy."
        },
        {
          "id": "r2p1",
          "text": "The closed path produced more than one form."
        },
        {
          "id": "r2p6",
          "text": "The warmth means the battery is melting."
        },
        {
          "id": "r2p3",
          "text": "The wire felt warm, which is thermal energy."
        },
        {
          "id": "r2p4",
          "text": "Electrical energy changed into light and heat."
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
      "label": "The rule",
      "goal": "Build the paragraph that states when the circuit works.",
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
          "text": "An open path made no light."
        },
        {
          "id": "r3p5",
          "text": "Any pile of parts is a circuit."
        },
        {
          "id": "r3p1",
          "text": "The circuit works only on a closed path."
        },
        {
          "id": "r3p6",
          "text": "The brand of the battery is what matters."
        },
        {
          "id": "r3p3",
          "text": "A closed path made light and heat."
        },
        {
          "id": "r3p4",
          "text": "A closed path is required."
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
    "hint": "A reader needs the path, then the energy change, before the rule.",
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
      "prompt": "One sentence says the closed switch let the bulb light. Tap it.",
      "hint": "Look in the path paragraph."
    },
    "quickCheck": {
      "prompt": "What did the electrical energy become?",
      "choices": [
        {
          "id": "a",
          "text": "Light and thermal energy"
        },
        {
          "id": "b",
          "text": "Sound energy"
        },
        {
          "id": "c",
          "text": "Nothing. The open switch still lit the bulb."
        },
        {
          "id": "d",
          "text": "A melted battery"
        }
      ]
    }
  },
  "explain": {
    "prompt": "When did the bulb light, and what did the electrical energy become?",
    "starters": [
      "The open switch",
      "The closed path",
      "The energy"
    ],
    "checks": [
      "I said the open switch left the bulb dark.",
      "I said the closed path lit the bulb.",
      "I said the wire felt warm.",
      "I said electrical energy became light and heat.",
      "I did not say a pile of parts is enough."
    ],
    "criteria": [
      "Contrast the open and closed switch.",
      "Name light and thermal energy.",
      "Say the path has to be closed."
    ]
  },
  "chain": {
    "title": "Circuit line",
    "sourceId": "battery",
    "cutId": "closed",
    "cutDark": [
      "light"
    ],
    "stayOn": [
      "battery"
    ],
    "cutting": "Opening the path…",
    "cutDone": "The path is open. The light goes dark.",
    "liveLine": "The line is live. Mark what fails if the path is open.",
    "fillLine": "The circuit line fills in as each paragraph locks.",
    "links": [
      {
        "id": "battery",
        "label": "The battery",
        "mark": "🔋",
        "on": "r1"
      },
      {
        "id": "closed",
        "label": "Closed path",
        "mark": "🔁",
        "on": "r1"
      },
      {
        "id": "light",
        "label": "Light",
        "mark": "💡",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The path stays open. What fails?",
    "hint": "Mark what goes dark. Then open the path.",
    "switch": "Open the path",
    "choices": [
      {
        "id": "a",
        "text": "The light from the bulb",
        "marks": [
          "light"
        ]
      },
      {
        "id": "b",
        "text": "The battery disappears",
        "marks": [
          "battery"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. An open switch still lights the bulb.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The bulb makes sound",
        "marks": [
          "closed"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the circuit line. Which sentence matches the picture?",
    "image": "/student/circuit_line.jpg",
    "choices": [
      {
        "id": "closed",
        "text": "A battery, wires, and a bulb make a closed loop, and the bulb is lit."
      },
      {
        "id": "open",
        "text": "The wires do not connect, but the bulb is still lit."
      },
      {
        "id": "pile",
        "text": "The parts are in a pile, with no loop."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the circuit line. Which sentence matches the picture?"
  },
  "board": null
};
