// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.13B_v1.md) into the
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
  standard: "3.13B-SD",
  title: "Signal Defense: Life Cycles",
  questions: [
    {
      "id": "3.13B-1",
      "type": "multiple_choice",
      "title": "Which of these correctly lists the four stages of COMPLETE metamorphosis, like a beetle or butterfly goes through?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Egg, nymph, adult, seed",
        "Egg, larva, pupa, adult",
        "Seed, seedling, flower, fruit",
        "Nymph, larva, egg, pupa"
      ],
      "correct": "Egg, larva, pupa, adult"
    },
    {
      "id": "3.13B-2",
      "type": "multiple_choice",
      "title": "A cricket hatches from an egg looking like a tiny version of an adult cricket, then grows bigger through several stages until it becomes a full adult, without ever forming a pupa or cocoon. This is an example of which kind of life cycle?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Complete metamorphosis",
        "Incomplete metamorphosis",
        "A plant life cycle",
        "No life cycle at all"
      ],
      "correct": "Incomplete metamorphosis"
    },
    {
      "id": "3.13B-3",
      "type": "multiple_choice",
      "title": "A lima bean seed is planted. It grows into a seedling, then a mature plant, which eventually produces flowers and new seeds. What is this an example of?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Complete metamorphosis",
        "Incomplete metamorphosis",
        "A plant's life cycle",
        "Hibernation"
      ],
      "correct": "A plant's life cycle"
    },
    {
      "id": "3.13B-4",
      "type": "multiple_choice",
      "title": "What is the main difference between complete and incomplete metamorphosis?",
      "prompt": "Choose the best answer.",
      "choices": [
        "There is no difference at all",
        "Complete metamorphosis includes a pupa stage, while incomplete metamorphosis does not",
        "Incomplete metamorphosis always takes longer",
        "Complete metamorphosis only happens to plants"
      ],
      "correct": "Complete metamorphosis includes a pupa stage, while incomplete metamorphosis does not"
    },
    {
      "id": "3.13B-5",
      "type": "multiple_choice",
      "title": "During the pupa stage of complete metamorphosis, what is generally happening?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The organism is laying eggs",
        "The organism's body is changing dramatically before becoming an adult",
        "The organism is planting seeds",
        "Nothing happens during this stage"
      ],
      "correct": "The organism's body is changing dramatically before becoming an adult"
    },
    {
      "id": "3.13B-6",
      "type": "multiple_choice",
      "title": "Which of these organisms goes through incomplete metamorphosis, hatching as a nymph that looks like a small version of the adult?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A monarch butterfly",
        "A ladybug beetle",
        "A cricket",
        "A lima bean plant"
      ],
      "correct": "A cricket"
    },
    {
      "id": "3.13B-7",
      "type": "multi_select",
      "title": "Which of these organisms go through COMPLETE metamorphosis (egg, larva, pupa, adult)?",
      "prompt": "Select all that apply.",
      "choices": [
        "A ladybug beetle",
        "A darkling beetle",
        "A monarch butterfly",
        "A cricket",
        "A lima bean plant"
      ],
      "correct": [
        "A ladybug beetle",
        "A darkling beetle",
        "A monarch butterfly"
      ]
    },
    {
      "id": "3.13B-8",
      "type": "multi_select",
      "title": "Which of these organisms go through INCOMPLETE metamorphosis (egg, nymph, adult, with no pupa stage)?",
      "prompt": "Select all that apply.",
      "choices": [
        "A cricket",
        "A roach",
        "A ladybug beetle",
        "A monarch butterfly",
        "A radish plant"
      ],
      "correct": [
        "A cricket",
        "A roach"
      ]
    },
    {
      "id": "3.13B-9",
      "type": "multi_select",
      "title": "Which of these are stages of a plant's life cycle, like a lima bean or radish?",
      "prompt": "Select all that apply.",
      "choices": [
        "Seed",
        "Seedling",
        "Mature plant that produces flowers and new seeds",
        "Pupa",
        "Nymph"
      ],
      "correct": [
        "Seed",
        "Seedling",
        "Mature plant that produces flowers and new seeds"
      ]
    },
    {
      "id": "3.13B-10",
      "type": "multi_select",
      "title": "Which of these are true about life cycles?",
      "prompt": "Select all that apply.",
      "choices": [
        "All living things go through some kind of life cycle, from being born or hatched to growing and reproducing",
        "Not all insects go through the exact same kind of metamorphosis",
        "Plants have their own kind of life cycle, different from an insect's",
        "Every organism's life cycle looks exactly the same",
        "Only insects have a life cycle"
      ],
      "correct": [
        "All living things go through some kind of life cycle, from being born or hatched to growing and reproducing",
        "Not all insects go through the exact same kind of metamorphosis",
        "Plants have their own kind of life cycle, different from an insect's"
      ]
    },
    {
      "id": "3.13B-11",
      "type": "multi_select",
      "title": "Which of these are stages found in COMPLETE metamorphosis?",
      "prompt": "Select all that apply.",
      "choices": [
        "Egg",
        "Larva",
        "Pupa",
        "Adult",
        "Seedling",
        "Nymph"
      ],
      "correct": [
        "Egg",
        "Larva",
        "Pupa",
        "Adult"
      ]
    },
    {
      "id": "3.13B-12",
      "type": "multi_select",
      "title": "Which of these are stages found in INCOMPLETE metamorphosis?",
      "prompt": "Select all that apply.",
      "choices": [
        "Egg",
        "Nymph",
        "Adult",
        "Larva",
        "Pupa"
      ],
      "correct": [
        "Egg",
        "Nymph",
        "Adult"
      ]
    },
    {
      "id": "3.13B-13",
      "type": "true_false",
      "title": "Complete metamorphosis includes four stages: egg, larva, pupa, and adult.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13B-14",
      "type": "true_false",
      "title": "Incomplete metamorphosis includes a pupa stage, just like complete metamorphosis.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "incomplete metamorphosis has no pupa stage; it goes from egg to nymph to adult."
    },
    {
      "id": "3.13B-15",
      "type": "true_false",
      "title": "A cricket nymph looks like a small version of the adult cricket, just without wings yet.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13B-16",
      "type": "true_false",
      "title": "All insects go through the exact same kind of metamorphosis.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "some insects, like beetles and butterflies, go through complete metamorphosis, while others, like crickets, go through incomplete metamorphosis."
    },
    {
      "id": "3.13B-17",
      "type": "true_false",
      "title": "A lima bean plant's life cycle includes stages like seed, seedling, and mature plant.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13B-18",
      "type": "true_false",
      "title": "Plants and insects both go through life cycles, even though the stages look different.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13B-19",
      "type": "true_false",
      "title": "A pupa is a stage where an organism's body changes dramatically before becoming an adult.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.13B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A monarch butterfly goes through ",
        " metamorphosis, which includes a ",
        " stage before becoming an adult."
      ],
      "blanks": [
        {
          "choices": [
            "complete",
            "incomplete"
          ],
          "correct": "complete"
        },
        {
          "choices": [
            "pupa (chrysalis)",
            "nymph"
          ],
          "correct": "pupa (chrysalis)"
        }
      ]
    },
    {
      "id": "3.13B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A cricket goes through ",
        " metamorphosis, hatching as a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "incomplete",
            "complete"
          ],
          "correct": "incomplete"
        },
        {
          "choices": [
            "nymph that looks like a small adult",
            "larva that looks nothing like the adult"
          ],
          "correct": "nymph that looks like a small adult"
        }
      ]
    },
    {
      "id": "3.13B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A radish seed grows into a ",
        ", eventually producing ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "seedling, then a mature plant",
            "larva, then a pupa"
          ],
          "correct": "seedling, then a mature plant"
        },
        {
          "choices": [
            "flowers and new seeds",
            "a cocoon"
          ],
          "correct": "flowers and new seeds"
        }
      ]
    },
    {
      "id": "3.13B-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The main difference between complete and incomplete metamorphosis is that complete metamorphosis includes a ",
        ", which ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "pupa stage",
            "seed stage"
          ],
          "correct": "pupa stage"
        },
        {
          "choices": [
            "incomplete metamorphosis does not have",
            "both types have"
          ],
          "correct": "incomplete metamorphosis does not have"
        }
      ]
    },
    {
      "id": "3.13B-24",
      "type": "ordering",
      "title": "Put these stages of COMPLETE metamorphosis (like a beetle) in order:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Egg",
        "Larva",
        "Pupa",
        "Adult"
      ],
      "correct": [
        "Egg",
        "Larva",
        "Pupa",
        "Adult"
      ]
    },
    {
      "id": "3.13B-25",
      "type": "ordering",
      "title": "Put these stages of INCOMPLETE metamorphosis (like a cricket) in order:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Egg",
        "Nymph",
        "Adult"
      ],
      "correct": [
        "Egg",
        "Nymph",
        "Adult"
      ]
    },
    {
      "id": "3.13B-26",
      "type": "ordering",
      "title": "Put these stages of a lima bean plant's life cycle in order:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Seed",
        "Seedling",
        "Mature plant",
        "Flowers and new seeds produced"
      ],
      "correct": [
        "Seed",
        "Seedling",
        "Mature plant",
        "Flowers and new seeds produced"
      ]
    }
  ],
};
