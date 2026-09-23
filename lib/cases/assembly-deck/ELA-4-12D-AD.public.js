// Safe to import from client components.
// Assembly Deck — ELA.4.12D-AD. TEKS 4.12D — a letter that requests information.

export const PUBLIC_CASE = {
  "standard": "ELA.4.12D-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "ELAR",
  "title": "The Letter to the Museum",
  "estimatedMinutes": 20,
  "brief": [
    "Your class needs facts before a fossil trip. Write and ask the museum.",
    "A request says who you are, asks specific questions, and tells how to reply.",
    "Tell us everything is not a question."
  ],
  "source": {
    "title": "TRIP NOTES",
    "lines": [
      "The class is studying fossils and may visit the museum.",
      "Question 1: Does the museum have a fossil hall?",
      "Question 2: Which days can a school group visit?",
      "Question 3: What does a class visit cost?",
      "Please reply to the teacher, Ms. Alvarez."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Who is asking",
      "goal": "Build the opening of the request.",
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
          "hint": "Who you are, and why you are writing",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the reader should know",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "We are a fourth-grade class studying fossils."
        },
        {
          "id": "r1p5",
          "text": "Dear whoever, send everything you own."
        },
        {
          "id": "r1p1",
          "text": "We are writing to ask for three facts."
        },
        {
          "id": "r1p6",
          "text": "We already visited last year and need nothing."
        },
        {
          "id": "r1p3",
          "text": "We may visit, so we need answers before we plan."
        },
        {
          "id": "r1p4",
          "text": "The museum should know who is asking and why."
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
      "id": "r2",
      "label": "The questions",
      "goal": "Build the paragraph that asks the real questions.",
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
          "hint": "The hall, and the two planning facts",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why vague does not work",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Does the museum have a fossil hall?"
        },
        {
          "id": "r2p5",
          "text": "Tell us everything about every room."
        },
        {
          "id": "r2p1",
          "text": "The letter has to ask questions the museum can answer."
        },
        {
          "id": "r2p6",
          "text": "We do not actually have any questions."
        },
        {
          "id": "r2p3",
          "text": "Which days can a school group visit, and what is the cost?"
        },
        {
          "id": "r2p4",
          "text": "Specific questions give the museum a clear job."
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
          "hint": "What a finished request includes",
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
          "text": "Do not write back. We will guess."
        },
        {
          "id": "r3p1",
          "text": "A request should make the reply easy."
        },
        {
          "id": "r3p6",
          "text": "Also tell us your favorite color."
        },
        {
          "id": "r3p3",
          "text": "Our class will use the answer to plan the visit."
        },
        {
          "id": "r3p4",
          "text": "A letter that says how to answer is ready to send."
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
    "prompt": "Three parts, one letter. What order should the museum read them in?",
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
      "prompt": "One sentence asks whether the museum has a fossil hall. Tap it.",
      "hint": "Look in the part with the questions."
    },
    "quickCheck": {
      "prompt": "What makes this a real request for information?",
      "choices": [
        {
          "id": "a",
          "text": "It says who is asking and asks specific questions"
        },
        {
          "id": "b",
          "text": "It says send everything you own"
        },
        {
          "id": "c",
          "text": "It says do not write back"
        },
        {
          "id": "d",
          "text": "It asks for a favorite color"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Who is the letter from, what three things do you need to know, and how should the museum reply?",
    "starters": [
      "We are",
      "Does the museum",
      "Which days",
      "Please reply"
    ],
    "checks": [
      "I said who is writing.",
      "I asked about the fossil hall.",
      "I asked about days or cost.",
      "I said how to reply.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Say a fourth-grade class studying fossils is writing.",
      "Ask at least two of: fossil hall, visit days, cost.",
      "Ask the museum to reply to the teacher."
    ]
  },
  "chain": {
    "title": "Request line",
    "sourceId": "fossils",
    "cutId": "letter",
    "cutDark": [
      "museum"
    ],
    "stayOn": [
      "fossils"
    ],
    "cutting": "Leaving the questions off the letter…",
    "cutDone": "No questions. The museum cannot answer.",
    "liveLine": "The line is live. Mark what fails if the letter asks nothing.",
    "fillLine": "The request line fills in as each part locks.",
    "links": [
      {
        "id": "fossils",
        "label": "Fossils",
        "mark": "🦴",
        "on": "r1"
      },
      {
        "id": "letter",
        "label": "The questions",
        "mark": "✉️",
        "on": "r2"
      },
      {
        "id": "museum",
        "label": "The museum",
        "mark": "🏛️",
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
        "text": "The museum cannot answer",
        "marks": [
          "museum"
        ]
      },
      {
        "id": "b",
        "text": "The fossils disappear",
        "marks": [
          "fossils"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Send everything covers it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The museum sends a favorite color",
        "marks": [
          "museum"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the request line. Which sentence matches the picture?",
    "image": "/student/museum_line.jpg",
    "choices": [
      {
        "id": "ask",
        "text": "Kids study fossils, a letter is ready, and it is for the museum."
      },
      {
        "id": "color",
        "text": "The letter asks the building for a favorite color."
      },
      {
        "id": "none",
        "text": "There are no fossils, and the class already finished the trip."
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
