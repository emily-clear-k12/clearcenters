// Signal Defense — 4.9B, Patterns of Change in the Moon (Grade 4 Science).
// Grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.9B verbatim (TEA adopted grade 4 science TEKS): "collect and
// analyze data to identify sequences and predict patterns of change in the
// observable appearance of the Moon from Earth"
//
// Verbs: COLLECT and ANALYZE DATA, IDENTIFY SEQUENCES, PREDICT PATTERNS —
// the same stack as 4.9A, so this bank is built the same way: give the
// student observations and ask what comes next or what order they go in.
//
// Scope discipline, and it is a real trap here: the standard is the
// OBSERVABLE APPEARANCE of the Moon from Earth. Why phases happen — the
// Moon's orbit, sunlight angles, which half is lit — is not in this
// expectation. Several tempting questions were left out for that reason.
// Moon phase NAMES are used because they are how the observations get
// recorded, but the questions are about sequence and prediction, not
// vocabulary recall.

export const PUBLIC_CASE = {
  standard: "4.9B-SD",
  title: "Signal Defense: Patterns of Change in the Moon",
  questions: [
    {
      "id": "4.9B-1",
      "type": "multiple_choice",
      "title": "A student observes the Moon looking a little bigger each night for a week. What should she predict for tomorrow?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It will disappear completely",
        "It will look less lit",
        "It will look even more lit",
        "It will look exactly the same"
      ],
      "correct": "It will look even more lit"
    },
    {
      "id": "4.9B-2",
      "type": "multiple_choice",
      "title": "About how long does it take the Moon's appearance to go through its full pattern and repeat?",
      "prompt": "Choose the best answer.",
      "choices": [
        "About one day",
        "About one week",
        "About one year",
        "About one month"
      ],
      "correct": "About one month"
    },
    {
      "id": "4.9B-3",
      "type": "multiple_choice",
      "title": "A Moon journal shows: new moon, then a thin sliver, then half lit. What comes next in the sequence?",
      "prompt": "Choose the best answer.",
      "choices": [
        "More than half lit",
        "Back to a thin sliver",
        "Back to new moon",
        "Completely dark again"
      ],
      "correct": "More than half lit"
    },
    {
      "id": "4.9B-4",
      "type": "multiple_choice",
      "title": "Why should a student sketch the Moon every night rather than once a week?",
      "prompt": "Choose the best answer.",
      "choices": [
        "To make the Moon change faster",
        "To see the gradual sequence of change",
        "Because the Moon only changes on some nights",
        "So the drawings look neater"
      ],
      "correct": "To see the gradual sequence of change"
    },
    {
      "id": "4.9B-5",
      "type": "multiple_choice",
      "title": "A student sees a full moon tonight. About when should she expect the next full moon?",
      "prompt": "Choose the best answer.",
      "choices": [
        "In about a week",
        "Tomorrow night",
        "In about a month",
        "In about a year"
      ],
      "correct": "In about a month"
    },
    {
      "id": "4.9B-6",
      "type": "multiple_choice",
      "title": "The lit part of the Moon has been shrinking a little each night. What is the pattern called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Waxing",
        "Full",
        "New",
        "Waning"
      ],
      "correct": "Waning"
    },
    {
      "id": "4.9B-7",
      "type": "true_false",
      "title": "The Moon's observable appearance changes in a repeating pattern.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9B-8",
      "type": "true_false",
      "title": "The Moon's appearance changes completely from one night to the next.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.9B-9",
      "type": "true_false",
      "title": "Recording the Moon over several weeks helps you predict what it will look like next.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9B-10",
      "type": "true_false",
      "title": "During a new moon, very little or none of the Moon appears lit from Earth.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9B-11",
      "type": "true_false",
      "title": "The Moon's pattern happens in a different order every month.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.9B-12",
      "type": "true_false",
      "title": "A cloudy night that blocks the view means the pattern stopped.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.9B-13",
      "type": "true_false",
      "title": "Sketching the Moon each night is a way of collecting data.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9B-14",
      "type": "multi_select",
      "title": "Which of these are useful ways to collect data about the Moon's appearance?",
      "prompt": "Select all that apply.",
      "choices": [
        "Sketching what you see each night",
        "Writing the date beside each sketch",
        "Noting how much of the Moon looks lit",
        "Guessing what it probably looked like",
        "Taking a photo each night",
        "Recording only the nights it looks full"
      ],
      "correct": [
        "Sketching what you see each night",
        "Writing the date beside each sketch",
        "Noting how much of the Moon looks lit",
        "Taking a photo each night"
      ]
    },
    {
      "id": "4.9B-15",
      "type": "multi_select",
      "title": "Which statements about the Moon's pattern of change are correct?",
      "prompt": "Select all that apply.",
      "choices": [
        "The change happens gradually night by night",
        "The whole pattern takes about a month",
        "The sequence repeats in the same order",
        "The Moon changes shape randomly",
        "The lit part grows and then shrinks",
        "The pattern can be used to predict ahead"
      ],
      "correct": [
        "The change happens gradually night by night",
        "The whole pattern takes about a month",
        "The sequence repeats in the same order",
        "The lit part grows and then shrinks",
        "The pattern can be used to predict ahead"
      ]
    },
    {
      "id": "4.9B-16",
      "type": "multi_select",
      "title": "A Moon journal shows the lit part growing each night. Which predictions fit that pattern?",
      "prompt": "Select all that apply.",
      "choices": [
        "Tomorrow will look slightly more lit",
        "A full moon is coming in the next week or two",
        "The lit part will eventually begin shrinking",
        "The Moon will vanish tomorrow",
        "The pattern will repeat again next month",
        "The next phase will be a new moon"
      ],
      "correct": [
        "Tomorrow will look slightly more lit",
        "A full moon is coming in the next week or two",
        "The lit part will eventually begin shrinking",
        "The pattern will repeat again next month"
      ]
    },
    {
      "id": "4.9B-17",
      "type": "multi_select",
      "title": "Which habits make Moon observation data more useful?",
      "prompt": "Select all that apply.",
      "choices": [
        "Observing at about the same time each night",
        "Dating every observation",
        "Recording nights when clouds blocked the view",
        "Only drawing the interesting shapes",
        "Keeping the sketches in order",
        "Changing how you draw it each week"
      ],
      "correct": [
        "Observing at about the same time each night",
        "Dating every observation",
        "Recording nights when clouds blocked the view",
        "Keeping the sketches in order"
      ]
    },
    {
      "id": "4.9B-18",
      "type": "multi_select",
      "title": "Which of these would a student see across one full cycle of the Moon's appearance?",
      "prompt": "Select all that apply.",
      "choices": [
        "A night with almost no lit part visible",
        "A night with the whole face lit",
        "Nights with about half lit",
        "Nights with a thin sliver lit",
        "A night when the Moon appears square",
        "A night when the Moon appears green"
      ],
      "correct": [
        "A night with almost no lit part visible",
        "A night with the whole face lit",
        "Nights with about half lit",
        "Nights with a thin sliver lit"
      ]
    },
    {
      "id": "4.9B-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When the lit part of the Moon grows a little each night, the Moon is ",
        ", and when it shrinks it is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "waxing",
            "waning"
          ],
          "correct": "waxing"
        },
        {
          "choices": [
            "waxing",
            "waning"
          ],
          "correct": "waning"
        }
      ]
    },
    {
      "id": "4.9B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The Moon's appearance takes about ",
        " to go through the whole pattern, and then it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "a month",
            "a week"
          ],
          "correct": "a month"
        },
        {
          "choices": [
            "stops",
            "repeats"
          ],
          "correct": "repeats"
        }
      ]
    },
    {
      "id": "4.9B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Because the sequence always runs in the same ",
        ", a student can ",
        " what the Moon will look like next week."
      ],
      "blanks": [
        {
          "choices": [
            "order",
            "direction"
          ],
          "correct": "order"
        },
        {
          "choices": [
            "change",
            "predict"
          ],
          "correct": "predict"
        }
      ]
    },
    {
      "id": "4.9B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Observing on ",
        " night rather than once a week shows the change is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "every",
            "one"
          ],
          "correct": "every"
        },
        {
          "choices": [
            "sudden",
            "gradual"
          ],
          "correct": "gradual"
        }
      ]
    },
    {
      "id": "4.9B-23",
      "type": "ordering",
      "title": "Put these Moon observations in order as the lit part grows:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "About half of the Moon looks lit",
        "Almost none of the Moon looks lit",
        "The whole face looks lit",
        "A thin sliver looks lit"
      ],
      "correct": [
        "Almost none of the Moon looks lit",
        "A thin sliver looks lit",
        "About half of the Moon looks lit",
        "The whole face looks lit"
      ]
    },
    {
      "id": "4.9B-24",
      "type": "ordering",
      "title": "Put these steps in order for keeping a Moon journal:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Compare the sketches to find the sequence",
        "Sketch what the Moon looks like and write the date",
        "Go outside at the same time each night",
        "Predict what the next night will look like"
      ],
      "correct": [
        "Go outside at the same time each night",
        "Sketch what the Moon looks like and write the date",
        "Compare the sketches to find the sequence",
        "Predict what the next night will look like"
      ]
    },
    {
      "id": "4.9B-25",
      "type": "ordering",
      "title": "Put these observations in order as the lit part shrinks back down:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "A thin sliver is left lit",
        "The whole face is lit",
        "Almost none of the Moon looks lit",
        "About half is still lit"
      ],
      "correct": [
        "The whole face is lit",
        "About half is still lit",
        "A thin sliver is left lit",
        "Almost none of the Moon looks lit"
      ]
    }
  ],
};
