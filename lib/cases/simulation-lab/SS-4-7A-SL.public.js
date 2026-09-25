// Settlement Distance Test — Simulation Lab (animated scene: components/simulation-lab/scenes/settlement.js).
// TEKS SS 4.7A — explain the geographic factors such as landforms and climate that influence
// patterns of settlement and the distribution of population in Texas, past and present.
// Grade 4 Social Studies. Re-coded Sept 25 2026 from the WIP SS.4.6B (4.6B is comparing
// the physical regions of Texas). Round 2 data also fixed: 'rockier land farther out' must
// make the drop-off STEEPER with distance, not the same slope lower down.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in SS-4-7A-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "SS.4.7A-SL",
  "title": "Settlement Distance Test",
  "grade": 4,
  "subject": "Social Studies",
  "system": {
    "title": "Settlement Distance Test",
    "framing": "Cadet, it is the 1800s and families are looking for land in Texas. Mission Control's map shows a river and land stretching away from it. Does a site's distance from the river change how many families choose to settle there? Pick a site and watch the wagons roll in.",
    "question": "How does a site's distance from the river change how many families settle there?"
  },
  "variables": [
    {
      "id": "miles",
      "label": "Miles from River",
      "min": 1,
      "max": 9,
      "step": 1,
      "unit": " mi"
    }
  ],
  "outcome": {
    "id": "families",
    "label": "Settler Families",
    "unit": "families",
    "displayMin": 0,
    "displayMax": 40
  },
  "roundOne": {
    "lookupTable": [
      {
        "miles": 1,
        "families": 36
      },
      {
        "miles": 2,
        "families": 32
      },
      {
        "miles": 3,
        "families": 28
      },
      {
        "miles": 4,
        "families": 24
      },
      {
        "miles": 5,
        "families": 20
      },
      {
        "miles": 6,
        "families": 16
      },
      {
        "miles": 7,
        "families": 12
      },
      {
        "miles": 8,
        "families": 8
      },
      {
        "miles": 9,
        "families": 4
      }
    ]
  },
  "roundTwoLabel": "rocky land",
  "roundTwo": {
    "conditionChangeDescription": "New survey: the land gets rockier and harder to farm the farther it is from the river. Same river, same sites. Does your pattern still hold?",
    "lookupTable": [
      {
        "miles": 1,
        "families": 34
      },
      {
        "miles": 2,
        "families": 29
      },
      {
        "miles": 3,
        "families": 24
      },
      {
        "miles": 4,
        "families": 19
      },
      {
        "miles": 5,
        "families": 14
      },
      {
        "miles": 6,
        "families": 10
      },
      {
        "miles": 7,
        "families": 6
      },
      {
        "miles": 8,
        "families": 3
      },
      {
        "miles": 9,
        "families": 1
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to the number of families as a site gets farther from the river?",
      "choices": [
        {
          "id": "increase",
          "text": "More families settle there."
        },
        {
          "id": "decrease",
          "text": "Fewer families settle there."
        },
        {
          "id": "same",
          "text": "About the same number settle there."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "A fair test changes just ONE thing at a time. Which one did YOU change between tests?",
      "choices": [
        {
          "id": "river",
          "text": "Which river was on the map",
          "icon": "river"
        },
        {
          "id": "miles",
          "text": "How far the site was from the river",
          "icon": "distance"
        },
        {
          "id": "wagons",
          "text": "How many wagons came looking",
          "icon": "wagon"
        },
        {
          "id": "year",
          "text": "What year it was",
          "icon": "calendar"
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
    "id": "settlement",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 5,
    "snap": 1,
    "unit": "families",
    "unitOne": "family",
    "outcomeAxis": "Families",
    "variableAxis": "Miles from river",
    "ghostFormat": "{v} mi",
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
      "type": "rocky",
      "banner": "Conditions change!",
      "question": "The land farther out is rocky. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "As a site got farther from the river, the number of families ___.",
    "At ___ miles, ___ families settled there.",
    "People settled near rivers because ___.",
    "When the land farther out was rocky, ___."
  ],
  "generalizePrompt": "What happens to the number of settler families as a site gets farther from the river? Use one real test and explain why geography matters.",
  "selfCheckQuestions": [
    "I described the pattern between distance and families.",
    "I used one real example (miles and families).",
    "I explained why rivers matter (water, farming, travel).",
    "I read my answer again before sending it."
  ]
};
