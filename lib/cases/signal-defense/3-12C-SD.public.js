// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.12C_v1.md) into the
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
  standard: "3.12C-SD",
  title: "Signal Defense: Environmental Changes",
  questions: [
    {
      "id": "3.12C-1",
      "type": "multiple_choice",
      "title": "During a drought (a long period with little rain), what might happen to plants that need a lot of water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They would grow better than ever",
        "They might wilt, stop growing, or die from lack of water",
        "Nothing would happen to them",
        "They would turn into a different kind of plant"
      ],
      "correct": "They might wilt, stop growing, or die from lack of water"
    },
    {
      "id": "3.12C-2",
      "type": "multiple_choice",
      "title": "During a flood, what might happen to animals that cannot swim well and live on land near a river?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They would be completely unaffected",
        "They might need to move to higher, drier ground to survive",
        "They would grow gills instantly",
        "They would stop needing water entirely"
      ],
      "correct": "They might need to move to higher, drier ground to survive"
    },
    {
      "id": "3.12C-3",
      "type": "multiple_choice",
      "title": "Which of these organisms would likely THRIVE (do well) during a flood?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A desert cactus that needs very little water",
        "A fish or other water-loving organism that benefits from more water",
        "A plant that quickly dies if its roots stay wet too long",
        "None of these would do well"
      ],
      "correct": "A fish or other water-loving organism that benefits from more water"
    },
    {
      "id": "3.12C-4",
      "type": "multiple_choice",
      "title": "Which of these organisms would likely THRIVE (do well) during a drought?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A fish that needs to stay underwater",
        "A cactus or other plant adapted to survive with very little water",
        "A frog that needs a wet pond to survive",
        "None of these would do well"
      ],
      "correct": "A cactus or other plant adapted to survive with very little water"
    },
    {
      "id": "3.12C-5",
      "type": "multiple_choice",
      "title": "A natural change to the environment, like a flood or drought, affects different organisms:",
      "prompt": "Choose the best answer.",
      "choices": [
        "In the exact same way every time",
        "Differently — some organisms may thrive, some may perish, and some may move to a new location",
        "Not at all — environmental changes never affect organisms",
        "Only during the daytime"
      ],
      "correct": "Differently — some organisms may thrive, some may perish, and some may move to a new location"
    },
    {
      "id": "3.12C-6",
      "type": "multiple_choice",
      "title": "Why might some animals move to a new location after a natural environmental change like a drought?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They enjoy traveling for fun",
        "Their food or water source in their old location may have become scarce",
        "Moving has nothing to do with survival",
        "Animals never move for any reason"
      ],
      "correct": "Their food or water source in their old location may have become scarce"
    },
    {
      "id": "3.12C-7",
      "type": "multi_select",
      "title": "Which of these could happen to organisms during a drought?",
      "prompt": "Select all that apply.",
      "choices": [
        "Water-loving plants could wilt or die",
        "Animals could move to find water elsewhere",
        "Drought-adapted plants, like cacti, could continue to thrive",
        "Every single organism would be affected in the exact same way",
        "Nothing would change for any organism"
      ],
      "correct": [
        "Water-loving plants could wilt or die",
        "Animals could move to find water elsewhere",
        "Drought-adapted plants, like cacti, could continue to thrive"
      ]
    },
    {
      "id": "3.12C-8",
      "type": "multi_select",
      "title": "Which of these could happen to organisms during a flood?",
      "prompt": "Select all that apply.",
      "choices": [
        "Land animals could need to move to higher ground",
        "Water-loving organisms, like fish, could thrive with more water available",
        "Plants that can't survive with waterlogged roots could die",
        "Every organism would react in the exact same way",
        "Nothing about the environment would change"
      ],
      "correct": [
        "Land animals could need to move to higher ground",
        "Water-loving organisms, like fish, could thrive with more water available",
        "Plants that can't survive with waterlogged roots could die"
      ]
    },
    {
      "id": "3.12C-9",
      "type": "multi_select",
      "title": "Which of these describe possible outcomes for organisms after a natural environmental change?",
      "prompt": "Select all that apply.",
      "choices": [
        "Some organisms could thrive (do well)",
        "Some organisms could perish (die)",
        "Some organisms could move to a new location",
        "All organisms always react in the exact same way",
        "Environmental changes never affect living things"
      ],
      "correct": [
        "Some organisms could thrive (do well)",
        "Some organisms could perish (die)",
        "Some organisms could move to a new location"
      ]
    },
    {
      "id": "3.12C-10",
      "type": "multi_select",
      "title": "Which of these are examples of natural changes to the environment?",
      "prompt": "Select all that apply.",
      "choices": [
        "A flood",
        "A drought",
        "A student cleaning their room",
        "A rock sitting still on a shelf",
        "A book being read"
      ],
      "correct": [
        "A flood",
        "A drought"
      ]
    },
    {
      "id": "3.12C-11",
      "type": "multi_select",
      "title": "Which of these organisms might be well-suited to THRIVE during a drought?",
      "prompt": "Select all that apply.",
      "choices": [
        "A cactus adapted to store water",
        "A desert lizard adapted to little water",
        "A fish that needs to stay underwater",
        "A frog that needs a wet pond",
        "A plant with very deep roots that can reach underground water"
      ],
      "correct": [
        "A cactus adapted to store water",
        "A desert lizard adapted to little water",
        "A plant with very deep roots that can reach underground water"
      ]
    },
    {
      "id": "3.12C-12",
      "type": "multi_select",
      "title": "Which of these organisms might be well-suited to THRIVE during a flood?",
      "prompt": "Select all that apply.",
      "choices": [
        "A fish or other water-dwelling animal",
        "A plant adapted to grow in wet, swampy conditions",
        "A cactus adapted to very little water",
        "A desert lizard",
        "A duck or other water bird"
      ],
      "correct": [
        "A fish or other water-dwelling animal",
        "A plant adapted to grow in wet, swampy conditions",
        "A duck or other water bird"
      ]
    },
    {
      "id": "3.12C-13",
      "type": "true_false",
      "title": "A drought is a long period of little to no rain.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12C-14",
      "type": "true_false",
      "title": "A flood always helps every single organism in an area, with no downsides for anyone.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a flood can help some organisms, like fish, while harming others, like land plants that can't survive waterlogged roots."
    },
    {
      "id": "3.12C-15",
      "type": "true_false",
      "title": "During a drought, some plants might wilt or die from lack of water, while drought-adapted plants like cacti might continue to thrive.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12C-16",
      "type": "true_false",
      "title": "Natural environmental changes like floods and droughts affect every organism in exactly the same way.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "different organisms can respond very differently to the same environmental change."
    },
    {
      "id": "3.12C-17",
      "type": "true_false",
      "title": "Some animals might move to a new location if their food or water source becomes scarce after an environmental change.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12C-18",
      "type": "true_false",
      "title": "A fish would likely do better than a desert cactus during a flood.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12C-19",
      "type": "true_false",
      "title": "Environmental changes like floods and droughts never cause any organisms to move or die.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "floods and droughts can cause some organisms to thrive, some to perish, and some to relocate."
    },
    {
      "id": "3.12C-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "During a drought, a desert lizard adapted to needing very little water would likely ",
        ", while a plant that needs a lot of water would likely ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "continue to survive well",
            "quickly die"
          ],
          "correct": "continue to survive well"
        },
        {
          "choices": [
            "wilt or die",
            "grow even better"
          ],
          "correct": "wilt or die"
        }
      ]
    },
    {
      "id": "3.12C-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "During a flood, a duck that swims well would likely ",
        ", while a land animal that cannot swim well might need to ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "benefit from the extra water",
            "struggle to survive"
          ],
          "correct": "benefit from the extra water"
        },
        {
          "choices": [
            "move to higher ground",
            "stay exactly where it is"
          ],
          "correct": "move to higher ground"
        }
      ]
    },
    {
      "id": "3.12C-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A natural change like a flood or drought can cause some organisms to ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "thrive, while others perish or move away",
            "all react in the exact same way"
          ],
          "correct": "thrive, while others perish or move away"
        }
      ]
    },
    {
      "id": "3.12C-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If a pond dries up during a drought, fish living there might ",
        ", since fish need ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "perish or need to move to another water source",
            "grow better than ever"
          ],
          "correct": "perish or need to move to another water source"
        },
        {
          "choices": [
            "water to survive",
            "very little water"
          ],
          "correct": "water to survive"
        }
      ]
    },
    {
      "id": "3.12C-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how a drought can affect a field's plants and animals:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Rain stops falling for a long period of time",
        "Plants that need a lot of water begin to wilt or die",
        "Animals that ate those plants may need to find food elsewhere",
        "Drought-adapted plants and animals continue to survive better than the others"
      ],
      "correct": [
        "Rain stops falling for a long period of time",
        "Plants that need a lot of water begin to wilt or die",
        "Animals that ate those plants may need to find food elsewhere",
        "Drought-adapted plants and animals continue to survive better than the others"
      ]
    },
    {
      "id": "3.12C-25",
      "type": "ordering",
      "title": "A class is predicting how a flood would affect a riverside habitat. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Heavy rain causes the river to rise and flood the surrounding land",
        "Water-loving organisms, like fish, benefit from the extra water",
        "Land animals that can't swim well move to higher, drier ground",
        "Plants that can't survive waterlogged roots begin to die"
      ],
      "correct": [
        "Heavy rain causes the river to rise and flood the surrounding land",
        "Water-loving organisms, like fish, benefit from the extra water",
        "Land animals that can't swim well move to higher, drier ground",
        "Plants that can't survive waterlogged roots begin to die"
      ]
    }
  ],
};
