// Signal Defense — 4.7A, Patterns of Forces (Grade 4 Science).
// Part of the grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.7A verbatim (TEA adopted grade 4 science TEKS, checked Sept 16
// 2026): "plan and conduct descriptive investigations to explore the
// patterns of forces such as gravity, friction, or magnetism in contact or
// at a distance on an object"
//
// NOTE ON THE CODE: this is 4.7**A**, not the bare "4.7". TEKS_STANDARDS.md
// used to say 4.7 has no sub-letter; TEA's adopted text has 4.7(A). That
// note was half right — there is no 4.7B, but there IS a letter. The
// existing Signal Check case is filed as `4.7-SC` and is short a letter for
// the same reason `5.9-SC` is; see the corrected note in TEKS_STANDARDS.md.
//
// Verbs: PLAN and CONDUCT investigations, to EXPLORE PATTERNS. That is why
// this bank leans on investigation design — fair tests, what to change and
// what to keep the same, reading a pattern off repeated trials — rather than
// just naming forces. Naming items are the scaffolding, not the standard.
//
// Scope: gravity, friction and magnetism, and the contact / at-a-distance
// distinction. Gravity IS in scope here, unlike 4.10B where it is not.
// Answer positions varied from the start.

export const PUBLIC_CASE = {
  standard: "4.7A-SD",
  title: "Signal Defense: Patterns of Forces",
  questions: [
    {
      "id": "4.7A-1",
      "type": "multiple_choice",
      "title": "A ball rolls to a stop on carpet faster than on a smooth floor. Which force explains the difference?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Gravity",
        "Magnetism",
        "Friction",
        "No force at all"
      ],
      "correct": "Friction"
    },
    {
      "id": "4.7A-2",
      "type": "multiple_choice",
      "title": "A magnet moves a paperclip without ever touching it. What kind of force is this?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A contact force",
        "Friction",
        "A push only",
        "A force at a distance"
      ],
      "correct": "A force at a distance"
    },
    {
      "id": "4.7A-3",
      "type": "multiple_choice",
      "title": "A student wants to test whether a ramp's surface changes how far a car rolls. What should she change between trials?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Only the ramp surface",
        "The car she uses",
        "The height of the ramp",
        "Everything at once"
      ],
      "correct": "Only the ramp surface"
    },
    {
      "id": "4.7A-4",
      "type": "multiple_choice",
      "title": "A dropped eraser falls straight down every single time. Which force creates that pattern?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Friction",
        "Gravity",
        "Magnetism",
        "A push from the air"
      ],
      "correct": "Gravity"
    },
    {
      "id": "4.7A-5",
      "type": "multiple_choice",
      "title": "Why does a student repeat the same ramp trial five times instead of once?",
      "prompt": "Choose the best answer.",
      "choices": [
        "To make the car go faster",
        "Because one trial is against the rules",
        "To see whether the same pattern happens each time",
        "To use up the class period"
      ],
      "correct": "To see whether the same pattern happens each time"
    },
    {
      "id": "4.7A-6",
      "type": "multiple_choice",
      "title": "A student pushes a book across a desk. Which best describes the force she used?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A force at a distance",
        "Magnetism",
        "Gravity pulling sideways",
        "A contact force"
      ],
      "correct": "A contact force"
    },
    {
      "id": "4.7A-7",
      "type": "true_false",
      "title": "Magnetism can act on an object without touching it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.7A-8",
      "type": "true_false",
      "title": "Friction acts between two surfaces that are touching.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.7A-9",
      "type": "true_false",
      "title": "In a fair test, you should change several things at the same time.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.7A-10",
      "type": "true_false",
      "title": "A rougher surface usually creates more friction than a smooth one.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.7A-11",
      "type": "true_false",
      "title": "Gravity only pulls on objects that are already moving.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.7A-12",
      "type": "true_false",
      "title": "A magnet will attract every object it is held near.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.7A-13",
      "type": "true_false",
      "title": "Recording results in a table makes a pattern easier to spot across trials.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.7A-14",
      "type": "multi_select",
      "title": "Which of these are forces that can act at a distance?",
      "prompt": "Select all that apply.",
      "choices": [
        "Magnetism",
        "Gravity",
        "Friction between a tire and the road",
        "A hand pushing a cart",
        "A magnet repelling another magnet",
        "A rope pulling a sled"
      ],
      "correct": [
        "Magnetism",
        "Gravity",
        "A magnet repelling another magnet"
      ]
    },
    {
      "id": "4.7A-15",
      "type": "multi_select",
      "title": "A student is planning a fair test of how ramp height affects how far a car rolls. What should stay the same every trial?",
      "prompt": "Select all that apply.",
      "choices": [
        "The same car",
        "The same floor surface",
        "The same starting line on the ramp",
        "The height of the ramp",
        "The same way of measuring distance",
        "The number of ramps used at once"
      ],
      "correct": [
        "The same car",
        "The same floor surface",
        "The same starting line on the ramp",
        "The same way of measuring distance"
      ]
    },
    {
      "id": "4.7A-16",
      "type": "multi_select",
      "title": "Which of these show friction at work?",
      "prompt": "Select all that apply.",
      "choices": [
        "A sled slowing down on bare pavement",
        "Rubbing your hands together and feeling warmth",
        "A magnet pulling a paperclip across a table",
        "Bike brakes squeezing the wheel to stop it",
        "An apple falling from a tree",
        "Shoes gripping a gym floor"
      ],
      "correct": [
        "A sled slowing down on bare pavement",
        "Rubbing your hands together and feeling warmth",
        "Bike brakes squeezing the wheel to stop it",
        "Shoes gripping a gym floor"
      ]
    },
    {
      "id": "4.7A-17",
      "type": "multi_select",
      "title": "Which of these would be useful to record while investigating a pattern of forces?",
      "prompt": "Select all that apply.",
      "choices": [
        "How far the object moved each trial",
        "Which surface was used each trial",
        "How many trials were run",
        "Which classmate you like working with",
        "The starting height each trial",
        "What you had for lunch"
      ],
      "correct": [
        "How far the object moved each trial",
        "Which surface was used each trial",
        "How many trials were run",
        "The starting height each trial"
      ]
    },
    {
      "id": "4.7A-18",
      "type": "multi_select",
      "title": "A car rolls farther each time a ramp is made steeper. Which statements describe that pattern correctly?",
      "prompt": "Select all that apply.",
      "choices": [
        "Steeper ramps gave longer distances",
        "There is a pattern between ramp height and distance",
        "The results were completely random",
        "Repeating the trials helped show the pattern was real",
        "Ramp height made no difference",
        "The distance can be predicted for a height not yet tested"
      ],
      "correct": [
        "Steeper ramps gave longer distances",
        "There is a pattern between ramp height and distance",
        "Repeating the trials helped show the pattern was real",
        "The distance can be predicted for a height not yet tested"
      ]
    },
    {
      "id": "4.7A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A magnet moving a paperclip it never touches is a force acting ",
        ", while a hand pushing a book is a ",
        " force."
      ],
      "blanks": [
        {
          "choices": [
            "at a distance",
            "by contact"
          ],
          "correct": "at a distance"
        },
        {
          "choices": [
            "distance",
            "contact"
          ],
          "correct": "contact"
        }
      ]
    },
    {
      "id": "4.7A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A ball rolls a ",
        " distance on carpet than on tile, because carpet creates ",
        " friction."
      ],
      "blanks": [
        {
          "choices": [
            "shorter",
            "longer"
          ],
          "correct": "shorter"
        },
        {
          "choices": [
            "less",
            "more"
          ],
          "correct": "more"
        }
      ]
    },
    {
      "id": "4.7A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "In a fair test of ramp height, you change ",
        " thing and keep everything else ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "one",
            "every"
          ],
          "correct": "one"
        },
        {
          "choices": [
            "different",
            "the same"
          ],
          "correct": "the same"
        }
      ]
    },
    {
      "id": "4.7A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Running an investigation several times helps you tell a real ",
        " from a single result that happened ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "pattern",
            "mistake"
          ],
          "correct": "pattern"
        },
        {
          "choices": [
            "on purpose",
            "by chance"
          ],
          "correct": "by chance"
        }
      ]
    },
    {
      "id": "4.7A-23",
      "type": "ordering",
      "title": "Put these steps in order for planning and running a fair test of friction:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Decide which one thing you will change",
        "Look for a pattern across all the trials",
        "Write down the question you want to answer",
        "Run the same test on each surface and record the distance"
      ],
      "correct": [
        "Write down the question you want to answer",
        "Decide which one thing you will change",
        "Run the same test on each surface and record the distance",
        "Look for a pattern across all the trials"
      ]
    },
    {
      "id": "4.7A-24",
      "type": "ordering",
      "title": "Put these steps in order for testing whether a magnet works through a barrier:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Record whether the paperclip still moved",
        "Place a paperclip on top of a sheet of paper",
        "Repeat with a thicker barrier and compare",
        "Move a magnet underneath the paper"
      ],
      "correct": [
        "Place a paperclip on top of a sheet of paper",
        "Move a magnet underneath the paper",
        "Record whether the paperclip still moved",
        "Repeat with a thicker barrier and compare"
      ]
    },
    {
      "id": "4.7A-25",
      "type": "ordering",
      "title": "Put these events in order when a ball is rolled across a rough floor:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "The ball comes to a complete stop",
        "The ball is given a push and starts moving",
        "The ball gradually slows down",
        "Friction acts between the ball and the floor"
      ],
      "correct": [
        "The ball is given a push and starts moving",
        "Friction acts between the ball and the floor",
        "The ball gradually slows down",
        "The ball comes to a complete stop"
      ]
    }
  ],
};
