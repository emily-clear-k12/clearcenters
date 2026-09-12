// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.11B_v1.md) into the
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
  standard: "3.11B-SD",
  title: "Signal Defense: Conserving Natural Resources",
  questions: [
    {
      "id": "3.11B-1",
      "type": "multiple_choice",
      "title": "Why is it important to conserve (protect and not waste) natural resources like water and oil?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Because they are worthless",
        "Because these resources can run out or become scarce if people use too much too quickly",
        "Because using more of them makes them multiply faster",
        "Conservation is not actually important"
      ],
      "correct": "Because these resources can run out or become scarce if people use too much too quickly"
    },
    {
      "id": "3.11B-2",
      "type": "multiple_choice",
      "title": "Which of these best explains why we should not waste water?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Water never runs out and is fine to waste",
        "Everyone needs water, so wasting it can mean there is less for other people, plants, and animals",
        "Wasting water helps clean rivers",
        "There is no reason to save water"
      ],
      "correct": "Everyone needs water, so wasting it can mean there is less for other people, plants, and animals"
    },
    {
      "id": "3.11B-3",
      "type": "multiple_choice",
      "title": "A forest is cut down faster than new trees can grow to replace it. What is a likely result?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The forest will grow back instantly",
        "There may be fewer trees and less habitat for animals over time",
        "Nothing changes at all",
        "More animals will move in immediately"
      ],
      "correct": "There may be fewer trees and less habitat for animals over time"
    },
    {
      "id": "3.11B-4",
      "type": "multiple_choice",
      "title": "Why is conserving natural resources important for future generations?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Future generations will not need any resources",
        "Careful use today helps make sure resources are still available for people in the future",
        "Resources magically refill no matter how they are used",
        "It has nothing to do with the future"
      ],
      "correct": "Careful use today helps make sure resources are still available for people in the future"
    },
    {
      "id": "3.11B-5",
      "type": "multiple_choice",
      "title": "Which of these is a reason conservation is important?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It makes natural resources disappear faster",
        "It helps protect natural resources so they last longer and support life on Earth",
        "It has no effect on plants or animals",
        "It only matters for resources people don't use"
      ],
      "correct": "It helps protect natural resources so they last longer and support life on Earth"
    },
    {
      "id": "3.11B-6",
      "type": "multiple_choice",
      "title": "What does the word \"conservation\" mean?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Wasting resources as quickly as possible",
        "Carefully protecting and preserving something, like a natural resource",
        "Making more of a resource appear instantly",
        "Ignoring natural resources completely"
      ],
      "correct": "Carefully protecting and preserving something, like a natural resource"
    },
    {
      "id": "3.11B-7",
      "type": "multi_select",
      "title": "Which of these are reasons conservation of natural resources is important?",
      "prompt": "Select all that apply.",
      "choices": [
        "Some resources can become scarce if used too quickly",
        "Conserving resources helps protect habitats for plants and animals",
        "Careful use today helps make sure resources are available in the future",
        "Resources are unlimited and can never run low",
        "Conservation makes resources disappear faster"
      ],
      "correct": [
        "Some resources can become scarce if used too quickly",
        "Conserving resources helps protect habitats for plants and animals",
        "Careful use today helps make sure resources are available in the future"
      ]
    },
    {
      "id": "3.11B-8",
      "type": "multi_select",
      "title": "Which of these are examples of natural resources that people should conserve?",
      "prompt": "Select all that apply.",
      "choices": [
        "Water",
        "Trees (wood)",
        "Oil",
        "Plastic toys",
        "Video games"
      ],
      "correct": [
        "Water",
        "Trees (wood)",
        "Oil"
      ]
    },
    {
      "id": "3.11B-9",
      "type": "multi_select",
      "title": "Which of these could happen if people do not conserve natural resources?",
      "prompt": "Select all that apply.",
      "choices": [
        "Some resources could become scarce or run low",
        "Habitats for plants and animals could be harmed",
        "Future generations could have less of a resource available",
        "Resources would multiply faster",
        "Nothing would ever change"
      ],
      "correct": [
        "Some resources could become scarce or run low",
        "Habitats for plants and animals could be harmed",
        "Future generations could have less of a resource available"
      ]
    },
    {
      "id": "3.11B-10",
      "type": "multi_select",
      "title": "Which of these show people conserving natural resources?",
      "prompt": "Select all that apply.",
      "choices": [
        "Turning off the faucet while brushing teeth to save water",
        "Planting new trees to replace ones that were cut down",
        "Carpooling to save gasoline (oil)",
        "Leaving lights and water running all day for no reason",
        "Cutting down a whole forest with no plan to replant"
      ],
      "correct": [
        "Turning off the faucet while brushing teeth to save water",
        "Planting new trees to replace ones that were cut down",
        "Carpooling to save gasoline (oil)"
      ]
    },
    {
      "id": "3.11B-11",
      "type": "multi_select",
      "title": "Which statements correctly define \"conservation\"?",
      "prompt": "Select all that apply.",
      "choices": [
        "Carefully protecting and preserving a natural resource",
        "Using a resource wisely so it lasts longer",
        "Using as much of a resource as possible, as fast as possible",
        "Ignoring where natural resources come from",
        "Making sure a resource is still available in the future"
      ],
      "correct": [
        "Carefully protecting and preserving a natural resource",
        "Using a resource wisely so it lasts longer",
        "Making sure a resource is still available in the future"
      ]
    },
    {
      "id": "3.11B-12",
      "type": "multi_select",
      "title": "Why might a community want to conserve its water supply?",
      "prompt": "Select all that apply.",
      "choices": [
        "So there is enough water for drinking, farming, and daily use",
        "Because water can become limited during a drought",
        "To make sure water is available for the future",
        "Because water is never used by anyone",
        "Because conserving water makes rivers disappear"
      ],
      "correct": [
        "So there is enough water for drinking, farming, and daily use",
        "Because water can become limited during a drought",
        "To make sure water is available for the future"
      ]
    },
    {
      "id": "3.11B-13",
      "type": "true_false",
      "title": "Conservation means carefully protecting and preserving a natural resource.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11B-14",
      "type": "true_false",
      "title": "Natural resources can never run out or become scarce, no matter how they are used.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "some natural resources can become scarce or run low if they are used too quickly or wastefully."
    },
    {
      "id": "3.11B-15",
      "type": "true_false",
      "title": "Conserving natural resources can help protect habitats for plants and animals.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11B-16",
      "type": "true_false",
      "title": "Wasting resources today has no effect on how much is available in the future.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "careful use today helps make sure resources are still available for people in the future."
    },
    {
      "id": "3.11B-17",
      "type": "true_false",
      "title": "Turning off the water while brushing your teeth is an example of conserving a natural resource.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11B-18",
      "type": "true_false",
      "title": "Conservation is only important for resources that people never use.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "conservation matters most for resources that people actually use and depend on."
    },
    {
      "id": "3.11B-19",
      "type": "true_false",
      "title": "Protecting and preserving natural resources is what conservation means.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Conservation means ",
        " a natural resource, so that it ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "carefully protecting and preserving",
            "wasting as quickly as possible"
          ],
          "correct": "carefully protecting and preserving"
        },
        {
          "choices": [
            "lasts longer",
            "runs out faster"
          ],
          "correct": "lasts longer"
        }
      ]
    },
    {
      "id": "3.11B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If people use water carelessly and waste a lot of it, the water supply could ",
        ", which is why ",
        " water matters."
      ],
      "blanks": [
        {
          "choices": [
            "become scarce for others",
            "multiply and increase"
          ],
          "correct": "become scarce for others"
        },
        {
          "choices": [
            "conserving",
            "wasting"
          ],
          "correct": "conserving"
        }
      ]
    },
    {
      "id": "3.11B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Planting new trees after cutting some down is an example of ",
        " a natural resource, because it helps make sure trees are ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "conserving",
            "wasting"
          ],
          "correct": "conserving"
        },
        {
          "choices": [
            "available in the future",
            "gone forever"
          ],
          "correct": "available in the future"
        }
      ]
    },
    {
      "id": "3.11B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Conservation is important because it helps protect natural resources for ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "the future and for other living things",
            "no one at all"
          ],
          "correct": "the future and for other living things"
        }
      ]
    },
    {
      "id": "3.11B-24",
      "type": "ordering",
      "title": "Put these steps in order to explain why conserving a forest's trees matters:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "People cut down trees for wood and paper",
        "If too many trees are cut without replanting, the forest shrinks",
        "Animals that live in the forest lose their habitat",
        "Conserving trees (using fewer, replanting more) helps protect the forest and its animals"
      ],
      "correct": [
        "People cut down trees for wood and paper",
        "If too many trees are cut without replanting, the forest shrinks",
        "Animals that live in the forest lose their habitat",
        "Conserving trees (using fewer, replanting more) helps protect the forest and its animals"
      ]
    },
    {
      "id": "3.11B-25",
      "type": "ordering",
      "title": "A class is designing a plan to conserve water at school. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Identify ways water is being wasted at school (like a dripping faucet)",
        "Decide on changes that would use less water",
        "Put the changes into practice (like fixing leaks or turning off taps)",
        "Check back later to see if less water is being used"
      ],
      "correct": [
        "Identify ways water is being wasted at school (like a dripping faucet)",
        "Decide on changes that would use less water",
        "Put the changes into practice (like fixing leaks or turning off taps)",
        "Check back later to see if less water is being used"
      ]
    }
  ],
};
