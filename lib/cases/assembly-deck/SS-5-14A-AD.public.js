// Safe to import from client components.
// Assembly Deck — SS.5.14A-AD. TEKS 5.14A — purposes, key elements, and importance of the Declaration of Independence.

export const PUBLIC_CASE = {
  "standard": "SS.5.14A-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Social Studies",
  "title": "What the Document Actually Says",
  "estimatedMinutes": 20,
  "brief": [
    "The Declaration of Independence is an argument, not a constitution.",
    "Explain why it was written, what it claims, and why the list of complaints matters.",
    "A fact about the three branches belongs to a different document."
  ],
  "source": {
    "title": "THE DOCUMENT",
    "lines": [
      "The Continental Congress adopted the Declaration of Independence on July 4, 1776.",
      "Its purpose was to explain why the colonies were breaking away from Britain.",
      "It says people have rights to life, liberty, and the pursuit of happiness.",
      "It says governments get their power from the consent of the governed.",
      "The longest part is a list of complaints against King George III. The list is the evidence.",
      "The Declaration did not set up the three branches, and it did not end slavery. The Constitution came later."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Why it was written",
      "goal": "Build the paragraph about the Declaration's purpose.",
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
          "hint": "The date, and the break it announced",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of writing it is",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Congress adopted it on July 4, 1776."
        },
        {
          "id": "r1p5",
          "text": "It was written to create the three branches of government."
        },
        {
          "id": "r1p1",
          "text": "The Declaration was written to announce a break with Britain."
        },
        {
          "id": "r1p6",
          "text": "Jefferson wrote it because he was the kindest founder."
        },
        {
          "id": "r1p3",
          "text": "Its job was to explain why the colonies were separating."
        },
        {
          "id": "r1p4",
          "text": "It is an argument to the world, not a book of laws."
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
      "label": "What it claims",
      "goal": "Build the paragraph about the rights the document states.",
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
          "hint": "The rights, and where government power comes from",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What those claims did not do by themselves",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "People have rights to life, liberty, and the pursuit of happiness."
        },
        {
          "id": "r2p5",
          "text": "The text says the king may take any right he chooses."
        },
        {
          "id": "r2p1",
          "text": "The document makes a claim about rights and power."
        },
        {
          "id": "r2p6",
          "text": "The Declaration freed every enslaved person in 1776."
        },
        {
          "id": "r2p3",
          "text": "Government power comes from the consent of the governed."
        },
        {
          "id": "r2p4",
          "text": "Those are ideas the text states. They did not, by themselves, end slavery."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "Why the list matters",
      "goal": "Build the paragraph about the grievance list.",
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
          "hint": "Who the complaints name, and what job the list does",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the list is not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The complaints name actions of King George III."
        },
        {
          "id": "r3p5",
          "text": "The complaint list is the Bill of Rights."
        },
        {
          "id": "r3p1",
          "text": "The longest part is a list of complaints against the king."
        },
        {
          "id": "r3p6",
          "text": "The list does not matter, because the writers were famous."
        },
        {
          "id": "r3p3",
          "text": "The list is the evidence for the break."
        },
        {
          "id": "r3p4",
          "text": "Without that evidence, the break would be only an announcement."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs the purpose, then the claims, before the complaint list makes sense.",
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
      "prompt": "One sentence says the complaint list is the evidence for the break. Tap it.",
      "hint": "Look in the part about the list."
    },
    "quickCheck": {
      "prompt": "What is the Declaration's job?",
      "choices": [
        {
          "id": "a",
          "text": "To explain the break and give evidence against the king"
        },
        {
          "id": "b",
          "text": "To set up the three branches of government"
        },
        {
          "id": "c",
          "text": "To free every enslaved person in 1776"
        },
        {
          "id": "d",
          "text": "To let the king take any right he wants"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Why was the Declaration written, what does it claim, and why does the complaint list matter?",
    "starters": [
      "The Declaration",
      "On July 4",
      "People have rights",
      "The list"
    ],
    "checks": [
      "I said it explained a break with Britain.",
      "I named a right, or the consent of the governed.",
      "I said the complaint list is evidence against the king.",
      "I did not say it created the three branches.",
      "I did not say it ended slavery."
    ],
    "criteria": [
      "Say the Declaration explained why the colonies were breaking from Britain, or give the date July 4, 1776.",
      "State a claim: rights, or government power from consent.",
      "Say the list of complaints is the evidence, and do not call it the Constitution or the Bill of Rights."
    ]
  },
  "chain": {
    "title": "Document line",
    "sourceId": "purpose",
    "cutId": "rights",
    "cutDark": [
      "list"
    ],
    "stayOn": [
      "purpose"
    ],
    "cutting": "Taking the rights claim off the page…",
    "cutDone": "No rights claim. The complaint list goes dark.",
    "liveLine": "The line is live. Mark what fails if the rights claim is gone.",
    "fillLine": "The document line fills in as each part locks.",
    "links": [
      {
        "id": "purpose",
        "label": "The purpose",
        "mark": "✒️",
        "on": "r1"
      },
      {
        "id": "rights",
        "label": "The claim",
        "mark": "🗣️",
        "on": "r2"
      },
      {
        "id": "list",
        "label": "The evidence",
        "mark": "📜",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the rights claim away. What fails?",
    "hint": "Mark what goes dark. Then remove the claim.",
    "switch": "Remove the claim",
    "choices": [
      {
        "id": "a",
        "text": "The complaint list loses the idea it is proving",
        "marks": [
          "list"
        ]
      },
      {
        "id": "b",
        "text": "The purpose disappears",
        "marks": [
          "purpose"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Fame is enough evidence.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The list turns into the Bill of Rights",
        "marks": [
          "list"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the document line. Which sentence matches the picture?",
    "image": "/student/declare_line.jpg",
    "choices": [
      {
        "id": "page",
        "text": "A page is written, shown to a crowd, and then a long list unrolls."
      },
      {
        "id": "law",
        "text": "Three government buildings replace the page and the list."
      },
      {
        "id": "blank",
        "text": "The scroll is blank, and no one is holding a page."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the document line. Which sentence matches the picture?"
  },
  "board": null
};
