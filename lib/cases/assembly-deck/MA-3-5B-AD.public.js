// Safe to import from client components.
// Assembly Deck — MA.3.5B-AD. TEKS 3.5B — one- and two-step multiplication and division within 100, with an array.

export const PUBLIC_CASE = {
  "standard": "MA.3.5B-AD",
  "mode": "problem",
  "grade": 3,
  "subject": "Math",
  "title": "Chairs for the Assembly",
  "estimatedMinutes": 20,
  "brief": [
    "The gym has full rows, plus one short row.",
    "Multiply the full rows. Then add the leftover chairs.",
    "56 is a step. It is not the whole answer."
  ],
  "source": {
    "title": "CHAIR NOTES",
    "lines": [
      "There are 7 full rows of 8 chairs.",
      "One leftover row has 5 chairs.",
      "3 teachers will stand. The question does not ask about teachers.",
      "The notes do not say how many students are absent."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the word problem about the chairs.",
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
          "hint": "The rows, and the leftover row",
          "accepts": 2
        },
        {
          "id": "question",
          "label": "The question",
          "hint": "The question",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "There are 7 full rows of 8 chairs."
        },
        {
          "id": "r1p5",
          "text": "3 teachers will stand in the front."
        },
        {
          "id": "r1p1",
          "text": "The gym has chairs set in rows for the assembly."
        },
        {
          "id": "r1p6",
          "text": "How many students are absent today?"
        },
        {
          "id": "r1p3",
          "text": "One leftover row has 5 chairs."
        },
        {
          "id": "r1p4",
          "text": "How many chairs are there in all?"
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
      "goal": "Build the equations for the rows and the leftover.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "Multiply, then add",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What c means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The picture that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "r + 5 = c."
        },
        {
          "id": "r2p5",
          "text": "7 + 8 + 5 = c."
        },
        {
          "id": "r2p1",
          "text": "7 × 8 = r."
        },
        {
          "id": "r2p6",
          "text": "8 rows of 7, with the 5 left out."
        },
        {
          "id": "r2p3",
          "text": "The letter c stands for all the chairs."
        },
        {
          "id": "r2p4",
          "text": "Seven rows of eight dots, plus a short row of five."
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
      "goal": "Find the total and check it.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "The full rows",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Add the short row",
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
          "hint": "A check",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "56 + 5 = 61."
        },
        {
          "id": "r3p5",
          "text": "The answer is 56 chairs."
        },
        {
          "id": "r3p1",
          "text": "7 × 8 = 56 chairs in the full rows."
        },
        {
          "id": "r3p6",
          "text": "There are 61."
        },
        {
          "id": "r3p3",
          "text": "There are 61 chairs."
        },
        {
          "id": "r3p4",
          "text": "Check: 61 - 5 = 56, and 56 is 7 × 8."
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
    "hint": "A reader needs the problem, then the model, before the total.",
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
      "prompt": "One sentence says there are 61 chairs. Tap it.",
      "hint": "Look in the solve part."
    },
    "quickCheck": {
      "prompt": "How many chairs are there?",
      "choices": [
        {
          "id": "a",
          "text": "61 chairs"
        },
        {
          "id": "b",
          "text": "56 chairs"
        },
        {
          "id": "c",
          "text": "3 teachers"
        },
        {
          "id": "d",
          "text": "7 + 8 + 5 chairs"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many chairs are in the full rows, and how many are there in all?",
    "starters": [
      "7 times 8",
      "Then I add",
      "There are"
    ],
    "checks": [
      "I multiplied 7 × 8.",
      "I said the full rows have 56 chairs.",
      "I added the 5 leftover chairs.",
      "I said there are 61 chairs.",
      "I did not stop at 56."
    ],
    "criteria": [
      "Show 7 × 8 = 56.",
      "Add 5 to get 61 chairs.",
      "Check the work, such as 61 - 5 = 56."
    ]
  },
  "chain": {
    "title": "Chair line",
    "sourceId": "rows",
    "cutId": "full",
    "cutDark": [
      "all"
    ],
    "stayOn": [
      "rows"
    ],
    "cutting": "Taking the full rows away…",
    "cutDone": "No full rows. The total goes dark.",
    "liveLine": "The line is live. Mark what fails if you never multiply the rows.",
    "fillLine": "The chair line fills in as each part locks.",
    "links": [
      {
        "id": "rows",
        "label": "The rows",
        "mark": "🪑",
        "on": "r1"
      },
      {
        "id": "full",
        "label": "56 chairs",
        "mark": "✖️",
        "on": "r3"
      },
      {
        "id": "all",
        "label": "61 chairs",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never multiply the full rows. What fails?",
    "hint": "Mark what goes dark. Then skip the 56.",
    "switch": "Skip the rows",
    "choices": [
      {
        "id": "a",
        "text": "The total of 61 chairs",
        "marks": [
          "all"
        ]
      },
      {
        "id": "b",
        "text": "The leftover row disappears",
        "marks": [
          "rows"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 7 + 8 + 5 is enough.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 56",
        "marks": [
          "full"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the chair line. Which sentence matches the picture?",
    "image": "/student/chair_line.jpg",
    "choices": [
      {
        "id": "rows",
        "text": "Seven rows of eight dots, then a short row of five."
      },
      {
        "id": "add",
        "text": "The dots are in one long line of 7 + 8 + 5."
      },
      {
        "id": "none",
        "text": "There is no short row."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the chair line. Which sentence matches the picture?"
  },
  "board": null
};
