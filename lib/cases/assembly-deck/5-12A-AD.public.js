// Safe to import from client components.
// Assembly Deck — 5.12A-AD. TEKS 5.12A — organisms interact with biotic and abiotic factors.

export const PUBLIC_CASE = {
  "standard": "5.12A-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Pond Tank",
  "estimatedMinutes": 20,
  "brief": [
    "Ms. Alvarez's class set up a small pond tank with a fish, a plant, and a snail.",
    "Write a short science report that sorts the tank's biotic and abiotic factors.",
    "Then explain how the fish depends on both kinds to survive."
  ],
  "source": {
    "title": "TANK NOTES",
    "lines": [
      "Biotic factors are the living or once-living parts of an ecosystem. In this tank: the fish, the plant, and the snail.",
      "Abiotic factors are the nonliving parts. In this tank: sunlight, water, temperature, and gravel.",
      "Sunlight, water, and gravel are not alive, even though living things use them.",
      "The plant uses sunlight to make food and releases oxygen into the water. The fish takes in that oxygen.",
      "The snail eats algae, which helps keep the water clean.",
      "The fish needs water that stays at a steady temperature.",
      "The fish needs both kinds of factors to survive."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Living factors",
      "goal": "Build the paragraph that defines and names the biotic factors.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The fish is a biotic factor because it is a living organism."
        },
        {
          "id": "r1p5",
          "text": "The gravel is biotic because it sits in the tank alongside the living things."
        },
        {
          "id": "r1p1",
          "text": "Biotic factors are the parts of an ecosystem that are alive or were once alive."
        },
        {
          "id": "r1p6",
          "text": "Sunlight is a living thing because it moves and changes during the day."
        },
        {
          "id": "r1p3",
          "text": "The plant and the snail are also biotic, since both are living organisms."
        },
        {
          "id": "r1p4",
          "text": "Together, these organisms make up the living part of the tank."
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
      "label": "Nonliving factors",
      "goal": "Build the paragraph that defines and names the abiotic factors.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Sunlight is abiotic, since it is not alive even though the plant depends on it."
        },
        {
          "id": "r2p5",
          "text": "Water becomes biotic once fish swim in it, because it holds living things."
        },
        {
          "id": "r2p1",
          "text": "Abiotic factors are the parts of an ecosystem that are not alive, and our tank has several."
        },
        {
          "id": "r2p6",
          "text": "A healthy tank needs only living things, so the nonliving parts could be removed."
        },
        {
          "id": "r2p3",
          "text": "Water, temperature, and gravel are abiotic too, because none of them is alive."
        },
        {
          "id": "r2p4",
          "text": "Although these factors are not alive, the fish still needs them to survive."
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
      "label": "How the fish survives",
      "goal": "Build the paragraph that explains how the fish depends on both kinds of factors.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this paragraph about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Two facts from the notes",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "The last idea a reader needs",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The fish interacts with the plant, which releases oxygen, and with the snail, which helps keep the water clean."
        },
        {
          "id": "r3p5",
          "text": "If the water were removed, the fish would thrive with more room to move."
        },
        {
          "id": "r3p1",
          "text": "The fish survives by interacting with both biotic and abiotic factors."
        },
        {
          "id": "r3p6",
          "text": "The brand of gravel matters more to the fish than anything else in the tank."
        },
        {
          "id": "r3p3",
          "text": "It also needs water to live in, a steady temperature, and sunlight for the plant."
        },
        {
          "id": "r3p4",
          "text": "So a healthy ecosystem needs both its living and its nonliving parts."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "offtopic",
        "opinion"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three paragraphs, one report. In what order should a reader meet them?",
    "hint": "A reader needs the living factors and then the nonliving factors before learning how the fish survives.",
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
      "prompt": "One sentence says sunlight is abiotic and explains why. Tap it.",
      "hint": "Look in the paragraph about nonliving factors."
    },
    "quickCheck": {
      "prompt": "Which of these tank factors is abiotic?",
      "choices": [
        {
          "id": "a",
          "text": "Sunlight"
        },
        {
          "id": "b",
          "text": "The fish"
        },
        {
          "id": "c",
          "text": "The snail"
        },
        {
          "id": "d",
          "text": "The plant"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Which tank factors are biotic, which are abiotic, and why does the fish need both kinds?",
    "starters": [
      "Biotic factors in the tank",
      "Abiotic factors in the tank",
      "The fish needs both because"
    ],
    "checks": [
      "I named the fish, plant, or snail as biotic.",
      "I named sunlight, water, or temperature as abiotic.",
      "I said gravel is not alive.",
      "I explained why the fish needs both kinds.",
      "I did not call sunlight a living thing."
    ],
    "criteria": [
      "Sort at least one biotic and one abiotic factor correctly.",
      "Explain how the fish depends on both kinds.",
      "Do not call gravel or sunlight biotic."
    ]
  },
  "chain": {
    "title": "Tank line",
    "sourceId": "living",
    "cutId": "abiotic",
    "cutDark": [
      "survive"
    ],
    "stayOn": [
      "living"
    ],
    "cutting": "Taking the nonliving factors away…",
    "cutDone": "No abiotic factors. The fish's survival goes dark.",
    "liveLine": "The line is live. Mark what would fail if the nonliving factors were removed.",
    "fillLine": "The tank line fills in as each paragraph locks.",
    "links": [
      {
        "id": "living",
        "label": "Living things",
        "mark": "🐟",
        "on": "r1"
      },
      {
        "id": "abiotic",
        "label": "Nonliving",
        "mark": "☀️",
        "on": "r2"
      },
      {
        "id": "survive",
        "label": "Survival",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Suppose the nonliving factors were removed. What would fail?",
    "hint": "Mark what goes dark. Then take the abiotic factors away.",
    "switch": "Remove the nonliving factors",
    "choices": [
      {
        "id": "a",
        "text": "The fish's survival",
        "marks": [
          "survive"
        ]
      },
      {
        "id": "b",
        "text": "The fish would no longer count as biotic",
        "marks": [
          "living"
        ]
      },
      {
        "id": "c",
        "text": "Nothing, because a tank needs only living things.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Sunlight would become biotic",
        "marks": [
          "abiotic"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the tank line. Which sentence matches the picture?",
    "image": "/student/tank_line.jpg",
    "choices": [
      {
        "id": "both",
        "text": "A fish and a plant are in water, with sunlight above and gravel below."
      },
      {
        "id": "only",
        "text": "The tank holds a fish and nothing else."
      },
      {
        "id": "brand",
        "text": "The picture shows only a label from a bag of gravel."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the tank line. Which sentence matches the picture?"
  },
  "board": null
};
