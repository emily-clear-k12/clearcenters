// Motion Path Test — Simulation Lab (animated scene: components/simulation-lab/scenes/crate.js).
// TEKS 3.7B — plan and conduct a descriptive investigation to demonstrate and explain how
// position and motion can be changed by pushing and pulling objects. Grade 3 Science.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 3-7B-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "3.7B-SL",
  "title": "Motion Path Test",
  "grade": 3,
  "subject": "Science",
  "system": {
    "title": "Motion Path Test",
    "framing": "Cadet, Mission Control pushes supply crates down a smooth hallway. Does a stronger push change how far a crate slides before it stops? Push the crate, watch where it stops, and find the pattern.",
    "question": "How does a stronger push change how far the crate slides?"
  },
  "variables": [
    {
      "id": "push",
      "label": "Push Strength",
      "min": 1,
      "max": 9,
      "step": 1,
      "unit": ""
    }
  ],
  "outcome": {
    "id": "distance",
    "label": "Distance Slid",
    "unit": "floor tiles",
    "displayMin": 0,
    "displayMax": 18
  },
  "roundOne": {
    "lookupTable": [
      {
        "push": 1,
        "distance": 2
      },
      {
        "push": 2,
        "distance": 4
      },
      {
        "push": 3,
        "distance": 6
      },
      {
        "push": 4,
        "distance": 8
      },
      {
        "push": 5,
        "distance": 10
      },
      {
        "push": 6,
        "distance": 12
      },
      {
        "push": 7,
        "distance": 14
      },
      {
        "push": 8,
        "distance": 16
      },
      {
        "push": 9,
        "distance": 18
      }
    ]
  },
  "roundTwoLabel": "carpet floor",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control rolled carpet over the hallway floor. Same crate, same pushes. Does your pattern still hold?",
    "lookupTable": [
      {
        "push": 1,
        "distance": 1
      },
      {
        "push": 2,
        "distance": 2
      },
      {
        "push": 3,
        "distance": 3
      },
      {
        "push": 4,
        "distance": 4
      },
      {
        "push": 5,
        "distance": 5
      },
      {
        "push": 6,
        "distance": 6
      },
      {
        "push": 7,
        "distance": 7
      },
      {
        "push": 8,
        "distance": 8
      },
      {
        "push": 9,
        "distance": 9
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to how far the crate slides as the push gets stronger?",
      "choices": [
        {
          "id": "increase",
          "text": "It slides farther."
        },
        {
          "id": "decrease",
          "text": "It slides a shorter distance."
        },
        {
          "id": "same",
          "text": "It slides about the same distance."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "Scientists change just ONE thing at a time. Which one did YOU change between pushes?",
      "choices": [
        {
          "id": "crate",
          "text": "Which crate we pushed",
          "icon": "crate"
        },
        {
          "id": "floor",
          "text": "What the floor was made of",
          "icon": "floor"
        },
        {
          "id": "push",
          "text": "How hard the crate was pushed",
          "icon": "push"
        },
        {
          "id": "start",
          "text": "Where the crate started",
          "icon": "start"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 0.9,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "crate",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 5,
    "snap": 1,
    "unit": "tiles",
    "unitOne": "tile",
    "outcomeAxis": "Tiles slid",
    "variableAxis": "Push strength",
    "ghostFormat": "Push {v}",
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
      "type": "carpet",
      "banner": "Conditions change!",
      "question": "The floor is carpet now. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "When the push got stronger, the crate slid ___.",
    "At push strength ___, the crate slid ___ floor tiles.",
    "Even on carpet, a stronger push still ___."
  ],
  "generalizePrompt": "What happens to how far the crate slides as the push gets stronger? Use one real push from your chart.",
  "selfCheckQuestions": [
    "I said what happens to the slide when the push gets stronger.",
    "I used one real example (a push strength and how many tiles).",
    "I used the word push or force.",
    "I read my sentence again before sending it."
  ]
};
