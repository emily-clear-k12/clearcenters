// Safe to import from client components.
// Assembly Deck — MA.4.4H-AD. TEKS 4.4H — interpret a remainder three ways.

export const PUBLIC_CASE = {
  "standard": "MA.4.4H-AD",
  "mode": "problem",
  "grade": 4,
  "subject": "Math",
  "title": "What the Remainder Means",
  "estimatedMinutes": 20,
  "brief": [
    "25 students. Each van holds 6. The division is 4 remainder 1.",
    "The same remainder answers three different questions.",
    "Round up when everyone must ride. The remainder itself is the student left over."
  ],
  "source": {
    "title": "VAN NOTES",
    "lines": [
      "25 students need a ride. Each van holds 6 students.",
      "25 ÷ 6 = 4, with a remainder of 1.",
      "4 × 6 = 24, so 1 student does not fill a van.",
      "The school owns 10 vans. That number is not needed."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The division",
      "goal": "Build the division, and keep the remainder.",
      "slots": [
        {
          "id": "situation",
          "label": "The situation",
          "hint": "Who needs a ride?",
          "accepts": 1
        },
        {
          "id": "numbers",
          "label": "The numbers",
          "hint": "The division and what 4 means",
          "accepts": 2
        },
        {
          "id": "question",
          "label": "The question",
          "hint": "What the remainder is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "25 students are going, and each van holds 6."
        },
        {
          "id": "r1p5",
          "text": "25 ÷ 6 = 4 exactly."
        },
        {
          "id": "r1p1",
          "text": "Students need a ride, and the vans do not fill evenly."
        },
        {
          "id": "r1p6",
          "text": "The school owns 10 vans."
        },
        {
          "id": "r1p3",
          "text": "25 ÷ 6 = 4, with a remainder."
        },
        {
          "id": "r1p4",
          "text": "The remainder is 1 student."
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
      "label": "Vans for everyone",
      "goal": "Decide how many vans you need so nobody is left behind.",
      "slots": [
        {
          "id": "equation",
          "label": "The equation",
          "hint": "What 4 vans hold, and who is left",
          "accepts": 2
        },
        {
          "id": "letter",
          "label": "What the letter stands for",
          "hint": "What v means",
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
          "text": "v = 4 + 1."
        },
        {
          "id": "r2p5",
          "text": "v = 4."
        },
        {
          "id": "r2p1",
          "text": "4 × 6 = 24 students in full vans."
        },
        {
          "id": "r2p6",
          "text": "v = 1."
        },
        {
          "id": "r2p3",
          "text": "The letter v stands for the vans needed so everyone rides."
        },
        {
          "id": "r2p4",
          "text": "Four full vans, and one student still standing outside."
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
      "label": "What is left over",
      "goal": "Say how many students do not fill a van, and check the division.",
      "slots": [
        {
          "id": "step1",
          "label": "Step one",
          "hint": "What a full van holds",
          "accepts": 1
        },
        {
          "id": "step2",
          "label": "Step two",
          "hint": "Who is left",
          "accepts": 1
        },
        {
          "id": "answer",
          "label": "The answer",
          "hint": "The leftover, with the unit",
          "accepts": 1
        },
        {
          "id": "check",
          "label": "The check",
          "hint": "A check that rebuilds 25",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "4 full vans hold 24 students."
        },
        {
          "id": "r3p5",
          "text": "5 students are left over."
        },
        {
          "id": "r3p1",
          "text": "A full van holds 6 students."
        },
        {
          "id": "r3p6",
          "text": "Check: the remainder is 1, so it is checked."
        },
        {
          "id": "r3p3",
          "text": "1 student is left over."
        },
        {
          "id": "r3p4",
          "text": "Check: 4 × 6 + 1 = 25."
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
    "hint": "A reader needs the division, then the vans, before the leftover is clear.",
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
      "prompt": "One sentence says you can check with 4 × 6 + 1 = 25. Tap it.",
      "hint": "Look in the last part."
    },
    "quickCheck": {
      "prompt": "How many vans do you need so every student rides?",
      "choices": [
        {
          "id": "a",
          "text": "5 vans"
        },
        {
          "id": "b",
          "text": "4 vans"
        },
        {
          "id": "c",
          "text": "1 van"
        },
        {
          "id": "d",
          "text": "10 vans"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What is 25 ÷ 6, how many vans are needed so everyone rides, and how many students are left over?",
    "starters": [
      "25 divided by 6",
      "To take everyone",
      "The leftover",
      "The check"
    ],
    "checks": [
      "I said 25 ÷ 6 is 4 remainder 1.",
      "I said 5 vans are needed so everyone rides.",
      "I said 1 student is left over.",
      "I checked with 4 × 6 + 1 = 25.",
      "I did not say the division was exact."
    ],
    "criteria": [
      "Give 25 ÷ 6 as 4 remainder 1.",
      "Say 5 vans are needed if everyone must ride.",
      "Say 1 student is left over, and check with 4 × 6 + 1 = 25."
    ]
  },
  "chain": {
    "title": "Van line",
    "sourceId": "group",
    "cutId": "groups",
    "cutDark": [
      "left"
    ],
    "stayOn": [
      "group"
    ],
    "cutting": "Taking the groups of 6 away…",
    "cutDone": "No groups. The leftover student goes dark.",
    "liveLine": "The line is live. Mark what fails if you never make groups of 6.",
    "fillLine": "The van line fills in as each part locks.",
    "links": [
      {
        "id": "group",
        "label": "25 students",
        "mark": "👧",
        "on": "r1"
      },
      {
        "id": "groups",
        "label": "Groups of 6",
        "mark": "🚐",
        "on": "r2"
      },
      {
        "id": "left",
        "label": "1 left over",
        "mark": "1️⃣",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. You never make groups of 6. What fails?",
    "hint": "Mark what goes dark. Then skip the groups.",
    "switch": "Skip the groups",
    "choices": [
      {
        "id": "a",
        "text": "The 1 student left over",
        "marks": [
          "left"
        ]
      },
      {
        "id": "b",
        "text": "The 25 students disappear",
        "marks": [
          "group"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. 10 vans answers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The remainder becomes 5",
        "marks": [
          "left"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the van line. Which sentence matches the picture?",
    "image": "/student/van_line.jpg",
    "choices": [
      {
        "id": "out",
        "text": "Four vans are full, and one student stands outside."
      },
      {
        "id": "exact",
        "text": "Every student is inside a van, with no one left outside."
      },
      {
        "id": "one",
        "text": "Only one van is in the picture."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the van line. Which sentence matches the picture?"
  },
  "board": null
};
