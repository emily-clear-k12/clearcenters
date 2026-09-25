// Seasons Shadow Track — Simulation Lab (animated scene: components/simulation-lab/scenes/shadow.js).
// TEKS 4.9A — collect and analyze data to identify sequences and predict patterns of change in
// seasons such as change in temperature and length of daylight. Grade 4 Science.
// Re-framed Sept 25 2026 from the WIP "Morning Shadow Track" (time of morning): daily shadows
// are Grade 5 (5.9, already a live case). Here the pattern is SEASONAL: the noon Sun climbs
// higher from winter to summer, so the noon shadow shrinks. Lengths are real noon shadows for a
// 6 ft / 10 ft pole at about 30° N (central Texas), rounded to the nearest half foot.
//
// PUBLIC case file: safe to import from client code. The lookup tables are the
// case's "physics" (what the scene shows), not a secret. Answer keys and
// feedback live ONLY in 4-9A-SL.server.js. Authored Sept 25 2026 in the
// scene format (ClearCenters_STATE.md §9 rule 22, components/simulation-lab/README.md).

export const PUBLIC_CASE = {
  "standard": "4.9A-SL",
  "title": "Seasons Shadow Track",
  "grade": 4,
  "subject": "Science",
  "system": {
    "title": "Seasons Shadow Track",
    "framing": "Cadet, Mission Control measures the flagpole's shadow at noon on the 15th of every month, from December to June. Does the noon shadow change as the seasons change? Pick a month, let the Sun shine, and find the pattern.",
    "question": "From winter to summer, how does the flagpole's noon shadow change?"
  },
  "variables": [
    {
      "id": "month",
      "label": "Month",
      "min": 0,
      "max": 6,
      "step": 1,
      "unit": ""
    }
  ],
  "outcome": {
    "id": "shadow",
    "label": "Noon Shadow Length",
    "unit": "ft",
    "displayMin": 0,
    "displayMax": 15
  },
  "roundOne": {
    "lookupTable": [
      {
        "month": 0,
        "shadow": 8
      },
      {
        "month": 1,
        "shadow": 7.5
      },
      {
        "month": 2,
        "shadow": 5.5
      },
      {
        "month": 3,
        "shadow": 4
      },
      {
        "month": 4,
        "shadow": 2
      },
      {
        "month": 5,
        "shadow": 1
      },
      {
        "month": 6,
        "shadow": 0.5
      }
    ]
  },
  "roundTwoLabel": "taller pole",
  "roundTwo": {
    "conditionChangeDescription": "Mission Control put up a taller flagpole. Same months, same noon Sun. Does your pattern still hold?",
    "lookupTable": [
      {
        "month": 0,
        "shadow": 13.5
      },
      {
        "month": 1,
        "shadow": 12.5
      },
      {
        "month": 2,
        "shadow": 9.5
      },
      {
        "month": 3,
        "shadow": 6.5
      },
      {
        "month": 4,
        "shadow": 3.5
      },
      {
        "month": 5,
        "shadow": 2
      },
      {
        "month": 6,
        "shadow": 1
      }
    ]
  },
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "prompt": "So far, what happens to the noon shadow as the months go from winter toward summer?",
      "choices": [
        {
          "id": "increase",
          "text": "It gets longer."
        },
        {
          "id": "decrease",
          "text": "It gets shorter."
        },
        {
          "id": "same",
          "text": "It stays about the same."
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
          "id": "pole",
          "text": "Which flagpole we measured",
          "icon": "pole"
        },
        {
          "id": "month",
          "text": "Which month it was",
          "icon": "calendar"
        },
        {
          "id": "time",
          "text": "What time of day we measured",
          "icon": "clock"
        },
        {
          "id": "ruler",
          "text": "Which ruler we used",
          "icon": "ruler"
        }
      ]
    }
  ],
  "dataTableStep": {
    "phase": "postRound2",
    "targetRound": "roundTwo",
    "tolerance": 0.75,
    "instructions": "Round 2 prediction (made with the flag before that setting was run). Informational only."
  },
  "scene": {
    "id": "shadow",
    "runLabel": "Noon Sun!",
    "r1Runs": 3,
    "r2Runs": 2,
    "predictSetting": 3,
    "snap": 0.5,
    "unit": "ft",
    "outcomeAxis": "Noon shadow (ft)",
    "variableAxis": "Month",
    "valueNames": {
      "0": "Dec",
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "Jun"
    },
    "opts": {
      "arcLabel": "NOON SUN, MONTH BY MONTH",
      "useNames": true
    },
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
      "type": "tallerPole",
      "banner": "Conditions change!",
      "question": "This flagpole is taller. Does your pattern still hold?"
    },
    "sam": {
      "start": "Drag the Sun (or tap a month) to pick when to measure the noon shadow.",
      "pumping": "{v} it is! Now drag the purple flag to predict where the noon shadow will end.",
      "needSetting": "Pick a month first — drag the Sun!",
      "full": "That’s June — as late as this test goes.",
      "empty": "That’s December — as early as this test goes.",
      "repeat": "You already tried {v}. Try a different month to find a pattern!",
      "next": "Tap Reset, then move the Sun to a different month.",
      "locked": "Mission Control set this test to {v} — just place your flag!",
      "twistPredict": "Now it’s a taller pole. In {v}, where will its noon shadow end? Move your flag!",
      "twistRun2": "Now pick any month and measure the taller pole’s shadow once more.",
      "compareR1": "In Round 1 the shorter pole’s shadow that month was {v}!"
    }
  },
  "machineBackground": {
    "imageUrl": "/simulation-lab/console.jpg"
  },
  "responseStems": [
    "From winter to summer, the noon shadow got ___.",
    "In ___, the noon shadow was ___ feet long.",
    "This happens because the noon Sun is ___ in the sky in summer.",
    "I predict the shadow in July would be ___."
  ],
  "generalizePrompt": "What happens to the flagpole's noon shadow from winter to summer? Use real data from two months, and predict what comes next.",
  "selfCheckQuestions": [
    "I described the pattern from winter to summer.",
    "I used real data from two months.",
    "I explained it with how high the Sun is at noon.",
    "I made a prediction that follows the pattern."
  ]
};
