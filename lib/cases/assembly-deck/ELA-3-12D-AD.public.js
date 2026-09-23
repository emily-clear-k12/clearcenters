// Safe to import from client components.
// Assembly Deck — ELA.3.12D-AD. TEKS 3.12D — thank-you notes and letters.

export const PUBLIC_CASE = {
  "standard": "ELA.3.12D-AD",
  "mode": "paragraph",
  "grade": 3,
  "subject": "ELAR",
  "title": "The Letter to the Fire Station",
  "estimatedMinutes": 20,
  "brief": [
    "The firefighters visited your class. Write a thank-you letter.",
    "A thank-you names the person, tells what they did, and says thank you.",
    "A demand is not a thank-you."
  ],
  "source": {
    "title": "VISIT NOTES",
    "lines": [
      "Two firefighters came on Tuesday.",
      "They showed the truck, the hose, and how to stop, drop, and roll.",
      "They let three students sit in the truck.",
      "The letter goes to the station, not to one friend.",
      "A thank-you ends with the class name."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Who and why",
      "goal": "Build the opening of the letter.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "Who is the letter to?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "When they came, and that this is a thank-you",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why you are writing",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "You came to our class on Tuesday."
        },
        {
          "id": "r1p5",
          "text": "Dear snack drawer, send more crackers."
        },
        {
          "id": "r1p1",
          "text": "Dear firefighters, we are writing to say thank you."
        },
        {
          "id": "r1p6",
          "text": "You came on Saturday."
        },
        {
          "id": "r1p3",
          "text": "Our class is the one you visited."
        },
        {
          "id": "r1p4",
          "text": "This letter is a thank-you for that visit."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "offtopic",
        "contradicts",
        "opinion",
        "unsupported"
      ]
    },
    {
      "id": "r2",
      "label": "The real thanks",
      "goal": "Build the paragraph that says what they did.",
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
          "hint": "Two things they showed or shared",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why those details matter",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "You showed us the truck and the hose."
        },
        {
          "id": "r2p5",
          "text": "Come back and bring us pizza."
        },
        {
          "id": "r2p1",
          "text": "We want to thank you for the real things you did."
        },
        {
          "id": "r2p6",
          "text": "You let the whole town sit in the truck."
        },
        {
          "id": "r2p3",
          "text": "You taught us to stop, drop, and roll."
        },
        {
          "id": "r2p4",
          "text": "A thank-you is clearer when it names the help."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "unsupported",
        "contradicts",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "The close",
      "goal": "Build the ending of the letter.",
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
          "hint": "The thanks again, and the class name",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a letter needs at the end",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Thank you again for teaching our class."
        },
        {
          "id": "r3p5",
          "text": "Send us a puppy next time."
        },
        {
          "id": "r3p1",
          "text": "A letter has to close, or it just stops."
        },
        {
          "id": "r3p6",
          "text": "Do not write your name. Surprise them."
        },
        {
          "id": "r3p3",
          "text": "From, Room 12."
        },
        {
          "id": "r3p4",
          "text": "The reader should know who sent the thanks."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "offtopic",
        "contradicts",
        "opinion",
        "unsupported"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one letter. What order should the firefighters read them in?",
    "hint": "A reader needs who you are, then the real thanks, before the close.",
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
      "prompt": "One sentence names the safety lesson they taught. Tap it.",
      "hint": "Look in the part about the real thanks."
    },
    "quickCheck": {
      "prompt": "What must this thank-you letter do?",
      "choices": [
        {
          "id": "a",
          "text": "Name the visit and thank them for the real help"
        },
        {
          "id": "b",
          "text": "Ask for pizza"
        },
        {
          "id": "c",
          "text": "Hide the class name"
        },
        {
          "id": "d",
          "text": "Write to the snack drawer"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What did the firefighters do, and what will you thank them for?",
    "starters": [
      "Dear firefighters",
      "On Tuesday",
      "You showed us",
      "Thank you"
    ],
    "checks": [
      "I named who the letter is for.",
      "I said what they did.",
      "I said thank you.",
      "I did not ask for a prize.",
      "I wrote more than one sentence."
    ],
    "criteria": [
      "Name the firefighters or the station.",
      "Tell something they did, such as the truck, the hose, or stop, drop, and roll.",
      "Say thank you."
    ]
  },
  "chain": {
    "title": "Letter line",
    "sourceId": "visit",
    "cutId": "thanks",
    "cutDark": [
      "close"
    ],
    "stayOn": [
      "visit"
    ],
    "cutting": "Taking the real thanks off the card…",
    "cutDone": "No thanks on the card. The letter does not get sent.",
    "liveLine": "The line is live. Mark what fails if the thanks is blank.",
    "fillLine": "The letter line fills in as each part locks.",
    "links": [
      {
        "id": "visit",
        "label": "The visit",
        "mark": "🚒",
        "on": "r1"
      },
      {
        "id": "thanks",
        "label": "The thanks",
        "mark": "❤️",
        "on": "r2"
      },
      {
        "id": "close",
        "label": "The envelope",
        "mark": "✉️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Leave the card blank. What fails?",
    "hint": "Mark what goes dark. Then take the thanks away.",
    "switch": "Leave the card blank",
    "choices": [
      {
        "id": "a",
        "text": "The letter does not get sent",
        "marks": [
          "close"
        ]
      },
      {
        "id": "b",
        "text": "The visit disappears",
        "marks": [
          "visit"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. A blank card is still a thank-you.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The truck brings pizza",
        "marks": [
          "thanks"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the letter line. Which sentence matches the picture?",
    "image": "/student/thanks_line.jpg",
    "choices": [
      {
        "id": "card",
        "text": "Firefighters visit the class, then a heart card goes in an envelope."
      },
      {
        "id": "pizza",
        "text": "The card asks for pizza, and there is no fire truck."
      },
      {
        "id": "blank",
        "text": "The envelope is full of crackers for the snack drawer."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the letter line. Which sentence matches the picture?"
  },
  "board": null
};
