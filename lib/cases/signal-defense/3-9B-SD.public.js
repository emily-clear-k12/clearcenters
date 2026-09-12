// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.9B_v1.md) into the
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
  standard: "3.9B-SD",
  title: "Signal Defense: The Solar System",
  questions: [
    {
      "id": "3.9B-1",
      "type": "multiple_choice",
      "title": "Which planet is closest to the Sun?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Venus",
        "Earth",
        "Mercury",
        "Mars"
      ],
      "correct": "Mercury"
    },
    {
      "id": "3.9B-2",
      "type": "multiple_choice",
      "title": "Which planet is farthest from the Sun?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Saturn",
        "Uranus",
        "Neptune",
        "Jupiter"
      ],
      "correct": "Neptune"
    },
    {
      "id": "3.9B-3",
      "type": "multiple_choice",
      "title": "Which planet do we live on?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mars",
        "Earth",
        "Venus",
        "Jupiter"
      ],
      "correct": "Earth"
    },
    {
      "id": "3.9B-4",
      "type": "multiple_choice",
      "title": "Which planet comes right after Earth, moving outward from the Sun?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Venus",
        "Mars",
        "Jupiter",
        "Mercury"
      ],
      "correct": "Mars"
    },
    {
      "id": "3.9B-5",
      "type": "multiple_choice",
      "title": "Which of these is the largest planet in our solar system?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Earth",
        "Saturn",
        "Jupiter",
        "Neptune"
      ],
      "correct": "Jupiter"
    },
    {
      "id": "3.9B-6",
      "type": "multiple_choice",
      "title": "Which planet comes right before Earth, moving outward from the Sun?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mars",
        "Venus",
        "Mercury",
        "Jupiter"
      ],
      "correct": "Venus"
    },
    {
      "id": "3.9B-7",
      "type": "multi_select",
      "title": "Which of these planets come before Earth (closer to the Sun than Earth)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mercury",
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
      ],
      "correct": [
        "Mercury",
        "Venus"
      ]
    },
    {
      "id": "3.9B-8",
      "type": "multi_select",
      "title": "Which of these planets come after Earth (farther from the Sun than Earth)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Venus"
      ],
      "correct": [
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ]
    },
    {
      "id": "3.9B-9",
      "type": "multi_select",
      "title": "Which of these are planets in our solar system?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "The Moon",
        "The Sun"
      ],
      "correct": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ]
    },
    {
      "id": "3.9B-10",
      "type": "multi_select",
      "title": "Which of these are true about the order of the planets?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mercury is the closest planet to the Sun",
        "Neptune is the farthest planet from the Sun",
        "Earth is the third planet from the Sun",
        "The Moon is a planet",
        "The Sun is the first planet from the Sun"
      ],
      "correct": [
        "Mercury is the closest planet to the Sun",
        "Neptune is the farthest planet from the Sun",
        "Earth is the third planet from the Sun"
      ]
    },
    {
      "id": "3.9B-11",
      "type": "multi_select",
      "title": "Which of these planets are closer to the Sun than Mars?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mercury",
        "Venus",
        "Earth",
        "Jupiter",
        "Saturn",
        "Neptune"
      ],
      "correct": [
        "Mercury",
        "Venus",
        "Earth"
      ]
    },
    {
      "id": "3.9B-12",
      "type": "true_false",
      "title": "Mercury is the planet closest to the Sun.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9B-13",
      "type": "true_false",
      "title": "Earth is the first planet from the Sun.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "Mercury is the first planet from the Sun; Earth is the third."
    },
    {
      "id": "3.9B-14",
      "type": "true_false",
      "title": "Neptune is farther from the Sun than Jupiter.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9B-15",
      "type": "true_false",
      "title": "Venus comes after Mars when counting outward from the Sun.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "Venus comes before Mars; the order outward from the Sun is Mercury, Venus, Earth, Mars."
    },
    {
      "id": "3.9B-16",
      "type": "true_false",
      "title": "There are eight planets in our solar system.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9B-17",
      "type": "true_false",
      "title": "The Moon is one of the eight planets in our solar system.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "the Moon orbits Earth; it is not one of the eight planets."
    },
    {
      "id": "3.9B-18",
      "type": "true_false",
      "title": "Jupiter is the largest planet in our solar system.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.9B-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Counting outward from the Sun, the order of the first three planets is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "Mercury, Venus, Earth",
            "Earth, Venus, Mercury",
            "Venus, Mercury, Earth"
          ],
          "correct": "Mercury, Venus, Earth"
        }
      ]
    },
    {
      "id": "3.9B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The planet ",
        " the Sun is Mercury, while the planet ",
        " the Sun is Neptune."
      ],
      "blanks": [
        {
          "choices": [
            "closest to",
            "farthest from"
          ],
          "correct": "closest to"
        },
        {
          "choices": [
            "farthest from",
            "closest to"
          ],
          "correct": "farthest from"
        }
      ]
    },
    {
      "id": "3.9B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Earth is the ",
        " planet from the Sun, coming right after ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "third",
            "first",
            "eighth"
          ],
          "correct": "third"
        },
        {
          "choices": [
            "Venus",
            "Mars",
            "Jupiter"
          ],
          "correct": "Venus"
        }
      ]
    },
    {
      "id": "3.9B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The largest planet in our solar system is ",
        ", which comes ",
        " Mars in the order from the Sun."
      ],
      "blanks": [
        {
          "choices": [
            "Jupiter",
            "Earth",
            "Mercury"
          ],
          "correct": "Jupiter"
        },
        {
          "choices": [
            "after",
            "before"
          ],
          "correct": "after"
        }
      ]
    },
    {
      "id": "3.9B-23",
      "type": "ordering",
      "title": "Put these planets in order from closest to the Sun to farthest from the Sun:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars"
      ],
      "correct": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars"
      ]
    },
    {
      "id": "3.9B-24",
      "type": "ordering",
      "title": "Put these outer planets in order from closest to the Sun to farthest from the Sun:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ],
      "correct": [
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ]
    },
    {
      "id": "3.9B-25",
      "type": "ordering",
      "title": "Put all eight planets in order from closest to the Sun to farthest from the Sun:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ],
      "correct": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
      ]
    },
    {
      "id": "3.9B-26",
      "type": "ordering",
      "title": "A student is putting the planets in order using picture cards. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Gather cards or pictures for all eight planets",
        "Decide which planet is closest to the Sun and place it first",
        "Continue placing each planet in order, moving outward from the Sun",
        "Check the final order against a reference chart to make sure it's correct"
      ],
      "correct": [
        "Gather cards or pictures for all eight planets",
        "Decide which planet is closest to the Sun and place it first",
        "Continue placing each planet in order, moving outward from the Sun",
        "Check the final order against a reference chart to make sure it's correct"
      ]
    }
  ],
};
