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
  }
];

export function getClassificationLabPublicCase(id) {
  return CLASSIFICATION_LABS.find((lab) => lab.id === id) || null;
}
