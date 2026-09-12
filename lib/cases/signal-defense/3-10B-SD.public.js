// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.10B_v1.md) into the
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
  standard: "3.10B-SD",
  title: "Signal Defense: Soil Composition",
  questions: [
    {
      "id": "3.10B-1",
      "type": "multiple_choice",
      "title": "Soil is made mostly of tiny broken pieces of rock mixed with what other material?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Melted metal",
        "Decayed (broken-down) plant and animal material",
        "Pure water",
        "Liquid glass"
      ],
      "correct": "Decayed (broken-down) plant and animal material"
    },
    {
      "id": "3.10B-2",
      "type": "multiple_choice",
      "title": "Which of these processes breaks big rocks into smaller and smaller pieces over time?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Photosynthesis",
        "Weathering",
        "Evaporation",
        "Magnetism"
      ],
      "correct": "Weathering"
    },
    {
      "id": "3.10B-3",
      "type": "multiple_choice",
      "title": "A dead leaf slowly breaks down and mixes into the soil over many months. What is this process called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Weathering",
        "Freezing",
        "Decomposition",
        "Evaporation"
      ],
      "correct": "Decomposition"
    },
    {
      "id": "3.10B-4",
      "type": "multiple_choice",
      "title": "Which of these best describes what causes weathering of rock?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A rock sitting in a museum display case",
        "Wind, water, and freezing/thawing wearing away at a rock's surface",
        "A rock being painted a new color",
        "A rock being weighed on a scale"
      ],
      "correct": "Wind, water, and freezing/thawing wearing away at a rock's surface"
    },
    {
      "id": "3.10B-5",
      "type": "multiple_choice",
      "title": "Why does soil usually contain decayed leaves, twigs, and other plant material?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Plants are planted directly in the soil by farmers only",
        "Dead plants decompose over time and become part of the soil",
        "Soil is grown from seeds",
        "Plants never become part of the soil"
      ],
      "correct": "Dead plants decompose over time and become part of the soil"
    },
    {
      "id": "3.10B-6",
      "type": "multiple_choice",
      "title": "Which best describes how soil forms?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Soil appears instantly with no process involved",
        "Soil is only made of water",
        "Weathered rock pieces mix with decomposed plant and animal material over a long time",
        "Soil is made only of sand and nothing else"
      ],
      "correct": "Weathered rock pieces mix with decomposed plant and animal material over a long time"
    },
    {
      "id": "3.10B-7",
      "type": "multi_select",
      "title": "Which of these can cause rocks to weather (break down) over time?",
      "prompt": "Select all that apply.",
      "choices": [
        "Wind blowing against a rock's surface",
        "Water flowing over a rock",
        "A rock repeatedly freezing and thawing",
        "A rock sitting untouched in a sealed box",
        "Painting a rock a new color"
      ],
      "correct": [
        "Wind blowing against a rock's surface",
        "Water flowing over a rock",
        "A rock repeatedly freezing and thawing"
      ]
    },
    {
      "id": "3.10B-8",
      "type": "multi_select",
      "title": "Which of these are part of how soil forms?",
      "prompt": "Select all that apply.",
      "choices": [
        "Weathering breaks rock into small pieces",
        "Decomposition breaks down dead plants and animals",
        "These broken-down materials mix together over time",
        "Soil forms instantly overnight",
        "Soil is only made of liquid water"
      ],
      "correct": [
        "Weathering breaks rock into small pieces",
        "Decomposition breaks down dead plants and animals",
        "These broken-down materials mix together over time"
      ]
    },
    {
      "id": "3.10B-9",
      "type": "multi_select",
      "title": "Which of these are examples of decomposition?",
      "prompt": "Select all that apply.",
      "choices": [
        "A fallen leaf slowly rotting on the forest floor",
        "A dead insect breaking down into the soil",
        "An old log slowly crumbling and rotting over years",
        "A rock being worn smooth by a river",
        "Wind blowing sand across a desert"
      ],
      "correct": [
        "A fallen leaf slowly rotting on the forest floor",
        "A dead insect breaking down into the soil",
        "An old log slowly crumbling and rotting over years"
      ]
    },
    {
      "id": "3.10B-10",
      "type": "multi_select",
      "title": "Which of these are examples of weathering?",
      "prompt": "Select all that apply.",
      "choices": [
        "A river slowly smoothing and wearing down rocks",
        "Wind blowing sand that scrapes against a cliff",
        "A crack in a rock widening after water freezes and expands inside it",
        "A leaf decomposing into the soil",
        "A dead animal decomposing"
      ],
      "correct": [
        "A river slowly smoothing and wearing down rocks",
        "Wind blowing sand that scrapes against a cliff",
        "A crack in a rock widening after water freezes and expands inside it"
      ]
    },
    {
      "id": "3.10B-11",
      "type": "multi_select",
      "title": "Which materials would you expect to find mixed together in healthy soil?",
      "prompt": "Select all that apply.",
      "choices": [
        "Tiny weathered pieces of rock",
        "Decomposed (rotted) plant material",
        "Decomposed animal remains",
        "Large, unweathered boulders",
        "Melted metal"
      ],
      "correct": [
        "Tiny weathered pieces of rock",
        "Decomposed (rotted) plant material",
        "Decomposed animal remains"
      ]
    },
    {
      "id": "3.10B-12",
      "type": "multi_select",
      "title": "Which of these show weathering and decomposition working together to help form soil?",
      "prompt": "Select all that apply.",
      "choices": [
        "Wind wearing down a rock into tiny pieces that mix with rotting leaves",
        "A fallen log slowly crumbling as it rots, mixing with bits of weathered stone nearby",
        "A rock sitting in a museum display, untouched",
        "A plastic toy left in a sealed container"
      ],
      "correct": [
        "Wind wearing down a rock into tiny pieces that mix with rotting leaves",
        "A fallen log slowly crumbling as it rots, mixing with bits of weathered stone nearby"
      ]
    },
    {
      "id": "3.10B-13",
      "type": "true_false",
      "title": "Soil is made of weathered rock pieces mixed with decomposed plant and animal material.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10B-14",
      "type": "true_false",
      "title": "Weathering happens instantly, in just a few seconds.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "weathering usually happens slowly, over a long period of time."
    },
    {
      "id": "3.10B-15",
      "type": "true_false",
      "title": "A river slowly wears down and smooths rocks over many years.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10B-16",
      "type": "true_false",
      "title": "Decomposition is the process of a rock breaking into smaller pieces.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "decomposition is the breakdown of dead plants and animals; weathering is the breaking down of rock."
    },
    {
      "id": "3.10B-17",
      "type": "true_false",
      "title": "A dead insect breaking down and becoming part of the soil is an example of decomposition.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10B-18",
      "type": "true_false",
      "title": "Soil can form without any weathering of rock at all.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "soil formation depends on weathered rock pieces mixing with decomposed plant and animal material."
    },
    {
      "id": "3.10B-19",
      "type": "true_false",
      "title": "Both weathering and decomposition play a role in how soil forms.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A desert wind blows sand against a rock for many years, slowly scraping away its surface. This process is called ",
        ", and it happens ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "weathering",
            "decomposition"
          ],
          "correct": "weathering"
        },
        {
          "choices": [
            "slowly, over a long time",
            "instantly, in seconds"
          ],
          "correct": "slowly, over a long time"
        }
      ]
    },
    {
      "id": "3.10B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A fallen log slowly rots and crumbles over many years, eventually becoming part of the soil. This process is called ",
        ", and it involves ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "decomposition",
            "weathering"
          ],
          "correct": "decomposition"
        },
        {
          "choices": [
            "dead plant or animal material",
            "solid rock"
          ],
          "correct": "dead plant or animal material"
        }
      ]
    },
    {
      "id": "3.10B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Soil forms when tiny ",
        " mix together with ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "weathered rock pieces",
            "liquid metal drops"
          ],
          "correct": "weathered rock pieces"
        },
        {
          "choices": [
            "decomposed plant and animal material",
            "pure sand only"
          ],
          "correct": "decomposed plant and animal material"
        }
      ]
    },
    {
      "id": "3.10B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A crack in a rock gets wider after water freezes and expands inside it. This is an example of ",
        ", because it is breaking down ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "weathering",
            "decomposition"
          ],
          "correct": "weathering"
        },
        {
          "choices": [
            "rock",
            "dead plant material"
          ],
          "correct": "rock"
        }
      ]
    },
    {
      "id": "3.10B-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how soil forms over a long period of time:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Wind, water, and freezing/thawing slowly weather a large rock into smaller pieces",
        "The small rock pieces continue breaking down into tiny bits",
        "Dead leaves, insects, and other organic material decompose nearby",
        "The weathered rock bits and decomposed material mix together to form soil"
      ],
      "correct": [
        "Wind, water, and freezing/thawing slowly weather a large rock into smaller pieces",
        "The small rock pieces continue breaking down into tiny bits",
        "Dead leaves, insects, and other organic material decompose nearby",
        "The weathered rock bits and decomposed material mix together to form soil"
      ]
    },
    {
      "id": "3.10B-25",
      "type": "ordering",
      "title": "A student is testing how water and freezing affect a rock over time. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what will happen to a rock after water gets into its cracks and freezes many times",
        "Pour water into a crack in the rock and let it freeze overnight",
        "Check the rock the next day to see if the crack changed",
        "Repeat the freezing process several times and record how the crack changes"
      ],
      "correct": [
        "Predict what will happen to a rock after water gets into its cracks and freezes many times",
        "Pour water into a crack in the rock and let it freeze overnight",
        "Check the rock the next day to see if the crack changed",
        "Repeat the freezing process several times and record how the crack changes"
      ]
    }
  ],
};
