// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.6A_v1.md) into the
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
  standard: "3.6A-SD",
  title: "Signal Defense: Physical Properties of Matter",
  questions: [
    {
      "id": "3.6A-1",
      "type": "multiple_choice",
      "title": "Which tool would a student use to measure the mass of a rock?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Thermometer",
        "Balance scale",
        "Magnet",
        "Ruler"
      ],
      "correct": "Balance scale"
    },
    {
      "id": "3.6A-2",
      "type": "multiple_choice",
      "title": "A student places four different objects in a tub of water to see which ones stay on top. Which physical property is this testing?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Magnetism",
        "Temperature",
        "The ability to sink or float",
        "Color"
      ],
      "correct": "The ability to sink or float"
    },
    {
      "id": "3.6A-3",
      "type": "multiple_choice",
      "title": "A thermometer reads 0°C for a cup of water. What does this tell you about the water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It has a large mass",
        "It is magnetic",
        "It is at the freezing point",
        "It will float"
      ],
      "correct": "It is at the freezing point"
    },
    {
      "id": "3.6A-4",
      "type": "multiple_choice",
      "title": "A student holds a magnet near a paperclip and watches what happens. Which physical property is being tested?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Temperature",
        "Mass",
        "Magnetism",
        "Ability to sink or float"
      ],
      "correct": "Magnetism"
    },
    {
      "id": "3.6A-5",
      "type": "multiple_choice",
      "title": "A student uses a thermometer and reads 100°F. Which physical property did the student measure?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mass",
        "Temperature",
        "Magnetism",
        "Ability to float"
      ],
      "correct": "Temperature"
    },
    {
      "id": "3.6A-6",
      "type": "multiple_choice",
      "title": "Which of these objects would most likely sink in a tub of water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A cork",
        "A beach ball filled with air",
        "A small steel washer",
        "A wooden block"
      ],
      "correct": "A small steel washer"
    },
    {
      "id": "3.6A-7",
      "type": "multi_select",
      "title": "Which of these are physical properties you can measure or test?",
      "prompt": "Select all that apply.",
      "choices": [
        "Temperature",
        "Mass",
        "Magnetism",
        "Whether it sinks or floats",
        "How exciting it looks",
        "Where it is stored in the classroom"
      ],
      "correct": [
        "Temperature",
        "Mass",
        "Magnetism",
        "Whether it sinks or floats"
      ]
    },
    {
      "id": "3.6A-8",
      "type": "multi_select",
      "title": "A student holds a magnet near four objects. Which objects would a magnet attract?",
      "prompt": "Select all that apply.",
      "choices": [
        "Steel paperclip",
        "Iron nail",
        "Plastic ruler",
        "Aluminum foil",
        "Plastic cup"
      ],
      "correct": [
        "Steel paperclip",
        "Iron nail"
      ]
    },
    {
      "id": "3.6A-9",
      "type": "multi_select",
      "title": "Which of these tools would help you test an object's temperature, mass, magnetism, or whether it sinks or floats?",
      "prompt": "Select all that apply.",
      "choices": [
        "Thermometer",
        "Balance scale",
        "Magnet",
        "Tub of water",
        "Microscope",
        "Stopwatch"
      ],
      "correct": [
        "Thermometer",
        "Balance scale",
        "Magnet",
        "Tub of water"
      ]
    },
    {
      "id": "3.6A-10",
      "type": "multi_select",
      "title": "Which of these describe physical properties you can measure or test?",
      "prompt": "Select all that apply.",
      "choices": [
        "How much mass an object has",
        "Whether an object is magnetic",
        "The temperature of an object",
        "Whether an object sinks or floats",
        "How an object makes you feel",
        "What an object is used for"
      ],
      "correct": [
        "How much mass an object has",
        "Whether an object is magnetic",
        "The temperature of an object",
        "Whether an object sinks or floats"
      ]
    },
    {
      "id": "3.6A-11",
      "type": "true_false",
      "title": "A thermometer is used to measure the temperature of an object.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6A-12",
      "type": "true_false",
      "title": "An object's mass is different when you test it in water than when you test it on land.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "mass stays the same no matter where you test it; only whether it sinks or floats can change."
    },
    {
      "id": "3.6A-13",
      "type": "true_false",
      "title": "If a magnet pulls on an object, that object is magnetic.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6A-14",
      "type": "true_false",
      "title": "Mass is measured using a thermometer.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "mass is measured with a balance scale; a thermometer measures temperature."
    },
    {
      "id": "3.6A-15",
      "type": "true_false",
      "title": "Whether an object sinks or floats can be tested by placing it in water and observing what happens.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.6A-16",
      "type": "true_false",
      "title": "All metal objects are attracted to a magnet.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "only some metals, like iron and steel, are magnetic; others, like aluminum, are not."
    },
    {
      "id": "3.6A-17",
      "type": "true_false",
      "title": "If two objects have the same mass, they will always sink or float the same way in water.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "sinking or floating depends on more than just mass. Shape and what the object is made of matter too, so two objects with the same mass can act differently in water."
    },
    {
      "id": "3.6A-18",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A scientist wants to know how hot or cold a cup of water is. She should use a ",
        " to measure its ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "thermometer",
            "scale",
            "magnet"
          ],
          "correct": "thermometer"
        },
        {
          "choices": [
            "temperature",
            "mass",
            "magnetism"
          ],
          "correct": "temperature"
        }
      ]
    },
    {
      "id": "3.6A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To find out if a block of wood will sink or float, a student should ",
        " and observe what happens, to test its ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "drop it in water",
            "weigh it on a scale",
            "hold a magnet near it"
          ],
          "correct": "drop it in water"
        },
        {
          "choices": [
            "ability to sink or float",
            "mass",
            "magnetism"
          ],
          "correct": "ability to sink or float"
        }
      ]
    },
    {
      "id": "3.6A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student wants to know if a paperclip is magnetic. She should hold a ",
        " near the paperclip and see if it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "magnet",
            "thermometer",
            "balance scale"
          ],
          "correct": "magnet"
        },
        {
          "choices": [
            "is attracted",
            "changes temperature",
            "gains mass"
          ],
          "correct": "is attracted"
        }
      ]
    },
    {
      "id": "3.6A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To compare the mass of two rocks, a student should place each rock on a ",
        " and compare the ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "balance scale",
            "thermometer",
            "ruler"
          ],
          "correct": "balance scale"
        },
        {
          "choices": [
            "numbers shown",
            "colors",
            "temperatures"
          ],
          "correct": "numbers shown"
        }
      ]
    },
    {
      "id": "3.6A-22",
      "type": "ordering",
      "title": "Put these steps in order for testing an object's mass with a balance scale:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Turn on the scale",
        "Place the object on the scale",
        "Read the number on the display",
        "Record the mass in your data table"
      ],
      "correct": [
        "Turn on the scale",
        "Place the object on the scale",
        "Read the number on the display",
        "Record the mass in your data table"
      ]
    },
    {
      "id": "3.6A-23",
      "type": "ordering",
      "title": "A class is testing four objects (a rock, a feather, a nail, and a leaf) to see which ones are magnetic. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Gather the four objects and the magnet",
        "Hold the magnet near each object",
        "Record which objects were attracted to the magnet",
        "Sort the objects into \"attracted\" and \"not attracted\" groups"
      ],
      "correct": [
        "Gather the four objects and the magnet",
        "Hold the magnet near each object",
        "Record which objects were attracted to the magnet",
        "Sort the objects into \"attracted\" and \"not attracted\" groups"
      ]
    },
    {
      "id": "3.6A-24",
      "type": "ordering",
      "title": "Put these steps in order for testing whether an object sinks or floats:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Gather the object and a tub of water",
        "Predict whether the object will sink or float",
        "Place the object gently in the water",
        "Observe and record whether it sank or floated"
      ],
      "correct": [
        "Gather the object and a tub of water",
        "Predict whether the object will sink or float",
        "Place the object gently in the water",
        "Observe and record whether it sank or floated"
      ]
    },
    {
      "id": "3.6A-25",
      "type": "ordering",
      "title": "Put these steps in order for testing an object's temperature:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Place the thermometer in or near the object",
        "Wait for the reading to stop changing",
        "Read the number on the thermometer",
        "Record the temperature in your data table"
      ],
      "correct": [
        "Place the thermometer in or near the object",
        "Wait for the reading to stop changing",
        "Read the number on the thermometer",
        "Record the temperature in your data table"
      ]
    }
  ],
};
