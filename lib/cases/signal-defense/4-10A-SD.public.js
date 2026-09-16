// Signal Defense — 4.10A, The Water Cycle (Grade 4 Science).
// Grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.10A verbatim (TEA adopted grade 4 science TEKS): "describe and
// illustrate the continuous movement of water above and on the surface of
// Earth through the water cycle and explain the role of the Sun as a major
// source of energy in this process"
//
// Verbs: DESCRIBE, ILLUSTRATE, and EXPLAIN. Three things the wording pins
// down that the questions have to carry:
//
//   CONTINUOUS. The standard says continuous movement — a cycle with no
//   start or end. Several items exist purely to push on that, since "it
//   starts with evaporation" is the classic wrong answer.
//
//   ABOVE AND ON THE SURFACE. Both, so collection and runoff belong here
//   alongside evaporation and condensation.
//
//   THE SUN'S ROLE. Explicitly named in the standard as the major energy
//   source, so it is not optional garnish — a bank without it would be
//   missing a clause.

export const PUBLIC_CASE = {
  standard: "4.10A-SD",
  title: "Signal Defense: The Water Cycle",
  questions: [
    {
      "id": "4.10A-1",
      "type": "multiple_choice",
      "title": "What provides most of the energy that drives the water cycle?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The Sun",
        "The Moon",
        "The wind",
        "The ocean floor"
      ],
      "correct": "The Sun"
    },
    {
      "id": "4.10A-2",
      "type": "multiple_choice",
      "title": "A puddle shrinks and disappears on a sunny afternoon. What happened to the water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It was destroyed by the Sun",
        "It evaporated into the air",
        "It froze into ice",
        "It turned into soil"
      ],
      "correct": "It evaporated into the air"
    },
    {
      "id": "4.10A-3",
      "type": "multiple_choice",
      "title": "Water vapor rises, cools, and forms clouds. What is this step called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Evaporation",
        "Runoff",
        "Condensation",
        "Collection"
      ],
      "correct": "Condensation"
    },
    {
      "id": "4.10A-4",
      "type": "multiple_choice",
      "title": "A student asks where the water cycle begins. What is the best answer?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It begins with evaporation",
        "It begins with rain",
        "It begins in the ocean",
        "It has no beginning — it is continuous"
      ],
      "correct": "It has no beginning — it is continuous"
    },
    {
      "id": "4.10A-5",
      "type": "multiple_choice",
      "title": "Rain falls on a hillside and flows downhill into a creek. What is this movement called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Runoff",
        "Condensation",
        "Evaporation",
        "Precipitation"
      ],
      "correct": "Runoff"
    },
    {
      "id": "4.10A-6",
      "type": "multiple_choice",
      "title": "Two identical puddles are left out, one in sun and one in shade. Which will disappear first, and why?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The shaded one, because it is cooler",
        "The sunny one, because the Sun provides energy for evaporation",
        "Both at exactly the same time",
        "Neither will evaporate"
      ],
      "correct": "The sunny one, because the Sun provides energy for evaporation"
    },
    {
      "id": "4.10A-7",
      "type": "true_false",
      "title": "The water cycle is continuous and keeps repeating.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10A-8",
      "type": "true_false",
      "title": "The Sun is the major source of energy for the water cycle.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10A-9",
      "type": "true_false",
      "title": "Water is destroyed when a puddle dries up.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.10A-10",
      "type": "true_false",
      "title": "Water moves both above Earth's surface and across it.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10A-11",
      "type": "true_false",
      "title": "Condensation happens when water vapor cools and turns back into liquid droplets.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10A-12",
      "type": "true_false",
      "title": "The water cycle stops at night when the Sun goes down.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.10A-13",
      "type": "true_false",
      "title": "Rain, snow, and hail are all forms of precipitation.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10A-14",
      "type": "multi_select",
      "title": "Which of these are parts of the water cycle?",
      "prompt": "Select all that apply.",
      "choices": [
        "Evaporation",
        "Condensation",
        "Precipitation",
        "Runoff",
        "Erosion of rock",
        "Photosynthesis"
      ],
      "correct": [
        "Evaporation",
        "Condensation",
        "Precipitation",
        "Runoff"
      ]
    },
    {
      "id": "4.10A-15",
      "type": "multi_select",
      "title": "Which statements about the Sun's role in the water cycle are correct?",
      "prompt": "Select all that apply.",
      "choices": [
        "The Sun provides the energy for evaporation",
        "The Sun warms oceans, lakes, and puddles",
        "Without the Sun's energy the cycle would slow dramatically",
        "The Sun destroys water",
        "The Sun is the major energy source for the cycle",
        "The Sun only matters during precipitation"
      ],
      "correct": [
        "The Sun provides the energy for evaporation",
        "The Sun warms oceans, lakes, and puddles",
        "Without the Sun's energy the cycle would slow dramatically",
        "The Sun is the major energy source for the cycle"
      ]
    },
    {
      "id": "4.10A-16",
      "type": "multi_select",
      "title": "Which observations are evidence that water moves through a cycle?",
      "prompt": "Select all that apply.",
      "choices": [
        "A puddle shrinks on a sunny day",
        "Droplets form on the outside of a cold glass",
        "Rain fills a creek that flows to a river",
        "Clouds form after a warm morning",
        "A rock splits in the cold",
        "A magnet picks up a nail"
      ],
      "correct": [
        "A puddle shrinks on a sunny day",
        "Droplets form on the outside of a cold glass",
        "Rain fills a creek that flows to a river",
        "Clouds form after a warm morning"
      ]
    },
    {
      "id": "4.10A-17",
      "type": "multi_select",
      "title": "Which of these describe water moving ON Earth's surface?",
      "prompt": "Select all that apply.",
      "choices": [
        "A stream flowing toward a lake",
        "Rainwater running down a street",
        "Water vapor rising into the air",
        "A river carrying water to the ocean",
        "Clouds drifting overhead",
        "Runoff collecting in a pond"
      ],
      "correct": [
        "A stream flowing toward a lake",
        "Rainwater running down a street",
        "A river carrying water to the ocean",
        "Runoff collecting in a pond"
      ]
    },
    {
      "id": "4.10A-18",
      "type": "multi_select",
      "title": "A student is illustrating the water cycle. What should the drawing include?",
      "prompt": "Select all that apply.",
      "choices": [
        "The Sun as the energy source",
        "Arrows showing water rising as vapor",
        "Clouds forming from condensation",
        "Precipitation falling back down",
        "A clear starting point labeled 'step 1'",
        "Water collecting and running along the surface"
      ],
      "correct": [
        "The Sun as the energy source",
        "Arrows showing water rising as vapor",
        "Clouds forming from condensation",
        "Precipitation falling back down",
        "Water collecting and running along the surface"
      ]
    },
    {
      "id": "4.10A-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The Sun's energy causes water to ",
        " into the air, and cooling higher up causes it to ",
        " into cloud droplets."
      ],
      "blanks": [
        {
          "choices": [
            "evaporate",
            "condense"
          ],
          "correct": "evaporate"
        },
        {
          "choices": [
            "evaporate",
            "condense"
          ],
          "correct": "condense"
        }
      ]
    },
    {
      "id": "4.10A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The water cycle is ",
        ", which means the same water keeps ",
        " through it."
      ],
      "blanks": [
        {
          "choices": [
            "continuous",
            "one-way"
          ],
          "correct": "continuous"
        },
        {
          "choices": [
            "disappearing",
            "moving"
          ],
          "correct": "moving"
        }
      ]
    },
    {
      "id": "4.10A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A puddle in the sun dries ",
        " than one in the shade, because the Sun supplies more ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "faster",
            "slower"
          ],
          "correct": "faster"
        },
        {
          "choices": [
            "water",
            "energy"
          ],
          "correct": "energy"
        }
      ]
    },
    {
      "id": "4.10A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Rain that lands on a hillside and flows downhill is called ",
        ", which moves water ",
        " Earth's surface."
      ],
      "blanks": [
        {
          "choices": [
            "runoff",
            "condensation"
          ],
          "correct": "runoff"
        },
        {
          "choices": [
            "above",
            "across"
          ],
          "correct": "across"
        }
      ]
    },
    {
      "id": "4.10A-23",
      "type": "ordering",
      "title": "Put these water cycle events in order, starting from a warm lake:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Water vapor cools and condenses into clouds",
        "Precipitation falls back to the ground",
        "The Sun warms the water in the lake",
        "Water evaporates and rises as vapor"
      ],
      "correct": [
        "The Sun warms the water in the lake",
        "Water evaporates and rises as vapor",
        "Water vapor cools and condenses into clouds",
        "Precipitation falls back to the ground"
      ]
    },
    {
      "id": "4.10A-24",
      "type": "ordering",
      "title": "Put these steps in order to follow a raindrop back to the ocean:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "It runs downhill into a creek",
        "Rain falls onto a hillside",
        "The river carries it to the ocean",
        "The creek flows into a river"
      ],
      "correct": [
        "Rain falls onto a hillside",
        "It runs downhill into a creek",
        "The creek flows into a river",
        "The river carries it to the ocean"
      ]
    },
    {
      "id": "4.10A-25",
      "type": "ordering",
      "title": "Put these steps in order for a puddle investigation on a sunny day:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Explain that the Sun's energy caused evaporation",
        "Trace the edge of a puddle with chalk",
        "Check the puddle again a few hours later",
        "Notice the puddle has shrunk inside the chalk line"
      ],
      "correct": [
        "Trace the edge of a puddle with chalk",
        "Check the puddle again a few hours later",
        "Notice the puddle has shrunk inside the chalk line",
        "Explain that the Sun's energy caused evaporation"
      ]
    }
  ],
};
