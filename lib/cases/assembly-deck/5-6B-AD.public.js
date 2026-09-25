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
    "Someone spilled a jar of iron filings into a tray of sand, and now the two are mixed on the sorting table.",
    "A magnet pulled the iron out, while the sand stayed behind. Neither part became something new.",
    "Build the log from what the test showed. A favorite tool is not evidence."
  ],
  "source": {
    "title": "SORTING NOTES",
    "lines": [
      "The jar held iron filings mixed with sand. The dark filings were spread all through the pale sand.",
      "A magnet pulled the iron filings out. The sand did not stick, so it stayed behind on the table.",
      "After the sort, the iron was still magnetic.",
      "The sand was still gritty, and it still did not stick to the magnet.",
      "Mixing did not make a new substance. Each part kept its own properties."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What was in the jar",
      "goal": "Build the paragraph that describes what the mixture was made of.",
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
          "text": "Before anyone sorted the jar, the dark filings were spread all through the pale sand."
        },
        {
          "id": "r1p5",
          "text": "The magnet is clearly the most impressive tool on the table, because it looks so powerful."
        },
        {
          "id": "r1p1",
          "text": "The jar on the sorting table held a mixture of two substances: iron filings and sand."
        },
        {
          "id": "r1p6",
          "text": "When sugar is stirred into water, it dissolves until you can no longer see it."
        },
        {
          "id": "r1p3",
          "text": "Although the two had been stirred together, the iron was still iron and the sand was still sand."
        },
        {
          "id": "r1p4",
          "text": "As a result, mixing them did not create a new substance."
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
      "goal": "Build the paragraph that explains how the magnet sorted the jar.",
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
          "text": "When the crew passed a magnet over the jar, it attracted the iron filings and pulled them out."
        },
        {
          "id": "r2p5",
          "text": "When the crew passed a magnet over the jar, the sand clung to it while the iron stayed behind."
        },
        {
          "id": "r2p1",
          "text": "The crew separated the mixture without changing either of the substances inside it."
        },
        {
          "id": "r2p6",
          "text": "If the crew had stirred much harder, the iron and sand would have fused into a new metal."
        },
        {
          "id": "r2p3",
          "text": "The sand did not stick to the magnet, so it remained on the table in its own pile."
        },
        {
          "id": "r2p4",
          "text": "Because each substance kept its own properties, a magnet was enough to separate them."
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
      "goal": "Build the paragraph that explains what the sort proves about the parts.",
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
          "text": "After the iron was pulled out of the jar, it was still magnetic."
        },
        {
          "id": "r3p5",
          "text": "Because it had touched the sand for so long, the iron lost its magnetism during the sort."
        },
        {
          "id": "r3p1",
          "text": "The sort provides evidence about the two original parts, not about a new material."
        },
        {
          "id": "r3p6",
          "text": "Scientists must always use heat to separate a mixture into its parts."
        },
        {
          "id": "r3p3",
          "text": "The sand was still gritty to the touch, and it still did not stick to the magnet."
        },
        {
          "id": "r3p4",
          "text": "Therefore, this mixture kept the properties of the substances that formed it."
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
    "hint": "A reader needs to know what was mixed and how it was sorted before the proof makes sense.",
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
