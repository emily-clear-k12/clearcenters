// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.6C_v1.md) into the
// exact shape window.SignalDefense.setQuestionBank() expects (see the
// signal-defense-3-6b-gameplay-v4.html widget's own setReviewQuestions()
// validator + BUILT_IN_REVIEW_QUESTIONS for the ground-truth schema this
// mirrors exactly: multiple_choice/multi_select/true_false/inline_choice/
// ordering, with title = the actual question text and prompt = the generic
// per-type instruction, except inline_choice (title is the fixed instruction,
// the sentence itself lives in parts/blanks). Correct answers are included in
// this PUBLIC file deliberately, not hidden in a .server.js like other
// engines' scoring rubrics — the widget grades every answer instantly
// client-side during a live whole-class round, so the answer key has to be
// in the browser bundle regardless of which file it ships from.

export const PUBLIC_CASE = {
  standard: "3.6C-SD",
  title: "Signal Defense: Changes of State",
  questions: [
    {
      "id": "3.6C-1",
      "type": "multiple_choice",
      "title": "A student leaves an ice cube on the counter. After an hour, it has turned into a puddle of water. Which state change happened?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Melting (solid to liquid)",
        "Freezing (liquid to solid)",
        "Evaporation (liquid to gas)",
        "Condensation (gas to liquid)"
      ],
      "correct": "Melting (solid to liquid)"
    },
    {
      "id": "3.6C-2",
      "type": "multiple_choice",
      "title": "A student leaves a wet swimsuit hanging outside after swimming. By the next day, it feels completely dry. What happened to the water in the swimsuit?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It froze",
        "It melted",
        "It evaporated into the air",
        "It turned into a solid"
      ],
      "correct": "It evaporated into the air"
    },
    {
      "id": "3.6C-3",
      "type": "multiple_choice",
      "title": "A cold glass of lemonade is left outside on a hot day. Small drops of water form on the outside of the glass. Where did these drops come from?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The lemonade leaked out",
        "Water vapor in the air cooled and turned into liquid drops on the glass",
        "The glass is melting",
        "The glass absorbed water from the ground"
      ],
      "correct": "Water vapor in the air cooled and turned into liquid drops on the glass"
    },
    {
      "id": "3.6C-4",
      "type": "multiple_choice",
      "title": "A tray of water is placed in the freezer overnight. What state change happens to the water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Melting",
        "Evaporation",
        "Condensation",
        "Freezing (liquid to solid)"
      ],
      "correct": "Freezing (liquid to solid)"
    },
    {
      "id": "3.6C-5",
      "type": "multiple_choice",
      "title": "A student holds a crayon over a warm lamp for a long time. What is most likely to happen to the crayon?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It will freeze",
        "It will melt and change from a solid to a liquid",
        "It will evaporate",
        "Nothing will change"
      ],
      "correct": "It will melt and change from a solid to a liquid"
    },
    {
      "id": "3.6C-6",
      "type": "multiple_choice",
      "title": "A pot of water is heated on the stove until it boils. What happens to some of the water as it boils?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It freezes into ice",
        "It stays a solid",
        "It turns into steam (a gas)",
        "It becomes more solid"
      ],
      "correct": "It turns into steam (a gas)"
    },
    {
      "id": "3.6C-7",
      "type": "multi_select",
      "title": "Which of these are examples of a solid changing into a liquid?",
      "prompt": "Select all that apply.",
      "choices": [
        "An ice cube melting in the sun",
        "A crayon melting near a warm lamp",
        "Butter melting in a hot pan",
        "Water boiling into steam",
        "Rain falling from a cloud",
        "Water freezing in a tray"
      ],
      "correct": [
        "An ice cube melting in the sun",
        "A crayon melting near a warm lamp",
        "Butter melting in a hot pan"
      ]
    },
    {
      "id": "3.6C-8",
      "type": "multi_select",
      "title": "Which of these are examples of evaporation (a liquid changing into a gas)?",
      "prompt": "Select all that apply.",
      "choices": [
        "A puddle drying up on a sunny sidewalk",
        "Wet clothes drying on a clothesline",
        "Water disappearing from an open cup left out for days",
        "Ice forming in a freezer",
        "Fog forming on a cold window",
        "A snowman melting"
      ],
      "correct": [
        "A puddle drying up on a sunny sidewalk",
        "Wet clothes drying on a clothesline",
        "Water disappearing from an open cup left out for days"
      ]
    },
    {
      "id": "3.6C-9",
      "type": "multi_select",
      "title": "Which of these are examples of condensation (a gas changing into a liquid)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Drops of water forming on a cold glass of lemonade",
        "A bathroom mirror fogging up after a hot shower",
        "Dew forming on grass in the early morning",
        "An ice cube melting on a plate",
        "Steam rising from a boiling pot",
        "A puddle drying up"
      ],
      "correct": [
        "Drops of water forming on a cold glass of lemonade",
        "A bathroom mirror fogging up after a hot shower",
        "Dew forming on grass in the early morning"
      ]
    },
    {
      "id": "3.6C-10",
      "type": "multi_select",
      "title": "Which of these describe what happens when matter is heated?",
      "prompt": "Select all that apply.",
      "choices": [
        "A solid can melt into a liquid",
        "A liquid can evaporate into a gas",
        "A liquid can freeze into a solid",
        "A gas can condense into a liquid",
        "Example: a popsicle melting in the sun"
      ],
      "correct": [
        "A solid can melt into a liquid",
        "A liquid can evaporate into a gas",
        "Example: a popsicle melting in the sun"
      ]
    },
    {
      "id": "3.6C-11",
      "type": "multi_select",
      "title": "Which of these describe what happens when matter is cooled?",
      "prompt": "Select all that apply.",
      "choices": [
        "A liquid can freeze into a solid",
        "A gas can condense into a liquid",
        "A solid can melt into a liquid",
        "A liquid can evaporate into a gas",
        "Example: water freezing into ice cubes"
      ],
      "correct": [
        "A liquid can freeze into a solid",
        "A gas can condense into a liquid",
        "Example: water freezing into ice cubes"
      ]
    },
    {
      "id": "3.6C-12",
      "type": "true_false",
      "title": "When matter is heated, it can change from a solid to a liquid.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6C-13",
      "type": "true_false",
      "title": "Freezing happens when a liquid is heated until it becomes a gas.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "freezing happens when a liquid is cooled until it becomes a solid."
    },
    {
      "id": "3.6C-14",
      "type": "true_false",
      "title": "Water left out in a warm room will slowly evaporate into the air over time.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6C-15",
      "type": "true_false",
      "title": "Condensation happens when a gas is heated and turns into a liquid.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "condensation happens when a gas is cooled and turns into a liquid."
    },
    {
      "id": "3.6C-16",
      "type": "true_false",
      "title": "A snowman left outside on a warm, sunny day will likely melt.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6C-17",
      "type": "true_false",
      "title": "Ice, liquid water, and steam are completely different substances that cannot turn into one another.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "ice, liquid water, and steam are all the same substance, water, just in different states; heating or cooling can change water from one state to another."
    },
    {
      "id": "3.6C-18",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When a popsicle is left in the sun, it ",
        ", changing from a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "melts",
            "freezes",
            "evaporates"
          ],
          "correct": "melts"
        },
        {
          "choices": [
            "solid to a liquid",
            "liquid to a solid",
            "liquid to a gas"
          ],
          "correct": "solid to a liquid"
        }
      ]
    },
    {
      "id": "3.6C-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "After a hot shower, the bathroom mirror is covered in tiny drops of water. This happens because water vapor in the air ",
        " into ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "cools and condenses",
            "heats and evaporates"
          ],
          "correct": "cools and condenses"
        },
        {
          "choices": [
            "tiny liquid drops",
            "a solid"
          ],
          "correct": "tiny liquid drops"
        }
      ]
    },
    {
      "id": "3.6C-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A wet towel left on a sunny windowsill will slowly ",
        " as the water ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "dry out",
            "freeze",
            "get wetter"
          ],
          "correct": "dry out"
        },
        {
          "choices": [
            "evaporates into the air",
            "condenses into a liquid"
          ],
          "correct": "evaporates into the air"
        }
      ]
    },
    {
      "id": "3.6C-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A bowl of soup left outside on a freezing winter night will ",
        ", changing from a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "freeze",
            "melt",
            "evaporate"
          ],
          "correct": "freeze"
        },
        {
          "choices": [
            "liquid to a solid",
            "solid to a liquid",
            "gas to a liquid"
          ],
          "correct": "liquid to a solid"
        }
      ]
    },
    {
      "id": "3.6C-22",
      "type": "ordering",
      "title": "Put these steps in order for an experiment testing how heat changes an ice cube:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what will happen to the ice cube when it is heated",
        "Place the ice cube in a warm spot",
        "Observe the ice cube every few minutes",
        "Record what happened to the ice cube"
      ],
      "correct": [
        "Predict what will happen to the ice cube when it is heated",
        "Place the ice cube in a warm spot",
        "Observe the ice cube every few minutes",
        "Record what happened to the ice cube"
      ]
    },
    {
      "id": "3.6C-23",
      "type": "ordering",
      "title": "A student is testing how cooling affects a cup of water. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what will happen to the water when it is cooled",
        "Place the cup of water in the freezer",
        "Check the cup after a few hours",
        "Record whether the water changed state"
      ],
      "correct": [
        "Predict what will happen to the water when it is cooled",
        "Place the cup of water in the freezer",
        "Check the cup after a few hours",
        "Record whether the water changed state"
      ]
    },
    {
      "id": "3.6C-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how a puddle disappears on a hot day:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Rain falls and forms a puddle on the sidewalk",
        "The sun heats the water in the puddle",
        "The water slowly evaporates into the air",
        "The puddle disappears"
      ],
      "correct": [
        "Rain falls and forms a puddle on the sidewalk",
        "The sun heats the water in the puddle",
        "The water slowly evaporates into the air",
        "The puddle disappears"
      ]
    },
    {
      "id": "3.6C-25",
      "type": "ordering",
      "title": "Put these steps in order to explain how dew forms on grass overnight:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "The air holds water vapor (an invisible gas)",
        "The air cools down overnight",
        "The water vapor condenses into tiny liquid drops",
        "Dew appears on the grass in the morning"
      ],
      "correct": [
        "The air holds water vapor (an invisible gas)",
        "The air cools down overnight",
        "The water vapor condenses into tiny liquid drops",
        "Dew appears on the grass in the morning"
      ]
    }
  ],
};
