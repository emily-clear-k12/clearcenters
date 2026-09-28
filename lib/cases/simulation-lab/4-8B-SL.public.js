// Insulation Wrap Test — Simulation Lab (animated scene: components/simulation-lab/scenes/mug.js).
// TEKS 4.8B — identify conductors and insulators of thermal and electrical energy. Grade 4 Science.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 4-8B-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "4.8B-SL",
  "title": "Insulation Wrap Test",
  "grade": 4,
  "subject": "Science",
  "system": {
    "title": "Insulation Wrap Test",
    "framing": "Cadet, Mission Control needs cocoa to stay hot during a long briefing. Does wrapping the mug in more layers of insulation change how long it stays hot? Wrap the mug, start the timer, and find the pattern.",
    "question": "How does adding more insulation layers change how long the mug stays hot?"
  },
  "variables": [
    {
      "id": "layers",
      "label": "Insulation Layers",
      "min": 0,
      "max": 8,
      "step": 1,
      "unit": " layers"
    }
  ],
  "outcome": {
    "id": "minutes",
    "label": "Minutes Hot",
    "unit": "min",
    "displayMin": 0,
    "displayMax": 40
  },
  "roundOne": {
    "lookupTable": [
      {
        "layers": 0,
        "minutes": 5
      },
      {
        "layers": 1,
        "minutes": 8
      },
      {
        "layers": 2,
        "minutes": 12
      },
      {
        "layers": 3,
        "minutes": 16
      },
      {
        "layers": 4,
        "minutes": 20
      },
      {
        "layers": 5,
        "minutes": 24
      },
      {
        "layers": 6,
        "minutes": 28
      },
      {
        "layers": 7,
        "minutes": 32
      },
      {
        "layers": 8,
        "minutes": 36
      }
    ]
  },
  "roundTwoLabel": "breezy room",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control turned on a strong fan, so the room is breezy now. Same mug, same wraps. Does your pattern still hold?",
    "lookupTable": [
      {
        "layers": 0,
        "minutes": 3
      },
      {
        "layers": 1,
        "minutes": 5
      },
      {
        "layers": 2,
        "minutes": 8
      },
      {
        "layers": 3,
        "minutes": 11
      },
      {
        "layers": 4,
        "minutes": 14
      },
      {
        "layers": 5,
        "minutes": 17
      },
      {
        "layers": 6,
        "minutes": 20
      },
      {
        "layers": 7,
        "minutes": 23
      },
      {
        "layers": 8,
        "minutes": 26
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to how long the mug stays hot as you add more layers?",
      "choices": [
        {
          "id": "increase",
          "text": "It stays hot longer."
        },
        {
          "id": "decrease",
          "text": "It cools off sooner."
        },
        {
          "id": "same",
          "text": "It stays hot about the same time."
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
          "id": "mug",
          "text": "Which mug we used",
          "icon": "mug"
        },
        {
          "id": "cocoa",
          "text": "How much cocoa was poured in",
          "icon": "water"
        },
        {
          "id": "room",
          "text": "Which room we tested in",
          "icon": "breeze"
        },
        {
          "id": "layers",
          "text": "How many layers were wrapped on",
          "icon": "layers"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 2.0,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "mug",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 4,
    "snap": 1,
    "unit": "min",
    "outcomeAxis": "Minutes hot",
    "variableAxis": "Layers",
    "ghostFormat": "{v} layers",
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
      "type": "breezy",
      "banner": "Conditions change!",
      "question": "The room is breezy now. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "As I added more insulation layers, the mug stayed hot ___.",
    "With ___ layers, it stayed hot for ___ minutes.",
    "Insulation slows down ___ energy leaving the mug."
  ],
  "generalizePrompt": "What happens to how long the mug stays hot as you add more insulation layers? Use one real test and explain why.",
  "selfCheckQuestions": [
    "I said what happens when more layers are added.",
    "I used one real example (layers and minutes).",
    "I explained why, using the word insulator or insulation.",
    "I read my answer again before sending it."
  ]
};
