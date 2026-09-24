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
    "The crosswalk at Oak and 3rd floods after hard rain. Write the city engineer for facts.",
    "A request says who you are, asks specific questions, and tells how to reply.",
    "Fix it today is an order, not a question."
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
          "text": "The crosswalk at Oak and 3rd floods after hard rain."
        },
        {
          "id": "r1p5",
          "text": "Fix the street today, or we will be disappointed."
        },
        {
          "id": "r1p1",
          "text": "We are a fifth-grade class writing for three facts."
        },
        {
          "id": "r1p6",
          "text": "Dear friend, want to hear about my weekend?"
        },
        {
          "id": "r1p3",
          "text": "We need information before we can suggest a change."
        },
        {
          "id": "r1p4",
          "text": "This letter asks questions. It does not give orders."
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
          "text": "Which storm drain serves the corner of Oak and 3rd?"
        },
        {
          "id": "r2p5",
          "text": "Tell us everything you know about every street."
        },
        {
          "id": "r2p1",
          "text": "Three questions would let the engineer answer."
        },
        {
          "id": "r2p6",
          "text": "We have no questions. Just come look."
        },
        {
          "id": "r2p3",
          "text": "When was it last cleared, and is a larger drain already planned?"
        },
        {
          "id": "r2p4",
          "text": "Specific questions give the city a clear job."
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
          "text": "Please write back to our teacher, Ms. Alvarez."
        },
        {
          "id": "r3p5",
          "text": "Do not write back. We already decided you are wrong."
        },
        {
          "id": "r3p1",
          "text": "A request should make the reply easy."
        },
        {
          "id": "r3p6",
          "text": "Also send a map of the whole state."
        },
        {
          "id": "r3p3",
          "text": "Our class will use the facts to understand the flood."
        },
        {
          "id": "r3p4",
          "text": "A request is ready when the reader knows how to answer."
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
