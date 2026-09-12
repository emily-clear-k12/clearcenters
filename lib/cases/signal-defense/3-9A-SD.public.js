// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.9A_v1.md) into the
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
  standard: "3.9A-SD",
  title: "Signal Defense: Earth's Rotation (Day & Night)",
  questions: [
    {
      "id": "3.9A-1",
      "type": "multiple_choice",
      "title": "Which movement of Earth causes day and night?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Earth orbiting the Sun",
        "Earth spinning (rotating) on its axis",
        "The Moon orbiting Earth",
        "The Sun orbiting Earth"
      ],
      "correct": "Earth spinning (rotating) on its axis"
    },
    {
      "id": "3.9A-2",
      "type": "multiple_choice",
      "title": "About how long does it take Earth to complete one full orbit around the Sun?",
      "prompt": "Choose the best answer.",
      "choices": [
        "One day",
        "One week",
        "One month",
        "About one year"
      ],
      "correct": "About one year"
    },
    {
      "id": "3.9A-3",
      "type": "multiple_choice",
      "title": "About how long does it take the Moon to complete one full orbit around Earth?",
      "prompt": "Choose the best answer.",
      "choices": [
        "One day",
        "About one month",
        "About one year",
        "Ten years"
      ],
      "correct": "About one month"
    },
    {
      "id": "3.9A-4",
      "type": "multiple_choice",
      "title": "In the Sun-Earth-Moon system, which object stays at the center while the others move around it?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The Moon",
        "Earth",
        "The Sun",
        "None of them move"
      ],
      "correct": "The Sun"
    },
    {
      "id": "3.9A-5",
      "type": "multiple_choice",
      "title": "Which of these correctly describes the Moon's movement?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The Moon spins in place and never moves around anything",
        "The Moon orbits (moves around) Earth",
        "The Moon orbits the Sun directly, not Earth",
        "Earth orbits the Moon"
      ],
      "correct": "The Moon orbits (moves around) Earth"
    },
    {
      "id": "3.9A-6",
      "type": "multiple_choice",
      "title": "A student builds a model with a lamp as the Sun, a ball as Earth, and a smaller ball as the Moon. Which part of the model should move around the \"Sun\" lamp?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Nothing should move",
        "The \"Earth\" ball, carrying the \"Moon\" ball around with it",
        "Only the \"Moon\" ball, by itself",
        "The lamp should move around the balls"
      ],
      "correct": "The \"Earth\" ball, carrying the \"Moon\" ball around with it"
    },
    {
      "id": "3.9A-7",
      "type": "multi_select",
      "title": "Which of these are true about Earth's movements?",
      "prompt": "Select all that apply.",
      "choices": [
        "Earth spins on its axis, causing day and night",
        "Earth orbits the Sun, taking about a year",
        "Earth orbits the Moon",
        "Earth stays completely still and never moves",
        "Earth's spin and orbit happen at the same time"
      ],
      "correct": [
        "Earth spins on its axis, causing day and night",
        "Earth orbits the Sun, taking about a year",
        "Earth's spin and orbit happen at the same time"
      ]
    },
    {
      "id": "3.9A-8",
      "type": "multi_select",
      "title": "Which of these are true about the Moon?",
      "prompt": "Select all that apply.",
      "choices": [
        "The Moon orbits Earth",
        "The Moon takes about a month to complete one orbit around Earth",
        "The Moon is the center of the Sun-Earth-Moon system",
        "The Moon orbits the Sun directly instead of Earth",
        "The Moon can be modeled as a small ball orbiting a bigger \"Earth\" ball"
      ],
      "correct": [
        "The Moon orbits Earth",
        "The Moon takes about a month to complete one orbit around Earth",
        "The Moon can be modeled as a small ball orbiting a bigger \"Earth\" ball"
      ]
    },
    {
      "id": "3.9A-9",
      "type": "multi_select",
      "title": "Which of these would you need to build a simple model of the Sun-Earth-Moon system?",
      "prompt": "Select all that apply.",
      "choices": [
        "Something to represent the Sun (like a lamp or a large ball)",
        "Something to represent Earth (like a medium ball)",
        "Something to represent the Moon (like a small ball)",
        "A stopwatch to measure temperature",
        "A magnet"
      ],
      "correct": [
        "Something to represent the Sun (like a lamp or a large ball)",
        "Something to represent Earth (like a medium ball)",
        "Something to represent the Moon (like a small ball)"
      ]
    },
    {
      "id": "3.9A-10",
      "type": "multi_select",
      "title": "Which of these describe Earth's two kinds of movement?",
      "prompt": "Select all that apply.",
      "choices": [
        "Rotating (spinning) on its axis, which causes day and night",
        "Revolving (orbiting) around the Sun, which takes about a year",
        "Orbiting around the Moon",
        "Staying perfectly still",
        "Spinning around the Moon instead of the Sun"
      ],
      "correct": [
        "Rotating (spinning) on its axis, which causes day and night",
        "Revolving (orbiting) around the Sun, which takes about a year"
      ]
    },
    {
      "id": "3.9A-11",
      "type": "multi_select",
      "title": "In a model of the Sun-Earth-Moon system, which of these show the correct relationships?",
      "prompt": "Select all that apply.",
      "choices": [
        "The Sun stays in the center",
        "Earth orbits around the Sun",
        "The Moon orbits around Earth",
        "The Moon orbits around the Sun directly",
        "The Sun orbits around Earth"
      ],
      "correct": [
        "The Sun stays in the center",
        "Earth orbits around the Sun",
        "The Moon orbits around Earth"
      ]
    },
    {
      "id": "3.9A-12",
      "type": "true_false",
      "title": "Earth spinning on its axis is what causes day and night.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9A-13",
      "type": "true_false",
      "title": "It takes Earth about one day to fully orbit the Sun.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "it takes Earth about one year to orbit the Sun; one day is about how long it takes Earth to spin once on its axis."
    },
    {
      "id": "3.9A-14",
      "type": "true_false",
      "title": "The Moon orbits around Earth.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9A-15",
      "type": "true_false",
      "title": "The Sun orbits around Earth.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "Earth (and the Moon along with it) orbits around the Sun, not the other way around."
    },
    {
      "id": "3.9A-16",
      "type": "true_false",
      "title": "The Moon takes about a month to complete one orbit around Earth.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9A-17",
      "type": "true_false",
      "title": "A model of the Sun, Earth, and Moon can help show how these three objects move and relate to each other.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9A-18",
      "type": "true_false",
      "title": "Earth only spins on its axis — it does not also orbit the Sun.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "Earth does both at the same time: it spins on its axis and it orbits the Sun."
    },
    {
      "id": "3.9A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Earth ",
        " is what causes day and night, while Earth ",
        " takes about a year to complete."
      ],
      "blanks": [
        {
          "choices": [
            "spinning on its axis",
            "orbiting the Sun"
          ],
          "correct": "spinning on its axis"
        },
        {
          "choices": [
            "orbiting the Sun",
            "spinning on its axis"
          ],
          "correct": "orbiting the Sun"
        }
      ]
    },
    {
      "id": "3.9A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "In the Sun-Earth-Moon system, the ",
        " stays in the center, while Earth ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "Sun",
            "Earth",
            "Moon"
          ],
          "correct": "Sun"
        },
        {
          "choices": [
            "orbits it",
            "stays still"
          ],
          "correct": "orbits it"
        }
      ]
    },
    {
      "id": "3.9A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The Moon ",
        " Earth, taking about ",
        " to complete one full trip around."
      ],
      "blanks": [
        {
          "choices": [
            "orbits",
            "stays still next to"
          ],
          "correct": "orbits"
        },
        {
          "choices": [
            "a month",
            "a year"
          ],
          "correct": "a month"
        }
      ]
    },
    {
      "id": "3.9A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "In a classroom model, a small ball representing the Moon should move around ",
        ", showing how the real Moon orbits ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "the ball representing Earth",
            "the lamp representing the Sun directly"
          ],
          "correct": "the ball representing Earth"
        },
        {
          "choices": [
            "Earth",
            "the Sun"
          ],
          "correct": "Earth"
        }
      ]
    },
    {
      "id": "3.9A-23",
      "type": "ordering",
      "title": "Put these steps in order for building a simple model of the Sun-Earth-Moon system:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose objects to represent the Sun, Earth, and Moon, in different sizes",
        "Place the \"Sun\" object in the center",
        "Move the \"Earth\" object in a path around the \"Sun\"",
        "Move the \"Moon\" object in a smaller path around the \"Earth\""
      ],
      "correct": [
        "Choose objects to represent the Sun, Earth, and Moon, in different sizes",
        "Place the \"Sun\" object in the center",
        "Move the \"Earth\" object in a path around the \"Sun\"",
        "Move the \"Moon\" object in a smaller path around the \"Earth\""
      ]
    },
    {
      "id": "3.9A-24",
      "type": "ordering",
      "title": "A class is using a lamp and two balls to model why Earth has day and night. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Set up a lamp to represent the Sun",
        "Hold a ball to represent Earth a short distance from the lamp",
        "Slowly spin the ball while it faces the lamp",
        "Observe that only the side facing the lamp is lit up (day), while the other side is dark (night)"
      ],
      "correct": [
        "Set up a lamp to represent the Sun",
        "Hold a ball to represent Earth a short distance from the lamp",
        "Slowly spin the ball while it faces the lamp",
        "Observe that only the side facing the lamp is lit up (day), while the other side is dark (night)"
      ]
    },
    {
      "id": "3.9A-25",
      "type": "ordering",
      "title": "A student is modeling how long the Moon's orbit takes compared to Earth's orbit. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict which will take longer: the Moon's orbit around Earth, or Earth's orbit around the Sun",
        "Use a model to show the Moon moving all the way around Earth (about a month)",
        "Use the same model to show Earth moving all the way around the Sun (about a year)",
        "Compare the two paths and record which orbit takes longer"
      ],
      "correct": [
        "Predict which will take longer: the Moon's orbit around Earth, or Earth's orbit around the Sun",
        "Use a model to show the Moon moving all the way around Earth (about a month)",
        "Use the same model to show Earth moving all the way around the Sun (about a year)",
        "Compare the two paths and record which orbit takes longer"
      ]
    }
  ],
};
