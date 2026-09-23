// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.4.12D-AD",
  "title": "The Letter to the Museum",
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
        "r1p5": "Send everything is not a specific request, and the notes never ask for the whole museum.",
        "r1p6": "The notes say the class may visit and still needs answers. They do not say the trip already happened."
      },
      "decoyReason": {
        "r1p5": "unsupported",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This tells what the letter is doing.",
        "r1p2": "This says who is writing.",
        "r1p3": "This says why the answers matter.",
        "r1p4": "This says what the reader must know, so it goes last."
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
        "r2p5": "The notes list three questions, not a request for every room.",
        "r2p6": "The letter exists because the class does have questions."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the fossil-hall question.",
        "r2p3": "This covers days and cost.",
        "r2p4": "This says why specific questions matter, so it goes last."
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
        "r3p5": "The notes ask the museum to reply to the teacher. Guessing is the opposite.",
        "r3p6": "A favorite color does not help the class plan a fossil visit."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This says who should receive the answer.",
        "r3p3": "This says how the class will use it.",
        "r3p4": "This says when the letter is ready, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The letter says who is writing, then asks the questions. How to reply comes last.",
  "decoyProtest": {
    "r1p5": "Everything is specific if you want it badly.",
    "r1p6": "Last year, this year, time is a circle.",
    "r2p5": "Every room includes the hall. Probably.",
    "r2p6": "Questions are optional in a request.",
    "r3p5": "Guessing is a research method.",
    "r3p6": "Color is a fossil fact."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Letter accepted. The museum could answer you. The questions are specific, and the reply has an address.",
      "good": "Letter accepted. The ask is mostly clear. Read the leftovers so a vague line does not sneak in.",
      "rough": "I have the letter. Come read it with me. Part of this asks for facts, and part of it asks for everything."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "Just tell us everything, and we will figure out the questions later.",
    "why": "That is not a request the museum can answer. The notes already have three specific questions."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence asks about the fossil hall.",
    "pinpointMiss": "That sentence may belong in the letter. It does not ask about the fossil hall.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The reader knows who is asking and which facts are needed.",
      "b": "Send everything is too vague to answer.",
      "c": "A request has to invite a reply.",
      "d": "A favorite color does not help plan the visit."
    }
  },
  "mustInclude": [
    "Says a class studying fossils is writing.",
    "Asks a specific question, such as the fossil hall, the days, or the cost.",
    "Says the museum should reply to the teacher."
  ],
  "modelAnswer": "We are a fourth-grade class studying fossils. Does the museum have a fossil hall? Which days can a school group visit, and what does it cost? Please reply to our teacher, Ms. Alvarez.",
  "aiContext": "Grade 4 ELAR, TEKS 4.12D correspondence that requests information. Audience: the museum. Writer: a 4th-grade class studying fossils. Needed facts: fossil hall, days for school groups, cost. Reply to Ms. Alvarez. Do not accept send everything, no questions, do not reply, favorite color, or a claim that the trip already happened. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "letter",
      "museum"
    ],
    "walkLine": "The questions are what the museum needs before it can answer.",
    "why": {
      "a": "Yes. A letter with no questions gives the museum nothing to answer.",
      "b": "The fossils are still the reason for writing. They come first.",
      "c": "Send everything is not a question the museum can finish.",
      "d": "A favorite color is not the answer this class needs."
    }
  },
  "look": {
    "key": "ask",
    "hint": "Follow the arrows. Students at a fossil case, a blank envelope, then the museum.",
    "why": "Yes. The fossils lead to a letter for the museum."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say to ask about every room.",
    "why": "Yes. The class needs three facts, not everything."
  }
};
