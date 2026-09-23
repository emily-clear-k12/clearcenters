// Safe to import from client components.
// Assembly Deck — 5.6B-AD. TEKS 5.6B — mixtures keep the properties of their parts.

export const PUBLIC_CASE = {
  "standard": "5.6B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Sorting Table",
  "estimatedMinutes": 20,
  "brief": [
    "A jar of iron filings and sand got mixed on the sorting table.",
    "A magnet pulled the iron out. The sand stayed sand. Neither part became something new.",
    "Build the log from the test. A favorite tool is not evidence."
  ],
  "source": {
    "title": "SORTING NOTES",
    "lines": [
      "The jar held iron filings mixed with sand.",
      "A magnet pulled the iron filings out. The sand did not stick.",
      "After the sort, the iron was still magnetic.",
      "The sand was still gritty, and it still did not stick to the magnet.",
      "Mixing did not make a new substance. Each part kept its own properties."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What was in the jar",
      "goal": "Build the paragraph that says what the mixture was.",
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
          "hint": "The two parts, and that both were still themselves",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What mixing did not do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Both parts were still in the jar before anyone sorted it."
        },
        {
          "id": "r1p5",
          "text": "The magnet is the best tool because it looks powerful."
        },
        {
          "id": "r1p1",
          "text": "The jar held a mixture of iron filings and sand."
        },
        {
          "id": "r1p6",
          "text": "The sugar dissolved, so that matter disappeared."
        },
        {
          "id": "r1p3",
          "text": "The iron was still iron, and the sand was still sand."
        },
        {
          "id": "r1p4",
          "text": "Mixing them did not make a new substance."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "offtopic",
        "contradicts",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "How the parts were separated",
      "goal": "Build the paragraph that says how the magnet sorted the jar.",
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
          "hint": "What the magnet pulled, and what stayed",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What you could do because the parts kept their properties",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The magnet pulled out the iron filings."
        },
        {
          "id": "r2p5",
          "text": "The sand stuck to the magnet, and the iron stayed down."
        },
        {
          "id": "r2p1",
          "text": "The crew separated the mixture without changing the parts."
        },
        {
          "id": "r2p6",
          "text": "Stirring harder turned the mixture into a new metal."
        },
        {
          "id": "r2p3",
          "text": "The sand did not stick, so it stayed on the table."
        },
        {
          "id": "r2p4",
          "text": "The parts could be separated because each one kept its own properties."
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
      "label": "What the sort proves",
      "goal": "Build the paragraph that says the parts kept their properties.",
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
          "hint": "The iron after, and the sand after",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What this mixture shows",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The iron was still magnetic after it was pulled out."
        },
        {
          "id": "r3p5",
          "text": "The iron lost its magnetism because it touched sand."
        },
        {
          "id": "r3p1",
          "text": "The sort is evidence about the parts, not about a new material."
        },
        {
          "id": "r3p6",
          "text": "A mixture always has to be separated with heat."
        },
        {
          "id": "r3p3",
          "text": "The sand was still gritty, and it still did not stick to the magnet."
        },
        {
          "id": "r3p4",
          "text": "This mixture kept the properties of the substances in it."
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
    "prompt": "Three paragraphs, one log. What order should the crew read them in?",
    "hint": "A reader needs the mixture, then the sort, before the proof makes sense.",
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
      "prompt": "One sentence says this mixture kept the properties of the substances in it. Tap that sentence.",
      "hint": "Look in the paragraph about what the sort proves."
    },
    "quickCheck": {
      "prompt": "What did this mixture of iron and sand show?",
      "choices": [
        {
          "id": "a",
          "text": "The parts kept their properties and could be separated"
        },
        {
          "id": "b",
          "text": "Mixing made a new metal"
        },
        {
          "id": "c",
          "text": "The sand stuck to the magnet"
        },
        {
          "id": "d",
          "text": "The sugar disappeared, so matter was gone"
        }
      ]
    }
  },
  "explain": {
    "prompt": "The chief has one more question. How was the mixture separated, and what does that show about the iron and the sand?",
    "starters": [
      "The magnet",
      "The iron",
      "The sand",
      "This shows"
    ],
    "checks": [
      "I answered both parts of the question.",
      "I said what the magnet pulled out.",
      "I said the sand did not stick.",
      "I said the parts kept their properties.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say a magnet pulled the iron out of the sand.",
      "Say the sand did not stick to the magnet.",
      "Say each part kept its properties, or no new substance formed."
    ]
  },
  "chain": {
    "title": "Sorting line",
    "sourceId": "jar",
    "cutId": "magnet",
    "cutDark": [
      "iron",
      "sand"
    ],
    "stayOn": [
      "jar"
    ],
    "cutting": "Taking the magnet off the line…",
    "cutDone": "Magnet gone. The separated iron and the sand pile go dark.",
    "liveLine": "The line is live. Mark what fails if the magnet is gone.",
    "fillLine": "The sorting line fills in as each paragraph locks.",
    "links": [
      {
        "id": "jar",
        "label": "Mixture",
        "mark": "🫙",
        "on": "r1"
      },
      {
        "id": "magnet",
        "label": "Magnet",
        "mark": "🧲",
        "on": "r1"
      },
      {
        "id": "iron",
        "label": "Iron out",
        "mark": "⚫",
        "on": "r2"
      },
      {
        "id": "sand",
        "label": "Sand left",
        "mark": "🏖️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the magnet away. What fails?",
    "hint": "Mark the part you think goes dark. Then take the magnet away.",
    "switch": "Take the magnet away",
    "choices": [
      {
        "id": "a",
        "text": "The separated iron and the sand pile",
        "marks": [
          "iron",
          "sand"
        ]
      },
      {
        "id": "b",
        "text": "The jar of mixture disappears",
        "marks": [
          "jar"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The mixture sorts itself.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The iron turns into sand",
        "marks": [
          "iron"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the sorting line. Which sentence matches the picture?",
    "image": "/student/sorting_line.jpg",
    "choices": [
      {
        "id": "sort",
        "text": "A magnet pulls the iron out of the sand, and the sand is still sand."
      },
      {
        "id": "new",
        "text": "The jar has become one new metal, so nothing can be pulled out."
      },
      {
        "id": "stick",
        "text": "The sand sticks to the magnet, and the iron stays in the pile."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the sorting line. Which sentence matches the picture?"
  },
  "board": null
};
