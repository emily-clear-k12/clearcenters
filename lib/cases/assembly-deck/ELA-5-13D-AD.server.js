// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.5.13D-AD",
  "title": "Four Sources, One Question",
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
        "r1p5": "The notes include a 2019 website that was written before this storm. Nothing in the notes says the internet is always current.",
        "r1p6": "The notes list four sources for this question. A question about one day needs evidence from that day or a report of it."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This states the question.",
        "r1p2": "This says the source must match the storm.",
        "r1p3": "This says what kind of evidence counts.",
        "r1p4": "This rules out a different year, so it goes last."
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
        "r2p5": "Nothing in the notes makes that text the best evidence. It has no date and no place, while the log names the day, the time, and what the water covered.",
        "r2p6": "That is a personal judgment. The notes do not require a scientist, and the log is strong because it is firsthand, dated, and specific."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "opinion"
      },
      "misplacementNotes": {
        "r2p1": "This names the strongest source.",
        "r2p2": "This gives the date and time.",
        "r2p3": "This gives what the photo shows.",
        "r2p4": "This says why those details matter, so it goes last."
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
        "r3p5": "Sounding sure is a matter of tone, not evidence. The site was written in 2019, before this storm.",
        "r3p6": "The notes show the log is dated and specific, while the text is not. The log is the record that can answer."
      },
      "decoyReason": {
        "r3p5": "opinion",
        "r3p6": "contradicts"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says why the website fails.",
        "r3p3": "This says why the text fails.",
        "r3p4": "This puts the news story in its place, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece states the question, then the photo log. The sources that cannot decide it come last.",
  "decoyProtest": {
    "r1p5": "The internet updates my feelings.",
    "r1p6": "I was there in spirit.",
    "r2p5": "Insane is specific if you felt it.",
    "r2p6": "Only scientists may hold cameras.",
    "r3p5": "Sure voice, sure facts.",
    "r3p6": "Primary means any primary. Even a text with no date!"
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Judgment accepted. You used the dated photo log, and you did not let the 2019 site or the vague text decide the question.",
      "good": "Judgment accepted. The strongest source is mostly clear. Read the leftovers so a sure tone does not outrank a date.",
      "rough": "I have the piece. Come read it with me. Part of this checks the date, and part of it trusts the wrong source."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The undated text is more reliable than the news story, because a primary source always wins.",
    "why": "Primary does not automatically win. The text has no date and no place. The news story is dated and quotes the principal."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence gives the date and time of the photo log.",
    "pinpointMiss": "That sentence may belong. It does not say the log was made on May 4 at 3:10 p.m.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The log is firsthand, dated to the storm, and specific about the water.",
      "b": "The 2019 site was written before this storm and has no author.",
      "c": "The text names no day and no place.",
      "d": "Being online does not make a source current or credible."
    }
  },
  "mustInclude": [
    "Names the principal's May 4 photo log as the best source.",
    "Gives a reason tied to the date, the photo, or it being firsthand.",
    "Says the 2019 website or the undated text cannot decide the question."
  ],
  "modelAnswer": "The principal's photo log is the best source, because it is a firsthand record made on May 4 at 3:10 p.m. The photos show water covering the blacktop and the bottom of the slide. The 2019 website was written before the storm, and the undated text never says where or when.",
  "aiContext": "Grade 5 ELAR, TEKS 5.13D credibility of primary and secondary sources. Question: Did the May 4 storm flood the school playground? Strongest: principal photo log, May 4, 3:10 p.m., water on the blacktop and the bottom of the slide. Useful support: May 5 Channel 8 story quoting the principal about standing water. Weak primary: undated text that only says today was insane. Not usable: 2019 website, no author, claims playgrounds flood all the time, written before this storm. Primary does not automatically beat a dated secondary source. Do not accept the internet is current, no source needed, the text is best proof, a principal must be a scientist, or the 2019 site wins by sounding sure. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "log",
      "answer"
    ],
    "walkLine": "The photo log is the record the answer depends on.",
    "why": {
      "a": "Yes. Without the log, you do not have a sure answer about May 4.",
      "b": "The question is still there. It comes before the log.",
      "c": "The 2019 site was written before the storm. It cannot replace the log.",
      "d": "The undated text does not become better just because the log is gone."
    }
  },
  "look": {
    "key": "camera",
    "hint": "Follow the arrows. A camera showing a flooded playground, then a newspaper, then an old dusty laptop.",
    "why": "Yes. The camera is the clear record. The laptop looks old."
  },
  "repair": {
    "pieceId": "r3p5",
    "model": "The notes never say the 2019 site is the best source.",
    "why": "Yes. It was written before the storm. Sounding sure does not fix the date."
  }
};
