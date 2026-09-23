// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.4.12C-AD",
  "title": "Later Recess",
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
        "r1p5": "The notes ask for 20 minutes, not the whole day.",
        "r1p6": "Canceling math is a different argument, and the notes protect math time."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This states the claim.",
        "r1p2": "This describes recess now.",
        "r1p3": "This limits the ask.",
        "r1p4": "This says what the claim is not, so it goes last."
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
        "r2p5": "The notes count one class, not every student on Earth.",
        "r2p6": "Twenty-two wanted more time. Only two did not. That sentence flips the count."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This gives the count.",
        "r2p3": "This gives what they said.",
        "r2p4": "This says why the count matters, so it goes last."
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
        "r3p5": "Shouting is not an answer. The notes answer the worry with a different block of time.",
        "r3p6": "The notes say the minutes do not come from math."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This names the worry.",
        "r3p3": "This gives the plan.",
        "r3p4": "This says why the answer matters, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The argument states the claim, then the survey. The answer to the math worry comes last.",
  "decoyProtest": {
    "r1p5": "All day is just a bigger twenty.",
    "r1p6": "Boring is a standard.",
    "r2p5": "Earth replied in the group chat.",
    "r2p6": "I swapped the twenty-two and the two.",
    "r3p5": "Volume is evidence.",
    "r3p6": "Math can spare it. I decided."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Argument accepted. The claim, the 22 of 24, and the morning-meeting plan are all doing their jobs.",
      "good": "Argument accepted. The claim is mostly supported. Read the leftovers so a shout does not sneak in.",
      "rough": "I have the piece. Come read it with me. Part of this is evidence, and part of it is volume."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "We do not need a plan, because wanting it is the same as proving it.",
    "why": "Wanting it is not the survey. The notes answer the math worry with morning meeting."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says the minutes come from morning meeting.",
    "pinpointMiss": "That sentence may belong. It does not say the minutes come from morning meeting instead of math.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. That count is the evidence in the notes.",
      "b": "The survey was one class, not the whole Earth.",
      "c": "A shout does not answer the worry.",
      "d": "The plan protects math. It does not cancel it."
    }
  },
  "mustInclude": [
    "Says recess should be 20 minutes instead of 10.",
    "Uses the survey, 22 of 24, or students returning ready to work.",
    "Says the extra time comes from morning meeting, not from math."
  ],
  "modelAnswer": "Recess should be 20 minutes instead of 10. Twenty-two of twenty-four students said a longer recess helps them return ready to work. The extra minutes would come from morning meeting, not from math.",
  "aiContext": "Grade 4 ELAR, TEKS 4.12C argument. Claim: 20-minute recess instead of 10. Evidence: 22 of 24 students say they return ready to work. Counterargument: people fear lost math time. Answer: take 10 minutes from morning meeting, not math. Do not accept all-day recess, cancel math, the whole Earth, or shouting. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "survey",
      "plan",
      "play"
    ],
    "walkLine": "The survey is the evidence. The plan and the longer recess depend on it.",
    "why": {
      "a": "Yes. Without the survey, the plan and the longer recess have no evidence.",
      "b": "The short recess is still the problem. It comes before the survey.",
      "c": "A shout is not evidence.",
      "d": "The plan does not cancel math. That is the worry the notes answer."
    }
  },
  "look": {
    "key": "chart",
    "hint": "Follow the arrows. A small recess, a chart with one tall bar and one short bar, then a bigger recess.",
    "why": "Yes. The chart is the evidence between the short recess and the longer one."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say only two students wanted more recess.",
    "why": "Yes. Twenty-two wanted more time. Two did not."
  }
};
