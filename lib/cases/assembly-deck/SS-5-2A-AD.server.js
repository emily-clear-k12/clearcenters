// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.5.2A-AD",
  "title": "Before the Shooting",
  "rounds": {
    "r1": {
      "key": {
        "topic": [
          "r1p1"
        ],
        "details": [
          "r1p2",
          "r1p3"
        ],
        "conclusion": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "The Declaration came in 1776. The Stamp Act was in 1765. An effect cannot cause an earlier tax.",
        "r1p6": "A feeling is not the timeline. The notes start with the debt and the tax."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This gives the reason for the tax.",
        "r1p3": "This names the tax and the missing vote.",
        "r1p4": "This puts the tax before the protest, so it goes last."
      }
    },
    "r2": {
      "key": {
        "topic": [
          "r2p1"
        ],
        "details": [
          "r2p2",
          "r2p3"
        ],
        "conclusion": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "The war ended in 1763. The Tea Party was in 1773. The protest came after.",
        "r2p6": "The notes say colonists refused to buy goods and dumped the tea. They did not gladly pay."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the boycott.",
        "r2p3": "This is the Tea Party.",
        "r2p4": "This says the protest was a response, so it goes last."
      }
    },
    "r3": {
      "key": {
        "topic": [
          "r3p1"
        ],
        "details": [
          "r3p2",
          "r3p3"
        ],
        "conclusion": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "The notes put the first shots in April 1775, after the taxes and the Tea Party.",
        "r3p6": "A slogan is not a substitute for the order of events."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is Britain's answer to the Tea Party.",
        "r3p3": "This is when the fighting started.",
        "r3p4": "This keeps the war from being treated as the cause, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the taxes, then the protests. The fighting comes last.",
  "decoyProtest": {
    "r1p5": "Later documents cause earlier taxes if you want them to.",
    "r1p6": "Feelings outrank dates.",
    "r2p5": "I flipped 1773 and 1763.",
    "r2p6": "Glad taxpayers make a calmer story.",
    "r3p5": "1763 was already on the page. I reused it.",
    "r3p6": "A loud slogan is a primary source."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Timeline accepted. You kept the debt and the taxes before the Tea Party, and the fighting after both.",
      "good": "Timeline accepted. The order is mostly right. Read the leftovers so an effect does not sneak in as a cause.",
      "rough": "I have the piece. Come read it with me. Part of this follows the years, and part of it runs them backward."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The fighting caused the taxes, and the Tea Party came before the debt.",
    "why": "The notes run the other way. Debt and taxes came first. The Tea Party was a response. The fighting came after."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence puts the Tea Party in 1773.",
    "pinpointMiss": "That sentence may belong. It does not say colonists dumped tea in 1773.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Taxes, then protests, then fighting in 1775.",
      "b": "The Declaration came after the Stamp Act. It did not cause it.",
      "c": "The Tea Party was in 1773, after the French and Indian War.",
      "d": "The first shots were in 1775, not in 1763."
    }
  },
  "mustInclude": [
    "Names the debt or a tax after the French and Indian War.",
    "Names a colonial response, such as the boycott or the Boston Tea Party.",
    "Says fighting began in 1775, or that Britain closed Boston Harbor after the protest."
  ],
  "modelAnswer": "After the French and Indian War, Britain taxed the colonies to help pay its debt. Colonists protested, and in 1773 they dumped tea into Boston Harbor. Britain closed the harbor, and fighting began at Lexington and Concord in 1775.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.2A. French and Indian War ended 1763, Britain in debt, taxed the colonies, colonies had no vote in Parliament. Stamp Act 1765 taxed printed paper. Colonists boycotted. Boston Tea Party 1773, tea dumped in the harbor. Britain closed Boston Harbor. Fighting at Lexington and Concord April 1775. Declaration of Independence 1776, after fighting started. Do not accept the Declaration causing the Stamp Act, the Tea Party before the war, glad payment, shots in 1763, or a slogan replacing the timeline. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "tax",
      "tea",
      "shots"
    ],
    "walkLine": "The taxes are the cause. The protest and the fighting come after them.",
    "why": {
      "a": "Yes. Without the taxes, the Tea Party and the first shots lose their cause.",
      "b": "A slogan does not replace the tax. The notes start with the debt.",
      "c": "The Declaration did not cause the tax. It came later.",
      "d": "Removing the taxes does not move the protest earlier than the debt."
    }
  },
  "look": {
    "key": "order",
    "hint": "Follow the arrows. A sealed paper, tea crates falling into a harbor, then two groups on a road.",
    "why": "Yes. The tax, the protest, then the confrontation."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say the Tea Party came before the French and Indian War.",
    "why": "Yes. The war ended in 1763. The Tea Party was in 1773."
  }
};
