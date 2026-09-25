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
    "Ms. Alvarez's class observed the flagpole's shadow three times in one school day.",
    "Write a short science report that explains what they observed.",
    "Use the shadow notes to show how Earth's rotation causes day and night and makes the shadows change."
  ],
  "source": {
    "title": "SHADOW NOTES",
    "lines": [
      "Earth rotates, or spins, on its axis, an imaginary line through the North and South Poles.",
      "One complete rotation takes about 24 hours.",
      "The half of Earth facing the Sun has day, while the half facing away has night.",
      "9 a.m.: the Sun was low in the eastern sky. The flagpole's shadow was long and pointed west.",
      "Noon: the Sun was high in the sky. The shadow was short.",
      "3 p.m.: the Sun was lower in the western sky. The shadow was long again and pointed east.",
      "The Sun appeared to move across the sky, but Earth was the one rotating."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The spin",
      "goal": "Build the paragraph that explains Earth's rotation and what it causes.",
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
          "text": "Each complete rotation takes about 24 hours, which is the length of one day and one night."
        },
        {
          "id": "r1p5",
          "text": "Earth completes only one rotation each year, and that slow turn is what causes night."
        },
        {
          "id": "r1p1",
          "text": "Earth is always rotating on an imaginary line called its axis."
        },
        {
          "id": "r1p6",
          "text": "Night happens because the Sun stops shining for a few hours."
        },
        {
          "id": "r1p3",
          "text": "As Earth turns, the side facing the Sun has daytime, while the side facing away has night."
        },
        {
          "id": "r1p4",
          "text": "So every sunrise and sunset we observe is part of that steady rotation."
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
      "goal": "Build the paragraph that describes how the flagpole's shadow changed.",
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
          "text": "In the morning, when the Sun was low in the eastern sky, the flagpole's shadow was long."
        },
        {
          "id": "r2p5",
          "text": "The Sun orbited the flagpole during the day, which is why its shadow kept moving around it."
        },
        {
          "id": "r2p1",
          "text": "Throughout the school day, the flagpole's shadow changed its length and direction as Earth rotated."
        },
        {
          "id": "r2p6",
          "text": "The shadow kept the same length and shape from morning until afternoon."
        },
        {
          "id": "r2p3",
          "text": "At noon, when the Sun appeared high in the sky, the same shadow was much shorter."
        },
        {
          "id": "r2p4",
          "text": "Although the Sun seemed to move across the sky, Earth's rotation caused the change."
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
      "goal": "Build the paragraph that connects every observation to one cause.",
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
          "text": "Day and night happen because the rotation carries each place into sunlight and back out."
        },
        {
          "id": "r3p5",
          "text": "Shadows change length because the flagpole grows taller at certain times of the day."
        },
        {
          "id": "r3p1",
          "text": "One cause explains every observation in our notes: Earth's rotation."
        },
        {
          "id": "r3p6",
          "text": "The Moon's gravity slowly pulls the shadows across the ground while we are at school."
        },
        {
          "id": "r3p3",
          "text": "The shadows changed for the same reason, since the Sun's position in our sky kept shifting."
        },
        {
          "id": "r3p4",
          "text": "So the Sun's apparent motion across the sky is really caused by Earth's rotation."
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
    "hint": "A reader needs to understand the rotation and the shadows before the paragraph that connects them.",
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
      "prompt": "One sentence tells how long a single rotation takes and connects it to day and night. Tap it.",
      "hint": "Look in the paragraph about the rotation."
    },
    "quickCheck": {
      "prompt": "Why was the noon shadow shorter than the morning shadow?",
      "choices": [
        {
          "id": "a",
          "text": "Earth had rotated, so the Sun appeared higher in the sky."
        },
        {
          "id": "b",
          "text": "The Sun had orbited to a new spot around the flagpole."
        },
        {
          "id": "c",
          "text": "The flagpole had changed height by noon."
        },
        {
          "id": "d",
          "text": "The Sun had stopped shining for part of the morning."
        }
      ]
    }
  },
  "explain": {
    "prompt": "How does Earth's rotation explain day and night and the changing shadows the class observed?",
    "starters": [
      "Earth rotates",
      "Because of that,",
      "The shadows changed because"
    ],
    "checks": [
      "I said Earth rotates about once every 24 hours.",
      "I explained how that rotation causes day and night.",
      "I said the morning shadow was long and the noon shadow was short.",
      "I said the Sun only appeared to move across the sky.",
      "I did not say the Sun orbited the flagpole."
    ],
    "criteria": [
      "State that one rotation takes about 24 hours.",
      "Explain how the rotation causes day and night.",
      "Connect the changing shadows to that same rotation."
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
    "cutDone": "No rotation. The changing shadows go dark.",
    "liveLine": "The line is live. Mark what would fail if Earth stopped rotating.",
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
    "prompt": "The line is live. Suppose Earth stopped rotating. What would fail?",
    "hint": "Mark what goes dark. Then stop the rotation.",
    "switch": "Stop the spin",
    "choices": [
      {
        "id": "a",
        "text": "The shadows that change through the day",
        "marks": [
          "shadow"
        ]
      },
      {
        "id": "b",
        "text": "Earth's axis would disappear",
        "marks": [
          "axis"
        ]
      },
      {
        "id": "c",
        "text": "Nothing, because the Sun could orbit the flagpole instead.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Night would happen because the Sun stops shining",
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
        "text": "The same pole has a long shadow, then a short one, then a long one pointing the other way."
      },
      {
        "id": "same",
        "text": "The shadow stays exactly the same all day."
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
