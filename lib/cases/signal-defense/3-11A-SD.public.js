// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.11A_v1.md) into the
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
  standard: "3.11A-SD",
  title: "Signal Defense: Natural Resources",
  questions: [
    {
      "id": "3.11A-1",
      "type": "multiple_choice",
      "title": "Which natural resource is commonly used to build the wooden frame of a house?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Water",
        "Wood (from trees)",
        "Coal",
        "Sunlight"
      ],
      "correct": "Wood (from trees)"
    },
    {
      "id": "3.11A-2",
      "type": "multiple_choice",
      "title": "Which natural resource is most important for growing crops on a farm?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Oil",
        "Soil and water",
        "Coal",
        "Sand"
      ],
      "correct": "Soil and water"
    },
    {
      "id": "3.11A-3",
      "type": "multiple_choice",
      "title": "Which natural resource is refined into gasoline to power most cars?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Wood",
        "Sand",
        "Oil (petroleum)",
        "Cotton"
      ],
      "correct": "Oil (petroleum)"
    },
    {
      "id": "3.11A-4",
      "type": "multiple_choice",
      "title": "Cotton grown on a farm is most often used to make which everyday product?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Cars",
        "Clothing and fabric",
        "Glass",
        "Gasoline"
      ],
      "correct": "Clothing and fabric"
    },
    {
      "id": "3.11A-5",
      "type": "multiple_choice",
      "title": "Which natural resource is melted down and shaped to make things like cans, cars, and tools?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Cotton",
        "Metal (from mined ore)",
        "Water",
        "Soil"
      ],
      "correct": "Metal (from mined ore)"
    },
    {
      "id": "3.11A-6",
      "type": "multiple_choice",
      "title": "Sand is a natural resource that is commonly melted down to make which product?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Paper",
        "Clothing",
        "Glass",
        "Gasoline"
      ],
      "correct": "Glass"
    },
    {
      "id": "3.11A-7",
      "type": "multi_select",
      "title": "Which of these natural resources are commonly used in construction (building things)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Wood",
        "Stone",
        "Sand (for concrete and glass)",
        "Cotton",
        "Coal"
      ],
      "correct": [
        "Wood",
        "Stone",
        "Sand (for concrete and glass)"
      ]
    },
    {
      "id": "3.11A-8",
      "type": "multi_select",
      "title": "Which of these natural resources are important for agriculture (growing food)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Soil",
        "Water",
        "Coal",
        "Oil",
        "Metal ore"
      ],
      "correct": [
        "Soil",
        "Water"
      ]
    },
    {
      "id": "3.11A-9",
      "type": "multi_select",
      "title": "Which of these natural resources are used for transportation (helping people and goods move)?",
      "prompt": "Select all that apply.",
      "choices": [
        "Oil, refined into gasoline",
        "Rubber (from trees), used for tires",
        "Metal, used to build cars and trains",
        "Cotton",
        "Soil"
      ],
      "correct": [
        "Oil, refined into gasoline",
        "Rubber (from trees), used for tires",
        "Metal, used to build cars and trains"
      ]
    },
    {
      "id": "3.11A-10",
      "type": "multi_select",
      "title": "Which of these everyday products come from natural resources?",
      "prompt": "Select all that apply.",
      "choices": [
        "Paper, made from trees",
        "Clothing, made from cotton",
        "Glass, made from sand",
        "Products can be made without any natural resources",
        "Plastic toys use no natural resources at all"
      ],
      "correct": [
        "Paper, made from trees",
        "Clothing, made from cotton",
        "Glass, made from sand"
      ]
    },
    {
      "id": "3.11A-11",
      "type": "multi_select",
      "title": "Which of these are examples of natural resources?",
      "prompt": "Select all that apply.",
      "choices": [
        "Trees (wood)",
        "Water",
        "Soil",
        "Oil",
        "Metal ore",
        "A plastic action figure",
        "A video game"
      ],
      "correct": [
        "Trees (wood)",
        "Water",
        "Soil",
        "Oil",
        "Metal ore"
      ]
    },
    {
      "id": "3.11A-12",
      "type": "multi_select",
      "title": "A student is sorting natural resources by how people use them. Which of these belong in the \"transportation\" group?",
      "prompt": "Select all that apply.",
      "choices": [
        "Oil, used to make gasoline",
        "Rubber, used to make tires",
        "Soil, used to grow crops",
        "Wood, used to build a house's frame",
        "Cotton, used to make a shirt"
      ],
      "correct": [
        "Oil, used to make gasoline",
        "Rubber, used to make tires"
      ]
    },
    {
      "id": "3.11A-13",
      "type": "true_false",
      "title": "Wood, water, soil, and oil are all examples of natural resources.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11A-14",
      "type": "true_false",
      "title": "Natural resources come only from factories, not from the Earth.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "natural resources come from the Earth itself, like trees, water, soil, and minerals; factories use natural resources to make products, but they don't create the resources."
    },
    {
      "id": "3.11A-15",
      "type": "true_false",
      "title": "Oil is refined to make gasoline, which powers most cars and trucks.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11A-16",
      "type": "true_false",
      "title": "Cotton, grown on farms, is commonly used to make clothing and fabric.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11A-17",
      "type": "true_false",
      "title": "Soil and water are important natural resources for growing crops on a farm.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11A-18",
      "type": "true_false",
      "title": "Metal used to build cars and tools comes from mined ore, a natural resource.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11A-19",
      "type": "true_false",
      "title": "Trees are a natural resource used only for building houses and never for anything else.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "trees are used for many things, including building, making paper, and more."
    },
    {
      "id": "3.11A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A concrete sidewalk is made using ",
        ", a natural resource that is mixed with water and cement to ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "sand",
            "cotton"
          ],
          "correct": "sand"
        },
        {
          "choices": [
            "harden into concrete",
            "grow into plants"
          ],
          "correct": "harden into concrete"
        }
      ]
    },
    {
      "id": "3.11A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Tires on a car are made from ",
        ", a natural resource that comes from ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "rubber",
            "sand"
          ],
          "correct": "rubber"
        },
        {
          "choices": [
            "trees",
            "rocks"
          ],
          "correct": "trees"
        }
      ]
    },
    {
      "id": "3.11A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A sheet of paper is made from ",
        ", a natural resource that is processed at a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "wood pulp from trees",
            "metal ore"
          ],
          "correct": "wood pulp from trees"
        },
        {
          "choices": [
            "paper mill",
            "gas station"
          ],
          "correct": "paper mill"
        }
      ]
    },
    {
      "id": "3.11A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A metal cooking pot is made by melting down ",
        ", a natural resource that is mined from ",
        " and shaped while hot."
      ],
      "blanks": [
        {
          "choices": [
            "metal ore",
            "cotton"
          ],
          "correct": "metal ore"
        },
        {
          "choices": [
            "the ground",
            "a cotton field"
          ],
          "correct": "the ground"
        }
      ]
    },
    {
      "id": "3.11A-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how a natural resource becomes an everyday product, using cotton as an example:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Cotton plants are grown on a farm",
        "The cotton is harvested (picked) from the plants",
        "The cotton is spun into thread and woven into fabric",
        "The fabric is sewn into clothing"
      ],
      "correct": [
        "Cotton plants are grown on a farm",
        "The cotton is harvested (picked) from the plants",
        "The cotton is spun into thread and woven into fabric",
        "The fabric is sewn into clothing"
      ]
    },
    {
      "id": "3.11A-25",
      "type": "ordering",
      "title": "Put these steps in order to explain how a natural resource becomes an everyday product, using trees as an example:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Trees are grown and harvested from a forest",
        "The wood is cut and processed at a mill",
        "The processed wood or wood pulp is used to make paper or lumber",
        "The paper or lumber is used to build houses or make everyday products"
      ],
      "correct": [
        "Trees are grown and harvested from a forest",
        "The wood is cut and processed at a mill",
        "The processed wood or wood pulp is used to make paper or lumber",
        "The paper or lumber is used to build houses or make everyday products"
      ]
    }
  ],
};
