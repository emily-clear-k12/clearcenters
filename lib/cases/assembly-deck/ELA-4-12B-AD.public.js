// Safe to import from client components.
// Assembly Deck — ELA.4.12B-AD. TEKS 4.12B — informational writing with a clear central idea.

export const PUBLIC_CASE = {
  "standard": "ELA.4.12B-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "ELAR",
  "title": "How the Cafeteria Line Works",
  "estimatedMinutes": 20,
  "brief": [
    "Write how the cafeteria line works. A reader who has never seen it should understand.",
    "Informational writing gives the order and the central idea.",
    "A complaint is not information."
  ],
  "source": {
    "title": "LINE NOTES",
    "lines": [
      "Students enter and pick up a tray. Then they move to the right.",
      "Hot food is first. Fruit is second. Milk is last.",
      "Kids who stop to talk make the whole line slow.",
      "When kids keep moving, everyone sits before the bell."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "How it starts",
      "goal": "Build the paragraph that explains the start of the line.",
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
          "hint": "The tray, and which way they move",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What has to stay the same",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Students enter and pick up a tray."
        },
        {
          "id": "r1p5",
          "text": "Cutting in front of friends makes the line better."
        },
        {
          "id": "r1p1",
          "text": "The cafeteria line starts the same way every day."
        },
        {
          "id": "r1p6",
          "text": "The cafeteria line is really a moon launch."
        },
        {
          "id": "r1p3",
          "text": "Then they move to the right."
        },
        {
          "id": "r1p4",
          "text": "That start is part of the central idea, not a suggestion."
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
      "label": "The food order",
      "goal": "Build the paragraph that gives the food order.",
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
          "hint": "What is first, and what comes after",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The central idea",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Hot food is first."
        },
        {
          "id": "r2p5",
          "text": "Milk is first, and hot food is last."
        },
        {
          "id": "r2p1",
          "text": "The food itself follows one order."
        },
        {
          "id": "r2p6",
          "text": "Kids may stop to talk as long as they want."
        },
        {
          "id": "r2p3",
          "text": "Fruit is second, and milk is last."
        },
        {
          "id": "r2p4",
          "text": "That order is the central idea a new student needs."
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
      "label": "Why it finishes",
      "goal": "Build the paragraph that explains how the line finishes on time.",
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
          "hint": "What slows the line, and what gets everyone seated",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Where the speed comes from",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "A stop to talk slows the whole line."
        },
        {
          "id": "r3p5",
          "text": "Running is the only way to beat the bell."
        },
        {
          "id": "r3p1",
          "text": "The line finishes on time only when people keep moving."
        },
        {
          "id": "r3p6",
          "text": "I hate the pizza, so the line should close."
        },
        {
          "id": "r3p3",
          "text": "When kids keep moving, everyone sits before the bell."
        },
        {
          "id": "r3p4",
          "text": "The speed comes from the order, not from one person rushing."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "opinion",
        "contradicts",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a new student read them in?",
    "hint": "A reader needs the start, then the food order, before the timing makes sense.",
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
      "prompt": "One sentence says hot food is first. Tap it.",
      "hint": "Look in the part about the food order."
    },
    "quickCheck": {
      "prompt": "What is the central idea of this line?",
      "choices": [
        {
          "id": "a",
          "text": "Hot food, then fruit, then milk, and kids keep moving"
        },
        {
          "id": "b",
          "text": "Milk first, and talking as long as you want"
        },
        {
          "id": "c",
          "text": "Cut in front of friends"
        },
        {
          "id": "d",
          "text": "Close the line because of the pizza"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Explain how the cafeteria line works, and what makes it finish before the bell.",
    "starters": [
      "Students",
      "Hot food",
      "A stop to talk",
      "Everyone sits"
    ],
    "checks": [
      "I explained the order.",
      "I said what is first and last.",
      "I said what slows the line.",
      "I did not turn it into a complaint.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Give the order: tray, hot food, fruit, milk.",
      "Say that stopping to talk slows the line.",
      "Say that keeping the order gets everyone seated before the bell."
    ]
  },
  "chain": {
    "title": "Line",
    "sourceId": "enter",
    "cutId": "move",
    "cutDark": [
      "seat"
    ],
    "stayOn": [
      "enter"
    ],
    "cutting": "Stopping the line…",
    "cutDone": "The moving stops. Sitting down before the bell goes dark.",
    "liveLine": "The line is live. Mark what fails if kids stop moving.",
    "fillLine": "The cafeteria line fills in as each part locks.",
    "links": [
      {
        "id": "enter",
        "label": "Enter",
        "mark": "🚪",
        "on": "r1"
      },
      {
        "id": "move",
        "label": "Keep moving",
        "mark": "🍽️",
        "on": "r2"
      },
      {
        "id": "seat",
        "label": "Sit in time",
        "mark": "🔔",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Kids stop moving. What fails?",
    "hint": "Mark what goes dark. Then stop the line.",
    "switch": "Stop the line",
    "choices": [
      {
        "id": "a",
        "text": "Sitting down before the bell",
        "marks": [
          "seat"
        ]
      },
      {
        "id": "b",
        "text": "The doorway disappears",
        "marks": [
          "enter"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Talking makes the line faster.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "They sit down sooner",
        "marks": [
          "seat"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the cafeteria line. Which sentence matches the picture?",
    "image": "/student/cafe_line.jpg",
    "choices": [
      {
        "id": "order",
        "text": "Kids enter in a line, carry trays, and then sit down to eat."
      },
      {
        "id": "cut",
        "text": "Kids cut the line, and nobody gets a tray."
      },
      {
        "id": "moon",
        "text": "The line is a moon launch, and there is no food."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the cafeteria line. Which sentence matches the picture?"
  },
  "board": null
};
