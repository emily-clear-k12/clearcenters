// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.8B_v1.md) into the
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
  standard: "3.8B-SD",
  title: "Signal Defense: Mechanical Energy",
  questions: [
    {
      "id": "3.8B-1",
      "type": "multiple_choice",
      "title": "A toy car rolls down a ramp and crashes into a block. A second identical toy car rolls down the same ramp, but much faster, and crashes into an identical block. Which car has more mechanical energy?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The slower car",
        "The faster car",
        "They have the same amount",
        "Neither car has mechanical energy"
      ],
      "correct": "The faster car"
    },
    {
      "id": "3.8B-2",
      "type": "multiple_choice",
      "title": "A ball rolled gently into a stack of cups knocks over 2 cups. The same ball rolled much faster into the same stack knocks over 6 cups. What does this show about the faster ball?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It has less mechanical energy",
        "It has no mechanical energy",
        "It has more mechanical energy than the slower ball",
        "It weighs more than the slower ball"
      ],
      "correct": "It has more mechanical energy than the slower ball"
    },
    {
      "id": "3.8B-3",
      "type": "multiple_choice",
      "title": "A fan set on low speed barely moves a sheet of paper. The same fan set on high speed blows the paper across the room. Why does the high-speed setting move the paper farther?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The fan is heavier on high speed",
        "The fan's blades are moving faster, giving them more mechanical energy",
        "The fan makes more light on high speed",
        "The fan makes no difference"
      ],
      "correct": "The fan's blades are moving faster, giving them more mechanical energy"
    },
    {
      "id": "3.8B-4",
      "type": "multiple_choice",
      "title": "Two identical bikes are riding down the same street. One is going much faster than the other. Which bike has more mechanical energy?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The slower bike",
        "The faster bike",
        "They have the same amount, since they are identical bikes",
        "Neither bike has mechanical energy"
      ],
      "correct": "The faster bike"
    },
    {
      "id": "3.8B-5",
      "type": "multiple_choice",
      "title": "A baseball pitcher throws a very fast pitch. Why is a fast pitch harder for a batter to hit than a slow, gentle toss?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The fast ball is a different color",
        "The fast ball has more mechanical energy, so it moves and arrives more quickly",
        "The fast ball is heavier",
        "There is no real difference between the two pitches"
      ],
      "correct": "The fast ball has more mechanical energy, so it moves and arrives more quickly"
    },
    {
      "id": "3.8B-6",
      "type": "multiple_choice",
      "title": "A student rolls a bowling ball slowly down the lane, and it barely nudges the pins. The same student rolls it much faster, and it knocks down all the pins. What does this show?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A faster-moving ball has less mechanical energy",
        "The slower ball had more mechanical energy",
        "A faster-moving ball has more mechanical energy, which is why it can knock things over harder",
        "Speed has nothing to do with mechanical energy"
      ],
      "correct": "A faster-moving ball has more mechanical energy, which is why it can knock things over harder"
    },
    {
      "id": "3.8B-7",
      "type": "multi_select",
      "title": "Which of these show that a faster-moving object has more mechanical energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A fast-rolling ball knocks over more cups than a slow-rolling one",
        "A fast pitch is harder to catch than a slow, gentle toss",
        "A fan on high speed blows papers farther than on low speed",
        "Two identical balls sitting still on a shelf",
        "A lamp that is turned off"
      ],
      "correct": [
        "A fast-rolling ball knocks over more cups than a slow-rolling one",
        "A fast pitch is harder to catch than a slow, gentle toss",
        "A fan on high speed blows papers farther than on low speed"
      ]
    },
    {
      "id": "3.8B-8",
      "type": "multi_select",
      "title": "Which of these statements about speed and mechanical energy are true?",
      "prompt": "Select all that apply.",
      "choices": [
        "A faster-moving object generally has more mechanical energy than the same object moving slower",
        "Mechanical energy is related to how fast something is moving",
        "Speed has no connection to mechanical energy",
        "A slower object always has more mechanical energy than a faster one",
        "A fast-moving object can often push or knock things harder than a slow-moving one"
      ],
      "correct": [
        "A faster-moving object generally has more mechanical energy than the same object moving slower",
        "Mechanical energy is related to how fast something is moving",
        "A fast-moving object can often push or knock things harder than a slow-moving one"
      ]
    },
    {
      "id": "3.8B-9",
      "type": "multi_select",
      "title": "Which of these would you expect to have more mechanical energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A car driving 60 miles per hour compared to the same car driving 10 miles per hour",
        "A fast-pitched baseball compared to a gently tossed one",
        "A bike going downhill fast compared to the same bike going slowly on flat ground",
        "A rock sitting still on the ground",
        "A book resting on a shelf"
      ],
      "correct": [
        "A car driving 60 miles per hour compared to the same car driving 10 miles per hour",
        "A fast-pitched baseball compared to a gently tossed one",
        "A bike going downhill fast compared to the same bike going slowly on flat ground"
      ]
    },
    {
      "id": "3.8B-10",
      "type": "multi_select",
      "title": "A student is comparing a ball thrown gently and the same ball thrown hard at a target. Which of these would help them test whether speed relates to mechanical energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "Timing how fast the ball reaches the target",
        "Observing how far the target moves or tips when hit",
        "Comparing how loud the impact sounds each time",
        "Comparing the ball's color each time",
        "Weighing the target before the test"
      ],
      "correct": [
        "Timing how fast the ball reaches the target",
        "Observing how far the target moves or tips when hit",
        "Comparing how loud the impact sounds each time"
      ]
    },
    {
      "id": "3.8B-11",
      "type": "multi_select",
      "title": "Which of these are ways you could observe that a faster object has more mechanical energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "How far it pushes something it bumps into",
        "How many cups or pins it knocks over",
        "How loud a crash or impact sounds",
        "What color the object is",
        "How the object smells"
      ],
      "correct": [
        "How far it pushes something it bumps into",
        "How many cups or pins it knocks over",
        "How loud a crash or impact sounds"
      ]
    },
    {
      "id": "3.8B-12",
      "type": "true_false",
      "title": "A faster-moving object generally has more mechanical energy than the same object moving slower.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8B-13",
      "type": "true_false",
      "title": "Speed and mechanical energy are not related to each other at all.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a faster-moving object generally has more mechanical energy than the same object moving slower."
    },
    {
      "id": "3.8B-14",
      "type": "true_false",
      "title": "A ball rolled quickly into a stack of cups will usually knock over more cups than the same ball rolled slowly.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8B-15",
      "type": "true_false",
      "title": "A slow-moving car has more mechanical energy than the same car moving fast.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "the faster-moving car has more mechanical energy."
    },
    {
      "id": "3.8B-16",
      "type": "true_false",
      "title": "You can sometimes tell an object has more mechanical energy by how hard it pushes or knocks into something else.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8B-17",
      "type": "true_false",
      "title": "Two identical toy cars moving at the same speed have different amounts of mechanical energy.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "two identical objects moving at the same speed have about the same amount of mechanical energy."
    },
    {
      "id": "3.8B-18",
      "type": "true_false",
      "title": "A fast-pitched baseball has more mechanical energy than a slow, gently tossed one.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.8B-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A toy truck pushed gently into a tower of blocks only knocks over the top block, but the same truck pushed much faster knocks over the whole tower. The faster truck has ",
        " mechanical energy, because speed and mechanical energy are ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "more",
            "less",
            "the same amount of"
          ],
          "correct": "more"
        },
        {
          "choices": [
            "related",
            "not related"
          ],
          "correct": "related"
        }
      ]
    },
    {
      "id": "3.8B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Two identical marbles roll down the same ramp, but one is going faster at the bottom than the other. The faster marble has ",
        " mechanical energy."
      ],
      "blanks": [
        {
          "choices": [
            "more",
            "less",
            "the same amount of"
          ],
          "correct": "more"
        }
      ]
    },
    {
      "id": "3.8B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A toy top spun gently wobbles and stops quickly, but the same top spun hard spins for much longer and is harder to stop. This happens because the top spinning ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "faster has more mechanical energy",
            "slower has more mechanical energy"
          ],
          "correct": "faster has more mechanical energy"
        }
      ]
    },
    {
      "id": "3.8B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A fast-thrown frisbee is harder to catch than a gently tossed one because the fast frisbee has ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "more mechanical energy",
            "less mechanical energy",
            "the same mechanical energy"
          ],
          "correct": "more mechanical energy"
        }
      ]
    },
    {
      "id": "3.8B-23",
      "type": "ordering",
      "title": "Put these steps in order for an experiment testing whether a faster ball has more mechanical energy:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict which will knock over more cups: a slow-rolling ball or a fast-rolling ball",
        "Roll the ball gently into a stack of cups and count how many fall",
        "Roll the same ball much faster into a new stack of the same number of cups and count how many fall",
        "Compare the results and record which ball had more mechanical energy"
      ],
      "correct": [
        "Predict which will knock over more cups: a slow-rolling ball or a fast-rolling ball",
        "Roll the ball gently into a stack of cups and count how many fall",
        "Roll the same ball much faster into a new stack of the same number of cups and count how many fall",
        "Compare the results and record which ball had more mechanical energy"
      ]
    },
    {
      "id": "3.8B-24",
      "type": "ordering",
      "title": "A class is testing how a fan's speed setting affects how far it can move a piece of paper. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict whether the low or high fan setting will move the paper farther",
        "Turn the fan to low speed and measure how far the paper moves",
        "Turn the fan to high speed and measure how far the paper moves",
        "Compare the two distances and record which setting had more mechanical energy"
      ],
      "correct": [
        "Predict whether the low or high fan setting will move the paper farther",
        "Turn the fan to low speed and measure how far the paper moves",
        "Turn the fan to high speed and measure how far the paper moves",
        "Compare the two distances and record which setting had more mechanical energy"
      ]
    },
    {
      "id": "3.8B-25",
      "type": "ordering",
      "title": "A student is testing whether a toy car released from a higher point on a ramp has more mechanical energy than one released from a lower point. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Predict which release point will make the car crash into a block harder",
        "Release the car from a low point on the ramp and measure how far the block moves",
        "Release the car from a high point on the ramp and measure how far the block moves",
        "Compare the two results and record which release point gave the car more mechanical energy"
      ],
      "correct": [
        "Predict which release point will make the car crash into a block harder",
        "Release the car from a low point on the ramp and measure how far the block moves",
        "Release the car from a high point on the ramp and measure how far the block moves",
        "Compare the two results and record which release point gave the car more mechanical energy"
      ]
    }
  ],
};
