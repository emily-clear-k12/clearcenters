// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.10A_v1.md) into the
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
  standard: "3.10A-SD",
  title: "Signal Defense: Weather Tools & Measurement",
  questions: [
    {
      "id": "3.10A-1",
      "type": "multiple_choice",
      "title": "Which weather tool would you use to measure the temperature outside?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A thermometer",
        "A rain gauge",
        "A wind vane",
        "A compass"
      ],
      "correct": "A thermometer"
    },
    {
      "id": "3.10A-2",
      "type": "multiple_choice",
      "title": "Which weather tool would help you measure how much rain fell during a storm?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A thermometer",
        "A rain gauge",
        "A wind vane",
        "A magnet"
      ],
      "correct": "A rain gauge"
    },
    {
      "id": "3.10A-3",
      "type": "multiple_choice",
      "title": "On Monday, it was 45°F and rainy in one city. On the same day, it was 90°F and sunny in another city. Which statement compares these two cities' weather?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Both cities had the exact same weather",
        "The first city was colder and rainier; the second city was hotter and sunnier",
        "The first city was hotter than the second",
        "Neither city had any weather that day"
      ],
      "correct": "The first city was colder and rainier; the second city was hotter and sunnier"
    },
    {
      "id": "3.10A-4",
      "type": "multiple_choice",
      "title": "Which of these describes precipitation?",
      "prompt": "Choose the best answer.",
      "choices": [
        "How hot or cold the air is",
        "How fast the wind is blowing",
        "Water falling from the sky, like rain, snow, or hail",
        "How bright the sun is"
      ],
      "correct": "Water falling from the sky, like rain, snow, or hail"
    },
    {
      "id": "3.10A-5",
      "type": "multiple_choice",
      "title": "A weather report says today will be \"windy with a high of 40°F.\" Which two weather categories does this describe?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Temperature and precipitation",
        "Wind and temperature",
        "Precipitation and wind",
        "None of these"
      ],
      "correct": "Wind and temperature"
    },
    {
      "id": "3.10A-6",
      "type": "multiple_choice",
      "title": "Which tool would help you tell how strong or calm the wind is on a given day?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A rain gauge",
        "A thermometer",
        "A wind vane or flag",
        "A ruler"
      ],
      "correct": "A wind vane or flag"
    },
    {
      "id": "3.10A-7",
      "type": "multi_select",
      "title": "Which of these are examples of precipitation?",
      "prompt": "Select all that apply.",
      "choices": [
        "Rain",
        "Snow",
        "Hail",
        "Sunshine",
        "Wind",
        "A cool breeze"
      ],
      "correct": [
        "Rain",
        "Snow",
        "Hail"
      ]
    },
    {
      "id": "3.10A-8",
      "type": "multi_select",
      "title": "Which of these describe temperature?",
      "prompt": "Select all that apply.",
      "choices": [
        "Hot",
        "Cold",
        "Warm",
        "Rainy",
        "Windy",
        "Foggy"
      ],
      "correct": [
        "Hot",
        "Cold",
        "Warm"
      ]
    },
    {
      "id": "3.10A-9",
      "type": "multi_select",
      "title": "Which of these describe wind?",
      "prompt": "Select all that apply.",
      "choices": [
        "Calm",
        "Breezy",
        "Gusty",
        "Sunny",
        "Freezing",
        "Rainy"
      ],
      "correct": [
        "Calm",
        "Breezy",
        "Gusty"
      ]
    },
    {
      "id": "3.10A-10",
      "type": "multi_select",
      "title": "Which weather tools would you use to compare the weather in two different cities?",
      "prompt": "Select all that apply.",
      "choices": [
        "A thermometer to compare temperature",
        "A rain gauge to compare precipitation",
        "A wind vane to compare wind",
        "A microscope",
        "A magnet"
      ],
      "correct": [
        "A thermometer to compare temperature",
        "A rain gauge to compare precipitation",
        "A wind vane to compare wind"
      ]
    },
    {
      "id": "3.10A-11",
      "type": "multi_select",
      "title": "Which of these are ways day-to-day weather can be different from place to place?",
      "prompt": "Select all that apply.",
      "choices": [
        "One place can be hotter or colder than another",
        "One place can be rainy while another is sunny",
        "One place can be windier than another",
        "All places always have the exact same weather",
        "Weather never changes from day to day"
      ],
      "correct": [
        "One place can be hotter or colder than another",
        "One place can be rainy while another is sunny",
        "One place can be windier than another"
      ]
    },
    {
      "id": "3.10A-12",
      "type": "multi_select",
      "title": "A student is comparing weather reports from two cities. Which pieces of information would help them compare?",
      "prompt": "Select all that apply.",
      "choices": [
        "Each city's temperature",
        "Each city's wind conditions",
        "Each city's precipitation (rain, snow, or none)",
        "Each city's population",
        "Each city's favorite sports team"
      ],
      "correct": [
        "Each city's temperature",
        "Each city's wind conditions",
        "Each city's precipitation (rain, snow, or none)"
      ]
    },
    {
      "id": "3.10A-13",
      "type": "true_false",
      "title": "Temperature, wind, and precipitation are all parts of describing the weather.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10A-14",
      "type": "true_false",
      "title": "Weather is always exactly the same in every city on the same day.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "weather can be very different from place to place, even on the same day."
    },
    {
      "id": "3.10A-15",
      "type": "true_false",
      "title": "A thermometer measures how much rain has fallen.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a thermometer measures temperature; a rain gauge measures rainfall."
    },
    {
      "id": "3.10A-16",
      "type": "true_false",
      "title": "Comparing weather in two places means looking at things like temperature, wind, and precipitation in each place.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10A-17",
      "type": "true_false",
      "title": "Snow and hail are both examples of precipitation.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10A-18",
      "type": "true_false",
      "title": "A \"calm\" day means there is a lot of strong wind.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a calm day means there is little to no wind."
    },
    {
      "id": "3.10A-19",
      "type": "true_false",
      "title": "Weather can be different from one day to the next in the same city.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "On a hot, sunny day with no wind, you would describe the temperature as ",
        ", the wind as ",
        ", and the precipitation as ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "hot",
            "cold"
          ],
          "correct": "hot"
        },
        {
          "choices": [
            "calm",
            "gusty"
          ],
          "correct": "calm"
        },
        {
          "choices": [
            "none",
            "heavy rain"
          ],
          "correct": "none"
        }
      ]
    },
    {
      "id": "3.10A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A ",
        " measures temperature, while a ",
        " measures how much precipitation has fallen."
      ],
      "blanks": [
        {
          "choices": [
            "thermometer",
            "rain gauge"
          ],
          "correct": "thermometer"
        },
        {
          "choices": [
            "rain gauge",
            "thermometer"
          ],
          "correct": "rain gauge"
        }
      ]
    },
    {
      "id": "3.10A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If City A is 30°F with snow and City B is 85°F and sunny on the same day, City A is ",
        " than City B."
      ],
      "blanks": [
        {
          "choices": [
            "colder and snowier",
            "hotter and sunnier"
          ],
          "correct": "colder and snowier"
        }
      ]
    },
    {
      "id": "3.10A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A weather report describing \"cold, windy, with light snow\" is describing ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "temperature, wind, and precipitation",
            "only temperature"
          ],
          "correct": "temperature, wind, and precipitation"
        }
      ]
    },
    {
      "id": "3.10A-24",
      "type": "ordering",
      "title": "Put these steps in order for comparing the weather in two different cities over one day:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Check the temperature, wind, and precipitation in the first city",
        "Check the temperature, wind, and precipitation in the second city",
        "Compare the two cities' temperature, wind, and precipitation",
        "Record which city was hotter, windier, or rainier"
      ],
      "correct": [
        "Check the temperature, wind, and precipitation in the first city",
        "Check the temperature, wind, and precipitation in the second city",
        "Compare the two cities' temperature, wind, and precipitation",
        "Record which city was hotter, windier, or rainier"
      ]
    },
    {
      "id": "3.10A-25",
      "type": "ordering",
      "title": "A class is recording the weather each day for a week to look for patterns. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Go outside and observe the temperature, wind, and precipitation each day",
        "Record the day's weather in a weather log",
        "Repeat this each day for a full week",
        "Look back at the week's log to compare the days' weather"
      ],
      "correct": [
        "Go outside and observe the temperature, wind, and precipitation each day",
        "Record the day's weather in a weather log",
        "Repeat this each day for a full week",
        "Look back at the week's log to compare the days' weather"
      ]
    }
  ],
};
