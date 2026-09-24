// Safe to import from client components.
// Assembly Deck — SS.3.7C-AD. TEKS 3.7C — services of local, state, and national government.

export const PUBLIC_CASE = {
  "standard": "SS.3.7C-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "Social Studies",
  "title": "Who Do You Call?",
  "estimatedMinutes": 20,
  "brief": [
    "Three problems. Three levels of government.",
    "The city, the state, and the nation do different jobs.",
    "A tax opinion is not a phone number."
  ],
  "source": {
    "title": "WHO DOES THIS JOB?",
    "lines": [
      "Local means your city. The city picks up trash and fixes streetlights.",
      "A full trash can on your street is a city job.",
      "State means Texas. The state takes care of highways between cities and of state parks.",
      "A hole in a state highway is a state job.",
      "National means the whole country. The post office carries mail. The nation cares for national parks.",
      "A letter going to another state is a national job."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The city job",
      "goal": "Build the paragraph about local services.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Trash, and streetlights",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Who not to call",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The city picks up trash."
        },
        {
          "id": "r1p5",
          "text": "The army should pick up the trash."
        },
        {
          "id": "r1p1",
          "text": "A full trash can on your street is a city job."
        },
        {
          "id": "r1p6",
          "text": "Taxes are too high, so leave the trash."
        },
        {
          "id": "r1p3",
          "text": "City workers also fix streetlights."
        },
        {
          "id": "r1p4",
          "text": "Call the city for this. Not the army."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r2",
      "label": "The state job",
      "goal": "Build the paragraph about state services.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Highways, and state parks",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the city truck does not do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The state takes care of highways between cities."
        },
        {
          "id": "r2p5",
          "text": "The mayor paves every highway in Texas."
        },
        {
          "id": "r2p1",
          "text": "A hole in a state highway is a state job."
        },
        {
          "id": "r2p6",
          "text": "The hole can wait because an election is soon."
        },
        {
          "id": "r2p3",
          "text": "A state park is a state place too."
        },
        {
          "id": "r2p4",
          "text": "The city trash truck does not fix that highway."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "opinion",
        "unsupported"
      ]
    },
    {
      "id": "r3",
      "label": "The nation job",
      "goal": "Build the paragraph about national services.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Mail, and national parks",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a city trash job is not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The post office carries mail across the country."
        },
        {
          "id": "r3p5",
          "text": "The mayor delivers mail to every state."
        },
        {
          "id": "r3p1",
          "text": "Some jobs belong to the whole country."
        },
        {
          "id": "r3p6",
          "text": "Voting is the same thing as sending mail."
        },
        {
          "id": "r3p3",
          "text": "The nation cares for national parks."
        },
        {
          "id": "r3p4",
          "text": "A letter to another state is not a trash job."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "offtopic",
        "opinion",
        "unsupported"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one guide. What order should a reader hear them in?",
    "hint": "A reader needs the city, then the state, before the nation.",
    "slots": [
      {
        "id": "first",
        "label": "Opens the piece"
      },
      {
        "id": "second",
        "label": "Middle"
      },
      {
        "id": "third",
        "label": "Closes the piece"
      }
    ]
  },
  "debrief": {
    "pinpoint": {
      "prompt": "One sentence says the city picks up trash. Tap it.",
      "hint": "Look in the city part."
    },
    "quickCheck": {
      "prompt": "Who should you call about a full trash can on your street?",
      "choices": [
        {
          "id": "a",
          "text": "The city"
        },
        {
          "id": "b",
          "text": "The army"
        },
        {
          "id": "c",
          "text": "The mayor, to deliver mail"
        },
        {
          "id": "d",
          "text": "Nobody, because of taxes"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Who do you call for the trash, the highway hole, and a letter to another state?",
    "starters": [
      "The city",
      "The state",
      "The post office",
      "A letter"
    ],
    "checks": [
      "I said the city picks up trash.",
      "I said the state fixes the highway, or cares for state parks.",
      "I said the post office or the nation carries mail.",
      "I did not give the army the trash job.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say the city picks up street trash.",
      "Say the state handles a highway between cities.",
      "Say the post office or the nation carries a letter to another state."
    ]
  },
  "chain": {
    "title": "Call line",
    "sourceId": "street",
    "cutId": "city",
    "cutDark": [
      "truck"
    ],
    "stayOn": [
      "street"
    ],
    "cutting": "Skipping the city…",
    "cutDone": "No city call. The trash truck goes dark.",
    "liveLine": "The line is live. Mark what fails if no one calls the city.",
    "fillLine": "The call line fills in as each part locks.",
    "links": [
      {
        "id": "street",
        "label": "The trash",
        "mark": "🗑️",
        "on": "r1"
      },
      {
        "id": "city",
        "label": "The city",
        "mark": "🏛️",
        "on": "r1"
      },
      {
        "id": "truck",
        "label": "The truck",
        "mark": "🚛",
        "on": "r1"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Nobody calls the city. What fails?",
    "hint": "Mark what goes dark. Then skip the city.",
    "switch": "Skip the city",
    "choices": [
      {
        "id": "a",
        "text": "The trash truck",
        "marks": [
          "truck"
        ]
      },
      {
        "id": "b",
        "text": "The full can disappears",
        "marks": [
          "street"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The army will come.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The mayor delivers the mail instead",
        "marks": [
          "truck"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the call line. Which sentence matches the picture?",
    "image": "/student/call_line.jpg",
    "choices": [
      {
        "id": "trash",
        "text": "A full trash can, a city building, then a trash truck."
      },
      {
        "id": "army",
        "text": "Soldiers pick up the can, and there is no truck."
      },
      {
        "id": "mail",
        "text": "The picture is only a mailbox."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the call line. Which sentence matches the picture?"
  },
  "board": null
};
