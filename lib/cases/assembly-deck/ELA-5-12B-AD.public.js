// Safe to import from client components.
// Assembly Deck — ELA.5.12B-AD. TEKS 5.12B — informational writing with a clear central idea.

export const PUBLIC_CASE = {
  "standard": "ELA.5.12B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "ELAR",
  "title": "What a Watershed Is",
  "estimatedMinutes": 20,
  "brief": [
    "Explain a watershed for the school site. A reader who has never stood on the ridge should get it.",
    "Informational writing needs one central idea and the facts that hold it.",
    "Naming the creek and forgetting the land leaves the idea unfinished."
  ],
  "source": {
    "title": "SITE NOTES",
    "lines": [
      "A watershed is the land that drains to the same water.",
      "Rain on the playground runs to the storm drain, then to Oak Creek.",
      "The ridge behind the soccer field is the divide.",
      "Rain on the far side of that ridge goes to Pine Creek, not Oak Creek.",
      "The creek is where the water ends. The land is the watershed."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The central idea",
      "goal": "Build the paragraph that defines a watershed.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Where playground rain goes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the watershed actually is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Rain on our playground runs to the storm drain."
        },
        {
          "id": "r1p5",
          "text": "The creek itself is the watershed."
        },
        {
          "id": "r1p1",
          "text": "A watershed is the land that drains to one body of water."
        },
        {
          "id": "r1p6",
          "text": "A watershed is only a feeling about nature."
        },
        {
          "id": "r1p3",
          "text": "That drain leads to Oak Creek."
        },
        {
          "id": "r1p4",
          "text": "The land, not the creek, is the watershed."
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
      "label": "The divide",
      "goal": "Build the paragraph that explains the ridge.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Which ridge, and where the other side drains",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What water cannot do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The ridge behind the soccer field is the divide."
        },
        {
          "id": "r2p5",
          "text": "All rain in the city ends up in Oak Creek."
        },
        {
          "id": "r2p1",
          "text": "A ridge decides which watershed the rain belongs to."
        },
        {
          "id": "r2p6",
          "text": "The ridge sends every drop to both creeks at once."
        },
        {
          "id": "r2p3",
          "text": "Rain on the far side goes to Pine Creek."
        },
        {
          "id": "r2p4",
          "text": "Water does not flow uphill over that ridge."
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
      "label": "Why the land matters",
      "goal": "Build the paragraph that connects the playground to the creek.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "What can wash off the playground, and where it goes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a puddle is not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Trash on the playground can wash into the drain."
        },
        {
          "id": "r3p5",
          "text": "Pollution stays in the puddle and never moves."
        },
        {
          "id": "r3p1",
          "text": "What happens on the land can reach the creek."
        },
        {
          "id": "r3p6",
          "text": "Only water poured straight into the creek can reach it."
        },
        {
          "id": "r3p3",
          "text": "The drain carries that water to Oak Creek."
        },
        {
          "id": "r3p4",
          "text": "A puddle is not a new watershed. It still drains downhill."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a new reader hear them in?",
    "hint": "A reader needs the definition, then the ridge, before the playground path makes sense.",
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
      "prompt": "One sentence says the land, not the creek, is the watershed. Tap it.",
      "hint": "Look in the part that defines a watershed."
    },
    "quickCheck": {
      "prompt": "Which sentence is the central idea?",
      "choices": [
        {
          "id": "a",
          "text": "A watershed is the land that drains to one body of water"
        },
        {
          "id": "b",
          "text": "The creek itself is the watershed"
        },
        {
          "id": "c",
          "text": "All city rain ends up in Oak Creek"
        },
        {
          "id": "d",
          "text": "A puddle is its own watershed"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What is a watershed, and which one is our school in?",
    "starters": [
      "A watershed is",
      "Rain on the playground",
      "The ridge",
      "Oak Creek"
    ],
    "checks": [
      "I defined a watershed as land.",
      "I said where playground rain goes.",
      "I said the ridge splits Oak Creek from Pine Creek.",
      "I did not call the creek itself the watershed.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Define a watershed as the land that drains to one body of water.",
      "Say playground rain goes to the storm drain and then Oak Creek.",
      "Say the ridge sends the far side to Pine Creek."
    ]
  },
  "chain": {
    "title": "Watershed line",
    "sourceId": "rain",
    "cutId": "ridge",
    "cutDark": [
      "creek"
    ],
    "stayOn": [
      "rain"
    ],
    "cutting": "Taking the ridge out of the system…",
    "cutDone": "No divide. You can no longer say which creek the rain reaches.",
    "liveLine": "The line is live. Mark what fails if the ridge is gone.",
    "fillLine": "The watershed line fills in as each part locks.",
    "links": [
      {
        "id": "rain",
        "label": "Rain",
        "mark": "🌧️",
        "on": "r1"
      },
      {
        "id": "ridge",
        "label": "The ridge",
        "mark": "⛰️",
        "on": "r2"
      },
      {
        "id": "creek",
        "label": "Oak Creek",
        "mark": "🏞️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the ridge away. What fails?",
    "hint": "Mark what goes dark. Then take the ridge away.",
    "switch": "Take the ridge away",
    "choices": [
      {
        "id": "a",
        "text": "Knowing which creek the rain reaches",
        "marks": [
          "creek"
        ]
      },
      {
        "id": "b",
        "text": "The rain disappears",
        "marks": [
          "rain"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. All rain shares one creek.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Both creeks get every drop",
        "marks": [
          "creek"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the watershed line. Which sentence matches the picture?",
    "image": "/student/ridge_line.jpg",
    "choices": [
      {
        "id": "split",
        "text": "Rain falls on a ridge, and each side drains to its own creek."
      },
      {
        "id": "one",
        "text": "All the water crosses the ridge into one creek."
      },
      {
        "id": "lake",
        "text": "The picture is only a lake, with no land and no ridge."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the watershed line. Which sentence matches the picture?"
  },
  "board": null
};
