// Safe to import from client components.
// Assembly Deck — SS.5.12B-AD. TEKS 5.12B — how geographic factors influence where economic activities are located.

export const PUBLIC_CASE = {
  "standard": "SS.5.12B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Social Studies",
  "title": "Why the Factory Is There",
  "estimatedMinutes": 20,
  "brief": [
    "The textile mills at Lowell, Massachusetts, were not placed there by luck.",
    "Explain how the river supplied power, how goods moved in and out, and why people came to work.",
    "Remember that a pretty view is not a geographic factor, and the river did not set anyone's wage."
  ],
  "source": {
    "title": "MILL NOTES",
    "lines": [
      "Lowell sits where the Merrimack River drops about 30 feet at Pawtucket Falls. Canals carried river water to the mills, where it turned the large water wheels that ran the machines.",
      "Ships brought raw cotton to the port of Boston. From there, canal boats, and later a railroad, carried it about 25 miles to Lowell. Finished cloth traveled back to Boston the same way, and ships carried it to buyers.",
      "A mill far from power and far from a port costs more to run.",
      "Workers moved to Lowell for jobs that paid wages. Many were young women from nearby New England farms.",
      "The river explains the power. It does not decide a worker's pay.",
      "The mills were not built in a desert, and they were not a thousand miles from a port."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The power",
      "goal": "Build the paragraph that explains why the river mattered to the mills.",
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
          "hint": "What the river did, and what a mill without it would face",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of reason that is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "At Lowell, water from the Merrimack River turned the large wheels that ran the machines."
        },
        {
          "id": "r1p5",
          "text": "The mills were built in a dry desert, far from any river or stream."
        },
        {
          "id": "r1p1",
          "text": "Before a textile mill could spin a single thread, it needed a steady source of power."
        },
        {
          "id": "r1p6",
          "text": "The owners picked the spot because it had the loveliest view in all of New England."
        },
        {
          "id": "r1p3",
          "text": "A mill far from a source of power would cost more to run. It would need another way to move its machines."
        },
        {
          "id": "r1p4",
          "text": "The river's power is a geographic factor, which means the mills' location was not a lucky guess."
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
      "label": "The transport",
      "goal": "Build the paragraph about how cotton arrived and cloth left.",
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
          "hint": "How cotton arrived, and how cloth left",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What distance does to the cost",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Ships delivered raw cotton to Boston's port, and canal boats carried it on to Lowell."
        },
        {
          "id": "r2p5",
          "text": "The mills stood a thousand miles from any port, far from the nearest ship."
        },
        {
          "id": "r2p1",
          "text": "The mills also depended on moving heavy loads of cotton in and cloth out."
        },
        {
          "id": "r2p6",
          "text": "Moving the cotton cost nothing, because the mill owners owned every ship and canal boat."
        },
        {
          "id": "r2p3",
          "text": "Finished cloth traveled back to Boston the same way, where ships carried it to buyers."
        },
        {
          "id": "r2p4",
          "text": "If a factory is far from a port, it must pay more to move every bale of cotton."
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
      "label": "The workers",
      "goal": "Build the paragraph about who came to work, and what the river did not decide.",
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
          "hint": "Who moved to Lowell, and why",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the river cannot explain",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Workers moved to Lowell because the mills offered jobs that paid wages."
        },
        {
          "id": "r3p5",
          "text": "Mill owners paid higher wages to workers who lived closest to the river."
        },
        {
          "id": "r3p1",
          "text": "Power and transport are not enough, because a mill also needs people to run its machines."
        },
        {
          "id": "r3p6",
          "text": "Because the land was so well suited, the mills never needed anyone to move to Lowell."
        },
        {
          "id": "r3p3",
          "text": "Many of the early workers were young women who left nearby New England farms."
        },
        {
          "id": "r3p4",
          "text": "Although the river explains where the power came from, it does not explain how much workers were paid."
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
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs the power, then the transport, before the workers make sense.",
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
      "prompt": "One sentence explains what turned the mills' water wheels. Tap it.",
      "hint": "Look in the part about power."
    },
    "quickCheck": {
      "prompt": "Why were the Lowell mills built where they were?",
      "choices": [
        {
          "id": "a",
          "text": "A river could power the wheels, and a port could move the goods"
        },
        {
          "id": "b",
          "text": "The spot was a desert with a pretty view"
        },
        {
          "id": "c",
          "text": "The mills were a thousand miles from any port"
        },
        {
          "id": "d",
          "text": "The river decided the workers' pay"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What geographic factors explain the mills at Lowell, and what do those factors not explain?",
    "starters": [
      "The Merrimack River",
      "Ships",
      "Workers moved",
      "The river does not"
    ],
    "checks": [
      "I said the river turned the water wheels.",
      "I said ships or the port moved cotton or cloth.",
      "I said workers moved there for the jobs.",
      "I said the river did not set the pay, or that a desert would not work.",
      "I did not say the owner chose a pretty view."
    ],
    "criteria": [
      "Say the Merrimack River powered the mills.",
      "Say ships or Boston's port moved cotton or cloth.",
      "Say workers moved to Lowell for the jobs, and do not claim the river set their wages."
    ]
  },
  "chain": {
    "title": "Mill line",
    "sourceId": "river",
    "cutId": "river",
    "cutDark": [
      "jobs"
    ],
    "stayOn": [
      "ships"
    ],
    "cutting": "Taking the river power away…",
    "cutDone": "No water power. The jobs go dark. The port is still there.",
    "liveLine": "The line is live. Mark what fails if the river cannot turn the wheels.",
    "fillLine": "The mill line fills in as each part locks.",
    "links": [
      {
        "id": "river",
        "label": "River power",
        "mark": "🌊",
        "on": "r1"
      },
      {
        "id": "ships",
        "label": "The port",
        "mark": "⛵",
        "on": "r2"
      },
      {
        "id": "jobs",
        "label": "The jobs",
        "mark": "🧵",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The river cannot turn the wheels. What fails?",
    "hint": "Mark what goes dark. Then take the power away.",
    "switch": "Stop the wheels",
    "choices": [
      {
        "id": "a",
        "text": "The mill jobs",
        "marks": [
          "jobs"
        ]
      },
      {
        "id": "b",
        "text": "The port disappears",
        "marks": [
          "ships"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A pretty view can run a mill.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The workers' pay is set by the river",
        "marks": [
          "jobs"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the mill line. Which sentence matches the picture?",
    "image": "/student/mill_line.jpg",
    "choices": [
      {
        "id": "mill",
        "text": "A river turns a mill wheel, ships sit at a dock, then workers go into the mill."
      },
      {
        "id": "desert",
        "text": "The mill stands in a desert, with no river and no ships."
      },
      {
        "id": "walk",
        "text": "Cotton walks into the mill, and the wheel is gone."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the mill line. Which sentence matches the picture?"
  },
  "board": null
};
