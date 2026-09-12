// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.7B_v1.md) into the
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
  standard: "3.7B-SD",
  title: "Signal Defense: Forces and Motion",
  questions: [
    {
      "id": "3.7B-1",
      "type": "multiple_choice",
      "title": "A student gives a shopping cart a strong push. What happens to the cart's speed?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It stops moving",
        "It speeds up",
        "It changes color",
        "It becomes heavier"
      ],
      "correct": "It speeds up"
    },
    {
      "id": "3.7B-2",
      "type": "multiple_choice",
      "title": "A soccer player kicks a rolling ball, sending it in a completely different direction. What did the push do to the ball?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It stopped the ball completely",
        "It made the ball heavier",
        "It changed the ball's direction",
        "It had no effect on the ball"
      ],
      "correct": "It changed the ball's direction"
    },
    {
      "id": "3.7B-3",
      "type": "multiple_choice",
      "title": "A student catches a ball that was flying through the air. What did the pull of the student's hands do to the ball?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It sped the ball up",
        "It changed the ball's color",
        "It stopped the ball's motion",
        "It made the ball spin faster"
      ],
      "correct": "It stopped the ball's motion"
    },
    {
      "id": "3.7B-4",
      "type": "multiple_choice",
      "title": "A student squeezes the brakes on a bike while riding downhill. What happens to the bike's speed?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It speeds up",
        "It slows down",
        "It stays exactly the same",
        "It changes direction only"
      ],
      "correct": "It slows down"
    },
    {
      "id": "3.7B-5",
      "type": "multiple_choice",
      "title": "A wagon is sitting still in the driveway. A student pulls on the handle. What happens to the wagon?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It stays still",
        "It starts moving",
        "It gets heavier",
        "It changes shape"
      ],
      "correct": "It starts moving"
    },
    {
      "id": "3.7B-6",
      "type": "multiple_choice",
      "title": "A student pushes a friend on a swing harder than before. What is most likely to happen to the swing?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It will stop moving",
        "It will slow down",
        "It will swing higher and faster",
        "It will change color"
      ],
      "correct": "It will swing higher and faster"
    },
    {
      "id": "3.7B-7",
      "type": "multi_select",
      "title": "Which of these show a push or pull making something start moving?",
      "prompt": "Select all that apply.",
      "choices": [
        "Pulling a wagon that was sitting still",
        "Pushing a stalled shopping cart to get it rolling",
        "Kicking a soccer ball that was sitting on the ground",
        "Catching a thrown ball",
        "Squeezing a bike's brakes"
      ],
      "correct": [
        "Pulling a wagon that was sitting still",
        "Pushing a stalled shopping cart to get it rolling",
        "Kicking a soccer ball that was sitting on the ground"
      ]
    },
    {
      "id": "3.7B-8",
      "type": "multi_select",
      "title": "Which of these show a push or pull making something stop moving?",
      "prompt": "Select all that apply.",
      "choices": [
        "Catching a flying ball with your hands",
        "Squeezing a bike's brakes",
        "A goalie blocking a soccer ball with their hands",
        "Kicking a ball that is sitting still",
        "Pushing a swing higher"
      ],
      "correct": [
        "Catching a flying ball with your hands",
        "Squeezing a bike's brakes",
        "A goalie blocking a soccer ball with their hands"
      ]
    },
    {
      "id": "3.7B-9",
      "type": "multi_select",
      "title": "Which of these show a push or pull changing an object's direction?",
      "prompt": "Select all that apply.",
      "choices": [
        "A hockey stick redirecting a puck",
        "A tennis racket hitting a ball back over the net",
        "A soccer player kicking a rolling ball sideways",
        "A wagon sitting still in the driveway",
        "A ball slowly stopping on its own"
      ],
      "correct": [
        "A hockey stick redirecting a puck",
        "A tennis racket hitting a ball back over the net",
        "A soccer player kicking a rolling ball sideways"
      ]
    },
    {
      "id": "3.7B-10",
      "type": "multi_select",
      "title": "Which of these show a push or pull speeding up a moving object?",
      "prompt": "Select all that apply.",
      "choices": [
        "Pushing a friend on a swing to make them go higher",
        "Pedaling harder on a bike to go faster",
        "Giving a rolling shopping cart a second push",
        "Squeezing the brakes on a bike",
        "Catching a ball with your hands"
      ],
      "correct": [
        "Pushing a friend on a swing to make them go higher",
        "Pedaling harder on a bike to go faster",
        "Giving a rolling shopping cart a second push"
      ]
    },
    {
      "id": "3.7B-11",
      "type": "multi_select",
      "title": "Which of these describe ways a push or pull can change an object's motion?",
      "prompt": "Select all that apply.",
      "choices": [
        "Starting the object moving",
        "Stopping the object",
        "Speeding the object up",
        "Slowing the object down",
        "Changing the object's direction",
        "Changing the object's color"
      ],
      "correct": [
        "Starting the object moving",
        "Stopping the object",
        "Speeding the object up",
        "Slowing the object down",
        "Changing the object's direction"
      ]
    },
    {
      "id": "3.7B-12",
      "type": "multi_select",
      "title": "Which of these are examples of a push or pull changing something's position or motion?",
      "prompt": "Select all that apply.",
      "choices": [
        "A student pulling a sled across the snow",
        "A goalie catching a soccer ball",
        "A student pedaling a bike faster",
        "A rock sitting still on the ground with nothing touching it",
        "The color of a wagon"
      ],
      "correct": [
        "A student pulling a sled across the snow",
        "A goalie catching a soccer ball",
        "A student pedaling a bike faster"
      ]
    },
    {
      "id": "3.7B-13",
      "type": "true_false",
      "title": "A push or a pull can make a still object start moving.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7B-14",
      "type": "true_false",
      "title": "A push or a pull can only speed an object up — it can never slow an object down or stop it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a push or pull can also slow an object down or stop it completely, like brakes on a bike."
    },
    {
      "id": "3.7B-15",
      "type": "true_false",
      "title": "Hitting a ball with a bat or racket can change the direction the ball is moving.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7B-16",
      "type": "true_false",
      "title": "Pushing a swing harder will make it go higher and faster.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7B-17",
      "type": "true_false",
      "title": "A moving object can only change direction if someone or something pushes or pulls on it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7B-18",
      "type": "true_false",
      "title": "Catching a ball is an example of a pull that speeds the ball up.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "catching a ball is a pull that slows or stops the ball's motion, not one that speeds it up."
    },
    {
      "id": "3.7B-19",
      "type": "true_false",
      "title": "A push or pull can change how fast an object moves, change its direction, or start and stop its motion.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.7B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student pushes a toy car that is sitting still on the floor. The push makes the car ",
        ", showing that a push can ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "start moving",
            "stop moving",
            "change color"
          ],
          "correct": "start moving"
        },
        {
          "choices": [
            "change an object's motion",
            "change an object's color",
            "do nothing"
          ],
          "correct": "change an object's motion"
        }
      ]
    },
    {
      "id": "3.7B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student catches a frisbee flying toward them. This pull ",
        " the frisbee's motion."
      ],
      "blanks": [
        {
          "choices": [
            "stops",
            "speeds up",
            "changes the color of"
          ],
          "correct": "stops"
        }
      ]
    },
    {
      "id": "3.7B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A tennis player hits a ball with a racket, sending it back over the net in a new direction. This push ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "changes the ball's direction",
            "stops the ball completely",
            "has no effect on the ball"
          ],
          "correct": "changes the ball's direction"
        }
      ]
    },
    {
      "id": "3.7B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student gives a rolling skateboard a second push, making it go faster down the sidewalk. This push ",
        " the skateboard's motion."
      ],
      "blanks": [
        {
          "choices": [
            "speeds up",
            "slows down",
            "stops"
          ],
          "correct": "speeds up"
        }
      ]
    },
    {
      "id": "3.7B-24",
      "type": "ordering",
      "title": "Put these steps in order for an experiment testing how a push changes a ball's speed:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what will happen to the ball's speed if you push it harder",
        "Roll the ball with a gentle push and observe its speed",
        "Roll the same ball with a much harder push and observe its speed",
        "Compare the two speeds and record what you observed"
      ],
      "correct": [
        "Predict what will happen to the ball's speed if you push it harder",
        "Roll the ball with a gentle push and observe its speed",
        "Roll the same ball with a much harder push and observe its speed",
        "Compare the two speeds and record what you observed"
      ]
    },
    {
      "id": "3.7B-25",
      "type": "ordering",
      "title": "A class is testing how pushing a swing changes its motion. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict what will happen if the swing is pushed harder",
        "Give the swing a gentle push and observe how high it goes",
        "Give the swing a much harder push and observe how high it goes",
        "Compare the two results and record what you observed"
      ],
      "correct": [
        "Predict what will happen if the swing is pushed harder",
        "Give the swing a gentle push and observe how high it goes",
        "Give the swing a much harder push and observe how high it goes",
        "Compare the two results and record what you observed"
      ]
    }
  ],
};
