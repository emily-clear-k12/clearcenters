// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "SS.5.15B-AD",
  "title": "The Bill That Didn't Pass",
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
        "r1p5": "The notes say Congress writes and passes bills. The Court has a different job: striking down laws that conflict with the Constitution.",
        "r1p6": "The notes say Congress writes the laws. The bill tried to give the president that power, and the veto stopped it."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This introduces the branches and their jobs, so it opens the paragraph.",
        "r1p2": "This is what Congress did, so it is a detail.",
        "r1p3": "This is what the president did, so it is a detail.",
        "r1p4": "This names the court's power, so it goes last."
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
        "r2p5": "The notes never mention an election or campaigning. The bill stopped because the override votes were not there.",
        "r2p6": "The notes say the veto is one of the checks. Using it is the system working, not the Constitution failing."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells where the bill stopped, so it opens the paragraph.",
        "r2p2": "This states the override rule, so it is a detail.",
        "r2p3": "This explains why the override failed, so it is a detail.",
        "r2p4": "This explains what the stop does not mean, so it goes last."
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
        "r3p5": "This is a judgment, not evidence. A failed bill can be a check doing its job.",
        "r3p6": "The notes say a check is a power one branch has to limit another branch. An election is something different: it is how people choose leaders."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This states the reason for checks, so it opens the paragraph.",
        "r3p2": "This names two of the jobs, so it is a detail.",
        "r3p3": "This names the court's check, so it is a detail.",
        "r3p4": "This explains what the example proves, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names each branch's job first, then shows where the bill stopped. The reason for the design comes last because it explains everything before it.",
  "decoyProtest": {
    "r1p5": "The Court has a big building, so I figured it writes bills too.",
    "r1p6": "One person writing every law sounded so fast and efficient!",
    "r2p5": "I blame every lost vote on an election. It's easier than reading the notes.",
    "r2p6": "A veto felt like the whole government collapsing, so I said so.",
    "r3p5": "I saw one failed bill and decided everything was broken.",
    "r3p6": "Voting and vetoing both start with v, so I thought they were the same."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Explanation accepted. You kept each branch's job straight, and you treated the veto as a working check.",
      "good": "Explanation accepted. The stop is mostly clear. Read the leftovers so a broken-government line does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is a check, and part of it gives one branch every job."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "The president, Congress, and the Supreme Court are all supposed to do exactly the same job.",
    "why": "The notes give each branch a different job. Congress writes laws, the president may veto them, and a court may strike a law down."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says an override needs a two-thirds vote in both the House and the Senate.",
    "pinpointMiss": "That sentence may belong in the piece, but it does not say what vote an override needs.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The veto stopped it, and Congress did not have the two-thirds vote to override.",
      "b": "Congress wrote the bill. The Court has a different job.",
      "c": "The notes never mention an election, so that reason has no support.",
      "d": "A veto is one of the checks, so using it is not the Constitution failing."
    }
  },
  "mustInclude": [
    "Says Congress passed the bill and the president vetoed it.",
    "Says an override needs a two-thirds vote, or that a court can strike down a law that breaks the Constitution.",
    "Says checks keep one branch from doing every job, and does not call the failed bill a broken government."
  ],
  "modelAnswer": "Congress passed a bill, and the president vetoed it. Congress could not get a two-thirds vote in both the House and the Senate, so the bill stopped. That is not a broken government, because the veto is a check. Checks and balances keep any one branch from doing every job or gaining too much power.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.15B. Congress is the legislative branch and writes and passes bills; the president leads the executive branch; the courts are the judicial branch. This bill is an example, not a real law: Congress passes a bill letting the president write any law with no vote. The president vetoes it, refusing to sign it and sending it back. An override needs two-thirds of both the House and the Senate, and this Congress does not have the votes, so the bill stops. The Supreme Court can strike down a law that conflicts with the Constitution. A check is a power one branch has to limit another; the veto is one. Checks exist so no branch does every job or gains too much power. A stopped bill is not a broken government. Do not accept the Court writing the bill, the president writing every law, an election-year cause, a veto meaning the Constitution failed, or checks being the same as an election. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "veto",
      "stop"
    ],
    "walkLine": "The veto is the check that stopped this bill.",
    "why": {
      "a": "Yes. Without the veto, this bill's stop disappears.",
      "b": "Congress is still there. It passed the bill before the veto.",
      "c": "The Court did not write the bill. Congress did.",
      "d": "The notes do not use an election. The stop depends on the veto."
    }
  },
  "look": {
    "key": "back",
    "hint": "Follow the arrows. A capitol, a paper pushed back across a desk, then the paper stopped at a closed door.",
    "why": "Yes. Congress, the veto, then the stop."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes say Congress wrote and passed this bill, not the Supreme Court.",
    "why": "Yes. Congress wrote it, and the Court has a different job."
  }
};
