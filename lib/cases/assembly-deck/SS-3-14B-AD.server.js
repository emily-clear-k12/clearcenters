// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.3.14B-AD",
  "title": "Two Accounts of the Same Day",
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
        "r1p5": "The notes say Sam was at the garden and wrote that day.",
        "r1p6": "The gym roof is a different event. Neither account says that."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This names the kind of source.",
        "r1p2": "This says Sam was there.",
        "r1p3": "This says what Sam saw.",
        "r1p4": "This adds the limit, so it goes last."
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
        "r2p5": "The notes say the newspaper writer was not at the garden.",
        "r2p6": "Neither account says the gym roof leaked."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "offtopic"
      },
      "misplacementNotes": {
        "r2p1": "This names the kind of source.",
        "r2p2": "This says when it was written.",
        "r2p3": "This says the paper's claim.",
        "r2p4": "This says the writer was not there, so it goes last."
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
        "r3p5": "Newer is not the test. The paper was not there, and it changed the story.",
        "r3p6": "Older is not the test either. Being there is the test. The diary wins because Sam saw it."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "opinion"
      },
      "misplacementNotes": {
        "r3p1": "This says the accounts disagree.",
        "r3p2": "This is what the eyewitness saw.",
        "r3p3": "This blocks the newer-is-better idea.",
        "r3p4": "This says how to weigh them, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece tells what the diary says, then what the paper says. The weighing comes last.",
  "decoyProtest": {
    "r1p5": "If I was not there, nobody was.",
    "r1p6": "The gym is the garden if you squint.",
    "r2p5": "Printed means present.",
    "r2p6": "One leak is every leak.",
    "r3p5": "Newer ink is smarter ink.",
    "r3p6": "Old is a kind of proof."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Comparison accepted. You used Sam's eyewitness account, and you did not let the newer paper replace it.",
      "good": "Comparison accepted. The two accounts are mostly clear. Read the leftovers so newer does not sneak in as truer.",
      "rough": "I have the piece. Come read it with me. Part of this comes from someone who was there, and part of it does not."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "Use the newspaper. It is newer, so it must be right about the whole garden.",
    "why": "Newer is not the test. Sam was there and saw wet beans and dry tomatoes. The paper was not there."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p3"
    ],
    "pinpointWhy": "Right. That sentence says Sam saw water on the bean rows only.",
    "pinpointMiss": "That sentence may belong. It does not say the water was on the bean rows only.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Sam was there. That makes the diary the stronger account of this flood.",
      "b": "Newer does not mean truer. The paper changed the story.",
      "c": "Older is not the test. Being there is the test.",
      "d": "Neither account says the gym roof leaked."
    }
  },
  "mustInclude": [
    "Says Sam was at the garden, or that the diary is a primary source.",
    "Says the beans were wet, the tomatoes stayed dry, or the water was only on the bean rows.",
    "Says the paper claimed the whole garden was lost, and that the diary is stronger because Sam was there."
  ],
  "modelAnswer": "Sam's diary is a primary source because Sam was there. The bean rows were wet, and the tomato pots stayed dry. The newspaper said the whole garden was lost, but its writer was not there.",
  "aiContext": "Grade 3 Social Studies, TEKS 3.14B. Same event: the school garden flooded on Tuesday. Primary: Sam's diary, written that day by someone who was there. Sam saw water on the bean rows only. Tomato pots were moved and stayed dry. Secondary: the next day's newspaper. The writer was not there and says the whole garden was lost. Newer does not mean truer, and older does not always mean truer. The person who was there is the stronger source. The gym roof leak is a different event and is in neither account. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "diary",
      "answer"
    ],
    "walkLine": "The diary is the eyewitness record the careful answer comes from.",
    "why": {
      "a": "Yes. Without the diary, you lose the person who saw the beans and the tomatoes.",
      "b": "The flood still happened. The garden comes first.",
      "c": "The newer paper is not enough. It was not there, and it overstated the loss.",
      "d": "The gym roof is a different event. It does not become this flood."
    }
  },
  "look": {
    "key": "there",
    "hint": "Follow the arrows. Wet garden rows, a child writing in a notebook, then a newspaper.",
    "why": "Yes. The garden, the diary, then the later paper."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say either account mentions the gym roof.",
    "why": "Yes. That leak was a different day."
  }
};
