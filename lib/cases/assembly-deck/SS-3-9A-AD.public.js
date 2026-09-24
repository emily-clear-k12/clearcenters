// Safe to import from client components.
// Assembly Deck — SS.3.9A-AD. TEKS 3.9A — characteristics of good citizenship, shown as actions.

export const PUBLIC_CASE = {
  "standard": "SS.3.9A-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Social Studies",
  "title": "The Playground Rule",
  "estimatedMinutes": 20,
  "brief": [
    "The swing rule was to take turns. Two students did not.",
    "Good citizenship is what people do, not only how they feel.",
    "Telling the truth and sharing turns are the actions in these notes."
  ],
  "source": {
    "title": "WHAT HAPPENED",
    "lines": [
      "The class rule was to take turns on the swings.",
      "Two students kept the swings for all of recess.",
      "Other students waited and got no turn.",
      "Maya told the teacher the truth. She did not add a made-up story.",
      "The next day, each student got a turn.",
      "The swings were not broken. The turn rule was."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What happened",
      "goal": "Build the paragraph about the broken rule.",
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
          "hint": "Who kept the swings, and who waited",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What was actually broken",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Two students kept the swings all recess."
        },
        {
          "id": "r1p5",
          "text": "The swings were broken, so no one could ride."
        },
        {
          "id": "r1p1",
          "text": "The class rule was to take turns on the swings."
        },
        {
          "id": "r1p6",
          "text": "The swings are red."
        },
        {
          "id": "r1p3",
          "text": "Other students waited and got no turn."
        },
        {
          "id": "r1p4",
          "text": "The turn rule was broken. The swings were not."
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
      "label": "The citizen action",
      "goal": "Build the paragraph about what Maya did.",
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
          "hint": "What she told, and what she did not add",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of action that was",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "She said who kept the swings."
        },
        {
          "id": "r2p5",
          "text": "Nice people do not need to tell anyone."
        },
        {
          "id": "r2p1",
          "text": "Maya told the teacher the truth."
        },
        {
          "id": "r2p6",
          "text": "Maya said the swings were broken."
        },
        {
          "id": "r2p3",
          "text": "She did not add a made-up story."
        },
        {
          "id": "r2p4",
          "text": "Telling the truth was the citizen action."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "contradicts",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "Next time",
      "goal": "Build the paragraph about the fair turn.",
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
          "hint": "Who gets a turn, and what waiting means",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What citizenship is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Each student gets a turn."
        },
        {
          "id": "r3p5",
          "text": "Feeling nice is enough, even if others never swing."
        },
        {
          "id": "r3p1",
          "text": "Next time, the turn rule has to be real."
        },
        {
          "id": "r3p6",
          "text": "The fastest kids should keep the swings."
        },
        {
          "id": "r3p3",
          "text": "Waiting is part of being fair."
        },
        {
          "id": "r3p4",
          "text": "Fair turns are something people do."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "contradicts",
        "unsupported",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one account. What order should a reader hear them in?",
    "hint": "A reader needs what happened, then what Maya did, before next time.",
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
      "prompt": "One sentence says Maya told the teacher the truth. Tap it.",
      "hint": "Look in the part about the citizen action."
    },
    "quickCheck": {
      "prompt": "Which action is good citizenship in this story?",
      "choices": [
        {
          "id": "a",
          "text": "Maya told the truth, and then each student got a turn"
        },
        {
          "id": "b",
          "text": "Feeling nice and saying nothing"
        },
        {
          "id": "c",
          "text": "Saying the swings were broken"
        },
        {
          "id": "d",
          "text": "Letting the fastest kids keep the swings"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What happened on the swings, what did Maya do, and what should happen next time?",
    "starters": [
      "The rule was",
      "Two students",
      "Maya told",
      "Next time"
    ],
    "checks": [
      "I said the rule was to take turns.",
      "I said some students kept the swings.",
      "I said Maya told the truth.",
      "I said each student should get a turn.",
      "I did not say the swings were broken."
    ],
    "criteria": [
      "Say the rule was taking turns, and some students did not follow it.",
      "Say Maya told the teacher the truth.",
      "Say each student should get a turn."
    ]
  },
  "chain": {
    "title": "Turn line",
    "sourceId": "rule",
    "cutId": "truth",
    "cutDark": [
      "turns"
    ],
    "stayOn": [
      "rule"
    ],
    "cutting": "Taking the truth out…",
    "cutDone": "No one tells what happened. The fair turns go dark.",
    "liveLine": "The line is live. Mark what fails if no one tells the truth.",
    "fillLine": "The turn line fills in as each part locks.",
    "links": [
      {
        "id": "rule",
        "label": "The rule",
        "mark": "🛝",
        "on": "r1"
      },
      {
        "id": "truth",
        "label": "The truth",
        "mark": "🗣️",
        "on": "r2"
      },
      {
        "id": "turns",
        "label": "Fair turns",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. No one tells the truth. What fails?",
    "hint": "Mark what goes dark. Then skip the truth.",
    "switch": "Skip the truth",
    "choices": [
      {
        "id": "a",
        "text": "The fair turns the next day",
        "marks": [
          "turns"
        ]
      },
      {
        "id": "b",
        "text": "The rule disappears",
        "marks": [
          "rule"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Feeling nice is enough.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The swings break",
        "marks": [
          "turns"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the turn line. Which sentence matches the picture?",
    "image": "/student/swing_line.jpg",
    "choices": [
      {
        "id": "turns",
        "text": "Kids wait, a child talks to a teacher, then everyone gets a turn."
      },
      {
        "id": "broken",
        "text": "The swings are broken, and no one is there."
      },
      {
        "id": "fast",
        "text": "Only two kids swing, and the others never get a turn."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the turn line. Which sentence matches the picture?"
  },
  "board": null
};
