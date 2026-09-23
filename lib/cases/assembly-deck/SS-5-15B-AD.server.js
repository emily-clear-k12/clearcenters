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
        "r1p5": "Congress writes bills. The Court does not. The notes give the Court a different job.",
        "r1p6": "The bill tried to give the president that power, and the veto stopped it. It is not how the system works."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the paragraph is about.",
        "r1p2": "This is Congress's action.",
        "r1p3": "This is the president's action.",
        "r1p4": "This is the court's power, so it goes last."
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
        "r2p5": "The notes never mention an election. The bill stopped because the override votes were not there.",
        "r2p6": "A veto is one of the checks. Using it is not a failure of the Constitution."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the override rule.",
        "r2p3": "This is why the override failed.",
        "r2p4": "This says what the stop does not mean, so it goes last."
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
        "r3p5": "A failed bill can be the check doing its job. The notes do not call that broken.",
        "r3p6": "Elections choose people. Checks are the branches limiting each other. The notes are about the veto and the court."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This names two of the jobs.",
        "r3p3": "This names the court's check.",
        "r3p4": "This says what the example proves, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece names each branch's job, then where the bill stopped. The reason for the design comes last.",
  "decoyProtest": {
    "r1p5": "Courts are buildings. Buildings write things.",
    "r1p6": "The bill's idea sounded efficient.",
    "r2p5": "Elections explain every loss.",
    "r2p6": "A veto feels like a collapse.",
    "r3p5": "Failure is the only word I had.",
    "r3p6": "Voting and vetoing both start with v."
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
    "text": "The president, Congress, and the Court are supposed to do the same job.",
    "why": "The notes give them different jobs. Congress writes, the president may veto, and a court may strike a law down."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says an override needs two-thirds in both houses.",
    "pinpointMiss": "That sentence may belong. It does not say what vote an override needs.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The veto stopped it, and Congress did not have the votes to override.",
      "b": "Congress wrote the bill. The Court did not.",
      "c": "The notes never mention an election.",
      "d": "A veto is a check. It is not the Constitution failing."
    }
  },
  "mustInclude": [
    "Says Congress passed the bill and the president vetoed it.",
    "Says an override needs a two-thirds vote, or that a court can strike down a law that breaks the Constitution.",
    "Says checks keep one branch from doing every job, and does not call the failed bill a broken government."
  ],
  "modelAnswer": "Congress passed a bill, and the president vetoed it. Congress could not get a two-thirds vote in both houses, so the bill stopped. That is a check. It keeps one branch from doing every job.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.15B. This bill is an example, not a real law: Congress passes a bill letting the president write any law with no vote. The president vetoes it. An override needs two-thirds of both the House and the Senate, and this Congress does not have the votes, so the bill stops. The Supreme Court can strike down a law that conflicts with the Constitution. Checks exist so no branch does every job. A stopped bill is not a broken government. Do not accept the Court writing the bill, the president writing every law, an election-year cause, a veto meaning the Constitution failed, or checks being the same as an election. Do not penalize spelling.",
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
    "model": "The notes never say the Supreme Court wrote this bill.",
    "why": "Yes. Congress wrote it. The Court has a different job."
  }
};
