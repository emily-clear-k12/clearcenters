// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.13A_v1.md) into the
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
  standard: "3.13A-SD",
  title: "Signal Defense: External Structures & Survival",
  questions: [
    {
      "id": "3.13A-1",
      "type": "multiple_choice",
      "title": "A giraffe has a very long neck. How does this structure help the giraffe survive?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It helps the giraffe swim faster",
        "It helps the giraffe reach leaves high up in trees that other animals cannot reach",
        "It helps the giraffe dig burrows underground",
        "It has no effect on survival"
      ],
      "correct": "It helps the giraffe reach leaves high up in trees that other animals cannot reach"
    },
    {
      "id": "3.13A-2",
      "type": "multiple_choice",
      "title": "A duck has webbed feet, with skin connecting its toes. How does this structure help the duck survive?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It helps the duck fly faster",
        "It helps the duck swim more easily through water",
        "It helps the duck climb trees",
        "It has no effect on the duck at all"
      ],
      "correct": "It helps the duck swim more easily through water"
    },
    {
      "id": "3.13A-3",
      "type": "multiple_choice",
      "title": "Many Arctic animals, like polar bears, have thick fur and a layer of blubber (fat). How do these structures help them survive?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They help the animal swim underwater only",
        "They help keep the animal warm in extremely cold environments",
        "They help the animal see in the dark",
        "They have no real purpose"
      ],
      "correct": "They help keep the animal warm in extremely cold environments"
    },
    {
      "id": "3.13A-4",
      "type": "multiple_choice",
      "title": "A rabbit has long ears that can turn to pick up sounds from many directions. How does this structure likely help the rabbit survive?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It helps the rabbit dig faster",
        "It helps the rabbit hear predators approaching from different directions",
        "It helps the rabbit swim",
        "It has no survival benefit"
      ],
      "correct": "It helps the rabbit hear predators approaching from different directions"
    },
    {
      "id": "3.13A-5",
      "type": "multiple_choice",
      "title": "Which of these best explains why many animals have external structures suited to their environment?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The structures are random and serve no purpose",
        "The structures help the animal do things like find food, move, or stay safe in its environment",
        "All animals have the exact same structures",
        "Structures never relate to how or where an animal lives"
      ],
      "correct": "The structures help the animal do things like find food, move, or stay safe in its environment"
    },
    {
      "id": "3.13A-6",
      "type": "multiple_choice",
      "title": "A bird with a long, thin beak is well suited to eating which kind of food?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Large chunks of meat only",
        "Food found deep inside flowers or narrow spaces, like nectar or insects in bark",
        "Only food that is underwater",
        "No food at all"
      ],
      "correct": "Food found deep inside flowers or narrow spaces, like nectar or insects in bark"
    },
    {
      "id": "3.13A-7",
      "type": "multi_select",
      "title": "Which of these are examples of an external structure helping an animal survive in its environment?",
      "prompt": "Select all that apply.",
      "choices": [
        "A giraffe's long neck, for reaching high leaves",
        "A duck's webbed feet, for swimming",
        "A polar bear's thick fur, for staying warm",
        "A rock sitting on the ground",
        "A cloud in the sky"
      ],
      "correct": [
        "A giraffe's long neck, for reaching high leaves",
        "A duck's webbed feet, for swimming",
        "A polar bear's thick fur, for staying warm"
      ]
    },
    {
      "id": "3.13A-8",
      "type": "multi_select",
      "title": "Which of these structures help animals survive in cold environments?",
      "prompt": "Select all that apply.",
      "choices": [
        "Thick fur",
        "Feathers",
        "A layer of blubber (fat)",
        "Webbed feet, for swimming",
        "A long neck, for reaching leaves"
      ],
      "correct": [
        "Thick fur",
        "Feathers",
        "A layer of blubber (fat)"
      ]
    },
    {
      "id": "3.13A-9",
      "type": "multi_select",
      "title": "Which of these structures help an animal move through its environment?",
      "prompt": "Select all that apply.",
      "choices": [
        "A duck's webbed feet, for swimming",
        "A bird's wings, for flying",
        "A rabbit's strong legs, for hopping quickly",
        "A giraffe's neck, for reaching food",
        "A polar bear's fur, for warmth"
      ],
      "correct": [
        "A duck's webbed feet, for swimming",
        "A bird's wings, for flying",
        "A rabbit's strong legs, for hopping quickly"
      ]
    },
    {
      "id": "3.13A-10",
      "type": "multi_select",
      "title": "Which of these structures help an animal find or reach food?",
      "prompt": "Select all that apply.",
      "choices": [
        "A giraffe's long neck, for reaching high leaves",
        "A bird's long, thin beak, for reaching food in tight spaces",
        "A polar bear's fur, for warmth",
        "A rabbit's long ears, for hearing",
        "A duck's webbed feet, for swimming"
      ],
      "correct": [
        "A giraffe's long neck, for reaching high leaves",
        "A bird's long, thin beak, for reaching food in tight spaces"
      ]
    },
    {
      "id": "3.13A-11",
      "type": "multi_select",
      "title": "Which of these are true about how external structures help animals survive?",
      "prompt": "Select all that apply.",
      "choices": [
        "A structure can help an animal find food",
        "A structure can help an animal move through its environment",
        "A structure can help an animal stay safe from danger or harsh weather",
        "External structures never relate to survival",
        "Every animal has the exact same structures"
      ],
      "correct": [
        "A structure can help an animal find food",
        "A structure can help an animal move through its environment",
        "A structure can help an animal stay safe from danger or harsh weather"
      ]
    },
    {
      "id": "3.13A-12",
      "type": "multi_select",
      "title": "A student is matching animal structures to how they help the animal survive. Which of these matches are correct?",
      "prompt": "Select all that apply.",
      "choices": [
        "Webbed feet → helps a duck swim",
        "A long neck → helps a giraffe reach high leaves",
        "Thick fur and blubber → helps an Arctic animal stay warm",
        "A long neck → helps an animal swim faster",
        "Webbed feet → helps an animal stay warm in the cold"
      ],
      "correct": [
        "Webbed feet → helps a duck swim",
        "A long neck → helps a giraffe reach high leaves",
        "Thick fur and blubber → helps an Arctic animal stay warm"
      ]
    },
    {
      "id": "3.13A-13",
      "type": "true_false",
      "title": "A giraffe's long neck helps it reach leaves high up in trees that other animals cannot reach.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13A-14",
      "type": "true_false",
      "title": "A duck's webbed feet make it harder for the duck to swim.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "a duck's webbed feet actually help it swim more easily through water."
    },
    {
      "id": "3.13A-15",
      "type": "true_false",
      "title": "Thick fur and a layer of blubber can help an animal survive in a very cold environment.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13A-16",
      "type": "true_false",
      "title": "External structures on animals, like a long neck or webbed feet, are random and don't relate to how the animal survives in its environment.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "external structures usually help an animal do something important, like find food, move, or stay safe."
    },
    {
      "id": "3.13A-17",
      "type": "true_false",
      "title": "A rabbit's long ears can help it hear predators approaching.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13A-18",
      "type": "true_false",
      "title": "All animals have the exact same external structures, no matter where they live.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "different animals have different structures suited to their own environments."
    },
    {
      "id": "3.13A-19",
      "type": "true_false",
      "title": "A bird's beak shape can be suited to the kind of food it eats.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13A-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A giraffe's long neck helps it ",
        ", which helps it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "reach leaves high up in trees",
            "swim faster through water"
          ],
          "correct": "reach leaves high up in trees"
        },
        {
          "choices": [
            "find food other animals can't reach",
            "stay warm in cold weather"
          ],
          "correct": "find food other animals can't reach"
        }
      ]
    },
    {
      "id": "3.13A-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A duck's webbed feet, with skin connecting its toes, help it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "swim more easily through water",
            "dig burrows underground"
          ],
          "correct": "swim more easily through water"
        }
      ]
    },
    {
      "id": "3.13A-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Thick fur and a layer of blubber help Arctic animals like polar bears ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "stay warm in extremely cold temperatures",
            "swim faster in warm water"
          ],
          "correct": "stay warm in extremely cold temperatures"
        }
      ]
    },
    {
      "id": "3.13A-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A rabbit's long ears, which can turn to pick up sound from many directions, help it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "hear predators approaching",
            "reach food high in trees"
          ],
          "correct": "hear predators approaching"
        }
      ]
    },
    {
      "id": "3.13A-24",
      "type": "ordering",
      "title": "Put these steps in order for an investigation matching animal structures to how they help the animal survive:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose an animal and observe one of its external structures, like a beak, feet, or fur",
        "Predict what job that structure might do for the animal",
        "Research or observe how the animal actually uses that structure",
        "Record how the structure helps the animal survive in its environment"
      ],
      "correct": [
        "Choose an animal and observe one of its external structures, like a beak, feet, or fur",
        "Predict what job that structure might do for the animal",
        "Research or observe how the animal actually uses that structure",
        "Record how the structure helps the animal survive in its environment"
      ]
    },
    {
      "id": "3.13A-25",
      "type": "ordering",
      "title": "A student is comparing a duck's feet to a giraffe's neck. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Observe that a duck has webbed feet and a giraffe has a long neck",
        "Predict what each structure might help the animal do",
        "Research how each structure is actually used (swimming vs. reaching leaves)",
        "Compare how each structure helps its animal survive in its own environment"
      ],
      "correct": [
        "Observe that a duck has webbed feet and a giraffe has a long neck",
        "Predict what each structure might help the animal do",
        "Research how each structure is actually used (swimming vs. reaching leaves)",
        "Compare how each structure helps its animal survive in its own environment"
      ]
    }
  ],
};
