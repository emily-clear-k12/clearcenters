// Signal Defense — 4.6A, Classifying Matter by Physical Properties (Grade 4
// Science). Part of the grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.6A verbatim (TEA adopted grade 4 science TEKS, checked Sept 16
// 2026): "classify and describe matter using observable physical properties,
// including temperature, mass, magnetism, relative density (the ability to
// sink or float in water), and physical state (solid, liquid, gas)"
//
// Verbs: CLASSIFY and DESCRIBE. Scope is the five named properties —
// temperature, mass, magnetism, relative density, physical state. Questions
// stay inside that list; see 4-10B-SD.public.js for why straying outside a
// standard's named scope is the mistake to avoid here.
//
// Step up from grade 3's 3.6A (which asks which tool measures which
// property): at grade 4 students sort objects BY a property and pick which
// property distinguishes two things, rather than naming the property alone.
// Answer positions varied from the start.

export const PUBLIC_CASE = {
  standard: "4.6A-SD",
  title: "Signal Defense: Classifying Matter by Physical Properties",
  questions: [
    {
      "id": "4.6A-1",
      "type": "multiple_choice",
      "title": "A student sorts objects into a group that a magnet picks up and a group it does not. Which physical property is she using?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mass",
        "Temperature",
        "Magnetism",
        "Physical state"
      ],
      "correct": "Magnetism"
    },
    {
      "id": "4.6A-2",
      "type": "multiple_choice",
      "title": "Two blocks are the same size, but one sinks and one floats. Which property is different between them?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Temperature",
        "Magnetism",
        "Physical state",
        "Relative density"
      ],
      "correct": "Relative density"
    },
    {
      "id": "4.6A-3",
      "type": "multiple_choice",
      "title": "Which tool would you use to compare the mass of two rocks?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A balance",
        "A thermometer",
        "A hand lens",
        "A ruler"
      ],
      "correct": "A balance"
    },
    {
      "id": "4.6A-4",
      "type": "multiple_choice",
      "title": "Juice poured from a bottle into a glass takes the shape of the glass. Which physical state is the juice in?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Solid",
        "Liquid",
        "Gas",
        "It has no state"
      ],
      "correct": "Liquid"
    },
    {
      "id": "4.6A-5",
      "type": "multiple_choice",
      "title": "A steel paperclip and an aluminum paperclip are the same size and shape. Which property would best tell them apart?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Physical state",
        "Temperature",
        "Magnetism",
        "Color of the container"
      ],
      "correct": "Magnetism"
    },
    {
      "id": "4.6A-6",
      "type": "multiple_choice",
      "title": "A student records that a cup of water is 22°C. Which property did she measure?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mass",
        "Relative density",
        "Magnetism",
        "Temperature"
      ],
      "correct": "Temperature"
    },
    {
      "id": "4.6A-7",
      "type": "true_false",
      "title": "Relative density is tested by seeing whether an object sinks or floats in water.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.6A-8",
      "type": "true_false",
      "title": "All metals are attracted to a magnet.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.6A-9",
      "type": "true_false",
      "title": "A gas spreads out to fill whatever container it is in.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.6A-10",
      "type": "true_false",
      "title": "A larger object always has more mass than a smaller one.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.6A-11",
      "type": "true_false",
      "title": "The color of an object tells you whether it will sink or float.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.6A-12",
      "type": "true_false",
      "title": "A solid keeps its own shape even when you move it to a different container.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.6A-13",
      "type": "true_false",
      "title": "Two objects can have the same mass but different relative densities.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.6A-14",
      "type": "multi_select",
      "title": "Which of these are observable physical properties you could use to classify matter?",
      "prompt": "Select all that apply.",
      "choices": [
        "Mass",
        "Temperature",
        "How expensive it is",
        "Magnetism",
        "Physical state",
        "Who owns it"
      ],
      "correct": [
        "Mass",
        "Temperature",
        "Magnetism",
        "Physical state"
      ]
    },
    {
      "id": "4.6A-15",
      "type": "multi_select",
      "title": "Which of these objects would a magnet attract?",
      "prompt": "Select all that apply.",
      "choices": [
        "An iron nail",
        "A steel washer",
        "A rubber eraser",
        "A copper penny",
        "A steel paperclip",
        "A plastic ruler"
      ],
      "correct": [
        "An iron nail",
        "A steel washer",
        "A steel paperclip"
      ]
    },
    {
      "id": "4.6A-16",
      "type": "multi_select",
      "title": "Which of these are liquids?",
      "prompt": "Select all that apply.",
      "choices": [
        "Milk in a carton",
        "An ice cube",
        "Cooking oil",
        "Air in a balloon",
        "Honey",
        "A wooden block"
      ],
      "correct": [
        "Milk in a carton",
        "Cooking oil",
        "Honey"
      ]
    },
    {
      "id": "4.6A-17",
      "type": "multi_select",
      "title": "A student wants to classify a mystery object. Which tests would give her useful physical property information?",
      "prompt": "Select all that apply.",
      "choices": [
        "Hold a magnet near it",
        "Place it on a balance",
        "Put it in water and watch whether it sinks",
        "Ask a classmate to guess what it is",
        "Take its temperature with a thermometer",
        "Decide whether she likes how it looks"
      ],
      "correct": [
        "Hold a magnet near it",
        "Place it on a balance",
        "Put it in water and watch whether it sinks",
        "Take its temperature with a thermometer"
      ]
    },
    {
      "id": "4.6A-18",
      "type": "multi_select",
      "title": "Which statements correctly describe physical state?",
      "prompt": "Select all that apply.",
      "choices": [
        "A solid keeps its own shape",
        "A liquid takes the shape of its container",
        "A gas fills the whole container it is in",
        "A liquid always sinks in water",
        "A gas keeps its own shape",
        "A solid spreads out to fill a room"
      ],
      "correct": [
        "A solid keeps its own shape",
        "A liquid takes the shape of its container",
        "A gas fills the whole container it is in"
      ]
    },
    {
      "id": "4.6A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "An object that floats in water has a ",
        " relative density than water, and one that sinks has a ",
        " relative density."
      ],
      "blanks": [
        {
          "choices": [
            "lower",
            "greater"
          ],
          "correct": "lower"
        },
        {
          "choices": [
            "lower",
            "greater"
          ],
          "correct": "greater"
        }
      ]
    },
    {
      "id": "4.6A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "To find out if an object is magnetic, you would use a ",
        ", and to find its mass you would use a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "magnet",
            "thermometer"
          ],
          "correct": "magnet"
        },
        {
          "choices": [
            "ruler",
            "balance"
          ],
          "correct": "balance"
        }
      ]
    },
    {
      "id": "4.6A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Water poured into a bowl is a ",
        ", because it takes the shape of the bowl but ",
        " fill the whole bowl."
      ],
      "blanks": [
        {
          "choices": [
            "liquid",
            "gas"
          ],
          "correct": "liquid"
        },
        {
          "choices": [
            "does",
            "does not"
          ],
          "correct": "does not"
        }
      ]
    },
    {
      "id": "4.6A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Temperature is measured with a thermometer and recorded in ",
        ", while mass is measured with a balance and recorded in ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "degrees",
            "grams"
          ],
          "correct": "degrees"
        },
        {
          "choices": [
            "degrees",
            "grams"
          ],
          "correct": "grams"
        }
      ]
    },
    {
      "id": "4.6A-23",
      "type": "ordering",
      "title": "Put these steps in order for testing whether an object is magnetic:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Record whether the object was attracted",
        "Choose the object to test",
        "Watch closely to see if the object moves toward the magnet",
        "Hold a magnet near the object"
      ],
      "correct": [
        "Choose the object to test",
        "Hold a magnet near the object",
        "Watch closely to see if the object moves toward the magnet",
        "Record whether the object was attracted"
      ]
    },
    {
      "id": "4.6A-24",
      "type": "ordering",
      "title": "Put these steps in order for testing an object's relative density:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Gently place the object in the water",
        "Record whether the object sank or floated",
        "Fill a clear container with water",
        "Watch whether the object rises or settles"
      ],
      "correct": [
        "Fill a clear container with water",
        "Gently place the object in the water",
        "Watch whether the object rises or settles",
        "Record whether the object sank or floated"
      ]
    },
    {
      "id": "4.6A-25",
      "type": "ordering",
      "title": "Put these steps in order for classifying a set of objects by physical state:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Sort each object into the solid, liquid, or gas group",
        "Observe whether each one keeps its shape, pours, or spreads out",
        "Lay out all the objects you were given",
        "Explain what the objects in each group have in common"
      ],
      "correct": [
        "Lay out all the objects you were given",
        "Observe whether each one keeps its shape, pours, or spreads out",
        "Sort each object into the solid, liquid, or gas group",
        "Explain what the objects in each group have in common"
      ]
    }
  ],
};
