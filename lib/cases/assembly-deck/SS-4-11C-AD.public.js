// Safe to import from client components.
// Assembly Deck — SS.4.11C-AD. TEKS 4.11C — effects of exploration, immigration, migration, and limited resources on Texas economic growth.

export const PUBLIC_CASE = {
  "standard": "SS.4.11C-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Social Studies",
  "title": "What Built This Town",
  "estimatedMinutes": 20,
  "brief": [
    "Houston began in 1836 on Buffalo Bayou. Explain what built it. Do not write a cheer.",
    "The pieces are the water route, the people who moved there, and the trade that followed.",
    "A fact about Fort Worth or about oil in 1901 does not explain the start."
  ],
  "source": {
    "title": "TOWN NOTES",
    "lines": [
      "In 1836 the Allen brothers chose a spot on Buffalo Bayou because boats could reach the Gulf.",
      "People migrated from other states for land and work.",
      "Immigrants came from other countries too.",
      "Docks and warehouses grew beside the bayou, and trade followed.",
      "A 1900 storm showed the limit of relying only on an island port. More shipping moved inland.",
      "Oil at Spindletop was found near Beaumont in 1901. Houston was already a town long before that."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The geography",
      "goal": "Build the paragraph about why the site worked.",
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
          "hint": "Who chose it, and what boats could do",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The geographic reason",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "In 1836 the Allen brothers picked a spot on Buffalo Bayou."
        },
        {
          "id": "r1p5",
          "text": "Houston was founded in the desert, far from any water."
        },
        {
          "id": "r1p1",
          "text": "Houston started where a bayou could reach the Gulf."
        },
        {
          "id": "r1p6",
          "text": "The brothers picked it because it was already the biggest city."
        },
        {
          "id": "r1p3",
          "text": "Boats could travel between that spot and the coast."
        },
        {
          "id": "r1p4",
          "text": "The water route was the geographic reason for the town."
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
      "id": "r2",
      "label": "The people who came",
      "goal": "Build the paragraph about migration and immigration.",
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
          "hint": "Who came from other states, and who came from other countries",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "How that is different from just finding the site",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Migrants came from other states looking for work and land."
        },
        {
          "id": "r2p5",
          "text": "No one lived there until oil was found in 1901."
        },
        {
          "id": "r2p1",
          "text": "People moving in made the town able to grow."
        },
        {
          "id": "r2p6",
          "text": "Only people born in Houston were allowed to stay."
        },
        {
          "id": "r2p3",
          "text": "Immigrants came from other countries as well."
        },
        {
          "id": "r2p4",
          "text": "Finding the site was only the start. People had to come."
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
      "label": "The trade that followed",
      "goal": "Build the paragraph about the industry that grew there.",
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
          "hint": "What was built beside the water, and what the 1900 storm changed",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Where this growth did not come from",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Docks and warehouses grew up beside the bayou."
        },
        {
          "id": "r3p5",
          "text": "This boom was caused by the cattle trails in Fort Worth."
        },
        {
          "id": "r3p1",
          "text": "Trade followed the water and the people."
        },
        {
          "id": "r3p6",
          "text": "Houston was always destined to be the greatest city."
        },
        {
          "id": "r3p3",
          "text": "A 1900 storm showed the limit of a port built only on an island."
        },
        {
          "id": "r3p4",
          "text": "More shipping moved inland, and the town's trade grew."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "offtopic",
        "opinion",
        "contradicts",
        "unsupported"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs the bayou, then the people, before the trade makes sense.",
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
      "prompt": "One sentence says the Allen brothers picked a spot on Buffalo Bayou in 1836. Tap it.",
      "hint": "Look in the part about the geography."
    },
    "quickCheck": {
      "prompt": "Which set of factors built this town?",
      "choices": [
        {
          "id": "a",
          "text": "A bayou route, people moving in, and trade"
        },
        {
          "id": "b",
          "text": "A desert site and no newcomers"
        },
        {
          "id": "c",
          "text": "Nothing until oil in 1901"
        },
        {
          "id": "d",
          "text": "The cattle trails in Fort Worth"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What geographic fact, what people, and what trade helped Houston grow?",
    "starters": [
      "In 1836",
      "Buffalo Bayou",
      "People came",
      "Trade grew"
    ],
    "checks": [
      "I said Houston began on Buffalo Bayou or in 1836.",
      "I said boats could reach the Gulf.",
      "I said migrants or immigrants came.",
      "I said docks, warehouses, or trade followed.",
      "I did not say the town was empty until oil, or that Fort Worth's trails explain it."
    ],
    "criteria": [
      "Say the Allen brothers chose Buffalo Bayou in 1836 because boats could reach the Gulf.",
      "Say people migrated from other states or immigrated from other countries.",
      "Say trade, docks, or the move inland after the 1900 storm."
    ]
  },
  "chain": {
    "title": "Town line",
    "sourceId": "bayou",
    "cutId": "people",
    "cutDark": [
      "trade"
    ],
    "stayOn": [
      "bayou"
    ],
    "cutting": "Taking the newcomers out of the town…",
    "cutDone": "No one arrives. The docks and the trade go dark.",
    "liveLine": "The line is live. Mark what fails if no one moves there.",
    "fillLine": "The town line fills in as each part locks.",
    "links": [
      {
        "id": "bayou",
        "label": "The bayou",
        "mark": "🚤",
        "on": "r1"
      },
      {
        "id": "people",
        "label": "Newcomers",
        "mark": "🧳",
        "on": "r2"
      },
      {
        "id": "trade",
        "label": "The trade",
        "mark": "📦",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. No one moves to the bayou. What fails?",
    "hint": "Mark what goes dark. Then stop the newcomers.",
    "switch": "Stop the newcomers",
    "choices": [
      {
        "id": "a",
        "text": "The docks and the trade",
        "marks": [
          "trade"
        ]
      },
      {
        "id": "b",
        "text": "The bayou disappears",
        "marks": [
          "bayou"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A site grows by itself.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Oil appears in 1836",
        "marks": [
          "trade"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the town line. Which sentence matches the picture?",
    "image": "/student/bayou_line.jpg",
    "choices": [
      {
        "id": "grow",
        "text": "A boat on a bayou, families arriving, then docks and warehouses."
      },
      {
        "id": "desert",
        "text": "A desert town with no water and no people."
      },
      {
        "id": "cattle",
        "text": "A cattle trail with no bayou and no docks."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the town line. Which sentence matches the picture?"
  },
  "board": null
};
