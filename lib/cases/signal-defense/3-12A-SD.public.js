// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.12A_v1.md) into the
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
  standard: "3.12A-SD",
  title: "Signal Defense: Animal Behaviors & Adaptation",
  questions: [
    {
      "id": "3.12A-1",
      "type": "multiple_choice",
      "title": "Every fall, many birds fly to a warmer location for the winter and return in spring. What is this behavior called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Hibernation",
        "Migration",
        "Dormancy",
        "Decomposition"
      ],
      "correct": "Migration"
    },
    {
      "id": "3.12A-2",
      "type": "multiple_choice",
      "title": "A bear finds a den and goes into a long, deep sleep-like state for most of the winter to save energy. What is this called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Migration",
        "Hibernation",
        "Dormancy",
        "Weathering"
      ],
      "correct": "Hibernation"
    },
    {
      "id": "3.12A-3",
      "type": "multiple_choice",
      "title": "A tree drops its leaves and stops actively growing during the cold winter months. What is this plant response called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Migration",
        "Hibernation",
        "Dormancy",
        "Evaporation"
      ],
      "correct": "Dormancy"
    },
    {
      "id": "3.12A-4",
      "type": "multiple_choice",
      "title": "Why do many animals migrate or hibernate, or plants become dormant, as temperatures drop in winter?",
      "prompt": "Choose the best answer.",
      "choices": [
        "These are all random behaviors with no cause",
        "These responses help animals and plants survive when temperature and food become scarce",
        "Cold weather has no effect on living things",
        "Only plants are affected by temperature"
      ],
      "correct": "These responses help animals and plants survive when temperature and food become scarce"
    },
    {
      "id": "3.12A-5",
      "type": "multiple_choice",
      "title": "Which of these best describes migration?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A long, deep sleep an animal enters to save energy",
        "A plant becoming inactive during unfavorable conditions",
        "An animal traveling to a different location, often due to changing temperature or food supply",
        "A tree losing its leaves"
      ],
      "correct": "An animal traveling to a different location, often due to changing temperature or food supply"
    },
    {
      "id": "3.12A-6",
      "type": "multiple_choice",
      "title": "A desert plant slows or stops its growth during a long period without rain, then grows again once rain returns. Which response is this plant showing?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Migration",
        "Hibernation",
        "Dormancy, triggered by a lack of precipitation",
        "None of these"
      ],
      "correct": "Dormancy, triggered by a lack of precipitation"
    },
    {
      "id": "3.12A-7",
      "type": "multi_select",
      "title": "Which of these are examples of migration?",
      "prompt": "Select all that apply.",
      "choices": [
        "Geese flying south for the winter",
        "Monarch butterflies traveling to a warmer region each fall",
        "A bear sleeping in a den all winter",
        "A tree losing its leaves",
        "Whales swimming to warmer waters to breed"
      ],
      "correct": [
        "Geese flying south for the winter",
        "Monarch butterflies traveling to a warmer region each fall",
        "Whales swimming to warmer waters to breed"
      ]
    },
    {
      "id": "3.12A-8",
      "type": "multi_select",
      "title": "Which of these are examples of hibernation?",
      "prompt": "Select all that apply.",
      "choices": [
        "A bear sleeping through most of the winter in a den",
        "A groundhog going into a deep sleep underground during cold months",
        "Birds flying to a warmer place for winter",
        "A tree dropping its leaves",
        "A bat sleeping through the winter in a cave"
      ],
      "correct": [
        "A bear sleeping through most of the winter in a den",
        "A groundhog going into a deep sleep underground during cold months",
        "A bat sleeping through the winter in a cave"
      ]
    },
    {
      "id": "3.12A-9",
      "type": "multi_select",
      "title": "Which of these are examples of dormancy in plants?",
      "prompt": "Select all that apply.",
      "choices": [
        "A tree losing its leaves and not growing during winter",
        "A desert plant pausing its growth during a long dry spell",
        "Grass turning brown and not growing during a drought",
        "A bird flying south for the winter",
        "A bear sleeping in a den"
      ],
      "correct": [
        "A tree losing its leaves and not growing during winter",
        "A desert plant pausing its growth during a long dry spell",
        "Grass turning brown and not growing during a drought"
      ]
    },
    {
      "id": "3.12A-10",
      "type": "multi_select",
      "title": "Which of these can trigger migration, hibernation, or dormancy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A drop in temperature as winter approaches",
        "A lack of precipitation (rain) during a drought",
        "A change in food availability",
        "A single sunny afternoon",
        "Nothing ever triggers these responses"
      ],
      "correct": [
        "A drop in temperature as winter approaches",
        "A lack of precipitation (rain) during a drought",
        "A change in food availability"
      ]
    },
    {
      "id": "3.12A-11",
      "type": "multi_select",
      "title": "Which of these are true about how temperature and precipitation affect living things?",
      "prompt": "Select all that apply.",
      "choices": [
        "Falling temperatures can trigger animals to migrate or hibernate",
        "A lack of rain can cause a plant to become dormant",
        "These responses help living things survive difficult conditions",
        "Temperature and precipitation never affect animals or plants",
        "All animals respond to cold in the exact same way"
      ],
      "correct": [
        "Falling temperatures can trigger animals to migrate or hibernate",
        "A lack of rain can cause a plant to become dormant",
        "These responses help living things survive difficult conditions"
      ]
    },
    {
      "id": "3.12A-12",
      "type": "multi_select",
      "title": "A student is sorting animal behaviors by category. Which of these belong in the \"hibernation\" group?",
      "prompt": "Select all that apply.",
      "choices": [
        "A bear denning up for winter",
        "A groundhog sleeping underground through the cold months",
        "A tree going dormant",
        "Geese flying south",
        "A desert plant pausing growth during a drought"
      ],
      "correct": [
        "A bear denning up for winter",
        "A groundhog sleeping underground through the cold months"
      ]
    },
    {
      "id": "3.12A-13",
      "type": "true_false",
      "title": "Migration is when an animal travels to a different location, often because of changing temperature or food supply.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12A-14",
      "type": "true_false",
      "title": "Hibernation is when a plant becomes inactive during unfavorable conditions like cold or drought.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "hibernation is a long, deep sleep-like state some animals enter, usually to survive winter; a plant becoming inactive is called dormancy."
    },
    {
      "id": "3.12A-15",
      "type": "true_false",
      "title": "Dormancy is a response some plants show when conditions like cold temperatures or lack of rain make it hard to grow.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12A-16",
      "type": "true_false",
      "title": "Falling temperatures in autumn can trigger animals to begin migrating or preparing to hibernate.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12A-17",
      "type": "true_false",
      "title": "A long period without rain (a drought) has no effect on plants at all.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a lack of rain can cause some plants to become dormant, pausing their growth until conditions improve."
    },
    {
      "id": "3.12A-18",
      "type": "true_false",
      "title": "Migration, hibernation, and dormancy are all ways animals and plants can respond to changing temperature or precipitation.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12A-19",
      "type": "true_false",
      "title": "All animals respond to winter in exactly the same way.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "different animals respond differently; some migrate, some hibernate, and some stay active all winter."
    },
    {
      "id": "3.12A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Monarch butterflies travel to a warmer region every fall as temperatures drop. This behavior is called ",
        ", which means the butterflies ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "migration",
            "hibernation"
          ],
          "correct": "migration"
        },
        {
          "choices": [
            "travel to a new location",
            "go into a long sleep in place"
          ],
          "correct": "travel to a new location"
        }
      ]
    },
    {
      "id": "3.12A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A groundhog goes into a deep, sleep-like state underground for most of the winter. This is called ",
        ", which helps the groundhog ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "hibernation",
            "dormancy"
          ],
          "correct": "hibernation"
        },
        {
          "choices": [
            "save energy during a time when food is scarce",
            "travel somewhere warmer"
          ],
          "correct": "save energy during a time when food is scarce"
        }
      ]
    },
    {
      "id": "3.12A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "During a long drought with little rain, a grassy field turns brown and stops growing. This is an example of ",
        ", triggered by a lack of ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "dormancy",
            "migration"
          ],
          "correct": "dormancy"
        },
        {
          "choices": [
            "precipitation",
            "temperature change"
          ],
          "correct": "precipitation"
        }
      ]
    },
    {
      "id": "3.12A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "As winter approaches and temperatures drop, some animals ",
        " in order to survive the changing conditions."
      ],
      "blanks": [
        {
          "choices": [
            "migrate or hibernate, while some plants become dormant",
            "do nothing at all and are unaffected"
          ],
          "correct": "migrate or hibernate, while some plants become dormant"
        }
      ]
    },
    {
      "id": "3.12A-24",
      "type": "ordering",
      "title": "Put these steps in order to explain why geese migrate each fall:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Temperatures begin to drop as fall arrives",
        "Food becomes harder to find in the colder area",
        "The geese fly to a warmer location where food is easier to find",
        "The geese return to the original location once it warms up again in spring"
      ],
      "correct": [
        "Temperatures begin to drop as fall arrives",
        "Food becomes harder to find in the colder area",
        "The geese fly to a warmer location where food is easier to find",
        "The geese return to the original location once it warms up again in spring"
      ]
    },
    {
      "id": "3.12A-25",
      "type": "ordering",
      "title": "A student is researching how a tree responds to the changing seasons. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "In fall, temperatures begin to drop",
        "The tree's leaves change color and fall off",
        "The tree becomes dormant, stopping active growth through the winter",
        "In spring, warmer temperatures and rain trigger new growth and leaves"
      ],
      "correct": [
        "In fall, temperatures begin to drop",
        "The tree's leaves change color and fall off",
        "The tree becomes dormant, stopping active growth through the winter",
        "In spring, warmer temperatures and rain trigger new growth and leaves"
      ]
    }
  ],
};
