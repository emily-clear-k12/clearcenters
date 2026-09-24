// Safe to import from client components.
// Assembly Deck — 5.8B-AD. TEKS 5.8B — a complete circuit can transform electrical energy into motion.

export const PUBLIC_CASE = {
  "standard": "5.8B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Spinning Motor",
  "estimatedMinutes": 20,
  "brief": [
    "A battery, wires, a closed switch, and a motor.",
    "The motor spun. Electrical energy became motion.",
    "Open the switch, and the spinning stops."
  ],
  "source": {
    "title": "MOTOR NOTES",
    "lines": [
      "The battery, wires, and closed switch made a complete path.",
      "The motor spun.",
      "Electrical energy transformed into motion.",
      "When the switch opened, the spinning stopped.",
      "A complete circuit can also become light, sound, or heat. This one became motion."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What the circuit needed",
      "goal": "Build the paragraph about the complete path.",
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
          "text": "The battery, wires, and closed switch made a full path."
        },
        {
          "id": "r1p5",
          "text": "The motor spun with the switch open."
        },
        {
          "id": "r1p1",
          "text": "The motor needed a complete circuit."
        },
        {
          "id": "r1p6",
          "text": "A battery alone is a complete circuit."
        },
        {
          "id": "r1p3",
          "text": "The path had no gap."
        },
        {
          "id": "r1p4",
          "text": "Electrical energy could travel to the motor."
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
      "label": "The transformation",
      "goal": "Build the paragraph about energy changing form.",
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
          "text": "Electrical energy entered the motor."
        },
        {
          "id": "r2p5",
          "text": "The motor created energy from nothing."
        },
        {
          "id": "r2p1",
          "text": "Energy changed form in the motor."
        },
        {
          "id": "r2p6",
          "text": "The spinning was only sound energy."
        },
        {
          "id": "r2p3",
          "text": "The spinning was the new form."
        },
        {
          "id": "r2p4",
          "text": "Electrical energy transformed into motion."
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
      "label": "The requirement",
      "goal": "Build the paragraph about what a gap does.",
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
          "text": "The open switch stopped the motor."
        },
        {
          "id": "r3p5",
          "text": "An open loop still runs a motor."
        },
        {
          "id": "r3p1",
          "text": "A gap stops the transformation."
        },
        {
          "id": "r3p6",
          "text": "The fan spun because of wind, not the circuit."
        },
        {
          "id": "r3p3",
          "text": "A complete path is required."
        },
        {
          "id": "r3p4",
          "text": "This circuit turned electrical energy into motion."
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
    "hint": "A reader needs the complete path, then the transformation, before the requirement.",
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
      "prompt": "One sentence says electrical energy transformed into motion. Tap it.",
      "hint": "Look in the transformation paragraph."
    },
    "quickCheck": {
      "prompt": "What happened when the switch opened?",
      "choices": [
        {
          "id": "a",
          "text": "The motor stopped"
        },
        {
          "id": "b",
          "text": "The motor kept spinning"
        },
        {
          "id": "c",
          "text": "The battery alone kept the circuit complete"
        },
        {
          "id": "d",
          "text": "Wind kept the fan spinning"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What made the motor spin, and what energy transformation happened?",
    "starters": [
      "The circuit",
      "Electrical energy",
      "When the switch opened"
    ],
    "checks": [
      "I said the path was complete.",
      "I said electrical energy became motion.",
      "I said the motor spun.",
      "I said an open switch stopped it.",
      "I did not say energy came from nothing."
    ],
    "criteria": [
      "Describe a complete circuit.",
      "Say electrical energy transformed into motion.",
      "Say an open path stops the motor."
    ]
  },
  "chain": {
    "title": "Motor line",
    "sourceId": "battery",
    "cutId": "complete",
    "cutDark": [
      "motion"
    ],
    "stayOn": [
      "battery"
    ],
    "cutting": "Opening the circuit…",
    "cutDone": "The path is open. The motion goes dark.",
    "liveLine": "The line is live. Mark what fails if the circuit is not complete.",
    "fillLine": "The motor line fills in as each paragraph locks.",
    "links": [
      {
        "id": "battery",
        "label": "The battery",
        "mark": "🔋",
        "on": "r1"
      },
      {
        "id": "complete",
        "label": "Complete path",
        "mark": "🔁",
        "on": "r1"
      },
      {
        "id": "motion",
        "label": "Motion",
        "mark": "✅",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The circuit is not complete. What fails?",
    "hint": "Mark what goes dark. Then open the path.",
    "switch": "Open the path",
    "choices": [
      {
        "id": "a",
        "text": "The motor's motion",
        "marks": [
          "motion"
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
        "text": "Nothing. An open switch still spins the motor.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Energy appears from nothing",
        "marks": [
          "complete"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the motor line. Which sentence matches the picture?",
    "image": "/student/motor_line.jpg",
    "choices": [
      {
        "id": "spin",
        "text": "A battery and wires make a closed loop, and a motor is spinning."
      },
      {
        "id": "open",
        "text": "The loop is open, but the motor still spins."
      },
      {
        "id": "wind",
        "text": "There is no circuit, only wind."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the motor line. Which sentence matches the picture?"
  },
  "board": null
};
