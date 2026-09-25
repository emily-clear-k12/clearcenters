// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "ELA.5.12D-AD",
  "title": "The Request to the City Engineer",
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
        "r1p5": "That is a demand and a judgment, not a question. The notes say the class needs facts before it suggests a change.",
        "r1p6": "A story about a soccer game does not belong in a request to the city engineer."
      },
      "decoyReason": {
        "r1p5": "opinion",
        "r1p6": "offtopic"
      },
      "misplacementNotes": {
        "r1p1": "This says who is writing and why.",
        "r1p2": "This names the place and the problem.",
        "r1p3": "This says what the class still needs.",
        "r1p4": "This draws the line between a question and an order, so it goes last."
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
        "r2p5": "The notes list three questions about one corner. They never ask about every street in the city.",
        "r2p6": "The notes list three questions. The letter exists because the class does have questions."
      },
      "decoyReason": {
        "r2p5": "unsupported",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells what the paragraph is about.",
        "r2p2": "This is the drain question.",
        "r2p3": "This covers the clearing and the plan.",
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
        "r3p5": "The notes ask for a reply to Ms. Alvarez. Deciding the city is wrong skips the facts the class needs.",
        "r3p6": "A map of the whole state does not answer the questions about one corner."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells what the paragraph is about.",
        "r3p2": "This names who should receive the answer.",
        "r3p3": "This says how the class will use it.",
        "r3p4": "This says when the letter is finished, so it goes last."
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
    "r1p5": "Disappointment is a question.",
    "r1p6": "Soccer fields get rained on too. Totally relevant.",
    "r2p5": "Every street includes this corner.",
    "r2p6": "Looking is a kind of question.",
    "r3p5": "I saved the engineer some work.",
    "r3p6": "A big map shows the small corner. Zoom in."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "📝",
    "replies": {
      "great": "Letter accepted. The engineer could answer this right away, because the location, the specific questions, and the reply address are all included.",
      "good": "Letter accepted. The request is mostly specific. Read the leftovers carefully so an order does not sneak in.",
      "rough": "I have the letter. Come read it with me. Part of this asks for facts, and part of it gives an order."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "We already know the city is at fault, so asking questions would only slow down the repair.",
    "why": "The notes say the class needs facts before it suggests a change. A request asks. It does not start with the verdict."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence asks which drain serves the corner.",
    "pinpointMiss": "That sentence may belong in the letter. It does not ask which drain serves the corner.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The engineer knows the place and which facts you need.",
      "b": "An order is not a request for information.",
      "c": "A request has to invite a reply.",
      "d": "A state map does not answer the questions about one corner."
    }
  },
  "mustInclude": [
    "Says a class is writing about the flooded crosswalk at Oak and 3rd.",
    "Asks a specific question, such as which drain, when it was cleared, or whether a larger drain is planned.",
    "Says the reply should go to Ms. Alvarez, and does not turn the letter into an order to fix it today."
  ],
  "modelAnswer": "We are a fifth-grade class, and we are writing to request three facts. Whenever there is a hard rain, water covers the crosswalk at Oak Street and 3rd Street. Which storm drain serves that corner, when was it last cleared, and is a larger drain already in this year's plan? Please address your reply to our teacher, Ms. Alvarez.",
  "aiContext": "Grade 5 ELAR, TEKS 5.12D correspondence that requests information. Audience: the city engineer. Problem: the Oak and 3rd crosswalk floods after hard rain. Questions: which drain serves it, when it was last cleared, whether a larger drain is in this year's plan. Reply to Ms. Alvarez. The class needs facts before suggesting a change. Do not accept fix-it-today demands, no questions, do-not-reply, every street, a state map, or an off-topic story. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "letter",
      "drain"
    ],
    "walkLine": "The questions are what let the engineer answer about the drain.",
    "why": {
      "a": "Yes. A letter with no questions gives the engineer nothing to answer.",
      "b": "The flood is still there. It is the reason for the letter.",
      "c": "An order is not a question. The notes ask for facts first.",
      "d": "A state map is not the answer these questions need."
    }
  },
  "look": {
    "key": "ask",
    "hint": "Follow the arrows. A flooded crosswalk, a blank envelope, then a worker at an open storm drain.",
    "why": "Yes. The flood leads to a letter about the drain."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say to ask about every street.",
    "why": "Yes. The questions are about one corner."
  }
};
