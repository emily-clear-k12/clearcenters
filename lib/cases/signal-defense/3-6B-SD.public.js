// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.6B_v1.md) into the
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
  standard: "3.6B-SD",
  title: "Signal Defense: States of Matter",
  questions: [
    {
      "id": "3.6B-1",
      "type": "multiple_choice",
      "title": "Which state of matter always keeps its own shape, no matter what container it's in?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Solid",
        "Liquid",
        "Gas",
        "None of these"
      ],
      "correct": "Solid"
    },
    {
      "id": "3.6B-2",
      "type": "multiple_choice",
      "title": "A student pours juice into a cup, then pours the same juice into a bowl. The juice takes the shape of the cup, then the shape of the bowl. What state of matter is the juice?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Solid",
        "Liquid",
        "Gas",
        "Both solid and liquid"
      ],
      "correct": "Liquid"
    },
    {
      "id": "3.6B-3",
      "type": "multiple_choice",
      "title": "Which of these is an example of a gas?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A rock",
        "The air filling up a balloon",
        "A puddle of water",
        "An ice cube"
      ],
      "correct": "The air filling up a balloon"
    },
    {
      "id": "3.6B-4",
      "type": "multiple_choice",
      "title": "A student places a block of wood in a box. The wood keeps its shape no matter what container it's in. What state of matter is the wood?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Solid",
        "Liquid",
        "Gas",
        "It depends on the box's shape"
      ],
      "correct": "Solid"
    },
    {
      "id": "3.6B-5",
      "type": "multiple_choice",
      "title": "Which property helps you tell a solid apart from a liquid?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Color",
        "Whether it keeps its own shape or takes the shape of its container",
        "Weight",
        "Temperature only"
      ],
      "correct": "Whether it keeps its own shape or takes the shape of its container"
    },
    {
      "id": "3.6B-6",
      "type": "multiple_choice",
      "title": "A balloon is filled with helium gas. The gas spreads out to completely fill the inside of the balloon. What state of matter is helium?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Solid",
        "Liquid",
        "Gas",
        "Solid and gas"
      ],
      "correct": "Gas"
    },
    {
      "id": "3.6B-7",
      "type": "multi_select",
      "title": "Which of these are examples of solids?",
      "prompt": "Select all that apply.",
      "choices": [
        "A wooden block",
        "An ice cube",
        "A rock",
        "Milk",
        "Air in a tire",
        "Steam"
      ],
      "correct": [
        "A wooden block",
        "An ice cube",
        "A rock"
      ]
    },
    {
      "id": "3.6B-8",
      "type": "multi_select",
      "title": "Which of these are true about liquids?",
      "prompt": "Select all that apply.",
      "choices": [
        "They take the shape of their container",
        "They can be poured",
        "They keep their shape no matter what container holds them",
        "They spread out to fill all the space available",
        "Water and juice are examples"
      ],
      "correct": [
        "They take the shape of their container",
        "They can be poured",
        "Water and juice are examples"
      ]
    },
    {
      "id": "3.6B-9",
      "type": "multi_select",
      "title": "Which of these are examples of gases?",
      "prompt": "Select all that apply.",
      "choices": [
        "The air we breathe",
        "Steam rising from hot water",
        "Helium in a balloon",
        "A puddle",
        "A brick",
        "Orange juice"
      ],
      "correct": [
        "The air we breathe",
        "Steam rising from hot water",
        "Helium in a balloon"
      ]
    },
    {
      "id": "3.6B-10",
      "type": "multi_select",
      "title": "Which statements describe a solid?",
      "prompt": "Select all that apply.",
      "choices": [
        "Keeps its own shape",
        "Does not change shape when moved to a new container",
        "Takes the shape of its container",
        "Spreads out to fill all available space",
        "Example: a book"
      ],
      "correct": [
        "Keeps its own shape",
        "Does not change shape when moved to a new container",
        "Example: a book"
      ]
    },
    {
      "id": "3.6B-11",
      "type": "multi_select",
      "title": "Which of these would take the shape of whatever container holds it?",
      "prompt": "Select all that apply.",
      "choices": [
        "Milk",
        "Air",
        "Juice",
        "A pencil",
        "A rock",
        "Water"
      ],
      "correct": [
        "Milk",
        "Air",
        "Juice",
        "Water"
      ]
    },
    {
      "id": "3.6B-12",
      "type": "multi_select",
      "title": "A student is sorting objects into solid, liquid, and gas groups. Which of these belong in the \"solid\" group?",
      "prompt": "Select all that apply.",
      "choices": [
        "Crayon",
        "Penny",
        "Book",
        "Vinegar",
        "Steam",
        "Soda"
      ],
      "correct": [
        "Crayon",
        "Penny",
        "Book"
      ]
    },
    {
      "id": "3.6B-13",
      "type": "true_false",
      "title": "A solid has its own shape and does not change shape when placed in a different container.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6B-14",
      "type": "true_false",
      "title": "A liquid keeps the exact same shape no matter what container it's poured into.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a liquid takes the shape of whatever container it's in."
    },
    {
      "id": "3.6B-15",
      "type": "true_false",
      "title": "Gases spread out to fill the entire space of their container.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6B-16",
      "type": "true_false",
      "title": "Air is an example of matter, even though you can't see it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6B-17",
      "type": "true_false",
      "title": "If you pour water from a tall glass into a wide bowl, the water changes into a solid.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "the water is still a liquid; it just takes the new shape of the bowl."
    },
    {
      "id": "3.6B-18",
      "type": "true_false",
      "title": "All matter can be classified as a solid, a liquid, or a gas based on its physical properties.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6B-19",
      "type": "true_false",
      "title": "A rock and a puddle of water are both examples of solids.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a rock is a solid, but a puddle of water is a liquid."
    },
    {
      "id": "3.6B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Ice is a ",
        " because it has its own shape and ",
        " shape when moved to a new container."
      ],
      "blanks": [
        {
          "choices": [
            "solid",
            "liquid",
            "gas"
          ],
          "correct": "solid"
        },
        {
          "choices": [
            "does not change",
            "changes"
          ],
          "correct": "does not change"
        }
      ]
    },
    {
      "id": "3.6B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When water is poured from a bottle into a glass, it takes the shape of the ",
        ", which shows that water is a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "glass",
            "bottle",
            "air"
          ],
          "correct": "glass"
        },
        {
          "choices": [
            "solid",
            "liquid",
            "gas"
          ],
          "correct": "liquid"
        }
      ]
    },
    {
      "id": "3.6B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The air filling a balloon is an example of a ",
        " because it ",
        " shape."
      ],
      "blanks": [
        {
          "choices": [
            "solid",
            "liquid",
            "gas"
          ],
          "correct": "gas"
        },
        {
          "choices": [
            "spreads out to fill",
            "keeps the same"
          ],
          "correct": "spreads out to fill"
        }
      ]
    },
    {
      "id": "3.6B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A wooden block is a ",
        " because it ",
        " no matter what container it's placed in."
      ],
      "blanks": [
        {
          "choices": [
            "solid",
            "liquid",
            "gas"
          ],
          "correct": "solid"
        },
        {
          "choices": [
            "keeps the same shape",
            "changes shape"
          ],
          "correct": "keeps the same shape"
        }
      ]
    },
    {
      "id": "3.6B-24",
      "type": "ordering",
      "title": "Put these steps in order for classifying an unknown substance as a solid, liquid, or gas:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Observe the substance and try to describe its shape",
        "Place the substance in two different containers",
        "Compare the shape in each container",
        "Decide if it is a solid, liquid, or gas based on what you observed"
      ],
      "correct": [
        "Observe the substance and try to describe its shape",
        "Place the substance in two different containers",
        "Compare the shape in each container",
        "Decide if it is a solid, liquid, or gas based on what you observed"
      ]
    },
    {
      "id": "3.6B-25",
      "type": "ordering",
      "title": "A student is testing whether a mystery material is a solid or a liquid. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Place a sample of the material into a round container",
        "Pour the same sample into a container with a different shape",
        "Compare the material's shape in each container",
        "Record whether the material kept its shape or changed to match each container"
      ],
      "correct": [
        "Place a sample of the material into a round container",
        "Pour the same sample into a container with a different shape",
        "Compare the material's shape in each container",
        "Record whether the material kept its shape or changed to match each container"
      ]
    }
  ],
};
