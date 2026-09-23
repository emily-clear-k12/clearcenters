// Safe to import from client components.
// Assembly Deck — 5.12B-AD. TEKS 5.12B — a change in an ecosystem changes matter cycling and energy flow in a food web.

export const PUBLIC_CASE = {
  "standard": "5.12B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Science",
  "title": "The Bay After the Storm",
  "estimatedMinutes": 20,
  "brief": [
    "A storm tore out most of the marsh grass in the bay.",
    "Before that, energy moved from the Sun to the grass, the fish, and the herons.",
    "Build the log. Then say what the counts do next. A guess about next year is not in the notes."
  ],
  "source": {
    "title": "BAY NOTES",
    "lines": [
      "Before the storm: marsh grass, small fish, and herons.",
      "The Sun's energy entered the web through the grass. Grass is a producer.",
      "Fish ate the grass. Herons ate the fish.",
      "The storm tore out most of the marsh grass.",
      "Later counts: fewer fish, and fewer herons.",
      "The matter in the torn grass was not destroyed. The path that carried energy to the fish was broken."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The web before the storm",
      "goal": "Build the paragraph that traces energy through the bay before the storm.",
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
          "hint": "Where the energy entered, and who ate what",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of path this was",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The Sun's energy entered through the marsh grass."
        },
        {
          "id": "r1p5",
          "text": "The herons made the energy. The Sun was not involved."
        },
        {
          "id": "r1p1",
          "text": "Before the storm, energy moved through a food web in the bay."
        },
        {
          "id": "r1p6",
          "text": "The fish ate the herons, and the grass ate the fish."
        },
        {
          "id": "r1p3",
          "text": "Fish ate the grass, and herons ate the fish."
        },
        {
          "id": "r1p4",
          "text": "The grass was the producer that carried energy into the web."
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
      "id": "r2",
      "label": "What the storm changed",
      "goal": "Build the paragraph that reports the change and the new counts.",
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
          "hint": "What was torn out, and what the counts showed",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Which part of the path broke",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "It tore out most of the marsh grass."
        },
        {
          "id": "r2p5",
          "text": "The counts went up for every animal."
        },
        {
          "id": "r2p1",
          "text": "The storm changed the start of the food web."
        },
        {
          "id": "r2p6",
          "text": "The storm added a new producer that the notes describe in detail."
        },
        {
          "id": "r2p3",
          "text": "Later counts showed fewer fish and fewer herons."
        },
        {
          "id": "r2p4",
          "text": "The energy path broke where the producer used to be."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "story"
      ]
    },
    {
      "id": "r3",
      "label": "Energy and matter after",
      "goal": "Build the paragraph that says what the change means for energy and matter.",
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
          "hint": "What happened to the energy flow, and what happened to the matter",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a prediction has to be based on",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Less grass means less energy moving on to the fish and the herons."
        },
        {
          "id": "r3p5",
          "text": "Next year the herons will double because storms are lucky."
        },
        {
          "id": "r3p1",
          "text": "The later web has less energy coming in, but the matter was not destroyed."
        },
        {
          "id": "r3p6",
          "text": "I felt sad about the bay, so the fish must be gone forever."
        },
        {
          "id": "r3p3",
          "text": "The matter in the torn grass is still matter. It was not erased."
        },
        {
          "id": "r3p4",
          "text": "A fair prediction follows that broken path. It does not invent a new one."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "opinion",
        "contradicts",
        "story"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three paragraphs, one log. What order should the crew read them in?",
    "hint": "A reader needs the web, then the storm, before a prediction makes sense.",
    "slots": [
      {
        "id": "first",
        "label": "Opens the log"
      },
      {
        "id": "second",
        "label": "Middle paragraph"
      },
      {
        "id": "third",
        "label": "Closes the log"
      }
    ]
  },
  "debrief": {
    "pinpoint": {
      "prompt": "One sentence says less grass means less energy moving on to the fish and the herons. Tap that sentence.",
      "hint": "Look in the paragraph about energy and matter after the storm."
    },
    "quickCheck": {
      "prompt": "The storm removes most of the marsh grass. What is the fair prediction?",
      "choices": [
        {
          "id": "a",
          "text": "Less energy reaches the fish and the herons, so their counts drop"
        },
        {
          "id": "b",
          "text": "The herons make more energy, so every count goes up"
        },
        {
          "id": "c",
          "text": "The matter in the grass is destroyed"
        },
        {
          "id": "d",
          "text": "The fish start eating the herons"
        }
      ]
    }
  },
  "explain": {
    "prompt": "The chief has one more question. What happens to the flow of energy when the marsh grass is torn out, and what happens to the matter?",
    "starters": [
      "The grass",
      "Energy",
      "The fish and the herons",
      "The matter"
    ],
    "checks": [
      "I answered both parts of the question.",
      "I said energy entered through the grass.",
      "I said the fish or the herons get less energy.",
      "I said the matter was not destroyed.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say energy flowed from the Sun through the grass to the fish and herons.",
      "Say less grass means less energy reaches the animals, so counts drop.",
      "Say the matter was not destroyed."
    ]
  },
  "chain": {
    "title": "Bay line",
    "sourceId": "sun",
    "cutId": "grass",
    "cutDark": [
      "fish",
      "heron"
    ],
    "stayOn": [
      "sun"
    ],
    "cutting": "Tearing out the marsh grass…",
    "cutDone": "Grass gone. The fish and the herons go dark.",
    "liveLine": "The line is live. Mark what fails if the grass is gone.",
    "fillLine": "The bay line fills in as each paragraph locks.",
    "links": [
      {
        "id": "sun",
        "label": "Sun",
        "mark": "☀️",
        "on": "r1"
      },
      {
        "id": "grass",
        "label": "Grass",
        "mark": "🌿",
        "on": "r1"
      },
      {
        "id": "fish",
        "label": "Fish",
        "mark": "🐟",
        "on": "r2"
      },
      {
        "id": "heron",
        "label": "Herons",
        "mark": "🪶",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Remove the marsh grass. What fails?",
    "hint": "Mark the part you think goes dark. Then remove the grass.",
    "switch": "Remove the grass",
    "choices": [
      {
        "id": "a",
        "text": "The fish and the herons",
        "marks": [
          "fish",
          "heron"
        ]
      },
      {
        "id": "b",
        "text": "The Sun goes out",
        "marks": [
          "sun"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The animals make their own energy.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "Only the fish, and the herons get more",
        "marks": [
          "fish"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the bay line. Which sentence matches the picture?",
    "image": "/student/bay_line.jpg",
    "choices": [
      {
        "id": "web",
        "text": "Energy moves from the Sun to the grass, then to the fish, then to the heron."
      },
      {
        "id": "back",
        "text": "The heron makes the energy, and the grass eats the fish."
      },
      {
        "id": "lucky",
        "text": "The storm is drawn in, and every animal count is going up."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p6",
    "prompt": "Look at the bay line. Which sentence matches the picture?"
  },
  "board": null
};
