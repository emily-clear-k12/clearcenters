// Safe to import from client components.
// Assembly Deck — ELA.4.12C-AD. TEKS 4.12C — argumentative opinion writing.

export const PUBLIC_CASE = {
  "standard": "ELA.4.12C-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "ELAR",
  "title": "Later Recess",
  "estimatedMinutes": 20,
  "brief": [
    "The class wants recess to go from 10 minutes to 20.",
    "An argument needs a claim, evidence, and an answer to the other side.",
    "A shout is not evidence."
  ],
  "source": {
    "title": "RECESS NOTES",
    "lines": [
      "Recess is 10 minutes. The class is asking for 20.",
      "Twenty-two of twenty-four students said they return ready to work after a longer recess.",
      "One worry: the extra time will come from math.",
      "The plan takes 10 minutes from morning meeting, not from math."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The claim",
      "goal": "Build the paragraph that states the claim.",
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
          "hint": "How long recess is now, and what is being asked",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the claim is not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Right now it ends almost as soon as it starts."
        },
        {
          "id": "r1p5",
          "text": "Recess should last the whole school day."
        },
        {
          "id": "r1p1",
          "text": "Recess should be 20 minutes instead of 10."
        },
        {
          "id": "r1p6",
          "text": "Math is boring, so cancel math."
        },
        {
          "id": "r1p3",
          "text": "Students are asking for twice the time, not for no class."
        },
        {
          "id": "r1p4",
          "text": "The claim is a change in the clock, not a day off."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "offtopic",
        "opinion",
        "contradicts"
      ]
    },
    {
      "id": "r2",
      "label": "The evidence",
      "goal": "Build the paragraph that uses the survey.",
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
          "hint": "The count, and what students said",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why a count beats a wish",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Twenty-two of twenty-four students answered."
        },
        {
          "id": "r2p5",
          "text": "Every student on Earth agreed."
        },
        {
          "id": "r2p1",
          "text": "The survey is the evidence for a longer recess."
        },
        {
          "id": "r2p6",
          "text": "Only two students wanted more recess."
        },
        {
          "id": "r2p3",
          "text": "They said a longer recess helps them return ready to work."
        },
        {
          "id": "r2p4",
          "text": "A count is stronger than a louder voice."
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
      "label": "The other side",
      "goal": "Build the paragraph that answers the math worry.",
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
          "hint": "The worry, and where the minutes really come from",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why an argument needs that answer",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Some people think the extra minutes will come from math."
        },
        {
          "id": "r3p5",
          "text": "Ignore the worry and shout louder."
        },
        {
          "id": "r3p1",
          "text": "The other side has a fair worry, and the plan answers it."
        },
        {
          "id": "r3p6",
          "text": "Take the minutes from math anyway."
        },
        {
          "id": "r3p3",
          "text": "The plan takes those minutes from morning meeting instead."
        },
        {
          "id": "r3p4",
          "text": "An argument is stronger when it protects the thing people fear losing."
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
    "prompt": "Three parts, one argument. What order should a reader hear them in?",
    "hint": "A reader needs the claim, then the survey, before the answer to the worry.",
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
      "prompt": "One sentence says the extra minutes come from morning meeting, not math. Tap it.",
      "hint": "Look in the part about the other side."
    },
    "quickCheck": {
      "prompt": "Which line is real evidence for this argument?",
      "choices": [
        {
          "id": "a",
          "text": "Twenty-two of twenty-four students said longer recess helps them work"
        },
        {
          "id": "b",
          "text": "Every student on Earth agreed"
        },
        {
          "id": "c",
          "text": "Shout louder and ignore the worry"
        },
        {
          "id": "d",
          "text": "Cancel math"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What is the claim, what evidence supports it, and how do you answer the math worry?",
    "starters": [
      "Recess should",
      "The survey",
      "Twenty-two students",
      "The minutes would come from"
    ],
    "checks": [
      "I stated the claim.",
      "I used the survey count.",
      "I answered the math worry.",
      "I did not just say to shout.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Claim 20 minutes instead of 10.",
      "Use 22 of 24 students, or the survey.",
      "Say the extra time comes from morning meeting, not math."
    ]
  },
  "chain": {
    "title": "Recess line",
    "sourceId": "short",
    "cutId": "survey",
    "cutDark": [
      "plan",
      "play"
    ],
    "stayOn": [
      "short"
    ],
    "cutting": "Taking the survey out of the argument…",
    "cutDone": "No survey. The plan and the longer recess go dark.",
    "liveLine": "The line is live. Mark what fails if the survey is gone.",
    "fillLine": "The recess line fills in as each part locks.",
    "links": [
      {
        "id": "short",
        "label": "Short recess",
        "mark": "⏱️",
        "on": "r1"
      },
      {
        "id": "survey",
        "label": "Survey",
        "mark": "📊",
        "on": "r2"
      },
      {
        "id": "plan",
        "label": "The plan",
        "mark": "🗓️",
        "on": "r3"
      },
      {
        "id": "play",
        "label": "Longer recess",
        "mark": "🛝",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the survey away. What fails?",
    "hint": "Mark what goes dark. Then take the survey away.",
    "switch": "Take the survey away",
    "choices": [
      {
        "id": "a",
        "text": "The plan and the longer recess",
        "marks": [
          "plan",
          "play"
        ]
      },
      {
        "id": "b",
        "text": "The short recess disappears",
        "marks": [
          "short"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A shout is enough evidence.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Math gets canceled",
        "marks": [
          "plan"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the recess line. Which sentence matches the picture?",
    "image": "/student/recess_line.jpg",
    "choices": [
      {
        "id": "chart",
        "text": "A short recess, a chart with one tall bar, then more time to play."
      },
      {
        "id": "earth",
        "text": "Every student on Earth is drawn on the playground."
      },
      {
        "id": "math",
        "text": "The chart shows math class being canceled."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p6",
    "prompt": "Look at the recess line. Which sentence matches the picture?"
  },
  "board": null
};
