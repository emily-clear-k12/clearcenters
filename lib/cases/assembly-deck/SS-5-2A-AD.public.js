// Safe to import from client components.
// Assembly Deck — SS.5.2A-AD. TEKS 5.2A — causes and effects before and during the American Revolution, including taxation after the French and Indian War and responses such as the Boston Tea Party.

export const PUBLIC_CASE = {
  "standard": "SS.5.2A-AD",
  "mode": "paragraph",
  "grade": 5,
  "subject": "Social Studies",
  "title": "Before the Shooting",
  "estimatedMinutes": 20,
  "brief": [
    "The fighting did not come first. The taxes did.",
    "Trace the causes from the debt, to the protests, to the first shots.",
    "A slogan is not a timeline. An effect is not a cause."
  ],
  "source": {
    "title": "TIMELINE",
    "lines": [
      "The French and Indian War ended in 1763. Britain had a large debt.",
      "Britain taxed the colonies to help pay that debt. The colonies had no vote in Parliament.",
      "The Stamp Act of 1765 taxed printed paper. Colonists refused to buy some British goods.",
      "In 1773 colonists dumped British tea into Boston Harbor. That protest is called the Boston Tea Party.",
      "Britain then closed Boston Harbor. Fighting began at Lexington and Concord in April 1775.",
      "The Declaration of Independence came in 1776, after the fighting had started."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The taxes",
      "goal": "Build the paragraph that explains the taxes as a cause.",
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
          "hint": "The debt, and the tax the colonies had no vote on",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the taxes come first",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "The war left Britain with a large debt."
        },
        {
          "id": "r1p5",
          "text": "The Declaration of Independence caused the Stamp Act."
        },
        {
          "id": "r1p1",
          "text": "Britain taxed the colonies after the French and Indian War."
        },
        {
          "id": "r1p6",
          "text": "A love of freedom is the only fact that matters."
        },
        {
          "id": "r1p3",
          "text": "The Stamp Act taxed printed paper, and the colonies had no vote on it."
        },
        {
          "id": "r1p4",
          "text": "Those taxes were a cause. They came before the protests."
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
      "label": "The responses",
      "goal": "Build the paragraph about how the colonies answered.",
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
          "hint": "The boycott, and the tea protest",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the Tea Party was not",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "They refused to buy some British goods."
        },
        {
          "id": "r2p5",
          "text": "The Boston Tea Party happened before the French and Indian War."
        },
        {
          "id": "r2p1",
          "text": "Colonists answered the taxes with protests."
        },
        {
          "id": "r2p6",
          "text": "Colonists paid every tax gladly and never protested."
        },
        {
          "id": "r2p3",
          "text": "In 1773 they dumped tea into Boston Harbor."
        },
        {
          "id": "r2p4",
          "text": "The Tea Party was a response. It was not the first cause."
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
      "label": "What made it a war",
      "goal": "Build the paragraph that leads from protest to fighting.",
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
          "hint": "What Britain did next, and when the fighting started",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What did not start the taxes",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Britain closed Boston Harbor after the Tea Party."
        },
        {
          "id": "r3p5",
          "text": "The first shots were fired in 1763, before any tax."
        },
        {
          "id": "r3p1",
          "text": "The protest led to punishment, and then to fighting."
        },
        {
          "id": "r3p6",
          "text": "Dates do not matter if the slogan is loud enough."
        },
        {
          "id": "r3p3",
          "text": "Fighting began at Lexington and Concord in April 1775."
        },
        {
          "id": "r3p4",
          "text": "The war grew out of those steps. It did not cause the taxes."
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
    "prompt": "Three parts, one timeline. What order should a reader hear them in?",
    "hint": "A reader needs the taxes, then the protests, before the fighting makes sense.",
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
      "prompt": "One sentence says colonists dumped tea into Boston Harbor in 1773. Tap it.",
      "hint": "Look in the part about the responses."
    },
    "quickCheck": {
      "prompt": "Which order matches the notes?",
      "choices": [
        {
          "id": "a",
          "text": "Taxes after the war, then protests, then fighting in 1775"
        },
        {
          "id": "b",
          "text": "The Declaration caused the Stamp Act"
        },
        {
          "id": "c",
          "text": "The Tea Party happened before the French and Indian War"
        },
        {
          "id": "d",
          "text": "The first shots came in 1763, before the taxes"
        }
      ]
    }
  },
  "explain": {
    "prompt": "What was one cause of the Revolution, what was one colonial response, and what came after that response?",
    "starters": [
      "After the French and Indian War",
      "The Stamp Act",
      "In 1773",
      "Fighting began"
    ],
    "checks": [
      "I named a tax or the debt after the French and Indian War.",
      "I named a response, such as the boycott or the Boston Tea Party.",
      "I said fighting began in 1775, or that Britain closed the harbor.",
      "I kept causes before effects.",
      "I did not say the Declaration caused the taxes."
    ],
    "criteria": [
      "Name the debt or a tax after the French and Indian War, such as the Stamp Act.",
      "Name a colonial response, such as refusing to buy British goods or the Boston Tea Party.",
      "Say Britain closed Boston Harbor or that fighting began at Lexington and Concord in 1775."
    ]
  },
  "chain": {
    "title": "Cause line",
    "sourceId": "tax",
    "cutId": "tax",
    "cutDark": [
      "tea",
      "shots"
    ],
    "stayOn": [],
    "cutting": "Taking the taxes out of the timeline…",
    "cutDone": "No tax. The Tea Party and the first shots go dark.",
    "liveLine": "The line is live. Mark what fails if the taxes never happen.",
    "fillLine": "The cause line fills in as each part locks.",
    "links": [
      {
        "id": "tax",
        "label": "The taxes",
        "mark": "📜",
        "on": "r1"
      },
      {
        "id": "tea",
        "label": "The protest",
        "mark": "🫖",
        "on": "r2"
      },
      {
        "id": "shots",
        "label": "The fighting",
        "mark": "⚔️",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Take the taxes away. What fails?",
    "hint": "Mark what goes dark. Then remove the taxes.",
    "switch": "Remove the taxes",
    "choices": [
      {
        "id": "a",
        "text": "The Tea Party and the first shots",
        "marks": [
          "tea",
          "shots"
        ]
      },
      {
        "id": "b",
        "text": "Nothing. A slogan can replace the taxes.",
        "nobody": true
      },
      {
        "id": "c",
        "text": "Only the Declaration, which caused the tax",
        "marks": [
          "tax"
        ]
      },
      {
        "id": "d",
        "text": "The protest gets earlier than the war debt",
        "marks": [
          "tea"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the cause line. Which sentence matches the picture?",
    "image": "/student/tax_line.jpg",
    "choices": [
      {
        "id": "order",
        "text": "A sealed paper, tea crates going into a harbor, then two groups facing each other."
      },
      {
        "id": "back",
        "text": "The fight comes first, and the tea crates are still on the dock."
      },
      {
        "id": "none",
        "text": "There is no paper, no harbor, and no road."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the cause line. Which sentence matches the picture?"
  },
  "board": null
};
