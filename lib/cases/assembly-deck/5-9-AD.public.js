// Safe to import from client components.
// Assembly Deck — 5.9-AD. TEKS 5.9 — Earth's rotation causes day and night, the apparent motion of the Sun, and changing shadows.

export const PUBLIC_CASE = {
  "standard": "5.9-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "Shadows Move",
  "estimatedMinutes": 20,
  "brief": [
    "Earth rotates about once every 24 hours.",
    "That spin causes day and night.",
    "Shadows changed because Earth rotated, not because the Sun orbited the flagpole."
  ],
  "source": {
    "title": "SHADOW NOTES",
    "lines": [
      "Earth rotates on its axis about once every 24 hours.",
      "That rotation causes day and night.",
      "The morning shadow was long. The noon shadow was short.",
      "The Sun appeared to move. Earth was rotating."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The spin",
      "goal": "Build the paragraph about Earth's rotation.",
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
          "text": "One rotation takes about 24 hours."
        },
        {
          "id": "r1p5",
          "text": "Earth rotates once each year, and that causes night."
        },
        {
          "id": "r1p1",
          "text": "Earth rotates on its axis."
        },
        {
          "id": "r1p6",
          "text": "Night happens because the Sun goes out."
        },
        {
          "id": "r1p3",
          "text": "That spin causes day and night."
        },
        {
          "id": "r1p4",
          "text": "The school day is part of that rotation."
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
      "label": "The shadows",
      "goal": "Build the paragraph about the changing shadows.",
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
          "text": "The morning shadow was long."
        },
        {
          "id": "r2p5",
          "text": "The Sun orbited the flagpole."
        },
        {
          "id": "r2p1",
          "text": "Shadows changed as Earth rotated."
        },
        {
          "id": "r2p6",
          "text": "Shadows stay the same shape all day."
        },
        {
          "id": "r2p3",
          "text": "The noon shadow was short."
        },
        {
          "id": "r2p4",
          "text": "Earth's rotation made the Sun look like it moved."
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
      "label": "One explanation",
      "goal": "Build the paragraph that ties the observations together.",
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
          "text": "Day and night come from the spin."
        },
        {
          "id": "r3p5",
          "text": "Shadows change because the flagpole grows."
        },
        {
          "id": "r3p1",
          "text": "One rotation explains the observations."
        },
        {
          "id": "r3p6",
          "text": "The Moon pulls the shadows across the ground."
        },
        {
          "id": "r3p3",
          "text": "Shadow length and position change for the same reason."
        },
        {
          "id": "r3p4",
          "text": "The apparent motion of the Sun comes from Earth's rotation."
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
    "hint": "A reader needs the rotation, then the shadows, before the single explanation.",
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
      "prompt": "One sentence says one rotation takes about 24 hours. Tap it.",
      "hint": "Look in the spin paragraph."
    },
    "quickCheck": {
      "prompt": "Why did the noon shadow get short?",
      "choices": [
        {
          "id": "a",
          "text": "Earth was rotating"
        },
        {
          "id": "b",
          "text": "The Sun orbited the flagpole"
        },
        {
          "id": "c",
          "text": "The flagpole grew"
        },
        {
          "id": "d",
          "text": "The Sun went out"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How does Earth's rotation explain day, night, and the changing shadows?",
    "starters": [
      "Earth rotates",
      "That causes",
      "The shadows"
    ],
    "checks": [
      "I said Earth rotates about once every 24 hours.",
      "I said that causes day and night.",
      "I said the morning shadow was long and the noon shadow was short.",
      "I said the Sun only appeared to move.",
      "I did not say the Sun orbited the flagpole."
    ],
    "criteria": [
      "State the about-24-hour rotation.",
      "Connect it to day and night.",
      "Connect the shadow change to that same rotation."
    ]
  },
  "chain": {
    "title": "Shadow line",
    "sourceId": "axis",
    "cutId": "spin",
    "cutDark": [
      "shadow"
    ],
    "stayOn": [
      "axis"
    ],
    "cutting": "Stopping the rotation…",
    "cutDone": "No spin. The changing shadows go dark.",
    "liveLine": "The line is live. Mark what fails if Earth does not rotate.",
    "fillLine": "The shadow line fills in as each paragraph locks.",
    "links": [
      {
        "id": "axis",
        "label": "The axis",
        "mark": "🌐",
        "on": "r1"
      },
      {
        "id": "spin",
        "label": "The rotation",
        "mark": "🔄",
        "on": "r1"
      },
      {
        "id": "shadow",
        "label": "The shadows",
        "mark": "✅",
        "on": "r2"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Earth does not rotate. What fails?",
    "hint": "Mark what goes dark. Then stop the spin.",
    "switch": "Stop the spin",
    "choices": [
      {
        "id": "a",
        "text": "The changing shadows",
        "marks": [
          "shadow"
        ]
      },
      {
        "id": "b",
        "text": "Earth's axis disappears",
        "marks": [
          "axis"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The Sun can orbit the flagpole.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Night happens because the Sun goes out",
        "marks": [
          "spin"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the shadow line. Which sentence matches the picture?",
    "image": "/student/shadow_line.jpg",
    "choices": [
      {
        "id": "change",
        "text": "The same pole has a long shadow, then a short one, then a long one on the other side."
      },
      {
        "id": "same",
        "text": "The shadow stays the same all day."
      },
      {
        "id": "orbit",
        "text": "The Sun is traveling in a circle around the pole."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the shadow line. Which sentence matches the picture?"
  },
  "board": null
};
