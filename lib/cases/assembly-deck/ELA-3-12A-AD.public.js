// Safe to import from client components.
// Assembly Deck — ELA.3.12A-AD. TEKS 3.12A — personal narrative.

export const PUBLIC_CASE = {
  "standard": "ELA.3.12A-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "ELAR",
  "title": "The Day the Bus Was Late",
  "estimatedMinutes": 20,
  "brief": [
    "The bus did not come. Write the true story of that morning.",
    "A story tells what happened, in order, and what changed.",
    "A wish or a different day does not belong."
  ],
  "source": {
    "title": "MY NOTES",
    "lines": [
      "We waited at the stop. The bus never came.",
      "Ms. Alvarez walked with us.",
      "We got to school late. The office marked us late.",
      "I was scared at the stop. I was calm by the time we walked in.",
      "Nobody was in trouble."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What happened",
      "goal": "Build the paragraph that tells the start of the story.",
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
          "hint": "Where you were, and what did not come",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "How the morning changed",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Our class waited at the stop."
        },
        {
          "id": "r1p5",
          "text": "Yellow buses are the worst buses."
        },
        {
          "id": "r1p1",
          "text": "The bus did not come that morning."
        },
        {
          "id": "r1p6",
          "text": "My dog Pepper also hates mornings."
        },
        {
          "id": "r1p3",
          "text": "We waited, and no bus turned the corner."
        },
        {
          "id": "r1p4",
          "text": "That was the moment the normal day broke."
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
      "label": "What we did",
      "goal": "Build the paragraph that tells the middle of the story.",
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
          "hint": "Who walked with you, and where you went",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "How it ended at school",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Ms. Alvarez walked with us."
        },
        {
          "id": "r2p5",
          "text": "We ran the whole way with no grown-up."
        },
        {
          "id": "r2p1",
          "text": "We did not stay at the stop."
        },
        {
          "id": "r2p6",
          "text": "The bus came after all and we rode it."
        },
        {
          "id": "r2p3",
          "text": "We got to school late."
        },
        {
          "id": "r2p4",
          "text": "The office marked us late, and nobody was in trouble."
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
      "label": "What changed",
      "goal": "Build the paragraph that tells how the narrator changed.",
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
          "hint": "The feeling at the stop, and the feeling at the door",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the story is really about",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "I was scared while we waited."
        },
        {
          "id": "r3p5",
          "text": "I am always brave, so nothing changed."
        },
        {
          "id": "r3p1",
          "text": "The morning changed me, not just the clock."
        },
        {
          "id": "r3p6",
          "text": "The best part was my new shoes."
        },
        {
          "id": "r3p3",
          "text": "I was calm when we walked in."
        },
        {
          "id": "r3p4",
          "text": "A true story needs the change, not just the lateness."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "opinion",
        "unsupported"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one story. What order should a reader hear them in?",
    "hint": "A reader needs what happened, then what you did, before the change makes sense.",
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
      "prompt": "One sentence says the feeling changed from scared to calm. Tap the sentence about being calm.",
      "hint": "Look in the part about what changed."
    },
    "quickCheck": {
      "prompt": "What belongs in this personal narrative?",
      "choices": [
        {
          "id": "a",
          "text": "What happened, in order, and how the feeling changed"
        },
        {
          "id": "b",
          "text": "A ranking of bus colors"
        },
        {
          "id": "c",
          "text": "A story about a dog"
        },
        {
          "id": "d",
          "text": "A claim that nothing changed"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Ms. Alvarez asks one more thing. What happened that morning, and how did your feeling change?",
    "starters": [
      "The bus",
      "We waited",
      "Ms. Alvarez",
      "I felt"
    ],
    "checks": [
      "I told what happened.",
      "I kept the events in order.",
      "I said how I felt at the stop.",
      "I said how I felt at the end.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Tell that the bus did not come.",
      "Tell that the class walked with Ms. Alvarez and arrived late.",
      "Tell that the feeling changed from scared to calm."
    ]
  },
  "chain": {
    "title": "Story line",
    "sourceId": "wait",
    "cutId": "wait",
    "cutDark": [
      "walk",
      "door"
    ],
    "stayOn": [],
    "cutting": "Taking the late bus out of the story…",
    "cutDone": "No late bus. The walk and the change go dark.",
    "liveLine": "The line is live. Mark what fails if the bus was never late.",
    "fillLine": "The story line fills in as each part locks.",
    "links": [
      {
        "id": "wait",
        "label": "No bus",
        "mark": "🚏",
        "on": "r1"
      },
      {
        "id": "walk",
        "label": "The walk",
        "mark": "🚶",
        "on": "r2"
      },
      {
        "id": "door",
        "label": "The change",
        "mark": "🏫",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take away the late bus. What fails?",
    "hint": "Mark what goes dark. Then take the problem away.",
    "switch": "Take the problem away",
    "choices": [
      {
        "id": "a",
        "text": "The walk and the change",
        "marks": [
          "walk",
          "door"
        ]
      },
      {
        "id": "b",
        "text": "Nothing. The story is the same with no problem.",
        "nobody": true
      },
      {
        "id": "c",
        "text": "Only the new shoes",
        "marks": [
          "door"
        ]
      },
      {
        "id": "d",
        "text": "The walk gets longer",
        "marks": [
          "walk"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the story line. Which sentence matches the picture?",
    "image": "/student/bus_line.jpg",
    "choices": [
      {
        "id": "true",
        "text": "Kids wait with no bus, walk with a teacher, and reach school."
      },
      {
        "id": "dog",
        "text": "A dog waits at the stop, and the bus comes right away."
      },
      {
        "id": "run",
        "text": "The kids run alone, and nobody walks with them."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the story line. Which sentence matches the picture?"
  },
  "board": null
};
