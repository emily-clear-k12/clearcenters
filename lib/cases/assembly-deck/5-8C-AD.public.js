// Safe to import from client components.
// Assembly Deck — 5.8C-AD. TEKS 5.8C — light travels in a straight line and can be reflected, refracted, or absorbed.

export const PUBLIC_CASE = {
  "standard": "5.8C-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Bent Straw",
  "estimatedMinutes": 20,
  "brief": [
    "One flashlight, one table, three things light can do.",
    "It traveled straight, bounced off a mirror, bent at the water, and stopped at a black card.",
    "Build the log. The straw is not really broken."
  ],
  "source": {
    "title": "LIGHT NOTES",
    "lines": [
      "The flashlight beam traveled in a straight line across the table.",
      "A mirror bounced that beam to the wall. That bounce is reflection.",
      "A straw in a glass of water looked bent at the water line. The straw was not broken.",
      "Light changed direction as it entered the water. That is refraction.",
      "A black card in the beam stopped the light. The wall behind the card stayed dark. That is absorption."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The straight beam",
      "goal": "Build the paragraph that says how the light traveled before it hit anything.",
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
          "hint": "The path across the table, and that it did not curve in the air",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What has to be true before a bounce or a bend",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The flashlight beam crossed the table without a turn."
        },
        {
          "id": "r1p5",
          "text": "The beam curled through the air like a hose."
        },
        {
          "id": "r1p1",
          "text": "The test started with light moving in a straight line."
        },
        {
          "id": "r1p6",
          "text": "The straw was magic, so the light does not matter."
        },
        {
          "id": "r1p3",
          "text": "Nothing in the air bent that first stretch of the beam."
        },
        {
          "id": "r1p4",
          "text": "Reflection and refraction happen when that straight light meets something."
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
      "id": "r2",
      "label": "Bounce, bend, and stop",
      "goal": "Build the paragraph that names the three things the light did.",
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
          "hint": "The mirror and the water",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The black card",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The mirror reflected the beam and bounced it to the wall."
        },
        {
          "id": "r2p5",
          "text": "The mirror swallowed the beam, so no light reached the wall."
        },
        {
          "id": "r2p1",
          "text": "The same straight light did three different things."
        },
        {
          "id": "r2p6",
          "text": "The straw really snapped in half inside the glass."
        },
        {
          "id": "r2p3",
          "text": "The water refracted the light, so the straw looked bent."
        },
        {
          "id": "r2p4",
          "text": "The black card absorbed the light, and the wall behind it stayed dark."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "What the straw shows",
      "goal": "Build the paragraph that explains the bent look.",
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
          "hint": "Where the look changed, and that the straw was whole",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the water is the cause",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The straw looked bent right at the water line."
        },
        {
          "id": "r3p5",
          "text": "The straw bends because water is heavy."
        },
        {
          "id": "r3p1",
          "text": "The bent straw is a trick of the light, not a broken object."
        },
        {
          "id": "r3p6",
          "text": "A black card is what made the straw look bent."
        },
        {
          "id": "r3p3",
          "text": "Pulled out of the water, the straw was straight."
        },
        {
          "id": "r3p4",
          "text": "Refraction changed the light's direction. It did not change the straw."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "offtopic",
        "contradicts",
        "opinion"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three paragraphs, one log. What order should the crew read them in?",
    "hint": "A reader needs the straight path, then the three changes, before the straw makes sense.",
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
      "prompt": "One sentence says refraction changed the light, not the straw. Tap that sentence.",
      "hint": "Look in the paragraph about what the straw shows."
    },
    "quickCheck": {
      "prompt": "Why did the straw look bent?",
      "choices": [
        {
          "id": "a",
          "text": "Light refracted when it entered the water"
        },
        {
          "id": "b",
          "text": "The straw really snapped"
        },
        {
          "id": "c",
          "text": "The beam curled through the air before the glass"
        },
        {
          "id": "d",
          "text": "The black card bent it"
        }
      ]
    }
  },
  "explain": {
    "prompt": "The chief has one more question. What did the light do at the mirror, at the water, and at the black card?",
    "starters": [
      "At the mirror",
      "At the water",
      "The straw",
      "At the black card"
    ],
    "checks": [
      "I answered all three parts.",
      "I said the mirror reflected the light.",
      "I said the water refracted the light.",
      "I said the black card absorbed the light.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say the mirror reflected, or bounced, the beam.",
      "Say the water refracted the light, so the straw looked bent but was not broken.",
      "Say the black card absorbed the light, or stopped it."
    ]
  },
  "chain": {
    "title": "Light line",
    "sourceId": "lamp",
    "cutId": "water",
    "cutDark": [
      "bent"
    ],
    "stayOn": [
      "lamp",
      "straight"
    ],
    "cutting": "Taking the water out of the line…",
    "cutDone": "Water gone. The bent look goes dark.",
    "liveLine": "The line is live. Mark what fails if the water is gone.",
    "fillLine": "The light line fills in as each paragraph locks.",
    "links": [
      {
        "id": "lamp",
        "label": "Flashlight",
        "mark": "🔦",
        "on": "r1"
      },
      {
        "id": "straight",
        "label": "Straight",
        "mark": "➡️",
        "on": "r1"
      },
      {
        "id": "water",
        "label": "Water",
        "mark": "🥛",
        "on": "r2"
      },
      {
        "id": "bent",
        "label": "Bent look",
        "mark": "🥤",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the water away. What fails?",
    "hint": "Mark the part you think goes dark. Then take the water away.",
    "switch": "Take the water away",
    "choices": [
      {
        "id": "a",
        "text": "The bent look of the straw",
        "marks": [
          "bent"
        ]
      },
      {
        "id": "b",
        "text": "The flashlight goes out",
        "marks": [
          "lamp"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The straw stays bent in the air.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The straight beam disappears",
        "marks": [
          "straight"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the light line. Which sentence matches the picture?",
    "image": "/student/straw_line.jpg",
    "choices": [
      {
        "id": "bend",
        "text": "The beam travels straight, then the straw looks bent at the water."
      },
      {
        "id": "snap",
        "text": "The straw is snapped in half, and there is no flashlight."
      },
      {
        "id": "curl",
        "text": "The beam curls through the air before it ever reaches the glass."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the light line. Which sentence matches the picture?"
  },
  "board": null
};
