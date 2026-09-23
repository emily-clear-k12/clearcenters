// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "MA.5.9C-AD",
  "title": "The Science Fair Scores",
  "rounds": {
    "r1": {
      "key": {
        "situation": [
          "r1p1"
        ],
        "numbers": [
          "r1p2",
          "r1p3"
        ],
        "question": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "Booth 2 scored 96 and booth 12 scored 78. A higher booth number did not raise the score.",
        "r1p6": "96 - 78 compares two scores. The question compares how many projects are in two groups."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This sets the situation.",
        "r1p2": "This is the 90s count.",
        "r1p3": "This is the 70s count.",
        "r1p4": "This is the question, so it goes last."
      }
    },
    "r2": {
      "key": {
        "equation": [
          "r2p1",
          "r2p2"
        ],
        "letter": [
          "r2p3"
        ],
        "diagram": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "9 and 7 are stems, the tens digits. They are not the number of projects.",
        "r2p6": "96 - 78 is a difference in points, not a difference in how many projects."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This is the equation.",
        "r2p2": "This agrees with the stem-and-leaf plot.",
        "r2p3": "This says what n means.",
        "r2p4": "This matches the bars, so it goes last."
      }
    },
    "r3": {
      "key": {
        "step1": [
          "r3p1"
        ],
        "step2": [
          "r3p2"
        ],
        "answer": [
          "r3p3"
        ],
        "check": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "4 is the 90s count. The question asks how many more, so you still subtract the 70s.",
        "r3p6": "18 is 96 - 78. That is points, and it is not the question."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This is the larger group.",
        "r3p2": "This is the smaller group.",
        "r3p3": "This is the labeled answer.",
        "r3p4": "This tests the difference, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the comparison, then the equation. The 3 more projects come last.",
  "decoyProtest": {
    "r1p5": "Booth 12 is a bigger number. Bigger should win.",
    "r1p6": "Points are what a score is.",
    "r2p5": "Stems are the big digits.",
    "r2p6": "96 and 78 are on the page.",
    "r3p5": "4 is the tall bar. Tall is the answer.",
    "r3p6": "18 is a difference, and the question says more."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Reading accepted. 4 projects in the 90s, 1 in the 70s, and 3 more in the 90s.",
      "good": "Reading accepted. The graphs are mostly right. Read the leftovers so a point difference does not replace a count.",
      "rough": "I have the work. Come read it with me. Part of this compares groups, and part of it compares the wrong numbers."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "96 - 78 = 18, so 18 more projects scored in the 90s.",
    "why": "96 and 78 are scores, not counts. The 90s have 4 projects and the 70s have 1, so 4 - 1 = 3 more projects."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p3"
    ],
    "pinpointWhy": "Right. That sentence says 3 more projects scored in the 90s.",
    "pinpointMiss": "That sentence may belong. It does not say 3 more projects scored in the 90s.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. 4 - 1 = 3 more projects.",
      "b": "4 is the 90s count, not the comparison.",
      "c": "9 - 7 subtracts the stems, not the number of projects.",
      "d": "18 points is 96 - 78. The question asks for projects."
    }
  },
  "mustInclude": [
    "Reads 4 projects in the 90s and 1 in the 70s.",
    "Subtracts to get 3 more projects.",
    "Does not answer with 9 - 7, 96 - 78, or a claim that booth number causes the score."
  ],
  "modelAnswer": "The 90s have 4 projects and the 70s have 1. So 4 - 1 = 3 more projects scored in the 90s. Check: 1 + 3 = 4. The stem for 9 has those same four leaves.",
  "aiContext": "Grade 5 Math, TEKS 5.9C two displays of the same data. Scores 78, 84, 84, 91, 91, 91, 96. Bar groups: 70s = 1, 80s = 2, 90s = 4. Stem-and-leaf: 7 | 8 ; 8 | 4 4 ; 9 | 1 1 1 6. Question: how many more projects scored in the 90s than the 70s? Answer: 4 - 1 = 3 projects. Check: 1 + 3 = 4. Booth 2 scored 96 and booth 12 scored 78, so a higher booth number did not cause a higher score. Do not accept 9 - 7, 96 - 78 = 18 points, 4 as the final comparison, or the booth claim. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "counts",
      "diff"
    ],
    "walkLine": "The comparison is a difference of counts.",
    "why": {
      "a": "Yes. Without the counts, 3 more projects does not follow.",
      "b": "The graphs are still there.",
      "c": "96 - 78 answers a points question, not this one.",
      "d": "Skipping the counts does not make 4 the comparison. 4 is one of the counts."
    }
  },
  "look": {
    "key": "bars",
    "hint": "Read the three bars: 1, then 2, then 4.",
    "why": "Yes. 70s, 80s, and 90s."
  },
  "repair": {
    "pieceId": "r1p5",
    "model": "The notes never say a higher booth number raises the score.",
    "why": "Yes. Booth 12 scored 78, and booth 2 scored 96."
  }
};
