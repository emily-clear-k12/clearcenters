// Safe to import from client components.
// Assembly Deck — SS.5.15B-AD. TEKS 5.15B — the reasons for and the system of checks and balances. The bill in this case is an example, not a real law.

export const PUBLIC_CASE = {
  "standard": "SS.5.15B-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Social Studies",
  "title": "The Bill That Didn't Pass",
  "estimatedMinutes": 20,
  "brief": [
    "This bill is an example, not a real law. Watch closely to see where it stops.",
    "Congress writes laws, the president may veto them, and a court may strike down a law that breaks the Constitution.",
    "Remember that a bill that dies can be a sign that the system worked."
  ],
  "source": {
    "title": "AN EXAMPLE, NOT A REAL LAW",
    "lines": [
      "Congress, the legislative branch, writes and passes bills. The president leads the executive branch, and the courts make up the judicial branch.",
      "In this example, Congress passes a bill that says the president alone may write any law, with no vote. The president vetoes it, refusing to sign it and sending it back to Congress.",
      "Congress can override a veto only with a two-thirds vote in both the House and the Senate.",
      "This Congress does not have those votes, so the bill stops.",
      "The Supreme Court can strike down a law that conflicts with the Constitution.",
      "A check is a power one branch has to limit another branch. The veto is one of these checks. Checks and balances exist so no one branch can do every job or gain too much power."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What each branch can do",
      "goal": "Build the paragraph about the different job each branch does.",
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
          "hint": "What Congress did, and what the president did",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the court can do",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "Congress, the legislative branch, wrote this bill and voted to pass it."
        },
        {
          "id": "r1p5",
          "text": "The Supreme Court wrote this bill and then sent it to Congress for a vote."
        },
        {
          "id": "r1p1",
          "text": "Each branch of government plays a different part when Congress tries to turn a bill into a law."
        },
        {
          "id": "r1p6",
          "text": "Under the Constitution, the president may write any law alone, without a vote."
        },
        {
          "id": "r1p3",
          "text": "The president then vetoed the bill, refusing to sign it and sending it back to Congress."
        },
        {
          "id": "r1p4",
          "text": "If a law ever broke the Constitution, the Supreme Court could strike it down."
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
      "id": "r2",
      "label": "Where it stopped",
      "goal": "Build the paragraph about the veto and the override that failed.",
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
          "hint": "What vote an override needs, and what this Congress had",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What a stopped bill does not mean",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "To override a veto, Congress needs a two-thirds vote in both the House and the Senate."
        },
        {
          "id": "r2p5",
          "text": "The bill failed mostly because it was an election year and members were busy campaigning."
        },
        {
          "id": "r2p1",
          "text": "The bill stopped at the president's veto because Congress could not bring it back."
        },
        {
          "id": "r2p6",
          "text": "When a president uses a veto, it means the Constitution has failed."
        },
        {
          "id": "r2p3",
          "text": "This Congress did not have enough votes, so the override failed."
        },
        {
          "id": "r2p4",
          "text": "A stopped bill, however, is not evidence that the government is broken."
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
      "label": "Why that is the design",
      "goal": "Build the paragraph that explains why the check exists.",
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
          "hint": "Which branch makes laws, and which branch may refuse them",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the failed bill shows",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Congress makes the laws, but the president may refuse to sign one."
        },
        {
          "id": "r3p5",
          "text": "Any government that lets a bill fail is a terrible, broken government."
        },
        {
          "id": "r3p1",
          "text": "Checks and balances exist so that no single branch can do every job or gain too much power."
        },
        {
          "id": "r3p6",
          "text": "A check is simply another name for holding an election."
        },
        {
          "id": "r3p3",
          "text": "The Supreme Court may also strike down a law that conflicts with the Constitution."
        },
        {
          "id": "r3p4",
          "text": "This bill died because the system worked the way it was designed to work."
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
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs each branch's job, then where the bill stopped, before the reason.",
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
      "prompt": "One sentence says an override needs a two-thirds vote in both houses. Tap it.",
      "hint": "Look in the part about where the bill stopped."
    },
    "quickCheck": {
      "prompt": "Why did this example bill fail?",
      "choices": [
        {
          "id": "a",
          "text": "The president vetoed it, and Congress could not override"
        },
        {
          "id": "b",
          "text": "The Supreme Court wrote it"
        },
        {
          "id": "c",
          "text": "It was an election year"
        },
        {
          "id": "d",
          "text": "A veto means the Constitution failed"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What did each branch do in this example, and why is a stopped bill not a broken government?",
    "starters": [
      "Congress",
      "The president",
      "An override",
      "Checks exist so"
    ],
    "checks": [
      "I said Congress passed the bill.",
      "I said the president vetoed it.",
      "I said Congress could not get the votes to override, or named the court.",
      "I said the stop keeps one branch from doing every job.",
      "I did not say a failed bill means the government is broken."
    ],
    "criteria": [
      "Say Congress passed a bill and the president vetoed it.",
      "Say Congress needed a two-thirds vote to override and did not have it, or that a court can strike down an unconstitutional law.",
      "Say checks exist so no one branch does every job."
    ]
  },
  "chain": {
    "title": "Check line",
    "sourceId": "bill",
    "cutId": "veto",
    "cutDark": [
      "stop"
    ],
    "stayOn": [
      "bill"
    ],
    "cutting": "Taking the veto away…",
    "cutDone": "No veto. The stop goes dark.",
    "liveLine": "The line is live. Mark what fails if the president cannot send the bill back.",
    "fillLine": "The check line fills in as each part locks.",
    "links": [
      {
        "id": "bill",
        "label": "Congress",
        "mark": "🏛️",
        "on": "r1"
      },
      {
        "id": "veto",
        "label": "The veto",
        "mark": "↩️",
        "on": "r2"
      },
      {
        "id": "stop",
        "label": "The bill stops",
        "mark": "🚪",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the veto away. What fails?",
    "hint": "Mark what goes dark. Then remove the veto.",
    "switch": "Remove the veto",
    "choices": [
      {
        "id": "a",
        "text": "The check that stopped this bill",
        "marks": [
          "stop"
        ]
      },
      {
        "id": "b",
        "text": "Congress disappears",
        "marks": [
          "bill"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The Court already wrote the bill.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The bill fails because of an election",
        "marks": [
          "stop"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the check line. Which sentence matches the picture?",
    "image": "/student/veto_line.jpg",
    "choices": [
      {
        "id": "back",
        "text": "A capitol, a paper pushed back across a desk, then the paper stopped at a door."
      },
      {
        "id": "pass",
        "text": "The paper sails through an open door with no one sending it back."
      },
      {
        "id": "court",
        "text": "A judge writes the bill inside the capitol."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the check line. Which sentence matches the picture?"
  },
  "board": null
};
