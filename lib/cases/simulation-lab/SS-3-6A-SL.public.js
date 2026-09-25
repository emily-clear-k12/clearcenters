// Market Price Test — Simulation Lab (animated scene: components/simulation-lab/scenes/market.js).
// TEKS SS 3.6A — explain how supply and demand affect the price of a good or service.
// Grade 3 Social Studies. Re-coded Sept 25 2026 from the WIP SS.3.6C: 3.6C is cost of
// production + selling price -> profit; this case is about price and how many people want to
// buy (demand), which is 3.6A.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in SS-3-6A-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "SS.3.6A-SL",
  "title": "Market Price Test",
  "grade": 3,
  "subject": "Social Studies",
  "system": {
    "title": "Market Price Test",
    "framing": "Cadet, the station market stand sells fruit cups. Mission Control wants to know: does the price change how many people buy a fruit cup in an hour? Set the price, open the stand, and count the buyers.",
    "question": "How does raising the price change how many people buy a fruit cup in an hour?"
  },
  "variables": [
    {
      "id": "price",
      "label": "Price",
      "min": 50,
      "max": 250,
      "step": 25,
      "unit": "¢"
    }
  ],
  "outcome": {
    "id": "buyers",
    "label": "Buyers per Hour",
    "unit": "buyers",
    "displayMin": 0,
    "displayMax": 40
  },
  "roundOne": {
    "lookupTable": [
      {
        "price": 50,
        "buyers": 36
      },
      {
        "price": 75,
        "buyers": 32
      },
      {
        "price": 100,
        "buyers": 28
      },
      {
        "price": 125,
        "buyers": 24
      },
      {
        "price": 150,
        "buyers": 20
      },
      {
        "price": 175,
        "buyers": 16
      },
      {
        "price": 200,
        "buyers": 12
      },
      {
        "price": 225,
        "buyers": 8
      },
      {
        "price": 250,
        "buyers": 4
      }
    ]
  },
  "roundTwoLabel": "rainy recess",
  "roundTwo": {
    "conditionChangeDescription": "Rain! Fewer Cadets are outside near the stand. Same fruit cups, same prices. Does your pattern still hold?",
    "lookupTable": [
      {
        "price": 50,
        "buyers": 28
      },
      {
        "price": 75,
        "buyers": 24
      },
      {
        "price": 100,
        "buyers": 20
      },
      {
        "price": 125,
        "buyers": 16
      },
      {
        "price": 150,
        "buyers": 12
      },
      {
        "price": 175,
        "buyers": 9
      },
      {
        "price": 200,
        "buyers": 6
      },
      {
        "price": 225,
        "buyers": 3
      },
      {
        "price": 250,
        "buyers": 1
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to the number of buyers as the price goes up?",
      "choices": [
        {
          "id": "increase",
          "text": "More people buy."
        },
        {
          "id": "decrease",
          "text": "Fewer people buy."
        },
        {
          "id": "same",
          "text": "About the same number buy."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "A fair test changes just ONE thing at a time. Which one did YOU change each hour?",
      "choices": [
        {
          "id": "fruit",
          "text": "What was in the fruit cups",
          "icon": "fruit"
        },
        {
          "id": "stand",
          "text": "Where the stand was",
          "icon": "stand"
        },
        {
          "id": "time",
          "text": "How long the stand was open",
          "icon": "clock"
        },
        {
          "id": "price",
          "text": "The price of a fruit cup",
          "icon": "price"
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
    "id": "market",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 150,
    "snap": 1,
    "unit": "buyers",
    "unitOne": "buyer",
    "outcomeAxis": "Buyers per hour",
    "variableAxis": "Price",
    "tickSuffix": "¢",
    "ghostFormat": "{v}¢",
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
      "type": "rain",
      "banner": "Conditions change!",
      "question": "It's raining at recess. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "When the price went up, the number of buyers ___.",
    "At ___¢, there were ___ buyers in an hour.",
    "People buy less when the price is ___."
  ],
  "generalizePrompt": "What happens to the number of buyers when the price goes up? Use one real hour from your chart.",
  "selfCheckQuestions": [
    "I said what happens to buyers when the price goes up.",
    "I used one real example (a price and a number of buyers).",
    "I used the words price and buyers.",
    "I read my sentence again before sending it."
  ]
};
