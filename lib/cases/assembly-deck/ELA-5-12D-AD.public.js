// Safe to import from client components.
// Assembly Deck — ELA.5.12D-AD. TEKS 5.12D — a letter that requests information.

export const PUBLIC_CASE = {
  "standard": "ELA.5.12D-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "ELAR",
  "title": "The Request to the City Engineer",
  "estimatedMinutes": 20,
  "brief": [
    "The crosswalk at Oak and 3rd floods after hard rain. Write to the city engineer and request the facts your class needs.",
    "A request says who you are, asks specific questions, and tells how to reply.",
    "Telling the city to fix it today is an order, not a request for information."
  ],
  "source": {
    "title": "FLOOD NOTES",
    "lines": [
      "Water covers the crosswalk at Oak Street and 3rd after hard rain.",
      "The class needs facts before it can suggest a change.",
      "Question 1: Which storm drain serves that corner?",
      "Question 2: When was that drain last cleared?",
      "Question 3: Is a larger drain already in this year's plan?",
      "Please reply to Ms. Alvarez."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Who and why",
      "goal": "Build the opening of the request.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this letter doing?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "What floods, and why you are not giving an order yet",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of letter this is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Whenever there is a hard rain, water covers the crosswalk at Oak Street and 3rd Street."
        },
        {
          "id": "r1p5",
          "text": "Please repair the street today, or our whole class will be very disappointed in the city."
        },
        {
          "id": "r1p1",
          "text": "We are a fifth-grade class, and we are writing to request three facts about a crosswalk that floods."
        },
        {
          "id": "r1p6",
          "text": "Dear friend, would you like to hear about the exciting soccer game I played last weekend?"
        },
        {
          "id": "r1p3",
          "text": "Before our class can suggest a change, we need accurate information about the problem."
        },
        {
          "id": "r1p4",
          "text": "This letter is a request for information, so it asks questions rather than giving orders."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "offtopic",
        "contradicts",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "The questions",
      "goal": "Build the paragraph that asks the three questions.",
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
          "hint": "Which drain, and the two facts about the plan",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why specific questions help",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "First, which storm drain serves the corner of Oak Street and 3rd Street?"
        },
        {
          "id": "r2p5",
          "text": "Please also send us everything your office knows about every street in the city."
        },
        {
          "id": "r2p1",
          "text": "We have three specific questions that your office should be able to answer."
        },
        {
          "id": "r2p6",
          "text": "Actually, we do not have any questions, so you should just come and look for yourself."
        },
        {
          "id": "r2p3",
          "text": "When was that drain last cleared, and is a larger drain already included in this year's plan?"
        },
        {
          "id": "r2p4",
          "text": "Because these questions are specific, your office will know exactly which information to look up."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "contradicts",
        "opinion",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "How to reply",
      "goal": "Build the ending that makes a reply possible.",
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
          "hint": "Who should get the answer, and what the class will do with it",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "When a request is ready",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Please address your reply to our teacher, Ms. Alvarez."
        },
        {
          "id": "r3p5",
          "text": "There is no need to write back, because we have already decided the city is wrong."
        },
        {
          "id": "r3p1",
          "text": "We want to make it as simple as possible for you to reply."
        },
        {
          "id": "r3p6",
          "text": "Could you also mail our class a colorful map of the entire state of Texas?"
        },
        {
          "id": "r3p3",
          "text": "Our class will use your answers to understand why the crosswalk floods before we suggest any changes."
        },
        {
          "id": "r3p4",
          "text": "A request is ready to send only when the reader knows what to answer and where to send it."
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
    "prompt": "Three parts, one letter. What order should the engineer read them in?",
    "hint": "A reader needs who you are, then the questions, before the reply instructions.",
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
      "prompt": "One sentence asks which storm drain serves the corner. Tap it.",
      "hint": "Look in the part with the questions."
    },
    "quickCheck": {
      "prompt": "What makes this a request for information?",
      "choices": [
        {
          "id": "a",
          "text": "It names the corner and asks specific questions"
        },
        {
          "id": "b",
          "text": "It orders the city to fix the street today"
        },
        {
          "id": "c",
          "text": "It says the engineer should not write back"
        },
        {
          "id": "d",
          "text": "It asks for a map of the whole state"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Who is writing, which three facts do you need, and how should the engineer reply?",
    "starters": [
      "We are",
      "The crosswalk",
      "Which drain",
      "Please reply"
    ],
    "checks": [
      "I said who is writing.",
      "I named the flooded crosswalk.",
      "I asked a specific question about the drain.",
      "I said the reply should go to the teacher.",
      "I did not turn the letter into an order."
    ],
    "criteria": [
      "Say a fifth-grade class is writing about the Oak and 3rd crosswalk.",
      "Ask at least two of: which drain, when it was cleared, whether a larger drain is planned.",
      "Ask the engineer to reply to Ms. Alvarez."
    ]
  },
  "chain": {
    "title": "Request line",
    "sourceId": "flood",
    "cutId": "letter",
    "cutDark": [
      "drain"
    ],
    "stayOn": [
      "flood"
    ],
    "cutting": "Sending the letter with no questions…",
    "cutDone": "No questions. The engineer has nothing to answer.",
    "liveLine": "The line is live. Mark what fails if the letter asks nothing.",
    "fillLine": "The request line fills in as each part locks.",
    "links": [
      {
        "id": "flood",
        "label": "The flood",
        "mark": "🌊",
        "on": "r1"
      },
      {
        "id": "letter",
        "label": "The questions",
        "mark": "✉️",
        "on": "r2"
      },
      {
        "id": "drain",
        "label": "The answer",
        "mark": "🛠️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Send a letter with no questions. What fails?",
    "hint": "Mark what goes dark. Then send the blank letter.",
    "switch": "Send no questions",
    "choices": [
      {
        "id": "a",
        "text": "The engineer cannot answer",
        "marks": [
          "drain"
        ]
      },
      {
        "id": "b",
        "text": "The flood disappears",
        "marks": [
          "flood"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. An order is the same as a question.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The city sends a state map",
        "marks": [
          "drain"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the request line. Which sentence matches the picture?",
    "image": "/student/engineer_line.jpg",
    "choices": [
      {
        "id": "ask",
        "text": "A flooded crosswalk, a letter, then a worker at a storm drain."
      },
      {
        "id": "dry",
        "text": "The street is dry, and there is no letter."
      },
      {
        "id": "map",
        "text": "The letter is a map of the whole state."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the request line. Which sentence matches the picture?"
  },
  "board": null
};
