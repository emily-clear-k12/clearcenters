// Safe to import from client components.
// Assembly Deck — ELA.5.7D-AD. TEKS 5.7D — summarize without changing the meaning.

export const PUBLIC_CASE = {
  "standard": "ELA.5.7D-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "ELAR",
  "title": "Two Summaries, One Article",
  "estimatedMinutes": 20,
  "brief": [
    "An article says Maple Street will get a bike lane. A hallway summary says cars will be banned.",
    "A summary keeps the article's meaning and its limits.",
    "A shorter sentence is not fair if it changes the news."
  ],
  "source": {
    "title": "THE ARTICLE",
    "lines": [
      "The city will paint a bike lane on Maple Street from the school to the park.",
      "The work will happen in August.",
      "Cars will still drive on Maple Street.",
      "One parking lane will become the bike lane.",
      "The article does not say cars will be banned.",
      "A hallway summary says: cars will be banned from Maple Street."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The claim",
      "goal": "Build the paragraph that states what the article claims.",
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
          "hint": "When the lane is painted, and where it runs",
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
          "text": "The city will paint the lane in August."
        },
        {
          "id": "r1p5",
          "text": "Cars will be banned from Maple Street."
        },
        {
          "id": "r1p1",
          "text": "The article is about a new bike lane, not a ban."
        },
        {
          "id": "r1p6",
          "text": "I love bikes, so the article is perfect."
        },
        {
          "id": "r1p3",
          "text": "It will run from the school to the park."
        },
        {
          "id": "r1p4",
          "text": "The claim changes the street. It does not close it."
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
      "label": "The limit",
      "goal": "Build the paragraph that keeps the article's limit.",
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
          "hint": "What cars can still do, and what one lane becomes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the ban has to stay out",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Cars will still drive on Maple Street."
        },
        {
          "id": "r2p5",
          "text": "Both parking lanes will be removed."
        },
        {
          "id": "r2p1",
          "text": "A fair summary keeps the limits in the article."
        },
        {
          "id": "r2p6",
          "text": "Banned is just a shorter way to say bike lane."
        },
        {
          "id": "r2p3",
          "text": "One parking lane will become the bike lane."
        },
        {
          "id": "r2p4",
          "text": "Leaving the ban out keeps the meaning true."
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
      "goal": "Build the summary that matches the article.",
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
          "hint": "The news in fewer words, and the limit that keeps it honest",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What would change the article",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Maple Street will get a bike lane in August."
        },
        {
          "id": "r3p5",
          "text": "Lead with the ban, because it is more exciting."
        },
        {
          "id": "r3p1",
          "text": "Here is the same news in fewer words."
        },
        {
          "id": "r3p6",
          "text": "Copy the hallway summary and skip the article."
        },
        {
          "id": "r3p3",
          "text": "Cars can still use the street, and one parking lane will change."
        },
        {
          "id": "r3p4",
          "text": "A summary that adds a ban has changed the article."
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
    "hint": "A reader needs the claim, then the limit, before the short version.",
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
      "prompt": "One sentence says cars will still drive on Maple Street. Tap it.",
      "hint": "Look in the part about the article's limit."
    },
    "quickCheck": {
      "prompt": "Which summary keeps the article's meaning?",
      "choices": [
        {
          "id": "a",
          "text": "Maple Street gets a bike lane in August, and cars can still drive there"
        },
        {
          "id": "b",
          "text": "Cars will be banned from Maple Street"
        },
        {
          "id": "c",
          "text": "Banned is a short way to say bike lane"
        },
        {
          "id": "d",
          "text": "Both parking lanes will be removed"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Summarize the article. What will change on Maple Street, and what will not?",
    "starters": [
      "The city",
      "In August",
      "Cars will still",
      "The article does not say"
    ],
    "checks": [
      "I said a bike lane is coming.",
      "I said August or the route from school to park.",
      "I said cars can still drive there, or that only one parking lane changes.",
      "I did not say cars will be banned.",
      "I wrote it shorter than the article."
    ],
    "criteria": [
      "Say Maple Street will get a bike lane.",
      "Say the work is in August, or that it runs from the school to the park.",
      "Say cars will still drive there, and do not say they are banned."
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
        "mark": "🚲",
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
        "text": "Nothing. The hallway ban can replace it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The card should announce a ban",
        "marks": [
          "card"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the summary line. Which sentence matches the picture?",
    "image": "/student/bike_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "Cars stay on the street, a bike has its own path, and the scribble is not the card."
      },
      {
        "id": "ban",
        "text": "The street has no cars, and the scribble is the real article."
      },
      {
        "id": "long",
        "text": "The short card is longer than the street."
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
