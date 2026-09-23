// Safe to import from client components.
// Assembly Deck — SS.3.14B-AD. TEKS 3.14B — compare a primary source and a secondary source about the same event.

export const PUBLIC_CASE = {
  "standard": "SS.3.14B-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Social Studies",
  "title": "Two Accounts of the Same Day",
  "estimatedMinutes": 20,
  "brief": [
    "The school garden flooded on Tuesday. Two accounts do not match.",
    "A primary source comes from someone who was there. Sam's diary is primary.",
    "A secondary source tells what someone heard later. The newspaper is secondary."
  ],
  "source": {
    "title": "TWO ACCOUNTS",
    "lines": [
      "Sam was at the garden on Tuesday and wrote in a diary that day.",
      "Sam saw water on the bean rows only.",
      "The tomato pots were moved to the steps and stayed dry.",
      "The newspaper came out the next day. The writer was not at the garden.",
      "The paper says the whole garden was lost.",
      "Neither account says the gym roof leaked. That was a different day."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The diary",
      "goal": "Build the paragraph about the primary source.",
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
          "hint": "Who was there, and what Sam saw",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What stayed dry",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Sam was at the garden on Tuesday."
        },
        {
          "id": "r1p5",
          "text": "Sam was not there, so the diary is a guess."
        },
        {
          "id": "r1p1",
          "text": "Sam's diary is a primary source."
        },
        {
          "id": "r1p6",
          "text": "The diary says the gym roof leaked."
        },
        {
          "id": "r1p3",
          "text": "Sam saw water on the bean rows only."
        },
        {
          "id": "r1p4",
          "text": "The tomato pots stayed dry."
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
      "label": "The newspaper",
      "goal": "Build the paragraph about the secondary source.",
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
          "hint": "When it was written, and what it claims",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the writer did not do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "It was written the next day."
        },
        {
          "id": "r2p5",
          "text": "The paper's writer was at the garden."
        },
        {
          "id": "r2p1",
          "text": "The newspaper is a secondary source."
        },
        {
          "id": "r2p6",
          "text": "Both accounts say the gym roof leaked."
        },
        {
          "id": "r2p3",
          "text": "It says the whole garden was lost."
        },
        {
          "id": "r2p4",
          "text": "The writer heard about the flood. The writer did not see it."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "unsupported",
        "opinion"
      ]
    },
    {
      "id": "r3",
      "label": "Which to trust",
      "goal": "Build the paragraph that weighs the two accounts.",
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
          "hint": "What Sam saw, and what newer does not mean",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Who is the stronger source",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Sam saw wet beans and dry tomatoes."
        },
        {
          "id": "r3p5",
          "text": "The paper is better because it is newer."
        },
        {
          "id": "r3p1",
          "text": "The diary and the paper do not match."
        },
        {
          "id": "r3p6",
          "text": "Older writing is always true."
        },
        {
          "id": "r3p3",
          "text": "Newer does not mean truer."
        },
        {
          "id": "r3p4",
          "text": "The person who was there is the stronger source."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "unsupported",
        "contradicts",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one comparison. What order should a reader hear them in?",
    "hint": "A reader needs the diary, then the paper, before the weighing.",
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
      "prompt": "One sentence says Sam saw water on the bean rows only. Tap it.",
      "hint": "Look in the diary part."
    },
    "quickCheck": {
      "prompt": "Which source is stronger about this flood?",
      "choices": [
        {
          "id": "a",
          "text": "Sam's diary, because Sam was there"
        },
        {
          "id": "b",
          "text": "The paper, because it is newer"
        },
        {
          "id": "c",
          "text": "The paper, because older is always true"
        },
        {
          "id": "d",
          "text": "Either one, because both say the gym roof leaked"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What did Sam's diary say, what did the paper say, and which one is stronger? Tell why.",
    "starters": [
      "Sam was there",
      "The diary says",
      "The paper says",
      "The stronger source"
    ],
    "checks": [
      "I said Sam was at the garden.",
      "I said the beans were wet or the tomatoes stayed dry.",
      "I said the paper claimed the whole garden was lost.",
      "I said the diary is stronger because Sam was there.",
      "I did not say newer means truer."
    ],
    "criteria": [
      "Say Sam's diary is a primary source, or that Sam was there.",
      "Say Sam saw water on the bean rows, or that the tomatoes stayed dry.",
      "Say the paper said the whole garden was lost, and that the diary is stronger because the writer was there."
    ]
  },
  "chain": {
    "title": "Source line",
    "sourceId": "garden",
    "cutId": "diary",
    "cutDark": [
      "answer"
    ],
    "stayOn": [
      "garden"
    ],
    "cutting": "Taking the diary away…",
    "cutDone": "No eyewitness. The careful answer goes dark.",
    "liveLine": "The line is live. Mark what fails if the diary is gone.",
    "fillLine": "The source line fills in as each part locks.",
    "links": [
      {
        "id": "garden",
        "label": "The flood",
        "mark": "🌱",
        "on": "r1"
      },
      {
        "id": "diary",
        "label": "The diary",
        "mark": "📓",
        "on": "r1"
      },
      {
        "id": "answer",
        "label": "The answer",
        "mark": "🔎",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take Sam's diary away. What fails?",
    "hint": "Mark what goes dark. Then take the diary.",
    "switch": "Take the diary",
    "choices": [
      {
        "id": "a",
        "text": "The careful answer",
        "marks": [
          "answer"
        ]
      },
      {
        "id": "b",
        "text": "The flood disappears",
        "marks": [
          "garden"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The newer paper is enough.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The gym roof story becomes the flood",
        "marks": [
          "answer"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the source line. Which sentence matches the picture?",
    "image": "/student/diary_line.jpg",
    "choices": [
      {
        "id": "there",
        "text": "A wet garden, a child writing in a notebook, then a newspaper."
      },
      {
        "id": "gym",
        "text": "The picture is a gym with a leaking roof."
      },
      {
        "id": "only",
        "text": "There is only a newspaper, and no garden."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the source line. Which sentence matches the picture?"
  },
  "board": null
};
