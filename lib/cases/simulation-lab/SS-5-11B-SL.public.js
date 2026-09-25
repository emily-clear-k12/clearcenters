// Supply & Price Test — Simulation Lab (animated scene: components/simulation-lab/scenes/strawberry.js).
// TEKS SS 5.11B — evaluate the effects of supply and demand on industry and agriculture,
// including the plantation system, in the United States. Grade 5 Social Studies.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in SS-5-11B-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "SS.5.11B-SL",
  "title": "Supply & Price Test",
  "grade": 5,
  "subject": "Social Studies",
  "system": {
    "title": "Supply & Price Test",
    "framing": "Cadet, a strawberry farm sells its crates at the station market every Saturday. Mission Control wants to know: when the farm brings more crates (more supply), what happens to the price shoppers pay? Stack the crates, open the market, and watch the price.",
    "question": "How does bringing more strawberry crates (more supply) change the market price?"
  },
  "variables": [
    {
      "id": "crates",
      "label": "Crates Available",
      "min": 2,
      "max": 18,
      "step": 2,
      "unit": " crates"
    }
  ],
  "outcome": {
    "id": "price",
    "label": "Price per Crate",
    "unit": "credits",
    "displayMin": 0,
    "displayMax": 50
  },
  "roundOne": {
    "lookupTable": [
      {
        "crates": 2,
        "price": 45
      },
      {
        "crates": 4,
        "price": 40
      },
      {
        "crates": 6,
        "price": 35
      },
      {
        "crates": 8,
        "price": 30
      },
      {
        "crates": 10,
        "price": 25
      },
      {
        "crates": 12,
        "price": 20
      },
      {
        "crates": 14,
        "price": 16
      },
      {
        "crates": 16,
        "price": 12
      },
      {
        "crates": 18,
        "price": 8
      }
    ]
  },
  "roundTwoLabel": "festival week",
  "roundTwo": {
    "conditionChangeDescription": "Festival week! Many more shoppers want strawberries, so demand is higher. Same farm, same numbers of crates. Does your pattern still hold?",
    "lookupTable": [
      {
        "crates": 2,
        "price": 50
      },
      {
        "crates": 4,
        "price": 46
      },
      {
        "crates": 6,
        "price": 42
      },
      {
        "crates": 8,
        "price": 38
      },
      {
        "crates": 10,
        "price": 34
      },
      {
        "crates": 12,
        "price": 30
      },
      {
        "crates": 14,
        "price": 26
      },
      {
        "crates": 16,
        "price": 22
      },
      {
        "crates": 18,
        "price": 18
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to the price as the farm brings more crates?",
      "choices": [
        {
          "id": "increase",
          "text": "The price goes up."
        },
        {
          "id": "decrease",
          "text": "The price goes down."
        },
        {
          "id": "same",
          "text": "The price stays about the same."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "A fair test changes just ONE thing at a time. Which one did YOU change each Saturday?",
      "choices": [
        {
          "id": "farm",
          "text": "Which farm sold the strawberries",
          "icon": "strawberry"
        },
        {
          "id": "shoppers",
          "text": "How many shoppers came",
          "icon": "people"
        },
        {
          "id": "crates",
          "text": "How many crates the farm brought",
          "icon": "crate"
        },
        {
          "id": "market",
          "text": "Which market they sold at",
          "icon": "stand"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 2.5,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "strawberry",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 10,
    "snap": 1,
    "unit": "credits",
    "unitOne": "credit",
    "outcomeAxis": "Price (credits)",
    "variableAxis": "Crates for sale",
    "ghostFormat": "{v} crates",
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
      "type": "festival",
      "banner": "Conditions change!",
      "question": "It's festival week and demand is higher. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "As the supply of crates went up, the price ___.",
    "With ___ crates for sale, the price was ___ credits.",
    "During festival week demand was higher, so prices were ___, but more supply still ___.",
    "This shows that supply and demand together affect ___."
  ],
  "generalizePrompt": "What happens to the price as the supply of strawberry crates increases? Cite your data and explain using supply and demand. Compare both rounds if you can.",
  "selfCheckQuestions": [
    "I described how supply affected price.",
    "I cited real numbers from my chart.",
    "I explained what higher demand did during festival week.",
    "I used the words supply and demand correctly."
  ]
};
