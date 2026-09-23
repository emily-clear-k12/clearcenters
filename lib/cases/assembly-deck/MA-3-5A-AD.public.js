// Safe to import from client components.
// Assembly Deck — MA.3.5A-AD. TEKS 3.5A — one- and two-step addition and subtraction to 1,000.

export const PUBLIC_CASE = {
  "standard": "MA.3.5A-AD",
  "mode": "problem",
  "grade": 3,
  "subject": "Math",
  "title": "The Book Drive",
  "estimatedMinutes": 20,
  "brief": [
    "Two classrooms brought books. The goal is 500.",
    "Add the rooms first. Then find how many are still needed.",
    "A number can be in the story and still not belong in the work."
  ],
  "source": {
    "title": "DRIVE NOTES",
    "lines": [
      "Room 12 brought 248 books. Room 15 brought 175 books.",
      "The goal is 500 books.",
      "Room 12 has 22 students. The question does not ask about students.",
      "No one counted the pages in each book."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the word problem. Keep only the numbers the question needs.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What is happening?",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The two book counts",
          "accepts": 2
        },
        {
          "id": "question",
          "label": "The question",
          "hint": "What you still have to find",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Room 12 brought 248 books."
        },
        {
          "id": "r1p5",
          "text": "Room 12 has 22 students."
        },
        {
          "id": "r1p1",
          "text": "Two classrooms are collecting books for a drive."
        },
        {
          "id": "r1p6",
          "text": "How many pages are in each book?"
        },
        {
          "id": "r1p3",
          "text": "Room 15 brought 175 books."
        },
        {
          "id": "r1p4",
          "text": "How many more books do they need to reach 500?"
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
      "label": "The model",
      "goal": "Build the equations and say what the letter stands for.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The two equations, in order",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What n means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The bar that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "500 - b = n."
        },
        {
          "id": "r2p5",
          "text": "248 - 175 = b."
        },
        {
          "id": "r2p1",
          "text": "248 + 175 = b."
        },
        {
          "id": "r2p6",
          "text": "22 + 500 = n."
        },
        {
          "id": "r2p3",
          "text": "The letter n stands for the books still needed."
        },
        {
          "id": "r2p4",
          "text": "A bar for 500 books, mostly full, with a gap at the end."
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
      "label": "Solve and check",
      "goal": "Solve the two steps, label the answer, and check it.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "Add the rooms",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Subtract from the goal",
          "accepts": 1
        },
        {
          "id": "answer",
          "label": "The answer",
          "hint": "The answer, with the unit",
          "accepts": 1
        },
        {
          "id": "check",
          "label": "The check",
          "hint": "A check that tests the answer",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "500 - 423 = 77."
        },
        {
          "id": "r3p5",
          "text": "The answer is 423 books."
        },
        {
          "id": "r3p1",
          "text": "248 + 175 = 423 books so far."
        },
        {
          "id": "r3p6",
          "text": "Check: 77 is the answer, so it is checked."
        },
        {
          "id": "r3p3",
          "text": "They need 77 more books."
        },
        {
          "id": "r3p4",
          "text": "Check: 423 + 77 = 500."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one problem. What order should a reader hear them in?",
    "hint": "A reader needs the problem, then the model, before the solution.",
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
      "prompt": "One sentence says they need 77 more books. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How many more books do they need?",
      "choices": [
        {
          "id": "a",
          "text": "77 more books"
        },
        {
          "id": "b",
          "text": "423 books"
        },
        {
          "id": "c",
          "text": "22 students"
        },
        {
          "id": "d",
          "text": "The pages in each book"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many books do the two rooms have, and how many more do they need? Show the check.",
    "starters": [
      "The rooms have",
      "They need",
      "I checked"
    ],
    "checks": [
      "I added 248 and 175.",
      "I said they have 423 books so far.",
      "I said they need 77 more books.",
      "I checked with 423 + 77 = 500.",
      "I did not use the 22 students."
    ],
    "criteria": [
      "Add 248 and 175 to get 423.",
      "Subtract from 500 to get 77 more books.",
      "Check that 423 + 77 = 500."
    ]
  },
  "chain": {
    "title": "Book line",
    "sourceId": "rooms",
    "cutId": "sum",
    "cutDark": [
      "need"
    ],
    "stayOn": [
      "rooms"
    ],
    "cutting": "Taking the sum away…",
    "cutDone": "No sum. The books still needed go dark.",
    "liveLine": "The line is live. Mark what fails if you never add the rooms.",
    "fillLine": "The book line fills in as each part locks.",
    "links": [
      {
        "id": "rooms",
        "label": "The rooms",
        "mark": "📚",
        "on": "r1"
      },
      {
        "id": "sum",
        "label": "423 so far",
        "mark": "➕",
        "on": "r3"
      },
      {
        "id": "need",
        "label": "77 more",
        "mark": "🎯",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never add the two rooms. What fails?",
    "hint": "Mark what goes dark. Then take the sum away.",
    "switch": "Skip the sum",
    "choices": [
      {
        "id": "a",
        "text": "The 77 books still needed",
        "marks": [
          "need"
        ]
      },
      {
        "id": "b",
        "text": "The two rooms disappear",
        "marks": [
          "rooms"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 22 students answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 423",
        "marks": [
          "sum"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the book line. Which sentence matches the picture?",
    "image": "/student/book_line.jpg",
    "choices": [
      {
        "id": "gap",
        "text": "A long bar is almost full, with a small gap at the end."
      },
      {
        "id": "empty",
        "text": "The bar is empty from the start."
      },
      {
        "id": "students",
        "text": "The picture is 22 students in a line."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the book line. Which sentence matches the picture?"
  },
  "board": null
};
