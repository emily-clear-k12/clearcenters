// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.7A_v1.md) into the
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
  standard: "3.7A-SD",
  title: "Signal Defense: Types of Forces",
  questions: [
    {
      "id": "3.7A-1",
      "type": "multiple_choice",
      "title": "A student kicks a soccer ball across the field. What kind of force is this?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A force acting at a distance",
        "A push (a contact force)",
        "A pull (a contact force)",
        "Magnetism"
      ],
      "correct": "A push (a contact force)"
    },
    {
      "id": "3.7A-2",
      "type": "multiple_choice",
      "title": "A student pulls a wagon by its handle. What kind of force is being used?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A push",
        "A pull (a contact force)",
        "Gravity",
        "Magnetism"
      ],
      "correct": "A pull (a contact force)"
    },
    {
      "id": "3.7A-3",
      "type": "multiple_choice",
      "title": "A ball rolls off a table and falls to the floor. What force pulls the ball downward?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A push",
        "A pull from the student's hand",
        "Gravity",
        "Magnetism"
      ],
      "correct": "Gravity"
    },
    {
      "id": "3.7A-4",
      "type": "multiple_choice",
      "title": "A magnet picks up a paperclip without ever touching it. What kind of force is this?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A push (a contact force)",
        "A pull (a contact force)",
        "A force acting at a distance (magnetism)",
        "Gravity only"
      ],
      "correct": "A force acting at a distance (magnetism)"
    },
    {
      "id": "3.7A-5",
      "type": "multiple_choice",
      "title": "Which of these is an example of a contact force — a force that needs objects to be touching?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A leaf falling from a tree",
        "A magnet attracting a nail from across the table",
        "A student pushing open a heavy door",
        "A ball rolling downhill due to gravity"
      ],
      "correct": "A student pushing open a heavy door"
    },
    {
      "id": "3.7A-6",
      "type": "multiple_choice",
      "title": "Which of these is an example of a force acting at a distance — a force that works even when objects are not touching?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A student throwing a ball",
        "Two magnets pulling toward each other without touching",
        "A student pulling open a drawer",
        "A student rowing a boat"
      ],
      "correct": "Two magnets pulling toward each other without touching"
    },
    {
      "id": "3.7A-7",
      "type": "multi_select",
      "title": "Which of these are examples of a push?",
      "prompt": "Select all that apply.",
      "choices": [
        "Kicking a soccer ball",
        "Pushing a shopping cart",
        "Throwing a ball forward",
        "Pulling a wagon",
        "A magnet attracting a nail",
        "Gravity pulling a ball down"
      ],
      "correct": [
        "Kicking a soccer ball",
        "Pushing a shopping cart",
        "Throwing a ball forward"
      ]
    },
    {
      "id": "3.7A-8",
      "type": "multi_select",
      "title": "Which of these are examples of a pull?",
      "prompt": "Select all that apply.",
      "choices": [
        "Pulling open a drawer",
        "Pulling a wagon by its handle",
        "A dog pulling on its leash",
        "Kicking a ball",
        "A magnet attracting a paperclip",
        "Pushing a swing"
      ],
      "correct": [
        "Pulling open a drawer",
        "Pulling a wagon by its handle",
        "A dog pulling on its leash"
      ]
    },
    {
      "id": "3.7A-9",
      "type": "multi_select",
      "title": "Which of these are forces that act at a distance, without objects touching?",
      "prompt": "Select all that apply.",
      "choices": [
        "Gravity pulling a dropped ball to the ground",
        "A magnet attracting a metal spoon from across a table",
        "A student kicking a ball",
        "A student pushing a door open",
        "Two magnets pulling toward each other without touching"
      ],
      "correct": [
        "Gravity pulling a dropped ball to the ground",
        "A magnet attracting a metal spoon from across a table",
        "Two magnets pulling toward each other without touching"
      ]
    },
    {
      "id": "3.7A-10",
      "type": "multi_select",
      "title": "Which of these are contact forces — forces that need objects to be touching?",
      "prompt": "Select all that apply.",
      "choices": [
        "Pushing a shopping cart",
        "Pulling open a drawer",
        "Kicking a soccer ball",
        "Gravity pulling an apple off a tree",
        "A magnet picking up a nail from a few inches away"
      ],
      "correct": [
        "Pushing a shopping cart",
        "Pulling open a drawer",
        "Kicking a soccer ball"
      ]
    },
    {
      "id": "3.7A-11",
      "type": "multi_select",
      "title": "Which of these show gravity at work?",
      "prompt": "Select all that apply.",
      "choices": [
        "Leaves falling from a tree",
        "A ball rolling down a hill",
        "Rain falling from a cloud",
        "A magnet attracting a paperclip",
        "A student pushing a door open"
      ],
      "correct": [
        "Leaves falling from a tree",
        "A ball rolling down a hill",
        "Rain falling from a cloud"
      ]
    },
    {
      "id": "3.7A-12",
      "type": "multi_select",
      "title": "Which of these show magnetism at work?",
      "prompt": "Select all that apply.",
      "choices": [
        "A refrigerator magnet holding up a piece of paper",
        "Two magnets pulling toward each other without touching",
        "A magnet attracting a steel nail",
        "A ball falling to the ground",
        "A student pulling a wagon"
      ],
      "correct": [
        "A refrigerator magnet holding up a piece of paper",
        "Two magnets pulling toward each other without touching",
        "A magnet attracting a steel nail"
      ]
    },
    {
      "id": "3.7A-13",
      "type": "true_false",
      "title": "A push and a pull are both examples of contact forces.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7A-14",
      "type": "true_false",
      "title": "Gravity is a force that only works when two objects are touching each other.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "gravity is a force that acts at a distance; objects don't need to be touching for gravity to pull on them."
    },
    {
      "id": "3.7A-15",
      "type": "true_false",
      "title": "A magnet can attract an iron key even without touching it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7A-16",
      "type": "true_false",
      "title": "A student pushing a shopping cart is an example of a force acting at a distance.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "pushing the cart requires touching it, so it's a contact force."
    },
    {
      "id": "3.7A-17",
      "type": "true_false",
      "title": "Gravity is the force that pulls objects toward the ground.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7A-18",
      "type": "true_false",
      "title": "Two magnets can push away from each other (repel) or pull toward each other (attract), depending on which ends face each other.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7A-19",
      "type": "true_false",
      "title": "All forces require objects to be touching in order to work.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "some forces, like gravity and magnetism, can act at a distance without objects touching."
    },
    {
      "id": "3.7A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When a student pushes a swing, this is an example of a ",
        ", which is a ",
        " because the student's hands ",
        " the swing."
      ],
      "blanks": [
        {
          "choices": [
            "push",
            "pull"
          ],
          "correct": "push"
        },
        {
          "choices": [
            "contact force",
            "force at a distance"
          ],
          "correct": "contact force"
        },
        {
          "choices": [
            "touch",
            "do not touch"
          ],
          "correct": "touch"
        }
      ]
    },
    {
      "id": "3.7A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When an apple falls from a tree, ",
        " pulls it toward the ground. This is a force that acts ",
        ", because the apple and the Earth are not touching."
      ],
      "blanks": [
        {
          "choices": [
            "gravity",
            "magnetism"
          ],
          "correct": "gravity"
        },
        {
          "choices": [
            "at a distance",
            "only through contact"
          ],
          "correct": "at a distance"
        }
      ]
    },
    {
      "id": "3.7A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A magnet attracts a metal button from across a table without touching it. This shows that magnetism is a force that can act ",
        ", unlike a push, which needs the objects to be ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "at a distance",
            "only through contact"
          ],
          "correct": "at a distance"
        },
        {
          "choices": [
            "touching",
            "far apart"
          ],
          "correct": "touching"
        }
      ]
    },
    {
      "id": "3.7A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student pulls a sled across the snow using a rope. This is an example of a ",
        ", which is a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "pull",
            "push"
          ],
          "correct": "pull"
        },
        {
          "choices": [
            "contact force",
            "force at a distance"
          ],
          "correct": "contact force"
        }
      ]
    },
    {
      "id": "3.7A-24",
      "type": "ordering",
      "title": "Put these steps in order for testing whether a force is a contact force or a force at a distance:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose an object and a force to test, like a magnet and a paperclip",
        "Try moving the object without touching it",
        "Observe whether the object moves without being touched",
        "Decide if the force is a contact force or a force at a distance"
      ],
      "correct": [
        "Choose an object and a force to test, like a magnet and a paperclip",
        "Try moving the object without touching it",
        "Observe whether the object moves without being touched",
        "Decide if the force is a contact force or a force at a distance"
      ]
    },
    {
      "id": "3.7A-25",
      "type": "ordering",
      "title": "A class is testing how a magnet's pull changes with distance. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Place a paperclip on the table",
        "Slowly move a magnet closer to the paperclip",
        "Watch for the moment the paperclip is pulled toward the magnet",
        "Record how close the magnet had to get before it pulled the paperclip"
      ],
      "correct": [
        "Place a paperclip on the table",
        "Slowly move a magnet closer to the paperclip",
        "Watch for the moment the paperclip is pulled toward the magnet",
        "Record how close the magnet had to get before it pulled the paperclip"
      ]
    }
  ],
};
