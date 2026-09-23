// Safe to import from client components.
// Assembly Deck — SS.4.3D-AD. TEKS 4.3D — successes, problems, and organizations of the Republic of Texas.

export const PUBLIC_CASE = {
  "standard": "SS.4.3D-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Social Studies",
  "title": "A Country With No Money",
  "estimatedMinutes": 20,
  "brief": [
    "The Republic of Texas lasted from 1836 to 1845. It had successes and problems at the same time.",
    "A famous president does not erase a debt.",
    "Annexation kept coming up because the Republic needed money and protection."
  ],
  "source": {
    "title": "REPUBLIC NOTES",
    "lines": [
      "The Republic of Texas lasted from 1836 to 1845.",
      "It wrote a constitution. Sam Houston was elected the first president.",
      "The Republic was deep in debt, and its paper money lost value.",
      "Mexico did not accept Texas independence, so the threat of war remained.",
      "The Texas Rangers were organized. Conflict with American Indian nations over land was a problem, not a success.",
      "Texas joined the United States in 1845. Oil at Spindletop came in 1901, long after the Republic."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What worked",
      "goal": "Build the paragraph about the Republic's successes.",
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
          "hint": "The constitution, and the first president",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What those two things do not prove",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "It wrote a constitution."
        },
        {
          "id": "r1p5",
          "text": "The Republic was already a rich and powerful country."
        },
        {
          "id": "r1p1",
          "text": "The Republic could govern itself on paper."
        },
        {
          "id": "r1p6",
          "text": "A famous president means the problems did not count."
        },
        {
          "id": "r1p3",
          "text": "Sam Houston was elected the first president."
        },
        {
          "id": "r1p4",
          "text": "A constitution and a leader were real successes."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r2",
      "label": "What did not",
      "goal": "Build the paragraph about the Republic's problems.",
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
          "hint": "The debt, and the conflict that was not a success",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why a leader did not fix it",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "It was deep in debt, and its paper money lost value."
        },
        {
          "id": "r2p5",
          "text": "The Republic paid every debt in its first year."
        },
        {
          "id": "r2p1",
          "text": "The new country had serious problems."
        },
        {
          "id": "r2p6",
          "text": "Winning independence meant every problem was over."
        },
        {
          "id": "r2p3",
          "text": "Conflict over land with American Indian nations was not a success."
        },
        {
          "id": "r2p4",
          "text": "A famous leader did not erase the debt."
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
      "label": "Why annexation",
      "goal": "Build the paragraph about why joining the United States kept coming up.",
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
          "hint": "The year Texas joined, and what it needed",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kept the question alive",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Texas joined the United States in 1845."
        },
        {
          "id": "r3p5",
          "text": "Oil in 1901 paid the Republic's debts."
        },
        {
          "id": "r3p1",
          "text": "Annexation kept coming up because the Republic needed help."
        },
        {
          "id": "r3p6",
          "text": "Texas joined because it had no constitution."
        },
        {
          "id": "r3p3",
          "text": "It needed money and protection that it did not have."
        },
        {
          "id": "r3p4",
          "text": "Debt and the threat from Mexico kept the question alive."
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
    "prompt": "Three parts, one account. What order should a reader hear them in?",
    "hint": "A reader needs what worked, then what did not, before annexation makes sense.",
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
      "prompt": "One sentence says Texas joined the United States in 1845. Tap it.",
      "hint": "Look in the part about annexation."
    },
    "quickCheck": {
      "prompt": "Which pair is true of the Republic of Texas?",
      "choices": [
        {
          "id": "a",
          "text": "It had a constitution and a debt at the same time"
        },
        {
          "id": "b",
          "text": "It was rich, and the problems were over"
        },
        {
          "id": "c",
          "text": "Oil in 1901 paid its debts"
        },
        {
          "id": "d",
          "text": "It joined the United States because it had no constitution"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Name one success of the Republic of Texas, one problem, and why annexation kept coming up.",
    "starters": [
      "The Republic",
      "It wrote",
      "The debt",
      "Texas joined"
    ],
    "checks": [
      "I named a success, such as the constitution or Sam Houston.",
      "I named a problem, such as the debt or the threat from Mexico.",
      "I said Texas joined the United States in 1845, or needed money and protection.",
      "I did not say oil solved the Republic's debt.",
      "I did not treat a famous leader as the end of the problems."
    ],
    "criteria": [
      "Name a success: the constitution or Sam Houston as president.",
      "Name a problem: debt, money losing value, Mexico still claiming Texas, or conflict over land.",
      "Say annexation in 1845 was tied to needing money or protection."
    ]
  },
  "chain": {
    "title": "Republic line",
    "sourceId": "flag",
    "cutId": "debt",
    "cutDark": [
      "join"
    ],
    "stayOn": [
      "flag"
    ],
    "cutting": "Taking the debt out of the story…",
    "cutDone": "No empty chest. The push to join the United States goes dark.",
    "liveLine": "The line is live. Mark what fails if the debt is gone.",
    "fillLine": "The republic line fills in as each part locks.",
    "links": [
      {
        "id": "flag",
        "label": "The Republic",
        "mark": "⭐",
        "on": "r1"
      },
      {
        "id": "debt",
        "label": "The debt",
        "mark": "📦",
        "on": "r2"
      },
      {
        "id": "join",
        "label": "Annexation",
        "mark": "🤝",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the debt away. What fails?",
    "hint": "Mark what goes dark. Then empty the debt.",
    "switch": "Erase the debt",
    "choices": [
      {
        "id": "a",
        "text": "The push to join the United States",
        "marks": [
          "join"
        ]
      },
      {
        "id": "b",
        "text": "The Republic disappears",
        "marks": [
          "flag"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. They joined because of oil.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The debt gets larger",
        "marks": [
          "debt"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the republic line. Which sentence matches the picture?",
    "image": "/student/republic_line.jpg",
    "choices": [
      {
        "id": "join",
        "text": "A one-star flag, an empty chest, then that flag beside the United States flag."
      },
      {
        "id": "full",
        "text": "The chest is overflowing with gold, and there is no second flag."
      },
      {
        "id": "oil",
        "text": "An oil derrick replaces the flags."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the republic line. Which sentence matches the picture?"
  },
  "board": null
};
