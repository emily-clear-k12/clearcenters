// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.6D_v1.md) into the
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
  standard: "3.6D-SD",
  title: "Signal Defense: Matter & Material Properties",
  questions: [
    {
      "id": "3.6D-1",
      "type": "multiple_choice",
      "title": "A student wants to build a raincoat to keep a stuffed animal dry. Which material property matters most?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Whether the material is soft",
        "Whether the material is waterproof",
        "Whether the material is colorful",
        "Whether the material is heavy"
      ],
      "correct": "Whether the material is waterproof"
    },
    {
      "id": "3.6D-2",
      "type": "multiple_choice",
      "title": "Which material would be the best choice for building a tall, strong tower?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A pile of feathers",
        "A stack of tissue paper",
        "Wooden blocks that stack and stay in place",
        "A puddle of water"
      ],
      "correct": "Wooden blocks that stack and stay in place"
    },
    {
      "id": "3.6D-3",
      "type": "multiple_choice",
      "title": "A student is designing a boat that needs to float and carry small objects across a tub of water. Which material would work best for the boat's body?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A sponge that soaks up water",
        "A rock",
        "A piece of plastic that doesn't soak up water and is light",
        "A pile of sand"
      ],
      "correct": "A piece of plastic that doesn't soak up water and is light"
    },
    {
      "id": "3.6D-4",
      "type": "multiple_choice",
      "title": "Which property would be most important when choosing a material to cushion a fragile egg so it doesn't break?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Color",
        "How soft and absorbent the material is",
        "How shiny it is",
        "How heavy it is"
      ],
      "correct": "How soft and absorbent the material is"
    },
    {
      "id": "3.6D-5",
      "type": "multiple_choice",
      "title": "A student wants to build a bridge strong enough to hold small toy cars without bending. Which material property matters most?",
      "prompt": "Choose the best answer.",
      "choices": [
        "How rigid (stiff) the material is",
        "How colorful it is",
        "How it smells",
        "How see-through it is"
      ],
      "correct": "How rigid (stiff) the material is"
    },
    {
      "id": "3.6D-6",
      "type": "multiple_choice",
      "title": "Which material would be the best choice for making a warm blanket?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A sheet of aluminum foil",
        "A piece of plastic wrap",
        "Soft, fluffy fabric",
        "A stack of paper"
      ],
      "correct": "Soft, fluffy fabric"
    },
    {
      "id": "3.6D-7",
      "type": "multiple_choice",
      "title": "A student combines flexible fabric and lightweight sticks to build a kite. Why are these materials a good choice?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They are the most colorful materials available",
        "The fabric catches wind and the sticks hold the kite's shape without adding too much weight",
        "They are the cheapest materials available",
        "They are both waterproof"
      ],
      "correct": "The fabric catches wind and the sticks hold the kite's shape without adding too much weight"
    },
    {
      "id": "3.6D-8",
      "type": "multi_select",
      "title": "Which of these materials would be good choices for building a waterproof raincoat?",
      "prompt": "Select all that apply.",
      "choices": [
        "Plastic sheeting",
        "Rubber fabric",
        "Cotton fabric",
        "Paper",
        "A sponge"
      ],
      "correct": [
        "Plastic sheeting",
        "Rubber fabric"
      ]
    },
    {
      "id": "3.6D-9",
      "type": "multi_select",
      "title": "Which of these properties would matter when choosing materials to build a strong bridge?",
      "prompt": "Select all that apply.",
      "choices": [
        "How rigid (stiff) the material is",
        "How much weight the material can hold",
        "How colorful the material is",
        "How it smells",
        "How well the pieces connect to each other"
      ],
      "correct": [
        "How rigid (stiff) the material is",
        "How much weight the material can hold",
        "How well the pieces connect to each other"
      ]
    },
    {
      "id": "3.6D-10",
      "type": "multi_select",
      "title": "Which materials would be good choices for cushioning a fragile object like an egg?",
      "prompt": "Select all that apply.",
      "choices": [
        "Cotton balls",
        "Bubble wrap",
        "Foam padding",
        "Small rocks",
        "A single sheet of paper"
      ],
      "correct": [
        "Cotton balls",
        "Bubble wrap",
        "Foam padding"
      ]
    },
    {
      "id": "3.6D-11",
      "type": "multi_select",
      "title": "Which of these are examples of combining materials by their physical properties to build something new?",
      "prompt": "Select all that apply.",
      "choices": [
        "Using flexible fabric and stiff sticks to build a kite",
        "Using waterproof plastic to build a raincoat",
        "Using absorbent cotton to cushion a fragile object",
        "Sorting rocks by color",
        "Measuring the temperature of water"
      ],
      "correct": [
        "Using flexible fabric and stiff sticks to build a kite",
        "Using waterproof plastic to build a raincoat",
        "Using absorbent cotton to cushion a fragile object"
      ]
    },
    {
      "id": "3.6D-12",
      "type": "multi_select",
      "title": "Which of these properties would matter most when choosing a material to build something that needs to float, like a raft?",
      "prompt": "Select all that apply.",
      "choices": [
        "Whether the material soaks up water",
        "Whether the material is light enough to float",
        "Whether the material is colorful",
        "Whether the material is magnetic"
      ],
      "correct": [
        "Whether the material soaks up water",
        "Whether the material is light enough to float"
      ]
    },
    {
      "id": "3.6D-13",
      "type": "true_false",
      "title": "The physical properties of a material, like whether it's stiff, soft, or waterproof, can help you decide what to build with it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6D-14",
      "type": "true_false",
      "title": "Any material works equally well for any job, no matter its physical properties.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "different materials have different physical properties, so some work better than others for a specific job."
    },
    {
      "id": "3.6D-15",
      "type": "true_false",
      "title": "A sponge would be a poor choice for building a boat because it soaks up water instead of staying dry.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6D-16",
      "type": "true_false",
      "title": "Combining a flexible material with a stiff material can create something that neither material could do alone, like a kite.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6D-17",
      "type": "true_false",
      "title": "Waterproof materials are a good choice for building something meant to stay dry, like a raincoat.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6D-18",
      "type": "true_false",
      "title": "The color of a material is usually the most important property to think about when building something strong.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "properties like strength, stiffness, or being waterproof usually matter more than color for building something strong."
    },
    {
      "id": "3.6D-19",
      "type": "true_false",
      "title": "Soft, absorbent materials like cotton or foam are a good choice for cushioning something fragile.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6D-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To build an umbrella that keeps a toy dry in the rain, a student should choose a material that is ",
        ", because it will ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "waterproof",
            "soft",
            "colorful"
          ],
          "correct": "waterproof"
        },
        {
          "choices": [
            "keep water out",
            "soak up water",
            "change temperature"
          ],
          "correct": "keep water out"
        }
      ]
    },
    {
      "id": "3.6D-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To build a fort that stays standing, a student should choose materials that are ",
        ", because they will ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "stiff and stackable",
            "soft and squishy",
            "see-through"
          ],
          "correct": "stiff and stackable"
        },
        {
          "choices": [
            "hold their shape",
            "soak up water",
            "melt easily"
          ],
          "correct": "hold their shape"
        }
      ]
    },
    {
      "id": "3.6D-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To cushion a fragile glass ornament so it won't crack, a student should wrap it in something ",
        ", because it will ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "soft and absorbent",
            "hard and rigid",
            "waterproof"
          ],
          "correct": "soft and absorbent"
        },
        {
          "choices": [
            "cushion the ornament from bumps",
            "make the ornament heavier",
            "keep the ornament dry"
          ],
          "correct": "cushion the ornament from bumps"
        }
      ]
    },
    {
      "id": "3.6D-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To build a backpack that bends easily but still holds its shape, a student should combine ",
        ", because the fabric bends and the stiff pieces ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "flexible fabric and a few stiff pieces",
            "heavy rocks and wet clay",
            "waterproof plastic and metal"
          ],
          "correct": "flexible fabric and a few stiff pieces"
        },
        {
          "choices": [
            "help it hold its shape",
            "soak up water",
            "keep it cold"
          ],
          "correct": "help it hold its shape"
        }
      ]
    },
    {
      "id": "3.6D-24",
      "type": "ordering",
      "title": "Put these steps in order for designing and testing a boat made of new materials:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose materials based on their physical properties (light, waterproof)",
        "Build the boat using the chosen materials",
        "Test the boat by placing it in water",
        "Decide if the materials worked well or need to be changed"
      ],
      "correct": [
        "Choose materials based on their physical properties (light, waterproof)",
        "Build the boat using the chosen materials",
        "Test the boat by placing it in water",
        "Decide if the materials worked well or need to be changed"
      ]
    },
    {
      "id": "3.6D-25",
      "type": "ordering",
      "title": "A class is designing a bridge to hold toy cars. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose materials based on how strong and stiff they are",
        "Build the bridge using the chosen materials",
        "Test the bridge by placing toy cars on it",
        "Record whether the bridge held the cars without bending"
      ],
      "correct": [
        "Choose materials based on how strong and stiff they are",
        "Build the bridge using the chosen materials",
        "Test the bridge by placing toy cars on it",
        "Record whether the bridge held the cars without bending"
      ]
    }
  ],
};
