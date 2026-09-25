// Student-safe cases. No group keys, no Venn sets, no question answers.
export const CLASSIFICATION_LABS = [
  {
    "id": "MA-3.6B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Four sides",
    "teks": "3.6B",
    "defs": [
      [
        {
          "term": "Four right angles",
          "text": "A right angle is a square corner, like the corner of a book."
        },
        {
          "term": "One pair of parallel sides",
          "text": "Parallel sides stay the same distance apart and never meet."
        }
      ],
      [
        {
          "term": "Four right angles",
          "text": "A right angle is a square corner, like the corner of a book."
        },
        {
          "term": "One pair of parallel sides",
          "text": "Only one pair stays the same distance apart."
        },
        {
          "term": "Neither",
          "text": "It does not match either definition."
        }
      ],
      [
        {
          "term": "Four equal sides",
          "text": "All four sides are the same length."
        },
        {
          "term": "Four right angles",
          "text": "It has four square corners."
        },
        {
          "term": "Center",
          "text": "Both definitions are true."
        },
        {
          "term": "Outside",
          "text": "Neither definition is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by right angles or one pair of parallel sides.",
        "notThis": "A square is still a rectangle.",
        "groups": [
          {
            "id": "right",
            "label": "Four right angles"
          },
          {
            "id": "one",
            "label": "One pair of parallel sides"
          }
        ],
        "items": [
          {
            "id": "door",
            "label": "Door shape",
            "clue": "Looks like a door",
            "shape": "rect"
          },
          {
            "id": "square",
            "label": "Square",
            "clue": "All sides match",
            "shape": "square"
          },
          {
            "id": "diamond",
            "label": "Turned square",
            "clue": "Looks like a diamond",
            "shape": "diamond"
          },
          {
            "id": "book",
            "label": "Book shape",
            "clue": "Looks like a book",
            "shape": "rect"
          },
          {
            "id": "ramp",
            "label": "Ramp shape",
            "clue": "Short side on top",
            "shape": "trap"
          },
          {
            "id": "ramp2",
            "label": "Ramp shape",
            "clue": "Long side on the bottom",
            "shape": "trap"
          }
        ]
      },
      {
        "rule": "Sort by right angles or one pair of parallel sides.",
        "notThis": "Equal sides do not make right angles.",
        "groups": [
          {
            "id": "right",
            "label": "Four right angles"
          },
          {
            "id": "one",
            "label": "One pair of parallel sides"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "book2",
            "label": "Book shape",
            "clue": "Two long sides",
            "shape": "rect"
          },
          {
            "id": "square2",
            "label": "Square",
            "clue": "All sides match",
            "shape": "square"
          },
          {
            "id": "ramp3",
            "label": "Ramp shape",
            "clue": "Looks like a ramp",
            "shape": "trap"
          },
          {
            "id": "rhombus",
            "label": "Leaning diamond",
            "clue": "Equal sides",
            "shape": "rhombus"
          },
          {
            "id": "para",
            "label": "Leaning box",
            "clue": "Two pairs of long sides",
            "shape": "para"
          },
          {
            "id": "tri",
            "label": "Triangle",
            "clue": "Three sides",
            "shape": "tri"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "equal",
          "text": "Four equal sides"
        },
        {
          "id": "right",
          "text": "Four right angles"
        }
      ],
      "items": [
        {
          "id": "square",
          "label": "Square",
          "shape": "square"
        },
        {
          "id": "diamond",
          "label": "Turned square",
          "shape": "diamond"
        },
        {
          "id": "rhombus",
          "label": "Leaning diamond",
          "shape": "rhombus"
        },
        {
          "id": "rect",
          "label": "Book shape",
          "shape": "rect"
        },
        {
          "id": "trap",
          "label": "Ramp shape",
          "shape": "trap"
        },
        {
          "id": "tri",
          "label": "Triangle",
          "shape": "tri"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "angles",
            "text": "Angles and parallel sides"
          },
          {
            "id": "size",
            "text": "How big the shape is"
          },
          {
            "id": "color",
            "text": "The color of the shape"
          }
        ]
      },
      "multi": {
        "prompt": "Which have four equal sides and four right angles?",
        "choices": [
          {
            "id": "square",
            "text": "Square"
          },
          {
            "id": "diamond",
            "text": "Turned square"
          },
          {
            "id": "rhombus",
            "text": "Leaning diamond"
          },
          {
            "id": "rect",
            "text": "Book shape"
          }
        ]
      },
      "inline": {
        "before": "A square has four right angles, so it is also a",
        "after": ".",
        "choices": [
          {
            "id": "rectangle",
            "text": "rectangle"
          },
          {
            "id": "triangle",
            "text": "triangle"
          },
          {
            "id": "circle",
            "text": "circle"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.3C-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "The word part",
    "teks": "3.3C",
    "defs": [
      [
        {
          "term": "Means not",
          "text": "The prefixes non-, dis-, and in- can mean not."
        },
        {
          "term": "Means before",
          "text": "The prefix pre- means before."
        }
      ],
      [
        {
          "term": "Means not",
          "text": "The prefixes non-, dis-, and in- can mean not."
        },
        {
          "term": "Means before",
          "text": "The prefix pre- means before."
        },
        {
          "term": "No prefix",
          "text": "Nothing was added to the front of the word."
        }
      ],
      [
        {
          "term": "Has a prefix",
          "text": "A prefix is a word part added to the front."
        },
        {
          "term": "Has a suffix",
          "text": "A suffix is a word part added to the end."
        },
        {
          "term": "Center",
          "text": "The word has both a prefix and a suffix."
        },
        {
          "term": "Outside",
          "text": "The word has neither."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what the prefix means.",
        "notThis": "Do not sort by the topic of the word.",
        "groups": [
          {
            "id": "not",
            "label": "Means not"
          },
          {
            "id": "before",
            "label": "Means before"
          }
        ],
        "items": [
          {
            "id": "nonfat",
            "label": "nonfat",
            "clue": "A food"
          },
          {
            "id": "disagree",
            "label": "disagree",
            "clue": "A talk"
          },
          {
            "id": "incorrect",
            "label": "incorrect",
            "clue": "A test"
          },
          {
            "id": "preview",
            "label": "preview",
            "clue": "A movie"
          },
          {
            "id": "preheat",
            "label": "preheat",
            "clue": "An oven"
          },
          {
            "id": "preschool",
            "label": "preschool",
            "clue": "A school"
          }
        ]
      },
      {
        "rule": "Sort by what the prefix means.",
        "notThis": "One word has no prefix.",
        "groups": [
          {
            "id": "not",
            "label": "Means not"
          },
          {
            "id": "before",
            "label": "Means before"
          },
          {
            "id": "none",
            "label": "No prefix"
          }
        ],
        "items": [
          {
            "id": "nonstop",
            "label": "nonstop",
            "clue": "A trip"
          },
          {
            "id": "dislike",
            "label": "dislike",
            "clue": "A feeling"
          },
          {
            "id": "incomplete",
            "label": "incomplete",
            "clue": "A chore"
          },
          {
            "id": "prepay",
            "label": "prepay",
            "clue": "A store"
          },
          {
            "id": "prefix",
            "label": "prefix",
            "clue": "A word"
          },
          {
            "id": "sunshine",
            "label": "sunshine",
            "clue": "The sky"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "prefix",
          "text": "Has a prefix"
        },
        {
          "id": "suffix",
          "text": "Has a suffix"
        }
      ],
      "items": [
        {
          "id": "nonfat",
          "label": "nonfat"
        },
        {
          "id": "preview",
          "label": "preview"
        },
        {
          "id": "careful",
          "label": "careful"
        },
        {
          "id": "playful",
          "label": "playful"
        },
        {
          "id": "disrespectful",
          "label": "disrespectful"
        },
        {
          "id": "sunshine",
          "label": "sunshine"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "prefix",
            "text": "What the prefix means"
          },
          {
            "id": "topic",
            "text": "The topic of the word"
          },
          {
            "id": "letters",
            "text": "How many letters it has"
          }
        ]
      },
      "multi": {
        "prompt": "Which words have a prefix and a suffix?",
        "choices": [
          {
            "id": "disrespectful",
            "text": "disrespectful"
          },
          {
            "id": "previewing",
            "text": "previewing"
          },
          {
            "id": "preview",
            "text": "preview"
          },
          {
            "id": "sunshine",
            "text": "sunshine"
          }
        ]
      },
      "inline": {
        "before": "Disagree means",
        "after": "agree.",
        "choices": [
          {
            "id": "not",
            "text": "not"
          },
          {
            "id": "before",
            "text": "before"
          },
          {
            "id": "full",
            "text": "full"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.7A-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Who makes the rule",
    "teks": "3.7A",
    "defs": [
      [
        {
          "term": "The city",
          "text": "A city rule is for one town."
        },
        {
          "term": "The state",
          "text": "A state rule is for the whole state."
        },
        {
          "term": "The country",
          "text": "A country rule is for the United States."
        }
      ],
      [
        {
          "term": "The city",
          "text": "A city rule is for one town."
        },
        {
          "term": "The state",
          "text": "A state rule is for the whole state."
        },
        {
          "term": "The country",
          "text": "A country rule is for the United States."
        },
        {
          "term": "Neither",
          "text": "A home rule is not made by the city, the state, or the country."
        }
      ],
      [
        {
          "term": "The city makes it",
          "text": "The town decided on this rule."
        },
        {
          "term": "It keeps people safe",
          "text": "The rule protects people."
        },
        {
          "term": "Center",
          "text": "Both definitions are true."
        },
        {
          "term": "Outside",
          "text": "Neither definition is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by who makes the rule.",
        "notThis": "Do not sort by what people need.",
        "groups": [
          {
            "id": "city",
            "label": "The city"
          },
          {
            "id": "state",
            "label": "The state"
          },
          {
            "id": "country",
            "label": "The country"
          }
        ],
        "items": [
          {
            "id": "street",
            "label": "Fixing the school street",
            "clue": "Need: getting to school",
            "image": "/lab/street.jpg"
          },
          {
            "id": "park",
            "label": "Town park hours",
            "clue": "Need: a place to play",
            "image": "/lab/park.jpg"
          },
          {
            "id": "license",
            "label": "A driver's license",
            "clue": "Need: driving",
            "image": "/lab/license.jpg"
          },
          {
            "id": "highway",
            "label": "A state highway",
            "clue": "Need: traveling",
            "image": "/lab/highway.jpg"
          },
          {
            "id": "army",
            "label": "The United States Army",
            "clue": "Need: safety",
            "image": "/lab/army.jpg"
          },
          {
            "id": "stamp",
            "label": "A U.S. postage stamp",
            "clue": "Need: sending mail",
            "image": "/lab/mail.jpg"
          }
        ]
      },
      {
        "rule": "Sort by who makes the rule.",
        "notThis": "A family rule is not a government rule.",
        "groups": [
          {
            "id": "city",
            "label": "The city"
          },
          {
            "id": "state",
            "label": "The state"
          },
          {
            "id": "country",
            "label": "The country"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "library",
            "label": "A city library card",
            "clue": "Need: books",
            "image": "/lab/library.jpg"
          },
          {
            "id": "crosswalk",
            "label": "A school crosswalk",
            "clue": "Need: safety",
            "image": "/lab/crosswalk.jpg"
          },
          {
            "id": "statepark",
            "label": "A state park rule",
            "clue": "Need: the outdoors",
            "image": "/lab/statepark.jpg"
          },
          {
            "id": "coins",
            "label": "U.S. coins",
            "clue": "Need: money",
            "image": "/lab/coins.jpg"
          },
          {
            "id": "president",
            "label": "The president's job",
            "clue": "Need: leadership",
            "image": "/lab/whitehouse.jpg"
          },
          {
            "id": "bedtime",
            "label": "Bedtime at home",
            "clue": "Need: rest",
            "image": "/lab/bedtime.jpg"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "city",
          "text": "The city makes it"
        },
        {
          "id": "safe",
          "text": "It keeps people safe"
        }
      ],
      "items": [
        {
          "id": "park",
          "label": "Town park hours"
        },
        {
          "id": "highway",
          "label": "A state highway"
        },
        {
          "id": "street",
          "label": "The school street"
        },
        {
          "id": "crosswalk",
          "label": "A school crosswalk"
        },
        {
          "id": "bedtime",
          "label": "Bedtime at home"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "who",
            "text": "Who makes the rule"
          },
          {
            "id": "need",
            "text": "What people need"
          },
          {
            "id": "age",
            "text": "How old the rule is"
          }
        ]
      },
      "multi": {
        "prompt": "Which are city rules that keep people safe?",
        "choices": [
          {
            "id": "street",
            "text": "The school street"
          },
          {
            "id": "crosswalk",
            "text": "A school crosswalk"
          },
          {
            "id": "park",
            "text": "Town park hours"
          },
          {
            "id": "army",
            "text": "The United States Army"
          }
        ]
      },
      "inline": {
        "before": "A driver's license is made by the",
        "after": ".",
        "choices": [
          {
            "id": "state",
            "text": "state"
          },
          {
            "id": "city",
            "text": "city"
          },
          {
            "id": "family",
            "text": "family"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.12B-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "What they eat",
    "teks": "4.12B",
    "defs": [
      [
        {
          "term": "Eats animals",
          "text": "It gets energy from eating other animals."
        },
        {
          "term": "Eats plants",
          "text": "It gets energy from eating plants."
        }
      ],
      [
        {
          "term": "Eats animals",
          "text": "It gets energy from eating other animals."
        },
        {
          "term": "Eats plants",
          "text": "It gets energy from eating plants."
        },
        {
          "term": "Neither",
          "text": "It does not eat animals or plants."
        }
      ],
      [
        {
          "term": "Eats animals",
          "text": "It gets energy from eating other animals."
        },
        {
          "term": "Eats plants",
          "text": "It gets energy from eating plants."
        },
        {
          "term": "Center",
          "text": "Both are true. It eats animals and plants."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what they eat.",
        "notThis": "Do not sort by where they live.",
        "groups": [
          {
            "id": "meat",
            "label": "Eats animals"
          },
          {
            "id": "plants",
            "label": "Eats plants"
          }
        ],
        "items": [
          {
            "id": "shark",
            "label": "Shark",
            "clue": "Lives in the ocean",
            "image": "/lab/shark.jpg"
          },
          {
            "id": "dolphin",
            "label": "Dolphin",
            "clue": "Lives in the ocean",
            "image": "/lab/dolphin.jpg"
          },
          {
            "id": "manatee",
            "label": "Manatee",
            "clue": "Lives in the ocean",
            "image": "/lab/manatee.jpg"
          },
          {
            "id": "hawk",
            "label": "Hawk",
            "clue": "Lives in the sky",
            "image": "/lab/hawk.jpg"
          },
          {
            "id": "rabbit",
            "label": "Rabbit",
            "clue": "Lives in a meadow",
            "image": "/lab/rabbit.jpg"
          },
          {
            "id": "deer",
            "label": "Deer",
            "clue": "Lives in a forest",
            "image": "/lab/deer.jpg"
          }
        ]
      },
      {
        "rule": "Sort by what they eat.",
        "notThis": "One of these does not eat at all.",
        "groups": [
          {
            "id": "meat",
            "label": "Eats animals"
          },
          {
            "id": "plants",
            "label": "Eats plants"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "penguin",
            "label": "Penguin",
            "clue": "Lives in the ocean",
            "image": "/lab/penguin.jpg"
          },
          {
            "id": "seal",
            "label": "Seal",
            "clue": "Lives in the ocean",
            "image": "/lab/seal.jpg"
          },
          {
            "id": "sheep",
            "label": "Sheep",
            "clue": "Lives in a meadow",
            "image": "/lab/sheep.jpg"
          },
          {
            "id": "horse",
            "label": "Horse",
            "clue": "Lives in a field",
            "image": "/lab/horse.jpg"
          },
          {
            "id": "panda",
            "label": "Panda",
            "clue": "Looks like a bear",
            "image": "/lab/panda.jpg"
          },
          {
            "id": "oak",
            "label": "Oak tree",
            "clue": "Lives in a forest",
            "image": "/lab/oak.jpg"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "meat",
          "text": "Eats animals"
        },
        {
          "id": "plants",
          "text": "Eats plants"
        }
      ],
      "items": [
        {
          "id": "shark",
          "label": "Shark",
          "image": "/lab/shark.jpg"
        },
        {
          "id": "hawk",
          "label": "Hawk",
          "image": "/lab/hawk.jpg"
        },
        {
          "id": "manatee",
          "label": "Manatee",
          "image": "/lab/manatee.jpg"
        },
        {
          "id": "panda",
          "label": "Panda",
          "image": "/lab/panda.jpg"
        },
        {
          "id": "bear",
          "label": "Bear",
          "image": "/lab/bear.jpg"
        },
        {
          "id": "oak",
          "label": "Oak tree",
          "image": "/lab/oak.jpg"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "eat",
            "text": "What they eat"
          },
          {
            "id": "live",
            "text": "Where they live"
          },
          {
            "id": "size",
            "text": "How big they are"
          }
        ]
      },
      "multi": {
        "prompt": "Which ones eat both animals and plants?",
        "choices": [
          {
            "id": "bear",
            "text": "Bear"
          },
          {
            "id": "raccoon",
            "text": "Raccoon"
          },
          {
            "id": "shark",
            "text": "Shark"
          },
          {
            "id": "deer",
            "text": "Deer"
          }
        ]
      },
      "inline": {
        "before": "A manatee lives in the ocean, but it eats",
        "after": ".",
        "choices": [
          {
            "id": "plants",
            "text": "plants"
          },
          {
            "id": "animals",
            "text": "animals"
          },
          {
            "id": "both",
            "text": "both"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.11D-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "One sentence or two",
    "teks": "4.11D",
    "defs": [
      [
        {
          "term": "Simple",
          "text": "One subject and one verb. One idea."
        },
        {
          "term": "Compound",
          "text": "Two ideas joined by and, but, or or."
        }
      ],
      [
        {
          "term": "Simple",
          "text": "One subject and one verb. One idea."
        },
        {
          "term": "Compound",
          "text": "Two ideas joined by and, but, or or."
        },
        {
          "term": "Neither",
          "text": "It is not a finished sentence."
        }
      ],
      [
        {
          "term": "Has a subject and a verb",
          "text": "Someone or something does an action."
        },
        {
          "term": "Uses and, but, or or",
          "text": "A joining word connects two ideas."
        },
        {
          "term": "Center",
          "text": "Both definitions are true."
        },
        {
          "term": "Outside",
          "text": "Neither definition is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort simple sentences and compound sentences.",
        "notThis": "A long sentence can still be simple.",
        "groups": [
          {
            "id": "simple",
            "label": "Simple"
          },
          {
            "id": "compound",
            "label": "Compound"
          }
        ],
        "items": [
          {
            "id": "seal",
            "label": "The seal ate fish.",
            "clue": "Short"
          },
          {
            "id": "hawk",
            "label": "The hawk dives.",
            "clue": "Short"
          },
          {
            "id": "oak",
            "label": "The oak tree grew in the forest for many years.",
            "clue": "Long"
          },
          {
            "id": "panda",
            "label": "The panda sat down, and it ate bamboo.",
            "clue": "Two ideas"
          },
          {
            "id": "chase",
            "label": "The hawk dives, but the rabbit runs.",
            "clue": "Two ideas"
          },
          {
            "id": "hint",
            "label": "I can read the card, or I can ask for a hint.",
            "clue": "Two ideas"
          }
        ]
      },
      {
        "rule": "Sort simple sentences and compound sentences.",
        "notThis": "A piece of a sentence is not a sentence.",
        "groups": [
          {
            "id": "simple",
            "label": "Simple"
          },
          {
            "id": "compound",
            "label": "Compound"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "sheep",
            "label": "The sheep ate grass.",
            "clue": "One idea"
          },
          {
            "id": "horse",
            "label": "The horse ran fast.",
            "clue": "One idea"
          },
          {
            "id": "pets",
            "label": "The dog barked, and the cat hid.",
            "clue": "Two ideas"
          },
          {
            "id": "bear",
            "label": "The bear ate berries, but it stayed in the woods.",
            "clue": "Two ideas"
          },
          {
            "id": "because",
            "label": "Because the rain started",
            "clue": "Not finished"
          },
          {
            "id": "running",
            "label": "Running across the deck",
            "clue": "Not finished"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "sv",
          "text": "Has a subject and a verb"
        },
        {
          "id": "join",
          "text": "Uses and, but, or or"
        }
      ],
      "items": [
        {
          "id": "seal",
          "label": "The seal ate fish."
        },
        {
          "id": "piece",
          "label": "and the cat hid"
        },
        {
          "id": "pets",
          "label": "The dog barked, and the cat hid."
        },
        {
          "id": "panda",
          "label": "The panda sat, but it ate."
        },
        {
          "id": "forest",
          "label": "the forest"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "kind",
            "text": "Simple or compound"
          },
          {
            "id": "long",
            "text": "How long the sentence is"
          },
          {
            "id": "topic",
            "text": "The topic of the sentence"
          }
        ]
      },
      "multi": {
        "prompt": "Which are compound sentences?",
        "choices": [
          {
            "id": "pets",
            "text": "The dog barked, and the cat hid."
          },
          {
            "id": "panda",
            "text": "The panda sat down, and it ate bamboo."
          },
          {
            "id": "oak",
            "text": "The oak tree grew in the forest for many years."
          },
          {
            "id": "because",
            "text": "Because the rain started"
          }
        ]
      },
      "inline": {
        "before": "A compound sentence joins two ideas with",
        "after": ".",
        "choices": [
          {
            "id": "and",
            "text": "and, but, or or"
          },
          {
            "id": "because",
            "text": "because"
          },
          {
            "id": "period",
            "text": "only a period"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.4A-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "Prime or composite",
    "teks": "5.4A",
    "defs": [
      [
        {
          "term": "Prime",
          "text": "Its only factors are 1 and itself."
        },
        {
          "term": "Composite",
          "text": "It has more factors than 1 and itself."
        },
        {
          "term": "Neither",
          "text": "It is not prime and not composite."
        }
      ],
      [
        {
          "term": "Prime",
          "text": "Its only factors are 1 and itself."
        },
        {
          "term": "Composite",
          "text": "It has more factors than 1 and itself."
        },
        {
          "term": "Neither",
          "text": "It is not prime and not composite."
        }
      ],
      [
        {
          "term": "Odd",
          "text": "It cannot be split into two equal whole groups."
        },
        {
          "term": "Prime",
          "text": "Its only factors are 1 and itself."
        },
        {
          "term": "Center",
          "text": "Both definitions are true."
        },
        {
          "term": "Outside",
          "text": "Neither definition is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by prime or composite.",
        "notThis": "Do not sort by odd or even.",
        "groups": [
          {
            "id": "prime",
            "label": "Prime"
          },
          {
            "id": "composite",
            "label": "Composite"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n2",
            "label": "2",
            "clue": "Even"
          },
          {
            "id": "n4",
            "label": "4",
            "clue": "Even"
          },
          {
            "id": "n7",
            "label": "7",
            "clue": "Odd"
          },
          {
            "id": "n9",
            "label": "9",
            "clue": "Odd"
          },
          {
            "id": "n11",
            "label": "11",
            "clue": "Odd"
          },
          {
            "id": "n1",
            "label": "1",
            "clue": "Odd"
          }
        ]
      },
      {
        "rule": "Sort by prime or composite.",
        "notThis": "Odd does not mean prime.",
        "groups": [
          {
            "id": "prime",
            "label": "Prime"
          },
          {
            "id": "composite",
            "label": "Composite"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n23",
            "label": "23",
            "clue": "Odd"
          },
          {
            "id": "n8",
            "label": "8",
            "clue": "Even"
          },
          {
            "id": "n15",
            "label": "15",
            "clue": "Odd"
          },
          {
            "id": "n21",
            "label": "21",
            "clue": "Odd"
          },
          {
            "id": "n29",
            "label": "29",
            "clue": "Odd"
          },
          {
            "id": "n1b",
            "label": "1",
            "clue": "Odd"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "odd",
          "text": "Odd"
        },
        {
          "id": "prime",
          "text": "Prime"
        }
      ],
      "items": [
        {
          "id": "n9",
          "label": "9"
        },
        {
          "id": "n2",
          "label": "2"
        },
        {
          "id": "n7",
          "label": "7"
        },
        {
          "id": "n11",
          "label": "11"
        },
        {
          "id": "n4",
          "label": "4"
        },
        {
          "id": "n1",
          "label": "1"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "prime",
            "text": "Prime or composite"
          },
          {
            "id": "odd",
            "text": "Odd or even"
          },
          {
            "id": "size",
            "text": "Bigger or smaller"
          }
        ]
      },
      "multi": {
        "prompt": "Which numbers are odd and prime?",
        "choices": [
          {
            "id": "n7",
            "text": "7"
          },
          {
            "id": "n11",
            "text": "11"
          },
          {
            "id": "n9",
            "text": "9"
          },
          {
            "id": "n2",
            "text": "2"
          }
        ]
      },
      "inline": {
        "before": "2 is prime, and it is also",
        "after": ".",
        "choices": [
          {
            "id": "even",
            "text": "even"
          },
          {
            "id": "odd",
            "text": "odd"
          },
          {
            "id": "composite",
            "text": "composite"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.11D-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "The joining word",
    "teks": "5.11D",
    "defs": [
      [
        {
          "term": "Simple",
          "text": "One complete idea."
        },
        {
          "term": "Compound",
          "text": "Two ideas joined by and, but, or or."
        },
        {
          "term": "Complex",
          "text": "Uses because, when, or if."
        }
      ],
      [
        {
          "term": "Simple",
          "text": "One complete idea."
        },
        {
          "term": "Compound",
          "text": "Two ideas joined by and, but, or or."
        },
        {
          "term": "Complex",
          "text": "Uses because, when, or if."
        },
        {
          "term": "Neither",
          "text": "It is not a finished sentence."
        }
      ],
      [
        {
          "term": "Uses and, but, or or",
          "text": "Those words join two complete ideas."
        },
        {
          "term": "Uses because, when, or if",
          "text": "Those words build a complex sentence."
        },
        {
          "term": "Center",
          "text": "Both kinds of joining words are in it."
        },
        {
          "term": "Outside",
          "text": "Neither kind of joining word is in it."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by simple, compound, or complex.",
        "notThis": "A long sentence can still be simple.",
        "groups": [
          {
            "id": "simple",
            "label": "Simple"
          },
          {
            "id": "compound",
            "label": "Compound"
          },
          {
            "id": "complex",
            "label": "Complex"
          }
        ],
        "items": [
          {
            "id": "shark",
            "label": "The shark hunts in the deep ocean.",
            "clue": "Long"
          },
          {
            "id": "oak",
            "label": "The oak does not eat.",
            "clue": "Short"
          },
          {
            "id": "panda",
            "label": "The panda looks like a bear, but it eats plants.",
            "clue": "Uses but"
          },
          {
            "id": "rabbit",
            "label": "The rabbit ran, and the hawk missed.",
            "clue": "Uses and"
          },
          {
            "id": "bear",
            "label": "The bear rests because it ate.",
            "clue": "Uses because"
          },
          {
            "id": "seal",
            "label": "When the seal dives, it hunts fish.",
            "clue": "Uses when"
          }
        ]
      },
      {
        "rule": "Sort by simple, compound, or complex.",
        "notThis": "A fragment is not a sentence yet.",
        "groups": [
          {
            "id": "simple",
            "label": "Simple"
          },
          {
            "id": "compound",
            "label": "Compound"
          },
          {
            "id": "complex",
            "label": "Complex"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "salt",
            "label": "Salt dissolves in water.",
            "clue": "One idea"
          },
          {
            "id": "mix",
            "label": "The trail mix has parts you can see.",
            "clue": "One idea"
          },
          {
            "id": "sugar",
            "label": "The sugar dissolved, and the water looked clear.",
            "clue": "Uses and"
          },
          {
            "id": "when",
            "label": "When the parts settle, you can see them.",
            "clue": "Uses when"
          },
          {
            "id": "frag1",
            "label": "Because the salt dissolved",
            "clue": "Not finished"
          },
          {
            "id": "frag2",
            "label": "And the water looked clear",
            "clue": "Not finished"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "coord",
          "text": "Uses and, but, or or"
        },
        {
          "id": "sub",
          "text": "Uses because, when, or if"
        }
      ],
      "items": [
        {
          "id": "rabbit",
          "label": "The rabbit ran, and the hawk missed."
        },
        {
          "id": "panda",
          "label": "The panda sat, but it ate bamboo."
        },
        {
          "id": "seal",
          "label": "When the seal dives, it hunts."
        },
        {
          "id": "both",
          "label": "I stayed in because it rained, and I read."
        },
        {
          "id": "ocean",
          "label": "the deep ocean"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "kind",
            "text": "The kind of sentence"
          },
          {
            "id": "long",
            "text": "How long it is"
          },
          {
            "id": "topic",
            "text": "The science topic"
          }
        ]
      },
      "multi": {
        "prompt": "Which are complex sentences?",
        "choices": [
          {
            "id": "seal",
            "text": "When the seal dives, it hunts fish."
          },
          {
            "id": "bear",
            "text": "The bear rests because it ate."
          },
          {
            "id": "panda",
            "text": "The panda looks like a bear, but it eats plants."
          },
          {
            "id": "frag",
            "text": "Because the salt dissolved"
          }
        ]
      },
      "inline": {
        "before": "Because, when, and if can build a",
        "after": "sentence.",
        "choices": [
          {
            "id": "complex",
            "text": "complex"
          },
          {
            "id": "simple",
            "text": "simple"
          },
          {
            "id": "fragment",
            "text": "fragment"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.6B-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Mixed or dissolved",
    "teks": "5.6B and 5.6C",
    "defs": [
      [
        {
          "term": "You can see the parts",
          "text": "The pieces are still easy to see."
        },
        {
          "term": "The parts dissolved",
          "text": "A solid mixed into a liquid until you cannot see it."
        }
      ],
      [
        {
          "term": "You can see the parts",
          "text": "The pieces are still easy to see."
        },
        {
          "term": "The parts dissolved",
          "text": "A solid mixed into a liquid until you cannot see it."
        },
        {
          "term": "Not a mixture",
          "text": "Nothing was mixed in. It is one thing."
        }
      ],
      [
        {
          "term": "It is a mixture",
          "text": "Two or more things are combined."
        },
        {
          "term": "It is a solution",
          "text": "One thing dissolved into another."
        },
        {
          "term": "Center",
          "text": "Both definitions are true."
        },
        {
          "term": "Outside",
          "text": "Neither definition is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by parts you can see, or parts that dissolved.",
        "notThis": "A clear liquid can still be mixed.",
        "groups": [
          {
            "id": "see",
            "label": "You can see the parts"
          },
          {
            "id": "dissolved",
            "label": "The parts dissolved"
          }
        ],
        "items": [
          {
            "id": "trail",
            "label": "Trail mix",
            "clue": "Looks like a snack",
            "image": "/lab/trail.jpg"
          },
          {
            "id": "iron",
            "label": "Iron filings and sand",
            "clue": "Looks like dirt",
            "image": "/lab/iron.jpg"
          },
          {
            "id": "sand",
            "label": "Sand and water",
            "clue": "Looks cloudy",
            "image": "/lab/sand.jpg"
          },
          {
            "id": "salad",
            "label": "Salad",
            "clue": "Looks like lunch",
            "image": "/lab/salad.jpg"
          },
          {
            "id": "salt",
            "label": "Salt water",
            "clue": "Looks like plain water",
            "image": "/lab/salt.jpg"
          },
          {
            "id": "sugar",
            "label": "Sugar water",
            "clue": "Looks like plain water",
            "image": "/lab/sugar.jpg"
          }
        ]
      },
      {
        "rule": "Sort by parts you can see, or parts that dissolved.",
        "notThis": "Clear does not always mean dissolved.",
        "groups": [
          {
            "id": "see",
            "label": "You can see the parts"
          },
          {
            "id": "dissolved",
            "label": "The parts dissolved"
          },
          {
            "id": "neither",
            "label": "Not a mixture"
          }
        ],
        "items": [
          {
            "id": "oil",
            "label": "Oil and water",
            "clue": "Two liquids",
            "image": "/lab/oil.jpg"
          },
          {
            "id": "cookie",
            "label": "Chocolate chip cookie",
            "clue": "Chips you can see",
            "image": "/lab/cookie.jpg"
          },
          {
            "id": "salt2",
            "label": "Salt water",
            "clue": "Looks clear",
            "image": "/lab/salt.jpg"
          },
          {
            "id": "mix",
            "label": "Drink mix in water",
            "clue": "Looks like one drink",
            "image": "/lab/drink.jpg"
          },
          {
            "id": "pure",
            "label": "Pure water",
            "clue": "Looks clear",
            "image": "/lab/pure.jpg"
          },
          {
            "id": "wire",
            "label": "A copper wire",
            "clue": "One metal",
            "image": "/lab/wire.jpg"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "mixture",
          "text": "It is a mixture"
        },
        {
          "id": "solution",
          "text": "It is a solution"
        }
      ],
      "items": [
        {
          "id": "trail",
          "label": "Trail mix"
        },
        {
          "id": "iron",
          "label": "Iron filings and sand"
        },
        {
          "id": "oil",
          "label": "Oil and water"
        },
        {
          "id": "salt",
          "label": "Salt water"
        },
        {
          "id": "sugar",
          "label": "Sugar water"
        },
        {
          "id": "pure",
          "label": "Pure water"
        }
      ],
      "mc": {
        "prompt": "Which rule did the card use?",
        "choices": [
          {
            "id": "mix",
            "text": "How the parts are mixed"
          },
          {
            "id": "liquid",
            "text": "Whether it is a liquid"
          },
          {
            "id": "color",
            "text": "The color"
          }
        ]
      },
      "multi": {
        "prompt": "Which are both a mixture and a solution?",
        "choices": [
          {
            "id": "salt",
            "text": "Salt water"
          },
          {
            "id": "sugar",
            "text": "Sugar water"
          },
          {
            "id": "trail",
            "text": "Trail mix"
          },
          {
            "id": "pure",
            "text": "Pure water"
          }
        ]
      },
      "inline": {
        "before": "Salt water looks like one thing, but it is still a",
        "after": ".",
        "choices": [
          {
            "id": "mixture",
            "text": "mixture"
          },
          {
            "id": "rock",
            "text": "rock"
          },
          {
            "id": "pure",
            "text": "sample of pure water"
          }
        ]
      }
    }
  },
  // Sept 24, 2026: Classification Lab cases 9-81 (from ClassificationLab_Cases/). No images yet.
  {
    "id": "SCI-3.7A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Push, pull, or reach",
    "teks": "3.7A",
    "defs": [
      [
        {
          "term": "Contact force",
          "text": "A push or pull that works only when two objects are touching."
        },
        {
          "term": "Force at a distance",
          "text": "A push or pull that can work across a gap. The two objects do not need to touch."
        }
      ],
      [
        {
          "term": "Contact force",
          "text": "A push or pull that works only when two objects are touching."
        },
        {
          "term": "Force at a distance",
          "text": "A push or pull that can work across a gap. The two objects do not need to touch."
        },
        {
          "term": "Neither",
          "text": "It is not a push or a pull, so it is not a force."
        }
      ],
      [
        {
          "term": "Is a pull",
          "text": "The force pulls an object closer instead of pushing it away."
        },
        {
          "term": "Works without touching",
          "text": "The force can act across a gap, without any touching."
        },
        {
          "term": "Center",
          "text": "Both labels are true about this picture."
        },
        {
          "term": "Outside",
          "text": "Neither label is true about this picture."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each picture by the kind of force it shows.",
        "notThis": "Ending up touching is not the rule. Could the force still work across a gap?",
        "groups": [
          {
            "id": "contact",
            "label": "Contact force"
          },
          {
            "id": "distance",
            "label": "Force at a distance"
          }
        ],
        "items": [
          {
            "id": "kick",
            "label": "Kick a soccer ball",
            "clue": "The ball flies far away"
          },
          {
            "id": "door",
            "label": "Push a door open",
            "clue": "Just a small, gentle push"
          },
          {
            "id": "wagon",
            "label": "Pull a wagon by its handle",
            "clue": "The wagon rolls across the yard"
          },
          {
            "id": "fridge",
            "label": "A magnet pulls itself onto the fridge door.",
            "clue": "It touches the fridge door"
          },
          {
            "id": "apple",
            "label": "An apple falls from a tree",
            "clue": "It lands on the ground"
          },
          {
            "id": "repel",
            "label": "Two magnets push each other apart",
            "clue": "It is a push"
          }
        ]
      },
      {
        "rule": "Sort by the kind of force. Some pictures do not show a force.",
        "notThis": "Being far away does not make it a force at a distance. Is it really a push or a pull?",
        "groups": [
          {
            "id": "contact",
            "label": "Contact force"
          },
          {
            "id": "distance",
            "label": "Force at a distance"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rain",
            "label": "A raindrop falls from a cloud",
            "clue": "It splashes on the ground"
          },
          {
            "id": "nail",
            "label": "A magnet pulls a nail through paper",
            "clue": "The paper is in the way"
          },
          {
            "id": "leash",
            "label": "A dog pulls on its leash",
            "clue": "The dog is far ahead"
          },
          {
            "id": "sail",
            "label": "Wind pushes a sailboat",
            "clue": "You cannot see the wind"
          },
          {
            "id": "sunshine",
            "label": "Sunshine warms a sidewalk",
            "clue": "The sun is very far away"
          },
          {
            "id": "nightlight",
            "label": "A night-light glows in a dark room",
            "clue": "Light fills the whole room"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pull",
          "text": "Is a pull"
        },
        {
          "id": "gap",
          "text": "Works without touching"
        }
      ],
      "items": [
        {
          "id": "leafV",
          "label": "A leaf falls to the ground"
        },
        {
          "id": "clipV",
          "label": "A magnet pulls a paper clip closer"
        },
        {
          "id": "ropeV",
          "label": "Two kids tug on a rope"
        },
        {
          "id": "repelV",
          "label": "Two ring magnets push apart on a stick"
        },
        {
          "id": "swingV",
          "label": "Push a friend on a swing"
        },
        {
          "id": "lampV",
          "label": "A lamp lights up a desk"
        }
      ],
      "mc": {
        "prompt": "A magnet is stuck to the refrigerator door. It is touching the door. What kind of force pulls the magnet to the door?",
        "choices": [
          {
            "id": "yes",
            "text": "A force at a distance, because a magnet's pull works across a gap."
          },
          {
            "id": "trap",
            "text": "A contact force, because the magnet is touching the door."
          },
          {
            "id": "no",
            "text": "It is not a force at all."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the pictures that show forces at a distance.",
        "choices": [
          {
            "id": "grav",
            "text": "Gravity pulls a ball down toward the ground."
          },
          {
            "id": "mag",
            "text": "A magnet pulls a metal pin closer."
          },
          {
            "id": "cart",
            "text": "A hand pushes a heavy shopping cart."
          },
          {
            "id": "bat",
            "text": "A baseball bat hits a flying baseball."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what kind of force it is"
          },
          {
            "id": "trap",
            "text": "whether things end up touching"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-3.8A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Kinds of energy",
    "teks": "3.8A",
    "defs": [
      [
        {
          "term": "Light energy",
          "text": "Energy you can see. It lets your eyes see things."
        },
        {
          "term": "Sound energy",
          "text": "Energy you can hear. It comes from something shaking fast."
        }
      ],
      [
        {
          "term": "Light energy",
          "text": "Energy you can see. It lets your eyes see things."
        },
        {
          "term": "Sound energy",
          "text": "Energy you can hear. It comes from something shaking fast."
        },
        {
          "term": "Neither",
          "text": "It gives off only thermal energy (heat) or mechanical energy (motion)."
        }
      ],
      [
        {
          "term": "Gives off light",
          "text": "It sends out light you can see."
        },
        {
          "term": "Gives off sound",
          "text": "It sends out sound you can hear."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by the main energy each one gives off.",
        "notThis": "How you turn it on is not the rule. What comes out of it?",
        "groups": [
          {
            "id": "light",
            "label": "Light energy"
          },
          {
            "id": "sound",
            "label": "Sound energy"
          }
        ],
        "items": [
          {
            "id": "flashlight",
            "label": "Flashlight",
            "clue": "It gets a little warm"
          },
          {
            "id": "glowstick",
            "label": "Glow stick",
            "clue": "You bend it to turn it on"
          },
          {
            "id": "firefly",
            "label": "Firefly",
            "clue": "It flies all around"
          },
          {
            "id": "drum",
            "label": "Drum",
            "clue": "You hit it with sticks"
          },
          {
            "id": "whistle",
            "label": "Whistle",
            "clue": "You blow air into it"
          },
          {
            "id": "chimes",
            "label": "Wind chimes",
            "clue": "The wind moves them"
          }
        ]
      },
      {
        "rule": "Sort by the main energy. Some give off neither.",
        "notThis": "Warm or moving is not light or sound.",
        "groups": [
          {
            "id": "light",
            "label": "Light energy"
          },
          {
            "id": "sound",
            "label": "Sound energy"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "clap",
            "label": "Hands clapping",
            "clue": "Your hands move fast"
          },
          {
            "id": "guitar",
            "label": "Guitar string plucked",
            "clue": "You move it with a finger"
          },
          {
            "id": "nightlt",
            "label": "Night-light",
            "clue": "It plugs into the wall"
          },
          {
            "id": "stars",
            "label": "Glow-in-the-dark star stickers",
            "clue": "They are not plugged in"
          },
          {
            "id": "heatpad",
            "label": "Heating pad",
            "clue": "It plugs into the wall"
          },
          {
            "id": "kite",
            "label": "Kite in the wind",
            "clue": "It is bright and colorful"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "light",
          "text": "Gives off light"
        },
        {
          "id": "sound",
          "text": "Gives off sound"
        }
      ],
      "items": [
        {
          "id": "fireworksV",
          "label": "Fireworks"
        },
        {
          "id": "tvV",
          "label": "A TV playing a cartoon"
        },
        {
          "id": "candleV",
          "label": "Candle flame"
        },
        {
          "id": "birdV",
          "label": "A bird singing"
        },
        {
          "id": "hornV",
          "label": "A bicycle bell rings."
        },
        {
          "id": "bottleV",
          "label": "Hot water bottle"
        }
      ],
      "mc": {
        "prompt": "A flashlight gets a little warm when it is on. What energy does it mainly give off?",
        "choices": [
          {
            "id": "yes",
            "text": "Light energy"
          },
          {
            "id": "trap",
            "text": "Thermal energy, because it feels warm"
          },
          {
            "id": "no",
            "text": "Sound energy"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that give off sound energy.",
        "choices": [
          {
            "id": "dog",
            "text": "A barking dog"
          },
          {
            "id": "bell",
            "text": "A ringing school bell"
          },
          {
            "id": "glow",
            "text": "A glow stick"
          },
          {
            "id": "pad",
            "text": "A heating pad"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the main energy it gives off"
          },
          {
            "id": "trap",
            "text": "how it feels or moves"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-3.10C-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Fast or slow",
    "teks": "3.10C",
    "defs": [
      [
        {
          "term": "Fast change",
          "text": "The land changes quickly, in minutes, hours, or a few days."
        },
        {
          "term": "Slow change",
          "text": "The land changes a tiny bit at a time. It usually takes many years before anyone notices."
        }
      ],
      [
        {
          "term": "Fast change",
          "text": "The land changes quickly, in minutes, hours, or a few days."
        },
        {
          "term": "Slow change",
          "text": "The land changes a tiny bit at a time. It usually takes many years before anyone notices."
        },
        {
          "term": "Neither",
          "text": "Nothing happens to the land itself. It belongs in neither group."
        }
      ],
      [
        {
          "term": "Changes land fast",
          "text": "The land changes quickly, in minutes, hours, or a few days."
        },
        {
          "term": "Moving water does it",
          "text": "Moving or flowing water is the thing that changes the land."
        },
        {
          "term": "Center",
          "text": "Both labels are true about this picture."
        },
        {
          "term": "Outside",
          "text": "Neither label is true about this picture."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each picture by how quickly the land changes.",
        "notThis": "A bigger change is not always a faster change. Think about the amount of time it takes.",
        "groups": [
          {
            "id": "fast",
            "label": "Fast change"
          },
          {
            "id": "slow",
            "label": "Slow change"
          }
        ],
        "items": [
          {
            "id": "quake",
            "label": "Earthquake",
            "clue": "Only a small crack"
          },
          {
            "id": "volcano",
            "label": "Volcano erupts",
            "clue": "Hot, glowing lava"
          },
          {
            "id": "landslide",
            "label": "Small landslide",
            "clue": "Only a little dirt moves"
          },
          {
            "id": "canyon",
            "label": "River makes a canyon",
            "clue": "It is huge and deep."
          },
          {
            "id": "windrock",
            "label": "Wind wears down a rock",
            "clue": "It makes a cool shape"
          },
          {
            "id": "cliff",
            "label": "Waves wear away a cliff",
            "clue": "Waves crash every day"
          }
        ]
      },
      {
        "rule": "Sort by how quickly the land changes. Some pictures show no change to the land.",
        "notThis": "Water, wind, and weather are not the rule. The amount of time is what matters.",
        "groups": [
          {
            "id": "fast",
            "label": "Fast change"
          },
          {
            "id": "slow",
            "label": "Slow change"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "flood",
            "label": "Flood",
            "clue": "It is just water"
          },
          {
            "id": "sinkhole",
            "label": "Sinkhole opens",
            "clue": "A round hole in a yard"
          },
          {
            "id": "rockfall",
            "label": "Rock falls off a cliff",
            "clue": "Just one rock"
          },
          {
            "id": "roots",
            "label": "Roots crack a rock",
            "clue": "Plants are soft"
          },
          {
            "id": "dune",
            "label": "Sand dune moves",
            "clue": "Wind blows every day"
          },
          {
            "id": "clouds",
            "label": "Dark clouds roll in",
            "clue": "The sky changes fast"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fast",
          "text": "Changes land fast"
        },
        {
          "id": "water",
          "text": "Moving water does it"
        }
      ],
      "items": [
        {
          "id": "floodV",
          "label": "Flood washes out a road"
        },
        {
          "id": "quakeV",
          "label": "Earthquake"
        },
        {
          "id": "volcanoV",
          "label": "Volcano erupts"
        },
        {
          "id": "canyonV",
          "label": "River carves a canyon"
        },
        {
          "id": "beachV",
          "label": "Waves slowly smooth rocks into pebbles."
        },
        {
          "id": "windV",
          "label": "Wind shapes a rock"
        }
      ],
      "mc": {
        "prompt": "A river carved a huge, deep canyon. It took millions of years to happen. What kind of change is this?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a slow change, because it took a long time."
          },
          {
            "id": "trap",
            "text": "It is a fast change, because the canyon is enormous."
          },
          {
            "id": "no",
            "text": "It is not really a change to the land."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the changes that can happen to the land quickly.",
        "choices": [
          {
            "id": "mud",
            "text": "A mudslide slides down a muddy hill."
          },
          {
            "id": "ice",
            "text": "Ice cracks a rock over many cold winters."
          },
          {
            "id": "erupt",
            "text": "A volcano erupts and pours out hot lava."
          },
          {
            "id": "sand",
            "text": "Wind wears a rock into an arch over thousands of years."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how fast the land changes"
          },
          {
            "id": "trap",
            "text": "how big the change is"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-3.11C-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Keep it or remake it",
    "teks": "3.11C",
    "defs": [
      [
        {
          "term": "Reuse",
          "text": "You use the same object again. It might get a new job."
        },
        {
          "term": "Recycle",
          "text": "The object is broken down or melted. It is made into something new."
        }
      ],
      [
        {
          "term": "Reuse",
          "text": "You use the same object again. It might get a new job."
        },
        {
          "term": "Recycle",
          "text": "The object is broken down or melted. It is made into something new."
        },
        {
          "term": "Neither",
          "text": "It is not reuse or recycle. It means using less in the first place. That is reduce."
        }
      ],
      [
        {
          "term": "Changes its form",
          "text": "The object gets a new shape or becomes a new material."
        },
        {
          "term": "Stays out of trash",
          "text": "It does not end up in a garbage can or a landfill."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what happens to each object.",
        "notThis": "Looking the same at the end is not the rule. Was it broken down?",
        "groups": [
          {
            "id": "reuse",
            "label": "Reuse"
          },
          {
            "id": "recycle",
            "label": "Recycle"
          }
        ],
        "items": [
          {
            "id": "jarpencil",
            "label": "Keep pencils in an old glass jar",
            "clue": "It was headed for the bin"
          },
          {
            "id": "coat",
            "label": "Wear your cousin's old coat",
            "clue": "It is new to you"
          },
          {
            "id": "refill",
            "label": "Refill a water bottle",
            "clue": "It is made of plastic"
          },
          {
            "id": "glass",
            "label": "Old jars are melted into new jars",
            "clue": "Still a glass jar"
          },
          {
            "id": "fleece",
            "label": "Plastic bottles become a fleece jacket",
            "clue": "You can wear it"
          },
          {
            "id": "tires",
            "label": "Old tires are ground into playground mats",
            "clue": "Kids use it every day"
          }
        ]
      },
      {
        "rule": "Sort by what happens. Some are neither.",
        "notThis": "A new job is not the same as a new material.",
        "groups": [
          {
            "id": "reuse",
            "label": "Reuse"
          },
          {
            "id": "recycle",
            "label": "Recycle"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rag",
            "label": "Cut an old T-shirt into cleaning rags",
            "clue": "You turn it into something"
          },
          {
            "id": "shoes",
            "label": "Give outgrown shoes to a friend",
            "clue": "They leave your house"
          },
          {
            "id": "cardboard",
            "label": "Old boxes are mashed into new boxes",
            "clue": "Still a box"
          },
          {
            "id": "bench",
            "label": "Milk jugs are melted into a park bench",
            "clue": "It lasts a long time"
          },
          {
            "id": "water",
            "label": "Turn off the water while you brush",
            "clue": "It saves water"
          },
          {
            "id": "crackers",
            "label": "Buy one big box, not many small bags",
            "clue": "You still get crackers"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "form",
          "text": "Changes its form"
        },
        {
          "id": "keep",
          "text": "Stays out of trash"
        }
      ],
      "items": [
        {
          "id": "jarsV",
          "label": "Melt old jars into new jars"
        },
        {
          "id": "tiresV",
          "label": "Grind old tires into playground mats"
        },
        {
          "id": "bottleV",
          "label": "Refill a water bottle"
        },
        {
          "id": "coatV",
          "label": "Wear your sister's old coat"
        },
        {
          "id": "canV",
          "label": "Crush a can and throw it in the trash"
        },
        {
          "id": "pizzaV",
          "label": "Throw a pizza box in the trash"
        }
      ],
      "mc": {
        "prompt": "Old glass jars are melted. The glass is made into new jars. Which is it?",
        "choices": [
          {
            "id": "yes",
            "text": "Recycle, because the glass was melted to make something new"
          },
          {
            "id": "trap",
            "text": "Reuse, because it is still a jar"
          },
          {
            "id": "no",
            "text": "Reduce, because it uses less glass"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that are reuse.",
        "choices": [
          {
            "id": "fill",
            "text": "Refill a water bottle"
          },
          {
            "id": "button",
            "text": "Keep buttons in an old jar"
          },
          {
            "id": "melt",
            "text": "Melt cans to make new cans"
          },
          {
            "id": "lights",
            "text": "Turn off the lights"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether it is used again or remade"
          },
          {
            "id": "trap",
            "text": "whether it looks the same as before"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-3.12A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Winter moves",
    "teks": "3.12A",
    "defs": [
      [
        {
          "term": "Migration",
          "text": "An animal travels far to a new place for part of the year."
        },
        {
          "term": "Hibernation",
          "text": "An animal stays in one safe place. Its body slows way down all winter."
        }
      ],
      [
        {
          "term": "Migration",
          "text": "An animal travels far to a new place for part of the year."
        },
        {
          "term": "Hibernation",
          "text": "An animal stays in one safe place. Its body slows way down all winter."
        },
        {
          "term": "Neither",
          "text": "It does not travel far away, and its body does not slow way down all winter."
        }
      ],
      [
        {
          "term": "Migrates",
          "text": "It travels far to a new place for part of the year."
        },
        {
          "term": "Can fly",
          "text": "It can move through the air."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by how each animal gets through winter.",
        "notThis": "Being gone all winter is not the rule. Where did it go?",
        "groups": [
          {
            "id": "mig",
            "label": "Migration"
          },
          {
            "id": "hib",
            "label": "Hibernation"
          }
        ],
        "items": [
          {
            "id": "monarch",
            "label": "Monarch butterfly",
            "clue": "Rests in trees all winter"
          },
          {
            "id": "geese",
            "label": "Canada geese",
            "clue": "Gone from the pond all winter"
          },
          {
            "id": "crane",
            "label": "Whooping crane",
            "clue": "The tallest bird in North America"
          },
          {
            "id": "groundhog",
            "label": "Groundhog",
            "clue": "Eats lots of plants in summer"
          },
          {
            "id": "gsquirrel",
            "label": "Ground squirrel",
            "clue": "Runs fast in the summer"
          },
          {
            "id": "bat",
            "label": "Little brown bat",
            "clue": "It can fly"
          }
        ]
      },
      {
        "rule": "Sort by how each one gets through winter.",
        "notThis": "Sleeping a lot is not the same as hibernating.",
        "groups": [
          {
            "id": "mig",
            "label": "Migration"
          },
          {
            "id": "hib",
            "label": "Hibernation"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "humpback",
            "label": "Humpback whale",
            "clue": "Does not eat much all winter"
          },
          {
            "id": "caribou",
            "label": "Caribou",
            "clue": "It walks. It cannot fly."
          },
          {
            "id": "woodfrog",
            "label": "Wood frog",
            "clue": "Its body freezes almost solid"
          },
          {
            "id": "boxturtle",
            "label": "Box turtle",
            "clue": "Crawls to a safe spot first"
          },
          {
            "id": "maple",
            "label": "Maple tree drops its leaves",
            "clue": "Looks dead all winter"
          },
          {
            "id": "cat",
            "label": "House cat",
            "clue": "Sleeps most of the day"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "mig",
          "text": "Migrates"
        },
        {
          "id": "fly",
          "text": "Can fly"
        }
      ],
      "items": [
        {
          "id": "hummerV",
          "label": "Ruby-throated hummingbird"
        },
        {
          "id": "sandhillV",
          "label": "Sandhill crane"
        },
        {
          "id": "graywhaleV",
          "label": "Gray whale"
        },
        {
          "id": "cardinalV",
          "label": "Northern cardinal"
        },
        {
          "id": "groundhogV",
          "label": "Groundhog"
        },
        {
          "id": "oakV",
          "label": "Oak tree"
        }
      ],
      "mc": {
        "prompt": "Canada geese are gone from the pond all winter. What are they doing?",
        "choices": [
          {
            "id": "yes",
            "text": "Migrating to a warmer place"
          },
          {
            "id": "trap",
            "text": "Hibernating, because no one sees them"
          },
          {
            "id": "no",
            "text": "Dropping their feathers like a tree drops leaves"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that hibernate.",
        "choices": [
          {
            "id": "hog",
            "text": "Groundhog"
          },
          {
            "id": "bat",
            "text": "Little brown bat"
          },
          {
            "id": "goose",
            "text": "Canada goose"
          },
          {
            "id": "cat",
            "text": "House cat"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each one gets through winter"
          },
          {
            "id": "trap",
            "text": "whether you see it in winter"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-3.12B-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Who makes food?",
    "teks": "3.12B",
    "defs": [
      [
        {
          "term": "Producer",
          "text": "A living thing that makes its own food. It uses energy from sunlight to do it."
        },
        {
          "term": "Consumer",
          "text": "A living thing that must eat other living things for its food."
        }
      ],
      [
        {
          "term": "Producer",
          "text": "A living thing that makes its own food. It uses energy from sunlight to do it."
        },
        {
          "term": "Consumer",
          "text": "A living thing that must eat other living things for its food."
        },
        {
          "term": "Neither",
          "text": "It is not alive, so it cannot make food or eat food."
        }
      ],
      [
        {
          "term": "Makes its own food",
          "text": "It uses energy from sunlight to make its own food."
        },
        {
          "term": "Lives in water",
          "text": "Its natural home is in a pond, lake, river, or ocean."
        },
        {
          "term": "Center",
          "text": "Both labels are true about this picture."
        },
        {
          "term": "Outside",
          "text": "Neither label is true about this picture."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each living thing by how it gets its food.",
        "notThis": "Being green does not mean it makes its own food.",
        "groups": [
          {
            "id": "prod",
            "label": "Producer"
          },
          {
            "id": "cons",
            "label": "Consumer"
          }
        ],
        "items": [
          {
            "id": "grass",
            "label": "Grass",
            "clue": "Cows eat it"
          },
          {
            "id": "kelp",
            "label": "Kelp",
            "clue": "Lives in the ocean with fish"
          },
          {
            "id": "cactus",
            "label": "Cactus",
            "clue": "It has sharp spines."
          },
          {
            "id": "frog",
            "label": "Green frog",
            "clue": "Green like a lily pad"
          },
          {
            "id": "caterpillar",
            "label": "Green caterpillar",
            "clue": "Green, and lives on leaves"
          },
          {
            "id": "cow",
            "label": "Cow",
            "clue": "Eats green grass all day"
          }
        ]
      },
      {
        "rule": "Sort by how each one gets its food. Some of these are not alive.",
        "notThis": "Looking like a plant does not make something a producer.",
        "groups": [
          {
            "id": "prod",
            "label": "Producer"
          },
          {
            "id": "cons",
            "label": "Consumer"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "algae",
            "label": "Algae in a pond",
            "clue": "Looks like green slime"
          },
          {
            "id": "moss",
            "label": "Moss on a rock",
            "clue": "It is tiny and has no flowers"
          },
          {
            "id": "turtle",
            "label": "Green sea turtle",
            "clue": "Swims near seaweed"
          },
          {
            "id": "anole",
            "label": "Green anole lizard",
            "clue": "Hides on green leaves"
          },
          {
            "id": "sun",
            "label": "The sun",
            "clue": "Plants need it to make food"
          },
          {
            "id": "plastic",
            "label": "Plastic plant",
            "clue": "It has green leaves and a stem"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "make",
          "text": "Makes its own food"
        },
        {
          "id": "water",
          "text": "Lives in water"
        }
      ],
      "items": [
        {
          "id": "lilyV",
          "label": "Water lily"
        },
        {
          "id": "duckweedV",
          "label": "Duckweed"
        },
        {
          "id": "appleV",
          "label": "Apple tree"
        },
        {
          "id": "catfishV",
          "label": "Catfish"
        },
        {
          "id": "sharkV",
          "label": "Shark"
        },
        {
          "id": "rabbitV",
          "label": "Rabbit"
        }
      ],
      "mc": {
        "prompt": "A bright green frog is sitting on a lily pad. Is the frog a producer or a consumer?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a consumer, because it eats insects for food."
          },
          {
            "id": "trap",
            "text": "It is a producer, because it is green like a plant."
          },
          {
            "id": "no",
            "text": "It is neither, because a frog is not a living thing."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the living things that are producers.",
        "choices": [
          {
            "id": "seaweed",
            "text": "Seaweed that grows in the ocean."
          },
          {
            "id": "grass",
            "text": "Grass that grows in a field."
          },
          {
            "id": "cat",
            "text": "A green caterpillar on a leaf."
          },
          {
            "id": "rock",
            "text": "A rock sitting in a garden."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each one gets its food"
          },
          {
            "id": "trap",
            "text": "what color each one is"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.3D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Same, opposite, or sound-alike",
    "teks": "3.3D",
    "defs": [
      [
        {
          "term": "Synonyms",
          "text": "Two words that mean the same, or almost the same."
        },
        {
          "term": "Antonyms",
          "text": "Two words that mean the opposite."
        }
      ],
      [
        {
          "term": "Synonyms",
          "text": "Two words that mean the same, or almost the same."
        },
        {
          "term": "Antonyms",
          "text": "Two words that mean the opposite."
        },
        {
          "term": "Neither",
          "text": "The words are not synonyms or antonyms. Homophones sound alike but mean different things."
        }
      ],
      [
        {
          "term": "Synonyms",
          "text": "Two words that mean the same, or almost the same."
        },
        {
          "term": "One syllable each",
          "text": "Each word in the pair has only one syllable."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each pair by what the words mean.",
        "notThis": "Looking alike is not the rule. Think about meaning.",
        "groups": [
          {
            "id": "syn",
            "label": "Synonyms"
          },
          {
            "id": "ant",
            "label": "Antonyms"
          }
        ],
        "items": [
          {
            "id": "big",
            "label": "big / large",
            "clue": "Both are about size"
          },
          {
            "id": "begin",
            "label": "begin / start",
            "clue": "They look nothing alike"
          },
          {
            "id": "sick",
            "label": "sick / ill",
            "clue": "Both are short words"
          },
          {
            "id": "happy",
            "label": "happy / unhappy",
            "clue": "Almost the same letters"
          },
          {
            "id": "day",
            "label": "day / night",
            "clue": "They go together"
          },
          {
            "id": "push",
            "label": "push / pull",
            "clue": "Both can open a door"
          }
        ]
      },
      {
        "rule": "Sort by meaning. Some pairs are neither.",
        "notThis": "Sounding the same is not meaning the same.",
        "groups": [
          {
            "id": "syn",
            "label": "Synonyms"
          },
          {
            "id": "ant",
            "label": "Antonyms"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "glad",
            "label": "glad / happy",
            "clue": "They do not rhyme"
          },
          {
            "id": "shout",
            "label": "shout / yell",
            "clue": "Both are loud"
          },
          {
            "id": "right",
            "label": "right / left",
            "clue": "Right sounds like write"
          },
          {
            "id": "buy",
            "label": "buy / sell",
            "clue": "Buy sounds like by"
          },
          {
            "id": "their",
            "label": "their / there",
            "clue": "They sound exactly alike"
          },
          {
            "id": "sea",
            "label": "sea / see",
            "clue": "You can see the sea"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "syn",
          "text": "Synonyms"
        },
        {
          "id": "one",
          "text": "One syllable each"
        }
      ],
      "items": [
        {
          "id": "bigv",
          "label": "big / large"
        },
        {
          "id": "beginv",
          "label": "begin / start"
        },
        {
          "id": "little",
          "label": "little / small"
        },
        {
          "id": "hot",
          "label": "hot / cold"
        },
        {
          "id": "seav",
          "label": "sea / see"
        },
        {
          "id": "sad",
          "label": "happy / sad"
        }
      ],
      "mc": {
        "prompt": "Are “flour / flower” synonyms?",
        "choices": [
          {
            "id": "yes",
            "text": "No. They sound the same but mean different things."
          },
          {
            "id": "trap",
            "text": "Yes. They sound exactly the same."
          },
          {
            "id": "no",
            "text": "No. They are antonyms."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the pairs that are antonyms.",
        "choices": [
          {
            "id": "loud",
            "text": "loud / quiet"
          },
          {
            "id": "up",
            "text": "up / down"
          },
          {
            "id": "close",
            "text": "close / shut"
          },
          {
            "id": "hear",
            "text": "hear / here"
          },
          {
            "id": "wet",
            "text": "wet / dry"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the two words mean"
          },
          {
            "id": "trap",
            "text": "how the two words sound"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Mad or sad?",
    "teks": "3.6F",
    "defs": [
      [
        {
          "term": "Feels mad",
          "text": "The character is angry. Something seems unfair or wrong to them."
        },
        {
          "term": "Feels sad",
          "text": "The character feels down. They lost something or miss someone."
        }
      ],
      [
        {
          "term": "Feels mad",
          "text": "The character is angry. Something seems unfair or wrong to them."
        },
        {
          "term": "Feels sad",
          "text": "The character feels down. They lost something or miss someone."
        },
        {
          "term": "Neither",
          "text": "The character feels something else, like proud, nervous, or happy."
        }
      ],
      [
        {
          "term": "Character is upset",
          "text": "The character feels bad, like mad or sad."
        },
        {
          "term": "Feeling word is named",
          "text": "The text says the feeling word, like happy or scared."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Read what the character does and says. Pick the feeling.",
        "notThis": "One clue is not enough. Use every clue.",
        "groups": [
          {
            "id": "mad",
            "label": "Feels mad"
          },
          {
            "id": "sad",
            "label": "Feels sad"
          }
        ],
        "items": [
          {
            "id": "door",
            "label": "Max slammed the door. He stomped up the stairs.",
            "clue": "He wants to be alone"
          },
          {
            "id": "glare",
            "label": "Kim crossed her arms and glared at her brother. She would not speak to him.",
            "clue": "She is very quiet"
          },
          {
            "id": "unfair",
            "label": "Omar's face turned red. He yelled, \"That's not fair!\"",
            "clue": "He is loud"
          },
          {
            "id": "goodbye",
            "label": "Lena hugged her dog goodbye. Tears ran down her face as the car pulled away.",
            "clue": "Her face is wet"
          },
          {
            "id": "lunch",
            "label": "Ava sat alone at lunch. She pushed her food away and stared at the floor.",
            "clue": "She is not hungry"
          },
          {
            "id": "balloon",
            "label": "Ben's balloon floated away. His lip shook as he whispered, \"It was my favorite.\"",
            "clue": "It is just a balloon"
          }
        ]
      },
      {
        "rule": "Read what the character does and says. Some feel something else.",
        "notThis": "Tears do not always mean sad. Look at all the clues.",
        "groups": [
          {
            "id": "mad",
            "label": "Feels mad"
          },
          {
            "id": "sad",
            "label": "Feels sad"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "book",
            "label": "Nico slammed his book shut. He growled, \"This homework is dumb!\"",
            "clue": "He is done reading"
          },
          {
            "id": "markers",
            "label": "Tess found her sister using her markers again. She stomped and shouted, \"Give them back!\"",
            "clue": "Her sister has markers"
          },
          {
            "id": "lost",
            "label": "The team lost the big game. Eli walked off slowly with his head down.",
            "clue": "He does not yell"
          },
          {
            "id": "moved",
            "label": "Rosa's best friend moved away. Rosa sat by the window and cried all afternoon.",
            "clue": "She has tears"
          },
          {
            "id": "baby",
            "label": "Dad cried as he held his new baby. He smiled and said, \"She's perfect.\"",
            "clue": "Tears on his face"
          },
          {
            "id": "stage",
            "label": "Leo's knees shook as he walked on stage. He whispered, \"What if I forget?\"",
            "clue": "His body is shaking"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "upset",
          "text": "Character is upset"
        },
        {
          "id": "named",
          "text": "Feeling word is named"
        }
      ],
      "items": [
        {
          "id": "kaiV",
          "label": "Kai shouted, \"I am so angry!\""
        },
        {
          "id": "fishV",
          "label": "Ella felt sad when her fish died."
        },
        {
          "id": "batV",
          "label": "Zoe threw her bat down after she struck out."
        },
        {
          "id": "coneV",
          "label": "Lily cried when her ice cream fell on the ground."
        },
        {
          "id": "poemV",
          "label": "Pia felt proud as she read her poem aloud."
        },
        {
          "id": "puppyV",
          "label": "Ty jumped up and down when he saw the new puppy."
        }
      ],
      "mc": {
        "prompt": "Grandma cried when Ben won the race. She cheered and clapped. How does she feel?",
        "choices": [
          {
            "id": "yes",
            "text": "Proud and happy"
          },
          {
            "id": "trap",
            "text": "Sad, because she cried"
          },
          {
            "id": "no",
            "text": "Mad at Ben"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the clues that show a character feels mad.",
        "choices": [
          {
            "id": "slam",
            "text": "Slams a door"
          },
          {
            "id": "stomp",
            "text": "Stomps away"
          },
          {
            "id": "floor",
            "text": "Stares at the floor"
          },
          {
            "id": "glare",
            "text": "Crosses arms and glares"
          },
          {
            "id": "smile",
            "text": "Smiles with tears"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the feeling all the clues show"
          },
          {
            "id": "trap",
            "text": "whether the character cries"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.8A-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Theme or topic?",
    "teks": "3.8A",
    "defs": [
      [
        {
          "term": "Theme",
          "text": "A theme is the message or lesson the author wants you to learn. It says something important about life."
        },
        {
          "term": "Topic",
          "text": "A topic tells what the story is about in a word or a few words."
        }
      ],
      [
        {
          "term": "Theme",
          "text": "A theme is the message or lesson the author wants you to learn. It says something important about life."
        },
        {
          "term": "Topic",
          "text": "A topic tells what the story is about in a word or a few words."
        },
        {
          "term": "Neither",
          "text": "It is not a theme or a topic. It just tells something that happens in the story."
        }
      ],
      [
        {
          "term": "Theme",
          "text": "A theme is the message or lesson the author wants you to learn. It says something important about life."
        },
        {
          "term": "Uses the word friend",
          "text": "The word friend is written somewhere in it."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this idea."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this idea."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Read each idea carefully. Is it a theme or a topic?",
        "notThis": "An important word is not a message. A theme says something about life.",
        "groups": [
          {
            "id": "theme",
            "label": "Theme"
          },
          {
            "id": "topic",
            "label": "Topic"
          }
        ],
        "items": [
          {
            "id": "forgive",
            "label": "Good friends forgive each other when they make mistakes.",
            "clue": "Uses the word friends"
          },
          {
            "id": "work",
            "label": "Hard work pays off.",
            "clue": "Only four words"
          },
          {
            "id": "askhelp",
            "label": "It is okay to ask other people for help.",
            "clue": "No big words in it"
          },
          {
            "id": "friendship",
            "label": "Friendship",
            "clue": "A very important idea"
          },
          {
            "id": "brave",
            "label": "Being brave",
            "clue": "Sounds like a lesson"
          },
          {
            "id": "family",
            "label": "Family",
            "clue": "The story is full of it"
          }
        ]
      },
      {
        "rule": "Read each idea carefully. Some ideas fit neither group.",
        "notThis": "A full sentence is not always a theme. Some sentences just tell what happens.",
        "groups": [
          {
            "id": "theme",
            "label": "Theme"
          },
          {
            "id": "topic",
            "label": "Topic"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "truth",
            "label": "Telling the truth is always the best choice.",
            "clue": "Sounds like a fact"
          },
          {
            "id": "kind",
            "label": "One small act of kindness can change someone's whole day.",
            "clue": "It is about kindness"
          },
          {
            "id": "sharing",
            "label": "Sharing",
            "clue": "Kids share in the story"
          },
          {
            "id": "pets",
            "label": "Pets",
            "clue": "The story has a dog"
          },
          {
            "id": "lunch",
            "label": "Max lost his new lunch box on the way to school.",
            "clue": "A full sentence"
          },
          {
            "id": "bus",
            "label": "Lily and Sam get into a fight on the school bus.",
            "clue": "It is about friendship"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "theme",
          "text": "Theme"
        },
        {
          "id": "friend",
          "text": "Uses the word friend"
        }
      ],
      "items": [
        {
          "id": "truefriend",
          "label": "A true friend sticks by you no matter what happens."
        },
        {
          "id": "hardtimes",
          "label": "A good friend helps you when times are hard."
        },
        {
          "id": "dreams",
          "label": "Never give up on your dreams, even when things get difficult."
        },
        {
          "id": "newfriend",
          "label": "Making a new friend"
        },
        {
          "id": "ana",
          "label": "Ana eats lunch with her best friend every day."
        },
        {
          "id": "winter",
          "label": "Winter"
        }
      ],
      "mc": {
        "prompt": "A story is about a boy who takes care of his dog. Which idea is a theme of the story?",
        "choices": [
          {
            "id": "yes",
            "text": "Taking care of a pet takes a lot of hard work."
          },
          {
            "id": "trap",
            "text": "Pets and friendship"
          },
          {
            "id": "no",
            "text": "The boy walks his dog around the block."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the ideas that are topics, not themes.",
        "choices": [
          {
            "id": "honesty",
            "text": "Honesty"
          },
          {
            "id": "growing",
            "text": "Growing up"
          },
          {
            "id": "bekind",
            "text": "Always be kind to other people."
          },
          {
            "id": "teamwork",
            "text": "Teamwork"
          },
          {
            "id": "game",
            "text": "The team wins the big soccer game."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the idea is a full message"
          },
          {
            "id": "trap",
            "text": "how important the idea sounds"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "What kind of story?",
    "teks": "3.9A",
    "defs": [
      [
        {
          "term": "Fable",
          "text": "A short story told to teach a lesson. The characters are often animals."
        },
        {
          "term": "Myth",
          "text": "An old story that explains something in nature. It often has gods."
        }
      ],
      [
        {
          "term": "Fable",
          "text": "A short story told to teach a lesson. The characters are often animals."
        },
        {
          "term": "Myth",
          "text": "An old story that explains something in nature. It often has gods."
        },
        {
          "term": "Neither",
          "text": "It is a fairy tale or a legend. A legend tells of a hero who may have been real."
        }
      ],
      [
        {
          "term": "Has animal characters",
          "text": "Animals are characters in the story."
        },
        {
          "term": "Teaches a lesson",
          "text": "The story shows a lesson about how to act."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what kind of story it is.",
        "notThis": "Animals do not decide it. Think about the story's job.",
        "groups": [
          {
            "id": "fable",
            "label": "Fable"
          },
          {
            "id": "myth",
            "label": "Myth"
          }
        ],
        "items": [
          {
            "id": "tortoise",
            "label": "The Tortoise and the Hare. A slow tortoise wins a race against a proud hare.",
            "clue": "Has talking animals"
          },
          {
            "id": "crow",
            "label": "A fox tricks a crow into dropping her cheese. The story ends with a lesson.",
            "clue": "Has a sneaky animal"
          },
          {
            "id": "ant",
            "label": "An ant works all summer while a grasshopper plays. In winter, the grasshopper has no food.",
            "clue": "Tells about the seasons"
          },
          {
            "id": "coyote",
            "label": "Long ago, only the Fire Beings had fire, until Coyote stole some. That is why people have fire today.",
            "clue": "The main character is an animal"
          },
          {
            "id": "zeus",
            "label": "The Greeks told how the god Zeus threw lightning bolts. It explained where storms come from.",
            "clue": "A god gets angry"
          },
          {
            "id": "demeter",
            "label": "The goddess Demeter is sad when her daughter leaves. Her sadness makes winter come each year.",
            "clue": "A mom misses her child"
          }
        ]
      },
      {
        "rule": "Sort by what kind of story it is. Some are neither.",
        "notThis": "Gods and animals can show up in both. Ask what the story is for.",
        "groups": [
          {
            "id": "fable",
            "label": "Fable"
          },
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "wolf",
            "label": "A boy keeps lying that a wolf is coming. Soon, no one believes him.",
            "clue": "The main character is a person"
          },
          {
            "id": "hercules",
            "label": "A man begs the god Hercules to free his stuck cart. Hercules tells him to push it himself.",
            "clue": "A god is in it"
          },
          {
            "id": "raven",
            "label": "Long ago, the world was dark. Raven stole the sun and put it in the sky.",
            "clue": "The hero is a bird"
          },
          {
            "id": "thor",
            "label": "The Norse god Thor swings his hammer across the sky. The Norse said this made thunder.",
            "clue": "A strong hero with a hammer"
          },
          {
            "id": "cinderella",
            "label": "Cinderella. A fairy godmother helps a kind girl go to the royal ball.",
            "clue": "Has magic powers"
          },
          {
            "id": "arthur",
            "label": "King Arthur pulls a sword from a stone. People say he was a real king long ago.",
            "clue": "Tells about a hero"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "animal",
          "text": "Has animal characters"
        },
        {
          "id": "lesson",
          "text": "Teaches a lesson"
        }
      ],
      "items": [
        {
          "id": "mouseV",
          "label": "A tiny mouse saves a lion. Even small friends can help."
        },
        {
          "id": "pebbleV",
          "label": "A thirsty crow drops pebbles in a jar to raise the water. Being clever pays off."
        },
        {
          "id": "turtleV",
          "label": "The Earth was made on the back of a giant turtle."
        },
        {
          "id": "midasV",
          "label": "King Midas wishes that all he touches turns to gold. He learns that greed is foolish."
        },
        {
          "id": "swordV",
          "label": "King Arthur pulls a sword from a stone and becomes king."
        },
        {
          "id": "stormV",
          "label": "The god Zeus throws lightning bolts to make storms."
        }
      ],
      "mc": {
        "prompt": "A story has a talking eagle. It explains how the sun got into the sky. What kind of story is it?",
        "choices": [
          {
            "id": "yes",
            "text": "A myth. It explains nature."
          },
          {
            "id": "trap",
            "text": "A fable. It has a talking animal."
          },
          {
            "id": "no",
            "text": "A legend about a real hero."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that are true about fables.",
        "choices": [
          {
            "id": "lesson",
            "text": "They teach a lesson."
          },
          {
            "id": "short",
            "text": "They are often short."
          },
          {
            "id": "people",
            "text": "The characters can be people."
          },
          {
            "id": "must",
            "text": "They must have animals."
          },
          {
            "id": "storms",
            "text": "They explain where storms come from."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the story is for"
          },
          {
            "id": "trap",
            "text": "which characters are in the story"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "How is it built?",
    "teks": "3.9D(iii)",
    "defs": [
      [
        {
          "term": "Cause and effect",
          "text": "One event causes another event to happen. The text tells what happened and also why it happened."
        },
        {
          "term": "Problem and solution",
          "text": "A character or group has a problem. The text tells how the problem gets fixed."
        }
      ],
      [
        {
          "term": "Cause and effect",
          "text": "One event causes another event to happen. The text tells what happened and also why it happened."
        },
        {
          "term": "Problem and solution",
          "text": "A character or group has a problem. The text tells how the problem gets fixed."
        },
        {
          "term": "Neither",
          "text": "The text lists or describes things. Nothing causes a change, and nothing gets fixed."
        }
      ],
      [
        {
          "term": "Cause and effect",
          "text": "The whole text is built to show one event making another happen."
        },
        {
          "term": "Uses the word because",
          "text": "The word because appears somewhere in the text."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this passage."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this passage."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each passage by how the whole thing is built.",
        "notThis": "One signal word can trick you. Read the whole passage before you sort.",
        "groups": [
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "ps",
            "label": "Problem and solution"
          }
        ],
        "items": [
          {
            "id": "creek",
            "label": "It rained very hard all night long. The next morning, the creek flooded the road.",
            "clue": "Sounds like a problem"
          },
          {
            "id": "plant",
            "label": "Maya forgot to water her plant for two weeks. Its leaves turned brown and dry.",
            "clue": "The plant is in trouble"
          },
          {
            "id": "trash",
            "label": "A strong wind blew over the trash can. Trash spilled all over the quiet street.",
            "clue": "It makes a mess"
          },
          {
            "id": "shelf",
            "label": "Ben could not reach his book on the top shelf. He stood on a step stool to get it.",
            "clue": "One thing leads to another"
          },
          {
            "id": "gym",
            "label": "The class could not go outside because it was raining. The teacher set up games in the gym instead.",
            "clue": "Uses the word because"
          },
          {
            "id": "fence",
            "label": "The dog kept escaping through a hole under the fence. Dad fixed it with a row of big rocks.",
            "clue": "Dad does something"
          }
        ]
      },
      {
        "rule": "Sort by how each passage is built. Some passages only describe.",
        "notThis": "Some signal words can fool you. Read the whole passage very carefully.",
        "groups": [
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "ps",
            "label": "Problem and solution"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "snowman",
            "label": "The warm sun melted the snowman in the yard. By noon, only a carrot and a hat were left.",
            "clue": "Tells what was left"
          },
          {
            "id": "lightning",
            "label": "Lightning hit a tall tree during the storm. The tree split in half and crashed down.",
            "clue": "About a storm"
          },
          {
            "id": "board",
            "label": "Lily could not see the board because she sat in the back. Her teacher moved her seat to the front row.",
            "clue": "Uses the word because"
          },
          {
            "id": "park",
            "label": "The town had no safe place for kids to play. People worked together to build a new park.",
            "clue": "Something new gets built"
          },
          {
            "id": "garden",
            "label": "Our garden is so pretty in the summer. It has red roses, yellow daisies, and tall sunflowers.",
            "clue": "Uses the word so"
          },
          {
            "id": "frogs",
            "label": "Frogs can jump, swim, and climb very well. Some frogs can even glide from tree to tree.",
            "clue": "Tells what frogs can do"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "ce",
          "text": "Cause and effect"
        },
        {
          "id": "bec",
          "text": "Uses the word because"
        }
      ],
      "items": [
        {
          "id": "vaseV",
          "label": "The glass vase fell off the shelf. It broke because it hit the hard floor."
        },
        {
          "id": "coneV2",
          "label": "Sam's ice cream melted quickly because the sun was hot. It dripped down his hand."
        },
        {
          "id": "powerV",
          "label": "A powerful storm knocked down the power lines. All the lights in town went out."
        },
        {
          "id": "busV",
          "label": "Zoe could not ride the bus because it broke down. Her mom drove her to school instead."
        },
        {
          "id": "owlV",
          "label": "Owls have big eyes and soft, fluffy feathers. They usually hunt for food at night."
        },
        {
          "id": "roomV",
          "label": "My bedroom has a bed, a desk, and a lamp. The walls are painted light blue."
        }
      ],
      "mc": {
        "prompt": "Nia could not fly her kite because there was no wind. She ran very fast across the field to lift it up. How is this passage built?",
        "choices": [
          {
            "id": "yes",
            "text": "Problem and solution, because Nia finds a way to fix her problem."
          },
          {
            "id": "trap",
            "text": "Cause and effect, because the passage uses the word because."
          },
          {
            "id": "no",
            "text": "It is a list of facts that describe kites."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the signs that a passage is problem and solution.",
        "choices": [
          {
            "id": "trouble",
            "text": "A character has some kind of trouble."
          },
          {
            "id": "fix",
            "text": "Someone finds a way to fix the trouble."
          },
          {
            "id": "because",
            "text": "The word because is somewhere in it."
          },
          {
            "id": "list",
            "text": "It lists what something looks like."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the whole passage is built"
          },
          {
            "id": "trap",
            "text": "which signal words it uses"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.9E-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Fact or opinion?",
    "teks": "3.9E(ii)",
    "defs": [
      [
        {
          "term": "Fact",
          "text": "A fact is something you can prove is true. You can check it or measure it."
        },
        {
          "term": "Opinion",
          "text": "An opinion tells what someone thinks or feels. Other people may not agree with it."
        }
      ],
      [
        {
          "term": "Fact",
          "text": "A fact is something you can prove is true. You can check it or measure it."
        },
        {
          "term": "Opinion",
          "text": "An opinion tells what someone thinks or feels. Other people may not agree with it."
        },
        {
          "term": "Neither",
          "text": "It asks a question instead. It does not tell a fact or an opinion."
        }
      ],
      [
        {
          "term": "Fact",
          "text": "A fact is something you can prove is true. You can check it or measure it."
        },
        {
          "term": "Has a number",
          "text": "The sentence has a number written in digits, like 5 or 100."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this sentence."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this sentence."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each sentence by whether you can prove it.",
        "notThis": "Sounding very sure does not make a sentence a fact.",
        "groups": [
          {
            "id": "fact",
            "label": "Fact"
          },
          {
            "id": "opinion",
            "label": "Opinion"
          }
        ],
        "items": [
          {
            "id": "fourlegs",
            "label": "A dog is an animal with four legs.",
            "clue": "About dogs"
          },
          {
            "id": "capital",
            "label": "Austin is the capital city of Texas.",
            "clue": "Some people love Austin"
          },
          {
            "id": "spinach",
            "label": "Spinach is a leafy green vegetable.",
            "clue": "Many kids hate it"
          },
          {
            "id": "bestpet",
            "label": "Dogs are the very best pets for families.",
            "clue": "It sounds very sure"
          },
          {
            "id": "beststate",
            "label": "Texas is the best state in the whole country.",
            "clue": "Lots of people agree"
          },
          {
            "id": "pizza",
            "label": "Pizza is the tastiest food in the world.",
            "clue": "Many kids say so"
          }
        ]
      },
      {
        "rule": "Sort by whether you can prove it. Some sentences ask something.",
        "notThis": "Strong feelings do not change a fact. Check whether you can prove it.",
        "groups": [
          {
            "id": "fact",
            "label": "Fact"
          },
          {
            "id": "opinion",
            "label": "Opinion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "freeze",
            "label": "Pure water freezes at 32 degrees Fahrenheit.",
            "clue": "Has a number"
          },
          {
            "id": "snake",
            "label": "Snakes are reptiles with dry, scaly skin.",
            "clue": "Many people are scared of them"
          },
          {
            "id": "read",
            "label": "Everyone should read for 20 minutes every single day.",
            "clue": "Has a number"
          },
          {
            "id": "summer",
            "label": "Summer vacation is way too short for kids.",
            "clue": "Most kids agree"
          },
          {
            "id": "whichpet",
            "label": "Which pet is the best one to have?",
            "clue": "Has the word best"
          },
          {
            "id": "spider",
            "label": "How many legs does a spider have?",
            "clue": "It has a real answer"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fact",
          "text": "Fact"
        },
        {
          "id": "num",
          "text": "Has a number"
        }
      ],
      "items": [
        {
          "id": "weekV",
          "label": "A week has 7 days in it."
        },
        {
          "id": "countyV",
          "label": "The state of Texas has 254 counties."
        },
        {
          "id": "sunV",
          "label": "The sun is a star at the center of our solar system."
        },
        {
          "id": "beeV",
          "label": "Honeybees make honey and store it in their hives."
        },
        {
          "id": "scoopV",
          "label": "The perfect ice cream cone has exactly 3 scoops."
        },
        {
          "id": "catV",
          "label": "Cats are much cuter than dogs."
        }
      ],
      "mc": {
        "prompt": "Jada says, “Dogs are the best pets, and I am sure!” Is that a fact?",
        "choices": [
          {
            "id": "yes",
            "text": "No, it is an opinion, because nobody can prove it is true."
          },
          {
            "id": "trap",
            "text": "Yes, it is a fact, because she sounds very sure."
          },
          {
            "id": "no",
            "text": "No, it is a question, because it asks something."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sentences that are facts you can prove.",
        "choices": [
          {
            "id": "frog",
            "text": "Frogs belong to a group of animals called amphibians."
          },
          {
            "id": "moon",
            "text": "The moon moves in a path around Earth."
          },
          {
            "id": "math",
            "text": "Math is the hardest subject in school."
          },
          {
            "id": "rain",
            "text": "Rain is the worst kind of weather."
          },
          {
            "id": "state",
            "text": "Texas is a state in the United States."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether you can prove it"
          },
          {
            "id": "trap",
            "text": "how sure the writer sounds"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.10E-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Who is telling it?",
    "teks": "3.10E",
    "defs": [
      [
        {
          "term": "First person",
          "text": "The narrator is a character inside the story. The narrator uses words like I, me, my, and we."
        },
        {
          "term": "Third person",
          "text": "The narrator is not a character in the story. The narrator uses he, she, they, or names."
        }
      ],
      [
        {
          "term": "First person",
          "text": "The narrator is a character inside the story. The narrator uses words like I, me, my, and we."
        },
        {
          "term": "Third person",
          "text": "The narrator is not a character in the story. The narrator uses he, she, they, or names."
        },
        {
          "term": "Neither",
          "text": "The narrator talks directly to the reader. The narrator uses the words you and your."
        }
      ],
      [
        {
          "term": "First person",
          "text": "The narrator is a character inside the story. The narrator uses words like I, me, my, and we."
        },
        {
          "term": "A character is talking",
          "text": "A character's exact words are written inside quotation marks."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this passage."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this passage."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each passage by who is telling the story.",
        "notThis": "Words inside quotation marks show a character talking. Check who the narrator is instead.",
        "groups": [
          {
            "id": "first",
            "label": "First person"
          },
          {
            "id": "third",
            "label": "Third person"
          }
        ],
        "items": [
          {
            "id": "busride",
            "label": "I raced to the bus stop this morning. My heavy backpack bounced on my back.",
            "clue": "About a bus ride"
          },
          {
            "id": "cake",
            "label": "We baked a birthday cake for Mom yesterday. It came out a little lopsided.",
            "clue": "Mom is in it"
          },
          {
            "id": "farm",
            "label": "My grandma lives on a farm in the country. I usually visit her every May.",
            "clue": "All about Grandma"
          },
          {
            "id": "hawk",
            "label": "Tom looked up at the cloudy sky. He saw a hawk circling above the trees.",
            "clue": "Tom is the main character"
          },
          {
            "id": "key",
            "label": "Rosa yelled, “I found it!” She proudly held up the missing key.",
            "clue": "It has the word I"
          },
          {
            "id": "apple",
            "label": "“I am really hungry,” said Ben after soccer practice. He grabbed a shiny red apple.",
            "clue": "Ben says I"
          }
        ]
      },
      {
        "rule": "Sort each passage by who tells the story. Some fit neither group.",
        "notThis": "Look carefully at the narrator's words, not only at what characters say.",
        "groups": [
          {
            "id": "first",
            "label": "First person"
          },
          {
            "id": "third",
            "label": "Third person"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "pip",
            "label": "My cat, Pip, hid under my bed for the whole afternoon.",
            "clue": "Pip is the main character"
          },
          {
            "id": "askbro",
            "label": "“Can I come to the store?” I asked my older brother.",
            "clue": "Someone is talking"
          },
          {
            "id": "pedal",
            "label": "“You can do it!” Dad told Mia at the park. She kept pedaling up the steep hill.",
            "clue": "It has the word you"
          },
          {
            "id": "park",
            "label": "The girls raced each other to the park. They played on the swings until dark.",
            "clue": "No names are used"
          },
          {
            "id": "door",
            "label": "You slowly open the heavy wooden door. You see a big, dark, empty room.",
            "clue": "It tells a story"
          },
          {
            "id": "hero",
            "label": "You are the hero of this exciting adventure story. Turn the page to find out what happens!",
            "clue": "It is about a hero"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "first",
          "text": "First person"
        },
        {
          "id": "talk",
          "text": "A character is talking"
        }
      ],
      "items": [
        {
          "id": "waitkim",
          "label": "“Wait for me!” I shouted to my friend Kim."
        },
        {
          "id": "bedtime",
          "label": "Mom said, “It is time for bed.” I groaned and slowly closed my book."
        },
        {
          "id": "puddle",
          "label": "I love rainy days more than sunny ones. I jump in every puddle I see."
        },
        {
          "id": "cold",
          "label": "“I am so cold,” said Max on the windy walk home. He zipped up his coat."
        },
        {
          "id": "jen",
          "label": "“Let's go to the pond!” Jen called to her cousins. She ran ahead down the path."
        },
        {
          "id": "dig",
          "label": "The dog dug a deep hole in the backyard. Then it curled up and took a nap."
        }
      ],
      "mc": {
        "prompt": "“I won the race!” shouted Ava. She proudly held up her blue ribbon. Who is telling this story?",
        "choices": [
          {
            "id": "yes",
            "text": "Third person, because a narrator outside the story tells about Ava."
          },
          {
            "id": "trap",
            "text": "First person, because the passage has the word I in it."
          },
          {
            "id": "no",
            "text": "Second person, because the narrator talks straight to you."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the clues that show a story is told in first person.",
        "choices": [
          {
            "id": "iwe",
            "text": "The narrator uses the words I or we."
          },
          {
            "id": "mine",
            "text": "The narrator uses the words my or me."
          },
          {
            "id": "inside",
            "text": "The narrator is a character in the story."
          },
          {
            "id": "quote",
            "text": "A character says I inside quotation marks."
          },
          {
            "id": "heshe",
            "text": "The narrator uses the words he or she."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who tells the story"
          },
          {
            "id": "trap",
            "text": "who says the word I"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-3.11D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Word jobs",
    "teks": "3.11D(iii)",
    "defs": [
      [
        {
          "term": "Noun",
          "text": "A noun is a word that names a person, place, thing, or idea."
        },
        {
          "term": "Verb",
          "text": "A verb is a word that shows an action. It tells what someone or something does."
        }
      ],
      [
        {
          "term": "Noun",
          "text": "A noun is a word that names a person, place, thing, or idea."
        },
        {
          "term": "Verb",
          "text": "A verb is a word that shows an action. It tells what someone or something does."
        },
        {
          "term": "Neither",
          "text": "The word is not a noun or a verb. It might describe something or tell how."
        }
      ],
      [
        {
          "term": "Is a noun",
          "text": "The CAPITAL word names a person, place, thing, or idea in this sentence."
        },
        {
          "term": "Ends in s",
          "text": "The very last letter of the CAPITAL word is the letter s."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this sentence."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this sentence."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each sentence by the job of the CAPITAL word.",
        "notThis": "The same word can do different jobs. Read the whole sentence carefully first.",
        "groups": [
          {
            "id": "noun",
            "label": "Noun"
          },
          {
            "id": "verb",
            "label": "Verb"
          }
        ],
        "items": [
          {
            "id": "walkn",
            "label": "After dinner, our family went for a long WALK.",
            "clue": "Your legs do this"
          },
          {
            "id": "play",
            "label": "The school PLAY had a king and a dragon in it.",
            "clue": "Kids play at recess"
          },
          {
            "id": "hug",
            "label": "Mom gave me a big HUG before school this morning.",
            "clue": "You do it with your arms"
          },
          {
            "id": "walkv",
            "label": "We WALK to school together every morning.",
            "clue": "You can go on one"
          },
          {
            "id": "fly",
            "label": "Many birds FLY south when the weather turns cold.",
            "clue": "A fly is a bug"
          },
          {
            "id": "drink",
            "label": "I DRINK a glass of cold milk with breakfast.",
            "clue": "Milk is a drink"
          }
        ]
      },
      {
        "rule": "Sort each sentence by the word's job. Some words fit neither group.",
        "notThis": "Check the word's job in this sentence, not in other sentences.",
        "groups": [
          {
            "id": "noun",
            "label": "Noun"
          },
          {
            "id": "verb",
            "label": "Verb"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "dream",
            "label": "I had a strange DREAM about talking animals last night.",
            "clue": "You dream when you sleep"
          },
          {
            "id": "brush",
            "label": "A green BRUSH is sitting on the bathroom sink.",
            "clue": "You brush your teeth"
          },
          {
            "id": "water",
            "label": "Please WATER the flowers in the garden before lunch.",
            "clue": "Water is wet"
          },
          {
            "id": "race",
            "label": "The children RACE across the playground to the swings.",
            "clue": "A race has a winner"
          },
          {
            "id": "fast",
            "label": "My older sister runs FAST in every relay race.",
            "clue": "Running is an action"
          },
          {
            "id": "warm",
            "label": "The chicken noodle soup is WARM and delicious.",
            "clue": "You can warm your hands"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "noun",
          "text": "Is a noun"
        },
        {
          "id": "ends",
          "text": "Ends in s"
        }
      ],
      "items": [
        {
          "id": "walksn",
          "label": "Our dog loves its daily WALKS around the neighborhood."
        },
        {
          "id": "dogs",
          "label": "The neighbor's DOGS bark loudly at night."
        },
        {
          "id": "hat",
          "label": "I lost my favorite HAT at the park yesterday."
        },
        {
          "id": "walksv",
          "label": "Dad WALKS the dog after dinner every evening."
        },
        {
          "id": "sings",
          "label": "Mia SINGS along to the radio in the car."
        },
        {
          "id": "sleep",
          "label": "We SLEEP in a tent when we go camping."
        }
      ],
      "mc": {
        "prompt": "In the sentence “Our dog took a long NAP,” what job does NAP do?",
        "choices": [
          {
            "id": "yes",
            "text": "Noun, because it names the thing that the dog took."
          },
          {
            "id": "trap",
            "text": "Verb, because napping is something that you do."
          },
          {
            "id": "no",
            "text": "Neither, because it tells how the dog did something."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sentences where the CAPITAL word is a verb.",
        "choices": [
          {
            "id": "drinkv",
            "text": "I DRINK cold water after recess."
          },
          {
            "id": "drinkn",
            "text": "Can I have a DRINK of juice?"
          },
          {
            "id": "playv",
            "text": "We PLAY tag at recess every day."
          },
          {
            "id": "sing",
            "text": "Birds SING loudly at dawn."
          },
          {
            "id": "playn",
            "text": "The class PLAY was really fun."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the job the word does in the sentence"
          },
          {
            "id": "trap",
            "text": "what the word usually means"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.2B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Hundreds place",
    "teks": "3.2B",
    "defs": [
      [
        {
          "term": "Hundreds digit 6–9",
          "text": "The digit in the hundreds place is 6, 7, 8, or 9."
        },
        {
          "term": "Hundreds digit 0–3",
          "text": "The digit in the hundreds place is 0, 1, 2, or 3."
        }
      ],
      [
        {
          "term": "Hundreds digit 6–9",
          "text": "The digit in the hundreds place is 6, 7, 8, or 9."
        },
        {
          "term": "Hundreds digit 0–3",
          "text": "The digit in the hundreds place is 0, 1, 2, or 3."
        },
        {
          "term": "Neither",
          "text": "The digit in the hundreds place is 4 or 5."
        }
      ],
      [
        {
          "term": "Hundreds digit 6–9",
          "text": "The digit in the hundreds place is 6, 7, 8, or 9."
        },
        {
          "term": "Greater than 1,000",
          "text": "The whole number is more than one thousand."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by the digit in the hundreds place.",
        "notThis": "A big number can have a small hundreds digit.",
        "groups": [
          {
            "id": "high",
            "label": "Hundreds digit 6–9"
          },
          {
            "id": "low",
            "label": "Hundreds digit 0–3"
          }
        ],
        "items": [
          {
            "id": "n2150",
            "label": "2,150",
            "clue": "More than two thousand"
          },
          {
            "id": "n700",
            "label": "700",
            "clue": "Less than one thousand"
          },
          {
            "id": "n98301",
            "label": "98,301",
            "clue": "Starts with a 9"
          },
          {
            "id": "w5800",
            "label": "five thousand, eight hundred",
            "clue": "Written in words"
          },
          {
            "id": "x4927",
            "label": "4,000 + 900 + 20 + 7",
            "clue": "The first part is 4,000"
          },
          {
            "id": "w61020",
            "label": "sixty-one thousand, twenty",
            "clue": "Has \"sixty\" in it"
          }
        ]
      },
      {
        "rule": "Sort by the hundreds digit. Some fit neither group.",
        "notThis": "Do not look at the first digit. Find the hundreds place.",
        "groups": [
          {
            "id": "high",
            "label": "Hundreds digit 6–9"
          },
          {
            "id": "low",
            "label": "Hundreds digit 0–3"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n9450",
            "label": "9,450",
            "clue": "Has a 9 in it"
          },
          {
            "id": "x30508",
            "label": "30,000 + 500 + 8",
            "clue": "A big first part"
          },
          {
            "id": "n1099",
            "label": "1,099",
            "clue": "Lots of 9s"
          },
          {
            "id": "w23600",
            "label": "twenty-three thousand, six hundred",
            "clue": "Has \"three\" in it"
          },
          {
            "id": "x87290",
            "label": "80,000 + 7,000 + 200 + 90",
            "clue": "Has an 8 and a 9"
          },
          {
            "id": "n675",
            "label": "675",
            "clue": "Only three digits"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "high",
          "text": "Hundreds digit 6–9"
        },
        {
          "id": "big",
          "text": "Greater than 1,000"
        }
      ],
      "items": [
        {
          "id": "v5800",
          "label": "5,800"
        },
        {
          "id": "d7904",
          "label": "7 thousands, 9 hundreds, 4 ones"
        },
        {
          "id": "v760",
          "label": "760"
        },
        {
          "id": "w912",
          "label": "nine hundred twelve"
        },
        {
          "id": "v12050",
          "label": "12,050"
        },
        {
          "id": "v305",
          "label": "305"
        }
      ],
      "mc": {
        "prompt": "Leo says 2,150 has a bigger hundreds digit than 760. He says so because 2,150 is bigger. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. 2,150 has only a 1 in the hundreds place."
          },
          {
            "id": "trap",
            "text": "Yes. The bigger number has the bigger digit."
          },
          {
            "id": "no",
            "text": "No. 760 has no hundreds at all."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that have a 7 in the hundreds place.",
        "choices": [
          {
            "id": "a",
            "text": "4,715"
          },
          {
            "id": "b",
            "text": "seven thousand, forty"
          },
          {
            "id": "c",
            "text": "3,000 + 700 + 2"
          },
          {
            "id": "d",
            "text": "70,000 + 60"
          },
          {
            "id": "e",
            "text": "8 thousands, 7 hundreds, 5 ones"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the digit in the hundreds place"
          },
          {
            "id": "trap",
            "text": "how big the whole number is"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.2A-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Same number, different form",
    "teks": "3.2A",
    "defs": [
      [
        {
          "term": "Equal to 3,405",
          "text": "This card has a total value of 3,405. The digit 4 is in the hundreds place, so it means 400."
        },
        {
          "term": "Equal to 3,045",
          "text": "This card has a total value of 3,045. The digit 4 is in the tens place, so it means 40."
        }
      ],
      [
        {
          "term": "Equal to 3,405",
          "text": "This card has a total value of 3,405. The digit 4 is in the hundreds place, so it means 400."
        },
        {
          "term": "Equal to 3,045",
          "text": "This card has a total value of 3,045. The digit 4 is in the tens place, so it means 40."
        },
        {
          "term": "Neither",
          "text": "Its value is not equal to 3,405, and it is not equal to 3,045."
        }
      ],
      [
        {
          "term": "Equal to 3,405",
          "text": "This card has a total value of 3,405. The digit 4 is in the hundreds place, so it means 400."
        },
        {
          "term": "Written in word form",
          "text": "The number is written only in words. It does not use any digits at all."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this number."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this number."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each card by the number it is equal to.",
        "notThis": "The same digits can make very different numbers. Check the value of each place carefully.",
        "groups": [
          {
            "id": "a",
            "label": "Equal to 3,405"
          },
          {
            "id": "b",
            "label": "Equal to 3,045"
          }
        ],
        "items": [
          {
            "id": "w3405",
            "label": "three thousand, four hundred five",
            "clue": "Written in words"
          },
          {
            "id": "w3045",
            "label": "three thousand, forty-five",
            "clue": "Has a four and a five"
          },
          {
            "id": "x3405",
            "label": "3,000 + 400 + 5",
            "clue": "Three parts added"
          },
          {
            "id": "x3045",
            "label": "3,000 + 40 + 5",
            "clue": "Three parts added"
          },
          {
            "id": "p3405",
            "label": "3 thousands, 4 hundreds, 5 ones",
            "clue": "Has a 3, 4, and 5"
          },
          {
            "id": "p3045",
            "label": "3 thousands, 4 tens, 5 ones",
            "clue": "Has a 3, 4, and 5"
          }
        ]
      },
      {
        "rule": "Sort each card by its total value. Some are neither.",
        "notThis": "The parts can come in any order. Add up the parts to find the total value.",
        "groups": [
          {
            "id": "a",
            "label": "Equal to 3,405"
          },
          {
            "id": "b",
            "label": "Equal to 3,045"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "h34",
            "label": "34 hundreds, 5 ones",
            "clue": "Has 34 in it"
          },
          {
            "id": "mix5",
            "label": "5 + 400 + 3,000",
            "clue": "The ones come first"
          },
          {
            "id": "h30",
            "label": "30 hundreds, 4 tens, 5 ones",
            "clue": "Starts with 30"
          },
          {
            "id": "two45",
            "label": "3,000 + 45",
            "clue": "Only two parts"
          },
          {
            "id": "x3450",
            "label": "3,000 + 400 + 50",
            "clue": "Uses 3, 4, and 5"
          },
          {
            "id": "w3504",
            "label": "three thousand, five hundred four",
            "clue": "Written in words"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "a",
          "text": "Equal to 3,405"
        },
        {
          "id": "words",
          "text": "Written in word form"
        }
      ],
      "items": [
        {
          "id": "vw3405",
          "label": "three thousand, four hundred five"
        },
        {
          "id": "vmix",
          "label": "400 + 3,000 + 5"
        },
        {
          "id": "v40tens",
          "label": "3 thousands, 40 tens, 5 ones"
        },
        {
          "id": "vw3045",
          "label": "three thousand, forty-five"
        },
        {
          "id": "vw3504",
          "label": "three thousand, five hundred four"
        },
        {
          "id": "v3450",
          "label": "3,450"
        }
      ],
      "mc": {
        "prompt": "Ava writes the number “three thousand, forty-five” as 3,405. Is her answer correct, or did she make a mistake?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because the number has zero hundreds, so it is 3,045."
          },
          {
            "id": "trap",
            "text": "Yes, because the number uses a 3, a 4, and a 5."
          },
          {
            "id": "no",
            "text": "No, because the correct number is 345."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the cards that are equal to 3,045.",
        "choices": [
          {
            "id": "a",
            "text": "3,000 + 40 + 5"
          },
          {
            "id": "b",
            "text": "3 thousands, 4 tens, 5 ones"
          },
          {
            "id": "c",
            "text": "30 hundreds, 45 ones"
          },
          {
            "id": "d",
            "text": "3,000 + 400 + 5"
          },
          {
            "id": "e",
            "text": "three hundred forty-five"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the value of each number"
          },
          {
            "id": "trap",
            "text": "which digits the number uses"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.4I-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Even, odd, or neither",
    "teks": "3.4I",
    "defs": [
      [
        {
          "term": "Even",
          "text": "A whole number with 0, 2, 4, 6, or 8 in the ones place."
        },
        {
          "term": "Odd",
          "text": "A whole number with 1, 3, 5, 7, or 9 in the ones place."
        }
      ],
      [
        {
          "term": "Even",
          "text": "A whole number with 0, 2, 4, 6, or 8 in the ones place."
        },
        {
          "term": "Odd",
          "text": "A whole number with 1, 3, 5, 7, or 9 in the ones place."
        },
        {
          "term": "Neither",
          "text": "It is not a whole number. Even and odd are only for whole numbers."
        }
      ],
      [
        {
          "term": "Even",
          "text": "A whole number with 0, 2, 4, 6, or 8 in the ones place."
        },
        {
          "term": "Greater than 50",
          "text": "The number is more than 50."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by even or odd. Look at the ones digit.",
        "notThis": "Size does not matter. The other digits do not matter.",
        "groups": [
          {
            "id": "even",
            "label": "Even"
          },
          {
            "id": "odd",
            "label": "Odd"
          }
        ],
        "items": [
          {
            "id": "n30",
            "label": "30",
            "clue": "A round number"
          },
          {
            "id": "n1000",
            "label": "1,000",
            "clue": "A really big number"
          },
          {
            "id": "n5678",
            "label": "5,678",
            "clue": "Has odd digits 5 and 7"
          },
          {
            "id": "n47",
            "label": "47",
            "clue": "Has a 4 in it"
          },
          {
            "id": "n8641",
            "label": "8,641",
            "clue": "Starts with even digits"
          },
          {
            "id": "n99",
            "label": "99",
            "clue": "Almost 100"
          }
        ]
      },
      {
        "rule": "Sort by even or odd. Some are neither.",
        "notThis": "Even and odd are only for whole numbers.",
        "groups": [
          {
            "id": "even",
            "label": "Even"
          },
          {
            "id": "odd",
            "label": "Odd"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n70",
            "label": "70",
            "clue": "Has a 7 in it"
          },
          {
            "id": "n100k",
            "label": "100,000",
            "clue": "The biggest number here"
          },
          {
            "id": "n2463",
            "label": "2,463",
            "clue": "Mostly even digits"
          },
          {
            "id": "w91",
            "label": "forty-one",
            "clue": "Written in words"
          },
          {
            "id": "half",
            "label": "1/2",
            "clue": "Half of something"
          },
          {
            "id": "tq",
            "label": "3/4",
            "clue": "Has a 4 in it"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "even",
          "text": "Even"
        },
        {
          "id": "big",
          "text": "Greater than 50"
        }
      ],
      "items": [
        {
          "id": "v84",
          "label": "84"
        },
        {
          "id": "v3000",
          "label": "3,000"
        },
        {
          "id": "v20",
          "label": "20"
        },
        {
          "id": "v51",
          "label": "51"
        },
        {
          "id": "v9999",
          "label": "9,999"
        },
        {
          "id": "v37",
          "label": "37"
        }
      ],
      "mc": {
        "prompt": "Sam says 1,001 is even because it is so big. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. It has a 1 in the ones place, so it is odd."
          },
          {
            "id": "trap",
            "text": "Yes. Big numbers are even."
          },
          {
            "id": "no",
            "text": "No. It is not a whole number."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the ways to tell a whole number is even.",
        "choices": [
          {
            "id": "ones",
            "text": "Its ones digit is 0, 2, 4, 6, or 8."
          },
          {
            "id": "split",
            "text": "It splits into 2 equal groups with none left over."
          },
          {
            "id": "big",
            "text": "It is bigger than 100."
          },
          {
            "id": "first",
            "text": "Its first digit is even."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the digit in the ones place"
          },
          {
            "id": "trap",
            "text": "how big the number is"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.5B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Which operation?",
    "teks": "3.5B",
    "defs": [
      [
        {
          "term": "Multiply",
          "text": "You know how many equal groups there are and how many are in each. You multiply to find the total."
        },
        {
          "term": "Divide",
          "text": "You already know the total amount. You split it into equal groups to find the missing number."
        }
      ],
      [
        {
          "term": "Multiply",
          "text": "You know how many equal groups there are and how many are in each. You multiply to find the total."
        },
        {
          "term": "Divide",
          "text": "You already know the total amount. You split it into equal groups to find the missing number."
        },
        {
          "term": "Neither",
          "text": "There are no equal groups. You add or subtract instead."
        }
      ],
      [
        {
          "term": "Multiply",
          "text": "You know how many equal groups there are and how many are in each. You multiply to find the total."
        },
        {
          "term": "Has \"each\" in it",
          "text": "The word “each” appears somewhere in the problem."
        },
        {
          "term": "Center",
          "text": "Both statements are true for this problem."
        },
        {
          "term": "Outside",
          "text": "Neither statement is true for this problem."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by the operation. Do not solve.",
        "notThis": "Key words can trick you. Look carefully for equal groups instead.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          }
        ],
        "items": [
          {
            "id": "spiders",
            "label": "A spider has 8 legs. How many legs do 3 spiders have?",
            "clue": "No \"in all\" anywhere"
          },
          {
            "id": "crayons",
            "label": "Each box holds 6 crayons. How many crayons are in 7 boxes?",
            "clue": "Starts with \"each\""
          },
          {
            "id": "garden",
            "label": "A garden has 4 rows with 9 plants in each row. How many plants in all?",
            "clue": "Says \"in all\""
          },
          {
            "id": "grapes",
            "label": "Mom puts 24 grapes in cups, with 4 in each cup. How many cups does she fill?",
            "clue": "Has the word \"each\""
          },
          {
            "id": "teams",
            "label": "30 kids make 5 equal teams. How many kids on each team?",
            "clue": "Says \"in all\""
          },
          {
            "id": "cookies",
            "label": "Ben packs 36 cookies in bags of 4. How many bags does he fill?",
            "clue": "No \"share\" or \"divide\""
          }
        ]
      },
      {
        "rule": "Sort by the operation. Some need adding or subtracting.",
        "notThis": "Words like “in all,” “times,” and “share” do not choose the operation for you.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "juice",
            "label": "Dad buys 5 packs with 6 juice boxes in each pack. How many juice boxes?",
            "clue": "Has the word \"each\""
          },
          {
            "id": "crackers",
            "label": "Four friends share a bowl, and each eats 5 crackers. How many crackers did they eat?",
            "clue": "Says \"share\""
          },
          {
            "id": "chairs",
            "label": "48 chairs are set up in 6 equal rows. How many chairs are in each row?",
            "clue": "Chairs in rows, like an array"
          },
          {
            "id": "pages",
            "label": "Sara reads 8 pages each day of a 56-page book. How many days will it take?",
            "clue": "Has the word \"each\""
          },
          {
            "id": "jumps",
            "label": "Zoe jumped 20, then 25, then 18 times. How many jumps in all?",
            "clue": "Says \"times\""
          },
          {
            "id": "tall",
            "label": "Jo is 52 inches tall, and her dad is 70 inches. How much taller is her dad?",
            "clue": "Two numbers, one question"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "mult",
          "text": "Multiply"
        },
        {
          "id": "each",
          "text": "Has \"each\" in it"
        }
      ],
      "items": [
        {
          "id": "vans",
          "label": "7 vans have 5 kids in each van. How many kids in all?"
        },
        {
          "id": "cats",
          "label": "A cat has 4 legs. How many legs do 6 cats have?"
        },
        {
          "id": "pens",
          "label": "Blue pens come in packs of 10. How many pens are in 4 packs?"
        },
        {
          "id": "cards",
          "label": "Split 42 cards into 6 equal piles. How many cards are in each pile?"
        },
        {
          "id": "oranges",
          "label": "Each bag holds 5 oranges. How many bags can 35 oranges fill?"
        },
        {
          "id": "cents",
          "label": "Ty has 27 cents and finds 50 more. How many cents in all?"
        }
      ],
      "mc": {
        "prompt": "A word problem uses the words “in all.” Do you always multiply to solve it?",
        "choices": [
          {
            "id": "yes",
            "text": "No, you should first look for equal groups in the problem."
          },
          {
            "id": "trap",
            "text": "Yes, because “in all” always means you multiply."
          },
          {
            "id": "no",
            "text": "No, because “in all” always means you divide."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the clues that show a problem has equal groups.",
        "choices": [
          {
            "id": "each",
            "text": "5 kids in each van"
          },
          {
            "id": "rows",
            "text": "48 chairs in 6 equal rows"
          },
          {
            "id": "colors",
            "text": "12 red beads and 7 blue beads"
          },
          {
            "id": "inall",
            "text": "The words \"in all\""
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the operation that solves the problem"
          },
          {
            "id": "trap",
            "text": "the key words in the problem"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.7D-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Pour it or weigh it",
    "teks": "3.7D",
    "defs": [
      [
        {
          "term": "Liquid volume",
          "text": "How much liquid is in something or fits in it. We use units like cups, liters, and gallons."
        },
        {
          "term": "Weight",
          "text": "How heavy something is. We use units like ounces and pounds."
        }
      ],
      [
        {
          "term": "Liquid volume",
          "text": "How much liquid is in something or fits in it. We use units like cups, liters, and gallons."
        },
        {
          "term": "Weight",
          "text": "How heavy something is. We use units like ounces and pounds."
        },
        {
          "term": "Neither",
          "text": "The question does not ask about liquid volume or weight."
        }
      ],
      [
        {
          "term": "Liquid volume",
          "text": "How much liquid is in something or fits in it. We use units like cups, liters, and gallons."
        },
        {
          "term": "Food or drink",
          "text": "The thing being measured is something people eat or drink."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what you want to find out.",
        "notThis": "Pouring is not the rule. Read what the question asks.",
        "groups": [
          {
            "id": "liq",
            "label": "Liquid volume"
          },
          {
            "id": "wt",
            "label": "Weight"
          }
        ],
        "items": [
          {
            "id": "milk",
            "label": "How much milk is in the big jug?",
            "clue": "The jug is heavy to lift"
          },
          {
            "id": "flour",
            "label": "How heavy is the bag of flour?",
            "clue": "Flour pours out of the bag"
          },
          {
            "id": "tank",
            "label": "How much water fills the fish tank?",
            "clue": "A full tank is heavy"
          },
          {
            "id": "sugar",
            "label": "How heavy is the bag of sugar?",
            "clue": "Sugar pours like water"
          },
          {
            "id": "juice",
            "label": "How much juice fits in the cup?",
            "clue": "A small cup"
          },
          {
            "id": "pack",
            "label": "How heavy is the backpack?",
            "clue": "It holds a water bottle"
          }
        ]
      },
      {
        "rule": "Sort by what you want to find out. Some are neither.",
        "notThis": "Something can hold a liquid and still ask about something else.",
        "groups": [
          {
            "id": "liq",
            "label": "Liquid volume"
          },
          {
            "id": "wt",
            "label": "Weight"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "soup",
            "label": "How much soup is in the pot?",
            "clue": "The pot is heavy"
          },
          {
            "id": "rice",
            "label": "How heavy is the bag of rice?",
            "clue": "Rice pours like water"
          },
          {
            "id": "tub",
            "label": "How much water does the bathtub hold?",
            "clue": "A full tub is very heavy"
          },
          {
            "id": "melon",
            "label": "How heavy is the watermelon?",
            "clue": "It is full of juice"
          },
          {
            "id": "hose",
            "label": "How long is the garden hose?",
            "clue": "Water runs through it"
          },
          {
            "id": "jugtall",
            "label": "How tall is the milk jug?",
            "clue": "It holds milk"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "liq",
          "text": "Liquid volume"
        },
        {
          "id": "food",
          "text": "Food or drink"
        }
      ],
      "items": [
        {
          "id": "milkV",
          "label": "How much milk is in the carton?"
        },
        {
          "id": "paintV",
          "label": "How much paint is in the can?"
        },
        {
          "id": "poolV",
          "label": "How much shampoo is in the bottle?"
        },
        {
          "id": "flourV",
          "label": "How heavy is the bag of flour?"
        },
        {
          "id": "applesV",
          "label": "How heavy is the bag of apples?"
        },
        {
          "id": "dogV",
          "label": "How heavy is the dog?"
        }
      ],
      "mc": {
        "prompt": "Leo asks how much milk is in a heavy jug. What should he measure?",
        "choices": [
          {
            "id": "yes",
            "text": "Liquid volume"
          },
          {
            "id": "trap",
            "text": "Weight, because the jug is heavy"
          },
          {
            "id": "no",
            "text": "Length"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the questions about weight.",
        "choices": [
          {
            "id": "sugar",
            "text": "How heavy is the bag of sugar?"
          },
          {
            "id": "cereal",
            "text": "How heavy is the box of cereal?"
          },
          {
            "id": "cup",
            "text": "How much juice is in the cup?"
          },
          {
            "id": "tall",
            "text": "How tall is the bottle of water?"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the question wants to find out"
          },
          {
            "id": "trap",
            "text": "whether the thing can pour"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.7B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Around or inside?",
    "teks": "3.7B",
    "defs": [
      [
        {
          "term": "Perimeter",
          "text": "The distance all the way around the outside of a shape."
        },
        {
          "term": "Area",
          "text": "How much space covers the inside of a flat shape. It is counted in square units."
        }
      ],
      [
        {
          "term": "Perimeter",
          "text": "The distance all the way around the outside of a shape."
        },
        {
          "term": "Area",
          "text": "How much space covers the inside of a flat shape. It is counted in square units."
        },
        {
          "term": "Neither",
          "text": "The job does not need perimeter or area."
        }
      ],
      [
        {
          "term": "Perimeter",
          "text": "The distance all the way around the outside of a shape."
        },
        {
          "term": "A garden job",
          "text": "The job is done in or at a garden."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what each job needs.",
        "notThis": "The thing does not decide. The job does. Does it go around, or cover inside?",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          }
        ],
        "items": [
          {
            "id": "fence",
            "label": "Mom puts a fence around the garden.",
            "clue": "It is a garden"
          },
          {
            "id": "grass",
            "label": "Dad covers the whole garden with new grass.",
            "clue": "It is a garden"
          },
          {
            "id": "ribbon",
            "label": "Kim glues ribbon along the edge of her picture.",
            "clue": "Ribbon is flat"
          },
          {
            "id": "rug",
            "label": "Find how much floor the rug covers.",
            "clue": "The rug has fringe on its edges"
          },
          {
            "id": "tiles",
            "label": "Lay square tiles over the kitchen floor.",
            "clue": "Each tile has four edges"
          },
          {
            "id": "tape",
            "label": "Put tape around the edge of the rug.",
            "clue": "It is a rug"
          }
        ]
      },
      {
        "rule": "Sort by what each job needs. Some need neither.",
        "notThis": "Not every job needs perimeter or area. Read what the job asks you to find.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "border",
            "label": "Staple a border around the bulletin board.",
            "clue": "It is on a wall"
          },
          {
            "id": "paper",
            "label": "Cover the whole bulletin board with paper.",
            "clue": "It is on a wall"
          },
          {
            "id": "park",
            "label": "Find how far it is around the edge of the park.",
            "clue": "A park is big"
          },
          {
            "id": "flowers",
            "label": "Plant flowers to fill the whole flower bed.",
            "clue": "Flowers, not grass"
          },
          {
            "id": "soil",
            "label": "Find how heavy the bag of garden soil is.",
            "clue": "It is for the garden"
          },
          {
            "id": "mow",
            "label": "Find how long it takes to mow the yard.",
            "clue": "Mowing covers the whole yard"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "per",
          "text": "Perimeter"
        },
        {
          "id": "garden",
          "text": "A garden job"
        }
      ],
      "items": [
        {
          "id": "fenceV",
          "label": "Put a fence around the garden."
        },
        {
          "id": "rocksV",
          "label": "Line the edge of the garden with rocks."
        },
        {
          "id": "frameV",
          "label": "Put a frame around a poster."
        },
        {
          "id": "laceV",
          "label": "Sew lace around a pillow."
        },
        {
          "id": "strawV",
          "label": "Spread straw over the whole garden."
        },
        {
          "id": "clothV",
          "label": "Cover the whole table with a tablecloth."
        }
      ],
      "mc": {
        "prompt": "Ana wants grass on her whole garden. Her garden has a fence. What does she need to know?",
        "choices": [
          {
            "id": "yes",
            "text": "The area of the garden"
          },
          {
            "id": "trap",
            "text": "The perimeter, because the garden has a fence"
          },
          {
            "id": "no",
            "text": "How heavy the garden is"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the jobs that need perimeter.",
        "choices": [
          {
            "id": "yard",
            "text": "Put a fence around a yard"
          },
          {
            "id": "card",
            "text": "Glue lace around the edge of a card"
          },
          {
            "id": "wall",
            "text": "Paint a whole wall"
          },
          {
            "id": "floor",
            "text": "Cover a floor with carpet"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the job goes around or covers inside"
          },
          {
            "id": "trap",
            "text": "what thing the job is about"
          }
        ]
      }
    }
  },
  {
    "id": "MA-3.9C-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Planned or not?",
    "teks": "3.9C",
    "defs": [
      [
        {
          "term": "Planned spending",
          "text": "The buyer decided to buy it ahead of time. It was already on a list or part of a plan."
        },
        {
          "term": "Unplanned spending",
          "text": "The buyer decided to buy it in the moment. The buyer did not plan it before shopping."
        }
      ],
      [
        {
          "term": "Planned spending",
          "text": "The buyer decided to buy it ahead of time. It was already on a list or part of a plan."
        },
        {
          "term": "Unplanned spending",
          "text": "The buyer decided to buy it in the moment. The buyer did not plan it before shopping."
        },
        {
          "term": "Neither",
          "text": "Nobody spends money to buy anything. The money is saved or given as a gift."
        }
      ],
      [
        {
          "term": "Planned",
          "text": "The buyer decided to buy it before going shopping."
        },
        {
          "term": "Costs more than $10",
          "text": "The price of the item is more than ten dollars."
        },
        {
          "term": "Center",
          "text": "Both labels are true for this card."
        },
        {
          "term": "Outside",
          "text": "Neither label is true for this card."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each purchase by when the buyer decided to buy.",
        "notThis": "The price does not decide the group. Think about the buyer's plan.",
        "groups": [
          {
            "id": "plan",
            "label": "Planned spending"
          },
          {
            "id": "unplan",
            "label": "Unplanned spending"
          }
        ],
        "items": [
          {
            "id": "glue",
            "label": "Maya wrote glue sticks on her list. Later she bought them at the store.",
            "clue": "They cost very little"
          },
          {
            "id": "robot",
            "label": "Ben noticed a giant toy robot at the mall. He bought it right away.",
            "clue": "It cost a lot of money"
          },
          {
            "id": "bike",
            "label": "Sam saved his allowance for weeks. Then he bought a new bike.",
            "clue": "It took a long time"
          },
          {
            "id": "candy",
            "label": "Lily saw a candy bar in the checkout line. She bought it right then.",
            "clue": "It was only one dollar"
          },
          {
            "id": "bread",
            "label": "Dad wrote a shopping list at home. Then he bought milk and bread.",
            "clue": "Just food from the store"
          },
          {
            "id": "shirt",
            "label": "Jen noticed a pretty shirt on sale. She bought it on the spot.",
            "clue": "It was on sale"
          }
        ]
      },
      {
        "rule": "Sort by when the buyer decided. Some spend no money.",
        "notThis": "Money can move from person to person without anyone buying something.",
        "groups": [
          {
            "id": "plan",
            "label": "Planned spending"
          },
          {
            "id": "unplan",
            "label": "Unplanned spending"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "book",
            "label": "Omar saved eight dollars for the book fair. Then he bought the book he wanted.",
            "clue": "The fair had lots of books"
          },
          {
            "id": "card",
            "label": "Mom's shopping list said birthday card. She bought one at the store.",
            "clue": "A card is cheap"
          },
          {
            "id": "tv",
            "label": "Grandpa noticed a new TV at the store. He bought it that same day.",
            "clue": "A TV costs a lot"
          },
          {
            "id": "toy",
            "label": "Ava noticed a little toy by the register. She bought it.",
            "clue": "It was a small toy"
          },
          {
            "id": "bank",
            "label": "Zoe put all of her birthday money into her piggy bank.",
            "clue": "It was a lot of money"
          },
          {
            "id": "rake",
            "label": "Grandma gave Leo five dollars for his birthday.",
            "clue": "He got money"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "plan",
          "text": "Planned"
        },
        {
          "id": "big",
          "text": "Costs more than $10"
        }
      ],
      "items": [
        {
          "id": "bikeV",
          "label": "Sam saved his money for weeks. Then he bought a $90 bike."
        },
        {
          "id": "zooV",
          "label": "The family planned ahead for a $30 visit to the zoo."
        },
        {
          "id": "glueV",
          "label": "Glue was on Mom's shopping list. She paid $2 for it."
        },
        {
          "id": "robotV",
          "label": "Ben noticed a $40 robot and bought it right away."
        },
        {
          "id": "candyV",
          "label": "Lily bought a $1 candy bar while waiting at the checkout."
        },
        {
          "id": "stickV",
          "label": "Kai noticed $3 stickers at the register and bought them."
        }
      ],
      "mc": {
        "prompt": "Grandpa noticed a TV at the store and bought it that day. It cost a lot of money. What kind of spending is it?",
        "choices": [
          {
            "id": "yes",
            "text": "Unplanned, because he decided while he was at the store."
          },
          {
            "id": "trap",
            "text": "Planned, because the TV cost a lot of money."
          },
          {
            "id": "no",
            "text": "Saving, because a TV will last a long time."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the benefits that come from planned spending.",
        "choices": [
          {
            "id": "need",
            "text": "You have money left over for the things you need."
          },
          {
            "id": "big",
            "text": "You can save up over time for something big."
          },
          {
            "id": "never",
            "text": "You never have to make any choices about money."
          },
          {
            "id": "grab",
            "text": "You get to grab a surprise treat at the register."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "when the buyer decided to buy"
          },
          {
            "id": "trap",
            "text": "how much the thing cost"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.3C-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Natural or made by people?",
    "teks": "3.3C",
    "defs": [
      [
        {
          "term": "Natural feature",
          "text": "A feature of the land or water that nature made, not people."
        },
        {
          "term": "Human-made feature",
          "text": "A feature of the land or water that people built or shaped."
        }
      ],
      [
        {
          "term": "Natural feature",
          "text": "A feature of the land or water that nature made, not people."
        },
        {
          "term": "Human-made feature",
          "text": "A feature of the land or water that people built or shaped."
        },
        {
          "term": "Neither",
          "text": "It is not a feature of the land. It is weather that comes and goes quickly."
        }
      ],
      [
        {
          "term": "Human-made feature",
          "text": "A feature of the land or water that people built or shaped."
        },
        {
          "term": "Has water",
          "text": "Water is an important part of this feature."
        },
        {
          "term": "Center",
          "text": "Both labels are true about this feature."
        },
        {
          "term": "Outside",
          "text": "Neither label is true about this feature."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each feature by who or what made it.",
        "notThis": "Being green or wet does not make a place natural. Ask who or what really made it.",
        "groups": [
          {
            "id": "nat",
            "label": "Natural feature"
          },
          {
            "id": "human",
            "label": "Human-made feature"
          }
        ],
        "items": [
          {
            "id": "enchanted",
            "label": "Enchanted Rock",
            "clue": "A huge pink rock dome"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon",
            "clue": "Deep red rock walls"
          },
          {
            "id": "dunes",
            "label": "Sand dunes on Padre Island",
            "clue": "Sand piled into hills"
          },
          {
            "id": "travis",
            "label": "Lake Travis, held back by a dam",
            "clue": "Blue water and green hills"
          },
          {
            "id": "citypark",
            "label": "A city park with planted trees",
            "clue": "Grass, trees, and a pond"
          },
          {
            "id": "cornfield",
            "label": "A cornfield",
            "clue": "Green plants in the dirt"
          }
        ]
      },
      {
        "rule": "Sort each feature by who or what made it. Some are not part of the land.",
        "notThis": "Some things you notice outdoors are not features of the land or water.",
        "groups": [
          {
            "id": "nat",
            "label": "Natural feature"
          },
          {
            "id": "human",
            "label": "Human-made feature"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rio",
            "label": "The Rio Grande",
            "clue": "It is a border line"
          },
          {
            "id": "hamilton",
            "label": "Hamilton Pool, a rock swimming hole",
            "clue": "People swim there"
          },
          {
            "id": "treefarm",
            "label": "A tree farm",
            "clue": "Full of trees"
          },
          {
            "id": "stocktank",
            "label": "A stock tank dug for cows",
            "clue": "Frogs and fish live there"
          },
          {
            "id": "rain",
            "label": "A rainstorm",
            "clue": "Water falls on the land"
          },
          {
            "id": "lightning",
            "label": "Lightning",
            "clue": "It can start a fire"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "human",
          "text": "Human-made feature"
        },
        {
          "id": "water",
          "text": "Has water"
        }
      ],
      "items": [
        {
          "id": "canyonlakeV",
          "label": "Canyon Lake, held back by a dam"
        },
        {
          "id": "canalV",
          "label": "A canal that brings water to farms"
        },
        {
          "id": "fallsV",
          "label": "Pedernales Falls"
        },
        {
          "id": "riverV",
          "label": "The Rio Grande in Santa Elena Canyon"
        },
        {
          "id": "highwayV",
          "label": "A highway"
        },
        {
          "id": "peakV",
          "label": "Guadalupe Peak"
        }
      ],
      "mc": {
        "prompt": "Lake Travis looks like it has always been there. Is it a natural feature?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because people built a dam to make the lake."
          },
          {
            "id": "trap",
            "text": "Yes, because it has water, fish, and green hills."
          },
          {
            "id": "no",
            "text": "No, because it is a kind of weather."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the features that people made.",
        "choices": [
          {
            "id": "dam",
            "text": "A lake held back by a dam."
          },
          {
            "id": "rows",
            "text": "A tree farm planted in rows."
          },
          {
            "id": "canyon",
            "text": "A canyon cut by a river."
          },
          {
            "id": "storm",
            "text": "A rainstorm over the hills."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who or what made it"
          },
          {
            "id": "trap",
            "text": "how green and wild it looks"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.4A-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Which way?",
    "teks": "3.4A",
    "defs": [
      [
        {
          "term": "Cardinal direction",
          "text": "It is north, south, east, or west. These are the four main directions on a map."
        },
        {
          "term": "Intermediate direction",
          "text": "A direction that is halfway between two cardinal directions. Its name joins two of them together."
        }
      ],
      [
        {
          "term": "Cardinal direction",
          "text": "It is north, south, east, or west. These are the four main directions on a map."
        },
        {
          "term": "Intermediate direction",
          "text": "A direction that is halfway between two cardinal directions. Its name joins two of them together."
        },
        {
          "term": "Neither",
          "text": "It tells about position, but it is not a map direction."
        }
      ],
      [
        {
          "term": "Cardinal direction",
          "text": "It is north, south, east, or west. These are the four main directions on a map."
        },
        {
          "term": "Has \"north\" in it",
          "text": "The direction word has the word north somewhere inside it."
        },
        {
          "term": "Center",
          "text": "Both labels are true for this sentence."
        },
        {
          "term": "Outside",
          "text": "Neither label is true for this sentence."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each sentence by the kind of direction it uses.",
        "notThis": "Do not stop reading at the first part of the word. Read the whole direction word.",
        "groups": [
          {
            "id": "card",
            "label": "Cardinal direction"
          },
          {
            "id": "inter",
            "label": "Intermediate direction"
          }
        ],
        "items": [
          {
            "id": "park",
            "label": "The park is north of the school.",
            "clue": "Toward the top of most maps"
          },
          {
            "id": "pond",
            "label": "The pond is west of the barn.",
            "clue": "Where the sun sets"
          },
          {
            "id": "store",
            "label": "The store is south of the bank.",
            "clue": "Toward the bottom of most maps"
          },
          {
            "id": "zoo",
            "label": "The zoo is northwest of the city.",
            "clue": "It starts with north"
          },
          {
            "id": "lake",
            "label": "The lake is northeast of the park.",
            "clue": "It starts with north"
          },
          {
            "id": "farm",
            "label": "The farm is southeast of the town.",
            "clue": "It has the word east"
          }
        ]
      },
      {
        "rule": "Sort each sentence by the kind of direction. Some are not map directions.",
        "notThis": "Some words tell about location, but they are not map directions.",
        "groups": [
          {
            "id": "card",
            "label": "Cardinal direction"
          },
          {
            "id": "inter",
            "label": "Intermediate direction"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "busstop",
            "label": "The bus stop is east of the school.",
            "clue": "Where the sun rises"
          },
          {
            "id": "river",
            "label": "Walk south to get to the river.",
            "clue": "It is only one word"
          },
          {
            "id": "fort",
            "label": "The fort is southwest of the hill.",
            "clue": "It starts with south"
          },
          {
            "id": "trail",
            "label": "The trail bends to the northwest.",
            "clue": "North comes first"
          },
          {
            "id": "swings",
            "label": "The swings are to the left of the slide.",
            "clue": "It tells which way to go"
          },
          {
            "id": "ball",
            "label": "The ball is behind the fence.",
            "clue": "It tells where something is"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "card",
          "text": "Cardinal direction"
        },
        {
          "id": "north",
          "text": "Has \"north\" in it"
        }
      ],
      "items": [
        {
          "id": "campV",
          "label": "The camp is north of the lake."
        },
        {
          "id": "barnV",
          "label": "The barn is east of the house."
        },
        {
          "id": "gymV",
          "label": "The gym is west of the library."
        },
        {
          "id": "mallV",
          "label": "The mall is northeast of the airport."
        },
        {
          "id": "museumV",
          "label": "The museum is northwest of the river."
        },
        {
          "id": "pierV",
          "label": "The pier is southeast of the beach."
        }
      ],
      "mc": {
        "prompt": "Ana says northwest is a cardinal direction, because it has north in it. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because northwest is halfway between north and west."
          },
          {
            "id": "trap",
            "text": "Yes, because it has the word north in it."
          },
          {
            "id": "no",
            "text": "No, because it is not a map direction."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the intermediate directions.",
        "choices": [
          {
            "id": "ne",
            "text": "Northeast"
          },
          {
            "id": "sw",
            "text": "Southwest"
          },
          {
            "id": "s",
            "text": "South"
          },
          {
            "id": "l",
            "text": "Left"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "main directions and in-between directions"
          },
          {
            "id": "trap",
            "text": "which word the direction starts with"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.5A-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Where does the money go?",
    "teks": "3.5A",
    "defs": [
      [
        {
          "term": "Saving",
          "text": "Keeping money to use later."
        },
        {
          "term": "Donating",
          "text": "Giving money to help others, like a charity. You get nothing back."
        }
      ],
      [
        {
          "term": "Saving",
          "text": "Keeping money to use later."
        },
        {
          "term": "Donating",
          "text": "Giving money to help others, like a charity. You get nothing back."
        },
        {
          "term": "Neither",
          "text": "The money is spent or earned. It is not saved or given away."
        }
      ],
      [
        {
          "term": "Saving",
          "text": "Keeping money to use later."
        },
        {
          "term": "At a bank",
          "text": "A bank is a business that keeps people's money safe."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what happens to the money.",
        "notThis": "Who the money is for is not the rule. Where does it go?",
        "groups": [
          {
            "id": "save",
            "label": "Saving"
          },
          {
            "id": "donate",
            "label": "Donating"
          }
        ],
        "items": [
          {
            "id": "mia",
            "label": "Mia puts $5 in a jar for Mom's gift next month.",
            "clue": "It is for someone else"
          },
          {
            "id": "sam",
            "label": "Sam puts his birthday money in the bank.",
            "clue": "It was a gift to him"
          },
          {
            "id": "ben",
            "label": "Ben keeps $2 each week for a new bike.",
            "clue": "He wants to buy something"
          },
          {
            "id": "leo",
            "label": "Leo gives $3 to the food bank.",
            "clue": "It has the word bank"
          },
          {
            "id": "ava",
            "label": "Ava gives $10 to help an animal shelter.",
            "clue": "She loves animals"
          },
          {
            "id": "class",
            "label": "The class collects coins for kids hurt by a flood.",
            "clue": "They put the coins in a jar"
          }
        ]
      },
      {
        "rule": "Sort by what happens to the money. Some are neither.",
        "notThis": "Money can do more than two things. Read closely.",
        "groups": [
          {
            "id": "save",
            "label": "Saving"
          },
          {
            "id": "donate",
            "label": "Donating"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "kim",
            "label": "Kim keeps $20 in the bank for next summer's camp.",
            "clue": "Camp costs money"
          },
          {
            "id": "lily",
            "label": "Grandpa helps Lily open a bank account for college.",
            "clue": "Grandpa gives some money"
          },
          {
            "id": "nora",
            "label": "Nora gives $5 to help plant trees in a park.",
            "clue": "The park is for everyone"
          },
          {
            "id": "tom",
            "label": "Tom gives $2 to the school coin drive for a hospital.",
            "clue": "He drops coins in a big jar"
          },
          {
            "id": "jay",
            "label": "Jay buys a snack at the store.",
            "clue": "He uses his own money"
          },
          {
            "id": "zoe",
            "label": "Zoe gets $5 for walking a dog.",
            "clue": "She works hard for it"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "save",
          "text": "Saving"
        },
        {
          "id": "bank",
          "text": "At a bank"
        }
      ],
      "items": [
        {
          "id": "sethV",
          "label": "Seth puts $10 into his bank account."
        },
        {
          "id": "ellaV",
          "label": "Ella puts her allowance in the bank for later."
        },
        {
          "id": "maxV",
          "label": "Max hides $5 in a sock for a trip."
        },
        {
          "id": "jarV",
          "label": "Rosa keeps coins in a jar for a gift."
        },
        {
          "id": "dadV",
          "label": "Dad takes money out of the bank to buy shoes."
        },
        {
          "id": "anaV",
          "label": "Ana gives $4 to a food bank."
        }
      ],
      "mc": {
        "prompt": "Mia puts money in a jar. She will buy Mom a gift next month. What is she doing?",
        "choices": [
          {
            "id": "yes",
            "text": "Saving"
          },
          {
            "id": "trap",
            "text": "Donating, because it is for someone else"
          },
          {
            "id": "no",
            "text": "Earning"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that are donating.",
        "choices": [
          {
            "id": "shelter",
            "text": "Give $5 to an animal shelter"
          },
          {
            "id": "flood",
            "text": "Give coins to help flood victims"
          },
          {
            "id": "piggy",
            "text": "Put $5 in a piggy bank for a gift"
          },
          {
            "id": "toy",
            "text": "Buy a toy at the store"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the money"
          },
          {
            "id": "trap",
            "text": "who the money is for"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.14B-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Was the author there?",
    "teks": "3.14B",
    "defs": [
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there."
        },
        {
          "term": "Neither",
          "text": "It is not about the first Moon landing."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "Has a picture",
          "text": "It shows a photo, a video, or a drawing."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by who made each source.",
        "notThis": "Old does not mean primary. Ask: was the maker there?",
        "groups": [
          {
            "id": "prim",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "moonphoto",
            "label": "A photo an astronaut took on the Moon in 1969",
            "clue": "It shows the gray Moon"
          },
          {
            "id": "words",
            "label": "Neil Armstrong's words as he stepped onto the Moon",
            "clue": "Only one short sentence"
          },
          {
            "id": "aldrinbook",
            "label": "A book Buzz Aldrin wrote about his trip",
            "clue": "Written years after the trip"
          },
          {
            "id": "kidsbook",
            "label": "A kids' book about the Moon landing, printed in 2019",
            "clue": "Full of true facts"
          },
          {
            "id": "encyc",
            "label": "An encyclopedia page about the landing, printed in 1975",
            "clue": "Very old, with yellow pages"
          },
          {
            "id": "actor",
            "label": "A still from a 2018 movie about the landing",
            "clue": "It is a real photo"
          }
        ]
      },
      {
        "rule": "Sort by who made each source. Some are not about the landing.",
        "notThis": "A photo is primary only if it was taken there.",
        "groups": [
          {
            "id": "prim",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "tv",
            "label": "Live TV video sent from the Moon in 1969",
            "clue": "Blurry and black and white"
          },
          {
            "id": "control",
            "label": "A recording of Mission Control talking to the astronauts",
            "clue": "Recorded on Earth, not the Moon"
          },
          {
            "id": "painting",
            "label": "A painting of the landing, made in 2020",
            "clue": "Bright and full of detail"
          },
          {
            "id": "website",
            "label": "A museum website about the landing",
            "clue": "It has real 1969 photos"
          },
          {
            "id": "baseball",
            "label": "A 1969 photo of a baseball game",
            "clue": "Taken the same year"
          },
          {
            "id": "phases",
            "label": "A science book about the Moon's phases",
            "clue": "All about the Moon"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "prim",
          "text": "Primary source"
        },
        {
          "id": "pic",
          "text": "Has a picture"
        }
      ],
      "items": [
        {
          "id": "footV",
          "label": "A photo of a bootprint, taken on the Moon"
        },
        {
          "id": "tvV",
          "label": "Live TV video of the astronauts on the Moon"
        },
        {
          "id": "stepV",
          "label": "A sound recording of Neil Armstrong's first words"
        },
        {
          "id": "radioV",
          "label": "A sound recording of Mission Control during the landing"
        },
        {
          "id": "drawV",
          "label": "A drawing of the landing in a 2019 kids' book"
        },
        {
          "id": "textV",
          "label": "A textbook paragraph about the landing, with no pictures"
        }
      ],
      "mc": {
        "prompt": "A book about the landing was printed in 1975. The writer was not there. What is it?",
        "choices": [
          {
            "id": "yes",
            "text": "A secondary source"
          },
          {
            "id": "trap",
            "text": "A primary source, because it is old"
          },
          {
            "id": "no",
            "text": "Not about the landing"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the primary sources about the Moon landing.",
        "choices": [
          {
            "id": "photo",
            "text": "Photos the astronauts took on the Moon"
          },
          {
            "id": "voice",
            "text": "Neil Armstrong's words from the Moon"
          },
          {
            "id": "kid",
            "text": "A 2019 kids' book about the landing"
          },
          {
            "id": "sci",
            "text": "A science book about the Moon's craters"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who made the source"
          },
          {
            "id": "trap",
            "text": "how old the source is"
          }
        ]
      }
    }
  },
  {
    "id": "SS-3.15C-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "How long ago?",
    "teks": "3.15C",
    "defs": [
      [
        {
          "term": "A decade",
          "text": "A period of time that lasts 10 years in a row."
        },
        {
          "term": "A century",
          "text": "A period of time that lasts 100 years in a row."
        }
      ],
      [
        {
          "term": "A decade",
          "text": "A period of time that lasts 10 years in a row."
        },
        {
          "term": "A century",
          "text": "A period of time that lasts 100 years in a row."
        },
        {
          "term": "Neither",
          "text": "It lasts about one year, so it is not a decade or a century."
        }
      ],
      [
        {
          "term": "A decade",
          "text": "A period of time that lasts 10 years in a row."
        },
        {
          "term": "From 1900 to 1999",
          "text": "It happened in one of the years from 1900 to 1999."
        },
        {
          "term": "Center",
          "text": "Both labels are true for this card."
        },
        {
          "term": "Outside",
          "text": "Neither label is true for this card."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each one by how many years it lasts.",
        "notThis": "Do not stop reading after the first two digits. Read the whole number carefully.",
        "groups": [
          {
            "id": "dec",
            "label": "A decade"
          },
          {
            "id": "cent",
            "label": "A century"
          }
        ],
        "items": [
          {
            "id": "ten",
            "label": "Ten years",
            "clue": "A small number"
          },
          {
            "id": "s1990",
            "label": "From 1990 to 2000",
            "clue": "It starts with 19"
          },
          {
            "id": "y2010",
            "label": "From 2010 to 2020",
            "clue": "It uses big numbers"
          },
          {
            "id": "hundred",
            "label": "One hundred years",
            "clue": "Just a 1 and two zeros"
          },
          {
            "id": "s1900",
            "label": "From 1900 to 2000",
            "clue": "It starts with 19"
          },
          {
            "id": "s1800",
            "label": "The years 1800 through 1899",
            "clue": "It begins in 1800"
          }
        ]
      },
      {
        "rule": "Sort by how many years it lasts. Some fit neither group.",
        "notThis": "A bigger number does not always mean a longer time.",
        "groups": [
          {
            "id": "dec",
            "label": "A decade"
          },
          {
            "id": "cent",
            "label": "A century"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "s2010",
            "label": "The 2010s",
            "clue": "Not long ago"
          },
          {
            "id": "y1950",
            "label": "From 1950 to 1960",
            "clue": "Long before you were born"
          },
          {
            "id": "y1900",
            "label": "From 1920 to 2020",
            "clue": "It does not end in 00"
          },
          {
            "id": "s1700",
            "label": "The years 1700 through 1799",
            "clue": "Long, long ago"
          },
          {
            "id": "months",
            "label": "Twelve months",
            "clue": "More than ten"
          },
          {
            "id": "y2023",
            "label": "From 2023 to 2024",
            "clue": "It uses big numbers"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "dec",
          "text": "A decade"
        },
        {
          "id": "nine",
          "text": "From 1900 to 1999"
        }
      ],
      "items": [
        {
          "id": "s1990V",
          "label": "The 1990s"
        },
        {
          "id": "s1960V",
          "label": "The 1960s"
        },
        {
          "id": "s2010V",
          "label": "The 2010s"
        },
        {
          "id": "y1969V",
          "label": "The year 1969"
        },
        {
          "id": "y1945V",
          "label": "The year 1945"
        },
        {
          "id": "s1700V",
          "label": "The years 1700 through 1799"
        }
      ],
      "mc": {
        "prompt": "Maria reads about the years from 1900 to 2000. Is that a decade or a century?",
        "choices": [
          {
            "id": "yes",
            "text": "A century, because it lasts 100 years."
          },
          {
            "id": "trap",
            "text": "A decade, because it looks like 1990 to 2000."
          },
          {
            "id": "no",
            "text": "A single year, because it starts in 1900."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all of the time periods that are a decade.",
        "choices": [
          {
            "id": "d80",
            "text": "The 1980s"
          },
          {
            "id": "d2000",
            "text": "From 2000 to 2010"
          },
          {
            "id": "c1800",
            "text": "The years 1800 through 1899"
          },
          {
            "id": "c100",
            "text": "One hundred years"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how many years it lasts"
          },
          {
            "id": "trap",
            "text": "what number it starts with"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.7-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Which force?",
    "teks": "4.7",
    "defs": [
      [
        {
          "term": "Gravity",
          "text": "A pull toward the center of Earth, which works even when nothing is touching."
        },
        {
          "term": "Friction",
          "text": "A force between two surfaces that rub together, which slows or stops motion."
        }
      ],
      [
        {
          "term": "Gravity",
          "text": "A pull toward the center of Earth, which works even when nothing is touching."
        },
        {
          "term": "Friction",
          "text": "A force between two surfaces that rub together, which slows or stops motion."
        },
        {
          "term": "Neither",
          "text": "A different force is at work instead, such as magnetism, which pulls on certain metals."
        }
      ],
      [
        {
          "term": "Slows things down",
          "text": "The force makes a moving object go slower or come to a stop."
        },
        {
          "term": "Needs contact",
          "text": "The force works only when two objects are touching each other."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each card by the main force that is at work.",
        "notThis": "Slowing down is not always caused by gravity, so ask what is rubbing together.",
        "groups": [
          {
            "id": "grav",
            "label": "Gravity"
          },
          {
            "id": "fric",
            "label": "Friction"
          }
        ],
        "items": [
          {
            "id": "apple",
            "label": "A ripe apple breaks off its branch and drops straight to the ground.",
            "clue": "It stops when it hits the grass."
          },
          {
            "id": "rain",
            "label": "Drops of rain fall from the clouds all the way to the ground.",
            "clue": "Clouds are very high up"
          },
          {
            "id": "toss",
            "label": "When a ball is thrown straight up into the air, it comes back down.",
            "clue": "It went up first"
          },
          {
            "id": "grass",
            "label": "A ball rolls across the grass and gradually comes to a stop.",
            "clue": "Nobody stopped it"
          },
          {
            "id": "sled",
            "label": "A sled slides across flat snow and slowly loses speed.",
            "clue": "Snow is slippery"
          },
          {
            "id": "brakes",
            "label": "A rider squeezes the brakes, and the bike comes to a stop.",
            "clue": "You squeeze a lever"
          }
        ]
      },
      {
        "rule": "Sort by the main force at work. Some cards show a different force.",
        "notThis": "Gravity is not the only force that can pull on an object without touching it.",
        "groups": [
          {
            "id": "grav",
            "label": "Gravity"
          },
          {
            "id": "fric",
            "label": "Friction"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "river",
            "label": "A river flows downhill from the mountains, and it eventually reaches the ocean.",
            "clue": "Water is a liquid"
          },
          {
            "id": "book",
            "label": "A book slides off the edge of a desk and lands on the floor.",
            "clue": "It fell by itself"
          },
          {
            "id": "hands",
            "label": "You rub your hands together quickly, and they start to feel warm.",
            "clue": "Your hands stay in place"
          },
          {
            "id": "shoes",
            "label": "A player's sneakers grip the gym floor instead of slipping.",
            "clue": "Rubber soles"
          },
          {
            "id": "clips",
            "label": "A magnet picks up a pile of paper clips from the table.",
            "clue": "It pulls without touching"
          },
          {
            "id": "compass",
            "label": "A compass needle swings around to point north.",
            "clue": "It spins, then stops"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "slow",
          "text": "Slows things down"
        },
        {
          "id": "touch",
          "text": "Needs contact"
        }
      ],
      "items": [
        {
          "id": "brakesV",
          "label": "Bike brakes press against a spinning wheel and slow it down."
        },
        {
          "id": "rugV",
          "label": "A toy car rolls from the smooth floor onto a thick rug and slows down."
        },
        {
          "id": "upV",
          "label": "A ball tossed into the air slows down as it rises."
        },
        {
          "id": "kickV",
          "label": "A player's foot kicks a soccer ball across the field."
        },
        {
          "id": "coconutV",
          "label": "A coconut drops from the top of a tall palm tree."
        },
        {
          "id": "magnetV",
          "label": "A magnet pulls a paper clip up off the table."
        }
      ],
      "mc": {
        "prompt": "A sled slides across flat snow, and it gradually slows down and stops. Which force slowed it?",
        "choices": [
          {
            "id": "yes",
            "text": "Friction between the bottom of the sled and the snow."
          },
          {
            "id": "trap",
            "text": "Gravity, because gravity pulls things down toward Earth."
          },
          {
            "id": "no",
            "text": "Magnetism coming from the snow under the sled."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the forces that can act on an object without touching it.",
        "choices": [
          {
            "id": "grav",
            "text": "Gravity"
          },
          {
            "id": "mag",
            "text": "Magnetism"
          },
          {
            "id": "fric",
            "text": "Friction"
          },
          {
            "id": "push",
            "text": "A push from your hand"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which force is doing the work"
          },
          {
            "id": "trap",
            "text": "whether the thing slows down"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.10A-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Up or down the cycle",
    "teks": "4.10A",
    "defs": [
      [
        {
          "term": "Evaporation",
          "text": "Liquid water changes into water vapor. Water vapor is a gas you cannot see."
        },
        {
          "term": "Condensation",
          "text": "Water vapor cools and changes into tiny drops of liquid water."
        }
      ],
      [
        {
          "term": "Evaporation",
          "text": "Liquid water changes into water vapor. Water vapor is a gas you cannot see."
        },
        {
          "term": "Condensation",
          "text": "Water vapor cools and changes into tiny drops of liquid water."
        },
        {
          "term": "Neither",
          "text": "Water moves to a new place, but it does not change from liquid to gas or gas to liquid."
        }
      ],
      [
        {
          "term": "Sun is heating it",
          "text": "Right now, sunlight is giving the water energy to warm it."
        },
        {
          "term": "Liquid turns to gas",
          "text": "Liquid water changes into water vapor. Water vapor is a gas you cannot see."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by how the water changes.",
        "notThis": "Water vapor is invisible. If you can see it, look again.",
        "groups": [
          {
            "id": "evap",
            "label": "Evaporation"
          },
          {
            "id": "cond",
            "label": "Condensation"
          }
        ],
        "items": [
          {
            "id": "puddle",
            "label": "A puddle dries up on a sunny day",
            "clue": "The water seems to vanish"
          },
          {
            "id": "clothes",
            "label": "Wet clothes dry on a clothesline",
            "clue": "The wind is blowing"
          },
          {
            "id": "sidewalk",
            "label": "A wet sidewalk dries after rain",
            "clue": "The Sun came out"
          },
          {
            "id": "dew",
            "label": "Dew forms on grass in the morning",
            "clue": "It looks like it rained"
          },
          {
            "id": "glass",
            "label": "Drops form on a glass of ice water",
            "clue": "The glass looks like it leaks"
          },
          {
            "id": "pot",
            "label": "The white cloud above a boiling pot",
            "clue": "The pot is boiling"
          }
        ]
      },
      {
        "rule": "Sort by how the water changes. Some do not change state.",
        "notThis": "Moving through the cycle is not the same as changing state.",
        "groups": [
          {
            "id": "evap",
            "label": "Evaporation"
          },
          {
            "id": "cond",
            "label": "Condensation"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "salt",
            "label": "Seawater dries and leaves salt behind",
            "clue": "Something is left over"
          },
          {
            "id": "bowl",
            "label": "A dog's water bowl gets lower on a hot day",
            "clue": "The dog stayed inside"
          },
          {
            "id": "mirror",
            "label": "A bathroom mirror fogs up",
            "clue": "Hot shower water"
          },
          {
            "id": "breath",
            "label": "Your breath makes a cloud on a cold day",
            "clue": "It is warm air from inside you"
          },
          {
            "id": "rain",
            "label": "Rain falls from a dark cloud",
            "clue": "Water drops are moving"
          },
          {
            "id": "runoff",
            "label": "Rainwater flows down a street into a lake",
            "clue": "It is on the move"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "sun",
          "text": "Sun is heating it"
        },
        {
          "id": "gas",
          "text": "Liquid turns to gas"
        }
      ],
      "items": [
        {
          "id": "puddleV",
          "label": "A puddle dries in the sunshine"
        },
        {
          "id": "towelV",
          "label": "A wet towel dries on a sunny beach"
        },
        {
          "id": "snowV",
          "label": "Sunshine melts snow on a roof"
        },
        {
          "id": "stoveV",
          "label": "Water boils away in a pot on a stove"
        },
        {
          "id": "dryerV",
          "label": "A clothes dryer dries wet socks"
        },
        {
          "id": "dewV",
          "label": "Dew forms on a car at night"
        }
      ],
      "mc": {
        "prompt": "Water boils in a pot. You see a white cloud above it. What is the white cloud?",
        "choices": [
          {
            "id": "yes",
            "text": "Tiny drops of liquid water that condensed"
          },
          {
            "id": "trap",
            "text": "Water vapor, which is a gas"
          },
          {
            "id": "no",
            "text": "Smoke from the stove"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all that show condensation.",
        "choices": [
          {
            "id": "dew",
            "text": "Dew on grass"
          },
          {
            "id": "can",
            "text": "Drops on a cold can"
          },
          {
            "id": "puddle",
            "text": "A puddle drying up"
          },
          {
            "id": "mirror",
            "text": "A foggy mirror"
          },
          {
            "id": "rain",
            "text": "Rain falling"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether water becomes a gas or liquid drops"
          },
          {
            "id": "trap",
            "text": "whether you can see the water"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.10B-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Break, move, drop",
    "teks": "4.10B",
    "defs": [
      [
        {
          "term": "Weathering",
          "text": "Rock gradually breaks into smaller pieces, but the pieces stay in the same place."
        },
        {
          "term": "Erosion",
          "text": "Water, wind, or ice picks up pieces of rock or soil and carries them away."
        }
      ],
      [
        {
          "term": "Weathering",
          "text": "Rock gradually breaks into smaller pieces, but the pieces stay in the same place."
        },
        {
          "term": "Erosion",
          "text": "Water, wind, or ice picks up pieces of rock or soil and carries them away."
        },
        {
          "term": "Neither",
          "text": "The moving pieces are dropped in a new place, which is called deposition."
        }
      ],
      [
        {
          "term": "Carries pieces away",
          "text": "Pieces of rock or soil are moved from one place to a different place."
        },
        {
          "term": "Ice does it",
          "text": "Frozen water is the main cause of the change to the rock."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each card by what is happening to the rock right now.",
        "notThis": "Broken pieces can still be on the move, so ask what is happening to them now.",
        "groups": [
          {
            "id": "wea",
            "label": "Weathering"
          },
          {
            "id": "ero",
            "label": "Erosion"
          }
        ],
        "items": [
          {
            "id": "iceboulder",
            "label": "Water freezes inside a crack, and the ice gradually splits a boulder in two.",
            "clue": "Water did it"
          },
          {
            "id": "treerock",
            "label": "A tree grows in a crack, and its roots slowly force the rock apart.",
            "clue": "Plants are soft"
          },
          {
            "id": "gravestone",
            "label": "Rain falls on an old gravestone for many years and gradually wears it down.",
            "clue": "Rain is moving water"
          },
          {
            "id": "slide",
            "label": "Rainwater washes loose, broken rocks down the side of a steep hill.",
            "clue": "The rocks are already broken"
          },
          {
            "id": "sandblow",
            "label": "A strong wind blows sand across the desert and carries it far away.",
            "clue": "Sand is tiny broken rock"
          },
          {
            "id": "glacier",
            "label": "A huge glacier drags rocks and gravel along as it slides down a valley.",
            "clue": "Ice did it"
          }
        ]
      },
      {
        "rule": "Sort by what is happening to the rock. Some cards show neither change.",
        "notThis": "Water, wind, and ice can each do all three jobs, so the cause is not the rule.",
        "groups": [
          {
            "id": "wea",
            "label": "Weathering"
          },
          {
            "id": "ero",
            "label": "Erosion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "peak",
            "label": "On a cold mountaintop, freezing ice cracks the rocks into sharp pieces.",
            "clue": "Ice did it"
          },
          {
            "id": "walk",
            "label": "Tree roots grow underneath a sidewalk and gradually crack the concrete.",
            "clue": "Roots grow very slowly"
          },
          {
            "id": "beach",
            "label": "Ocean waves pull sand away from a beach and carry it out to sea.",
            "clue": "Sand is already broken rock"
          },
          {
            "id": "dust",
            "label": "Strong wind lifts loose dust from a dry field and carries it off.",
            "clue": "It is a windy day"
          },
          {
            "id": "delta",
            "label": "A river slows down where it meets the sea, and it drops its mud there.",
            "clue": "Moving water did it"
          },
          {
            "id": "melt",
            "label": "A glacier melts and leaves behind a large pile of rocks and gravel.",
            "clue": "Ice did it"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "move",
          "text": "Carries pieces away"
        },
        {
          "id": "ice",
          "text": "Ice does it"
        }
      ],
      "items": [
        {
          "id": "glacierV",
          "label": "A glacier scrapes up rocks and carries them far down the valley."
        },
        {
          "id": "riverV",
          "label": "After a storm, a fast river carries sand and mud downstream."
        },
        {
          "id": "windV",
          "label": "Wind blows dry sand grains along the beach to a new spot."
        },
        {
          "id": "frostV",
          "label": "High on a mountain, ice splits a rock into several sharp pieces."
        },
        {
          "id": "potholeV",
          "label": "Over many winters, freezing ice cracks the surface of a road."
        },
        {
          "id": "rootsV",
          "label": "Tree roots grow into a boulder and gradually split it apart."
        }
      ],
      "mc": {
        "prompt": "After a storm, broken rocks slide down to the bottom of a hill. Which slow change is this?",
        "choices": [
          {
            "id": "yes",
            "text": "Erosion, because the broken pieces are being carried to a new place."
          },
          {
            "id": "trap",
            "text": "Weathering, because the rocks are already broken into pieces."
          },
          {
            "id": "no",
            "text": "It is not a change to the surface of Earth at all."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the cards that show erosion, which carries pieces away.",
        "choices": [
          {
            "id": "dust",
            "text": "Wind carries dust off a dry field and far away."
          },
          {
            "id": "waves",
            "text": "Waves carry sand away from the beach and out to sea."
          },
          {
            "id": "crack",
            "text": "Ice splits a rock, but the pieces stay in the same place."
          },
          {
            "id": "mud",
            "text": "A river drops its mud in a spot where it slows down."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the rock pieces"
          },
          {
            "id": "trap",
            "text": "whether the rock looks broken"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.10C-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Today or always?",
    "teks": "4.10C",
    "defs": [
      [
        {
          "term": "Weather",
          "text": "What the air is like in one place for a short time, like today or this week."
        },
        {
          "term": "Climate",
          "text": "The usual weather in a place over many years. It is a pattern."
        }
      ],
      [
        {
          "term": "Weather",
          "text": "What the air is like in one place for a short time, like today or this week."
        },
        {
          "term": "Climate",
          "text": "The usual weather in a place over many years. It is a pattern."
        },
        {
          "term": "Neither",
          "text": "It is not about the air or the sky. It is about something else."
        }
      ],
      [
        {
          "term": "Weather",
          "text": "What the air is like in one place for a short time, like today or this week."
        },
        {
          "term": "About Texas",
          "text": "The sentence is about a place in Texas."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by how long a time the statement is about.",
        "notThis": "Rare does not mean climate. Ask: one time, or most years?",
        "groups": [
          {
            "id": "wx",
            "label": "Weather"
          },
          {
            "id": "clim",
            "label": "Climate"
          }
        ],
        "items": [
          {
            "id": "dallas",
            "label": "It snowed in Dallas yesterday.",
            "clue": "Snow is rare in Dallas"
          },
          {
            "id": "austin",
            "label": "A thunderstorm hit Austin this afternoon.",
            "clue": "Storms happen there a lot"
          },
          {
            "id": "tomorrow",
            "label": "Tomorrow will be windy and 75 degrees.",
            "clue": "It has a number"
          },
          {
            "id": "houston",
            "label": "Houston is usually hot and humid in summer.",
            "clue": "Sounds like a forecast"
          },
          {
            "id": "sahara",
            "label": "The Sahara Desert gets very little rain each year.",
            "clue": "Hot and sandy"
          },
          {
            "id": "elpaso",
            "label": "El Paso gets about 9 inches of rain a year, on average.",
            "clue": "It has a number"
          }
        ]
      },
      {
        "rule": "Sort by how long a time it is about. Some are not about the air.",
        "notThis": "A big, famous storm is still one time. Some sentences are not about the air at all.",
        "groups": [
          {
            "id": "wx",
            "label": "Weather"
          },
          {
            "id": "clim",
            "label": "Climate"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "heat",
            "label": "A record heat wave hit Lubbock last week.",
            "clue": "The hottest ever"
          },
          {
            "id": "harvey",
            "label": "Hurricane Harvey flooded Houston in 2017.",
            "clue": "People still talk about it"
          },
          {
            "id": "florida",
            "label": "Florida usually has warm winters.",
            "clue": "Some winters get cold"
          },
          {
            "id": "antarctica",
            "label": "Antarctica is cold all year, every year.",
            "clue": "Some days are sunny"
          },
          {
            "id": "quake",
            "label": "An earthquake shook a town last night.",
            "clue": "It happened fast"
          },
          {
            "id": "tides",
            "label": "The tide goes in and out at Galveston every day.",
            "clue": "It happens every day"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "wx",
          "text": "Weather"
        },
        {
          "id": "tx",
          "text": "About Texas"
        }
      ],
      "items": [
        {
          "id": "iceV",
          "label": "An ice storm hit Fort Worth last night."
        },
        {
          "id": "hailV",
          "label": "Hail fell in Amarillo this afternoon."
        },
        {
          "id": "tokyoV",
          "label": "It is raining in Tokyo right now."
        },
        {
          "id": "coastV",
          "label": "The Texas coast usually has hot, humid summers."
        },
        {
          "id": "bigbendV",
          "label": "Big Bend is dry most of the year."
        },
        {
          "id": "alaskaV",
          "label": "Alaska has long, cold winters every year."
        }
      ],
      "mc": {
        "prompt": "Snow is rare in Dallas. It snowed there yesterday. Is this weather or climate?",
        "choices": [
          {
            "id": "yes",
            "text": "Weather. It is about one day."
          },
          {
            "id": "trap",
            "text": "Climate, because snow there is so rare."
          },
          {
            "id": "no",
            "text": "Neither. Snow is not about the air."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the climate statements.",
        "choices": [
          {
            "id": "phoenix",
            "text": "Phoenix is very hot most summers."
          },
          {
            "id": "fog",
            "text": "It is foggy this morning."
          },
          {
            "id": "seattle",
            "text": "Seattle gets a lot of rain every year."
          },
          {
            "id": "tornado",
            "text": "A tornado touched down last night."
          },
          {
            "id": "mn",
            "text": "Minnesota has cold winters on average."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "one time or the usual pattern"
          },
          {
            "id": "trap",
            "text": "how rare or big the event is"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.11A-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Will it run out?",
    "teks": "4.11A",
    "defs": [
      [
        {
          "term": "Renewable",
          "text": "Nature replaces this resource in a short time, so people have a steady supply."
        },
        {
          "term": "Nonrenewable",
          "text": "This resource took millions of years to form, so it will eventually run out."
        }
      ],
      [
        {
          "term": "Renewable",
          "text": "Nature replaces this resource in a short time, so people have a steady supply."
        },
        {
          "term": "Nonrenewable",
          "text": "This resource took millions of years to form, so it will eventually run out."
        },
        {
          "term": "Neither",
          "text": "It is not a natural resource, because people made it in a factory from other things."
        }
      ],
      [
        {
          "term": "Renewable",
          "text": "Nature replaces this resource in a short time, so people have a steady supply."
        },
        {
          "term": "Makes electricity",
          "text": "Power plants can use this resource to make electricity for homes and schools."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each card by whether nature can replace it in a short time.",
        "notThis": "Coming from living things long ago does not make a fuel renewable today.",
        "groups": [
          {
            "id": "ren",
            "label": "Renewable"
          },
          {
            "id": "non",
            "label": "Nonrenewable"
          }
        ],
        "items": [
          {
            "id": "wind",
            "label": "Wind",
            "clue": "You cannot see it"
          },
          {
            "id": "sun",
            "label": "Sunlight",
            "clue": "It is gone at night"
          },
          {
            "id": "cotton",
            "label": "Cotton plants",
            "clue": "Farmers have to plant them"
          },
          {
            "id": "cattle",
            "label": "Beef cattle",
            "clue": "People raise them on ranches"
          },
          {
            "id": "coal",
            "label": "Coal",
            "clue": "Made from plants long ago"
          },
          {
            "id": "oil",
            "label": "Oil",
            "clue": "Made from tiny sea life long ago"
          }
        ]
      },
      {
        "rule": "Sort by whether nature can replace it. Some things on these cards are not natural resources.",
        "notThis": "An object made from a natural resource is not a natural resource itself.",
        "groups": [
          {
            "id": "ren",
            "label": "Renewable"
          },
          {
            "id": "non",
            "label": "Nonrenewable"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "river",
            "label": "River water",
            "clue": "It can dry up in a drought"
          },
          {
            "id": "pine",
            "label": "Pine trees",
            "clue": "They take years to grow"
          },
          {
            "id": "gas",
            "label": "Natural gas",
            "clue": "Formed from living things long ago"
          },
          {
            "id": "ironore",
            "label": "Iron ore",
            "clue": "It is found in rocks"
          },
          {
            "id": "bottle",
            "label": "Plastic bottle",
            "clue": "Made from oil"
          },
          {
            "id": "jar",
            "label": "Glass jar",
            "clue": "Made from sand"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "ren",
          "text": "Renewable"
        },
        {
          "id": "elec",
          "text": "Makes electricity"
        }
      ],
      "items": [
        {
          "id": "riverV",
          "label": "Flowing river water"
        },
        {
          "id": "sunV",
          "label": "Sunlight"
        },
        {
          "id": "woolV",
          "label": "Wool from sheep"
        },
        {
          "id": "coalV",
          "label": "Coal"
        },
        {
          "id": "gasV",
          "label": "Natural gas"
        },
        {
          "id": "ironV",
          "label": "Iron ore"
        }
      ],
      "mc": {
        "prompt": "Coal formed from plants that lived long ago. Is coal a renewable resource?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because coal takes millions of years to form deep underground."
          },
          {
            "id": "trap",
            "text": "Yes, because it came from plants, and plants grow back quickly."
          },
          {
            "id": "no",
            "text": "Yes, because workers make it in factories every day."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the resources that nature can replace in a short time.",
        "choices": [
          {
            "id": "wind",
            "text": "Wind"
          },
          {
            "id": "sun",
            "text": "Sunlight"
          },
          {
            "id": "oil",
            "text": "Oil"
          },
          {
            "id": "trees",
            "text": "Trees"
          },
          {
            "id": "gas",
            "text": "Natural gas"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how fast nature can replace it"
          },
          {
            "id": "trap",
            "text": "whether it came from living things"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-4.13B-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Born with it?",
    "teks": "4.13B",
    "defs": [
      [
        {
          "term": "Inherited trait",
          "text": "A body feature that is passed down from parents to their young. It is not caused by what happens during its life."
        },
        {
          "term": "Acquired trait",
          "text": "A body feature that a living thing develops during its life, because of what happens to it."
        }
      ],
      [
        {
          "term": "Inherited trait",
          "text": "A body feature that is passed down from parents to their young. It is not caused by what happens during its life."
        },
        {
          "term": "Acquired trait",
          "text": "A body feature that a living thing develops during its life, because of what happens to it."
        },
        {
          "term": "Neither",
          "text": "It is not a body feature, because it is a behavior that the living thing learned."
        }
      ],
      [
        {
          "term": "Inherited trait",
          "text": "A body feature that is passed down from parents to their young. It is not caused by what happens during its life."
        },
        {
          "term": "Plant trait",
          "text": "It is a feature that belongs to a plant instead of an animal."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each trait by how the living thing got it.",
        "notThis": "Looking like your family members is not the rule, so ask how the trait appeared.",
        "groups": [
          {
            "id": "inh",
            "label": "Inherited trait"
          },
          {
            "id": "acq",
            "label": "Acquired trait"
          }
        ],
        "items": [
          {
            "id": "eyes",
            "label": "Brown eyes",
            "clue": "Same as her best friend's"
          },
          {
            "id": "tabby",
            "label": "A cat's striped fur",
            "clue": "Some cats have spots"
          },
          {
            "id": "tulip",
            "label": "A tulip's red petals",
            "clue": "It grows in a sunny garden"
          },
          {
            "id": "scar",
            "label": "A girl has a scar on her knee from an accident years ago.",
            "clue": "It has been there for years"
          },
          {
            "id": "dyed",
            "label": "A girl dyes her hair a bright shade of purple.",
            "clue": "Her mom's hair is purple too"
          },
          {
            "id": "muscle",
            "label": "A boy builds big muscles by lifting heavy weights every week.",
            "clue": "His dad is strong too"
          }
        ]
      },
      {
        "rule": "Sort by how the living thing got the trait. Some are not body features.",
        "notThis": "Doing the same thing as your parents is a behavior, not a body feature.",
        "groups": [
          {
            "id": "inh",
            "label": "Inherited trait"
          },
          {
            "id": "acq",
            "label": "Acquired trait"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "ears",
            "label": "A dog's floppy ears",
            "clue": "Some dogs have pointy ears"
          },
          {
            "id": "cactus",
            "label": "A cactus's sharp spines",
            "clue": "It grows in the hot desert"
          },
          {
            "id": "bent",
            "label": "Strong winds gradually bent a tree, so now it leans to one side.",
            "clue": "It grew that way for years"
          },
          {
            "id": "tooth",
            "label": "A boy chipped his front tooth when he fell on the playground.",
            "clue": "You can see it every day"
          },
          {
            "id": "parrot",
            "label": "A pet parrot says \"hello\" whenever someone walks into the room.",
            "clue": "Its owner says it too"
          },
          {
            "id": "bike",
            "label": "A girl knows how to ride a bike without training wheels.",
            "clue": "Her dad rides a bike too"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inh",
          "text": "Inherited trait"
        },
        {
          "id": "plant",
          "text": "Plant trait"
        }
      ],
      "items": [
        {
          "id": "thornsV",
          "label": "A rose's thorns"
        },
        {
          "id": "mapleV",
          "label": "The shape of a maple leaf"
        },
        {
          "id": "zebraV",
          "label": "A zebra's stripes"
        },
        {
          "id": "curlyV",
          "label": "Naturally curly hair"
        },
        {
          "id": "sawV",
          "label": "A tree has a branch that a worker sawed off last spring."
        },
        {
          "id": "dogscarV",
          "label": "A dog got a scar on its nose from a sharp fence."
        }
      ],
      "mc": {
        "prompt": "Sam lifts weights every week and gradually builds big muscles. His dad is strong too. What kind of trait are Sam's muscles?",
        "choices": [
          {
            "id": "yes",
            "text": "Acquired, because he built them during his own life."
          },
          {
            "id": "trap",
            "text": "Inherited, because his dad is strong too."
          },
          {
            "id": "no",
            "text": "Neither, because muscles are not actually a part of the body."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the inherited traits, which are passed down from parents.",
        "choices": [
          {
            "id": "neck",
            "text": "A giraffe's long neck"
          },
          {
            "id": "ears",
            "text": "A rabbit's long ears"
          },
          {
            "id": "scar",
            "text": "A scar from a cut"
          },
          {
            "id": "swim",
            "text": "Knowing how to swim"
          },
          {
            "id": "petals",
            "text": "A sunflower's yellow petals"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the living thing got the trait"
          },
          {
            "id": "trap",
            "text": "whether family members look the same"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.3C-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Greek and Latin roots",
    "teks": "4.3C",
    "defs": [
      [
        {
          "term": "auto (self)",
          "text": "The Greek root auto means \"self,\" so a word with this root often describes something that acts by itself."
        },
        {
          "term": "graph (write)",
          "text": "The Greek root graph means \"write\" or \"draw,\" and it can appear anywhere in a word."
        }
      ],
      [
        {
          "term": "auto (self)",
          "text": "The Greek root auto means \"self,\" so a word with this root often describes something that acts by itself."
        },
        {
          "term": "graph (write)",
          "text": "The Greek root graph means \"write\" or \"draw,\" and it can appear anywhere in a word."
        },
        {
          "term": "Neither",
          "text": "The word has the root meter, which means \"measure,\" or it has none of these roots at all. Some of these words only look similar."
        }
      ],
      [
        {
          "term": "auto (self)",
          "text": "The Greek root auto means \"self,\" so a word with this root often describes something that acts by itself."
        },
        {
          "term": "graph (write)",
          "text": "The Greek root graph means \"write\" or \"draw,\" and it can appear anywhere in a word."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each word by the Greek root it contains.",
        "notThis": "A root can hide in the middle or at the end of a word, so examine every part carefully.",
        "groups": [
          {
            "id": "auto",
            "label": "auto (self)"
          },
          {
            "id": "graph",
            "label": "graph (write)"
          }
        ],
        "items": [
          {
            "id": "automobile",
            "label": "automobile",
            "clue": "Another word for car"
          },
          {
            "id": "automatic",
            "label": "automatic",
            "clue": "Store doors can be this"
          },
          {
            "id": "autopilot",
            "label": "autopilot",
            "clue": "Airplanes use it"
          },
          {
            "id": "paragraph",
            "label": "paragraph",
            "clue": "Starts with p-a-r-a"
          },
          {
            "id": "photograph",
            "label": "photograph",
            "clue": "Starts with photo"
          },
          {
            "id": "biography",
            "label": "biography",
            "clue": "A book about a real life"
          }
        ]
      },
      {
        "rule": "Sort each word by its root. Some words belong in neither group.",
        "notThis": "Beginning with the same letters is not enough, because the meaning of the word part has to match the root.",
        "groups": [
          {
            "id": "auto",
            "label": "auto (self)"
          },
          {
            "id": "graph",
            "label": "graph (write)"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "autocorrect",
            "label": "autocorrect",
            "clue": "Fixes your spelling"
          },
          {
            "id": "geography",
            "label": "geography",
            "clue": "About maps and places"
          },
          {
            "id": "telegraph",
            "label": "telegraph",
            "clue": "An old way to send messages"
          },
          {
            "id": "author",
            "label": "author",
            "clue": "A person who writes"
          },
          {
            "id": "autumn",
            "label": "autumn",
            "clue": "Starts with a-u-t"
          },
          {
            "id": "thermometer",
            "label": "thermometer",
            "clue": "Measures temperature"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "auto",
          "text": "auto (self)"
        },
        {
          "id": "graph",
          "text": "graph (write)"
        }
      ],
      "items": [
        {
          "id": "autographV",
          "label": "autograph"
        },
        {
          "id": "autobioV",
          "label": "autobiography"
        },
        {
          "id": "autoV",
          "label": "automatically"
        },
        {
          "id": "photogV",
          "label": "photographer"
        },
        {
          "id": "authorityV",
          "label": "authority"
        },
        {
          "id": "centimeterV",
          "label": "centimeter"
        }
      ],
      "mc": {
        "prompt": "The word author begins with the letters a-u-t, and an author is a person who writes. Which root does author contain?",
        "choices": [
          {
            "id": "yes",
            "text": "None of these roots, because it only looks similar to auto."
          },
          {
            "id": "trap",
            "text": "The root auto, because the word begins with a-u-t."
          },
          {
            "id": "no",
            "text": "The root graph, because an author writes stories."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the words that contain the root graph, which means write or draw.",
        "choices": [
          {
            "id": "para",
            "text": "paragraph"
          },
          {
            "id": "auto",
            "text": "autograph"
          },
          {
            "id": "grapes",
            "text": "grapes"
          },
          {
            "id": "geo",
            "text": "geography"
          },
          {
            "id": "gravity",
            "text": "gravity"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the root and what it means"
          },
          {
            "id": "trap",
            "text": "the first letters of the word"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Saw it or figured it out?",
    "teks": "4.6F",
    "defs": [
      [
        {
          "term": "Observation",
          "text": "An observation is something the scene tells you directly, so you can point to the exact words that say it."
        },
        {
          "term": "Inference",
          "text": "An inference is a conclusion you reach by using clues in the scene, although the words never state it directly."
        }
      ],
      [
        {
          "term": "Observation",
          "text": "An observation is something the scene tells you directly, so you can point to the exact words that say it."
        },
        {
          "term": "Inference",
          "text": "An inference is a conclusion you reach by using clues in the scene, although the words never state it directly."
        },
        {
          "term": "Neither",
          "text": "No clue in the scene supports it, so it is only a guess. It might sound likely, but nothing in the text provides evidence for it."
        }
      ],
      [
        {
          "term": "Inference",
          "text": "An inference is a conclusion you reach by using clues in the story, although the words never state it directly."
        },
        {
          "term": "About a feeling",
          "text": "It describes how a person feels, such as happy, angry, worried, or proud."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Read this scene. Jada hurried through the front door, and her umbrella dripped on the rug. Thick mud covered both of her boots. Her cheeks were pink, and she rubbed her hands together. She dropped her heavy backpack and yawned twice. A spelling test with a gold star stuck out of her pocket. Sort each statement by how you know it.",
        "notThis": "A statement can sound certain and still be an inference. Search the scene for the exact words before you decide.",
        "groups": [
          {
            "id": "obs",
            "label": "Observation"
          },
          {
            "id": "inf",
            "label": "Inference"
          }
        ],
        "items": [
          {
            "id": "umbrella",
            "label": "Jada's umbrella dripped on the rug.",
            "clue": "Easy to picture"
          },
          {
            "id": "boots",
            "label": "Thick mud covered Jada's boots.",
            "clue": "About her boots"
          },
          {
            "id": "hands",
            "label": "Jada rubbed her hands together.",
            "clue": "Maybe she was cold"
          },
          {
            "id": "rain",
            "label": "It was raining outside.",
            "clue": "Sounds like a sure fact"
          },
          {
            "id": "tired",
            "label": "Jada was tired.",
            "clue": "Said like a fact"
          },
          {
            "id": "test",
            "label": "Jada did well on her spelling test.",
            "clue": "Sounds certain"
          }
        ]
      },
      {
        "rule": "Read this scene. Jada hurried through the front door, and her umbrella dripped on the rug. Thick mud covered both of her boots. Her cheeks were pink, and she rubbed her hands together. She dropped her heavy backpack and yawned twice. A spelling test with a gold star stuck out of her pocket. Sort each statement by how you know it. Some statements have no clue.",
        "notThis": "Some statements sound reasonable, but no detail in the scene supports them. A guess without evidence is not an inference.",
        "groups": [
          {
            "id": "obs",
            "label": "Observation"
          },
          {
            "id": "inf",
            "label": "Inference"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "backpack",
            "label": "Jada dropped her heavy backpack.",
            "clue": "Sounds like a guess"
          },
          {
            "id": "yawn",
            "label": "Jada yawned twice.",
            "clue": "Maybe she was sleepy"
          },
          {
            "id": "cold",
            "label": "The weather outside was cold.",
            "clue": "Said like a sure fact"
          },
          {
            "id": "school",
            "label": "Jada had just come home from school.",
            "clue": "Nobody says where she was"
          },
          {
            "id": "cat",
            "label": "Jada has a pet cat at home.",
            "clue": "Sounds possible"
          },
          {
            "id": "friend",
            "label": "Jada walked home with her best friend.",
            "clue": "Sounds likely"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inf",
          "text": "Inference"
        },
        {
          "id": "feel",
          "text": "About a feeling"
        }
      ],
      "items": [
        {
          "id": "cryV",
          "label": "The story says Leo's eyes filled with tears as he waved goodbye to Grandma."
        },
        {
          "id": "slamV",
          "label": "The story says Mia slammed her bedroom door. You conclude that she is angry."
        },
        {
          "id": "grassV",
          "label": "The story says the sidewalk is covered with puddles. You conclude that it rained recently."
        },
        {
          "id": "scaredV",
          "label": "The story says, \"Mia was terrified of the dark.\""
        },
        {
          "id": "proudV",
          "label": "The story says, \"Leo felt proud of his science project.\""
        },
        {
          "id": "doorV",
          "label": "The story says, \"The front door was painted bright red.\""
        }
      ],
      "mc": {
        "prompt": "A story says that Kim's hands shook as she held her test. Tia says, \"Kim was nervous.\" Which choice describes what Tia said?",
        "choices": [
          {
            "id": "yes",
            "text": "It is an inference, because Tia used clues from the story to figure it out."
          },
          {
            "id": "trap",
            "text": "It is an observation, because Tia said it like a definite fact."
          },
          {
            "id": "no",
            "text": "It is only a guess, because the story provides no clue about it."
          }
        ]
      },
      "multi": {
        "prompt": "A story says, \"Leo's shirt was soaked, and he was laughing. He held a water balloon.\" Choose all the inferences.",
        "choices": [
          {
            "id": "fun",
            "text": "Leo was enjoying himself during the water balloon fight."
          },
          {
            "id": "hit",
            "text": "A water balloon had splashed Leo."
          },
          {
            "id": "held",
            "text": "Leo was holding a water balloon."
          },
          {
            "id": "sis",
            "text": "Leo's older sister threw a balloon at him."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how you know each statement"
          },
          {
            "id": "trap",
            "text": "how certain each statement sounds"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Text structure",
    "teks": "4.9D(iii)",
    "defs": [
      [
        {
          "term": "Compare and contrast",
          "text": "A compare and contrast passage explains how two things are alike, how they are different, or both."
        },
        {
          "term": "Cause and effect",
          "text": "A cause and effect passage explains what happened and the reason, or cause, that made it happen."
        }
      ],
      [
        {
          "term": "Compare and contrast",
          "text": "A compare and contrast passage explains how two things are alike, how they are different, or both."
        },
        {
          "term": "Cause and effect",
          "text": "A cause and effect passage explains what happened and the reason, or cause, that made it happen."
        },
        {
          "term": "Neither",
          "text": "This group holds problem and solution passages. They describe a problem and then explain how someone solved it."
        }
      ],
      [
        {
          "term": "Compare and contrast",
          "text": "A compare and contrast passage explains how two things are alike, how they are different, or both."
        },
        {
          "term": "Uses the word \"both\"",
          "text": "The exact word \"both\" appears somewhere in the passage."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each passage by how its ideas are organized.",
        "notThis": "Do not sort by a single joining word. Instead, decide what the whole passage is explaining.",
        "groups": [
          {
            "id": "cc",
            "label": "Compare and contrast"
          },
          {
            "id": "ce",
            "label": "Cause and effect"
          }
        ],
        "items": [
          {
            "id": "frogs",
            "label": "Frogs usually have smooth, moist skin. Toads usually have dry, bumpy skin.",
            "clue": "No but in it"
          },
          {
            "id": "gators",
            "label": "Alligators and crocodiles are both large reptiles. But an alligator has a wider, rounder nose.",
            "clue": "Two reptiles"
          },
          {
            "id": "seasons",
            "label": "Summer days in Texas are long and hot. Winter days are shorter and cooler.",
            "clue": "About the weather"
          },
          {
            "id": "snowmelt",
            "label": "The spring sun melted the snow on the mountain. As a result, the river below rose higher.",
            "clue": "A mountain and a river"
          },
          {
            "id": "power",
            "label": "Heavy ice coated the tree branches overnight. Because of this, many branches snapped and blocked the roads.",
            "clue": "About a storm"
          },
          {
            "id": "plant",
            "label": "Mia watered her plant, but she kept it in a dark closet. Without sunlight, its leaves turned yellow.",
            "clue": "Uses the word but"
          }
        ]
      },
      {
        "rule": "Sort each passage by how its ideas are organized. Some fit neither group.",
        "notThis": "The word \"but\" appears in many kinds of passages, so it cannot decide the structure by itself.",
        "groups": [
          {
            "id": "cc",
            "label": "Compare and contrast"
          },
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "bike",
            "label": "A bike and a scooter both have wheels. A bike has pedals, and a scooter does not.",
            "clue": "Two ways to ride"
          },
          {
            "id": "pets",
            "label": "Cats and dogs can both be loving pets. Most cats enjoy time alone, but most dogs want company.",
            "clue": "About pets"
          },
          {
            "id": "team",
            "label": "The team practiced hard, but their best player got sick. Because she missed the game, the team lost.",
            "clue": "Uses the word but"
          },
          {
            "id": "beaver",
            "label": "Beavers built a sturdy dam across the creek. So the water backed up and formed a new pond.",
            "clue": "About animals"
          },
          {
            "id": "library",
            "label": "Our library had too few books, but the town had an idea. Families donated books, and now every shelf is full.",
            "clue": "Uses the word but"
          },
          {
            "id": "deer",
            "label": "Deer kept eating the lettuce in Grandpa's vegetable garden. He solved the problem by building a tall fence.",
            "clue": "About animals"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cc",
          "text": "Compare and contrast"
        },
        {
          "id": "both",
          "text": "Uses the word \"both\""
        }
      ],
      "items": [
        {
          "id": "beesV",
          "label": "Bees and butterflies both drink nectar from flowers. Only bees make honey."
        },
        {
          "id": "owlsV",
          "label": "Owls and hawks are both birds that hunt. Owls hunt at night, and hawks hunt during the day."
        },
        {
          "id": "marsV",
          "label": "Mars is a red, dry, and dusty planet. Earth has blue oceans and green forests."
        },
        {
          "id": "lightsV",
          "label": "Both lights flickered and went out during the thunderstorm. Because of this, we used flashlights."
        },
        {
          "id": "tiresV",
          "label": "Both tires on my bicycle were completely flat. Dad repaired them with an air pump."
        },
        {
          "id": "trashV",
          "label": "Our puppy chewed through his leash. He escaped and chased a squirrel across the park."
        }
      ],
      "mc": {
        "prompt": "Ana says a passage is compare and contrast because it uses the word \"but.\" Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "Not always, because she should check whether it explains how two things are alike or different."
          },
          {
            "id": "trap",
            "text": "Yes, because the word \"but\" always means the passage is compare and contrast."
          },
          {
            "id": "no",
            "text": "No, because the word \"but\" always means the passage is problem and solution."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the signal words that often show cause and effect.",
        "choices": [
          {
            "id": "because",
            "text": "because"
          },
          {
            "id": "result",
            "text": "as a result"
          },
          {
            "id": "so",
            "text": "so"
          },
          {
            "id": "both",
            "text": "both"
          },
          {
            "id": "however",
            "text": "however"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the ideas are organized"
          },
          {
            "id": "trap",
            "text": "which joining words the passage uses"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.9B-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Picture words",
    "teks": "4.9B",
    "defs": [
      [
        {
          "term": "Simile",
          "text": "A simile compares two different things by using the word \"like\" or the word \"as.\""
        },
        {
          "term": "Metaphor",
          "text": "A metaphor compares two different things by saying that one thing is the other thing. It does not use \"like\" or \"as.\""
        }
      ],
      [
        {
          "term": "Simile",
          "text": "A simile compares two different things by using the word \"like\" or the word \"as.\""
        },
        {
          "term": "Metaphor",
          "text": "A metaphor compares two different things by saying that one thing is the other thing. It does not use \"like\" or \"as.\""
        },
        {
          "term": "Neither",
          "text": "This group holds personification, which gives human actions to something that is not human. It also holds plain sentences that compare nothing."
        }
      ],
      [
        {
          "term": "Compares two things",
          "text": "The sentence shows how two different things are alike in some way."
        },
        {
          "term": "Uses \"like\" or \"as\"",
          "text": "The word \"like\" or the word \"as\" appears somewhere in the sentence."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each sentence by the way it compares two different things.",
        "notThis": "The word \"is\" appears in many sentences, so it cannot decide the answer alone. Notice how the two things are compared.",
        "groups": [
          {
            "id": "sim",
            "label": "Simile"
          },
          {
            "id": "met",
            "label": "Metaphor"
          }
        ],
        "items": [
          {
            "id": "lake",
            "label": "The frozen lake in the park is like a shiny mirror.",
            "clue": "Uses the word is"
          },
          {
            "id": "grandpa",
            "label": "My grandfather was as tall as the oak tree in his yard.",
            "clue": "About a person"
          },
          {
            "id": "sings",
            "label": "My sister sings like a songbird every single morning.",
            "clue": "About a sound"
          },
          {
            "id": "zoo",
            "label": "After lunch, our classroom was a noisy, crowded zoo.",
            "clue": "Mentions animals"
          },
          {
            "id": "snow",
            "label": "Fresh snow is a soft white blanket covering the entire hill.",
            "clue": "Paints a winter picture"
          },
          {
            "id": "tornado",
            "label": "My little brother is a tornado whenever he visits the kitchen.",
            "clue": "Uses the word is"
          }
        ]
      },
      {
        "rule": "Sort each sentence by how it compares. Some sentences are neither.",
        "notThis": "The word \"like\" does not always create a simile. First decide whether two different things are really being compared.",
        "groups": [
          {
            "id": "sim",
            "label": "Simile"
          },
          {
            "id": "met",
            "label": "Metaphor"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "cheeks",
            "label": "The baby's cheeks were as red as ripe apples after her nap.",
            "clue": "About a color"
          },
          {
            "id": "wolf",
            "label": "Tom gobbled his spaghetti dinner like a hungry wolf.",
            "clue": "About eating"
          },
          {
            "id": "smile",
            "label": "Grandma's gentle smile is sunshine on a cloudy afternoon.",
            "clue": "A happy picture"
          },
          {
            "id": "pizza",
            "label": "I like pizza with extra cheese and a crunchy crust.",
            "clue": "Has the word like"
          },
          {
            "id": "cats",
            "label": "Most cats like to nap in warm, sunny spots near windows.",
            "clue": "Has the word like"
          },
          {
            "id": "wind",
            "label": "The wind whispered secrets through the tall pine trees.",
            "clue": "Paints a picture"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "comp",
          "text": "Compares two things"
        },
        {
          "id": "likeas",
          "text": "Uses \"like\" or \"as\""
        }
      ],
      "items": [
        {
          "id": "moonV",
          "label": "The moon was like a glowing lamp in the dark evening sky."
        },
        {
          "id": "iceV",
          "label": "His fingers were as cold as ice after winter recess."
        },
        {
          "id": "coinV",
          "label": "The full moon was a silver coin floating above the city."
        },
        {
          "id": "bootsV",
          "label": "I really like my new red rain boots."
        },
        {
          "id": "sangV",
          "label": "We sang cheerful songs as we walked home from practice."
        },
        {
          "id": "catV",
          "label": "Our orange cat sleeps on the living room rug all afternoon."
        }
      ],
      "mc": {
        "prompt": "Which sentence is a simile?",
        "choices": [
          {
            "id": "yes",
            "text": "The clouds were like fluffy cotton balls floating overhead."
          },
          {
            "id": "trap",
            "text": "I like eating cotton candy at the county fair."
          },
          {
            "id": "no",
            "text": "The clouds were fluffy cotton balls floating overhead."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sentences that are metaphors.",
        "choices": [
          {
            "id": "stars",
            "text": "The stars were sparkling diamonds scattered across the night sky."
          },
          {
            "id": "oven",
            "text": "The playground was an oven on that July afternoon."
          },
          {
            "id": "nurse",
            "text": "My aunt is a nurse at the children's hospital."
          },
          {
            "id": "glass",
            "text": "The ice on the pond was as smooth as glass."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how two things are compared"
          },
          {
            "id": "trap",
            "text": "whether the sentence has the word like"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-4.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Tall tale or legend?",
    "teks": "4.9A",
    "defs": [
      [
        {
          "term": "Tall tale",
          "text": "A tall tale is a funny story that exaggerates on purpose. Its hero does impossible things that no real person could ever do."
        },
        {
          "term": "Legend",
          "text": "A legend is an old story about a hero from long ago. It may be based on a real person, and it is told as though it really happened."
        }
      ],
      [
        {
          "term": "Tall tale",
          "text": "A tall tale is a funny story that exaggerates on purpose. Its hero does impossible things that no real person could ever do."
        },
        {
          "term": "Legend",
          "text": "A legend is an old story about a hero from long ago. It may be based on a real person, and it is told as though it really happened."
        },
        {
          "term": "Neither",
          "text": "A fable is a short story that teaches a lesson, which is often stated at the end. The characters are usually animals."
        }
      ],
      [
        {
          "term": "Tall tale",
          "text": "A tall tale is a funny story that exaggerates on purpose. Its hero does impossible things that no real person could ever do."
        },
        {
          "term": "Names a real place",
          "text": "The story names a real place that you could find on a map."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each story by what kind of story it is.",
        "notThis": "Every story here has a remarkable hero, so a hero cannot decide the answer. Notice how each story is told.",
        "groups": [
          {
            "id": "tall",
            "label": "Tall tale"
          },
          {
            "id": "leg",
            "label": "Legend"
          }
        ],
        "items": [
          {
            "id": "pecos",
            "label": "Pecos Bill was a cowboy who used a live rattlesnake as his rope.",
            "clue": "Set in Texas"
          },
          {
            "id": "paul",
            "label": "Paul Bunyan was a giant lumberjack. His huge footprints filled with rain and became lakes.",
            "clue": "A very strong hero"
          },
          {
            "id": "stork",
            "label": "Baby Paul Bunyan was so enormous that five storks were needed to carry him.",
            "clue": "About a baby"
          },
          {
            "id": "arthur",
            "label": "Long ago, young Arthur pulled a sword from a stone. That proved he should be king of Britain.",
            "clue": "Sounds impossible"
          },
          {
            "id": "robin",
            "label": "Robin Hood lived in Sherwood Forest in England. He took from the rich and gave to the poor.",
            "clue": "A daring hero"
          },
          {
            "id": "apple",
            "label": "Saint George fought a fierce dragon to save a town. People told his story for hundreds of years.",
            "clue": "Sounds impossible."
          }
        ]
      },
      {
        "rule": "Sort each story by what kind of story it is. Some are neither.",
        "notThis": "An amazing deed is not enough. Ask whether the storyteller stretches the truth on purpose to make you laugh.",
        "groups": [
          {
            "id": "tall",
            "label": "Tall tale"
          },
          {
            "id": "leg",
            "label": "Legend"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "babe",
            "label": "Paul Bunyan had a blue ox named Babe. Babe measured 42 ax handles between the eyes.",
            "clue": "About an animal"
          },
          {
            "id": "tell",
            "label": "William Tell shot an apple off his son's head with a single arrow.",
            "clue": "An amazing shot"
          },
          {
            "id": "mulan",
            "label": "Mulan took her father's place in the army. She fought bravely for twelve years.",
            "clue": "A brave hero"
          },
          {
            "id": "tortoise",
            "label": "A slow tortoise beat a speedy hare in a race. Slow and steady wins the race.",
            "clue": "A hero who wins"
          },
          {
            "id": "mouse",
            "label": "A tiny mouse chewed through a net to free a lion. Little friends can be a big help.",
            "clue": "A tiny hero"
          },
          {
            "id": "crow",
            "label": "A thirsty crow dropped pebbles into a jar until the water rose. Little by little does the trick.",
            "clue": "A clever hero"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "tall",
          "text": "Tall tale"
        },
        {
          "id": "place",
          "text": "Names a real place"
        }
      ],
      "items": [
        {
          "id": "canyonV",
          "label": "Paul Bunyan dragged his giant ax behind him. It carved out the Grand Canyon."
        },
        {
          "id": "tornadoV",
          "label": "Pecos Bill rode a wild tornado across Texas like a bucking horse."
        },
        {
          "id": "griddleV",
          "label": "Paul Bunyan's pancake pan was gigantic. Cooks skated across it with butter tied to their feet."
        },
        {
          "id": "appleV",
          "label": "William Tell lived in the mountains of Switzerland. He was the best archer in the land."
        },
        {
          "id": "robinV",
          "label": "Robin Hood hid from the sheriff in Sherwood Forest."
        },
        {
          "id": "antV",
          "label": "An ant worked all summer while a grasshopper played. In winter, only the ant had food."
        }
      ],
      "mc": {
        "prompt": "In one story, Paul Bunyan's footprints became lakes. What makes this story a tall tale?",
        "choices": [
          {
            "id": "yes",
            "text": "The storyteller exaggerates on purpose to make the story funny."
          },
          {
            "id": "trap",
            "text": "It has a hero who does something amazing and brave."
          },
          {
            "id": "no",
            "text": "It teaches a lesson by using talking animals."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sentences that are true about legends.",
        "choices": [
          {
            "id": "past",
            "text": "They tell about heroes from long ago."
          },
          {
            "id": "real",
            "text": "Some legends are based on real people."
          },
          {
            "id": "animals",
            "text": "They always include talking animals."
          },
          {
            "id": "funny",
            "text": "They exaggerate just to make readers laugh."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each story is told"
          },
          {
            "id": "trap",
            "text": "whether the story has a hero"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.2B-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "What is the digit worth?",
    "teks": "4.2B",
    "defs": [
      [
        {
          "term": "Worth 700",
          "text": "The 7 is in the hundreds place, so it stands for 7 hundreds, which equals 700."
        },
        {
          "term": "Worth 70",
          "text": "The 7 is in the tens place, so it stands for 7 tens, which equals 70."
        }
      ],
      [
        {
          "term": "Worth 700",
          "text": "The 7 is in the hundreds place, so it stands for 7 hundreds, which equals 700."
        },
        {
          "term": "Worth 70",
          "text": "The 7 is in the tens place, so it stands for 7 tens, which equals 70."
        },
        {
          "term": "Neither",
          "text": "The 7 is in a different place, so its value is not 700 and not 70."
        }
      ],
      [
        {
          "term": "7 is worth 700",
          "text": "The 7 is in the hundreds place, so it stands for 7 hundreds, which equals 700."
        },
        {
          "term": "Has a decimal point",
          "text": "The number has a decimal point, which separates the whole number from its parts. Each digit to its right is worth less than 1."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each number by what its digit 7 is worth, based on its place.",
        "notThis": "Counting digits from the left can mislead you, because numbers have different lengths. The location of the 7 reveals its value instead.",
        "groups": [
          {
            "id": "h",
            "label": "Worth 700"
          },
          {
            "id": "t",
            "label": "Worth 70"
          }
        ],
        "items": [
          {
            "id": "n3742",
            "label": "3,742",
            "clue": "The 7 is the second digit"
          },
          {
            "id": "n709",
            "label": "709",
            "clue": "Only three digits"
          },
          {
            "id": "x5708",
            "label": "5,000 + 700 + 8",
            "clue": "Written as a sum"
          },
          {
            "id": "n1275",
            "label": "1,275",
            "clue": "Four digits"
          },
          {
            "id": "n961370",
            "label": "961,370",
            "clue": "A six-digit number"
          },
          {
            "id": "n48176",
            "label": "48,176",
            "clue": "The 7 is the fourth digit"
          }
        ]
      },
      {
        "rule": "Sort by what the 7 is worth. Some 7s have a different value.",
        "notThis": "Thinking a decimal point makes every digit small is a common error. Find the exact location of the 7 first.",
        "groups": [
          {
            "id": "h",
            "label": "Worth 700"
          },
          {
            "id": "t",
            "label": "Worth 70"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n2305719",
            "label": "2,305,719",
            "clue": "An enormous number"
          },
          {
            "id": "x90705",
            "label": "90,000 + 700 + 5",
            "clue": "Written as a sum"
          },
          {
            "id": "d715",
            "label": "71.5",
            "clue": "Has a decimal point"
          },
          {
            "id": "x60075",
            "label": "600 + 70 + 5",
            "clue": "Only three parts"
          },
          {
            "id": "d473",
            "label": "4.73",
            "clue": "The 7 is the second digit"
          },
          {
            "id": "n7250",
            "label": "7,250",
            "clue": "Four digits"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "h",
          "text": "7 is worth 700"
        },
        {
          "id": "dec",
          "text": "Has a decimal point"
        }
      ],
      "items": [
        {
          "id": "v7452",
          "label": "745.2"
        },
        {
          "id": "v6781",
          "label": "6,781"
        },
        {
          "id": "v407",
          "label": "4.07"
        },
        {
          "id": "v1706",
          "label": "17.06"
        },
        {
          "id": "v58172",
          "label": "58,172"
        },
        {
          "id": "v70418",
          "label": "70,418"
        }
      ],
      "mc": {
        "prompt": "Kim says the 7 in 71.5 is only worth 7, because numbers with decimals are small. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. The 7 is in the tens place, so its value is 70."
          },
          {
            "id": "trap",
            "text": "Yes. Any number with a decimal point must be a fairly small number."
          },
          {
            "id": "no",
            "text": "No. The 7 in that number is worth 700 instead."
          }
        ]
      },
      "multi": {
        "prompt": "Choose every number in which the digit 7 has a value of 700.",
        "choices": [
          {
            "id": "a",
            "text": "3,742"
          },
          {
            "id": "b",
            "text": "2,305,719"
          },
          {
            "id": "c",
            "text": "7,250"
          },
          {
            "id": "d",
            "text": "4.73"
          },
          {
            "id": "e",
            "text": "90,000 + 700 + 5"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the place the 7 is in"
          },
          {
            "id": "trap",
            "text": "how many digits the number has"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.3C-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Hidden halves",
    "teks": "4.3C",
    "defs": [
      [
        {
          "term": "Equal to 1/2",
          "text": "The top number is exactly half of the bottom number, so half of the whole is shaded."
        },
        {
          "term": "Equal to 1 whole",
          "text": "The top number and the bottom number are the same, so the entire whole is shaded."
        }
      ],
      [
        {
          "term": "Equal to 1/2",
          "text": "The top number is exactly half of the bottom number, so half of the whole is shaded."
        },
        {
          "term": "Equal to 1 whole",
          "text": "The top number and the bottom number are the same, so the entire whole is shaded."
        },
        {
          "term": "Neither",
          "text": "It is not equal to 1/2, and it is not equal to 1 whole either."
        }
      ],
      [
        {
          "term": "Equal to 1/2",
          "text": "The top number is exactly half of the bottom number, so half of the whole is shaded."
        },
        {
          "term": "Cut into eighths",
          "text": "The bottom number is 8, which means the whole is cut into 8 equal slices."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each fraction by the amount it is equal to.",
        "notThis": "Large numbers do not always make a large fraction. Compare the top and bottom numbers together instead.",
        "groups": [
          {
            "id": "half",
            "label": "Equal to 1/2"
          },
          {
            "id": "whole",
            "label": "Equal to 1 whole"
          }
        ],
        "items": [
          {
            "id": "f2of4",
            "label": "2/4",
            "clue": "Only 2 on top"
          },
          {
            "id": "f6of12",
            "label": "6/12",
            "clue": "Twelve slices"
          },
          {
            "id": "f5of10",
            "label": "5/10",
            "clue": "The top number is odd"
          },
          {
            "id": "f3of3",
            "label": "3/3",
            "clue": "Small numbers"
          },
          {
            "id": "f8of8",
            "label": "8/8",
            "clue": "Only 8 pieces"
          },
          {
            "id": "f10of10",
            "label": "10/10",
            "clue": "Big numbers"
          }
        ]
      },
      {
        "rule": "Sort each fraction by the amount it equals. Some are equal to neither.",
        "notThis": "A fraction that is close to 1/2 is not the same as one that is exactly equal to it.",
        "groups": [
          {
            "id": "half",
            "label": "Equal to 1/2"
          },
          {
            "id": "whole",
            "label": "Equal to 1 whole"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "f50of100",
            "label": "50/100",
            "clue": "Enormous numbers"
          },
          {
            "id": "f3of6",
            "label": "3/6",
            "clue": "The top number is odd"
          },
          {
            "id": "f4of8",
            "label": "4/8",
            "clue": "Two even numbers"
          },
          {
            "id": "f12of12",
            "label": "12/12",
            "clue": "Twelve slices"
          },
          {
            "id": "f5of12",
            "label": "5/12",
            "clue": "Close to half"
          },
          {
            "id": "f3of4",
            "label": "3/4",
            "clue": "Almost a whole"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "half",
          "text": "Equal to 1/2"
        },
        {
          "id": "eighths",
          "text": "Cut into eighths"
        }
      ],
      "items": [
        {
          "id": "v4of8",
          "label": "4/8"
        },
        {
          "id": "v1of2",
          "label": "1/2"
        },
        {
          "id": "v3of6",
          "label": "3/6"
        },
        {
          "id": "v8of8",
          "label": "8/8"
        },
        {
          "id": "v3of8",
          "label": "3/8"
        },
        {
          "id": "v2of3",
          "label": "2/3"
        }
      ],
      "mc": {
        "prompt": "Mia says 6/12 is greater than 1/2, because 6 and 12 are larger numbers. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Six is exactly half of 12, so 6/12 and 1/2 are equal."
          },
          {
            "id": "trap",
            "text": "Yes. Larger numbers always make a larger fraction."
          },
          {
            "id": "no",
            "text": "No. 6/12 is actually equal to 1 whole."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the ways to show that 3/6 is equivalent to 1/2.",
        "choices": [
          {
            "id": "half",
            "text": "3 is exactly half of 6."
          },
          {
            "id": "draw",
            "text": "Sketch both fractions using same-size wholes. The shaded parts are the same size."
          },
          {
            "id": "small",
            "text": "3 and 6 are both fairly small numbers."
          },
          {
            "id": "bigger",
            "text": "6 is a larger number than 2."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each fraction is equal to"
          },
          {
            "id": "trap",
            "text": "how big the numbers are"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.5A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which operation?",
    "teks": "4.5A",
    "defs": [
      [
        {
          "term": "Multiply",
          "text": "You find a total made of equal groups, or you find how many times as large something is."
        },
        {
          "term": "Divide",
          "text": "You separate a total into equal groups. Then you find how many groups there are, or how many are in each."
        }
      ],
      [
        {
          "term": "Multiply",
          "text": "You find a total made of equal groups, or you find how many times as large something is."
        },
        {
          "term": "Divide",
          "text": "You separate a total into equal groups. Then you find how many groups there are, or how many are in each."
        },
        {
          "term": "Neither",
          "text": "You add or subtract to solve it, because there are no equal groups involved."
        }
      ],
      [
        {
          "term": "Needs division",
          "text": "Dividing is one of the steps you must complete to find the answer."
        },
        {
          "term": "Needs two steps",
          "text": "You must complete two different operations, one after the other, to answer the question."
        },
        {
          "term": "Center",
          "text": "The problem requires division and also requires two steps."
        },
        {
          "term": "Outside",
          "text": "The problem requires neither division nor two separate steps."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each problem by the operation that solves it. Do not solve it yet.",
        "notThis": "Key words like \"each\" can be misleading. Instead, picture what is actually happening in the problem.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          }
        ],
        "items": [
          {
            "id": "seats",
            "label": "A theater has 32 rows with 45 seats in each row. How many seats?",
            "clue": "Asks how many"
          },
          {
            "id": "pages",
            "label": "Maria reads 125 pages each week. How many pages does she read in 12 weeks?",
            "clue": "Has the word \"each\""
          },
          {
            "id": "corn",
            "label": "A farmer plants 18 rows of corn with 150 plants in each row. How many plants in all?",
            "clue": "Says \"in all\""
          },
          {
            "id": "buses",
            "label": "256 students are visiting the museum. How many buses are necessary if each bus holds 40?",
            "clue": "Has the word \"each\""
          },
          {
            "id": "muffins",
            "label": "A baker packs 144 muffins into boxes of 6. How many boxes does she fill?",
            "clue": "Asks how many"
          },
          {
            "id": "stickers",
            "label": "Four friends share 1,200 stickers equally. How many stickers does each friend receive?",
            "clue": "A big number of stickers"
          }
        ]
      },
      {
        "rule": "Sort each problem by the operation that solves it. Some problems need neither one.",
        "notThis": "Phrases like \"in all\" and \"how many more\" appear in every kind of problem, so they are not reliable clues.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "cans",
            "label": "A box holds 24 cans of soup. How many cans are in 150 boxes?",
            "clue": "The word \"holds\""
          },
          {
            "id": "sister",
            "label": "Jon has 245 cards, and his sister has 3 times as many. How many does she have?",
            "clue": "Compares two people"
          },
          {
            "id": "pencils",
            "label": "A store has 3,600 pencils in all, in packs of 12. How many packs are there?",
            "clue": "Says \"in all\""
          },
          {
            "id": "vans",
            "label": "A van holds 8 passengers. How many vans are necessary to carry 124 people to a concert?",
            "clue": "The word \"holds\""
          },
          {
            "id": "brother",
            "label": "Jon has 245 cards, and his brother has 180 more. How many does his brother have?",
            "clue": "Compares two people"
          },
          {
            "id": "books",
            "label": "A library had 1,250 books and donated 375. How many books are remaining?",
            "clue": "Books are shared out"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "div",
          "text": "Needs division"
        },
        {
          "id": "two",
          "text": "Needs two steps"
        }
      ],
      "items": [
        {
          "id": "teamsV",
          "label": "Two classes have 28 and 32 students. How many teams of 6 can they form altogether?"
        },
        {
          "id": "muffinsV",
          "label": "A baker packs 168 muffins into boxes of 6. How many boxes does she fill?"
        },
        {
          "id": "stickersV",
          "label": "Five classmates share 1,500 stickers equally. How many stickers does each one receive?"
        },
        {
          "id": "booksV",
          "label": "Sam buys 12 books that cost $15 each. How much change does he get from $200?"
        },
        {
          "id": "birdsV",
          "label": "A farm has 1,340 chickens and 580 ducks. How many birds live on the farm altogether?"
        },
        {
          "id": "seatsV",
          "label": "A stadium has 24 rows with 35 seats in each row. How many seats are there?"
        }
      ],
      "mc": {
        "prompt": "256 students are going on a field trip. Each bus holds 40 students. Which operation tells how many buses are needed?",
        "choices": [
          {
            "id": "yes",
            "text": "Divide, because you need to find how many groups of 40 fit into 256."
          },
          {
            "id": "trap",
            "text": "Multiply, because the problem includes the word \"each.\""
          },
          {
            "id": "no",
            "text": "Add, because the question asks \"how many.\""
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the problems that you would solve by multiplying.",
        "choices": [
          {
            "id": "cans",
            "text": "The number of cans in 150 boxes of 24"
          },
          {
            "id": "pages",
            "text": "The pages read in 12 weeks at 125 pages a week"
          },
          {
            "id": "packs",
            "text": "The number of packages of 12 made from 3,600 pencils"
          },
          {
            "id": "more",
            "text": "The cards Jon's brother has if he has 180 more than Jon"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what is happening in the problem"
          },
          {
            "id": "trap",
            "text": "key words like \"each\" and \"in all\""
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.5D-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Perimeter or area?",
    "teks": "4.5D",
    "defs": [
      [
        {
          "term": "Perimeter",
          "text": "The total distance around the outside of a shape. It is measured in units of length, such as feet or meters."
        },
        {
          "term": "Area",
          "text": "The amount of surface a flat shape covers. It is measured in square units, such as square feet or square meters."
        }
      ],
      [
        {
          "term": "Perimeter",
          "text": "The total distance around the outside of a shape. It is measured in units of length, such as feet or meters."
        },
        {
          "term": "Area",
          "text": "The amount of surface a flat shape covers. It is measured in square units, such as square feet or square meters."
        },
        {
          "term": "Neither",
          "text": "The question does not ask for the distance around a shape or the amount of surface it covers."
        }
      ],
      [
        {
          "term": "Needs perimeter",
          "text": "You must calculate the total distance around the outside of the rectangle."
        },
        {
          "term": "Needs area",
          "text": "You must calculate the amount of surface that the rectangle covers."
        },
        {
          "term": "Center",
          "text": "The problem requires both measurements, so it belongs where the circles overlap."
        },
        {
          "term": "Outside",
          "text": "The problem requires neither measurement, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each problem by the measurement it needs: perimeter or area.",
        "notThis": "Measurements in feet cannot decide the answer, because perimeter and area problems both use feet. Instead, decide what the question is actually asking you to calculate.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          }
        ],
        "items": [
          {
            "id": "fence",
            "label": "A garden is 12 feet by 8 feet. How much fence goes around it?",
            "clue": "Plants grow inside it"
          },
          {
            "id": "table",
            "label": "A square table is 4 feet on each side. How much trim goes around its edge?",
            "clue": "Has the word \"square\""
          },
          {
            "id": "ribbon",
            "label": "A photo is 10 inches by 8 inches. How much ribbon is needed to go around its edge?",
            "clue": "Hangs on a big wall"
          },
          {
            "id": "ground",
            "label": "A garden is 12 feet by 8 feet. How much ground is inside the garden?",
            "clue": "Same size garden"
          },
          {
            "id": "rug",
            "label": "A rectangular rug is 9 feet long and 6 feet wide. How much floor does it cover?",
            "clue": "Sides measured in feet"
          },
          {
            "id": "tiles",
            "label": "A classroom floor is 30 feet by 25 feet. How many 1-foot square tiles are necessary to cover it?",
            "clue": "Each tile is 1 foot long"
          }
        ]
      },
      {
        "rule": "Sort each problem by the measurement it needs. Some problems need neither measurement.",
        "notThis": "A word like fence or cover can be misleading, because it may describe something other than the measurement. Carefully decide what the question is actually asking.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "lap",
            "label": "A soccer field is 100 yards by 60 yards. How far is one lap around it?",
            "clue": "A huge field"
          },
          {
            "id": "lace",
            "label": "A tablecloth is 6 feet by 4 feet. How much lace is needed along all its edges?",
            "clue": "A cloth covers the table"
          },
          {
            "id": "paint",
            "label": "A bedroom wall is 10 feet tall and 14 feet wide. How much of the wall will the paint cover?",
            "clue": "Tall and wide"
          },
          {
            "id": "grass",
            "label": "A fence surrounds a yard that is 20 feet by 15 feet. How much grass is inside the fence?",
            "clue": "Has a fence"
          },
          {
            "id": "shelf",
            "label": "A wooden bookshelf is 6 feet tall and 3 feet wide. How many pounds of books can it hold?",
            "clue": "Sides in feet"
          },
          {
            "id": "pool",
            "label": "A swimming pool is 25 meters long and 10 meters wide. What is the water temperature today?",
            "clue": "Two side lengths"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "per",
          "text": "Needs perimeter"
        },
        {
          "id": "area",
          "text": "Needs area"
        }
      ],
      "items": [
        {
          "id": "wallV",
          "label": "Ben will paint a wall that is 10 feet by 8 feet. Then he will put trim around its edge."
        },
        {
          "id": "parkV",
          "label": "A park is 50 yards by 40 yards. Workers will plant grass on it and build a fence around it."
        },
        {
          "id": "sandV",
          "label": "A sandbox is 6 feet by 5 feet. How much lumber is necessary to go around its sides?"
        },
        {
          "id": "patioV",
          "label": "A patio is 12 feet by 10 feet. How much ground will the bricks cover?"
        },
        {
          "id": "matV",
          "label": "A gymnastics mat is 7 feet by 5 feet. How much of the gym floor does it cover?"
        },
        {
          "id": "classV",
          "label": "A classroom is 30 feet by 25 feet. How many students are attending the class this year?"
        }
      ],
      "mc": {
        "prompt": "A rectangular rug is 9 feet by 6 feet. Kai wants to know how much of the floor it covers. What does he need to calculate?",
        "choices": [
          {
            "id": "yes",
            "text": "Area, because he wants to know the amount of surface that the rug covers."
          },
          {
            "id": "trap",
            "text": "Perimeter, because the sides of the rug are measured in feet."
          },
          {
            "id": "no",
            "text": "Neither, because a rug is not exactly a rectangle."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the situations that require calculating the perimeter.",
        "choices": [
          {
            "id": "fence",
            "text": "Putting a fence around a garden"
          },
          {
            "id": "lace",
            "text": "Sewing lace along a tablecloth's edges"
          },
          {
            "id": "tile",
            "text": "Covering a floor with tiles"
          },
          {
            "id": "paint",
            "text": "Covering a wall with paint"
          },
          {
            "id": "lap",
            "text": "Running one lap around a field"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the distance around or the space inside"
          },
          {
            "id": "trap",
            "text": "the units in the problem"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.6C-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which triangle?",
    "teks": "4.6C",
    "defs": [
      [
        {
          "term": "Right triangle",
          "text": "A triangle with one right angle. A right angle measures exactly 90°, like the corner of a sheet of paper."
        },
        {
          "term": "Obtuse triangle",
          "text": "A triangle with one obtuse angle. An obtuse angle is wider than a right angle, so it is more than 90°."
        }
      ],
      [
        {
          "term": "Right triangle",
          "text": "A triangle with one right angle. A right angle measures exactly 90°, like the corner of a sheet of paper."
        },
        {
          "term": "Obtuse triangle",
          "text": "A triangle with one obtuse angle. An obtuse angle is wider than a right angle, so it is more than 90°."
        },
        {
          "term": "Neither",
          "text": "It has no right angle and no obtuse angle, so all three of its angles are acute."
        }
      ],
      [
        {
          "term": "Has a right angle",
          "text": "One of the three angles measures exactly 90°."
        },
        {
          "term": "Has two equal angles",
          "text": "At least two of the angles have the same measure, which means they are identical in size."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each triangle by its kind. Look carefully at all three angles.",
        "notThis": "A tiny angle does not decide the type, because every triangle has at least two acute angles. Check the widest angle instead.",
        "groups": [
          {
            "id": "right",
            "label": "Right triangle"
          },
          {
            "id": "obtuse",
            "label": "Obtuse triangle"
          }
        ],
        "items": [
          {
            "id": "t905040",
            "label": "Angles: 90°, 50°, 40°",
            "clue": "Two acute angles"
          },
          {
            "id": "t108090",
            "label": "Angles: 10°, 80°, 90°",
            "clue": "Has a tiny 10° angle"
          },
          {
            "id": "t459045",
            "label": "Angles: 45°, 90°, 45°",
            "clue": "Two angles match"
          },
          {
            "id": "t1203030",
            "label": "Angles: 120°, 30°, 30°",
            "clue": "Two angles match"
          },
          {
            "id": "t2025135",
            "label": "Angles: 20°, 25°, 135°",
            "clue": "Starts with small angles"
          },
          {
            "id": "t359550",
            "label": "Angles: 35°, 95°, 50°",
            "clue": "95° is close to 90°"
          }
        ]
      },
      {
        "rule": "Sort each triangle by its kind. Some triangles are neither type.",
        "notThis": "Check whether any angle is exactly 90° or more than 90°.",
        "groups": [
          {
            "id": "right",
            "label": "Right triangle"
          },
          {
            "id": "obtuse",
            "label": "Obtuse triangle"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "t304090",
            "label": "Angles: 30°, 60°, 90°",
            "clue": "Starts with small angles"
          },
          {
            "id": "t58590",
            "label": "Angles: 5°, 85°, 90°",
            "clue": "Has a tiny 5° angle"
          },
          {
            "id": "t914544",
            "label": "Angles: 91°, 45°, 44°",
            "clue": "91° is almost 90°"
          },
          {
            "id": "t1515015",
            "label": "Angles: 15°, 150°, 15°",
            "clue": "Two tiny angles"
          },
          {
            "id": "t894645",
            "label": "Angles: 89°, 46°, 45°",
            "clue": "89° is almost 90°"
          },
          {
            "id": "t606060",
            "label": "Angles: 60°, 60°, 60°",
            "clue": "All three angles match"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "hasright",
          "text": "Has a right angle"
        },
        {
          "id": "twoeq",
          "text": "Has two equal angles"
        }
      ],
      "items": [
        {
          "id": "vt904545",
          "label": "Angles: 90°, 45°, 45°"
        },
        {
          "id": "vt306090",
          "label": "Angles: 30°, 90°, 60°"
        },
        {
          "id": "vt1203030",
          "label": "Angles: 120°, 30°, 30°"
        },
        {
          "id": "vt707040",
          "label": "Angles: 70°, 40°, 70°"
        },
        {
          "id": "vt1005030",
          "label": "Angles: 100°, 50°, 30°"
        },
        {
          "id": "vt806040",
          "label": "Angles: 80°, 60°, 40°"
        }
      ],
      "mc": {
        "prompt": "A triangle has angles of 10°, 80°, and 90°. Ava says it is acute, because 10° is so small. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. It has an exact 90° angle, so it is a right triangle."
          },
          {
            "id": "trap",
            "text": "Yes. One tiny angle makes the whole triangle acute."
          },
          {
            "id": "no",
            "text": "No. It is obtuse, because 80° is a fairly wide angle."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the triangles that have one obtuse angle.",
        "choices": [
          {
            "id": "a",
            "text": "Angles: 91°, 45°, 44°"
          },
          {
            "id": "b",
            "text": "Angles: 15°, 150°, 15°"
          },
          {
            "id": "c",
            "text": "Angles: 89°, 46°, 45°"
          },
          {
            "id": "d",
            "text": "Angles: 90°, 50°, 40°"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the largest angle in each triangle"
          },
          {
            "id": "trap",
            "text": "the smallest angle in each triangle"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.8A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which system?",
    "teks": "4.8A",
    "defs": [
      [
        {
          "term": "Metric unit",
          "text": "A unit from the metric system, which most nations worldwide use. Its units grow by 10s, 100s, and 1,000s."
        },
        {
          "term": "Customary unit",
          "text": "A unit from the customary system. It is the everyday system that people in the United States use for recipes and roads."
        }
      ],
      [
        {
          "term": "Metric unit",
          "text": "A unit from the metric system, which most nations worldwide use. Its units grow by 10s, 100s, and 1,000s."
        },
        {
          "term": "Customary unit",
          "text": "A unit from the customary system. It is the everyday system that people in the United States use for recipes and roads."
        },
        {
          "term": "Neither",
          "text": "It is not only metric or only customary, because both systems use the same unit."
        }
      ],
      [
        {
          "term": "Metric unit",
          "text": "A unit from the metric system, which most nations worldwide use. Its units grow by 10s, 100s, and 1,000s."
        },
        {
          "term": "Measures mass or weight",
          "text": "It tells how heavy something is, such as a carton of milk or a bag of apples."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each unit by the measurement system it belongs to.",
        "notThis": "Two units can measure the same thing and still belong to different systems, so check the system instead.",
        "groups": [
          {
            "id": "met",
            "label": "Metric unit"
          },
          {
            "id": "cust",
            "label": "Customary unit"
          }
        ],
        "items": [
          {
            "id": "liter",
            "label": "Liter",
            "clue": "Measures liquid"
          },
          {
            "id": "meter",
            "label": "Meter",
            "clue": "Measures length"
          },
          {
            "id": "gram",
            "label": "Gram",
            "clue": "About as heavy as a paperclip"
          },
          {
            "id": "quart",
            "label": "Quart",
            "clue": "Measures liquid"
          },
          {
            "id": "yard",
            "label": "Yard",
            "clue": "About as long as a meter"
          },
          {
            "id": "pound",
            "label": "Pound",
            "clue": "Measures weight"
          }
        ]
      },
      {
        "rule": "Sort each unit by its measurement system. Some units belong to neither system.",
        "notThis": "What a unit measures is not the rule. The system it comes from is what matters.",
        "groups": [
          {
            "id": "met",
            "label": "Metric unit"
          },
          {
            "id": "cust",
            "label": "Customary unit"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "km",
            "label": "Kilometer",
            "clue": "Used for long road trips"
          },
          {
            "id": "ml",
            "label": "Milliliter",
            "clue": "Used for a medicine dose"
          },
          {
            "id": "mile",
            "label": "Mile",
            "clue": "Used for long road trips"
          },
          {
            "id": "ounce",
            "label": "Ounce",
            "clue": "Weighs very little"
          },
          {
            "id": "minute",
            "label": "Minute",
            "clue": "Very short"
          },
          {
            "id": "hour",
            "label": "Hour",
            "clue": "Used every day"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "met",
          "text": "Metric unit"
        },
        {
          "id": "mass",
          "text": "Measures mass or weight"
        }
      ],
      "items": [
        {
          "id": "kgV",
          "label": "Kilogram"
        },
        {
          "id": "mgV",
          "label": "Milligram"
        },
        {
          "id": "cmV",
          "label": "Centimeter"
        },
        {
          "id": "lbV",
          "label": "Pound"
        },
        {
          "id": "galV",
          "label": "Gallon"
        },
        {
          "id": "ftV",
          "label": "Foot"
        }
      ],
      "mc": {
        "prompt": "A liter and a quart both measure liquid. Do they belong to the same system?",
        "choices": [
          {
            "id": "yes",
            "text": "No. A liter is a metric unit, but a quart is a customary unit."
          },
          {
            "id": "trap",
            "text": "Yes. They both measure liquid, so they must match."
          },
          {
            "id": "no",
            "text": "No. A liter is customary, and a quart is metric."
          }
        ]
      },
      "multi": {
        "prompt": "Choose every unit that belongs to the metric system.",
        "choices": [
          {
            "id": "km",
            "text": "Kilometer"
          },
          {
            "id": "ml",
            "text": "Milliliter"
          },
          {
            "id": "mi",
            "text": "Mile"
          },
          {
            "id": "lb",
            "text": "Pound"
          },
          {
            "id": "g",
            "text": "Gram"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which system a unit is from"
          },
          {
            "id": "trap",
            "text": "what a unit measures"
          }
        ]
      }
    }
  },
  {
    "id": "MA-4.10A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Fixed or changing bill?",
    "teks": "4.10A",
    "defs": [
      [
        {
          "term": "Fixed expense",
          "text": "Money you pay out that stays the same amount each time, so it is predictable."
        },
        {
          "term": "Variable expense",
          "text": "Money you pay out that can be a different amount each time, depending on how much you use."
        }
      ],
      [
        {
          "term": "Fixed expense",
          "text": "Money you pay out that stays the same amount each time, so it is predictable."
        },
        {
          "term": "Variable expense",
          "text": "Money you pay out that can be a different amount each time, depending on how much you use."
        },
        {
          "term": "Neither",
          "text": "It is not an expense at all, because it is money you earn or receive instead of pay."
        }
      ],
      [
        {
          "term": "Fixed expense",
          "text": "Money you pay out that stays the same amount each time, so it is predictable."
        },
        {
          "term": "Paid every month",
          "text": "You pay it once each month, whether the amount stays the same or changes."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each expense by whether its amount stays the same or changes.",
        "notThis": "A bill that arrives every month is not always fixed, because its amount can still change. Look closely at the amount instead.",
        "groups": [
          {
            "id": "fixed",
            "label": "Fixed expense"
          },
          {
            "id": "var",
            "label": "Variable expense"
          }
        ],
        "items": [
          {
            "id": "rent",
            "label": "The family pays their landlord the same $900 rent every single month.",
            "clue": "A very big bill"
          },
          {
            "id": "phone",
            "label": "Dad's phone plan charges exactly $40 each month, all year long.",
            "clue": "A small bill"
          },
          {
            "id": "carpay",
            "label": "The car payment is always $250, and it is due every month.",
            "clue": "For the car"
          },
          {
            "id": "elec",
            "label": "The electric bill was $85 in May, but it climbed to $140 in July.",
            "clue": "Comes every month"
          },
          {
            "id": "water",
            "label": "The water bill was $38 in March and $61 in August, when the lawn needed water.",
            "clue": "Comes every month"
          },
          {
            "id": "gas",
            "label": "Filling the car with gas cost $30 one week and $55 the next week.",
            "clue": "For the car"
          }
        ]
      },
      {
        "rule": "Sort each item by whether its amount stays the same or changes. Some items are not expenses.",
        "notThis": "An expense is money you pay out. Money that you earn or receive is income instead, so it is not an expense.",
        "groups": [
          {
            "id": "fixed",
            "label": "Fixed expense"
          },
          {
            "id": "var",
            "label": "Variable expense"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "insure",
            "label": "Car insurance costs the household exactly $120 every month.",
            "clue": "For the car, like gas"
          },
          {
            "id": "swim",
            "label": "Swim lessons at the neighborhood pool cost a steady $60 each month.",
            "clue": "Just for fun"
          },
          {
            "id": "grocery",
            "label": "Groceries cost $95 one week and $130 the next, depending on what the family needs.",
            "clue": "Food you need"
          },
          {
            "id": "eatout",
            "label": "Eating at restaurants cost $20 one week and $45 the following week.",
            "clue": "Once a week"
          },
          {
            "id": "paycheck",
            "label": "Mom receives a paycheck of $1,200 from her job every two weeks.",
            "clue": "Same amount each time"
          },
          {
            "id": "lemon",
            "label": "Maya earned $18 on Saturday by selling lemonade to her neighbors.",
            "clue": "Changes every weekend"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fixed",
          "text": "Fixed expense"
        },
        {
          "id": "month",
          "text": "Paid every month"
        }
      ],
      "items": [
        {
          "id": "rentV",
          "label": "Their apartment rent is $900, and the amount never changes from month to month."
        },
        {
          "id": "phoneV",
          "label": "A phone plan costs exactly $40, and the bill arrives monthly."
        },
        {
          "id": "zooV",
          "label": "A family zoo pass costs $120, and they purchase it once a year."
        },
        {
          "id": "elecV",
          "label": "The electric bill arrives monthly, but the amount is different each time."
        },
        {
          "id": "repairV",
          "label": "A car repair cost $300 when the engine suddenly broke down."
        },
        {
          "id": "giftV",
          "label": "The family spends more on birthday gifts in some years and less in others."
        }
      ],
      "mc": {
        "prompt": "The electric bill arrives every month. Sam says that makes it a fixed expense. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. The amount changes from month to month, so it is a variable expense."
          },
          {
            "id": "trap",
            "text": "Yes. It arrives every month, so it must be a fixed expense."
          },
          {
            "id": "no",
            "text": "No. A bill is not an expense, so it belongs in neither group."
          }
        ]
      },
      "multi": {
        "prompt": "Choose every expense that is fixed, because its amount stays the same.",
        "choices": [
          {
            "id": "rent",
            "text": "The family pays their landlord the same $900 rent every single month."
          },
          {
            "id": "phone",
            "text": "Dad's phone plan charges exactly $40 each month, all year long."
          },
          {
            "id": "water",
            "text": "The water bill was $38 in March and $61 in August, when the lawn needed water."
          },
          {
            "id": "pay",
            "text": "Mom receives a paycheck of $1,200 from her job every two weeks."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the amount stays the same"
          },
          {
            "id": "trap",
            "text": "how often the bill comes"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.4B-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Which industry?",
    "teks": "4.4B",
    "defs": [
      [
        {
          "term": "Cattle industry",
          "text": "The business of raising cattle on ranches and moving them to market. It grew especially fast after the Civil War."
        },
        {
          "term": "Railroad industry",
          "text": "The business of building tracks and running trains. Trains carried people and goods, and they changed Texas towns."
        }
      ],
      [
        {
          "term": "Cattle industry",
          "text": "The business of raising cattle on ranches and moving them to market. It grew especially fast after the Civil War."
        },
        {
          "term": "Railroad industry",
          "text": "The business of building tracks and running trains. Trains carried people and goods, and they changed Texas towns."
        },
        {
          "term": "Neither",
          "text": "The event is mainly about a different Texas industry, such as oil and gas."
        }
      ],
      [
        {
          "term": "Cattle industry",
          "text": "The business of raising cattle on ranches and moving them to market. It grew especially fast after the Civil War."
        },
        {
          "term": "Railroad industry",
          "text": "The business of building tracks and running trains. Trains carried people and goods, and they changed Texas towns."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each event by the Texas industry it belongs to.",
        "notThis": "Cattle and trains were connected, so ask which industry the event is mainly about.",
        "groups": [
          {
            "id": "cat",
            "label": "Cattle industry"
          },
          {
            "id": "rr",
            "label": "Railroad industry"
          }
        ],
        "items": [
          {
            "id": "chisholm",
            "label": "Cowboys drive longhorn cattle north on the Chisholm Trail.",
            "clue": "It ended at a railroad town"
          },
          {
            "id": "king",
            "label": "In 1853, Richard King starts a South Texas ranch that grows huge.",
            "clue": "He once ran steamboats"
          },
          {
            "id": "chuck",
            "label": "Charles Goodnight is credited with inventing the chuck wagon for trail drives.",
            "clue": "It rolls on wheels"
          },
          {
            "id": "track",
            "label": "Workers lay hundreds of miles of new track across Texas.",
            "clue": "Hard work in the hot sun"
          },
          {
            "id": "trip",
            "label": "Passengers ride from Houston to Dallas in one day instead of many.",
            "clue": "A much faster trip"
          },
          {
            "id": "town",
            "label": "A town grows near the new tracks, while a town the tracks skip shrinks.",
            "clue": "People move closer"
          }
        ]
      },
      {
        "rule": "Sort by industry again, but some events belong to neither industry.",
        "notThis": "Ask which industry each event is mainly about.",
        "groups": [
          {
            "id": "cat",
            "label": "Cattle industry"
          },
          {
            "id": "rr",
            "label": "Railroad industry"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "lizzie",
            "label": "Lizzie Johnson rides the Chisholm Trail with her own herd in 1879.",
            "clue": "She taught school first"
          },
          {
            "id": "ja",
            "label": "Charles Goodnight starts the JA Ranch in Palo Duro Canyon.",
            "clue": "Far up in the Panhandle"
          },
          {
            "id": "cotton",
            "label": "Trains begin carrying Texas cotton to faraway ports and cities.",
            "clue": "Cotton is a crop"
          },
          {
            "id": "station",
            "label": "Towns compete to get a railroad station so they can grow.",
            "clue": "Towns wanted more people"
          },
          {
            "id": "spindle",
            "label": "Oil gushes out of the Spindletop well near Beaumont in 1901.",
            "clue": "A huge event in Texas"
          },
          {
            "id": "pipe",
            "label": "Pipelines carry oil from Texas fields to refineries on the coast.",
            "clue": "Moves goods across Texas"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cat",
          "text": "Cattle industry"
        },
        {
          "id": "rr",
          "text": "Railroad industry"
        }
      ],
      "items": [
        {
          "id": "ship",
          "label": "Ranchers load cattle into railroad cars to send them to northern markets."
        },
        {
          "id": "yards",
          "label": "Cattle pens are built right beside the railroad tracks in Fort Worth."
        },
        {
          "id": "brand",
          "label": "Lizzie Johnson registers her own cattle brand in Texas."
        },
        {
          "id": "kingV",
          "label": "Richard King's ranch grows to cover hundreds of thousands of acres."
        },
        {
          "id": "elpaso",
          "label": "Rail lines join San Antonio and El Paso in 1883."
        },
        {
          "id": "higgins",
          "label": "Pattillo Higgins predicts that oil lies under a hill near Beaumont."
        }
      ],
      "mc": {
        "prompt": "Cowboys drove cattle up the Chisholm Trail to a railroad town in Kansas. Which industry is the trail drive part of?",
        "choices": [
          {
            "id": "yes",
            "text": "The cattle industry, because the drive moved herds of cattle."
          },
          {
            "id": "trap",
            "text": "The railroad industry, because the trail ended at the tracks."
          },
          {
            "id": "no",
            "text": "The oil industry, because the trail began in Texas."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the ways that railroads changed life in Texas.",
        "choices": [
          {
            "id": "towns",
            "text": "Towns near the tracks often grew larger."
          },
          {
            "id": "fast",
            "text": "People and goods could travel much faster."
          },
          {
            "id": "ship",
            "text": "Ranchers could ship cattle to markets by train."
          },
          {
            "id": "oil",
            "text": "Oil gushed from the ground at Spindletop."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each event is mainly about"
          },
          {
            "id": "trap",
            "text": "whether trains are involved"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.6A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Far from the beach",
    "teks": "4.6A",
    "defs": [
      [
        {
          "term": "Coastal Plains",
          "text": "A large, mostly flat region in eastern and southern Texas, which stretches far inland from the coast."
        },
        {
          "term": "Mountains and Basins",
          "text": "The region in far West Texas, where tall mountains rise above low, flat basins."
        }
      ],
      [
        {
          "term": "Coastal Plains",
          "text": "A large, mostly flat region in eastern and southern Texas, which stretches far inland from the coast."
        },
        {
          "term": "Mountains and Basins",
          "text": "The region in far West Texas, where tall mountains rise above low, flat basins."
        },
        {
          "term": "Neither",
          "text": "It is in one of the other two regions, either the Great Plains or the North Central Plains."
        }
      ],
      [
        {
          "term": "Coastal Plains",
          "text": "A large, mostly flat region in eastern and southern Texas, which stretches far inland from the coast."
        },
        {
          "term": "On the Rio Grande",
          "text": "The place sits on the river that forms the border between Texas and Mexico."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each place by the region of Texas where it is found.",
        "notThis": "A region is huge, so one photo cannot show everything about the whole region.",
        "groups": [
          {
            "id": "cp",
            "label": "Coastal Plains"
          },
          {
            "id": "mb",
            "label": "Mountains and Basins"
          }
        ],
        "items": [
          {
            "id": "galveston",
            "label": "Galveston Island",
            "clue": "Sandy beach"
          },
          {
            "id": "piney",
            "label": "Piney Woods",
            "clue": "Tall pine forest, far from the beach"
          },
          {
            "id": "houston",
            "label": "Houston",
            "clue": "Big city"
          },
          {
            "id": "guadalupe",
            "label": "Guadalupe Mountains",
            "clue": "Highest point in Texas"
          },
          {
            "id": "saltflat",
            "label": "Salt flats in far West Texas",
            "clue": "Flat and low"
          },
          {
            "id": "elpaso",
            "label": "El Paso",
            "clue": "Big city"
          }
        ]
      },
      {
        "rule": "Sort by the region each place is in. Some places are in neither region.",
        "notThis": "One photo cannot show a whole region. Find where the place is on a Texas map.",
        "groups": [
          {
            "id": "cp",
            "label": "Coastal Plains"
          },
          {
            "id": "mb",
            "label": "Mountains and Basins"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "dallas",
            "label": "Dallas",
            "clue": "Hundreds of miles from the coast"
          },
          {
            "id": "corpus",
            "label": "Corpus Christi",
            "clue": "Port city"
          },
          {
            "id": "davis",
            "label": "Davis Mountains",
            "clue": "Cool, green hills"
          },
          {
            "id": "bigbend",
            "label": "Big Bend National Park",
            "clue": "Next to the Rio Grande"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon",
            "clue": "Tall red cliffs"
          },
          {
            "id": "ftworth",
            "label": "Fort Worth",
            "clue": "Right next to Dallas"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cp",
          "text": "Coastal Plains"
        },
        {
          "id": "rio",
          "text": "On the Rio Grande"
        }
      ],
      "items": [
        {
          "id": "brownsville",
          "label": "Brownsville"
        },
        {
          "id": "laredo",
          "label": "Laredo"
        },
        {
          "id": "beaumont",
          "label": "Beaumont"
        },
        {
          "id": "elpasoV",
          "label": "El Paso"
        },
        {
          "id": "lubbock",
          "label": "Lubbock"
        },
        {
          "id": "abilene",
          "label": "Abilene"
        }
      ],
      "mc": {
        "prompt": "Dallas is hundreds of miles from the beach. Why is it still part of the Coastal Plains?",
        "choices": [
          {
            "id": "yes",
            "text": "The Coastal Plains region stretches far inland, well beyond the coast."
          },
          {
            "id": "trap",
            "text": "Because it is a big city, just like Houston."
          },
          {
            "id": "no",
            "text": "Because it sits right on the banks of the Rio Grande."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the statements that are true about the Mountains and Basins region.",
        "choices": [
          {
            "id": "west",
            "text": "It is located in far West Texas."
          },
          {
            "id": "high",
            "text": "It includes the highest point in Texas."
          },
          {
            "id": "beach",
            "text": "It has sandy beaches along the ocean."
          },
          {
            "id": "allmtn",
            "text": "Every place in the region is a mountain."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "where each place is"
          },
          {
            "id": "trap",
            "text": "what each place looks like"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.10A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Price up or down?",
    "teks": "4.10A",
    "defs": [
      [
        {
          "term": "Price likely goes up",
          "text": "When buyers want more of a product than sellers have available, the price usually rises."
        },
        {
          "term": "Price likely goes down",
          "text": "When sellers have more of a product than buyers want, the price usually drops."
        }
      ],
      [
        {
          "term": "Price likely goes up",
          "text": "When buyers want more of a product than sellers have available, the price usually rises."
        },
        {
          "term": "Price likely goes down",
          "text": "When sellers have more of a product than buyers want, the price usually drops."
        },
        {
          "term": "Neither",
          "text": "The price will likely stay about the same, because nothing changed the supply or the demand."
        }
      ],
      [
        {
          "term": "Price likely goes up",
          "text": "When buyers want more of a product than sellers have available, the price usually rises."
        },
        {
          "term": "Supply changes",
          "text": "Supply is the amount of a product that sellers have available. Something new makes that amount grow or shrink."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each event by what will likely happen to the price.",
        "notThis": "Ask what changed: how much sellers have, or how much buyers want. How a place looks is not the rule.",
        "groups": [
          {
            "id": "up",
            "label": "Price likely goes up"
          },
          {
            "id": "down",
            "label": "Price likely goes down"
          }
        ],
        "items": [
          {
            "id": "freeze",
            "label": "A hard freeze destroys much of the Texas grapefruit crop.",
            "clue": "Cold weather hits the farms"
          },
          {
            "id": "fans",
            "label": "A heat wave makes many more families want to buy fans.",
            "clue": "Stores already sell fans"
          },
          {
            "id": "toyhit",
            "label": "Many families want a new toy, but stores have only a few.",
            "clue": "Shelves are nearly empty"
          },
          {
            "id": "pizza",
            "label": "Three new pizza shops open on the same busy street.",
            "clue": "The street gets more crowded"
          },
          {
            "id": "melons",
            "label": "Farmers grow the biggest watermelon crop in years.",
            "clue": "Great news for the farmers"
          },
          {
            "id": "toyold",
            "label": "A popular toy goes out of style, and few kids want it.",
            "clue": "It used to sell out"
          }
        ]
      },
      {
        "rule": "Sort by the likely price change, but some events will not change the price.",
        "notThis": "Some events do not change how much sellers have or how much buyers want, so the price likely stays the same.",
        "groups": [
          {
            "id": "up",
            "label": "Price likely goes up"
          },
          {
            "id": "down",
            "label": "Price likely goes down"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "peach",
            "label": "Many new farmers start growing and selling peaches in the Hill Country.",
            "clue": "More people join the business"
          },
          {
            "id": "wrap",
            "label": "After the holidays, very few people want to buy wrapping paper.",
            "clue": "Stores have plenty left"
          },
          {
            "id": "gas",
            "label": "A hurricane shuts down Texas refineries, so less gasoline gets made.",
            "clue": "Drivers still need gas"
          },
          {
            "id": "game",
            "label": "A new board game becomes a hit, and everyone wants one.",
            "clue": "It is only a game"
          },
          {
            "id": "tags",
            "label": "A store changes the color of its price tags.",
            "clue": "Price tags are about price"
          },
          {
            "id": "steady",
            "label": "The number of buyers and the amount for sale stay the same as last month.",
            "clue": "The store is still open"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "up",
          "text": "Price likely goes up"
        },
        {
          "id": "sup",
          "text": "Supply changes"
        }
      ],
      "items": [
        {
          "id": "peanut",
          "label": "A drought dries up many Texas peanut fields."
        },
        {
          "id": "sneaker",
          "label": "A fire closes the only factory that makes a popular sneaker."
        },
        {
          "id": "heater",
          "label": "A cold snap makes many more people want to buy heaters."
        },
        {
          "id": "pecan",
          "label": "Farmers harvest the biggest pecan crop in many years."
        },
        {
          "id": "trucks",
          "label": "Five new ice cream trucks start driving through the neighborhood."
        },
        {
          "id": "costume",
          "label": "After Halloween, very few people want to buy costumes."
        }
      ],
      "mc": {
        "prompt": "Five new taco trucks start parking on the same block. What will likely happen to the price of tacos?",
        "choices": [
          {
            "id": "yes",
            "text": "It will likely go down, because there are more sellers."
          },
          {
            "id": "trap",
            "text": "It will likely go up, because the block gets busier."
          },
          {
            "id": "no",
            "text": "It will stay the same, because tacos always cost the same."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the events that would likely make the price of bikes go up.",
        "choices": [
          {
            "id": "want",
            "text": "Many more people decide that they want bikes."
          },
          {
            "id": "storm",
            "text": "A storm damages a factory that makes bikes."
          },
          {
            "id": "shops",
            "text": "Several new bike shops open in town."
          },
          {
            "id": "fewer",
            "text": "Fewer people want to ride bikes this year."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how supply and demand change"
          },
          {
            "id": "trap",
            "text": "how busy the stores look"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.13B-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Which Texas branch?",
    "teks": "4.13B",
    "defs": [
      [
        {
          "term": "Legislative",
          "text": "The branch that makes the laws. In Texas, this branch is called the Legislature, and it has two parts, the House of Representatives and the Senate."
        },
        {
          "term": "Executive",
          "text": "The branch that carries out and enforces the laws. The governor is the leader of this branch, and several other elected officials also work in it."
        }
      ],
      [
        {
          "term": "Legislative",
          "text": "The branch that makes the laws. In Texas, this branch is called the Legislature, and it has two parts, the House of Representatives and the Senate."
        },
        {
          "term": "Executive",
          "text": "The branch that carries out and enforces the laws. The governor is the leader of this branch, and several other elected officials also work in it."
        },
        {
          "term": "Neither",
          "text": "The job belongs to the judicial branch instead. Its courts and judges decide what laws mean and settle disagreements."
        }
      ],
      [
        {
          "term": "Legislative branch",
          "text": "The branch that makes the laws. In Texas, this branch is called the Legislature, and it has two parts, the House of Representatives and the Senate."
        },
        {
          "term": "Works on the budget",
          "text": "The job helps decide how Texas will collect and spend its money. Each state budget covers two years at a time."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each job by the branch of Texas government that does it.",
        "notThis": "Many jobs involve a law, so look closely at who is actually doing the work.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "exe",
            "label": "Executive"
          }
        ],
        "items": [
          {
            "id": "senate",
            "label": "State senators vote on a bill about school safety.",
            "clue": "Voters elect senators"
          },
          {
            "id": "housebill",
            "label": "A member of the Texas House files a new bill.",
            "clue": "It is only an idea so far"
          },
          {
            "id": "bothpass",
            "label": "The Texas House and Senate both pass the same bill.",
            "clue": "Next it goes to the governor"
          },
          {
            "id": "sign",
            "label": "The governor signs a bill, and it becomes a law.",
            "clue": "A new law starts here"
          },
          {
            "id": "veto",
            "label": "The governor vetoes a bill that lawmakers passed.",
            "clue": "Decides whether a bill survives"
          },
          {
            "id": "special",
            "label": "The governor calls lawmakers back to Austin for a special session.",
            "clue": "Lawmakers will meet again"
          }
        ]
      },
      {
        "rule": "Sort by branch again, but some jobs belong to neither of these branches.",
        "notThis": "A job can involve laws or lawmakers and still belong to a different branch of government.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "exe",
            "label": "Executive"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "budget",
            "label": "The Legislature passes the state budget for the next two years.",
            "clue": "It is about money"
          },
          {
            "id": "override",
            "label": "Lawmakers vote again and override the governor's veto.",
            "clue": "The governor said no"
          },
          {
            "id": "lineitem",
            "label": "The governor crosses out one spending item in the budget bill.",
            "clue": "It changes the budget"
          },
          {
            "id": "appoint",
            "label": "The governor appoints the Texas secretary of state.",
            "clue": "The Senate must agree"
          },
          {
            "id": "court",
            "label": "The Texas Supreme Court decides a case about how a law should work.",
            "clue": "It is about a law"
          },
          {
            "id": "judge",
            "label": "A judge decides whether a law follows the Texas Constitution.",
            "clue": "Checks a law"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "leg",
          "text": "Legislative branch"
        },
        {
          "id": "bud",
          "text": "Works on the budget"
        }
      ],
      "items": [
        {
          "id": "housebud",
          "label": "The Texas House votes on the state budget."
        },
        {
          "id": "fishlaw",
          "label": "Lawmakers pass a new law about fishing in Texas lakes."
        },
        {
          "id": "comptroller",
          "label": "The comptroller, an executive official, estimates how much tax money Texas will collect."
        },
        {
          "id": "lineitemV",
          "label": "The governor uses a line-item veto on the budget bill."
        },
        {
          "id": "specialV",
          "label": "The governor calls a special session about school safety."
        },
        {
          "id": "trial",
          "label": "A judge listens to both sides in a Texas court case."
        }
      ],
      "mc": {
        "prompt": "The governor signs a bill, and it becomes a law. Which branch did the signing?",
        "choices": [
          {
            "id": "yes",
            "text": "The executive branch, because the governor leads that branch."
          },
          {
            "id": "trap",
            "text": "The legislative branch, because signing the bill created a new law."
          },
          {
            "id": "no",
            "text": "The judicial branch, because every bill is about a law."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the jobs that belong to the legislative branch of Texas.",
        "choices": [
          {
            "id": "write",
            "text": "Writing and passing new bills."
          },
          {
            "id": "override",
            "text": "Voting to override a governor's veto."
          },
          {
            "id": "veto",
            "text": "Vetoing a bill that lawmakers passed."
          },
          {
            "id": "court",
            "text": "Deciding what a law means in a court case."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which branch does the job"
          },
          {
            "id": "trap",
            "text": "whether the job involves a law"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.14A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Texas or the U.S.?",
    "teks": "4.14A",
    "defs": [
      [
        {
          "term": "Texas symbol",
          "text": "It stands for the state of Texas. It may be an official state symbol or an important Texas landmark."
        },
        {
          "term": "U.S. symbol",
          "text": "It stands for the whole United States, which includes Texas and 49 other states."
        }
      ],
      [
        {
          "term": "Texas symbol",
          "text": "It stands for the state of Texas. It may be an official state symbol or an important Texas landmark."
        },
        {
          "term": "U.S. symbol",
          "text": "It stands for the whole United States, which includes Texas and 49 other states."
        },
        {
          "term": "Neither",
          "text": "It stands for a different country or place, not Texas and not the United States."
        }
      ],
      [
        {
          "term": "Texas symbol",
          "text": "It stands for the state of Texas. It may be an official state symbol or an important Texas landmark."
        },
        {
          "term": "Flew over Texas",
          "text": "It is the flag of one of the six nations that have ruled Texas."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each symbol by the place that it stands for.",
        "notThis": "Colors, animals, and history can be shared, so ask which place the symbol stands for.",
        "groups": [
          {
            "id": "tx",
            "label": "Texas symbol"
          },
          {
            "id": "us",
            "label": "U.S. symbol"
          }
        ],
        "items": [
          {
            "id": "lonestar",
            "label": "Lone Star flag",
            "clue": "Red, white, and blue"
          },
          {
            "id": "bluebonnet",
            "label": "Bluebonnet",
            "clue": "Grows along many highways"
          },
          {
            "id": "alamo",
            "label": "The Alamo",
            "clue": "Visitors come from everywhere"
          },
          {
            "id": "eagle",
            "label": "Bald eagle",
            "clue": "Also lives in Texas"
          },
          {
            "id": "usflag",
            "label": "Flag of the United States",
            "clue": "Flies above the Texas Capitol"
          },
          {
            "id": "liberty",
            "label": "Statue of Liberty",
            "clue": "Holds a torch high"
          }
        ]
      },
      {
        "rule": "Sort by what each symbol stands for, but some stand for neither.",
        "notThis": "Some symbols stand for a place that is not Texas and not the United States. Ask which place.",
        "groups": [
          {
            "id": "tx",
            "label": "Texas symbol"
          },
          {
            "id": "us",
            "label": "U.S. symbol"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "mocking",
            "label": "Mockingbird",
            "clue": "Lives in many states"
          },
          {
            "id": "sanjac",
            "label": "San Jacinto Monument",
            "clue": "Taller than the Washington Monument"
          },
          {
            "id": "bell",
            "label": "Liberty Bell",
            "clue": "Has a famous crack"
          },
          {
            "id": "uscap",
            "label": "U.S. Capitol in Washington, D.C.",
            "clue": "Lawmakers meet inside"
          },
          {
            "id": "canada",
            "label": "Canada's maple leaf flag",
            "clue": "Red and white"
          },
          {
            "id": "bigben",
            "label": "Big Ben's clock tower",
            "clue": "A famous tall tower"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "tx",
          "text": "Texas symbol"
        },
        {
          "id": "flew",
          "text": "Flew over Texas"
        }
      ],
      "items": [
        {
          "id": "lonestarV",
          "label": "Lone Star flag"
        },
        {
          "id": "usflagV",
          "label": "Flag of the United States"
        },
        {
          "id": "pecan",
          "label": "Pecan tree"
        },
        {
          "id": "txcap",
          "label": "Texas State Capitol"
        },
        {
          "id": "canadaV",
          "label": "Canada's maple leaf flag"
        },
        {
          "id": "statueV",
          "label": "Statue of Liberty"
        }
      ],
      "mc": {
        "prompt": "The Lone Star flag is red, white, and blue, just like the flag of the United States. What does it stand for?",
        "choices": [
          {
            "id": "yes",
            "text": "It stands for Texas, because it is the official state flag."
          },
          {
            "id": "trap",
            "text": "It stands for the United States, because it shares the same colors."
          },
          {
            "id": "no",
            "text": "It stands for a different country, because it has only one star."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the symbols and landmarks that represent Texas.",
        "choices": [
          {
            "id": "bonnet",
            "text": "The bluebonnet"
          },
          {
            "id": "mock",
            "text": "The mockingbird"
          },
          {
            "id": "alamo",
            "text": "The Alamo in San Antonio"
          },
          {
            "id": "eagle",
            "text": "The bald eagle"
          },
          {
            "id": "bell",
            "text": "The Liberty Bell"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which place a symbol stands for"
          },
          {
            "id": "trap",
            "text": "what colors or animals it shows"
          }
        ]
      }
    }
  },
  {
    "id": "SS-4.19A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Alamo sources",
    "teks": "4.19A",
    "defs": [
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there."
        },
        {
          "term": "Neither",
          "text": "The source is about a different event in Texas history, not the Texas Revolution."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made by someone who was there, took part, or lived through it at the time."
        },
        {
          "term": "About the Alamo",
          "text": "The source describes or shows the siege and battle at the Alamo in 1836."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each source by whether its maker was there or took part.",
        "notThis": "An old or exciting source is not automatically primary, because its maker still needs to have been there.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "travis",
            "label": "William B. Travis's letter from the Alamo, February 24, 1836",
            "clue": "Asks for help"
          },
          {
            "id": "houston",
            "label": "Sam Houston's official report on the Battle of San Jacinto, April 1836",
            "clue": "Sent to the Texas president"
          },
          {
            "id": "santa",
            "label": "Santa Anna's memoir about the war, written decades later",
            "clue": "Written long after 1836"
          },
          {
            "id": "onder",
            "label": "Robert Onderdonk's painting The Fall of the Alamo, about 1903",
            "clue": "More than 100 years old"
          },
          {
            "id": "dawn",
            "label": "Henry McArdle's painting Dawn at the Alamo, finished in 1905",
            "clue": "Full of battle action"
          },
          {
            "id": "textbook",
            "label": "A Texas history textbook printed a few years ago",
            "clue": "Full of facts and dates"
          }
        ]
      },
      {
        "rule": "Sort each source again, but some are not about the Texas Revolution.",
        "notThis": "Some sources are about a different part of Texas history. Check the event first, then the maker.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "decl",
            "label": "The Texas Declaration of Independence, signed March 2, 1836",
            "clue": "Written at Washington-on-the-Brazos"
          },
          {
            "id": "dickinson",
            "label": "Susanna Dickinson's account of surviving the Alamo, told years later",
            "clue": "Told long after the battle"
          },
          {
            "id": "sjpaint",
            "label": "Henry McArdle's painting The Battle of San Jacinto, finished in 1895",
            "clue": "Painted in the 1800s"
          },
          {
            "id": "museum",
            "label": "A sign beside a display in the Alamo museum today",
            "clue": "Found at the real Alamo"
          },
          {
            "id": "spindle",
            "label": "A 1901 photo of the Spindletop oil gusher",
            "clue": "An old Texas photo"
          },
          {
            "id": "dust",
            "label": "A 1930s photo of a dust storm in the Texas Panhandle",
            "clue": "The photographer was there"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pri",
          "text": "Primary source"
        },
        {
          "id": "alamo",
          "text": "About the Alamo"
        }
      ],
      "items": [
        {
          "id": "travisV",
          "label": "William B. Travis's letter from the Alamo, February 24, 1836"
        },
        {
          "id": "dickV",
          "label": "Susanna Dickinson's account of surviving the Alamo"
        },
        {
          "id": "declV",
          "label": "The Texas Declaration of Independence, March 2, 1836"
        },
        {
          "id": "houstonV",
          "label": "Sam Houston's official report on the Battle of San Jacinto"
        },
        {
          "id": "onderV",
          "label": "Robert Onderdonk's painting The Fall of the Alamo, about 1903"
        },
        {
          "id": "sjV",
          "label": "Henry McArdle's painting The Battle of San Jacinto, 1895"
        }
      ],
      "mc": {
        "prompt": "Santa Anna wrote about the war many years after it ended. What kind of source is his writing?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a primary source, because he took part in the war."
          },
          {
            "id": "trap",
            "text": "It is a secondary source, because he wrote it long after the war."
          },
          {
            "id": "no",
            "text": "It is not a source, because he fought on the Mexican side."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sources that are primary sources about the Texas Revolution.",
        "choices": [
          {
            "id": "letter",
            "text": "A letter Travis wrote during the siege of the Alamo."
          },
          {
            "id": "report",
            "text": "A report Sam Houston wrote right after San Jacinto."
          },
          {
            "id": "paint",
            "text": "A painting of the Alamo that was made in 1903."
          },
          {
            "id": "sign",
            "text": "A museum sign that was written in modern times."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the maker was there"
          },
          {
            "id": "trap",
            "text": "how old the source is"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.6A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Properties that matter",
    "teks": "5.6A",
    "defs": [
      [
        {
          "term": "Conducts electricity",
          "text": "Electricity flows through this material easily, so it can be part of a working circuit."
        },
        {
          "term": "Insulates electricity",
          "text": "This material blocks electricity, so a current cannot pass through it."
        }
      ],
      [
        {
          "term": "Conducts electricity",
          "text": "Electricity flows through this material easily, so it can be part of a working circuit."
        },
        {
          "term": "Insulates electricity",
          "text": "This material blocks electricity, so a current cannot pass through it."
        },
        {
          "term": "Neither",
          "text": "It is energy, not matter, so it has no way to carry or block a current."
        }
      ],
      [
        {
          "term": "Conducts electricity",
          "text": "Electricity flows through this material easily, so it can be part of a working circuit."
        },
        {
          "term": "Magnetic",
          "text": "A magnet pulls on it, or it is a magnet itself."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each material by whether electricity can flow through it.",
        "notThis": "A magnet test does not tell you if electricity can flow, and a shiny look does not always mean metal.",
        "groups": [
          {
            "id": "cond",
            "label": "Conducts electricity"
          },
          {
            "id": "ins",
            "label": "Insulates electricity"
          }
        ],
        "items": [
          {
            "id": "copper",
            "label": "A coil of bare copper wire hangs on a hook.",
            "clue": "A magnet will not pick it up"
          },
          {
            "id": "can",
            "label": "An aluminum soda can",
            "clue": "Magnets slide right off it"
          },
          {
            "id": "graphite",
            "label": "The gray graphite core of a pencil",
            "clue": "It is not a metal"
          },
          {
            "id": "rubber",
            "label": "A rubber band holds a stack of cards together.",
            "clue": "It stretches and bends"
          },
          {
            "id": "plasticspoon",
            "label": "A shiny silver plastic spoon",
            "clue": "It looks like metal"
          },
          {
            "id": "stick",
            "label": "A dry wooden craft stick lies on a desk.",
            "clue": "It came from a tree"
          }
        ]
      },
      {
        "rule": "Sort by whether electricity can flow through it. Some items are not materials.",
        "notThis": "Conducting and insulating are properties of matter, so a thing that is only energy fits neither group.",
        "groups": [
          {
            "id": "cond",
            "label": "Conducts electricity"
          },
          {
            "id": "ins",
            "label": "Insulates electricity"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "saltwater",
            "label": "A cup of salt water",
            "clue": "It is not a metal"
          },
          {
            "id": "gold",
            "label": "A gold ring rests on a small dish.",
            "clue": "A magnet cannot lift it"
          },
          {
            "id": "glass",
            "label": "An empty glass jar sits on a shelf.",
            "clue": "It is hard and smooth"
          },
          {
            "id": "coating",
            "label": "The plastic coating on a lamp cord",
            "clue": "It wraps around metal wire"
          },
          {
            "id": "sunbeam",
            "label": "A beam of sunlight through a window",
            "clue": "It carries energy"
          },
          {
            "id": "sound",
            "label": "The sound that travels from a ringing bell",
            "clue": "The bell is made of metal"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cond",
          "text": "Conducts electricity"
        },
        {
          "id": "mag",
          "text": "Magnetic"
        }
      ],
      "items": [
        {
          "id": "nailV",
          "label": "An iron nail"
        },
        {
          "id": "clipV",
          "label": "A bare steel paper clip"
        },
        {
          "id": "copperV",
          "label": "A copper pipe"
        },
        {
          "id": "foilV",
          "label": "A sheet of aluminum foil"
        },
        {
          "id": "fridgeV",
          "label": "A flexible rubber fridge magnet"
        },
        {
          "id": "marbleV",
          "label": "A glass marble"
        }
      ],
      "mc": {
        "prompt": "A magnet does not pull on a strip of aluminum foil. Which statement is true?",
        "choices": [
          {
            "id": "yes",
            "text": "The foil still conducts electricity, because many metals are not magnetic."
          },
          {
            "id": "trap",
            "text": "The foil must be an insulator, because magnets attract all metals."
          },
          {
            "id": "no",
            "text": "The foil must be a gas, because it is so thin."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the materials that conduct electricity.",
        "choices": [
          {
            "id": "wire",
            "text": "A copper wire"
          },
          {
            "id": "lead",
            "text": "The graphite in a pencil"
          },
          {
            "id": "band",
            "text": "A rubber band"
          },
          {
            "id": "mar",
            "text": "A glass marble"
          },
          {
            "id": "ring",
            "text": "A gold ring"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether electricity can flow through it"
          },
          {
            "id": "trap",
            "text": "whether a magnet pulls on it"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.8C-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Where does the light go?",
    "teks": "5.8C",
    "defs": [
      [
        {
          "term": "Reflected",
          "text": "Light bounces off a surface and travels away in a new direction, which is how you see an image or a bright shine."
        },
        {
          "term": "Refracted",
          "text": "Light bends when it passes from one transparent material into another, such as from air into water or glass."
        }
      ],
      [
        {
          "term": "Reflected",
          "text": "Light bounces off a surface and travels away in a new direction, which is how you see an image or a bright shine."
        },
        {
          "term": "Refracted",
          "text": "Light bends when it passes from one transparent material into another, such as from air into water or glass."
        },
        {
          "term": "Neither",
          "text": "The light is absorbed, which means the material takes it in and usually warms up instead of sending the light onward."
        }
      ],
      [
        {
          "term": "Light is reflected",
          "text": "Light bounces off a surface and travels away in a new direction, which is how you see an image or a bright shine."
        },
        {
          "term": "Light is refracted",
          "text": "Light bends when it passes from one transparent material into another, such as from air into water or glass."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by the main thing that happens to the light.",
        "notThis": "Shiny is not the rule. Light can also bend as it passes through clear glass or water.",
        "groups": [
          {
            "id": "refl",
            "label": "Reflected"
          },
          {
            "id": "refr",
            "label": "Refracted"
          }
        ],
        "items": [
          {
            "id": "mirror",
            "label": "You see your face in a bathroom mirror while brushing your teeth.",
            "clue": "Flat, smooth glass"
          },
          {
            "id": "moon",
            "label": "The full moon brightly illuminates a dark field at night.",
            "clue": "It seems to glow on its own"
          },
          {
            "id": "lake",
            "label": "The trees on the shore appear upside down on a calm lake.",
            "clue": "The water is clear"
          },
          {
            "id": "straw",
            "label": "A straw in a glass of water looks broken right at the waterline.",
            "clue": "The water surface is shiny"
          },
          {
            "id": "lens",
            "label": "A magnifying lens makes the tiny print on a coin appear much larger.",
            "clue": "Its glass is polished and shiny"
          },
          {
            "id": "glasses",
            "label": "A student's eyeglasses help her read the board from the back row.",
            "clue": "The lenses shine under bright lights"
          }
        ]
      },
      {
        "rule": "Sort by the main thing that happens to the light. Some light is neither.",
        "notThis": "A picture that looks stretched or bent is not always refraction, so decide whether the light bounced back or passed through.",
        "groups": [
          {
            "id": "refl",
            "label": "Reflected"
          },
          {
            "id": "refr",
            "label": "Refracted"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "spoon",
            "label": "The back of a shiny metal spoon shows a stretched picture of your face.",
            "clue": "The picture looks bent"
          },
          {
            "id": "reflector",
            "label": "A bike reflector glows red when car headlights shine on it at night.",
            "clue": "It looks like it lights up"
          },
          {
            "id": "coin",
            "label": "A coin at the bottom of a pool appears closer than it actually is.",
            "clue": "The pool water sparkles"
          },
          {
            "id": "prism",
            "label": "A glass prism spreads a beam of sunlight into a band of colors.",
            "clue": "Its glass edges shine"
          },
          {
            "id": "shirt",
            "label": "A black T-shirt gets hot after an hour in the afternoon sun.",
            "clue": "Sunlight hits it all afternoon"
          },
          {
            "id": "solar",
            "label": "A dark solar panel collects sunlight to produce electricity for a house.",
            "clue": "Its glass top is shiny"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "refl",
          "text": "Light is reflected"
        },
        {
          "id": "refr",
          "text": "Light is refracted"
        }
      ],
      "items": [
        {
          "id": "rainbowV",
          "label": "Sunlight passes into raindrops, bounces off the back of each drop, and comes out as a rainbow."
        },
        {
          "id": "dentistV",
          "label": "A dentist's small mirror shows the back of a patient's tooth."
        },
        {
          "id": "signV",
          "label": "A highway sign shines brightly in a car's headlights at night."
        },
        {
          "id": "marbleV",
          "label": "A clear glass marble makes the picture behind it look upside down."
        },
        {
          "id": "fishV",
          "label": "A goldfish in a round bowl appears larger than its actual size."
        },
        {
          "id": "roadV",
          "label": "A dark asphalt road gets hot on a summer afternoon."
        }
      ],
      "mc": {
        "prompt": "When you look down into a clear pond, the bottom appears closer than its actual depth. What is mainly happening to the light?",
        "choices": [
          {
            "id": "yes",
            "text": "It is refracted, because it bends as it passes from the water into the air."
          },
          {
            "id": "trap",
            "text": "It is reflected, because the surface of the pond is shiny."
          },
          {
            "id": "no",
            "text": "It is absorbed, because the mud at the bottom takes in all of it."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the examples where light is mainly reflected.",
        "choices": [
          {
            "id": "peri",
            "text": "A sailor uses a periscope with mirrors to see above the water."
          },
          {
            "id": "glare",
            "text": "Sunlight shines off a still pond so brightly that it hurts your eyes."
          },
          {
            "id": "focus",
            "text": "A glass lens bends sunlight onto one small, bright spot."
          },
          {
            "id": "seat",
            "text": "A black car seat gets hot while the car is parked in the sun."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the light"
          },
          {
            "id": "trap",
            "text": "how shiny the object looks"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.8A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Where does the energy end up?",
    "teks": "5.8A",
    "defs": [
      [
        {
          "term": "Ends as light",
          "text": "The device is built mainly to produce light energy so that people can see."
        },
        {
          "term": "Ends as motion",
          "text": "The device is built mainly to produce motion, so a part of it spins, moves, or carries something."
        }
      ],
      [
        {
          "term": "Ends as light",
          "text": "The device is built mainly to produce light energy so that people can see."
        },
        {
          "term": "Ends as motion",
          "text": "The device is built mainly to produce motion, so a part of it spins, moves, or carries something."
        },
        {
          "term": "Neither",
          "text": "The device is built mainly to produce sound or thermal energy instead of light or motion."
        }
      ],
      [
        {
          "term": "Uses electricity",
          "text": "The device receives electrical energy from a battery, an outlet, or wires."
        },
        {
          "term": "Ends as light",
          "text": "The device is built mainly to produce light energy so that people can see."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each device by the useful energy it is built to produce.",
        "notThis": "Most devices also give off a little sound or heat, so a hum or warm feeling is not the device's main job.",
        "groups": [
          {
            "id": "light",
            "label": "Ends as light"
          },
          {
            "id": "motion",
            "label": "Ends as motion"
          }
        ],
        "items": [
          {
            "id": "flash",
            "label": "A flashlight changes the chemical energy in its batteries into a bright beam.",
            "clue": "It clicks when you switch it"
          },
          {
            "id": "desklamp",
            "label": "A desk lamp shines on a notebook while a student does homework.",
            "clue": "The bulb feels warm"
          },
          {
            "id": "string",
            "label": "A string of holiday lights glows along the edge of a roof.",
            "clue": "It uses electricity from the house"
          },
          {
            "id": "fan",
            "label": "A ceiling fan turns slowly above a living room on a hot day.",
            "clue": "It makes a soft humming sound"
          },
          {
            "id": "toothbrush",
            "label": "An electric toothbrush wiggles its bristles back and forth.",
            "clue": "It buzzes loudly"
          },
          {
            "id": "blender",
            "label": "A blender spins its blades to mix a fruit smoothie.",
            "clue": "It is very noisy"
          }
        ]
      },
      {
        "rule": "Sort each device by the useful energy it is built to produce. Some produce neither.",
        "notThis": "A device that glows or moves a little part is not always built for light or motion, so identify its particular job.",
        "groups": [
          {
            "id": "light",
            "label": "Ends as light"
          },
          {
            "id": "motion",
            "label": "Ends as motion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "projector",
            "label": "A projector shines a movie onto a big classroom screen.",
            "clue": "Its fan blows warm air"
          },
          {
            "id": "exit",
            "label": "An exit sign glows above a doorway all night long.",
            "clue": "It never switches off"
          },
          {
            "id": "washer",
            "label": "A washing machine spins its drum to wash a load of clothes.",
            "clue": "It thumps loudly"
          },
          {
            "id": "elevator",
            "label": "An elevator carries people from the first floor to the fifth.",
            "clue": "A bell dings at each floor"
          },
          {
            "id": "toaster",
            "label": "A toaster browns two slices of bread for breakfast.",
            "clue": "Its wires glow bright orange"
          },
          {
            "id": "speaker",
            "label": "A speaker plays music loudly at a backyard party.",
            "clue": "Its cone shakes back and forth"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "elec",
          "text": "Uses electricity"
        },
        {
          "id": "light",
          "text": "Ends as light"
        }
      ],
      "items": [
        {
          "id": "flashV",
          "label": "A flashlight lights a trail during a camping trip."
        },
        {
          "id": "streetV",
          "label": "A streetlight glows above a sidewalk at night."
        },
        {
          "id": "candleV",
          "label": "A candle"
        },
        {
          "id": "glowV",
          "label": "A glow stick"
        },
        {
          "id": "fanV",
          "label": "An electric fan"
        },
        {
          "id": "windupV",
          "label": "A wind-up toy car"
        }
      ],
      "mc": {
        "prompt": "A toaster's wires glow bright orange while it works. What useful energy is the toaster built to produce?",
        "choices": [
          {
            "id": "yes",
            "text": "Thermal energy, because its job is to heat and brown the bread."
          },
          {
            "id": "trap",
            "text": "Light energy, because its wires glow brightly while it works."
          },
          {
            "id": "no",
            "text": "Motion energy, because the bread moves up and down."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the devices that are mainly built to change electrical energy into motion.",
        "choices": [
          {
            "id": "cfan",
            "text": "A ceiling fan that moves air around a room."
          },
          {
            "id": "sharp",
            "text": "An electric pencil sharpener that spins to sharpen a pencil."
          },
          {
            "id": "lamp",
            "text": "A reading lamp that shines on a book."
          },
          {
            "id": "bell",
            "text": "A doorbell that rings when someone presses the button."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the job each device is built to do"
          },
          {
            "id": "trap",
            "text": "what you notice first when it runs"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.10C-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "What built this landform?",
    "teks": "5.10C",
    "defs": [
      [
        {
          "term": "Wind",
          "text": "Moving air gradually carried sand and deposited it in a new location, piling it into hills."
        },
        {
          "term": "Water",
          "text": "Moving liquid water, such as a river or ocean waves, carved away rock or dropped mud and sand to shape the land."
        }
      ],
      [
        {
          "term": "Wind",
          "text": "Moving air gradually carried sand and deposited it in a new location, piling it into hills."
        },
        {
          "term": "Water",
          "text": "Moving liquid water, such as a river or ocean waves, carved away rock or dropped mud and sand to shape the land."
        },
        {
          "term": "Neither",
          "text": "A different force formed it, such as a huge glacier of ice that slowly scraped the land."
        }
      ],
      [
        {
          "term": "Built by dropped material",
          "text": "Wind, water, or ice carried sand, mud, or rock and dropped it, so the landform grew in that spot."
        },
        {
          "term": "Flowing water made it",
          "text": "Liquid water, such as a river or ocean waves, carved away rock or dropped mud and sand."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by what shaped each landform over a very long time.",
        "notThis": "The weather around a landform today does not tell you what formed it, so think about which force could carve or pile up that shape.",
        "groups": [
          {
            "id": "wind",
            "label": "Wind"
          },
          {
            "id": "water",
            "label": "Water"
          }
        ],
        "items": [
          {
            "id": "grand",
            "label": "The Grand Canyon cuts more than a mile deep into Arizona rock.",
            "clue": "The land around it is desert"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon stretches across the Texas Panhandle with tall red cliffs.",
            "clue": "Strong winds blow there often"
          },
          {
            "id": "delta",
            "label": "The Mississippi River delta spreads into the Gulf of Mexico like a bird's foot.",
            "clue": "Shaped like a bird's foot"
          },
          {
            "id": "whitesands",
            "label": "The White Sands dunes in New Mexico are made of bright white grains.",
            "clue": "Near a dried-up lake bed"
          },
          {
            "id": "padre",
            "label": "Tall sand dunes line the beach on Padre Island in Texas.",
            "clue": "Right next to the ocean"
          },
          {
            "id": "greatsand",
            "label": "Great Sand Dunes in Colorado holds the tallest dunes in North America.",
            "clue": "A creek flows along its edge"
          }
        ]
      },
      {
        "rule": "Sort by what shaped each landform. Some were formed by something else.",
        "notThis": "A landform that holds water today was not necessarily carved by flowing water, so think about what moved across it long ago.",
        "groups": [
          {
            "id": "wind",
            "label": "Wind"
          },
          {
            "id": "water",
            "label": "Water"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "santaelena",
            "label": "Santa Elena Canyon has cliffs about 1,500 feet tall in Big Bend National Park.",
            "clue": "Found in the dry Chihuahuan Desert"
          },
          {
            "id": "horseshoe",
            "label": "Horseshoe Bend is a deep curve in the red rock of northern Arizona.",
            "clue": "Red desert rock all around"
          },
          {
            "id": "monahans",
            "label": "The Monahans Sandhills rise from the flat land of West Texas.",
            "clue": "Short oak bushes grow there"
          },
          {
            "id": "indiana",
            "label": "Sand dunes rise along the shore of Lake Michigan in Indiana.",
            "clue": "Next to a huge lake"
          },
          {
            "id": "yosemite",
            "label": "Yosemite Valley in California has a wide, U-shaped floor between granite cliffs.",
            "clue": "A river runs through it"
          },
          {
            "id": "greatlakes",
            "label": "The giant basins that hold the Great Lakes were scooped out long ago.",
            "clue": "Now filled with fresh water"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "drop",
          "text": "Built by dropped material"
        },
        {
          "id": "water",
          "text": "Flowing water made it"
        }
      ],
      "items": [
        {
          "id": "nileV",
          "label": "The Nile River delta fans out where Egypt meets the Mediterranean Sea."
        },
        {
          "id": "beachV",
          "label": "A sandy beach builds up as waves carry sand onto the shore."
        },
        {
          "id": "deathV",
          "label": "Sand dunes pile up on the floor of Death Valley."
        },
        {
          "id": "moraineV",
          "label": "A long ridge of rocks is left behind where a glacier melted."
        },
        {
          "id": "gunnisonV",
          "label": "The Black Canyon of the Gunnison has steep, dark walls in Colorado."
        },
        {
          "id": "glacierV",
          "label": "A U-shaped valley curves between the peaks of Glacier National Park."
        }
      ],
      "mc": {
        "prompt": "A deep, winding canyon cuts through a dry desert where rain is rare and strong winds blow. What most likely carved it?",
        "choices": [
          {
            "id": "yes",
            "text": "A river that slowly wore away the rock over millions of years."
          },
          {
            "id": "trap",
            "text": "Strong desert winds, because the land around it is dry and windy."
          },
          {
            "id": "no",
            "text": "Sand dunes that slid across the desert floor."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the landforms that flowing liquid water helped form.",
        "choices": [
          {
            "id": "delta",
            "text": "A delta that forms where a river flows into the sea."
          },
          {
            "id": "canyon",
            "text": "A canyon with a river winding along its bottom."
          },
          {
            "id": "dune",
            "text": "A sand dune in the middle of a windy desert."
          },
          {
            "id": "uvalley",
            "text": "A U-shaped valley that a glacier scraped out."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what force shaped the landform"
          },
          {
            "id": "trap",
            "text": "what the land around it is like today"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.12A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "What is it interacting with?",
    "teks": "5.12A",
    "defs": [
      [
        {
          "term": "With a biotic factor",
          "text": "The organism interacts with something living or once living, such as a plant, an animal, or a bone from an animal that died."
        },
        {
          "term": "With an abiotic factor",
          "text": "The organism interacts with something that was never alive, such as sunlight, water, soil, air, or temperature."
        }
      ],
      [
        {
          "term": "With a biotic factor",
          "text": "The organism interacts with something living or once living, such as a plant, an animal, or a bone from an animal that died."
        },
        {
          "term": "With an abiotic factor",
          "text": "The organism interacts with something that was never alive, such as sunlight, water, soil, air, or temperature."
        },
        {
          "term": "Neither",
          "text": "No organism is part of the interaction, so nothing living is involved in the event at all."
        }
      ],
      [
        {
          "term": "Biotic factor",
          "text": "It is living, or it was once part of a living thing."
        },
        {
          "term": "Frog needs it",
          "text": "A pond frog could not survive for long without this particular factor."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort by the kind of factor the organism is interacting with.",
        "notThis": "Something that is dead, dry, or still is not automatically abiotic, because once-living things count as biotic.",
        "groups": [
          {
            "id": "bio",
            "label": "With a biotic factor"
          },
          {
            "id": "abio",
            "label": "With an abiotic factor"
          }
        ],
        "items": [
          {
            "id": "mushroom",
            "label": "Mushrooms grow on a fallen log and gradually break it down.",
            "clue": "The log stopped growing years ago"
          },
          {
            "id": "millipede",
            "label": "A millipede munches on dry, brown leaves on the forest floor.",
            "clue": "The leaves are dead and crunchy"
          },
          {
            "id": "bee",
            "label": "A honeybee sips nectar from a flower in a meadow.",
            "clue": "The flower cannot move"
          },
          {
            "id": "lizard",
            "label": "A lizard lies on a sunny rock to warm its body.",
            "clue": "The rock stays perfectly still"
          },
          {
            "id": "cactus",
            "label": "A cactus soaks up rainwater quickly through its shallow roots.",
            "clue": "Water keeps every organism alive"
          },
          {
            "id": "seedling",
            "label": "A bean seedling bends toward the sunlight coming through a window.",
            "clue": "It grows in a classroom"
          }
        ]
      },
      {
        "rule": "Sort by the kind of factor the organism is interacting with. Some involve no organism.",
        "notThis": "Every interaction on this card needs a living organism, so an event with nothing alive in it does not fit either group.",
        "groups": [
          {
            "id": "bio",
            "label": "With a biotic factor"
          },
          {
            "id": "abio",
            "label": "With an abiotic factor"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "beetle",
            "label": "A beetle lays its eggs inside a rotting tree stump.",
            "clue": "The stump has been dead for years"
          },
          {
            "id": "owl",
            "label": "A barn owl swoops down and catches a mouse in a field.",
            "clue": "It hunts in the dark"
          },
          {
            "id": "fox",
            "label": "An arctic fox grows a thick white coat as the days get shorter and colder each fall.",
            "clue": "Winter returns every year"
          },
          {
            "id": "bird",
            "label": "A sparrow drinks from a puddle after a spring storm.",
            "clue": "The puddle has leaves floating in it"
          },
          {
            "id": "sand",
            "label": "Wind blows loose sand into a tall dune in the desert.",
            "clue": "Moving air is powerful"
          },
          {
            "id": "ice",
            "label": "Water freezes inside a crack and splits a boulder on a cold night.",
            "clue": "Water is needed for life"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "bio",
          "text": "Biotic factor"
        },
        {
          "id": "need",
          "text": "Frog needs it"
        }
      ],
      "items": [
        {
          "id": "insectsV",
          "label": "The insects a pond frog catches to eat"
        },
        {
          "id": "heronV",
          "label": "A heron that hunts for frogs"
        },
        {
          "id": "turtleV",
          "label": "A snapping turtle that lives in the same pond"
        },
        {
          "id": "waterV",
          "label": "The pond water"
        },
        {
          "id": "oxygenV",
          "label": "Oxygen in the air above the pond"
        },
        {
          "id": "bottleV",
          "label": "A metal can at the bottom of the pond"
        }
      ],
      "mc": {
        "prompt": "A woodpecker drills into a dead tree to find insects hiding inside. What kind of factor is the dead tree?",
        "choices": [
          {
            "id": "yes",
            "text": "Biotic, because the tree was once living."
          },
          {
            "id": "trap",
            "text": "Abiotic, because the tree is no longer alive."
          },
          {
            "id": "no",
            "text": "Abiotic, because a tree is a kind of soil."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the abiotic factors that a desert lizard interacts with.",
        "choices": [
          {
            "id": "sun",
            "text": "The sunlight that warms its body each morning"
          },
          {
            "id": "sandx",
            "text": "The hot sand it runs across"
          },
          {
            "id": "cricket",
            "text": "The crickets it catches and eats"
          },
          {
            "id": "hawk",
            "text": "The hawk that hunts it from above"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the factor is living or once living"
          },
          {
            "id": "trap",
            "text": "whether the factor is moving"
          }
        ]
      }
    }
  },
  {
    "id": "SCI-5.13B-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Born knowing it?",
    "teks": "5.13B",
    "defs": [
      [
        {
          "term": "Instinct",
          "text": "An instinct is a behavior an animal is born knowing how to do, so it does not need to be taught or practiced."
        },
        {
          "term": "Learned behavior",
          "text": "A learned behavior is something an animal picks up by watching others, practicing, or experience during its life."
        }
      ],
      [
        {
          "term": "Instinct",
          "text": "An instinct is a behavior an animal is born knowing how to do, so it does not need to be taught or practiced."
        },
        {
          "term": "Learned behavior",
          "text": "A learned behavior is something an animal picks up by watching others, practicing, or experience during its life."
        },
        {
          "term": "Neither",
          "text": "It is a body structure instead of a behavior, so it is a part the animal has rather than an action it performs."
        }
      ],
      [
        {
          "term": "Instinct",
          "text": "An instinct is a behavior an animal is born knowing how to do, so it does not need to be taught or practiced."
        },
        {
          "term": "Helps it find food",
          "text": "The behavior helps the animal locate, catch, or receive food."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each behavior by whether the animal was born knowing it.",
        "notThis": "A complicated behavior is not always learned, and a behavior every member of a group performs is not always an instinct.",
        "groups": [
          {
            "id": "inst",
            "label": "Instinct"
          },
          {
            "id": "lrn",
            "label": "Learned behavior"
          }
        ],
        "items": [
          {
            "id": "hatchling",
            "label": "Sea turtle hatchlings crawl straight toward the ocean right after they hatch.",
            "clue": "They hatch on a dark beach"
          },
          {
            "id": "web",
            "label": "A young garden spider spins a detailed, circular web the first time it tries.",
            "clue": "The pattern is very complex"
          },
          {
            "id": "monarch",
            "label": "Monarch butterflies fly thousands of miles to Mexico for the winter.",
            "clue": "The trip is very long"
          },
          {
            "id": "orca",
            "label": "A pod of orcas works together as a team to hunt seals.",
            "clue": "Every member seems to know its part"
          },
          {
            "id": "chimp",
            "label": "A chimp pokes a thin stick into a nest of termites and pulls them out to eat.",
            "clue": "Its whole group does it"
          },
          {
            "id": "sparrow",
            "label": "A young white-crowned sparrow sings the same local song as the adults nearby.",
            "clue": "Every sparrow in the area sounds alike"
          }
        ]
      },
      {
        "rule": "Sort by whether the animal was born knowing it. Some are not behaviors.",
        "notThis": "A body part that helps an animal survive is not a behavior, even when it is used during a behavior.",
        "groups": [
          {
            "id": "inst",
            "label": "Instinct"
          },
          {
            "id": "lrn",
            "label": "Learned behavior"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "joey",
            "label": "A newborn kangaroo crawls into its mother's pouch on its own.",
            "clue": "It is as small as a jellybean"
          },
          {
            "id": "foal",
            "label": "A newborn foal stands up and finds its mother's milk within hours.",
            "clue": "No one shows it how."
          },
          {
            "id": "dog",
            "label": "A dog sits as soon as its owner says, \"Sit.\"",
            "clue": "It happens without a pause"
          },
          {
            "id": "horse",
            "label": "A horse comes running when it hears its feed bucket rattle.",
            "clue": "It happens every single time"
          },
          {
            "id": "webbed",
            "label": "A duck's wide, webbed feet",
            "clue": "They help it paddle quickly"
          },
          {
            "id": "shell",
            "label": "A box turtle's hard, domed shell",
            "clue": "It protects the turtle from predators"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inst",
          "text": "Instinct"
        },
        {
          "id": "food",
          "text": "Helps it find food"
        }
      ],
      "items": [
        {
          "id": "robinV",
          "label": "A newly hatched robin opens its mouth wide when a parent lands on the nest."
        },
        {
          "id": "puppyV",
          "label": "A newborn puppy crawls to its mother to nurse."
        },
        {
          "id": "fawnV",
          "label": "A newborn deer lies perfectly still in tall grass when danger is near."
        },
        {
          "id": "turtleV",
          "label": "A sea turtle hatchling heads for the waves at night."
        },
        {
          "id": "chimpV",
          "label": "A chimp cracks nuts open with a stone, the way older chimps in its group do."
        },
        {
          "id": "parrotV",
          "label": "A parrot says its owner's name to get attention."
        }
      ],
      "mc": {
        "prompt": "Young orcas hunt in packs the same way the adults in their pod do. Which kind of behavior is this?",
        "choices": [
          {
            "id": "yes",
            "text": "A learned behavior, because young orcas pick it up from older orcas."
          },
          {
            "id": "trap",
            "text": "An instinct, because the whole pod hunts in exactly the same way."
          },
          {
            "id": "no",
            "text": "A body structure, because orcas have strong tails."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the behaviors that are instincts.",
        "choices": [
          {
            "id": "turtle",
            "text": "Sea turtle hatchlings crawl toward the ocean."
          },
          {
            "id": "spider",
            "text": "A spider spins its first web without any help."
          },
          {
            "id": "roll",
            "text": "A dog rolls over whenever it hears the word for a treat."
          },
          {
            "id": "stick",
            "text": "A chimp fishes for termites with a stick."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the animal was born knowing the behavior"
          },
          {
            "id": "trap",
            "text": "how complicated the behavior looks"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.3C-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Greek and Latin roots",
    "teks": "5.3C",
    "defs": [
      [
        {
          "term": "Root geo (earth)",
          "text": "The Greek root geo means earth, so a word built with it usually connects to the ground, rocks, land, or the whole planet."
        },
        {
          "term": "Root photo (light)",
          "text": "The Greek root photo means light. A word built with it has a meaning connected to light, even when the word's topic seems to be about something else."
        }
      ],
      [
        {
          "term": "Root geo (earth)",
          "text": "The Greek root geo means earth, so a word built with it usually connects to the ground, rocks, land, or the whole planet."
        },
        {
          "term": "Root photo (light)",
          "text": "The Greek root photo means light. A word built with it has a meaning connected to light, even when the word's topic seems to be about something else."
        },
        {
          "term": "Neither",
          "text": "The word has a different root. Sometimes it only shares a few letters with a root, which is not the same as actually containing that particular root."
        }
      ],
      [
        {
          "term": "Root geo (earth)",
          "text": "The Greek root geo means earth, so a word built with it usually connects to the ground, rocks, land, or the whole planet."
        },
        {
          "term": "Root graph (write)",
          "text": "The Greek root graph means to write or draw, so a word built with it usually names something written, drawn, or recorded."
        },
        {
          "term": "Center",
          "text": "The word contains both roots, so their two meanings are combined inside one word."
        },
        {
          "term": "Outside",
          "text": "The word contains neither root, even if some of its letters look familiar or similar."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each word by the Greek root it contains. Ignore the subject the word seems to belong to.",
        "notThis": "A root keeps its meaning inside a science word or a math word, so the topic of a word can easily mislead you.",
        "groups": [
          {
            "id": "geo",
            "label": "Root geo (earth)"
          },
          {
            "id": "photo",
            "label": "Root photo (light)"
          }
        ],
        "items": [
          {
            "id": "geometry",
            "label": "geometry",
            "clue": "A kind of math class"
          },
          {
            "id": "geode",
            "label": "geode",
            "clue": "A plain rock with crystals inside"
          },
          {
            "id": "geology",
            "label": "geology",
            "clue": "Scientists study rocks"
          },
          {
            "id": "photograph",
            "label": "photograph",
            "clue": "Taken with a camera"
          },
          {
            "id": "photocopy",
            "label": "photocopy",
            "clue": "Made by an office machine"
          },
          {
            "id": "photosyn",
            "label": "photosynthesis",
            "clue": "How plants make their food"
          }
        ]
      },
      {
        "rule": "Sort each word by its Greek root. Some words have neither root.",
        "notThis": "Matching letters are not enough, because a real root must also carry its meaning into the word.",
        "groups": [
          {
            "id": "geo",
            "label": "Root geo (earth)"
          },
          {
            "id": "photo",
            "label": "Root photo (light)"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "geothermal",
            "label": "geothermal",
            "clue": "Heats some homes and pools"
          },
          {
            "id": "geographer",
            "label": "geographer",
            "clue": "Has graph in it too"
          },
          {
            "id": "telephoto",
            "label": "telephoto",
            "clue": "Starts with tele"
          },
          {
            "id": "surgeon",
            "label": "surgeon",
            "clue": "Has g, e, o in a row"
          },
          {
            "id": "dungeon",
            "label": "dungeon",
            "clue": "Built deep underground"
          },
          {
            "id": "biology",
            "label": "biology",
            "clue": "Ends in -logy, like geology"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "geo",
          "text": "Root geo (earth)"
        },
        {
          "id": "graph",
          "text": "Root graph (write)"
        }
      ],
      "items": [
        {
          "id": "geographyV",
          "label": "geography"
        },
        {
          "id": "geologistV",
          "label": "geologist"
        },
        {
          "id": "autographV",
          "label": "autograph"
        },
        {
          "id": "photographerV",
          "label": "photographer"
        },
        {
          "id": "pigeonV",
          "label": "pigeon"
        },
        {
          "id": "telephoneV",
          "label": "telephone"
        }
      ],
      "mc": {
        "prompt": "Ava notices the letters g, e, o in the middle of the word pigeon. She decides that pigeon must be a geo word. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because those letters do not carry the meaning earth in that particular word."
          },
          {
            "id": "trap",
            "text": "Yes, because every word containing those three letters has the root geo."
          },
          {
            "id": "no",
            "text": "No, because the root geo can only appear at the very end of a word."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the words that contain a Greek root meaning light.",
        "choices": [
          {
            "id": "cell",
            "text": "photocell"
          },
          {
            "id": "phone",
            "text": "telephone"
          },
          {
            "id": "syn",
            "text": "photosynthesis"
          },
          {
            "id": "tele",
            "text": "telephoto"
          },
          {
            "id": "phon",
            "text": "phonics"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the root inside each word"
          },
          {
            "id": "trap",
            "text": "the letters or topic of each word"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.3D-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Say it again",
    "teks": "5.3D",
    "defs": [
      [
        {
          "term": "Adage",
          "text": "An adage is a short, well-known saying that people have repeated for generations, because it shares a general truth or a piece of wisdom."
        },
        {
          "term": "Pun",
          "text": "A pun is a joke that plays on a word with two different meanings. It can also play on two words that sound alike, which makes the sentence funny in two ways."
        }
      ],
      [
        {
          "term": "Adage",
          "text": "An adage is a short, well-known saying that people have repeated for generations, because it shares a general truth or a piece of wisdom."
        },
        {
          "term": "Pun",
          "text": "A pun is a joke that plays on a word with two different meanings. It can also play on two words that sound alike, which makes the sentence funny in two ways."
        },
        {
          "term": "Neither",
          "text": "The sentence is a plain, literal statement, so it means exactly what it says without any wordplay or famous wisdom."
        }
      ],
      [
        {
          "term": "Adage",
          "text": "An adage is a short, well-known saying that people have repeated for generations, because it shares a general truth or a piece of wisdom."
        },
        {
          "term": "Gives an instruction",
          "text": "The saying directly tells the reader what to do or what not to do, whether it is meant seriously or as a joke."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each saying by its type. Pay close attention to what the words actually mean.",
        "notThis": "Sounding like advice does not make a saying an adage, because a joke can be written as advice too.",
        "groups": [
          {
            "id": "adage",
            "label": "Adage"
          },
          {
            "id": "pun",
            "label": "Pun"
          }
        ],
        "items": [
          {
            "id": "eggs",
            "label": "Don't put all your eggs in one basket.",
            "clue": "Sounds like a silly joke"
          },
          {
            "id": "bird",
            "label": "The early bird catches the worm.",
            "clue": "About a bird and a worm"
          },
          {
            "id": "practice",
            "label": "Practice makes perfect.",
            "clue": "Short and simple"
          },
          {
            "id": "atom",
            "label": "Never trust an atom, because atoms make up everything.",
            "clue": "Sounds like advice"
          },
          {
            "id": "scarecrow",
            "label": "The scarecrow won an award because he was outstanding in his field.",
            "clue": "Sounds like a real award"
          },
          {
            "id": "bicycle",
            "label": "A bicycle can't stand on its own because it is two-tired.",
            "clue": "Gives a reason"
          }
        ]
      },
      {
        "rule": "Sort each saying by its type. Some are ordinary statements that fit neither.",
        "notThis": "Useful advice is not automatically an adage, since an ordinary sentence can give advice in plain words.",
        "groups": [
          {
            "id": "adage",
            "label": "Adage"
          },
          {
            "id": "pun",
            "label": "Pun"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "leap",
            "label": "Look before you leap.",
            "clue": "Only four words"
          },
          {
            "id": "actions",
            "label": "Actions speak louder than words.",
            "clue": "Mentions speaking"
          },
          {
            "id": "mountain",
            "label": "Don't play hide-and-seek with a mountain, because it always peaks.",
            "clue": "Sounds like advice"
          },
          {
            "id": "beard",
            "label": "I didn't like my new beard at first, but then it grew on me.",
            "clue": "About a real beard"
          },
          {
            "id": "helmet",
            "label": "Always wear a helmet when you ride your bike.",
            "clue": "Gives good advice"
          },
          {
            "id": "train",
            "label": "The early train leaves the station at six o'clock.",
            "clue": "Sounds a lot like an adage"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "adage",
          "text": "Adage"
        },
        {
          "id": "instr",
          "text": "Gives an instruction"
        }
      ],
      "items": [
        {
          "id": "chickens",
          "label": "Don't count your chickens before they hatch."
        },
        {
          "id": "cover",
          "label": "Don't judge a book by its cover."
        },
        {
          "id": "heads",
          "label": "Two heads are better than one."
        },
        {
          "id": "stairs",
          "label": "Don't trust stairs, because they're always up to something."
        },
        {
          "id": "teeth",
          "label": "Brush your teeth before you go to bed."
        },
        {
          "id": "mathbook",
          "label": "The math book looked sad because it had too many problems."
        }
      ],
      "mc": {
        "prompt": "Jada reads, \"Don't write with a broken pencil, because it's pointless.\" She insists it must be an adage because it offers advice. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because it plays on two different meanings of pointless, which makes it a pun."
          },
          {
            "id": "trap",
            "text": "Yes, because any saying that gives advice is an adage."
          },
          {
            "id": "no",
            "text": "No, because it is a plain, literal fact with only one meaning."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sayings that are familiar, well-known adages.",
        "choices": [
          {
            "id": "late",
            "text": "Better late than never."
          },
          {
            "id": "will",
            "text": "Where there's a will, there's a way."
          },
          {
            "id": "skeleton",
            "text": "The skeleton stayed home because he had no body to go with."
          },
          {
            "id": "honest",
            "text": "Honesty is the best policy."
          },
          {
            "id": "bus",
            "text": "The school bus arrives at noon."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what kind of saying each one is"
          },
          {
            "id": "trap",
            "text": "whether each saying gives advice"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Trait or feeling?",
    "teks": "5.6F",
    "defs": [
      [
        {
          "term": "Character trait",
          "text": "A character trait is a lasting part of who a character is inside, such as how they think or act. The character shows it again and again."
        },
        {
          "term": "Feeling right now",
          "text": "A feeling right now is an emotion the character experiences during one particular moment, and it usually passes as the situation changes."
        }
      ],
      [
        {
          "term": "Character trait",
          "text": "A character trait is a lasting part of who a character is inside, such as how they think or act. The character shows it again and again."
        },
        {
          "term": "Feeling right now",
          "text": "A feeling right now is an emotion the character experiences during one particular moment, and it usually passes as the situation changes."
        },
        {
          "term": "Neither",
          "text": "The sentence tells about the character's body or appearance, not a quality inside them or an emotion."
        }
      ],
      [
        {
          "term": "Character trait",
          "text": "A character trait is a lasting part of who a character is inside, such as how they think or act. The character shows it again and again."
        },
        {
          "term": "Shown by an action",
          "text": "The reader learns about the character from something the character does, instead of from a word the author states directly."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each sentence by what the evidence shows about the character.",
        "notThis": "A strong emotion word does not make something a trait, so ask whether it lasts or happens only once.",
        "groups": [
          {
            "id": "trait",
            "label": "Character trait"
          },
          {
            "id": "feel",
            "label": "Feeling right now"
          }
        ],
        "items": [
          {
            "id": "maya",
            "label": "Maya always shares her lunch with anyone who forgets to bring one.",
            "clue": "Happens at lunchtime"
          },
          {
            "id": "leo",
            "label": "Every week, Leo checks his homework twice before turning it in.",
            "clue": "About homework"
          },
          {
            "id": "ben",
            "label": "Ben is a cheerful boy who greets everyone with a smile each morning.",
            "clue": "Cheerful sounds like a feeling"
          },
          {
            "id": "omar",
            "label": "Right before the spelling bee, Omar's hands shook with nerves.",
            "clue": "Nervous is a strong word"
          },
          {
            "id": "ana",
            "label": "When the puppy licked her face, Ana burst out laughing with delight.",
            "clue": "Ana is laughing"
          },
          {
            "id": "jake",
            "label": "Jake was furious when his little brother broke his model plane.",
            "clue": "Furious is a big word"
          }
        ]
      },
      {
        "rule": "Sort each sentence by what the evidence shows. Some show neither.",
        "notThis": "A detail that stays the same is not always a trait, because a trait describes how a character behaves.",
        "groups": [
          {
            "id": "trait",
            "label": "Character trait"
          },
          {
            "id": "feel",
            "label": "Feeling right now"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "priya",
            "label": "Priya never gives up, and she practices piano daily until each song is perfect.",
            "clue": "About music practice"
          },
          {
            "id": "joe",
            "label": "Grandpa Joe is usually grumpy, and he complains about nearly everything.",
            "clue": "Grumpy sounds like a feeling"
          },
          {
            "id": "lena",
            "label": "Lena felt proud for a moment when the coach called her name.",
            "clue": "About a sports team"
          },
          {
            "id": "carlos",
            "label": "During the storm last night, Carlos felt scared of the booming thunder.",
            "clue": "Scared is a strong word"
          },
          {
            "id": "diaz",
            "label": "Ms. Diaz has curly red hair and wears round glasses.",
            "clue": "Tells about the character"
          },
          {
            "id": "tomas",
            "label": "Tomás is the tallest student in the fifth grade.",
            "clue": "It never changes"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "trait",
          "text": "Character trait"
        },
        {
          "id": "act",
          "text": "Shown by an action"
        }
      ],
      "items": [
        {
          "id": "kai",
          "label": "Kai picks up litter on the playground at every recess."
        },
        {
          "id": "rita",
          "label": "Aunt Rita bakes cookies for every new neighbor on her street."
        },
        {
          "id": "mia",
          "label": "Everyone agrees that Mia is a patient and gentle person."
        },
        {
          "id": "nia",
          "label": "After losing the game, Nia slammed her locker door."
        },
        {
          "id": "sam",
          "label": "Sam felt lonely on his first day at the new school."
        },
        {
          "id": "eli",
          "label": "Eli has a small scar on his chin."
        }
      ],
      "mc": {
        "prompt": "Read this sentence: \"Before the big test, Hana felt so nervous that her stomach hurt.\" What does this evidence reveal about Hana?",
        "choices": [
          {
            "id": "yes",
            "text": "A feeling Hana experiences during one particular moment"
          },
          {
            "id": "trap",
            "text": "A character trait, because nervous is a strong word describing Hana"
          },
          {
            "id": "no",
            "text": "A physical description of how Hana looks"
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the sentences that reveal a character trait.",
        "choices": [
          {
            "id": "theo",
            "text": "Theo always keeps his promises to his friends."
          },
          {
            "id": "zara",
            "text": "Zara helps her elderly neighbor carry groceries every Saturday."
          },
          {
            "id": "max",
            "text": "Max felt sleepy during the long car ride."
          },
          {
            "id": "ava",
            "text": "Ava has long black braids."
          },
          {
            "id": "owen",
            "text": "Owen is usually the first to volunteer when the class needs help."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether a quality lasts or passes quickly"
          },
          {
            "id": "trap",
            "text": "how strong the emotion word is"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Genre check",
    "teks": "5.9A",
    "defs": [
      [
        {
          "term": "Myth",
          "text": "A myth is an ancient story that explains why something in nature or the world is the way it is. Myths often feature gods or goddesses with great powers."
        },
        {
          "term": "Legend",
          "text": "A legend is an old story about a heroic person from the past. People once told it as if it really happened, even though parts may be exaggerated or magical."
        }
      ],
      [
        {
          "term": "Myth",
          "text": "A myth is an ancient story that explains why something in nature or the world is the way it is. Myths often feature gods or goddesses with great powers."
        },
        {
          "term": "Legend",
          "text": "A legend is an old story about a heroic person from the past. People once told it as if it really happened, even though parts may be exaggerated or magical."
        },
        {
          "term": "Neither",
          "text": "The story belongs to a different genre, such as a tall tale. In a tall tale, a frontier hero does impossible things, and the exaggeration is part of the humor."
        }
      ],
      [
        {
          "term": "A god appears",
          "text": "A god or goddess is one of the characters in the story, with powers that no ordinary person has."
        },
        {
          "term": "Explains nature",
          "text": "The story tells how or why something in the natural world came to be, such as an animal, a sound, or a landform."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each story by its genre. Consider its purpose and its characters carefully.",
        "notThis": "Magic appears in many kinds of stories, so it cannot tell you the genre by itself.",
        "groups": [
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "legend",
            "label": "Legend"
          }
        ],
        "items": [
          {
            "id": "persephone",
            "label": "Persephone must spend part of each year underground with Hades. While she is gone, her mother's sadness brings winter.",
            "clue": "Takes place long ago"
          },
          {
            "id": "thor",
            "label": "Thor, the Norse god of thunder, swings his mighty hammer across the sky. Each swing makes the thunder that people hear.",
            "clue": "Thor is a strong hero"
          },
          {
            "id": "arachne",
            "label": "Arachne boasts that she weaves better than the goddess Athena. As punishment, Athena turns her into the first spider.",
            "clue": "Arachne is a human"
          },
          {
            "id": "arthur",
            "label": "Young Arthur pulls a sword from a stone that no one else can move. This proves that he is the true king of Britain.",
            "clue": "A magical sword"
          },
          {
            "id": "robin",
            "label": "Robin Hood lives in Sherwood Forest with his band of outlaws. He takes from the rich to help the poor.",
            "clue": "Set in a real forest"
          },
          {
            "id": "tell",
            "label": "William Tell is forced to shoot an apple off his son's head. His arrow splits the apple, and he later frees his people.",
            "clue": "Uses amazing skill"
          }
        ]
      },
      {
        "rule": "Sort each story by its genre. Some stories belong to a different genre.",
        "notThis": "A story that explains something in nature is not automatically a myth.",
        "groups": [
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "legend",
            "label": "Legend"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "prometheus",
            "label": "Prometheus steals fire from the gods and gives it to people. Zeus punishes him for sharing this gift.",
            "clue": "A hero helps people"
          },
          {
            "id": "ra",
            "label": "Ra, the Egyptian sun god, sails a boat across the sky each day. His journey is why the sun rises and sets.",
            "clue": "Includes a boat trip"
          },
          {
            "id": "piper",
            "label": "The Pied Piper plays a magical tune that leads all the rats out of town. When the town refuses to pay, he leads the children away.",
            "clue": "Includes magic"
          },
          {
            "id": "mulan",
            "label": "Mulan disguises herself as a soldier to take her father's place in the army. She fights bravely for years before returning home.",
            "clue": "A brave hero"
          },
          {
            "id": "bunyan",
            "label": "Paul Bunyan drags his heavy axe behind him as he walks. The deep scratch becomes the Grand Canyon.",
            "clue": "Explains how a canyon formed"
          },
          {
            "id": "pecos",
            "label": "Pecos Bill lassoes a tornado and rides it across Texas like a bucking horse. Finally, the tornado gives up and rains itself out.",
            "clue": "A hero from long ago"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "god",
          "text": "A god appears"
        },
        {
          "id": "nature",
          "text": "Explains nature"
        }
      ],
      "items": [
        {
          "id": "poseidon",
          "label": "Poseidon, god of the sea, strikes the ground with his trident. The ancient Greeks said this is why earthquakes happen."
        },
        {
          "id": "echo",
          "label": "The goddess Hera curses a nymph named Echo, so she can only repeat what others say. That is why echoes repeat our words."
        },
        {
          "id": "perseus",
          "label": "The goddess Athena gives the hero Perseus a shiny shield. With its help, he defeats the monster Medusa."
        },
        {
          "id": "chipmunk",
          "label": "A bear scratches a chipmunk's back as it escapes. Ever since, chipmunks have had stripes."
        },
        {
          "id": "lakes",
          "label": "Paul Bunyan's giant footprints fill up with rain. They become the thousands of lakes in Minnesota."
        },
        {
          "id": "arrow",
          "label": "Robin Hood enters an archery contest in disguise. He wins the golden arrow right under the sheriff's nose."
        }
      ],
      "mc": {
        "prompt": "In a story, the wizard Merlin uses magic to help young Arthur become a great king. Which genre is this story most likely?",
        "choices": [
          {
            "id": "yes",
            "text": "A legend, because it tells about a famous hero from long ago."
          },
          {
            "id": "trap",
            "text": "A myth, because the story includes powerful magic."
          },
          {
            "id": "no",
            "text": "A tall tale, because the hero does funny, impossible things."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the details that suggest a story is a myth.",
        "choices": [
          {
            "id": "weaver",
            "text": "A goddess punishes a proud weaver."
          },
          {
            "id": "seasons",
            "text": "The story explains why the seasons change."
          },
          {
            "id": "cowboy",
            "text": "A cowboy rides a tornado for fun."
          },
          {
            "id": "archer",
            "text": "A brave archer hides in a forest."
          },
          {
            "id": "hammer",
            "text": "A god's hammer causes the thunder."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "each story's purpose and characters"
          },
          {
            "id": "trap",
            "text": "whether each story has magic"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.9B-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Which sound device?",
    "teks": "5.9B",
    "defs": [
      [
        {
          "term": "Alliteration",
          "text": "Alliteration is the repetition of the same beginning consonant sound in several words that are close together in a line."
        },
        {
          "term": "Onomatopoeia",
          "text": "Onomatopoeia is a word that imitates the actual sound it describes, so saying the word aloud sounds like the noise itself."
        }
      ],
      [
        {
          "term": "Alliteration",
          "text": "Alliteration is the repetition of the same beginning consonant sound in several words that are close together in a line."
        },
        {
          "term": "Onomatopoeia",
          "text": "Onomatopoeia is a word that imitates the actual sound it describes, so saying the word aloud sounds like the noise itself."
        },
        {
          "term": "Neither",
          "text": "The line uses neither sound device, although it might compare two things using the word like or as, which makes it a simile."
        }
      ],
      [
        {
          "term": "Alliteration",
          "text": "Alliteration is the repetition of the same beginning consonant sound in several words that are close together in a line."
        },
        {
          "term": "Onomatopoeia",
          "text": "Onomatopoeia is a word that imitates the actual sound it describes, so saying the word aloud sounds like the noise itself."
        },
        {
          "term": "Center",
          "text": "The line uses both devices at the same time."
        },
        {
          "term": "Outside",
          "text": "The line uses neither device, even if it describes something vividly."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each line by the sound device it uses. Listen to the words themselves.",
        "notThis": "A line about a noisy animal does not automatically contain onomatopoeia, so check whether any word imitates a sound.",
        "groups": [
          {
            "id": "allit",
            "label": "Alliteration"
          },
          {
            "id": "onom",
            "label": "Onomatopoeia"
          }
        ],
        "items": [
          {
            "id": "swans",
            "label": "Seven silly swans sailed south for the summer.",
            "clue": "Paints a picture of birds"
          },
          {
            "id": "lions",
            "label": "Loud lions lounged lazily in the late light.",
            "clue": "About a loud animal"
          },
          {
            "id": "geese",
            "label": "Great gray geese glided over the glassy pond.",
            "clue": "A calm, quiet scene"
          },
          {
            "id": "door",
            "label": "The old door creaked open in the dark.",
            "clue": "Paints a spooky picture"
          },
          {
            "id": "leaves",
            "label": "Dry leaves crunched under our boots on the trail.",
            "clue": "About a fall hike"
          },
          {
            "id": "splash",
            "label": "Splash! A frog leaped into the cold water.",
            "clue": "Starts with one word"
          }
        ]
      },
      {
        "rule": "Sort each line by the sound device it uses. Some lines use neither.",
        "notThis": "Describing a sound is different from imitating one, and comparing two things is a separate device altogether.",
        "groups": [
          {
            "id": "allit",
            "label": "Alliteration"
          },
          {
            "id": "onom",
            "label": "Onomatopoeia"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "pigs",
            "label": "Pink pigs played in the puddle all afternoon.",
            "clue": "Fun to say out loud"
          },
          {
            "id": "divers",
            "label": "Daring divers dove deep into the dark sea.",
            "clue": "Paints an ocean picture"
          },
          {
            "id": "wasp",
            "label": "The angry wasp buzzed near my ear.",
            "clue": "About an insect"
          },
          {
            "id": "clock",
            "label": "The clock ticked softly all night.",
            "clue": "A quiet, calm picture"
          },
          {
            "id": "band",
            "label": "His voice was as loud as a marching band.",
            "clue": "About a loud noise"
          },
          {
            "id": "sheep",
            "label": "The clouds drifted like sheep across the sky.",
            "clue": "Paints a picture of animals"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "allit",
          "text": "Alliteration"
        },
        {
          "id": "onom",
          "text": "Onomatopoeia"
        }
      ],
      "items": [
        {
          "id": "bees",
          "label": "Buzzing bees bumbled by the bright blossoms."
        },
        {
          "id": "snake",
          "label": "The snake slid silently, softly hissing."
        },
        {
          "id": "moose",
          "label": "Mighty moose marched through the misty meadow."
        },
        {
          "id": "fire",
          "label": "The fire crackled late into the night."
        },
        {
          "id": "moon",
          "label": "The moon was like a silver coin."
        },
        {
          "id": "lake",
          "label": "The lake shone under the morning light."
        }
      ],
      "mc": {
        "prompt": "Ben reads the line \"The noisy neighbors never napped.\" He says it uses onomatopoeia because it describes noise. Is he correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because no word imitates a sound, although the repeated n sound makes it alliteration."
          },
          {
            "id": "trap",
            "text": "Yes, because any line that describes a loud noise uses onomatopoeia."
          },
          {
            "id": "no",
            "text": "No, because the line compares two things using the word like."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the words that are examples of onomatopoeia.",
        "choices": [
          {
            "id": "sizzle",
            "text": "sizzle"
          },
          {
            "id": "thud",
            "text": "thud"
          },
          {
            "id": "gentle",
            "text": "gentle"
          },
          {
            "id": "silver",
            "text": "silver"
          },
          {
            "id": "splat",
            "text": "splat"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the sound device each line uses"
          },
          {
            "id": "trap",
            "text": "what each line is about"
          }
        ]
      }
    }
  },
  {
    "id": "ELAR-5.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Text structure",
    "teks": "5.9D(iii)",
    "defs": [
      [
        {
          "term": "Logical order",
          "text": "The writer arranges ideas in an order that makes sense to follow. Examples include steps in a process, events in time, or a cause followed by its effect."
        },
        {
          "term": "Order of importance",
          "text": "The writer ranks ideas by how much they matter, either starting with the most important idea or building up to it at the end."
        }
      ],
      [
        {
          "term": "Logical order",
          "text": "The writer arranges ideas in an order that makes sense to follow. Examples include steps in a process, events in time, or a cause followed by its effect."
        },
        {
          "term": "Order of importance",
          "text": "The writer ranks ideas by how much they matter, either starting with the most important idea or building up to it at the end."
        },
        {
          "term": "Neither",
          "text": "The passage uses a different pattern, such as comparing and contrasting two things to show how they are alike and different."
        }
      ],
      [
        {
          "term": "Logical order",
          "text": "The writer arranges ideas in an order that makes sense to follow. Examples include steps in a process, events in time, or a cause followed by its effect."
        },
        {
          "term": "Uses the word first",
          "text": "The passage includes the word first somewhere, no matter which meaning the word has in that sentence."
        },
        {
          "term": "Center",
          "text": "Both are true."
        },
        {
          "term": "Outside",
          "text": "Neither is true."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each passage by how the writer organizes the ideas.",
        "notThis": "Signal words can mislead you, because the word first sometimes means earliest and sometimes means most important.",
        "groups": [
          {
            "id": "logic",
            "label": "Logical order"
          },
          {
            "id": "imp",
            "label": "Order of importance"
          }
        ],
        "items": [
          {
            "id": "seeds",
            "label": "First, soak the bean seeds in water overnight. Then plant each one an inch deep in moist soil.",
            "clue": "Uses the word first"
          },
          {
            "id": "texas",
            "label": "In 1836, Texas declared its independence from Mexico. Nine years later, Texas joined the United States.",
            "clue": "About Texas history"
          },
          {
            "id": "frogs",
            "label": "Most frogs begin life as tiny eggs in a pond. Next, the eggs gradually hatch into tadpoles with tails.",
            "clue": "Uses the word most"
          },
          {
            "id": "fire",
            "label": "First and most important, a firefighter must stay calm. Strength and speed matter too, but much less.",
            "clue": "Uses the word first"
          },
          {
            "id": "goggles",
            "label": "The most important rule in a science lab is to wear safety goggles. Keeping neat notes is helpful, but less essential.",
            "clue": "A list of lab rules"
          },
          {
            "id": "captain",
            "label": "Above all, a good team captain listens to every player. Being a fast runner is only a small bonus.",
            "clue": "About a sports team"
          }
        ]
      },
      {
        "rule": "Sort each passage by how the writer organizes the ideas. Some fit neither pattern.",
        "notThis": "A passage about two different things is not automatically organized by time, steps, or rank.",
        "groups": [
          {
            "id": "logic",
            "label": "Logical order"
          },
          {
            "id": "imp",
            "label": "Order of importance"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "fold",
            "label": "It is important to follow these directions carefully. Fold the paper in half, and then fold down each corner.",
            "clue": "Uses the word important"
          },
          {
            "id": "ice",
            "label": "Heat causes the ice cube to melt into water. Then the water slowly evaporates into the air.",
            "clue": "About states of matter"
          },
          {
            "id": "lifeguard",
            "label": "A lifeguard's first duty, above everything else, is keeping swimmers safe. Cleaning the pool deck matters far less.",
            "clue": "Uses the word first"
          },
          {
            "id": "water",
            "label": "Saving water lowers your family's water bill a little. Even more important, it protects the river that the whole town drinks from.",
            "clue": "Saves the biggest idea for last"
          },
          {
            "id": "toads",
            "label": "Frogs have smooth, wet skin, while toads have bumpy, dry skin. However, both lay their eggs in water.",
            "clue": "About two animals"
          },
          {
            "id": "gators",
            "label": "Sharks and dolphins both swim in the ocean. However, a shark is a fish, while a dolphin is a mammal that breathes air.",
            "clue": "Two sea animals"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "logic",
          "text": "Logical order"
        },
        {
          "id": "first",
          "text": "Uses the word first"
        }
      ],
      "items": [
        {
          "id": "chrysalis",
          "label": "First, the caterpillar sheds its skin and becomes a hard chrysalis. Weeks later, a butterfly climbs out."
        },
        {
          "id": "sprout",
          "label": "The seed sends roots down into the soil. Next, a green shoot pushes up toward the sunlight."
        },
        {
          "id": "helmet",
          "label": "First and most important, always wear a helmet. Bright clothing helps a little too."
        },
        {
          "id": "friend",
          "label": "For a good friend, honesty comes first. Being funny is nice, but it matters much less."
        },
        {
          "id": "bike",
          "label": "A bicycle has two wheels, while a tricycle has three. However, both are powered by pedals."
        },
        {
          "id": "sleep",
          "label": "The main reason to sleep well is to stay healthy. A smaller reason is to avoid feeling grumpy."
        }
      ],
      "mc": {
        "prompt": "A passage says, \"First, and above all, a pilot must keep the plane safe. Serving snacks matters much less.\" Which pattern does the writer use?",
        "choices": [
          {
            "id": "yes",
            "text": "Order of importance, because the ideas are ranked by how much they matter."
          },
          {
            "id": "trap",
            "text": "Logical order, because the passage begins with the word first."
          },
          {
            "id": "no",
            "text": "Compare and contrast, because it describes two different jobs."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the signal words that often point to order of importance.",
        "choices": [
          {
            "id": "most",
            "text": "most important"
          },
          {
            "id": "above",
            "text": "above all"
          },
          {
            "id": "smaller",
            "text": "a smaller reason"
          },
          {
            "id": "however",
            "text": "however"
          },
          {
            "id": "next",
            "text": "next"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the reason the ideas are in that order"
          },
          {
            "id": "trap",
            "text": "whether the word first appears"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.4H-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "Flat, around, or inside?",
    "teks": "5.4H",
    "defs": [
      [
        {
          "term": "Area",
          "text": "The amount of flat space it takes to cover a surface completely. Area is measured in square units."
        },
        {
          "term": "Volume",
          "text": "The amount of space inside a solid figure, or the amount it takes to fill it. Volume is measured in cubic units."
        }
      ],
      [
        {
          "term": "Area",
          "text": "The amount of flat space it takes to cover a surface completely. Area is measured in square units."
        },
        {
          "term": "Volume",
          "text": "The amount of space inside a solid figure, or the amount it takes to fill it. Volume is measured in cubic units."
        },
        {
          "term": "Neither",
          "text": "It measures the distance around the outside edge, which is called perimeter instead of area or volume."
        }
      ],
      [
        {
          "term": "Volume",
          "text": "The amount of space inside a solid figure, or the amount it takes to fill it. Volume is measured in cubic units."
        },
        {
          "term": "Measures a box",
          "text": "The object being measured is a box, or a particular part of a box."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Classify each job according to what it actually measures.",
        "notThis": "The object in the job does not decide the answer. Instead, ask whether you are covering a flat surface or filling a space.",
        "groups": [
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "vol",
            "label": "Volume"
          }
        ],
        "items": [
          {
            "id": "lid",
            "label": "Maya needs colorful paper to cover the lid of a shoebox.",
            "clue": "It is a box"
          },
          {
            "id": "carpet",
            "label": "A family purchases carpet to cover the entire floor of a bedroom.",
            "clue": "The room is a big space"
          },
          {
            "id": "paint",
            "label": "The custodian buys paint for one wall of a fifth-grade classroom.",
            "clue": "Walls go around the room"
          },
          {
            "id": "cubes",
            "label": "A student packs unit cubes into a shoebox until it is completely full.",
            "clue": "Cubes are small"
          },
          {
            "id": "sandbox",
            "label": "A parent orders enough sand to fill a new sandbox in the backyard.",
            "clue": "The sand is flat on top"
          },
          {
            "id": "tank",
            "label": "Diego pours water into a rectangular fish tank until it is full.",
            "clue": "It has flat glass sides"
          }
        ]
      },
      {
        "rule": "Classify each job according to what it measures. Some jobs measure neither.",
        "notThis": "Going around the outside edge is not the same as covering the surface, because only the border is being measured.",
        "groups": [
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "vol",
            "label": "Volume"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "sod",
            "label": "A gardener orders enough grass to cover an entire backyard.",
            "clue": "The yard has a fence"
          },
          {
            "id": "board",
            "label": "A teacher needs colorful paper to cover a classroom bulletin board.",
            "clue": "The board has a border"
          },
          {
            "id": "trim",
            "label": "A teacher staples border trim around the edges of a bulletin board.",
            "clue": "The board is flat"
          },
          {
            "id": "pen",
            "label": "A farmer builds a fence around the outside of a rectangular dog pen.",
            "clue": "The dog runs inside it"
          },
          {
            "id": "bed",
            "label": "A family purchases soil to fill a raised garden bed for vegetables.",
            "clue": "Plants grow on top"
          },
          {
            "id": "pool",
            "label": "The city pumps water into a swimming pool until it is completely full.",
            "clue": "The pool has a flat bottom"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "vol",
          "text": "Volume"
        },
        {
          "id": "box",
          "text": "Measures a box"
        }
      ],
      "items": [
        {
          "id": "vcrate",
          "label": "A student packs cubes into a toy box until it is completely full."
        },
        {
          "id": "vaquarium",
          "label": "A worker fills a large aquarium with water before adding the fish."
        },
        {
          "id": "vlid",
          "label": "A student glues colorful paper to cover the lid of a box."
        },
        {
          "id": "vtape",
          "label": "A student places tape around the edges of a box lid."
        },
        {
          "id": "vgarden",
          "label": "A family builds a fence around the outside of a vegetable garden."
        },
        {
          "id": "vfloor",
          "label": "A worker installs square tiles to cover an entire kitchen floor."
        }
      ],
      "mc": {
        "prompt": "Jade covers the top of a gift box with wrapping paper. Which measurement does she need to know?",
        "choices": [
          {
            "id": "yes",
            "text": "She needs the area of the top, because she is covering a flat surface."
          },
          {
            "id": "trap",
            "text": "She needs the volume, because the object is a box."
          },
          {
            "id": "no",
            "text": "She needs the perimeter of the top, because it has edges."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the jobs that require you to know the volume.",
        "choices": [
          {
            "id": "tub",
            "text": "Filling a bathtub with water before a bath"
          },
          {
            "id": "crate",
            "text": "Packing unit cubes into a wooden crate"
          },
          {
            "id": "door",
            "text": "Painting the front of a bedroom door"
          },
          {
            "id": "yard",
            "text": "Putting a fence around a rectangular yard"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each job measures"
          },
          {
            "id": "trap",
            "text": "what object is in each job"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.4D-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "Add or multiply the pattern?",
    "teks": "5.4D",
    "defs": [
      [
        {
          "term": "Additive pattern",
          "text": "The same number is added to every x to get its y. Each output is always that much larger than its input."
        },
        {
          "term": "Multiplicative pattern",
          "text": "Every x is multiplied by the same number to get its y. Each output is always that many times its input."
        }
      ],
      [
        {
          "term": "Additive pattern",
          "text": "The same number is added to every x to get its y. Each output is always that much larger than its input."
        },
        {
          "term": "Multiplicative pattern",
          "text": "Every x is multiplied by the same number to get its y. Each output is always that many times its input."
        },
        {
          "term": "Neither",
          "text": "No single addition rule and no single multiplication rule works for every x and its matching y."
        }
      ],
      [
        {
          "term": "Additive pattern",
          "text": "The same number is added to every x to get its y. Each output is always that much larger than its input."
        },
        {
          "term": "y grows by 2",
          "text": "Read down the y column from top to bottom. Each entry is exactly 2 more than the entry before it."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Compare each x with its own y. Classify each table by the rule that turns x into y.",
        "notThis": "Reading only down the y column can be misleading, because a steady jump appears in both kinds of patterns. Compare each input with its own output instead.",
        "groups": [
          {
            "id": "add",
            "label": "Additive pattern"
          },
          {
            "id": "mult",
            "label": "Multiplicative pattern"
          }
        ],
        "items": [
          {
            "id": "a1",
            "label": "x: 1, 2, 3 → y: 4, 5, 6",
            "clue": "Goes up by 1"
          },
          {
            "id": "a2",
            "label": "x: 2, 4, 6 → y: 7, 9, 11",
            "clue": "Goes up by 2"
          },
          {
            "id": "a3",
            "label": "x: 5, 6, 7 → y: 10, 11, 12",
            "clue": "5 to 10 is doubling"
          },
          {
            "id": "m1",
            "label": "x: 1, 2, 3 → y: 3, 6, 9",
            "clue": "Goes up by 3 each time"
          },
          {
            "id": "m2",
            "label": "x: 2, 4, 6 → y: 4, 8, 12",
            "clue": "2 + 2 = 4"
          },
          {
            "id": "m3",
            "label": "x: 1, 2, 3 → y: 5, 10, 15",
            "clue": "Goes up by 5"
          }
        ]
      },
      {
        "rule": "Compare each x with its own y. Some tables follow neither kind of rule consistently.",
        "notThis": "Growing by the same step does not make a pattern additive, because multiplicative tables also grow steadily. Check whether one rule links every x to its y.",
        "groups": [
          {
            "id": "add",
            "label": "Additive pattern"
          },
          {
            "id": "mult",
            "label": "Multiplicative pattern"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "m4",
            "label": "x: 1, 2, 3 → y: 2, 4, 6",
            "clue": "Goes up by 2"
          },
          {
            "id": "n1",
            "label": "x: 1, 2, 3 → y: 2, 4, 8",
            "clue": "Also starts with 2, 4"
          },
          {
            "id": "a4",
            "label": "x: 3, 4, 5 → y: 6, 7, 8",
            "clue": "3 to 6 is doubling"
          },
          {
            "id": "m5",
            "label": "Points on a graph: (2, 6), (3, 9), (4, 12)",
            "clue": "Goes up by 3"
          },
          {
            "id": "n2",
            "label": "x: 1, 2, 3 → y: 3, 5, 7",
            "clue": "Goes up by 2 each time"
          },
          {
            "id": "a5",
            "label": "Points on a graph: (1, 7), (2, 8), (3, 9)",
            "clue": "Starts at 7"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "add",
          "text": "Additive pattern"
        },
        {
          "id": "step2",
          "text": "y grows by 2"
        }
      ],
      "items": [
        {
          "id": "vb1",
          "label": "x: 2, 4, 6 → y: 5, 7, 9"
        },
        {
          "id": "va1",
          "label": "x: 1, 2, 3 → y: 6, 7, 8"
        },
        {
          "id": "vs1",
          "label": "x: 1, 2, 3 → y: 2, 4, 6"
        },
        {
          "id": "vs2",
          "label": "x: 1, 2, 3 → y: 3, 5, 7"
        },
        {
          "id": "vn1",
          "label": "x: 1, 2, 3 → y: 4, 8, 12"
        },
        {
          "id": "vb2",
          "label": "x: 1, 3, 5 → y: 11, 13, 15"
        }
      ],
      "mc": {
        "prompt": "Leo examines the table x: 1, 2, 3 → y: 3, 6, 9. He says it is additive because each y increases by 3. Is he correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Each x multiplied by 3 equals its y, so the pattern is multiplicative."
          },
          {
            "id": "trap",
            "text": "Yes. Adding 3 at every step down the column makes it additive."
          },
          {
            "id": "no",
            "text": "No. The table follows neither kind of rule consistently."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the tables that show a multiplicative relationship between x and y.",
        "choices": [
          {
            "id": "t7",
            "text": "x: 1, 2, 3 → y: 7, 14, 21"
          },
          {
            "id": "p7",
            "text": "x: 1, 2, 3 → y: 8, 9, 10"
          },
          {
            "id": "t5",
            "text": "x: 2, 4, 6 → y: 10, 20, 30"
          },
          {
            "id": "sq",
            "text": "x: 1, 2, 3 → y: 1, 4, 9"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each x turns into its y"
          },
          {
            "id": "trap",
            "text": "how the y numbers grow"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.8A-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "On the axis?",
    "teks": "5.8A",
    "defs": [
      [
        {
          "term": "On the x-axis",
          "text": "The point is located on the horizontal number line that runs sideways, called the x-axis. Its y-coordinate, which is the second number, is zero."
        },
        {
          "term": "On the y-axis",
          "text": "The point is located on the vertical number line that runs upward, called the y-axis. Its x-coordinate, which is the first number, is zero."
        }
      ],
      [
        {
          "term": "On the x-axis",
          "text": "The point is located on the horizontal number line that runs sideways, called the x-axis. Its y-coordinate, which is the second number, is zero."
        },
        {
          "term": "On the y-axis",
          "text": "The point is located on the vertical number line that runs upward, called the y-axis. Its x-coordinate, which is the first number, is zero."
        },
        {
          "term": "Neither",
          "text": "The point is not located on the x-axis or the y-axis, because neither of its coordinates is zero."
        }
      ],
      [
        {
          "term": "On the x-axis",
          "text": "The point is located on the horizontal number line that runs sideways, called the x-axis. Its y-coordinate, which is the second number, is zero."
        },
        {
          "term": "On the y-axis",
          "text": "The point is located on the vertical number line that runs upward, called the y-axis. Its x-coordinate, which is the first number, is zero."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Classify each ordered pair according to the axis where its point is located.",
        "notThis": "Two ordered pairs can use exactly the same numbers, although their points are located in different places. When the coordinates are swapped, the point moves to the opposite axis.",
        "groups": [
          {
            "id": "xax",
            "label": "On the x-axis"
          },
          {
            "id": "yax",
            "label": "On the y-axis"
          }
        ],
        "items": [
          {
            "id": "x5",
            "label": "(5, 0)",
            "clue": "Has a 5 and a 0"
          },
          {
            "id": "y5",
            "label": "(0, 5)",
            "clue": "Also has a 5 and a 0"
          },
          {
            "id": "x8",
            "label": "(8, 0)",
            "clue": "The biggest number here"
          },
          {
            "id": "y2",
            "label": "(0, 2)",
            "clue": "Only 2 steps from the origin"
          },
          {
            "id": "x1",
            "label": "(1, 0)",
            "clue": "Just 1 step from the origin"
          },
          {
            "id": "y10",
            "label": "(0, 10)",
            "clue": "Two digits in one number"
          }
        ]
      },
      {
        "rule": "Classify each ordered pair by its axis. Some points are located on neither axis.",
        "notThis": "A point that sits slightly above or beside an axis is not on it. Check whether one of its coordinates is actually zero.",
        "groups": [
          {
            "id": "xax",
            "label": "On the x-axis"
          },
          {
            "id": "yax",
            "label": "On the y-axis"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "x9",
            "label": "(9, 0)",
            "clue": "Has a zero"
          },
          {
            "id": "y4",
            "label": "(0, 4)",
            "clue": "Has a zero"
          },
          {
            "id": "y1",
            "label": "(0, 1)",
            "clue": "Very close to the origin"
          },
          {
            "id": "n41",
            "label": "(4, 1)",
            "clue": "Almost touches the x-axis"
          },
          {
            "id": "n16",
            "label": "(1, 6)",
            "clue": "Almost touches the y-axis"
          },
          {
            "id": "n33",
            "label": "(3, 3)",
            "clue": "Both numbers match"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "xax",
          "text": "On the x-axis"
        },
        {
          "id": "yax",
          "text": "On the y-axis"
        }
      ],
      "items": [
        {
          "id": "vo",
          "label": "(0, 0)"
        },
        {
          "id": "vx3",
          "label": "(3, 0)"
        },
        {
          "id": "vx7",
          "label": "(7, 0)"
        },
        {
          "id": "vy3",
          "label": "(0, 3)"
        },
        {
          "id": "vn11",
          "label": "(1, 1)"
        },
        {
          "id": "vn52",
          "label": "(5, 2)"
        }
      ],
      "mc": {
        "prompt": "Ava says the point (0, 5) is on the x-axis because the zero comes first. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Its x-coordinate is zero, so the point is located on the y-axis."
          },
          {
            "id": "trap",
            "text": "Yes. A zero in the first position always places a point on the horizontal axis."
          },
          {
            "id": "no",
            "text": "No. The point is not located on either axis."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the statements that are true about the point (0, 0).",
        "choices": [
          {
            "id": "origin",
            "text": "This special point is called the origin."
          },
          {
            "id": "both",
            "text": "It is located on both axes at the same time."
          },
          {
            "id": "cross",
            "text": "It is the location where the horizontal and vertical axes intersect."
          },
          {
            "id": "none",
            "text": "It is not located on either of the two axes."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which axis each point sits on"
          },
          {
            "id": "trap",
            "text": "which numbers each point uses"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.10C-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "How will you pay?",
    "teks": "5.10C",
    "defs": [
      [
        {
          "term": "Uses your own money",
          "text": "You spend money that you already have, which often comes from your own bank account."
        },
        {
          "term": "Uses borrowed money",
          "text": "A bank or store pays for the purchase now. You must repay the money later, sometimes with interest."
        }
      ],
      [
        {
          "term": "Uses your own money",
          "text": "You spend money that you already have, which often comes from your own bank account."
        },
        {
          "term": "Uses borrowed money",
          "text": "A bank or store pays for the purchase now. You must repay the money later, sometimes with interest."
        },
        {
          "term": "Neither",
          "text": "It is not a payment, because nothing is being purchased and no bill is being paid."
        }
      ],
      [
        {
          "term": "Uses borrowed money",
          "text": "A bank or store pays for the purchase now. You must repay the money later, sometimes with interest."
        },
        {
          "term": "Uses a card",
          "text": "A plastic card, or the number printed on a card, is used to make the payment."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Classify each payment according to where the money actually comes from.",
        "notThis": "A plastic card or a phone can work either way, so it cannot tell you the answer. Instead, ask whose money is really paying for the purchase.",
        "groups": [
          {
            "id": "own",
            "label": "Uses your own money"
          },
          {
            "id": "borrow",
            "label": "Uses borrowed money"
          }
        ],
        "items": [
          {
            "id": "debit",
            "label": "At the grocery store, a customer pays for her food with a debit card.",
            "clue": "Looks just like a credit card"
          },
          {
            "id": "check",
            "label": "A father writes a paper check to pay the monthly water bill.",
            "clue": "Paper, not a card"
          },
          {
            "id": "online",
            "label": "A family pays the electric bill online directly from their checking account.",
            "clue": "Done on a computer"
          },
          {
            "id": "shoes2",
            "label": "A teenager purchases a new pair of sneakers with a credit card.",
            "clue": "The card has your name"
          },
          {
            "id": "tap",
            "label": "A shopper taps a phone that has a credit card saved in its digital wallet.",
            "clue": "No card comes out"
          },
          {
            "id": "gas",
            "label": "A driver pays for gasoline at the station by using a credit card.",
            "clue": "Paid for right away"
          }
        ]
      },
      {
        "rule": "Classify each situation according to where the money comes from. Some are not payments.",
        "notThis": "Money moving between bank accounts is not always paying for something. A payment happens only when someone purchases an item or pays a bill.",
        "groups": [
          {
            "id": "own",
            "label": "Uses your own money"
          },
          {
            "id": "borrow",
            "label": "Uses borrowed money"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "app",
            "label": "You pay for a pizza delivery with a phone app linked to your bank account.",
            "clue": "Uses a phone app"
          },
          {
            "id": "movie",
            "label": "At the movie theater, a customer swipes a debit card to purchase tickets.",
            "clue": "Swiped like a credit card"
          },
          {
            "id": "gameonline",
            "label": "A student's mother orders a video game online with a credit card.",
            "clue": "It is an electronic payment"
          },
          {
            "id": "later",
            "label": "A family takes a bicycle home today and agrees to pay the store back later.",
            "clue": "You ride it today"
          },
          {
            "id": "deposit",
            "label": "A worker deposits a paycheck into her bank account on Friday afternoon.",
            "clue": "Uses the bank"
          },
          {
            "id": "savings",
            "label": "A student moves $20 from a checking account into a separate savings account.",
            "clue": "Money leaves your checking account"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "borrow",
          "text": "Uses borrowed money"
        },
        {
          "id": "card",
          "text": "Uses a card"
        }
      ],
      "items": [
        {
          "id": "vdinner",
          "label": "A family pays for dinner at a restaurant with a credit card."
        },
        {
          "id": "vcouch",
          "label": "A customer takes a couch home and agrees to pay the store back later."
        },
        {
          "id": "vgroc",
          "label": "A shopper pays for groceries at the register with a debit card."
        },
        {
          "id": "vorder",
          "label": "A student's father orders a book online with a debit card."
        },
        {
          "id": "vcheck",
          "label": "A parent writes a paper check to pay for piano lessons."
        },
        {
          "id": "vcash",
          "label": "A shopper pays with cash that she carries in her wallet."
        }
      ],
      "mc": {
        "prompt": "Sam's card looks just like his mother's credit card, but it is actually a debit card. Whose money does his card use?",
        "choices": [
          {
            "id": "yes",
            "text": "It uses Sam's own money, which comes from his bank account."
          },
          {
            "id": "trap",
            "text": "It uses borrowed money, because it resembles a credit card."
          },
          {
            "id": "no",
            "text": "It uses no money at all, because it is only a plastic card."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the statements that describe a disadvantage of paying with a credit card.",
        "choices": [
          {
            "id": "interest",
            "text": "You may owe extra money, called interest, if you do not pay the whole bill on time."
          },
          {
            "id": "overspend",
            "text": "It is easy to spend more money than you actually have in the bank."
          },
          {
            "id": "safe",
            "text": "It is usually safer to carry a card than a large amount of cash."
          },
          {
            "id": "now",
            "text": "The money is removed from your bank account immediately after you pay."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whose money pays"
          },
          {
            "id": "trap",
            "text": "what the payment looks like"
          }
        ]
      }
    }
  },
  {
    "id": "MA-5.10A-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "What kind of tax?",
    "teks": "5.10A",
    "defs": [
      [
        {
          "term": "Sales tax",
          "text": "A tax added to the price of many things you buy. The seller collects it and sends it to the government."
        },
        {
          "term": "Property tax",
          "text": "A tax paid on property that someone owns, such as land and buildings. Owners usually pay it once a year."
        }
      ],
      [
        {
          "term": "Sales tax",
          "text": "A tax added to the price of many things you buy. The seller collects it and sends it to the government."
        },
        {
          "term": "Property tax",
          "text": "A tax paid on property that someone owns, such as land and buildings. Owners usually pay it once a year."
        },
        {
          "term": "Neither",
          "text": "It is a different kind of tax, such as income tax on wages or payroll tax withheld from a paycheck."
        }
      ],
      [
        {
          "term": "Property tax",
          "text": "A tax paid on property that someone owns, such as land and buildings. Owners usually pay it once a year."
        },
        {
          "term": "Paid by a business",
          "text": "A business, rather than a person or a family, is responsible for paying this tax."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Classify each tax according to what it is paid on. Decide whether it comes from a purchase or from property.",
        "notThis": "Buying something and owning property are different situations, so ask what the tax is actually paid on. The price or size of an item does not determine the kind of tax.",
        "groups": [
          {
            "id": "sales",
            "label": "Sales tax"
          },
          {
            "id": "prop",
            "label": "Property tax"
          }
        ],
        "items": [
          {
            "id": "car",
            "label": "When a family purchases a new car, the dealer adds a tax to the total price.",
            "clue": "A car is property"
          },
          {
            "id": "bike",
            "label": "A cashier adds a tax to the price when you purchase a new bicycle.",
            "clue": "You own the bike after"
          },
          {
            "id": "game",
            "label": "The store adds a small tax to the price of a video game at the register.",
            "clue": "Only a few dollars"
          },
          {
            "id": "house",
            "label": "Every year, a family pays a tax to the county on the house that they own.",
            "clue": "A house costs a lot"
          },
          {
            "id": "store",
            "label": "A store owner pays a tax to the county each year on the building that she owns.",
            "clue": "The store sells things"
          },
          {
            "id": "farm",
            "label": "A farmer pays a tax to the county every year on the farm land he owns.",
            "clue": "The farmer sells crops"
          }
        ]
      },
      {
        "rule": "Classify each tax according to what it is paid on. Some taxes are a different kind.",
        "notThis": "A job or a business in the situation does not decide the kind of tax. Instead, look carefully at what the money is being collected on.",
        "groups": [
          {
            "id": "sales",
            "label": "Sales tax"
          },
          {
            "id": "prop",
            "label": "Property tax"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "couch",
            "label": "A family purchases a new couch, and the furniture store adds a tax to the price.",
            "clue": "It stays in the house"
          },
          {
            "id": "shoes",
            "label": "A cashier at the department store adds a tax when you purchase a pair of sneakers.",
            "clue": "You own the shoes after"
          },
          {
            "id": "lot",
            "label": "Each year, a family pays a tax on an empty lot that they own in the city.",
            "clue": "Nothing is built there"
          },
          {
            "id": "office",
            "label": "A company pays a tax each year on the office building that it owns.",
            "clue": "The company earns money"
          },
          {
            "id": "carpay",
            "label": "A car salesperson pays a tax on the wages she earns during the year.",
            "clue": "The worker sells cars"
          },
          {
            "id": "social",
            "label": "Money for Social Security is withheld from a worker's paycheck.",
            "clue": "Paid when a worker gets paid"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "prop",
          "text": "Property tax"
        },
        {
          "id": "biz",
          "text": "Paid by a business"
        }
      ],
      "items": [
        {
          "id": "vbakery",
          "label": "A bakery pays a tax each year on the building that it owns."
        },
        {
          "id": "vhome",
          "label": "A family pays a tax each year to the county on the home that they own."
        },
        {
          "id": "vland",
          "label": "Each year, a family pays a tax on land that they own outside of town."
        },
        {
          "id": "vprofit",
          "label": "A company pays a tax on the money that it earned this year."
        },
        {
          "id": "vnurse",
          "label": "A nurse pays a tax on the salary that she earns at the hospital."
        },
        {
          "id": "vteen",
          "label": "A tax is withheld automatically from a teenager's paycheck at a summer job."
        }
      ],
      "mc": {
        "prompt": "The Garcias purchase a new car from a dealer. Which kind of tax is added to the total price of the vehicle?",
        "choices": [
          {
            "id": "yes",
            "text": "Sales tax is added, because the family is making a purchase."
          },
          {
            "id": "trap",
            "text": "Property tax is added, because a car is valuable property."
          },
          {
            "id": "no",
            "text": "Payroll tax is added, because both parents have jobs."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the statements that are true about property tax.",
        "choices": [
          {
            "id": "land",
            "text": "It is paid on land and buildings that people or businesses own."
          },
          {
            "id": "year",
            "text": "Property owners usually pay it annually, which means once each year."
          },
          {
            "id": "store",
            "text": "The cashier adds it at the store when you purchase something."
          },
          {
            "id": "check",
            "text": "It is withheld automatically from every paycheck a worker receives."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the tax is paid on"
          },
          {
            "id": "trap",
            "text": "how big or costly the thing is"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.2A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Cause or result?",
    "teks": "5.2A",
    "defs": [
      [
        {
          "term": "Cause of the Revolution",
          "text": "An event or idea that angered the colonists and pushed them toward a war for independence."
        },
        {
          "term": "Result of the Revolution",
          "text": "Something that happened because the Americans won the war and became independent."
        }
      ],
      [
        {
          "term": "Cause of the Revolution",
          "text": "An event or idea that angered the colonists and pushed them toward a war for independence."
        },
        {
          "term": "Result of the Revolution",
          "text": "Something that happened because the Americans won the war and became independent."
        },
        {
          "term": "Neither",
          "text": "It is connected to a different event in history, not to the American Revolution."
        }
      ],
      [
        {
          "term": "Cause of the Revolution",
          "text": "An event or idea that angered the colonists and pushed them toward a war for independence."
        },
        {
          "term": "About taxes",
          "text": "The event involves a tax, which is money people must pay to a government."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each event: did it lead to the Revolution, or come from it?",
        "notThis": "A law, a fight or a treaty can land in either group. Ask whether the event came before the war or because of it.",
        "groups": [
          {
            "id": "cause",
            "label": "Cause of the Revolution"
          },
          {
            "id": "result",
            "label": "Result of the Revolution"
          }
        ],
        "items": [
          {
            "id": "stamp",
            "label": "In 1765, Parliament passed the Stamp Act, which taxed newspapers and other printed papers.",
            "clue": "A law written on paper"
          },
          {
            "id": "massacre",
            "label": "In 1770, British soldiers fired into a crowd in Boston and killed five colonists.",
            "clue": "Soldiers fired guns"
          },
          {
            "id": "teaparty",
            "label": "In 1773, colonists dumped chests of British tea into Boston Harbor.",
            "clue": "Colonists broke the law"
          },
          {
            "id": "treaty",
            "label": "In 1783, Britain signed the Treaty of Paris and recognized American independence.",
            "clue": "Signed by British leaders"
          },
          {
            "id": "constitution",
            "label": "Americans wrote the Constitution to set up their own national government.",
            "clue": "A plan written on paper"
          },
          {
            "id": "free",
            "label": "The thirteen colonies became a free and independent nation.",
            "clue": "Americans celebrated"
          }
        ]
      },
      {
        "rule": "Sort each event: cause or result. Some events belong to neither group.",
        "notThis": "Fighting Britain or gaining land does not automatically connect an event to the Revolution.",
        "groups": [
          {
            "id": "cause",
            "label": "Cause of the Revolution"
          },
          {
            "id": "result",
            "label": "Result of the Revolution"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "taxrep",
            "label": "Colonists complained that they had to pay British taxes but had no vote in Parliament.",
            "clue": "An idea, not an event"
          },
          {
            "id": "intolerable",
            "label": "In 1774, Parliament closed Boston Harbor to punish the colonists for the Tea Party.",
            "clue": "It came after the Tea Party"
          },
          {
            "id": "land",
            "label": "The new United States gained land stretching west to the Mississippi River.",
            "clue": "A new border was drawn"
          },
          {
            "id": "parliament",
            "label": "Americans no longer had to obey laws passed by the British Parliament.",
            "clue": "About laws"
          },
          {
            "id": "war1812",
            "label": "In 1812, the United States went to war against Britain again.",
            "clue": "Americans fought Britain"
          },
          {
            "id": "louisiana",
            "label": "In 1803, the United States bought the Louisiana Territory from France.",
            "clue": "The country gained land"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cause",
          "text": "Cause of the Revolution"
        },
        {
          "id": "tax",
          "text": "About taxes"
        }
      ],
      "items": [
        {
          "id": "stampV",
          "label": "In 1765, the Stamp Act taxed newspapers, playing cards and legal papers."
        },
        {
          "id": "townV",
          "label": "In 1767, the Townshend Acts taxed glass, paint, paper and tea."
        },
        {
          "id": "massacreV",
          "label": "In 1770, British soldiers fired into a crowd in Boston."
        },
        {
          "id": "articlesV",
          "label": "Under its first plan of government, the new Congress could not tax the people directly."
        },
        {
          "id": "treatyV",
          "label": "In 1783, the Treaty of Paris officially ended the war."
        },
        {
          "id": "louisianaV",
          "label": "In 1803, the United States bought the Louisiana Territory."
        }
      ],
      "mc": {
        "prompt": "In 1774, Parliament closed Boston Harbor to punish the colonists for the Tea Party. Why is this a cause of the Revolution?",
        "choices": [
          {
            "id": "yes",
            "text": "It made colonists angrier and pushed them closer to war with Britain."
          },
          {
            "id": "trap",
            "text": "It is really a result, because it happened after the Tea Party."
          },
          {
            "id": "no",
            "text": "It is not connected to the Revolution in any way."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the results of the American Revolution.",
        "choices": [
          {
            "id": "indep",
            "text": "Britain agreed that the United States was a free nation."
          },
          {
            "id": "west",
            "text": "The United States gained land reaching west to the Mississippi River."
          },
          {
            "id": "gov",
            "text": "Americans created their own national government."
          },
          {
            "id": "stamp",
            "text": "Parliament passed the Stamp Act to tax the colonies."
          },
          {
            "id": "buy",
            "text": "The United States bought the Louisiana Territory from France."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether an event led to the Revolution or came from it"
          },
          {
            "id": "trap",
            "text": "whether the event was a law, a fight or a treaty"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.7A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "City, country, or in between?",
    "teks": "5.7A",
    "defs": [
      [
        {
          "term": "Rural",
          "text": "A rural area is countryside, where people live far apart and the land is often used for farms, ranches or forests."
        },
        {
          "term": "Urban",
          "text": "An urban area is a city, where many people live and work close together, often in tall buildings."
        }
      ],
      [
        {
          "term": "Rural",
          "text": "A rural area is countryside, where people live far apart and the land is often used for farms, ranches or forests."
        },
        {
          "term": "Urban",
          "text": "An urban area is a city, where many people live and work close together, often in tall buildings."
        },
        {
          "term": "Neither",
          "text": "It is a suburban area, which is a community of homes and neighborhoods located just outside a city."
        }
      ],
      [
        {
          "term": "Urban area",
          "text": "An urban area is a city, where many people live and work close together, often in tall buildings."
        },
        {
          "term": "Lots of traffic",
          "text": "Many cars, buses or trucks crowd the roads in that particular scene."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each place by its settlement pattern: how people live there.",
        "notThis": "A single detail can fool you, so look at the whole scene. Think about how close together people live.",
        "groups": [
          {
            "id": "rur",
            "label": "Rural"
          },
          {
            "id": "urb",
            "label": "Urban"
          }
        ],
        "items": [
          {
            "id": "ranch",
            "label": "Cattle graze on a ranch, and the nearest neighbor lives two miles away.",
            "clue": "A busy highway runs past"
          },
          {
            "id": "smalltown",
            "label": "A small town of 600 people is surrounded by cotton fields.",
            "clue": "Has a main street with shops"
          },
          {
            "id": "drive",
            "label": "A family drives forty minutes to reach the nearest grocery store.",
            "clue": "They own a pickup truck"
          },
          {
            "id": "towers",
            "label": "Apartment towers and office buildings stand close together downtown.",
            "clue": "Has a quiet park"
          },
          {
            "id": "subway",
            "label": "Thousands of people ride a subway train to work each morning.",
            "clue": "Trains run underground."
          },
          {
            "id": "garden",
            "label": "Neighbors grow vegetables in a community garden between tall buildings.",
            "clue": "People are farming"
          }
        ]
      },
      {
        "rule": "Sort each place by its settlement pattern. Some places fit neither group.",
        "notThis": "Busy roads and big stores appear in many kinds of places, so they do not decide the pattern.",
        "groups": [
          {
            "id": "rur",
            "label": "Rural"
          },
          {
            "id": "urb",
            "label": "Urban"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "wheat",
            "label": "A family grows wheat on hundreds of acres of land.",
            "clue": "Near a large highway"
          },
          {
            "id": "forest",
            "label": "A few cabins are scattered through a thick pine forest.",
            "clue": "Visitors come every weekend"
          },
          {
            "id": "rush",
            "label": "Buses, taxis and crowds fill the streets of downtown at rush hour.",
            "clue": "Lots of traffic"
          },
          {
            "id": "blocks",
            "label": "Restaurants, offices and apartments share the same crowded city block.",
            "clue": "Very few yards"
          },
          {
            "id": "mall",
            "label": "A large mall sits beside neighborhoods of houses just outside a city.",
            "clue": "Traffic jams on weekends"
          },
          {
            "id": "commute",
            "label": "New neighborhoods grow outside a city, and many parents drive into the city for work.",
            "clue": "Busy roads every morning"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "urb",
          "text": "Urban area"
        },
        {
          "id": "traffic",
          "text": "Lots of traffic"
        }
      ],
      "items": [
        {
          "id": "jamV",
          "label": "Taxis and buses crowd a downtown street during rush hour."
        },
        {
          "id": "bridgeV",
          "label": "Cars crawl across a bridge into the center of a big city."
        },
        {
          "id": "parkV",
          "label": "Families picnic on the quiet grass of a park in the middle of a city."
        },
        {
          "id": "mallV",
          "label": "Cars back up for blocks outside a shopping mall in a suburb."
        },
        {
          "id": "ranchV",
          "label": "Cows rest beside a quiet dirt road on a ranch."
        },
        {
          "id": "bikeV",
          "label": "Children ride bikes along a quiet street in a suburb."
        }
      ],
      "mc": {
        "prompt": "A suburb has a crowded highway, a huge mall and heavy traffic. Which statement explains why it is not an urban area?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a community of neighborhoods outside a city, not the crowded city itself."
          },
          {
            "id": "trap",
            "text": "It really is urban, because heavy traffic always means a city."
          },
          {
            "id": "no",
            "text": "It is rural, because many houses there have yards and trees."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the details that describe a rural area.",
        "choices": [
          {
            "id": "far",
            "text": "Homes are spread far apart from each other."
          },
          {
            "id": "farm",
            "text": "Much of the land is used for farms or ranches."
          },
          {
            "id": "few",
            "text": "Fewer people live there than in a city."
          },
          {
            "id": "tall",
            "text": "Tall buildings stand close together on every block."
          },
          {
            "id": "train",
            "text": "Most people ride a subway to their jobs."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how closely people live together"
          },
          {
            "id": "trap",
            "text": "how much traffic a place has"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.15C-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Whose job is it?",
    "teks": "5.15C",
    "defs": [
      [
        {
          "term": "National government",
          "text": "The government for the entire country, which is based in Washington, D.C. It handles jobs that affect people in every state."
        },
        {
          "term": "State government",
          "text": "The government for one particular state. The state government of Texas is based in the capital city, Austin."
        }
      ],
      [
        {
          "term": "National government",
          "text": "The government for the entire country, which is based in Washington, D.C. It handles jobs that affect people in every state."
        },
        {
          "term": "State government",
          "text": "The government for one particular state. The state government of Texas is based in the capital city, Austin."
        },
        {
          "term": "Neither",
          "text": "It is a job for a city or town government, the local level."
        }
      ],
      [
        {
          "term": "National can do it",
          "text": "The Constitution gives this power to the national government, which leads the whole country."
        },
        {
          "term": "State can do it",
          "text": "States keep this power for themselves, so each state government is allowed to use it."
        },
        {
          "term": "Center",
          "text": "It fits both labels, so it belongs in the middle where the two circles overlap."
        },
        {
          "term": "Outside",
          "text": "It fits neither label, so it belongs outside both circles."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Classify each job according to which level of government has the power to do it.",
        "notThis": "An important job does not automatically belong to the national government. Likewise, a job close to home does not automatically belong to the state.",
        "groups": [
          {
            "id": "nat",
            "label": "National government"
          },
          {
            "id": "state",
            "label": "State government"
          }
        ],
        "items": [
          {
            "id": "money",
            "label": "New paper dollars are printed for people to spend all across the country.",
            "clue": "Used in every store"
          },
          {
            "id": "war",
            "label": "The country declares war after a serious attack by another nation.",
            "clue": "A very serious choice"
          },
          {
            "id": "mail",
            "label": "Letters and packages are delivered to the homes on your street six days a week.",
            "clue": "It comes to your street"
          },
          {
            "id": "license",
            "label": "A sixteen-year-old passes a driving test and receives a driver's license.",
            "clue": "Good for driving in any state"
          },
          {
            "id": "hunt",
            "label": "A family receives a license to hunt and fish at a lake near their home.",
            "clue": "For lakes and forests"
          },
          {
            "id": "speed",
            "label": "A speed limit of 70 miles per hour is set for the highways.",
            "clue": "Even on interstate highways"
          }
        ]
      },
      {
        "rule": "Classify each job by which government has the power. Some powers belong to neither.",
        "notThis": "A job near your home might belong to a city government instead. A city is not the same as the state government.",
        "groups": [
          {
            "id": "nat",
            "label": "National government"
          },
          {
            "id": "state",
            "label": "State government"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "treaty",
            "label": "The country signs a treaty, which is a formal written agreement, with another nation.",
            "clue": "Leaders sign them"
          },
          {
            "id": "newstate",
            "label": "A territory is allowed to join the country as a brand-new state.",
            "clue": "It changes the map of states"
          },
          {
            "id": "elect",
            "label": "An election is held so that voters can choose a new governor.",
            "clue": "Voters choose a leader"
          },
          {
            "id": "teach",
            "label": "A college graduate receives a license to teach in the public schools.",
            "clue": "Every state has teachers"
          },
          {
            "id": "police",
            "label": "New police officers are hired to keep a city's neighborhoods safe.",
            "clue": "Keeps people safe"
          },
          {
            "id": "trash",
            "label": "Leaders decide which day of the week trash is collected in a city.",
            "clue": "Every house gets it"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "nat",
          "text": "National can do it"
        },
        {
          "id": "state",
          "text": "State can do it"
        }
      ],
      "items": [
        {
          "id": "tax",
          "label": "Taxes are collected from people and businesses to pay for public services."
        },
        {
          "id": "roads",
          "label": "New roads and bridges are built so that people can travel safely."
        },
        {
          "id": "cash",
          "label": "Coins and paper dollars are produced for the whole nation to use."
        },
        {
          "id": "post",
          "label": "Post offices are operated in towns and cities across the nation."
        },
        {
          "id": "citygov",
          "label": "A new city government is set up after a small town grows larger."
        },
        {
          "id": "parks",
          "label": "A city decides which hours its public park will be open to visitors."
        }
      ],
      "mc": {
        "prompt": "A mail carrier walks down your street every day. Which level of government is responsible for the mail?",
        "choices": [
          {
            "id": "yes",
            "text": "The national government is responsible for delivering the mail."
          },
          {
            "id": "trap",
            "text": "The state government runs it, because the mail arrives close to home."
          },
          {
            "id": "no",
            "text": "No government is responsible for delivering the mail."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the powers that the national and state governments share with each other.",
        "choices": [
          {
            "id": "borrow",
            "text": "Borrow money to pay for public projects"
          },
          {
            "id": "laws",
            "text": "Make laws and enforce them"
          },
          {
            "id": "print",
            "text": "Print paper money"
          },
          {
            "id": "drive",
            "text": "Give driver's licenses to new drivers"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which government has the power"
          },
          {
            "id": "trap",
            "text": "how important the job seems"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.15A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Which U.S. branch?",
    "teks": "5.15A",
    "defs": [
      [
        {
          "term": "Legislative",
          "text": "The branch that makes laws for the whole country. Congress, which includes the Senate and the House of Representatives, is the legislative branch."
        },
        {
          "term": "Judicial",
          "text": "The branch that decides what laws mean and whether they follow the Constitution. The Supreme Court and the other federal courts make up this branch."
        }
      ],
      [
        {
          "term": "Legislative",
          "text": "The branch that makes laws for the whole country. Congress, which includes the Senate and the House of Representatives, is the legislative branch."
        },
        {
          "term": "Judicial",
          "text": "The branch that decides what laws mean and whether they follow the Constitution. The Supreme Court and the other federal courts make up this branch."
        },
        {
          "term": "Neither",
          "text": "It is a job of the executive branch, which the President leads and which carries out the laws."
        }
      ],
      [
        {
          "term": "Judicial branch",
          "text": "The branch that decides what laws mean and whether they follow the Constitution. The Supreme Court and the other federal courts make up this branch."
        },
        {
          "term": "About the Supreme Court",
          "text": "The action involves the Supreme Court or its justices."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each action by the branch of government that carries it out.",
        "notThis": "Many actions involve a law, but only one branch actually writes and passes laws. Think about the job, not the topic.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "jud",
            "label": "Judicial"
          }
        ],
        "items": [
          {
            "id": "bill",
            "label": "The House and the Senate both vote to pass a new bill.",
            "clue": "Members argue for weeks"
          },
          {
            "id": "budget",
            "label": "Congress decides how much tax money to spend on highways.",
            "clue": "About money and roads"
          },
          {
            "id": "treaty",
            "label": "The Senate votes to approve a treaty with another country.",
            "clue": "About other nations"
          },
          {
            "id": "strike",
            "label": "The Supreme Court decides that a law goes against the Constitution.",
            "clue": "That law no longer counts"
          },
          {
            "id": "meaning",
            "label": "The Supreme Court explains what a confusing law really means.",
            "clue": "It changes how people follow a law"
          },
          {
            "id": "trial",
            "label": "A federal judge oversees a trial about a national law.",
            "clue": "Deals with a national law"
          }
        ]
      },
      {
        "rule": "Sort each action by branch. Some actions belong to neither group.",
        "notThis": "Some actions belong to a branch that is not one of these two, so ask who is doing the job.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "jud",
            "label": "Judicial"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "war",
            "label": "Congress votes to declare war on another country.",
            "clue": "Soldiers will go to fight"
          },
          {
            "id": "confirm",
            "label": "The Senate votes to approve a new Supreme Court justice.",
            "clue": "About a Supreme Court judge"
          },
          {
            "id": "state",
            "label": "The Supreme Court rules that a state law breaks the Constitution.",
            "clue": "A law stops counting"
          },
          {
            "id": "appeal",
            "label": "A federal appeals court reviews whether an earlier trial was fair.",
            "clue": "Lawyers argue in a courtroom"
          },
          {
            "id": "sign",
            "label": "The President signs a bill, and it officially becomes a law.",
            "clue": "A new law begins"
          },
          {
            "id": "nominate",
            "label": "The President chooses a person to serve on the Supreme Court.",
            "clue": "Picks a Supreme Court judge"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "jud",
          "text": "Judicial branch"
        },
        {
          "id": "sc",
          "text": "About the Supreme Court"
        }
      ],
      "items": [
        {
          "id": "scCase",
          "label": "The nine Supreme Court justices hear a case about free speech."
        },
        {
          "id": "scRule",
          "label": "The Supreme Court decides whether a law follows the Constitution."
        },
        {
          "id": "district",
          "label": "A federal district judge leads a trial with a jury."
        },
        {
          "id": "nomV",
          "label": "The President nominates a person to be a Supreme Court justice."
        },
        {
          "id": "confV",
          "label": "The Senate holds a vote on a Supreme Court nominee."
        },
        {
          "id": "budgetV",
          "label": "Congress passes a budget for the national parks."
        }
      ],
      "mc": {
        "prompt": "The Supreme Court decided that a law went against the Constitution, so the law could no longer be used. Which statement explains this action correctly?",
        "choices": [
          {
            "id": "yes",
            "text": "It was the judicial branch, because that branch decides what laws mean."
          },
          {
            "id": "trap",
            "text": "It was the legislative branch, because the action changed a law."
          },
          {
            "id": "no",
            "text": "It was the executive branch, because that branch carries out laws."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the actions that are jobs of the legislative branch.",
        "choices": [
          {
            "id": "pass",
            "text": "Congress passes bills that can become laws."
          },
          {
            "id": "war",
            "text": "Congress has the power to declare war."
          },
          {
            "id": "treaty",
            "text": "The Senate approves treaties with other nations."
          },
          {
            "id": "sign",
            "text": "The President signs bills into law."
          },
          {
            "id": "court",
            "text": "The Supreme Court decides what a law means."
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which branch has that job"
          },
          {
            "id": "trap",
            "text": "whether the action involves a law"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.19A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "What does the Bill of Rights protect?",
    "teks": "5.19A",
    "defs": [
      [
        {
          "term": "In the First Amendment",
          "text": "The First Amendment protects freedom of religion, speech and the press, along with the right to gather peacefully and to petition the government."
        },
        {
          "term": "Amendments 2 through 10",
          "text": "The Bill of Rights is the first ten amendments to the Constitution. Amendments 2 through 10 protect other rights, including several rights of people accused of crimes."
        }
      ],
      [
        {
          "term": "In the First Amendment",
          "text": "The First Amendment protects freedom of religion, speech and the press, along with the right to gather peacefully and to petition the government."
        },
        {
          "term": "Amendments 2 through 10",
          "text": "The Bill of Rights is the first ten amendments to the Constitution. Amendments 2 through 10 protect other rights, including several rights of people accused of crimes."
        },
        {
          "term": "Neither",
          "text": "The right is not in the first ten amendments, although another part of the Constitution may protect it."
        }
      ],
      [
        {
          "term": "In the First Amendment",
          "text": "The First Amendment protects freedom of religion, speech and the press, along with the right to gather peacefully and to petition the government."
        },
        {
          "term": "About speaking or writing",
          "text": "The action involves people speaking, writing or printing words."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each action by the amendment that protects it.",
        "notThis": "Speaking up in some way does not automatically mean the First Amendment. Read the freedoms it actually lists.",
        "groups": [
          {
            "id": "first",
            "label": "In the First Amendment"
          },
          {
            "id": "other",
            "label": "Amendments 2 through 10"
          }
        ],
        "items": [
          {
            "id": "worship",
            "label": "A family worships at the mosque they choose to attend.",
            "clue": "A quiet, private choice"
          },
          {
            "id": "paper",
            "label": "A newspaper prints a story that criticizes the governor.",
            "clue": "The governor is upset"
          },
          {
            "id": "rally",
            "label": "Hundreds of people gather peacefully in a park to protest a decision.",
            "clue": "Nobody gives a speech"
          },
          {
            "id": "silent",
            "label": "A person accused of a crime refuses to answer questions that could prove guilt.",
            "clue": "Chooses not to speak"
          },
          {
            "id": "lawyer",
            "label": "A person accused of a crime has a lawyer to help at trial.",
            "clue": "Someone speaks up for them"
          },
          {
            "id": "warrant",
            "label": "Police get a warrant from a judge before searching a family's home.",
            "clue": "About privacy at home"
          }
        ]
      },
      {
        "rule": "Sort each action by the amendment that protects it. Some are protected elsewhere.",
        "notThis": "A right can feel important and still come from an amendment that was added much later.",
        "groups": [
          {
            "id": "first",
            "label": "In the First Amendment"
          },
          {
            "id": "other",
            "label": "Amendments 2 through 10"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "petition",
            "label": "Students send a signed petition asking Congress to change a law.",
            "clue": "They write, not speak"
          },
          {
            "id": "speech",
            "label": "A citizen gives a speech that criticizes the President.",
            "clue": "Some people disagree loudly"
          },
          {
            "id": "jury",
            "label": "A jury of ordinary citizens decides whether an accused person is guilty.",
            "clue": "Citizens get a voice"
          },
          {
            "id": "soldiers",
            "label": "A family refuses to let soldiers live in their home during peacetime.",
            "clue": "About a family's home"
          },
          {
            "id": "vote18",
            "label": "An 18-year-old citizen votes in an election for the first time.",
            "clue": "A basic right of citizens"
          },
          {
            "id": "women",
            "label": "A woman casts a vote for President.",
            "clue": "Lets citizens speak up"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "first",
          "text": "In the First Amendment"
        },
        {
          "id": "speak",
          "text": "About speaking or writing"
        }
      ],
      "items": [
        {
          "id": "speechV",
          "label": "A citizen stands up and gives a speech against a new tax."
        },
        {
          "id": "pressV",
          "label": "A newspaper publishes an article about a mistake by the government."
        },
        {
          "id": "religionV",
          "label": "A family chooses which religion to follow, or to follow none."
        },
        {
          "id": "lawyerV",
          "label": "A lawyer speaks in court for a person accused of a crime."
        },
        {
          "id": "soldiersV",
          "label": "A family refuses to let soldiers move into their home in peacetime."
        },
        {
          "id": "vote18V",
          "label": "An 18-year-old citizen votes in a national election."
        }
      ],
      "mc": {
        "prompt": "An 18-year-old votes for the first time. Where is the right to vote at age 18 protected?",
        "choices": [
          {
            "id": "yes",
            "text": "In an amendment added long after the Bill of Rights was written."
          },
          {
            "id": "trap",
            "text": "In the First Amendment, because voting lets people speak up."
          },
          {
            "id": "no",
            "text": "In the Second Amendment, which is about keeping and bearing arms."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the rights that the First Amendment protects.",
        "choices": [
          {
            "id": "religion",
            "text": "Freedom of religion"
          },
          {
            "id": "press",
            "text": "Freedom of the press"
          },
          {
            "id": "petition",
            "text": "The right to petition the government"
          },
          {
            "id": "jury",
            "text": "The right to a trial by jury"
          },
          {
            "id": "vote",
            "text": "The right to vote at age 18"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which amendment protects each right"
          },
          {
            "id": "trap",
            "text": "which rights feel most important"
          }
        ]
      }
    }
  },
  {
    "id": "SS-5.23A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Revolution sources",
    "teks": "5.23A",
    "defs": [
      [
        {
          "term": "Primary source",
          "text": "Made at the time by someone who was there, took part, or lived through it."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there and did not live through it."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made at the time by someone who was there, took part, or lived through it."
        },
        {
          "term": "Secondary source",
          "text": "Made later by someone who was not there and did not live through it."
        },
        {
          "term": "Neither",
          "text": "The source is about a different event in history, not the American Revolution."
        }
      ],
      [
        {
          "term": "Primary source",
          "text": "Made at the time by someone who was there, took part, or lived through it."
        },
        {
          "term": "Mostly written words",
          "text": "The source is mostly made of written or printed words, such as a letter, a book or an official document."
        },
        {
          "term": "Center",
          "text": "Both rules are true for this item."
        },
        {
          "term": "Outside",
          "text": "Neither rule is true for this item."
        }
      ]
    ],
    "pages": [
      {
        "rule": "Sort each source about the American Revolution: primary or secondary.",
        "notThis": "A source that looks old or official is not automatically primary. Ask whether the maker was actually there.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "decl",
            "label": "The Declaration of Independence, which the Continental Congress approved in 1776.",
            "clue": "Printed in modern books"
          },
          {
            "id": "revere",
            "label": "Paul Revere's engraving of the Boston Massacre, published in Boston in 1770.",
            "clue": "A picture, not writing"
          },
          {
            "id": "abigail",
            "label": "Abigail Adams's 1776 letter asking her husband to \"remember the ladies.\"",
            "clue": "Written to her own husband"
          },
          {
            "id": "textbook",
            "label": "A school textbook chapter about the Revolution, published in 2019.",
            "clue": "Quotes the Declaration word for word"
          },
          {
            "id": "audio",
            "label": "A museum audio tour about the Revolution, recorded in 2021.",
            "clue": "Played beside objects from 1776"
          },
          {
            "id": "movie",
            "label": "A movie about George Washington's army, filmed in 2015.",
            "clue": "Uses real names and places"
          }
        ]
      },
      {
        "rule": "Sort each source: primary or secondary. Some sources are about a different event.",
        "notThis": "Every source here comes from someone, but not every source is about the American Revolution.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "diary",
            "label": "An army doctor's diary, written at Valley Forge during the winter of 1777.",
            "clue": "Messy, personal handwriting"
          },
          {
            "id": "paine",
            "label": "Thomas Paine's pamphlet Common Sense, which urged colonists toward independence in 1776.",
            "clue": "Written to change minds"
          },
          {
            "id": "website",
            "label": "A historian's website about the Battle of Yorktown, written in 2020.",
            "clue": "Written by an expert"
          },
          {
            "id": "kidsbook",
            "label": "A children's book about Paul Revere's ride, published in 2010.",
            "clue": "Full of true facts"
          },
          {
            "id": "civilwar",
            "label": "A soldier's letter to his family, written during the Civil War in 1863.",
            "clue": "Written by a soldier who fought"
          },
          {
            "id": "moon",
            "label": "A newspaper story about the first moon landing, printed in 1969.",
            "clue": "Printed the very next day"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pri",
          "text": "Primary source"
        },
        {
          "id": "words",
          "text": "Mostly written words"
        }
      ],
      "items": [
        {
          "id": "declV",
          "label": "The Declaration of Independence, approved in 1776."
        },
        {
          "id": "abigailV",
          "label": "A letter Abigail Adams wrote to John Adams in 1776."
        },
        {
          "id": "revereV",
          "label": "Paul Revere's engraving of the Boston Massacre, made in 1770."
        },
        {
          "id": "historyV",
          "label": "A historian's book about the Revolution, published in 2005."
        },
        {
          "id": "statueV",
          "label": "A statue of Paul Revere on horseback, set up in Boston in 1940."
        },
        {
          "id": "movieV",
          "label": "A movie about the Revolution, filmed in 2015."
        }
      ],
      "mc": {
        "prompt": "A historian who is alive today writes a book about the Boston Tea Party, and the book quotes real letters from 1773. What kind of source is the book?",
        "choices": [
          {
            "id": "yes",
            "text": "A secondary source, because the historian was not there."
          },
          {
            "id": "trap",
            "text": "A primary source, because it quotes real letters from 1773."
          },
          {
            "id": "no",
            "text": "It is not a source, because it is a book."
          }
        ]
      },
      "multi": {
        "prompt": "Choose all the primary sources about the American Revolution.",
        "choices": [
          {
            "id": "letter",
            "text": "A letter Abigail Adams wrote to John Adams in 1776"
          },
          {
            "id": "decl",
            "text": "The Declaration of Independence"
          },
          {
            "id": "paine",
            "text": "Thomas Paine's pamphlet Common Sense, published in 1776"
          },
          {
            "id": "tour",
            "text": "A museum audio tour recorded in 2021"
          },
          {
            "id": "text",
            "text": "A textbook chapter written in 2019"
          }
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the maker was there or took part"
          },
          {
            "id": "trap",
            "text": "how old or official the source looks"
          }
        ]
      }
    }
  }
];

export function getClassificationLabPublicCase(id) {
  return CLASSIFICATION_LABS.find((lab) => lab.id === id) || null;
}
