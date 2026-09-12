// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.12D_v1.md) into the
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
  standard: "3.12D-SD",
  title: "Signal Defense: Fossils as Evidence",
  questions: [
    {
      "id": "3.12D-1",
      "type": "multiple_choice",
      "title": "What are fossils?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Living organisms found today",
        "The preserved remains or traces of organisms that lived long ago",
        "Rocks that have never been part of a living thing",
        "A type of weather pattern"
      ],
      "correct": "The preserved remains or traces of organisms that lived long ago"
    },
    {
      "id": "3.12D-2",
      "type": "multiple_choice",
      "title": "What can fossils tell scientists about the past?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Nothing at all about the past",
        "What kinds of organisms lived long ago and what their environment may have been like",
        "Only what today's weather will be",
        "How fast a modern animal can run"
      ],
      "correct": "What kinds of organisms lived long ago and what their environment may have been like"
    },
    {
      "id": "3.12D-3",
      "type": "multiple_choice",
      "title": "Central Texas has many fossilized seashells and ammonites (spiral-shelled sea creatures) found in its limestone rock. What does this tell scientists about that area long ago?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The area has always been a desert",
        "The area was likely covered by a shallow sea at some point in the past",
        "The area was always covered in ice",
        "Nothing can be learned from these fossils"
      ],
      "correct": "The area was likely covered by a shallow sea at some point in the past"
    },
    {
      "id": "3.12D-4",
      "type": "multiple_choice",
      "title": "The Waco Mammoth National Monument in Texas contains fossilized bones of mammoths, animals that lived during the Ice Age. What do these fossils show?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Mammoths still live in Texas today",
        "Mammoths, now extinct, once lived in what is now Texas",
        "Mammoths were never real animals",
        "Mammoths are the same as elephants living today"
      ],
      "correct": "Mammoths, now extinct, once lived in what is now Texas"
    },
    {
      "id": "3.12D-5",
      "type": "multiple_choice",
      "title": "Which of these is a common type of fossil found in Texas?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A plastic toy",
        "An ammonite (an ancient sea creature with a spiral shell)",
        "A modern car",
        "A weather report"
      ],
      "correct": "An ammonite (an ancient sea creature with a spiral shell)"
    },
    {
      "id": "3.12D-6",
      "type": "multiple_choice",
      "title": "How do scientists compare fossils to modern organisms?",
      "prompt": "Choose the best answer.",
      "choices": [
        "They never compare them at all",
        "They look at similarities and differences to learn how organisms have changed over time",
        "They assume every fossil looks exactly like a living animal today",
        "They only study fossils, never living organisms"
      ],
      "correct": "They look at similarities and differences to learn how organisms have changed over time"
    },
    {
      "id": "3.12D-7",
      "type": "multi_select",
      "title": "Which of these are true about fossils?",
      "prompt": "Select all that apply.",
      "choices": [
        "Fossils are the preserved remains or traces of organisms that lived long ago",
        "Fossils can be evidence of what an environment was like in the past",
        "Scientists compare fossils to modern organisms to learn about changes over time",
        "Fossils are always living organisms found today",
        "Fossils can't tell us anything about the past"
      ],
      "correct": [
        "Fossils are the preserved remains or traces of organisms that lived long ago",
        "Fossils can be evidence of what an environment was like in the past",
        "Scientists compare fossils to modern organisms to learn about changes over time"
      ]
    },
    {
      "id": "3.12D-8",
      "type": "multi_select",
      "title": "Which of these are examples of fossils that might be found in Texas?",
      "prompt": "Select all that apply.",
      "choices": [
        "An ammonite shell found in limestone rock",
        "A fossilized oyster shell",
        "A mammoth bone from the Ice Age",
        "A modern plastic bottle",
        "Today's weather report"
      ],
      "correct": [
        "An ammonite shell found in limestone rock",
        "A fossilized oyster shell",
        "A mammoth bone from the Ice Age"
      ]
    },
    {
      "id": "3.12D-9",
      "type": "multi_select",
      "title": "Finding many seashell fossils in a rock layer in the middle of Texas, far from any ocean today, suggests which of these?",
      "prompt": "Select all that apply.",
      "choices": [
        "That area was likely covered by a shallow sea long ago",
        "The environment there has changed a lot over a very long time",
        "Fossils can be evidence of a very different past environment",
        "Texas has always looked exactly the way it does today",
        "Sea creatures currently live in that spot"
      ],
      "correct": [
        "That area was likely covered by a shallow sea long ago",
        "The environment there has changed a lot over a very long time",
        "Fossils can be evidence of a very different past environment"
      ]
    },
    {
      "id": "3.12D-10",
      "type": "multi_select",
      "title": "Which of these could a fossil be evidence of?",
      "prompt": "Select all that apply.",
      "choices": [
        "An animal that lived long ago",
        "A plant that lived long ago",
        "What an ancient environment may have looked like",
        "What will happen tomorrow",
        "A brand new species that hasn't evolved yet"
      ],
      "correct": [
        "An animal that lived long ago",
        "A plant that lived long ago",
        "What an ancient environment may have looked like"
      ]
    },
    {
      "id": "3.12D-11",
      "type": "multi_select",
      "title": "Which of these are ways scientists learn from fossils?",
      "prompt": "Select all that apply.",
      "choices": [
        "Studying the shape and structure of a fossil",
        "Comparing a fossil to similar living organisms today",
        "Looking at where a fossil was found to learn about the past environment",
        "Guessing randomly with no evidence",
        "Ignoring fossils completely"
      ],
      "correct": [
        "Studying the shape and structure of a fossil",
        "Comparing a fossil to similar living organisms today",
        "Looking at where a fossil was found to learn about the past environment"
      ]
    },
    {
      "id": "3.12D-12",
      "type": "multi_select",
      "title": "Which of these are examples of organisms fossils can preserve evidence of?",
      "prompt": "Select all that apply.",
      "choices": [
        "Ancient sea creatures, like ammonites",
        "Ancient mammals, like mammoths",
        "Ancient plants",
        "Only organisms that are still alive today",
        "Weather events"
      ],
      "correct": [
        "Ancient sea creatures, like ammonites",
        "Ancient mammals, like mammoths",
        "Ancient plants"
      ]
    },
    {
      "id": "3.12D-13",
      "type": "true_false",
      "title": "Fossils are the preserved remains or traces of organisms that lived long ago.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12D-14",
      "type": "true_false",
      "title": "Fossils can be evidence of what an environment was like in the past.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12D-15",
      "type": "true_false",
      "title": "Finding sea creature fossils in Texas rock layers today means the ocean is currently covering that part of Texas.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "finding those fossils shows the area was likely covered by a shallow sea long ago, not that it is today."
    },
    {
      "id": "3.12D-16",
      "type": "true_false",
      "title": "Mammoth fossils found in Texas, like at the Waco Mammoth National Monument, show that mammoths once lived there, even though they are extinct today.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12D-17",
      "type": "true_false",
      "title": "Scientists can compare fossils to modern organisms to learn how living things have changed over time.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.12D-18",
      "type": "true_false",
      "title": "Fossils can only be found in Texas and nowhere else in the world.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "fossils can be found all over the world; Texas happens to have many common fossils like ammonites and mammoth bones."
    },
    {
      "id": "3.12D-19",
      "type": "true_false",
      "title": "Fossils never provide any evidence about past environments.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "fossils are important evidence scientists use to understand what past environments were like."
    },
    {
      "id": "3.12D-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A fossil is the ",
        " of an organism that lived ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "preserved remains or traces",
            "brand new living body"
          ],
          "correct": "preserved remains or traces"
        },
        {
          "choices": [
            "long ago",
            "just yesterday"
          ],
          "correct": "long ago"
        }
      ]
    },
    {
      "id": "3.12D-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Finding ammonite (ancient sea creature) fossils in Central Texas limestone suggests that area was once ",
        ", even though it is not near an ocean today."
      ],
      "blanks": [
        {
          "choices": [
            "covered by a shallow sea",
            "covered in solid ice"
          ],
          "correct": "covered by a shallow sea"
        }
      ]
    },
    {
      "id": "3.12D-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Mammoth fossils found at sites like the Waco Mammoth National Monument are evidence that mammoths ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "once lived in what is now Texas, but are now extinct",
            "are still alive in Texas today"
          ],
          "correct": "once lived in what is now Texas, but are now extinct"
        }
      ]
    },
    {
      "id": "3.12D-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Scientists ",
        " to learn how living things have changed ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "compare fossils to modern organisms",
            "never look at fossils at all"
          ],
          "correct": "compare fossils to modern organisms"
        },
        {
          "choices": [
            "over time",
            "in just one day"
          ],
          "correct": "over time"
        }
      ]
    },
    {
      "id": "3.12D-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how scientists learn from a newly found fossil:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "A fossil is discovered in a rock layer",
        "Scientists carefully study the fossil's shape and structure",
        "Scientists compare the fossil to similar organisms alive today",
        "Scientists use what they learned to explain what the organism and its environment may have been like long ago"
      ],
      "correct": [
        "A fossil is discovered in a rock layer",
        "Scientists carefully study the fossil's shape and structure",
        "Scientists compare the fossil to similar organisms alive today",
        "Scientists use what they learned to explain what the organism and its environment may have been like long ago"
      ]
    },
    {
      "id": "3.12D-25",
      "type": "ordering",
      "title": "A class is modeling how a fossil forms, using a leaf pressed into clay. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Press a leaf firmly into soft clay to make an imprint",
        "Carefully remove the leaf, leaving its shape behind in the clay",
        "Let the clay harden over time",
        "Compare the hardened imprint to a real fossil to see how the shapes are similar"
      ],
      "correct": [
        "Press a leaf firmly into soft clay to make an imprint",
        "Carefully remove the leaf, leaving its shape behind in the clay",
        "Let the clay harden over time",
        "Compare the hardened imprint to a real fossil to see how the shapes are similar"
      ]
    }
  ],
};
