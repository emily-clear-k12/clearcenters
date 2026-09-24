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
    "This bill is an example, not a real law. Watch where it stops.",
    "Congress writes laws. The president may veto. A court may strike down a law that breaks the Constitution.",
    "A bill that dies can mean the system worked."
  ],
  "source": {
    "title": "AN EXAMPLE, NOT A REAL LAW",
    "lines": [
      "Congress passes a bill that says the president alone may write any law, with no vote.",
      "The president vetoes it. A veto sends the bill back.",
      "Congress can override a veto only with a two-thirds vote in both the House and the Senate.",
      "This Congress does not have those votes, so the bill stops.",
      "The Supreme Court can strike down a law that conflicts with the Constitution.",
      "Checks and balances exist so no one branch can do every job."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What each branch can do",
      "goal": "Build the paragraph about the three different jobs.",
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
          "text": "Congress wrote this bill and voted to pass it."
        },
        {
          "id": "r1p5",
          "text": "The Supreme Court wrote this bill."
        },
        {
          "id": "r1p1",
          "text": "Each branch has a different job on a bill."
        },
        {
          "id": "r1p6",
          "text": "The president gets to write every law with no vote."
        },
        {
          "id": "r1p3",
          "text": "The president vetoed it and sent it back."
        },
        {
          "id": "r1p4",
          "text": "A court can strike down a law that breaks the Constitution."
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
      "goal": "Build the paragraph about the veto and the failed override.",
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
          "text": "An override needs a two-thirds vote in both houses."
        },
        {
          "id": "r2p5",
          "text": "The bill failed because it was an election year."
        },
        {
          "id": "r2p1",
          "text": "The bill stopped at the president's veto."
        },
        {
          "id": "r2p6",
          "text": "A veto means the Constitution has failed."
        },
        {
          "id": "r2p3",
          "text": "This Congress did not have those votes."
        },
        {
          "id": "r2p4",
          "text": "A stopped bill is not proof that the government is broken."
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
      "goal": "Build the paragraph about why the check exists.",
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
          "text": "Congress makes the laws. The president may refuse one."
        },
        {
          "id": "r3p5",
          "text": "Government is broken whenever a bill fails."
        },
        {
          "id": "r3p1",
          "text": "Checks exist so no one branch can do every job."
        },
        {
          "id": "r3p6",
          "text": "A check is the same thing as holding an election."
        },
        {
          "id": "r3p3",
          "text": "A court may stop a law that conflicts with the Constitution."
        },
        {
          "id": "r3p4",
          "text": "This bill died because the design worked."
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
