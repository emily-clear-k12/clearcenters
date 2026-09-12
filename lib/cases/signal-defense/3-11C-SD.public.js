// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.11C_v1.md) into the
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
  standard: "3.11C-SD",
  title: "Signal Defense: Reduce, Reuse, Recycle",
  questions: [
    {
      "id": "3.11C-1",
      "type": "multiple_choice",
      "title": "Using a refillable water bottle every day instead of buying a new disposable bottle each time is mainly an example of which R?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Recycle",
        "Reduce",
        "None of the Rs",
        "Pollution"
      ],
      "correct": "Reduce"
    },
    {
      "id": "3.11C-2",
      "type": "multiple_choice",
      "title": "Turning an empty glass jar into a pencil holder instead of throwing it away is an example of which R?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Recycle",
        "Reuse",
        "Reduce",
        "None of these"
      ],
      "correct": "Reuse"
    },
    {
      "id": "3.11C-3",
      "type": "multiple_choice",
      "title": "Putting an empty aluminum can into the recycling bin so it can be processed into a new product is an example of which R?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Reduce",
        "Reuse",
        "Recycle",
        "None of these"
      ],
      "correct": "Recycle"
    },
    {
      "id": "3.11C-4",
      "type": "multiple_choice",
      "title": "According to the \"reduce, reuse, recycle\" order, which action generally has the BIGGEST positive effect on conserving resources?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Recycling",
        "Reducing how much you use in the first place",
        "Reusing an item",
        "They all have the exact same effect"
      ],
      "correct": "Reducing how much you use in the first place"
    },
    {
      "id": "3.11C-5",
      "type": "multiple_choice",
      "title": "Why does recycling rank behind reducing and reusing in how much it helps conserve resources?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Recycling doesn't help at all",
        "Recycling still uses energy and resources to process old materials into new ones",
        "Recycling creates brand new resources out of nothing",
        "Recycling is actually the most helpful of the three"
      ],
      "correct": "Recycling still uses energy and resources to process old materials into new ones"
    },
    {
      "id": "3.11C-6",
      "type": "multiple_choice",
      "title": "Donating old clothes that still fit someone else instead of throwing them away is an example of which R?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Recycle",
        "Reuse",
        "Reduce",
        "None of these"
      ],
      "correct": "Reuse"
    },
    {
      "id": "3.11C-7",
      "type": "multi_select",
      "title": "Which of these are examples of REDUCING?",
      "prompt": "Select all that apply.",
      "choices": [
        "Turning off lights when leaving a room to use less electricity",
        "Printing on both sides of a paper to use less paper",
        "Buying only the food you will actually eat",
        "Putting a plastic bottle in the recycling bin",
        "Turning an old shirt into a cleaning rag"
      ],
      "correct": [
        "Turning off lights when leaving a room to use less electricity",
        "Printing on both sides of a paper to use less paper",
        "Buying only the food you will actually eat"
      ]
    },
    {
      "id": "3.11C-8",
      "type": "multi_select",
      "title": "Which of these are examples of REUSING?",
      "prompt": "Select all that apply.",
      "choices": [
        "Turning an old jar into a pencil holder",
        "Using a cloth shopping bag again and again",
        "Turning an old t-shirt into a cleaning rag",
        "Buying only what you need",
        "Putting a can in the recycling bin"
      ],
      "correct": [
        "Turning an old jar into a pencil holder",
        "Using a cloth shopping bag again and again",
        "Turning an old t-shirt into a cleaning rag"
      ]
    },
    {
      "id": "3.11C-9",
      "type": "multi_select",
      "title": "Which of these are examples of RECYCLING?",
      "prompt": "Select all that apply.",
      "choices": [
        "Putting a plastic bottle in the recycling bin",
        "Putting an aluminum can in the recycling bin",
        "Putting cardboard in the recycling bin",
        "Buying only what you need",
        "Donating old toys to someone else"
      ],
      "correct": [
        "Putting a plastic bottle in the recycling bin",
        "Putting an aluminum can in the recycling bin",
        "Putting cardboard in the recycling bin"
      ]
    },
    {
      "id": "3.11C-10",
      "type": "multi_select",
      "title": "Which of these are all ways to conserve natural resources?",
      "prompt": "Select all that apply.",
      "choices": [
        "Reducing how much you use",
        "Reusing items instead of throwing them away",
        "Recycling materials so they can be made into something new",
        "Wasting as much as possible",
        "Throwing everything away without a second thought"
      ],
      "correct": [
        "Reducing how much you use",
        "Reusing items instead of throwing them away",
        "Recycling materials so they can be made into something new"
      ]
    },
    {
      "id": "3.11C-11",
      "type": "multi_select",
      "title": "Which of these show reusing an item in a new way?",
      "prompt": "Select all that apply.",
      "choices": [
        "Turning an empty jar into a pencil holder",
        "Turning an old t-shirt into a rag",
        "Using an old box as a storage container",
        "Melting plastic down to make a new bottle",
        "Buying less plastic in the first place"
      ],
      "correct": [
        "Turning an empty jar into a pencil holder",
        "Turning an old t-shirt into a rag",
        "Using an old box as a storage container"
      ]
    },
    {
      "id": "3.11C-12",
      "type": "multi_select",
      "title": "Which of these statements about reduce, reuse, and recycle are true?",
      "prompt": "Select all that apply.",
      "choices": [
        "Reducing means using less in the first place",
        "Reusing means using something again, often in a new way",
        "Recycling means processing old materials to make new products",
        "Recycling has the biggest effect on conserving resources, more than reducing",
        "Reduce, reuse, and recycle all mean the exact same thing"
      ],
      "correct": [
        "Reducing means using less in the first place",
        "Reusing means using something again, often in a new way",
        "Recycling means processing old materials to make new products"
      ]
    },
    {
      "id": "3.11C-13",
      "type": "true_false",
      "title": "Reducing means using less of something in the first place.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11C-14",
      "type": "true_false",
      "title": "Reusing means throwing something away and never using it again.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "reusing means using something again, often in a new way, instead of throwing it away."
    },
    {
      "id": "3.11C-15",
      "type": "true_false",
      "title": "Recycling means processing old materials so they can be made into new products.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11C-16",
      "type": "true_false",
      "title": "Of the three Rs, recycling generally has the biggest effect on conserving resources.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "reducing generally has the biggest effect, since it means using less in the first place; recycling still takes energy and resources to process materials."
    },
    {
      "id": "3.11C-17",
      "type": "true_false",
      "title": "Turning off lights when you leave a room is an example of reducing energy use.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11C-18",
      "type": "true_false",
      "title": "Donating old toys instead of throwing them away is an example of reusing.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.11C-19",
      "type": "true_false",
      "title": "Putting a glass bottle in the recycling bin is an example of reducing.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "putting a bottle in the recycling bin is an example of recycling, not reducing."
    },
    {
      "id": "3.11C-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Buying only the food you will actually eat, instead of buying more than you need, is an example of ",
        ", because it means using ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "reducing",
            "recycling"
          ],
          "correct": "reducing"
        },
        {
          "choices": [
            "less in the first place",
            "old materials again"
          ],
          "correct": "less in the first place"
        }
      ]
    },
    {
      "id": "3.11C-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Using an old cardboard box as a storage container instead of throwing it away is an example of ",
        ", because you are ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "reusing",
            "recycling"
          ],
          "correct": "reusing"
        },
        {
          "choices": [
            "using the same item again",
            "breaking it down into new material"
          ],
          "correct": "using the same item again"
        }
      ]
    },
    {
      "id": "3.11C-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Putting a plastic bottle in a recycling bin so it can be turned into a new product is an example of ",
        ", because the old material is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "recycling",
            "reducing"
          ],
          "correct": "recycling"
        },
        {
          "choices": [
            "processed into something new",
            "used the exact same way again"
          ],
          "correct": "processed into something new"
        }
      ]
    },
    {
      "id": "3.11C-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Of the three Rs, ",
        " generally helps conserve resources the most, because it means never using the extra resource ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "reducing",
            "recycling"
          ],
          "correct": "reducing"
        },
        {
          "choices": [
            "in the first place",
            "after it's already been made"
          ],
          "correct": "in the first place"
        }
      ]
    },
    {
      "id": "3.11C-24",
      "type": "ordering",
      "title": "Put these three Rs in order from the one that generally helps conserve resources the MOST to the one that helps the LEAST:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Reduce",
        "Reuse",
        "Recycle"
      ],
      "correct": [
        "Reduce",
        "Reuse",
        "Recycle"
      ]
    },
    {
      "id": "3.11C-25",
      "type": "ordering",
      "title": "A student is deciding what to do with an empty plastic water bottle. Order these choices from the BEST way to conserve resources to the LEAST best way:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Avoid buying disposable bottles in the first place by using a refillable one (reduce)",
        "Reuse the bottle for something else, like a plant pot (reuse)",
        "Recycle the bottle so it can be made into a new product (recycle)",
        "Throw the bottle in the trash where it goes to a landfill (none of the three Rs)"
      ],
      "correct": [
        "Avoid buying disposable bottles in the first place by using a refillable one (reduce)",
        "Reuse the bottle for something else, like a plant pot (reuse)",
        "Recycle the bottle so it can be made into a new product (recycle)",
        "Throw the bottle in the trash where it goes to a landfill (none of the three Rs)"
      ]
    }
  ],
};
