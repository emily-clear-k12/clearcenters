// Safe to import from client components.
// Assembly Deck — ELA.4.7D-AD. TEKS 4.7D — summarize without changing the meaning.

export const PUBLIC_CASE = {
  "standard": "ELA.4.7D-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "ELAR",
  "title": "The Article and the Rumor",
  "estimatedMinutes": 20,
  "brief": [
    "An article says the playground will be repaired in June. A rumor says it is closing forever.",
    "A summary keeps the article's meaning. It does not upgrade a rumor.",
    "Exciting is not the same as true."
  ],
  "source": {
    "title": "THE ARTICLE",
    "lines": [
      "The city will repair the school playground in June.",
      "The swings and the slide will be replaced.",
      "The field will stay open while the work happens.",
      "The article does not say the playground is closing forever.",
      "A rumor in the hall says the whole playground will close and never reopen."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What it claims",
      "goal": "Build the paragraph that states the article's claim.",
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
          "hint": "When the repair happens, and what gets replaced",
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
          "text": "The city will repair the playground in June."
        },
        {
          "id": "r1p5",
          "text": "The playground is closing forever."
        },
        {
          "id": "r1p1",
          "text": "The article is about a repair, not a closing."
        },
        {
          "id": "r1p6",
          "text": "I love the slide, so the article is happy news."
        },
        {
          "id": "r1p3",
          "text": "The swings and the slide will be replaced."
        },
        {
          "id": "r1p4",
          "text": "The claim has an end date. It is not a shutdown."
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
      "label": "What it never says",
      "goal": "Build the paragraph that keeps the rumor out.",
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
          "hint": "What stays open, and what the article never says",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why leaving the rumor out matters",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The field will stay open during the work."
        },
        {
          "id": "r2p5",
          "text": "The field closes too, because repairs always spread."
        },
        {
          "id": "r2p1",
          "text": "A fair summary also notices what the article does not say."
        },
        {
          "id": "r2p6",
          "text": "Forever is just a shorter way to say June."
        },
        {
          "id": "r2p3",
          "text": "The article never says the playground closes forever."
        },
        {
          "id": "r2p4",
          "text": "Leaving the rumor out keeps the meaning true."
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
      "label": "The fair summary",
      "goal": "Build the summary itself.",
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
          "hint": "The repair, and the two details that keep it honest",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a summary must not add",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The playground will be repaired in June."
        },
        {
          "id": "r3p5",
          "text": "The rumor is more exciting, so lead with the rumor."
        },
        {
          "id": "r3p1",
          "text": "A summary says the article's news in fewer words."
        },
        {
          "id": "r3p6",
          "text": "Copy the rumor and skip the article."
        },
        {
          "id": "r3p3",
          "text": "The swings and the slide will be replaced, and the field stays open."
        },
        {
          "id": "r3p4",
          "text": "A summary that adds forever has changed the article."
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
    "prompt": "Three parts, one summary. What order should a reader hear them in?",
    "hint": "A reader needs the claim, then what the article does not say, before the short version.",
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
      "prompt": "One sentence says the article never says the playground closes forever. Tap it.",
      "hint": "Look in the part about what the article does not say."
    },
    "quickCheck": {
      "prompt": "Which summary keeps the article's meaning?",
      "choices": [
        {
          "id": "a",
          "text": "The playground will be repaired in June, and the field stays open"
        },
        {
          "id": "b",
          "text": "The playground is closing forever"
        },
        {
          "id": "c",
          "text": "Forever is a short way to say June"
        },
        {
          "id": "d",
          "text": "The rumor is better because it is exciting"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Summarize the article. What will happen to the playground, and what will not happen?",
    "starters": [
      "The city",
      "In June",
      "The field",
      "The article does not say"
    ],
    "checks": [
      "I said it is a repair.",
      "I said June or what gets replaced.",
      "I said the field stays open, or that it does not close forever.",
      "I did not lead with the rumor.",
      "I wrote it shorter than the article."
    ],
    "criteria": [
      "Say the playground will be repaired in June.",
      "Say the swings and slide will be replaced, or the field stays open.",
      "Do not say the playground closes forever."
    ]
  },
  "chain": {
    "title": "Summary line",
    "sourceId": "page",
    "cutId": "claim",
    "cutDark": [
      "card"
    ],
    "stayOn": [
      "page"
    ],
    "cutting": "Taking the article's claim out…",
    "cutDone": "No claim. The short card goes dark.",
    "liveLine": "The line is live. Mark what fails if the claim is gone.",
    "fillLine": "The summary line fills in as each part locks.",
    "links": [
      {
        "id": "page",
        "label": "Article",
        "mark": "📰",
        "on": "r1"
      },
      {
        "id": "claim",
        "label": "The claim",
        "mark": "🔎",
        "on": "r2"
      },
      {
        "id": "card",
        "label": "Short card",
        "mark": "🗒️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the article's claim away. What fails?",
    "hint": "Mark what goes dark. Then take the claim away.",
    "switch": "Take the claim away",
    "choices": [
      {
        "id": "a",
        "text": "The short card",
        "marks": [
          "card"
        ]
      },
      {
        "id": "b",
        "text": "The article disappears",
        "marks": [
          "page"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The rumor can replace it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The card should say forever",
        "marks": [
          "card"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the summary line. Which sentence matches the picture?",
    "image": "/student/rumor_line.jpg",
    "choices": [
      {
        "id": "fair",
        "text": "A straight article becomes a short straight card. The scribble is not the card."
      },
      {
        "id": "rumor",
        "text": "The scribble is the real article, and the short card copies it."
      },
      {
        "id": "same",
        "text": "The short card is longer than the article."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the summary line. Which sentence matches the picture?"
  },
  "board": null
};
