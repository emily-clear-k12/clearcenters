// Safe to import from client components.
// Assembly Deck — MA.4.5A-AD. TEKS 4.5A — multi-step problems with a letter for the unknown.

export const PUBLIC_CASE = {
  "standard": "MA.4.5A-AD",
  "mode": "problem",
  "grade": 4,
  "subject": "Math",
  "title": "The Field Trip Buses",
  "estimatedMinutes": 20,
  "brief": [
    "Three buses are full. Some students still need a seat.",
    "The letter s stands for all the students, the number you do not know yet.",
    "A ticket price can be true and still not belong in this question."
  ],
  "source": {
    "title": "BUS NOTES",
    "lines": [
      "3 buses are full. Each full bus has 36 seats.",
      "14 more students still need a seat.",
      "A ticket costs $8. This question does not ask for the cost.",
      "The notes do not say how many buses the museum owns."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the word problem. Leave out the number the question does not need.",
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
          "hint": "The full buses, and the students still waiting",
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
          "text": "3 buses are full, with 36 seats on each bus."
        },
        {
          "id": "r1p5",
          "text": "Each ticket costs $8."
        },
        {
          "id": "r1p1",
          "text": "Students are riding full buses to a field trip, and a few still need seats."
        },
        {
          "id": "r1p6",
          "text": "How many buses does the museum own?"
        },
        {
          "id": "r1p3",
          "text": "14 more students still need a seat."
        },
        {
          "id": "r1p4",
          "text": "How many students are going on the trip?"
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
      "goal": "Write one equation with a letter, and match the strip.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "The equation in two lines if you need them",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What s means",
          "accepts": 1
        },
        {
          "id": "diagram",
          "label": "The matching picture",
          "hint": "The strip that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "s = f + 14."
        },
        {
          "id": "r2p5",
          "text": "s = 3 + 36 + 14."
        },
        {
          "id": "r2p1",
          "text": "3 × 36 = f."
        },
        {
          "id": "r2p6",
          "text": "Three strips of 14, plus a strip of 36."
        },
        {
          "id": "r2p3",
          "text": "The letter s stands for all the students."
        },
        {
          "id": "r2p4",
          "text": "Three equal strips of 36, plus a shorter strip of 14."
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
      "goal": "Find the students on full buses, then all the students, and check.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "The full buses",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Add the rest",
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
          "text": "108 + 14 = 122."
        },
        {
          "id": "r3p5",
          "text": "The answer is 108 students."
        },
        {
          "id": "r3p1",
          "text": "3 × 36 = 108 students on full buses."
        },
        {
          "id": "r3p6",
          "text": "Check: 122 is the answer, so the work is done."
        },
        {
          "id": "r3p3",
          "text": "122 students are going."
        },
        {
          "id": "r3p4",
          "text": "Check: 122 - 14 = 108, and 108 is 3 × 36."
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
    "hint": "A reader needs the problem, then the letter, before the solution.",
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
      "prompt": "One sentence says the letter s stands for all the students. Tap it.",
      "hint": "Look in the model part."
    },
    "quickCheck": {
      "prompt": "How many students are going?",
      "choices": [
        {
          "id": "a",
          "text": "122 students"
        },
        {
          "id": "b",
          "text": "108 students"
        },
        {
          "id": "c",
          "text": "$8"
        },
        {
          "id": "d",
          "text": "3 + 36 + 14 students"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What does the letter stand for, and how many students are going? Show both steps.",
    "starters": [
      "The letter s",
      "3 times 36",
      "Then I add",
      "I checked"
    ],
    "checks": [
      "I said s stands for all the students.",
      "I showed 3 × 36 = 108.",
      "I added 14.",
      "I said 122 students are going.",
      "I did not use the $8 ticket."
    ],
    "criteria": [
      "Use a letter for the unknown number of students.",
      "Show 3 × 36 = 108, then 108 + 14 = 122 students.",
      "Check the result."
    ]
  },
  "chain": {
    "title": "Bus line",
    "sourceId": "buses",
    "cutId": "full",
    "cutDark": [
      "all"
    ],
    "stayOn": [
      "buses"
    ],
    "cutting": "Taking the full buses away…",
    "cutDone": "No product. The total number of students goes dark.",
    "liveLine": "The line is live. Mark what fails if the full buses are never multiplied.",
    "fillLine": "The bus line fills in as each part locks.",
    "links": [
      {
        "id": "buses",
        "label": "The buses",
        "mark": "🚌",
        "on": "r1"
      },
      {
        "id": "full",
        "label": "108 seats",
        "mark": "✖️",
        "on": "r3"
      },
      {
        "id": "all",
        "label": "122 students",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never multiply the full buses. What fails?",
    "hint": "Mark what goes dark. Then skip the 108.",
    "switch": "Skip the product",
    "choices": [
      {
        "id": "a",
        "text": "The total of 122 students",
        "marks": [
          "all"
        ]
      },
      {
        "id": "b",
        "text": "The buses disappear",
        "marks": [
          "buses"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The $8 ticket answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The answer becomes 108",
        "marks": [
          "full"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the bus line. Which sentence matches the picture?",
    "image": "/student/trip_line.jpg",
    "choices": [
      {
        "id": "strip",
        "text": "Three long equal strips, then one much shorter strip."
      },
      {
        "id": "flip",
        "text": "Three short strips, then one long strip."
      },
      {
        "id": "cost",
        "text": "The picture is a price tag."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the bus line. Which sentence matches the picture?"
  },
  "board": null
};
