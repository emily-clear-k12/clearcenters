// Safe to import from client components.
// Assembly Deck — ELA.3.12C-AD. TEKS 3.12C — opinion writing.

export const PUBLIC_CASE = {
  "standard": "ELA.3.12C-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "ELAR",
  "title": "Keep the Library Open at Lunch",
  "estimatedMinutes": 20,
  "brief": [
    "The library is locked at lunch. Write an opinion that asks to keep it open.",
    "An opinion needs a clear ask and reasons from the notes.",
    "A loud feeling is not a reason."
  ],
  "source": {
    "title": "LUNCH NOTES",
    "lines": [
      "The library door is locked during lunch.",
      "Eighteen kids sat in the hall with books and no table.",
      "The librarian will keep it open if two teachers take turns.",
      "The rule would be quiet reading only.",
      "One worry: it might be too loud. Quiet reading is the answer to that worry."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The opinion",
      "goal": "Build the paragraph that states the opinion.",
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
          "hint": "What is locked, and who is stuck",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The ask",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The door is locked while kids are eating."
        },
        {
          "id": "r1p5",
          "text": "Libraries are boring, so close it more."
        },
        {
          "id": "r1p1",
          "text": "The library should stay open at lunch."
        },
        {
          "id": "r1p6",
          "text": "My sandwich was soggy that day."
        },
        {
          "id": "r1p3",
          "text": "Kids with books end up on the hall floor."
        },
        {
          "id": "r1p4",
          "text": "The ask is simple. Open the door."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "opinion",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "The reasons",
      "goal": "Build the paragraph that gives reasons from the notes.",
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
          "hint": "How many kids, and what the librarian offered",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the reasons are enough",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Eighteen kids sat in the hall with books."
        },
        {
          "id": "r2p5",
          "text": "Everyone in the world wants this."
        },
        {
          "id": "r2p1",
          "text": "The notes give reasons, not just a wish."
        },
        {
          "id": "r2p6",
          "text": "The hall floor is a fine place to read."
        },
        {
          "id": "r2p3",
          "text": "The librarian will open the room if two teachers take turns."
        },
        {
          "id": "r2p4",
          "text": "Those facts can hold the opinion up."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "contradicts",
        "opinion",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "The worry",
      "goal": "Build the paragraph that answers the one real worry.",
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
          "hint": "The worry, and the rule that answers it",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the answer belongs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Some people think the room will be too loud."
        },
        {
          "id": "r3p5",
          "text": "Ignore them. Loud is more fun."
        },
        {
          "id": "r3p1",
          "text": "One worry is fair, and it has an answer."
        },
        {
          "id": "r3p6",
          "text": "Open the gym too, and the art room."
        },
        {
          "id": "r3p3",
          "text": "The rule would be quiet reading only."
        },
        {
          "id": "r3p4",
          "text": "An opinion is stronger when it answers the worry."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "offtopic",
        "contradicts",
        "unsupported"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one opinion. What order should a reader hear them in?",
    "hint": "A reader needs the ask, then the reasons, before the worry makes sense.",
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
      "prompt": "One sentence gives the rule that answers the noise worry. Tap it.",
      "hint": "Look in the part about the worry."
    },
    "quickCheck": {
      "prompt": "Which sentence is a real reason from the notes?",
      "choices": [
        {
          "id": "a",
          "text": "Eighteen kids had books and no table"
        },
        {
          "id": "b",
          "text": "Libraries are boring"
        },
        {
          "id": "c",
          "text": "Everyone in the world wants this"
        },
        {
          "id": "d",
          "text": "The sandwich was soggy"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What is your opinion, and what reason from the notes supports it?",
    "starters": [
      "I think",
      "The library",
      "Eighteen kids",
      "The quiet rule"
    ],
    "checks": [
      "I stated my opinion.",
      "I used a reason from the notes.",
      "I said something about the kids or the door.",
      "I did not use only a feeling.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "State that the library should stay open at lunch.",
      "Give a reason from the notes, such as the eighteen kids or the teachers taking turns.",
      "Mention the quiet-reading rule or the noise worry."
    ]
  },
  "chain": {
    "title": "Opinion line",
    "sourceId": "door",
    "cutId": "kids",
    "cutDark": [
      "rule",
      "ask"
    ],
    "stayOn": [
      "door"
    ],
    "cutting": "Taking the kids out of the line…",
    "cutDone": "No kids in the hall. The reason and the ask go dark.",
    "liveLine": "The line is live. Mark what fails if the kids are not there.",
    "fillLine": "The opinion line fills in as each part locks.",
    "links": [
      {
        "id": "door",
        "label": "Locked door",
        "mark": "🚪",
        "on": "r1"
      },
      {
        "id": "kids",
        "label": "Kids waiting",
        "mark": "📚",
        "on": "r1"
      },
      {
        "id": "rule",
        "label": "Quiet rule",
        "mark": "🤫",
        "on": "r2"
      },
      {
        "id": "ask",
        "label": "The ask",
        "mark": "✉️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take away the kids in the hall. What fails?",
    "hint": "Mark what goes dark. Then take the kids away.",
    "switch": "Take the kids away",
    "choices": [
      {
        "id": "a",
        "text": "The reason and the ask",
        "marks": [
          "rule",
          "ask"
        ]
      },
      {
        "id": "b",
        "text": "The locked door disappears",
        "marks": [
          "door"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A wish is enough.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The ask gets louder",
        "marks": [
          "ask"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the opinion line. Which sentence matches the picture?",
    "image": "/student/library_line.jpg",
    "choices": [
      {
        "id": "hall",
        "text": "The door is closed, kids wait with books, then they read inside."
      },
      {
        "id": "gym",
        "text": "The picture is a gym, and nobody has a book."
      },
      {
        "id": "fine",
        "text": "Kids are happy reading on the floor, and the door stays shut."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the opinion line. Which sentence matches the picture?"
  },
  "board": null
};
