// Safe to import from client components.
// Assembly Deck — ELA.5.13D-AD. TEKS 5.13D — credibility of primary and secondary sources.

export const PUBLIC_CASE = {
  "standard": "ELA.5.13D-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "ELAR",
  "title": "Four Sources, One Question",
  "estimatedMinutes": 20,
  "brief": [
    "Did the May 4 storm flood the playground? You have four sources, but they are not equally useful.",
    "A primary source comes from someone who was there. A secondary source reports what someone else saw.",
    "Dated and specific beats old and general. Primary does not automatically win."
  ],
  "source": {
    "title": "FOUR SOURCES",
    "lines": [
      "Question: Did the May 4 storm flood the school playground?",
      "Source A, primary: the principal's photo log, May 4, 3:10 p.m. Water covers the blacktop and the bottom of the slide.",
      "Source B, secondary: a Channel 8 story on May 5. It quotes the principal, who said the playground closed early because of standing water.",
      "Source C, primary but thin: a classmate's text, no date, that says only, Today was insane.",
      "Source D: a 2019 website with no author. It says school playgrounds flood all the time. It was written before this storm."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What could answer",
      "goal": "Build the paragraph that says what kind of source this question needs.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is the question?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "What a useful source has to be about, and what it has to show",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What cannot answer a question about one day",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "To be useful, a source has to describe that particular storm, not storms in general."
        },
        {
          "id": "r1p5",
          "text": "Any website will work, because information on the internet always stays current."
        },
        {
          "id": "r1p1",
          "text": "Our research question is whether the May 4 storm actually flooded the school playground."
        },
        {
          "id": "r1p6",
          "text": "This question is so simple that it does not require any source at all."
        },
        {
          "id": "r1p3",
          "text": "It should also show what someone observed, or quote a person who was there."
        },
        {
          "id": "r1p4",
          "text": "A source written in a different year cannot tell us what happened on May 4."
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
      "label": "The strongest source",
      "goal": "Build the paragraph that explains why the photo log is strongest.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "Which source is strongest?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "When it was made, and what it shows",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What makes a primary source strong",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "The principal took the photos on May 4 at 3:10 p.m., the same day as the storm."
        },
        {
          "id": "r2p5",
          "text": "The classmate's text that says today was insane provides the best evidence."
        },
        {
          "id": "r2p1",
          "text": "Of the four sources, the principal's photo log is the strongest one."
        },
        {
          "id": "r2p6",
          "text": "The photo log seems weak to me, because a principal is not a real scientist."
        },
        {
          "id": "r2p3",
          "text": "The photos show water covering the blacktop and the bottom of the slide."
        },
        {
          "id": "r2p4",
          "text": "A primary source is especially strong when it is dated and describes specific details."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "unsupported",
        "opinion",
        "contradicts",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "What cannot decide it",
      "goal": "Build the paragraph that sets the weak sources aside.",
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
          "hint": "Why the old site fails, and why the text fails",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the news story can and cannot do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The 2019 website was written before the storm, and it does not name an author."
        },
        {
          "id": "r3p5",
          "text": "The 2019 website is the best choice, because its writer sounds completely sure."
        },
        {
          "id": "r3p1",
          "text": "However, two of the four sources should not be used to decide this question."
        },
        {
          "id": "r3p6",
          "text": "We should ignore the photo log and rely on the classmate's undated text instead."
        },
        {
          "id": "r3p3",
          "text": "The classmate's text is undated and names no place, so it could describe any day."
        },
        {
          "id": "r3p4",
          "text": "The news story can support the photo log, but only the log is a firsthand record from May 4."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "contradicts",
        "unsupported",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one judgment. What order should a reader hear them in?",
    "hint": "A reader needs the question, then the strongest source, before the weak sources make sense.",
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
      "prompt": "One sentence says the photo log was made on May 4 at 3:10 p.m. Tap it.",
      "hint": "Look in the part about the strongest source."
    },
    "quickCheck": {
      "prompt": "Which source best answers the question about May 4?",
      "choices": [
        {
          "id": "a",
          "text": "The principal's photo log from May 4 at 3:10 p.m."
        },
        {
          "id": "b",
          "text": "A 2019 website with no author"
        },
        {
          "id": "c",
          "text": "An undated text that says today was insane"
        },
        {
          "id": "d",
          "text": "Any website, because the internet is current"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Which source best answers whether the May 4 storm flooded the playground, and why is it better than the 2019 website?",
    "starters": [
      "The best source is",
      "The photo log",
      "The 2019 site",
      "A source is useful when"
    ],
    "checks": [
      "I named the photo log.",
      "I said it was dated or showed the water.",
      "I said why the 2019 site or the undated text is weaker.",
      "I did not say primary always wins, or that the internet is automatically true.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Name the principal's May 4 photo log as the strongest source.",
      "Give a reason: it is dated, firsthand, or it shows the water.",
      "Say the 2019 site cannot answer because it was written before the storm, or that the undated text names no day."
    ]
  },
  "chain": {
    "title": "Source line",
    "sourceId": "question",
    "cutId": "log",
    "cutDark": [
      "answer"
    ],
    "stayOn": [
      "question"
    ],
    "cutting": "Taking the photo log out of the record…",
    "cutDone": "No log. The answer goes dark.",
    "liveLine": "The line is live. Mark what fails if the photo log is gone.",
    "fillLine": "The source line fills in as each part locks.",
    "links": [
      {
        "id": "question",
        "label": "The question",
        "mark": "❓",
        "on": "r1"
      },
      {
        "id": "log",
        "label": "Photo log",
        "mark": "📷",
        "on": "r2"
      },
      {
        "id": "answer",
        "label": "The answer",
        "mark": "✅",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the photo log away. What fails?",
    "hint": "Mark what goes dark. Then take the log away.",
    "switch": "Take the log away",
    "choices": [
      {
        "id": "a",
        "text": "A sure answer about May 4",
        "marks": [
          "answer"
        ]
      },
      {
        "id": "b",
        "text": "The question disappears",
        "marks": [
          "question"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The 2019 website can replace it.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The undated text becomes the best proof",
        "marks": [
          "answer"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the source line. Which sentence matches the picture?",
    "image": "/student/source_line.jpg",
    "choices": [
      {
        "id": "camera",
        "text": "A camera shows a flooded playground, a newspaper comes next, and an old laptop is last."
      },
      {
        "id": "laptop",
        "text": "The old laptop is the clearest record, and the camera is blank."
      },
      {
        "id": "sun",
        "text": "The camera shows a dry, sunny playground."
      }
    ]
  },
  "repair": {
    "roundId": "r3",
    "pieceId": "r3p5",
    "prompt": "Look at the source line. Which sentence matches the picture?"
  },
  "board": null
};
