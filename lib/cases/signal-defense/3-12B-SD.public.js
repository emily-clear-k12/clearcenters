// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.12B_v1.md) into the
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
  standard: "3.12B-SD",
  title: "Signal Defense: Food Chains & Energy Flow",
  questions: [
    {
      "id": "3.12B-1",
      "type": "multiple_choice",
      "title": "In a food chain, where does the energy usually start?",
      "prompt": "Choose the best answer.",
      "choices": [
        "With the top predator",
        "With the Sun, used by plants to make food",
        "With decomposers only",
        "Energy doesn't come from anywhere"
      ],
      "correct": "With the Sun, used by plants to make food"
    },
    {
      "id": "3.12B-2",
      "type": "multiple_choice",
      "title": "In a simple food chain (grass → grasshopper → frog → snake), which direction does energy flow?",
      "prompt": "Choose the best answer.",
      "choices": [
        "From the snake back to the grass",
        "From the grass to the grasshopper to the frog to the snake",
        "Energy does not flow in a food chain",
        "From the frog to the grass only"
      ],
      "correct": "From the grass to the grasshopper to the frog to the snake"
    },
    {
      "id": "3.12B-3",
      "type": "multiple_choice",
      "title": "If all the bees disappeared from a field, which of these is the MOST accurate prediction?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Nothing in the field would be affected at all",
        "Only the very next organism in line would be affected, and nothing else",
        "Many parts of the ecosystem could be affected, since bees pollinate plants that other organisms depend on",
        "The field would immediately have more bees than before"
      ],
      "correct": "Many parts of the ecosystem could be affected, since bees pollinate plants that other organisms depend on"
    },
    {
      "id": "3.12B-4",
      "type": "multiple_choice",
      "title": "If frogs were removed from a pond, what is a likely ripple effect on the ecosystem?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Nothing would change anywhere in the pond",
        "Insects the frogs used to eat might increase, while animals that used to eat the frogs might have less food",
        "The pond would dry up immediately",
        "All the plants in the pond would disappear at once"
      ],
      "correct": "Insects the frogs used to eat might increase, while animals that used to eat the frogs might have less food"
    },
    {
      "id": "3.12B-5",
      "type": "multiple_choice",
      "title": "Which of these is a common mistake students make when thinking about food chains?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Believing energy flows from the Sun to plants",
        "Believing that removing one organism only affects the very next organism in the chain, and nothing else",
        "Believing predators eat prey",
        "Believing plants make their own food"
      ],
      "correct": "Believing that removing one organism only affects the very next organism in the chain, and nothing else"
    },
    {
      "id": "3.12B-6",
      "type": "multiple_choice",
      "title": "In a food chain, plants are usually called producers because they:",
      "prompt": "Choose the best answer.",
      "choices": [
        "Eat other organisms for energy",
        "Make their own food using energy from the Sun",
        "Never provide energy to anything else",
        "Only exist in ponds"
      ],
      "correct": "Make their own food using energy from the Sun"
    },
    {
      "id": "3.12B-7",
      "type": "multi_select",
      "title": "Which of these describe how energy flows through a food chain?",
      "prompt": "Select all that apply.",
      "choices": [
        "Energy usually starts with the Sun",
        "Plants (producers) use sunlight to make their own food",
        "Energy passes from producers to the animals that eat them, and onward",
        "Energy flows backward from predators to plants",
        "Energy never moves between organisms"
      ],
      "correct": [
        "Energy usually starts with the Sun",
        "Plants (producers) use sunlight to make their own food",
        "Energy passes from producers to the animals that eat them, and onward"
      ]
    },
    {
      "id": "3.12B-8",
      "type": "multi_select",
      "title": "If bees were removed from a field, which of these could realistically happen?",
      "prompt": "Select all that apply.",
      "choices": [
        "Fewer plants could be pollinated",
        "Plants that depend on bees could produce less fruit or fewer seeds",
        "Animals that eat those plants or their fruit could be affected too",
        "Absolutely nothing in the field would change",
        "The field would immediately grow more bees"
      ],
      "correct": [
        "Fewer plants could be pollinated",
        "Plants that depend on bees could produce less fruit or fewer seeds",
        "Animals that eat those plants or their fruit could be affected too"
      ]
    },
    {
      "id": "3.12B-9",
      "type": "multi_select",
      "title": "If frogs were removed from a pond, which of these could realistically happen?",
      "prompt": "Select all that apply.",
      "choices": [
        "Insects the frogs used to eat could increase in number",
        "Animals that used to eat the frogs could lose a food source",
        "The whole pond ecosystem could shift, not just the frogs' immediate neighbors in the food chain",
        "Nothing in the pond would be affected at all",
        "Only the very next organism in the chain would ever be affected"
      ],
      "correct": [
        "Insects the frogs used to eat could increase in number",
        "Animals that used to eat the frogs could lose a food source",
        "The whole pond ecosystem could shift, not just the frogs' immediate neighbors in the food chain"
      ]
    },
    {
      "id": "3.12B-10",
      "type": "multi_select",
      "title": "Which of these are true about food chains?",
      "prompt": "Select all that apply.",
      "choices": [
        "A food chain shows how energy moves from one living thing to another",
        "Removing one organism from a food chain can affect many other organisms, not just the next one in line",
        "Producers like plants are usually the starting point of a food chain's energy",
        "Every organism in a food chain always stays completely unaffected by the others",
        "Food chains have no connection to an ecosystem's balance"
      ],
      "correct": [
        "A food chain shows how energy moves from one living thing to another",
        "Removing one organism from a food chain can affect many other organisms, not just the next one in line",
        "Producers like plants are usually the starting point of a food chain's energy"
      ]
    },
    {
      "id": "3.12B-11",
      "type": "multi_select",
      "title": "Which of these are examples of producers, the organisms that start the flow of energy in most food chains?",
      "prompt": "Select all that apply.",
      "choices": [
        "Grass",
        "A pond plant",
        "A flower in a field",
        "A frog",
        "A snake"
      ],
      "correct": [
        "Grass",
        "A pond plant",
        "A flower in a field"
      ]
    },
    {
      "id": "3.12B-12",
      "type": "multi_select",
      "title": "A student is predicting what would happen if an organism were removed from a food chain. Which of these show good reasoning?",
      "prompt": "Select all that apply.",
      "choices": [
        "Thinking about which organisms ate the removed organism, and which the removed organism ate",
        "Considering effects beyond just the very next organism in the chain",
        "Tracing the chain back to the producers (plants) at the start",
        "Assuming nothing at all would change",
        "Assuming only the removed organism's exact replacement matters"
      ],
      "correct": [
        "Thinking about which organisms ate the removed organism, and which the removed organism ate",
        "Considering effects beyond just the very next organism in the chain",
        "Tracing the chain back to the producers (plants) at the start"
      ]
    },
    {
      "id": "3.12B-13",
      "type": "true_false",
      "title": "In most food chains, energy starts with the Sun and is used by plants (producers) to make food.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12B-14",
      "type": "true_false",
      "title": "Removing one organism from a food chain usually only affects the very next organism, and nothing else in the ecosystem.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "removing one organism can create ripple effects that reach well beyond just the next organism in the chain."
    },
    {
      "id": "3.12B-15",
      "type": "true_false",
      "title": "If bees were removed from a field, only the bees themselves would be affected.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "bees pollinate plants, so removing them could affect those plants and the animals that depend on them too."
    },
    {
      "id": "3.12B-16",
      "type": "true_false",
      "title": "Energy in a food chain generally flows from producers (like plants) to the animals that eat them, and onward to other animals.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12B-17",
      "type": "true_false",
      "title": "If frogs disappeared from a pond, it's possible that the insects frogs used to eat could increase in number.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12B-18",
      "type": "true_false",
      "title": "Producers, like plants, are usually the starting point of a food chain's energy.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12B-19",
      "type": "true_false",
      "title": "Ecosystems are made up of many connected organisms, so a change to one part can affect other parts too.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "In a food chain, energy usually begins with the ",
        ", and then flows ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "Sun, used by plants to make food",
            "snake, used by frogs to make food"
          ],
          "correct": "Sun, used by plants to make food"
        },
        {
          "choices": [
            "toward the animals that eat the plants, and onward",
            "backward toward the Sun"
          ],
          "correct": "toward the animals that eat the plants, and onward"
        }
      ]
    },
    {
      "id": "3.12B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If bees were removed from a field, the effects would likely reach ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "beyond just the bees themselves, since they pollinate plants many organisms depend on",
            "only the bees, with nothing else affected"
          ],
          "correct": "beyond just the bees themselves, since they pollinate plants many organisms depend on"
        }
      ]
    },
    {
      "id": "3.12B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "If frogs were removed from a pond, insects the frogs used to eat might ",
        ", while animals that ate the frogs might ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "increase in number",
            "disappear completely"
          ],
          "correct": "increase in number"
        },
        {
          "choices": [
            "have less food",
            "have more food"
          ],
          "correct": "have less food"
        }
      ]
    },
    {
      "id": "3.12B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A student who thinks removing one animal from a food chain \"only affects the next animal in line\" is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "missing the ripple effects that can reach the rest of the ecosystem",
            "correctly understanding how food chains work"
          ],
          "correct": "missing the ripple effects that can reach the rest of the ecosystem"
        }
      ]
    },
    {
      "id": "3.12B-24",
      "type": "ordering",
      "title": "Put these steps in order to trace the flow of energy through a food chain (grass → grasshopper → frog → snake):",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "The Sun provides energy that grass uses to make its own food",
        "A grasshopper eats the grass, gaining energy from it",
        "A frog eats the grasshopper, gaining energy from it",
        "A snake eats the frog, gaining energy from it"
      ],
      "correct": [
        "The Sun provides energy that grass uses to make its own food",
        "A grasshopper eats the grass, gaining energy from it",
        "A frog eats the grasshopper, gaining energy from it",
        "A snake eats the frog, gaining energy from it"
      ]
    },
    {
      "id": "3.12B-25",
      "type": "ordering",
      "title": "A class is predicting what would happen if bees were removed from a field's ecosystem. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Identify which plants in the field depend on bees for pollination",
        "Predict how those plants would be affected if bees disappeared",
        "Predict how animals that eat those plants (or their fruit/seeds) would be affected",
        "Record the possible ripple effects across the whole ecosystem, not just for the bees"
      ],
      "correct": [
        "Identify which plants in the field depend on bees for pollination",
        "Predict how those plants would be affected if bees disappeared",
        "Predict how animals that eat those plants (or their fruit/seeds) would be affected",
        "Record the possible ripple effects across the whole ecosystem, not just for the bees"
      ]
    }
  ],
};
