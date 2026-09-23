// Safe to import from client components.
// Assembly Deck — ELA.3.7D-AD. TEKS 3.7D — retell and paraphrase without changing the meaning.

export const PUBLIC_CASE = {
  "standard": "ELA.3.7D-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "ELAR",
  "title": "Say It Shorter",
  "estimatedMinutes": 20,
  "brief": [
    "Read the garden notes. Then say the same news in a short way.",
    "A short retelling keeps the meaning and the order.",
    "Your opinion is not part of the retelling."
  ],
  "source": {
    "title": "GARDEN ARTICLE",
    "lines": [
      "The class planted beans in April.",
      "They watered the plants every Monday and Friday.",
      "In June they picked beans for the cafeteria.",
      "The short idea: the class garden grew food the cafeteria could use.",
      "The article does not say the garden failed."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The main idea",
      "goal": "Build the paragraph that says what the article is mostly about.",
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
          "hint": "What they planted, and the big idea",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a main idea is not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The class planted beans in April."
        },
        {
          "id": "r1p5",
          "text": "I think beans taste bad."
        },
        {
          "id": "r1p1",
          "text": "The article is about a class garden that grew food."
        },
        {
          "id": "r1p6",
          "text": "The article is about a field trip to the moon."
        },
        {
          "id": "r1p3",
          "text": "The food was for the cafeteria."
        },
        {
          "id": "r1p4",
          "text": "A main idea is the big news, not a tiny detail."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "offtopic",
        "contradicts",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "The details that matter",
      "goal": "Build the paragraph that keeps two important details in order.",
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
          "hint": "What they did, in time order",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the order matters",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "First, the class watered the beans each Monday and Friday."
        },
        {
          "id": "r2p5",
          "text": "They picked the beans first and planted them after."
        },
        {
          "id": "r2p1",
          "text": "Two details carry the story, in order."
        },
        {
          "id": "r2p6",
          "text": "They watered the beans every day at midnight."
        },
        {
          "id": "r2p3",
          "text": "Later, they picked the beans in June."
        },
        {
          "id": "r2p4",
          "text": "The order matters, because the plants had to grow before the picking."
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
      "label": "The short version",
      "goal": "Build the short retelling.",
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
          "hint": "The idea in new words, and one detail",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the short version must not do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The class grew beans and gave them to the cafeteria."
        },
        {
          "id": "r3p5",
          "text": "The garden failed, so the cafeteria got nothing."
        },
        {
          "id": "r3p1",
          "text": "Here is the same news in fewer words."
        },
        {
          "id": "r3p6",
          "text": "You should copy every sentence so you do not miss a word."
        },
        {
          "id": "r3p3",
          "text": "They took care of the plants, and then they picked them."
        },
        {
          "id": "r3p4",
          "text": "A short retelling keeps the meaning. It does not add a new ending."
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
    "prompt": "Three parts, one short retelling. What order should a reader hear them in?",
    "hint": "A reader needs the main idea, then the details, before the short version.",
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
      "prompt": "One sentence says the class grew beans for the cafeteria. Tap it.",
      "hint": "Look in the short version."
    },
    "quickCheck": {
      "prompt": "Which short line keeps the article's meaning?",
      "choices": [
        {
          "id": "a",
          "text": "The class grew beans and gave them to the cafeteria"
        },
        {
          "id": "b",
          "text": "The garden failed"
        },
        {
          "id": "c",
          "text": "Beans taste bad"
        },
        {
          "id": "d",
          "text": "The class went to the moon"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Say the garden article in one or two sentences. Keep the meaning.",
    "starters": [
      "The class",
      "They planted",
      "In June",
      "The cafeteria"
    ],
    "checks": [
      "I said the main idea.",
      "I kept the meaning the same.",
      "I did not add my opinion.",
      "I did not say the garden failed.",
      "I wrote it shorter than the article."
    ],
    "criteria": [
      "Say the class grew beans, or planted a garden.",
      "Say the food went to the cafeteria.",
      "Keep the order, or do not flip planting and picking."
    ]
  },
  "chain": {
    "title": "Short line",
    "sourceId": "page",
    "cutId": "idea",
    "cutDark": [
      "short"
    ],
    "stayOn": [
      "page"
    ],
    "cutting": "Taking the main idea out…",
    "cutDone": "No main idea. The short card goes dark.",
    "liveLine": "The line is live. Mark what fails if the main idea is gone.",
    "fillLine": "The short line fills in as each part locks.",
    "links": [
      {
        "id": "page",
        "label": "Long page",
        "mark": "📄",
        "on": "r1"
      },
      {
        "id": "idea",
        "label": "Main idea",
        "mark": "💡",
        "on": "r2"
      },
      {
        "id": "short",
        "label": "Short card",
        "mark": "🗒️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the main idea away. What fails?",
    "hint": "Mark what goes dark. Then take the main idea away.",
    "switch": "Take the main idea away",
    "choices": [
      {
        "id": "a",
        "text": "The short card",
        "marks": [
          "short"
        ]
      },
      {
        "id": "b",
        "text": "The long page disappears",
        "marks": [
          "page"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Any short sentence is fine.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The short card should say the garden failed",
        "marks": [
          "short"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the short line. Which sentence matches the picture?",
    "image": "/student/short_line.jpg",
    "choices": [
      {
        "id": "short",
        "text": "A long page becomes a short card."
      },
      {
        "id": "same",
        "text": "The short card is just as long as the page."
      },
      {
        "id": "moon",
        "text": "The page is a picture of a moon trip."
      }
    ]
  },
  "repair": {
    "roundId": "r3",
    "pieceId": "r3p5",
    "prompt": "Look at the short line. Which sentence matches the picture?"
  },
  "board": null
};
