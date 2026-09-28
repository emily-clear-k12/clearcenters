// Particle Dissolve Race — Simulation Lab (animated scene: components/simulation-lab/scenes/dissolveRace.js).
// TEKS 5.6C — compare the properties of substances before and after they are combined into a
// solution and demonstrate that matter is conserved in solutions. Grade 5 Science.
// The scene's scale shows the total mass of the salt + water staying the same while the salt
// seems to disappear (conservation); the variable is how finely the salt is ground.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 5-6C-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "5.6C-SL",
  "title": "Particle Dissolve Race",
  "grade": 5,
  "subject": "Science",
  "system": {
    "title": "Particle Dissolve Race",
    "framing": "Cadet, Mission Control needs salt dissolved into the hydroponics tanks fast. Does grinding the salt into finer particles change how quickly it dissolves? And when the salt seems to vanish, is it really gone? Grind, pour, time it, and watch the scale.",
    "question": "How does grinding the salt finer change how long it takes to dissolve?"
  },
  "variables": [
    {
      "id": "fineness",
      "label": "Grind Level",
      "min": 1,
      "max": 9,
      "step": 1,
      "unit": ""
    }
  ],
  "outcome": {
    "id": "seconds",
    "label": "Seconds to Dissolve",
    "unit": "s",
    "displayMin": 0,
    "displayMax": 100
  },
  "roundOne": {
    "lookupTable": [
      {
        "fineness": 1,
        "seconds": 90
      },
      {
        "fineness": 2,
        "seconds": 78
      },
      {
        "fineness": 3,
        "seconds": 66
      },
      {
        "fineness": 4,
        "seconds": 55
      },
      {
        "fineness": 5,
        "seconds": 45
      },
      {
        "fineness": 6,
        "seconds": 36
      },
      {
        "fineness": 7,
        "seconds": 28
      },
      {
        "fineness": 8,
        "seconds": 20
      },
      {
        "fineness": 9,
        "seconds": 12
      }
    ]
  },
  "roundTwoLabel": "colder water",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control chilled the water. Same salt, same grind levels. Does your pattern still hold?",
    "lookupTable": [
      {
        "fineness": 1,
        "seconds": 100
      },
      {
        "fineness": 2,
        "seconds": 88
      },
      {
        "fineness": 3,
        "seconds": 76
      },
      {
        "fineness": 4,
        "seconds": 65
      },
      {
        "fineness": 5,
        "seconds": 55
      },
      {
        "fineness": 6,
        "seconds": 46
      },
      {
        "fineness": 7,
        "seconds": 38
      },
      {
        "fineness": 8,
        "seconds": 30
      },
      {
        "fineness": 9,
        "seconds": 22
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to the dissolving time as the salt is ground finer?",
      "choices": [
        {
          "id": "increase",
          "text": "It takes more time."
        },
        {
          "id": "decrease",
          "text": "It takes less time."
        },
        {
          "id": "same",
          "text": "It takes about the same time."
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
          "id": "salt",
          "text": "How much salt we used",
          "icon": "salt"
        },
        {
          "id": "water",
          "text": "How much water was in the beaker",
          "icon": "water"
        },
        {
          "id": "grind",
          "text": "How finely the salt was ground",
          "icon": "grind"
        },
        {
          "id": "stir",
          "text": "How fast we stirred",
          "icon": "spoon"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 5.0,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "dissolveRace",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 5,
    "snap": 1,
    "unit": "s",
    "outcomeAxis": "Seconds to dissolve",
    "variableAxis": "Grind level",
    "ghostFormat": "Grind {v}",
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
      "type": "colderWater",
      "banner": "Conditions change!",
      "question": "The water is colder now. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "As the salt was ground finer, the dissolving time ___.",
    "At grind level ___, it took ___ seconds.",
    "Finer pieces have more surface touching the water, so ___.",
    "The scale showed the same total mass, so the salt was ___."
  ],
  "generalizePrompt": "What happens to the dissolving time as the salt is ground finer? Cite your data, explain why, and use the scale to say whether the salt was really gone. You may compare both rounds.",
  "selfCheckQuestions": [
    "I described the pattern between grind level and time.",
    "I cited real numbers from my chart.",
    "I explained why finer salt dissolves faster.",
    "I used the scale to explain that the salt was still there."
  ]
};
