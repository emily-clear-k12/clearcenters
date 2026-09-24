// Safe to import from client components.
// Assembly Deck — MA.3.8B-AD. TEKS 3.8B — problems from categorical data with a scaled interval.

export const PUBLIC_CASE = {
  "standard": "MA.3.8B-AD",
  "mode": "problem",
  "grade": 3,
  "subject": "Math",
  "title": "The Pet Survey",
  "estimatedMinutes": 20,
  "brief": [
    "Each picture stands for 2 students. The pictures are not the count.",
    "Use the scale. Then compare dogs and birds.",
    "Counting the pictures and skipping the key gives the wrong difference."
  ],
  "source": {
    "title": "PET GRAPH",
    "lines": [
      "Each picture stands for 2 students.",
      "Dogs have 4 pictures. Birds have 1 picture.",
      "Cats have 3 pictures. Fish have 2 pictures. This question does not use them.",
      "The graph cannot tell you which pet is the nicest."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The problem",
      "goal": "Build the question the graph can answer.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "What the graph uses",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The pictures this question needs",
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
          "text": "Each picture stands for 2 students."
        },
        {
          "id": "r1p5",
          "text": "Dogs have 4 students."
        },
        {
          "id": "r1p1",
          "text": "A pet graph uses pictures, and each picture has a scale."
        },
        {
          "id": "r1p6",
          "text": "Which pet is the nicest?"
        },
        {
          "id": "r1p3",
          "text": "Dogs have 4 pictures. Birds have 1 picture."
        },
        {
          "id": "r1p4",
          "text": "How many more students chose dogs than birds?"
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
      "goal": "Build the equations that use the scale.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "Scale the pictures, then subtract",
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
          "hint": "The picture that matches",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "n = d - (1 × 2)."
        },
        {
          "id": "r2p5",
          "text": "n = 4 - 1."
        },
        {
          "id": "r2p1",
          "text": "4 × 2 = d."
        },
        {
          "id": "r2p6",
          "text": "A graph with no key, so each picture stands for 1."
        },
        {
          "id": "r2p3",
          "text": "The letter n stands for how many more students chose dogs."
        },
        {
          "id": "r2p4",
          "text": "Four dog pictures and one bird picture, and the key says one picture stands for 2."
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
      "goal": "Use the scale, subtract, and check.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "Scale the dogs",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Scale the birds",
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
          "text": "1 × 2 = 2 students chose birds."
        },
        {
          "id": "r3p5",
          "text": "The answer is 3 more students."
        },
        {
          "id": "r3p1",
          "text": "4 × 2 = 8 students chose dogs."
        },
        {
          "id": "r3p6",
          "text": "Check: 6 is the answer, so it is checked."
        },
        {
          "id": "r3p3",
          "text": "8 - 2 = 6 more students chose dogs."
        },
        {
          "id": "r3p4",
          "text": "Check: 2 + 6 = 8."
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
    "hint": "A reader needs the scale, then the model, before the comparison.",
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
      "prompt": "One sentence says each picture stands for 2 students. Tap it.",
      "hint": "Look in the problem part."
    },
    "quickCheck": {
      "prompt": "How many more students chose dogs than birds?",
      "choices": [
        {
          "id": "a",
          "text": "6 more students"
        },
        {
          "id": "b",
          "text": "3 more students"
        },
        {
          "id": "c",
          "text": "4 students"
        },
        {
          "id": "d",
          "text": "The nicest pet"
        }
      ]
    }
  },
  "explain": {
    "prompt": "How many students chose dogs, how many chose birds, and how many more chose dogs?",
    "starters": [
      "Each picture stands for",
      "Dogs",
      "Birds",
      "The difference"
    ],
    "checks": [
      "I used the scale of 2.",
      "I said 8 students chose dogs.",
      "I said 2 students chose birds.",
      "I said 6 more students chose dogs.",
      "I did not subtract the pictures, 4 - 1."
    ],
    "criteria": [
      "Use the scale: 4 × 2 = 8 and 1 × 2 = 2.",
      "Subtract to get 6 more students.",
      "Check, such as 2 + 6 = 8."
    ]
  },
  "chain": {
    "title": "Pet line",
    "sourceId": "pics",
    "cutId": "scale",
    "cutDark": [
      "diff"
    ],
    "stayOn": [
      "pics"
    ],
    "cutting": "Taking the scale away…",
    "cutDone": "No key. The real difference goes dark.",
    "liveLine": "The line is live. Mark what fails if you ignore the key.",
    "fillLine": "The pet line fills in as each part locks.",
    "links": [
      {
        "id": "pics",
        "label": "The pictures",
        "mark": "🐕",
        "on": "r1"
      },
      {
        "id": "scale",
        "label": "Times 2",
        "mark": "🔑",
        "on": "r2"
      },
      {
        "id": "diff",
        "label": "6 more",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You ignore the key. What fails?",
    "hint": "Mark what goes dark. Then skip the scale.",
    "switch": "Skip the key",
    "choices": [
      {
        "id": "a",
        "text": "The true difference of 6",
        "marks": [
          "diff"
        ]
      },
      {
        "id": "b",
        "text": "The pictures disappear",
        "marks": [
          "pics"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 4 - 1 is the same answer.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Dogs become 4 students",
        "marks": [
          "scale"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the pet line. Which sentence matches the picture?",
    "image": "/student/pet_line.jpg",
    "choices": [
      {
        "id": "key",
        "text": "Four dog pictures and one bird, and the key shows one picture stands for two."
      },
      {
        "id": "nokey",
        "text": "There is no key, so each picture stands for one."
      },
      {
        "id": "cats",
        "text": "The picture is only cats and fish."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the pet line. Which sentence matches the picture?"
  },
  "board": null
};
