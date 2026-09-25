// Rubber Band Launch — Simulation Lab (animated scene: components/simulation-lab/scenes/launcher.js).
// TEKS 3.8A — identify everyday examples of energy, including light, sound, thermal, and
// mechanical. A stretched rubber band stores mechanical energy that becomes motion. Grade 3 Science.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 3-8A-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "3.8A-SL",
  "title": "Rubber Band Launch",
  "grade": 3,
  "subject": "Science",
  "system": {
    "title": "Rubber Band Launch",
    "framing": "Cadet, Mission Control launches tiny supply pods with a rubber band. Does pulling the band farther back change how far the pod flies? Stretch, launch, and find the pattern.",
    "question": "How does stretching the rubber band farther change how far the pod flies?"
  },
  "variables": [
    {
      "id": "stretch",
      "label": "Stretch Distance",
      "min": 2,
      "max": 18,
      "step": 2,
      "unit": " cm"
    }
  ],
  "outcome": {
    "id": "flight",
    "label": "Flight Distance",
    "unit": "cm",
    "displayMin": 0,
    "displayMax": 90
  },
  "roundOne": {
    "lookupTable": [
      {
        "stretch": 2,
        "flight": 10
      },
      {
        "stretch": 4,
        "flight": 20
      },
      {
        "stretch": 6,
        "flight": 30
      },
      {
        "stretch": 8,
        "flight": 40
      },
      {
        "stretch": 10,
        "flight": 50
      },
      {
        "stretch": 12,
        "flight": 60
      },
      {
        "stretch": 14,
        "flight": 70
      },
      {
        "stretch": 16,
        "flight": 80
      },
      {
        "stretch": 18,
        "flight": 90
      }
    ]
  },
  "roundTwoLabel": "heavier pod",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control swapped in a heavier supply pod. Same rubber band, same stretches. Does your pattern still hold?",
    "lookupTable": [
      {
        "stretch": 2,
        "flight": 6
      },
      {
        "stretch": 4,
        "flight": 12
      },
      {
        "stretch": 6,
        "flight": 18
      },
      {
        "stretch": 8,
        "flight": 24
      },
      {
        "stretch": 10,
        "flight": 30
      },
      {
        "stretch": 12,
        "flight": 36
      },
      {
        "stretch": 14,
        "flight": 42
      },
      {
        "stretch": 16,
        "flight": 48
      },
      {
        "stretch": 18,
        "flight": 54
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to how far the pod flies as you stretch the band farther?",
      "choices": [
        {
          "id": "increase",
          "text": "It flies farther."
        },
        {
          "id": "decrease",
          "text": "It flies a shorter distance."
        },
        {
          "id": "same",
          "text": "It flies about the same distance."
        }
      ]
    },
    {
      "id": "fair",
      "type": "mc",
      "sceneOnly": true,
      "prompt": "Scientists change just ONE thing at a time. Which one did YOU change between launches?",
      "choices": [
        {
          "id": "band",
          "text": "Which rubber band we used",
          "icon": "band"
        },
        {
          "id": "stretch",
          "text": "How far the band was stretched",
          "icon": "distance"
        },
        {
          "id": "pod",
          "text": "Which pod we launched",
          "icon": "pod"
        },
        {
          "id": "launcher",
          "text": "Where the launcher sat",
          "icon": "start"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 4.5,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "launcher",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 10,
    "snap": 2,
    "unit": "cm",
    "outcomeAxis": "Flight (cm)",
    "variableAxis": "Stretch (cm)",
    "ghostFormat": "{v} cm pull",
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
      "type": "heavyPod",
      "banner": "Conditions change!",
      "question": "This pod is heavier. Does your pattern still hold?"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "When I stretched the band farther, the pod flew ___.",
    "At ___ cm of stretch, the pod flew ___ cm.",
    "A stretched band stores ___ energy that turns into motion."
  ],
  "generalizePrompt": "What happens to how far the pod flies when you stretch the rubber band farther? Use one real launch from your chart, and name the kind of energy the band stores.",
  "selfCheckQuestions": [
    "I said what happens to the flight when the stretch gets bigger.",
    "I used one real example (a stretch and a flight distance).",
    "I named the energy (mechanical energy).",
    "I read my sentence again before sending it."
  ]
};
