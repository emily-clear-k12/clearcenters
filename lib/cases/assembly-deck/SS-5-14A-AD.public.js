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
    "The Declaration of Independence is an argument, not a constitution or a set of laws.",
    "Explain why it was written, what it claims about rights, and why its long list of complaints matters.",
    "Be careful: a fact about the three branches of government belongs to a different document."
  ],
  "source": {
    "title": "THE DOCUMENT",
    "lines": [
      "Thomas Jefferson wrote the first draft. The Continental Congress adopted the Declaration of Independence on July 4, 1776.",
      "Its purpose was to explain to the world why the colonies were breaking away from Britain.",
      "It says people have rights to life, liberty, and the pursuit of happiness, and that these rights cannot be taken away.",
      "It says governments get their power from the consent of the governed, meaning the people.",
      "The longest part is a list of complaints about actions by King George III, such as taxing the colonists without their consent. The list is the evidence for the break.",
      "The Declaration did not set up the three branches, and it did not end slavery. The Constitution, with its Bill of Rights, came later."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Why it was written",
      "goal": "Build the paragraph that explains the Declaration's purpose.",
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
          "text": "Thomas Jefferson wrote the first draft. Congress adopted it on July 4, 1776."
        },
        {
          "id": "r1p5",
          "text": "It was written mainly to create the three branches of the new government."
        },
        {
          "id": "r1p1",
          "text": "The Declaration was written to announce that the colonies were breaking away from Britain."
        },
        {
          "id": "r1p6",
          "text": "Jefferson wrote it because he was the kindest and wisest of the founders."
        },
        {
          "id": "r1p3",
          "text": "Its main job was to explain to the world why the colonies were leaving."
        },
        {
          "id": "r1p4",
          "text": "Because it makes a case instead of setting rules, it is an argument, not a book of laws."
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
      "goal": "Build the paragraph about the rights the document claims people have.",
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
          "text": "It says people have rights to life, liberty, and the pursuit of happiness. No one can take these rights away."
        },
        {
          "id": "r2p5",
          "text": "According to the text, the king may take away any right he wants."
        },
        {
          "id": "r2p1",
          "text": "The document also makes bold claims about rights and about where power comes from."
        },
        {
          "id": "r2p6",
          "text": "The Declaration freed every enslaved person in the colonies in 1776."
        },
        {
          "id": "r2p3",
          "text": "It also says a government gets its power from the consent of the governed."
        },
        {
          "id": "r2p4",
          "text": "The document states these ideas, but the words alone did not end slavery."
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
      "goal": "Build the paragraph about the list of complaints, also called grievances.",
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
          "text": "The complaints describe things King George III did, such as taxing colonists without their consent."
        },
        {
          "id": "r3p5",
          "text": "The list of complaints is the same as the Bill of Rights."
        },
        {
          "id": "r3p1",
          "text": "The longest part is a list of complaints against the king."
        },
        {
          "id": "r3p6",
          "text": "Honestly, the list hardly matters, because the writers were famous enough to trust."
        },
        {
          "id": "r3p3",
          "text": "Together, the complaints are the evidence that the break was justified."
        },
        {
          "id": "r3p4",
          "text": "Without that evidence, the Declaration would be only an announcement, not an argument."
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
      "prompt": "One sentence says the complaints are the evidence for the break with Britain. Tap it.",
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
