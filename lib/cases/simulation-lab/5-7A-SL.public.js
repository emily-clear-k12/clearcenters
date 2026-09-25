// Tug Balance Test — Simulation Lab (animated scene: components/simulation-lab/scenes/tug.js).
// TEKS 5.7A — investigate and explain how equal and unequal forces acting on an object cause
// patterns of motion and transfer of energy. Grade 5 Science.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 5-7A-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "5.7A-SL",
  "title": "Tug Balance Test",
  "grade": 5,
  "subject": "Science",
  "system": {
    "title": "Tug Balance Test",
    "framing": "Cadet, Mission Control tests cargo carts with a winch pulling on each side. When one side pulls harder than the other, does a bigger force difference change how far the cart rolls? Set the pulls, let go, and find the pattern.",
    "question": "How does a bigger unbalanced force (force difference) change how far the cart rolls?"
  },
  "variables": [
    {
      "id": "diff",
      "label": "Force Difference",
      "min": 0,
      "max": 8,
      "step": 1,
      "unit": " N"
    }
  ],
  "outcome": {
    "id": "distance",
    "label": "Distance Rolled",
    "unit": "m",
    "displayMin": 0,
    "displayMax": 24
  },
  "roundOne": {
    "lookupTable": [
      {
        "diff": 0,
        "distance": 0
      },
      {
        "diff": 1,
        "distance": 3
      },
      {
        "diff": 2,
        "distance": 6
      },
      {
        "diff": 3,
        "distance": 9
      },
      {
        "diff": 4,
        "distance": 12
      },
      {
        "diff": 5,
        "distance": 15
      },
      {
        "diff": 6,
        "distance": 18
      },
      {
        "diff": 7,
        "distance": 21
      },
      {
        "diff": 8,
        "distance": 24
      }
    ]
  },
  "roundTwoLabel": "heavier cart",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control loaded extra cargo, so the cart is heavier now. Same winches, same force differences. Does your pattern still hold?",
    "lookupTable": [
      {
        "diff": 0,
        "distance": 0
      },
      {
        "diff": 1,
        "distance": 2
      },
      {
        "diff": 2,
        "distance": 4
      },
      {
        "diff": 3,
        "distance": 6
      },
      {
        "diff": 4,
        "distance": 8
      },
      {
        "diff": 5,
        "distance": 10
      },
      {
        "diff": 6,
        "distance": 12
      },
      {
        "diff": 7,
        "distance": 14
      },
      {
        "diff": 8,
        "distance": 16
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to how far the cart rolls as the force difference gets bigger?",
      "choices": [
        {
          "id": "increase",
          "text": "It rolls farther."
        },
        {
          "id": "decrease",
          "text": "It rolls a shorter distance."
        },
        {
          "id": "same",
          "text": "It rolls about the same distance."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "Scientists change just ONE thing at a time. Which one did YOU change between tests?",
      "choices": [
        {
          "id": "cart",
          "text": "Which cart we used",
          "icon": "cart"
        },
        {
          "id": "diff",
          "text": "How much harder one side pulled",
          "icon": "rope"
        },
        {
          "id": "track",
          "text": "Which track the cart rolled on",
          "icon": "surface"
        },
        {
          "id": "cargo",
          "text": "How much cargo was in the cart",
          "icon": "weight"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 1.2,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "tug",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 4,
    "snap": 1,
    "unit": "m",
    "outcomeAxis": "Distance (m)",
    "variableAxis": "Force difference (N)",
    "ghostFormat": "{v} N",
    "checkpointIds": [
      "cp1",
      "fair"
    ],
    "choiceIcons": {
      "cp1": {
        "increase": "up",
        "decrease": "down",
        "same": "flat"
      }
    },
    "twist": {
      "type": "heavyCart",
      "banner": "Conditions change!",
      "question": "The cart is heavier now. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "As the force difference got bigger, the cart ___.",
    "At ___ N difference, it rolled ___ m.",
    "When the forces were balanced (0 N difference), the cart ___.",
    "With the heavier cart, the same force difference ___."
  ],
  "generalizePrompt": "What happens to the cart as the unbalanced force (force difference) gets bigger? Cite your data, explain what happened when the forces were balanced, and compare both rounds if you can.",
  "selfCheckQuestions": [
    "I described the pattern between force difference and distance.",
    "I cited real numbers from my chart.",
    "I explained what balanced forces do.",
    "I compared the light cart and the heavy cart."
  ]
};
