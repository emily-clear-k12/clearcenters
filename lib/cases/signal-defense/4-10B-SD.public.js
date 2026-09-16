// Signal Defense public question bank — 4.10B, Weathering, Erosion &
// Deposition (Grade 4 Science).
//
// PILOT for the grade 4/5 expansion, Sept 16, 2026. Every other bank in this
// folder came from Emily's own authored review-question docs
// (FrequencyRush_ReviewQuestions_<standard>_v1.md) and covers all 22 grade-3
// Science TEKS. This one is drafted to the same schema and the same 25-
// question shape so it can be compared against the grade-3 set directly —
// it is a DRAFT for Emily's review, not approved content.
//
// Standard: 4.10B is verified in lib/cases/TEKS_STANDARDS.md (Signal Check's
// 4.10B-SC uses the same root). No TEKS code was guessed here — that file
// records three invented codes (3.6E, 4.7B, 5.10D) that shipped once and had
// to be pulled, so every standard in this expansion comes from a code
// already verified against Emily's official PDFs.
//
// VERBS AND SCOPE — checked Sept 16, 2026 against TEA's adopted grade 4
// science TEKS and teksguide.org. 4.10B reads, verbatim: "model and describe
// slow changes to Earth's surface caused by weathering, erosion, and
// deposition from water, wind, and ice."
//
// Two things that wording controls, and that the first draft of this bank
// got wrong:
//
//   Agents. The standard names water, wind and ice. It does NOT name
//   gravity. The draft had a question keyed to "gravity" as what moves
//   weathered material, and listed gravity as a correct cause of erosion in
//   a select-all. Both are true science and neither is this standard, so
//   both were rewritten to ice and waves. Keep new questions inside the
//   three named agents.
//
//   Verbs. The standard's verbs are MODEL and DESCRIBE, not "identify". A
//   whole-class review game can't have students model anything, so the
//   weight falls on describing: the ordering questions (how a delta forms,
//   how ice splits a rock, how a dune builds) and the cause-and-effect
//   sentence completions are the ones doing the real standard work here.
//   The plain "which process is this?" items are recall scaffolding around
//   them, not the point — a bank made only of those would technically cover
//   the topic while missing the standard.
//
// Grade 4 rigor vs. grade 3: the grade-3 banks mostly ask students to
// identify and name (which tool, which property, true or false). At grade 4
// the same formats carry more distinguishing — telling weathering from
// erosion from deposition when all three appear in one scenario, and
// following a cause-and-effect chain rather than a single fact. Question
// text is kept to roughly the grade-3 length, since these are read under
// time pressure in a live whole-class round.
//
// Grade 4 science has no STAAR test of its own — grade 4 standards are
// assessed on the grade 5 STAAR (TEA's 2024-2025 grade 5 comparison lists
// 4.10C and 4.11A among the standards assessed there). So grade 4 banks are
// review material for the grade 5 test as much as for grade 4 itself.
//
// Answer positions are varied deliberately. The grade-3 banks had 99% of
// fill-in-the-blank answers sitting first (the widget does not shuffle blank
// dropdowns, so "always pick the first one" was a working strategy) and 65%
// of multiple-choice answers in slot 2. Both were corrected Sept 16, 2026;
// this bank is authored varied from the start so the fix doesn't have to be
// reapplied.

export const PUBLIC_CASE = {
  standard: "4.10B-SD",
  title: "Signal Defense: Weathering, Erosion & Deposition",
  questions: [
    {
      "id": "4.10B-1",
      "type": "multiple_choice",
      "title": "Wind blows sand against a rock for many years until the rock's surface becomes smooth. What is this an example of?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Deposition",
        "Weathering",
        "Erosion",
        "Evaporation"
      ],
      "correct": "Weathering"
    },
    {
      "id": "4.10B-2",
      "type": "multiple_choice",
      "title": "A river carries small rocks and sand downstream. What is the river doing to that material?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Eroding it",
        "Depositing it",
        "Weathering it",
        "Dissolving it"
      ],
      "correct": "Eroding it"
    },
    {
      "id": "4.10B-3",
      "type": "multiple_choice",
      "title": "A river slows down where it meets a lake, and the sand it was carrying settles to the bottom. What is this called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Weathering",
        "Erosion",
        "Deposition",
        "Condensation"
      ],
      "correct": "Deposition"
    },
    {
      "id": "4.10B-4",
      "type": "multiple_choice",
      "title": "Water freezes inside a crack in a rock and the crack splits wider. What caused the rock to break?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The ice expanding as it froze",
        "The rock getting heavier",
        "Wind pushing the crack open",
        "The water dissolving the rock"
      ],
      "correct": "The ice expanding as it froze"
    },
    {
      "id": "4.10B-5",
      "type": "multiple_choice",
      "title": "A glacier slowly slides downhill, dragging rock and soil along with it. Which cause of erosion is this?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Ice",
        "Wind",
        "Water",
        "Sunlight"
      ],
      "correct": "Ice"
    },
    {
      "id": "4.10B-6",
      "type": "multiple_choice",
      "title": "A sandbar builds up at the mouth of a river over several years. Which process built it?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Weathering only",
        "Deposition",
        "Erosion only",
        "Freezing"
      ],
      "correct": "Deposition"
    },
    {
      "id": "4.10B-7",
      "type": "true_false",
      "title": "Weathering breaks rock down, but it does not move the pieces anywhere.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10B-8",
      "type": "true_false",
      "title": "Erosion and deposition are two names for exactly the same process.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.10B-9",
      "type": "true_false",
      "title": "Plant roots growing into a crack in a sidewalk can weather the concrete.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10B-10",
      "type": "true_false",
      "title": "Deposition always happens in the same spot where the material was first broken loose.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.10B-11",
      "type": "true_false",
      "title": "Moving water is one of the main causes of erosion on Earth's surface.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10B-12",
      "type": "true_false",
      "title": "A canyon can be carved by a river in a single afternoon.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.10B-13",
      "type": "true_false",
      "title": "Wind can cause both erosion and deposition.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.10B-14",
      "type": "multi_select",
      "title": "Which of these are examples of weathering?",
      "prompt": "Select all that apply.",
      "choices": [
        "Ice freezing in a crack and splitting a rock",
        "Tree roots breaking apart a stone wall",
        "A river carrying pebbles downstream",
        "Rain slowly wearing down a statue's surface",
        "Sand settling at the bottom of a lake",
        "Wind blasting sand against a cliff face"
      ],
      "correct": [
        "Ice freezing in a crack and splitting a rock",
        "Tree roots breaking apart a stone wall",
        "Rain slowly wearing down a statue's surface",
        "Wind blasting sand against a cliff face"
      ]
    },
    {
      "id": "4.10B-15",
      "type": "multi_select",
      "title": "Which of these can cause erosion?",
      "prompt": "Select all that apply.",
      "choices": [
        "Moving water in a river",
        "Strong wind",
        "A glacier sliding downhill",
        "Waves washing against a beach",
        "Sunlight shining on a rock",
        "The color of the soil"
      ],
      "correct": [
        "Moving water in a river",
        "Strong wind",
        "A glacier sliding downhill",
        "Waves washing against a beach"
      ]
    },
    {
      "id": "4.10B-16",
      "type": "multi_select",
      "title": "Which of these are signs that deposition has happened?",
      "prompt": "Select all that apply.",
      "choices": [
        "A delta forming where a river meets the sea",
        "A sandbar in the middle of a slow river",
        "A new crack splitting across a boulder",
        "A pile of sand built up against a fence after a windstorm",
        "A smooth, rounded surface on a rock",
        "Layers of sediment at the bottom of a pond"
      ],
      "correct": [
        "A delta forming where a river meets the sea",
        "A sandbar in the middle of a slow river",
        "A pile of sand built up against a fence after a windstorm",
        "Layers of sediment at the bottom of a pond"
      ]
    },
    {
      "id": "4.10B-17",
      "type": "multi_select",
      "title": "A farmer wants to keep soil from washing off a sloped field. Which of these would help?",
      "prompt": "Select all that apply.",
      "choices": [
        "Planting grass and other cover plants",
        "Building low walls across the slope",
        "Leaving the soil bare all winter",
        "Planting rows of trees as a windbreak",
        "Plowing straight up and down the slope",
        "Adding mulch over the bare ground"
      ],
      "correct": [
        "Planting grass and other cover plants",
        "Building low walls across the slope",
        "Planting rows of trees as a windbreak",
        "Adding mulch over the bare ground"
      ]
    },
    {
      "id": "4.10B-18",
      "type": "multi_select",
      "title": "Which landforms are built mainly by deposition?",
      "prompt": "Select all that apply.",
      "choices": [
        "A river delta",
        "A sand dune",
        "A canyon",
        "A beach",
        "A sea cave",
        "A sandbar"
      ],
      "correct": [
        "A river delta",
        "A sand dune",
        "A beach",
        "A sandbar"
      ]
    },
    {
      "id": "4.10B-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When ice freezes inside a crack and splits a rock apart, that is ",
        ", because the rock was broken down but ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "erosion",
            "weathering"
          ],
          "correct": "weathering"
        },
        {
          "choices": [
            "not carried away",
            "carried far away"
          ],
          "correct": "not carried away"
        }
      ]
    },
    {
      "id": "4.10B-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A river speeds up and picks up sand, which is ",
        ". Later the river slows down and drops the sand, which is ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "deposition",
            "erosion"
          ],
          "correct": "erosion"
        },
        {
          "choices": [
            "deposition",
            "weathering"
          ],
          "correct": "deposition"
        }
      ]
    },
    {
      "id": "4.10B-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A delta is built where a river ",
        ", because slower water can carry ",
        " material."
      ],
      "blanks": [
        {
          "choices": [
            "slows down",
            "speeds up"
          ],
          "correct": "slows down"
        },
        {
          "choices": [
            "more",
            "less"
          ],
          "correct": "less"
        }
      ]
    },
    {
      "id": "4.10B-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Bare soil on a hillside erodes ",
        " than soil covered with plants, because roots ",
        " the soil in place."
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
            "loosen",
            "hold"
          ],
          "correct": "hold"
        }
      ]
    },
    {
      "id": "4.10B-23",
      "type": "ordering",
      "title": "Put these steps in order to show how a delta forms at a river's mouth:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "The river slows down as it reaches the ocean",
        "Moving water erodes rock and soil upstream",
        "New land builds up layer by layer at the river's mouth",
        "The river carries the material downstream",
        "The sediment settles out of the slowing water"
      ],
      "correct": [
        "Moving water erodes rock and soil upstream",
        "The river carries the material downstream",
        "The river slows down as it reaches the ocean",
        "The sediment settles out of the slowing water",
        "New land builds up layer by layer at the river's mouth"
      ]
    },
    {
      "id": "4.10B-24",
      "type": "ordering",
      "title": "Put these steps in order to show how ice weathering breaks a rock:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "The ice pushes outward and widens the crack",
        "Water seeps into a small crack in the rock",
        "A piece of the rock breaks off",
        "The temperature drops and the water freezes"
      ],
      "correct": [
        "Water seeps into a small crack in the rock",
        "The temperature drops and the water freezes",
        "The ice pushes outward and widens the crack",
        "A piece of the rock breaks off"
      ]
    },
    {
      "id": "4.10B-25",
      "type": "ordering",
      "title": "Put these events in order to show how a sand dune forms:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Sand piles up into a growing dune",
        "Wind lifts and carries loose sand grains",
        "Weathering breaks rock down into sand",
        "The wind slows when it meets a bush or rock and drops the sand"
      ],
      "correct": [
        "Weathering breaks rock down into sand",
        "Wind lifts and carries loose sand grains",
        "The wind slows when it meets a bush or rock and drops the sand",
        "Sand piles up into a growing dune"
      ]
    }
  ],
};
