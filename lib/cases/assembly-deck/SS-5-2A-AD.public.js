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
    "The fighting did not come first. The taxes did, years before anyone fired a shot.",
    "Trace the chain of causes from Britain's war debt, to the colonists' protests, to the first battle.",
    "Watch for two tricks: a slogan is not a timeline, and an effect cannot cause something that came earlier."
  ],
  "source": {
    "title": "TIMELINE",
    "lines": [
      "The French and Indian War ended in 1763. Britain won, but the war left it with a large debt.",
      "To help pay that debt, Parliament taxed the colonies. The colonists had no representatives in Parliament, so they had no vote on these taxes.",
      "The Stamp Act of 1765 taxed printed paper, such as newspapers and legal documents. Many colonists responded with a boycott: they refused to buy British goods.",
      "In December 1773, colonists dumped British tea into Boston Harbor. That protest is called the Boston Tea Party.",
      "In 1774, Britain punished Boston by closing its harbor to trade. Fighting between colonists and British soldiers began at Lexington and Concord in April 1775.",
      "The Declaration of Independence came in 1776, after the fighting had started."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "The taxes",
      "goal": "Build the paragraph that explains how Britain's war debt led to new taxes.",
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
          "text": "Although Britain won the war, the fighting left its government with a large debt."
        },
        {
          "id": "r1p5",
          "text": "Parliament passed the Stamp Act to punish the colonies for the Declaration of Independence."
        },
        {
          "id": "r1p1",
          "text": "After the French and Indian War ended in 1763, Britain began taxing its American colonies."
        },
        {
          "id": "r1p6",
          "text": "Honestly, the colonists' love of freedom is the only part that matters."
        },
        {
          "id": "r1p3",
          "text": "The Stamp Act of 1765 taxed printed paper, such as newspapers. The colonists had no vote on it because they had no representatives in Parliament."
        },
        {
          "id": "r1p4",
          "text": "Because these taxes came before any protest, they belong at the start of the chain of causes."
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
      "goal": "Build the paragraph about how the colonists answered those taxes.",
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
          "text": "After the Stamp Act passed, many colonists refused to buy British goods, a protest called a boycott."
        },
        {
          "id": "r2p5",
          "text": "The Boston Tea Party took place before the French and Indian War had even ended."
        },
        {
          "id": "r2p1",
          "text": "Colonists did not quietly accept the new taxes. Instead, they pushed back with protests."
        },
        {
          "id": "r2p6",
          "text": "Most colonists paid every new tax without complaint because they trusted Parliament to treat them fairly."
        },
        {
          "id": "r2p3",
          "text": "In December 1773, colonists dumped British tea into Boston Harbor. This protest became known as the Boston Tea Party."
        },
        {
          "id": "r2p4",
          "text": "The Tea Party answered the taxes, so it was an effect, not the first cause."
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
      "goal": "Build the paragraph that leads from protest, to punishment, to fighting.",
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
          "text": "In 1774, Britain closed Boston Harbor to trade as punishment for the Tea Party."
        },
        {
          "id": "r3p5",
          "text": "The first shots of the war were fired in 1763, before any tax was passed."
        },
        {
          "id": "r3p1",
          "text": "The protest in Boston led to punishment, and the punishment pushed both sides toward war."
        },
        {
          "id": "r3p6",
          "text": "A slogan that is loud enough matters more than getting the dates right."
        },
        {
          "id": "r3p3",
          "text": "Fighting between colonists and British soldiers began at Lexington and Concord in April 1775."
        },
        {
          "id": "r3p4",
          "text": "The war grew out of these events. It could not have caused the taxes that came before it."
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
      "prompt": "One sentence tells when colonists dumped British tea into Boston Harbor. Tap it.",
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
          "text": "The Declaration of Independence caused the Stamp Act"
        },
        {
          "id": "c",
          "text": "The Tea Party happened before the French and Indian War ended"
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
