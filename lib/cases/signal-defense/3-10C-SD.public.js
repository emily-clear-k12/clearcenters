// Signal Defense public question bank — converted from Emily's authored
// review-question doc (FrequencyRush_ReviewQuestions_3.10C_v1.md) into the
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
  standard: "3.10C-SD",
  title: "Signal Defense: Changes to Earth's Surface",
  questions: [
    {
      "id": "3.10C-1",
      "type": "multiple_choice",
      "title": "Which of these is an example of a RAPID (fast, sudden) change to Earth's surface?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A rock slowly wearing smooth over hundreds of years",
        "A volcano erupting and covering the land with lava in hours",
        "A canyon slowly forming over millions of years",
        "A beach slowly eroding a little each year"
      ],
      "correct": "A volcano erupting and covering the land with lava in hours"
    },
    {
      "id": "3.10C-2",
      "type": "multiple_choice",
      "title": "What causes an earthquake?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Wind blowing very hard",
        "Sudden shifting and shaking of the ground, often along a crack in Earth's surface",
        "Rain falling for many days",
        "The sun heating the ground"
      ],
      "correct": "Sudden shifting and shaking of the ground, often along a crack in Earth's surface"
    },
    {
      "id": "3.10C-3",
      "type": "multiple_choice",
      "title": "A large amount of rock and soil suddenly slides down a steep hillside after heavy rain. What is this rapid change called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "An earthquake",
        "A volcanic eruption",
        "A landslide",
        "Weathering"
      ],
      "correct": "A landslide"
    },
    {
      "id": "3.10C-4",
      "type": "multiple_choice",
      "title": "Which of these changes Earth's surface the FASTEST?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A river slowly carving a canyon over millions of years",
        "Wind slowly wearing down a mountain over thousands of years",
        "A rock slowly cracking from years of freezing and thawing",
        "An earthquake suddenly cracking and shifting the ground"
      ],
      "correct": "An earthquake suddenly cracking and shifting the ground"
    },
    {
      "id": "3.10C-5",
      "type": "multiple_choice",
      "title": "During an earthquake, what can happen to the ground?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It always turns into water",
        "It can shake, crack, or suddenly shift",
        "It always disappears completely",
        "It becomes a different color permanently"
      ],
      "correct": "It can shake, crack, or suddenly shift"
    },
    {
      "id": "3.10C-6",
      "type": "multiple_choice",
      "title": "What often triggers a landslide?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A sunny, calm day with no rain",
        "Heavy rain or shaking from an earthquake loosening soil and rock on a slope",
        "A cold, dry winter with no precipitation",
        "A gentle breeze"
      ],
      "correct": "Heavy rain or shaking from an earthquake loosening soil and rock on a slope"
    },
    {
      "id": "3.10C-7",
      "type": "multi_select",
      "title": "Which of these are examples of RAPID (fast) changes to Earth's surface?",
      "prompt": "Select all that apply.",
      "choices": [
        "A volcanic eruption",
        "An earthquake",
        "A landslide",
        "A rock slowly weathering over hundreds of years",
        "A canyon slowly forming over millions of years"
      ],
      "correct": [
        "A volcanic eruption",
        "An earthquake",
        "A landslide"
      ]
    },
    {
      "id": "3.10C-8",
      "type": "multi_select",
      "title": "Which of these can happen during a volcanic eruption?",
      "prompt": "Select all that apply.",
      "choices": [
        "Hot lava flows out and covers the land",
        "Ash can fill the air and settle on the ground",
        "New land can form where lava cools and hardens",
        "The ground gets colder",
        "Nothing about the land changes"
      ],
      "correct": [
        "Hot lava flows out and covers the land",
        "Ash can fill the air and settle on the ground",
        "New land can form where lava cools and hardens"
      ]
    },
    {
      "id": "3.10C-9",
      "type": "multi_select",
      "title": "Which of these can cause a landslide?",
      "prompt": "Select all that apply.",
      "choices": [
        "Heavy rain soaking into a hillside",
        "Shaking from an earthquake",
        "Loose soil and rock on a steep slope",
        "A calm, dry, flat field",
        "A rock sitting still in a museum"
      ],
      "correct": [
        "Heavy rain soaking into a hillside",
        "Shaking from an earthquake",
        "Loose soil and rock on a steep slope"
      ]
    },
    {
      "id": "3.10C-10",
      "type": "multi_select",
      "title": "Which of these describe what can happen during an earthquake?",
      "prompt": "Select all that apply.",
      "choices": [
        "The ground shakes",
        "Cracks can form in the ground",
        "Land can suddenly shift or drop",
        "The ground always stays perfectly still",
        "Temperature drops to freezing every time"
      ],
      "correct": [
        "The ground shakes",
        "Cracks can form in the ground",
        "Land can suddenly shift or drop"
      ]
    },
    {
      "id": "3.10C-11",
      "type": "multi_select",
      "title": "Which of these are RAPID changes, unlike the SLOW changes caused by weathering and erosion?",
      "prompt": "Select all that apply.",
      "choices": [
        "A volcano erupting and quickly covering land with lava",
        "An earthquake suddenly cracking the ground",
        "A landslide suddenly burying a road",
        "A river slowly smoothing rocks over centuries",
        "Wind slowly wearing down a cliff over thousands of years"
      ],
      "correct": [
        "A volcano erupting and quickly covering land with lava",
        "An earthquake suddenly cracking the ground",
        "A landslide suddenly burying a road"
      ]
    },
    {
      "id": "3.10C-12",
      "type": "multi_select",
      "title": "Which of these could be dangers caused by rapid changes to Earth's surface?",
      "prompt": "Select all that apply.",
      "choices": [
        "A landslide burying a road",
        "Lava from a volcano covering buildings",
        "An earthquake cracking a building's foundation",
        "A rock slowly turning smooth over many years",
        "A beach slowly losing a little sand each year"
      ],
      "correct": [
        "A landslide burying a road",
        "Lava from a volcano covering buildings",
        "An earthquake cracking a building's foundation"
      ]
    },
    {
      "id": "3.10C-13",
      "type": "true_false",
      "title": "A volcanic eruption is an example of a rapid (fast) change to Earth's surface.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10C-14",
      "type": "true_false",
      "title": "Earthquakes happen very slowly, taking hundreds of years to occur.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "earthquakes happen suddenly, often in just seconds."
    },
    {
      "id": "3.10C-15",
      "type": "true_false",
      "title": "A landslide can happen suddenly after heavy rain loosens soil on a steep slope.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10C-16",
      "type": "true_false",
      "title": "Weathering and rapid changes like earthquakes both change Earth's surface at the exact same slow speed.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": "weathering happens slowly over a long time, while earthquakes, volcanic eruptions, and landslides happen quickly."
    },
    {
      "id": "3.10C-17",
      "type": "true_false",
      "title": "Lava from a volcanic eruption can cover land and even create new land once it cools.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10C-18",
      "type": "true_false",
      "title": "An earthquake can cause the ground to shake, crack, or suddenly shift.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10C-19",
      "type": "true_false",
      "title": "A landslide, an earthquake, and a volcanic eruption are all examples of Earth's surface changing rapidly.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "3.10C-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A volcano erupts and covers a nearby field with lava within a few hours. This is an example of a ",
        " change to Earth's surface, because it happens ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "rapid",
            "slow"
          ],
          "correct": "rapid"
        },
        {
          "choices": [
            "quickly",
            "over millions of years"
          ],
          "correct": "quickly"
        }
      ]
    },
    {
      "id": "3.10C-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "During a strong earthquake, the shaking loosens rock and soil on a steep hillside, and it suddenly slides down into the valley below. This rapid change is called a ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "landslide",
            "volcanic eruption"
          ],
          "correct": "landslide"
        }
      ]
    },
    {
      "id": "3.10C-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "The ground suddenly shakes and a crack forms across a street. This is most likely caused by ",
        ", which is a ",
        " change to Earth's surface."
      ],
      "blanks": [
        {
          "choices": [
            "an earthquake",
            "a slow-forming canyon"
          ],
          "correct": "an earthquake"
        },
        {
          "choices": [
            "rapid",
            "slow"
          ],
          "correct": "rapid"
        }
      ]
    },
    {
      "id": "3.10C-23",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Unlike weathering, which slowly wears down rock over a very long time, a volcanic eruption can change the land ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "in just hours or days",
            "just as slowly"
          ],
          "correct": "in just hours or days"
        }
      ]
    },
    {
      "id": "3.10C-24",
      "type": "ordering",
      "title": "Put these steps in order to explain how a landslide can happen:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Heavy rain soaks into the soil on a steep hillside",
        "The soaked soil becomes loose and heavy",
        "The loose soil and rock can no longer hold onto the slope",
        "The soil and rock suddenly slide down the hillside"
      ],
      "correct": [
        "Heavy rain soaks into the soil on a steep hillside",
        "The soaked soil becomes loose and heavy",
        "The loose soil and rock can no longer hold onto the slope",
        "The soil and rock suddenly slide down the hillside"
      ]
    },
    {
      "id": "3.10C-25",
      "type": "ordering",
      "title": "A class is comparing a rapid change and a slow change to Earth's surface. Order these steps from first to last:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Choose one rapid change (like an earthquake) and one slow change (like weathering) to compare",
        "Research how quickly each one changes Earth's surface",
        "Compare how long each process takes",
        "Record which change happens faster and which happens more slowly"
      ],
      "correct": [
        "Choose one rapid change (like an earthquake) and one slow change (like weathering) to compare",
        "Research how quickly each one changes Earth's surface",
        "Compare how long each process takes",
        "Record which change happens faster and which happens more slowly"
      ]
    }
  ],
};
