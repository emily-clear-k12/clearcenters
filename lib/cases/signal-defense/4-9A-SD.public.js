// Signal Defense — 4.9A, Patterns of Change in Seasons (Grade 4 Science).
// Grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.9A verbatim (TEA adopted grade 4 science TEKS): "collect and
// analyze data to identify sequences and predict patterns of change in
// seasons such as change in temperature and length of daylight"
//
// Verbs: COLLECT and ANALYZE DATA, to IDENTIFY SEQUENCES and PREDICT
// PATTERNS. That is an unusually demanding verb stack for grade 4, and it
// changes the bank: questions give the student a small set of readings and
// ask what comes next, what the sequence is, or what the data shows —
// rather than asking which season is hottest.
//
// Scope: the standard's own two named data types, temperature and length of
// daylight. Why seasons happen (Earth's tilt, orbit) is NOT in this
// expectation and is kept out, the same discipline that fixed the gravity
// slip in 4.10B.

export const PUBLIC_CASE = {
  standard: "4.9A-SD",
  title: "Signal Defense: Patterns of Change in Seasons",
  questions: [
    {
      "id": "4.9A-1",
      "type": "multiple_choice",
      "title": "A class records daylight hours: January 10, February 11, March 12. What should they predict for April?",
      "prompt": "Choose the best answer.",
      "choices": [
        "About 13 hours",
        "About 9 hours",
        "Exactly 12 hours again",
        "It cannot be predicted"
      ],
      "correct": "About 13 hours"
    },
    {
      "id": "4.9A-2",
      "type": "multiple_choice",
      "title": "Average temperatures fall from September through December. What sequence does that show?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A pattern of warming toward summer",
        "A pattern of cooling toward winter",
        "No pattern at all",
        "Temperatures changing randomly"
      ],
      "correct": "A pattern of cooling toward winter"
    },
    {
      "id": "4.9A-3",
      "type": "multiple_choice",
      "title": "Which data would be most useful for studying how daylight changes across a year?",
      "prompt": "Choose the best answer.",
      "choices": [
        "How many clouds there were each day",
        "The color of the leaves",
        "Sunrise and sunset times recorded each month",
        "How many students wore jackets"
      ],
      "correct": "Sunrise and sunset times recorded each month"
    },
    {
      "id": "4.9A-4",
      "type": "multiple_choice",
      "title": "A student records the longest day of daylight in June and the shortest in December. What does the pattern do after December?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Daylight keeps getting shorter forever",
        "Daylight stays the same all year",
        "Daylight changes randomly",
        "Daylight begins getting longer again"
      ],
      "correct": "Daylight begins getting longer again"
    },
    {
      "id": "4.9A-5",
      "type": "multiple_choice",
      "title": "Why should a class record temperature at the same time each day?",
      "prompt": "Choose the best answer.",
      "choices": [
        "So the readings can be fairly compared",
        "So the temperature will be higher",
        "Because mornings are always warmest",
        "So they only need one reading a month"
      ],
      "correct": "So the readings can be fairly compared"
    },
    {
      "id": "4.9A-6",
      "type": "multiple_choice",
      "title": "A table shows average temperature rising each month from February to June. Which month is likely warmest?",
      "prompt": "Choose the best answer.",
      "choices": [
        "February",
        "June",
        "April",
        "They are all equal"
      ],
      "correct": "June"
    },
    {
      "id": "4.9A-7",
      "type": "true_false",
      "title": "The length of daylight changes in a repeating pattern across the year.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9A-8",
      "type": "true_false",
      "title": "Recording data over many months makes a seasonal pattern easier to see.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9A-9",
      "type": "true_false",
      "title": "Summer days generally have more hours of daylight than winter days.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9A-10",
      "type": "true_false",
      "title": "One day's temperature reading is enough to identify a seasonal pattern.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.9A-11",
      "type": "true_false",
      "title": "Seasonal patterns repeat in the same order year after year.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9A-12",
      "type": "true_false",
      "title": "A single unusually warm day in January means the seasonal pattern has changed.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.9A-13",
      "type": "true_false",
      "title": "A graph of monthly data can help you predict what the next month will be like.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.9A-14",
      "type": "multi_select",
      "title": "Which data would help a class identify patterns of change in seasons?",
      "prompt": "Select all that apply.",
      "choices": [
        "Daily high temperature",
        "Hours of daylight each month",
        "Sunrise and sunset times",
        "Favorite season of each student",
        "Average monthly temperature",
        "How many recess games were played"
      ],
      "correct": [
        "Daily high temperature",
        "Hours of daylight each month",
        "Sunrise and sunset times",
        "Average monthly temperature"
      ]
    },
    {
      "id": "4.9A-15",
      "type": "multi_select",
      "title": "Which statements about seasonal patterns are correct?",
      "prompt": "Select all that apply.",
      "choices": [
        "Daylight hours change gradually through the year",
        "The pattern repeats every year",
        "Temperature generally rises toward summer",
        "Each day is completely unrelated to the last",
        "Temperature generally falls toward winter",
        "Patterns can be used to predict what comes next"
      ],
      "correct": [
        "Daylight hours change gradually through the year",
        "The pattern repeats every year",
        "Temperature generally rises toward summer",
        "Temperature generally falls toward winter",
        "Patterns can be used to predict what comes next"
      ]
    },
    {
      "id": "4.9A-16",
      "type": "multi_select",
      "title": "A class is collecting seasonal data. Which habits make the data more reliable?",
      "prompt": "Select all that apply.",
      "choices": [
        "Measuring at the same time every day",
        "Using the same thermometer each time",
        "Recording every reading, even surprising ones",
        "Skipping days that seem boring",
        "Measuring in the same spot each time",
        "Rounding numbers differently each week"
      ],
      "correct": [
        "Measuring at the same time every day",
        "Using the same thermometer each time",
        "Recording every reading, even surprising ones",
        "Measuring in the same spot each time"
      ]
    },
    {
      "id": "4.9A-17",
      "type": "multi_select",
      "title": "Daylight is recorded as 10, 11, 12, and 13 hours over four months. Which conclusions fit the data?",
      "prompt": "Select all that apply.",
      "choices": [
        "Daylight is increasing month by month",
        "The next month will likely have more than 13 hours",
        "The change is about one hour per month",
        "Daylight is decreasing",
        "There is no pattern in the data",
        "The season is moving toward summer"
      ],
      "correct": [
        "Daylight is increasing month by month",
        "The next month will likely have more than 13 hours",
        "The change is about one hour per month",
        "The season is moving toward summer"
      ]
    },
    {
      "id": "4.9A-18",
      "type": "multi_select",
      "title": "Which are good reasons to graph a year of monthly temperature data?",
      "prompt": "Select all that apply.",
      "choices": [
        "A graph shows the shape of the pattern quickly",
        "You can see which months were warmest and coolest",
        "You can spot where the trend turns around",
        "It makes the temperatures higher",
        "It helps you predict the next month",
        "It removes readings you did not like"
      ],
      "correct": [
        "A graph shows the shape of the pattern quickly",
        "You can see which months were warmest and coolest",
        "You can spot where the trend turns around",
        "It helps you predict the next month"
      ]
    },
    {
      "id": "4.9A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "As the year moves from winter toward summer, the hours of daylight ",
        " and the average temperature ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "increase",
            "decrease"
          ],
          "correct": "increase"
        },
        {
          "choices": [
            "falls",
            "rises"
          ],
          "correct": "rises"
        }
      ]
    },
    {
      "id": "4.9A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Collecting data over ",
        " months makes a seasonal pattern ",
        " to identify."
      ],
      "blanks": [
        {
          "choices": [
            "many",
            "two"
          ],
          "correct": "many"
        },
        {
          "choices": [
            "harder",
            "easier"
          ],
          "correct": "easier"
        }
      ]
    },
    {
      "id": "4.9A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If daylight has grown about an hour each month, you can ",
        " that next month will have ",
        " daylight."
      ],
      "blanks": [
        {
          "choices": [
            "predict",
            "guess wildly"
          ],
          "correct": "predict"
        },
        {
          "choices": [
            "less",
            "more"
          ],
          "correct": "more"
        }
      ]
    },
    {
      "id": "4.9A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Readings should be taken at the same time and place each day so the data can be compared ",
        ", which makes the pattern ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "fairly",
            "quickly"
          ],
          "correct": "fairly"
        },
        {
          "choices": [
            "warmer",
            "trustworthy"
          ],
          "correct": "trustworthy"
        }
      ]
    },
    {
      "id": "4.9A-23",
      "type": "ordering",
      "title": "Put these steps in order for finding a seasonal temperature pattern:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Graph the monthly averages",
        "Record the temperature at the same time each day",
        "Predict what next month will look like",
        "Find the average temperature for each month"
      ],
      "correct": [
        "Record the temperature at the same time each day",
        "Find the average temperature for each month",
        "Graph the monthly averages",
        "Predict what next month will look like"
      ]
    },
    {
      "id": "4.9A-24",
      "type": "ordering",
      "title": "Put these months in order from shortest daylight to longest, in Texas:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "June",
        "December",
        "April",
        "February"
      ],
      "correct": [
        "December",
        "February",
        "April",
        "June"
      ]
    },
    {
      "id": "4.9A-25",
      "type": "ordering",
      "title": "Put these steps in order for using daylight data to make a prediction:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Notice how much it changes from month to month",
        "Collect sunrise and sunset times for several months",
        "Predict the daylight hours for the next month",
        "Work out the daylight hours for each month"
      ],
      "correct": [
        "Collect sunrise and sunset times for several months",
        "Work out the daylight hours for each month",
        "Notice how much it changes from month to month",
        "Predict the daylight hours for the next month"
      ]
    }
  ],
};
