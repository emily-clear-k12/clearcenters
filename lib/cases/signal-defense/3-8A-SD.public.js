// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.8A_v1.md) into the
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
  standard: "3.8A-SD",
  title: "Signal Defense: Forms of Energy",
  questions: [
    {
      "id": "3.8A-1",
      "type": "multiple_choice",
      "title": "A flashlight is turned on in a dark room. What form of energy does the flashlight produce?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Sound energy",
        "Light energy",
        "Thermal energy",
        "Mechanical energy"
      ],
      "correct": "Light energy"
    },
    {
      "id": "3.8A-2",
      "type": "multiple_choice",
      "title": "A dog barks loudly in the backyard. What form of energy is produced?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Light energy",
        "Sound energy",
        "Thermal energy",
        "Mechanical energy"
      ],
      "correct": "Sound energy"
    },
    {
      "id": "3.8A-3",
      "type": "multiple_choice",
      "title": "A pot of soup sits on a hot stove burner. What form of energy is heating the soup?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Light energy",
        "Sound energy",
        "Thermal energy (heat)",
        "Mechanical energy"
      ],
      "correct": "Thermal energy (heat)"
    },
    {
      "id": "3.8A-4",
      "type": "multiple_choice",
      "title": "A bicycle wheel spins as a student pedals down the street. What form of energy is causing the wheel to spin?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Light energy",
        "Sound energy",
        "Thermal energy",
        "Mechanical energy (energy of motion)"
      ],
      "correct": "Mechanical energy (energy of motion)"
    },
    {
      "id": "3.8A-5",
      "type": "multiple_choice",
      "title": "The sun shines brightly overhead on a summer day, both lighting up and warming the playground. Which two forms of energy is the sun giving off?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Sound and mechanical energy",
        "Light and thermal energy",
        "Light and mechanical energy",
        "Sound and thermal energy"
      ],
      "correct": "Light and thermal energy"
    },
    {
      "id": "3.8A-6",
      "type": "multiple_choice",
      "title": "A student claps their hands together. What form of energy is produced?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Light energy",
        "Sound energy",
        "Thermal energy",
        "Mechanical energy"
      ],
      "correct": "Sound energy"
    },
    {
      "id": "3.8A-7",
      "type": "multi_select",
      "title": "Which of these are examples of light energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A flashlight shining in the dark",
        "A lamp turned on in a room",
        "Sunlight streaming through a window",
        "A dog barking",
        "A spinning fan",
        "A hot cup of cocoa"
      ],
      "correct": [
        "A flashlight shining in the dark",
        "A lamp turned on in a room",
        "Sunlight streaming through a window"
      ]
    },
    {
      "id": "3.8A-8",
      "type": "multi_select",
      "title": "Which of these are examples of sound energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A bell ringing",
        "Music playing from a speaker",
        "A car horn honking",
        "A toaster heating bread",
        "A lamp glowing",
        "A ball rolling down a hill"
      ],
      "correct": [
        "A bell ringing",
        "Music playing from a speaker",
        "A car horn honking"
      ]
    },
    {
      "id": "3.8A-9",
      "type": "multi_select",
      "title": "Which of these are examples of thermal (heat) energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A campfire warming people sitting around it",
        "A toaster heating up bread",
        "Sunlight warming the sidewalk",
        "A flashlight beam",
        "A drum being hit",
        "A spinning bicycle wheel"
      ],
      "correct": [
        "A campfire warming people sitting around it",
        "A toaster heating up bread",
        "Sunlight warming the sidewalk"
      ]
    },
    {
      "id": "3.8A-10",
      "type": "multi_select",
      "title": "Which of these are examples of mechanical energy (energy of motion)?",
      "prompt": "Select all that apply.",
      "choices": [
        "A spinning fan's blades",
        "A rolling soccer ball",
        "A moving car's wheels turning",
        "A glowing light bulb",
        "A ringing bell",
        "A heater warming a room"
      ],
      "correct": [
        "A spinning fan's blades",
        "A rolling soccer ball",
        "A moving car's wheels turning"
      ]
    },
    {
      "id": "3.8A-11",
      "type": "multi_select",
      "title": "Which of these give off both light and thermal energy at the same time?",
      "prompt": "Select all that apply.",
      "choices": [
        "The sun",
        "A burning candle flame",
        "A campfire",
        "A ringing bell",
        "A rolling ball",
        "A spinning fan"
      ],
      "correct": [
        "The sun",
        "A burning candle flame",
        "A campfire"
      ]
    },
    {
      "id": "3.8A-12",
      "type": "multi_select",
      "title": "A student is sorting everyday objects and actions by which form of energy they mainly show. Which of these belong in the \"sound energy\" group?",
      "prompt": "Select all that apply.",
      "choices": [
        "A drum being hit",
        "A dog barking",
        "Music playing on a speaker",
        "A lamp glowing",
        "A toaster heating bread",
        "A bicycle wheel spinning"
      ],
      "correct": [
        "A drum being hit",
        "A dog barking",
        "Music playing on a speaker"
      ]
    },
    {
      "id": "3.8A-13",
      "type": "true_false",
      "title": "A lamp that is turned on gives off light energy.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8A-14",
      "type": "true_false",
      "title": "Thermal energy is another name for the energy of sound.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "thermal energy is heat energy; sound energy is a different form of energy made by vibrations."
    },
    {
      "id": "3.8A-15",
      "type": "true_false",
      "title": "A spinning fan's blades are an example of mechanical energy, the energy of motion.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8A-16",
      "type": "true_false",
      "title": "Only machines like cars and fans can have mechanical energy — living things and hand tools cannot.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "mechanical energy is the energy of motion, so it can come from anything moving, including a person pedaling a bike or throwing a ball."
    },
    {
      "id": "3.8A-17",
      "type": "true_false",
      "title": "The sun gives off both light energy and thermal energy at the same time.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8A-18",
      "type": "true_false",
      "title": "A ringing bell is an example of light energy.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a ringing bell is an example of sound energy, made by the bell vibrating."
    },
    {
      "id": "3.8A-19",
      "type": "true_false",
      "title": "A hot stove burner is an example of thermal energy heating up whatever is placed on it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A camping lantern glows brightly and feels warm to the touch after being on for a while. It gives off ",
        " energy, because it glows brightly and ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "light and thermal",
            "sound and mechanical"
          ],
          "correct": "light and thermal"
        },
        {
          "choices": [
            "feels warm",
            "makes a loud noise"
          ],
          "correct": "feels warm"
        }
      ]
    },
    {
      "id": "3.8A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A car horn honking produces ",
        " energy, which you can ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "sound",
            "light"
          ],
          "correct": "sound"
        },
        {
          "choices": [
            "hear",
            "see"
          ],
          "correct": "hear"
        }
      ]
    },
    {
      "id": "3.8A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A toaster heating up bread is an example of ",
        " energy, because it produces ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "thermal",
            "mechanical"
          ],
          "correct": "thermal"
        },
        {
          "choices": [
            "heat",
            "motion"
          ],
          "correct": "heat"
        }
      ]
    },
    {
      "id": "3.8A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A pinwheel spinning in the wind shows ",
        " energy, which is the energy of ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "mechanical",
            "light"
          ],
          "correct": "mechanical"
        },
        {
          "choices": [
            "motion",
            "brightness"
          ],
          "correct": "motion"
        }
      ]
    },
    {
      "id": "3.8A-24",
      "type": "ordering",
      "title": "Put these steps in order for an experiment testing what kind of energy a heater produces:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what kind of energy the heater will give off when turned on",
        "Turn on the heater and observe it from a safe distance",
        "Observe what the heater does (does it glow, make heat, make sound, or move?)",
        "Record which form of energy the heater produced"
      ],
      "correct": [
        "Predict what kind of energy the heater will give off when turned on",
        "Turn on the heater and observe it from a safe distance",
        "Observe what the heater does (does it glow, make heat, make sound, or move?)",
        "Record which form of energy the heater produced"
      ]
    },
    {
      "id": "3.8A-25",
      "type": "ordering",
      "title": "A student is testing what kind of energy a wind-up toy car produces. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what kind of energy the toy car will give off when wound up and released",
        "Wind up the toy car and let it go",
        "Observe whether the car makes light, heat, sound, or motion",
        "Record which form of energy the toy car produced"
      ],
      "correct": [
        "Predict what kind of energy the toy car will give off when wound up and released",
        "Wind up the toy car and let it go",
        "Observe whether the car makes light, heat, sound, or motion",
        "Record which form of energy the toy car produced"
      ]
    }
  ],
};
