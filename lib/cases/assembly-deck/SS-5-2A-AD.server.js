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
        "r1p5": "The notes put the Stamp Act in 1765 and the Declaration in 1776. A law cannot punish something that had not happened yet.",
        "r1p6": "This is a feeling, not a fact from the timeline. The notes explain the taxes with the war debt, not with anyone's feelings."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This explains why Britain needed money, so it is a detail.",
        "r1p3": "This names the tax and the missing vote, so it is a detail.",
        "r1p4": "This places the taxes at the start of the chain of causes, so it goes last."
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
        "r2p5": "The notes say the war ended in 1763 and the Tea Party happened in 1773, ten years later.",
        "r2p6": "The notes say colonists boycotted British goods and dumped British tea. They did not pay without complaint."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This describes the boycott, so it is a detail.",
        "r2p3": "This describes the Tea Party, so it is a detail.",
        "r2p4": "This labels the Tea Party as an effect, so it goes last."
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
        "r3p5": "The notes put the first shots at Lexington and Concord in April 1775, long after the taxes began.",
        "r3p6": "This is a judgment, not evidence. A slogan cannot change the order in which events happened."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This is how Britain punished Boston after the Tea Party, so it is a detail.",
        "r3p3": "This tells when and where the fighting started, so it is a detail.",
        "r3p4": "This keeps the war from being treated as a cause of the taxes, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece explains the taxes first, then the protests they caused. The fighting comes last because it grew out of both.",
  "decoyProtest": {
    "r1p5": "I figured a document from 1776 could reach back and cause a law from 1765. Time travel, basically.",
    "r1p6": "I love freedom so much that I skipped every date on the timeline!",
    "r2p5": "I flipped 1773 and 1763. They look almost the same, don't they?",
    "r2p6": "I imagined cheerful taxpayers because they make a calmer story.",
    "r3p5": "1763 was already on the page, so I reused it for the first shots.",
    "r3p6": "I shouted my slogan so loudly that I couldn't hear the dates."
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
    "text": "The fighting at Lexington caused the new taxes, and the Tea Party happened before Britain's war debt.",
    "why": "The notes run in the opposite direction. The debt and the taxes came first, the Tea Party was a response, and the fighting came after both."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p3"
    ],
    "pinpointWhy": "Right. That sentence places the Boston Tea Party in December 1773.",
    "pinpointMiss": "That sentence may belong in the piece, but it does not tell when colonists dumped the tea.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The taxes came first, the protests answered them, and the fighting began in 1775.",
      "b": "The Declaration came in 1776, after the Stamp Act, so it could not have caused it.",
      "c": "The Tea Party was in 1773, ten years after the French and Indian War ended.",
      "d": "The first shots came in 1775, not in 1763."
    }
  },
  "mustInclude": [
    "Names the debt or a tax after the French and Indian War.",
    "Names a colonial response, such as the boycott or the Boston Tea Party.",
    "Says fighting began in 1775, or that Britain closed Boston Harbor after the protest."
  ],
  "modelAnswer": "After the French and Indian War, Britain taxed the colonies to help pay its large debt, even though the colonists had no vote in Parliament. Colonists responded with protests, and in December 1773 they dumped British tea into Boston Harbor. Britain punished Boston by closing its harbor, and fighting began at Lexington and Concord in April 1775.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.2A. French and Indian War ended 1763; Britain won but was left with a large debt and taxed the colonies, which had no representatives and no vote in Parliament. Stamp Act 1765 taxed printed paper such as newspapers and legal documents. Colonists boycotted British goods. Boston Tea Party December 1773, British tea dumped in the harbor. In 1774 Britain closed Boston Harbor to trade as punishment. Fighting between colonists and British soldiers at Lexington and Concord April 1775. Declaration of Independence 1776, after fighting started. Do not accept the Declaration causing the Stamp Act, the Tea Party before the war, payment without complaint, shots in 1763, or a slogan replacing the timeline. Do not penalize spelling.",
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
    "model": "The notes put the Tea Party in 1773, ten years after the French and Indian War ended, not before it.",
    "why": "Yes. The war ended in 1763, and the Tea Party came in 1773."
  }
};
